# Getting Started

This is a project to make Raw subtitles easier. It consists of 2 different parts

- Image
- Subtitle File

## Image

`<ImageSubtitled>` has the props:

- imgPath: string;
- subtitle: TypeSub
- page: string;
- editStyles?: ImageStyle;
- style?: React.CSSProperties;

```typescript
type ImageStyle = {
  [page: string]: {
    [id: number]: React.CSSProperties;
  };
};

type TypeSub = {
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
```

### Example

```typescript
<ImageSubTittle
  editStyles={editStyles}// just to help on subtitle creation don't added on final file
  imgPath={imagePath}
  page={currentPage}
  subtitle={subs}
/>;

const currentPage = 'page1'
const imagePath="https://images.mangafreak.net/mangas/kaifuku_jutsushi_no_yarinaoshi/kaifuku_jutsushi_no_yarinaoshi_32/kaifuku_jutsushi_no_yarinaoshi_32_1.jpg"

const subs = {
  page1: [
    {
      index: 0,
      x: 13.5,
      y: 77.5,
      size: 2.8,
      width: 9.1,
      style: { backgroundColor: "#0f04" },
      text: "AHHHH HHHH!",
    },
  ],
  __global_style__: { backgroundColor: "#fff", lineHeight: "120%" },
  __image_link__: {
    page1:
      "https://images.mangafreak.net/mangas/kaifuku_jutsushi_no_yarinaoshi/kaifuku_jutsushi_no_yarinaoshi_32/kaifuku_jutsushi_no_yarinaoshi_32_1.jpg",
    page2:
      "https://images.mangafreak.net/mangas/kaifuku_jutsushi_no_yarinaoshi/kaifuku_jutsushi_no_yarinaoshi_32/kaifuku_jutsushi_no_yarinaoshi_32_2.jpg",
  },
  page2: [
    {
      index: 0,
      x: 79.8,
      y: 5.2,
      size: 2,
      width: 11.4,
      style: { borderRadius: "5%" },
      text: "Estou cansada onii-sama... Podemos descansar um pouco",
    },
    {
      index: 1,
      x: 64.9,
      y: 7.3,
      size: 1.7,
      width: 8.7,
      style: {},
      text: "HAAAH... isso é mais dificil do que eu pensei",
    },
    {
      index: 2,
      x: 50.5,
      y: 23.5,
      size: 2.1,
      width: 9.8,
      style: { backgroundColor: "#0f04", fontWeight: "bold" },
      text: "Ellen, Freia, vocês são muito lerdas!",
    },
    {
      index: 3,
      x: 69,
      y: 80.9,
      size: 2.4,
      width: 11.8,
      style: { backgroundColor: "#0f04" },
      text: "Aguentem só mais um pouco pessoal!",
    },
    {
      index: 4,
      x: 48,
      y: 62.4,
      size: 2.4,
      width: 9.1,
      style: { backgroundColor: "#0f04" },
      text: "OKAAY!",
    },
  ],
};
```

## Subtitle File

In the code, the subtitles has a JSON format, but to read external files a pattern has been created: `PSRT`
All measurement values ​​are percentages referring to the original image

The file has:

- Name page
- Global styles(optional): this styles will be applyed on all Texts
- Image Link(optional): If are setted the **src** of tag `<img>` will be replaced
- Text Infos:
  - X position: most be in percentage of Image source
  - Y position: most be in percentage of Image source
  - Font Size: most be in percentage of Image source
  - Width Box: most be in percentage of Image source
  - Style: `{"backgroundColor":"#fff"}`
  - Index: to order the texts
  - Text:

### JSON format:

```typescript
  {
      __global_style__?: React.CSSProperties;
      __image_link__?: {
        [page: string]: string;
      };
      [page: string]: {
          x: number; // min: 0 max: 100 => Percentege of image width
          y: number; // min: 0 max: 100 => Percentege of image height
          index: number; // index number order of text on page
          width: number; // min: 0 max: 100 => Percentege of image width
          size: number; // min: 0 max: 100 => Percentege of image width
          text: string;
          style: React.CSSProperties; //js Object
      }[];
  };
```

#### Exemple:

```json
{
  "page1": [
    {
      "index": 0,
      "x": 13.5,
      "y": 77.5,
      "size": 2.8,
      "width": 9.1,
      "style": { "backgroundColor": "#0f04" },
      "text": "AHHHH HHHH!"
    }
  ],
  "__global_style__": { "backgroundColor": "#fff", "lineHeight": "120%" },
  "__image_link__": {
    "page1": "https://images.mangafreak.net/mangas/kaifuku_jutsushi_no_yarinaoshi/kaifuku_jutsushi_no_yarinaoshi_32/kaifuku_jutsushi_no_yarinaoshi_32_1.jpg",
    "page2": "https://images.mangafreak.net/mangas/kaifuku_jutsushi_no_yarinaoshi/kaifuku_jutsushi_no_yarinaoshi_32/kaifuku_jutsushi_no_yarinaoshi_32_2.jpg"
  },
  "page2": [
    {
      "index": 0,
      "x": 79.8,
      "y": 5.2,
      "size": 2,
      "width": 11.4,
      "style": { "borderRadius": "5%" },
      "text": "Estou cansada onii-sama... Podemos descansar um pouco"
    },
    {
      "index": 1,
      "x": 64.9,
      "y": 7.3,
      "size": 1.7,
      "width": 8.7,
      "style": {},
      "text": "HAAAH... isso é mais dificil do que eu pensei"
    },
    {
      "index": 2,
      "x": 50.5,
      "y": 23.5,
      "size": 2.1,
      "width": 9.8,
      "style": { "backgroundColor": "#0f04", "fontWeight": "bold" },
      "text": "Ellen, Freia, vocês são muito lerdas!"
    },
    {
      "index": 3,
      "x": 69,
      "y": 80.9,
      "size": 2.4,
      "width": 11.8,
      "style": { "backgroundColor": "#0f04" },
      "text": "Aguentem só mais um pouco pessoal!"
    },
    {
      "index": 4,
      "x": 48,
      "y": 62.4,
      "size": 2.4,
      "width": 9.1,
      "style": { "backgroundColor": "#0f04" },
      "text": "OKAAY!"
    }
  ]
}
```

### PSRT Pattern:

**$START** `<name_page>` | `<global styles>` | `<link image>`

\>> `x_pos` - `y_pos` - `font_size` - `box_width` | `styles` | `index`
text speak

**$END** `<name_page>`

<hr>

`<global_styles>` and `<link image>` are optional
obs: without spaces between **|** and **-**

#### Example

```
$START page1|{"backgroundColor":"#fff","lineHeight":"120%"}|https://images.mangafreak.net/mangas/kaifuku_jutsushi_no_yarinaoshi/kaifuku_jutsushi_no_yarinaoshi_32/kaifuku_jutsushi_no_yarinaoshi_32_1.jpg
>>13.5-77.5-2.8-9.1|{"backgroundColor":"#0f04"}|0
AHHHH HHHH!

$END page1

$START page2|{"backgroundColor":"#fff","lineHeight":"120%"}|https://images.mangafreak.net/mangas/kaifuku_jutsushi_no_yarinaoshi/kaifuku_jutsushi_no_yarinaoshi_32/kaifuku_jutsushi_no_yarinaoshi_32_2.jpg
>>79.8-5.2-2-11.4|{"borderRadius":"5%"}|0
Estou cansada onii-sama... Podemos descansar um pouco

>>64.9-7.3-1.7-8.7|{}|1
HAAAH... isso é mais dificil do que eu pensei

>>50.5-23.5-2.1-9.8|{"backgroundColor":"#0f04","fontWeight":"bold"}|2
Ellen, Freia, vocês são muito lerdas!

>>69-80.9-2.4-11.8|{"backgroundColor":"#0f04"}|3
Aguentem só mais um pouco pessoal!

>>48-62.4-2.4-9.1|{"backgroundColor":"#0f04"}|4
OKAAY!

$END page2

```
