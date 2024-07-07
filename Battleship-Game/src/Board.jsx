import React from "react";
import UserBoard from "./UserBoard";
import ComputerBoard from "./ComputerBoard";
import "./Board.css";

export const Board = () => {
  return (
    <div className="boards-container">
      <UserBoard />
      <ComputerBoard />
    </div>
  );
};


