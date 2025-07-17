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
    fetch('http://192.168.0.107/sistemaComitesIeanJesus/api/recursos.php')
      .then((res) => res.json())
      .then((data) => setRecursos(data.data))
      .catch((err) => console.error('Error al cargar recursos:', err));
  }, []);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={20} color="#002C73" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>RECURSOS GRÁFICOS</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {recursos.length === 0 ? (
          <Text style={styles.emptyText}>No hay recursos disponibles.</Text>
        ) : (
          recursos.map((recurso) => (
            <View key={recurso.id} style={styles.card}>
              <Text style={styles.titulo}>{recurso.titulo}</Text>
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
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    backgroundColor: '#002C73',
    paddingTop: 90,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 95,
    left: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 20,
    elevation: 3,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  scrollContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#e9f0ff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#002C73',
  },
  titulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002C73',
  },
  descripcion: {
    fontSize: 14,
    color: '#444',
    marginTop: 5,
  },
  fecha: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  button: {
    marginTop: 10,
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
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  footer: {
    backgroundColor: '#002C73',
    padding: 25,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});
