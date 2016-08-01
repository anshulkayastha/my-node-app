module.exports = function(address) {
    var NodeGeocoder = require('node-geocoder');

    var options = {
        provider: 'google',

        // Optional depending on the providers
        httpAdapter: 'https', // Default
        apiKey: 'AIzaSyD4YDBoacmwHQoQ4yyDAjjJrT2qby7X-Gg', // for Mapquest, OpenCage, Google Premier
        formatter: null         // 'gpx', 'string', ...
    };

    var geocoder = NodeGeocoder(options);
    return new Promise(function(resolve, reject) {
        console.log('Address in Promise is '+address);
        resolve(geocoder.geocode(address));
    })


}





