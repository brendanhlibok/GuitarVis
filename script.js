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

intervalColors = {
    [root]: "#0a0000",
    [m2]: "#3d9477",
    [M2]: "#3d9477",
    [m3]: "#3d9477",
    [M3]: "#3d9477",
    [P4]: "#3d9477",
    [dim5]: "#3d9477",
    [P5]: "#3d9477",
    [m6]: "#3d9477",
    [M6]: "#3d9477",
    [m7]: "#3d9477",
    [M7]: "#3d9477",
}

// Tunings
const standard = ['E', 'A', 'D', 'G', 'B', 'E'];

// Notes
const notes = [];
const notesByName = {};

// Scales
const major = [root,M2,M3,P4,P5,M6,M7];

class Note {

    constructor(names, relIndex, type){
        this.sharpName = names[0];
        this.flatName = names[1];
        this.relIndex = relIndex;
        this.keyType = type;
        this.interval = null;
        this.positions = [];
        this.active = false;
        this.aura = false;
        this.color = "#f7f4f4";
        this.outline = "#3d9477";
        this.infill = "#bd6f45";
  

    }
}

notesByName['A'] = notes[0] = new Note(['A','A'], 0, 'sharp');
notesByName['A#'] = notesByName['Bb'] = notes[1] = new Note(['A#','Bb'], 1, 'flat');
notesByName['B'] = notes[2] = new Note(['B','B'], 2, 'sharp');
notesByName['C'] = notes[3] = new Note(['C','C'], 3, 'ns');
notesByName['C#'] = notesByName['Db'] = notes[4] = new Note(['C#', 'Db'], 4, 'flat');
notesByName['D'] = notes[5] = new Note(['D','D'], 5, 'sharp');
notesByName['D#'] = notesByName['Eb'] = notes[6] = new Note(['D#','Eb'], 6, 'flat');
notesByName['E'] = notes[7] = new Note(['E','E'], 7, 'sharp');
notesByName['F'] = notes[8] = new Note(['F','F'], 8, 'flat');
notesByName['F#'] = notesByName['Gb'] = notes[9] = new Note(['F#','Gb'], 9, 'ns');
notesByName['G'] = notes[10] = new Note(['G','G'], 10, 'sharp');
notesByName['G#'] = notesByName['Ab'] = notes[11] = new Note(['G#','Ab'], 11,'flat');



// Build Fretboard
const guitarStrings = 6;
const frets = 12;

// Key
let rootNote;
let keyType = 'ns';
let key = 'A';

// Scale
let scale = major;

const canvas = document.getElementById("fretboard");
const keyselector = document.querySelector('#key');
const ctx = canvas.getContext("2d");

const margin = 40

const chord = document.getElementById("chords")

const [rawfretX, stringY, xdiv] = buildFretboard(guitarStrings, frets, margin);

const fretX = rawfretX.map(x => x - xdiv/2);

// Set the note visuals
const noteDia = xdiv/6;
noteFontSize = noteDia;
doubleNote = false;

const noteColor = "#FF3131"

// Set Tuning

setTuning(standard);

setNotePositions(standard);



setKey(keyselector.value);

setScale(scale);

showActiveNotes();

keyselector.addEventListener('change', e =>{
    key = keyselector.value;
    setKey(key);
    setScale(scale);
    showActiveNotes();
});

showActiveNotes();

//
setChords();

function buildFretboard(numStrings, numFrets, margin){

    let stringY = [margin];
    let rawfretX = [margin];

    let ydiv = (canvas.height-margin*2)/numStrings;
    for(let i=0; i < numStrings-1; i++){
        stringY.push(ydiv+stringY[i]);
    }

    stringY.reverse();
    
    let xdiv = (canvas.width-margin*2)/numFrets;
    for(let i=0; i < numFrets; i++){
        rawfretX.push(xdiv+rawfretX[i]);
    }

    // Display Strings
    for(let i=0; i < numStrings; i++){

        ctx.beginPath();
        ctx.moveTo(rawfretX[0], stringY[i]);
        ctx.lineTo(rawfretX[numFrets], stringY[i]);

        ctx.lineWidth = 5;
        ctx.strokeStyle = "gray";

        ctx.stroke();

    }

    // Display Frets
    for (let i=0; i < numFrets+1; i++){

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
    rootNote = notesByName[inputKey];
    keyType = rootNote.keyType;
    console.log(keyType);
    rootNote.interval = root;
    rootNote.infill = intervalColors[root];
    for(let i=1; i<notes.length; i++){
        notes[(rootNote.relIndex+i) % 12].interval = i;
        notes[(rootNote.relIndex+i) % 12].infill = intervalColors[i];
    }
}

function setScale(inputScale){
    console.log(rootNote.sharpName);
    for (let i=0; i<notes.length; i++){
        let interval = (notes[i].relIndex - rootNote.relIndex + 12) % 12;
        notes[i].active = inputScale.includes(interval);
    } 
}

function setChords(){
}

function showActiveNotes(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    buildFretboard(guitarStrings, frets, margin);

    for (let i=0; i<notes.length; i++){
        if (keyType === 'ns'){
            if (notes[i].sharpName === notes[i].flatName) {
                name = notes[i].sharpName
                doubleNote = false;
            } else {
                name = notes[i].sharpName + "/" + notes[i].flatName
                doubleNote = true;
            }
        } else {
            name = notes[i][keyType + "Name"];
            doubleNote = false;
        }
        for (let j=0; j<notes[i].positions.length; j++){
            if (notes[i].active){
                createNoteIcon(name, notes[i].positions[j][0],notes[i].positions[j][1],notes[i]);
            }
        }   

    }
}

function createNoteIcon(name,fret,string,note){
    if (doubleNote){
        noteFontSize = noteDia/2;
    } else {
        noteFontSize = noteDia;
    }
    ctx.beginPath();
    ctx.arc(fretX[fret], stringY[string], noteDia, 0, 2* Math.PI);
    ctx.strokeStyle = note.outline;
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = note.infill;
    ctx.fill();
    noteFont = `${noteFontSize}px sans-serif`;
    ctx.font = noteFont;
    ctx.fillStyle = note.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(name, fretX[fret],stringY[string]);
}