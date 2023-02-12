const lastuData = window.localStorage.getItem('userData');
var lastUserData = "none";
var lastRoomID = "none";

function login() {
    const validEntry = false
    const userData = {        
       usrname: document.getElementById(`uname`).value,
        roomID: document.getElementById(`room`).value
    }

    if (userData.usrname.length >= 4 && userData.roomID.length >= 5) {

            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('login');
            let baseUrl = "http://localhost:3000/chat.html?";
            let queryString = "room=" + userData.roomID;
            let fullUrl = baseUrl + queryString;
            window.location.href = fullUrl;             
    }
    if(userData.roomID.length < 5) {
        console.log('roomID is invalid!');
        document.getElementById(`room`).style.background = "#d9534f"
        document.getElementsByName(`room`)[0].placeholder = "invalid room id"
    }
    if(userData.usrname.length < 4) {
        console.log('Username to Short!');
        document.getElementById(`uname`).style.background = "#d9534f"
        document.getElementsByName(`uname`)[0].placeholder = "username is too short!"
    }
}

function reConnect() {
    if(lastRoomID != null) {
        window.location.href = "chat.html";
        //add code to reconnect
    }
}

function returning() {
    if(lastuData != null){
        lastUserData = JSON.parse(lastuData);
        lastRoomID = lastUserData["roomID"];
    }else {
        document.getElementById(`reconnect`).style.display = "none";
    }
}

function chbg(color) {
    document.getElementById('tooltiptext').style.visibility = color;
    if(color == `visible`) {
        document.getElementById('tooltiptext').innerHTML = `
        <p>Last name: ${lastUserData["usrname"]}</p>
        <p>Last Room: ${lastUserData["roomID"]}</p>
        `
    }
}   


