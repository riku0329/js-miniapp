const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySelect = document.getElementById('difficulty');

const words = [
  'sigh',
  'tense',
  'airplane',
  'ball',
  'pies',
  'juice',
  'warlike',
  'bad',
  'north',
  'dependent',
  'steer',
  'silver',
  'highfalutin',
  'superficial',
  'quince',
  'eight',
  'feeble',
  'admit',
  'drag',
  'loving',
];

let randomWord;

let score = 0;

let time = 10;

let difficulty =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

difficultySelect.value =
  localStorage.getItem('difficulty') !== null
    ? localStorage.getItem('difficulty')
    : 'medium';

text.focus();

const timeInterval = setInterval(updateTime, 1000);

function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

async function getWord() {
  const res = await fetch(
    `https://random-word-api.herokuapp.com/word?number=1`
  );
  const data = await res.json();
  return data[0];
}

getWord();

async function addWordToDOM() {
  randomWord = await getWord()
  word.innerHTML = randomWord;
}

function updateTime() {
  time--;
  timeEl.innerHTML = time + 's';

  if (time === 0) {
    clearInterval(timeInterval);
    gameOver();
  }
}

function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}</p>
    <button onclick='location.reload()'>Reload</button>
  `;
  endgameEl.style.display = 'flex';
}

function updateScore() {
  score++;
  scoreEl.innerHTML = score;
}

addWordToDOM();

text.addEventListener('input', (e) => {
  const insertedText = e.target.value;
  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();
    e.target.value = '';

    if (difficulty === 'hard') {
      time += 3;
    } else if (difficulty === 'medium') {
      time += 6;
    } else {
      time += 8;
    }
    updateTime();
  }
});

settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});
