import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<any, any>;

const librosAntiguo = [
  "GENESIS", "EXODO", "LEVITICO", "NUMEROS", "DEUTERONOMIO",
  "JOSUE", "JUECES", "RUT", "1 SAMUEL", "2 SAMUEL",
  "1 REYES", "2 REYES", "1 CRONICAS", "2 CRONICAS", "ESDRAS",
  "NEHEMIAS", "ESTER", "JOB", "SALMOS", "PROVERBIOS",
  "ECLESIASTES", "CANTARES", "ISAIAS", "JEREMIAS", "LAMENTACIONES",
  "EZEQUIEL", "DANIEL", "OSEAS", "JOEL", "AMOS",
  "ABDIAS", "JONAS", "MIQUEAS", "NAHUM", "HABACUC",
  "SOFONIAS", "HAGEO", "ZACARIAS", "MALAQUIAS"
];

const librosNuevo = [
  "SAN MATEO", "SAN MARCOS", "SAN LUCAS", "SAN JUAN", "HECHOS",
  "ROMANOS", "1 CORINTIOS", "2 CORINTIOS", "GALATAS", "EFESIOS",
  "FILIPENSES", "COLOSENSES", "1 TESALONICENSES", "2 TESALONICENSES", "1 TIMOTEO",
  "2 TIMOTEO", "TITO", "FILEMON", "HEBREOS", "SANTIAGO",
  "1 PEDRO", "2 PEDRO", "1 JUAN", "2 JUAN", "3 JUAN",
  "JUDAS", "APOCALIPSIS"
];

const Biblia = ({ navigation }: Props) => {
  const [testamento, setTestamento] = useState('antiguo');

  const libros = testamento === 'antiguo' ? librosAntiguo : librosNuevo;

  const renderLibro = ({ item }: { item: string }) => (
    <TouchableOpacity style={styles.libro}>
      <Text style={styles.libroTexto}>{item}</Text>
      <Ionicons name="chevron-forward" size={20} color="#001f54" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={{ marginTop: 30 }}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Ionicons name="arrow-back" size={24} color="#001f54" />
  </TouchableOpacity>
</View>

        <Text style={styles.titulo}>SANTA BIBLIA</Text>
        <View style={{ width: 24 }} />
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

      {/* Lista */}
      <FlatList
        data={libros}
        keyExtractor={(item, index) => index.toString()}
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
  backgroundColor: '#fff', // <-- CAMBIA esto si es necesario
},
tabActivo: {
  backgroundColor: '#001f54',
},
tabTexto: {
  fontWeight: 'bold',
  fontSize: 12,
  color: '#001f54', // <-- por defecto texto azul
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
});

export default Biblia;
