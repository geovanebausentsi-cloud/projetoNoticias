import { Noticia } from "../model/Noticia.js"; 

export class NoticiasController {
    constructor(feed, navegacao, view) {
        this.feed = feed;
        this.nav = navegacao;
        this.view = view;
    }

    iniciar() {
        this.atualizarTela();
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

    adicionarNoticia(titulo, descricao, imagemUrl, conteudoCompleto) {
        if (!titulo || !descricao) {
            alert("Preencha título e descrição!");
            return;
        }
        
        const nova = new Noticia(
            0, // ID será gerado no feed
            titulo, 
            imagemUrl || "https://http.cat/images/200.jpg",//img padrão caso a url não for inserida
            descricao, 
            conteudoCompleto, 
            new Date().toISOString().split('T')[0]
        );

        this.feed.adicionar(nova);
        alert("Notícia adicionada com sucesso!");
        
        // Opcional: Ir para a nova notícia
        // this.nav.indice = this.feed.noticias.length - 1;
        // this.atualizarTela();
    }

    removerNoticia(id) {
        // o retorno, que é o índice removido (ou false)
        const indiceRemovido = this.feed.removerPorId(id); 

        if (indiceRemovido !== false) { 
            alert(`Notícia ${id} removida.`);
            this.nav.ajustarHistorico(indiceRemovido); 
            
            // Revalida a navegação e atualiza a tela
            const atual = this.nav.verificarLimites();
            this.view.render(atual);
        } else {
            alert("ID não encontrado.");
        }
    }

    atualizarTela() {
        const atual = this.nav.obterAtual();
        this.view.render(atual);
    }
}