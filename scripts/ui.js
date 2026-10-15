// módulo de renderização

const listaContatos = document.querySelector(".contatos__lista");
const templateCard = document.querySelector("#template-contato-card");

const modalContato = document.querySelector("#modal-contato");
const formContato = document.querySelector("#form-contato");
const tituloModal = document.querySelector("#modal-contato-titulo");
const botaoSalvar = document.querySelector("#modal-contato-salvar");

const NOMES_CATEGORIA = {
  pessoal: "Pessoal",
  trabalho: "Trabalho",
  familia: "Família",
  amigos: "Amigos",
  outros: "Outros",
};

/* LISTA DE CONTATOS */
function criarCard(contato) {
  const card = templateCard.content.firstElementChild.cloneNode(true);
  card.dataset.id = contato.id;

  // textContent (e não innerHTML) para o texto digitado nunca virar HTML
  card.querySelector(".contato__card-nome").textContent = contato.nome;
  card.querySelector(".contato__card-email").textContent = contato.email;
  card.querySelector(".contato__card-telefone").textContent = contato.telefone;

  const favorito = card.querySelector(".contato__card-favorito");
  favorito.src = contato.favorito
    ? "assets/favorite.png"
    : "assets/no-favorite.png";
  favorito.alt = contato.favorito ? "Favorito" : "Não favorito";
  favorito.classList.toggle("contato__card-favorito--off", !contato.favorito);

  const tag = card.querySelector(".contato__card-tag");
  tag.textContent = NOMES_CATEGORIA[contato.categoria] ?? contato.categoria;
  tag.classList.add(`contato__card-tag--${contato.categoria}`);

  return card;
}

export function renderizarContatos(contatos) {
  listaContatos.replaceChildren(...contatos.map(criarCard));
}

/* POP-UP DE CADASTRO / EDIÇÃO */

// Sem contato = modo cadastro; com contato = modo edição
export function abrirModalContato(contato = null) {
  const modoEdicao = contato !== null;

  modalContato.classList.toggle("modal--edicao", modoEdicao);
  tituloModal.textContent = modoEdicao ? "Editar Contato" : "Novo Contato";
  botaoSalvar.textContent = modoEdicao ? "Salvar Alterações" : "Salvar Contato";

  if (modoEdicao) preencherFormulario(contato);

  modalContato.showModal();
}

export function fecharModalContato() {
  modalContato.close();
}

function preencherFormulario(contato) {
  const campos = formContato.elements;
  campos.id.value = contato.id;
  campos.nome.value = contato.nome;
  campos.email.value = contato.email;
  campos.telefone.value = contato.telefone;
  campos.categoria.value = contato.categoria;
  campos.favorito.checked = contato.favorito;
}

// Botões "×" e "Cancelar"
modalContato.querySelectorAll("[data-fechar-modal]").forEach((botao) => {
  botao.addEventListener("click", fecharModalContato);
});

// Clique fora do pop-up (no fundo escurecido) também fecha
modalContato.addEventListener("click", (evento) => {
  if (evento.target === modalContato) fecharModalContato();
});

// Sempre que fechar (Cancelar, ×, Esc ou após salvar), volta ao modo cadastro
modalContato.addEventListener("close", () => {
  formContato.reset();
  // reset() não limpa input hidden, então limpa na mão
  formContato.elements.id.value = "";
});
