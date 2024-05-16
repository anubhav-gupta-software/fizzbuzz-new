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


document.addEventListener("DOMContentLoaded", function(){
    let apiUrl = "http://localhost:8000/"
    
    let username = sessionStorage.getItem("username_login");
    let requestUrl = apiUrl + username;
    let score = parseInt(sessionStorage.getItem("score_login"))
    console.log(username)
    console.log(score)
    document.getElementById("username_home").textContent=username;
    document.getElementById("score_home").textContent=score;

    document.getElementById("increment").addEventListener("click", gotClicked);  
    
    function gotClicked(){
        score+=1;
        post(requestUrl, {score:score}).then(function(){
            document.getElementById("score_home").textContent=score;
        });
        
    }
    
});