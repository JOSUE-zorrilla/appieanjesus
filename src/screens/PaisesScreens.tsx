import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  ImageBackground,
  Modal,
  Pressable,
  Linking,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

interface Pais {
  id_paises: string;
  Nombre: string;
  Misionero: string;
  Bandera: string;
}

export default function PaisesScreen() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  const [ciudades, setCiudades] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paisSeleccionado, setPaisSeleccionado] = useState<string | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    axios
      .get('https://ieanjesus.org.ec/api/paises')
      .then((response) => {
        setPaises(response.data.data);
      })
      .catch((error) => {
        console.error('Error al obtener países:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const abrirModalCiudades = async (idPais: string) => {
    try {
      setModalVisible(true);
      setPaisSeleccionado(idPais);
      const response = await axios.get(`https://ieanjesus.org.ec/api/ciudades?id_pais=${idPais}`);
      setCiudades(response.data.data);
    } catch (error) {
      console.error('Error al cargar ciudades:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#002C73" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../../assets/imagen/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backText}>⬅️</Text>
          </Pressable>
          <Text style={styles.headerTitle}>DIRECTORIO EXTRANJERO</Text>
        </View>

        <FlatList
          data={paises}
          keyExtractor={(item) => item.id_paises}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <Pressable onPress={() => abrirModalCiudades(item.id_paises)}>
              <View style={styles.card}>
                <Image source={{ uri: item.Bandera }} style={styles.flag} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.Nombre}</Text>
                  <Text style={styles.misionero}>
                    Misionero: <Text style={styles.bold}>{item.Misionero}</Text>
                  </Text>
                </View>
              </View>
            </Pressable>
          )}
        />

        {/* Modal de ciudades */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Ciudades</Text>
              <FlatList
                data={ciudades}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.cityCard}>
                    <Image source={{ uri: item.foto }} style={styles.cityImage} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.name}>{item.nombre}</Text>
                      <Text style={styles.misionero}>Pastor: {item.pastor}</Text>

                      <View style={styles.row}>
                        <Text
                          style={styles.link}
                          onPress={() => Linking.openURL(`https://wa.me/${item.telefono}`)}
                        >
                          📞 WhatsApp
                        </Text>
                      </View>

                      <View style={styles.row}>
                        <Text style={styles.gps}>📍 Ubicación: {item.latitude}, {item.longitude}</Text>
                      </View>
                    </View>
                  </View>
                )}
              />
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'white' }}>Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1 },
  loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: {
    backgroundColor: '#002C73',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    position: 'relative',
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold' },
  container: { padding: 16 },
  card: {
    backgroundColor: '#f5f7fa',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
  },
  flag: { width: 60, height: 40, borderRadius: 4, marginRight: 12 },
  name: { fontSize: 16, fontWeight: 'bold', color: '#002C73' },
  misionero: { fontSize: 14, marginTop: 2, color: '#333' },
  bold: { fontWeight: 'bold', color: '#002C73' },
  footer: { backgroundColor: '#002C73', paddingVertical: 30, alignItems: 'center' },
  footerText: { color: 'white', fontSize: 13 },
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
    borderRadius: 10,
    padding: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#002C73',
    textAlign: 'center',
  },
  cityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  cityImage: { width: 60, height: 60, borderRadius: 8, marginRight: 10 },
  link: { color: '#128C7E', fontWeight: 'bold', fontSize: 14 },
  gps: { fontSize: 13, color: '#555' },
  closeButton: {
    backgroundColor: '#002C73',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  backButton: {
    position: 'absolute',
    left: 15,
    top: 10,
    zIndex: 10,
    padding: 8,
  },
  backText: {
    fontSize: 20,
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
});
