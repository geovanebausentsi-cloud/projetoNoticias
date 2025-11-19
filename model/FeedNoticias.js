export class FeedNoticias {
    noticias;    // Array de objetos Noticia
    historico;   // Pilha (Array) de índices de notícias visitadas
    indiceAtual; // Número inteiro que controla qual notícia está sendo vista

    constructor(listaInicial = []) {
        this.noticias = listaInicial;
        this.historico = [];
        this.indiceAtual = 0;
    }

    // --- Métodos de CRUD ---
    adicionar(novaNoticia) {
        // calcula o próximo ID automaticamente
        const ids = this.noticias.map(n => n.id);
        const maxId = ids.length > 0 ? Math.max(...ids) : 0;
        novaNoticia.id = maxId + 1;
                    //adcionar ao fim do array
        this.noticias.push(novaNoticia);
        return novaNoticia.id;
    }

    removerPorId(id) {
        const indice = this.noticias.findIndex(n => n.id === id);

        if (indice === -1) {
            return false; // não encontrado
        }
                        //remove
        this.noticias.splice(indice, 1);

        // ajusta índice atual caso necessário
        if (this.indiceAtual >= this.noticias.length) {
            this.indiceAtual = Math.max(0, this.noticias.length - 1);
        }
        return true;
    }

    // --- Métodos auxiliares ---
    buscarPorId(id) { 
        return this.noticias.find(n => n.id === id) || null;
    }

    getAtual() { 
        return this.noticias[this.indiceAtual] || null;
    }
    
    


}