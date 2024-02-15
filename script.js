const html = document.querySelector("html");
const focoBtn = document.querySelector(".app__card-button--foco");
const curtoBtn = document.querySelector(".app__card-button--curto");
const longoBtn = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const title = document.querySelector(".app__title");
const buttons = document.querySelectorAll(".app__card-button");
const startPauseBtn = document.querySelector("#start-pause");
const startPauseSpan = document.querySelector("#start-pause span");
const startPauseImg = document.querySelector("#start-pause img");
const musicFoco = document.querySelector("#alternar-musica");
const timeScreen = document.querySelector("#timer");
const music = new Audio("/sons/luna-rise-part-one.mp3");
const soundsPlay = new Audio("sons/play.wav");
const soundsPause = new Audio("sons/pause.mp3");
const soundStop = new Audio("sons/beep.mp3");

let tempDecorrido = 1500;
let intervaloID = null;

music.loop = true;

musicFoco.addEventListener("change", () => {
  if (music.paused) music.play();
  else music.pause();
});
focoBtn.addEventListener("click", () => {
  tempDecorrido = 1500;
  alteraContexto("foco");
  focoBtn.classList.add("active");
});
curtoBtn.addEventListener("click", () => {
  tempDecorrido = 300;
  alteraContexto("descanso-curto");
  curtoBtn.classList.add("active");
});
longoBtn.addEventListener("click", () => {
  tempDecorrido = 900;
  alteraContexto("descanso-longo");
  longoBtn.classList.add("active");
});

function alteraContexto(contexto) {
  showTimer();
  buttons.forEach(function (contexto) {
    contexto.classList.remove("active");
  });

  html.setAttribute("data-contexto", contexto);
  banner.setAttribute("src", `/imagens/${contexto}.png`);
  switch (contexto) {
    case "foco":
      title.innerHTML = `Otimize a Sua produtividade, <strong class="app__title-strong"> megulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      title.innerHTML = `Que tal uma Respirada? <br> <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
      break;
    case "descanso-longo":
      title.innerHTML = `Hora de volta para a superfice. <br> <strong class="app__title-strong">Faça uma pausa Longa!</strong>`;
      break;
    default:
      break;
  }
}

const contagemRegreciva = () => {
  if (tempDecorrido <= 0) {
    soundStop.play();
    alert("Tempo Finalizado");
    zera();
    return;
  }
  tempDecorrido -= 1;
  showTimer();
};

startPauseBtn.addEventListener("click", iniciarOuPausar);

function iniciarOuPausar() {
  if (intervaloID) {
    zera();
    soundsPause.play();
    return;
  }
  intervaloID = setInterval(contagemRegreciva, 1000);
  soundsPlay.play();
  startPauseImg.setAttribute("src", "imagens/pause.png");
  startPauseSpan.textContent = "Pausa";
}

function zera() {
  clearInterval(intervaloID);
  intervaloID = null;
  startPauseImg.setAttribute("src", "imagens/play_arrow.png");
  startPauseSpan.textContent = "Continuar";
}

function showTimer() {
  const time = new Date(tempDecorrido * 1000);
  const tempFormat = time.toLocaleTimeString("pt-br", {
    minute: "2-digit",
    second: "2-digit",
  });
  timeScreen.textContent = `${tempFormat}`;
}

showTimer();
