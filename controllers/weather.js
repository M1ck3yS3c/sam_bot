const OWM_BASE_URL = 'http://api.openweathermap.org/data/2.5/weather'
const OWM_API_KEY = '5559b4ad4f9fc0b8ce21cd6b19a33100';

const request = require('request');

//api.openweathermap.org/data/2.5/weather?q={city name}

module.exports = (req, res) => {
    console.log('in weather module');
    if (req.body.result.action === 'weather') {
        const cityName = req.body.result.parameters.location['city'];
        const apiUrl = OWM_BASE_URL + '?q=' + cityName + '&APPID=' + OWM_API_KEY + '&units=metric';

        request({
            url: apiUrl,
            method: 'GET'
        }, (err, response, body) => {
            //jsonBody = JSON.parse(body);
            //theWeather = [jsonBody.weather[0].main , jsonBody.weather[0].description];
            //console.log(theWeather);
            //body = JSON.stringify(eval ('(' + body + ')')); 
            //console.log(JSON.parse(body).weather[1]);
            //console.log(JSON.parse(body).weather['main']);
            //const loc = JSON.parse(body).name;

            const loc = JSON.parse(body).name;
            const resWeather  =  JSON.parse(body).weather[0].main;
            const resDescription =  JSON.parse(body).weather[0].description;
            const resTemp = JSON.parse(body).main['temp'];

            console.log(loc +' '+resWeather+' '+resDescription+' '+resTemp);
            /*console.log(response);
            console.log('*****************************');
            console.log('*********' + resWeather + ' ' + resTemp);
            */
            //console.log(JSON.parse(body).name);
            console.log('out of weather module');
            return res.json({
                "location": loc, 
                "weather": resWeather,
                "description": resDescription,
                "temperature": resTemp
            });
            console.log(res);
        })
    }
}