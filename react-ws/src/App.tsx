import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [socket, setSocket] = useState<null | WebSocket>(null);
  const [latestMessage, setLatestMessage] = useState("");
  const[m,setm]=useState("")
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8080");
    socket.onopen = () => {
      console.log("connected");
      setSocket(socket);
    };

    socket.onmessage = (message) => {
      console.log("recieved messsage", message.data);
      setLatestMessage(message.data);
    };


    return()=>{
      socket.close();
    }
  }, []);

  if (!socket) {
    return <div>Loading....</div>;
  }
  return (
    <>
      <input onChange={(e)=>setm(e.target.value)}></input>
      <button
        onClick={() => {
          socket.send(m);
        }}
      >
        Send
      </button>

      {latestMessage}
    </>
  );
}

export default App;
