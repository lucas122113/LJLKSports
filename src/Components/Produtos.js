import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const produtos = [
  {
    id:'1',
    nome:'Bola Nike',
    preco:'R$ 199,90',
    imagem:'https://cdn-icons-png.flaticon.com/512/53/53283.png'
  },
  {
    id:'2',
    nome:'Chuteira Adidas',
    preco:'R$ 349,90',
    imagem:'https://cdn-icons-png.flaticon.com/512/857/857455.png'
  },
  {
    id:'3',
    nome:'Camisa de Time',
    preco:'R$ 149,90',
    imagem:'https://cdn-icons-png.flaticon.com/512/892/892458.png'
  }
];

export default function Produtos() {
  return (
    <FlatList
      data={produtos}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Image
            source={{ uri: item.imagem }}
            style={styles.imagem}
          />
          <Text style={styles.nome}>{item.nome}</Text>
          <Text>{item.preco}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  card:{
    backgroundColor:'#fff',
    margin:10,
    padding:15,
    borderRadius:10,
    alignItems:'center',
    elevation:5
  },
  imagem:{
    width:100,
    height:100
  },
  nome:{
    fontSize:18,
    fontWeight:'bold'
  }
});