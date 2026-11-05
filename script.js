// Intervals
const unison = 0;
const m2 = 1;
const M2 = 2;
const m3 = 3;
const M3 = 4;
const P4 = 5;
const dim5 = 6;
const P5 = 7;
const m6 = 8;
const M6 = 9;
const m7 = 10;
const M7 = 11;

// Tunings
const standard = ['E', 'A', 'D', 'G', 'B', 'E'];

// Notes
const notes = [['A','A'], ['A#','Bb'], ['B','B'],['C','C'], ['C#', 'Db'], ['D','D'], ['D#','Eb'], ['E','E'], ['F','F'], ['F#','Gb'],['G','G'],['G#','Ab']];

// Build Fretboard
const guitarStrings = 6;
const frets = 12;

// Default root
root = noteIndex('C')

const canvas = document.getElementById("fretboard");
const ctx = canvas.getContext("2d");

const key = document.getElementById("key");
const chord = document.getElementById("chords")

const [rawfretX, stringY, xdiv] = buildFretboard(guitarStrings, frets, 10);

const fretX = rawfretX.map(x => x - xdiv/2);

// Set Tuning
let sixStr, fiveStr, fourStr, threeStr, twoStr, oneStr;
setTuning(standard);

setNotePositions();

// 
setKey();

//
setChords();

// Show the Notes
showActiveNotes();

function buildFretboard(numStrings, numFrets, margin){

    let stringY = [margin];
    let rawfretX = [margin];

    let ydiv = (canvas.height-margin*2)/numStrings;
    for(let i=0; i < numStrings-1; i++){
        stringY.push(ydiv+stringY[i]);
    }
    console.log(stringY);

    let xdiv = (canvas.width-margin*2)/numFrets;
    for(let i=0; i < numFrets-1; i++){
        rawfretX.push(xdiv+rawfretX[i]);
    }
    console.log(rawfretX);

    // Display Strings
    for(let i=0; i < numStrings; i++){

        ctx.beginPath();
        ctx.moveTo(rawfretX[0], stringY[i]);
        ctx.lineTo(rawfretX[numFrets-1], stringY[i]);

        ctx.lineWidth = 5;
        ctx.strokeStyle = "gray";

        ctx.stroke();

    }

    // Display Frets
    for (let i=0; i < numFrets; i++){

        ctx.beginPath()
        ctx.moveTo(rawfretX[i], stringY[0]);
        ctx.lineTo(rawfretX[i], stringY[numStrings-1]);

        ctx.lineWidth = 5;
        ctx.strokeStyle = "gray";

        ctx.stroke();
    }

    

    return [rawfretX, stringY, xdiv];
}

function showActiveNotes(){

    for (let i=0; i<fretX.length; i++){
        for (let j=0; j<stringY.length; j++){
            createNoteIcon(i,j,"blue","lightblue");
        }
    }

}

function createNoteIcon(fret,string,outline,infill){
            ctx.beginPath();
            ctx.arc(fretX[fret], stringY[string], 10, 0, 2* Math.PI);
            ctx.strokeStyle = outline;
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.fillStyle = infill;
            ctx.fill();
}

function noteIndex(letter) {
    return notes.findIndex(pair => pair.includes(letter));
}

function setTuning(tuning) {
    const sixStr = [noteIndex(tuning[0]), fretX[0], stringY[0]];
    const fiveStr = [noteIndex(tuning[1]), fretX[0], stringY[1]];
    const fourStr = [noteIndex(tuning[2]), fretX[0], stringY[2]];
    const threeStr = [noteIndex(tuning[3]), fretX[0], stringY[3]];
    const twoStr = [noteIndex(tuning[4]), fretX[0], stringY[4]];
    const oneStr = [noteIndex(tuning[5]), fretX[0], stringY[5]];
}

function setKey(){
    root = parseInt(key.value, 10);
}

function setChords(){

}

function setNotePositions(){
    for(let i=0; i<length.stringY; i++){
        for(let j = 0; j< length.fretX; j++){
            
        }
    }  
}