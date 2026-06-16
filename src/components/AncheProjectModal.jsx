import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const K_CHO  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const K_JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const K_JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const VERT_JUNG  = [0,1,2,3,4,5,6,7,20];
const MIXED_JUNG = [9,10,11,14,15,16,19];

function decomposeKo(ch) {
  const c = ch.charCodeAt(0) - 0xAC00;
  if (c < 0 || c > 11171) return null;
  const jong = c % 28;
  const jung = Math.floor(c / 28) % 21;
  const cho  = Math.floor(c / 588);
  return { cho: K_CHO[cho], jung: K_JUNG[jung], jong: K_JONG[jong], ji: jung };
}

export default function AncheProjectModal({ isOpen, onClose }) {
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  
  const [text, setText] = useState('안상수체');
  const [lineDash, setLineDash] = useState([]);
  const [lineWidth, setLineWidth] = useState(1.5);
  const [fontSize, setFontSize] = useState(window.innerWidth <= 768 ? 80 : 180);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [fillColor, setFillColor] = useState('#ffffff');
  const [fillAlpha, setFillAlpha] = useState(100);
  const [showUI, setShowUI] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const [customDashStr, setCustomDashStr] = useState('');
  
  const handleCustomDash = (e) => {
    const val = e.target.value;
    setCustomDashStr(val);
    if (!val.trim()) {
      setLineDash([]);
      return;
    }
    const parsed = val.split(/[,\s]+/).map(n => Number(n)).filter(n => !isNaN(n) && n > 0);
    setLineDash(parsed);
  };
  

  const renderCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const wrap = canvas.parentElement;
    if (!wrap) return;
    const W = wrap.clientWidth, H = wrap.clientHeight;
    
    canvas.width  = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, W, H);

    if (!text.trim()) {
      ctx.font      = '32px agahnsangsoo2012, sans-serif';
      ctx.fillStyle = '#ccc';
      ctx.fillText('화면을 클릭하고 글자를 입력하세요.', W/2 - 150, H/2);
      return;
    }

    const sz     = fontSize;
    const jSz    = Math.round(sz * 0.64);
    const lineH  = sz * lineHeight;
    
    // 바닥 UI 폭(대략 900px)에 맞춰 텍스트 렌더링 영역 제약 (좌우 패널과 안 겹치게 함)
    const contentWidth = 1000;
    const padX = Math.max(60, (W - contentWidth) / 2);
    const padY = 220; // 상단 UI 밑으로 충분히 내림
    const maxW = W - padX;
    
    ctx.strokeStyle = strokeColor;
    const fa = fillAlpha / 100;
    const fc = fillColor;
    const fr = parseInt(fc.slice(1,3), 16);
    const fg = parseInt(fc.slice(3,5), 16);
    const fb = parseInt(fc.slice(5,7), 16);
    ctx.fillStyle   = `rgba(${fr},${fg},${fb},${fa})`;
    ctx.lineWidth   = lineWidth;
    ctx.setLineDash(lineDash);
    ctx.lineJoin    = 'round';
    ctx.lineCap     = 'round';
    ctx.textBaseline = 'top';

    const drawText = (str, tx, ty) => {
      if (fa > 0) ctx.fillText(str, tx, ty);
      ctx.strokeText(str, tx, ty);
    };

    let x = padX, y = padY;

    // 텍스트를 줄바꿈 기준으로 분리
    const lines = text.split('\n');
    ctx.font = `${sz}px agahnsangsoo2012, sans-serif`;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (y > H) break;
      
      // 화면 너비를 넘어가면 어떻게 할지? (간단히 잘리게 두거나 자동 줄바꿈)
      // 여기서는 캔버스에 그대로 씁니다.
      drawText(line, x, y);
      
      y += lineH;
    }
  };

  useEffect(() => {
    if (isOpen) renderCanvas();
  }, [
    isOpen, text, lineDash, lineWidth, fontSize, lineHeight, strokeColor, fillColor, fillAlpha
  ]);

  useEffect(() => {
    if (isOpen) {
      const resizeObserver = new ResizeObserver(() => renderCanvas());
      if (canvasRef.current?.parentElement) resizeObserver.observe(canvasRef.current.parentElement);
      // 포커스 자동 이동
      if(inputRef.current) inputRef.current.focus();
      return () => resizeObserver.disconnect();
    }
  }, [isOpen]);

  const handleSave = () => {
    const canvas = canvasRef.current;
    if(!canvas) return;
    const link = document.createElement('a');
    link.download = 'my-anche.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handleRandomize = () => {
    const r = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    
    const colors = ['#000000', '#FF3B30', '#007AFF', '#34C759', '#AF52DE', '#FF9500', '#FFCC00', '#5AC8FA', '#FFFFFF', '#8E8E93', 'transparent'];
    
    setStrokeColor(colors[Math.floor(Math.random() * (colors.length - 1))]); // 선은 투명 제외
    
    // 면색은 가끔 투명해지도록 포함
    setFillColor(colors[Math.floor(Math.random() * colors.length)]);
    
    // 투명도도 랜덤 (20% ~ 100%)
    setFillAlpha(r(20, 100));
    
    const dashes = [
      [], [20,10], [7,5], [2,4], [14,4,2,4], [15,4,3,4,3,4], [20,5,5,5,10,15]
    ];
    const newDash = dashes[Math.floor(Math.random() * dashes.length)];
    setLineDash(newDash);
    setCustomDashStr(newDash.join(' ')); // 커스텀 점선 인풋도 동기화
    
    setLineWidth(r(1, 8));
  };

  if (!isOpen) return null;

  const handleCanvasClick = () => {
    if(inputRef.current) inputRef.current.focus();
  };

  const Slider = ({ label, min = -40, max = 40, step = 1, value, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'flex-end' }}>
      <span style={{ fontSize: '20px', color: '#000', whiteSpace: 'nowrap' }}>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} style={{ width: '120px', accentColor: '#000' }} />
    </div>
  );



  return (
    <div style={{ 
      zIndex: 9999, 
      backgroundColor: '#fff', 
      position: 'fixed', 
      top: 0, left: 0, 
      width: '100vw', height: '100vh', 
      fontFamily: 'agahnsangsoo2012, sans-serif'
    }}>
      
      {/* 백그라운드 풀스크린 캔버스 */}
      <canvas 
        ref={canvasRef} 
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', cursor: 'default', zIndex: 1 }}
      ></canvas>

      {/* 좌측 상단: 닫기 버튼, UI 토글 및 타이틀 */}
      <div className="anche-top-left" style={{ position: 'absolute', top: '30px', left: '40px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            className="anche-btn"
            onClick={() => { onClose(); navigate('/'); window.scrollTo(0, 0); }} 
            style={{ background: 'transparent', color: '#000', border: '2px solid #000', padding: '6px 16px', fontSize: '22px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
          >
            닫기
          </button>
          <button 
            className="anche-btn"
            onClick={() => setShowUI(!showUI)} 
            style={{ background: '#000', color: '#fff', border: '2px solid #000', padding: '6px 16px', fontSize: '22px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
          >
            {showUI ? 'UI 가리기' : 'UI 켜기'}
          </button>
        </div>
        {showUI && <h2 className="anche-title" style={{ margin: 0, fontSize: '36px', fontWeight: 'normal', color: '#000' }}>나만의 안체 만들기</h2>}
      </div>

      {/* 중앙 상단: 텍스트 입력창 (플로팅) */}
      {showUI && (
        <div className="anche-input-wrap" style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '20px', color: '#000', fontFamily: 'agahnsangsoo2012' }}>입력창</span>
          <input 
            type="text" 
            value={text} 
            onChange={e => setText(e.target.value)} 
            placeholder="여기에 타이핑하세요"
            style={{ 
              background: 'transparent', border: 'none', borderBottom: '2px solid #000', 
              fontSize: '32px', fontFamily: 'agahnsangsoo2012', textAlign: 'center', 
              outline: 'none', width: '300px', paddingBottom: '8px', color: '#000'
            }} 
          />
        </div>
      )}

      {/* 우측 상단: 스타일 조작부 (플로팅) */}
      <div className="anche-style-panel" style={{ position: 'absolute', top: '30px', right: '40px', zIndex: 10, display: showUI ? 'flex' : 'none', flexDirection: 'column', gap: '20px', alignItems: 'flex-end' }}>
        <button className="anche-save-btn" onClick={handleSave} style={{ padding: '8px 24px', background: 'transparent', color: '#000', border: '2px solid #000', cursor: 'pointer', fontSize: '26px', fontFamily: 'agahnsangsoo2012' }}>저장하기</button>
        
        <div className="anche-style-box" style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end', background: 'rgba(255,255,255,0.85)', padding: '30px', border: '2px solid #000' }}>
          <Slider label="글자 크기" min={30} max={400} step={4} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
          <Slider label="선 굵기" min={0.5} max={10} step={0.5} value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))} />
          <Slider label="면 투명도" min={0} max={100} step={1} value={fillAlpha} onChange={e => setFillAlpha(Number(e.target.value))} />
          <div className="anche-dash-btns" style={{ display: 'flex', gap: '6px', marginTop: '8px', flexWrap: 'wrap', justifyContent: 'flex-end', width: '300px' }}>
            {[
              {l:'실선', d:[]}, 
              {l:'파선(긴)', d:[20,10]}, 
              {l:'파선(짧)', d:[7,5]}, 
              {l:'점선', d:[2,4]}, 
              {l:'쇄선', d:[14,4,2,4]},
              {l:'이중쇄선', d:[15,4,3,4,3,4]},
              {l:'불규칙', d:[20,5,5,5,10,15]}
            ].map(btn => (
              <button key={btn.l} onClick={() => { setLineDash(btn.d); setCustomDashStr(''); }} style={{ padding: '2px 8px', border: '1px solid #000', background: lineDash.join(',') === btn.d.join(',') && customDashStr === '' ? '#000' : 'transparent', color: lineDash.join(',') === btn.d.join(',') && customDashStr === '' ? '#fff' : '#000', cursor: 'pointer', fontSize: '16px', fontFamily: 'agahnsangsoo2012' }}>{btn.l}</button>
            ))}
          </div>
          
          <div className="anche-custom-dash" style={{ display: 'flex', gap: '8px', marginTop: '4px', alignItems: 'center', justifyContent: 'flex-end', width: '100%' }}>
            <div 
              style={{ position: 'relative' }} 
              onMouseEnter={() => setShowTooltip(true)} 
              onMouseLeave={() => setShowTooltip(false)}
            >
              <span 
                style={{ fontSize: '16px', color: '#000', fontFamily: 'agahnsangsoo2012', cursor: 'help', borderBottom: '1px dashed #000' }}
              >
                나만의 커스텀 점선(?) :
              </span>
              
              {showTooltip && (
                <div style={{
                  position: 'absolute', top: '-60px', left: '50%', transform: 'translateX(-50%)',
                  background: '#000', color: '#fff', padding: '8px 12px', fontSize: '14px',
                  borderRadius: '4px', whiteSpace: 'nowrap', zIndex: 100, pointerEvents: 'none',
                  fontFamily: 'sans-serif'
                }}>
                  숫자(선 굵기 공백)를 번갈아 입력하세요<br/>(예: 20 5 5 5 = 긴 선, 짧은 공백, 짧은 선 반복)
                  {/* 말풍선 꼬리 */}
                  <div style={{
                    position: 'absolute', bottom: '-4px', left: '50%', transform: 'translateX(-50%) rotate(45deg)',
                    width: '8px', height: '8px', background: '#000'
                  }}></div>
                </div>
              )}
            </div>
            <input 
              type="text" 
              value={customDashStr} 
              onChange={handleCustomDash}
              placeholder="숫자 입력 (예: 10 5 2 5)"
              style={{ width: '130px', fontSize: '14px', padding: '2px 6px', fontFamily: 'agahnsangsoo2012', border: '1px solid #000', outline: 'none' }}
            />
          </div>
          <div className="anche-colors" style={{ display: 'flex', gap: '20px', marginTop: '12px' }}>
            <label style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>선 색 <input type="color" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} style={{ width: '28px', height: '28px', padding: 0, border: '1px solid #000', cursor: 'pointer', background: 'transparent' }} /></label>
            <label style={{ fontSize: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>면 색 <input type="color" value={fillColor} onChange={e => setFillColor(e.target.value)} style={{ width: '28px', height: '28px', padding: 0, border: '1px solid #000', cursor: 'pointer', background: 'transparent' }} /></label>
          </div>
        </div>
      </div>





      {/* 우측 하단: 랜덤 섞기 플로팅 버튼 */}
      {showUI && (
        <button 
          className="anche-random-btn"
          onClick={handleRandomize} 
          style={{ position: 'absolute', bottom: '60px', right: '40px', zIndex: 20, padding: '20px 40px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '32px', fontFamily: 'agahnsangsoo2012', letterSpacing: '2px' }}
        >
          랜덤 섞기
        </button>
      )}

    </div>
  );
}
