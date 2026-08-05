import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linked, Linking } from 'react-native';

export default function FaleConosco() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>FALE CONOSCO</Text>
      <Text style={styles.subtitulo}>Estamos aqui para ajudar você!</Text>

      {/* Cartão de Canais de Atendimento */}
      <View style={styles.card}>
        
        {/* Telefone / WhatsApp */}
        <TouchableOpacity 
          style={styles.item}
          onPress={() => Linking.openURL('tel:2199999999')}
        >
          <Text style={styles.icone}>📞</Text>
          <View style={styles.info}>
            <Text style={styles.rotulo}>TELEFONE / WHATSAPP</Text>
            <Text style={styles.valor}>(21) 9999-9999</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* E-mail Comercial */}
        <TouchableOpacity 
          style={styles.item}
          onPress={() => Linking.openURL('mailto:contato@ljlksports.com')}
        >
          <Text style={styles.icone}>📧</Text>
          <View style={styles.info}>
            <Text style={styles.rotulo}>E-MAIL COMERCIAL</Text>
            <Text style={styles.valor}>contato@ljlksports.com</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* E-mail de Suporte */}
        <TouchableOpacity 
          style={styles.item}
          onPress={() => Linking.openURL('mailto:SuporteLJKLSports@gmail.com')}
        >
          <Text style={styles.icone}>🛠️</Text>
          <View style={styles.info}>
            <Text style={styles.rotulo}>SUPORTE TÉCNICO</Text>
            <Text style={styles.valor}>SuporteLJKLSports@gmail.com</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.divisor} />

        {/* Localização */}
        <View style={styles.item}>
          <Text style={styles.icone}>📍</Text>
          <View style={styles.info}>
            <Text style={styles.rotulo}>LOCALIZAÇÃO</Text>
            <Text style={styles.valor}>Rio de Janeiro - RJ</Text>
            <Text style={styles.subValor}>Maracanã</Text>
          </View>
        </View>

      </View>

      <Text style={styles.rodape}>LJLK Sports © 2026</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo preto escuro
    padding: 24,
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#E50914', // Vermelho destaque
    textAlign: 'center',
    letterSpacing: 1.5,
  },
  subtitulo: {
    fontSize: 14,
    color: '#B0B0B0', // Cinza para o subtítulo
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 28,
  },
  card: {
    backgroundColor: '#1E1E1E', // Preto levente mais claro para dar contraste
    borderRadius: 12,
    padding: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#E50914', // Detalhe lateral em vermelho
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  icone: {
    fontSize: 22,
    marginRight: 16,
  },
  info: {
    flex: 1,
  },
  rotulo: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#E50914', // Rótulo em vermelho
    letterSpacing: 1,
    marginBottom: 2,
  },
  valor: {
    fontSize: 15,
    color: '#FFFFFF', // Texto principal em branco
    fontWeight: '500',
  },
  subValor: {
    fontSize: 13,
    color: '#B0B0B0',
    marginTop: 1,
  },
  divisor: {
    height: 1,
    backgroundColor: '#2A2A2A', // Linha sutil de separação
    marginVertical: 6,
  },
  rodape: {
    marginTop: 30,
    textAlign: 'center',
    color: '#555555',
    fontSize: 12,
    fontWeight: 'bold',
  },
})