const fizzBtn = document.getElementById('fizz');
const fizzbuzzEl = document.getElementById('fizzbuzz');

let data = [];
let click = 0
let fizzbuzz = 0

function addFizzBuzzDOM(data) {
  fizzbuzzEl.innerHTML = `
    <p>${click}回目のクリック</p>
    <p>FizzBuzz '${fizzbuzz}':</p>
    <ul>
      ${data.map((d) => `<li class=${d === 'FizzBuzz' ? 'show' : ''}>${d}</li>`).join('')}
    </ul>
  `;

}

fizzBtn.addEventListener('click', () => {
  click++
  for (let i = 1; i <= 100; i++) {
    if (i % 15 === 0) {
      fizzbuzz++
      data.push('FizzBuzz');
    } else if (i % 5 === 0) {
      data.push('Buzz');
    } else if (i % 3 === 0) {
      data.push('Fizz');
    } else {
      data.push(i);
    }
  }
  addFizzBuzzDOM(data)
});
