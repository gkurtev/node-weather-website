const request = require('request');

const forecast = ({latitude, longitude}, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=359cb84d636ddb3a76ee8702ed270c4c&query=${latitude},${longitude}.4233&units=m`

  request({url, json: true}, (error, response) => {
    if (error) {
      callback('error on my penis', undefined)
    } else if (response.body.error) {
      callback(response.body.error.info, undefined)
    } else {
      const {weather_descriptions: weatherDescriptions, temperature, feelslike} = response.body.current

      data = {
        weatherDescriptions,
        temperature,
        feelslike
      }

      callback(undefined, data)
    }
  })
}

module.exports = forecast
