function guardaDados () {
    event.preventDefault();
    let titulo = document.querySelector('#form-titulo-post');
    let autor = document.querySelector('#form-autor-post');
    let conteudo = document.querySelector('#form-conteudo-post');
    let imagem = document.querySelector('#form-imagem-post');
    if (!(imagem.value.includes('.jpeg') || imagem.value.includes('.jpg') || imagem.value.includes('.png')) && imagem.value !== '') {
        alert('Insira um link válido de uma imagem');
    } else {
        let post = {
            titulo: titulo.value,
            autor: autor.value,
            conteudo: conteudo.value,
            imagem: imagem.value
        }
        publicaPost(post);
        posts.push(post);
    }
    titulo.value = '';
    autor.value = '';
    conteudo.value = '';
    imagem.value = '';
    titulo.focus();
}

function publicaPost (objeto) {
    let publicacao = document.querySelector('#main-content');
    publicacao.innerHTML += '<div class=\"main-post\">';
    publicacao.innerHTML += '<h2>' + objeto.titulo + '</h2>';
    publicacao.innerHTML += '<h4>Por: ' + objeto.autor + '</h4>';
    publicacao.innerHTML += '<p>' + objeto.conteudo + '</p>';
    if (objeto.imagem !== '') {
        publicacao.innerHTML += '<img src=\"' + objeto.imagem + '\" alt=\"imagem-post\">';
    }
    publicacao.innerHTML += '</div>';
}

let posts = [];