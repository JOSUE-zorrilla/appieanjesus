import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Animated,
  Image,
  StyleSheet,
  Text,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any>;

// URL de la API
const LOGO_API_URL =
  'https://ieanjesus.org.ec/sistemacomites/api/logo.php?iddepartamento=201';

export default function SplashScreen({ navigation }: Props) {
  const logoAnim = useRef(new Animated.Value(0)).current;
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cargar logo desde API primero
    const fetchLogo = async () => {
      try {
        console.log('🔍 [SPLASH] Cargando logo desde API...');
        const response = await fetch(LOGO_API_URL);
        const json = await response.json();
        
        console.log('📦 [SPLASH] Respuesta completa:', JSON.stringify(json, null, 2));
        
        // ✅ Corregido: Buscar imagen_splash_url directamente
        if (json.status === 'success' && json.data && json.data.imagen_splash_url) {
          console.log('✅ [SPLASH] Logo cargado:', json.data.imagen_splash_url);
          setLogoUrl(json.data.imagen_splash_url);
        } else {
          console.log('⚠️ [SPLASH] No se encontró logo splash');
        }
      } catch (error) {
        console.log('❌ [SPLASH] Error:', error);
      } finally {
        setLoading(false);
        
        // Iniciar animación después de cargar
        Animated.timing(logoAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }).start();
      }
    };

    fetchLogo();

    // Navegar a Home después de 3 segundos
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
        {/* Logo general (local) */}
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

        {/* Logo dinámico desde API */}
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#002C73" />
            <Text style={styles.loadingText}>Cargando...</Text>
          </View>
        ) : logoUrl ? (
          <Animated.Image
            source={{ uri: logoUrl }}
            style={[
              styles.unidos,
              {
                opacity: logoAnim,
              },
            ]}
            resizeMode="contain"
            onError={(error) => {
              console.log('❌ [SPLASH] Error cargando imagen:', error.nativeEvent.error);
            }}
            onLoad={() => {
              console.log('✅ [SPLASH] Imagen renderizada correctamente');
            }}
          />
        ) : (
          <Image
            source={require('../../assets/imagen/unidos.png')}
            style={styles.unidos}
            resizeMode="contain"
          />
        )}

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
  loadingContainer: {
    width: 180,
    height: 200,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    color: '#002C73',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    fontSize: 14,
    color: '#000',
  },
});