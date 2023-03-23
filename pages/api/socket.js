import { Server } from "socket.io";
const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("user connected rdgdr55");
      socket.on('dog', (msg) => {
        socket.emit('heyuser', 'senddogemitserver')
        console.log("recieve dog");
      });
      socket.on('error', (err) => {
        console.log("error", err);
      })
      socket.on("disconnect", () => {
        console.log("disconnected");
      });
    });
  }
  res.end();
};

export default SocketHandler;
