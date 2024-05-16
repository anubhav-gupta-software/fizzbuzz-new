function get(url) {
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onload = function() {
        resolve({ status: http.status, data: JSON.parse(http.response) });
      };
      http.open("GET", url);
      http.send();
    });
  }

  function post(url, data) {
    data = JSON.stringify(data);
    return new Promise((resolve, reject) => {
      const http = new XMLHttpRequest();
      http.onload = function() {
        resolve({ status: http.status, data: JSON.parse(http.response) });
      };
      http.open("POST", url);
      http.setRequestHeader("Content-Type", "application/json");
      http.send(data);
    });
  }
  
 
function get_api_response(url) {
    get(url).then(function(response){
         if (response.status == 200) {
            usernameApi = response.data.id;
            score = response.data.score;
            console.log("The Username \"" + usernameApi + "\" is present.")
            console.log("The score is " + score)
            sessionStorage.setItem('username_login', usernameApi)
            sessionStorage.setItem('score_login', score)
    }
        else {
            console.log("The Required Username Not Found");
            console.log("Creating Username With score 0");
            post(url, {score: 0});
            get_api_response(url)
        }
      
          

    })
}

document.getElementById("login_button").addEventListener("click", gotClicked);  
function gotClicked() {
    let usernameInput = document.getElementById("username").value;
    document.getElementById("invalid").textContent = "";

    if (usernameInput == "") {
        document.getElementById("invalid").textContent = "No Username Entered. Please Try Again!";
    }
    else {
        let apiUrl = "http://localhost:8000/"
        let requestUrl = apiUrl + usernameInput;
        get_api_response(requestUrl)
        window.location.assign('home.html');
        
    }
}
