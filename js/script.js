// /js/script.js

import { NOTICIAS_MOCK } from './dados.js'; // Importa a lista de notícias (o array)

// Variáveis globais para controlar o estado da aplicação
const feedNoticias = NOTICIAS_MOCK; // 1. Estrutura de dados: A lista de notícias (Array/Lista Encadeada)
const historicoNavegacao = []; // 3. Estrutura de dados: A pilha para o Histórico de navegação
let indiceNoticiaAtual = 0; // Para saber qual notícia da lista estamos a ver no momento

// -----------------------------------------------------
// 1. Renderização Inicial (Onde o seu código começa)
// -----------------------------------------------------

// Pega o elemento HTML onde vamos exibir as notícias
const conteinerNoticias = document.querySelector('.conteiner2');
// Pega o elemento principal de exibição da notícia única (vamos criar este em seguida)
const noticiaUnicaDiv = document.createElement('div');
noticiaUnicaDiv.classList.add('noticia-principal');
conteinerNoticias.appendChild(noticiaUnicaDiv);

// Função que 'desenha' a notícia na tela
function renderizarNoticia(indice) {
    // Garante que o índice está dentro dos limites da lista
    if (indice < 0 || indice >= feedNoticias.length) {
        console.error("Índice de notícia inválido:", indice);
        return;
    }

    const noticia = feedNoticias[indice];
    
    // **Renderiza a notícia atual**
    noticiaUnicaDiv.innerHTML = `
        <article class="card-noticia" data-id="${noticia.id}">
            <img src="${noticia.imagem_url}" alt="${noticia.titulo}" class="imagem-noticia">
            <div class="conteudo-card">
                <h2>${noticia.titulo}</h2>
                <p class="descricao-curta">${noticia.descricao_curta}</p>
                <p class="conteudo-completo">${noticia.conteudo_completo}</p>
                <span class="data-publicacao">Publicado em: ${formatarData(noticia.data_publicacao)}</span>
            </div>
        </article>
    `;

    // Atualiza o estado da aplicação
    indiceNoticiaAtual = indice;
}

// Pequena função para deixar a data mais bonita
function formatarData(dataISO) {
    const data = new Date(dataISO);
    return data.toLocaleDateString('pt-BR');
}

// -----------------------------------------------------
// 2. Adicionar Botões de Navegação e Controles
// -----------------------------------------------------

// Função para criar o HTML dos botões de controle (Próxima, Anterior, Voltar, etc.)
function criarControles() {
    const controlesHTML = `
        <div class="controles-navegacao">
            <button id="btn-anterior" disabled>Anterior</button>
            <button id="btn-proxima">Próxima</button>
            <button id="btn-voltar-historico" disabled>Voltar (Histórico)</button>
        </div>
        <hr>
        <div class="controles-gerenciamento">
            <h3>Gerenciamento da Lista (Feed)</h3>
            <button id="btn-adicionar">Adicionar Nova Notícia</button>
            <input type="number" id="input-remover-id" placeholder="ID para remover">
            <button id="btn-remover">Remover por ID</button>
        </div>
        <hr>
        <div class="lista-feed-atual">
             <h3>Feed Atual (IDs)</h3>
             <p id="feed-ids"></p>
        </div>
    `;
    conteinerNoticias.insertAdjacentHTML('afterbegin', controlesHTML);
    
    // Liga os botões às suas funções
    document.getElementById('btn-proxima').addEventListener('click', irParaProxima);
    document.getElementById('btn-anterior').addEventListener('click', irParaAnterior);
    document.getElementById('btn-voltar-historico').addEventListener('click', voltarHistorico);
    document.getElementById('btn-adicionar').addEventListener('click', adicionarNoticia);
    document.getElementById('btn-remover').addEventListener('click', removerNoticia);
}

// Função para atualizar o status dos botões
function atualizarBotoes() {
    // Navegação Próxima/Anterior
    document.getElementById('btn-anterior').disabled = indiceNoticiaAtual <= 0;
    document.getElementById('btn-proxima').disabled = indiceNoticiaAtual >= feedNoticias.length - 1;

    // Histórico
    document.getElementById('btn-voltar-historico').disabled = historicoNavegacao.length <= 0;
}

// Função para mostrar os IDs no rodapé de gerenciamento
function atualizarListaFeed() {
    const ids = feedNoticias.map(noticia => noticia.id).join(', ');
    document.getElementById('feed-ids').textContent = ids;
}

// -----------------------------------------------------
// 3. Funções de Navegação (Requisito 2 e 3)
// -----------------------------------------------------

// Função que empilha a notícia atual antes de mudar para a nova
function visitarNovaNoticia(novoIndice) {
    // Só empilha se a mudança não for um 'Voltar' do histórico
    if (indiceNoticiaAtual !== novoIndice) {
        // **3. Histórico de navegação:** Empilha a notícia atual
        historicoNavegacao.push(feedNoticias[indiceNoticiaAtual].id);
    }

    renderizarNoticia(novoIndice); // Desenha a nova notícia
    atualizarBotoes(); // Liga/Desliga os botões
    console.log("Histórico: ", historicoNavegacao);
}

// **2. Botão Próxima:** Anda para a frente na lista (Array)
function irParaProxima() {
    if (indiceNoticiaAtual < feedNoticias.length - 1) {
        visitarNovaNoticia(indiceNoticiaAtual + 1);
    }
}

// **2. Botão Anterior:** Anda para trás na lista (Array)
function irParaAnterior() {
    if (indiceNoticiaAtual > 0) {
        visitarNovaNoticia(indiceNoticiaAtual - 1);
    }
}

// **3. Botão Voltar:** Desempilha do Histórico
function voltarHistorico() {
    if (historicoNavegacao.length > 0) {
        // **3. Histórico de navegação:** Desempilha a última notícia vista
        const idUltimaNoticia = historicoNavegacao.pop(); 
        
        // Encontra o índice dessa notícia no feed
        const novoIndice = feedNoticias.findIndex(noticia => noticia.id === idUltimaNoticia);
        
        if (novoIndice !== -1) {
            // Não empilha de novo ao 'voltar'
            renderizarNoticia(novoIndice);
            atualizarBotoes(); 
            console.log("Voltando. Histórico atual: ", historicoNavegacao);
        } else {
            console.warn(`Notícia com ID ${idUltimaNoticia} não encontrada no feed.`);
            voltarHistorico(); // Tenta voltar para o item anterior
        }
    }
}

// -----------------------------------------------------
// 4. Funções de Gerenciamento da Lista (Requisito 4)
// -----------------------------------------------------

// **4. Adicionar nova notícia** (ao final da lista)
function adicionarNoticia() {
    // Cria uma notícia de teste
    const novaNoticia = {
        "id": Date.now(), // Usa o timestamp como ID único
        "titulo": "Nova Notícia Adicionada por Você!",
        "imagem_url": "https://via.placeholder.com/600x400?text=Nova+Noticia",
        "descricao_curta": "Esta é uma notícia de teste que você acabou de inserir na lista.",
        "conteudo_completo": "Parabéns, a funcionalidade de adição está a funcionar corretamente!",
        "data_publicacao": new Date().toISOString().split('T')[0]
    };

    feedNoticias.push(novaNoticia); // Adiciona ao final do Array
    alert(`Notícia com ID ${novaNoticia.id} adicionada!`);
    atualizarBotoes();
    atualizarListaFeed();
}

// **4. Remover notícia por ID**
function removerNoticia() {
    const idParaRemover = parseInt(document.getElementById('input-remover-id').value);

    if (isNaN(idParaRemover)) {
        alert("Por favor, insira um ID válido para remover.");
        return;
    }

    const indiceParaRemover = feedNoticias.findIndex(noticia => noticia.id === idParaRemover);

    if (indiceParaRemover === -1) {
        alert(`Notícia com ID ${idParaRemover} não encontrada.`);
        return;
    }

    feedNoticias.splice(indiceParaRemover, 1); // Remove o item do Array
    alert(`Notícia com ID ${idParaRemover} removida!`);

    // Após remover, reajusta a exibição para a notícia mais próxima (se o feed não estiver vazio)
    if (feedNoticias.length > 0) {
        const novoIndice = Math.min(indiceNoticiaAtual, feedNoticias.length - 1);
        // Garante que o histórico não seja afetado pela mudança
        renderizarNoticia(novoIndice); 
    } else {
        noticiaUnicaDiv.innerHTML = '<h2>Não há mais notícias no feed.</h2>';
        indiceNoticiaAtual = -1;
    }

    atualizarBotoes();
    atualizarListaFeed();
}

// -----------------------------------------------------
// Inicialização: O que acontece quando a página carrega
// -----------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
    criarControles(); // Primeiro cria os botões
    if (feedNoticias.length > 0) {
        renderizarNoticia(0); // Desenha a primeira notícia
    }
    atualizarBotoes(); // Garante que os botões estejam corretos no início
    atualizarListaFeed(); // Mostra os IDs iniciais
});