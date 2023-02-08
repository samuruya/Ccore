

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
        } else {
            console.log('roomID is invalid!');
        }        
    } else  {
        console.log('Username to Short!');
    }
}


