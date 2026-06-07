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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    setProgress(p);
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
          <path d="M56.8,31c-4-3.1-8.8-4.7-14-4.7-12.6,0-22.6,10.1-22.6,22.6s10.1,22.6,22.6,22.6,10.1-1.8,14-4.8v9.9h8.8V21.1h-8.8v9.9ZM42.8,62.6c-7.5,0-13.7-6.1-13.7-13.7s6.1-13.5,13.7-13.5,13.8,5.9,13.8,13.5-6.3,13.7-13.8,13.7Z"/>
          <g clipPath="url(#dm-clip)">
            <g id="dm-bars">
              <rect x="75.1" y="32.6" width="8.8" height="32.9"/><rect x="93.4" y="32.6" width="8.8" height="32.9"/><rect x="111.8" y="32.6" width="8.8" height="32.9"/><rect x="130.1" y="32.6" width="8.8" height="32.9"/><rect x="148.4" y="32.6" width="8.8" height="32.9"/><rect x="166.7" y="32.6" width="8.8" height="32.9"/><rect x="185.1" y="32.6" width="8.8" height="32.9"/><rect x="203.4" y="32.6" width="8.8" height="32.9"/><rect x="221.7" y="32.6" width="8.8" height="32.9"/><rect x="240" y="32.6" width="8.8" height="32.9"/>
              <rect x="258.4" y="32.6" width="8.8" height="32.9"/><rect x="276.7" y="32.6" width="8.8" height="32.9"/><rect x="295" y="32.6" width="8.8" height="32.9"/><rect x="313.3" y="32.6" width="8.8" height="32.9"/><rect x="331.7" y="32.6" width="8.8" height="32.9"/><rect x="350" y="32.6" width="8.8" height="32.9"/><rect x="368.3" y="32.6" width="8.8" height="32.9"/><rect x="386.6" y="32.6" width="8.8" height="32.9"/><rect x="405" y="32.6" width="8.8" height="32.9"/><rect x="423.3" y="32.6" width="8.8" height="32.9"/>
              <rect x="441.6" y="32.6" width="8.8" height="32.9"/><rect x="459.9" y="32.6" width="8.8" height="32.9"/><rect x="478.3" y="32.6" width="8.8" height="32.9"/><rect x="496.6" y="32.6" width="8.8" height="32.9"/><rect x="514.9" y="32.6" width="8.8" height="32.9"/><rect x="533.2" y="32.6" width="8.8" height="32.9"/><rect x="551.6" y="32.6" width="8.8" height="32.9"/><rect x="569.9" y="32.6" width="8.8" height="32.9"/><rect x="588.2" y="32.6" width="8.8" height="32.9"/><rect x="606.5" y="32.6" width="8.8" height="32.9"/>
              <rect x="624.8" y="32.6" width="8.8" height="32.9"/><rect x="643.2" y="32.6" width="8.8" height="32.9"/><rect x="661.5" y="32.6" width="8.8" height="32.9"/><rect x="679.8" y="32.6" width="8.8" height="32.9"/><rect x="698.1" y="32.6" width="8.8" height="32.9"/><rect x="716.5" y="32.6" width="8.8" height="32.9"/><rect x="734.8" y="32.6" width="8.8" height="32.9"/><rect x="753.1" y="32.6" width="8.8" height="32.9"/><rect x="771.4" y="32.6" width="8.8" height="32.9"/><rect x="789.8" y="32.6" width="8.8" height="32.9"/>
              <rect x="808.1" y="32.6" width="8.8" height="32.9"/><rect x="826.4" y="32.6" width="8.8" height="32.9"/><rect x="844.7" y="32.6" width="8.8" height="32.9"/><rect x="863.1" y="32.6" width="8.8" height="32.9"/><rect x="881.4" y="32.6" width="8.8" height="32.9"/><rect x="899.7" y="32.6" width="8.8" height="32.9"/><rect x="918" y="32.6" width="8.8" height="32.9"/><rect x="936.4" y="32.6" width="8.8" height="32.9"/><rect x="954.7" y="32.6" width="8.8" height="32.9"/><rect x="973" y="32.6" width="8.8" height="32.9"/>
              <rect x="991.3" y="32.6" width="8.8" height="32.9"/><rect x="1009.7" y="32.6" width="8.8" height="32.9"/><rect x="1028" y="32.6" width="8.8" height="32.9"/><rect x="1046.3" y="32.6" width="8.8" height="32.9"/><rect x="1064.6" y="32.6" width="8.8" height="32.9"/><rect x="1083" y="32.6" width="8.8" height="32.9"/><rect x="1101.3" y="32.6" width="8.8" height="32.9"/><rect x="1119.6" y="32.6" width="8.8" height="32.9"/><rect x="1137.9" y="32.6" width="8.8" height="32.9"/><rect x="1156.2" y="32.6" width="8.8" height="32.9"/>
              <rect x="1174.6" y="32.6" width="8.8" height="32.9"/><rect x="1192.9" y="32.6" width="8.8" height="32.9"/><rect x="1211.2" y="32.6" width="8.8" height="32.9"/><rect x="1229.5" y="32.6" width="8.8" height="32.9"/><rect x="1247.9" y="32.6" width="8.8" height="32.9"/><rect x="1266.2" y="32.6" width="8.8" height="32.9"/><rect x="1284.5" y="32.6" width="8.8" height="32.9"/><rect x="1302.8" y="32.6" width="8.8" height="32.9"/><rect x="1321.2" y="32.6" width="8.8" height="32.9"/><rect x="1339.5" y="32.6" width="8.8" height="32.9"/>
              <rect x="1357.8" y="32.6" width="8.8" height="32.9"/><rect x="1376.1" y="32.6" width="8.8" height="32.9"/><rect x="1394.5" y="32.6" width="8.8" height="32.9"/><rect x="1412.8" y="32.6" width="8.8" height="32.9"/><rect x="1431.1" y="32.6" width="8.8" height="32.9"/><rect x="1449.4" y="32.6" width="8.8" height="32.9"/><rect x="1467.8" y="32.6" width="8.8" height="32.9"/><rect x="1486.1" y="32.6" width="8.8" height="32.9"/><rect x="1504.4" y="32.6" width="8.8" height="32.9"/><rect x="1522.7" y="32.6" width="8.8" height="32.9"/>
              <rect x="1541.1" y="32.6" width="8.8" height="32.9"/><rect x="1559.4" y="32.6" width="8.8" height="32.9"/><rect x="1577.7" y="32.6" width="8.8" height="32.9"/><rect x="1596" y="32.6" width="8.8" height="32.9"/><rect x="1614.4" y="32.6" width="8.8" height="32.9"/><rect x="1632.7" y="32.6" width="8.8" height="32.9"/><rect x="1651" y="32.6" width="8.8" height="32.9"/><rect x="1669.3" y="32.6" width="8.8" height="32.9"/><rect x="1687.7" y="32.6" width="8.8" height="32.9"/><rect x="1706" y="32.6" width="8.8" height="32.9"/>
              <rect x="1724.3" y="32.6" width="8.8" height="32.9"/><rect x="1742.6" y="32.6" width="8.8" height="32.9"/><rect x="1760.9" y="32.6" width="8.8" height="32.9"/><rect x="1779.3" y="32.6" width="8.8" height="32.9"/><rect x="1797.6" y="32.6" width="8.8" height="32.9"/><rect x="1815.9" y="32.6" width="8.8" height="32.9"/><rect x="1834.2" y="32.6" width="8.8" height="32.9"/>
            </g>
          </g>
          <g id="dm-right-d" transform={`translate(${rightDTranslateX},0)`} style={{ opacity: rightDOpacity }}>
            <path d="M1861.4,21.1h-8.8s0,55.5,0,55.5h8.8s0-9.9,0-9.9c4,3.1,8.8,4.8,14,4.8,12.6,0,22.6-10.1,22.6-22.6,0-12.6-10.1-22.6-22.6-22.6s-10.1,1.6-14,4.7v-9.9ZM1861.6,49c0-7.5,6.3-13.5,13.8-13.5s13.7,5.9,13.7,13.5c0,7.5-6.1,13.7-13.7,13.7s-13.8-6.1-13.8-13.7Z"/>
          </g>
        </svg>
      </div>

      <style>{`.song-scroll > section { scroll-snap-align: start; min-height: 100vh; }`}</style>

      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={handleScrollClick}
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
              <img src="/image/학.svg" alt="학 도면" className="dev1984-img" style={{ pointerEvents: 'none' }} />
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
