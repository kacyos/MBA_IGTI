var inputHeight = document.querySelector('#height');
var inputWeight = document.querySelector('#weight');
var btnCalculate = document.querySelector('#btn-calculate');

window.addEventListener('submit', render);
btnCalculate.addEventListener('click', render);

function calculateIMC() {
  var height = inputHeight.value;
  var weight = inputWeight.value;
  var imc = parseFloat((weight / height ** 2) * 10000).toFixed(2);
  return imc;
}

function validate(imc) {
  var height = inputHeight.value;
  var weight = inputWeight.value;
  var message = null;

  if (height <= 0 || weight <= 0) {
    message = 'A altura e o peso devem ser preenchidos e maior que zero';
  } else if (imc < 18.5) {
    message = 'IMC: ' + imc + ' - Abaixo do peso';
  } else if (imc === 18.5 || imc <= 24.9) {
    message = 'IMC: ' + imc + ' - Peso normal';
  } else if (imc === 25 || imc <= 29) {
    message = 'IMC: ' + imc + ' - Sobrepeso';
  } else if (imc === 30 || imc <= 34.9) {
    message = 'IMC: ' + imc + ' - Obesidade grau 1';
  } else if (imc === 35 || imc <= 39.9) {
    message = 'IMC: ' + imc + ' - Obesidade grau 2';
  } else {
    message = 'IMC: ' + imc + ' - Obesidade grau 3';
  }

  return message;
}

function render(event) {
  event.preventDefault();
  var imc = calculateIMC();
  var message = validate(imc);
  var divResult = document.querySelector('.result');
  var p = document.querySelector('p');
  p.textContent = '';

  if (event.type === 'click' || event.key === 'Enter') {
    p.className = 'message';
    p.textContent = message;
    divResult.appendChild(p);
  }
}
