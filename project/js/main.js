function typeEffect(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, 25);
        }
    }
    type();
        // Attach event listener to hide text when "Continue" button is clicked
        document.getElementById("start-btn").addEventListener("click", function () {
            document.getElementById("typing-text").style.display = "none";
        });
};

// Call the function on page load
document.addEventListener("DOMContentLoaded", function () {
    const textElement = document.getElementById("typing-text");
    const text = " Throughout this quiz you will answer some questions that will determine what Pokemon you are based on your answers! Have fun!! Click the Top Right Corner to start the music! :) "; 
    typeEffect(textElement, text, 50); // Adjust speed (50ms per letter)
});


// Room definitions
const rooms = {
    cul: {
        name: "Your Major",
        description: "Are you in the art, science, literature, econ, or math side?",
        image: "./img/major.jpg",
        exitOptions: [
            { key: "quest2", text: "I'm on the artsy side ", value: 1 },
            { key: "quest2", text: "I like science and what can be achieved through it", value: 10 },
            { key: "quest2", text: "I really like to read and write", value: 15 },
            { key: "quest2", text: "I want to learn more about how our country's economy will be impacted in the future", value: 5 },
            { key: "quest2", text: "I like solving math equations for fun", value: 20 }
        ],
    },
    quest2: {
        name: "Spice Level",
        description: "How Spicy Do You Like Your Food?",
        image: "./img/food.jpg",
        exitOptions: [
            { key: "quest3", text: "Extra hot, I love the heat!", value: 5 },
            { key: "quest3", text: "Not a fan of spice, it hurts my stomach", value: 10 },
            { key: "quest3", text: "Medium, just the right balance", value: 20 },
            { key: "quest3", text: "Extreme hot, for the thrill!", value: 1 },
        ],
    },
    quest3: {
        name: "Music Genre",
        description: "What's Your Favorite Music Genre?",
        image: "./img/lofi.jpg",
        exitOptions: [
            { key: "quest4", text: "Indie rock", value: 20 },
            { key: "quest4", text: "Jazz", value: 10 },
            { key: "quest4", text: "Pop", value: 1 },
            { key: "quest4", text: "Hip-hop", value: 5 },
            { key: "quest4", text: "Classical", value: 15 },
        ],
    },
    quest4: {
        name: "Videogame Genre",
        description: "What Games Do You Like To Play?",
        image: "./img/icons.jpg",
        exitOptions: [
            { key: "quest5", text: "Action-adventure like Stray, GTA, Assassin's Creed, and Red Dead Redemption", value: 5 },
            { key: "quest5", text: "Role-playing (RPG) like Elden Ring, Cyberpunk, Dark Souls, and Skyrim", value: 10 },
            { key: "quest5", text: "Sports like FIFA, EA Sports, NBA 2K, and MLB", value: 1 },
            { key: "quest5", text: "Battle Royale like Fall Guys, Fortnite, Super Smash Bros, and World of Warcraft", value: 15 },
            { key: "quest5", text: "First-Person Shooter like Call of Duty, Battlefield, Ghost Recon, and Halo", value: 20 },
        ],
    },
    quest5: {
        name: "Game Consoles",
        description: "What Console Do You Currently Own?",
        image: "./img/consoles.jpg",
        exitOptions: [
            { key: "quest6", text: "PlayStation 3/4/5", value: 5 },
            { key: "quest6", text: "Nintendo Switch or Switch Lite", value: 10 },
            { key: "quest6", text: "Xbox", value: 1 },
            { key: "quest6", text: "Nintendo 3DS/DSi/2DS", value: 20 },
            { key: "quest6", text: "None of the above", value: 15 },
        ],
    },
    quest6:{
        name:"Chip Snacks",
        description:"Which Chip Snack Do You Like To Enjoy The Most?",
        image:"",
        exitOptions:[
            {key: "quest7", text:"Cheetos - Cheese/Flaming Hot/Extreme Hot/Cheese Puffs/Flaming Hot Puffs", value: 20},
            {key: "quest7", text:"Lays - Barbeque/Limon/Chile and Lime/Original", value: 5},
            {key: "quest7", text:"Ruffels - Queso/Flaming Hot/Original", value: 10},
            {key: "quest7", text:"Takis - Zombie Nitro/Waves Blue Heat/Fuego/Nitro", value: 15},
            {key: "quest7", text:"Doritos - Nacho Cheese/Cool Ranch/Flaming Hot Nacho/Spicy Nacho", value: 1},
        ]

    },
    quest7:{
        name:"Yearly Seasons",
        description: "What Season Do You Want To Last Forever?",
        image:"",
        exitOptions:[
            {key: "quest8", text:"Summer", value: 1},
            {key: "quest8", text:"Spring", value: 15},
            {key: "quest8", text:"Winter", value: 10},
            {key: "quest8", text:"Fall", value:20},
        ]
    },

    end: {
        name: "Your Spirit Pokemon Is!",
        description: "There You Have It! This Pokemon Represents You!",
        exitOptions: [] 
    },
};

//Background Music
document.addEventListener("DOMContentLoaded", function () {
    const backgroundMusic = document.getElementById("background-music");
    const musicButton = document.getElementById("music-button");

    let isPlaying = false;

    musicButton.addEventListener("click", function () {
        if (!isPlaying) {
            backgroundMusic.play().catch(error => console.error("Playback error:", error));
            musicButton.innerHTML = "⏸"; // Change to pause symbol
        } else {
            backgroundMusic.pause();
            musicButton.innerHTML = "▶"; // Change back to play symbol
        }
        isPlaying = !isPlaying;
    });
});

let currentRoom = "cul";
let playerScore = 0;

function displayRoom(roomKey) {
    const room = rooms[roomKey];
    if (!room) return;

    if (roomKey === "end") {
        $("#room-container").fadeOut(500, function () {
            let randomPokemonId = Math.floor(Math.random() * 898) + 1;
            console.log(`Fetching Pokémon with ID: ${randomPokemonId}`);

            $("#output").show(); // ✅ Show Pokémon generator
            fetchPokemonStarter(randomPokemonId);

            $("#end-credits").fadeIn(1000); // ✅ Show end credits
            $("#reset-btn").show(); // ✅ Show Reset Button

            $("#room-container").fadeIn(500);
        });
    } else {
        $("#output, #end-credits, #reset-btn").hide(); // ✅ Hide elements in other rooms
    }

    $("#room-name").text(room.name);
    $("#room-description").text(room.description);
    $("#room-image").attr("src", room.image).toggle(!!room.image);
    
    const optionsContainer = $("#options").empty();
    room.exitOptions.forEach(option => {
        $("<button></button>")
            .addClass("option-button")
            .text(option.text)
            .on("click", function () {
                playerScore += option.value;
                updateScoreDisplay();
                displayRoom(option.key);
            })
            .appendTo(optionsContainer);
    });
}

// ✅ Ensure Reset Button Works
$(document).ready(function () {
    $("#reset-btn").on("click", function () {
        location.reload(); // Reloads the page to restart the game
    });
});


function updateScoreDisplay() {
    $("#score-display").text(`Score: ${playerScore}`);
}

$("#start-btn").on("click", function() {
    $(".title").fadeOut(500); // Smoothly fades out the title
    $("#typed").fadeOut(500);
    displayRoom(currentRoom);
    $(this).fadeOut(500); // Smoothly fades out the button
    $("#room-container").fadeIn(500); // Smoothly shows the game container
});

document.addEventListener("DOMContentLoaded", function() {
    let fetchButton = document.getElementById("fetchButton");
    
    if (fetchButton) {
        fetchButton.addEventListener("click", function() {
            let id = document.getElementById("pokemonId").value;
            fetchPokemonStarter(id || 1);
        });
    } else {
        console.error("fetchButton not found in the DOM!");
    }
});

function enterRoom(roomName) {
    console.log(`Entering room: ${roomName}`);
    document.getElementById("roomTitle").innerText = roomName;

    if (roomName.toLowerCase() === "end") {
        let randomPokemonId = Math.floor(Math.random() * 898) + 1;
        console.log(`Generating Pokémon with ID: ${randomPokemonId}`);
        fetchPokemonStarter(randomPokemonId);
    }
}

function fetchPokemonStarter(id) {
    id = parseInt(id); // Convert input to a number
    if (!id || isNaN(id) || id < 1 || id > 898) { // Validate Pokémon ID
        console.error("Error: Invalid or missing ID!");
        let outputDiv = document.getElementById("output");
        if (outputDiv) {
            outputDiv.innerHTML = `<p style="color:red;">Invalid Pokémon ID</p>`;
        }
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`) // ✅ Corrected API URL
        .then(response => {
            if (!response.ok) {
                throw new Error(`Pokémon not found (ID: ${id})`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Pokemon Data:", data);

            let outputDiv = document.getElementById("output");
            if (!outputDiv) {
                console.error("Error: 'output' div not found in the DOM!");
                return;
            }

            outputDiv.innerHTML = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Type: ${data.types.map(t => t.type.name).join(", ")}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            let outputDiv = document.getElementById("output");
            if (outputDiv) {
                outputDiv.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
            }
        });
}

function fetchPokemonStarter(id) {
    id = parseInt(id); // Convert input to a number
    if (!id || isNaN(id) || id < 1 || id > 898) { // Validate Pokémon ID
        console.error("Error: Invalid or missing ID!");
        document.getElementById("output").innerHTML = `<p style="color:red;">Invalid Pokémon ID</p>`;
        return;
    }

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Pokémon not found (ID: ${id})`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Pokemon Data:", data);

            let outputDiv = document.getElementById("output");
            if (!outputDiv) {
                console.error("Error: 'output' div not found in the DOM!");
                return;
            }

            outputDiv.innerHTML = `
                <h2>${data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h2>
                <img src="${data.sprites.front_default}" alt="${data.name}">
                <p>Type: ${data.types.map(t => t.type.name).join(", ")}</p>
            `;
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("output").innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
        });
}

$("#end-credits").addClass("credits-animation");