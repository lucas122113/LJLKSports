import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';


export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Configura a barra de status do celular para combinar com o fundo preto */}
      <StatusBar barStyle="light-content" backgroundColor="#121212" />

      <View style={styles.headerContainer}>
        <Image 
            style={styles.logo}
            source={require("../../assets/logo.jpeg"
            )}
             resizeMode="contain"
        />
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity 
          style={styles.botaoPrincipal} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.textoBotaoPrincipal}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoSecundario} 
          onPress={() => navigation.navigate('CadastroUsuario')}
        >
          <Text style={styles.textoBotaoSecundario}>Cadastro de Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoSecundario} 
          onPress={() => navigation.navigate('Usuarios')}
        >
          <Text style={styles.textoBotaoSecundario}>Usuários</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoSecundario} 
          onPress={() => navigation.navigate('FaleConosco')}
        >
          <Text style={styles.textoBotaoSecundario}>Fale Conosco</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.botaoLinha} 
          onPress={() => navigation.navigate('Desenvolvedores')}
        >
          <Text style={styles.textoBotaoLinha}>Desenvolvedores</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Preto profundo de fundo
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titulo: {
    fontSize: 34,
    fontWeight: '900',
    color: '#FFFFFF', // Branco
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tituloDestaque: {
    color: '#E50914', // Vermelho esportivo/vibrante
  },
  subtitulo: {
    fontSize: 14,
    color: '#A0A0A0', // Cinza claro para suporte
    marginTop: 5,
    letterSpacing: 0.5,
  },
  menuContainer: {
    width: '100%',
    gap: 15, // Espaçamento entre os botões
  },
  botaoPrincipal: {
    backgroundColor: '#E50914', // Vermelho de destaque
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E50914',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // Sombra no Android
  },
  textoBotaoPrincipal: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  botaoSecundario: {
    backgroundColor: '#1F1F1F', // Preto mais claro para dar profundidade
    borderWidth: 1,
    borderColor: '#333333',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotaoSecundario: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  botaoLinha: {
    paddingVertical: 15,
    alignItems: 'center', 
    justifyContent: 'center',
    marginTop: 10,
  },
  textoBotaoLinha: {
    color: '#A0A0A0',
    fontSize: 14,
    textDecorationLine: 'underline',
  },

  logo:{
    width:500
  ,
    height:500

  }
});