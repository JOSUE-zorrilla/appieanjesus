import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import PaisesScreen from './src/screens/PaisesScreens';
import SplashScreen from './src/screens/SplashScreen';
import TVOnlineScreen from './src/screens/TVOnlineScreen'; // ajusta ruta si es necesario
import RadioOnlineScreen from './src/screens/RadioOnlineScreen';
import Biblia from './src/screens/Biblia'; // ajusta ruta si es necesario
 // ajusta ruta si es necesario
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Paises" component={PaisesScreen} />
         <Stack.Screen
    name="TVOnline"
    component={TVOnlineScreen}
    options={{ headerShown: false }}
  />
        <Stack.Screen
          name="RadioOnline"
          component={RadioOnlineScreen}
          options={{ headerShown: false }}
        />
         <Stack.Screen name="Biblia" component={Biblia} />
      </Stack.Navigator>
     
    </NavigationContainer>
  );
}
