import React, { useState } from "react";
import "./Board.css"
import Ship from "./Ship";

export const Board = ({ title }) => {
    //barcos en el tablero
    const [ships, setShips] = useState([
        { id: 1, size: 5, isPlaced: false, position: { x: 0, y: 0 } },
        { id: 2, size: 4, isPlaced: false, position: { x: 0, y: 0 } },
        { id: 3, size: 3, isPlaced: false, position: { x: 0, y: 0 } },
        { id: 4, size: 3, isPlaced: false, position: { x: 0, y: 0 } },
        { id: 5, size: 2, isPlaced: false, position: { x: 0, y: 0 } },
    ]);

    const handleDragStart = (e, shipId) => {
        //seleccionar el barco
        const updateShips = ships.map((ship) =>
            ship.id === shipId ? { ...ship, isPlaced: false } : ship
        );
        setShips(updateShips);

        //guardar la posicion
        const shipIndex = updateShips.findIndex((ship) => ship.id === shipId);
        if (shipIndex !== -1) {
            e.dataTransfer.setData("shipId", shipId.toString());
            e.dataTransfer.setDragImage(e.target, 0, 0);
        }
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





    // const { clientX, clientY } = e;
    //const offsetX = clientX - e.target.getBoundingClientRect().left;
    //const offsetY = clientY - e.target.getBoundingClientRect().top;
    //updateShips[shipIndex].position = { x: offsetX, y: offsetY };
    //setShips(updateShips);

    //funcion para arrastrar
    //e.dataTransfer.setDragImage(e.target, offsetX, offsetY);


const handleDragOver = (e) => {
    e.preventDefault();
};

const handleDrop = (e) => {
    e.preventDefault();
    const shipId = parseInt(e.dataTransfer.getData("shipId"), 10);
    const shipIndex = ships.findIndex((ship) => ship.id === shipId);

    if (shipIndex !== -1) {
        const { offsetX, offsetY } = e.nativeEvent;
        const cellSize = 40; //tamaño de la cell en px
        const row = Math.floor(offsetY / cellSize);
        const col = Math.floor(offsetX / cellSize);

        const updateShips = [...ships];
        updateShips[shipIndex] = {
            ...updateShips[shipIndex],
            isPlaced: true,
            position: { x: col, y: row },
        };
        setShips(updateShips);
    }
};

//matriz 10x10 para el tablero
//const board = Array(10).fill(null).map(() => Array(10).fill(null));

return (
    <div className="board">
        {title}
        <div
            className="grid"
            onDragOver={handleDragOver}
            onDrop={handleDrop} >
            {Array.from({ length: 100 }).map((_, index) => (
                <div key={index} className="cell">

                    {ships.filter((ship) => ship.isPlaced)
                    .map((ship) => (
                        <Ship
                            key={ship.id}
                            id={ship.id}
                            size={ship.size}
                            onDragStart={handleDragStart}
                            style={{
                                visibility: "hidden"
                            }}
                        />
                    ))}
                </div>
            ))}
        </div>
            <div className="ships-container">
               
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

