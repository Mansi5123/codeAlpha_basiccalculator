
let currentInput = '';
const display = document.getElementById('display');

function updateDisplay() {
  display.textContent = currentInput || '0';
}

function appendNumber(num) {
  currentInput += num;
  updateDisplay();
}

function appendOperator(op) {
  if (currentInput === '') return;
  const lastChar = currentInput.slice(-1);
  if ('+-*/'.includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + op;
  } else {
    currentInput += op;
  }
  updateDisplay();
}

function appendDecimal(dot) {
  const lastNumber = currentInput.split(/[\+\-\*\/]/).pop();
  if (!lastNumber.includes('.')) {
    currentInput += dot;
    updateDisplay();
  }
}

function clearDisplay() {
  currentInput = '';
  updateDisplay();
}

function calculate() {
  try {
    const result = eval(currentInput);
    currentInput = result.toString();
  } catch (error) {
    currentInput = 'Error';
  }
  updateDisplay();
}

document.addEventListener('keydown', (e) => {
  const key = e.key;
  if (!isNaN(key)) {
    appendNumber(key);
  } else if ('+-*/'.includes(key)) {
    appendOperator(key);
  } else if (key === 'Enter') {
    e.preventDefault();
    calculate();
  } else if (key === 'Backspace') {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
  } else if (key === '.') {
    appendDecimal('.');
  } else if (key.toLowerCase() === 'c') {
    clearDisplay();
  }
});
