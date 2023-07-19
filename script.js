const modeloLabirinto = [
  "WWWWWWWWWWWWWWWWWWWWW",
  "W   W     W     W W W",
  "W W W WWW WWWWW W W W",
  "W W W   W     W W   W",
  "W WWWWWWW W WWW W W W",
  "W         W     W W W",
  "W WWW WWWWW WWWWW W W",
  "W W   W   W W     W W",
  "W WWWWW W W W WWW W F",
  "S     W W W W W W WWW",
  "WWWWW W W W W W W W W",
  "W     W W W   W W W W",
  "W WWWWWWW WWWWW W W W",
  "W       W       W   W",
  "WWWWWWWWWWWWWWWWWWWWW",
];

const posicaoInicial = { linha: 9, coluna: 0 };

let posicaoAtual = { linha: 9, coluna: 0 };
let movimentos = 0;

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
        celula.classList.add("parede");
      } else if (linha === posicao.linha && coluna === posicao.coluna) {
        celula.classList.add("jogador");
      } else if (celulaAtual === "F") {
        celula.classList.add("chegada");
      } else if (celulaAtual === " ") {
        celula.classList.add("caminho");
      }

      divLinha.appendChild(celula);
    }

    divLabirinto.appendChild(divLinha);
  }
}

function validarMovimento(labirinto, posicao) {
  const totalLinhas = labirinto.length;
  const totalColunas = labirinto[0].length;
  const linha = posicao.linha;
  const coluna = posicao.coluna;

  if (
    linha < 0 ||
    linha >= totalLinhas ||
    coluna < 0 ||
    coluna >= totalColunas ||
    labirinto[linha][coluna] === "W"
  ) {
    return false;
  }

  return true;
}

function moverJogador(labirinto, teclaPressionada) {
  const novaPosicao = {
    linha: posicaoAtual.linha,
    coluna: posicaoAtual.coluna,
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

  if (validarMovimento(labirinto, novaPosicao)) {
    posicaoAtual = novaPosicao;

    movimentos++;

    const encontrouChegada = verificarCondicaoDeVitoria(labirinto, novaPosicao);

    if (encontrouChegada) {
      console.log("CHEGOU AO FIM PARABENS");
      alternarResultado();
    }

    criarLabirinto(labirinto, posicaoAtual);
  }

  console.log(posicaoAtual);
}

function alternarResultado() {
  const containerResultado = document.querySelector("#container-resultado");

  if (containerResultado.classList.contains("esconder")) {
    containerResultado.classList.remove("esconder");
    containerResultado.classList.add("mostrar");
  } else {
    containerResultado.classList.remove("mostrar");
    containerResultado.classList.add("esconder");
  }

  const pResultado = document.querySelector("#resultado");
  pResultado.innerText = `Você venceu em ${movimentos} movimento(s)!!`;
}

function verificarCondicaoDeVitoria(labirinto, posicao) {
  const linha = posicao.linha;
  const coluna = posicao.coluna;

  return labirinto[linha][coluna] === "F";
}

document.addEventListener("keydown", function (evento) {
  evento.preventDefault();
  const teclaPressionada = evento.key;

  moverJogador(modeloLabirinto, teclaPressionada);
});

const btnResetarJogo = document.querySelector("#btn-resetar-jogo");
btnResetarJogo.addEventListener("click", function (evento) {
  console.log("Botão de Resetar funcionando");

  posicaoAtual = posicaoInicial;

  movimentos = 0;

  alternarResultado();

  criarLabirinto(modeloLabirinto, posicaoInicial);
});

criarLabirinto(modeloLabirinto, posicaoAtual);
