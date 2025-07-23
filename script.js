"use strict";

const score0Ele = document.querySelector("#score--0");
const score1Ele = document.getElementById("score--1");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");

const active0El = document.querySelector(".player--0");
const active1El = document.querySelector(".player--1");

const diceEle = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Modal logic
const howToPlayBtn = document.querySelector(".btn--howtoplay");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");

// Starting Conditions
// Declaring the variables as Global
let isPlaying, currentScore, activePlayer, score;
const startCondition = function () {
  isPlaying = true;
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];

  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEle.classList.add("hidden");
  active0El.classList.remove("player--winner");
  active1El.classList.remove("player--winner");
  active0El.classList.add("player--active");
  active1El.classList.remove("player--active");
  // Hide both trophies
  document.querySelector(".winner-trophy--0").classList.add("hidden");
  document.querySelector(".winner-trophy--1").classList.add("hidden");
};
startCondition();

const switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  active0El.classList.toggle("player--active");
  active1El.classList.toggle("player--active");
};
//Rolling dice Fucntionality
btnRoll.addEventListener("click", function () {
  if (isPlaying) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEle.classList.remove("hidden");
    diceEle.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      // current0El.textContent = currentScore;
    } else {
      document.getElementById(`current--${activePlayer}`).textContent = 0; // while moving to next plaver make previous player score as zero
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // active0El.classList.toggle("player--active");
      // active1El.classList.toggle("player--active");
      switchPlayer();
    }
  }
});

// Hold button functionality
btnHold.addEventListener("click", function () {
  if (isPlaying) {
    if (activePlayer === 0) {
      score[0] += currentScore;
      score0Ele.textContent = score[0];
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // active0El.classList.toggle("player--active");
      // active1El.classList.toggle("player--active");

      // currentScore = 0;
      iswinner();
      switchPlayer();
      current0El.textContent = 0;
    } else {
      score[1] += currentScore;
      score1Ele.textContent = score[1];
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // document.getElementById(`current--${activePlayer}`).textContent = 0;
      // active0El.classList.toggle("player--active");
      // active1El.classList.toggle("player--active");
      iswinner();
      switchPlayer();
      current1El.textContent = 0;
    }
  }
});

/// New Game Button fucntionality
btnNew.addEventListener("click", startCondition);

const iswinner = function () {
  if (score[activePlayer] >= 20) {
    isPlaying = false;
    diceEle.classList.add("hidden");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add("player--winner");
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove("player--active");
    // Show the trophy for the winner
    document
      .querySelector(`.winner-trophy--${activePlayer}`)
      .classList.remove("hidden");
  }
};

// Show modal on button click
howToPlayBtn.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

// Close modal when clicking on X
closeModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

// Close modal when clicking outside modal content
modal.addEventListener("click", e => {
  if (e.target === modal) {
    modal.classList.add("hidden");
  }
});
