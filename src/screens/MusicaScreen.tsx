import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { TouchableWithoutFeedback, Keyboard } from 'react-native';

interface Cancion {
  id: string;
  nombre_cancion: string;
  autor: string;
  nota_cancion: string;
  letra_cancion: string;
  imagen: string;
  url_cancion: string;
  categoria: string;
  genero: string;
}

export default function MusicaScreen() {
  const [canciones, setCanciones] = useState<Cancion[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [cancionSeleccionada, setCancionSeleccionada] = useState<Cancion | null>(null);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://ieanjesus.org.ec/sistemacomites/api/musica')
      .then((res) => res.json())
      .then((data) => setCanciones(data.data))
      .catch((err) => console.error('Error al cargar música:', err));
  }, []);

  const abrirModal = (cancion: Cancion) => {
    setCancionSeleccionada(cancion);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SECCIÓN MUSICAL</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {canciones.length === 0 ? (
          <Text style={styles.emptyText}>No hay canciones disponibles.</Text>
        ) : (
          canciones.map((cancion) => (
            <TouchableOpacity
              key={cancion.id}
              style={styles.card}
              onPress={() => abrirModal(cancion)}
            >
              <Image source={{ uri: cancion.imagen }} style={styles.cardImage} />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{cancion.nombre_cancion}</Text>
                <Text style={styles.cardAutor}>🎤 {cancion.autor}</Text>
                <Text style={styles.cardCategoria}>🎶 {cancion.genero}</Text>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              <Image
                source={{ uri: cancionSeleccionada?.imagen }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{cancionSeleccionada?.nombre_cancion}</Text>
              <Text style={styles.modalInfo}>Autor: {cancionSeleccionada?.autor}</Text>
              <Text style={styles.modalInfo}>Nota: {cancionSeleccionada?.nota_cancion}</Text>
              <Text style={styles.modalInfo}>Género: {cancionSeleccionada?.genero}</Text>
              <Text style={styles.modalLetra}>{cancionSeleccionada?.letra_cancion}</Text>

              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => Linking.openURL(cancionSeleccionada!.url_cancion)}
              >
                <Icon name="youtube" size={16} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.modalButtonText}>Ver en YouTube</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCerrar}>
                <Text style={styles.modalCerrarText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
      <View style={styles.footer}>
                <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
              </View>
    </View>
  );
  
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  header: {
    backgroundColor: '#002C73',
    paddingTop: 100,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    elevation: 6,
  },
  footer: {
    backgroundColor: '#002C73',
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  backButton: {
    position: 'absolute',
    left: 20,
    top: 60,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 4,
    zIndex: 2,
  },
  headerTitle: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    pointerEvents: 'none',
  },
  scrollContainer: {
    padding: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  cardImage: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002C73',
  },
  cardAutor: {
    fontSize: 13,
    color: '#444',
    marginTop: 4,
  },
  cardCategoria: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#888',
    marginTop: 50,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    maxHeight: '90%',
  },
  modalImage: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#002C73',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalInfo: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  modalLetra: {
    fontSize: 15,
    color: '#444',
    marginVertical: 10,
    lineHeight: 22,
  },
  modalButton: {
    flexDirection: 'row',
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalCerrar: {
    marginTop: 15,
    alignItems: 'center',
  },
  modalCerrarText: {
    color: '#002C73',
    fontWeight: 'bold',
  },
});
