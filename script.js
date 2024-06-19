const seedData = [
    {
        name: "Djordje",
        lastName: "Petrović",
        position: "Goalkeeper"
    },
    {
        name: "Levi",
        lastName: "Colwil",
        position: "Defender"
    },
    {
        name: "Cole",
        lastName: "Palmer",
        position: "Midfielder"
    }
];

document.getElementById('editPlayerBtn').style.display = 'none';       

        document.addEventListener('DOMContentLoaded', function() {
            
            if (!localStorage.getItem('players')) {
                localStorage.setItem('players', JSON.stringify(seedData));
                console.log("Seed data set in local storage");
            } else {
                console.log("Local storage already has data");
            }
            console.log("Current players in local storage:", JSON.parse(localStorage.getItem('players')));
            
            renderPlayers();
        });

function renderPlayers() {
    
    const playersStorage = JSON.parse(localStorage.getItem('players'));
    
    
    const tableBody = document.getElementById('players');
    tableBody.textContent = ''; 
    playersStorage.forEach((player,index) => {
        const newRow = document.createElement('tr');
        let playerName = document.createElement('td');
        let playerLastName = document.createElement('td');
        let playerPosition = document.createElement('td');
        let actions = document.createElement('td');

        updateButton = document.createElement('button');
        updateButton.id = "update";

        deleteButton = document.createElement("button");
        deleteButton.id = "delete";

        updateButton.addEventListener("click",() => updatePlayer(index));
        updateButton.textContent = "Edit";
        deleteButton.addEventListener("click",() => deletePlayer(index));
        deleteButton.textContent = "Delete";

        actions.appendChild(updateButton);
        actions.appendChild(deleteButton);
        document.getElementById('editPlayerBtn').style.display = 'none';

        playerName.textContent = player.name;
        playerLastName.textContent = player.lastName;
        playerPosition.textContent = player.position;

        newRow.appendChild(playerName);
        newRow.appendChild(playerLastName);
        newRow.appendChild(playerPosition);
        newRow.appendChild(actions);
        tableBody.appendChild(newRow);
    });
}
function updatePlayer(index) {
    const playersStorage = JSON.parse(localStorage.getItem('players'));
    const player = playersStorage[index];
    document.getElementById('firstName').value = player.name;
    document.getElementById('lastName').value = player.lastName;
    document.getElementById('position').value = player.position;

    editIndex = index; 

    document.getElementById('addPlayerBtn').style.display = 'none';
    document.getElementById('editPlayerBtn').style.display = 'block';
    
}

function deletePlayer(index) {
    const playersStorage = JSON.parse(localStorage.getItem('players'));
    playersStorage.splice(index, 1);
    localStorage.setItem('players', JSON.stringify(playersStorage));
    renderPlayers();
}

document.getElementById('addPlayerBtn').addEventListener('click', function() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const position = document.getElementById('position').value;
    if (!firstName || !lastName || !position) {
        alert("Please fill in all fields.");
        return; 
    }

    const newPlayer = { name: firstName, lastName: lastName, position: position };
    
    let playersStorage = JSON.parse(localStorage.getItem('players'));
    playersStorage.push(newPlayer);

    localStorage.setItem('players', JSON.stringify(playersStorage));

    renderPlayers();

});

document.getElementById('editPlayerBtn').addEventListener('click', function() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const position = document.getElementById('position').value;

    const updatedPlayer = { name: firstName, lastName: lastName, position: position };

    let playersStorage = JSON.parse(localStorage.getItem('players'));
    playersStorage[editIndex] = updatedPlayer; 

    localStorage.setItem('players', JSON.stringify(playersStorage));

    renderPlayers();

    document.getElementById('playerForm').reset();

    document.getElementById('addPlayerBtn').style.display = 'inline';

    editIndex = -1; 
});