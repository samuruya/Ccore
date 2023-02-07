
const path = require(`path`);
const http = require(`http`)
const express = require(`express`);
const socketio = require(`socket.io`);
const { Socket } = require("dgram");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// static folder
app.use(express.static(path.join(__dirname, `open`)));

// Run on connect

io.on(`connection`, socket => {
    //welcome
    socket.emit(`msg`, `Welcome`)

    // on connect
    socket.broadcast.emit(`msg`, `user joined`);

    // on disconnect 
    socket.on(`disconnect`, () => {
        io.emit(`msg`, `user left`);
    });

    //
    socket.on(`chatMsg`, msg => {
        console.log(msg);

        io.emit(`msg`, msg);
        
    });
});




const PORT = 3000 || process.env.PORT;

server.listen(PORT, () => console.log('Server running on port ' + PORT));


