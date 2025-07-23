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
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

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
  const [busqueda, setBusqueda] = useState('');
  const [categorias, setCategorias] = useState<string[]>([]);
  const [generos, setGeneros] = useState<string[]>([]);
  const [notas, setNotas] = useState<string[]>([]);
  const [filtro, setFiltro] = useState<{ categoria?: string; genero?: string; nota?: string }>({});
  const [activeTab, setActiveTab] = useState<'categoria' | 'genero' | 'nota' | null>('categoria');

  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://ieanjesus.org.ec/sistemacomites/api/musica')
      .then((res) => res.json())
      .then((data) => setCanciones(data.data))
      .catch((err) => console.error('Error al cargar música:', err));
  }, []);

  useEffect(() => {
    const categoriasUnicas = Array.from(new Set(canciones.map(c => c.categoria))).filter(Boolean);
    const generosUnicos = Array.from(new Set(canciones.map(c => c.genero))).filter(Boolean);
    const notasUnicas = Array.from(new Set(canciones.map(c => c.nota_cancion))).filter(Boolean);
    setCategorias(categoriasUnicas);
    setGeneros(generosUnicos);
    setNotas(notasUnicas);
  }, [canciones]);

  const abrirModal = (cancion: Cancion) => {
    setCancionSeleccionada(cancion);
    setModalVisible(true);
  };

  const cancionesFiltradas = canciones.filter(c =>
    c.nombre_cancion.toLowerCase().includes(busqueda.toLowerCase()) &&
    (!filtro.categoria || c.categoria === filtro.categoria) &&
    (!filtro.genero || c.genero === filtro.genero) &&
    (!filtro.nota || c.nota_cancion === filtro.nota)
  );

  const valoresActivos = activeTab === 'categoria' ? categorias : activeTab === 'genero' ? generos : notas;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>SECCIÓN MUSICAL</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#002C73" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="Buscar canción por nombre..."
            value={busqueda}
            onChangeText={setBusqueda}
            style={styles.searchInput}
            placeholderTextColor="#888"
          />
        </View>

        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => setActiveTab('categoria')}>
            <Text style={[styles.tabText, activeTab === 'categoria' && styles.tabTextActive]}>CATEGORÍA</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('genero')}>
            <Text style={[styles.tabText, activeTab === 'genero' && styles.tabTextActive]}>GÉNERO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('nota')}>
            <Text style={[styles.tabText, activeTab === 'nota' && styles.tabTextActive]}>NOTA</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 15 }}>
          {valoresActivos.map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.filtroBoton, filtro[activeTab!] === item && styles.filtroSeleccionado]}
              onPress={() => setFiltro((prev) => ({
                ...prev,
                [activeTab!]: prev[activeTab!] === item ? undefined : item,
              }))}
            >
              <Text style={[styles.filtroTexto, filtro[activeTab!] === item && { color: '#fff' }]}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {cancionesFiltradas.length === 0 ? (
          <Text style={styles.emptyText}>No hay canciones disponibles.</Text>
        ) : (
          cancionesFiltradas.map((cancion) => (
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
              <Image source={{ uri: cancionSeleccionada?.imagen }} style={styles.modalImage} />
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
  scrollContainer: { padding: 20 },
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
  footer: {
    backgroundColor: '#002C73',
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: '#002C73',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 40,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#002C73',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 6,
  },
  tabText: {
    fontSize: 14,
    color: '#002C73',
    fontWeight: 'bold',
  },
  tabTextActive: {
    borderBottomWidth: 2,
    borderColor: '#002C73',
  },
  filtroBoton: {
    backgroundColor: '#E0E0E0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  filtroSeleccionado: {
    backgroundColor: '#002C73',
  },
  filtroTexto: {
    color: '#000',
    fontWeight: '600',
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