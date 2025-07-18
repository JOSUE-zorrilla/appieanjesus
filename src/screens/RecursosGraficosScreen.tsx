import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

interface Recurso {
  id: string;
  titulo: string;
  descripcion: string;
  url: string;
  fecha: string;
}

export default function RecursosGraficosScreen() {
  const [recursos, setRecursos] = useState<Recurso[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetch('https://ieanjesus.org.ec/sistemacomites/api/recursos')
      .then((res) => res.json())
      .then((data) => setRecursos(data.data))
      .catch((err) => console.error('Error al cargar recursos:', err));
  }, []);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RECURSOS GRÁFICOS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {recursos.length === 0 ? (
          <Text style={styles.emptyText}>No hay recursos disponibles.</Text>
        ) : (
          recursos.map((recurso) => (
            <View key={recurso.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Icon name="file-alt" size={20} color="#002C73" style={{ marginRight: 8 }} />
                <Text style={styles.titulo}>{recurso.titulo}</Text>
              </View>
              <Text style={styles.descripcion}>{recurso.descripcion}</Text>
              <Text style={styles.fecha}>
                📅{' '}
                {new Date(recurso.fecha).toLocaleDateString('es-EC', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: '2-digit',
                })}
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL(recurso.url)}
              >
                <Icon name="eye" size={14} color="#fff" style={{ marginRight: 6 }} />
                <Text style={styles.buttonText}>Ver documento</Text>
              </TouchableOpacity>
            </View>
          ))
        )}
      </ScrollView>

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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
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
  color: '#fff',
  fontSize: 22,
  fontWeight: 'bold',
  textAlign: 'center',
  position: 'absolute',
  top: 65, // Súbelo aquí ajustando este valor
  left: 0,
  right: 0,
   pointerEvents: 'none'
},

  scrollContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#002C73',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002C73',
    flex: 1,
    flexWrap: 'wrap',
  },
  descripcion: {
    fontSize: 14,
    color: '#444',
    marginTop: 4,
    marginBottom: 6,
  },
  fecha: {
    fontSize: 12,
    color: '#666',
  },
  button: {
    marginTop: 12,
    backgroundColor: '#002C73',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
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
});
