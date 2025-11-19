export class NoticiasView {
    constructor(container) {
        this.container = container;
    }

    render(noticia) {
        this.container.innerHTML = `
            <div class="card-noticia">
                <h2>${noticia.titulo}</h2>
                <img src="${noticia.imagem_url}" style="width: 300px;">
                <p>${noticia.descricao_curta}</p>
                <p><small>${noticia.data_publicacao}</small></p>
            </div>
        `;
    }
}
