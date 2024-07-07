import React, {useRef, useState} from "react";
import "./Ship.css"

const Ship = ({ id, size, onDragStart, draggable }) => {
    const [orientation, setOrientation] = useState("horizontal");
    const shipRef = useRef(null);

    const toggleOrientation = () => {
        setOrientation((prev) => (prev === "horizontal" ? "vertical" : "horizontal"));
      };

     

      return (
        <div
          ref={shipRef}
          className={`ship ${orientation}`}
          draggable={draggable}
          onDragStart={(e) => onDragStart(e, id)}
          onDoubleClick={toggleOrientation}
          
        >
          {Array.from({ length: size }).map((_, index) => (
            <div  key={index} className="ship-part"></div>
          ))}
        </div>
      );
    };
    
export default Ship;