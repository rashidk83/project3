import React, {  useEffect, } from "react";
import { useParams } from 'react-router-dom';

import CurrentPlayerBanner from '../../components/gameComponents/CurrentPlayerBanner'
import Action from '../../components/gameComponents/Action'
import PlayerHand from '../../components/gameComponents/PlayerHand'
import Draw from '../../components/gameComponents/Draw'

import { GameProvider } from "../../context/GameContext"
import { SocketProvider } from "../../context/SocketContext"

// import API from "../../utils/API";

import "./Game.css"

//GAME FUNCTION
function Game() {
  const { room_id, current_player } = useParams()



  useEffect(() => {

  }, [])

  //DISPLAY
  const game = {
    padding: "0",
    margin: "0",
    boxSizing: "border-box",
    textAlign: "center",
    backgroundColor: `rgb(235, 255, 212)`,
    height: "100%",
    minHeight: "100vh"
  } 

  return (
    <SocketProvider id={room_id}>
      <GameProvider player={current_player}>
        <div style={game}>
          <CurrentPlayerBanner />
          <Action />
          <PlayerHand />
          <Draw />
        </div>
      </GameProvider>
    </SocketProvider>
  );
}

export default Game;
