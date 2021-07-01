//Game Constants and Variables

let velocityDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let lastPaintTime = 0;
let speed = 10;
let score = 0;
let levelNumber = 0;

function getRandom(){
  let a = 1;
  let b = 17;
  let c = Math.round(a + (b - a) * Math.random());
  return c;
}

let snakeArr = [{ x: getRandom(), y: getRandom() }];

let food = { x: getRandom(), y: getRandom() };

//Game functions
function getRandom(){
  let a = 1;
  let b = 17;
  let c = Math.round(a + (b - a) * Math.random());
  return c;
}

function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snakeArr) {
  for (let i = 1; i < snakeArr.length; i++) {
    if (snakeArr[0].x === snakeArr[i].x && snakeArr[0].y === snakeArr[i].y) {
      return true;
    }
  }
  if (
    snakeArr[0].x >= 18 ||
    snakeArr[0].x <= 0 ||
    snakeArr[0].y >= 18 ||
    snakeArr[0].y <= 0
  ) {
    return true;
  }
  return false;
}

function gameEngine() {
  //Part 1 : Updating the snakeArr and food

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    alert("Game Over. Press any key to play again!");
   
    velocityDir = {x: 0, y: 0};
    snakeArr = [{ x: getRandom(), y: getRandom() }];
    food = { x: getRandom(), y: getRandom() };
    musicSound.play();
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    hiScoreBox.innerHTML = "High Score: " + hiScoreVal;

  }

  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    if(levelNumber === 0) score += 1;
    else if(levelNumber === 1) score += 2;
    else if(levelNumber === 2)  score += 4;
    else if(levelNumber === 3)  score += 8;
    if(hiScoreVal < score){
      hiScoreVal = score;
      localStorage.setItem("hiScoreKey", JSON.stringify(hiScoreVal));
     hiScoreBox.innerHTML = "High Score: " + hiScoreVal;

    }
    scoreBox.innerHTML = "Score: " + score;

    snakeArr.unshift({ x: food.x + velocityDir.x, y: food.y + velocityDir.y });
    
    food = {
      x: getRandom(),
      y: getRandom()
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += velocityDir.x;
  snakeArr[0].y += velocityDir.y;

  //Part 2 : Display the snakeArr and food

  //2.a Display the snake
  //by the help of below lines we will create a motionless snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //2.b Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
} //function gameEngine() ends here



//Main Logic
let hiScore = localStorage.getItem("hiScoreKey");
if(hiScore === null){
  hiScoreVal = 0;
  localStorage.setItem("hiScoreKey", JSON.stringify(hiScoreVal));
}
else{
  hiScoreVal = JSON.parse(hiScore);
  hiScoreBox.innerHTML = "High Score: " + hiScore;
}

window.requestAnimationFrame(main);
musicSound.play();
  const level = document.getElementById('level');
  level.addEventListener('click', (e) => {
    levelNumber = level.selectedIndex;
    if(levelNumber === 0) speed = 10;
    else if(levelNumber === 1) speed = 15;
    else if(levelNumber === 2)  speed = 25;
    else if(levelNumber === 3)  speed = 35;
    console.log(level.selectedIndex);
  }
  )
window.addEventListener("keydown", (e) => {
  //Game starts here
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      console.log(e.key);
      velocityDir.x = 0;
      velocityDir.y = -1;
      break;
    case "ArrowDown":
      console.log(e.key);
      velocityDir.x = 0;
      velocityDir.y = 1;
      break;
    case "ArrowLeft":
      console.log(e.key);
      velocityDir.x = -1;
      velocityDir.y = 0;
      break;
    case "ArrowRight":
      console.log(e.key);
      velocityDir.x = 1;
      velocityDir.y = 0;
      break;
    default:
      break;
  }
});
