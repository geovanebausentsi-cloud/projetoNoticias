import { FeedNoticias } from "./model/FeedNoticias.js";
import { NavegacaoPilha } from "./model/navegacao.js";
import { NoticiasView } from "./view/NoticiasView.js";
import { NoticiasController } from "./controller/NoticiasController.js";
import { NOTICIAS_MOCK } from "./js/dados.js";

// PEGAR ELEMENTOS DO HTML
const container = document.getElementById("area-noticia");
const btnProximo = document.getElementById("btnProximo");
const btnAnterior = document.getElementById("btnAnterior");
const btnVoltar = document.getElementById("btnVoltar");

// INSTANCIAR MVC
const feed = new FeedNoticias(NOTICIAS_MOCK);
const nav = new NavegacaoPilha(feed.noticias);
const view = new NoticiasView(container);
const controller = new NoticiasController(feed, nav, view);

// INICIAR TELA
controller.iniciar();

// LIGAR BOTÕES
btnProximo.addEventListener("click", () => controller.proximo());
btnAnterior.addEventListener("click", () => controller.anterior());
btnVoltar.addEventListener("click", () => controller.voltar());
