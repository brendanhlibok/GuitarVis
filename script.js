const guitarStrings = 6;
const frets = 12;

const canvas = document.getElementById("fretboard");
const ctx = canvas.getContext("2d");

const key = document.getElementById("key");
const chord = document.getElementById("chords")

const notes = [['A','A'], ['A#','Bb'], ['C','C'], ['C#', 'Db'], ['D','D'], ['D#','Eb'], ['E','E'], ['F','F'], ['F#','Gb'],['G','G'],['G#','Ab']];

const startNote = notes[6];

const [fretX, stringY, xdiv] = buildFretboard(guitarStrings, frets, 10);

populateFretboard(fretX,stringY,xdiv,notes);

function buildFretboard(numStrings, numFrets, margin){

    let stringY = [margin];
    let fretX = [margin];

    let ydiv = (canvas.height-margin*2)/numStrings;
    for(let i=0; i < numStrings-1; i++){
        stringY.push(ydiv+stringY[i]);
    }
    console.log(stringY);

    let xdiv = (canvas.width-margin*2)/numFrets;
    for(let i=0; i < numFrets-1; i++){
        fretX.push(xdiv+fretX[i]);
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

    return [fretX, stringY, xdiv];
}

function populateFretboard(fretX,stringY, xdiv, Notes, startNote){
    
    const shiftfretX = fretX.map(x => x - xdiv/2);

    
    for (let i=0; i<shiftfretX.length; i++){
        for (let j=0; j<stringY.length; j++){
            ctx.beginPath();
            ctx.arc(shiftfretX[i], stringY[j], 10, 0, 2* Math.PI);
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.fillStyle = "lightblue";
            ctx.fill();
        }
    }

}


