import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import ImageSubTittle from "./cmponents/ImageSubTittle";
import {
  parseObjectToPSRT,
  parsePSRTFileToObject,
  parsePSRTToObject,
} from "./service/subtitle";
import EditSub from "./cmponents/EditSub";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [imageBlob, setImageBlob] = useState(
    localStorage.getItem("lastImage") ||
      "assets/-fasc-nio-asi-tico-tsuki-ga-michibiku-isekai-douchuu-vol06-cap39-pag02.jpg"
  );
  const [imageStyle, setImageStyle] = useState<React.CSSProperties>({});
  const [subs, setSubs] = useState(
    localStorage.getItem("lastPSRT")
      ? parsePSRTToObject(localStorage.getItem("lastPSRT") || "")
      : parsePSRTFileToObject(
          "assets/-fasc-nio-asi-tico-tsuki-ga-michibiku-isekai-douchuu-vol06-cap39-pag02_.psrt"
        )
  );
  const [currentPage, setCurrentPage] = useState(
    localStorage.getItem("lastPage") || "page1"
  );

  const [editStyles, setEditStyles] = useState({});

  useEffect(() => {
    localStorage.setItem("lastPage", currentPage);
  }, [currentPage]);

  console.log(editStyles);
  

  return (
    <div className="App container" style={{ display: "flex" }}>
      <EditSub
        sub={subs}
        setSub={setSubs}
        page={currentPage}
        setPage={setCurrentPage}
        setImage={setImageBlob}
        setImageStyle={setImageStyle}
        setEditStyles={setEditStyles}
      />
      <div>
        <ImageSubTittle
          editStyles={editStyles}
          imgPath={imageBlob}
          page={currentPage}
          subtitle={subs}
        />
        <ImageSubTittle
          style={{ width: "1300px", ...imageStyle }}
          editStyles={editStyles}
          imgPath={imageBlob}
          page={currentPage}
          subtitle={subs}
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
