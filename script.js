// Minimal temperature conversion app
const valueInput = document.getElementById('value');
const fromSelect = document.getElementById('from');
const toSelect = document.getElementById('to');
const convertBtn = document.getElementById('convert');
const resultEl = document.getElementById('result');

function updateButtonState(){
  const hasValue = valueInput.value.trim() !== '';
  const hasFrom = fromSelect.value !== '';
  const hasTo = toSelect.value !== '';
  convertBtn.disabled = !(hasValue && hasFrom && hasTo);
}

function roundIfNeeded(n){
  return Number.isInteger(n) ? n : Math.round(n * 10) / 10;
}

function toCelsius(val, unit){
  const v = Number(val);
  switch(unit){
    case 'celsius': return v;
    case 'fahrenheit': return (v - 32) * 5/9;
    case 'kelvin': return v - 273.15;
    default: return NaN;
  }
}

function fromCelsius(c, unit){
  switch(unit){
    case 'celsius': return c;
    case 'fahrenheit': return (c * 9/5) + 32;
    case 'kelvin': return c + 273.15;
    default: return NaN;
  }
}

function convert(e){
  e.preventDefault();
  const raw = valueInput.value.trim();
  if(raw === '') return;
  const from = fromSelect.value;
  const to = toSelect.value;
  if(!from || !to) return;
  const inVal = Number(raw);
  if(Number.isNaN(inVal)){
    resultEl.textContent = 'Please enter a valid number.';
    return;
  }

  const c = toCelsius(inVal, from);
  const out = fromCelsius(c, to);
  const show = roundIfNeeded(out);

  const fmtFrom = capitalize(from);
  const fmtTo = capitalize(to);
  resultEl.textContent = `${raw} ${fmtFrom} is ${show} ${fmtTo}`;
}

function capitalize(s){
  return s.charAt(0).toUpperCase() + s.slice(1);
}

// event wiring
valueInput.addEventListener('input', updateButtonState);
fromSelect.addEventListener('change', updateButtonState);
toSelect.addEventListener('change', updateButtonState);
document.getElementById('converter').addEventListener('submit', convert);

// init
updateButtonState();
