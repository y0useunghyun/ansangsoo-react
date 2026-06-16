import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Expand() {
  const scrollRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [progress, setProgress] = useState(0);

  // 인트로 애니메이션 스텝 (0~3)
  const [step, setStep] = useState(0);

  // 타임라인 가로 패닝
  const [hPx, setHPx] = useState(0);
  const H_STEP = 1400;
  const H_MAX = 7200;
  const [navHint, setNavHint] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);

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
    if (scrollRef.current && scrollRef.current.scrollTop > scrollRef.current.clientHeight / 2) {
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
        if (step < 3) setStep(prev => prev + 1);
        else scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      } else if (isTopHalf) {
        if (step > 0) setStep(prev => prev - 1);
      }
    }
  };

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
        style={{ opacity: progress > 0.5 ? 0 : navHint === 'bot' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-label">다음</span>
        <span className="dm-nav-hint-arrow">↓</span>
      </div>
      <div
        className="dm-nav-hint dm-nav-hint--left"
        style={{ opacity: progress <= 0.5 || hPx <= 0 ? 0 : navHint === 'left' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-arrow">←</span>
        <span className="dm-nav-hint-label">이전</span>
      </div>
      <div
        className="dm-nav-hint dm-nav-hint--right"
        style={{ opacity: progress <= 0.5 || hPx >= H_MAX ? 0 : navHint === 'right' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
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
          <div style={{ width: '100%', padding: '15vh 5vw', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '50px', color: 'black', fontSize: 'clamp(22px, 2.8vw, 52px)', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, lineHeight: '1.4' }}>
              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                그런데, 1985년은 시작이었습니다.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                조사하기 전에는 안상수체가 어떻게 만들어졌는지도 몰랐고,<br/>
                굵기 3종이 처음부터 나왔을 거라고 생각했습니다. 글자체에 대해 너무 무지했던 거죠.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                그런데 조사하면서, 1985년부터 지금까지 꾸준히 변화를 시도해왔다는 걸 알게 됐습니다.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                그렇게 곁에 있었기에 눈이 갈 수 있었고, 이렇게 꾸준히 변화해왔다는 점이 대단하게 느껴졌습니다.<br/>
                그래서 그 확장에 대해서 얘기해보려고 합니다.
              </motion.div>
          </div>
        </section>

        <section
          onClick={(e) => {
            e.stopPropagation();
            if (e.clientX < window.innerWidth / 2) {
              setHPx(p => Math.max(0, p - H_STEP));
            } else {
              setHPx(p => Math.min(H_MAX, p + H_STEP));
            }
          }}
          style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', cursor: 'pointer', background: '#fff' }}
        >
          <motion.div
            animate={{ x: -(hPx * scale) }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.15, 1] }}
            style={{ position: 'absolute', top: '50%', left: 0, marginTop: `${-(1080 * scale) / 2}px`, width: `${9700 * scale}px`, height: `${1080 * scale}px` }}
          >
          <div style={{ width: '9700px', height: '1080px', position: 'absolute', top: 0, left: 0, transform: `scale(${scale})`, transformOrigin: 'top left' }}>
            <div style={{ position: 'absolute', left: 600, top: 400, width: 8400, height: 20, background: 'rgba(152, 251, 152, 0.85)' }} />
            <div style={{ position: 'absolute', left: 2700, top: 584, width: 4000, height: 16, background: 'rgba(255, 171, 225, 0.85)' }} />
            <div style={{ position: 'absolute', left: 2700, top: 734, width: 5200, height: 16, background: 'rgba(122, 235, 255, 0.85)' }} />
            <div style={{ position: 'absolute', left: 3300, top: 884, width: 4000, height: 16, background: 'rgba(255, 235, 87, 0.85)' }} />

            {[
              { x: 600,  text: '1985\n안상수체 탄생 / 오토캐드 사용' },
              { x: 2100, text: '1991\n폰토그라퍼 사용 / 3종 파생' },
              { x: 4300, text: '2006\n폰트랩 사용' },
              { x: 5800, text: '2012\n5종 파생 / 그룹커닝 사용' },
              { x: 6400, text: '2013\n둥근안상수체 탄생' },
              { x: 8600, text: '2025\n안체 프로젝트' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 361, width: 460, fontSize: 50, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}

            {[
              { x: 100,  text: '1937\n최현배의 풀어쓰기 〈한글〉 5권 5호' },
              { x: 1500, text: '1989\n장봉선의 풀어쓰기 〈한글풀어쓰기 교본〉' },
              { x: 3300, text: '1993\n조정보의 풀어쓰기 〈한글정보〉 제 5호' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 193, width: 420, fontSize: 30, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{item.text}</div>
            ))}

            {[
              { x: 2700, text: '1992\n이상체 탄생' },
              { x: 6400, text: '2013\n이상체 5종 파생' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 545, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}

            {[
              { x: 2700, text: '1992\n미르체 탄생' },
              { x: 7600, text: '2015\n미르체 6종 파생' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 695, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}

            {[
              { x: 3300, text: '1993\n마노체 탄생' },
              { x: 4900, text: '2007\n마노체 3종 파생' },
              { x: 7000, text: '2014\n마노체 5종 파생' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 845, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}
          </div>
          </motion.div>
        </section>
      </div>
    </motion.div>
  );
}
