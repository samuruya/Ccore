const lastuData = window.localStorage.getItem('userData');
var lastUserData = "none";
var lastRoomID = "none";

async function login() {
    const validEntry = false
    const userData = {        
       usrname: document.getElementById(`uname`).value,
        roomID: document.getElementById(`room`).value
    }

    if (userData.usrname.length >= 4 && userData.roomID.length <= 6 && userData.roomID.length >= 5) {
        // entry try
            localStorage.setItem('userData', JSON.stringify(userData));
            console.log('login');
            let baseUrl = "http://localhost:3000/chat.html?";
            let queryString = "room=" + userData.roomID;
            let fullUrl = baseUrl + queryString;
            load();
            await sleep(3000);
            window.location.href = fullUrl;


    }
    if(userData.roomID.length < 5 || userData.roomID.length > 6) {
        // roomID err
            console.log('roomID is invalid!');
            document.getElementById(`room`).style.background = "#d9534f"
            toasty(`invalid roomID please check if your roomID is 5 or 6 chars long`);
    }
    if(userData.usrname.length < 4 || userData.usrname.length > 10) {
        // name err
        console.log('Username too Short!');
        document.getElementById(`uname`).style.background = "#d9534f"
        toasty(`invalid Username, make sure the username is longer than 4 and shorter than 10 chars`)
    }
}

async function reConnect() {
    if(lastRoomID != null) {
        lastUserData = JSON.parse(lastuData);
        lastRoomID = lastUserData["roomID"];
        console.log('reconnet');
        let baseUrl = "http://localhost:3000/chat.html?";
        let queryString = "room=" + lastRoomID;
        let fullUrl = baseUrl + queryString;
        load();
        await sleep(2000)
        window.location.href = fullUrl;
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

function toasty(alertMsg) {
    var x = document.getElementById("toasty");
    x.innerHTML = alertMsg
    x.className = "show";
    setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

//loader


const sleep = ms => new Promise(r => setTimeout(r, ms));

function load() {
    document.getElementById("loader").style.display = "flex";
}

