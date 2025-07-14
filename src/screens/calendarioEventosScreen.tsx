import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Calendar } from 'react-native-calendars';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'CalendarioEventos'>;

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
    fetch('http://192.168.0.107/sistemaComitesIeanJesus/api/eventos.php')
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

  const onDayPress = (day: any) => {
    setFechaSeleccionada(day.dateString); // formato: YYYY-MM-DD
    navigation.navigate('Eventos', { fecha: day.dateString });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>EVENTOS</Text>
      </View>

      <View style={styles.calendarWrapper}>
        <Calendar
          onDayPress={onDayPress}
          markedDates={{
            ...(fechaSeleccionada && {
              [fechaSeleccionada]: {
                selected: true,
                marked: true,
                selectedColor: '#002C73',
              },
            }),
          }}
          theme={{
            selectedDayBackgroundColor: '#002C73',
            todayTextColor: '#002C73',
            arrowColor: '#002C73',
            textDayFontFamily: 'System',
            textMonthFontFamily: 'System',
            textDayHeaderFontFamily: 'System',
            monthTextColor: '#002C73',
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
            onPress={() => navigation.navigate('Eventos', { fecha: evento.fecha })}
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

      <View style={styles.footer}>
        <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    padding: 10,
  },
  headerContainer: {
    backgroundColor: '#002C73',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  calendarWrapper: {
    marginVertical: 10,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#002C73',
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
    padding: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
});
