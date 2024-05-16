document.getElementById("login_button").addEventListener("click", gotClicked);

function gotClicked() {
    let usernameInput = document.getElementById("username").value;
    document.getElementById("invalid").textContent = "";

    if (usernameInput == "") {
        document.getElementById("Invalid").textContent = "No Username Entered. Please Try Again!";
    }
}
