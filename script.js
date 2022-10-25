
function leDados() {
    let strDados = localStorage.getItem('db');
    let objDados = {};
    if (strDados) {
        objDados = JSON.parse(strDados);
    } else {
        objDados = {
            "dicas": [
                {
                    "lapide": false,
                    "id": 0,
                    "habilidade": "Farmar",
                    "descricao": "Farmar é uma habilidade que permite que você ganhe mais dinheiro e itens no jogo.",
                    "categoria": "Wave",
                    "midia": "https://www.youtube.com/watch?v=sR5iKfqvvk8",
                    "dificuldade": "Iniciante",
                },
                {
                    "lapide": false,
                    "id": 1,
                    "habilidade": "Controle de Mana",
                    "descricao": "Controle de Mana é uma habilidade que permite que você use mais habilidades no jogo.",
                    "categoria": "Skills do personagem",
                    "midia": "https://www.youtube.com/watch?v=KUzvBEqhpUE",
                    "dificuldade": "Intermediário",
                },
                {
                    "lapide": false,
                    "id": 2,
                    "habilidade": "Rotações",
                    "descricao": "Rotação é a capacidade de andar pelo mapa e procurar jogadas, feita de maneira correta uma boa rotação impede que o inimigo ganhe vantagem.",
                    "categoria": "Controle de Mapa",
                    "midia": "https://www.youtube.com/watch?time_continue=1&v=ykC6Z_5-9sA&feature=emb_logo",
                    "dificuldade": "Avançado",
                },
                {
                    "lapide": false,
                    "id": 3,
                    "habilidade": "Jogar de Suporte",
                    "descricao": "Jogar de Suporte é uma habilidade que permite que você ajude seus companheiros de equipe a ganhar o jogo.",
                    "categoria": "Suporte",
                    "midia": "https://www.youtube.com/watch?v=ke_ju5ZhbD8",
                    "dificuldade": "Iniciante",
                }
            ]
        }
            ;
    }
    return objDados;
}

function salvaDados(dados) {
    localStorage.setItem('db', JSON.stringify(dados));
}
function addDica() {
    let dados = leDados();
    let dificuldade = "";
    if (document.getElementById("campoDificuldade").value == 1) {
        dificuldade = "Iniciante";
    } else if (document.getElementById("campoDificuldade").value == 2) {
        dificuldade = "Intermediário";
    } else if (document.getElementById("campoDificuldade").value == 3) {
        dificuldade = "Avançado";
    }
    let dica = {
        "lapide": false,
        "id": dados.dicas.length,
        "habilidade": document.getElementById("campoHabilidade").value,
        "descricao": document.getElementById("campoDescricao").value,
        "categoria": document.getElementById("campoCategoria").value,
        "midia": document.getElementById("campoMidia").value,
        "dificuldade": dificuldade,
    }
    dados.dicas.push(dica);
    salvaDados(dados);
    alert("Dica adicionada com sucesso!");
    window.location.href = "index.html";
    mostraDicas();
}

function mostraDicas() {

    let tela = document.getElementById("tela");
    let strHtml = "";
    let objDados = leDados();
    for (i = 0; i < objDados.dicas.length; i++) {
        if (!objDados.dicas[i].lapide){
        strHtml += `<div id=${i} class=dica>`;
        strHtml += `<p><b>ID: </b>${objDados.dicas[i].id}  `;
        strHtml += ` <b>Habilidade: </b>${objDados.dicas[i].habilidade}  `;
        strHtml += ` <b>Categoria: </b>${objDados.dicas[i].categoria}`;
        strHtml += ` <b>Dificuldade: </b>${objDados.dicas[i].dificuldade}</p>`;
        strHtml += `<p><b>Descrição: </b>${objDados.dicas[i].descricao}</p>`;
        if (objDados.dicas[i].midia != "") {
            strHtml += `<p><b>Mídia: </b> <a href =${objDados.dicas[i].midia}> Link </a></p>`;
        }
        strHtml += "</div>";
    }
    }
    tela.innerHTML = strHtml;
}
//buttons
document.getElementById("botaoSalvar").addEventListener("click", addDica)
document.getElementById("botaoAlterar").addEventListener("click", editaDica)
document.getElementById("botaoApagar").addEventListener("click", apagaDica)

function editaDica() {
    let dados = leDados();
    if (document.getElementById("campoDificuldade").value == 1) {
        dificuldade = "Iniciante";
    } else if (document.getElementById("campoDificuldade").value == 2) {
        dificuldade = "Intermediário";
    } else if (document.getElementById("campoDificuldade").value == 3) {
        dificuldade = "Avançado";
    }
    let dica = {
        "lapide": false,
        "id": dados.dicas[index].id,
        "habilidade": document.getElementById("campoHabilidade").value,
        "descricao": document.getElementById("campoDescricao").value,
        "categoria": document.getElementById("campoCategoria").value,
        "midia": document.getElementById("campoMidia").value,
        "dificuldade": dificuldade,
    }
    dados.dicas[index]=dica;
    salvaDados(dados);
    alert("Dica alterada com sucesso!");
    console.log("editaDica");
    window.location.href = "index.html";
    mostraDicas();
}

function apagaDica(){
    let dados = leDados();
    dados.dicas[index].lapide = true;
    salvaDados(dados);
    alert("Dica apagada com sucesso!");
    window.location.href = "index.html";
    mostraDicas();
    console.log("apagaDica");
}

function CheckClick() {
    let lista = document.querySelectorAll(".dica");
    lista.forEach((item) => {
        item.onclick = trataEvento;
    });
}
let trataEvento = (evento) => {
    let objDados = leDados();
    let dificuldade = "";
    index = objDados.dicas[$(evento.target).attr("id")].id;
    console.log(objDados.dicas[$(evento.target).attr("id")]);
    document.getElementById("campoHabilidade").value = objDados.dicas[$(evento.target).attr("id")].habilidade;
    document.getElementById("campoDescricao").value = objDados.dicas[$(evento.target).attr("id")].descricao;
    document.getElementById("campoCategoria").value = objDados.dicas[$(evento.target).attr("id")].categoria;
    document.getElementById("campoMidia").value = objDados.dicas[$(evento.target).attr("id")].midia;
    if (objDados.dicas[$(evento.target).attr("id")].dificuldade == "Iniciante") {
        dificuldade = 1;
    } else if (objDados.dicas[$(evento.target).attr("id")].dificuldade == "Intermediário") {
        dificuldade = 2;
    } else if (objDados.dicas[$(evento.target).attr("id")].dificuldade == "Avançado") {
        dificuldade = 3;
    }
    document.getElementById("campoDificuldade").value = dificuldade;
    checkChange();
  };


function checkChange(){
    if(index >= 0) {
        botaoAlterar.disabled = false;
        botaoApagar.disabled = false;
    }
}


    onload = () => {
        var index = -1;
        console.log("Página carregada");
        mostraDicas();
        botaoSalvar.disabled = true;
        botaoAlterar.disabled = true;
        botaoApagar.disabled = true;
        let ValidaForm = () => {
            if (campoHabilidade.value == "" || campoDescricao.value == "" || campoCategoria.value == "" || campoDificuldade.value == 0) {
                botaoSalvar.disabled = true;
            } else {
                botaoSalvar.disabled = false;
            }
        }
        campoHabilidade.onchange = ValidaForm;
        campoDescricao.oninput = ValidaForm;
        campoCategoria.onchange = ValidaForm;
        campoDificuldade.onchange = ValidaForm;
        CheckClick();
    }



