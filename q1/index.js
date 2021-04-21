let selectEquation = 'prime'

// Listening on change event of text input
const textInput = document.getElementById('text-input')
textInput.addEventListener('input', (e) => {
  const { value } = e.target
  if (value % 1 != 0 && value >= 0) {
    textInput.value = Math.round(value)
  }
  if (value < 0) {
    textInput.value = 1
  }
  if (selectEquation == 'prime') {
    const result = isPrime(textInput.value, 2)
    displayText(result)
  } else {
    const result = isFobinacci(textInput.value, 1, 0)
    displayText(result)
  }
})

// Listening on change event of test algorithm
const equation = document.getElementById('equation')
equation.addEventListener('change', (e) => {
  const { value } = e.target
  selectEquation = value

  if (selectEquation == 'prime') {
    const result = isPrime(textInput.value, 2)
    displayText(result)
  } else {
    const result = isFobinacci(textInput.value, 1, 0)
    displayText(result)
  }
})

// Display on text input change or on equation algorithm change
const displayText = (result) => {
  const elem = document.getElementById('text-display')
  if (elem == null) return
  elem.innerText = result
}

// Check is prime number
const isPrime = (n) => {
  if (n == '') return false
  for (let i=2; i<n; i++) {
    if (n%i===0) return false
  }
  return n>1 == true
}

// Check is fibonacci number
const isFobinacci = (n, count, last) => {
  if (count < n) {
    return isFobinacci(n, count+last, count)
  }
  if (count == n) {
    return true
  }
  return false
}