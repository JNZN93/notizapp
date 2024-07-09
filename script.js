let titles = []
let notes = []

let trashTitles = []
let trashNotes = [];

function init() {
    loadFromLocalStorage();
    render();
    renderTrashNotes();
}

function render() {
    let myNotes = document.getElementById('myNotes');
    myNotes.innerHTML = '';

    for (let i = 0; i < titles.length; i++) {
    myNotes.innerHTML += getNoteTemplate(i)
    }
}


function addNote() {
    let newTitle = document.getElementById('title').value;
    let newNote = document.getElementById('note').value;
    if (newTitle == "" && newNote == "") {
        alert('Bitte Titel oder Notiz eingeben')
        return;
    }
    titles.push(newTitle);
    notes.push(newNote);
    saveToLocalStorage();
    render();
    document.getElementById('title').value = '';
    document.getElementById('note').value = '';
}

function saveToLocalStorage() {
    localStorage.setItem("titles", JSON.stringify(titles));
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("trashTitles", JSON.stringify(trashTitles));
    localStorage.setItem("trashNotes", JSON.stringify(trashNotes));
}

function loadFromLocalStorage() {
    let loadTitles = JSON.parse(localStorage.getItem('titles'));
    let loadNotes = JSON.parse(localStorage.getItem('notes'));
    let loadTrashTitles = JSON.parse(localStorage.getItem('trashTitles'));
    let loadTrashNotes = JSON.parse(localStorage.getItem('trashNotes'));
    if (loadTitles !== null) {
        titles = loadTitles;
    }
    if (loadNotes !== null) {
        notes = loadNotes;
    }
    if (loadTrashTitles !== null) {
        trashTitles = loadTrashTitles;
    }
    if (loadTrashNotes !== null) {
        trashNotes = loadTrashNotes;
    }
}


function renderTrashNotes() {
    let trashContent = document.getElementById('trashContent');
        trashContent.innerHTML = "";
    for (let i = 0; i < trashTitles.length; i++) {
        trashContent.innerHTML += getTrashNoteTemplate(i)
    }
}

function getTrashNoteTemplate(i) {
    return `<div class="note"><b>${trashTitles[i]}</b>${trashNotes[i]}<br><img onclick="deleteNote(${i})" class="trash" src="./img/trash.png"><img onclick="backToNotes(${i})" src="./img/restore.png" class="trash"></div>`
}

function getNoteTemplate(i) {
    return `<div class="note"><b>${titles[i]}</b>${notes[i]}<br><img onclick="addToTrash(${i})" class="trash" src="./img/trash.png"></div>`

}

function addToTrash(i) {
    trashTitles.push(titles[i]);
    trashNotes.push(notes[i])
    notes.splice(i, 1);
    titles.splice(i, 1);
    saveToLocalStorage();
    renderTrashNotes();
    render();
}

function deleteNote(i) {
    trashNotes.splice(i, 1);
    trashTitles.splice(i, 1);
    saveToLocalStorage();
    renderTrashNotes();
    render()
}

function backToNotes(i) {
    titles.push(trashTitles[i]);
    notes.push(trashNotes[i]);
    trashTitles.splice(i, 1);
    trashNotes.splice(i, 1);
    saveToLocalStorage();
    renderTrashNotes();
    render()
}

function openTrash() {
    renderTrashNotes();
    let arrowIcon = document.getElementById('arrowIcon');
    let openTrash = document.getElementById('trashContent');
    arrowIcon.classList.toggle('arrow')
    openTrash.classList.toggle('d-none');
}