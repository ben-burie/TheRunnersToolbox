function predictionSubmit() {
    const predictionOutput = document.getElementById("predictionOutput");

    var t1String = document.getElementById("t1").value;
    var d1 = document.getElementById("d1").value;
    var d2 = document.getElementById("d2").value;

    t1String = t1String.replace(":", "");
    t1String = t1String.replace(":", "");

    var t1Hours = parseInt(t1String.substring(0,2));
    var t1Minutes = parseInt(t1String.substring(2,4));
    var t1Seconds = parseInt(t1String.substring(4,6));

    if(!Number.isInteger(t1Hours) || !Number.isInteger(t1Minutes) || !Number.isInteger(t1Seconds)) {
        alert("Invalid input! Time must be formatted hh:mm:ss")
        return;
    }
    else if (t1Minutes < 0 || t1Seconds < 0 || d1 <= 0 || d1 > 100 || t1Seconds > 59 || t1Minutes > 59 || t1Hours < 0 || t1Hours > 59 || d2 <= 0 || d2 > 100) {
        alert("Invalid input!");
        return;
    }

    t1Hours *= 60;
    t1Minutes += t1Hours;
    t1Minutes *= 60;
    t1Seconds += t1Minutes;

    var newT1Time = d2 / d1;
    newT1Time = Math.pow(newT1Time, 1.06);
    var t2Seconds = newT1Time * t1Seconds;
    var t2Hours = t2Seconds / 3600;
    t2Hours = Math.floor(t2Hours);
    var t2Minutes = t2Seconds - (t2Hours * 3600);
    t2MinTemp = t2Minutes / 60;
    t2Minutes = Math.floor(t2MinTemp);
    t2Seconds = t2Seconds - (t2Minutes * 60) - (t2Hours * 3600);
    t2Seconds = Math.floor(t2Seconds);

    if (t2Hours === 0) {
        if (t2Seconds < 10) {
            predictionOutput.textContent = `${t2Minutes}:0${t2Seconds}`;
        }
        else {
            predictionOutput.textContent = `${t2Minutes}:${t2Seconds}`;
        }
    }
    else {
        if (t2Minutes < 10) {
            if (t2Seconds < 10) {
                predictionOutput.textContent = `${t2Hours}:0${t2Minutes}:0${t2Seconds}`;
            }
            else {
                predictionOutput.textContent = `${t2Hours}:0${t2Minutes}:${t2Seconds}`;
            }
        }
        else {
            if (t2Seconds < 10) {
                predictionOutput.textContent = `${t2Hours}:${t2Minutes}:0${t2Seconds}`;
            }
            else {
                predictionOutput.textContent = `${t2Hours}:${t2Minutes}:${t2Seconds}`;
            }
        }
    }
}

function clearPredictions() {
    document.getElementById("t1").value = "";
    document.getElementById("d1").value = "";
    document.getElementById("d2").value = "";

    document.getElementById("predictionOutput").textContent = "";
}