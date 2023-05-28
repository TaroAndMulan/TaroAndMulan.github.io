'use client'
import {socket} from "@/components/socket";
import Button from '@mui/material/Button';
import { useState,useEffect } from "react";
import { TextField } from "@mui/material";
import Scan from "@/components/scan";

function Lobby(){
    const [username, setUsername] = useState("bobo");
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [fooEvents, setFooEvents] = useState([]);
    const [vc,setVc] = useState({})
    const [users,setUsers] = useState([])

    function list_user ()  {
        let list = [];
        for (let i = 0; i < users.length; i++) {
            list.push(
                <>
                <div key={i}>{"userID "+ users[i].userID}</div>
                <div>{"username "+users[i].username}</div>
                </>
            )
        }
        return list;
    }

    useEffect(() => {
        function onConnect() {
          setIsConnected(true);
        }
    
        function onDisconnect() {
          setIsConnected(false);
        }
    
        function onFooEvent(value) {
          setFooEvents(previous => [...previous, value]);
        }

        function onUsers(v){
            console.log(v)
            setUsers(v)
        }
    
        socket.on('connect', onConnect);
        socket.on('users',onUsers)
        socket.on('disconnect', onDisconnect);    
        return () => {
          socket.off('connect', onConnect);
          socket.off('disconnect', onDisconnect);
          socket.off('foo', onFooEvent);
        };
      }, []);


    function connect(){
        socket.auth = { username, vc };
        socket.connect();
    }

    return (
        <>
 
                <div>wow za</div>
                <TextField id="outlined-basic" label="Outlined" variant="outlined" value={username} onChange={(e)=> setUsername(e.target.value)}/>

                <Button onClick={()=> connect()}>connected</Button>

                {
                    list_user()
                }

        </>
    )
}

export default Lobby;