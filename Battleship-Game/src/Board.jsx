import React from "react";
import UserBoard from "./UserBoard";
import ComputerBoard from "./ComputerBoard";
import "./Board.css";

export const Board = ( title, isUserBoard, userShips, setUserShips, handleCellClick) => {
    const handleDrop = (e, row, col) => {
        e.preventDefault();
    }
    const handleDragOver = (e) => {
        e.preventDefault();
    }
    const handleDragStart = (e, shipId) => {
        e.dataTransfer.setData("shipId", shipId.toString());
        e.dataTransfer.setDragImage(e.target, 0, 0);
    }
    const handleCellClickInternal = (row, col) => {
        if (isUserBoard) {
            handleCellClick(row, col);
        }
    }
    return (
    <div className="boards-container">
      <UserBoard />
      <ComputerBoard />
    </div>
  );
};


