import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type Props = NativeStackScreenProps<RootStackParamList, 'Versiculos'>;

interface Versiculo {
  id: string;
  reference: string;
  content: string;
}

const bibleId = '592420522e16049f-01';
const apiKey = '16b34c39df2dcad9645a86860ecd37d1';

const VersiculosScreen = ({ route, navigation }: Props) => {
  const { chapterId, nombreLibro } = route.params;

  const [versiculos, setVersiculos] = useState<Versiculo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}/verses`, {
      headers: { 'api-key': apiKey }
    })
      .then(res => res.json())
      .then(json => {
        const versos = json.data.map((v: any) => ({
          id: v.id,
          reference: v.reference,
          content: v.text || ''
        }));
        setVersiculos(versos);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [chapterId]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#001f54" />
        </TouchableOpacity>
        <Text style={styles.titulo}>{nombreLibro.toUpperCase()}</Text>
        <View style={{ width: 24 }} />
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#001f54" style={{ marginTop: 20 }} />
      ) : (
       <FlatList
  key={'grid5'} // 👈 clave estática si numColumns no cambia
  data={versiculos}
  numColumns={5}
  columnWrapperStyle={{ justifyContent: 'flex-start', marginBottom: 12 }}
  contentContainerStyle={{ padding: 16 }}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <TouchableOpacity
      style={styles.versiculoCuadro}
      onPress={() =>
        navigation.navigate('VersiculoCompleto', {
          chapterId,
          scrollToVerse: item.id.split('.').pop()
        })
      }
    >
      <Text style={styles.versiculoNumero}>
        {item.id.split('.').pop()}
      </Text>
    </TouchableOpacity>
  )}
/>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7fc' },
  header: {
    paddingTop: 50,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#001f54',
  },
  versiculo: {
    backgroundColor: '#e4ecfa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  versiculoTexto: {
    fontSize: 16,
    color: '#001f54',
  },
  versiculoCuadro: {
  backgroundColor: '#e4ecfa',
  borderRadius: 8,
  width: 60,
  height: 60,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 4,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 2,
  elevation: 3,
},

versiculoNumero: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#001f54',
},

});

export default VersiculosScreen;
