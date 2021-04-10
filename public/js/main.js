
const form = document.querySelector('.js-weather-form')

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const input = document.querySelector('.js-input')
  const inputVal = input.value

  console.log(inputVal);

  fetch('http://localhost:4000/weather?address=' + inputVal).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log('error');
      } else {
        console.log(data);
      }
    })
  })
})
