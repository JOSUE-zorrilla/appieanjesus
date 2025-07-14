import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Capitulos: { bookId: string; nombreLibro: string };
  Biblia: undefined
};

type Props = NativeStackScreenProps<RootStackParamList, 'Capitulos'>;


const CapitulosScreen = ({ route, navigation }: Props) => {
  const { bookId, nombreLibro } = route.params;
const [capitulos, setCapitulos] = useState<Capitulo[]>([]);

  const [loading, setLoading] = useState(true);

  const bibleId = '592420522e16049f-01';
  const apiKey = '16b34c39df2dcad9645a86860ecd37d1';
interface Capitulo {
  id: string;
  bibleId: string;
  bookId: string;
  number: string;
  reference: string;
}

  useEffect(() => {
    fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/books/${bookId}/chapters`, {
      headers: { 'api-key': apiKey }
    })
      .then(res => res.json())
      .then(json => {
  const capitulosFiltrados = (json.data as Capitulo[]).filter((ch) => ch.number !== 'intro');


        setCapitulos(capitulosFiltrados);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
      });
  }, [bookId]);

 const renderItem = ({ item }: { item: Capitulo }) => (
  <TouchableOpacity style={styles.capitulo}>
    <Text style={styles.capituloTexto}>Capítulo {item.number}</Text>
    <Ionicons name="chevron-forward" size={20} color="#001f54" />
  </TouchableOpacity>
);

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
          data={capitulos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 20 }}
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
  capitulo: {
    backgroundColor: '#dce7fc',
    borderRadius: 10,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capituloTexto: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#001f54',
  },
  
});

export default CapitulosScreen;
