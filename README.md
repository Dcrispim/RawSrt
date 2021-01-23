# Getting Started

This is a project to make row subtitles easier. This consists of 2 different parts

- Image
- Subtitle File

## Subtitle File

In the code, the subtitles has a JSON format, but to read external files a pattern has been created: `PSRT`
All measurement values ​​are percentages referring to the original image

### JSON format:

```typescript

        {
            [page: string]: {

                x: number; // min: 0 max: 100 => Percentege of image width
                y: number; // min: 0 max: 100 => Percentege of image height
                index: number; // index number order of text on page
                width: number; // min: 0 max: 100 => Percentege of image width
                size: number; // min: 0 max: 100 => Percentege of image width
                text: string;
                style: React.CSSProperties; //js Object

            }[]
        }

```

#### Exemple:
```json
{
  "page1": [
    {
      "x": 6.7,
      "y": 8,
      "width": 6,
      "size": 2,
      "text": "Nós vamos morrer!",
      "style": {
        "fontWeight": "bold",
        "wordWrap": "break-word",
        "msWrapFlow": "end"
      }
    },
    {
      "x": 39,
      "y": 5,
      "width": 10,
      "size": 3,
      "text": "Basta vencer as duas",
      "style": {
        "fontWeight": "bold"
      }
    },
    {
      "x": 55,
      "y": 2,
      "width": 11,
      "size": 2,
      "text": "Como vocês, humanos, ousam recusar a punição!",
      "style": {
        "fontWeight": "bold"
      }
    },
    {
      "x": 8,
      "y": 32,
      "width": 11,
      "size": 2,
      "text": "Você parece estar se divertindo.",
      "style": {
        //fontWeight: "bold",
      }
    },
    {
      "x": 18.5,
      "y": 31,
      "width": 11,
      "size": 2,
      "text": "Jovem Mestre,",
      "style": {
        //fontWeight: "bold",
      }
    },
    {
      "x": 36.5,
      "y": 32,
      "width": 11,
      "size": 2,
      "text": "O que eu devo fazer sobre isso?!",
      "style": {
        //fontWeight: "bold",
      }
    },
    {
      "x": 10,
      "y": 65,
      "width": 7,
      "size": 2,
      "text": "Um econt... não era isso!",
      "style": {
        //fontWeight: "bold",
      }
    },
    {
      "x": 7,
      "y": 74,
      "width": 10,
      "size": 2,
      "text": "Espera, você viu? Quando você começou a vigiar?!",
      "style": {}
    },
    {
      "x": 51,
      "y": 60,
      "width": 10,
      "size": 2.6,
      "text": "\"Algo\", você diz?",
      "style": {}
    },
    {
      "x": 51,
      "y": 74,
      "width": 10,
      "size": 2,
      "text": "Você teve um encontro com a Mio e agora está me pedindo ajuda?",
      "style": {}
    },
    {
      "x": 65,
      "y": 60,
      "width": 10,
      "size": 2,
      "text": "Você não pode fazer algo sobre isso?!",
      "style": {}
    },
    {
      "x": 83,
      "y": 58,
      "width": 10,
      "size": 1.7,
      "text": "Telepatia? Tomoe!",
      "style": {}
    },
    {
      "x": 83.5,
      "y": 66.5,
      "width": 9,
      "size": 1.4,
      "text": "Você sabe o que está acontecendo?!",
      "style": {}
    }
  ]
}


```
### PSRT Pattern:
```
$START <page name>
>>X-Y-S-W {Css Style} index
text 1!

>>X-Y-S-W {Css Style} index
text 2!

$END <name page> 

```

If the index are not defined, they are automatically defined by the application.

```
$START page1
>>55-2-2-11 {"fontWeight":"bold"} 1
Como vocês, humanos, ousam recusar a punição!

>>39-5-3-10 {"fontWeight":"bold"} 2
Basta vencer as duas

>>6.7-8-2-7 {"fontWeight":"bold","wordWrap":"break-word","msWrapFlow":"end"} 3
Nós vamos mor- rer!

>>8-32-2-11 {} 6
Você parece estar se divertindo.

>>18.5-31-2-11 {} 5
Jovem Mestre,

>>36.5-32-2-11 {} 4
O que eu devo fazer sobre isso?!

>>10-65-2-7 {} 12
Um econt... não era isso!

>>7-74-2-10 {} 13
Espera, você viu? Quando você começou a vigiar?!

>>51-60-2.6-10 {} 10
"Algo", você diz?

>>51-74-2-10 {} 11
Você teve um encontro com a Mio e agora está me pedindo ajuda?

>>65-60-2-10 {} 9
Você não pode fazer algo sobre isso?!

>>83-58-1.7-10 {} 7
Telepatia? Tomoe!

>>83.5-66.5-1.4-9 {} 8
Você sabe o que está acontecendo?!

$END page1
```