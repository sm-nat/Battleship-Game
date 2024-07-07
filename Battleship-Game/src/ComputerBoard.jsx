import React, { useState, useEffect } from "react";
import "./Board.css";

const ComputerBoard = () => {
  const [computerShips, setComputerShips] = useState([
    { id: 6, size: 5, isPlaced: false, position: null, orientation: "horizontal" },
    { id: 7, size: 4, isPlaced: false, position: null, orientation: "horizontal" },
    { id: 8, size: 3, isPlaced: false, position: null, orientation: "horizontal" },
    { id: 9, size: 3, isPlaced: false, position: null, orientation: "horizontal" },
    { id: 10, size: 2, isPlaced: false, position: null, orientation: "horizontal" },
  ]);

  const isValidPosition = (ship, row, col) => {
    if (ship.orientation === "horizontal") {
      return col + ship.size <= 10;
    } else {
      return row + ship.size <= 10;
    }
  };

  useEffect(() => {
    handleRandomPlacementForComputer();
  }, []);

  const handleRandomPlacementForComputer = () => {
    const updateShips = computerShips.map((ship) => {
      let position;
      do {
        position = {
          x: Math.floor(Math.random() * (10 - (ship.orientation === "horizontal" ? ship.size : 0))),
          y: Math.floor(Math.random() * (10 - (ship.orientation === "vertical" ? ship.size : 0))),
        };
      } while (!isValidPosition(ship, position.y, position.x));
      return {
        ...ship,
        position,
        isPlaced: true,
      };
    });

    setComputerShips(updateShips);
  };

  return (
    <div className="board-container">
      <h2>🦾 Computador</h2>
      <div className="grid">
        {Array.from({ length: 10 }).map((_, row) => (
          <div key={`row-${row}`} className="row">
            {Array.from({ length: 10 }).map((_, col) => (
              <div key={`cell-${row}-${col}`} className="cell">
                {computerShips
                  .flatMap((ship) => {
                    const shipCells = [];
                    for (let i = 0; i < ship.size; i++) {
                      const isHorizontal = ship.orientation === "horizontal";
                      const shipCol = ship.position && isHorizontal ? ship.position.x + i : (ship.position && ship.position.x);
                      const shipRow = ship.position && isHorizontal ? ship.position.y : (ship.position && ship.position.y + i);

                      if (shipRow === row && shipCol === col && ship.isPlaced) {
                        shipCells.push(
                          <div
                            key={`ship-${ship.id}-${i}`}
                            className="ship-cell hidden-ship"
                          ></div>
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
    </div>
  );
};

export default ComputerBoard;
