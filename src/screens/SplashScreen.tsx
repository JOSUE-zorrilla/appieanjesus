import React, { useEffect, useRef } from 'react';
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

export default function SplashScreen({ navigation }: Props) {
  const logoAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(logoAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Home'); // déjalo comentado por ahora para ver el splash tranquilo
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

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
                    outputRange: [-40, 0], // efecto de deslizamiento suave
                  }),
                },
              ],
            },
          ]}
          resizeMode="contain"
        />
        <Image
          source={require('../../assets/imagen/unidos.png')}
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
