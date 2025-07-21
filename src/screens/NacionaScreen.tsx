import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  FlatList,
  Pressable,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import MapaSVG from './MapaSVG';
 // ajusta si lo guardaste en otra ruta

interface Congregacion {
  congregacion_nombre: string;
  latitud: string;
  longitud: string;
  distrito: string;
}

export default function NacionalScreen() {
  const [data, setData] = useState<Congregacion[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [distritoSeleccionado, setDistritoSeleccionado] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [filtrado, setFiltrado] = useState<Congregacion[]>([]);

  const handleDistritoPress = (distrito: string) => {
    const filtradoDistrito = data.filter((item) => item.distrito === distrito);
    setFiltrado(filtradoDistrito);
    setDistritoSeleccionado(distrito);
    setModalVisible(true);
  };

  useEffect(() => {
    axios
      .get('https://backend.sga.ieanjesus.com/aplicacion/directorio')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.error('Error al obtener datos:', error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/imagen/fondo.png')}
      style={{ flex: 1 }}
      resizeMode="cover"
    >
      <SafeAreaView style={{ flex: 1 }}>
        <Text style={styles.header}>DIRECTORIO NACIONAL</Text>

        {loading ? (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#002C73" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : (
          <View style={styles.mapContainer}>
            {/* Mapa SVG interactivo */}
            <MapaSVG onPressDistrito={handleDistritoPress} />
          </View>
        )}

        {/* Modal con info del distrito */}
        <Modal visible={modalVisible} animationType="slide" transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Distrito {distritoSeleccionado}</Text>
              <FlatList
                data={filtrado}
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text style={styles.name}>{item.congregacion_nombre}</Text>
                    <Text style={styles.coord}>
                      Lat: {item.latitud}, Long: {item.longitud}
                    </Text>
                  </View>
                )}
              />
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#fff' }}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    paddingVertical: 16,
    color: '#002C73',
  },
  mapContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    width: '90%',
    maxHeight: '80%',
    borderRadius: 12,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#002C73',
    marginBottom: 12,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#f0f0f0',
    marginBottom: 8,
    padding: 10,
    borderRadius: 8,
  },
  name: {
    fontWeight: 'bold',
    color: '#002C73',
    fontSize: 16,
  },
  coord: {
    color: '#555',
    fontSize: 13,
  },
  closeButton: {
    backgroundColor: '#002C73',
    marginTop: 12,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  loader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  loadingText: {
    color: '#002C73',
    marginTop: 10,
  },
});
