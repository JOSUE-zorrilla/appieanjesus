import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

// ⚠️ Cambia la URL a tu dominio y al iddepartamento correcto
const LOGO_API_URL =
  'https://ieanjesus.org.ec/sistemacomites/api/logo.php?iddepartamento=11';

export default function SplashScreen({ navigation }: Props) {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const [logoUrl, setLogoUrl] = useState<string | null>(null);

  useEffect(() => {
    // Animación
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    // Cargar logo desde API
    const fetchLogo = async () => {
      try {
        const response = await fetch(LOGO_API_URL);
        const json = await response.json();
        if (json.status === 'success' && json.data && json.data.imagen_url) {
          setLogoUrl(json.data.imagen_url as string);
        }
      } catch (error) {
        console.log('Error cargando logo:', error);
      }
    };

    fetchLogo();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, logoAnim]);

  return (
    <ImageBackground
      source={require('../../assets/imagen/fondo.png')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Animated.Image
          source={require('../../assets/imagen/general.png')}
          style={[
            styles.logoI,
            {
              opacity: logoAnim,
              transform: [
                {
                  translateY: logoAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [-40, 0],
                  }),
                },
              ],
            },
          ]}
          resizeMode="contain"
        />

        {/* Logo dinámico (UNIDOS) */}
        <Image
          source={
            logoUrl
              ? { uri: logoUrl }
              : require('../../assets/imagen/unidos.png') // fallback
          }
          style={styles.unidos}
          resizeMode="contain"
        />

        <Text style={styles.footer}>© IEANJESUS ECUADOR · 2025</Text>
      </View>
    </ImageBackground>
  );
}

const screenHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  logoI: {
    width: '100%',
    height: screenHeight * 0.45,
    marginTop: 160,
  },
  unidos: {
    width: 180,
    height: 200,
    marginTop: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: '#000',
  },
});
