// módulo de armazenamento

const CHAVE_STORAGE = "contatos";

export function salvarContatos(contatos) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(contatos));
}

export function carregarContatos() {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  if (!dados) return [];

  try {
    return JSON.parse(dados);
  } catch {
    // dado corrompido no Local Storage: começa com a lista vazia
    return [];
  }
}
