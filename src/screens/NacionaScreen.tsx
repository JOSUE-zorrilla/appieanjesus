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
  Image,
  ImageBackground,
  Dimensions,
} from 'react-native';
// necesitas instalar react-native-svg-uri
import axios from 'axios';

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

  useEffect(() => {
    axios
      .get('https://backend.sga.ieanjesus.com/aplicacion/directorio')
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => console.error('Error al obtener datos:', error))
      .finally(() => setLoading(false));
  }, []);

  const handleDistritoPress = (distrito: string) => {
    const filtradoDistrito = data.filter((item) => item.distrito === distrito);
    setFiltrado(filtradoDistrito);
    setDistritoSeleccionado(distrito);
    setModalVisible(true);
  };

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
            {/* Aquí va el SVG del mapa */}
            <Image
              source={require('../../assets/iconoimagen/unidos.png')} // si es .png
              style={styles.mapImage}
              resizeMode="contain"
            />
            {/* Posicionamos zonas clickables por encima del mapa */}
            {Array.from({ length: 16 }, (_, i) => (
              <Pressable
                key={i}
                onPress={() => handleDistritoPress(String(i + 1))}
                style={[styles.distritoTouchable, getDistritoPosition(i + 1)]}
              >
                <Text style={styles.touchableLabel}>{i + 1}</Text>
              </Pressable>
            ))}
          </View>
        )}

        {/* Modal con la info del distrito */}
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

const getDistritoPosition = (distrito: number) => {
  // 🔵 Ajusta las posiciones para cada distrito sobre el mapa
  const base = {
    position: 'absolute',
    width: 35,
    height: 35,
    backgroundColor: '#002C73aa',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
  };

  const positions: { [key: number]: any } = {
    1: { top: 40, left: 50 },
    2: { top: 60, left: 150 },
    3: { top: 90, left: 90 },
    4: { top: 120, left: 200 },
    5: { top: 160, left: 70 },
    6: { top: 180, left: 140 },
    7: { top: 220, left: 50 },
    8: { top: 250, left: 180 },
    9: { top: 280, left: 100 },
    10: { top: 300, left: 220 },
    11: { top: 340, left: 120 },
    12: { top: 370, left: 80 },
    13: { top: 400, left: 180 },
    14: { top: 430, left: 60 },
    15: { top: 460, left: 160 },
    16: { top: 500, left: 100 },
  };

  return { ...base, ...positions[distrito] };
};

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
  mapImage: {
    width: Dimensions.get('window').width - 40,
    height: Dimensions.get('window').height * 0.6,
  },
  distritoTouchable: {
    position: 'absolute',
  },
  touchableLabel: {
    color: '#fff',
    fontWeight: 'bold',
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
