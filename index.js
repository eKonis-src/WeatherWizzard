const request = require('request');
const express = require("express");
const path = require("path");
const app = express();

const content = require('fs').readFileSync(__dirname + '/index.html', 'utf8');

// const httpServer = require('http').createServer((req, res) => {
//     // serve the index.html file
//     res.setHeader('Content-Type', 'text/html');
//     res.setHeader('Content-Length', Buffer.byteLength(content));
//     res.end(content);
// });
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer);

app.use(express.static(path.join( __dirname, "public")));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    console.log('connect');
});

function getCityWeather() {
    var nbCity = 1443;
    const offset = Math.floor(Math.random() * nbCity);

    const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        qs: {countryIds: 'fr', minPopulation: '10000', offset: offset},
        headers: {
            'X-RapidAPI-Key': '2e564b3fd8mshfed3baab6c22667p193379jsnc13b73ae8e9d',
            'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
            useQueryString: true
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);

        const parsed = JSON.parse(body);

        const city = parsed['data'][0]['name'];
        const option = {
            method: 'GET',
            url: 'https://weatherapi-com.p.rapidapi.com/current.json',
            qs: {q: city},
            headers: {
                'X-RapidAPI-Key': 'f2244b30fbmshb0c5a9a4dd0e43bp1d631cjsna12d6dba4832',
                'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                useQueryString: true
            }
        };

        request(option, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(JSON.parse(body));
        });
    });
}

httpServer.listen(4000, () => {
    console.log('go to http://localhost:4000');
});