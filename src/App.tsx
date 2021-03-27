import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ImageSubTittle, { TypeSub } from "./cmponents/ImageSubTittle";
import {
  parseObjectToPSRT,
  parsePSRTFileToObject,
  parsePSRTToObject,
} from "./service/subtitle";
import EditSub from "./cmponents/EditSub";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [imageBlob, setImageBlob] = useState(
    localStorage.getItem("lastImage") || ""
  );
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});
  const [mouseImageClick, setMouseImageClick] = useState(false);
  const [textIndexselected, setTextIndexselected] = useState(0);
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [subs, setSubs] = useState<TypeSub>(
    localStorage.getItem("lastPSRT")
      ? parsePSRTToObject(localStorage.getItem("lastPSRT") || "")
      : parsePSRTFileToObject("assets/kaifuku_32.psrt")
  );
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("lastPage") || "page1"
  );

  const handleMouseClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.preventDefault();
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    setMouseImageClick(true);
    setMouseX(((e.clientX - e.target.offsetLeft) / e.target.offsetWidth) * 100);
    if (e.target.offsetTop >= e.clientY) {
      setMouseY(
        ((e.clientY - e.target.offsetTop) / e.target.clientHeight) * 100
      );
    }
  };

  const handleTextClick = (
    index: number | string,
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => {
    setTextIndexselected(index)

  };

  const [editStyles, setEditStyles] = useState({});
  useEffect(() => {
    localStorage.setItem("lastPage", currentPage);
    if (subs?.__image_link__?.[currentPage]) {
      setImageBlob(subs?.__image_link__?.[currentPage]);
    }
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem("lastImage", imageBlob);
  }, [imageBlob]);

  return (
    <div className="App container mb-6" style={{ display: "flex" }}>
      <EditSub
        sub={subs}
        setSub={setSubs}
        page={currentPage}
        setPage={setCurrentPage}
        setImage={setImageBlob}
        image={imageBlob}
        setImageStyle={setImageStyle}
        editStyles={editStyles}
        setEditStyles={setEditStyles}
        mouse={{ x: mouseX, y: mouseY }}
        setMouseImageClick={setMouseImageClick}
        mouseImageClick={mouseImageClick}
        textIndexselected={textIndexselected}
      />
      <div className="mb-5 mt-5 ml-5 pl-5 justify-content-end col">
        <ImageSubTittle
          editStyles={editStyles}
          style={{ width: "600px", border: "1px solid", ...imageStyle }}
          imgPath={imageBlob}
          page={currentPage}
          subtitle={subs}
          onClick={handleMouseClick}
          onTextClick={handleTextClick}
        />
        <ImageSubTittle
          style={{ width: "1000px", border: "1px solid", ...imageStyle }}
          editStyles={editStyles}
          imgPath={imageBlob}
          page={currentPage}
          subtitle={subs}
          onClick={handleMouseClick}
        />
      </div>
    </div>
  );
}

export default App;

const mock = {
  page1: [
    {
      x: 6.7,
      y: 8,
      width: 6,
      size: 2,
      text: "Nós vamos morrer!",
      style: {
        fontWeight: "bold",
        wordWrap: "break-word",
        msWrapFlow: "end",
      },
    },
    {
      x: 39,
      y: 5,
      width: 10,
      size: 3,
      text: "Basta vencer as duas",
      style: {
        fontWeight: "bold",
      },
    },
    {
      x: 55,
      y: 2,
      width: 11,
      size: 2,
      text: "Como vocês, humanos, ousam recusar a punição!",
      style: {
        fontWeight: "bold",
      },
    },
    {
      x: 8,
      y: 32,
      width: 11,
      size: 2,
      text: "Você parece estar se divertindo.",
      style: {
        //fontWeight: "bold",
      },
    },
    {
      x: 18.5,
      y: 31,
      width: 11,
      size: 2,
      text: "Jovem Mestre,",
      style: {
        //fontWeight: "bold",
      },
    },
    {
      x: 36.5,
      y: 32,
      width: 11,
      size: 2,
      text: "O que eu devo fazer sobre isso?!",
      style: {
        //fontWeight: "bold",
      },
    },
    {
      x: 10,
      y: 65,
      width: 7,
      size: 2,
      text: "Um econt... não era isso!",
      style: {
        //fontWeight: "bold",
      },
    },
    {
      x: 7,
      y: 74,
      width: 10,
      size: 2,
      text: "Espera, você viu? Quando você começou a vigiar?!",
      style: {
        // fontSize:'50px'
      },
    },
    {
      x: 51,
      y: 60,
      width: 10,
      size: 2.6,
      text: `"Algo", você diz?`,
      style: {
        // fontSize:'50px'
      },
    },
    {
      x: 51,
      y: 74,
      width: 10,
      size: 2,
      text: "Você teve um encontro com a Mio e agora está me pedindo ajuda?",
      style: {
        // fontSize:'50px'
      },
    },
    {
      x: 65,
      y: 60,
      width: 10,
      size: 2,
      text: "Você não pode fazer algo sobre isso?!",
      style: {
        // fontSize:'50px'
      },
    },
    {
      x: 83,
      y: 58,
      width: 10,
      size: 1.7,
      text: "Telepatia? Tomoe!",
      style: {
        // fontSize:'50px'
      },
    },
    {
      x: 83.5,
      y: 66.5,
      width: 9,
      size: 1.4,
      text: `Você sabe o que está acontecendo?!`,
      style: {
        // fontSize:'50px'
      },
    },
  ],
};
