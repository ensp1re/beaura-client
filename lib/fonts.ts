import { Concert_One, Raleway, Urbanist, Inter } from "next/font/google";

const concertOne = Concert_One({
  weight: ["400"],
  subsets: ["latin"],
});

const inter = Inter({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const urbanist = Urbanist({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const raleway = Raleway({
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

class Fonts {
  static concertOne = concertOne;
  static raleway = raleway;
  static urbanist = urbanist;
  static inter = inter;

  static getConcertOne() {
    return this.concertOne.className;
  }

  static getInter() {
    return this.inter.className;
  }

  static getUrbanist() {
    return this.urbanist.className;
  }

  static getRaleway() {
    return this.raleway.className;
  }
}

export default Fonts;
