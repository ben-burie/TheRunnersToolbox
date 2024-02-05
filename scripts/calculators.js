function paceCalculate() {

    const paceCalculated = document.getElementById("paceCalculated");

    var timeString;
    var hours;
    var minutes;
    var seconds;

    var distance = document.getElementById("field2Input").value;
    timeString = document.getElementById("field1Input").value;
    timeString = timeString.replace(":", "");
    timeString = timeString.replace(":", "");
    hours = parseInt(timeString.substring(0,2));
    minutes = parseInt(timeString.substring(2,4));
    seconds = parseInt(timeString.substring(4,6));

    if(!Number.isInteger(hours) || !Number.isInteger(minutes) || !Number.isInteger(seconds)) {
        alert("Invalid input! Time must be formatted hh:mm:ss")
        return;
    }
    else if (minutes < 0 || seconds < 0 || distance <= 0 || distance > 100 || seconds > 59 || minutes > 59 || hours < 0 || hours > 59) {
        alert("Invalid input!");
        return;
    }

    hours *= 60;
    minutes += hours;
    minutes *= 60;
    seconds += minutes;

    var newSeconds = seconds / distance;
    var newHours = newSeconds / 3600;
    newHours = Math.floor(newHours);
    var newMinutes = (newSeconds / 60) - (newHours * 3600);
    newMinutes = Math.floor(newMinutes);
    newSeconds = newSeconds - (newMinutes * 60) - (newHours * 3600);
    newSeconds = Math.floor(newSeconds);    

    if (newHours === 0) {
        if (newSeconds < 10) {
            paceCalculated.textContent = `${newMinutes}:0${newSeconds}`;
        }
        else {
            paceCalculated.textContent = `${newMinutes}:${newSeconds}`;
        }
    }
    else {
        if (newMinutes < 10) {
            if (newSeconds < 10) {
                paceCalculated.textContent = `${newHours}:0${newMinutes}:0${newSeconds}`;
            }
            else {
                paceCalculated.textContent = `${newHours}:0${newMinutes}:${newSeconds}`;
            }
        }
        else {
            if (newSeconds < 10) {
                paceCalculated.textContent = `${newHours}:${newMinutes}:0${newSeconds}`;
            }
            else {
                paceCalculated.textContent = `${newHours}:${newMinutes}:${newSeconds}`;
            }
        }
    }

}

function distanceConversion() {
    var conversionSelection = document.getElementById("conversion").value;
    var conversionOutput = document.getElementById("measurmentOutput");
    var measurmentInput = document.getElementById("measurmentInput").value;
    var measurmentOutput;

    if (conversionSelection === "kmToMi") {
        measurmentOutput = measurmentInput * 0.621371;
        conversionOutput.textContent = `${Math.round(measurmentOutput * 100) / 100} miles`;
    }
    else if (conversionSelection === "miToKm") {
        measurmentOutput = measurmentInput * 1.6;
        conversionOutput.textContent = `${Math.round(measurmentOutput * 100) / 100} kilometers`;
    }
    else if (conversionSelection === "kmToMe") {
        measurmentOutput = measurmentInput * 1000;
        conversionOutput.textContent = `${Math.round(measurmentOutput * 100) / 100} meters`;
    }
    else {
        measurmentOutput = measurmentInput / 1000;
        conversionOutput.textContent = `${Math.round(measurmentOutput * 100) / 100} kilometers`;
    }

}

function mileCalculate() {
    var mileMin = parseInt(document.getElementById('mileMin').value);
    var mileSec = parseInt(document.getElementById('mileSec').value);
    var milePercent = parseInt(document.getElementById('milePercent').value);
    mileMin *= 60;
    mileSec += mileMin;
    milePercent *= .01;

    var newMileSec = mileSec / milePercent;
    var newMileMin = newMileSec / 60;
    newMileMin = Math.floor(newMileMin);
    newMileSec = newMileSec - (newMileMin*60);

    var printElement = document.getElementById("mileCalculated");

    if (newMileSec < 10) {
        printElement.textContent = `${Math.floor(newMileMin)}:0${Math.floor(newMileSec)}`;
    }
    else if (isNaN(newMileMin)) {
        alert("Please enter vaild minute value!");
    }
    else if (isNaN(newMileSec)) {
        alert("Please enter valid seconds value!");
    }
    else {
        printElement.textContent = `${Math.floor(newMileMin)}:${Math.floor(newMileSec)}`;
    }

    if (newMileMin > 59) {
        printElement.textContent = `Invalid`;
    }
}

function hrCalculate() {
    var age = parseInt(document.getElementById("age").value);
    var maxHR = 220 - age;

    var z1Low = Math.floor(maxHR * 0.5);
    var z1High = Math.floor(maxHR * 0.6);
    var z2High = Math.floor(maxHR * 0.7);
    var z3High = Math.floor(maxHR * 0.8);
    var z4High = Math.floor(maxHR * 0.9);
    var z5High = Math.floor(maxHR);

    if (isNaN(maxHR) || age > 100 || age < 1) {
        alert("Please input valid heart rate!");
    }
    else {
        document.getElementById("hrCalculated").textContent = `${Math.floor(maxHR)} BPM`;
        document.getElementById("z1Hr").textContent = `${z1Low}-${z1High} BPM`;
        document.getElementById("z2Hr").textContent = `${z1High}-${z2High} BPM`;
        document.getElementById("z3Hr").textContent = `${z2High}-${z3High} BPM`;
        document.getElementById("z4Hr").textContent = `${z3High}-${z4High} BPM`;
        document.getElementById("z5Hr").textContent = `${z4High}-${z5High} BPM`;
    }
}