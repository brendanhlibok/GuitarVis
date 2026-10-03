const guitarStrings = 6;
const frets = 12;

const canvas = document.getElementById("fretboard");
const ctx = canvas.getContext("2d");

updateFretboard(guitarStrings, frets, 10);

function updateFretboard(numStrings, numFrets, margin){

    let stringY = [margin];
    let fretX = [margin];

    for(let i=0; i < numStrings-1; i++){
        div = (canvas.height-margin*2)/numStrings;
        stringY.push(div+stringY[i]);
    }
    console.log(stringY);

    for(let i=0; i < numFrets-1; i++){
        div = (canvas.width-margin*2)/numFrets;
        fretX.push(div+fretX[i]);
    }
    console.log(fretX);

    // Display Strings
    for(let i=0; i < numStrings; i++){

        ctx.beginPath();
        ctx.moveTo(fretX[0], stringY[i]);
        ctx.lineTo(fretX[numFrets-1], stringY[i]);

        ctx.lineWidth = 5;
        ctx.strokeStyle = "gray";

        ctx.stroke();

    }

    // Display Frets
    for (let i=0; i < numFrets; i++){

        ctx.beginPath()
        ctx.moveTo(fretX[i], stringY[0]);
        ctx.lineTo(fretX[i], stringY[numStrings-1]);

        ctx.lineWidth = 5;
        ctx.strokeStyle = "gray";

        ctx.stroke();
    }


}



