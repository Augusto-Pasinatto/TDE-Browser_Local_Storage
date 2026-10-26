import {
  adicionarContato,
  editarContato,
  obterContatoPorId,
  obterContatos,
  removerContato,
} from "./scripts/contatos.js";
import {
  abrirModalContato,
  fecharModalContato,
  renderizarContatos,
} from "./scripts/ui.js";
import { filtrarContatos } from "./scripts/filtros.js";

const botaoAdicionar = document.querySelector("#botao-adicionar");
const formContato = document.querySelector("#form-contato");
const listaContatos = document.querySelector(".contatos__lista");
const botaoRemover = document.querySelector("#modal-contato-remover");

const campoPesquisa = document.querySelector("#contatos__pesquisa-filtro");
const radiosTipoPesquisa = document.querySelectorAll(
  'input[name="tipoPesquisa"]',
);
const checkboxFavoritos = document.querySelector("#favorito");

// Lê o estado atual dos filtros do aside
function lerFiltros() {
  return {
    campo: document.querySelector('input[name="tipoPesquisa"]:checked').value,
    texto: campoPesquisa.value,
    somenteFavoritos: checkboxFavoritos.checked,
  };
}

// Redesenha a lista sempre respeitando os filtros
function atualizarLista() {
  const todos = obterContatos();
  const filtrados = filtrarContatos(todos, lerFiltros());

  // lista vazia de verdade x filtro que não encontrou nada
  const mensagemVazia =
    todos.length === 0
      ? "Nenhum contato cadastrado."
      : "Nenhum resultado encontrado.";

  renderizarContatos(filtrados, mensagemVazia);
}

atualizarLista();

/* FILTROS */

// "input" dispara a cada tecla (e ao limpar no "x" do campo search)
campoPesquisa.addEventListener("input", atualizarLista);

radiosTipoPesquisa.forEach((radio) => {
  radio.addEventListener("change", () => {
    campoPesquisa.placeholder =
      radio.value === "email" ? "Pesquisar por e-mail" : "Pesquisar por nome";
    atualizarLista();
  });
});

checkboxFavoritos.addEventListener("change", atualizarLista);

/* CONTATOS */

// arrow function para não passar o evento de clique como "contato"
botaoAdicionar.addEventListener("click", () => abrirModalContato());

// Um único listener na lista atende os botões de todos os cards
listaContatos.addEventListener("click", (evento) => {
  const botaoEditar = evento.target.closest('[data-acao="editar"]');
  if (!botaoEditar) return;

  const id = botaoEditar.closest(".contato__card").dataset.id;
  const contato = obterContatoPorId(id);
  if (contato) abrirModalContato(contato);
});

formContato.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const dados = new FormData(formContato);
  const id = dados.get("id");
  const contato = {
    nome: dados.get("nome"),
    email: dados.get("email"),
    telefone: dados.get("telefone"),
    categoria: dados.get("categoria"),
    favorito: dados.get("favorito") === "on",
  };

  if (id) {
    editarContato(id, contato);
  } else {
    adicionarContato(contato);
  }

  fecharModalContato();
  atualizarLista();
});

botaoRemover.addEventListener("click", () => {
  const { id, nome } = formContato.elements;
  if (!id.value) return;

  if (!confirm(`Remover o contato "${nome.value}"?`)) return;

  removerContato(id.value);
  fecharModalContato();
  atualizarLista();
});
