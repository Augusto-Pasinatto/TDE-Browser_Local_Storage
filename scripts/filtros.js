// módulo de filtros

/*
  campo: "nome" ou "email" (vem do radio selecionado)
  texto: o que foi digitado na busca
  somenteFavoritos: true quando o checkbox "Favoritos" está marcado
*/
export function filtrarContatos(contatos, { campo, texto, somenteFavoritos }) {
  const termo = texto.trim().toLowerCase();

  return contatos.filter((contato) => {
    if (somenteFavoritos && !contato.favorito) return false; //exclui os contatos que não são favoritos.
    return contato[campo].toLowerCase().includes(termo); // termo vazio = todos
  });
}
