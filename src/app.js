const path = require('path')
const express = require('express')
const hbs = require('hbs')

// It appears that the path is referenced to where app.js is located
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000 // PORT provided by HEROKU

// Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views') // used if hbc files not in views directory
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')  
app.set('views', viewsPath) // needed if hbc files not in views directory
hbs.registerPartials(partialsPath)

// this causes express to serve HTML files in public directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {      // serves up file with this name fron views directory
    res.render('index', {
        title: 'Weather App',
        name: 'Gary Sprader'
    })     
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Gary Sprader'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        msg: 'This is a help message!',
        title: "Help"      ,
        name: "Gary Sprader"
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }
    // have address so get geocode
    // also ES6 = geocode(req.query.address, (error, {lattitude, longitude, loaction} = {} ) => {
    geocode(req.query.address, (error, data) => {
        if (error){         // return exits this loop
          return res.send({
              error: error
          }) 
        }
        // have geocode so get forecast     
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    error: error
                })               
            }
            res.send({
                forecast: forecastData,
                location: data.location,
                address: req.query.address
            })   
        })
     })   
})

// This is sample that is not used in the app
app.get('/products', (req, res) => {
    //console.log(req.query)
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
    res.render('page404', {
        msg: 'Help article not found',
        title: 'Error',
        name: 'Gary Sprader'
    })
})

// * means match anything. So if no matches above, it come here.
app.get('*', (req, res) => {
    res.render('page404', {
        msg: 'Page not found',
        title: 'Error',
        name: 'Gary Sprader'
    } )
}) 

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
