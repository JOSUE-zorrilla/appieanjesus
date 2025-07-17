import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'CalendarioEventos'
>;

interface Evento {
  id: string;
  titulo: string;
  fecha: string;
  imagen: string;
  texto: string;
}

export default function CalendarioEventosScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [fechaSeleccionada, setFechaSeleccionada] = useState<string | null>(null);

  useEffect(() => {
    fetch('https://ieanjesus.org.ec/sistemacomites/api/eventos')
      .then((res) => res.json())
      .then((data) => setEventos(data.data))
      .catch((err) => console.error('Error al cargar eventos:', err));
  }, []);

  const eventosDelMes: Evento[] = eventos.filter((evento) => {
    const fecha = new Date(evento.fecha);
    const hoy = new Date();
    return (
      fecha.getMonth() === hoy.getMonth() &&
      fecha.getFullYear() === hoy.getFullYear()
    );
  });

  const fechasMarcadas = eventos.reduce((acc, evento) => {
    const fecha = evento.fecha.split('T')[0];
    acc[fecha] = {
      marked: true,
      dotColor: '#002C73',
      activeOpacity: 0,
    };
    return acc;
  }, {} as Record<string, any>);

  return (
    <View style={styles.container}>
      {/* Encabezado */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>CALENDARIO DE EVENTOS</Text>
        </View>
      </View>

      {/* Contenido Scrollable */}
      <View style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.calendarWrapper}>
            <Calendar
              onDayPress={(day) => {
                setFechaSeleccionada(day.dateString);
                navigation.navigate('Eventos', { fecha: day.dateString });
              }}
              markedDates={fechasMarcadas}
              theme={{
                selectedDayBackgroundColor: '#002C73',
                todayTextColor: '#002C73',
                dotColor: '#002C73',
                arrowColor: '#002C73',
                textSectionTitleColor: '#002C73',
              }}
            />
          </View>

          <Text style={styles.subTitle}>No te lo pierdas</Text>

          {eventosDelMes.map((evento) => (
            <View key={evento.id} style={styles.eventoRow}>
              <View>
                <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
              </View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Eventos', { fecha: evento.fecha })
                }
              >
                <Text style={styles.eventoFecha}>
                  {new Date(evento.fecha).toLocaleDateString('es-EC', {
                    day: '2-digit',
                    month: '2-digit',
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* Footer fijo al fondo */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  headerContainer: {
    backgroundColor: '#002C73',
    paddingTop: 95,
    paddingBottom: 20,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
  headerCenter: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calendarWrapper: {
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 10,
    marginHorizontal: 10,
    color: '#002C73',
    textAlign: 'center',
  },
  eventoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 10,
  },
  eventoTitulo: {
    fontSize: 16,
    color: '#002C73',
    maxWidth: 230,
  },
  eventoFecha: {
    fontSize: 14,
    color: '#002C73',
    fontWeight: 'bold',
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
