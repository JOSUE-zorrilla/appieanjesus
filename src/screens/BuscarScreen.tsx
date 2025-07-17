// src/screens/BuscarScreen.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const bibleId = '592420522e16049f-01';
const apiKey = '16b34c39df2dcad9645a86860ecd37d1';

const BuscarScreen = ({ navigation }: any) => {
  const [query, setQuery] = useState('');
  const [resultados, setResultados] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const buscar = () => {
    if (!query.trim()) return;
    setLoading(true);
    fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/search?query=${encodeURIComponent(query)}`, {
      headers: { 'api-key': apiKey },
    })
      .then(res => res.json())
      .then(json => {
        setResultados(json.data.verses || []);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#001f54" />
        </TouchableOpacity>
        <Text style={styles.title}>BUSCAR PALABRA</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.searchBar}>
        <TextInput
          placeholder="Ej: amor, Cristo, fe..."
          style={styles.input}
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={buscar}
        />
        <TouchableOpacity onPress={buscar}>
          <Ionicons name="search" size={24} color="#001f54" />
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator color="#001f54" style={{ marginTop: 20 }} />
      ) : (
        <FlatList
          data={resultados}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.resultado}
              onPress={() => {
                navigation.navigate('VersiculoCompleto', {
                  chapterId: item.chapterId,
                  scrollToVerse: item.reference.split(':')[1] || '1',
                });
              }}
            >
              <Text style={styles.ref}>{item.reference}</Text>
              <Text style={styles.texto}>{item.text}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={{ padding: 16 }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7fc' },
  header: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#001f54' },
  searchBar: {
    marginTop: 20,
    marginHorizontal: 16,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 12,
    alignItems: 'center',
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    fontSize: 16,
    color: '#001f54',
  },
  resultado: {
    backgroundColor: '#e4ecfa',
    padding: 14,
    borderRadius: 10,
    marginBottom: 12,
  },
  ref: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    color: '#001f54',
  },
  texto: { fontSize: 15, color: '#333' },
});

export default BuscarScreen;
