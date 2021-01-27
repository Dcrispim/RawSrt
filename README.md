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
$START page1
>>55.16-4.64-1.94-10.08/{"fontWeight":"bold"}/1
Como vocês, humanos, ousam recusar a punição!

>>39-5-3-10/{"fontWeight":"bold"}/2
Basta vencer as duas

>>6.7-8-2-7/{"fontWeight":"bold","wordWrap":"break-word","msWrapFlow":"end"}/3
Nós vamos mor- rer!

>>37.53-32.75-1.71-9.62/{"fontWeight":"bold","wordWrap":"break-word","msWrapFlow":"end"}/4
O que eu devo fazer sobre isso?!

>>19.68-32.05-1.69-8/{}/5
Jovem Mestre,

>>8.11-33.28-2-11/{}/6
Você parece estar se divertindo.

>>83.44-58.17-1.7-8.77/{}/7
Telepatia? Tomoe!

>>83.71-68.26-1.4-9/{}/8
Você sabe o que está acontecendo?!

>>65-61.31-1.9-9.69/{}/9
Você não pode fazer algo sobre isso?!

>>52.24-61.84-2.21-8.07/{}/10
"Algo", você diz?

>>51.93-73.04-1.91-10/{}/11
Você teve um encontro com a Mio e agora está me pedindo ajuda?

>>10-65.89-1.88-7.19/{}/12
Um econt... não era isso!

>>7.62-74.27-1.83-9.65/{}/13
Espera, você viu? Quando você começou a vigiar?!


>>55.5-30.7-2.2-14.9/{"textShadow":"2px 0 0 #fff, -2px 0 0 #fff, 0 2px 0 #fff, 0 -2px 0 #fff, 1px 1px #fff, -1px -1px 0 #fff, 1px -1px 0 #fff, -1px 1px 0 #fff","fontWeight":"bold"}/14
Random Text

$END page1
```