var request = require('request');
var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=London&key=AIzaSyD4YDBoacmwHQoQ4yyDAjjJrT2qby7X-Gg';

module.exports = function() {
    return new Promise(function(resolve, reject) {
        request({
            url: url,
            json: true
        }, function(error, response, body) {
            if(error) {
                reject('Unable to get geocoding '+error);
            } else {
                resolve(body);
            }
        })
    })


}