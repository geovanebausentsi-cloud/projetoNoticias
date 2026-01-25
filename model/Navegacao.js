export class Navegacao {
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

    // Método para corrigir o índice caso o array mude de tamanho (ex: remoção)
    verificarLimites() {
        if (this.itens.length === 0) {
            this.indice = 0;
            return null;
        }
        // Se o índice atual for maior que o último item, volta para o último
        if (this.indice >= this.itens.length) {
            this.indice = this.itens.length - 1;
        }
        return this.obterAtual();
    }

    //Método para corrigir o histórico de navegação
    ajustarHistorico(indiceRemovido) {
        //Filtra (Remove): Garante que nenhum índice no histórico aponte para o item removido.
        let novoHistorico = this.historico.filter(indiceSalvo =>
            indiceSalvo !== indiceRemovido
        );

        // Mapeia (Ajusta): Para todos os índices restantes, se o índice for  maior que o removido, ele é decrementado em 1.
        this.historico = novoHistorico.map(indiceSalvo => {
            if (indiceSalvo > indiceRemovido) {
                return indiceSalvo - 1;
            }
            return indiceSalvo; // mantém inalterado se for menor
        });
    }

}

/*
A classe NavegacaoPilha gerencia a navegação sobre um array qualquer
mantendo o índice atual e registrando cada movimento em uma pilha interna.
Ela permite avançar, voltar, retornar ao item anterior registrado e acessar o item atual.
Esse comportamento é útil para histórico de navegação, galerias e sistemas de leitura.
Pode ser reutilizada em diferentes partes do projeto por ser totalmente genérica.
*/