import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

export default function CrearNoticiaScreen() {
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [texto, setTexto] = useState('');
  const [fecha, setFecha] = useState('');
  const [imagen, setImagen] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Función para validar formato de fecha
  const validarFecha = (fechaTexto: string) => {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(fechaTexto)) return false;
    
    const date = new Date(fechaTexto);
    return date instanceof Date && !isNaN(date.getTime());
  };

  // Función para formatear la fecha mientras se escribe
  const handleFechaChange = (text: string) => {
    // Eliminar caracteres no numéricos excepto guiones
    let cleaned = text.replace(/[^\d-]/g, '');
    
    // Limitar longitud
    if (cleaned.length > 10) {
      cleaned = cleaned.substring(0, 10);
    }
    
    setFecha(cleaned);
  };

  // Obtener fecha de hoy para el placeholder
  const obtenerFechaHoy = () => {
    const hoy = new Date();
    const year = hoy.getFullYear();
    const month = String(hoy.getMonth() + 1).padStart(2, '0');
    const day = String(hoy.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const seleccionarImagen = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 0.8 }, (response) => {
      if (response.didCancel) return;
      if (response.errorCode) {
        Alert.alert('Error', 'No se pudo seleccionar la imagen');
        return;
      }
      if (response.assets && response.assets[0]) {
        setImagen(response.assets[0]);
        console.log('✅ Imagen seleccionada:', response.assets[0]);
      }
    });
  };

  const enviarNoticia = async () => {
    // Validaciones
    if (!titulo.trim()) {
      Alert.alert('Error', 'El título es obligatorio');
      return;
    }
    
    if (!texto.trim()) {
      Alert.alert('Error', 'El contenido es obligatorio');
      return;
    }
    
    if (!fecha.trim()) {
      Alert.alert('Error', 'La fecha del evento es obligatoria');
      return;
    }
    
    if (!validarFecha(fecha)) {
      Alert.alert('Error', 'Formato de fecha inválido. Usa AAAA-MM-DD (ejemplo: 2025-12-31)');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('titulo', titulo.trim());
    formData.append('texto', texto.trim());
    formData.append('fecha', fecha.trim());

    if (imagen) {
      formData.append('imagen', {
        uri: imagen.uri,
        type: imagen.type || 'image/jpeg',
        name: imagen.fileName || 'noticia.jpg',
      } as any);
    }

    try {
      console.log('📤 Enviando noticia con imagen...');
      const response = await fetch(
        'https://ieanjesus.org.ec/sistemacomites/api/noticias_crear.php',
        {
          method: 'POST',
          body: formData,
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const json = await response.json();
      console.log('✅ Respuesta del servidor:', json);

      if (json.status === 'success') {
        Alert.alert(
          '¡Enviado!',
          'Tu noticia ha sido enviada para revisión y será publicada una vez aprobada.',
          [
            {
              text: 'OK',
              onPress: () => {
                setTitulo('');
                setTexto('');
                setFecha('');
                setImagen(null);
                navigation.goBack();
              },
            },
          ]
        );
      } else {
        Alert.alert('Error', json.message || 'No se pudo enviar la noticia');
      }
    } catch (error) {
      console.error('❌ Error:', error);
      Alert.alert('Error', 'Error de conexión. Verifica tu internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="arrow-left" size={18} color="#002C73" />
        </TouchableOpacity>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>CREAR NOTICIA</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <View style={styles.infoBox}>
          <Icon name="info-circle" size={20} color="#002C73" />
          <Text style={styles.infoText}>
            Tu noticia será revisada por un administrador antes de publicarse.
          </Text>
        </View>

        <Text style={styles.label}>Título de la noticia *</Text>
        <TextInput
          style={styles.input}
          placeholder="Escribe un título llamativo"
          value={titulo}
          onChangeText={setTitulo}
          maxLength={150}
        />

        <Text style={styles.label}>Fecha del evento *</Text>
        <View style={styles.fechaContainer}>
          <Icon name="calendar-alt" size={20} color="#002C73" style={styles.fechaIcon} />
          <TextInput
            style={[styles.input, styles.fechaInput]}
            placeholder={`Ejemplo: ${obtenerFechaHoy()}`}
            value={fecha}
            onChangeText={handleFechaChange}
            maxLength={10}
            keyboardType="numeric"
          />
        </View>
        <Text style={styles.helperText}>
          Formato: AAAA-MM-DD (Año-Mes-Día)
        </Text>

        <Text style={styles.label}>Contenido *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escribe aquí el contenido completo de la noticia..."
          value={texto}
          onChangeText={setTexto}
          multiline
          numberOfLines={10}
          textAlignVertical="top"
        />

        <Text style={styles.label}>Imagen (opcional)</Text>
        <TouchableOpacity style={styles.imageButton} onPress={seleccionarImagen}>
          <Icon name="image" size={20} color="#002C73" />
          <Text style={styles.imageButtonText}>Seleccionar imagen desde galería</Text>
        </TouchableOpacity>

        {imagen && (
          <View style={styles.imagePreview}>
            <Image source={{ uri: imagen.uri }} style={styles.imagePreviewImg} />
            <TouchableOpacity onPress={() => setImagen(null)} style={styles.removeImageBtn}>
              <Icon name="times-circle" size={28} color="#dc3545" />
            </TouchableOpacity>
          </View>
        )}

        <TouchableOpacity
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={enviarNoticia}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Icon name="paper-plane" size={18} color="#fff" />
              <Text style={styles.submitButtonText}>Enviar para Revisión</Text>
            </>
          )}
        </TouchableOpacity>

        <Text style={styles.nota}>
          * Campos obligatorios
        </Text>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© IEANJESUS ECUADOR - 2025</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9f9f9' },
  headerContainer: {
    backgroundColor: '#002C73',
    paddingTop: 95,
    paddingBottom: 16,
    paddingHorizontal: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCenter: {
    position: 'absolute',
    top: 43,
    left: 10,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 16,
    width: 40,
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  scrollView: { flex: 1 },
  content: { padding: 20, paddingBottom: 40 },
  infoBox: {
    flexDirection: 'row',
    backgroundColor: '#e7f3ff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 13,
    color: '#002C73',
    marginLeft: 10,
    flex: 1,
  },
  label: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#002C73', 
    marginBottom: 8,
    marginTop: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    marginBottom: 5,
  },
  fechaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  fechaIcon: {
    position: 'absolute',
    left: 12,
    zIndex: 1,
  },
  fechaInput: {
    flex: 1,
    paddingLeft: 45,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 15,
    marginLeft: 5,
  },
  textArea: { 
    height: 180,
    marginBottom: 20,
  },
  imageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#002C73',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  imageButtonText: { marginLeft: 10, color: '#002C73', fontWeight: 'bold' },
  imagePreview: {
    position: 'relative',
    marginBottom: 20,
  },
  imagePreviewImg: {
    width: '100%',
    height: 220,
    borderRadius: 8,
  },
  removeImageBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 2,
  },
  submitButton: {
    backgroundColor: '#002C73',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
  },
  submitButtonDisabled: { opacity: 0.6 },
  submitButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginLeft: 10 
  },
  nota: { 
    textAlign: 'center', 
    color: '#666', 
    fontSize: 13, 
    fontStyle: 'italic', 
    marginTop: 10 
  },
  footer: {
    backgroundColor: '#002C73',
    padding: 30,
    alignItems: 'center',
  },
  footerText: { color: '#fff', fontSize: 12 },
});