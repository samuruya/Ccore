
const path = require(`path`);
const http = require(`http`)
const express = require(`express`);
const socketio = require(`socket.io`);
const { Socket } = require("dgram");
const formatMsg = require(`./utils/messages`);
const { send } = require("process");


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// static folder
app.use(express.static(path.join(__dirname, `open`)));

const botName = `CCore`;

// Run on connect

const userList = {};
const uList = [];

io.sockets.on(`connection`, socket => {
    const tempID = socket.id;
    //welcome
    socket.emit(`msg`, formatMsg(botName, `Welcome`))


    // on connect
    socket.broadcast.emit(`msg`, formatMsg(botName, `user joined`));
    socket.emit(`getName`);

    socket.on(`sendName`, uInfo => {
        userList[uInfo.uID] = uInfo.Username;
        console.log(`"` + uInfo.Username + `" connected (` + uInfo.uID+ `)` );
        if(!uList.includes(uInfo.uID)) {
            uList.push(uInfo.Username);
        }
        io.emit(`refreshUL`, userList);
    });

    socket.on(`kick`, () => {
        console.log(userList);
    });

    // on disconnect 
    socket.on(`disconnect`, () => {
        socket.emit(`userDc`, socket.id);
        io.emit(`msg`, formatMsg(botName, `${userList[socket.id ]} left`));
        console.log("disconnected: "+socket.id);
        delete userList[socket.id];
        io.emit(`refreshUL`, userList);
    });

    //
    socket.on(`chatMsg`, data => {
        io.emit(`msg`, formatMsg(data.Username, data.msg));  
    });
});




const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server running on port ' + PORT));


