export interface Message {
  catch: string;
  body: string[];
  tagline: string;
}

export const messages: Message[] = [
  {
    catch: "退屈に慣れるな",
    body: [
      "古い仕組みに縛られても、何も変わらない。",
      "現場も、自分自身も、もっと面白くできるはずだ。"
    ],
    tagline: "BREAK FREE"
  },
  {
    catch: "正解なんて、まだない",
    body: [
      "DXも業務改善も、答えはひとつじゃない。",
      "試し、間違え、やり直す。そこから進化は生まれる。"
    ],
    tagline: "KEEP TRYING"
  },
  {
    catch: "技術は、楽しむ、ためにある",
    body: [
      "ただ効率化するだけじゃ足りない。",
      "楽しさがあるから、人も組織も進化を続けられる。"
    ],
    tagline: "ENJOY TECH"
  },
  {
    catch: "世界を面白くするのは、あなた自身だ",
    body: [
      "会社でも、現場でも、未来を変えるのは結局ひとりの行動。",
      "その一歩が、周りを動かし、世界を変える。"
    ],
    tagline: "BE THE CHANGE"
  },
  {
    catch: "ENJOY YOUR WORLD",
    body: [
      "楽しむ世界は、与えられるものじゃない。",
      "自分でつくり、自分で変える。",
      "その挑戦を、私たちは支え続ける。"
    ],
    tagline: "JOYZO"
  }
];
