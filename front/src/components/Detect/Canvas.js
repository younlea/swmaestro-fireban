import React, { useRef } from "react";
import { Stage, Layer } from "react-konva";
import { useDispatch } from "react-redux";
import { addDetectInfo, changeDetectInfo, deleteDetectInfo, updateDetectInfo } from "../../store/modules/detect";
import Rectangle from "./Rectangle";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styled from "styled-components";
// import Button from "../CustomButtons/Button.js";

const CustomButton = styled.button`
    border-radius: 4px;
    border: none;
    color: white;
    outline: none;
    cursor: pointer;
    background-color: #a1a6ad;
    font-weight: 700;
    font-size: 0.8rem;
    width: 110px;
    height: 40px;
    color: #ffffff;

    & + & {
      margin-left: 1rem;
    }
`;

const Canvas = ({ initialState, targetKey }) => {
  
  const dispatch=useDispatch()
  
  const newTarget = useRef(0);

  // const [rectangles, setRectangles] = React.useState(initialState);
  const [selectedId, selectShape] = React.useState(null);

  const checkDeselect = (e) => {
    // deselect when clicked on empty area
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };


  // onChange={(newAttrs) => {
  //               const rects = initialState.slice();
  //               rects[i] = newAttrs;
  //               // setRectangles(rects);
  //             }}

  const onChange = (newAttrs) => {
    dispatch(changeDetectInfo(newAttrs))
  }
  const onDelete = (e) => {
    e.preventDefault();
    console.log(e.target);
    // console.log(e.target.dataset.index);
    console.log(e.target.dataset.index);
    dispatch(deleteDetectInfo(Number(e.target.dataset.index)))
  }

  const onAdd = (e) => {
    e.preventDefault();
    dispatch(addDetectInfo(newTarget.current));
    newTarget.current+=1;
  }

  const onUpdate = (e) => {
    console.log(targetKey)
    dispatch(updateDetectInfo({target: initialState, targetKey:Number(targetKey)}))
    window.location.reload();
  }


  return (
    <>
      <Stage width={640} height={500} onMouseDown={checkDeselect}
      onTouchStart={checkDeselect}>
        <Layer style={{ position: "absolute" }}>
          {initialState.map((rect, i) => {
          return (
            <Rectangle
              key={i}
              shapeProps={rect}
              isSelected={rect.id === selectedId}
              onSelect={() => {
                selectShape(rect.id);
              }}
              onChange={onChange}
            />
          );
        })}
        </Layer>
      </Stage>

      <TableContainer component={Paper}>
      <Table className={makeStyles.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">구분</TableCell>
            <TableCell align="center">X좌료</TableCell>
            <TableCell align="center">Y좌표</TableCell>
            <TableCell align="center">넓이</TableCell>
            <TableCell align="center">높이</TableCell>
            <TableCell align="center">분류</TableCell>
            <TableCell align="center">제거</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialState.map((row, i) => (
            <TableRow key={row.id}>
              <TableCell align="center">
                {i+1}
              </TableCell>
              <TableCell align="center">{row.x}</TableCell>
              <TableCell align="center">{row.y}</TableCell>
              <TableCell align="center">{row.width}</TableCell>
              <TableCell align="center">{row.height}</TableCell>
              <TableCell align="center">{row.type === 0 ? "사람" : "화재"}</TableCell>
              <TableCell data-index={row.id} align="center"><CustomButton data-index={row.id} onClick={onDelete}>삭제</CustomButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <div style={{marginTop: "0.5rem", width: "100%", textAlign: "right"}}>
    <CustomButton onClick={onAdd}>추가</CustomButton>
    <CustomButton onClick={onUpdate}>저장</CustomButton>
    </div>
    </>
  );
};

export default Canvas;
