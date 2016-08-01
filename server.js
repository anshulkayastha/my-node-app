var express = require('express');
var got = require('got');
var path = require('path');
var fs = require('fs');

var app = express();
var PORT = process.env.PORT || 3000;

//var geocoding = require('./geocoding');
var geocoding = require('./geocoding-npm');
app.get('/', function(req, res) {
      res.send('Accessor API Root');
})

app.get('/mapImage', function(req, res) {
    var filePath = path.join(__dirname,'test.jpg');
    var testURL = 'http://maps.googleapis.com/maps/api/staticmap?format=jpg&size=512x512&maptype=roadmap&markers=size:mid%7Ccolor:red%7CSan+Francisco,CA%7COakland,CA%7CSan+Jose,CA';
    got.stream(testURL)
        .pipe(fs.createWriteStream(filePath, {flags: 'a'}))
        .on('finish',_ => console.log('Successfull :D'))
        .on('error',err => console.error('Failed :3'));
})

app.get('/geocoding/:address', function(req, res) {

    var address = req.params.address;
    geocoding(address).then(function(geocode) {
        console.log('Longitude: '+geocode[0].longitude +'Latitude: '+geocode[0].latitude);
        res.send('Longitude: '+geocode[0].longitude+ ' Latitude: '+geocode[0].latitude);
    }, function(error) {
        console.log(error);
    })
})


app.get('/markers', function(req, res) {
    console.log('Markers route');
    var markers = [];
    var marker1 = {"id": 1, "name": "Bangalore"};
    var prom1 = geocoding(marker1.name).then(function(geocode) {
        console.log('Longitude: '+geocode[0].longitude +'Latitude: '+geocode[0].latitude);
        marker1.lat = geocode[0].latitude;
        marker1.lng = geocode[0].longitude;
        markers.push(marker1);
    }, function(error) {
        console.log(error);
    })

    var marker2 = {"id": 2, "name": "Mysuru" };
    var prom2 = geocoding(marker2.name).then(function(geocode) {
        console.log('Longitude: '+geocode[0].longitude +'Latitude: '+geocode[0].latitude);
        marker2.lat = geocode[0].latitude;
        marker2.lng = geocode[0].longitude;
        markers.push(marker2);
    }, function(error) {
        console.log(error);
    })
     var marker3 = {"id": 3, "name": "Chennai" };
     var prom3 = geocoding(marker3.name).then(function(geocode) {
        console.log('Longitude: '+geocode[0].longitude +'Latitude: '+geocode[0].latitude);
        marker3.lat = geocode[0].latitude;
        marker3.lng = geocode[0].longitude;
        markers.push(marker3);
    }, function(error) {
        console.log(error);
    })

    Promise.all([prom1, prom2, prom3]).then(function() {
        res.json(markers);
    }).catch(function(err) {
        console.error(err);
    });
})


app.listen(PORT, function() {
    console.log('Express Server started on Port '+PORT);
})