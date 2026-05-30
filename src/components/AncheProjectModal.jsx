import React, { useState, useEffect, useRef } from 'react';

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
  const canvasRef = useRef(null);
  const inputRef = useRef(null);
  
  const [text, setText] = useState('안상수체');
  const [lineDash, setLineDash] = useState([]);
  const [lineWidth, setLineWidth] = useState(1.5);
  const [fontSize, setFontSize] = useState(180);
  const [lineHeight, setLineHeight] = useState(1.6);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [fillColor, setFillColor] = useState('#ffffff');
  const [fillAlpha, setFillAlpha] = useState(0);
  const [showUI, setShowUI] = useState(true);
  
  const [choPos, setChoPos] = useState({ x: 0, y: 0 });
  const [jungVert, setJungVert] = useState({ x: 0, y: 0, sy: 1.0 });
  const [jungHoriz, setJungHoriz] = useState({ x: 0, y: 0, sx: 1.0 });
  const [jungMixed, setJungMixed] = useState({ x: 0, y: 0 });
  const [jongVert, setJongVert] = useState({ x: 0, y: 0 });
  const [jongHoriz, setJongHoriz] = useState({ x: 0, y: 0 });
  const [jongMixed, setJongMixed] = useState({ x: 0, y: 0 });

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

    for (let i = 0; i < text.length; i++) {
      const ch = text[i];
      if (ch === '\n') { x = padX; y += lineH; continue; }

      const dec = decomposeKo(ch);

      if (!dec) {
        ctx.font = `${sz * 0.82}px agahnsangsoo2012, sans-serif`;
        const cw = ctx.measureText(ch).width;
        if (x + cw > maxW) { x = padX; y += lineH; }
        if (y > H) break;
        drawText(ch, x, y + sz * 0.1);
        x += cw + sz * 0.04;
        continue;
      }

      if (x + sz > maxW) { x = padX; y += lineH; }
      if (y > H) break;

      ctx.font = `${jSz}px agahnsangsoo2012, sans-serif`;

      const isVert  = VERT_JUNG.includes(dec.ji);
      const isMixed = MIXED_JUNG.includes(dec.ji);
      const hasJong = dec.jong !== '';
      const co  = choPos;
      const juo = isVert ? jungVert : (isMixed ? jungMixed : jungHoriz);
      const joo = isVert ? jongVert : (isMixed ? jongMixed : jongHoriz);

      if (isVert) {
        drawText(dec.cho, x + sz * 0.03 + co.x, y + (hasJong ? sz * 0.02 : sz * 0.10) + co.y);
        ctx.save();
        const jvx = x + sz * 0.42 + juo.x;
        const jvy = y + sz * 0.02 + juo.y;
        ctx.translate(jvx + jSz * 0.5, jvy);
        ctx.scale(1, juo.sy || 1);
        ctx.translate(-(jvx + jSz * 0.5), -jvy);
        drawText(dec.jung, jvx, jvy);
        ctx.restore();
        if (hasJong) drawText(dec.jong, x + sz * 0.12 + joo.x, y + sz * 0.58 + joo.y);
      } else {
        drawText(dec.cho, x + sz * 0.16 + co.x, y + sz * 0.02 + co.y);
        ctx.save();
        const jhx = x + sz * 0.06 + juo.x;
        const jhy = y + sz * 0.40 + juo.y;
        ctx.translate(jhx, jhy + jSz * 0.5);
        ctx.scale(juo.sx || 1, 1);
        ctx.translate(-jhx, -(jhy + jSz * 0.5));
        drawText(dec.jung, jhx, jhy);
        ctx.restore();
        if (hasJong) drawText(dec.jong, x + sz * 0.20 + joo.x, y + sz * 0.72 + joo.y);
      }

      x += sz;
    }
  };

  useEffect(() => {
    if (isOpen) renderCanvas();
  }, [
    isOpen, text, lineDash, lineWidth, fontSize, lineHeight, strokeColor, fillColor, fillAlpha,
    choPos, jungVert, jungHoriz, jungMixed, jongVert, jongHoriz, jongMixed
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
    const rs = (min, max) => Number((Math.random() * (max - min) + min).toFixed(2));
    
    setChoPos({ x: r(-40, 40), y: r(-40, 40) });
    setJungVert({ x: r(-40, 40), y: r(-40, 40), sy: rs(0.5, 1.8) });
    setJungHoriz({ x: r(-40, 40), y: r(-40, 40), sx: rs(0.5, 1.8) });
    setJungMixed({ x: r(-40, 40), y: r(-40, 40) });
    setJongVert({ x: r(-40, 40), y: r(-40, 40) });
    setJongHoriz({ x: r(-40, 40), y: r(-40, 40) });
    setJongMixed({ x: r(-40, 40), y: r(-40, 40) });
    
    const colors = ['#000000', '#FF0000', '#0000FF', '#00FF00', '#FF00FF'];
    setStrokeColor(colors[Math.floor(Math.random() * colors.length)]);
    
    const dashes = [[], [], [7,5], [2,4], [14,4,2,4]];
    setLineDash(dashes[Math.floor(Math.random() * dashes.length)]);
    setLineWidth(r(1, 6));
  };

  if (!isOpen) return null;

  const handleCanvasClick = () => {
    if(inputRef.current) inputRef.current.focus();
  };

  const Slider = ({ label, min = -40, max = 40, step = 1, value, onChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'flex-end' }}>
      <span style={{ fontSize: '24px', color: '#000', whiteSpace: 'nowrap' }}>{label}</span>
      <input type="range" min={min} max={max} step={step} value={value} onChange={onChange} style={{ width: '140px', accentColor: '#000' }} />
    </div>
  );

  const XYPad = ({ x, y, onChange, min = -40, max = 40, label }) => {
    const padRef = useRef(null);

    const handlePointerMove = (e) => {
      if (!padRef.current) return;
      const rect = padRef.current.getBoundingClientRect();
      let nx = e.clientX - rect.left;
      let ny = e.clientY - rect.top;
      
      nx = Math.max(0, Math.min(nx, rect.width));
      ny = Math.max(0, Math.min(ny, rect.height));

      const valX = Math.round((nx / rect.width) * (max - min) + min);
      const valY = Math.round((ny / rect.height) * (max - min) + min);

      onChange({ x: valX, y: valY });
    };

    const handlePointerDown = (e) => {
      e.target.setPointerCapture(e.pointerId);
      handlePointerMove(e);
      
      const onMove = (ev) => handlePointerMove(ev);
      const onUp = (ev) => {
        e.target.releasePointerCapture(ev.pointerId);
        e.target.removeEventListener('pointermove', onMove);
        e.target.removeEventListener('pointerup', onUp);
      };
      
      e.target.addEventListener('pointermove', onMove);
      e.target.addEventListener('pointerup', onUp);
    };

    const w = 120, h = 120;
    const thumbX = ((x - min) / (max - min)) * w;
    const thumbY = ((y - min) / (max - min)) * h;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <div style={{ fontSize: '24px', color: '#000' }}>{label}</div>
        <div 
          ref={padRef}
          onPointerDown={handlePointerDown}
          style={{ 
            width: w, height: h, 
            backgroundColor: 'rgba(255,255,255,0.7)', 
            border: '2px solid #000',
            position: 'relative',
            cursor: 'crosshair',
            touchAction: 'none'
          }}
        >
          <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', backgroundColor: 'rgba(0,0,0,0.15)' }}></div>
          <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '1px', backgroundColor: 'rgba(0,0,0,0.15)' }}></div>
          <div style={{ 
            position: 'absolute', 
            left: thumbX, top: thumbY, 
            width: '12px', height: '12px', 
            backgroundColor: '#000', 
            borderRadius: '50%', 
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none'
          }}></div>
        </div>
        <button 
          onClick={() => onChange({x:0, y:0})}
          style={{ fontSize: '18px', padding: '0px 6px', border: 'none', background: 'transparent', color: '#666', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
        >리셋</button>
      </div>
    );
  };

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
      <div style={{ position: 'absolute', top: '30px', left: '40px', zIndex: 10, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button 
            onClick={onClose} 
            style={{ background: 'transparent', color: '#000', border: '2px solid #000', padding: '6px 16px', fontSize: '22px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
          >
            닫기
          </button>
          <button 
            onClick={() => setShowUI(!showUI)} 
            style={{ background: '#000', color: '#fff', border: '2px solid #000', padding: '6px 16px', fontSize: '22px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
          >
            {showUI ? 'UI 가리기' : 'UI 켜기'}
          </button>
        </div>
        {showUI && <h2 style={{ margin: 0, fontSize: '36px', fontWeight: 'normal', color: '#000' }}>나만의 안체 만들기</h2>}
      </div>

      {/* 중앙 상단: 텍스트 입력창 (플로팅) */}
      {showUI && (
        <div style={{ position: 'absolute', top: '40px', left: '50%', transform: 'translateX(-50%)', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
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
      <div style={{ position: 'absolute', top: '30px', right: '40px', zIndex: 10, display: showUI ? 'flex' : 'none', flexDirection: 'column', gap: '20px', alignItems: 'flex-end' }}>
        <button onClick={handleSave} style={{ padding: '8px 24px', background: 'transparent', color: '#000', border: '2px solid #000', cursor: 'pointer', fontSize: '26px', fontFamily: 'agahnsangsoo2012' }}>저장하기</button>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-end', background: 'rgba(255,255,255,0.85)', padding: '30px', border: '2px solid #000' }}>
          <Slider label="글자 크기" min={30} max={400} step={4} value={fontSize} onChange={e => setFontSize(Number(e.target.value))} />
          <Slider label="선 굵기" min={0.5} max={10} step={0.5} value={lineWidth} onChange={e => setLineWidth(Number(e.target.value))} />
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
            {[{l:'실선', d:[]}, {l:'파선', d:[7,5]}, {l:'점선', d:[2,4]}, {l:'쇄선', d:[14,4,2,4]}].map(btn => (
              <button key={btn.l} onClick={() => setLineDash(btn.d)} style={{ padding: '4px 10px', border: '1px solid #000', background: lineDash.join(',') === btn.d.join(',') ? '#000' : 'transparent', color: lineDash.join(',') === btn.d.join(',') ? '#fff' : '#000', cursor: 'pointer', fontSize: '20px', fontFamily: 'agahnsangsoo2012' }}>{btn.l}</button>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '24px', marginTop: '12px' }}>
            <label style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>선 색 <input type="color" value={strokeColor} onChange={e => setStrokeColor(e.target.value)} style={{ width: '32px', height: '32px', padding: 0, border: '1px solid #000', cursor: 'pointer', background: 'transparent' }} /></label>
            <label style={{ fontSize: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>면 색 <input type="color" value={fillColor} onChange={e => setFillColor(e.target.value)} style={{ width: '32px', height: '32px', padding: 0, border: '1px solid #000', cursor: 'pointer', background: 'transparent' }} /></label>
          </div>
        </div>
      </div>

      {/* 하단 전체: 바닥에 뿌려진 꼴모임 패드들 (플로팅) */}
      <div style={{ position: 'absolute', bottom: '60px', left: '0', width: '100%', zIndex: 10, display: showUI ? 'flex' : 'none', justifyContent: 'center', gap: '60px', flexWrap: 'wrap', padding: '0 40px' }}>
        
        {/* 첫소리 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '28px', borderBottom: '3px solid rgba(255, 0, 255, 0.4)', paddingBottom: '6px' }}>첫소리 (초성)</span>
          <XYPad label="이동" x={choPos.x} y={choPos.y} onChange={val => setChoPos(prev => ({...prev, ...val}))} />
        </div>

        {/* 가운데소리 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '28px', borderBottom: '3px solid rgba(0, 255, 255, 0.4)', paddingBottom: '6px' }}>가운데소리 (모음)</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <XYPad label="가로(가)" x={jungVert.x} y={jungVert.y} onChange={val => setJungVert(prev => ({...prev, ...val}))} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                <span style={{ fontSize: '18px', color: '#000', fontFamily: 'agahnsangsoo2012' }}>상하 늘리기</span>
                <input type="range" min={50} max={200} step={5} value={jungVert.sy * 100} onChange={e => setJungVert(p => ({...p, sy: Number(e.target.value)/100}))} style={{ width: '100px', accentColor: '#000' }} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <XYPad label="세로(고)" x={jungHoriz.x} y={jungHoriz.y} onChange={val => setJungHoriz(prev => ({...prev, ...val}))} />
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
                <span style={{ fontSize: '18px', color: '#000', fontFamily: 'agahnsangsoo2012' }}>좌우 늘리기</span>
                <input type="range" min={50} max={200} step={5} value={jungHoriz.sx * 100} onChange={e => setJungHoriz(p => ({...p, sx: Number(e.target.value)/100}))} style={{ width: '100px', accentColor: '#000' }} />
              </div>
            </div>
            <XYPad label="섞임(과)" x={jungMixed.x} y={jungMixed.y} onChange={val => setJungMixed(prev => ({...prev, ...val}))} />
          </div>
        </div>

        {/* 끝소리 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'center' }}>
          <span style={{ fontSize: '28px', borderBottom: '3px solid rgba(255, 255, 0, 0.4)', paddingBottom: '6px' }}>끝소리 (받침)</span>
          <div style={{ display: 'flex', gap: '24px' }}>
            <XYPad label="가로(강)" x={jongVert.x} y={jongVert.y} onChange={val => setJongVert(prev => ({...prev, ...val}))} />
            <XYPad label="세로(곰)" x={jongHoriz.x} y={jongHoriz.y} onChange={val => setJongHoriz(prev => ({...prev, ...val}))} />
            <XYPad label="섞임(쾅)" x={jongMixed.x} y={jongMixed.y} onChange={val => setJongMixed(prev => ({...prev, ...val}))} />
          </div>
        </div>

      </div>

      {/* 우측 하단: 랜덤 섞기 플로팅 버튼 */}
      {showUI && (
        <button 
          onClick={handleRandomize} 
          style={{ position: 'absolute', bottom: '60px', right: '40px', zIndex: 20, padding: '20px 40px', background: '#000', color: '#fff', border: 'none', cursor: 'pointer', fontSize: '32px', fontFamily: 'agahnsangsoo2012', letterSpacing: '2px' }}
        >
          랜덤 섞기
        </button>
      )}

    </div>
  );
}
