const FACEBOOK_ACCESS_TOKEN = 'EAAKpZBtLksgEBANroxbDRFRmvALBM106FHLujmXPUSJTXt8eheT8V78fVPbaipH6ycZBBxb39wmCU3ZCpFEy6VasfDGVtKo4VAhBUWO9Wu0Db1ZAskdPTuPLoGLdMctpqR1IA6ZCRUYwCJRfF52Y4liMcbfCpWUmySnBP8HZCYPQZDZD';
const API_AI_TOKEN = 'f82f630fe2844ed5a755eb9a85e98591';
const CAT_IMAGE_URL = 'https://botcube.co/public/blog/apiai-tutorial-bot/hosico_cat.jpg';

//Importing the required modules for message processing
const request = require('request');
const API_AI_CLIENT = require('apiai')(API_AI_TOKEN);

//Small talk message processing
const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN},
        method: 'POST',
        json: {
            recipient: {id: senderId},
            message: {text},
        }
    });
};

//Weather message processing

const checkWeather = (senderId,location,weather,description,temperature) => {
    console.log(senderId);
    console.log(location);
    return request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN},
        method: 'POST',
        json:{
            recipient: {id: senderId},
            message: {
                    text: "The weather in " + location + " is " + weather + " with " + description + " and a temperature of " + temperature + "°C"
            }
        }
    });
};
//Making the code in braces available GLOBALLY
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    
    //console.log(JSON.stringify(event));
    
    //Creating a seesion between the webhook and apiai
    const apiaiSession = API_AI_CLIENT.textRequest(message, {sessionId: 'sam_bot'});

    //Capture the response
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        //console.log(response);
        //HERE we need to catch the intent (action) 
        //Create a switch case for action being: smalltak or weather.
      
        switch(response.result.metadata.intentName){
            case 'weather':
            console.log('processing weather')
                checkWeather(senderId,loc,resWeather,resDescription,resTemp);
                break;
            default:
                sendTextMessage(senderId, result);      
        }
        
        //If small talk procced with const result = response.result.fulfillment.speech;
        //IF weather CREATE a request and then ask for the weatherController
        
       
        //console.log(JSON.stringify(response));
        /*
        if (response.result.metadata.intentName === 'weather') {
            sendImage(senderId, result);
        }
        */
        
    });

    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
/*
    request({
        url: 'https://graph.facebook.com/v2.11/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
        method: 'POST',
        json: {
            recipient: { id: senderId },
            message: {
                attachment: {
                    type: 'image',
                    payload: { url: CAT_IMAGE_URL}
                }
            }
        }
    });
*/
};