import React, {useRef, useState} from "react";
import "./Ship.css"

const Ship = ({ id, size, onDragStart }) => {
    const [isDragging, setIsDragging] = useState(false);
    const shipRef = useRef(null);

    const handleDragStart = (e) => {
        setIsDragging(true);
        onDragStart(e, id);
    };

    const handleDragEnd = () => {
        setIsDragging(false);
    };

    return (
        <div 
        ref={shipRef}
        className={`ship ship-${size} ${isDragging ? "dragging" : ""}`}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        >
            {Array(size).fill(null).map((_, index) => (
                <div key={index} className="ship__part"></div>
            ))}
        </div>
    )
}

export default Ship;