const request = require('request');
const express = require("express");
const path = require("path");
const app = express();

const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer);

app.use(express.static(path.join( __dirname, "public")));
app.get('/', function(req, res,next) {
    res.sendFile(__dirname + '/index.html');
});

var weather = {};
getCityWeather();

function getCityWeather() {
    var nbCity = 20909;
    const offset = Math.floor(Math.random() * nbCity);
    var dt;
    const options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities',
        qs: {minPopulation: '50000', offset: offset},
        headers: {
            'X-RapidAPI-Key': 'f2244b30fbmshb0c5a9a4dd0e43bp1d631cjsna12d6dba4832',
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
            weather = body;
        });
    });
}

setInterval(function() {
    getCityWeather();
}, 30000);

io.on('connection', socket => {
    socket.on('refresh', () => {
        socket.emit('wdata',weather);
    });
});

httpServer.listen(4000, () => {
    console.log('go to http://localhost:4000');
});