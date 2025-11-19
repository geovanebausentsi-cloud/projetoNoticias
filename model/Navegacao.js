export class NavegacaoPilha {
    constructor(itens = []) {
        this.itens = itens;        // array genérico
        this.indice = 0;           // começa no primeiro
        this.historico = [];       // pilha interna
    }

    // --- funções de pilha ---
    empilhar(valor) {
        this.historico.push(valor);
    }

    desempilhar() {
        return this.historico.pop();
    }

    historicoVazio() {
        return this.historico.length === 0;
    }

    // --- navegação ---
    proximo() {
        if (this.indice >= this.itens.length - 1) {
            return this.obterAtual();  // limite alcançado
        }

        this.empilhar(this.indice);    // salva onde estava
        this.indice++;                 // avança

        return this.obterAtual();
    }

    anterior() {
        if (this.indice <= 0) {
            return this.obterAtual();  // limite inferior
        }

        this.empilhar(this.indice);
        this.indice--;

        return this.obterAtual();
    }

    voltarPilha() {
        if (this.historicoVazio()) {
            return this.obterAtual(); // nada para voltar
        }

        this.indice = this.desempilhar();
        return this.obterAtual();
    }

    obterAtual() {
        return this.itens[this.indice] || null;
    }
}




/*
A classe NavegacaoPilha gerencia a navegação sobre um array qualquer
mantendo o índice atual e registrando cada movimento em uma pilha interna.
Ela permite avançar, voltar, retornar ao item anterior registrado e acessar o item atual.
Esse comportamento é útil para histórico de navegação, galerias e sistemas de leitura.
Pode ser reutilizada em diferentes partes do projeto por ser totalmente genérica.
*/