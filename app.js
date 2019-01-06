/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let scores, roundScore, activePlayer, gamePlaying;
let diceDOM = document.querySelector('.dice');
let diceDOMSecond = document.querySelector('.second-dice');

window.onload = function()
{
    initGame();
}

document.querySelector('.btn-roll').addEventListener('click', rollDice);
document.querySelector('.btn-hold').addEventListener('click', holdScore);
document.querySelector('.btn-new').addEventListener('click', initGame);

function rollDice()
{
    if (gamePlaying)
    {
        // 1. Get random number
        let dice = Math.floor(Math.random() * 6) + 1;
        let second_dice = Math.floor(Math.random() * 6) + 1;
        // 2. Display the result
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        diceDOMSecond.style.display = 'block';
        diceDOMSecond.src = 'dice-' + second_dice + '.png';

        document.querySelector(`#current-${activePlayer}`).textContent = dice;

        // 3. Update the round score IF the rolled number was !== 1
        if(dice !== 1 && second_dice !== 1)
        {
            // add score
            roundScore += (dice + second_dice);
            document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
        } else 
        {
            // next player
            nextPlayerSwap();
        }
    }
}

function holdScore()
{
    if(gamePlaying){
        // Add current score to global score
        scores[activePlayer] += roundScore;

        // Check if player won the game
        if(scores[activePlayer] >= 100){
            document.querySelector(`#name-${activePlayer}`).textContent = 'Winner!'; 
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            diceDOM.style.display = 'none';
            diceDOMSecond.style.display = 'none';
            // document.querySelector(`.btn-roll`).setAttribute('disabled', true);
            gamePlaying = false;
        } else {
            // Update UI
            nextPlayerSwap();
        }
    }
}

function nextPlayerSwap()
{
    document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
    roundScore = 0;
    document.getElementById(`score-${activePlayer}`).textContent = scores[activePlayer];
    document.getElementById(`current-${activePlayer}`).textContent = 0;
    activePlayer  === 0 ? activePlayer = 1 : activePlayer = 0;
    document.querySelector(`.player-${activePlayer}-panel`).classList.add('active');
    diceDOM.style.display = 'none';
    diceDOMSecond.style.display = 'none';
}

function initGame()
{
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;

    diceDOM.style.display = 'none';
    diceDOMSecond.style.display = 'none';

    document.getElementById('score-0').textContent = 0;
    document.getElementById('score-1').textContent = 0;
    document.getElementById('current-0').textContent = 0;
    document.getElementById('current-1').textContent = 0;

    document.getElementById('name-0').textContent = 'Player 1'; 
    document.getElementById('name-1').textContent = 'Player 2'; 
    
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');

    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');

    document.querySelector(`.player-0-panel`).classList.add('active');

    // document.querySelector(`.btn-roll`).removeAttribute('disabled');
}