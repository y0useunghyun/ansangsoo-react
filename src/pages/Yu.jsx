import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import AncheProjectModal from '../components/AncheProjectModal';

export default function Yu() {
  const scrollRef = useRef(null);
  const dragRef = useRef({ isDragging: false, startX: 0, startHPx: 0, moved: false });
  const [isDragging, setIsDragging] = useState(false);
  const [scale, setScale] = useState(1);
  const [progress, setProgress] = useState(0);

  // 인트로 애니메이션 스텝 (0~3)
  const [step, setStep] = useState(0);

  // 타임라인 가로 패닝
  const [hPx, setHPx] = useState(0);
  const H_STEP = window.innerWidth <= 768 ? 250 : 1400;
  const H_MAX = Math.max(0, Math.round(6650 - window.innerWidth / (2 * scale)));

  const [isAncheOpen, setIsAncheOpen] = useState(false);
  const [showNohText, setShowNohText] = useState(false);
  const [activePopup, setActivePopup] = useState(null);
  const [navHint, setNavHint] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const isMob = w <= 768;
      const scaleX = w / 1920;
      const scaleY = h / 1080;
      setScale(Math.min(scaleX, scaleY) * (isMob ? 2.8 : 0.9));
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    setProgress(p);

    const sections = el.querySelectorAll('section');
    let idx = 0;
    sections.forEach((s, i) => { if (s.offsetTop <= el.scrollTop + 50) idx = i; });
    setSectionIndex(idx);
  };

  const handleMouseMove = (e) => {
    if (sectionIndex === 1) {
      setNavHint(e.clientX < window.innerWidth / 2 ? 'left' : 'right');
    } else {
      setNavHint(e.clientY < window.innerHeight / 2 ? 'top' : 'bot');
    }
  };

  const handleViewportClick = (e) => {
    if (!scrollRef.current) return;
    
    const isTopHalf = e.clientY < window.innerHeight / 2;
    const isBottomHalf = e.clientY >= window.innerHeight / 2;
    const scrollTop = scrollRef.current.scrollTop;
    
    const isPage1 = scrollTop < window.innerHeight / 2;
    
    if (isPage1) {
      if (isBottomHalf) {
        scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const handleTimelineMouseDown = (e) => {
    dragRef.current = { isDragging: true, startX: e.clientX, startHPx: hPx, moved: false };
    setIsDragging(true);
  };
  const handleTimelineMouseMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const delta = (dragRef.current.startX - e.clientX) / scale;
    if (Math.abs(delta) > 4) dragRef.current.moved = true;
    setHPx(Math.max(0, Math.min(H_MAX, dragRef.current.startHPx + delta)));
  };
  const handleTimelineMouseUp = (e) => {
    if (!dragRef.current.isDragging) return;
    dragRef.current.isDragging = false;
    setIsDragging(false);
    if (!dragRef.current.moved) {
      if (e.clientX < window.innerWidth / 2) {
        setHPx(p => Math.max(0, p - H_STEP));
      } else {
        setHPx(p => Math.min(H_MAX, p + H_STEP));
      }
    }
  };
  const handleTimelineTouchStart = (e) => {
    dragRef.current = { isDragging: true, startX: e.touches[0].clientX, startHPx: hPx, moved: false };
  };
  const handleTimelineTouchMove = (e) => {
    if (!dragRef.current.isDragging) return;
    const delta = (dragRef.current.startX - e.touches[0].clientX) / scale;
    setHPx(Math.max(0, Math.min(H_MAX, dragRef.current.startHPx + delta)));
  };
  const handleTimelineTouchEnd = () => { dragRef.current.isDragging = false; };

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

      <div
        className="dm-nav-hint dm-nav-hint--bot"
        style={{ opacity: sectionIndex !== 0 ? 0 : navHint === 'bot' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-label">다음</span>
        <span className="dm-nav-hint-arrow">↓</span>
      </div>
      <div
        className="dm-nav-hint dm-nav-hint--left"
        style={{ opacity: sectionIndex !== 1 || hPx <= 0 ? 0 : navHint === 'left' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-arrow">←</span>
        <span className="dm-nav-hint-label">이전</span>
      </div>
      <div
        className="dm-nav-hint dm-nav-hint--right"
        style={{ opacity: sectionIndex !== 1 || hPx >= H_MAX ? 0 : navHint === 'right' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-label">다음</span>
        <span className="dm-nav-hint-arrow">→</span>
      </div>

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
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', padding: '15vh 5vw', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '30px', color: 'black', fontSize: 'clamp(18px, 2.8vw, 52px)', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, lineHeight: '1.5', wordBreak: 'keep-all' }}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                글자체에 대해서 무지했던 나는 안상수체가 처음 나왔을 때부터 3종이 다 나왔을 거라고 생각했다.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                하지만 지금까지 꾸준히 변화했다는 것을 알게 됐고,
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2, delay: 0.2 }}
              >
                이렇게 꾸준히 변화하는 점이 대단하게 느껴졌다. 그래서 어떻게 변화해왔는지 정리해 보려고 한다.
              </motion.div>
          </div>
        </section>

        <section
          onMouseDown={handleTimelineMouseDown}
          onMouseMove={handleTimelineMouseMove}
          onMouseUp={handleTimelineMouseUp}
          onMouseLeave={handleTimelineMouseUp}
          onTouchStart={handleTimelineTouchStart}
          onTouchMove={handleTimelineTouchMove}
          onTouchEnd={handleTimelineTouchEnd}
          style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', cursor: isDragging ? 'grabbing' : 'grab', background: '#fff', userSelect: 'none' }}
        >
          <motion.div
            animate={{ x: -(hPx * scale) }}
            transition={isDragging ? { duration: 0 } : { duration: 0.85, ease: [0.4, 0, 0.15, 1] }}
            style={{ position: 'absolute', top: '50%', left: 0, marginTop: `${-(1080 * scale) / 2}px`, width: `${9700 * scale}px`, height: `${1080 * scale}px` }}
          >
          <div style={{ width: '9700px', height: '1080px', position: 'absolute', top: 0, left: 0, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <div style={{ position: 'absolute', left: 600, top: 400, width: 10000, height: 20, background: 'rgba(152, 251, 152, 0.85)' }} />
            <div style={{ position: 'absolute', left: 1900, top: 584, width: 2800, height: 16, background: 'rgba(255, 171, 225, 0.85)' }} />
            <div style={{ position: 'absolute', left: 1900, top: 734, width: 3800, height: 16, background: 'rgba(122, 235, 255, 0.85)' }} />
            <div style={{ position: 'absolute', left: 2300, top: 884, width: 2900, height: 16, background: 'rgba(255, 235, 87, 0.85)' }} />

            {[
              { x: 600,  text: '1985\n안상수체 탄생', content: { title: '오토캐드 사용', desc: "1985년 처음 만들어진 안상수체는 건축 설계용 프로그램 '오토캐드'로 설계되었다.", color: '#98FB98', left: 600 + 220, top: 361 - 10 } },
              { x: 1500, text: '1991\n안상수체 3종 파생', content: { title: '폰토그라퍼 사용', desc: "1991년에는 '폰토그라퍼'를 통해 영문과 기호를 추가해 한 벌의 폰트로 완성했다.", color: '#98FB98', left: 1500 + 300, top: 361 - 10 } },
              { x: 4000, text: '2012\n안상수체 5종 파생', content: { title: '폰트랩 사용', desc: "2012년 판올림에서는 '폰트랩'을 사용해 '한글 그룹 커닝' 기술을 적용했다.", note: "* 폰트랩(FontLab): 디지털 폰트를 제작, 편집할 수 있는 전문적인 폰트 에디터 소프트웨어.", color: '#98FB98', left: 4000 + 300, top: 361 - 10 } },
              { x: 4500, text: '2013\n둥근안상수체 탄생' },
              { x: 6500, text: '2025\n안체 프로젝트', content: { title: '안체 프로젝트', desc: "안체 프로젝트는 AG 안상수체 탄생 40주년을 기념해 진행된 프로젝트로, 참여 디자이너들이 AG 안상수체의 모듈을 활용해 새로운 탈네모틀 한글꼴을 제작하고 안상수와 한글에 대한 각자의 생각을 담아내는 연구 프로젝트다. 연구소는 디자이너들이 11,172자의 한글 완성형 글자를 완성할 수 있도록 제작 전 과정을 지원한다.", color: '#98FB98', left: 6500 + 300, top: 361 - 10 } },
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={(e) => {
                  if (item.content) {
                    e.stopPropagation();
                    setActivePopup(prev => prev && prev.title === item.content.title ? null : item.content);
                  }
                }}
                style={{ position: 'absolute', left: item.x, top: 361, width: 460, fontSize: 50, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', lineHeight: 1.3, cursor: item.content ? 'pointer' : 'default' }}
              >
                {item.text.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx === 1 && item.content ? (
                      <span style={{ textDecoration: 'underline', textDecorationColor: item.content.color, textDecorationThickness: '4px', textUnderlineOffset: '16px' }}>
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                    {idx === 0 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}


            {[
              { x: 100,  text: '1937\n최현배의 풀어쓰기 〈한글〉 5권 5호', content: { title: '최현배의 풀어쓰기', desc: "국어학자 최현배 선생은 한글을 네모틀(모아쓰기)에 가두지 말고 영문 알파벳처럼 가로로 길게 늘어쓰자고 주장했다. 이는 기계화(타자기)와 타자의 효율성을 높이기 위한 혁신적인 시도였다.", note: "* 출처: 국립국어원 및 한국학중앙연구원 등 역사 자료", color: '#D3D3D3', left: 100 + 200, top: 193 - 10 } },
              { x: 1100, text: '1989\n장봉선의 풀어쓰기 〈한글풀어쓰기 교본〉', content: { title: '장봉선의 풀어쓰기', desc: "주시경-최현배로 이어지는 풀어쓰기 운동의 흐름을 계승하여 교본을 펴냈다. 완전히 풀어쓰는 방식뿐만 아니라 시각적 과도기 형태인 '반 풀어쓰기' 등 다양한 타이포그래피적 대안을 제안했다.", note: "* 출처: 국립국어원 《국어생활》 (1989년) 등 학술지 기록", color: '#D3D3D3', left: 1100 + 200, top: 193 - 10 } },
              { x: 2300, text: '1993\n조정보의 풀어쓰기 〈한글정보〉 제 5호', content: { title: '조정보의 풀어쓰기', desc: "본격적인 컴퓨터 정보화 시대가 도래하면서, 디지털 전산 처리와 한글의 구조적 특성을 결합하여 '기계에 가장 친화적인' 형태의 한글 풀어쓰기 방식을 제안한 연구다.", note: "* 출처: 디자인 매거진 《한글정보》 1993년 제5호", color: '#D3D3D3', left: 2300 + 200, top: 193 - 10 } },
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={(e) => {
                  if (item.content) {
                    e.stopPropagation();
                    setActivePopup(prev => prev && prev.title === item.content.title ? null : item.content);
                  }
                }}
                style={{ position: 'absolute', left: item.x, top: 193, width: 450, fontSize: 30, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', lineHeight: 1.4, cursor: item.content ? 'pointer' : 'default' }}
              >
                {item.text.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx === 1 && item.content ? (
                      <span style={{ textDecoration: 'underline', textDecorationColor: item.content.color, textDecorationThickness: '3px', textUnderlineOffset: '12px' }}>
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                    {idx === 0 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}

            {[
              { x: 1900, text: '1992\n이상체 탄생', content: { title: '배열의 해체', desc: "1991년 발표된 '이상체'는 안상수체의 낱글자 배열을 풀어쓰기 방식으로 해체한 글자체다. 근대 소설가이자 시인인 '이상'의 전위적·초현실주의적 작품에서 영감을 받아 설계되었으며, 모아쓰기를 기본으로 하는 한글의 개념을 탈피한 새로운 시도였다.", color: '#FFABE1', left: 1900 + 170, top: 545 - 10 } },
              { x: 4500, text: '2013\n이상체 5종 파생' },
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={(e) => {
                  if (item.content) {
                    e.stopPropagation();
                    setActivePopup(prev => prev && prev.title === item.content.title ? null : item.content);
                  }
                }}
                style={{ position: 'absolute', left: item.x, top: 545, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', lineHeight: 1.3, cursor: item.content ? 'pointer' : 'default' }}
              >
                {item.text.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx === 1 && item.content ? (
                      <span style={{ textDecoration: 'underline', textDecorationColor: item.content.color, textDecorationThickness: '4px', textUnderlineOffset: '16px' }}>
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                    {idx === 0 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}

            {[
              { x: 1900, text: '1992\n미르체 탄생', content: { title: '모듈 실험', desc: "1992년 발표된 '미르체'는 길이가 같은 정사각형 모듈을 조립해 한글의 모든 닿자와 홀자를 만들어내는 방식이다. 2015년 판올림한 미르체는 평면과 입체 같은 공간 개념을 추가로 적용했다. 1993년 발표된 '마노체'는 일정한 길이와 굵기의 선과 원이 반복되는 비례 규칙으로 닿자와 홀자를 만들어낸다.", color: '#7AEBFF', left: 1900 + 170, top: 695 - 10 } },
              { x: 5500, text: '2015\n미르체 6종 파생' },
            ].map((item, i) => (
              <div 
                key={i} 
                onClick={(e) => {
                  if (item.content) {
                    e.stopPropagation();
                    setActivePopup(prev => prev && prev.title === item.content.title ? null : item.content);
                  }
                }}
                style={{ position: 'absolute', left: item.x, top: 695, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', lineHeight: 1.3, cursor: item.content ? 'pointer' : 'default' }}
              >
                {item.text.split('\n').map((line, idx) => (
                  <React.Fragment key={idx}>
                    {idx === 1 && item.content ? (
                      <span style={{ textDecoration: 'underline', textDecorationColor: item.content.color, textDecorationThickness: '4px', textUnderlineOffset: '16px' }}>
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                    {idx === 0 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}

            {[
              { x: 2300, text: '1993\n마노체 탄생' },
              { x: 3300, text: '2007\n마노체 3종 파생' },
              { x: 5000, text: '2014\n마노체 5종 파생' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 845, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}

            {/* 타임라인 항목 팝업 (이상체, 미르체 등) */}
            <AnimatePresence>
              {activePopup && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  onClick={(e) => { e.stopPropagation(); setActivePopup(null); }}
                  style={{
                    position: 'absolute', left: activePopup.left, top: activePopup.top, width: '380px',
                    background: activePopup.color || '#98FB98', padding: '20px 25px', borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
                    zIndex: 200, color: '#000', pointerEvents: 'auto', cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <h3 style={{ margin: 0, fontSize: '28px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700 }}>{activePopup.title}</h3>
                    <button onClick={() => setActivePopup(null)} style={{ background: 'none', border: 'none', fontSize: '22px', cursor: 'pointer', color: '#000' }}>✕</button>
                  </div>
                  <p style={{ margin: 0, fontSize: '24px', fontFamily: 'AGahnsangsoo2012', lineHeight: 1.6, wordBreak: 'keep-all', fontWeight: 500 }}>
                    {activePopup.desc}
                  </p>
                  {activePopup.note && (
                    <p style={{ margin: '15px 0 0 0', fontSize: '20px', fontFamily: 'AGahnsangsoo2012', lineHeight: 1.5, wordBreak: 'keep-all', color: '#555' }}>
                      {activePopup.note}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            {/* 확장 이미지와 노민지 텍스트 팝업 (1985 안상수체 탄생 좌측 하단 대각선) */}
            <motion.img
              src="/image/asset_img_44.png"
              alt="확장"
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              onClick={(e) => { e.stopPropagation(); setShowNohText(prev => !prev); }}
              style={{ position: 'absolute', left: 450, top: 575, width: '140px', rotate: -90, zIndex: 100, cursor: 'pointer' }}
            />

            <AnimatePresence>
              {showNohText && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => { e.stopPropagation(); setShowNohText(false); }}
                  style={{
                    position: 'absolute', left: 700, top: 575, width: '450px',
                    background: 'rgba(255, 255, 255, 0.95)', padding: '25px', borderRadius: '10px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    fontSize: '18px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000',
                    whiteSpace: 'pre-line', lineHeight: 1.4, zIndex: 100, cursor: 'pointer'
                  }}
                >
                  시각 디자인 영역에서의 하나의 결과물이 오랫동안 쓰이는 범위는 매우 한정적이다. 1985년 발표한 안상수체는 30여년동안 다양한 방법으로 확장을 시도했다. 이 확장은 만든 이의 다양한 실험 속에서 지속되었고, 나아가 일상으로 파고들어 다양한 가능성을 열기도 했다.
                  <br/><br/>안상수체의 확장성 - 노민지
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          </motion.div>

        </section>



      </div>
      <AncheProjectModal isOpen={isAncheOpen} onClose={() => setIsAncheOpen(false)} />
    </motion.div>
  );
}
