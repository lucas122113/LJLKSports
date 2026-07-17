import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function CadastroUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const formatarCPF = (texto) => {
    if (!texto) {
      setCPF('');
      return;
    }

    const apenasNumeros = text.replace(/\D/g, '');
    
    const cpfFormatado = apenasNumeros
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    setCPF(cpfFormatado);
  };

  const lidarComSalvar = () => {
    console.log('Dados do Usuário Salvos:', { nome, CPF, email, senha });
  };

  const irParaProdutos = () => {
    navigation.navigate('Produtos');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>CADASTRO DE USUÁRIO</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome Completo"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="CPF (000.000.000-00)"
        placeholderTextColor="#999"
        value={CPF}
        onChangeText={formatarCPF}
        keyboardType="numeric"
        maxLength={14}
      />

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry={true}
      />

      {/* Botão Salvar (Vermelho) */}
      <TouchableOpacity style={styles.botaoSalvar} onPress={lidarComSalvar}>
        <Text style={styles.textoBotaoSalvar}>SALVAR</Text>
      </TouchableOpacity>

      {/* Botão Ir Para Produtos (Preto) */}
      <TouchableOpacity style={styles.botaoProdutos} onPress={irParaProdutos}>
        <Text style={styles.textoBotaoProdutos}>IR PARA PRODUTOS →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#000000',
    letterSpacing: 1,
  },
  input: {
    borderWidth: 2,
    borderColor: '#000000',
    color: '#000000',
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#FFFFFF',
  },
  botaoSalvar: {
    backgroundColor: '#D60000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  botaoProdutos: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 14,
  },
  textoBotaoProdutos: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
});