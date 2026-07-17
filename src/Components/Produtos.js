import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const produtos = [
  { 
    id:'1',
    nome:'Bola da Nike Academy', 
    preco:'R$ 279,90',
    imagem:'https://imgnike-a.akamaihd.net/1920x1920/02462651.jpg' 
  },
  {
    id:'2',
    nome:'Bola da Adidas Trionda',
    preco:'R$ 699,90',
    imagem:'https://imgcentauro-a.akamaihd.net/1300x1300/99644701A2.jpg' 
  },
  {
    id:'3',
    nome:'Bola da Puma Órbita',
    preco:'R$ 238,90',
    imagem:'https://imgcentauro-a.akamaihd.net/660x660/9971L608A11.jpg'
  },
  {
    id:'4',
    nome:'Bola da Penalty S11 R2 XXIII',
    preco:'R$ 467,90',
    imagem:'https://tse1.mm.bing.net/th/id/OIP.QSwCITqh-i8biqyWSbfR6QHaHa?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id:'5',
    nome:'Chuteira da Nike Tiempo Legend 9 club',
    preco:'R$ 499,90',
    imagem:'https://imgnike-a.akamaihd.net/1300x1300/012046IE.jpg'
  },
  {
    id:'6',
    nome:'Chuteira Adidas 20.3 FG',
    preco:'R$ 499,90',
    imagem:'https://static.netshoes.com.br/produtos/chuteira-adidas-predator-203-fg-campo-preta-e-vermelha/06/2FW-7193-006/2FW-7193-006_zoom1.jpg?ts=1610988415'
  },  
  {
    id:'7',
    nome:'Chuteira Puma Attacanto',
    preco:'R$ 329,99',
    imagem:'https://imgmarketplace.lojasrenner.com.br/20001/2764/7010702300129/7510705209479/5.jpeg'
  },
  {
    id:'8',
    nome:'Chuteira Umbro Class',
    preco:'R$ 130,95',
    imagem:'https://static3.tcdn.com.br/img/img_prod/311840/chuteira_umbro_class_campo_preta_80278_3_20210806215811.jpg'
  }, 
  { 
    id:'9',
    nome:'Camisa do Flamengo 2022 Adidas', 
    preco:'R$ 399,99',
    imagem:'https://memoriasdoesporteoficial.com.br/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-01-at-16.56.52-1-Copia.jpeg'
  },
  { 
    id:'10',
    nome:'Camisa do Fluminense 2025 Umbro', 
    preco:'R$ 257,96',
    imagem:'https://images.tcdn.com.br/img/img_prod/311840/camisa_umbro_fluminense_i_2025_patch_sul_americana_153546_1_8bfc13dab13a4a6cf2eda82fa36ea9f3.jpg' 
  },
  { 
    id:'11',
    nome:'Camisa do Vasco 2024 Kappa', 
    preco:'R$ 369,90',
    imagem:'https://images.tcdn.com.br/img/img_prod/1205536/camisa_vasco_da_gama_i_2024_2025_kappa_masculina_original_631_1_769ab8914e20a519ab1820f2433c0ee8.jpg' 
  },
  { 
    id:'12',
    nome:' Camisa do Botafogo 2024 Reebok', 
    preco:'R$ 189,90',
    imagem:'https://images.tcdn.com.br/img/img_prod/1052037/camisa_botafogo_home_2024_25_masculina_5033_1_9160aad030de0a2a937b071a1afce41f.jpg' 
  },
  { 
    id:'13',
    nome:'Camisa do Palmeiras 2023 Puma', 
    preco:'R$ 197,90',
    imagem:'https://tse3.mm.bing.net/th/id/OIP.go4w7rOEL6xjoHsTOCAHfgHaHa?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
  { 
    id:'14',
    nome:'Camisa do Corinthians 2025 Nike', 
    preco:'R$ 149,90',
    imagem:'https://tse2.mm.bing.net/th/id/OIP.fLtCRTPDC11laS6e48bJgwAAAA?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
  { 
    id:'15',
    nome:'Camisa do Santos 2025 Nike', 
    preco:'R$ 210,90',
    imagem:'https://th.bing.com/th/id/R.9d93025746761f5d1ea895251479d04f?rik=x7Cx6N5cAy7v%2fw&pid=ImgRaw&r=0' 
  },
  { 
    id:'16',
    nome:'Camisa do São Paulo 2023 Adidas', 
    preco:'R$ 180,90',
    imagem:'https://tse3.mm.bing.net/th/id/OIP.xV8BgBS1xjryUC4hIGP2yAHaHa?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
  { 
    id:'17',
    nome:'Camisa do Mirassol 2025 Athleta', 
    preco:'R$ 100,90',
    imagem:'https://tse4.mm.bing.net/th/id/OIP.H833OsAV8I1b-xsE7IrHhAAAAA?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
  { 
    id:'18',
    nome:'Camisa do Bragantino 2025 Puma', 
    preco:'R$ 307,90',
    imagem:'https://images.tcdn.com.br/img/img_prod/311840/camisa_puma_red_bull_bragantino_iii_2025_feminina_151769_6_0113c8744f1cdaeee52fe5d33841104b.jpg' 
  },
   { 
    id:'19',
    nome:'Camisa do Cruzeiro 2025 Adidas', 
    preco:'R$ 220,90', 
    imagem:'https://tse2.mm.bing.net/th/id/OIP.T2aN-dk31FuvkqWt54lobQHaJ4?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
   { 
    id:'20',
    nome:'Camisa do Atlético Mineiro 2025 Adidas', 
    preco:'R$ 399,90',
    imagem:'https://tse3.mm.bing.net/th/id/OIP.rQvcVn-mcTpM4mYkwEUF1QHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
   { 
    id:'21',
    nome:'Camisa do Internacional 2021 Adidas', 
    preco:'R$ 209,90',
    imagem:'https://static.lojadointer.com.br/produtos/camisa-internacional-i-2021-sn-torcedor-adidas-masculina/16/NQQ-1034-016/NQQ-1034-016_zoom1.jpg?ts=1584470844' 
  },
   { 
    id:'22',
    nome:'Camisa do Grêmio 2019 Umbro', 
    preco:'R$ 149,90',
    imagem:'https://static.netshoes.com.br/produtos/camisa-gremio-i-1920-sn-torcedor-umbro-masculino/08/D21-3411-108/D21-3411-108_zoom1.jpg' 
  },
   { 
    id:'23',
    nome:'Camisa do Athletico Paranaense 2024 Umbro', 
    preco:'R$ 199,90',
    imagem:'https://tse4.mm.bing.net/th/id/OIP.Qwfhys3Ewi40ooSlRpp1ZQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
   { 
    id:'24',
    nome:'Camisa do Bahia 2025 Puma', 
    preco:'R$ 279,90',
    imagem:'https://www.futebolreligiao.com.br/image/cache/catalog/Bahia/camisa-ii-bahia-2025-puma-oficial-900x900.jpg' 
  },
   { 
    id:'25',
    nome:'Camisa do Fortaleza 2024 Volt', 
    preco:'R$ 170,90',
    imagem:'https://carrefourbr.vtexassets.com/arquivos/ids/170379256-1280-auto?v=638600435160030000&width=1280&height=auto&aspect=true' 
  },
   { 
    id:'26',
    nome:'Camisa do Barcelona 2025 Nike', 
    preco:'R$ 249,90',
    imagem:'https://tse3.mm.bing.net/th/id/OIP.iy0eazJw0E5kItvZWM1opAHaJQ?r=0&rs=1&pid=ImgDetMain&o=7&rm=3' 
  },
   { 
    id:'27',
    nome:'Camisa do Real Madrid 2026 Adidas', 
    preco:'R$ 369,90',
    imagem:'https://images.tcdn.com.br/img/img_prod/311840/camisa_adidas_real_madrid_third_2026_jogador_9_20250814092815_63d9b38fe7f0.jpg'  
  }, 






























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