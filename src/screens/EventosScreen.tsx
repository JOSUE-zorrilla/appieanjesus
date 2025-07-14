import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Evento {
  id: string;
  titulo: string;
  fecha: string;
  imagen: string;
  texto: string;
}

const EventosScreen = () => {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const route = useRoute();
  const fechaSeleccionada = (route.params as any)?.fecha || null;

  useEffect(() => {
    fetch('http://192.168.0.107/sistemaComitesIeanJesus/api/eventos.php')
      .then(res => res.json())
      .then(data => {
        const eventosFiltrados = data.data.filter((evento: Evento) => {
          if (!fechaSeleccionada) return true;
          const fechaEvento = new Date(evento.fecha).toISOString().split('T')[0];
          return fechaEvento === fechaSeleccionada;
        });
        setEventos(eventosFiltrados);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error al cargar eventos:', err);
        setLoading(false);
      });
  }, [fechaSeleccionada]);

  const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-EC', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size="large" color="#0000ff" />;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>EVENTOS</Text>
        </View>
      </View>

      {eventos.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 50, fontSize: 16, color: '#666' }}>
          No hay eventos para esta fecha.
        </Text>
      ) : (
        eventos.map((evento) => (
          <View key={evento.id} style={styles.card}>
            <Image source={{ uri: evento.imagen }} style={styles.image} />
            <Text style={styles.title}>{evento.titulo}</Text>
            <Text style={styles.date}>Próximamente: {formatearFecha(evento.fecha)}</Text>
            <Text style={styles.text}>{evento.texto}</Text>
          </View>
        ))
      )}

      <View style={styles.footer}>
        <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingHorizontal: 0,
  },
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
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
  },
  card: {
    backgroundColor: '#F8F9FF',
    borderRadius: 10,
    marginTop: 20,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#000',
  },
  date: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 22,
  },
  footer: {
    backgroundColor: '#001f54',
    padding: 30,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
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
});

export default EventosScreen;
