import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import ImageSubTittle from "./cmponents/ImageSubTittle";
import { parseObjectToPSRT, parsePSRTToObject } from "./service/subtitle";
import EditSub from "./cmponents/EditSub";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const subs = parsePSRTToObject(
    "assets/-fasc-nio-asi-tico-tsuki-ga-michibiku-isekai-douchuu-vol06-cap39-pag02.psrt"
  );

  useEffect(() => {}, []);

  return (
    <div className="App" style={{ display: "flex" }}>
      <EditSub />
      <div>
        <ImageSubTittle
          imgPath="assets/-fasc-nio-asi-tico-tsuki-ga-michibiku-isekai-douchuu-vol06-cap39-pag02.jpg"
          subtitle={subs.page1}
        />
        <ImageSubTittle
          style={{ width: "1300px" }}
          imgPath="assets/-fasc-nio-asi-tico-tsuki-ga-michibiku-isekai-douchuu-vol06-cap39-pag02.jpg"
          subtitle={subs.page1}
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
