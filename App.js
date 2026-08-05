import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/Components/Home';
import Login from './src/Components/Login';
import Produtos from './src/Components/Produtos';
import CadastroProduto from './src/Components/CadastroProduto';
import Usuarios from './src/Components/Usuarios';
import CadastroUsuario from './src/Components/CadastroUsuario';
import EditarProdutos from './src/Components/EditarProdutos';
import EditarUsuarios from './src/Components/EditarUsuarios';
import Perfil from './src/Components/Perfil';
import FaleConosco from './src/Components/FaleConosco';
import Desenvolvedores from './src/Components/Desenvolvedores';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#121212' },
          headerTintColor: '#E50914', // Cor dos títulos e botões do header
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >

        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={({ navigation }) => ({
            title: 'Início',
            headerRight: () => (
              <TouchableOpacity 
                onPress={() => navigation.navigate('Perfil')}
                style={{
                  backgroundColor: '#E50914',
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 6,
                }}
              >
                <Text style={{ color: '#FFFFFF', fontWeight: 'bold', fontSize: 14 }}>
                  Perfil
                </Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ title: 'Login' }}
        />

        <Stack.Screen 
          name="Produtos" 
          component={Produtos} 
          options={{ title: 'Produtos' }}
        />

        <Stack.Screen 
          name="CadastroProduto" 
          component={CadastroProduto} 
          options={{ title: 'Cadastrar Produto' }}
        />

        <Stack.Screen 
          name="Usuarios" 
          component={Usuarios} 
          options={{ title: 'Usuários' }}
        />

        <Stack.Screen 
          name="CadastroUsuario" 
          component={CadastroUsuario} 
          options={{ title: 'Cadastrar Usuário' }}
        />

        <Stack.Screen 
          name="EditarProdutos" 
          component={EditarProdutos} 
          options={{ title: 'Editar Produto' }}
        />

        <Stack.Screen 
          name="EditarUsuarios" 
          component={EditarUsuarios} 
          options={{ title: 'Editar Usuário' }}
        />

        <Stack.Screen 
          name="Perfil" 
          component={Perfil} 
          options={{ title: 'Perfil' }}
        />

        <Stack.Screen 
          name="FaleConosco" 
          component={FaleConosco} 
          options={{ title: 'Fale Conosco' }}
        />

        <Stack.Screen 
          name="Desenvolvedores" 
          component={Desenvolvedores} 
          options={{ title: 'Desenvolvedores' }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}   