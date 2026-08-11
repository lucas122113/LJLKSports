import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CHAVE_STORAGE = '@lista_usuarios';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([]);

  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const carregarUsuarios = async () => {
    try {
      const dadosSalvos = await AsyncStorage.getItem(CHAVE_STORAGE);
      if (dadosSalvos !== null) {
        setUsuarios(JSON.parse(dadosSalvos));
      } else {
        const dadosIniciais = [
          { id: '1', nome: 'Neymar da Silva Santos Junior', CPF: '971.110.971-10', email: 'Neymar.junior05021992@email.com', senha: '123' },
          { id: '2', nome: 'Lionel Andres Messi Cuccittini', CPF: '151.819.301-01', email: 'lionel.messi@email.com', senha: '123' },
          { id: '3', nome: 'Cristiano Ronaldo dos Santos Avero', CPF: '162.817.971-62', email: 'cristiano.ronaldo05021985@email.com', senha: '123' },
          { id: '4', nome: 'Giorgian Daniel De Arrascaeta Benedetti', CPF: '141.010.100-10', email: 'giorgian.arrascaeta@email.com', senha: '123' },
        ];
        setUsuarios(dadosIniciais);
        await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(dadosIniciais));
      }
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } 
  };

  const salvarNoStorage = async (novaLista) => {
    try {
      await AsyncStorage.setItem(CHAVE_STORAGE, JSON.stringify(novaLista));
    } catch (error) {
      console.error('Erro ao salvar no storage:', error);
      Alert.alert('Erro', 'Não foi possível salvar as alterações localmente.');
    }
  };

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

  const iniciarEdicao = (usuario) => {
    setEditandoId(usuario.id);
    setNome(usuario.nome);
    setCPF(usuario.CPF);
    setEmail(usuario.email);
    setSenha(usuario.senha || '');
  };

  const salvarAlteracoes = async () => {
    if (!nome || !CPF || !email) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    const novaLista = usuarios.map((u) =>
      u.id === editandoId ? { ...u, nome, CPF, email, senha: senha || u.senha } : u
    );

    setUsuarios(novaLista);
    await salvarNoStorage(novaLista);

    setEditandoId(null);
    setNome('');
    setCPF('');
    setEmail('');
    setSenha('');
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setNome('');
    setCPF('');
    setEmail('');
    setSenha('');
  };

  const removerUsuario = async (id) => {
    const novaLista = usuarios.filter((u) => u.id !== id);
    setUsuarios(novaLista);
    await salvarNoStorage(novaLista);
  };

  const confirmarExclusao = (id, nomeUsuario) => {
    if (Platform.OS === 'web') {
      const confirmou = window.confirm(`Deseja realmente remover ${nomeUsuario}?`);
      if (confirmou) {
        removerUsuario(id);
      }
    } else {
      Alert.alert(
        "Excluir Usuário",
        `Deseja realmente remover ${nomeUsuario}?`,
        [
          { text: "Cancelar", style: "cancel" },
          {
            text: "Excluir",
            style: "destructive",
            onPress: () => removerUsuario(id)
          }
        ]
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LISTA DE USUÁRIOS</Text>

      {editandoId ? (
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

          <TextInput
            style={styles.input}
            placeholder="Nova Senha (Opcional)"
            placeholderTextColor="#888888"
            value={senha}
            onChangeText={setSenha}
            secureTextEntry
          />

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
            <Text style={styles.textoBotaoBranco}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCancelar} onPress={cancelarEdicao}>
            <Text style={styles.textoBotaoCancelar}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <View style={styles.cartaoUsuario}>
              <View style={styles.info}>
                <Text style={styles.nome}>{item.nome}</Text>
                <Text style={styles.detalhe}>CPF: {item.CPF}</Text>
                <Text style={styles.detalhe}>E-mail: {item.email}</Text>
              </View>

              <View style={styles.acoesContainer}>
                <TouchableOpacity
                  style={styles.botaoEditar}
                  onPress={() => iniciarEdicao(item)}
                >
                  <Text style={styles.textoBotaoEditar}>EDITAR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.botaoExcluir}
                  onPress={() => confirmarExclusao(item.id, item.nome)}
                >
                  <Text style={styles.textoBotaoExcluir}>EXCLUIR</Text>
                </TouchableOpacity>
              </View>
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
    backgroundColor: '#121212',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E50914',
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
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E50914',
  },
  input: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#333333',
    color: '#FFFFFF',
    padding: 14,
    marginBottom: 16,
    borderRadius: 8,
    fontSize: 15,
  },
  botaoSalvar: {
    backgroundColor: '#E50914',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoCancelar: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
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
    borderLeftColor: '#E50914',
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
    color: '#FFFFFF',
    marginBottom: 4,
  },
  detalhe: {
    fontSize: 13,
    color: '#B0B0B0',
    marginTop: 2,
  },
  acoesContainer: {
    flexDirection: 'column',
    gap: 8,
  },
  botaoEditar: {
    backgroundColor: '#E50914',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotaoEditar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },
  botaoExcluir: {
    backgroundColor: 'rgba(255, 59, 48, 0.15)',
    borderWidth: 1,
    borderColor: '#FF3B30',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  textoBotaoExcluir: {
    color: '#FF3B30',
    fontWeight: 'bold',
    fontSize: 12,
  },
});