import React, { useState, useEffect } from "react";
import io from "socket.io-client"
import { useParams } from 'react-router-dom';
// import Cookies from 'universal-cookie';
import ActiveGame from '../components/gameComponents/ActiveGame'
import EndGame from '../components/gameComponents/EndGame'
import API from "../utils/API";
import "./Game.css"

export const GameContext = React.createContext()
export const SocketContext = React.createContext()

const socket = io(
  "localhost:3001", 
  // "https://floating-ravine-14544.herokuapp.com/",
  { transports: ["websocket"] }
)

let roomData = {}

//GAME FUNCTION
function Game() {
  const {room_id, current_player} = useParams()
  // const cookies = new Cookies();
  //ON MOUNT
  useEffect(() => {

    roomData.roomId = room_id
    setPlayerState(parseInt(current_player))

    console.log(roomData.roomId, current_player)

    API.getGame(roomData.roomId)
    .then(res => {
      roomData.playerOneId = res.data.playerOne
      roomData.playerTwoId = res.data.playerTwo
      if (current_player === "2") {
        console.log({...gameState, readyToDeal: true})
        updateState({...gameState,
          readyToDeal: true
        })
      }
      // let userID = cookies.get('user').id
      // console.log(userID)

      // if (res.data.playerOne === cookies.get('user').id) {
      //   setPlayerState(1)
      // } 
      // if (res.data.playerTwo === cookies.get('user').id) {
      //   setPlayerState(2)
      //   updateState({...gameState,
      //     readyToDeal: true
      //   })
      // }
    })
  }, [])

    //CURRENT PLAYER
  const [playerState, setPlayerState] = useState()

  // TESTING PLAYER SWITCH
  // function switchPlayer() {
  //   if (playerState === 1){setPlayerState(2)}
  //   else {setPlayerState(1)}
  // }

  function updateState (newState) {
    socket.emit('update_state', newState, roomData.roomId)
    console.log('update_state' + roomData.roomId)
  }
  
  function updatePlayerOne (newPlayerOne) {
    socket.emit('update_playerOne', newPlayerOne, roomData.roomId)
  }
  
  function updatePlayerTwo (newPlayerTwo) {
    socket.emit('update_playerTwo', newPlayerTwo, roomData.roomId)
  }
  
  //GAME STATE
  socket.on('update_state' + roomData.roomId, function(newState){
    console.log(newState)
    console.log(playerState)
    setGameState(newState)
    // socket.off('update_state' + roomData.roomId)
  })
  
  socket.on('update_playerOne' + roomData.roomId, function(newPlayerOne){
    console.log(newPlayerOne)
    setPlayerOne(newPlayerOne)
    // socket.off('update_playerOne' + roomData.roomId)
  })
  
  socket.on('update_playerTwo' + roomData.roomId, function(newPlayerTwo){
    console.log("updated Player 2")
    setPlayerTwo(newPlayerTwo)
    // socket.off('update_playerTwo' + roomData.roomId)
  })

  const [gameState, setGameState] = useState({
    deck: [],
    discard : [],
    ended: false,
    finalScore: "",
    winner: "",
    readyToDeal: false,

    p1Turn: false,
    p1MustDiscard: false,
    p1DeclaredGin: false,
    p1DecalaredKnock: false,
    p1HasKnock: false,
    p1HasGin: false,
    p1Score: 0,
    
    p2Turn: false,
    p2MustDiscard: false,
    p2DeclaredGin: false,
    p2DecalaerdKnock: false,
    p2HasKnock: false,
    p2HasGin: false,
    p2Score: 0
  })

    //PLAYER TWO CARDS STATE
    const [playerTwo, setPlayerTwo] = useState ({
      hand: [],
      sets: [[],[],[],[]],
    })
  
    //PLAYER ONE CARDS STATE
    const [playerOne, setPlayerOne] = useState ({
      hand: [],
      sets: [[],[],[],[]],
    })

  var currentPlayer
  if (playerState === 1) {
    currentPlayer = {
      hand: playerOne.hand,
      sets: playerOne.sets,

      turn: gameState.p1Turn,
      mustDiscard: gameState.p1MustDiscard,
      declaredGin: gameState.p1DeclaredGin,
      declaredKnock: gameState.p1DeclaredKnock,

      knockedAgainst: gameState.p2HasKnock,
      ginAgainst: gameState.p2HasGin
    } 
  }
  else {    
    currentPlayer = {
      hand: playerTwo.hand,
      sets: playerTwo.sets,

      turn: gameState.p2Turn,
      mustDiscard: gameState.p2MustDiscard,
      declaredGin: gameState.p2DeclaredGin,
      declaredKnock: gameState.p2DeclaredKnock,

      knockedAgainst: gameState.p1HasKnock,
      ginAgainst: gameState.p1HasGin
    } 
  }

  //DISPLAY
  return (
    <GameContext.Provider value={{roomData, gameState, playerState, playerOne, setPlayerOne, playerTwo, setPlayerTwo, currentPlayer}}>
      <SocketContext.Provider value={socket}>
      <div className="game-container">
        {gameState.ended ? (
          <EndGame />
        ) : (
          <ActiveGame />
        )}
      </div>
      </SocketContext.Provider>
    </GameContext.Provider>
  );
}

export default Game;
