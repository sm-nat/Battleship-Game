import React, { useState, useEffect } from "react";

const GameLogic = ({
  userShips,
  setUserShips,
  computerShips,
  setComputerShips,
  handleCellClick,
  handleUserShot
}) => {
  const [userTurn, setUserTurn] = useState(true); // Indica si es el turno del usuario
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    if (!userTurn && !gameOver) {
      setTimeout(() => {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        handleUserShot(row, col);
        setUserTurn(true); // Cambia a true para indicar que es el turno del usuario
      }, 1000);
    }
  }, [userTurn, gameOver, handleUserShot]);

  return null;
}

export default GameLogic;
