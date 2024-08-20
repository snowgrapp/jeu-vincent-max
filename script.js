const player = document.querySelector(".player");
const ground = document.querySelector(".ground");
const container = document.querySelector(".container");

const playerHeight = player.getBoundingClientRect().height;
const groundHeight = ground.getBoundingClientRect().height;
const containerHeight = container.clientHeight;
const playerWidth = player.getBoundingClientRect().width;

let playerTop = 0;
let playerLeft = 0;
let left = 0
let right = 0
let isJumping = false;



function updatePlayerPosition() {
  const containerHeight = container.clientHeight;
  // const groundTop = containerHeight - groundHeight;

  ground.style.position = "absolute";
  // ground.style.top = `${groundTop}px`;

  player.style.position = "absolute";
  player.style.top = `${playerTop}px`;
  player.style.left = `${playerLeft}px`;
}

////// GRAVITÉ ////////////
function startFallingAnimation() {
  const fallDistance = containerHeight - groundHeight - playerHeight;
  player.style.transition = "top 2s ease-in";
  player.style.top = `${fallDistance}px`;
  playerTop = fallDistance;
}


function checkCollision() {
  const playerRect = player.getBoundingClientRect();
  const groundRect = ground.getBoundingClientRect();
  if (playerRect.bottom >= groundRect.top) {
    playerTop = groundRect.top - playerHeight; // Ajuster la position du player au-dessus du ground
    player.style.top = `${playerTop}px`;
    console.log("colision")

    // Réinitialiser le mouvement vertical (saute ou tombe)
    isJumping = false;

    // Ajuster le player à la hauteur du sol
    player.style.transition = "none"; // Désactiver la transition pour un ajustement instantané
    setTimeout(() => {
      player.style.transition = "top 0.5s ease-out";
    }, 0);
  }
}

///////////////////////////////

////// AVANCER RECULER ///////
function movePlayer(left, right) {
  playerLeft += left;
  playerTop += right;
  player.style.left = `${playerLeft}px`;
  player.style.top = `${playerTop}px`;
}
///////////////////////////////

///// CONDITION POUR GAUCHE OU DROITE /////
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key === "ArrowLeft") {
    movePlayer(-10, 0);
  } else if (key === "ArrowRight") {
    movePlayer(10, 0);
  } else if (key === " ") {
    jump();
  }
});
/////////////////////////////////////

//////SAUTER///////
function jump() {
  if (isJumping) return;
  isJumping = true;
  let jumpHeight = 200;
  player.style.transition = "top 0.5s ease-out";
  player.style.top = `${playerTop - jumpHeight}px`;

  setTimeout(() => {
    player.style.transition = "top 0.5s ease-in";
    player.style.top = `${playerTop}px`;
    setTimeout(() => {
      isJumping = false;
    }, 500);
  }, 500);
}
////////////////////////////////

updatePlayerPosition();

setTimeout(startFallingAnimation, 200);

window.onresize = updatePlayerPosition;

function gameLoop() {
  movePlayer(left, right);
  jump();
  startFallingAnimation();
  updatePlayerPosition();
  checkCollision();
}

gameLoop();


