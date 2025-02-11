function typeEffect(element, text, speed) {
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
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
    const text = " Throughout this quiz you will answer some questions that will determine what Starter Pokemon you are based on your answers! Have fun!! Click the Top Right Corner to start the game music! P.S Once Clicked it won't stop :) "; 
    typeEffect(textElement, text, 50); // Adjust speed (50ms per letter)
});


// Room definitions
const rooms = {
    cul: {
        name: "What's Your Major",
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
        name: "Favorite Spice Level?",
        description: "How spicy do you like your food?",
        image: "./img/food.jpg",
        exitOptions: [
            { key: "quest3", text: "Extra hot, I love the heat!", value: 5 },
            { key: "quest3", text: "Not a fan of spice, it hurts my stomach", value: 10 },
            { key: "quest3", text: "Medium, just the right balance", value: 20 },
            { key: "quest3", text: "Extreme hot, for the thrill!", value: 1 },
        ],
    },
    quest3: {
        name: "Favorite Music Genre?",
        description: "What's your favorite music genre?",
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
        name: "Favorite Videogame Genre?",
        description: "What games do you like to play?",
        image: "./img/icons.jpg",
        exitOptions: [
            { key: "quest5", text: "Action-adventure", value: 5 },
            { key: "quest5", text: "Role-playing (RPG)", value: 10 },
            { key: "quest5", text: "Sports", value: 1 },
            { key: "quest5", text: "Battle Royale", value: 15 },
            { key: "quest5", text: "First-Person Shooter", value: 20 },
        ],
    },
    quest5: {
        name: "Game Consoles",
        description: "What console do you currently own?",
        image: "./img/consoles.jpg",
        exitOptions: [
            { key: "end", text: "PlayStation 5", value: 5 },
            { key: "end", text: "Nintendo Switch", value: 10 },
            { key: "end", text: "Xbox", value: 1 },
            { key: "end", text: "Nintendo 3DS/DSi/2DS", value: 20 },
            { key: "end", text: "None of the above", value: 15 },
        ],
    }
};

//Background Music

const backgroundMusic = document.getElementById("background-music");

// Ensure the music plays after user interaction due to browser autoplay restrictions
document.addEventListener("click", function () {
    if (backgroundMusic.paused) {
        backgroundMusic.play();
    }
}, { once: true });

// Ensure it loops forever
backgroundMusic.addEventListener("ended", function () {
    this.currentTime = 0;
    this.play();
});

let currentRoom = "cul";
let playerScore = 0;

function displayRoom(roomKey) {
    const room = rooms[roomKey];
    if (!room) return;

    // If the player reaches the "end" room, generate a Pokémon starter
    if (roomKey === "end") {
        fetchPokemonStarter();
        return;
    }

    $("#room-name").text(room.name);
    $("#room-description").text(room.description);

    if (room.image) {
        $("#room-image").attr("src", room.image).show();
    } else {
        $("#room-image").hide();
    }

    const optionsContainer = $("#options");
    optionsContainer.empty();

    room.exitOptions.forEach(option => {
        const button = $("<button></button>")
            .addClass("option-button")
            .text(option.text)
            .on("click", function () {
                playerScore += option.value;
                updateScoreDisplay();
                displayRoom(option.key);
            });

        optionsContainer.append(button);
    });
};


function updateScoreDisplay() {
    $("#score-display").text(`Score: ${playerScore}`);
};

// Start button event listener
$("#start-btn").on("click", function() {
    displayRoom(currentRoom);
    $("#start-btn").hide(); // Hide the start button after clicking
});

$("#start-btn").on("click", function() {
    // Hide the intro elements
    $("#intro-title, #typed").hide();

    // Optionally, start showing the first room
    $("#room-container").show();
    $(this).hide(); // Hide the start button itself
});

async function fetchPokemonStarter() {
    try {
        const response = await fetch("https://sharkham.github.io/starter-generator/data.json");
        const data = await response.json();
        const randomIndex = Math.floor(Math.random() * data.length);
        displayPokemonStarter(data[randomIndex]);
    } catch (error) {
        console.error("Error fetching Pokémon starter:", error);
        $("#room-description").text("Error retrieving Pokémon starter. Please try again.");
    }
}

function displayPokemonStarter(pokemon) {
    $("#room-name").text("Your Pokémon Starter!");
    $("#room-description").html(`Congratulations! Your starter Pokémon is <strong>${pokemon.name}</strong>, a <strong>${pokemon.type}-type</strong> Pokémon.`);
    $("#room-image").attr("src", pokemon.image).show();

    $("#options").empty().append(`<button class="option-button" onclick="restartGame()">Restart Game</button>`);
}


function restartGame() {
    playerScore = 0;
    currentRoom = "cul";
    updateScoreDisplay();
    displayRoom(currentRoom);
}

$(document).ready(function () {
    $("body").append('<div id="score-display" style="font-size: 20px; margin-top: 10px;">Score: 0</div>');
});

