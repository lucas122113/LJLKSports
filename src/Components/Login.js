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

// Correção 1: Adicionado { navigation } nas props para permitir a navegação
export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    if (email.trim() && senha.trim()) {
      Alert.alert('Sucesso', 'Login realizado com sucesso!');
    } else {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    }
  }

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
          onPress={() => navigation?.navigate('Produtos')}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBotaoSecundario}>ENTRAR</Text>
        </TouchableOpacity>

        {/* Botão Secundário de Cadastro */}
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
    backgroundColor: '#121212', // Fundo preto escuro
    justifyContent: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: '#1E1E1E', // Cartão preto de alto contraste
    borderRadius: 16,
    padding: 24,
    borderTopWidth: 4,
    borderTopColor: '#E50914', // Detalhe superior vermelho
  },
  logoText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
  },
  logoHighlight: {
    color: '#E50914', // Vermelho destaque
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
    color: '#FFFFFF', // Texto em branco
    fontSize: 15,
  },
  botaoEntrar: {
    backgroundColor: '#E50914', // Botão principal vermelho
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
  // Correção 2: Estilos adicionados para o botão secundário e texto
  botaoSecundario: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E50914', // Borda em vermelho
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