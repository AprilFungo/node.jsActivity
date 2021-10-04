const fs = require('fs');
const chalk = require('chalk');

const addNote = function(title, body){
    const notes = loadNotes();
    const duplicateNotes = notes.filter(function (note) {
        return note.title === title;
    });
    if(duplicateNotes.length === 0){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(('\n YOUR NOTE WAS SECCESSFULLY ADDED! \n'));
    }
    else{
        console.log("\nTHIS TITLE ALREADY EXIST!\n");
    }
}

const removeNote = function(title){

    const notes = loadNotes()
    const notesToKeep = notes.filter(function (note) {
        return note.title !== title
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.cyanBright('YOUR NOTE WAS SUCCESSFULLY REMOVED!'));
        saveNotes(notesToKeep)
    }
    else{
        console.log(chalk.red.inverse('NO NOTES FOUND!'));
    }

}

const listNotes = function(){
    const notes = loadNotes()
    
    console.log(chalk.green.inverse(" =================================YOUR NOTES================================="));

    notes.forEach((note) => {
        console.log("Title : " + chalk. red(note.title) + "\n Body: " + chalk.blue(note.body))
    });
}

const readNote = function(title){
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note){
        console.log(chalk.green(note.title) + " : " + chalk.blue(note.body));
    }
    else{
        console.log(chalk.red.inverse("NO NOTES WERE FOUND!"));
    }
}


const loadNotes = function() {
    try{
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    }
    catch(e){
        return []
    }
}

const saveNotes = function(notes)  {
	const dataJSON = JSON.stringify(notes);
	fs.writeFileSync('notes.json', dataJSON);
}

module.exports = {
    addNote : addNote,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}