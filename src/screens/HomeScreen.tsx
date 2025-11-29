import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Paises: undefined;
  TVOnline: undefined;
  RadioOnline: undefined;
  Biblia: undefined;
  Eventos: undefined;
  CalendarioEventos: undefined;
  RecursosGraficos: undefined;
  Musica: undefined;
  noticias: undefined;
  nacional: undefined;
  DirectorioNacional: undefined;
};

const items = [
  { label: 'DIRECTORIO NACIONAL', icon: require('../../assets/iconosimagen/directorio.png') },
  { label: 'DIRECTORIO EXTRANJERO', icon: require('../../assets/iconosimagen/extranjero.png') },
  { label: 'NOTICIAS', icon: require('../../assets/iconosimagen/noticias.png') },
  { label: 'POA', icon: require('../../assets/iconosimagen/eventos.png') },
  { label: 'RADIO ONLINE', icon: require('../../assets/iconosimagen/radio.png') },
  { label: 'TV ONLINE', icon: require('../../assets/iconosimagen/tv.png') },
  { label: 'BIBLIA', icon: require('../../assets/iconosimagen/biblia.png') },
  { label: 'MÚSICA', icon: require('../../assets/iconosimagen/musica.png') },
  { label: 'RECURSOS GRÁFICOS', icon: require('../../assets/iconosimagen/recursos.png') },
];

const screenWidth = Dimensions.get('window').width;
const boxSize = (screenWidth - 80) / 3;

// URL de la API
const LOGO_API_URL =
  'https://ieanjesus.org.ec/sistemacomites/api/logo.php?iddepartamento=201';

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        console.log('🔍 [HOME] Cargando logo desde API...');
        const response = await fetch(LOGO_API_URL);
        const json = await response.json();
        
        console.log('📦 [HOME] Respuesta completa:', JSON.stringify(json, null, 2));
        
        // ✅ Corregido: Buscar imagen_home_url directamente
        if (json.status === 'success' && json.data && json.data.imagen_home_url) {
          console.log('✅ [HOME] Logo cargado:', json.data.imagen_home_url);
          setLogoUrl(json.data.imagen_home_url);
        } else {
          console.log('⚠️ [HOME] No se encontró logo home');
        }
      } catch (error) {
        console.log('❌ [HOME] Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogo();
  }, []);

  return (
    <ImageBackground
      source={require('../../assets/imagen/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          {loading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : logoUrl ? (
            <Image
              source={{ uri: logoUrl }}
              style={styles.headerLogo}
              resizeMode="contain"
              onError={(error) => {
                console.log('❌ [HOME] Error cargando imagen:', error.nativeEvent.error);
              }}
              onLoad={() => {
                console.log('✅ [HOME] Imagen cargada correctamente');
              }}
            />
          ) : (
            <Image
              source={require('../../assets/imagen/unidos.png')}
              style={styles.headerLogo}
              resizeMode="contain"
            />
          )}
        </View>

        {/* Icon grid */}
        <ScrollView contentContainerStyle={styles.grid}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.iconWrapper}>
              <TouchableOpacity
                style={styles.iconBox}
                onPress={() => {
                  if (item.label === 'DIRECTORIO EXTRANJERO') {
                    navigation.navigate('Paises');
                  } else if (item.label === 'TV ONLINE') {
                    navigation.navigate('TVOnline');
                  } else if (item.label === 'RADIO ONLINE') {
                    navigation.navigate('RadioOnline');
                  } else if (item.label === 'BIBLIA') {
                    navigation.navigate('Biblia');
                  } else if (item.label === 'POA') {
                    navigation.navigate('CalendarioEventos');
                  } else if (item.label === 'RECURSOS GRÁFICOS') {
                    navigation.navigate('RecursosGraficos');
                  } else if (item.label === 'MÚSICA') {
                    navigation.navigate('Musica');
                  } else if (item.label === 'NOTICIAS') {
                    navigation.navigate('noticias');
                  } else if (item.label === 'DIRECTORIO NACIONAL') {
                    navigation.navigate('DirectorioNacional');
                  } else {
                    console.log('Presionaste:', item.label);
                  }
                }}
              >
                <Image source={item.icon} style={styles.iconImage} resizeMode="contain" />
              </TouchableOpacity>

              <Text style={styles.iconText}>{item.label}</Text>
            </View>
          ))}
        </ScrollView>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  header: {
    backgroundColor: '#002C73',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    minHeight: 140,
  },
  headerLogo: {
    width: 180,
    height: 110,
    marginBottom: 0,
    marginTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
    marginTop: 10,
  },
  iconWrapper: {
    width: boxSize,
    marginHorizontal: 10,
    marginVertical: 14,
    alignItems: 'center',
  },
  iconBox: {
    width: boxSize,
    height: boxSize,
    backgroundColor: '#002C73',
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  iconImage: {
    width: 70,
    height: 65,
  },
  iconText: {
    marginTop: 10,
    fontSize: 13,
    color: '#002C73',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  footer: {
    backgroundColor: '#002C73',
    paddingVertical: 30,
    alignItems: 'center',
  },
  footerText: {
    color: 'white',
    fontSize: 13,
  },
});
