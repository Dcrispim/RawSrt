/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { parseObjectToPSRT } from "../service/subtitle";

//import DragScaleBar from 'react-drag-scale-bar'
// import { Container } from './styles';
type TypeSub = {
  [page: string]: {
    x: number;
    y: number;
    index: number;
    width: number;
    size: number;
    text: string;
    style: React.CSSProperties;
  }[];
};
const EditSub: React.FC<{
  sub: TypeSub;
  setSub: (a: TypeSub | ((a: TypeSub) => TypeSub)) => void;
  page?: string;
}> = ({ sub, setSub, page }) => {
  const [index, setIndex] = useState<string | number>(1);
  const [x, setX] = useState<string | number>(0);
  const [y, setY] = useState<string | number>(0);
  const [width, setWidth] = useState<string | number>(0);
  const [size, setSize] = useState<string | number>(0);
  const [subText, setSubText] = useState("");
  const [show, setShow] = useState(true);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleChangeSub = () => {
    if (page) {
      setSub((data) => ({
        ...data,
        [page]: [
          ...sub[page]?.map((txt) => {
            if (txt.index === parseInt(index)) {
              return {
                ...txt,
                x: parseFloat(x),
                y: parseFloat(y),
                width: parseFloat(width),
                size: parseFloat(size),
                text: subText,
                style: {
                  ...txt?.style,
                  ...style,
                  backgroundColor: "#0f0",
                },
              };
            } else {
              if (txt.style.backgroundColor === "#0f0") {
                delete txt.style.backgroundColor;
              }
              return txt;
            }
          }),
        ],
      }));
    }
  };

  useEffect(() => {
    handleChangeSub();
  }, [x, y, width, size, subText, style]);

  const handleChangeSelected = () => {
    if (page) {
      setSub((data) => ({
        ...data,
        [page]: [
          ...sub[page]?.map((txt) => {
            if (txt.index === parseInt(index)) {
              console.log("é");

              return {
                ...txt,
                style: {
                  ...txt?.style,
                  ...style,
                  backgroundColor: "#0F0",
                },
              };
            } else {
              return txt;
            }
          }),
        ],
      }));
    }
  };

  useEffect(() => {
    if (page) {
      const text = sub[page]?.find((a) => a.index === parseInt(index));
      setX(text?.x || x);
      setY(text?.y || y);
      setWidth(text?.width || width);
      setSize(text?.size || size);
      setSubText(text?.text || subText);
      setStyle({ ...text?.style } || { ...style });
      handleChangeSelected();
    }
  }, [index]);

  function download(data, filename, type) {
    var file = new Blob([data], { type: type });
    if (window.navigator.msSaveOrOpenBlob)
      // IE10+
      window.navigator.msSaveOrOpenBlob(file, filename);
    else {
      // Others
      var a = document.createElement("a"),
        url = URL.createObjectURL(file);
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(function () {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    }
  }

  const formatSub = (sub: TypeSub): TypeSub => {
    if (page) {
      sub[page].map((txt) => {
        if (txt.style.backgroundColor === "#0f0") {
          delete txt.style.backgroundColor;
        }
        return txt;
      });
    }
    return sub;
  };

  return (
    <Form style={{ position: "fixed", left: 0 }}>
      <div className={`form-check form-switch ${!show ? "ml-5" : ""}`}>
        <input
          className="form-check-input"
          type="checkbox"
          onClick={() => setShow((a) => !a)}
          id="flexSwitchCheckChecked"
          checked={show}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
          Settings
        </label>
      </div>
      {show && (
        <div>
          <Form.Group controlId="formIndex">
            <Form.Label>Index</Form.Label>
            <Form.Control
              value={index}
              onChange={(e) => setIndex(e.target.value)}
              type="number"
              min="0"
              step="1"
              placeholder="index"
            />
          </Form.Group>

          <Form.Group controlId="formX">
            <Form.Label>X axis</Form.Label>
            <Form.Control
              value={x}
              onChange={(e) => setX(e.target.value)}
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="X"
            />
          </Form.Group>

          <Form.Group controlId="formY">
            <Form.Label>Y axis</Form.Label>
            <Form.Control
              value={y}
              onChange={(e) => setY(e.target.value)}
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="Y"
            />
          </Form.Group>
          <Form.Group controlId="formY">
            <Form.Label>Size</Form.Label>
            <Form.Control
              value={size}
              onChange={(e) => setSize(e.target.value)}
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="size"
            />
          </Form.Group>
          <Form.Group controlId="formWidth">
            <Form.Label>Width</Form.Label>
            <Form.Control
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              type="number"
              min="0"
              max="100"
              step="0.01"
              placeholder="width"
            />
          </Form.Group>

          <Form.Group controlId="formText">
            <Form.Label>Text</Form.Label>
            <Form.Control
              value={subText}
              onChange={(e) => setSubText(e.target.value)}
              type="text"
              placeholder="width"
            />
          </Form.Group>
          <div>
            <Button
              onClick={() =>
                download(parseObjectToPSRT(formatSub(sub)), "sub.psrt", "jpg")
              }
              variant="primary"
            >
              Dowload Subtitle (.psrt)
            </Button>
            <Button
              onClick={() =>
                download(JSON.stringify(formatSub(sub)), "sub.json", "jpg")
              }
              variant="primary"
            >
              Dowload Subtitle (.json)
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};

export default EditSub;
