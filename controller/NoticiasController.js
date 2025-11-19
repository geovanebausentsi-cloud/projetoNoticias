export class NoticiasController {
    constructor(feed, navegacao, view) {
        this.feed = feed;
        this.nav = navegacao;
        this.view = view;
    }

    iniciar() {
        const atual = this.nav.obterAtual();
        this.view.render(atual);
    }

    proximo() {
        const atual = this.nav.proximo();
        this.view.render(atual);
    }

    anterior() {
        const atual = this.nav.anterior();
        this.view.render(atual);
    }

    voltar() {
        const atual = this.nav.voltarPilha();
        this.view.render(atual);
    }
}
