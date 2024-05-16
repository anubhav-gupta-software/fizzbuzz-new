//Function to get data from API calls
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
//Function to update/create data through API 
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
  
//Function to handle get and post requests
function get_api_response(url) {
    get(url).then(function(response){
         if (response.status == 200) {
            usernameApi = response.data.id;
            score = response.data.score;
            // console.log("The Username \"" + usernameApi + "\" is present.")
            // console.log("The score is " + score)
            sessionStorage.setItem('username_login', usernameApi)
            sessionStorage.setItem('score_login', score) //session storage for data access
            window.location.assign('home.html'); 
          }
        else {
            // console.log("The Required Username Not Found, Creating User");
            post(url, {score: 0}).then(function(){//creation of user with score 0
              get_api_response(url)
            });
            
        }
      
          

    })
}

document.getElementById("login_button").addEventListener("click", gotClicked);//Login Button Click Event Listener
function gotClicked() {
    let usernameInput = document.getElementById("username").value;
    document.getElementById("invalid").textContent = "";

    if (usernameInput == "") {
        document.getElementById("invalid").textContent = "No Username Entered. Please Try Again!";
    }
    else {//only runs when the username is non-null
        let apiUrl = "http://localhost:8000/" //server address
        let requestUrl = apiUrl + usernameInput;
        get_api_response(requestUrl)
        
        
    }
}
