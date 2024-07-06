import React, { useState } from "react";
import "./Board.css"
import Ship from "./Ship";

export const Board = ({ title }) => {
    //barcos en el tablero
    const [ships, setShips] = useState([
        { id: 1, size: 5, isPlaced: false, position: { x: 0, y: 0  }, orientation: "horizontal" },
        { id: 2, size: 4, isPlaced: false, position: { x: 0, y: 0  }, orientation: "horizontal" },
        { id: 3, size: 3, isPlaced: false, position: { x: 0, y: 0  }, orientation: "horizontal" },
        { id: 4, size: 3, isPlaced: false, position: { x: 0, y: 0  }, orientation: "horizontal" },
        { id: 5, size: 2, isPlaced: false, position: { x: 0, y: 0  }, orientation: "horizontal" },
    ]);

    const handleDragStart = (e, shipId) => {
            e.dataTransfer.setData("shipId", shipId.toString());
            e.dataTransfer.setDragImage(e.target, 0, 0);
        };
    
    const handleRandomPlacement = () => {
        //logica para posicionar aleatoriamente los barcos del computador
        const updateShips = ships.map((ship) => ({
            ...ship,
            position: {
                x: Math.floor(Math.random() * (10 - ship.size + 1)),
                y: Math.floor(Math.random() * 10),
            },
            isPlaced: true,
        }));
        setShips(updateShips);
    };


const handleDragOver = (e) => {
    e.preventDefault();
};

const handleDrop = (e, row, col) => {
    e.preventDefault();
    const shipId = parseInt(e.dataTransfer.getData("shipId"), 10);
    const shipIndex = ships.findIndex((ship) => ship.id === shipId);

    if (shipIndex !== -1) {
        const updateShips = [...ships];
        updateShips[shipIndex] = {
            ...updateShips[shipIndex],
            isPlaced: true,
            position: { x: col, y: row },
        };
        setShips(updateShips);
    }
};

return (
    <div className="board-container">
        {title}
        <div
            className="grid"
            onDragOver={handleDragOver}>
            {Array.from({ length: 10 }).map((_, row) => (
                <div key={row} className="row">
                    {Array.from({ length: 10 }).map((_, col) => (
                        <div
                            key={`${row}-${col}`}
                            className="cell"
                            onDrop={(e) => handleDrop(e, row, col)}
                        >

                    {ships
                    .filter((ship) => ship.isPlaced)
                    .map((ship) => {
                        const shipCells = [];
                        for (let i = 0; i < ship.size; i++){
                            if(
                                (ship.orientation === "horizontal" && ship.position.x === col && ship.position.y === row - i) ||
                                (ship.orientation === "vertical" && ship.position.x === col - i && ship.position.y === row)
                            ){
                                shipCells.push(
                                <Ship
                                    key={ship.id}
                                    id={ship.id}
                                    size={ship.size}
                                    onDragStart={handleDragStart}
                                    style={{visibility: "hidden"}}
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
                {/* Barcos disponibles para arrastrar */}
                {ships
                .filter((ship) => !ship.isPlaced)
                .map((ship) => (
                    <Ship
                        key={ship.id}
                        id={ship.id}
                        size={ship.size}
                        onDragStart={handleDragStart}
                        className="ship"
                        draggable={!ship.isPlaced}
                    />
                ))}
            </div>
            <button onClick={handleRandomPlacement}>Posicionar aleatoriamente</button>
        </div>
        );
    }

