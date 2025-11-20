import { FeedNoticias } from "../model/FeedNoticias.js";
import { Navegacao } from "../model/Navegacao.js";
import { NoticiasView } from "../view/NoticiasView.js";
import { NoticiasController } from "../controller/NoticiasController.js";

import { NOTICIAS_MOCK } from "../js/dados.js";

console.log("=== Testando Controller ===");

const feed = new FeedNoticias(NOTICIAS_MOCK);
const nav = new Navegacao(feed.noticias);
const view = new NoticiasView();

const controller = new NoticiasController(feed, nav, view);

controller.iniciar();
controller.proximo();
controller.proximo();
controller.anterior();
controller.voltar();
