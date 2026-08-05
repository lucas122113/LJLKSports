import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Usuarios() {
  // Lista inicial de usuários aleatórios
  const [usuarios, setUsuarios] = useState([
    { id: '1', nome: 'Ana Souza', CPF: '111.222.333-44', email: 'ana.souza@email.com' },
    { id: '2', nome: 'Lucas Lima', CPF: '555.666.777-88', email: 'lucas.lima@email.com' },
    { id: '3', nome: 'Mariana Costa', CPF: '999.888.777-66', email: 'mariana.costa@email.com' },
    { id: '4', nome: 'Pedro Alves', CPF: '444.555.666-77', email: 'pedro.alves@email.com' },
  ]);

  // Estados para controlar a edição
  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [email, setEmail] = useState('');

  // Máscara de CPF
  const formatarCPF = (texto) => {
    if (!texto) {
      setCPF('');
      return;
    }
    const apenasNumeros = texto.replace(/\D/g, '');
    const cpfFormatado = apenasNumeros
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
    setCPF(cpfFormatado);
  };

  // Ativa o modo de edição para o usuário selecionado
  const iniciarEdicao = (usuario) => {
    setEditandoId(usuario.id);
    setNome(usuario.nome);
    setCPF(usuario.CPF);
    setEmail(usuario.email);
  };

  // Salva as alterações na lista
  const salvarAlteracoes = () => {
    if (!nome || !CPF || !email) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    setUsuarios(
      usuarios.map((u) =>
        u.id === editandoId ? { ...u, nome, CPF, email } : u
      )
    );

    // Limpa o formulário e sai do modo de edição
    setEditandoId(null);
    setNome('');
    setCPF('');
    setEmail('');
  };

  // Cancela a edição
  const cancelarEdicao = () => {
    setEditandoId(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LISTA DE USUÁRIOS</Text>

      {editandoId ? (
        // Formulário de Edição
        <View style={styles.formulario}>
          <Text style={styles.subtitulo}>EDITAR USUÁRIO</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#888888"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
            placeholderTextColor="#888888"
            value={CPF}
            onChangeText={formatarCPF}
            keyboardType="numeric"
            maxLength={14}
          />

          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#888888"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
            <Text style={styles.textoBotaoBranco}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCancelar} onPress={cancelarEdicao}>
            <Text style={styles.textoBotaoCancelar}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Lista de Usuários
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.cartaoUsuario}>
              <View style={styles.info}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.detalhe}>CPF: {item.CPF}</Text>
                <Text style={styles.detalhe}>E-mail: {item.email}</Text>
              </View>

              <TouchableOpacity
                style={styles.botaoEditar}
                onPress={() => iniciarEdicao(item)}
              >
                <Text style={styles.textoBotaoEditar}>EDITAR</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Fundo preto escuro
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E50914', // Vermelho destaque
    letterSpacing: 1.5,
    marginTop: 20,
    textTransform: 'uppercase',
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#E50914',
    textAlign: 'center',
    letterSpacing: 1,
  },
  formulario: {
    backgroundColor: '#1E1E1E', // Preto levemente destacado
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E50914', // Borda vermelha
  },
  input: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#333333',
    color: '#FFFFFF', // Texto digitado em branco
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 15,
  },
  botaoSalvar: {
    backgroundColor: '#E50914', // Botão vermelho principal
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoCancelar: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF', // Borda branca
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoBranco: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  textoBotaoCancelar: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
  cartaoUsuario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1E1E1E',
    borderLeftWidth: 4,
    borderLeftColor: '#E50914', // Borda lateral em vermelho
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  nome: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#FFFFFF', // Nome em branco
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 13,
    color: '#B0B0B0', // Cinza claro para os detalhes
    marginTop: 2,
  },
  botaoEditar: {
    backgroundColor: '#E50914', // Botão de ação em vermelho
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  textoBotaoEditar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 13,
  },
})