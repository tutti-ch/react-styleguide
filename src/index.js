/**
 * This file will get exported.
 */
export Image from "./components/Image";
export Spinner from "./components/Spinner";
export Table from "./components/Table";
export Button from "./components/Button";
export Pagination from "./components/Pagination";
export Form from "./components/Form";
export Logo from "./components/Logo";
import * as Icons from "./styles/Icons/assets";
import * as Illustrations from "./styles/Illustrations/assets";

export const icons = {
  ...Icons,
  ...Illustrations,
  categories: {
    "1000": Icons.Immobilien,
    "4020": Icons.Antiquitaten,
    "6200": Icons.Baby,
    "4200": Icons.Buecher,
    "6800": Icons.Buro,
    "5000": Icons.Computer,
    "2000": Icons.Fahrzeuge,
    "4120": Icons.Filme,
    "5600": Icons.Foto,
    "3200": Icons.Garten,
    "3000": Icons.Haushalt,
    "6600": Icons.Kleidung,
    "4300": Icons.Musik,
    "4160": Icons.Sammeln,
    "3400": Icons.Spielzeuge,
    "4000": Icons.Sport,
    "6400": Icons.Stellen,
    "5800": Icons.Telefon,
    "9080": Icons.Tickets,
    "8000": Icons.Tiere,
    "5400": Icons.Tv,
    "7020": Icons.Sonstiges
  },
  cantons: {
    "1": Icons.CantonAargau,
    "2": Icons.CantonAppenzell,
    "3": Icons.CantonBasel,
    "4": Icons.CantonBern,
    "5": Icons.CantonFreiburg,
    "6": Icons.CantonGenf,
    "7": Icons.CantonGlarus,
    "8": Icons.CantonGraubunden,
    "9": Icons.CantonJura,
    "10": Icons.CantonLuzern,
    "11": Icons.CantonNeuenburg,
    "12": Icons.CantonNiedobwalden,
    "13": Icons.CantonSchaffhausen,
    "14": Icons.CantonSchwyz,
    "15": Icons.CantonSolothurn,
    "16": Icons.CantonStgallen,
    "17": Icons.CantonThurgau,
    "18": Icons.CantonTessin,
    "19": Icons.CantonUri,
    "20": Icons.CantonWaadt,
    "21": Icons.CantonWallis,
    "22": Icons.CantonZug,
    "23": Icons.CantonZurich,
    "24": Icons.CantonLiechtenstein
  }
};
