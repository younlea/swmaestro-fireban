import React from "react";
import { Stage, Layer } from "react-konva";

import DefaultRectangle from "./DefaultRactangle";
// import Button from "../CustomButtons/Button.js";



const DefaultCanvas = ({ initialState }) => {
  return (
    <>
      <Stage width={640} height={500} >
        <Layer style={{ position: "absolute" }}>
          {initialState.map((rect, i) => {
          return (
            <DefaultRectangle
              key={i}
              shapeProps={rect}
            />
          );
        })}
        </Layer>
      </Stage>

    
    </>
  );
};

export default DefaultCanvas;
