import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const lidarComLogin = async () => {
    if (!email.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Por favor, preencha o e-mail e a senha.');
      return;
    }

    try {
      // 1. Busca a lista completa de usuários cadastrados
      const listaSalva = await AsyncStorage.getItem('@lista_usuarios');
      const usuarios = listaSalva ? JSON.parse(listaSalva) : [];

      // 2. Busca pelo e-mail e senha correspondentes
      const usuarioValido = usuarios.find(
        (u) => u.email?.toLowerCase() === email.trim().toLowerCase() && u.senha === senha
      );

      if (usuarioValido) {
        Alert.alert('Sucesso', `Bem-vindo(a), ${usuarioValido.nome || 'Usuário'}!`);
        navigation.navigate('Produtos');
      } else {
        Alert.alert('Erro', 'E-mail ou senha incorretos.');
      }
    } catch (e) {
      console.error('Erro ao ler login:', e);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.card}>
        <Text style={styles.logoText}>
          LJLK <Text style={styles.logoHighlight}>SPORTS</Text>
        </Text>
        <Text style={styles.subtitulo}>Acesse sua conta para continuar</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-MAIL</Text>
          <TextInput
            style={styles.input}
            placeholder="seuemail@exemplo.com"
            placeholderTextColor="#666"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>SENHA</Text>
          <TextInput
            style={styles.input}
            placeholder="••••••••"
            placeholderTextColor="#666"
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
          />
        </View>

        <TouchableOpacity 
          style={styles.botaoEntrar} 
          onPress={lidarComLogin}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotao}>ENTRAR</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoSecundario} 
          onPress={() => navigation?.navigate('CadastroUsuario')}
          activeOpacity={0.7}
        >
          <Text style={styles.textoBotaoSecundario}>Criar nova conta / Cadastro</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 16,
    padding: 24,
    borderTopWidth: 4,
    borderTopColor: '#E50914',
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  logoHighlight: {
    color: '#E50914',
  },
  subtitulo: {
    fontSize: 13,
    color: '#A0A0A0',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 28,
  },
  inputContainer: {
    marginBottom: 18,
  },
  label: {
    color: '#E50914',
    fontSize: 11,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#121212',
    borderWidth: 1,
    borderColor: '#333333',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#FFFFFF',
    fontSize: 15,
  },
  botaoEntrar: {
    backgroundColor: '#E50914',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 15,
    letterSpacing: 1,
  },
  botaoSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E50914',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 12,
  },
  textoBotaoSecundario: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
});