function adicionaTarefa () {
    event.preventDefault();
    let tarefa = document.querySelector('#tarefa');
    let dia = document.querySelector('#dia-semana');
    let horario = document.querySelector('#horario');
    if (tarefa.value !== '') {
        tarefaNoDia(tarefa.value, dia.value);
    } else {
        alert('Não é possível criar uma tarefa em branco!');
    }

    tarefa.value = '';
    tarefa.focus();
}

function tarefaNoDia (tarefa, dia) {
    document.querySelector('.' + dia).innerHTML += '<li onclick="riscaTarefa(event)">' + tarefa +'</li>'
}

function riscaTarefa (event) {
    event.target.classList.add('tarefa-cumprida');
}

function limpaTarefas () {
    event.preventDefault();
    let dias = ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
    for (let dia of dias) {
        document.querySelector('.' + dia).innerHTML = '<ul class=\"' + dia + '\">' + dia + '</ul>';
    }
}

let optionHorariosDisponiveis = document.querySelector('#horario');
// let horariosDisponiveis = document.querySelector('.lista-horarios');
for (let i = 0; i < 24; i++) {
    optionHorariosDisponiveis.innerHTML += '<option value=\"' + i + 'h\">' + i + 'h</option>';
    // horariosDisponiveis.innerHTML += '<li value=\"' + i + 'h\">' + i + 'h</li>'
}