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

function criarLabirinto(labirinto) {
  const divLabirinto = document.querySelector("#labirinto");

  for (let linha = 0; linha < labirinto.length; linha++) {
    const divLinha = document.createElement("div");
    divLinha.classList.add("linha");

    for (let coluna = 0; coluna < labirinto[linha].length; coluna++) {
      const celula = document.createElement("div");
      celula.classList.add("celula");
      //   console.log(celula);
      const celulaAtual = labirinto[linha][coluna];

      if (celulaAtual === "W") {
        celula.innerText = "W";
        celula.classList.add("parede");
      } else if (celulaAtual === "S") {
        celula.innerText = "S";
        celula.classList.add("jogador");
      } else if (celulaAtual === "F") {
        celula.innerText = "F";
        celula.classList.add("chegada");
      } else {
        celula.classList.add("caminho");
      }

      divLinha.appendChild(celula);
    }
    divLabirinto.appendChild(divLinha);
  }
  //   console.log(divLabirinto);
}

document.addEventListener("keydown", function (evento) {
  const teclaPressionada = evento.key;
  //   console.log(evento.key);

  if (teclaPressionada === "W") {
    console.log("Tecla para cima apertada");
  }
  if (teclaPressionada === "A") {
    console.log("Tecla para Esquerda apertada");
  }
  if (teclaPressionada === "S") {
    console.log("Tecla para baixo apertada");
  }
  if (teclaPressionada === "D") {
    console.log("Tecla para Direita apertada");
  }
});

criarLabirinto(modeloLabirinto);
