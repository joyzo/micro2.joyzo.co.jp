"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Mail, Phone, MapPin, X } from "lucide-react"

export default function JoyzoHomepage() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedSections, setAnimatedSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({})

  const [openingPhase, setOpeningPhase] = useState(0) // 0: 導入, 1: 移行, 2: 演出, 3: 完了
  const [showOpening, setShowOpening] = useState(true)
  const [currentPairIndex, setCurrentPairIndex] = useState(0)
  const [leftWord, setLeftWord] = useState("ENJOY")
  const [rightWord, setRightWord] = useState("")
  const [centerSymbol, setCenterSymbol] = useState("?")
  const [isLeftChanging, setIsLeftChanging] = useState(false)
  const [isRightChanging, setIsRightChanging] = useState(false)

  const keywordPairs = [
    { left: "ENJOY", right: "IT" },
    { left: "WORK", right: "STYLE" },
    { left: "DX", right: "未来" },
    { left: "AI", right: "日常" },
    { left: "TEAM", right: "共創" },
    { left: "TRUST", right: "つながり" },
    { left: "CREATE", right: "VALUE" },
    { left: "PLAY", right: "CHALLENGE" },
  ]

  useEffect(() => {
    const openingSequence = async () => {
      // ①導入: ENJOY? を1.5秒表示
      setTimeout(() => {
        setOpeningPhase(1) // 移行フェーズ開始
        setTimeout(() => {
          setCenterSymbol("×")
          setRightWord("IT")
        }, 300)
      }, 1500)

      // ②演出開始: 2.5秒後から左右交互に入れ替え
      setTimeout(() => {
        setOpeningPhase(2)
        let pairIndex = 0
        let isLeftTurn = false // 左から開始

        const interval = setInterval(() => {
          if (isLeftTurn) {
            setIsLeftChanging(true)
            setTimeout(() => {
              pairIndex = (pairIndex + 1) % keywordPairs.length
              setLeftWord(keywordPairs[pairIndex].left)
              setCurrentPairIndex(pairIndex)
              setTimeout(() => setIsLeftChanging(false), 200)
            }, 100)
          } else {
            setIsRightChanging(true)
            setTimeout(() => {
              setRightWord(keywordPairs[pairIndex].right)
              setTimeout(() => setIsRightChanging(false), 200)
            }, 100)
          }

          isLeftTurn = !isLeftTurn

          if (pairIndex === keywordPairs.length - 1 && isLeftTurn) {
            setTimeout(() => {
              setOpeningPhase(3) // 最終演出フェーズ
              setLeftWord("ENJOY")
              setRightWord("YOUR")
              setTimeout(() => {
                clearInterval(interval)
                setShowOpening(false)
                setIsVisible(true)
              }, 1200) // 3行時間差表示のための時間延長
            }, 500)
          }
        }, 600) // スピードアップ
      }, 2500)
    }

    openingSequence()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute("data-section")
            if (sectionId) {
              setAnimatedSections((prev) => new Set([...prev, sectionId]))
            }
          }
        })
      },
      { threshold: 0.2, rootMargin: "-50px" },
    )

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  const setSectionRef = (id: string) => (el: HTMLElement | null) => {
    sectionRefs.current[id] = el
  }

  if (showOpening) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="relative w-full max-w-4xl h-32 flex items-center justify-center">
          <div className="absolute left-0 flex justify-end items-center overflow-hidden" style={{ width: "40%" }}>
            <div
              className={`text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-black text-foreground tracking-tighter transition-all duration-300 ease-linear ${
                isLeftChanging ? "animate-slot-roll-vertical" : ""
              } ${openingPhase === 3 ? "animate-slide-to-hero-left" : ""}`}
              key={`left-${leftWord}-${currentPairIndex}`}
            >
              {leftWord}
            </div>
          </div>

          {/* 中央のシンボル */}
          <div
            className={`absolute left-1/2 transform -translate-x-1/2 text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-black text-primary transition-all duration-500 ease-linear ${
              openingPhase === 3 ? "animate-fade-out" : ""
            }`}
          >
            {centerSymbol === "?" ? (
              "?"
            ) : (
              <X className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12" strokeWidth={3} />
            )}
          </div>

          <div className="absolute right-0 flex justify-start items-center overflow-hidden" style={{ width: "40%" }}>
            <div
              className={`text-[2.5rem] sm:text-[3rem] md:text-[4rem] lg:text-[5rem] font-black text-primary tracking-tighter transition-all duration-300 ease-linear ${
                rightWord ? "opacity-100" : "opacity-0"
              } ${isRightChanging ? "animate-slot-roll-vertical" : ""} ${openingPhase === 3 ? "animate-slide-to-hero-right" : ""}`}
              key={`right-${rightWord}-${currentPairIndex}`}
            >
              {rightWord}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/95 backdrop-blur-sm border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="text-2xl font-bold text-foreground tracking-tight">JOYZO</div>
            <div className="hidden md:flex space-x-8">
              {["VISION/世界観", "会社概要", "パートナーシップ", "採用情報", "お問い合わせ"].map((item, index) => (
                <a
                  key={index}
                  href={`#${["about", "company", "partnership", "careers", "contact"][index]}`}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <section className="min-h-screen flex items-center px-6 lg:px-8 pt-16">
        <div className="max-w-6xl mx-auto w-full">
          <div className={`transition-all duration-800 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <h1
              className={`text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[14rem] font-black text-foreground leading-[0.8] tracking-tighter mb-4 transition-all duration-600 ${isVisible ? "opacity-100 translate-x-0 animate-hero-slide-stagger-1" : "opacity-0 -translate-x-full"}`}
            >
              ENJOY
            </h1>
            <h1
              className={`text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[14rem] font-black leading-[0.8] tracking-tighter mb-4 transition-all duration-600 ${isVisible ? "opacity-100 translate-x-0 animate-hero-slide-stagger-2" : "opacity-0 translate-x-full"}`}
            >
              <span className="text-foreground">YOUR</span>
            </h1>
            <h1
              className={`text-[6rem] md:text-[8rem] lg:text-[12rem] xl:text-[14rem] font-black text-primary leading-[0.8] tracking-tighter mb-12 transition-all duration-600 ${isVisible ? "opacity-100 translate-x-0 animate-hero-slide-stagger-3" : "opacity-0 -translate-x-full"}`}
            >
              WORLD.
            </h1>
            <div
              className={`max-w-3xl mb-12 transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0 animate-wave-slide-in animate-delay-800" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-medium">
                革新的なテクノロジーと創造性で新しい価値を生み出し続ける
              </p>
            </div>
            <div
              className={`transition-all duration-600 ${isVisible ? "opacity-100 translate-y-0 animate-scale-in animate-delay-1000" : "opacity-0 translate-y-8"}`}
            >
              <Button
                size="lg"
                className="px-8 py-4 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                EXPLORE
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-32 border-t border-border" ref={setSectionRef("about")} data-section="about">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <h2
                className={`text-6xl md:text-8xl font-black text-foreground mb-8 leading-tight tracking-tighter transition-all duration-600 animate-slide-in-left`}
              >
                VISION/世界観
              </h2>
              <p
                className={`text-lg text-muted-foreground mb-12 leading-relaxed transition-all duration-600 animate-wave-slide-in animate-delay-200`}
              >
                私たちは単なる企業ではない。夢を現実に変える創造者の集団です。
              </p>
              <div className="space-y-8">
                <div
                  className={`border-l-2 border-primary pl-6 transition-all duration-600 animate-slide-in-left animate-delay-400`}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">MISSION</h3>
                  <p className="text-muted-foreground">革新的なソリューションで社会に価値を提供する</p>
                </div>
                <div
                  className={`border-l-2 border-primary pl-6 transition-all duration-600 animate-slide-in-left animate-delay-600`}
                >
                  <h3 className="text-xl font-bold text-foreground mb-2">VISION</h3>
                  <p className="text-muted-foreground">テクノロジーで人々の生活をより豊かにする</p>
                </div>
              </div>
            </div>
            <div className="lg:pl-16">
              <div
                className={`aspect-square bg-muted transition-all duration-600 animate-slide-in-right animate-delay-300`}
              ></div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="company"
        className="py-32 border-t border-border"
        ref={setSectionRef("company")}
        data-section="company"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2
              className={`text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter transition-all duration-600 animate-scale-in`}
            >
              COMPANY
            </h2>
            <p
              className={`text-lg text-muted-foreground max-w-2xl transition-all duration-600 animate-wave-slide-in animate-delay-200`}
            >
              2020年に設立されたJOYZOは、急速に成長を続ける革新的な企業です。
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: "設立年", value: "2020" },
              { label: "従業員数", value: "150+" },
              { label: "拠点数", value: "3" },
              { label: "顧客満足度", value: "98%" },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center py-8 border border-border minimal-hover transition-all duration-600 animate-wave-slide-in`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-black text-foreground mb-2">{item.value}</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wide">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="partnership"
        className="py-32 border-t border-border"
        ref={setSectionRef("partnership")}
        data-section="partnership"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2
              className={`text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter transition-all duration-600 animate-slide-in-right`}
            >
              PARTNERSHIP
            </h2>
            <p
              className={`text-lg text-muted-foreground max-w-2xl transition-all duration-600 animate-wave-slide-in animate-delay-200`}
            >
              私たちは単なるビジネスパートナーではなく、共に成長し、共に楽しむ仲間です。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "COLLABORATION",
                description: "お客様との長期的な関係を築き、共に成長していくことを大切にしています。",
              },
              {
                title: "COMMUNITY",
                description: "業界を超えたコミュニティを形成し、知識と経験を共有しています。",
              },
              {
                title: "INNOVATION",
                description: "テクノロジーの力で社会課題の解決に取り組んでいます。",
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`py-8 border-b border-border minimal-hover transition-all duration-600 animate-slide-in-left`}
                style={{ animationDelay: `${400 + index * 150}ms` }}
              >
                <h3 className="text-xl font-bold text-foreground mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="careers"
        className="py-32 border-t border-border"
        ref={setSectionRef("careers")}
        data-section="careers"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2
              className={`text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter transition-all duration-600 animate-scale-in`}
            >
              CAREERS
            </h2>
            <p
              className={`text-lg text-muted-foreground max-w-2xl mx-auto transition-all duration-600 animate-wave-slide-in animate-delay-200`}
            >
              一緒に未来を創造する仲間を募集しています。あなたの才能を活かせる場所がここにあります。
            </p>
          </div>
          <div
            className={`text-center border border-border p-16 transition-all duration-600 animate-wave-slide-in animate-delay-400`}
          >
            <h3 className="text-3xl font-bold text-foreground mb-6">今すぐ応募する</h3>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              エンジニア、デザイナー、マーケター、セールスなど、様々なポジションで募集中です。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground">
                求人一覧を見る
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="px-8 py-3 bg-transparent">
                カジュアル面談
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="py-32 border-t border-border"
        ref={setSectionRef("contact")}
        data-section="contact"
      >
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="mb-16">
            <h2
              className={`text-6xl md:text-8xl font-black text-foreground mb-8 tracking-tighter transition-all duration-600 animate-slide-in-left`}
            >
              CONTACT
            </h2>
            <p
              className={`text-lg text-muted-foreground max-w-2xl transition-all duration-600 animate-wave-slide-in animate-delay-200`}
            >
              ご質問やご相談がございましたら、お気軽にお声がけください。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Mail, label: "EMAIL", value: "contact@joyzo.com" },
              { icon: Phone, label: "PHONE", value: "03-1234-5678" },
              { icon: MapPin, label: "OFFICE", value: "東京都渋谷区" },
            ].map((item, index) => (
              <div
                key={index}
                className={`text-center py-8 border border-border minimal-hover transition-all duration-600 animate-scale-in`}
                style={{ animationDelay: `${400 + index * 100}ms` }}
              >
                <item.icon className="h-8 w-8 text-primary mx-auto mb-4" />
                <h3 className="text-sm font-bold text-foreground mb-2 uppercase tracking-wide">{item.label}</h3>
                <p className="text-muted-foreground">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t border-border py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="text-4xl font-black text-foreground mb-4 tracking-tighter">JOYZO</div>
            <p className="text-muted-foreground mb-8">未来を創造する企業</p>
            <div className="border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">© 2024 JOYZO. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
