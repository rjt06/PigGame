
const diceEl = document.querySelector(".dice");
const current1ScoreEl = document.querySelector(".current-1-score");
const current2ScoreEl = document.querySelector(".current-2-score");
const winnerAnnounce = document.querySelector(".winner-announce");
const total1ScoreEl = document.querySelector(".total-1-score");
const total2ScoreEl = document.querySelector(".total-2-score");
const statusBoard = document.querySelector(".status-board");
const newGameBtn = document.querySelector(".new-game");
const main = document.querySelector(".main");
let randomNum = 1;
let playerTurnNum = 1;
let player1CurrentScore = 0;
let player2CurrentScore = 0;
let player1TotalScore = 0;
let player2TotalScore = 0;
const winningScore = 99;

document.querySelector(".roll-dice").addEventListener("click", () => {
  if (player1TotalScore < winningScore && player2TotalScore < winningScore) {
    randomNum = Math.floor(Math.random() * 6 + 1);
    changeDice(randomNum);
    lostIfOne(randomNum);
    addToCurrent(randomNum);
  }
})
document.querySelector(".hold").addEventListener("click", () => {
  playerChange();
  saveToTotal();
})
newGameBtn.addEventListener("click", restart)
function restart() {
  randomNum = 1;
  player1CurrentScore = 0;
  player2CurrentScore = 0;
  player1TotalScore = 0;
  player2TotalScore = 0;
  current1ScoreEl.textContent = 0;
  current2ScoreEl.textContent = 0;
  total1ScoreEl.textContent = 0;
  total2ScoreEl.textContent = 0;
  statusBoard.textContent = "▶️ LET'S GO"
  winnerAnnounce.style.transform = "translate(0, 100%)"
  diceEl.innerHTML = `<img src="dice-1.svg" alt="Dice">`
  winnerAnnounce.style.boxShadow = "0 0 0 rgba(0, 0, 0, 0.4)";
  main.style.boxShadow = "0rem 0.6rem 1rem rgba(0, 0, 0, 0.4)";
}

function lostIfOne(randomNum) {
  if (randomNum === 1) {
    player1CurrentScore = 0;
    player2CurrentScore = 0;
    current1ScoreEl.textContent = player1CurrentScore;
    current2ScoreEl.textContent = player2CurrentScore;
    if (playerTurnNum === 1) {
      setTimeout(() => {
        playerChange();
        statusBoard.textContent = "😞 PLAYER 1 LOST"
      }, 1200)
    } else if (playerTurnNum === 2) {
      setTimeout(() => {
        playerChange();
        statusBoard.textContent = "😞 PLAYER 2 LOST"
      }, 1200)
    }
  }
}
function saveToTotal() {
  player1TotalScore += player1CurrentScore;
  player1CurrentScore = 0;
  current1ScoreEl.textContent = player1CurrentScore;
  total1ScoreEl.textContent = player1TotalScore;
  player2TotalScore += player2CurrentScore;
  player2CurrentScore = 0;
  current2ScoreEl.textContent = player2CurrentScore;
  total2ScoreEl.textContent = player2TotalScore;
}
function addToCurrent(randomNum) {
  if (playerTurnNum === 1) {
    statusBoard.textContent = "🤸 PLAYER 1 TURN"
    player1CurrentScore += randomNum;
    setTimeout(() => {
      current1ScoreEl.textContent = player1CurrentScore;
    }, 1200)
    if ((player1CurrentScore + player1TotalScore) > winningScore) {
      player1TotalScore += player1CurrentScore;
      player1CurrentScore = 0;
      total1ScoreEl.textContent = player1TotalScore;
      current1ScoreEl.textContent = player1CurrentScore;
      statusBoard.textContent = "🥇 PLAYER 1 WON ";
      winnerAnnounce.textContent = "🎉 PLAYER 1 WON THE GAME 🎉";
      main.style.boxShadow = "0rem 0.6rem 1rem rgba(0, 0, 0, 0.4), 0 -0.4rem 0.8rem rgba(0, 0, 0, 0.4)";
      winnerAnnounce.style.transform = "translate(0, -70%)";
      winnerAnnounce.style.boxShadow = "0 0.6rem 1rem rgba(0, 0, 0, 0.4)";
      newGameBtn.style.transform = "scale(1.5)";
    }
  } else if (playerTurnNum === 2) {
    statusBoard.textContent = "🤸 PLAYER 2 TURN"
    player2CurrentScore += randomNum;
    setTimeout(() => {
      current2ScoreEl.textContent = player2CurrentScore;
    }, 1200)
    if ((player2CurrentScore + player2TotalScore) > winningScore) {
      player2TotalScore += player2CurrentScore;
      player2CurrentScore = 0;
      total2ScoreEl.textContent = player2TotalScore;
      current2ScoreEl.textContent = player2CurrentScore;
      statusBoard.textContent = "🥇 PLAYER 2 WON ";
      winnerAnnounce.textContent = "🎉 PLAYER 2 WON THE GAME 🎉";
      main.style.boxShadow = "0rem 0.6rem 1rem rgba(0, 0, 0, 0.4), 0 -0.4rem 0.8rem rgba(0, 0, 0, 0.4)";
      winnerAnnounce.style.transform = "translate(0, -70%)"
      winnerAnnounce.style.boxShadow = "0 0.6rem 1rem rgba(0, 0, 0, 0.4)";
      newGameBtn.style.transform = "scale(1.5)";
    }
  }
}
function playerChange() {
  if (playerTurnNum === 1) {
    document.querySelector(".highlight-card").style.transform = "translate(99%, 0%)"
    statusBoard.textContent = "🤸 PLAYER 2 TURN"
    playerTurnNum = 2;
  } else if (playerTurnNum === 2) {
    document.querySelector(".highlight-card").style.transform = "translate(0%, 0%)"
    statusBoard.textContent = "🤸 PLAYER 1 TURN"
    playerTurnNum = 1;
  }
}
function changeDice(randomNum) {
  const arr = ["translate(1rem, 0rem)", "translate(0rem, 1rem)", "translate(0rem, -1rem)", "translate(-1rem, 0rem)", "rotate(90deg)", "rotate(-90deg)"
  ];
  let randomTransform = 0;
  const myInterval = setInterval(() => {
    randomTransform = Math.floor(Math.random() * 7 + 1);
    diceEl.style.transform = arr[randomTransform];
  }, 20)
  setTimeout(() => {
    clearInterval(myInterval);
    diceEl.innerHTML = `<img src="dice-${randomNum}.svg" alt="Dice">`
    diceEl.style.transform = "translate(0rem, 0rem),rotate(0deg)";
  }, 1000)
  newGameBtn.style.transform = "scale(1)";
}

document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "Enter":
      if (player1TotalScore < winningScore && player2TotalScore < winningScore) {
        randomNum = Math.floor(Math.random() * 6 + 1);
        changeDice(randomNum);
        lostIfOne(randomNum);
        addToCurrent(randomNum);
      }
      break;
    case "h":
      playerChange();
      saveToTotal();
      break;
    case "n":
      restart()
      break;
  }
})
