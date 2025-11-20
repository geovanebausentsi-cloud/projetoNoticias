export class NoticiasView {
    constructor(container) {
        this.container = container;
    }

    render(noticia) {
        // Verificação de segurança: se não houver notícia (null ou undefined)
        if (!noticia) {
            this.container.innerHTML = "<h3 style='text-align:center; padding:20px;'>Nenhuma notícia disponível.</h3>";
            return;
        }

        // Renderiza o card com o ID visível (para facilitar a remoção)
        this.container.innerHTML = `
            <div class="card-noticia">
                <div style="display:flex; justify-content:space-between; align-items: flex-start;">
                    <h2>${noticia.titulo}</h2>
                    <span style="background:#cc0000; color:white; padding:4px 8px; border-radius:4px; font-size:0.8rem; white-space: nowrap; margin-left: 10px;">
                        ID: ${noticia.id}
                    </span>
                </div>
                
                <img src="${noticia.imagem_url}" style="width: 100%; max-height: 300px; object-fit: cover; margin-top: 10px; border-radius: 4px;">
                
                <p style="margin-top: 10px;">${noticia.descricao_curta}</p>
                <p style="margin-top: 10px;">${noticia.conteudo_completo}</p>
                <p><small>Publicado em: ${noticia.data_publicacao}</small></p>
            </div>
        `;
    }
}