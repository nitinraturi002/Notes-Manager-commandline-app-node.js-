const fs = require('fs');

var fetchNotes = () => {
  try{
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  }catch(e){
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

// Add note
var addNote = (title,body) => {
  var notes = fetchNotes();
  var note = {
    title :title,
    body
  };
var duplicateNotes = notes.filter((note) => note.title === title );

if(duplicateNotes.length === 0){
  notes.push(note);
  saveNotes(notes);
  return note;
}
};


// Get All Note
var getAll = () => {
  return fetchNotes();
};

// Get a specific note
var getNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title === title);
  if(filteredNotes.length !== 0)
  {
  return filteredNotes[0];
  }
};


//Remove a specific no
var removeNote = (title) => {
  var notes = fetchNotes();
  var filteredNotes = notes.filter((note) => note.title !== title );
  saveNotes(filteredNotes);
  return notes.length !== filteredNotes.length;
}

var logNote = (note) => {
  console.log('--');
  console.log(`Title : ${note.title}`);
  console.log(`body : ${note.body}`);
};
module.exports = {
   addNote,
   getAll : getAll,
   getNote,
   removeNote,
   logNote
};
