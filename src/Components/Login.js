import { useState } from 'react';
import { View, TextInput, Button, Alert } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  function entrar() {
    if(email && senha){
      Alert.alert('Sucesso', 'Login realizado!');
    } else {
      Alert.alert('Erro', 'Preencha os campos.');
    }
  }

  return (
    <View style={{padding:20}}>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      <Button title="Entrar" onPress={entrar}/>
    </View>
  );
}