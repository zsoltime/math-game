'use strict';

function Game() {
  const dom = {};
  let score = 0;
  let question;
  let answers;
  let solution;

  function init() {
    cacheDOM();
    bindEvents();
    newGame();
  }

  function cacheDOM() {
    dom.question = document.getElementById('question');
    dom.answers = document.getElementById('answers');
    dom.li = document.getElementsByTagName('li');
    dom.score = document.getElementById('score');
  }

  function bindEvents() {
    dom.answers.addEventListener('click', handleClick);
  }

  function render() {
    dom.question.textContent = question;
    for (let i = 0; i < answers.length; i++) {
      dom.li[i].textContent = answers[i];
    }
    dom.score.textContent = score;
  }

  function handleClick(event) {
    if (event.target === dom.answers) {
      return;
    }

    if (event.target.textContent * 1 === solution) {
      score += 1;
      newGame();
    }
    else {
      event.target.classList.add('wrong');
      score -= 1;
      render();
    }
  }

  function newGame() {
    let problem = Problem();
    question = problem.question();
    solution = problem.solution();
    answers = problem.answers();

    for (let i = 0; i < dom.li.length; i++) {
      dom.li[i].classList = '';
    }

    render();
  }

  function wait(time) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, time);
    });
  }

  return {
    init: init
  }
}

function Problem() {
  let question;
  let solution;
  let answers;

  function init() {
    question = generateQuestion();
    solution = generateSolution();
    answers = generateAnswers();
  }

  function generateQuestion() {
    let a = random(0, 100);
    let b = random(0, 100);
    let op = ['+', '-', '*'][random(0, 2)];

    return a + ' ' + op + ' ' + b;
  }

  function generateSolution() {
    return eval(question);
  }

  function generateAnswers() {
    let answers = [
      solution,
      random(0, 100),
      random(50, 200),
      random(20, 800)
    ];
    return shuffle(answers);
  }

  function random(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function shuffle(array) {

    let i = array.length;
    let temp;
    let random;

    while (i !== 0) {
      random = Math.floor(Math.random() * i);
      i -= 1;

      temp = array[i];
      array[i] = array[random];
      array[random] = temp;
    }
    return array;
  }

  init();

  return {
    question: _ => question,
    answers: _ => answers,
    solution: _ => solution
  }
}

document.addEventListener("DOMContentLoaded", function(e) {
  const game = Game();
  game.init();
});
