import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Noticia {
  id: string;
  titulo: string;
  fecha: string;
  imagen: string;
  texto: string;
}

type RootStackParamList = {
  noticias: undefined;
  CrearNoticia: undefined;
  // ... otras rutas
};

export default function NoticiasScreen() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [noticiaSeleccionada, setNoticiaSeleccionada] = useState<Noticia | null>(null);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    cargarNoticias();
  }, []);

  const cargarNoticias = () => {
    fetch('https://ieanjesus.org.ec/sistemacomites/api/noticias')
      .then((res) => res.json())
      .then((data) => {
        console.log('Noticias cargadas:', data);
        setNoticias(data.data || []);
      })
      .catch((err) => console.error('Error al cargar noticias:', err));
  };

  const abrirModal = (noticia: Noticia) => {
    setNoticiaSeleccionada(noticia);
    setModalVisible(true);
  };

  const renderImagen = (imagenUrl: string) => {
    if (imagenUrl && imagenUrl.startsWith('http')) {
      return <Image source={{ uri: imagenUrl }} style={styles.cardImage} />;
    } else {
      return (
        <View style={[styles.cardImage, styles.placeholder]}>
          <Icon name="image" size={40} color="#ccc" />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>NOTICIAS</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {noticias.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Icon name="newspaper" size={60} color="#ccc" />
            <Text style={styles.emptyText}>No hay noticias disponibles.</Text>
            <Text style={styles.emptySubText}>¡Sé el primero en crear una!</Text>
          </View>
        ) : (
          noticias.map((noticia) => (
            <View key={noticia.id} style={styles.card}>
              {renderImagen(noticia.imagen)}
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{noticia.titulo}</Text>
                <Text style={styles.cardFecha}>
                  🗓️{' '}
                  {new Date(noticia.fecha).toLocaleDateString('es-EC', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  })}
                </Text>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => abrirModal(noticia)}
                >
                  <Text style={styles.buttonText}>Ver más</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}

        {/* Espacio extra para que el botón flotante no tape contenido */}
        <View style={{ height: 80 }} />
      </ScrollView>

      {/* BOTÓN FLOTANTE PARA CREAR NOTICIA */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => navigation.navigate('CrearNoticia')}
        activeOpacity={0.8}
      >
        <Icon name="plus" size={24} color="#fff" />
      </TouchableOpacity>

      {/* MODAL */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView>
              {noticiaSeleccionada?.imagen && noticiaSeleccionada.imagen.startsWith('http') ? (
                <Image source={{ uri: noticiaSeleccionada.imagen }} style={styles.modalImage} />
              ) : (
                <View style={[styles.modalImage, styles.placeholder]}>
                  <Icon name="image" size={50} color="#ccc" />
                </View>
              )}
              <Text style={styles.modalTitle}>{noticiaSeleccionada?.titulo}</Text>
              <Text style={styles.modalFecha}>
                🗓️{' '}
                {new Date(noticiaSeleccionada?.fecha ?? '').toLocaleDateString('es-EC', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                })}
              </Text>
              <Text style={styles.modalTexto}>{noticiaSeleccionada?.texto}</Text>

              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalCerrar}>
                <Text style={styles.modalCerrarText}>Cerrar</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  headerContainer: {
    backgroundColor: '#002C73',
    paddingTop: 95,
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
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  scrollContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 16,
    elevation: 3,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 160,
  },
  cardContent: {
    padding: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002C73',
    marginBottom: 4,
  },
  cardFecha: {
    fontSize: 13,
    color: '#555',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#002C73',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 100,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 18,
    color: '#888',
    marginTop: 20,
    fontWeight: 'bold',
  },
  emptySubText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#aaa',
    marginTop: 5,
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
    marginBottom: 6,
  },
  modalFecha: {
    fontSize: 13,
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalTexto: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  },
  modalCerrar: {
    marginTop: 15,
    alignItems: 'center',
    backgroundColor: '#002C73',
    padding: 12,
    borderRadius: 8,
  },
  modalCerrarText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
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
  placeholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // 🔥 BOTÓN FLOTANTE
  floatingButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#002C73',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
});