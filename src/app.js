const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geoCode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, '../templates/views'))
hbs.registerPartials(path.join(__dirname, '../templates/partials'))

app.use(express.static(path.join(__dirname, '../public')))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather App",
        name: 'Mil'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About What",
        name: 'Mildredness'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help Page From HBS",
        name: 'Doinks',
        helpText: 'This is the help text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must set address'
        })
    }

    geoCode(req.query.address, (error, {longitude, latitude, place} = {}) => {
		if (error) {
            return res.send({ error })
		}
	
		weather(longitude, latitude, (error, {weather, temperature, feelsLike}) => {
			if (error) {
                return res.send({ error })
            }
    
            res.send({
                weather,
                location: place,
                temperature,
                feelsLike,
                address: req.query.address
            })
		})
	
	})
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        message: 'Help article not found',
        title: 'Help page not found',
        name: 'Mildred111'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        message: 'Page not found',
        title: 'Page not found',
        name: 'Mil'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})