const request = require('request')


const forecast = (lattitude, longitude, callback) => {
    
    const url = 'https://api.darksky.net/forecast/dd4f34e4cd32311d0117c7c016d93593/' 
        + lattitude +',' + longitude
    request({url:url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, 'It is currently ' + response.body.currently.temperature + ' degrees out.'
             + ' There is a ' + response.body.currently.precipProbability + '% chance of rain.'
             + 'Wind speed is ' + response.body.currently.windSpeed + ' mph.')
        }  
    })
}
   
 module.exports = forecast