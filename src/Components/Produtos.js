import React, { useState, useEffect } from 'react';
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
  Keyboard,
} from 'react-native';

import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import CadastroUsuario from './CadastroUsuario';

// ======================================================
// DADOS INICIAIS DOS PRODUTOS
// ======================================================

const produtosIniciais = [
  {
    id: '1',
    nome: 'Bola da Nike Academy',
    preco: 'R$ 279,90',
    imagem:
      'https://imgnike-a.akamaihd.net/1920x1920/02462651.jpg',
  },
  {
    id: '2',
    nome: 'Bola da Adidas Trionda',
    preco: 'R$ 699,90',
    imagem:
      'https://imgcentauro-a.akamaihd.net/1300x1300/99644701A2.jpg',
  },
  {
    id: '3',
    nome: 'Bola da Puma Órbita',
    preco: 'R$ 238,90',
    imagem:
      'https://imgcentauro-a.akamaihd.net/660x660/9971L608A11.jpg',
  },
  {
    id: '4',
    nome: 'Bola da Penalty S11 R2 XXIII',
    preco: 'R$ 467,90',
    imagem:
      'https://tse1.mm.bing.net/th/id/OIP.QSwCITqh-i8biqyWSbfR6QHaHa?r=0&cb=thumbexpctl1&rs=1&pid=ImgDetMain&o=7&rm=3',
  },
  {
    id: '5',
    nome: 'Chuteira da Nike Tiempo Legend 9 club',
    preco: 'R$ 499,90',
    imagem:
      'https://imgnike-a.akamaihd.net/1300x1300/012046IE.jpg',
  },
  {
    id: '6',
    nome: 'Chuteira Adidas 20.3 FG',
    preco: 'R$ 499,90',
    imagem:
      'https://static.netshoes.com.br/produtos/chuteira-adidas-predator-203-fg-campo-preta-e-vermelha/06/2FW-7193-006/2FW-7193-006_zoom1.jpg?ts=1610988415',
  },
  {
    id: '7',
    nome: 'Chuteira Puma Attacanto',
    preco: 'R$ 329,99',
    imagem:
      'https://imgmarketplace.lojasrenner.com.br/20001/2764/7010702300129/7510705209479/5.jpeg',
  },
  {
    id: '8',
    nome: 'Chuteira Umbro Class',
    preco: 'R$ 130,95',
    imagem:
      'https://static3.tcdn.com.br/img/img_prod/311840/chuteira_umbro_class_campo_preta_80278_3_20210806215811.jpg',
  },
  {
    id: '9',
    nome: 'Camisa do Flamengo 2022 Adidas',
    preco: 'R$ 399,99',
    imagem:
      'https://memoriasdoesporteoficial.com.br/wp-content/uploads/2022/07/WhatsApp-Image-2022-07-01-at-16.56.52-1-Copia.jpeg',
  },
  {
    id: '10',
    nome: 'Camisa do Fluminense 2025 Umbro',
    preco: 'R$ 257,96',
    imagem:
      'https://images.tcdn.com.br/img/img_prod/311840/camisa_umbro_fluminense_i_2025_patch_sul_americana_153546_1_8bfc13dab13a4a6cf2eda82fa36ea9f3.jpg',
  },
  {
    id: '11',
    nome: 'Camisa do Vasco 2024 Kappa',
    preco: 'R$ 369,90',
    imagem:
      'https://images.tcdn.com.br/img/img_prod/1205536/camisa_vasco_da_gama_i_2024_2025_kappa_masculina_original_631_1_769ab8914e20a519ab1820f2433c0ee8.jpg',
  },
  {
    id: '12',
    nome: 'Camisa do Botafogo 2024 Reebok',
    preco: 'R$ 189,90',
    imagem:
      'https://images.tcdn.com.br/img/img_prod/1052037/camisa_botafogo_home_2024_25_masculina_5033_1_9160aad030de0a2a937b071a1afce41f.jpg',
  },
];

// ======================================================
// FEEDBACK
// ======================================================

function MensagemFeedback({ tipo, mensagem, aoFechar }) {
  useEffect(() => {
    if (!mensagem) return;

    const temporizador = setTimeout(() => {
      aoFechar();
    }, 3500);

    return () => clearTimeout(temporizador);
  }, [mensagem, aoFechar]);

  if (!mensagem) return null;

  const corFundo = tipo === 'erro' ? '#D60000' : '#10B981';
  const icone = tipo === 'erro' ? 'alert-circle' : 'check-circle';

  return (
    <View
      style={[
        styles.feedbackContainer,
        { backgroundColor: corFundo },
      ]}
    >
      <Feather name={icone} size={20} color="#FFFFFF" />

      <Text style={styles.feedbackTexto}>
        {mensagem}
      </Text>

      <TouchableOpacity onPress={aoFechar}>
        <Feather name="x" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
}

// ======================================================
// CARD DO PRODUTO
// ======================================================

function CardProduto({ item, onEditar, setFeedback }) {
  const [quantidade, setQuantidade] = useState(1);

  const aumentarQtd = () => {
    setQuantidade((valorAtual) => valorAtual + 1);
  };

  const diminuirQtd = () => {
    setQuantidade((valorAtual) =>
      valorAtual > 1 ? valorAtual - 1 : 1
    );
  };

  const handleAdicionarAoCarrinho = () => {
    setFeedback({
      tipo: 'sucesso',
      texto: `${quantidade}x "${item.nome}" foi adicionado ao carrinho!`,
    });

    setQuantidade(1);
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        style={styles.btnEditarCard}
        onPress={() => onEditar(item)}
      >
        <Text style={styles.textoBtnEditarCard}>
          ✏️ Editar
        </Text>
      </TouchableOpacity>

      <View style={styles.containerImagem}>
        <Image
          source={{ uri: item.imagem }}
          style={styles.imagem}
        />
      </View>

      <Text style={styles.nome}>
        {item.nome}
      </Text>

      <Text style={styles.preco}>
        {item.preco}
      </Text>

      <View style={styles.acoesContainer}>
        <View style={styles.seletorQtd}>
          <TouchableOpacity
            style={styles.btnQtd}
            onPress={diminuirQtd}
          >
            <Text style={styles.textoBtnQtd}>-</Text>
          </TouchableOpacity>

          <Text style={styles.textoQtd}>
            {quantidade}
          </Text>

          <TouchableOpacity
            style={styles.btnQtd}
            onPress={aumentarQtd}
          >
            <Text style={styles.textoBtnQtd}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.btnCarrinho}
          onPress={handleAdicionarAoCarrinho}
          activeOpacity={0.8}
        >
          <Text style={styles.textoBtnCarrinho}>
            🛒 Adicionar
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ======================================================
// TELA DE USUÁRIOS
// ======================================================

function TelaUsuarios({
  onVoltar,
  usuarios,
  setUsuarios,
  onIrParaCadastro,
  setFeedback,
}) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [usuarioEditando, setUsuarioEditando] = useState(null);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [nivel, setNivel] = useState('Cliente');

  const [idParaExcluir, setIdParaExcluir] = useState(null);

  const abrirModalEdicao = (usuario) => {
    setUsuarioEditando(usuario);
    setNome(usuario.nome || '');
    setEmail(usuario.email || '');
    setNivel(usuario.nivel || 'Cliente');
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
    setUsuarioEditando(null);
    setNome('');
    setEmail('');
    setNivel('Cliente');
  };

  const salvarUsuario = async () => {
    if (!nome.trim() || !email.trim()) {
      setFeedback({
        tipo: 'erro',
        texto: 'Preencha o nome e o e-mail!',
      });
      return;
    }

    const emailValido = /\S+@\S+\.\S+/.test(email);

    if (!emailValido) {
      setFeedback({
        tipo: 'erro',
        texto: 'Digite um e-mail válido!',
      });
      return;
    }

    const listaAtualizada = usuarios.map((usuario) =>
      usuario.id === usuarioEditando.id
        ? {
            ...usuario,
            nome: nome.trim(),
            email: email.trim().toLowerCase(),
            nivel: nivel.trim() || 'Cliente',
          }
        : usuario
    );

    try {
      await setUsuarios(listaAtualizada);

      fecharModal();

      setFeedback({
        tipo: 'sucesso',
        texto: 'Usuário atualizado com sucesso!',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const confirmarExclusao = async (id) => {
    const listaFiltrada = usuarios.filter(
      (usuario) => usuario.id !== id
    );

    try {
      await setUsuarios(listaFiltrada);

      setIdParaExcluir(null);

      setFeedback({
        tipo: 'sucesso',
        texto: 'Usuário excluído com sucesso.',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.containerUsuarios}>
      <TouchableOpacity
        style={styles.btnVoltar}
        onPress={onVoltar}
      >
        <Feather
          name="arrow-left"
          size={24}
          color="#FFFFFF"
        />

        <Text style={styles.textoBtnVoltar}>
          Voltar ao Perfil
        </Text>
      </TouchableOpacity>

      <View style={styles.headerUsuarios}>
        <Text style={styles.tituloSecaoGeral}>
          Gerenciar Usuários
        </Text>

        <TouchableOpacity
          style={styles.btnNovoUserMini}
          onPress={onIrParaCadastro}
        >
          <Text style={styles.textoBtnNovoUserMini}>
            + Novo
          </Text>
        </TouchableOpacity>
      </View>

      {usuarios.length === 0 ? (
        <View style={styles.listaVazia}>
          <Feather
            name="users"
            size={45}
            color="#555555"
          />

          <Text style={styles.textoListaVazia}>
            Nenhum usuário cadastrado.
          </Text>

          <Text style={styles.subtextoListaVazia}>
            Clique em "+ Novo" para cadastrar um usuário.
          </Text>
        </View>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
          renderItem={({ item }) => (
            <View style={styles.cardUsuario}>
              <View style={{ flex: 1 }}>
                <Text style={styles.nomeUsuario}>
                  {item.nome}
                </Text>

                <Text style={styles.emailUsuario}>
                  {item.email}
                </Text>

                {item.CPF ? (
                  <Text style={styles.cpfUsuario}>
                    CPF: {item.CPF}
                  </Text>
                ) : null}

                <Text style={styles.badgeNivel}>
                  {item.nivel || 'Cliente'}
                </Text>
              </View>

              <View style={styles.containerAcoesUsuario}>
                <TouchableOpacity
                  style={styles.btnEditarCard}
                  onPress={() =>
                    abrirModalEdicao(item)
                  }
                >
                  <Text style={styles.textoBtnEditarCard}>
                    ✏️ Editar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnExcluirCard}
                  onPress={() =>
                    setIdParaExcluir(item.id)
                  }
                >
                  <Feather
                    name="trash-2"
                    size={16}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* ================================================
          MODAL DE EXCLUSÃO
      ================================================= */}

      <Modal
        visible={idParaExcluir !== null}
        animationType="fade"
        transparent
        onRequestClose={() =>
          setIdParaExcluir(null)
        }
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              styles.modalConfirmacao,
            ]}
          >
            <Feather
              name="alert-triangle"
              size={40}
              color="#E50914"
              style={{ marginBottom: 12 }}
            />

            <Text style={styles.tituloModal}>
              Excluir Usuário?
            </Text>

            <Text style={styles.textoConfirmacao}>
              Esta ação não poderá ser desfeita.
              Tem certeza?
            </Text>

            <View
              style={[
                styles.botoesModal,
                { width: '100%' },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.btnModal,
                  styles.btnCancelar,
                ]}
                onPress={() =>
                  setIdParaExcluir(null)
                }
              >
                <Text style={styles.textoBtnModal}>
                  Cancelar
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.btnModal,
                  styles.btnExcluirModal,
                ]}
                onPress={() =>
                  confirmarExclusao(idParaExcluir)
                }
              >
                <Text style={styles.textoBtnModal}>
                  Excluir
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ================================================
          MODAL DE EDIÇÃO
      ================================================= */}

      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent
        onRequestClose={fecharModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView
              showsVerticalScrollIndicator={false}
            >
              <Text style={styles.tituloModal}>
                Editar Usuário
              </Text>

              <Text style={styles.label}>
                Nome:
              </Text>

              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Nome completo"
                placeholderTextColor="#777"
              />

              <Text style={styles.label}>
                E-mail:
              </Text>

              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholder="E-mail"
                placeholderTextColor="#777"
              />

              <Text style={styles.label}>
                Nível / Função:
              </Text>

              <TextInput
                style={styles.input}
                value={nivel}
                onChangeText={setNivel}
                placeholder="Cliente"
                placeholderTextColor="#777"
              />

              <View style={styles.botoesModal}>
                <TouchableOpacity
                  style={[
                    styles.btnModal,
                    styles.btnCancelar,
                  ]}
                  onPress={fecharModal}
                >
                  <Text style={styles.textoBtnModal}>
                    Cancelar
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.btnModal,
                    styles.btnSalvar,
                  ]}
                  onPress={salvarUsuario}
                >
                  <Text style={styles.textoBtnModal}>
                    Salvar
                  </Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// ======================================================
// PERFIL
// ======================================================

function Perfil({
  onVoltar,
  onAbrirUsuarios,
  onIrParaCadastro,
}) {
  return (
    <ScrollView
      style={styles.perfilContainer}
      showsVerticalScrollIndicator={false}
    >
      <TouchableOpacity
        style={styles.btnVoltar}
        onPress={onVoltar}
      >
        <Feather
          name="arrow-left"
          size={24}
          color="#FFFFFF"
        />

        <Text style={styles.textoBtnVoltar}>
          Voltar à Loja
        </Text>
      </TouchableOpacity>

      <View style={styles.headerPerfil}>
        <View style={styles.avatarBorder}>
          <Image
            source={{
              uri:
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200',
            }}
            style={styles.avatar}
          />
        </View>

        <Text style={styles.nomePerfil}>
          Lucas
        </Text>

        <Text style={styles.tag}>
          Cliente LJLK Sports
        </Text>
      </View>

      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>
            Status do Cliente
          </Text>

          <Feather
            name="award"
            size={20}
            color="#E50914"
          />
        </View>

        <Text style={styles.cardStatus}>
          Membro VIP
        </Text>

        <Text style={styles.cardSubtext}>
          Plano Anual - LJLK Sports
        </Text>
      </View>

      <View style={styles.secao}>
        <Text style={styles.secaoTitulo}>
          Minha Conta
        </Text>

        <TouchableOpacity style={styles.itemMenu}>
          <View style={styles.itemMenuLeft}>
            <Feather
              name="shopping-bag"
              size={20}
              color="#E50914"
            />

            <Text style={styles.itemText}>
              Meus Pedidos
            </Text>
          </View>

          <Feather
            name="chevron-right"
            size={20}
            color="#666666"
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.botaoEditarUsuarios}
        onPress={onAbrirUsuarios}
      >
        <Feather
          name="users"
          size={20}
          color="#FFFFFF"
        />

        <Text style={styles.textoBotaoEditar}>
          VER / EDITAR USUÁRIOS
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botaoSair}
        onPress={onVoltar}
      >
        <Feather
          name="log-out"
          size={20}
          color="#FFFFFF"
        />

        <Text style={styles.textoBotaoSair}>
          Sair da Conta
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ======================================================
// APP PRINCIPAL
// ======================================================

export default function App() {
  const [telaAtual, setTelaAtual] = useState('loja');

  const [listaProdutos, setListaProdutos] =
    useState(produtosIniciais);

  // IMPORTANTE:
  // começa como array e não como undefined
  const [listaUsuarios, setListaUsuarios] =
    useState([]);

  const [carregandoUsuarios, setCarregandoUsuarios] =
    useState(true);

  const [modalVisivel, setModalVisivel] =
    useState(false);

  const [produtoEditando, setProdutoEditando] =
    useState(null);

  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [imagem, setImagem] = useState('');

  const [feedback, setFeedback] = useState(null);

  // ====================================================
  // CARREGAR USUÁRIOS DO ASYNCSTORAGE
  // ====================================================

  useEffect(() => {
    const carregarUsuarios = async () => {
      try {
        setCarregandoUsuarios(true);

        const listaSalva =
          await AsyncStorage.getItem('@lista_usuarios');

        if (listaSalva) {
          const usuarios = JSON.parse(listaSalva);

          if (Array.isArray(usuarios)) {
            setListaUsuarios(usuarios);
          } else {
            setListaUsuarios([]);
          }
        } else {
          setListaUsuarios([]);
        }
      } catch (error) {
        console.error(
          'Erro ao carregar usuários:',
          error
        );

        setListaUsuarios([]);

        setFeedback({
          tipo: 'erro',
          texto:
            'Não foi possível carregar os usuários.',
        });
      } finally {
        setCarregandoUsuarios(false);
      }
    };

    carregarUsuarios();
  }, []);

  // ====================================================
  // ATUALIZAR E SALVAR LISTA DE USUÁRIOS
  // ====================================================

  const atualizarUsuarios = async (novaLista) => {
    try {
      setListaUsuarios(novaLista);

      await AsyncStorage.setItem(
        '@lista_usuarios',
        JSON.stringify(novaLista)
      );

      return true;
    } catch (error) {
      console.error(
        'Erro ao salvar usuários:',
        error
      );

      setFeedback({
        tipo: 'erro',
        texto:
          'Não foi possível salvar as alterações.',
      });

      throw error;
    }
  };

  // ====================================================
  // ADICIONAR NOVO USUÁRIO
  // ====================================================

  const adicionarNovoUsuarioNaLista = async (
    novoUsuario
  ) => {
    try {
      const novaLista = [
        novoUsuario,
        ...listaUsuarios,
      ];

      await atualizarUsuarios(novaLista);

      return true;
    } catch (error) {
      console.error(
        'Erro ao adicionar usuário:',
        error
      );

      throw error;
    }
  };

  // ====================================================
  // CADASTRO DE PRODUTO
  // ====================================================

  const abrirModalCadastro = () => {
    setProdutoEditando(null);
    setNome('');
    setPreco('');
    setImagem('');
    setModalVisivel(true);
  };

  // ====================================================
  // EDIÇÃO DE PRODUTO
  // ====================================================

  const abrirModalEdicao = (produto) => {
    setProdutoEditando(produto);

    setNome(produto.nome);

    setPreco(
      produto.preco.replace('R$ ', '')
    );

    setImagem(produto.imagem);

    setModalVisivel(true);
  };

  // ====================================================
  // SALVAR PRODUTO
  // ====================================================

  const salvarProduto = () => {
    Keyboard.dismiss();

    if (
      !nome.trim() ||
      !preco.trim() ||
      !imagem.trim()
    ) {
      setFeedback({
        tipo: 'erro',
        texto:
          'Por favor, preencha todos os campos!',
      });

      return;
    }

    const precoLimpo = preco.trim();

    const precoFormatado =
      precoLimpo.startsWith('R$')
        ? precoLimpo
        : `R$ ${precoLimpo}`;

    if (produtoEditando) {
      const listaAtualizada =
        listaProdutos.map((item) =>
          item.id === produtoEditando.id
            ? {
                ...item,
                nome: nome.trim(),
                preco: precoFormatado,
                imagem: imagem.trim(),
              }
            : item
        );

      setListaProdutos(listaAtualizada);

      setFeedback({
        tipo: 'sucesso',
        texto:
          'Produto atualizado com sucesso!',
      });
    } else {
      const novoProduto = {
        id: String(Date.now()),
        nome: nome.trim(),
        preco: precoFormatado,
        imagem: imagem.trim(),
      };

      setListaProdutos([
        novoProduto,
        ...listaProdutos,
      ]);

      setFeedback({
        tipo: 'sucesso',
        texto:
          'Novo produto cadastrado com sucesso!',
      });
    }

    setNome('');
    setPreco('');
    setImagem('');
    setProdutoEditando(null);
    setModalVisivel(false);
  };

  // ====================================================
  // RENDER
  // ====================================================

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
      />

      <MensagemFeedback
        tipo={feedback?.tipo}
        mensagem={feedback?.texto}
        aoFechar={() => setFeedback(null)}
      />

      {/* ==================================================
          PERFIL
      ================================================== */}

      {telaAtual === 'perfil' && (
        <Perfil
          onVoltar={() =>
            setTelaAtual('loja')
          }
          onAbrirUsuarios={() =>
            setTelaAtual('usuarios')
          }
          onIrParaCadastro={() =>
            setTelaAtual('cadastroUsuario')
          }
        />
      )}

      {/* ==================================================
          USUÁRIOS
      ================================================== */}

      {telaAtual === 'usuarios' && (
        <>
          {carregandoUsuarios ? (
            <View style={styles.carregandoContainer}>
              <Text style={styles.textoCarregando}>
                Carregando usuários...
              </Text>
            </View>
          ) : (
            <TelaUsuarios
              onVoltar={() =>
                setTelaAtual('perfil')
              }
              usuarios={listaUsuarios}
              setUsuarios={atualizarUsuarios}
              onIrParaCadastro={() =>
                setTelaAtual(
                  'cadastroUsuario'
                )
              }
              setFeedback={setFeedback}
            />
          )}
        </>
      )}

      {/* ==================================================
          CADASTRO DE USUÁRIO
      ================================================== */}

      {telaAtual === 'cadastroUsuario' && (
        <CadastroUsuario
          onVoltar={() =>
            setTelaAtual('usuarios')
          }
          onAdicionarUsuario={
            adicionarNovoUsuarioNaLista
          }
          setFeedback={setFeedback}
        />
      )}

      {/* ==================================================
          LOJA
      ================================================== */}

      {telaAtual === 'loja' && (
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>
              LJLK Sports
            </Text>

            <TouchableOpacity
              style={styles.btnPerfil}
              onPress={() =>
                setTelaAtual('perfil')
              }
              activeOpacity={0.7}
            >
              <Feather
                name="user"
                size={22}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={abrirModalCadastro}
            activeOpacity={0.8}
          >
            <Text
              style={styles.textoBotaoCadastrar}
            >
              + Cadastrar Novo Produto
            </Text>
          </TouchableOpacity>

          <FlatList
            data={listaProdutos}
            keyExtractor={(item) =>
              String(item.id)
            }
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <CardProduto
                item={item}
                onEditar={abrirModalEdicao}
                setFeedback={setFeedback}
              />
            )}
            contentContainerStyle={{
              paddingBottom: 30,
            }}
          />

          {/* ==================================================
              MODAL DE PRODUTO
          ================================================== */}

          <Modal
            animationType="slide"
            transparent
            visible={modalVisivel}
            onRequestClose={() =>
              setModalVisivel(false)
            }
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                >
                  <Text style={styles.tituloModal}>
                    {produtoEditando
                      ? 'Editar Produto'
                      : 'Cadastrar Produto'}
                  </Text>

                  <Text style={styles.label}>
                    Nome do Produto:
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Camisa do Brasil 2026"
                    placeholderTextColor="#777"
                    value={nome}
                    onChangeText={setNome}
                  />

                  <Text style={styles.label}>
                    Preço:
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="Ex: 299,90"
                    placeholderTextColor="#777"
                    keyboardType="numeric"
                    value={preco}
                    onChangeText={setPreco}
                  />

                  <Text style={styles.label}>
                    URL da Imagem:
                  </Text>

                  <TextInput
                    style={styles.input}
                    placeholder="https://link-da-imagem.jpg"
                    placeholderTextColor="#777"
                    value={imagem}
                    onChangeText={setImagem}
                    autoCapitalize="none"
                  />

                  <View style={styles.botoesModal}>
                    <TouchableOpacity
                      style={[
                        styles.btnModal,
                        styles.btnCancelar,
                      ]}
                      onPress={() =>
                        setModalVisivel(false)
                      }
                    >
                      <Text
                        style={styles.textoBtnModal}
                      >
                        Cancelar
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={[
                        styles.btnModal,
                        styles.btnSalvar,
                      ]}
                      onPress={salvarProduto}
                    >
                      <Text
                        style={styles.textoBtnModal}
                      >
                        {produtoEditando
                          ? 'Atualizar'
                          : 'Salvar'}
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

// ======================================================
// ESTILOS
// ======================================================

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: '#000000',
  },

  feedbackContainer: {
    position: 'absolute',
    top: 45,
    left: 16,
    right: 16,
    zIndex: 9999,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },

  feedbackTexto: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 14,
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
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
  },

  btnEditarCard: {
    backgroundColor: '#262626',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E50914',
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

  modalConfirmacao: {
    alignItems: 'center',
    paddingVertical: 24,
  },

  tituloModal: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#E50914',
    textTransform: 'uppercase',
  },

  textoConfirmacao: {
    color: '#CCCCCC',
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 14,
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

  btnExcluirModal: {
    backgroundColor: '#D60000',
  },

  textoBtnModal: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

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

  containerUsuarios: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    backgroundColor: '#000000',
  },

  headerUsuarios: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },

  tituloSecaoGeral: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E50914',
    textTransform: 'uppercase',
    flex: 1,
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
    marginBottom: 3,
  },

  emailUsuario: {
    fontSize: 14,
    color: '#888888',
    marginBottom: 3,
  },

  cpfUsuario: {
    fontSize: 12,
    color: '#666666',
    marginBottom: 4,
  },

  badgeNivel: {
    fontSize: 12,
    color: '#E50914',
    fontWeight: '600',
  },

  containerAcoesUsuario: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 8,
  },

  btnExcluirCard: {
    backgroundColor: '#D60000',
    padding: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnNovoUserMini: {
    backgroundColor: '#E50914',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },

  textoBtnNovoUserMini: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 12,
  },

  listaVazia: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },

  textoListaVazia: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 15,
  },

  subtextoListaVazia: {
    color: '#777777',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 6,
  },

  carregandoContainer: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },

  textoCarregando: {
    color: '#FFFFFF',
    fontSize: 16,
  },
});
