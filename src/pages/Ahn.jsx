import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const fnData = {
  1: {
    title: "(1) 안상수체는 왜 '안상수'체일까?",
    text: "먼저, 당연히 그래야 한다고 생각했어요. 다른 생각을 하지 못했죠. 두번째는 당시에 안그라픽스를 막 시작하는 시점이었는데, 내 이름을 붙이는게 가장 확실하게 내 일과 디자인에 책임을 지는 방법이라고 생각했어요. 내 이름을 걸었으니 소홀히 하기 어렵겠다는 생각을 했죠. 그런 생각으로 그땐 일말의 고민도 없이 '안상수'체라고 이름을 붙였어요."
  },
  2: {
    title: "(2) 안상수 1952~",
    text: "시각디자이너, 타이포그라퍼. 1985년 '안상수체'를 멋지어 한글 글꼴의 탈네모 흐름을 이끌었으며, 이후 이상체, 미르체, 마노체 등을 선보였다. 1988년 실험잡지 「보고서/보고서」를 창간, 전위적인 타이포그라피를 실험하며 현재까지 한글 타이포그라피를 바탕으로 한 작업을 선보이고 있다.",
    img: '/image/asset_img_17.webp'
  },
  3: {
    title: '(3) "이런 것도 글자냐"',
    text: "당시 한글 글꼴은 네모틀에 맞춰 설계하는 것이 당연한 관습이었다. 탈네모꼴인 안상수체는 그 관습을 정면으로 거스른 시도였고, 이 핀잔은 역설적으로 안상수체가 기존 타이포그라피의 문법을 얼마나 과감하게 벗어났는지를 보여준다."
  }
};

const agSvg = `
  <rect x="731.5" y="152.1" width="1" height="696" fill="#111"/>
  <rect x="732" y="152" width="222" height="1" fill="#111"/>
  <rect x="732" y="445.6" width="313" height="1" fill="#111"/>
  <rect x="732" y="847.6" width="222" height="1" fill="#111"/>
  <rect x="965" y="446.1" width="1" height="402" fill="#111"/>
  <rect x="953.5" y="152.5" width="1" height="294" fill="#111"/>
  <rect x="1195.5" y="445.6" width="1" height="201" fill="#111"/>
  <rect x="1044.5" y="445.6" width="1" height="402" fill="#111"/>
  <rect x="1045" y="847.1" width="151" height="1" fill="#111"/>
  <rect x="1045" y="646.1" width="151" height="1" fill="#111"/>
`;

export default function Ahn() {
  const scrollRef = useRef(null);
  
  // States from Song.jsx (Intro, Form, Rope)
  const [scale, setScale] = useState(1);
  const [fnActive, setFnActive] = useState(null);
  const [fnPos, setFnPos] = useState({ top: 0, left: 0 });
  const [agOpen, setAgOpen] = useState(false);
  const [agFixed, setAgFixed] = useState(null);
  const [showRope, setShowRope] = useState(false);
  const [navHint, setNavHint] = useState(null); // 'top' | 'bot' | null
  const [sectionIndex, setSectionIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  const HERO_COUNT = 4;
  const HERO_STEP = 731.98 + 20;
  
  const heroRef = useRef(null);
  const section5Ref = useRef(null);
  const agSectionRef = useRef(null);
  const agCirclesRef = useRef(null);
  const agWordRef = useRef(null);
  const agLeftRef = useRef(null);
  const agRightRef = useRef(null);
  const ropeWrapRef = useRef(null);
  const ropeImgRef = useRef(null);
  const overlayRef = useRef(null);
  
  // States from Hunmin.jsx
  const hm3Ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const [hm3Drawn, setHm3Drawn] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY) * 0.9);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      setTotalSections(scrollRef.current.querySelectorAll('section').length);
    }
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    
    // Progress for top bar
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    setProgress(p);

    const viewCenter = el.scrollTop + el.clientHeight / 2;

    // 현재 섹션 인덱스 추적
    const sections = el.querySelectorAll('section');
    setTotalSections(sections.length);
    let idx = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= el.scrollTop + 50) idx = i; });
    setSectionIndex(idx);

    // Check Hunmin3 section
    if (hm3Ref.current) {
      const s = hm3Ref.current;
      setHm3Drawn(viewCenter >= s.offsetTop && viewCenter < s.offsetTop + s.offsetHeight);
    }
  };

  const handleFnClick = (e, id) => {
    e.stopPropagation();
    const rect = e.target.getBoundingClientRect();
    const parentRect = section5Ref.current.getBoundingClientRect();
    setFnPos({
      top: rect.bottom - parentRect.top + 10,
      left: rect.left - parentRect.left
    });
    setFnActive(id);
  };

  const handleAgWord = (e) => {
    e.stopPropagation();
    if (agOpen) {
      setAgOpen(false);
      setAgFixed(null);
      return;
    }
    if (!agWordRef.current) return;
    const wr = agWordRef.current.getBoundingClientRect();
    setAgFixed({ x: wr.left + wr.width / 2, y: wr.top + wr.height / 2 });
    setAgOpen(true);
  };

  const handleAgOverlay = () => {
    setAgOpen(false);
    setAgFixed(null);
  };

  const handleHeroClick = (e) => {
    e.stopPropagation();
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const isRight = e.clientX > rect.left + rect.width / 2;
    const newIndex = isRight
      ? Math.min(heroIndex + 1, HERO_COUNT - 1)
      : Math.max(heroIndex - 1, 0);
    setHeroIndex(newIndex);
    heroRef.current.scrollTo({ left: newIndex * HERO_STEP, behavior: 'smooth' });
  };

  const handleMouseMove = (e) => {
    setNavHint(e.clientY < window.innerHeight / 2 ? 'top' : 'bot');
  };

  const handleViewportClick = (e) => {
    if (e.target.closest('button, a, .dm-u, .dm-hero, .ag-form-u, .ag-form-overlay, .fn-card, .fn-overlay')) return;
    if (!scrollRef.current) return;
    
    const isBottomHalf = e.clientY >= window.innerHeight / 2;
    if (isBottomHalf) {
      scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    } else {
      scrollRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleGlobalClick = (e) => {
      if (fnActive && !e.target.closest('.fn-card') && !e.target.closest('.dm-hl')) {
        setFnActive(null);
      }
    };
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [fnActive]);

  useEffect(() => {
    const positionCircles = () => {
      if (!agSectionRef.current || !agWordRef.current || !agCirclesRef.current || agOpen) return;
      const sr = agSectionRef.current.getBoundingClientRect();
      const wr = agWordRef.current.getBoundingClientRect();
      agCirclesRef.current.style.left = `${wr.left - sr.left + wr.width / 2}px`;
      agCirclesRef.current.style.top = `${wr.top - sr.top + wr.height / 2}px`;
    };
    
    positionCircles();
    window.addEventListener('resize', positionCircles);
    document.fonts?.ready?.then(positionCircles);
    
    return () => window.removeEventListener('resize', positionCircles);
  }, [agOpen]);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (scrollRef.current) {
            handleScroll();
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    const ref = scrollRef.current;
    if (ref) ref.addEventListener('scroll', onScroll);
    return () => {
      if (ref) ref.removeEventListener('scroll', onScroll);
    };
  }, []);

  const clipWidth = 1843 * progress;
  const rightDTranslateX = 1843 * (progress - 1);
  const rightDOpacity = progress < 0.04 ? 0 : 1;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100vw', height: '100vh', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}
    >
      {/* 고정 헤더 */}
      <div className="dm-header" id="dm-header" style={{ pointerEvents: 'auto', zIndex: 100, '--progress': `${progress * 100}%` }}>
        <Link to="/" className="dm-home-btn" id="dm-home-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&lt; 홈</Link>
        <svg id="dm-progress-svg" className="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
          <defs>
            <clipPath id="dm-clip">
              <rect id="dm-clip-rect" x="0" y="0" width={clipWidth} height="97.7"/>
            </clipPath>
          </defs>
          <polygon points="94.1 23.4 94.1 74 94.1 74.3 112.6 74.3 112.6 74 112.6 23.4 112.6 23.2 94.1 23.2 94.1 23.4"/>
          <path d="M67.2,15.6c-3.6-1.1-7.3-1.7-11.1-1.7-20.2,0-36.5,15.7-36.5,35.1s16.3,34.9,36.5,34.9,7.5-.7,11.1-1.7v5.2h21.3V10.4h-21.3v5.2ZM56.1,59.4c-6.4,0-11.1-4.6-11.1-10.5s4.8-10.7,11.1-10.7,10.9,4.6,10.9,10.7-4.8,10.5-10.9,10.5Z"/>
          <g clipPath="url(#dm-clip)">
            <g id="dm-bars">
              <rect x="117.5" y="23.4" width="18.5" height="50.8"/><rect x="141" y="23.4" width="18.5" height="50.8"/><rect x="164.4" y="23.4" width="18.5" height="50.8"/><rect x="187.9" y="23.4" width="18.5" height="50.8"/><rect x="211.3" y="23.4" width="18.5" height="50.8"/><rect x="234.7" y="23.4" width="18.5" height="50.8"/><rect x="258.2" y="23.4" width="18.5" height="50.8"/><rect x="281.6" y="23.4" width="18.5" height="50.8"/><rect x="305.1" y="23.4" width="18.5" height="50.8"/><rect x="328.5" y="23.4" width="18.5" height="50.8"/>
              <rect x="352" y="23.4" width="18.5" height="50.8"/><rect x="375.4" y="23.4" width="18.5" height="50.8"/><rect x="398.9" y="23.4" width="18.5" height="50.8"/><rect x="422.3" y="23.4" width="18.5" height="50.8"/><rect x="445.8" y="23.4" width="18.5" height="50.8"/><rect x="469.2" y="23.4" width="18.5" height="50.8"/><rect x="492.6" y="23.4" width="18.5" height="50.8"/><rect x="516.1" y="23.4" width="18.5" height="50.8"/><rect x="539.5" y="23.4" width="18.5" height="50.8"/><rect x="563" y="23.4" width="18.5" height="50.8"/>
              <rect x="586.4" y="23.4" width="18.5" height="50.8"/><rect x="609.9" y="23.4" width="18.5" height="50.8"/><rect x="633.3" y="23.4" width="18.5" height="50.8"/><rect x="656.8" y="23.4" width="18.5" height="50.8"/><rect x="680.2" y="23.4" width="18.5" height="50.8"/><rect x="703.7" y="23.4" width="18.5" height="50.8"/><rect x="727.1" y="23.4" width="18.5" height="50.8"/><rect x="750.5" y="23.4" width="18.5" height="50.8"/><rect x="774" y="23.4" width="18.5" height="50.8"/><rect x="797.4" y="23.4" width="18.5" height="50.8"/>
              <rect x="820.9" y="23.4" width="18.5" height="50.8"/><rect x="844.3" y="23.4" width="18.5" height="50.8"/><rect x="867.8" y="23.4" width="18.5" height="50.8"/><rect x="891.2" y="23.4" width="18.5" height="50.8"/><rect x="914.7" y="23.4" width="18.5" height="50.8"/><rect x="938.1" y="23.4" width="18.5" height="50.8"/><rect x="961.6" y="23.4" width="18.5" height="50.8"/><rect x="985" y="23.4" width="18.5" height="50.8"/><rect x="1008.4" y="23.4" width="18.5" height="50.8"/><rect x="1031.9" y="23.4" width="18.5" height="50.8"/>
              <rect x="1055.3" y="23.4" width="18.5" height="50.8"/><rect x="1078.8" y="23.4" width="18.5" height="50.8"/><rect x="1102.2" y="23.4" width="18.5" height="50.8"/><rect x="1125.7" y="23.4" width="18.5" height="50.8"/><rect x="1149.1" y="23.4" width="18.5" height="50.8"/><rect x="1172.6" y="23.4" width="18.5" height="50.8"/><rect x="1196" y="23.4" width="18.5" height="50.8"/><rect x="1219.5" y="23.4" width="18.5" height="50.8"/><rect x="1242.9" y="23.4" width="18.5" height="50.8"/><rect x="1266.3" y="23.4" width="18.5" height="50.8"/>
              <rect x="1289.8" y="23.4" width="18.5" height="50.8"/><rect x="1313.2" y="23.4" width="18.5" height="50.8"/><rect x="1336.7" y="23.4" width="18.5" height="50.8"/><rect x="1360.1" y="23.4" width="18.5" height="50.8"/><rect x="1383.6" y="23.4" width="18.5" height="50.8"/><rect x="1407" y="23.4" width="18.5" height="50.8"/><rect x="1430.5" y="23.4" width="18.5" height="50.8"/><rect x="1453.9" y="23.4" width="18.5" height="50.8"/><rect x="1477.4" y="23.4" width="18.5" height="50.8"/><rect x="1500.8" y="23.4" width="18.5" height="50.8"/>
              <rect x="1524.2" y="23.4" width="18.5" height="50.8"/><rect x="1547.7" y="23.4" width="18.5" height="50.8"/><rect x="1571.1" y="23.4" width="18.5" height="50.8"/><rect x="1594.6" y="23.4" width="18.5" height="50.8"/><rect x="1618" y="23.4" width="18.5" height="50.8"/><rect x="1641.5" y="23.4" width="18.5" height="50.8"/><rect x="1664.9" y="23.4" width="18.5" height="50.8"/><rect x="1688.4" y="23.4" width="18.5" height="50.8"/><rect x="1711.8" y="23.4" width="18.5" height="50.8"/><rect x="1735.2" y="23.4" width="18.5" height="50.8"/>
              <rect x="1758.7" y="23.4" width="18.5" height="50.8"/><rect x="1782.1" y="23.4" width="18.5" height="50.8"/>
            </g>
          </g>
          <g id="dm-right-d" transform={`translate(${rightDTranslateX},0)`} style={{ opacity: rightDOpacity }}>
            <polygon points="1805.6 23.4 1805.6 74 1805.6 74.3 1824.1 74.3 1824.1 74 1824.1 23.4 1824.1 23.2 1805.6 23.2 1805.6 23.4"/>
            <path d="M1862.1,13.8c-3.9,0-7.5.7-11.1,1.7v-5.2h-21.3v77h21.3v-5.2c3.6,1.1,7.3,1.7,11.1,1.7,20.2,0,36.5-15.7,36.5-34.9s-16.3-35.1-36.5-35.1ZM1862.1,59.4c-6.1,0-10.9-4.6-10.9-10.5s4.8-10.7,10.9-10.7,11.1,4.6,11.1,10.7-4.8,10.5-11.1,10.5Z"/>
          </g>
        </svg>
      </div>

      <style>{`.song-scroll > section { scroll-snap-align: start; min-height: 100vh; }`}</style>

      {/* 클릭 네비게이션 힌트 */}
      <div
        className="dm-nav-hint dm-nav-hint--top"
        style={{ opacity: sectionIndex <= 0 ? 0 : navHint === 'top' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-arrow">↑</span>
        <span className="dm-nav-hint-label">이전</span>
      </div>
      <div
        className="dm-nav-hint dm-nav-hint--bot"
        style={{ opacity: sectionIndex >= totalSections - 1 ? 0 : navHint === 'bot' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-label">다음</span>
        <span className="dm-nav-hint-arrow">↓</span>
      </div>

      {/* 스크롤 영역 */}
      <div
        ref={scrollRef}
        onClick={handleViewportClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setNavHint(null)}
        className="song-scroll"
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          position: 'relative',
          cursor: 'pointer',
          scrollSnapType: 'y mandatory',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 150px)',
          maskImage: 'linear-gradient(to bottom, transparent 0px, black 150px)'
        }}
      >
        {/* 1. 히어로 이미지 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="dm-section dm-section--hero" style={{ width: '100%' }}>
            <div className="dm-hero" ref={heroRef} id="dm-hero" onClick={handleHeroClick}>
              <img src="/image/asset_img_20.jpg" className="dm-hero-img" alt="안체1" />
              <img src="/image/asset_img_21.jpg" className="dm-hero-img" alt="안체2" />
              <img src="/image/asset_img_22.jpg" className="dm-hero-img" alt="안체3" />
              <img src="/image/asset_img_24.jpg" className="dm-hero-img" alt="안체4" />
            </div>
            <p className="dm-label">AG 안상수체 2012</p>
          </div>
        </section>

        {/* 2. AG 안상수체 2012 인트로 */}
        <section ref={section5Ref} style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
          <div className="dm-section dm-section--intro" style={{ minHeight: '100vh' }}>
            <img src="/image/asset_img_41.png" className="dm-ref-big" alt="과학동아 제호 및 협회전 포스터" />
            <h1 className="dm-intro-title"><span className="dm-hl-line">AG 안상수체 2012</span></h1>
            <p className="dm-body dm-intro-body">
              <span className="dm-hl-line">
                <span className="dm-u dm-hl" onClick={(e) => handleFnClick(e, 1)}>'안상수'체</span>는 1985년{' '}
                <span className="dm-u dm-hl" onClick={(e) => handleFnClick(e, 2)}>디자이너 안상수</span>가 설계한 글자체로,
                같은 해 12월 제3회 ‹홍익시각디자이너협회 회원전› 포스터에 처음 등장한다.
                이후 1986년 1월 «과학동아» 창간호에서 많은 사람에게 알려지게 되는데,
                이 글꼴은 당시 다소 파격적인 형태로 인식된 듯하다.
                처음 만들었을 때는{' '}
                <span className="dm-u dm-hl" onClick={(e) => handleFnClick(e, 3)}>"이런 것도 글자냐"</span>고 핀잔을 받기도 했다는데,
                이는 한글 글자체는 당연히 네모틀에 잘 맞춰서 설계해야 한다는 개념을 탈피한 시도였기 때문이다.
              </span>
            </p>
            <p className="dm-ref-caption dm-ref-caption--float">
              좌 〈과학동아〉 제호(1986년 1월),<br/>우 제3회 홍익시각디자이너협회 회원전 포스터(1985년 12월)
            </p>
          </div>

          {/* fn-overlay */}
          {fnActive && <div className="fn-overlay is-open" onClick={(e) => { e.stopPropagation(); setFnActive(null); }} />}

          {/* 각주 카드 */}
          {fnActive && (
            <div
              className="fn-card is-open"
              onClick={(e) => e.stopPropagation()}
              style={{ top: fnPos.top, left: fnPos.left }}
            >
              {fnData[fnActive].img ? (
                <>
                  <div className="fn-card-header">
                    <p className="fn-card-title">{fnData[fnActive].title}</p>
                    <img className="fn-card-portrait" src={fnData[fnActive].img} alt="" />
                  </div>
                  <p className="fn-card-text">{fnData[fnActive].text}</p>
                </>
              ) : (
                <>
                  <p className="fn-card-title">{fnData[fnActive].title}</p>
                  <p className="fn-card-text">{fnData[fnActive].text}</p>
                </>
              )}
            </div>
          )}
        </section>

        {/* 3. 안상수체의 기본 형태 */}
        <section style={{ width: '100%', minHeight: '100vh' }}>
          <div className="dm-section dm-section--form" style={{ minHeight: '100vh' }}>
            <div className="ag-form-section" ref={agSectionRef}>
              <div
                ref={agCirclesRef}
                className={`ag-form-circles${agOpen ? ' ag-circles-lit' : ''}`}
                style={agFixed ? { position: 'fixed', left: agFixed.x, top: agFixed.y, zIndex: 55 } : {}}
              >
                <div className="ag-form-circle ag-form-circle--3" />
                <div className="ag-form-circle ag-form-circle--2" />
                <div className="ag-form-circle ag-form-circle--1" />
              </div>
              <h2 className="ag-form-title">안상수체의 기본 형태</h2>
              <p className="ag-form-desc">
                안상수는 한글 활자 형태를 크게 두 가지로 구분하고,{' '}
                <span ref={agWordRef} className="ag-form-u" onClick={handleAgWord}>네모틀과 탈네모틀</span>{' '}
                글자꼴은 각각의 목적과 특성을 살리면서 발전할 것이라고 했다. 특히, 탈네모틀 글자꼴의 가능성에 대해서 높게 평가했다.
              </p>
            </div>
          </div>
        </section>

        {/* 4. 훈민정음의 창제 원리 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div className="dm-section dm-section--hunmin" style={{ width: '100%' }}>
            <h2 className="dm-title hm-title">훈민정음의 창제 원리를 따르다</h2>
            <div className="hm-img-wrap">
              <img src="/image/asset_img_32.jpg" className="hm-img" alt="훈민정음 창제원리" />
              <p className="dm-ref-caption">『훈민정음 해례본』 자모음의 원리도</p>
            </div>
            <p className="dm-body">안상수체의 간결함은 훈민정음 창제 원리에 근거한다. 훈민정음은 닿자와 홀자 24개만 설계해 형태를 변형하지 않고 모든 경우에 사용하는 가장 간결하고 기하학적인 형태이다. 수직선, 수평선, 사선, 정원으로 구성된 24자의 낱자를 기본 형태로 삼아 쌍닿자, 이중홀자 등을 조합했다.</p>
          </div>
        </section>

        {/* 5. 조합 */}
        <section style={{ width: '100%', minHeight: '100vh' }}>
          <div className="dm-section dm-section--hunmin3" ref={hm3Ref} style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="hm3-charts-wrap">
              <div className="hm3-chart hm3-chart--chot">
                <div className="hm3-chart-box">
                  <img src="/image/asset_img_33.svg" alt="첫닿자 19자" className="hm3-chart-img" />
                </div>
              </div>
              <div className="hm3-chart hm3-chart--bat">
                <div className="hm3-chart-box">
                  <img src="/image/asset_img_9.svg" alt="받침 27자" className="hm3-chart-img" />
                </div>
              </div>
              <div className="hm3-chart hm3-chart--hol">
                <div className="hm3-chart-box">
                  <img src="/image/asset_img_43.svg" alt="홀자 21자" className="hm3-chart-img" />
                </div>
              </div>
            </div>
            <p className="dm-body hm3-text">
              첫닿자 19자, 홀자 21자, 받침 27자로 11,172자를 만들어냈다.{' '}
              <span className={`hm3-highlight${hm3Drawn ? ' is-drawn' : ''}`}>
                이는 네모틀 글자체에서 글자마다 형태, 크기, 위치를 변형하여 11,172자를 각각 설계해야 했던 관습에서 벗어난 새롭고도 익숙한 접근이었다.
              </span>
            </p>
          </div>
        </section>
      </div>

      {/* 기본형태 오버레이 */}
      {agOpen && (
        <div className="ag-form-overlay is-open" onClick={handleAgOverlay}>
          
          {/* 양쪽 캡션 연결선 (원에서 패널로) */}
          {agFixed && (
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: -1 }}>
              {/* 왼쪽 패널의 우측 모서리로 연결 (8% + 360px) */}
              <line x1={agFixed.x} y1={agFixed.y} x2="calc(8% + 360px)" y2="50%" stroke="#98FB98" strokeWidth="6" />
              {/* 오른쪽 패널의 좌측 모서리로 연결 (100% - 8% - 360px = 92% - 360px) */}
              <line x1={agFixed.x} y1={agFixed.y} x2="calc(92% - 360px)" y2="50%" stroke="#98FB98" strokeWidth="6" />
            </svg>
          )}

          <div ref={agLeftRef} className="ag-caption-panel ag-caption-panel--left">
            <img src="/image/asset_img_37.svg" className="ag-caption-img" alt="탈네모틀" />
            <p className="ag-caption-text">(1) 탈네모틀<br/><br/>낱자를 조합하여 소리를 이루는 한글의 구조적 특징을 반영하여 네모틀을 벗어난 형태의 틀로, 네모틀의 상대적 개념.<br/><br/>초기에는 비네모틀, 탈사각틀이라는 표현이 혼재했으나 1990년대 이후 '탈네모틀'로 일반화되었다. 한글은 하나의 소리를 이루는 낱자의 종류가 적고, 조합 구조가 단순할수록 탈네모틀에 가까워진다.</p>
          </div>
          <div ref={agRightRef} className="ag-caption-panel ag-caption-panel--right">
            <img src="/image/asset_img_5.svg" className="ag-caption-img" alt="네모틀" />
            <p className="ag-caption-text">(2) 네모틀<br/><br/>전통 서법의 영향과 활자 조판의 편의성에서 비롯된 일정한 크기의 사각 모양 틀.<br/><br/>한글 창제 이후 1980년대까지 대부분의 한글 글자꼴은 일정한 네모의 틀 안에서 제작되었다. 지금까지도 네모틀은 전통적이며 전형적인 한글의 외형을 유지하는 대표적인 체계 요소이다.</p>
          </div>
        </div>
      )}

    </motion.div>
  );
}
