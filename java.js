var color = ["red", "green", "blue", "yellow"];

var playing = false;
var correctSeq = [];
var playerCurrent = null;
var level = null;

document.onkeypress = (event) => {
  if (!playing && event.key.toLowerCase() === "a") {
    playing = true;
    playerCurrent = 0;
    level = 1;
    document.getElementById("level-title").innerHTML = "Level " + level;
    addColorToSeq();
    initizlizeBtn();
  }
};

function addColorToSeq() {
  var randomNo = Math.floor(Math.random() * 4);
  var randomColor = color[randomNo];
  makeSound(randomColor);
  makeAnimation(randomColor);
  correctSeq.push(randomColor);
}

function checkClick(id) {
  if (id === correctSeq[playerCurrent]) {
    return true;
  }
  return false;
}

function initizlizeBtn() {
  var keyClicked = document.querySelectorAll(".btn").length;
  for (var i = 0; i < keyClicked; i++) {
    document.querySelectorAll(".btn")[i].addEventListener("click", function () {
      var color = this.id;
      if (checkClick(color)) {
        makeSound(color);
        makeAnimation(color);
        console.log("correct");
        CorrectClick();
      } else {
        console.log("Wrong");
        makeSound();
        gameOver();
      }
    });
  }
}

function removeBtnEvent() {
  var keyClicked = document.querySelectorAll(".btn").length;
  for (var i = 0; i < keyClicked; i++) {
    document.querySelectorAll(".btn")[i].removeEventListener("click");
  }
}

function CorrectClick() {
  if (++playerCurrent === correctSeq.length) {
    level++;
    playerCurrent = 0;
    document.getElementById("level-title").innerHTML = "Level " + level;
    alert("Level Passed");
    setTimeout(addColorToSeq, 2000);
  } else {
    // playerCurrent = playerCurrent + 1;
    console.log("playerCurrect=" + playerCurrent);
  }
}

function makeAnimation(randomColor) {
  document.querySelector("#" + randomColor).classList.add("pressed");
  setTimeout(function () {
    document.querySelector("#" + randomColor).classList.remove("pressed");
  }, 100);
}

function makeSound(randomColor) {
  switch (randomColor) {
    case "blue":
      var blue = new Audio("sounds/blue.mp3");
      blue.play();
      break;
    case "red":
      var red = new Audio("sounds/red.mp3");
      red.play();
      break;
    case "yellow":
      var yellow = new Audio("sounds/yellow.mp3");
      yellow.play();
      break;
    case "green":
      var green = new Audio("sounds/green.mp3");
      green.play();
      break;
    default:
      var wrong = new Audio("sounds/wrong.mp3");
      wrong.play();
  }
}

function gameOver() {
  playing = false;
  correctSeq = [];
  playerCurrent = null;
  level = null;
  document.getElementById("level-title").innerHTML =
    "GAME-OVER:Press A Key to Start";
  document.querySelector("body").classList.add("game-over");
  setTimeout(function () {
    document.querySelector("body").classList.remove("game-over");
  }, 100);
}
