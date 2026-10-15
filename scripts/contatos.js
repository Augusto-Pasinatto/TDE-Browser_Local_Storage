// módulo de contatos
import { salvarContatos, carregarContatos } from "./storage.js";

/*
  Estrutura de um contato:
  {
    id: "lq3k9x2a7f1",
    nome: "João Silva",
    email: "joao@email.com",
    telefone: "(54) 98888-7777",
    categoria: "trabalho", // pessoal | trabalho | familia | amigos | outros
    favorito: true
  }
*/
const contatos = carregarContatos();

function gerarId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
}

function normalizarDados({ nome, email, telefone, categoria, favorito }) {
  return {
    nome: nome.trim(),
    email: email.trim(),
    telefone: telefone.trim(),
    categoria,
    favorito: Boolean(favorito),
  };
}

export function obterContatos() {
  return [...contatos];
}

export function obterContatoPorId(id) {
  const contato = contatos.find((contato) => contato.id === id);
  return contato ? { ...contato } : null;
}

export function adicionarContato(dados) {
  const contato = { id: gerarId(), ...normalizarDados(dados) };

  contatos.push(contato);
  salvarContatos(contatos);
  return contato;
}

export function editarContato(id, dados) {
  const contato = contatos.find((contato) => contato.id === id);
  if (!contato) return null;

  Object.assign(contato, normalizarDados(dados));
  salvarContatos(contatos);
  return contato;
}
