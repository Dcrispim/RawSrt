import React, { useEffect, useMemo, useRef, useState } from "react";
import { parsePSRTToObject } from "../service/subtitle";

// import { Container } from './styles';

const ImageSubTittle: React.FC<{
  imgPath: string;
  subtitle: {
    x: number;
    y: number;
    width: number;
    size: number;
    text: string;
    index: number;
    style: React.CSSProperties;
  }[];

  style?: React.CSSProperties;
  [prop: string]: any;
}> = ({ imgPath, subtitle, ...props }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [subY, setSubY] = useState<any>(0);
  const [subX, setSubX] = useState<any>(0);
  const [subH, setSubH] = useState<any>(0);
  const [subW, setSubW] = useState<any>(0);
  const updateSubs = () => {
    setSubY(imgRef.current?.y);
    setSubX(imgRef.current?.x);
    setSubH(imgRef.current?.clientHeight);
    setSubW(imgRef.current?.clientWidth);
  };

  return (
    <div>
      <div
        style={{
          position: "absolute",
          zIndex: 11,
          top: subY,
          left: subX,
          width: subW,
          height: subH,
        }}
      >
        {subtitle
          .sort((a, b) => a.index - b.index)
          .map(({ text, x, y, width, size, style, index }) => (
            <SubTitle
              key={index}
              id={index}
              text={text}
              x={x}
              y={y}
              width={width}
              size={(size * subW) / 100}
              style={style}
            />
          ))}
      </div>
      <img
        onLoad={updateSubs}
        onTimeUpdate={updateSubs}
        ref={imgRef}
        src={imgPath}
        alt="pag1"
        {...props}
      />
    </div>
  );
};

const SubTitle = ({
  text,
  x,
  y,
  width,
  size,
  style,
  id
}: {
  text: string;
  x: number;
  y: number;
  width?: number;
  [k: string]: any;
}) => {
  return (
    <p
    id={`${id}`}
      style={{
        position: "absolute",
        top: `${y}%`,
        left: `${x}%`,
        width: `${width}%`,
        fontSize: `${size}px`,
        ...style,
      }}
    >
      {text}
    </p>
  );
};

export default ImageSubTittle;
