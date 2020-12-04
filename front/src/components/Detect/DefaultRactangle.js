import React from 'react';
import { Rect } from 'react-konva';

const DefaultRectangle = ({ shapeProps }) => {
  const shapeRef = React.useRef();

  return (
    <React.Fragment>
      <Rect
        ref={shapeRef}
        // {...shapeProps}
        x={shapeProps.x*2}
        y={shapeProps.y*2}
        width={shapeProps.width*2}
        height={shapeProps.height*2}
        stroke={shapeProps.type === 0 ? "red" : "blue"}
      />
    </React.Fragment>
  );
};

export default DefaultRectangle;