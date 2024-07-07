import React, { useState } from "react";
import "./Board.css";
import Ship from "./Ship";

const UserBoard = () => {
    const [userShips, setUserShips] = useState([
        { id: 1, size: 5, isPlaced: false, position: null, orientation: "horizontal" },
        { id: 2, size: 4, isPlaced: false, position: null, orientation: "horizontal" },
        { id: 3, size: 3, isPlaced: false, position: null, orientation: "horizontal" },
        { id: 4, size: 3, isPlaced: false, position: null, orientation: "horizontal" },
        { id: 5, size: 2, isPlaced: false, position: null, orientation: "horizontal" },
      ]);

  const handleDragStart = (e, shipId) => {
    e.dataTransfer.setData("shipId", shipId.toString());
    e.dataTransfer.setDragImage(e.target, 0, 0);
  };

  const isValidPosition = (ship, row, col) => {
    if (ship.orientation === "horizontal") {
      return col + ship.size <= 10;
    } else {
      return row + ship.size <= 10;
    }
  };

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    const shipId = parseInt(e.dataTransfer.getData("shipId"), 10);
    const shipIndex = userShips.findIndex((ship) => ship.id === shipId);

    if (shipIndex !== -1) {
      const ship = userShips[shipIndex];
      if (isValidPosition(ship, row, col)) {
        const updateShips = [...userShips];
        updateShips[shipIndex] = {
          ...updateShips[shipIndex],
          isPlaced: true,
          position: { x: col, y: row },
        };
        setUserShips(updateShips);
      } else {
        alert("El barco debe quedar completamente dentro del tablero.");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="board-container">
      <h2>⚓️ Tu tablero de batalla ⚓️</h2>
      <div className="grid" onDragOver={handleDragOver}>
        {Array.from({ length: 10 }).map((_, row) => (
          <div key={`row-${row}`} className="row">
            {Array.from({ length: 10 }).map((_, col) => (
              <div
                key={`cell-${row}-${col}`}
                className="cell"
                onDrop={(e) => handleDrop(e, row, col)}
              >
                {userShips
                  .filter((ship) => ship.isPlaced)
                  .flatMap((ship) => {
                    const shipCells = [];
                    for (let i = 0; i < ship.size; i++) {
                      const isHorizontal = ship.orientation === "horizontal";
                      const shipCol = isHorizontal ? ship.position.x + i : ship.position.x;
                      const shipRow = isHorizontal ? ship.position.y : ship.position.y + i;
                      if (shipRow === row && shipCol === col) {
                        shipCells.push(
                          <Ship
                            key={`ship-${ship.id}-${i}`}
                            id={ship.id}
                            size={ship.size}
                            onDragStart={handleDragStart}
                            style={{ visibility: "visible" }}
                          />
                        );
                      }
                    }
                    return shipCells;
                  })}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="ships-container">
        {userShips
          .filter((ship) => !ship.isPlaced)
          .map((ship) => (
            <Ship
              key={`user-ship-${ship.id}`}
              id={ship.id}
              size={ship.size}
              onDragStart={handleDragStart}
              className="ship"
              draggable={!ship.isPlaced}
            />
          ))}
      </div>
    </div>
  );
};

export default UserBoard;
