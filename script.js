'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//starting condition
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};
   
//roling the dice function 

btnRoll.addEventListener('click', function () {
   if (playing){ 
  //1.generate a random dice roll
   const dice = Math.trunc(Math.random() * 6) + 1; 
  //2.dosplay dice
   diceEl.classList.remove('hidden');
   diceEl.src = `dice-${dice}.png`;

  //3.check for rolled :1 if true,switch to nest player
   if (dice !== 1)
   {
      //add dice to the current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
   } else
   {
      //swith to the next player
      switchPlayer();
   
      }
   }
});

btnHold.addEventListener('click', function () {
   if (playing)
   {
      // 1. add current score of the active player 

      scores[activePlayer] += currentScore;
      document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

      // 2. check if player's score is >= 100
      //finish the game

      if (scores[activePlayer] >= 1)
      {
         // game finished
         playing = false;
         diceEl.classList.add('hidden');

         document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
         document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

      }//switch to the next player 
      else
      {
         switchPlayer();
      }
   }



});

btnNew.addEventListener('click', function () {
   console.log(`new clicked`)
   document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
   currentScore = 0;
   document.getElementById(`current--${activePlayer}`).textContent = currentScore;
   currentScore = 0;
   document.getElementById(`current--${activePlayer}`).textContent = currentScore;

   activePlayer = 0;
   scores = [0, 0];
   diceEl.classList.add('hidden');
   player0El.classList.add('player--active');
   player1El.classList.remove('player--active');
   document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

   document.getElementById(`score--0`).textContent = 0;
   document.getElementById(`score--1`).textContent = 0; 

   playing = true;


})