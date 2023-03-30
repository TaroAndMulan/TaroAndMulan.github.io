import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const URL = "http://localhost:8080";
const socket = io(URL, { autoConnect: false });

socket.on("users", (users) => {
  users.forEach((user) => {
    user.self = user.userID === socket.id;
    initReactiveProperties(user);
  });
  // put the current user first, and then sort by username
  this.users = users.sort((a, b) => {
    if (a.self) return -1;
    if (b.self) return 1;
    if (a.username < b.username) return -1;
    return a.username > b.username ? 1 : 0;
  });
});


socket.onAny((event, ...args) => {
  console.log(event, args);
});


socket.connect();

const joinio = () => {}

const Identity = ({name,lift}) => {

  const [toroom, setToroom] = useState(false)

  const joinio = () => {
    console.log(name)
    socket.auth = { name };
    socket.connect();
  }
  


  return (
    <>
      <div onClick={joinio}> CLICK TO CONNECT IO</div>
      <div>{name}</div>
      <div> connect to room : {toroom} </div>
    </>
  )
}



export default Identity;
