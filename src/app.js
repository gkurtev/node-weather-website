const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express()
const port = process.env.PORT || 4000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Andrew Bitch'
  })
})


app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About HBS',
    name: 'This Andrew bro'
  })
});
app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Helper melper',
    message: 'Help me god'
  })
});


app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You need to provide an address'
    })
  }

  const {address} = req.query

  geocode(address, (error, data) => {

    if (error) {
      return res.send({error})
    }

    const {location} = data

    forecast(data, (forecastError, forecastData) => {
      if (forecastError) {
        return res.send({
          error: forecastError
        })
      }

      const {weatherDescriptions, temperature, feelslike} = forecastData

      res.send({
        forecast: `${weatherDescriptions}, temperature: ${temperature} degrees, feelslike: ${feelslike} degrees`,
        location,
        address
      })
    })
  })
})

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term'
    })
  }

  res.send({
    products: []
  })
})

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 'Help article not found'
  })
})

app.get('*', (req, res) => {
  res.render('404', {
    title: 'Page not found'
  })
})

app.listen(port, () => {
  console.log('server started on port: ' + port);
})
