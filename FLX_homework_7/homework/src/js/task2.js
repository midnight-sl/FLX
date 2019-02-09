let range = 5;
let prize = 10;
let earnings = 0;
let attempts = 3;
let currentPrize = prize;
const decision = confirm('Do you want to play a game?')
let proceed = true
if(decision){
  do{
    const generatedNumber = Math.floor(Math.random() * range);
    const getNumber = prompt(`Enter a number from 0 to ${range}
Attempts left: ${attempts}
Total prize: ${earnings}
Possible prize on current attempt: ${currentPrize}
    `);
    if(generatedNumber === +getNumber){
      range *= 2;
      prize *= 3;
      attempts = 3;
      earnings += currentPrize;
      alert(`Congratulation!
Your prize is: ${currentPrize}
      `)
      currentPrize = prize;
      proceed = confirm('Do you want to continue?')
      if(!proceed){
        alert(`Thank you for a game.
Your prize is: ${earnings}
        `)
        const playAgain = confirm('Do you want to play again?');
        if(playAgain){
          proceed = true;
          prize = 10;
          range = 5;
          earnings = 0;
          attempts = 3;
          currentPrize = 10;
        }
      }
    } else {
      attempts -= 1;
      currentPrize = Math.floor(currentPrize / 2);
      if(attempts === 0) {
        alert(`Thank you for a game.
Your prize is: ${earnings}
        `)
        const playAgain = confirm('Do you want to play again?');
        if(playAgain){
          proceed = true;
          prize = 10;
          range = 5;
          earnings = 0;
          attempts = 3;
          currentPrize = 10;
        }
      }
    }
  } while(attempts > 0 && proceed)
} else {
  alert('You did not become a millionaire, but can.');
}