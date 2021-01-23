export const parsePSRTToObject = (
  file: string
): {
  [page: string]: {
    x: number;
    y: number;
    index: number;
    width: number;
    size: number;
    text: string;
    style: React.CSSProperties;
  }[];
} => {
  let out: { [k: string]: any } = {};
  let currentPage = "";
  let rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = function () {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status == 0) {
        let allText = rawFile.responseText;
        let i = 0;
        let lastIndex = 0;
        allText.split("\n").map((line) => {
          if (line.includes("$START")) {
            currentPage = line.substring(6).trim();
            out[line.substring(6).trim()] = [];
          } else if (line.includes("$END")) {
            currentPage = "";
          } else if (line.includes(">>")) {
            const clearLine = line.substring(2);
            const [x, y, s, w] = clearLine.split(" ")[0].split("-");
            out[currentPage]?.push({
              index: clearLine.split(" ")[2]
                ? parseInt(clearLine.split(" ")[2])
                : lastIndex + i,
              x: parseFloat(x),
              y: parseFloat(y),
              size: parseFloat(s),
              width: parseFloat(w),
              style: JSON.parse(clearLine.split(" ")?.[1]),
            });
            lastIndex = clearLine.split(" ")[2]
              ? parseInt(clearLine.split(" ")[2])
              : lastIndex;

            i += 1;
          } else if (line.length > 1) {
            if (out[currentPage]?.length > 0) {
              out[currentPage][out[currentPage]?.length - 1].text = line;
            }
          }
        });
      }
    }
  };

  rawFile.send(null);
  console.log(out);

  return out;
};

export const parseObjectToPSRT = (sub: {
  [page: string]: {
    x: number;
    y: number;
    width: number;
    size: number;
    text: string;
    style: React.CSSProperties;
  }[];
}): string => {
  let out = "";

  Object.keys(sub).map((page) => {
    out += `$START ${page}`;
    sub[page].map(({ x, y, size, width, text, style }) => {
      out += `${x}-${y}-${size}-${width} ${JSON.stringify(style)}\n`;
      out += `${text}\n\n`;
    });
    out += `$END ${page}\n\n`;
  });
  return out;
};
