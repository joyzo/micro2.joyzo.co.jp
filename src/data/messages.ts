export interface Message {
  catch: string;
  body: string[];
  tagline: string;
  image?: string;
  imageAlt?: string;
}

export const messages: Message[] = [
  {
    catch: "変わることを楽しもう。",
    body: [
      "同じ毎日を繰り返すだけじゃなく、",
      "新しい工夫や挑戦を取り入れていく。",
      "その変化を楽しめることが、次の一歩を生む。"
    ],
    tagline: "ENJOY CHANGE",
    image: "/src/images/top/team-collaboration.jpg",
    imageAlt: "チームで協力して働く様子"
  },
  {
    catch: "進みながら見つけていこう。",
    body: [
      "正解はひとつじゃない。",
      "試行錯誤の先にこそ、本当に役立つ答えがある。"
    ],
    tagline: "FIND THE WAY",
    image: "/src/images/top/business-meeting.jpg",
    imageAlt: "打ち合わせの様子"
  },
  {
    catch: "便利だけじゃ、つまらない。",
    body: [
      "システムは効率化のためだけにあるんじゃない。",
      "そこにワクワクがあるからこそ、人も現場も前に進める。"
    ],
    tagline: "FIND EXCITEMENT",
    image: "/src/images/top/team-laughing.jpg",
    imageAlt: "チームで談笑している様子"
  },
  {
    catch: "楽しむ人から、世界は変わる。",
    body: [
      "小さな一歩でも、楽しんで取り組めば、",
      "それがやがて大きな変化をつくり出す。"
    ],
    tagline: "BE THE CHANGE",
    image: "/src/images/top/learning-session.jpg",
    imageAlt: "学習セッションの様子"
  },
  {
    catch: "ENJOY YOUR WORLD",
    body: [
      "楽しむ世界は、与えられるものじゃない。",
      "自分でつくり、自分で変える。",
      "その挑戦を、私たちは支え続ける。"
    ],
    tagline: "JOYZO",
    image: "/src/images/top/company-culture.jpg",
    imageAlt: "会社の文化を表す写真"
  }
];
