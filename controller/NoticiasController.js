import { Noticia } from "../model/Noticia.js"; // Importe a classe Noticia

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

    // --- NOVAS FUNCIONALIDADES (Requisitos 11, 12, 24, 25) ---

    adicionarNoticia(titulo, descricao, imagemUrl, conteudoCompleto) {
        if (!titulo || !descricao) {
            alert("Preencha título e descrição!");
            return;
        }
        
        // Cria objeto Noticia (imagem genérica para teste)
        const nova = new Noticia(
            0, // ID será gerado no feed
            titulo, 
            imagemUrl || "https://via.placeholder.com/300", // Usa a URL fornecida ou um placeholder
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
        // Capturamos o retorno, que é o índice removido (ou false)
        const indiceRemovido = this.feed.removerPorId(id); 

        // Verificamos se foi um índice (um número)
        if (indiceRemovido !== false) { 
            alert(`Notícia ${id} removida.`);
            
            // 1. CHAMAMOS O NOVO MÉTODO DE AJUSTE
            this.nav.ajustarHistorico(indiceRemovido); 
            
            // 2. Revalida a navegação e atualiza a tela
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