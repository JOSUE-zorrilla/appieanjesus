import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function TVOnlineScreen() {
  const navigation = useNavigation();
  const [programas, setProgramas] = useState([]);

useEffect(() => {
  fetch('http://192.168.0.107/sistemaComitesIeanJesus/api/programas_tv.php')
    .then(res => res.json())
    .then(data => {
      // Ordenar por fecha y hora
      const ordenados = data.data.sort((a: any, b: any) => {
        const fechaHoraA = new Date(`${a.fecha_programa}T${a.hora}`);
        const fechaHoraB = new Date(`${b.fecha_programa}T${b.hora}`);
        return fechaHoraA.getTime() - fechaHoraB.getTime();
      });

      setProgramas(ordenados);
    })
    .catch(err => console.error('Error al cargar programas:', err));
}, []);


  const formatearFecha = (fecha: string): string => {
    const date = new Date(fecha);
    return date.toLocaleDateString('es-EC', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
      weekday: 'long',
    });
  };

  const formatearHora = (hora: string): string => {
    return hora.slice(0, 5);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>TV ONLINE</Text>
        </View>
      </View>

      {/* WebView */}
      <View style={styles.videoWrapper}>
        <WebView
          source={{ uri: 'https://ecuatel.com/tvs/iglesia/' }}
          allowsInlineMediaPlayback
          javaScriptEnabled
          style={styles.video}
        />
      </View>

      {/* Contenido */}
      <ScrollView style={styles.content} contentContainerStyle={{ paddingBottom: 40 }}>
        <Text style={styles.description}>
          Conéctate en vivo con cada transmisión oficial de IEANJESUS Ecuador a través de nuestra plataforma de TV Online,
          un canal dedicado a compartir la Palabra de Dios, eventos nacionales, congresos, cultos especiales y contenidos audiovisuales
          que edifican tu fe y fortalecen tu vida espiritual.
        </Text>

        <Text style={styles.sectionTitle}>HORARIOS DE PROGRAMA</Text>

        {programas.map((prog: any) => (
         <View style={styles.programCard}>
  <View style={{ flex: 1 }}>
    <Text style={styles.programTitle}>{prog.titulo_programa.toUpperCase()}</Text>
    <Text style={styles.programDate}>{formatearFecha(prog.fecha_programa)}</Text>
  </View>
  <View style={{ justifyContent: 'center', alignItems: 'flex-end' }}>
    <Text style={styles.programHour}>{formatearHora(prog.hora)}h</Text>
  </View>
</View>

        ))}
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#002C73',
    paddingVertical: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  programCard: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  borderTopWidth: 1,
  borderColor: '#ccc',
  paddingVertical: 12,
  gap: 12, // añade espacio entre texto y hora
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
  video: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  description: {
    marginTop: 16,
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 20,
  },
  sectionTitle: {
    marginTop: 24,
    fontWeight: 'bold',
    fontSize: 15,
    color: '#002C73',
    marginBottom: 12,
  },
 
  programTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#002C73',
  },
  programDate: {
    fontSize: 13,
    color: '#555',
  },
  programHour: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#002C73',
  },
  footer: {
    backgroundColor: '#002C73',
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    color: 'white',
    fontSize: 12,
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
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
    marginTop: 10,
  },
  headerCenter: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoWrapper: {
    height: 200,
    backgroundColor: '#000',
    zIndex: 1,
  },
});
