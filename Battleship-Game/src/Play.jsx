import React from "react";

{/* Boton para comenzar a jugar */}
export const Play = ({startPlay}) => {
    return (
        <main>
            <button onClick={startPlay}>Jugar</button>
        </main>
    );
};