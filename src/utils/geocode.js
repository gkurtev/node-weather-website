const request = require('request')

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidXNlcm5hbWUxMjMzIiwiYSI6ImNrbjFkNXVydjB3bzUydm56c2xwbW4yOTAifQ.wZ_-05i1kE4B_Y2RnRz6Tw&limit=1`

  request({url, json: true}, (error, response) => {
    if (error) {
      callback('unable to connect to location services', undefined)
    } else if (response.body.features.length === 0) {
      callback('Unable to find location, try another search', undefined)
    } else {
      const {center, place_name} = response.body.features[0]

      callback(undefined, {
        latitude: center[1],
        langitude: center[0],
        location: place_name
      })
    }
  })
}

module.exports = geocode
