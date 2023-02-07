const chatForm = document.getElementById(`chat-form`);
const chatWindow = document.querySelector(`.chat-messages`);

const socket = io();

socket.on(`msg`, msg => {

    outputMsg(msg);
    chatWindow.scrollTop = chatWindow.scrollHeight;
});

//
chatForm.addEventListener(`submit`, (e) => {
    e.preventDefault();

    const msg = e.target.elements.msg.value;

    socket.emit(`chatMsg`, msg);

    e.target.elements.msg.value = ``;
    e.target.elements.msg.focus();
});

function outputMsg(msg) {
    const div = document.createElement(`div`);
    div.classList.add(`message`);
    div.innerHTML = `
    <p class="meta">Uname<span>8:12</span></p>
    <p class="text"> ${msg} </p>
    `;
    document.querySelector(`.chat-messages`).appendChild(div);
}