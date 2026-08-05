import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons'; 
// Se não usar Expo, altere para: import Feather from 'react-native-vector-icons/Feather';

export default function Perfil() {
  return (
    <ScrollView style={styles.container}>
      {/* Cabeçalho do Perfil */}
      <View style={styles.header}>
        <View style={styles.avatarBorder}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.nome}>Lucas</Text>
        <Text style={styles.tag}>Cliente LJLK Sports</Text>
      </View>

      {/* Cartão de Membro / Fidelidade */}
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Status do Cliente</Text>
          <Feather name="award" size={20} color="#E50914" />
        </View>
        <Text style={styles.cardStatus}>Membro VIP</Text>
        <Text style={styles.cardSubtext}>Plano Anual - LJLK Sports</Text>
      </View>

      {/* Opções da Conta */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Minha Conta</Text>

        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemMenuLeft}>
            <Feather name="user" size={20} color="#E50914" />
            <Text style={styles.itemText}>Editar Dados</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemMenuLeft}>
            <Feather name="shopping-bag" size={20} color="#E50914" />
            <Text style={styles.itemText}>Meus Pedidos</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemMenuLeft}>
            <Feather name="settings" size={20} color="#E50914" />
            <Text style={styles.itemText}>Configurações</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Botão Sair */}
      <TouchableOpacity style={styles.botaoSair}>
        <Feather name="log-out" size={20} color="#FFFFFF" />
        <Text style={styles.textoBotaoSair}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo Preto Principal
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarBorder: {
    padding: 3,
    backgroundColor: '#E50914', // Borda Vermelha no Avatar
    borderRadius: 50,
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF', // Texto Branco
  },
  tag: {
    fontSize: 14,
    color: '#E50914', // Vermelho Esportivo
    fontWeight: '600',
    marginTop: 4,
  },
  cardInfo: {
    backgroundColor: '#1E1E1E', // Preto Secundário (Card)
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#E50914', // Detalhe Vermelho Lateral
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 12,
    color: '#AAAAAA',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  cardStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardSubtext: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
  },
  secao: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  secaoTitulo: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginVertical: 8,
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  itemMenuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: '#E50914', // Botão Vermelho Sólido
    borderRadius: 12,
    marginBottom: 40,
  },
  textoBotaoSair: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});