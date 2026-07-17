import React, { useState } from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

export default function Usuarios() {
  const [usuarios, setUsuarios] = useState([
    { id: '1', nome: 'Ana Souza', CPF: '111.222.333-44', email: 'ana.souza@email.com', senha: 'senha123' },
    { id: '2', nome: 'Lucas Lima', CPF: '555.666.777-88', email: 'lucas.lima@email.com', senha: 'senha456' },
    { id: '3', nome: 'Mariana Costa', CPF: '999.888.777-66', email: 'mariana.costa@email.com', senha: 'senha789' },
    { id: '4', pedro: 'Pedro Alves', CPF: '444.555.666-77', email: 'pedro.alves@email.com', senha: 'senha321' },
  ]);

  const [editandoId, setEditandoId] = useState(null);
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState(''); 
  const [ocultarSenha, setOcultarSenha] = useState(true); 
  const [mostrarCampoSenha, setMostrarCampoSenha] = useState(false); 

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
    setSenha(usuario.senha || ''); // Carrega a senha atual no estado
    setOcultarSenha(true); 
    setMostrarCampoSenha(false); // Começa escondido para não expor a senha de cara
  };

  const salvarAlteracoes = () => {
    if (!nome || !CPF || !email || !senha) {
      Alert.alert('Erro', 'Preencha todos os campos obrigatórios.');
      return;
    }

    if (CPF.length < 14) {
      Alert.alert('Erro', 'Por favor, digite um CPF válido e completo.');
      return;
    }

    setUsuarios(
      usuarios.map((u) =>
        u.id === editandoId ? { ...u, nome, CPF, email, senha } : u
      )
    );

    limparFormulario();
  };

  const cancelarEdicao = () => {
    limparFormulario();
  };

  const limparFormulario = () => {
    setEditandoId(null);
    setNome('');
    setCPF('');
    setEmail('');
    setSenha('');
    setMostrarCampoSenha(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>LISTA DE USUÁRIOS</Text>

      {editandoId ? (
        <View style={styles.formulario}>
          <Text style={styles.subtitulo}>EDITAR CADASTRO</Text>

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

          {/* Controle de Edição da Senha */}
          {!mostrarCampoSenha ? (
            <TouchableOpacity 
              style={styles.botaoEditarSenha} 
              onPress={() => setMostrarCampoSenha(true)}
            >
              <Text style={styles.textoBotaoEditarSenha}>EDITAR SENHA</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.containerSenha}>
              <TextInput
                style={styles.inputSenha}
                placeholder="Digite a Nova Senha"
                placeholderTextColor="#999"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={ocultarSenha}
              />
              <TouchableOpacity 
                style={styles.botaoMostrar} 
                onPress={() => setOcultarSenha(!ocultarSenha)}
              >
                <Text style={styles.textoBotaoMostrar}>
                  {ocultarSenha ? 'MOSTRAR' : 'OCULTAR'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <TouchableOpacity style={styles.botaoSalvar} onPress={salvarAlteracoes}>
            <Text style={styles.textoBotaoSalvar}>SALVAR ALTERAÇÕES</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.botaoCancelar} onPress={cancelarEdicao}>
            <Text style={styles.textoBotaoCancelar}>CANCELAR</Text>
          </TouchableOpacity>
        </View>
      ) : (
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
                style={styles.botaoEditarCard}
                onPress={() => iniciarEdicao(item)}
              >
                <Text style={styles.textoBotaoEditarCard}>EDITAR</Text>
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
  },
  titulo: {
    fontSize: 26,
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
    marginBottom: 20,
    color: '#D60000',
    textAlign: 'center',
    letterSpacing: 1,
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
  botaoEditarSenha: {
    borderWidth: 2,
    borderColor: '#000000',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  textoBotaoEditarSenha: {
    color: '#000000',
    fontSize: 14,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  containerSenha: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  inputSenha: {
    flex: 1,
    color: '#000000',
    padding: 14,
    fontSize: 16,
  },
  botaoMostrar: {
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  textoBotaoMostrar: {
    color: '#D60000',
    fontSize: 12,
    fontWeight: 'bold',
  },
  botaoSalvar: {
    backgroundColor: '#D60000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  textoBotaoSalvar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  botaoCancelar: {
    backgroundColor: '#000000',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  textoBotaoCancelar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  cartaoUsuario: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    padding: 16,
    borderRadius: 8,
    marginBottom: 14,
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
  botaoEditarCard: {
    backgroundColor: '#000000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  textoBotaoEditarCard: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    letterSpacing: 0.5,
  },
});