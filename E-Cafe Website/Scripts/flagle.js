
async function getFlag() {
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
}