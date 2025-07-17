import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type VersiculoCompletoProps = NativeStackScreenProps<RootStackParamList, 'VersiculoCompleto'>;

const VersiculoCompletoScreen: React.FC<VersiculoCompletoProps> = ({ route, navigation }) => {
  const { chapterId, scrollToVerse } = route.params;
  const [htmlContent, setHtmlContent] = useState('');
  const [loading, setLoading] = useState(true);

  const apiKey = '16b34c39df2dcad9645a86860ecd37d1';
  const bibleId = '592420522e16049f-01';

  useEffect(() => {
    fetch(`https://api.scripture.api.bible/v1/bibles/${bibleId}/chapters/${chapterId}`, {
      headers: { 'api-key': apiKey }
    })
      .then(res => res.json())
      .then(json => {
        if (json.data && json.data.content) {
          const htmlConEstilo = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <style>
                  body {
                    font-family: 'Segoe UI', sans-serif;
                    background-color: #f4f7fc;
                    color: #1a1a1a;
                    padding: 16px 24px 80px 24px;
                    font-size: 22px;
                    line-height: 1.8;
                    text-shadow: 0.3px 0.3px 0.3px rgba(0,0,0,0.1);
                  }
                  footer {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    background-color: #001f54;
                    color: white;
                    text-align: center;
                    padding: 30px;
                    font-size: 14px;
                  }
                  span[data-number] {
                    font-weight: bold;
                    color: #0d6efd;
                    margin-right: 6px;
                  }
                  span.highlight {
                    background-color: #ffeeba;
                    border-radius: 4px;
                    padding: 2px 4px;
                  }
                  p + p {
                    border-bottom: 1px dashed #ccc;
                    padding-bottom: 12px;
                  }
                </style>
                <script>
                  document.addEventListener("DOMContentLoaded", function() {
                    const versiculo = document.querySelector('span[data-number="${scrollToVerse || ''}"]');
                    if (versiculo) {
                      setTimeout(() => {
                        versiculo.scrollIntoView({ behavior: "smooth", block: "center" });
                        versiculo.classList.add("highlight");
                      }, 300);
                    }
                  });
                </script>
              </head>
              <body>
                ${json.data.content}
                <footer>© IEANJESUS ECUADOR - 2025</footer>
              </body>
            </html>
          `;
          setHtmlContent(htmlConEstilo);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [chapterId]);

  return (
    <View style={{ flex: 1 }}>
      {/* Header Fijo con Flecha */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{chapterId.replace('.', ' ')}</Text>
        <View style={{ width: 24 }} />
      </View>

      {/* Contenido */}
      {loading ? (
        <ActivityIndicator size="large" color="#001f54" style={{ marginTop: 40 }} />
      ) : (
        <WebView originWhitelist={['*']} source={{ html: htmlContent }} style={{ flex: 1 }} />
      )}
    </View>
  );
};

export default VersiculoCompletoScreen;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#001f54',
    paddingTop: 50,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 4,
    zIndex: 1,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
