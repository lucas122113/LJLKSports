import { View, Text, StyleSheet } from 'react-native';

export default function Desenvolvedores() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Desenvolvido por:</Text>
      
      <View style={styles.cardDevs}>
        <Text style={styles.nomeDev}>W.Lucas</Text>
        <Text style={styles.nomeDev}>Lucas Santana</Text>
        <Text style={styles.nomeDev}>Jhonatan Lopes</Text>
        <Text style={styles.nomeDev}>Kayke Sidney</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.unidade}>Unidade Firjan SENAI MARACANÃ</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo preto escuro
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FF2E93', // Vermelho/Rosa destaque ou substitua por #FF0000 para vermelho puro
    color: '#E50914', // Vermelho estilo marca/destaque
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  cardDevs: {
    width: '100%',
    backgroundColor: '#1E1E1E', // Preto levemente mais claro para criar contraste
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#E50914', // Borda lateral vermelha
    alignItems: 'center',
    gap: 10,
  },
  nomeDev: {
    fontSize: 18,
    color: '#FFFFFF', // Texto branco para boa leitura sobre fundo escuro
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#333333',
    width: '80%',
    marginVertical: 24,
  },
  unidade: {
    fontSize: 14,
    color: '#A0A0A0', // Cinza para texto secundário
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});