document.addEventListener("DOMContentLoaded", function(){
    let username = sessionStorage.getItem("username_login");
    let score = sessionStorage.getItem("score_login")
    console.log(username)
    console.log(score)
    document.getElementById("username_home").textContent=username;
    document.getElementById("score_home").textContent=score;

});
