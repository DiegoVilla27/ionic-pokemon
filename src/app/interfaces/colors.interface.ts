export enum EColors {
  normal = "#A0A29F",
  fighting = "#D14461",
  flying = "#A2BCEA",
  poison = "#B667CD",
  ground = "#D87C52",
  rock = "#C9BB8D",
  bug = "#93BB3A",
  ghost = "#606FBA",
  steel = "#5995A2",
  fire = "#F9A555",
  water = "#579EDD",
  grass = "#63BC5D",
  electric = "#F1D85A",
  psychic = "#ED93E4",
  ice = "#79D0C1",
  dragon = "#176CC5",
  dark = "#595761",
  fairy = "#F88684"
}

type Hex = string;
export type Rgb = [r: number, g: number, b: number];
export type Color = Hex | Rgb | (Hex | Rgb)[];

export interface IMapColors {
  [key: string]: EColors;
}
