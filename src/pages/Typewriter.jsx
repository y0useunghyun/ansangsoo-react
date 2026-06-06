import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TypewriterIntro({ onClose }) {
  const [step, setStep] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [showSimulator, setShowSimulator] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState(null);
  const initDone = useRef(false);

  const lines = [
    "1949년, 한 안과의사가 한글 타자기의 역사를 바꿔놓았습니다.",
    "공병우 박사는 한글 자모 구조를 분석해 세벌식 배열을 고안했습니다.",
    "초성, 중성, 종성을 각각 다른 손가락 영역에 배치한 것이 핵심이었습니다.",
    "글쇠 하나가 한 가지 기능만 담당해 타이핑이 빠르고 오류가 적었습니다.",
    "세벌식 타자기는 1950~80년대 대한민국 사무실을 지배했습니다.",
    "그 논리적이고 모듈적인 구조는 훗날 안상수 선생의 탈네모틀 서체 설계에도 영감을 주었습니다.",
  ];

  const suggestions = [
    { person: "안상수 인터뷰", text: "기역은 똑같은 기역이라는 게 한글의 개념이다" },
    { person: "안상수 인터뷰", text: "단순하고 쉽다는 한글의 정신에도 어울린다" },
    { person: "안상수 인터뷰", text: "내 이름을 걸었으니 소홀히 하기 어렵겠다" },
    { person: "오프닝 스토리", text: "이 웹페이지는 기리고 싶은 마음에 제작된 것입니다" },
    { person: "훈민정음 섹션", text: "안상수체의 간결함은 훈민정음 창제 원리에 근거한다" },
  ];

  const handleScreenClick = () => {
    if (step < lines.length && !isExiting) {
      setStep(prev => prev + 1);
    }
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    setIsExiting(true);
    setTimeout(() => {
      setShowSimulator(true);
    }, 900);
  };

  useEffect(() => {
    if (!showSimulator) return;
    const btn = document.getElementById('tj-restore-btn');
    const handler = () => setSelectedPrompt(null);
    btn?.addEventListener('click', handler);
    return () => btn?.removeEventListener('click', handler);
  }, [showSimulator]);

  useEffect(() => {
    if (showSimulator && !initDone.current) {
      initDone.current = true;
      // dp-in 클래스 추가해야 app.js 키보드 이벤트가 작동함
      const tajagi = document.getElementById('detail-tajagi');
      if (tajagi) tajagi.classList.add('dp-in');
      // 프로그레스바 100% 채우기
      const clipRect = document.getElementById('dm-clip-rect');
      const rightD = document.getElementById('dm-right-d');
      if (clipRect) clipRect.setAttribute('width', '1843');
      if (rightD) {
        rightD.setAttribute('transform', 'translate(0,0)');
        rightD.style.opacity = '1';
      }
      if (typeof window.initTajagiSimulatorEvents === 'function') {
        window._tajagiInitialized = false;
        window.initTajagiSimulatorEvents();
      }
    }
    if (!showSimulator) {
      // 닫힐 때 dp-in 제거 + 프로그레스바 원상복구
      const tajagi = document.getElementById('detail-tajagi');
      if (tajagi) tajagi.classList.remove('dp-in');
      const clipRect = document.getElementById('dm-clip-rect');
      const rightD = document.getElementById('dm-right-d');
      if (clipRect) clipRect.setAttribute('width', '0');
      if (rightD) {
        rightD.setAttribute('transform', 'translate(-1843,0)');
        rightD.style.opacity = '0';
      }
    }
  }, [showSimulator]);

  const isFinished = step >= lines.length;
  const vh = typeof window !== 'undefined' ? window.innerHeight : 1000;
  const rawY = (vh * 0.7) - (step * 90);
  const targetY = Math.max(120, rawY);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: '#ffffff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'agahnsangsoo2012, sans-serif',
        cursor: !isFinished && !showSimulator ? 'pointer' : 'default'
      }}
      onClick={!showSimulator ? handleScreenClick : undefined}
    >
      <div className="dm-header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, display: 'flex', alignItems: 'center' }}>
        <button
          className="dm-home-btn"
          onClick={onClose}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'agahnsangsoo2012, sans-serif' }}
        >
          &lt; 홈
        </button>
        <svg id="dm-progress-svg" className="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none" style={{ pointerEvents: 'none', position: 'absolute', top: 0, left: 0, width: '100%' }}>
          <defs>
            <clipPath id="dm-clip">
              <rect id="dm-clip-rect" x="0" y="0" width="0" height="97.7" style={{ transition: 'width 1s ease' }} />
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
          <g id="dm-right-d" transform="translate(-1843,0)" style={{ opacity: 0, transition: 'transform 1s ease, opacity 1s ease' }}>
            <path d="M1861.4,21.1h-8.8s0,55.5,0,55.5h8.8s0-9.9,0-9.9c4,3.1,8.8,4.8,14,4.8,12.6,0,22.6-10.1,22.6-22.6,0-12.6-10.1-22.6-22.6-22.6s-10.1,1.6-14,4.7v-9.9ZM1861.6,49c0-7.5,6.3-13.5,13.8-13.5s13.7,5.9,13.7,13.5c0,7.5-6.1,13.7-13.7,13.7s-13.8-6.1-13.8-13.7Z"/>
          </g>
        </svg>
      </div>

      {/* ─── 종이 인트로 ─── */}
      <AnimatePresence>
        {!showSimulator && (
          <motion.div
            key="paper"
            initial={{ x: '-50%', y: vh * 0.7 }}
            animate={{ y: isExiting ? -vh * 1.5 : targetY, x: '-50%' }}
            exit={{ y: -vh * 1.5, x: '-50%' }}
            transition={
              isExiting
                ? { duration: 0.9, ease: 'easeInOut' }
                : { duration: 0.4, type: 'spring', stiffness: 200, damping: 20 }
            }
            style={{
              width: '100%',
              maxWidth: '1200px',
              backgroundColor: '#e3fceb',
              boxShadow: '0 -10px 40px rgba(0,0,0,0.1)',
              borderRadius: '12px',
              padding: '80px',
              paddingBottom: '80px',
              position: 'absolute',
              top: 0,
              left: '50%',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 10
            }}
          >
            <div style={{ position: 'relative', zIndex: 10 }}>
              <h1 style={{ fontSize: '72px', margin: '0 0 50px 0', fontWeight: 'normal' }}>
                세벌식 타자기는?
              </h1>
              <div style={{ fontSize: '32px', lineHeight: '60px', color: '#111', whiteSpace: 'pre-wrap', wordBreak: 'keep-all' }}>
                {lines.map((line, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: index < step ? 1 : 0 }}
                    transition={{ duration: 0.1 }}
                  >
                    {line}
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isFinished && !isExiting ? 1 : 0 }}
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '60px',
                position: 'relative',
                zIndex: 10,
                pointerEvents: isFinished && !isExiting ? 'auto' : 'none'
              }}
            >
              <motion.button
                onClick={handleNextClick}
                style={{
                  padding: '16px 80px',
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '40px',
                  fontSize: '28px',
                  cursor: 'pointer',
                  fontFamily: 'agahnsangsoo2012',
                  boxShadow: '0 10px 20px rgba(0,0,0,0.1)'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                다음
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── 세벌식 타자기 체험 (같은 화면에 자연스럽게 등장) ─── */}
      <AnimatePresence>
        {showSimulator && (
          <motion.div
            key="simulator"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: 0,
              background: 'transparent'
            }}
          >
            <div id="detail-tajagi" className="detail-page" tabIndex="-1" style={{ display: 'flex', opacity: 1, pointerEvents: 'auto', position: 'fixed', top: '102px', left: 0, right: 0, bottom: 0, zIndex: 50, background: '#ffffff', flexDirection: 'column' }}>


              <div className="tj-intro-fn" id="tj-intro" style={selectedPrompt ? { color: '#bbb' } : {}}>
                {selectedPrompt ? selectedPrompt.text : (
                  <>
                    세벌식 자판은 초성, 중성, 종성(받침) 글쇠가 각각 다른 자리에 배열된 한글 타자판입니다.<br/>
                    한글의 창제 원리인 '모아쓰기'를 기계 구조에 적용한 공병우 박사의 세벌식 타자기는
                    글쇠를 누르는 순서대로 글자가 조합되어 타자 속도가 빠르고 리듬감 있게 글을 쓸 수 있었습니다.
                    이는 이후 안상수체의 기하학적인 탈네모틀 글자꼴 설계에도 큰 영감을 주었습니다.<br/>
                    아래 타자판에서 세벌식 자판의 독특한 배열을 직접 체험해 보세요.
                  </>
                )}
              </div>

              <div className="tj-actions" id="tj-actions">
                <button id="tj-restore-btn" className="tj-action-btn">새로고침</button>
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <button
                    className="tj-action-btn"
                    onClick={() => setShowSuggestions(s => !s)}
                  >
                    예시 글줄 {showSuggestions ? '▲' : '▼'}
                  </button>
                  {showSuggestions && (
                    <div style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: '#fff',
                      border: '1px solid #e0e0e0',
                      borderRadius: '10px',
                      boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
                      zIndex: 200,
                      minWidth: '280px',
                      marginTop: '6px',
                      overflow: 'hidden',
                    }}>
                      {suggestions.map((s, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setSelectedPrompt(s);
                            setShowSuggestions(false);
                          }}
                          style={{
                            display: 'block',
                            width: '100%',
                            padding: '12px 16px',
                            background: 'none',
                            border: 'none',
                            borderBottom: i < suggestions.length - 1 ? '1px solid #f0f0f0' : 'none',
                            cursor: 'pointer',
                            textAlign: 'left',
                            fontFamily: 'agahnsangsoo2012, sans-serif',
                          }}
                        >
                          <div style={{ fontSize: '11px', color: '#999', marginBottom: '3px' }}>{s.person}</div>
                          <div style={{ fontSize: '15px', color: '#111' }}>{s.text}</div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button id="tj-start-btn" className="tj-action-btn">직접 입력해보기</button>
              </div>
              <div className="tj-output-wrap">
                <div className="tj-output" id="tj-output">
                  <div className="tj-text" id="tj-text"></div>
                </div>
              </div>
              <input type="text" id="tj-mobile-input" className="tj-mobile-input"
                autoComplete="off" autoCorrect="off" autoCapitalize="none"
                spellCheck="false" inputMode="text" />

              <div className="tj-keyboard-wrap" id="tj-keyboard-wrap">
                <div className="tj-keyboard" id="tj-keyboard-inner">
                  <div className="tj-legend">
                    <div className="tj-legend-item"><div className="tj-legend-dot tj-legend-dot--cho"></div>초성</div>
                    <div className="tj-legend-item"><div className="tj-legend-dot tj-legend-dot--jung"></div>중성</div>
                    <div className="tj-legend-item"><div className="tj-legend-dot tj-legend-dot--jong"></div>종성(받침)</div>
                  </div>

                  {/* Row 1 */}
                  <div className="tj-kb-row">
                    <div className="tj-key tj-key--sym" data-key="`"><span className="tj-key-shift">~</span><span className="tj-key-jamo">₩</span></div>
                    <div className="tj-key" data-key="1" data-type="jong"><span className="tj-key-shift">!</span><span className="tj-key-jamo">ㅎ</span></div>
                    <div className="tj-key" data-key="2" data-type="jong"><span className="tj-key-shift">@</span><span className="tj-key-jamo">ㅆ</span></div>
                    <div className="tj-key" data-key="3" data-type="jong"><span className="tj-key-shift">#</span><span className="tj-key-jamo">ㅂ</span></div>
                    <div className="tj-key" data-key="4" data-type="jung"><span className="tj-key-shift">$</span><span className="tj-key-jamo">ㅛ</span></div>
                    <div className="tj-key" data-key="5" data-type="jung"><span className="tj-key-shift">%</span><span className="tj-key-jamo">ㅠ</span></div>
                    <div className="tj-key" data-key="6" data-type="jung"><span className="tj-key-shift">^</span><span className="tj-key-jamo">ㅑ</span></div>
                    <div className="tj-key" data-key="7" data-type="jung"><span className="tj-key-shift">&amp;</span><span className="tj-key-jamo">ㅖ</span></div>
                    <div className="tj-key" data-key="8" data-type="jung"><span className="tj-key-shift">*</span><span className="tj-key-jamo">ㅢ</span></div>
                    <div className="tj-key" data-key="9" data-type="jung"><span className="tj-key-shift">(</span><span className="tj-key-jamo">ㅜ</span></div>
                    <div className="tj-key" data-key="0" data-type="cho"><span className="tj-key-shift">)</span><span className="tj-key-jamo">ㅋ</span></div>
                    <div className="tj-key tj-key--sym" data-key="-"><span className="tj-key-shift">_</span><span className="tj-key-jamo">-</span></div>
                    <div className="tj-key tj-key--sym" data-key="="><span className="tj-key-shift">+</span><span className="tj-key-jamo">=</span></div>
                    <div className="tj-key tj-key--wide tj-key--sym" data-key="Backspace"><span className="tj-key-jamo">⌫</span></div>
                  </div>

                  {/* Row 2 */}
                  <div className="tj-kb-row">
                    <div className="tj-key tj-key--wide tj-key--sym" data-key="Tab"><span className="tj-key-jamo">Tab</span></div>
                    <div className="tj-key" data-key="q" data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅅ</span></div>
                    <div className="tj-key" data-key="w" data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄹ</span></div>
                    <div className="tj-key" data-key="e" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅕ</span></div>
                    <div className="tj-key" data-key="r" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅐ</span></div>
                    <div className="tj-key" data-key="t" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅓ</span></div>
                    <div className="tj-key" data-key="y" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄹ</span></div>
                    <div className="tj-key" data-key="u" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄷ</span></div>
                    <div className="tj-key" data-key="i" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅁ</span></div>
                    <div className="tj-key" data-key="o" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅊ</span></div>
                    <div className="tj-key" data-key="p" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅍ</span></div>
                    <div className="tj-key tj-key--sym" data-key="["><span className="tj-key-shift">{'{'}</span><span className="tj-key-jamo">[</span></div>
                    <div className="tj-key tj-key--sym" data-key="]"><span className="tj-key-shift">{'}'}</span><span className="tj-key-jamo">]</span></div>
                    <div className="tj-key tj-key--sym" data-key="\"><span className="tj-key-shift">|</span><span className="tj-key-jamo">\</span></div>
                  </div>

                  {/* Row 3 */}
                  <div className="tj-kb-row">
                    <div className="tj-key tj-key--wider tj-key--sym"><span className="tj-key-jamo">Caps</span></div>
                    <div className="tj-key" data-key="a" data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅇ</span></div>
                    <div className="tj-key" data-key="s" data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄴ</span></div>
                    <div className="tj-key" data-key="d" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅣ</span></div>
                    <div className="tj-key" data-key="f" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅏ</span></div>
                    <div className="tj-key" data-key="g" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅡ</span></div>
                    <div className="tj-key" data-key="h" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄴ</span></div>
                    <div className="tj-key" data-key="j" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅇ</span></div>
                    <div className="tj-key" data-key="k" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄱ</span></div>
                    <div className="tj-key" data-key="l" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅈ</span></div>
                    <div className="tj-key" data-key=";" data-type="cho"><span className="tj-key-shift">:</span><span className="tj-key-jamo">ㅂ</span></div>
                    <div className="tj-key" data-key="'" data-type="cho"><span className="tj-key-shift">"</span><span className="tj-key-jamo">ㅌ</span></div>
                    <div className="tj-key tj-key--wider tj-key--sym" data-key="Enter"><span className="tj-key-jamo">↵</span></div>
                  </div>

                  {/* Row 4 */}
                  <div className="tj-kb-row">
                    <div className="tj-key tj-key--wider tj-key--sym" data-key="Shift"><span className="tj-key-jamo">⇧</span></div>
                    <div className="tj-key" data-key="z" data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅁ</span></div>
                    <div className="tj-key" data-key="x" data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄱ</span></div>
                    <div className="tj-key" data-key="c" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅔ</span></div>
                    <div className="tj-key" data-key="v" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅗ</span></div>
                    <div className="tj-key" data-key="b" data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅜ</span></div>
                    <div className="tj-key" data-key="n" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅅ</span></div>
                    <div className="tj-key" data-key="m" data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅎ</span></div>
                    <div className="tj-key tj-key--sym" data-key=","><span className="tj-key-shift">&lt;</span><span className="tj-key-jamo">,</span></div>
                    <div className="tj-key tj-key--sym" data-key="."><span className="tj-key-shift">&gt;</span><span className="tj-key-jamo">.</span></div>
                    <div className="tj-key tj-key--sym" data-key="/"><span className="tj-key-shift">?</span><span className="tj-key-jamo">ㅗ</span></div>
                    <div className="tj-key tj-key--wider tj-key--sym" data-key="Shift"><span className="tj-key-jamo">⇧</span></div>
                  </div>

                  {/* 스페이스 */}
                  <div className="tj-kb-row">
                    <div className="tj-key tj-key--space tj-key--sym" data-key=" "><span className="tj-key-jamo"> </span></div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
