const OWM_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const OWM_API_KEY = '5559b4ad4f9fc0b8ce21cd6b19a33100';

const request = require('request');

//api.openweathermap.org/data/2.5/weather?q={city name}

module.exports = (req, res) => {
    if (req.body.result.action === 'weather') {
        const cityName = req.body.result.parameters.location['city'];
        const apiUrl = OWM_BASE_URL + '?q=' + cityName + '&APPID=' + OWM_API_KEY ;

        request({
            uri: apiUrl,
            methos: 'GET'
        }, (err, response, body) => {
            //body = JSON.stringify(eval ('(' + body + ')')); 
            console.log(JSON.parse(body).weather[1]);
            //console.log(JSON.parse(body).weather['main']);

            const resWeather = [
                JSON.parse(body).weather['main'],
                JSON.parse(body).weather['description']
            ];
            const resTemp = JSON.parse(body).main['temp'];
            
            console.log('*********' + JSON.stringify(resWeather));

            return res.json({
                speech: resWeather,
                displayText: resTemp
            });
        })
    }
}