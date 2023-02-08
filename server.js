
const path = require(`path`);
const http = require(`http`)
const express = require(`express`);
const socketio = require(`socket.io`);
const { Socket } = require("dgram");
const formatMsg = require(`./utils/messages`)


const app = express();
const server = http.createServer(app);
const io = socketio(server);

// static folder
app.use(express.static(path.join(__dirname, `open`)));

const botName = `CCore`;

// Run on connect

io.on(`connection`, socket => {
    //welcome
    socket.emit(`msg`, formatMsg(botName, `Welcome`))


    // on connect
    socket.broadcast.emit(`msg`, formatMsg(botName, `user joined`));

    // on disconnect 
    socket.on(`disconnect`, () => {
        io.emit(`msg`, formatMsg(botName, `user left`));
    });

    //
    socket.on(`chatMsg`, data => {
        io.emit(`msg`, formatMsg(data.Username, data.msg));
        console.log(data);   
    });
});




const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server running on port ' + PORT));


