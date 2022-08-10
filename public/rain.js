// number of drops created.
var nbDrop = 200;


// function to generate a random number range.
function randRange( minNum, maxNum) {
    return (Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum);
}

// function to generate drops
function createRain() {

    let hrElement;

    for (let i = 0; i < nbDrop; i++) {
        hrElement = document.createElement("HR");
        hrElement.style.left = Math.floor(Math.random() * window.innerWidth) + "px";
        hrElement.style.animationDuration = 0.2 + Math.random() * 0.3 + "s";
        hrElement.style.animationDelay = Math.random() * 5 + "s";

        document.getElementById("rain").appendChild(hrElement);
    }
}

var stopRain = function ()
{
    $('.rain').empty();
}