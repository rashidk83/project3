import React, { 
  // useState, 
  useEffect, 
  // useContext 
} from "react";
import { useParams } from 'react-router-dom';
// import Cookies from 'universal-cookie';

import CurrentPlayerBanner from '../../components/gameComponents/CurrentPlayerBanner'
import PlayerHand from '../../components/gameComponents/PlayerHand'
import Action from '../../components/gameComponents/Action'

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
  return (

    <SocketProvider id={room_id}>
      <GameProvider player={current_player}>
        <div className="game">
          <CurrentPlayerBanner />
          <Action />
          <PlayerHand />
        </div>
      </GameProvider>
    </SocketProvider>

  );
}

export default Game;
