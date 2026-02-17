const addNoteBtn = document.getElementById('addNoteBtn');
const notesContainer = document.getElementById('notesContainer');

let notes = JSON.parse(localStorage.getItem('notes')) || [];

function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

const emojis = ['😀', '😂', '❤️', '👍', '🎉', '⭐', '✅', '📝', '💡', '🔥'];

function createNoteElement(note, index) {
    const noteDiv = document.createElement('div');
    noteDiv.className = 'note';
    noteDiv.innerHTML = `
        <textarea placeholder="Write your note...">${note}</textarea>
        <div class="emoji-bar">
            ${emojis.map(emoji => `<span class="emoji" data-emoji="${emoji}">${emoji}</span>`).join('')}
        </div>
        <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
    `;
    
    const textarea = noteDiv.querySelector('textarea');
    textarea.addEventListener('input', () => {
        notes[index] = textarea.value;
        saveNotes();
    });
    
    noteDiv.querySelectorAll('.emoji').forEach(emojiSpan => {
        emojiSpan.addEventListener('click', () => {
            const emoji = emojiSpan.dataset.emoji;
            const cursorPos = textarea.selectionStart;
            const textBefore = textarea.value.substring(0, cursorPos);
            const textAfter = textarea.value.substring(cursorPos);
            textarea.value = textBefore + emoji + textAfter;
            notes[index] = textarea.value;
            saveNotes();
            textarea.focus();
            textarea.setSelectionRange(cursorPos + emoji.length, cursorPos + emoji.length);
        });
    });
    
    return noteDiv;
}

function renderNotes() {
    notesContainer.innerHTML = '';
    notes.forEach((note, index) => {
        notesContainer.appendChild(createNoteElement(note, index));
    });
}

function addNote() {
    notes.push('');
    saveNotes();
    renderNotes();
}

function deleteNote(index) {
    notes.splice(index, 1);
    saveNotes();
    renderNotes();
}

addNoteBtn.addEventListener('click', addNote);

renderNotes();
