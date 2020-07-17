const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=42dddc37ce54d2467c8cea15804bce5f&query=' + 
        longitude + ',' + latitude + '&units=f'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' but it feels like ' + 
                body.current.feelslike + '. The humidity is ' + body.current.humidity + '.'
            )
        }
    })
}


module.exports = forecast