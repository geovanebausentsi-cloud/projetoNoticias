export class FeedNoticias {
    noticias = [];    // Array de objetos Noticia
    historico = [];   // Pilha (Array) de índices de notícias visitadas
    indiceAtual = 0;  // Controla qual notícia está sendo vista

    constructor(listaInicial = []) {
        this.noticias = listaInicial;
    }

    // --- Métodos de CRUD ---
    adicionar(novaNoticia) {
        // calcula o próximo ID automaticamente
        const maxId = this.noticias.length
            ? Math.max(...this.noticias.map(n => n.id))
            : 0;
        novaNoticia.id = maxId + 1;
        this.noticias.push(novaNoticia);
        return novaNoticia.id;
    }

    removerPorId(id) {
        const indice = this.noticias.findIndex(n => n.id === id);
        if (indice === -1) return false;

        this.noticias.splice(indice, 1);

        // Ajusta índice atual, se necessário
        this.indiceAtual = Math.min(this.indiceAtual, this.noticias.length - 1);

        return indice; // para atualizar a NavegacaoPilha
    }

    // --- Métodos auxiliares ---
    buscarPorId(id) {
        return this.noticias.find(n => n.id === id) || null;
    }

    getAtual() {
        return this.noticias[this.indiceAtual] || null;
    }
}
