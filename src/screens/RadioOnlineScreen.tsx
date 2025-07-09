import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { WebView } from 'react-native-webview';
import { useNavigation } from '@react-navigation/native';

export default function RadioOnlineScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
    <Text style={styles.headerTitle}>RADIO ONLINE</Text>
  </View>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Imagen */}
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/iconosimagen/micro.png')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        {/* Descripción */}
        <View style={styles.content}>
          <Text style={styles.subtitle}>Cada día conectados con JESÚS</Text>
          <Text style={styles.description}>
            Sintoniza nuestra emisora oficial IEANJESUS Radio Ecuador, una señal de esperanza y
            palabra viva para tu corazón.{"\n\n"}
            Transmisión en vivo 24/7 con alabanzas, mensajes, programas formativos y noticias del
            ministerio nacional e internacional.{"\n\n"}
            ¡Dale Play y déjate edificar desde donde estés!
          </Text>
        </View>

        {/* Reproductor (WebView) */}
        <View style={styles.playerWrapper}>
          <WebView
            source={{ uri: 'https://ecuatel.com/radios/iglesia/' }}
            javaScriptEnabled
            style={styles.webPlayer}
          />
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
headerContainer: {
  backgroundColor: '#002C73',
  paddingTop: 95, // ajusta según el notch
  paddingBottom: 16,
  paddingHorizontal: 18,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
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
  top: 46,
  left: 0,
  right: 0,
  alignItems: 'center',
  justifyContent: 'center',
},

  backButton: {
    position: 'absolute',
    left: 16,
    top: 50,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },


  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  image: {
    width: 200,
    height: 200,
  },
  content: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#002C73',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#333',
    textAlign: 'justify',
    lineHeight: 20,
  },
  playerWrapper: {
    height: 80,
    marginTop: 20,
    marginHorizontal: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  webPlayer: {
    flex: 1,
  },
  footer: {
    backgroundColor: '#002C73',
    alignItems: 'center',
    paddingVertical: 30,
  },
  footerText: {
    color: '#fff',
    fontSize: 12,
  },
  
});
