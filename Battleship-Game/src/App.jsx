import React, { useState } from "react";
import { useNavigate, Route, Routes } from "react-router-dom";
import { Header } from "./Header.jsx";
import { Footer } from "./Footer.jsx";
import { Play } from "./Play.jsx";
import { Board } from "./Board.jsx";
import GameLogic from "./GameLogic.jsx";
import "./App.css";

function App() {
  const navigate = useNavigate();

  const [userShips, setUserShips] = useState([
    // Estado inicial de los barcos del usuario
  ]);

  const [computerShips, setComputerShips] = useState([
    // Estado inicial de los barcos del computador
  ]);

  const startPlay = () => {
    navigate("/board");
  };

  // Función para manejar el clic en una celda del tablero del usuario
  const handleCellClick = (row, col) => {
    console.log("user disparo")
  };

  return (
    <div>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Play startPlay={startPlay} />}
        />
        <Route
          path="/board"
          element={
            <>
              <Board
              />
              
              <GameLogic
                userShips={userShips}
                setUserShips={setUserShips}
                computerShips={computerShips}
                setComputerShips={setComputerShips}
                handleCellClick={handleCellClick} // Pasar la función handleCellClick como prop
              />
            </>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
