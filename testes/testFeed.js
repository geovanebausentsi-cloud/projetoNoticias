// Importando o Model
import { FeedNoticias } from "../model/FeedNoticias.js";
import { Noticia } from "../model/Noticia.js";
import { NOTICIAS_MOCK } from "../js/dados.js";

console.log("=== INICIANDO TESTES DO MODEL ===");

// Criar instância do Feed com dados iniciais
const feed = new FeedNoticias(NOTICIAS_MOCK);

console.log("1) Lista inicial carregada:");
console.log(feed.noticias);

// Teste de adicionar
const nova = new Noticia(
    null,
    "Notícia de Teste",
    "img.png",
    "Uma descrição curta",
    "Um conteúdo completo de teste",
    "2025-11-20"
);

const novoId = feed.adicionar(nova);

console.log("2) Depois de adicionar nova notícia:");
console.log("Novo ID:", novoId);
console.log(feed.noticias);

// Teste de buscar
const resultadoBusca = feed.buscarPorId(novoId);

console.log("3) Resultado da busca:");
console.log(resultadoBusca);

// Teste de remover
const removeu = feed.removerPorId(novoId);

console.log("4) Resultado ao remover notícia recém criada:");
console.log(removeu);
console.log(feed.noticias);

// Teste de notícia atual
console.log("5) Notícia atual:");
console.log(feed.getAtual());

console.log("=== FIM DOS TESTES ===");
