"use strict";

{
  const words = [
    "apple",
    "sky",
    "blue",
    "middle",
    "set",
    "strawberry",
    "orange",
    "kiwi",
    "grapefruit",
    "pineapple",
    "banana",
    "grape",
    "plum",
    "peach",
    "dog",
    "monkey",
    "elephant",
    "fox",
    "rabbit",
    "kangaroo",
    "tiger",
    "cat",
    "mouse",
  ];
  let word;
  let loc;
  let score;
  let miss;
  const timeLimit = 20 * 1000;
  let startTime;
  let isPlaying = false;

  const target = document.getElementById("target");
  const scoreLabel = document.getElementById("score");
  const missLabel = document.getElementById("miss");
  const timerLabel = document.getElementById("timer");

  function updateTarget() {
    let placeholder = "";
    for (let i = 0; i < loc; i++) {
      placeholder += "_";
    }
    target.textContent = placeholder + word.substring(loc);
  }

  function updateTime() {
    const timeLeft = startTime + timeLimit - Date.now();
    timerLabel.textContent = (timeLeft / 1000).toFixed(2);
    const timeoutId = setTimeout(() => {
      updateTime();
    }, 10);

    if (timeLeft < 0) {
      isPlaying = false;
      clearTimeout(timeoutId);
      timerLabel.textContent = "00.00";
      setTimeout(() => {
        showResult();
      }, 100);
      target.textContent = "click to replay";
    }
  }

  function showResult() {
    const accuracy = score + miss === 0 ? 0 : (score / (score + miss)) * 100;
    alert(
      `${score} lettres, ${miss} misses, ${accuracy.toFixed(2)}% accuracy!`
    );
  }

  window.addEventListener("click", () => {
    if (isPlaying === true) {
      return;
    }
    isPlaying = true;

    loc = 0;
    score = 0;
    miss = 0;
    scoreLabel.textContent = score;
    missLabel.textContent = miss;
    word = words[Math.floor(Math.random() * words.length)];

    target.textContent = word;
    startTime = Date.now();
    updateTime();
  });

  window.addEventListener("keydown", (e) => {
    if (isPlaying !== true) {
      return;
    }
    console.log(e.key);
    if (e.key === word[loc]) {
      loc++;
      if (loc === word.length) {
        word = words[Math.floor(Math.random() * words.length)];
        loc = 0;
      }
      updateTarget();
      score++;
      scoreLabel.textContent = score;
    } else {
      miss++;
      missLabel.textContent = miss;
    }
  });
}
