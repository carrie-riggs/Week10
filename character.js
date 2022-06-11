class Quest {
    constructor(name, note) {
        this.name = name;
        this.note = note;
    }
}

class Character {
    constructor(id, name) {
        this.id = id;
        this.name = name;
        this.quests = [];
    }

    addQuest(quest) {
        this.quests.push(quest);
    }

    deleteQuest(quest) {
        let index = this.quest.indexOf(quest)
        this.quests.splice(index, 1);
    }
}

let characters = [];
let characterId = 0;


onClick('new-character', () => {
    characters.push(new Character(characterId++, getValue('new-character-name')))
    drawDOM();
});

function onClick(id, action) {
    let element = document.getElementById(id);
    element.addEventListener('click', action);
    return element;
}

function getValue(id) {
    return document.getElementById(id).value;
}

function drawDOM() {
    let characterDiv = document.getElementById('characters');
    clearElement(characterDiv);
    for (character of characters) {
        let table = createCharacterTable(character);
        let title = document.createElement('h2');
        title.innerHTML = character.name + ' ';
        title.appendChild(createDeleteCharacterButton(character));
        characterDiv.appendChild(title);
        characterDiv.appendChild(table);
        for (quest of character.quests) {
            createQuestRow(character, table, quest);
        }
    }
}

function createQuestRow(character, table, quest) {
    let row = table.insertRow(2);
    row.insertCell(0).innerHTML = quest.name;
    row.insertCell(1).innerHTML = quest.note;
    let actions = row.insertCell(2);
    actions.appendChild(createDeleteRowButton(character, quest));
}

function createDeleteRowButton (character, quest) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        let index = character.quests.indexOf(quest);
        character.quests.splice(index, 1);
        drawDOM();
    };
    return btn;
}

function createDeleteCharacterButton(character) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-danger btn-sm';
    btn.innerHTML = 'Delete Character';
    btn.onclick = () => {
    let index = characters.indexOf(character);
    characters.splice(index, 1);
    drawDOM();
    };
    return btn;
}

function clearElement(element) {
    while(element.firstChild) {
        element.removeChild(element.firstChild);
    }
}


function createNewQuestButton(character) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-info';
    btn.innerHTML = 'Create';
    btn.onclick = () => {
        character.quests.push(new Quest(getValue(`name-input-${character.id}`), (getValue(`note-input-${character.id}`))));
        drawDOM();
    };
    return btn;
}


function createCharacterTable(character) {
    let table = document.createElement('table');
    table.setAttribute('class', 'table table-bordered table-light table-striped');
    let row = table.insertRow(0);
    let nameColumn = document.createElement('th');
    let noteColumn = document.createElement('th');
    let createColumn = document.createElement('th');
    nameColumn.innerHTML = 'Quest Name';
    noteColumn.innerHTML = 'Notes';
    createColumn.innerHTML = ' ';
    row.appendChild(nameColumn);
    row.appendChild(noteColumn);
    row.appendChild(createColumn);
    let formRow = table.insertRow(1);
    let nameTh = document.createElement('th');
    let noteTh = document.createElement('th');
    let createTh = document.createElement('th');
    let nameInput = document.createElement('input');
    nameInput.setAttribute('id', `name-input-${character.id}`);
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('class', 'form-control');
    let noteInput = document.createElement('input');
    noteInput.setAttribute('id', `note-input-${character.id}`);
    noteInput.setAttribute('type', 'text');
    noteInput.setAttribute('class', 'form-control');
    let newQuestButton = createNewQuestButton(character);
    nameTh.appendChild(nameInput);
    noteTh.appendChild(noteInput);
    createTh.appendChild(newQuestButton);
    formRow.appendChild(nameTh);
    formRow.appendChild(noteTh);
    formRow.appendChild(createTh);
    return table;
}