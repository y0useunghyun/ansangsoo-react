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
  const [progress, setProgress] = useState(0);
  const [isAncheOpen, setIsAncheOpen] = useState(false);

  useEffect(() => {
    // 1920x1080 컨테이너를 화면에 꽉 차게 비율 유지하며 축소/확대
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY) * 0.9); // 약간의 여백(0.9)을 줌
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 내부 스크롤 컨테이너의 스크롤 프로그레스 계산 로직
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    setProgress(p);



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
      if (isPage1 && step < 3) {
        if (step === 0) setShowPopup(true);
        if (step === 1) setShowPopup(false);
        setStep(prev => prev + 1);
      } else if (isPage2 && step2 < 2) {
        setStep2(prev => prev + 1);
      } else {
        scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    } else if (isTopHalf) {
      if (isPage2 && step2 > 0) {
        setStep2(prev => prev - 1);
      } else if (isPage1 && step > 0) {
        if (step === 1) setShowPopup(false);
        if (step === 2) setShowPopup(true);
        setStep(prev => prev - 1);
      } else {
        scrollRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const handleNameClick = (e) => {
    e.stopPropagation(); // 배경 클릭(스크롤/step 증가) 방지
    setShowPopup(prev => !prev);
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
      <div className="dm-header" id="dm-header" style={{ pointerEvents: 'auto', zIndex: 100 }}>
        <Link to="/" className="dm-home-btn" id="dm-home-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>&lt; 홈</Link>
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

      {/* 내부 스크롤 영역 */}
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
        {/* 1번 페이지: 안상수체 인용구 (클릭 인터랙션) */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '1920px', height: '1080px', position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <div data-layer="인용구" style={{ position: 'absolute', left: '50px', top: '200px', width: '1567px', display: 'flex', flexDirection: 'column', gap: '50px', color: 'black', fontSize: '64px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, wordWrap: 'break-word', textAlign: 'left', lineHeight: '1.4' }}>
              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                여러분들은 좋아하는 글자체가 있으신가요?
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'relative' }}
              >
                {/* 각주 팝업 (fn-card 스타일) & 천천히 깜빡이는 효과 */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: showPopup ? 1 : 0, y: showPopup ? 0 : 10, scale: showPopup ? 1 : 0.98 }}
                  transition={{ duration: 0.4 }}
                  style={{ 
                    position: 'absolute', 
                    top: '-160px', 
                    left: '100px', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '60px', 
                    alignItems: 'center',
                    padding: '30px 50px',
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
                    <div style={{ color: 'black', fontSize: '56px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, lineHeight: '1' }}>송명선</div>
                    <div style={{ color: 'black', fontSize: '18px', fontFamily: 'var(--font-onul)', fontWeight: 700, letterSpacing: '1px' }}>안상수체</div>
                  </div>
                  
                  {/* 구분선 */}
                  <div style={{ width: '2px', height: '60px', background: 'rgba(0,0,0,0.2)' }} />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: 'black', fontSize: '46px', fontFamily: 'Pretendard', fontWeight: 700, lineHeight: '1', transform: 'translateY(5px)' }}>송명선</div>
                    <div style={{ color: 'black', fontSize: '18px', fontFamily: 'var(--font-onul)', fontWeight: 700, letterSpacing: '1px' }}>Pretendard</div>
                  </div>
                </motion.div>

                저는 <span className="dm-u" style={{ textUnderlineOffset: '18px' }} onClick={handleNameClick}>제 이름을</span> 쓰다가 안상수체를 좋아하게 됐습니다.
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                네모틀 글자들도 매력있는 글자체가 많지만,<br/>
                제 이름을 귀엽게 써주는 글자체는 안상수체가 제일 좋았습니다.
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                그 후로 저는 안상수체가 제일 좋아하는 글자체가 되었습니다.
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2번 페이지: 새로운 질문과 4단 탈네모틀 폰트 비교 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
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
          <div style={{ width: '1920px', height: '1080px', position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            
            {/* 시네마틱 카메라 줌 컨테이너 */}
            <motion.div
              animate={{
                x: step2 >= 1 ? 710 : 0,
                y: step2 >= 1 ? -75 : 0,
                scale: step2 >= 1 ? 4.5 : 1
              }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, transformOrigin: '250px 615px' }}
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
                다른 탈네모틀 글자체와 달리 한눈에 보인 차이점은, 안상수체는 첫 닿자와 받침의 형태를 같이 쓰고, 홀자의 위치를 가운데로 맞추어 아주 단순한 구조라는 것이다.<br/><br/>이 부분이 송명선이라는 이름을 더 귀엽게 보여주는 이유였다.
              </p>
            </motion.div>

          </div>
        </section>
      </div>

      <AncheProjectModal isOpen={isAncheOpen} onClose={() => setIsAncheOpen(false)} />
    </motion.div>
  );
}
