//verifying the connectivity with facebook webhook
module.exports = (req,res) => {
    const hubChallenge = req.query['hub.challenge'];

    
    const hubMode = req.query['hub.mode'];
    const verifyTokenMatches = (req.query['hub.verify_token'] === 'Sam is cool');
    
    if (hubMode && verifyTokenMatches){
        res.status(200).send(hubChallenge);
    } else {
        res.status(403).end();
    }
};