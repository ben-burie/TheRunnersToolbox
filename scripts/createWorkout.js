var metersPerSecond;
var statsEntered = false;

function calculateMetersPerSecond(min, sec) {
    min *= 60;
    sec += min;
    selectElement = document.querySelector('#event');
    bestMeters = selectElement.value;

    metersPerSecond = bestMeters / sec;
}

function saveStats() {

    const minutes = parseInt(document.getElementById('minutes').value);
    const seconds = parseInt(document.getElementById('seconds').value);
    const event = document.getElementById('event').value;

    var outputElement = document.getElementById("output");

    if (isNaN(seconds) && isNaN(minutes)) {
        alert("Please input valid time!");
    }
    else if (minutes > 59 || seconds > 59 || minutes < 1 || seconds < 0) {
        alert("Please input valid time!");
    }
    else {
        if (seconds < 10) {
            outputElement.textContent = `Your ${event}m time of ${minutes}:0${seconds} has been saved!`;
            statsEntered = true;
        }
        else {
            outputElement.textContent = `Your ${event}m time of ${minutes}:${seconds} has been saved!`;
            statsEntered = true;
        }
    }

    calculateMetersPerSecond(minutes, seconds);
}

function clearStats() {
    document.getElementById('minutes').value = "";
    document.getElementById('seconds').value = "";

    document.getElementById("output").textContent = `You Must Enter Your Stats!`;
}

function calculateIntervals(interval) {
    var distance = document.getElementById("distance" + interval);
    var percentage = document.getElementById("percentage" + interval);

    percentage /= .01;
    metersPerSecond *= percentage;
    var newSeconds = distance / metersPerSecond;
    
    var newMinutes = Math.floor(newSeconds / 60);
    newSeconds = newSeconds - (newMinutes * 60);

    var element = document.getElementById("meters");
    element.textContent = `Min: ${newMinutes} Sec: ${newSeconds}`;
}

function generateTable() {
    var rowCount = document.getElementById("rowCount").value;

    if (statsEntered === false) {
        alert("You must enter your stats before you create a workout!");
        return;
    }
    else if (isNaN(rowCount) || rowCount < 1 || rowCount > 20) {
        alert("Number of intervals must be between 1 and 20!");
        return;
    }

    document.getElementById("tableHeader").textContent = "Edit Your Intervals";

    var tableHTML = "<table><thead></th></thead><tbody>";

    tableHTML += "<tr><td>Interval</td><td class='middle'>Distance and Percentage</td><td>Time</td>";

    for (var i = 1; i <= rowCount; i++) {
        tableHTML += "<tr><td class='col1'>" + i + "</td><td>Distance: ";
        tableHTML += "<form><input type='number' min='1' max='10000' class='distance' id='distance" + i + "'><p>meters</p>";
        tableHTML += "<input type='number' min='1' max='100' class='percentage' id='percentage" + i + "'><p>%</p>";
        tableHTML += "<button type='button' class='calculate' data-row='" + i + "'>Calculate</button></form></td>";
        tableHTML += "<td><p class='time' id='time" + i + "'></p></td></tr>";
    }

    tableHTML += "</tbody></table>";

    document.getElementById("tableContainer").innerHTML = tableHTML;

    attachEventListeners();
}

function attachEventListeners() {
    var calculateButtons = document.querySelectorAll('.calculate');

    calculateButtons.forEach(function(button) {
        button.addEventListener('click', function() {
            var row = this.getAttribute('data-row');
            calculate(row);
        });
    });
}

function calculate(row) {
    var distance = document.getElementById('distance' + row).value;
    var percentage = document.getElementById('percentage' + row).value;

    percentage *= 0.01;
    var newMetersPerSecond = metersPerSecond * percentage;
    var newSeconds = distance / newMetersPerSecond;
    var newMinutes = newSeconds / 60;
    newMinutes = Math.floor(newMinutes);
    newSeconds -= newMinutes * 60;
    newSeconds = Math.ceil(newSeconds * 100) / 100;

    if (newSeconds < 10) {
        document.getElementById('time' + row).textContent = `${newMinutes}:0${newSeconds}`;
    }
    else {
        document.getElementById('time' + row).textContent = `${newMinutes}:${newSeconds}`;
    }
}