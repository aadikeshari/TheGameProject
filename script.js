//guess the number game logic

//game constant variable
var msg1 = document.getElementById("message1")
var msg2 = document.getElementById("message2")
var msg3 = document.getElementById("message3")


var answer = Math.floor(Math.random()*100) + 1;
var no_of_guesses = 0;
var guesses_num = [];

//  game logic and main function
function play(){
    var user_guess = document.getElementById("guess").value;
  
    if(user_guess < 1 || user_guess > 100 ){
        alert("Please Enter  a number Between 1 to 100");
    }
    else{
        guesses_num.push(user_guess);
        no_of_guesses+= 1;
        
        if(user_guess < answer){
  msg1.textContent = "Your Guess is Too low"
  msg2.textContent = "No. Of Guesses : " +
  no_of_guesses;
  msg3.textContent = "Guessed Number Are: " +
  guesses_num;
        }
        else if(user_guess  > answer){
            msg1.textContent = "Your Guess is Too High"
            msg2.textContent = "No. Of Guesses : " +
            no_of_guesses;
            msg3.textContent = "Guessed Number Are: " +
            guesses_num;
        }
        else if(user_guess == answer){
            msg1.textContent = "Yahhhh You won It!!"
            msg2.textContent = "the Number was " + answer
            msg3.textContent = " You guessd it in  " +   no_of_guesses   +"Guesses"; 
        }
    }
}

// snake game javascript part
function sstart(){
// Game Constants & Variables
let inputDir = {x: 0, y: 0}; 
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
let speed = 19;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x: 13, y: 15}
];

food = {x: 6, y: 7};

// Game Functions
function main(ctime) {
    window.requestAnimationFrame(main);
    // console.log(ctime)
    if((ctime - lastPaintTime)/3500 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    // If you cut or eat yourself 
    for (let i = 1; i < snakeArr.length; i++) {
      
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}

function gameEngine(){
    // Part 1: Updating the snake array & Food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        inputDir =  {x: 0, y: 0}; 
        alert("Game Over. Press any key to play again!");
        snakeArr = [{x: 13, y: 15}];
        score = 0; 
    }

    // If you have eaten the food, increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x ===food.x){
        foodSound.play();
        score += 1;
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
    }

    // Moving the snake
    for (let i = snakeArr.length - 2; i>=0; i--) { 
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    // Part 2: Display the snake and Food
    // Display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;

        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });
    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food')
    board.appendChild(foodElement);


}


// Main logic starts here
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
    inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});

}

//rock paper scissor javascrpt logic
const buttons = document.querySelectorAll("#game button");
const result = document.querySelector("#result");

buttons.forEach(button => {
  button.addEventListener("click", playRound);
});

function playRound(event) {
  const playerSelection = event.target.id;
  const computerSelection = getComputerSelection();
  const resultText = getResultText(playerSelection, computerSelection);
  displayResult(resultText);
}

function getComputerSelection() {
  const choices = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}

function getResultText(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return "Draw!";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return "You win!";
  } else {
    return "You lose!";
  }
}


function displayResult(resultText) {
  result.textContent = resultText;
  result.className = resultText.toLowerCase().replace("!", "");
  const computerSelectionElement = document.getElementById("computer-selection");
  const computerSelection = getComputerSelection();
  computerSelectionElement.innerHTML = computerSelection;
}


// tictactoe javacsript logic
const bord = document.querySelector(".board2");
      const cells = bord.querySelectorAll("div");
      let xIsNext = true;

      // Handle cell clicks
      bord.addEventListener("click", (e) => {
        // Get the clicked cell
        const clickedCell = e.target;

        // Make sure the cell is empty and the game is not over
        if (clickedCell.textContent === "" && !checkWin()) {
          // Place an X or O in the cell
          clickedCell.textContent = xIsNext ? "X" : "O";

          // Switch turns
          xIsNext = !xIsNext;
        }
      });

      // Check for a win
      function checkWin() {
        // Check rows
        for (let i = 0; i < 9; i += 3) {
          if (cells[i].textContent === cells[i + 1].textContent && cells[i].textContent === cells[i + 2].textContent && cells[i].textContent !== "") {
             
            const message = document.querySelector(".message");
      message.textContent = `${cells[i].textContent} wins!`;
            
            resetGame();
            return true;
          }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
          if (cells[i].textContent === cells[i + 3].textContent && cells[i].textContent === cells[i + 6].textContent && cells[i].textContent !== "") {
            
            const message = document.querySelector(".message");
      message.textContent = `${cells[i].textContent} wins!`;
            
            resetGame();
            return true;
          }
        }

        // Check diagonals
        if (cells[0].textContent === cells[4].textContent && cells[0].textContent === cells[8].textContent && cells[0].textContent !== "") {
            
          const message = document.querySelector(".message");
      message.textContent = `${cells[i].textContent} wins!`;
          
          resetGame();
            return true;
        }
        if (cells[2].textContent === cells[4].textContent && cells[2].textContent === cells[6].textContent && cells[2].textContent !== "") {
            
          const message = document.querySelector(".message");
      message.textContent = `${cells[i].textContent} wins!`;
          
          resetGame();
            return true;
        }

        

        // No win
        const message = document.querySelector(".message");
    message.textContent = "It's a draw!";
        return false;
      }
function resetGame() {
  for (let i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  xIsNext = true;
}