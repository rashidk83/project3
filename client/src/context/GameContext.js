import React, { useEffect, useState, createContext, useContext } from "react";
import { useSocketContext } from "./SocketContext"

const GameContext = createContext();

//DECK BUILDER
class Deck {
  constructor() {
    this.deck = [];

    const suits = ['\u2665', '\u2660', '\u2663', '\u2666'];
    const numbers = [1, 2, 3, 4, 5, 6, 7,]
    // 8, 9, 10, 11, 12, 13];

    suits.forEach(suitVal => {
      numbers.forEach(numberVal => {
        let displayVal = numberVal
        if (numberVal === 1) { displayVal = "A" }
        if (numberVal === 11) { displayVal = "J" }
        if (numberVal === 12) { displayVal = "Q" }
        if (numberVal === 13) { displayVal = "K" }
        this.deck.push({
          suit: suitVal,
          number: numberVal,
          display: displayVal,
        })
      })
    })
  }
}

export function useGameContext() {
  return useContext(GameContext)
}

export const GameProvider = ({ player, children }) => {
  const socket = useSocketContext()
  const [gameState, setGameState] = useState({
    deck: new Deck().deck,
    discard: [],

    action: "setUp",
    score: {
      player1: 0,
      player2: 0
    },
  })
  const [playerState, setPlayerState] = useState({
    number: player,
    hand: [],
    sets: [[], [], [], []],
    turn: false,
    mustDiscard: false,
    declaredEnd: false,
    score: 0
  })

  useEffect(() => {
    if (socket == null) return
    console.log(socket)

    socket.on("receive_state", (newState) => {
      console.log("receive")
      setGameState(newState)
    })

    // return () => socket.off("receive_state")
  }, [socket])

  function updateGameState(newState) {
    socket.emit("send_state", newState)
  }

  return (
    <GameContext.Provider value={
      {
        gameState,
        updateGameState,

        playerState,
        setPlayerState
      }
    }>
      {children}
    </GameContext.Provider>
  );
};

