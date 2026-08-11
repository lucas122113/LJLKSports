import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  View, 
  ScrollView, 
  Alert, 
  Keyboard 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CadastroUsuario({ navigation }) {
  const [nome, setNome] = useState('');
  const [CPF, setCPF] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  // Formatação de CPF mais segura
  const formatarCPF = (texto) => {
    setMensagemErro(''); // Limpa mensagens de erro ao digitar
    const apenasNumeros = texto.replace(/\D/g, '');
    
    if (apenasNumeros.length <= 11) {
      const cpfFormatado = apenasNumeros
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
      
      setCPF(cpfFormatado);
    }
  };

  const lidarComSalvar = async () => {
    Keyboard.dismiss();
    setMensagemErro('');

    // 1. Validação de campos vazios
    if (!nome.trim() || !email.trim() || !senha.trim()) {
      const msg = 'Por favor, preencha Nome, E-mail e Senha!';
      setMensagemErro(msg);
      Alert.alert('Campos Obrigatórios', msg);
      return;
    }

    // Validação básica de formato de E-mail
    const emailValido = /\S+@\S+\.\S+/.test(email);
    if (!emailValido) {
      const msg = 'Por favor, digite um e-mail válido!';
      setMensagemErro(msg);
      Alert.alert('E-mail Inválido', msg);
      return;
    }

    try {
      const novoUsuario = { 
        id: String(Date.now()),
        nome: nome.trim(), 
        CPF: CPF.trim(), 
        email: email.trim().toLowerCase(), 
        senha: senha.trim() 
      };

      // 2. Busca a lista existente
      const listaSalva = await AsyncStorage.getItem('@lista_usuarios');
      const usuariosExistentes = listaSalva ? JSON.parse(listaSalva) : [];

      // 3. Verifica se o e-mail já existe de forma segura
      const emailExiste = usuariosExistentes.some(
        (u) => u && u.email && u.email.toLowerCase() === novoUsuario.email
      );

      if (emailExiste) {
        const msg = 'Este e-mail já está cadastrado!';
        setMensagemErro(msg);
        Alert.alert('Atenção', msg);
        return;
      }

      // 4. Salva a nova lista
      const novaLista = [...usuariosExistentes, novoUsuario];
      await AsyncStorage.setItem('@lista_usuarios', JSON.stringify(novaLista));

      // Limpa formulário e navega
      Alert.alert('Sucesso!', 'Usuário cadastrado com sucesso.', [
        {
          text: 'OK',
          onPress: () => {
            setNome('');
            setCPF('');
            setEmail('');
            setSenha('');
            setMensagemErro('');

            if (navigation && navigation.navigate) {
              navigation.navigate('Login');
            }
          }
        }
      ]);

    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      const msg = 'Não foi possível salvar os dados do usuário.';
      setMensagemErro(msg);
      Alert.alert('Erro', msg);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>CADASTRO DE USUÁRIO</Text>

      {/* Exibe mensagem de erro diretamente na tela */}
      {mensagemErro !== '' && (
        <View style={styles.boxErro}>
          <Text style={styles.textoErro}>{mensagemErro}</Text>
        </View>
      )}

      <TextInput
        style={styles.input}
        placeholder="Nome Completo *"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={(t) => { setNome(t); setMensagemErro(''); }}
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
        placeholder="E-mail *"
        placeholderTextColor="#999"
        value={email}
        onChangeText={(t) => { setEmail(t); setMensagemErro(''); }}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha *"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={(t) => { setSenha(t); setMensagemErro(''); }}
        secureTextEntry={true}
      />

      <TouchableOpacity 
        style={styles.botaoSalvar} 
        onPress={lidarComSalvar}
        activeOpacity={0.7}
      >
        <Text style={styles.textoBotaoSalvar}>SALVAR</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#000000',
    letterSpacing: 1,
  },
  boxErro: {
    backgroundColor: '#FFE5E5',
    borderColor: '#D60000',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  textoErro: {
    color: '#D60000',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
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
});