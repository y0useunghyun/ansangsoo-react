import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AncheProjectModal from '../components/AncheProjectModal';

export default function Yu() {
  const scrollRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [progress, setProgress] = useState(0);

  // 인트로 애니메이션 스텝 (0~3)
  const [step, setStep] = useState(0);

  // 타임라인 가로 패닝
  const [hPx, setHPx] = useState(0);
  const H_STEP = 1400;
  const H_MAX = 7200;

  const [isAncheOpen, setIsAncheOpen] = useState(false);

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
      <div className="dm-header" id="dm-header" style={{ pointerEvents: 'auto', zIndex: 100 }}>
        <Link to="/" className="dm-home-btn" id="dm-home-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&lt; 홈</Link>
        <svg id="dm-progress-svg" className="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
          <defs>
            <clipPath id="dm-clip">
              <rect id="dm-clip-rect" x="0" y="0" width={clipWidth} height="97.7"/>
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
        onClick={handleViewportClick}
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
                1985년은 시작이었습니다.
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
                조사하면서, 1985년부터 지금까지 꾸준히 변화를 시도해왔다는 걸 알게 됐습니다.
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
              setHPx(p => {
                const next = p + H_STEP;
                if (next > H_MAX && scrollRef.current) {
                  scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
                  return p;
                }
                return Math.min(H_MAX, next);
              });
            }
          }}
          style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', cursor: 'pointer', background: '#fff' }}
        >
          <motion.div
            animate={{ x: -(hPx * scale) }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.15, 1] }}
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

            <div style={{ position: 'absolute', left: 400, top: 120, width: 800, fontSize: 32, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.4 }}>
              시각 디자인 영역에서의 하나의 결과물이 오랫동안 쓰이는 범위는 매우 한정적이다. 1985년 발표한 안상수체는 30여년동안 다양한 방법으로 확장을 시도했다. 이 확장은 만든 이의 다양한 실험 속에서 지속되었고, 나아가 일상으로 파고들어 다양한 가능성을 열기도 했다.
              <br/><br/>안상수체의 확장성 - 노민지
            </div>

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

        {/* 기존 사이트에서 넘어온 레거시 섹션들 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', gap: '100px', padding: '100px 5vw', boxSizing: 'border-box', backgroundColor: '#f9f9f9', color: '#000' }}>
          
          <div className="dm-section dm-section--hunmin" style={{ marginBottom: '80px' }}>
            <h2 className="dm-title hm-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>1. 글자 가족의 파생</h2>
            <p className="dm-body" style={{ fontSize: '1.5rem', lineHeight: '1.6' }}>1985년 처음 만들어진 안상수체는 1991년 한글, 로마자, 숫자, 문장부호를 갖추어 한 벌의 글자체로 완성되었다. 이후 굵기 3종, 2012년에는 5종으로 확장되었고, 2013년에는 획을 둥글게 한 '둥근 안상수체'가 설계되어 굵기 5종의 가족을 갖게 되었다.</p>
          </div>

          <div className="dm-section dm-section--hunmin" style={{ marginBottom: '80px' }}>
            <h2 className="dm-title hm-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>2. 배열의 해체</h2>
            <p className="dm-body" style={{ fontSize: '1.5rem', lineHeight: '1.6' }}>1991년 발표된 '이상체'는 안상수체의 낱글자 배열을 풀어쓰기 방식으로 해체한 글자체다. 근대 소설가이자 시인인 '이상'의 전위적·초현실주의적 작품에서 영감을 받아 설계되었으며, 모아쓰기를 기본으로 하는 한글의 개념을 탈피한 새로운 시도였다.</p>
          </div>

          <div className="dm-section dm-section--hunmin" style={{ marginBottom: '80px' }}>
            <h2 className="dm-title hm-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>3. 모듈 실험</h2>
            <p className="dm-body" style={{ fontSize: '1.5rem', lineHeight: '1.6' }}>1992년 발표된 '미르체'는 길이가 같은 정사각형 모듈을 조립해 한글의 모든 닿자와 홀자를 만들어내는 방식이다. 2015년 판올림한 미르체는 평면과 입체 같은 공간 개념을 추가로 적용했다. 1993년 발표된 '마노체'는 일정한 길이와 굵기의 선과 원이 반복되는 비례 규칙으로 닿자와 홀자를 만들어낸다.</p>
          </div>

          <div className="dm-section dm-section--hunmin" style={{ marginBottom: '80px' }}>
            <h2 className="dm-title hm-title" style={{ fontSize: '3rem', marginBottom: '20px' }}>4. 기술의 발달</h2>
            <div className="hm-img-wrap" style={{ marginBottom: '30px', textAlign: 'center' }}>
              <img src="/image/조형특징2.svg" className="hm-img" alt="조형특징" style={{ width: '100%', maxWidth: '800px', height: 'auto', objectFit: 'contain' }} />
            </div>
            <p className="dm-body" style={{ fontSize: '1.5rem', lineHeight: '1.6' }}>1985년 처음 만들어진 안상수체는 건축 설계용 프로그램 '오토캐드'로 설계되었다. 1991년에는 '폰토그라퍼'를 통해 영문과 기호를 추가해 한 벌의 폰트로 완성했고, 2012년 판올림에서는 '폰트랩'을 사용해 국내 최초로 '한글 그룹 커닝' 기술을 적용했다.</p>
          </div>
          
        </section>

      </div>
      <AncheProjectModal isOpen={isAncheOpen} onClose={() => setIsAncheOpen(false)} />
    </motion.div>
  );
}
