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
import { LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['es'] = {
  monthNames: [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ],
  monthNamesShort: [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ],
  dayNames: [
    'Domingo',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
  today: 'Hoy',
};

LocaleConfig.defaultLocale = 'es';


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
  const [mesVisible, setMesVisible] = useState(new Date());

  useEffect(() => {
    fetch('https://ieanjesus.org.ec/sistemacomites/api/eventos')
      .then((res) => res.json())
      .then((data) => setEventos(data.data))
      .catch((err) => console.error('Error al cargar eventos:', err));
  }, []);

  const eventosDelMes = eventos.filter((evento) => {
    const fecha = new Date(evento.fecha);
    return (
      fecha.getMonth() === mesVisible.getMonth() &&
      fecha.getFullYear() === mesVisible.getFullYear()
    );
  });

  const fechasMarcadas = eventos.reduce((acc, evento) => {
    const fecha = evento.fecha.split('T')[0];
    acc[fecha] = {
      selected: true,
      selectedColor: '#002C73',
      selectedTextColor: '#fff',
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
                navigation.navigate('Eventos', { fecha: day.dateString });
              }}
              onMonthChange={(month) => {
                const nuevaFecha = new Date(month.year, month.month - 1);
                setMesVisible(nuevaFecha);
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

          {eventosDelMes.length === 0 ? (
  <Text style={styles.emptyText}>No hay eventos para este mes.</Text>
) : (
 eventosDelMes
  .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
  .map((evento) => (
    <TouchableOpacity
      key={evento.id}
      style={styles.eventoRow}
      onPress={() => navigation.navigate('Eventos', { fecha: evento.fecha })}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', flex: 1 }}>
        <Text style={styles.eventoTitulo}>{evento.titulo}</Text>
        <Text style={styles.eventoFecha}>
          {(() => {
            const [anio, mes, dia] = evento.fecha.split('T')[0].split('-');
            const fechaReal = new Date(Number(anio), Number(mes) - 1, Number(dia));
            return fechaReal
              .toLocaleDateString('es-EC', {
                weekday: 'long',
                day: '2-digit',
                month: 'long',
              })
              .replace(/^./, (str) => str.toUpperCase());
          })()}
        </Text>
      </View>
    </TouchableOpacity>
  ))

)}

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
    marginTop: 15,
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
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 15,
    color: '#666',
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
