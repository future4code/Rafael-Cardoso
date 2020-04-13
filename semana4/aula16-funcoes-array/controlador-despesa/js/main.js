function recebeDespesa () {
    event.preventDefault();
    let valor = document.querySelector('#form-valor-cadastro');
    let tipo = document.querySelector('#form-tipo-cadastro');
    let descricao = document.querySelector('#form-descricao-cadastro');
    let valorTotal = 0;
    if (Number(valor.value) >= 0) {
        let despesa = {
            valor: Number(valor.value),
            tipo: tipo.value,
            descricao: descricao.value
        }
        despesas.push(despesa);
        preencheLista(despesa);
        valor.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.focus();
    } else {
        alert('Valor deve ser positivo.')
    }
    despesas.forEach(despesa => {
        valorTotal += despesa.valor;
    });
    preencheValor(valorTotal, 'valor-total')
}

function preencheLista (objeto) {
    let publicacao = document.querySelector('#lista-despesas');
    publicacao.innerHTML += '<p>Descrição: ' + objeto.descricao + '</p>';
    publicacao.innerHTML += '<p>Tipo: ' + objeto.tipo + '</p>';
    publicacao.innerHTML += '<p>Valor: ' + objeto.valor + '</p>';
}

function filtra () {
    event.preventDefault();
    let filtroTipo = document.querySelector('#form-tipo-filtro');
    let filtroMin = document.querySelector('#form-valor-minimo-filtro');
    let filtroMax = document.querySelector('#form-valor-maximo-filtro');
    let valorTotalFiltro = 0;
    let despesasFiltro = despesas;
    if (filtroTipo.value !== '') {
        despesasFiltro = despesasFiltro.filter(despesa => {
            return despesa.tipo === filtroTipo.value;
        });
    }
    if (filtroMin.value !== '') {
        despesasFiltro = despesasFiltro.filter(despesa => {
            return despesa.valor >= filtroMin.value;
        });
    }
    if (filtroMax.value !== '') {
        despesasFiltro = despesasFiltro.filter(despesa => {
            return despesa.valor <= filtroMax.value;
        });
    }
    document.querySelector('#lista-despesas').innerHTML = '';
    despesasFiltro.forEach(despesa => {
        preencheLista(despesa);
        valorTotalFiltro += despesa.valor
    });
    if (filtroTipo.value !== '') {
        preencheValor(valorTotalFiltro, 'valor-total-tipo-filtro')
    } else {
        preencheValor('', 'valor-total-tipo-filtro')  
    }
}

function limpaFiltros () {
    event.preventDefault();
    document.querySelector('#form-tipo-filtro').value = '';
    document.querySelector('#form-valor-minimo-filtro').value = '';
    document.querySelector('#form-valor-maximo-filtro').value = '';
    filtra();
}

function preencheValor (valor, id) {
    document.querySelector(`#${id}`).innerHTML = valor;
}

let despesas = [];