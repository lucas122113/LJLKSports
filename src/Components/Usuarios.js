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
        // Formulário de Edição (exibido apenas quando um usuário é selecionado)
        <View style={styles.formulario}>
          <Text style={styles.subtitulo}>EDITAR USUÁRIO</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome Completo"
            placeholderTextColor="#999"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="CPF"
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

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
            <Text style={styles.textoBotaoBranco}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCancelar} onPress={cancelarEdicao}>
            <Text style={styles.textoBotaoPreto}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Lista de Usuários
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
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
    padding: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
    color: '#000000',
    letterSpacing: 1,
    marginTop: 40,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#D60000',
    textAlign: 'center',
  },
  formulario: {
    borderWidth: 2,
    borderColor: '#000000',
    padding: 20,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
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
    backgroundColor: '#D60000', // Vermelho
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoCancelar: {
    borderWidth: 2,
    borderColor: '#000000',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoBranco: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  textoBotaoPreto: {
    color: '#000000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  cartaoUsuario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  info: {
    flex: 1,
    marginRight: 12,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 14,
    color: '#555555',
  },
  botaoEditar: {
    backgroundColor: '#000000', // Preto
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  textoBotaoEditar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
