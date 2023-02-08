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


chatForm.addEventListener(`submit`, (e) => {
    
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit(`chatMsg`, {msg, Username});

    e.target.elements.msg.value = ``;
    e.target.elements.msg.focus();
});

function outputMsg(msg) {
    const div = document.createElement(`div`);
    div.classList.add(`message`);
    div.innerHTML = `
    <p class="meta">${msg.usrname} <span>${msg.time}</span></p>
    <p class="text"> ${msg.text} </p>
    `;
    document.querySelector(`.chat-messages`).appendChild(div);
}