// Intervals
const root = 0;
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
const notes = [];
const notesByName = {};

class Note {

    constructor(names, relIndex){
        this.sharpName = names[0];
        this.flatName = names[1];
        this.relIndex = relIndex;
        this.interval = null;
        this.positions = [];
        this.active = false;
        this.aura = false;

    }
}

notesByName['A'] = notes[0] = new Note(['A','A'], 0);
notesByName['A#'] = notesByName['Bb'] = notes[1] = new Note(['A#','Bb'], 1);
notesByName['B'] = notes[2] = new Note(['B','B'], 2);
notesByName['C'] = notes[3] = new Note(['C','C'], 3);
notesByName['C#'] = notesByName['Db'] = notes[4] = new Note(['C#', 'Db'], 4);
notesByName['D'] = notes[5] = new Note(['D','D'], 5);
notesByName['D#'] = notesByName['Eb'] = notes[6] = new Note(['D#','Eb'], 6);
notesByName['E'] = notes[7] = new Note(['E','E'], 7);
notesByName['F'] = notes[8] = new Note(['F','F'], 8);
notesByName['F#'] = notesByName['Gb'] = notes[9] = new Note(['F#','Gb'], 9);
notesByName['G'] = notes[10] = new Note(['G','G'], 10);
notesByName['G#'] = notesByName['Ab'] = notes[11] = new Note(['G#','Ab'], 11);


// Build Fretboard
const guitarStrings = 6;
const frets = 12;

const canvas = document.getElementById("fretboard");
const ctx = canvas.getContext("2d");

const key = document.getElementById("key");
const chord = document.getElementById("chords")

const [rawfretX, stringY, xdiv] = buildFretboard(guitarStrings, frets, 10);

const fretX = rawfretX.map(x => x - xdiv/2);

// Set Tuning

setTuning(standard);

setNotePositions(standard);
console.log(notesByName['E'].positions);

showActiveNotes();

setKey();

//
setChords();

function buildFretboard(numStrings, numFrets, margin){

    let stringY = [margin];
    let rawfretX = [margin];

    let ydiv = (canvas.height-margin*2)/numStrings;
    for(let i=0; i < numStrings-1; i++){
        stringY.push(ydiv+stringY[i]);
    }
    
    let xdiv = (canvas.width-margin*2)/numFrets;
    for(let i=0; i < numFrets-1; i++){
        rawfretX.push(xdiv+rawfretX[i]);
    }

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

function setTuning(tuningInput) {
    notesByName[tuningInput[0]].positions.push([fretX[0],stringY[5]]);
    notesByName[tuningInput[1]].positions.push([fretX[0],stringY[4]]);
    notesByName[tuningInput[2]].positions.push([fretX[0],stringY[3]]);
    notesByName[tuningInput[3]].positions.push([fretX[0],stringY[2]]);
    notesByName[tuningInput[4]].positions.push([fretX[0],stringY[1]]);
    notesByName[tuningInput[5]].positions.push([fretX[0],stringY[0]]);

}

function setNotePositions(tuningInput){
    for(let i=0; i<stringY.length; i++){
        for(let j = 1; j<fretX.length; j++){
            nextNote = notes[(notesByName[tuningInput[i]].relIndex+j) % 12]
            nextNote.positions.push([j,i])
            nextNote.active = true;
        }
    }  
}

function setKey(inputKey){

}

function setChords(){
}

function showActiveNotes(){
    for (let i=0; i<notes.length; i++){
        for (let j=0; j<notes[i].positions.length; j++){
            createNoteIcon(notes[i].sharpName, notes[i].positions[j][0],notes[i].positions[j][1],"blue","lightblue");
        }
    }

}

function createNoteIcon(name,fret,string,outline,infill){
            ctx.beginPath();
            ctx.arc(fretX[fret], stringY[string], 10, 0, 2* Math.PI);
            ctx.strokeStyle = outline;
            ctx.lineWidth = 4;
            ctx.stroke();
            ctx.fillStyle = infill;
            ctx.fill();
            ctx.font = '24px sans-serif';
            ctx.fillStyle = "#FF5733";
            ctx.fillText(name, fretX[fret],stringY[string])
}