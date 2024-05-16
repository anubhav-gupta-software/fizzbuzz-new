//Function to update/create data through API 
function post(url, data) {
    data = JSON.stringify(data);

    return new Promise((resolve, reject) => {
        const http = new XMLHttpRequest();
        http.onload = function() {
            resolve({
                status: http.status,
                data: JSON.parse(http.response)
            });
        };

        http.open("POST", url);
        http.setRequestHeader("Content-Type", "application/json");
        http.send(data);
    });
}

//Implementation of FizzBuzz checker
function fizzbuzz_checker(score) {
    if (score == 0) {
        return score;
    }
    if (score % 3 == 0 && score % 5 == 0) {
        return ("FizzBuzz")
    } else if (score % 3 == 0) {
        return ("Fizz")
    } else if (score % 5 == 0) {
        return ("Buzz")
    } else {
        return score;
    }
}

document.addEventListener("DOMContentLoaded", function() { //runs after HTML is parsed
    let apiUrl = "http://localhost:8000/"
    let username = sessionStorage.getItem("username_login"); //accessing session storage variables
    let requestUrl = apiUrl + username;
    let score = parseInt(sessionStorage.getItem("score_login"))

    // console.log(username)
    // console.log(score)

    document.getElementById("username_home").textContent = username; //setting default or previous data
    document.getElementById("score_home").textContent = fizzbuzz_checker(score);
    document.getElementById("increment").addEventListener("click", gotClicked); //event listener for increment

    function gotClicked() {
        score += 1; //incrementing score on each click
        post(requestUrl, {
            score: score
        }).then(function() { //running after the score is updated in the server
            document.getElementById("score_home").textContent = fizzbuzz_checker(score);
        });
    }
});