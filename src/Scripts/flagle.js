/*async function getFlag() {
    const getFlag = await fetch('https://flagcdn.com/en/codes.json')


    const flag = await getFlag.json();


    var inputField = document.getElementById("guessInput").value.toLowerCase();
    document.getElementsByClassName("gamedle-section").innerHTML = guessInput;



    if (inputField != flag.us.toLowerCase()) {
        document.getElementById("guessInput").value=null;
        window.alert("Wrong country!");
    }


    else {
        document.getElementById("guessInput").value=null;
        window.alert("Correct!")
    }
}*/
// API endpoint for getting the list of countries and codes
const COUNTRY_ENDPOINT =
    "https://cors-anywhere.herokuapp.com/https://www.flagcdn.com/en/codes.json";

// Flag image element
const flagElement = document.getElementById("flag");

// Input element
const inputElement = document.getElementById("guessInput");

inputElement.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        handleGuess();
    }
});

// Button element
const buttonElement = document.getElementsByTagName("button")[0];

// Div elements to display the guesses
const guessElements = document.getElementsByClassName("gamedle-section");

const guessButton = document.querySelector("button");
guessButton.addEventListener("click", handleGuess);

// Array to store the list of countries
let countries = [];

// Array to store the already guessed countries
let guessedCountries = [];

// Function to fetch the list of countries and codes
async function getCountries() {
    // Make an HTTP GET request to the country endpoint
    const response = await fetch(COUNTRY_ENDPOINT, {
        method: "GET",
        headers: {
            Accept: "application/json",
        },
    });

    // Get the data as a JSON object
    const data = await response.json().then((data) => console.log(data));

    // Store the list of countries
    countries = data;
}

// Function to show a random flag
function showFlag() {
    if (countries.length === 0) {
        return;
    }

    // Generate a random index
    const index = Math.floor(Math.random() * countries.length);

    // Get the flag image URL and country name
    const flagUrl = `https://www.flagcdn.com/${
        Object.keys(countries[index])[0]
    }.svg`;
    const countryName = countries[index].name;

    // Set the src attribute of the flag image element to the flag image URL
    flagElement.src = flagUrl;

    console.log(flagUrl);

    // Set the alt attribute of the flag image element to the country name
    flagElement.alt = countries[index][Object.keys(countries[index])[0]];
}

// Function to validate the entered country name
function validateCountry(guess) {
    // Iterate through the array of countries
    for (const country of countries) {
        // If the entered country name matches the name of the current country, return true
        if (guess.toLowerCase() === country.name.toLowerCase()) {
            return true;
        }
    }

    // If the entered country name is not found in the array, return false
    return false;
}

// Function to handle the guess
async function handleGuess() {
    // Get the entered country name
    const guess = inputElement.value;

    // Validate the entered country name
    if (!validateCountry(guess)) {
        // If the entered country name is not valid, display an error message
        alert("Please enter a valid country name.");
        return;
    }

    // Add the entered country name to the list of already guessed countries
    guessedCountries.push(guess);

    // Create a new div element to display the guess
    const guessElement = document.createElement("div");

    // Set the text of the div element to the entered country name
    guessElement.textContent = guess;

    // Append the div element to the div element that displays the guesses
    guessElements[guessedCountries.length - 1].appendChild(guessElement);
}

window.onload = function () {
    getCountries();
    showFlag();
};
