import React, { useState, useEffect, useContext } from "react";
import { useParams } from 'react-router-dom';
// import Cookies from 'universal-cookie';

import ActiveGame from '../../components/gameComponents/ActiveGame'
import EndGame from '../../components/gameComponents/EndGame'
import CurrentPlayerBanner from '../../components/gameComponents/CurrentPlayerBanner'
import PlayerHand from '../../components/gameComponents/PlayerHand'
import DealButton from '../../components/gameComponents/DealButton'

import { GameProvider } from "../../context/GameContext"
import { SocketProvider } from "../../context/SocketContext"

import API from "../../utils/API";

import "./Game.css"




// const socket = io(
//   "localhost:3001", 
// "https://floating-ravine-14544.herokuapp.com/",
// { transports: ["websocket"] }
// )

// let roomData = {}

//GAME FUNCTION
function Game() {
  const { room_id, current_player } = useParams()

  // const cookies = new Cookies();
  //ON MOUNT
  useEffect(() => {

    // API.getGame(roomData.roomId)
    // .then(res => {
    //   roomData.playerOneId = res.data.playerOne
    //   roomData.playerTwoId = res.data.playerTwo
    //   if (current_player === "2") {
    //     console.log({...gameState, readyToDeal: true})
    //     updateState({...gameState,
    //       readyToDeal: true
    //     })
    //   }
    // })
  }, [])

  //DISPLAY
  return (

    <SocketProvider id={room_id}>
      <GameProvider player={current_player}>
        <CurrentPlayerBanner />
        <DealButton />
        <PlayerHand />
      </GameProvider>
    </SocketProvider>

    // <GameContext.Provider value={{roomData, gameState, playerState, playerOne, setPlayerOne, playerTwo, setPlayerTwo, currentPlayer}}>
    //   <SocketContext.Provider value={socket}>
    //   <div className="game-container">
    //     {gameState.ended ? (
    //       <EndGame />
    //     ) : (
    //       <ActiveGame />
    //     )}
    //   </div>
    //   </SocketContext.Provider>
    // </GameContext.Provider>
  );
}

export default Game;
