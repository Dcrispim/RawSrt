# Getting Started

This is a project to make row subtitles easier. This consists of 2 different parts
 * Image
 * Subtitle File



## Subtitle File
In the code, the subtitles has a JSON format, but to read external files a pattern has been created: `PSRT`

### JSON format:
    ``ja
     {
  [page: string]: {
    x: number;
    y: number;
    index: number;
    width: number;
    size: number;
    text: string;
    style: React.CSSProperties;
  }[]
    ``

