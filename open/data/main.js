const chatForm = document.getElementById(`chat-form`);
const chatWindow = document.querySelector(`.chat-messages`);

const socket = io();
const uData = window.localStorage.getItem('userData');
const userData = JSON.parse(uData);
const Username = userData["usrname"];


socket.on(`msg`, msg => {    
    outputMsg(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

socket.on(`getName`, () => {
    const uID = socket.id;
    socket.emit(`sendName`, {Username, uID} );
});

socket.on(`refreshUL`, obj => {
    usrRender(obj);
});

//remove all and add all users on disconnect and join to avoid the need to reaload to see new users

socket.on(`userDc`, toRemove => {
    document.getElementById(toRemove).remove();
});

chatForm.addEventListener(`submit`, (e) => {
    
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit(`chatMsg`, {msg, Username});

    e.target.elements.msg.value = ``;
    e.target.elements.msg.focus();
});

function outputMsg(msg) {
    if (msg.usrname == ``){
        msg.usrname = `AnonymUser`
    }
    const div = document.createElement(`div`);
    div.classList.add(`message`);
    div.innerHTML = `
    <p class="meta">${msg.usrname} <span>${msg.time}</span></p>
    <p class="text"> ${msg.text} </p>
    `;
    document.querySelector(`.chat-messages`).appendChild(div);
}

function kickUser() {
    socket.emit(`kick`);
    console.log(socket.id);
}

function usrRender(obj) {
    document.getElementById(`users`).innerHTML = ``
    for(const property in obj) {
        const div = document.createElement(`div`);
        div.id = property;
        div.classList.add(`usr-list`);
        div.innerHTML = `<span class="material-symbols-outlined">
        person
        </span><p class="meta">${obj[property]}</p>`;
        document.getElementById(`users`).appendChild(div);
    }
}



