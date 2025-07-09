import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  SafeAreaView,
} from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity,  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useState } from 'react';

export default function TVOnlineScreen() {
  const navigation = useNavigation();
const [isFullScreen, setIsFullScreen] = React.useState(false);


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


      {/* WebView para el iframe */}
  {/* WebView para el iframe */}
{/* WebView para el iframe */}
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

        <View style={styles.programCard}>
          <View>
            <Text style={styles.programTitle}>SOLIDARIOS</Text>
            <Text style={styles.programDate}>Viernes 27 de junio del 2025</Text>
          </View>
          <Text style={styles.programHour}>20H00pm</Text>
        </View>

        <View style={styles.programCard}>
          <View>
            <Text style={styles.programTitle}>LUZ APOSTOLICA</Text>
            <Text style={styles.programDate}>Domingo 29 de junio del 2025</Text>
          </View>
          <Text style={styles.programHour}>07H00am</Text>
        </View>

        <View style={styles.programCard}>
          <View>
            <Text style={styles.programTitle}>ESPACIO EN FAMILIA</Text>
            <Text style={styles.programDate}>Miércoles 02 de julio del 2025</Text>
          </View>
          <Text style={styles.programHour}>20H00pm</Text>
        </View>

        <View style={styles.programCard}>
          <View>
            <Text style={styles.programTitle}>EMBAJADORES ONLINE</Text>
            <Text style={styles.programDate}>Miércoles 09 de julio del 2025</Text>
          </View>
          <Text style={styles.programHour}>20H00pm</Text>
        </View>
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
  programCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
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
  paddingTop: 95, // antes estaba en 40
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
