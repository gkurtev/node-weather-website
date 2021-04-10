
const form = document.querySelector('.js-weather-form')
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const input = document.querySelector('.js-input')
    const inputVal = input.value
    const responseText = document.querySelector('.js-response-text')

    fetch('/weather?address=' + inputVal).then((response) => {
      response.json().then((data) => {
        if (data.error) {
          responseText.innerHTML = 'Греда, не уцели, няма такова нещо :('
        } else {
          console.log(data);
          responseText.innerHTML = `<div>Място: ${data.location}</div><div>Прогноза: ${data.forecast}</div>`
        }
      })
    })
  })
}

