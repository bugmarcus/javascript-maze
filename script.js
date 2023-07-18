const modeloLabirinto = [
  "WWWWWWWWWWWWWWWWWWWWW", // linha 0
  "W   W     W     W W W", // linha 1
  "W W W WWW WWWWW W W W", // linha 2
  "W W W   W     W W   W", // linha 3
  "W WWWWWWW W WWW W W W", // linha 4
  "W         W     W W W", // linha 5
  "W WWW WWWWW WWWWW W W", // linha 6
  "W W   W   W W     W W", // linha 7
  "W WWWWW W W W WWW W F", // linha 8
  "S     W W W W W W WWW", // linha 9
  "WWWWW W W W W W W W W", // linha 10
  "W     W W W   W W W W", // linha 11
  "W WWWWWWW WWWWW W W W", // linha 12
  "W       W       W   W", // linha 13
  "WWWWWWWWWWWWWWWWWWWWW", // linha 14
];
let posicaoJogador = { linha: 9, coluna: 0 };

function criarLabirinto(labirinto, posicao) {
  const divLabirinto = document.querySelector("#labirinto");
  divLabirinto.innerHTML = "";

  for (let linha = 0; linha < labirinto.length; linha++) {
    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");

    for (let coluna = 0; coluna < labirinto[linha].length; coluna++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");

      const celulaAtual = labirinto[linha][coluna];

      if (celulaAtual === "W") {
        celula.innerText = "W";
        celula.classList.add("parede");
      } else if (linha === posicao.linha && coluna === posicao.coluna) {
        celula.innerText = "S";
        celula.classList.add("jogador");
      } else if (celulaAtual === "F") {
        celula.innerText = "F";
        celula.classList.add("chegada");
      } else if (celulaAtual === "") {
        celula.classList.add("caminho");
      }

      divLinha.appendChild(celula);
    }
    divLabirinto.appendChild(divLinha);
  }
}

function validaMovimento(posicao) {
  const totalLinhas = modeloLabirinto.length;
  const totalColunas = modeloLabirinto[0].length;
  const linha = posicao.linha;
  const coluna = posicao.coluna;

  if (
    linha < 0 ||
    linha >= totalLinhas ||
    coluna < 0 ||
    coluna >= totalColunas ||
    modeloLabirinto[linha][coluna] === "W"
  ) {
    return false;
  }

  return true;
}

function mostraResultado() {
  const containerResultado = document.getElementById("container-resultado");
  containerResultado.style.display = "block";
}

function escondeResultado() {
  const containerResultado = document.getElementById("container-resultado");
  containerResultado.style.display = "none";
}

function verificaVitoria(posicao) {
  if (modeloLabirinto[posicao.linha][posicao.coluna] === "F") {
    mostraResultado();
    return true;
  }
  return false;
}

function resetarJogo() {
  posicaoJogador = { linha: 9, coluna: 0 };
  criarLabirinto(modeloLabirinto, posicaoJogador);
  escondeResultado();
}

document.addEventListener("keydown", function (evento) {
  const teclaPressionada = evento.key;
  const novaPosicao = {
    linha: posicaoJogador.linha,
    coluna: posicaoJogador.coluna,
  };

  if (teclaPressionada === "ArrowUp") {
    novaPosicao.linha -= 1;
  } else if (teclaPressionada === "ArrowDown") {
    novaPosicao.linha += 1;
  } else if (teclaPressionada === "ArrowLeft") {
    novaPosicao.coluna -= 1;
  } else if (teclaPressionada === "ArrowRight") {
    novaPosicao.coluna += 1;
  }

  if (validaMovimento(novaPosicao)) {
    posicaoJogador = novaPosicao;
    criarLabirinto(modeloLabirinto, posicaoJogador);
    verificaVitoria(posicaoJogador);
  }
});

const btnResetarJogo = document.getElementById("btn-resetar-jogo");
btnResetarJogo.addEventListener("click", resetarJogo);

criarLabirinto(modeloLabirinto, posicaoJogador);
