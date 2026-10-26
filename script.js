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
/*
import { filtrarContatos } from "./scripts/filtros.js";
*/

const botaoAdicionar = document.querySelector("#botao-adicionar");
const formContato = document.querySelector("#form-contato");
const listaContatos = document.querySelector(".contatos__lista");
const botaoRemover = document.querySelector("#modal-contato-remover");

renderizarContatos(obterContatos());

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
  renderizarContatos(obterContatos());
});

botaoRemover.addEventListener("click", () => {
  const { id, nome } = formContato.elements;
  if (!id.value) return;

  if (!confirm(`Remover o contato "${nome.value}"?`)) return;

  removerContato(id.value);
  fecharModalContato();
  renderizarContatos(obterContatos());
});
