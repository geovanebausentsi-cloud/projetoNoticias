import { FeedNoticias } from "./model/FeedNoticias.js";
import { Navegacao } from "./model/Navegacao.js";
import { NoticiasView } from "./view/NoticiasView.js";
import { NoticiasController } from "./controller/NoticiasController.js";
import { NOTICIAS_MOCK } from "./js/dados.js";

// PEGAR ELEMENTOS DO HTML EXISTENTES
const container = document.getElementById("area-noticia");
const btnProximo = document.getElementById("btnProximo");
const btnAnterior = document.getElementById("btnAnterior");
const btnVoltar = document.getElementById("btnVoltar");

// PEGAR NOVOS ELEMENTOS (ADMIN)
const btnAdicionar = document.getElementById("btnAdicionar");
const btnRemover = document.getElementById("btnRemover");
const inputTitulo = document.getElementById("novoTitulo");
const inputDescricao = document.getElementById("novaDescricao");
const inputIdRemover = document.getElementById("idRemover");

// INSTANCIAR MVC
const feed = new FeedNoticias(NOTICIAS_MOCK);
const nav = new Navegacao(feed.noticias);
const view = new NoticiasView(container);
const controller = new NoticiasController(feed, nav, view);

// INICIAR TELA
controller.iniciar();

// LIGAR BOTÕES DE NAVEGAÇÃO
btnProximo.addEventListener("click", () => controller.proximo());
btnAnterior.addEventListener("click", () => controller.anterior());
btnVoltar.addEventListener("click", () => controller.voltar());

// LIGAR BOTÕES DE ADMINISTRAÇÃO (CRUD)
btnAdicionar.addEventListener("click", () => {
    controller.adicionarNoticia(inputTitulo.value, inputDescricao.value);
    // Limpar campos
    inputTitulo.value = "";
    inputDescricao.value = "";
});

btnRemover.addEventListener("click", () => {
    controller.removerNoticia(parseInt(inputIdRemover.value));
    inputIdRemover.value = "";
});