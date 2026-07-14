import { View, Text, Button, StyleSheet } from 'react-native';

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>🏆 LJLK Sports</Text>

      <Button
        title="Login"
        onPress={() => navigation.navigate('Login')}
      />

      <Button
        title="Cadastro Usuarios"
        onPress={() => navigation.navigate('CadastroUsuario')}
      />

      <Button
        title="Fale Conosco"
        onPress={() => navigation.navigate('FaleConosco')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    gap:15
  },
  titulo:{
    fontSize:30,
    fontWeight:'bold',
    color:'green'
  }
});