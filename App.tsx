import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from './src/screens/HomeScreen';
import PaisesScreen from './src/screens/PaisesScreens';
import SplashScreen from './src/screens/SplashScreen';
import TVOnlineScreen from './src/screens/TVOnlineScreen'; // ajusta ruta si es necesario
import RadioOnlineScreen from './src/screens/RadioOnlineScreen';
import Biblia from './src/screens/Biblia'; 
import CapitulosScreen from './src/screens/CapitulosScreen'; 
import EventosScreen from './src/screens/EventosScreen'; // ajusta ruta si es necesario
import CalendarioEventosScreen from './src/screens/calendarioEventosScreen'; 
import { RootStackParamList } from './src/screens/types'; // ajusta si está en otra ruta
import VersiculosScreen from './src/screens/VersiculosScreen'; // ajusta ruta si es necesario
import VersiculoCompletoScreen from './src/screens/versiculosCompletosScreem'; // ajusta ruta si es necesario
import BuscarScreen from './src/screens/BuscarScreen';
import RecursosGraficosScreen from './src/screens/RecursosGraficosScreen';
import MusicaScreen from './src/screens/MusicaScreen';
import NoticiasScreen from './src/screens/NoticiasScreen';
import NacionaScreen from './src/screens/NacionaScreen';
import DirectorioNacionalScreen from './src/screens/DirectorioNacionalScreen';
import CrearNoticiaScreen from './src/screens/CrearNoticiasScreen';


// ajusta ruta si es necesario
 // ajusta ruta si es necesario
// ajusta ruta si es necesario

 // ajusta ruta si es necesario
const Stack = createNativeStackNavigator<RootStackParamList>();


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Paises" component={PaisesScreen} />
        <Stack.Screen name="Buscar" component={BuscarScreen} />

        
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
        
        <Stack.Screen name="Eventos" component={EventosScreen} />
        <Stack.Screen name="CalendarioEventos" component={CalendarioEventosScreen} />
        <Stack.Screen name="Capitulos" component={CapitulosScreen} />
        <Stack.Screen name="Versiculos" component={VersiculosScreen} />
        <Stack.Screen name="VersiculoCompleto" component={VersiculoCompletoScreen} />
        <Stack.Screen name="RecursosGraficos" component={RecursosGraficosScreen} />
        <Stack.Screen name="Musica"  component={MusicaScreen} options={{ headerShown: false }} />
        <Stack.Screen name="noticias" component={NoticiasScreen} />
        <Stack.Screen name="nacional" component= {NacionaScreen} />
        <Stack.Screen   name="DirectorioNacional"  component={DirectorioNacionalScreen}  options={{ title: 'Directorio Nacional' }} />
 
<Stack.Screen   name="CrearNoticia"  component={CrearNoticiaScreen}  options={{ headerShown: false }}
/>

      </Stack.Navigator>

     
    </NavigationContainer>
  );
}
