import React, { useState, useEffect, createContext, useContext } from "react";
import io from "socket.io-client"

const SocketContext = createContext();

export function useSocketContext() {
  return useContext(SocketContext)
}

export const SocketProvider = ({ id, children }) => {
  const [socket, setSocket] = useState()

  useEffect(() => {
    const newSocket = io(
      "http://localhost:3001",
      { 
        transports: ["websocket"], 
        query: { id } 
      }
    )
    setSocket(newSocket)

    // return () => newSocket.close()
  }, [id])

  return (
    <SocketContext.Provider value={ socket }>
      {children}
    </SocketContext.Provider>
  );
};