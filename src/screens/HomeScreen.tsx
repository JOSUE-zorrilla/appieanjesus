import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Paises: undefined;
};

const items = [
  { label: 'DIRECTORIO NACIONAL', icon: require('../../assets/iconosimagen/directorio.png') },
  { label: 'DIRECTORIO EXTRANJERO', icon: require('../../assets/iconosimagen/extranjero.png') },
  { label: 'NOTICIAS', icon: require('../../assets/iconosimagen/noticias.png') },
  { label: 'EVENTOS', icon: require('../../assets/iconosimagen/eventos.png') },
  { label: 'RADIO ONLINE', icon: require('../../assets/iconosimagen/radio.png') },
  { label: 'TV ONLINE', icon: require('../../assets/iconosimagen/tv.png') },
  { label: 'BIBLIA', icon: require('../../assets/iconosimagen/biblia.png') },
  { label: 'MÚSICA', icon: require('../../assets/iconosimagen/musica.png') },
  { label: 'RECURSOS GRÁFICOS', icon: require('../../assets/iconosimagen/recursos.png') },
];

const screenWidth = Dimensions.get('window').width;
const boxSize = (screenWidth - 80) / 3;

export default function HomeScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (
    <ImageBackground
      source={require('../../assets/imagen/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        {/* Header */}
        <View style={styles.header}>
          <Image
            source={require('../../assets/iconosimagen/unidos.png')}
            style={styles.headerLogo}
            resizeMode="contain"
          />
        </View>

        {/* Icon grid */}
        <ScrollView contentContainerStyle={styles.grid}>
          {items.map((item, idx) => (
            <View key={idx} style={styles.iconWrapper}>
              <TouchableOpacity
                style={styles.iconBox}
                onPress={() => {
                  if (item.label === 'DIRECTORIO EXTRANJERO') {
                    navigation.navigate('Paises'); // ✅ navegación correcta
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
  },
  headerLogo: {
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
