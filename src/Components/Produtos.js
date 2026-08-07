import React, { useState } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  TextInput, 
  ScrollView,
  StatusBar,
  Alert
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// --- DADOS INICIAIS ---
const produtosIniciais = [
  { id:'1', nome:'Bola da Nike Academy', preco:'R$ 279,90', imagem:'https://imgnike-a.akamaihd.net/1920x1920/02462651.jpg' },
  { id:'2', nome:'Bola da Adidas Trionda', preco:'R$ 699,90', imagem:'https://imgcentauro-a.akamaihd.net/1300x1300/99644701A2.jpg' },
  { id:'3', nome:'Bola da Puma Órbita', preco:'R$ 238,90', imagem:'https://imgcentauro-a.akamaihd.net/660x660/9971L608A11.jpg' },
  { id:'4', nome:'Bola da Penalty S11 R2 XXIII', preco:'R$ 467,90', imagem:'https://tse1.mm.bing.net/th/id/OIP.QSwCITqh-i8biqyWSbfR6QHaHa?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3' },
  { id:'5', nome:'Chuteira da Nike Tiempo Legend 9 club', preco:'R$ 499,90', imagem:'https://imgnike-a.akamaihd.net/1300x1300/012046IE.jpg' },
  { id:'6', nome:'Chuteira Adidas 20.3 FG', preco:'R$ 499,90', imagem:'https://static.netshoes.com.br/produtos/chuteira-adidas-predator-203-fg-campo-preta-e-vermelha/06/2FW-7193-006/2FW-7193-006_zoom1.jpg?ts=1610988415' },   
  { id:'7', nome:'Chuteira Puma Attacanto', preco:'R$ 329,99', imagem:'https://imgmarketplace.lojasrenner.com.br/20001/2764/7010702300129/7510705209479/5.jpeg' },
  { id:'8', nome:'Chuteira Umbro Class', preco:'R$ 130,95', imagem:'https://static3.tcdn.com.br/img/img_prod/311840/chuteira_umbro_class_campo_preta_80278_3_20210806215811.jpg' }, 
  { id:'9', nome:'Camisa do Flamengo 2022 Adidas', preco:'R$ 399,99', imagem:'https://memoriasdoesporteoficial.com.br/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-01-at-16.56.52-1-Copia.jpeg' },
  { id:'10', nome:'Camisa do Fluminense 2025 Umbro', preco:'R$ 257,96', imagem:'https://images.tcdn.com.br/img/img_prod/311840/camisa_umbro_fluminense_i_2025_patch_sul_americana_153546_1_8bfc13dab13a4a6cf2eda82fa36ea9f3.jpg' },
  { id:'11', nome:'Camisa do Vasco 2024 Kappa', preco:'R$ 369,90', imagem:'https://images.tcdn.com.br/img/img_prod/1205536/camisa_vasco_da_gama_i_2024_2025_kappa_masculina_original_631_1_769ab8914e20a519ab1820f2433c0ee8.jpg' },
  { id:'12', nome:'Camisa do Botafogo 2024 Reebok', preco:'R$ 189,90', imagem:'https://images.tcdn.com.br/img/img_prod/1052037/camisa_botafogo_home_2024_25_masculina_5033_1_9160aad030de0a2a937b071a1afce41f.jpg' }
];

// --- DADOS INICIAIS DE USUÁRIOS ---
const usuariosIniciais = [
  { id: '1', nome: 'Lucas', email: 'lucas@ljlksports.com', nivel: 'Administrador' },
  { id: '2', nome: 'Matheus', email: 'matheus@ljlksports.com', nivel: 'Cliente VIP' },
  { id: '3', nome: 'João', email: 'joao@gmail.com', nivel: 'Cliente' },
];

// --- COMPONENTE: CARD DO PRODUTO ---
function CardProduto({ item, onEditar }) {
  const [quantidade, setQuantidade] = useState(1);

  const aumentarQtd = () => setQuantidade(quantidade + 1);
  const diminuirQtd = () => {
    if (quantidade > 1) setQuantidade(quantidade - 1);
  };

  const handleAdicionarAoCarrinho = () => {
    Alert.alert(
      'Sucesso!',
      `${quantidade}x "${item.nome}" foi adicionado ao seu carrinho.`,
      [{ text: 'OK' }]
    );
    setQuantidade(1);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity 
        style={styles.btnEditarCard} 
        onPress={() => onEditar(item)}
      >
        <Text style={styles.textoBtnEditarCard}>✏️ Editar</Text>
      </TouchableOpacity>

      <View style={styles.containerImagem}>
        <Image source={{ uri: item.imagem }} style={styles.imagem} />
      </View>
      
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>{item.preco}</Text>

      <View style={styles.acoesContainer}>
        <View style={styles.seletorQtd}>
          <TouchableOpacity style={styles.btnQtd} onPress={diminuirQtd}>
            <Text style={styles.textoBtnQtd}>-</Text>
          </TouchableOpacity>
          <Text style={styles.textoQtd}>{quantidade}</Text>
          <TouchableOpacity style={styles.btnQtd} onPress={aumentarQtd}>
            <Text style={styles.textoBtnQtd}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.btnCarrinho} 
          onPress={handleAdicionarAoCarrinho}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBtnCarrinho}>🛒 Adicionar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// --- COMPONENTE: TELA DE GESTÃO DE USUÁRIOS ---
function TelaUsuarios({ onVoltar, usuarios, setUsuarios }) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nivel, setNivel] = useState('Cliente');

  const abrirModalEdicao = (usuario) => {
    setUsuarioEditando(usuario);
    setNome(usuario.nome);
    setEmail(usuario.email);
    setNivel(usuario.nivel);
    setModalVisivel(true);
  };

  const salvarUsuario = () => {
    if (!nome || !email) {
      Alert.alert('Atenção', 'Preencha o nome e o e-mail do usuário!');
      return;
    }

    const listaAtualizada = usuarios.map((u) => 
      u.id === usuarioEditando.id ? { ...u, nome, email, nivel } : u
    );

    setUsuarios(listaAtualizada);
    setModalVisivel(false);
    Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
  };

  return (
    <View style={styles.containerUsuarios}>
      <TouchableOpacity style={styles.btnVoltar} onPress={onVoltar}>
        <Feather name="arrow-left" size={24} color="#FFFFFF" />
        <Text style={styles.textoBtnVoltar}>Voltar ao Perfil</Text>
      </TouchableOpacity>

      <Text style={styles.tituloSecaoGeral}>Gerenciar Usuários</Text>

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.cardUsuario}>
            <View>
              <Text style={styles.nomeUsuario}>{item.nome}</Text>
              <Text style={styles.emailUsuario}>{item.email}</Text>
              <Text style={styles.badgeNivel}>{item.nivel}</Text>
            </View>
            <TouchableOpacity 
              style={styles.btnEditarCard}
              onPress={() => abrirModalEdicao(item)}
            >
              <Text style={styles.textoBtnEditarCard}>✏️ Editar</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Modal de Edição do Usuário */}
      <Modal visible={modalVisivel} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.tituloModal}>Editar Usuário</Text>

            <Text style={styles.label}>Nome:</Text>
            <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor="#777" />

            <Text style={styles.label}>E-mail:</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" placeholderTextColor="#777" />

            <Text style={styles.label}>Nível / Função:</Text>
            <TextInput style={styles.input} value={nivel} onChangeText={setNivel} placeholderTextColor="#777" />

            <View style={styles.botoesModal}>
              <TouchableOpacity style={[styles.btnModal, styles.btnCancelar]} onPress={() => setModalVisivel(false)}>
                <Text style={styles.textoBtnModal}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.btnModal, styles.btnSalvar]} onPress={salvarUsuario}>
                <Text style={styles.textoBtnModal}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// --- COMPONENTE: TELA DE PERFIL ---
function Perfil({ onVoltar, onAbrirUsuarios }) {
  return (
    <ScrollView style={styles.perfilContainer} showsVerticalScrollIndicator={false}>
      {/* Botão de Voltar para a Loja */}
      <TouchableOpacity style={styles.btnVoltar} onPress={onVoltar}>
        <Feather name="arrow-left" size={24} color="#FFFFFF" />
        <Text style={styles.textoBtnVoltar}>Voltar à Loja</Text>
      </TouchableOpacity>

      {/* Cabeçalho do Perfil */}
      <View style={styles.headerPerfil}>
        <View style={styles.avatarBorder}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200' }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.nomePerfil}>Lucas</Text>
        <Text style={styles.tag}>Cliente LJLK Sports</Text>
      </View>

      {/* Cartão de Membro / Fidelidade */}
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Status do Cliente</Text>
          <Feather name="award" size={20} color="#E50914" />
        </View>
        <Text style={styles.cardStatus}>Membro VIP</Text>
        <Text style={styles.cardSubtext}>Plano Anual - LJLK Sports</Text>
      </View>

      {/* Opções da Conta */}
      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>Minha Conta</Text>

        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemMenuLeft}>
            <Feather name="user" size={20} color="#E50914" />
            <Text style={styles.itemText}>Editar Dados</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemMenuLeft}>
            <Feather name="shopping-bag" size={20} color="#E50914" />
            <Text style={styles.itemText}>Meus Pedidos</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemMenuLeft}>
            <Feather name="settings" size={20} color="#E50914" />
            <Text style={styles.itemText}>Configurações</Text>
          </View>
          <Feather name="chevron-right" size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Botão para Ver/Editar Usuários */}
      <TouchableOpacity style={styles.botaoEditarUsuarios} onPress={onAbrirUsuarios}>
        <Feather name="users" size={20} color="#FFFFFF" />
        <Text style={styles.textoBotaoEditar}>VER / EDITAR USUÁRIOS</Text>
      </TouchableOpacity>

      {/* Botão Sair */}
      <TouchableOpacity style={styles.botaoSair} onPress={onVoltar}>
        <Feather name="log-out" size={20} color="#FFFFFF" />
        <Text style={styles.textoBotaoSair}>Sair da Conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- COMPONENTE PRINCIPAL ---
export default function App() {
  const [telaAtual, setTelaAtual] = useState('loja'); // 'loja', 'perfil' ou 'usuarios'
  const [listaProdutos, setListaProdutos] = useState(produtosIniciais);
  const [listaUsuarios, setListaUsuarios] = useState(usuariosIniciais);

  const [modalVisivel, setModalVisivel] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  const abrirModalCadastro = () => {
    setProdutoEditando(null);
    setNome('');
    setPreco('');
    setImagem('');
    setModalVisivel(true);
  };

  const abrirModalEdicao = (produto) => {
    setProdutoEditando(produto);
    setNome(produto.nome);
    setPreco(produto.preco.replace('R$ ', ''));
    setImagem(produto.imagem);
    setModalVisivel(true);
  };

  const salvarProduto = () => {
    if (!nome || !preco || !imagem) {
      Alert.alert('Atenção', 'Por favor, preencha todos os campos!');
      return;
    }

    const precoFormatado = preco.startsWith('R$') ? preco : `R$ ${preco}`;

    if (produtoEditando) {
      const listaAtualizada = listaProdutos.map((item) =>
        item.id === produtoEditando.id
          ? { ...item, nome, preco: precoFormatado, imagem }
          : item
      );
      setListaProdutos(listaAtualizada);
      Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
    } else {
      const novoProduto = {
        id: String(Date.now()),
        nome,
        preco: precoFormatado,
        imagem,
      };
      setListaProdutos([novoProduto, ...listaProdutos]);
      Alert.alert('Sucesso', 'Novo produto cadastrado com sucesso!');
    }

    setNome('');
    setPreco('');
    setImagem('');
    setProdutoEditando(null);
    setModalVisivel(false);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {telaAtual === 'perfil' && (
        <Perfil 
          onVoltar={() => setTelaAtual('loja')} 
          onAbrirUsuarios={() => setTelaAtual('usuarios')}
        />
      )}

      {telaAtual === 'usuarios' && (
        <TelaUsuarios 
          onVoltar={() => setTelaAtual('perfil')} 
          usuarios={listaUsuarios} 
          setUsuarios={setListaUsuarios} 
        />
      )}

      {telaAtual === 'loja' && (
        <>
          {/* Header com Ícone de Perfil */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>LJLK Sports</Text>
            <TouchableOpacity 
              style={styles.btnPerfil} 
              onPress={() => setTelaAtual('perfil')}
              activeOpacity={0.7}
            >
              <Feather name="user" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Botão Cadastrar */}
          <TouchableOpacity 
            style={styles.botaoCadastrar} 
            onPress={abrirModalCadastro}
            activeOpacity={0.8}
          >
            <Text style={styles.textoBotaoCadastrar}>+ Cadastrar Novo Produto</Text>
          </TouchableOpacity>

          {/* Lista de Produtos */}
          <FlatList
            data={listaProdutos}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <CardProduto item={item} onEditar={abrirModalEdicao} />
            )}
            contentContainerStyle={{ paddingBottom: 20 }}
          />

          {/* Modal de Cadastro / Edição */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisivel}
            onRequestClose={() => setModalVisivel(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <Text style={styles.tituloModal}>
                    {produtoEditando ? 'Editar Produto' : 'Cadastrar Produto'}
                  </Text>

                  <Text style={styles.label}>Nome do Produto:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Camisa do Brasil 2026"
                    placeholderTextColor="#777777"
                    value={nome}
                    onChangeText={setNome}
                  />

                  <Text style={styles.label}>Preço:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 299,90"
                    placeholderTextColor="#777777"
                    keyboardType="numeric"
                    value={preco}
                    onChangeText={setPreco}
                  />

                  <Text style={styles.label}>URL da Imagem:</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="https://link-da-imagem.jpg"
                    placeholderTextColor="#777777"
                    value={imagem}
                    onChangeText={setImagem}
                  />

                  <View style={styles.botoesModal}>
                    <TouchableOpacity 
                      style={[styles.btnModal, styles.btnCancelar]} 
                      onPress={() => setModalVisivel(false)}
                    >
                      <Text style={styles.textoBtnModal}>Cancelar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.btnModal, styles.btnSalvar]} 
                      onPress={salvarProduto}
                    >
                      <Text style={styles.textoBtnModal}>
                        {produtoEditando ? 'Atualizar' : 'Salvar'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
        </>
      )}
    </View>
  );
}

// --- ESTILOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#262626',
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  btnPerfil: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#E50914',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoCadastrar: {
    backgroundColor: '#E50914',
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  textoBotaoCadastrar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: '#141414',
    marginHorizontal: 12,
    marginVertical: 8,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#262626',
    position: 'relative',
  },
  btnEditarCard: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#262626',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E50914',
    zIndex: 10,
  },
  textoBtnEditarCard: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  containerImagem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 6,
    marginBottom: 10,
    marginTop: 10,
  },
  imagem: {
    width: 130,
    height: 130,
    resizeMode: 'contain',
  },
  nome: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  preco: {
    fontSize: 18,
    color: '#E50914',
    fontWeight: 'bold',
    marginBottom: 12,
  },
  acoesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 6,
  },
  seletorQtd: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E50914',
    padding: 2,
  },
  btnQtd: {
    width: 32,
    height: 32,
    backgroundColor: '#E50914',
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBtnQtd: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  textoQtd: {
    marginHorizontal: 12,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  btnCarrinho: {
    backgroundColor: '#E50914',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  textoBtnCarrinho: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#141414',
    borderRadius: 12,
    padding: 20,
    maxHeight: '80%',
    borderWidth: 1,
    borderColor: '#E50914',
  },
  tituloModal: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E50914',
    textTransform: 'uppercase',
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#404040',
    backgroundColor: '#000000',
    color: '#FFFFFF',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
  },
  botoesModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnModal: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  btnCancelar: {
    backgroundColor: '#262626',
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  btnSalvar: {
    backgroundColor: '#E50914',
  },
  textoBtnModal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // ESTILOS DO PERFIL
  perfilContainer: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 20,
  },
  textoBtnVoltar: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  headerPerfil: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarBorder: {
    padding: 3,
    backgroundColor: '#E50914',
    borderRadius: 50,
    marginBottom: 12,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
  },
  nomePerfil: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  tag: {
    fontSize: 14,
    color: '#E50914',
    fontWeight: '600',
    marginTop: 4,
  },
  cardInfo: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderLeftWidth: 4,
    borderLeftColor: '#E50914',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 12,
    color: '#AAAAAA',
    textTransform: 'uppercase',
    fontWeight: '600',
  },
  cardStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  cardSubtext: {
    fontSize: 13,
    color: '#888888',
    marginTop: 2,
  },
  secao: {
    backgroundColor: '#1E1E1E',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  secaoTitulo: {
    fontSize: 12,
    color: '#AAAAAA',
    fontWeight: '600',
    textTransform: 'uppercase',
    marginVertical: 8,
  },
  itemMenu: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2A2A2A',
  },
  itemMenuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  itemText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  botaoEditarUsuarios: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: '#262626',
    borderWidth: 1,
    borderColor: '#E50914',
    borderRadius: 12,
    marginBottom: 12,
  },
  textoBotaoEditar: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  botaoSair: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    backgroundColor: '#E50914',
    borderRadius: 12,
    marginBottom: 40,
  },
  textoBotaoSair: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },

  // ESTILOS DE USUÁRIOS
  containerUsuarios: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#000000',
  },
  tituloSecaoGeral: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E50914',
    marginBottom: 16,
    textTransform: 'uppercase',
  },
  cardUsuario: {
    backgroundColor: '#141414',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#262626',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nomeUsuario: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  emailUsuario: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 4,
  },
  badgeNivel: {
    fontSize: 12,
    color: '#E50914',
    fontWeight: '600',
  },
});