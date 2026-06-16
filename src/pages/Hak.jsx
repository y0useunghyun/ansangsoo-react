import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Hak() {
  const scrollRef = useRef(null);
  // ── 퍼즐 게임 로직 ──
  const ORIGINAL_STEPS = [
    { id: 1, title: '프레임 만들기', body: '모든 문자를 구성할 격자를 설정하고, 기본 틀을 만든다.' },
    { id: 2, title: '낱음 요소의 분석', body: '44자를 최소 단위로 설정하고 조합으로 구현했다.' },
    { id: 3, title: '직선의 처리', body: '첫닿자·홀자·받침의 외곽선을 폴리라인으로 변환했다.' },
    { id: 4, title: '곡선의 처리', body: '원호를 사용해 외곽선을 처리했다. ㅁ·ㅅ은 정밀 처리했다.' },
    { id: 5, title: '글자의 조합', body: '확정된 자소를 조합하여 11,172자를 파생하는 구조 검증.' },
    { id: 6, title: '하드카피', body: '플로터로 출력하고, 수정 사인펜으로 일일이 보정했다.' }
  ];

  const [slots, setSlots] = useState([null, null, null, null, null, null]); 
  const [deck, setDeck] = useState([]);
  const [status, setStatus] = useState('playing'); // playing, correct, incorrect

  useEffect(() => {
    // 마운트 시 카드 섞기
    const shuffled = [...ORIGINAL_STEPS].sort(() => Math.random() - 0.5);
    setDeck(shuffled);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (slots.every(s => s !== null)) {
      const isCorrect = slots.every((s, i) => s.id === i + 1);
      if (isCorrect) {
        setStatus('correct');
      } else {
        setStatus('incorrect');
        setTimeout(() => {
          setSlots([null, null, null, null, null, null]);
          const shuffled = [...ORIGINAL_STEPS].sort(() => Math.random() - 0.5);
          setDeck(shuffled);
          setStatus('playing');
        }, 1500);
      }
    } else {
      setStatus('playing');
    }
  }, [slots]);

  const handleDeckClick = (step) => {
    if (status === 'correct' || status === 'incorrect') return;
    const firstEmptyIndex = slots.findIndex(s => s === null);
    if (firstEmptyIndex !== -1) {
      const newSlots = [...slots];
      newSlots[firstEmptyIndex] = step;
      setSlots(newSlots);
      setDeck(deck.filter(s => s.id !== step.id));
    }
  };

  const handleSlotClick = (step, index) => {
    if (status === 'correct' || status === 'incorrect' || !step) return;
    const newSlots = [...slots];
    newSlots[index] = null;
    setSlots(newSlots);
    setDeck([...deck, step]);
  };

  const showAnswer = () => {
    setSlots([...ORIGINAL_STEPS]);
    setDeck([]);
    setStatus('correct');
  };

  const [progress, setProgress] = useState(0);
  const [navHint, setNavHint] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      setTotalSections(scrollRef.current.querySelectorAll('section').length);
    }
  }, []);

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

  const handleMouseMove = (e) => {
    setNavHint(e.clientY < window.innerHeight / 2 ? 'top' : 'bot');
  };

  const handleScrollClick = (e) => {
    // 인터랙션 요소(버튼, 퍼즐 조각 등) 클릭 시에는 무시
    if (e.target.closest('button, a, [style*="cursor: pointer"]')) return;
    
    const dmScroll = scrollRef.current;
    if (!dmScroll) return;

    const sections = dmScroll.querySelectorAll('section');
    const scrollTop = dmScroll.scrollTop;
    const isUpperHalf = e.clientY < window.innerHeight / 2;

    if (isUpperHalf) {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop < scrollTop - 50) {
          dmScroll.scrollTo({ top: sections[i].offsetTop, behavior: 'smooth' });
          return;
        }
      }
    } else {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop > scrollTop + 50) {
          dmScroll.scrollTo({ top: sections[i].offsetTop, behavior: 'smooth' });
          return;
        }
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
      <div className="dm-header" id="dm-header" style={{ pointerEvents: 'auto', zIndex: 100, position: 'absolute', top: 0, width: '100%', '--progress': `${progress * 100}%` }}>
        <Link to="/" className="dm-home-btn" id="dm-home-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&lt; 홈</Link>
        <svg id="dm-progress-svg" className="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
          <defs>
            <clipPath id="dm-clip">
              <rect id="dm-clip-rect" x="0" y="0" width={clipWidth} height="97.7" />
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

      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={handleScrollClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setNavHint(null)}
        className="song-scroll"
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          position: 'relative',
          scrollSnapType: 'y mandatory',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 150px)',
          maskImage: 'linear-gradient(to bottom, transparent 0px, black 150px)'
        }}
      >
        {/* 첫 번째 섹션: 오리지널 개발 과정 소개 */}
        <section style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="dm-section dm-section--dev1984" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="dm-title dev1984-title">안상수체 1984 개발 과정</h2>
            <div className="dev1984-img-wrap" title="클릭하여 아래로 이동">
              <img src="/image/asset_img_40.svg" alt="학 도면" className="dev1984-img" style={{ pointerEvents: 'none' }} />
              <div className="dev1984-highlight" style={{ pointerEvents: 'none' }}>
                <p>"당시 오토캐드는 기계 제도 및 건축 설계용으로만 쓰였으나, 이를 잘 이용하면<br/>글자 디자인에 매우 도움이 되겠다 싶어 매뉴얼을 구해 체득해나갔다."</p>
              </div>
            </div>
          </div>
        </section>

        {/* 두 번째 섹션: 퍼즐 게임 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', boxSizing: 'border-box', backgroundColor: '#fafafa', alignItems: 'center', justifyContent: 'center', padding: isMobile ? '60px 0 20px' : '0' }}>

          <h2 style={{ fontFamily: 'AGahnsangsoo2012', textAlign: 'center', fontSize: isMobile ? '1.1rem' : '3rem', marginBottom: isMobile ? '12px' : '20px', marginTop: isMobile ? '0' : '-40px', padding: isMobile ? '0 16px' : '0' }}>
            안상수체 개발 과정에 맞게 순서를 조립해보세요
          </h2>

          <div style={{ width: isMobile ? '96%' : '90%', maxWidth: '1200px', position: 'relative' }}>
            {/* 6개 슬롯 영역 (일자 배치) */}
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: isMobile ? '8px' : '10px', marginBottom: '60px' }}>
              {slots.map((s, idx) => (
                <motion.div
                  key={`slot-${idx}`}
                  onClick={() => handleSlotClick(s, idx)}
                  whileHover={s ? { scale: 0.98 } : {}}
                  style={{
                    height: isMobile ? '90px' : '140px',
                    border: '3px solid #000',
                    backgroundColor: s ? '#fff' : 'transparent',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: isMobile ? '6px' : '10px',
                    cursor: s && status !== 'correct' ? 'pointer' : 'default',
                    position: 'relative',
                    boxShadow: s ? '4px 4px 0px #000' : 'none'
                  }}
                >
                  {!s && <span style={{ fontSize: isMobile ? '20px' : '40px', color: '#ccc', fontFamily: 'AGahnsangsoo2012' }}>{idx + 1}</span>}
                  {s && (
                    <>
                      <div style={{ fontWeight: 'bold', fontSize: isMobile ? '11px' : '24px', marginBottom: '2px', fontFamily: 'AGahnsangsoo2012', textAlign: 'center' }}>{s.title}</div>
                      <div style={{ fontSize: isMobile ? '9px' : '18px', color: '#444', textAlign: 'center', lineHeight: '1.3', wordBreak: 'keep-all', fontFamily: 'AGahnsangsoo2012' }}>{s.body}</div>
                    </>
                  )}
                </motion.div>
              ))}
            </div>

            {/* 덱 영역 (일자 배치) */}
            <div style={{ borderTop: '2px dashed #ccc', paddingTop: '40px', position: 'relative' }}>
              <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(6, 1fr)', gap: isMobile ? '8px' : '10px' }}>
                {deck.map((s) => (
                  <motion.div
                    key={s.id}
                    onClick={() => handleDeckClick(s)}
                    whileHover={{ scale: 1.05, y: -5 }}
                    style={{
                      height: isMobile ? '90px' : '140px',
                      border: '1px solid #999',
                      backgroundColor: '#fff',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: isMobile ? '6px' : '10px',
                      cursor: 'pointer',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                    }}
                  >
                    <div style={{ fontWeight: 'bold', fontSize: isMobile ? '11px' : '24px', marginBottom: '2px', fontFamily: 'AGahnsangsoo2012', textAlign: 'center' }}>{s.title}</div>
                    <div style={{ fontSize: isMobile ? '9px' : '18px', color: '#444', textAlign: 'center', lineHeight: '1.3', wordBreak: 'keep-all', fontFamily: 'AGahnsangsoo2012' }}>{s.body}</div>
                  </motion.div>
                ))}
              </div>

              {deck.length === 0 && status === 'incorrect' && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{ textAlign: 'center', color: 'red', fontSize: '24px', fontWeight: 'bold', fontFamily: 'AGahnsangsoo2012', marginTop: '30px' }}
                >
                  조립 실패! 순서가 다릅니다.
                </motion.div>
              )}
              {status === 'correct' && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', bounce: 0.5 }}
                  style={{ textAlign: 'center', color: '#7aeb7a', fontSize: '32px', fontWeight: 'bold', fontFamily: 'AGahnsangsoo2012', marginTop: '30px' }}
                >
                  🎉 도면 완성! 완벽하게 조립하셨습니다.
                </motion.div>
              )}
            </div>

            <div style={{ position: 'absolute', bottom: '-70px', right: '0' }}>
              <button 
                onClick={showAnswer}
                className="start-btn"
                style={{ fontFamily: 'AGahnsangsoo2012', fontSize: '20px', padding: '10px 30px' }}
              >
                정답 보기
              </button>
            </div>
          </div>
        </section>
      </div>
    </motion.div>
  );
}
