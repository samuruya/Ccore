const lastuData = window.localStorage.getItem('userData');
var lastUserData = "none";
var lastRoomID = "none";

function login() {
    const validEntry = false
    const userData = {        
       usrname: document.getElementById(`uname`).value,
        roomID: document.getElementById(`room`).value
    }

    if (userData.usrname.length >= 4) {
        if (userData.roomID.length >= 5) {
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('login');
            window.location.href = "chat.html";
            //add code for quarrystring room selection
        } else {
            console.log('roomID is invalid!');
        }        
    } else  {
        console.log('Username to Short!');
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


