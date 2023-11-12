let notes = [];
let selectedNoteIndex = null;

function renderNotes() {
  const notesContainer = document.getElementById("notesContainer");
  notesContainer.innerHTML = "";
  notes.forEach((note, index) => {
    const noteElement = document.createElement("div");
    noteElement.className = "note";
    noteElement.textContent = note;
    noteElement.onclick = () => selectNoteHandler(index);
    notesContainer.appendChild(noteElement);
  });
}

function selectNoteHandler(index) {
  selectedNoteIndex = index;
  document.getElementById("noteInput").value = notes[index];
}

function saveNotesToLocalStorage() {
  localStorage.setItem("stickyNotes", JSON.stringify(notes));
}

function loadNotesFromLocalStorage() {
  const savedNotes = localStorage.getItem("stickyNotes");
  if (savedNotes) {
    notes = JSON.parse(savedNotes);
    renderNotes();
  }
}

function createOrUpdateNote() {
  const noteInput = document.getElementById("noteInput");
  const newNote = noteInput.value;
  if (newNote.trim() !== "") {
    if (selectedNoteIndex !== null) {
      notes[selectedNoteIndex] = newNote;
      selectedNoteIndex = null;
    } else {
      notes.push(newNote);
    }
    noteInput.value = "";
    renderNotes();
    saveNotesToLocalStorage();
  }
}

function deleteNote() {
  const noteInput = document.getElementById("noteInput");
  const noteToDelete = noteInput.value;
  const selectedIndex = notes.findIndex(note => note === noteToDelete);
  if (selectedIndex !== -1) {
    notes.splice(selectedIndex, 1);
    noteInput.value = "";
    selectedNoteIndex = null;
    renderNotes();
    saveNotesToLocalStorage();
  }
}

function confirmDeleteAll() {
  const isConfirmed = confirm("Are you sure you want to delete all notes?");
  if (isConfirmed) {
    notes = [];
    selectedNoteIndex = null;
    renderNotes();
    saveNotesToLocalStorage();
  }
}

loadNotesFromLocalStorage();
