import React, { useRef, useState } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import { ButtonGroup, ToggleButton, Alert } from "react-bootstrap";
import {
  HiOutlineChevronDoubleLeft,
  HiOutlineChevronDoubleRight,
} from "react-icons/hi";

import useGlobal from "../AppState";

const styles = {
  border: "0.0625rem solid #6412CF",
  borderRadius: "0.25rem",
  width: "800px",
  height: "800px"
};

const Canvas = () => {
  const [store, update] = useGlobal();
  const [imgExt, setImgExt] = useState("png");
  const sketch = useRef();
  const radios = [
    { name: "png", value: "png" },
    { name: "jpeg", value: "jpeg" },
  ];
  
  return (
    <div className="text-center">
      <div>{store.send}</div>
      {store.send && <Alert variant="info">Success Send Image</Alert>}
      {store.imgResult && <h3 variant="info">Result is {store.result}</h3>}
      <ReactSketchCanvas
        ref={sketch}
        strokeWidth={60}
        strokeColor="white"
        style={styles}
        canvasColor="black"
        with="800px"
        height="800px"
        eraserWidth="8"
      />

      <div className="text-info mt-2">
        <label>
          <h4>Image Formate -- </h4>
        </label>
        <ButtonGroup>
          {radios.map((radio, idx) => (
            <ToggleButton
              key={idx}
              id={`radio-${idx}`}
              type="radio"
              variant={
                imgExt === radio.value ? "outline-success" : "outline-danger"
              }
              name="radio"
              value={radio.value}
              checked={imgExt === radio.value}
              onChange={(e) => {
                setImgExt(e.currentTarget.value);
              }}
            >
              {radio.name}
            </ToggleButton>
          ))}
        </ButtonGroup>
      </div>

      <div className="mt-3">
        <button
          className="btn btn-success m-2"
          onClick={() => {
            sketch.current.undo();
          }}
        >
          <HiOutlineChevronDoubleLeft />
        </button>

        <button
          className="btn btn-warning"
          onClick={() => {
            sketch.current.resetCanvas();
            store.setState({
              send: false,
            })
          }}
        >
          ReSet
        </button>

        <button
          className="btn btn-success m-2"
          onClick={() => {
            sketch.current.redo();
          }}
        >
          <HiOutlineChevronDoubleRight />
        </button>
      </div>
      <div>
        <button
          className="btn btn-primary form-control w-25"
          onClick={() => {
            sketch.current
              .exportImage(imgExt)
              .then((data) => {
                console.log("data", data);
                const fd = new FormData();
                fd.append("image", data);
                update.SEND_IMAGE(fd);
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          Send Image
        </button>
      </div>
    </div>
  );
};

export default Canvas;
