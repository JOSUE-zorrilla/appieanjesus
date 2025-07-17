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
import Icon from 'react-native-vector-icons/FontAwesome5';
import { TextInput } from 'react-native';
import { TouchableOpacity } from 'react-native';


interface Pais {
  id_pais: string;
  nombre: string;
  misionero: string;
  bandera: string;
}


export default function PaisesScreen() {
  const [paises, setPaises] = useState<Pais[]>([]);
  const [loading, setLoading] = useState(true);
  const [ciudades, setCiudades] = useState<any[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [paisSeleccionado, setPaisSeleccionado] = useState<string | null>(null);
  const navigation = useNavigation();
  const [busquedaCiudad, setBusquedaCiudad] = useState('');
const [loadingCiudades, setLoadingCiudades] = useState(false);

useEffect(() => {
  axios
    .get('https://ieanjesus.org.ec/sistemacomites/api/paises')
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
    setLoadingCiudades(true);
    setModalVisible(true);
    setPaisSeleccionado(idPais);
    setCiudades([]);

    const response = await axios.get(`https://ieanjesus.org.ec/sistemacomites/api/paises?id=${idPais}`);
    const ciudadesData = response.data.data.ciudades;
    setCiudades(ciudadesData);
  } catch (error) {
    console.error('Error al cargar ciudades:', error);
  } finally {
    setLoadingCiudades(false);
  }
};




  
const ciudadesFiltradas = ciudades.filter((ciudad) => {
  const texto = busquedaCiudad.toLowerCase();
  return (
    ciudad.nombre.toLowerCase().includes(texto) ||
    ciudad.pastor.toLowerCase().includes(texto)
  );
});
if (loading) {
  return (
    <ImageBackground
      source={require('../../assets/imagen/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#002C73" />
        <Text style={styles.loadingText}>Cargando países...</Text>
      </View>
    </ImageBackground>
  );
}


  return (
    <ImageBackground
      source={require('../../assets/imagen/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView style={styles.overlay}>
         <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={18} color="#002C73" />
          </TouchableOpacity>

         <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>DIRECTORIO EXTRANJERO</Text>
          </View>
        </View>

        <FlatList
          data={paises}
          keyExtractor={(item) => item.id_pais}
          contentContainerStyle={styles.container}
          renderItem={({ item }) => (
            <Pressable onPress={() => abrirModalCiudades(item.id_pais)}>
              <View style={styles.card}>
                <Image source={{ uri: item.bandera }} style={styles.flag} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>{item.nombre}</Text>
                  <Text style={styles.misionero}>
                    Misionero: <Text style={styles.bold}>{item.misionero}</Text>
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
                {/* 🔽 Aquí pones el TextInput antes del FlatList */}
                <TextInput
                  placeholder="Buscar ciudad o nombre..."
                  placeholderTextColor="#888"
                  style={styles.buscador}
                  value={busquedaCiudad}
                  onChangeText={setBusquedaCiudad}
                />
                {loadingCiudades ? (
  <View style={styles.loadingCiudadesContainer}>
    <ActivityIndicator size="large" color="#002C73" />
    <Text style={styles.loadingText}>Cargando ciudades...</Text>
  </View>
) : (
  <FlatList
    data={ciudadesFiltradas}
    keyExtractor={(item) => item.id_ciudad.toString()}
    renderItem={({ item }) => (
      <View style={styles.cityCard}>
        <Image source={{ uri: item.foto_perfil }} style={styles.cityImage} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.nombre}</Text>
          <Text style={styles.misionero}>Pastor: {item.pastor}</Text>
          <View style={styles.row}>
            <Pressable
              onPress={() => Linking.openURL(`https://wa.me/${item.telefono}`)}
              style={styles.iconCircleWhatsApp}
            >
              <Icon name="whatsapp" size={18} color="#ffffff" />
            </Pressable>
            <Pressable
              onPress={() =>
                Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longitude}`)
              }
              style={styles.iconCircleGPS}
            >
              <Icon name="map-marker-alt" size={18} color="#ffffff" />
            </Pressable>
          </View>
        </View>
      </View>
    )}
  />
)}

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
 
  header: {
    backgroundColor: '#002C73',
    alignItems: 'center',
    justifyContent: 'center',
   paddingVertical: 40,
    position: 'relative',
  },

  headerContainer: {
  backgroundColor: '#002C73',
  paddingTop: 95, // ajusta según el notch
  paddingBottom: 16,
  paddingHorizontal: 18,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
},
headerCenter: {
 position: 'absolute',
  top: 43,
  left: 10,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
},

  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold',marginTop: 15, },
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
  top: 50,
  left: 16,
  width: 40,
  height: 40,
  backgroundColor: '#fff',
  borderRadius: 20, // completamente redondo
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 3,
  elevation: 4, // para Android
},


// elimina backText si ya no lo usas
 row: {
  flexDirection: 'row',
  justifyContent: 'flex-end', // alinea a la derecha
  alignItems: 'center',
  marginTop: 10,
  gap: 0, // o usa marginRight en los botones
},

   iconButton: {
  paddingHorizontal: 10,
  paddingVertical: 5,
},
iconCircleWhatsApp: {
  backgroundColor: '#25D366',// whatsapp
  padding: 10,
  borderRadius: 5,
  marginRight: 5,
},

iconCircleGPS: {
  backgroundColor: '#4285F4', // azul estilo Google Maps
  padding: 10,
  borderRadius: 5,
},
buscador: {// buscador de ciudades
  borderWidth: 1,
  borderColor: '#ccc',
  borderRadius: 8,
  paddingHorizontal: 12,
  paddingVertical: 6,
  marginBottom: 10,
  color: '#000',
},

loadingCiudadesContainer: {
  alignItems: 'center',
  justifyContent: 'center',
  marginVertical: 20,
},
loaderContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
},

loadingText: {
  marginTop: 10,
  color: '#002C73',
  fontSize: 16,
  fontWeight: '600',
},

});
