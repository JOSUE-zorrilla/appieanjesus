import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;

const librosAntiguo = [
  { nombre: "GÉNESIS", id: "GEN" }, { nombre: "ÉXODO", id: "EXO" },
  { nombre: "LEVÍTICO", id: "LEV" }, { nombre: "NUMEROS", id: "NUM" },
  { nombre: "DEUTERONOMIO", id: "DEU" }, { nombre: "JOSUE", id: "JOS" },
  { nombre: "JUECES", id: "JDG" }, { nombre: "RUT", id: "RUT" },
  { nombre: "1 SAMUEL", id: "1SA" }, { nombre: "2 SAMUEL", id: "2SA" },
  { nombre: "1 REYES", id: "1KI" }, { nombre: "2 REYES", id: "2KI" },
  { nombre: "1 CRONICAS", id: "1CH" }, { nombre: "2 CRONICAS", id: "2CH" },
  { nombre: "ESDRAS", id: "EZR" }, { nombre: "NEHEMIAS", id: "NEH" },
  { nombre: "ESTER", id: "EST" }, { nombre: "JOB", id: "JOB" },
  { nombre: "SALMOS", id: "PSA" }, { nombre: "PROVERBIOS", id: "PRO" },
  { nombre: "ECLESIASTES", id: "ECC" }, { nombre: "CANTARES", id: "SNG" },
  { nombre: "ISAIAS", id: "ISA" }, { nombre: "JEREMIAS", id: "JER" },
  { nombre: "LAMENTACIONES", id: "LAM" }, { nombre: "EZEQUIEL", id: "EZK" },
  { nombre: "DANIEL", id: "DAN" }, { nombre: "OSEAS", id: "HOS" },
  { nombre: "JOEL", id: "JOL" }, { nombre: "AMOS", id: "AMO" },
  { nombre: "ABDIAS", id: "OBA" }, { nombre: "JONAS", id: "JON" },
  { nombre: "MIQUEAS", id: "MIC" }, { nombre: "NAHUM", id: "NAM" },
  { nombre: "HABACUC", id: "HAB" }, { nombre: "SOFONIAS", id: "ZEP" },
  { nombre: "HAGEO", id: "HAG" }, { nombre: "ZACARIAS", id: "ZEC" },
  { nombre: "MALAQUIAS", id: "MAL" }
];

const librosNuevo = [
  { nombre: "SAN MATEO", id: "MAT" }, { nombre: "SAN MARCOS", id: "MRK" },
  { nombre: "SAN LUCAS", id: "LUK" }, { nombre: "SAN JUAN", id: "JHN" },
  { nombre: "HECHOS", id: "ACT" }, { nombre: "ROMANOS", id: "ROM" },
  { nombre: "1 CORINTIOS", id: "1CO" }, { nombre: "2 CORINTIOS", id: "2CO" },
  { nombre: "GALATAS", id: "GAL" }, { nombre: "EFESIOS", id: "EPH" },
  { nombre: "FILIPENSES", id: "PHP" }, { nombre: "COLOSENSES", id: "COL" },
  { nombre: "1 TESALONICENSES", id: "1TH" }, { nombre: "2 TESALONICENSES", id: "2TH" },
  { nombre: "1 TIMOTEO", id: "1TI" }, { nombre: "2 TIMOTEO", id: "2TI" },
  { nombre: "TITO", id: "TIT" }, { nombre: "FILEMON", id: "PHM" },
  { nombre: "HEBREOS", id: "HEB" }, { nombre: "SANTIAGO", id: "JAS" },
  { nombre: "1 PEDRO", id: "1PE" }, { nombre: "2 PEDRO", id: "2PE" },
  { nombre: "1 JUAN", id: "1JN" }, { nombre: "2 JUAN", id: "2JN" },
  { nombre: "3 JUAN", id: "3JN" }, { nombre: "JUDAS", id: "JUD" },
  { nombre: "APOCALIPSIS", id: "REV" }
];

const Biblia = ({ navigation }: Props) => {
  const [testamento, setTestamento] = useState('antiguo');
  const libros = testamento === 'antiguo' ? librosAntiguo : librosNuevo;

  const renderLibro = ({ item }: { item: { nombre: string; id: string } }) => (
    <TouchableOpacity
      style={styles.libro}
      onPress={() =>
        navigation.navigate('Capitulos', {
          bookId: item.id,
          nombreLibro: item.nombre
        })
      }
    >
      <Text style={styles.libroTexto}>{item.nombre}</Text>
      <Ionicons name="chevron-forward" size={20} color="#001f54" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
     <View style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={24} color="#001f54" />
  </TouchableOpacity>

  <Text style={styles.titulo}>SANTA BIBLIA</Text>

  <TouchableOpacity onPress={() => navigation.navigate('Buscar')}>
    <Ionicons name="search" size={20} color="#001f54" />
  </TouchableOpacity>
</View>

      {/* Tabs */}
      <View style={styles.tabs}>
        <TouchableOpacity
          style={[styles.tab, testamento === 'antiguo' && styles.tabActivo]}
          onPress={() => setTestamento('antiguo')}
        >
          <Text style={[styles.tabTexto, testamento === 'antiguo' && styles.tabTextoActivo]}>ANTIGUO TESTAMENTO</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, testamento === 'nuevo' && styles.tabActivo]}
          onPress={() => setTestamento('nuevo')}
        >
          <Text style={[styles.tabTexto, testamento === 'nuevo' && styles.tabTextoActivo]}>NUEVO TESTAMENTO</Text>
        </TouchableOpacity>
     


      </View>
  
      {/* Lista de libros */}
      <FlatList
        data={libros}
        keyExtractor={(item) => item.id}
        renderItem={renderLibro}
        contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerTexto}>© IEANJESUS ECUADOR - 2025</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f4f7fc' },
  header: {
    padding: 15,
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  
iconSearchSmall: {
  position: 'absolute',
  right: 20,
  top: 10,
  padding: 6,
},
  titulo: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#001f54',
    marginTop: 30,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  tabActivo: {
    backgroundColor: '#001f54',
  },
  tabTexto: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#001f54',
  },
  tabTextoActivo: {
    color: '#fff',
  },
  libro: {
    backgroundColor: '#dce7fc',
    borderRadius: 10,
    padding: 16,
    marginVertical: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  libroTexto: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#001f54',
  },
  footer: {
    backgroundColor: '#001f54',
    padding: 30,
    alignItems: 'center',
  },
  footerTexto: {
    color: '#fff',
    fontSize: 12,
  },
  iconBox: {
  backgroundColor: '#001f54',
  padding: 16,
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center',
  margin: 8,
  elevation: 3,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},

iconText: {
  color: 'white',
  fontSize: 14,
  marginTop: 6,
  fontWeight: 'bold',
  textAlign: 'center',
},
searchBox: {
  backgroundColor: '#001f54',
  borderRadius: 20,
  paddingVertical: 24,
  paddingHorizontal: 30,
  margin: 12,
  alignItems: 'center',
  justifyContent: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.2,
  shadowRadius: 4,
},

searchText: {
  color: '#fff',
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: 8,
},

});

export default Biblia;
