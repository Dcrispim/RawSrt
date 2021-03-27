/* eslint-disable react/jsx-no-undef */
import React, { useEffect, useState } from "react";
import Slider from "react-input-slider";

import {
  Form,
  Button,
  DropdownButton,
  Dropdown,
  Row,
  Col,
  InputGroup,
  FormControl,
} from "react-bootstrap";
import {
  parseObjectToPSRT,
  parsePSRTFileToObject,
  parsePSRTToObject,
} from "../service/subtitle";
import { ImageStyle, TypeSub } from "./ImageSubTittle";

const BG_SELECT_COLOR = "#0f0";
//import DragScaleBar from 'react-drag-scale-bar'
// import { Container } from './styles';
type TypeUseState<T> = (a: T | ((a: T) => T)) => void;

const EditSub: React.FC<{
  sub: TypeSub;
  setSub: TypeUseState<TypeSub>;
  page?: string;
  setPage: TypeUseState<string>;
  setImage: TypeUseState<string>;
  image?: string;
  setImageStyle: TypeUseState<React.CSSProperties | string>;
  setEditStyles: TypeUseState<ImageStyle>;
  mouseImageClick?: boolean;
  setMouseImageClick?: React.Dispatch<React.SetStateAction<boolean>>;
  mouse?: { x: number; y: number };
}> = ({
  sub,
  setSub,
  page: defaultPage,
  setPage: setDefaultPage,
  setImage,
  image,
  setImageStyle,
  setEditStyles,
  mouseImageClick,
  setMouseImageClick,
  mouse,
}) => {
  const [page, setPage] = useState(defaultPage || "page1");
  const [isNewPage, setIsNewPage] = useState(false);
  const [index, setIndex] = useState<string | number>(1);
  const [x, setX] = useState<string | number>(0);
  const [y, setY] = useState<string | number>(0);
  const [width, setWidth] = useState<string | number>(0);
  const [size, setSize] = useState<string | number>(0);
  const [subText, setSubText] = useState("");
  const [show, setShow] = useState(true);
  const [style, setStyle] = useState<{ [cssAttr: string]: string }>({});
  const [keyStyle, setKeyStyle] = useState<string>("");
  const [valueStyle, setValueStyle] = useState<string>("");
  const [dowloadFileName, setDowloadFileName] = useState("sub");
  const [maxTextSize, setMaxTextSize] = useState(100);
  const [isEditingPage, setIsEditingPage] = useState(false);
  const [isEditingIndex, setIsEditingIndex] = useState(false);

  const [lastIndex, setLastIndex] = useState(
    sub[`${page}`]?.reduce((p, c) => (c.index > p ? c.index : p), 0) + 1
  );

  const handleChangeSub = () => {
    setEditStyles({
      [page]: {
        [index]: {
          border: "3px solid " + BG_SELECT_COLOR,
        },
      },
    });
    if (Object.keys(sub).includes(page)) {
      try {
        setSub((data) => ({
          ...data,
          [page]: [
            ...data[page]?.map((txt) => {
              if (txt.index === parseInt(String(index))) {
                return {
                  ...txt,
                  x: parseFloat(x),
                  y: parseFloat(y),
                  width: parseFloat(width),
                  size: parseFloat(size),
                  text: subText,
                  style: {
                    ...style,
                  },
                };
              } else {
                return txt;
              }
            }),
          ],
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    //console.log(sub);
    handleChangeSub();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [x, y, width, size, subText, style, defaultPage]);

  const updateSubInfos = (newSub?: TypeSub) => {
    const _sub = newSub || sub;
    if (page) {
      const text = _sub[page]?.find((a) => a.index === parseInt(String(index)));
      setX((oldX) => text?.x || oldX);
      setY((oldY) => text?.y || oldY);
      setWidth((oldW) => text?.width || oldW);
      setSize((oldS) => text?.size || oldS);
      setSubText(text?.text || "");
      setStyle((old) => (text?.style ? { ...text?.style } : { ...old }));
    }
  };

  const updateImageLink = (pg: string, link: string) => {
    setSub((dt) => ({
      ...dt,
      __image_link__: {
        ...dt?.__image_link__,
        [pg]: link,
      },
    }));
  };
  const addNewText = () => {
    setSub((data) => ({
      ...data,
      [page]: [
        ...data[page],
        {
          index: parseInt(String(lastIndex)),
          x: parseFloat(String(x)),
          y: parseFloat(String(y)),
          width: parseFloat(String(width)),
          size: parseFloat(String(size)),
          text: subText,
          style: {
            ...style,
            backgroundColor: BG_SELECT_COLOR,
          },
        },
      ],
    }));

    setIndex(lastIndex);
    setLastIndex((old) => old + 1);
  };

  const addNewPage = () => {
    if (isNewPage) {
      setSub({
        ...sub,
        [page]: [
          {
            index: parseInt(String(0)),
            x: parseFloat(String(x)),
            y: parseFloat(String(y)),
            width: parseFloat(String(width)),
            size: parseFloat(String(size)),
            text: subText,
            style: {
              ...style,
              backgroundColor: BG_SELECT_COLOR,
            },
          },
        ],
      });
      updateSubInfos(sub);

      setIndex(0);
      setLastIndex(1);
      setDefaultPage(page);
      updateSubInfos();
      setIsEditingPage(false);
    }
  };

  const updateSubtitleFile = (fr: FileReader) => {
    localStorage.setItem("lastPSRT", String(fr.result));
    const newSub: TypeSub = parsePSRTToObject(String(fr.result));
    setSub(newSub);
    setLastIndex(
      newSub[page]?.reduce((p, { index }) => (index > p ? index : p), 0) + 1
    );
    updateSubInfos(newSub);
  };
  const showImage = (fr: FileReader) => {
    localStorage.setItem("lastImage", String(fr.result));
    setImage(String(fr.result));
  };

  const handleAddStyle = () => {
    setStyle((old) => ({ ...old, [keyStyle]: valueStyle }));
    setValueStyle("");
    setKeyStyle("");
  };

  const handleRemoveStyle = (key: string) => {
    setValueStyle(style[key]);
    setKeyStyle(key);
    const newStyles = { ...style };

    delete newStyles[key];

    setStyle(newStyles);
  };

  const handleClearAll = () => {
    const newSub = {
      page1: [],
    };

    setSub(newSub);
    setPage("page1");
    setIndex(0);
    setLastIndex(0);
  };

  useEffect(() => {
    updateSubInfos();
  }, [index, page]);

  useEffect(() => {
    setIsNewPage(!Object.keys(sub).includes(page));
    Object.keys(sub).includes(page) && setDefaultPage(page);
    setLastIndex(
      sub[page]?.reduce((p, { index }) => (index > p ? index : p), 0) + 1
    );
  }, [page]);

  useEffect(() => {
    if (mouseImageClick) {
      setX((prevX) => (mouse?.x !== undefined ? mouse?.x : prevX));
      setY((prevY) => (mouse?.y !== undefined ? mouse?.y : prevY));
      setMouseImageClick && setMouseImageClick(false);
    }
  }, [mouseImageClick, mouse, setMouseImageClick]);



  // useEffect(() => {
  //   const config = JSON.parse(localStorage.getItem("configs") || "{}");
  //   if (config?.maxTextSize) {
  //     setMaxTextSize(config.maxTextSize);
  //   }
  // }, []);

  return (
    <Form
      style={{
        position: "fixed",
        width: "500px",
        left: 0,
        overflowY: "auto",
        overflowX: "hidden",
        zIndex: 50,
      }}
    >
      <div className={`form-check form-switch mr-0`}>
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
        <div className="col-12">
          <Row className="mb-2">
            <Form.Group className=" col-4 mb-0" controlId="subtitle-file">
              <Form.Label className="btn btn-primary">Load Image</Form.Label>
              <Form.Control
                readOnly
                onChange={getLocalImage(showImage)}
                type="file"
                style={{ visibility: "hidden", height: "0px" }}
                placeholder="Image"
              />
            </Form.Group>

            <Form.Group className=" col-4 mb-0" controlId="image-file">
              <Form.Label className="btn btn-primary">Load SubTitle</Form.Label>
              <Form.Control
                readOnly
                onChange={getLocalSubtitle(updateSubtitleFile)}
                type="file"
                style={{ visibility: "hidden", height: "0px" }}
                placeholder="Image"
              />
            </Form.Group>

            <Button
              className=" col-2"
              onClick={handleClearAll}
              variant="danger"
            >
              Clear All
            </Button>
            <InputSettings
              className="mt-2 col-12"
              value={image?.includes("base64") ? "File" : image}
              placeholder="Image Link"
              onChange={(d: string) => {
                setImage((data) => {
                  if (d === "File") {
                    return data;
                  } else {
                    updateImageLink(page, d);
                    return d;
                  }
                });
              }}
            />
          </Row>

          <Row className="col-12" style={{ alignItems: "flex-end" }}>
            <Form.Group className=" col-3 mb-0" controlId="formPage">
              <Form.Label>Page</Form.Label>
              {isEditingPage ? (
                <Form.Control
                  value={page}
                  onChange={(e) => setPage(e.target.value)}
                  placeholder="Page"
                />
              ) : (
                <Select
                  options={Object.keys(sub)
                    .filter((subProp) => subProp.slice(0, 2) !== "__")
                    .map((subProp) => {
                      return {
                        id: subProp,
                        name: subProp.replaceAll("_", " "),
                      };
                    })}
                  title="Pages"
                  onChange={(e) => setPage(e.target.value)}
                />
              )}
            </Form.Group>
            <Col className="col-3">
              {isEditingPage && (
                <Button
                  className="col-12 mb-1"
                  onClick={() => setIsEditingPage(false)}
                  variant="danger"
                >
                  cancel
                </Button>
              )}

              <Button
                className="col-12"
                onClick={(e) =>
                  isEditingPage ? addNewPage() : setIsEditingPage(true)
                }
                variant={"success"}
              >
                {isEditingPage ? (
                  "confirm"
                ) : (
                  <b className="fs-1 m-0 p-0">{"\u002B"}</b>
                )}
              </Button>
            </Col>

            <Form.Group className=" col-3 mb-0" controlId="formPage">
              <Form.Label>Index</Form.Label>
              {isEditingIndex ? (
                <Form.Control
                  value={page}
                  onChange={(e) => setIndex(e.target.value)}
                  placeholder="Index"
                />
              ) : (
                <Select
                  options={
                    sub[String(page)]?.map((subProp, i) => {
                      return {
                        id: i,
                        name: i,
                      };
                    }) || []
                  }
                  title="Indexes"
                  onChange={(e) => setIndex(e.target.value)}
                />
              )}
            </Form.Group>
            <Col className="col-3">
              {isEditingIndex && (
                <Button
                  className="col-12 mb-1 mr-0"
                  onClick={() => setIsEditingIndex(false)}
                  variant="danger"
                >
                  cancel
                </Button>
              )}
              <Button
                className="col-12"
                onClick={(e) =>
                  isEditingIndex ? addNewPage() : setIsEditingIndex(true)
                }
                variant={"success"}
              >
                {isEditingIndex ? (
                  "confirm"
                ) : (
                  <b className="fs-1 m-0 p-0">{"\u002B"}</b>
                )}
              </Button>
            </Col>
          </Row>
          <Row className=" col-12 p-0 mt-5 mb-5 ml-2 mr-2">
            <Col className=" col-2 p-0 m-0">
              <Form.Group className=" col-12 p-0 m-0" controlId="formX">
                <Form.Label>X axis</Form.Label>
                <Form.Control
                  value={x}
                  onChange={(e) => setX(e.target.value)}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="X"
                />
              </Form.Group>

              <Form.Group className=" col-12 p-0 m-0" controlId="formY">
                <Form.Label>Y axis</Form.Label>
                <Form.Control
                  value={y}
                  onChange={(e) => setY(e.target.value)}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="Y"
                />
              </Form.Group>
            </Col>
            <Col className=" col-8 p-0 m-0">
              <Row className=" col-12 justify-content-center m-0">
                <Col className=" col-1 justify-content-center m-0 pt-3">
                  <Slider
                    axis="y"
                    y={y || 0}
                    xstep={0.1}
                    onChange={({ y }) => setY(y.toPrecision(2))}
                  />
                </Col>

                <Col className=" col-8 p-0 mr-1 ml-2">
                  <Slider
                    className=" mb-2"
                    axis="x"
                    xstep={0.1}
                    x={x || 0}
                    onChange={({ x }) => setX(x.toPrecision(2))}
                  />
                  <textarea
                    value={subText}
                    onChange={(e) => setSubText(e.target.value)}
                    className=" col-12"
                    style={{ height: "80%" }}
                  ></textarea>
                  <Slider
                    axis="x"
                    xstep={0.1}
                    x={width || 0}
                    onChange={({ x }) => setWidth(x.toPrecision(2))}
                  />
                </Col>
                <Col className=" col-1 m-0 pt-3">
                  <Slider
                    axis="y"
                    ystep={0.1}
                    ymax={maxTextSize}
                    y={size || 0}
                    onChange={({ y }) => setSize(y.toPrecision(2))}
                  />
                </Col>
              </Row>
            </Col>
            <Col className=" col-2 p-0 m-0">
              <Form.Group className="col-12 p-0 m-0" controlId="formY">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="size"
                />
              </Form.Group>
              <Form.Group className=" col-12 p-0 m-0" controlId="formWidth">
                <Form.Label>Width</Form.Label>
                <Form.Control
                  value={width}
                  onChange={(e) => setWidth(e.target.value)}
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="width"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Form.Label className="col-3 mb-4 ml-4">Max Text Size</Form.Label>
            <Form.Control
              className="col-2 mb-4 "
              value={maxTextSize}
              onChange={(e) => {
                setMaxTextSize(e.target.value)
                const config = JSON.parse(localStorage.getItem("configs") || "{}");
                localStorage.setItem(
                  "configs",
                  JSON.stringify({ ...config, maxTextSize })
                );
              }}
              type="number"
              min="0"
              max="100"
              step="0.1"
              placeholder="Max Text Size"
            />

            {Object.keys(style).length > 0 && (
              <DropdownButton
                className="col-4 mb-4"
                variant="secondary"
                id="dropdown-basic-button"
                title="Styles"
              >
                {Object.keys(style).length > 0 &&
                  Object.keys(style)?.map((styleProp) => (
                    <Dropdown.Item
                      onClick={() => handleRemoveStyle(styleProp)}
                      key={styleProp}
                    >
                      {`${styleProp.replaceAll("_", " ")} : ${
                        style[styleProp]
                      }`}
                    </Dropdown.Item>
                  ))}
              </DropdownButton>
            )}
          </Row>
          <Row>
            <Form.Group className=" col-4" controlId="formKeyStyle">
              <Form.Control
                value={keyStyle}
                onChange={(e) => setKeyStyle(e.target.value)}
                type="text"
                placeholder="key"
              />
            </Form.Group>
            <Form.Group className=" col-4" controlId="formValueStyle">
              <Form.Control
                value={valueStyle}
                onChange={(e) => setValueStyle(e.target.value)}
                type="text"
                placeholder="value"
              />
            </Form.Group>

            <Button
              style={{ height: "100%" }}
              className="p-2 col-4 btn-secondary"
              onClick={handleAddStyle}
            >
              Add Style
            </Button>
          </Row>

          <Row>
            <Form.Group className=" col-6" controlId="formDownload">
              <Form.Label>Download Subtitle</Form.Label>
              <Form.Control
                value={dowloadFileName}
                onChange={(e) => setDowloadFileName(e.target.value)}
                placeholder="Download Subtitle"
              />
            </Form.Group>
            <Col className=" col-6">
              <Button
                className=" col-12 mb-2"
                disabled={!dowloadFileName}
                onClick={() =>
                  download(
                    parseObjectToPSRT(sub),
                    `${dowloadFileName}.psrt`,
                    "*.psrt"
                  )
                }
                variant="primary"
              >
                (.psrt)
              </Button>
              <Button
                className=" col-12"
                disabled={!dowloadFileName}
                onClick={() =>
                  download(
                    JSON.stringify(sub),
                    `${dowloadFileName}.json`,
                    "*.json"
                  )
                }
                variant="primary"
              >
                (.json)
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </Form>
  );
};

const InputSettings = ({
  placeholder,
  value,
  onChange,
  className = "",
  ...otherProps
}) => {
  return (
    <InputGroup className={"mb-3 " + className}>
      <FormControl
        placeholder={placeholder}
        aria-label={placeholder}
        aria-describedby="basic-addon1"
        onChange={(evt) => onChange(evt.target.value)}
        value={value}
        {...otherProps}
      />
    </InputGroup>
  );
};

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

const getLocalImage = (callback: (fr: FileReader) => any) => (evt) => {
  let tgt = evt.target;
  let files = tgt.files;

  // FileReader support
  if (FileReader && files && files.length) {
    let fr = new FileReader();
    fr.onload = () => callback(fr);
    fr.readAsDataURL(files[0]);
  }
};

const getLocalSubtitle = (callback: (fr: FileReader) => any) => (evt) => {
  let tgt = evt.target;
  let files = tgt.files;

  // FileReader support
  if (FileReader && files && files.length) {
    let fr = new FileReader();
    fr.onload = () => callback(fr);
    fr.readAsText(files[0]);
  }
};

const Select = ({
  options,
  title,
  onChange,
}: {
  options: { id: string | number; name: string }[];
  title: string;
  onChange?: React.ChangeEventHandler;
}) => {
  return (
    <Form.Control
      onChange={onChange}
      as="select"
      className="mr-sm-2"
      id="inlineFormCustomSelect"
      custom
    >
      <option value="none">{title || "Choose..."}</option>
      {options.map((option) => {
        return <option value={option.id}>{option.name}</option>;
      })}
    </Form.Control>
  );
};

export default EditSub;
