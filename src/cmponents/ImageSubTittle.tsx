import React, { useEffect, useMemo, useRef, useState } from "react";
import { parsePSRTFileToObject } from "../service/subtitle";

// import { Container } from './styles';

export type ImageStyle = {
  [page: string]: {
    [id: number]: React.CSSProperties;
  };
};

export type TypeSub = {
  __global_style__?: React.CSSProperties;
  __image_link__?: {
    [page: string]: string;
  };
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

const ImageSubTittle: React.FC<{
  imgPath: string;
  subtitle: TypeSub;
  page: string;
  editStyles?: ImageStyle;
  style?: React.CSSProperties;
  onClick?: (e: React.MouseEvent<HTMLImageElement, MouseEvent>) => void;
  onTextClick?: (
    index: number | string,
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>
  ) => void;
  [prop: string]: any;
}> = ({
  imgPath,
  subtitle,
  page,
  editStyles,
  onClick,
  onTextClick,
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [subY, setSubY] = useState<any>(0);
  const [subX, setSubX] = useState<any>(0);
  const [subH, setSubH] = useState<any>(0);
  const [subW, setSubW] = useState<any>(0);
  const [mouseDown, setMouseDown] = useState(false);
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
        onMouseDown={(e) => {
          setMouseDown(true);
        }}
        onMouseUp={() => {
          setMouseDown(false);
        }}
        onMouseLeave={(e) => {
          setMouseDown(false);
        }}
        onMouseMove={(e) => {
          if (mouseDown) {
            // console.log({
            //   posY: subH - e.pageY,
            //   subH,
            //   posX: e.pageX - e.target.offsetLeft,
            //   subW,
            //   imgTop: imgRef.current?.offsetTop,
            //   imgY: imgRef.current?.cle,
            //   clientY: e.target.clientY,
            //   subY
            // });
          }
        }}
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
              onClick={(e) => onTextClick?.(index, e)}
              globalStyle={subtitle.__global_style__}
              editStyles={editStyles?.[page]?.[index]}
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
        src={imgPath || subtitle?.__image_link__?.[page]}
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
  globalStyle,
  editStyles,
  onClick,
}: {
  text: string;
  x: number;
  y: number;
  width?: number;
  globalStyle?: React.CSSProperties;
  editStyles?: React.CSSProperties;
  onClick?: React.MouseEventHandler<HTMLParagraphElement> | undefined;
  [k: string]: any;
}) => {
  return (
    <p
      onClick={onClick}
      id={`${id}`}
      style={{
        position: "absolute",
        top: `${y}%`,
        left: `${x}%`,
        width: `${width}%`,
        fontSize: `${size}px`,
        ...style,
        ...globalStyle,
        ...editStyles,
      }}
    >
      {text}
    </p>
  );
};

export default ImageSubTittle;
