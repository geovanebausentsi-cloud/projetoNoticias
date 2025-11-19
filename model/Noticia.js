export class Noticia{
     id;
     titulo;
     imagem_url;
     descricao_curta;
     conteudo_completo;
     data_publicacao;

    constructor(id, titulo, imagem_url, descricao_curta, conteudo_completo, data_publicacao) {
        this.id = id;
        this.titulo = titulo;
        this.imagem_url = imagem_url;
        this.descricao_curta = descricao_curta;
        this.conteudo_completo = conteudo_completo;
        this.data_publicacao = data_publicacao;
    }


}