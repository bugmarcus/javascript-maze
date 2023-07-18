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
  // Div final que receberá todas as linhas
  const divLabirinto = document.querySelector("#labirinto");
  divLabirinto.innerHTML = "";

  for (let linha = 0; linha < labirinto.length; linha++) {
    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");

    for (let coluna = 0; coluna < labirinto[linha].length; coluna++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");

      const celulaAtual = labirinto[linha][coluna];

      // 1 - Quando a celula é W
      if (celulaAtual === "W") {
        celula.innerText = "W";
        celula.classList.add("parede");
        // } else if (celulaAtual === "S") {
      } else if (linha === posicao.linha && coluna === posicao.coluna) {
        celula.innerText = "S";
        // 2 - Quando a celula é "S"
        celula.classList.add("jogador");
      } else if (celulaAtual === "F") {
        celula.innerText = "F";
        // 3 - Quando a celula é "F"
        celula.classList.add("chegada");
      } else if (celulaAtual === "") {
        // 4 - Quando a celula é ""
        celula.classList.add("caminho");
      }

      divLinha.appendChild(celula);
    }
    divLabirinto.appendChild(divLinha);
    // console.log(divLinha);
  }
}

function validaMovimento(posicao) {
  const totalLinhas = modeloLabirinto.length; // 15
  const totalColunas = modeloLabirinto[0].length; // 21
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

  // if (modeloLabirinto[linha][coluna] === "W") {
  //   return false;
  // }

  return true;
}

function verificaVitoria(posicao) {
  return modeloLabirinto[posicao.linha][posicao.coluna] === "F";
}

document.addEventListener("keydown", function (evento) {
  const teclaPressionada = evento.key;
  const novaPosicao = {
    linha: posicaoJogador.linha,
    coluna: posicaoJogador.coluna,
  };

  // Identificando a tecla apertada;
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

    if (verificaVitoria(posicaoJogador)) {
      alert("Parabéns, você venceu!");
    }
  }
});

criarLabirinto(modeloLabirinto, posicaoJogador);
