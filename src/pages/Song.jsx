import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gonghanFont from '../fonts/OnulGongHanChe-Medium.otf';
import dongdaemunFont from '../fonts/OnulDongdaemun-Medium.otf';
import AncheProjectModal from '../components/AncheProjectModal';

export default function Song() {
  const location    = useLocation();
  const navigate    = useNavigate();
  const scrollRef    = useRef(null);
  useEffect(() => {
    // Scroll restoration placeholder if needed
  }, [location.state]);
  const [scale, setScale] = useState(1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [progress, setProgress] = useState(0);
  const [isAncheOpen, setIsAncheOpen] = useState(false);
  const [navHint, setNavHint] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const mob = w <= 768;
      setIsMobile(mob);
      const scaleX = w / 1920;
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

  // 내부 스크롤 컨테이너의 스크롤 프로그레스 계산 로직
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    setProgress(p);

    const sections = el.querySelectorAll('section');
    setTotalSections(sections.length);
    let idx = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= el.scrollTop + 50) idx = i; });
    setSectionIndex(idx);
  };

  // 프로그레스 SVG 로직
  const clipWidth = 1843 * progress;
  const rightDTranslateX = 1843 * (progress - 1);
  const rightDOpacity = progress < 0.04 ? 0 : 1;

  // 1번 페이지 인터랙션 상태 (0: 첫문장, 1: 두번째, 2: 세번째, 3: 네번째)
  const [step, setStep] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  
  // 2번 페이지 인터랙션 상태
  const [step2, setStep2] = useState(0);





  // 상/하단 클릭 시 스크롤 및 텍스트 진행 처리
  const handleViewportClick = (e) => {
    if (e.target.closest('button, a, .dm-u, .dm-hero, .dm-ap-grid, .ap-sticker')) return;
    if (!scrollRef.current) return;
    
    const isTopHalf = e.clientY < window.innerHeight / 2;
    const isBottomHalf = e.clientY >= window.innerHeight / 2;
    const scrollTop = scrollRef.current.scrollTop;
    
    const isPage1  = scrollTop < window.innerHeight / 2;
    const isPage2  = scrollTop >= window.innerHeight / 2 && scrollTop < window.innerHeight * 1.5;

    if (isBottomHalf) {
      if (isPage1) {
        setShowPopup(false);
        scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else if (isPage2 && step2 < 2) {
        setStep2(prev => prev + 1);
      } else {
        scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    } else if (isTopHalf) {
      if (isPage2 && step2 > 0) {
        setStep2(prev => prev - 1);
      } else if (isPage1) {
        setShowPopup(false);
        scrollRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      } else {
        scrollRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const handleNameClick = (e) => {
    e.stopPropagation(); // 배경 클릭(스크롤/step 증가) 방지
    setShowPopup(prev => !prev);
  };

  const handleMouseMove = (e) => {
    setNavHint(e.clientY < window.innerHeight / 2 ? 'top' : 'bot');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100vw', height: '100vh', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}
    >
      {/* 이식된 헤더 프로그레스바 + 홈버튼 */}
      <div className="dm-header" id="dm-header" style={{ pointerEvents: 'auto', zIndex: 100, '--progress': `${progress * 100}%` }}>
        <Link to="/" className="dm-home-btn" id="dm-home-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>&lt; 홈</Link>
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

      {/* 내부 스크롤 영역 */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
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
        {/* 1번 페이지: 안상수체 인용구 (클릭 인터랙션) */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {isMobile ? (
            /* ── 모바일: 누적 텍스트, 큰 폰트 ── */
            <div style={{ width: '100%', padding: '80px 24px 48px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '16px', fontSize: 'clamp(22px, 5.5vw, 30px)', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', lineHeight: 1.4, wordBreak: 'keep-all' }}>
              {[
                "좋아하는 서체를 한 글자 프린트해 오라는 과제가 있었다.",
                "별다른 고민과 확신도 없이 안상수체를 고르고, 내 이름의 앞글자 '송'을 적어넣었다.",
                "프린트된 종이를 보며 이유를 생각하기 시작했다.",
                "늘 내 이름 석자가 쓰인 모습이 마음에 들지 않았던 것 같다.",
                "직접 써도 어딘가 불안정해 보였고, 지정된 서체를 이용해도 답답해 보였다.",
                "안상수체로 쓰인 내 이름은 지루함 없이 살아 있고 튼튼했다.",
                "이 점을 깨닫고 나니 애정하지 않을 수가 없었다…"
              ].map((text, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.2 }}
                >
                  {text}
                </motion.div>
              ))}
              {/* 이름 비교 카드 — 인라인 */}
              <motion.div
                animate={{ opacity: showPopup ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ pointerEvents: showPopup ? 'auto' : 'none', display: 'flex', gap: '20px', background: '#98FB98', padding: '16px 20px', borderRadius: '5px' }}
              >
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '36px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, lineHeight: 1 }}>송명선</div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-onul)', fontWeight: 700, letterSpacing: '1px', color: '#555', marginTop: '6px' }}>안상수체</div>
                </div>
                <div style={{ width: '1px', background: 'rgba(0,0,0,0.2)' }} />
                <div style={{ flex: 1, textAlign: 'center' }}>
                  <div style={{ fontSize: '32px', fontFamily: 'Pretendard', fontWeight: 700, lineHeight: 1 }}>송명선</div>
                  <div style={{ fontSize: '11px', fontFamily: 'var(--font-onul)', fontWeight: 700, letterSpacing: '1px', color: '#555', marginTop: '6px' }}>Pretendard</div>
                </div>
              </motion.div>
            </div>
          ) : (
          <div style={{ width: '1920px', height: '1080px', position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <div data-layer="인용구" style={{ position: 'absolute', left: '50px', top: '45%', transform: 'translateY(-50%)', width: '1567px', display: 'flex', flexDirection: 'column', gap: '20px', color: 'black', fontSize: '50px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, wordWrap: 'break-word', textAlign: 'left', lineHeight: '1.35' }}>
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.2, delay: 0.2 }}>
                좋아하는 서체를 한 글자 프린트해 오라는 과제가 있었다.
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                별다른 고민과 확신도 없이 안상수체를 고르고, 내 이름의 앞글자 '송'을 적어넣었다.
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                프린트된 종이를 보며 이유를 생각하기 시작했다.
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
                style={{ position: 'relative' }}
              >
                {/* 각주 팝업 (fn-card 스타일) & 천천히 깜빡이는 효과 */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: showPopup ? 1 : 0, y: showPopup ? 0 : 10, scale: showPopup ? 1 : 0.98 }}
                  transition={{ duration: 0.4 }}
                  style={{ 
                    position: 'absolute', 
                    top: '-140px', 
                    left: '-20px', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '40px', 
                    alignItems: 'center',
                    padding: '20px 40px',
                    borderRadius: '5px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    pointerEvents: showPopup ? 'auto' : 'none',
                    zIndex: 10,
                    overflow: 'hidden'
                  }}
                >
                  {/* 깜빡이는 초록색 배경 레이어 */}
                  <motion.div
                    animate={{ backgroundColor: ["#98FB98", "#7aeb7a", "#98FB98"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
                  />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: 'black', fontSize: '48px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, lineHeight: '1' }}>송명선</div>
                    <div style={{ color: 'black', fontSize: '15px', fontFamily: 'var(--font-onul)', fontWeight: 700, letterSpacing: '1px' }}>안상수체</div>
                  </div>
                  
                  {/* 구분선 */}
                  <div style={{ width: '2px', height: '50px', background: 'rgba(0,0,0,0.2)' }} />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: 'black', fontSize: '40px', fontFamily: 'Pretendard', fontWeight: 700, lineHeight: '1', transform: 'translateY(5px)' }}>송명선</div>
                    <div style={{ color: 'black', fontSize: '15px', fontFamily: 'var(--font-onul)', fontWeight: 700, letterSpacing: '1px' }}>Pretendard</div>
                  </div>
                </motion.div>

                늘 <span className="dm-u" style={{ textUnderlineOffset: '12px' }} onClick={handleNameClick}>내 이름 석자가</span> 쓰인 모습이 마음에 들지 않았던 것 같다.
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                직접 써도 어딘가 불안정해 보였고, 지정된 서체를 이용해도 답답해 보였다.
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                안상수체로 쓰인 내 이름은 지루함 없이 살아 있고 튼튼했다.
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                이 점을 깨닫고 나니 애정하지 않을 수가 없었다…
              </motion.div>
            </div>
          </div>
          )}
        </section>

        {/* 2번 페이지: 새로운 질문과 4단 탈네모틀 폰트 비교 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: isMobile ? 'flex-start' : 'center', overflow: 'hidden', paddingTop: isMobile ? '70px' : 0, boxSizing: 'border-box' }}>
          <style>
            {`
              @font-face {
                  font-family: 'Gonghan';
                  src: url('${gonghanFont}') format('opentype');
              }
              @font-face {
                  font-family: 'Dongdaemun';
                  src: url('${dongdaemunFont}') format('opentype');
              }
            `}
          </style>
          {isMobile ? (
            /* ── 모바일: 4폰트 → 안상수체 확대 → 자모 색 ── */
            <div style={{ width: '100%', minHeight: 'calc(100vh - 70px)', position: 'relative' }}>
              {/* Phase 0: 질문 + 4폰트 */}
              <motion.div
                animate={{ opacity: step2 >= 1 ? 0 : 1 }}
                transition={{ duration: 0.5 }}
                style={{ padding: '0 5vw 60px', display: 'flex', flexDirection: 'column', gap: '32px', pointerEvents: step2 >= 1 ? 'none' : 'auto' }}
              >
                <div style={{ fontSize: 'clamp(20px, 5.5vw, 32px)', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', lineHeight: 1.4 }}>
                  근데 많은 탈네모틀 중에<br/>왜 안상수체였을까요?
                </div>
                {[
                  { font: 'AGahnsangsoo2012', label: '안상수체' },
                  { font: 'OnulHanChe', label: '오늘한체' },
                  { font: '"공한체", "Gonghan", sans-serif', label: '공한체' },
                  { font: '"동대문체", "Dongdaemun", sans-serif', label: '동대문체' },
                ].map(({ font, label }) => (
                  <div key={label} style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ fontSize: 'clamp(48px, 15vw, 80px)', fontFamily: font, fontWeight: 500, lineHeight: 1 }}>송명선</div>
                    <div style={{ fontSize: '11px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>{label}</div>
                  </div>
                ))}
              </motion.div>

              {/* Phase 1+: 안상수체만 크게 중앙 + 자모 색 */}
              <motion.div
                animate={{ opacity: step2 >= 1 ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: 'absolute', inset: 0,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  padding: '0 5vw 60px', gap: '20px', boxSizing: 'border-box',
                  pointerEvents: step2 >= 1 ? 'auto' : 'none',
                }}
              >
                {/* 송명선 + 카드 wrapper */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', width: 'fit-content', gap: '16px' }}>
                  <div style={{ fontSize: 'clamp(110px, 30vw, 180px)', fontFamily: 'AGahnsangsoo2012', fontWeight: 500, lineHeight: 1, display: 'flex', justifyContent: 'center', paddingBottom: '0.55em' }}>
                    {[
                      { char: '송', jamo: 'ㅇ', left: '50%' },
                      { char: '명', jamo: 'ㅇ', left: '74%' },
                      { char: '선', jamo: 'ㄴ', left: '73.5%' }
                    ].map(({ char, jamo, left }, i) => (
                      <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                        {char}
                        <motion.span
                          animate={{ opacity: step2 >= 2 ? 1 : 0 }}
                          transition={{ duration: 0.6 }}
                          style={{ position: 'absolute', bottom: '-0.42em', left, transform: 'translateX(-50%)', fontSize: '0.85em', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#7aeb7a', lineHeight: 1, pointerEvents: 'none' }}
                        >
                          {jamo}
                        </motion.span>
                      </span>
                    ))}
                  </div>
                  <motion.div
                    animate={{ opacity: step2 >= 2 ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ width: '100%', padding: '12px 14px', background: '#98FB98', borderRadius: '5px' }}
                  >
                    <p style={{ margin: 0, fontSize: '12px', fontFamily: 'OnulHanChe', fontWeight: 700, color: '#000', lineHeight: 1.6, wordBreak: 'keep-all', textAlign: 'center' }}>
                      다른 글자체와 달리 한눈에 보이는 차이점은 안체는 첫 닿자와 받침의 형태를 같이 쓰고, 홀자의 위치를 가운데로 맞추어 사용하는 아주 단순한 구조이다.<br/><br/>이 점이 이름 세글자를 살아 움직이게 하는 이유였다.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          ) : (
          <div style={{ width: '1920px', height: '1080px', position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center center' }}>

            {/* 시네마틱 카메라 줌 컨테이너 */}
            <motion.div
              animate={{
                x: step2 >= 1 ? 665 : 0,
                y: step2 >= 1 ? -75 : 0,
                scale: step2 >= 1 ? 4.5 : 1
              }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, transformOrigin: '295px 615px' }}
            >
              {/* 타이틀 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={step2 >= 1 ? { opacity: 0 } : {}}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                data-layer="질문" 
                style={{ position: 'absolute', left: '100px', top: '250px', width: '1567px', color: 'black', fontSize: '64px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, wordWrap: 'break-word', textAlign: 'left', lineHeight: '1.4' }}
              >
                근데 많은 탈네모틀 중에<br/>
                왜 안상수체였을까요?
              </motion.div>

              {/* 4단 탈네모틀 폰트 전시 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ position: 'absolute', left: '100px', top: '550px', width: '1720px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', alignItems: 'flex-end' }}
              >
                {/* 1. 안상수체 (확대 대상, 카메라는 여기를 추적함) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '130px', fontFamily: 'AGahnsangsoo2012', color: 'black', fontWeight: 500, lineHeight: 1, display: 'inline-flex' }}>
                    {[
                      { char: '송', jamo: 'ㅇ', left: '50%', transform: 'translateX(-50%)', bottom: '-61px' },
                      { char: '명', jamo: 'ㅇ', left: '74%', transform: 'translateX(-50%)', bottom: '-61px' },
                      { char: '선', jamo: 'ㄴ', left: '73.5%', transform: 'translateX(-50%)', bottom: '-60px' },
                    ].map(({ char, jamo, left, transform, bottom }, i) => (
                      <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                        {char}
                        <motion.span
                          animate={{ opacity: step2 === 2 ? 1 : 0 }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                          style={{
                            position: 'absolute',
                            bottom,
                            left,
                            transform,
                            fontSize: '132px',
                            fontFamily: 'AGahnsangsoo2012',
                            fontWeight: 700,
                            color: '#7aeb7a',
                            lineHeight: 1,
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {jamo}
                        </motion.span>
                      </span>
                    ))}
                  </div>
                  <motion.div animate={{ opacity: step2 >= 1 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ fontSize: '15px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>안상수체</motion.div>
                </div>

                {/* 2. 오늘한체 (줌인 시 페이드아웃) */}
                <motion.div animate={{ opacity: step2 >= 1 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '130px', fontFamily: 'OnulHanChe', color: 'black', fontWeight: 500, lineHeight: 1 }}>송명선</div>
                  <div style={{ fontSize: '15px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>오늘한체</div>
                </motion.div>

                {/* 3. 공한체 */}
                <motion.div animate={{ opacity: step2 >= 1 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '130px', fontFamily: '"공한체", "Gonghan", "Gong Han", sans-serif', color: 'black', fontWeight: 500, lineHeight: 1 }}>송명선</div>
                  <div style={{ fontSize: '15px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>공한체</div>
                </motion.div>

                {/* 4. 동대문체 */}
                <motion.div animate={{ opacity: step2 >= 1 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '130px', fontFamily: '"동대문체", "Dongdaemun", sans-serif', color: 'black', fontWeight: 500, lineHeight: 1 }}>송명선</div>
                  <div style={{ fontSize: '15px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>동대문체</div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 각주 카드 — step2>=3이면 유지 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: step2 >= 2 ? 1 : 0, y: step2 >= 2 ? 0 : 10 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                right: '60px',
                top: '35%',
                transform: 'translateY(-50%)',
                width: '430px',
                padding: '24px 28px',
                borderRadius: '5px',
                background: '#98FB98',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <p style={{ width: '100%', fontSize: '19px', fontFamily: 'OnulHanChe', fontWeight: 700, color: 'black', lineHeight: '32.3px', margin: 0, wordBreak: 'keep-all' }}>
                다른 글자체와 달리 한눈에 보이는 차이점은 안체는 첫 닿자와 받침의 형태를 같이 쓰고, 홀자의 위치를 가운데로 맞추어 사용하는 아주 단순한 구조이다.<br/><br/>이 점이 이름 세글자를 살아 움직이게 하는 이유였다.
              </p>
            </motion.div>

          </div>
          )}
        </section>
      </div>

      <AncheProjectModal isOpen={isAncheOpen} onClose={() => setIsAncheOpen(false)} />
    </motion.div>
  );
}
