import React, { useEffect, useMemo, useRef, useState } from "react";
import { parsePSRTFileToObject } from "../service/subtitle";

// import { Container } from './styles';

const ImageSubTittle: React.FC<{
  imgPath: string;
  subtitle: {
    [page: string]: {
      x: number;
      y: number;
      width: number;
      size: number;
      text: string;
      index: number;
      style: React.CSSProperties;
    }[];
  };
  page: string;

  style?: React.CSSProperties;
  [prop: string]: any;
}> = ({ imgPath, subtitle, page, ...props }) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [subY, setSubY] = useState<any>(0);
  const [subX, setSubX] = useState<any>(0);
  const [subH, setSubH] = useState<any>(0);
  const [subW, setSubW] = useState<any>(0);
  const updateSubs = () => {
    setSubY(imgRef.current?.offsetTop);
    setSubX(imgRef.current?.offsetLeft);
    setSubH(imgRef.current?.offsetHeight);
    setSubW(imgRef.current?.offsetWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", updateSubs);
    return () => {
      window.removeEventListener("resize", updateSubs);
    };
  }, []);

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
        {subtitle[page]
          ?.sort((a, b) => a.index - b.index)
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
        ref={imgRef}
        src={imgPath}
        alt={page}
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
  id,
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
