const backgroundUpdate = (value) => {
    const equivalents = ["night-bg","sunny-bg","cloudy-bg"];
    document.body.className = equivalents[value];
}

function runClouds()
{
    var clouds = document.getElementsByTagName("cloud");
    for (let i = 0; i < clouds.length; i++)
    {
        clouds[i].style.position = 'relative';
        clouds[i].style.position = 'absolute'
    }
}


function updateTexts(parsed)
{
    try {
        document.getElementById("CityName").innerText = parsed["location"]["name"];
        document.getElementById("Country").innerText = parsed["location"]["country"];
        document.getElementById("ConditionText").innerText = parsed['current']['condition']['text'];
        document.getElementById("Temperature").innerText = parsed["current"]["temp_c"] + "ºC";
    }
    catch (e)
    {
        document.getElementById("CityName").innerText = "No meteo data";
        document.getElementById("Country").innerText = "";
        document.getElementById("ConditionText").innerText = "";
        document.getElementById("Temperature").innerText = "";
    }
}

function meteoUpdate(meteoText, isDay)
{
    if(meteoText.includes("rain") || meteoText.includes("thunder")) {
        createRain();
    }
    else {
        stopRain();
    }
    weatherCondition(meteoText)
    if(isDay !== 1) {
        document.getElementById("sunny").style.visibility = 'hidden';
        document.getElementById("main-container").style.visibility = 'visible';
        backgroundUpdate(0);
    }
    else {
        document.getElementById("main-container").style.visibility = 'hidden';
    }
}

function weatherCondition(meteoText)
{
    if(meteoText.includes("Sunny") || meteoText.includes("Clear")){
        document.getElementById("sunny").style.visibility = 'visible';
        document.getElementById("clouds-container").style.visibility = 'hidden';
        backgroundUpdate(1);
    }
    else {
        document.getElementById("sunny").style.visibility = 'hidden';
        document.getElementById("clouds-container").style.visibility = 'visible';
        runClouds();
        backgroundUpdate(2);
    }
}