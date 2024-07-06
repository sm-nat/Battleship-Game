import React from "react";
import "./Board.css"

export const Board = ({ title }) => {

    //matriz 10x10 para el tablero
    const board = Array(10).fill(null).map(() => Array(10).fill(null));
    return (
        <div className="board">
            <h1>{title}</h1>
            <div className="grid">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((cell, cellIndex) => (
                            <div key={cellIndex} className="cell">
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>

    )
}