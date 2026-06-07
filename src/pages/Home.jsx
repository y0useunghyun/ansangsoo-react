import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const HANBUN_IMAGES = [
  { src: '/image/8주차_1조_송명선.jpg', alt: '송명선' },
  { src: '/image/8주차_1조_유승현.png', alt: '유승현' },
];

export default function Home() {
  const navigate = useNavigate();
  const [showHanbun, setShowHanbun] = useState(false);
  const [hanbunIndex, setHanbunIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  return (
    // framer-motion을 통해 페이지 전환 애니메이션 추가 (원한다면 나중에 더 화려하게 가능)
    <motion.div 
      className="home-page hp-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'block', position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      {/* 
        기존 index.html의 home-page 내부 요소들을 
        단 1픽셀의 오차도 없이 1:1로 이식했습니다. 
        class 이름이 기존 style.css와 100% 일치하므로 똑같이 렌더링됩니다.
      */}

      <button className="hp-title" id="hp-title">안상수체에.대해.얼마나.알고.있니</button>

      <div className="hp-kerning">
        <img src="/image/그룹커닝.png" alt="그룹커닝" className="hp-img" />
      </div>

      <div className="hp-tajagi" id="hp-tajagi-home" style={{ cursor: 'pointer' }}>
        <img src="/image/타자기2.png" alt="종이" className="hp-tajagi-paper" />
        <img src="/image/타자기.png" alt="타자기" className="hp-tajagi-base" />
      </div>

      <div className="hp-hak" style={{ cursor: 'pointer' }} onClick={() => navigate('/hak')}>
        <img src="/image/학.png" alt="학" className="hp-img" />
      </div>

      <div className="hp-expand" style={{ cursor: 'pointer' }} onClick={() => navigate('/expand')}>
        <img src="/image/확장.png" alt="확장" className="hp-img" />
      </div>

      <div className="hp-ahn" style={{ cursor: 'pointer', position: 'absolute', left: '120px', top: '150px', width: '200px' }} onClick={() => navigate('/ahn')}>
        <img src="/image/안체1.jpg" alt="안상수체" className="hp-img" style={{ borderRadius: '10px', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
      </div>

      <div className="hp-joyoungjae">
        <img src="/image/조영제.png" alt="조영제" className="hp-img" />
      </div>

      <div className="hp-project-wrap">
        <button className="hp-project-obj" id="hp-project">
          <img src="/image/안체프로젝트.png" alt="안체프로젝트" className="hp-proj-img" />
        </button>
      </div>

      <div className="hp-blob">
        <img src="/image/멋지음안상수.png" alt="멋지음안상수" className="hp-img" />
      </div>

      <div className="hp-brick-wrap" style={{ cursor: 'pointer', width: '22vw', minWidth: 160 }} onClick={() => navigate('/game')}>
        <svg width="100%" viewBox="0 0 24 32" style={{ imageRendering: 'pixelated', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
          {/* 본체 */}
          <rect x="3" y="2" width="18" height="24" rx="2" fill="#111"/>
          <rect x="4" y="3" width="16" height="22" rx="1" fill="#222"/>
          {/* 스크린 */}
          <rect x="6" y="5" width="12" height="10" fill="#111"/>
          <rect x="7" y="6" width="10" height="8" fill="#5f8a5f"/>
          {/* 스크린 글로우 */}
          <rect x="7" y="6" width="3" height="2" fill="#7aaa7a" opacity="0.6"/>
          {/* 십자키 */}
          <rect x="6" y="19" width="2" height="6" fill="#444"/>
          <rect x="5" y="21" width="4" height="2" fill="#444"/>
          {/* A/B 버튼 */}
          <circle cx="16" cy="21" r="1.5" fill="#c0392b"/>
          <circle cx="19" cy="20" r="1.5" fill="#2980b9"/>
          {/* 스타트/셀렉트 */}
          <rect x="10" y="18" width="3" height="1" rx="0.5" fill="#555"/>
          <rect x="14" y="18" width="3" height="1" rx="0.5" fill="#555"/>
          {/* 스피커 */}
          <rect x="17" y="24" width="1" height="1" fill="#444"/>
          <rect x="19" y="24" width="1" height="1" fill="#444"/>
          <rect x="17" y="22" width="1" height="1" fill="#444"/>
          <rect x="19" y="22" width="1" height="1" fill="#444"/>
        </svg>
      </div>

      <button
        className="hp-nav-btn"
        id="hp-hanbun"
        onClick={() => { setShowHanbun(v => !v); setHanbunIndex(0); setZoomed(false); }}
      >한눈에 보기</button>
      <button className="hp-nav-btn" id="hp-meotjieun">멋지은 이들</button>

      {showHanbun && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, width: '100vw',
          height: '60vh', background: 'rgba(255,255,255,0.97)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 2000, boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
          overflow: 'hidden',
        }}>
          <button
            onClick={() => { setHanbunIndex(0); setZoomed(false); }}
            style={{
              position: 'absolute', left: 24, background: 'none', border: 'none',
              fontSize: 'clamp(14px,1.875vw,36px)', fontFamily: 'AGahnsangsoo2012, sans-serif',
              fontWeight: 700, cursor: 'pointer', opacity: hanbunIndex === 0 ? 0.3 : 1,
            }}
            disabled={hanbunIndex === 0}
          >&lt;</button>

          <img
            src={HANBUN_IMAGES[hanbunIndex].src}
            alt={HANBUN_IMAGES[hanbunIndex].alt}
            className={`hb-img${zoomed ? ' zoomed' : ''}`}
            style={{ maxHeight: '55vh', width: 'auto', maxWidth: '80vw' }}
            onClick={() => setZoomed(z => !z)}
          />

          <button
            onClick={() => { setHanbunIndex(1); setZoomed(false); }}
            style={{
              position: 'absolute', right: 24, background: 'none', border: 'none',
              fontSize: 'clamp(14px,1.875vw,36px)', fontFamily: 'AGahnsangsoo2012, sans-serif',
              fontWeight: 700, cursor: 'pointer', opacity: hanbunIndex === 1 ? 0.3 : 1,
            }}
            disabled={hanbunIndex === 1}
          >&gt;</button>

          <span style={{
            position: 'absolute', bottom: 12,
            fontFamily: 'AGahnsangsoo2012, sans-serif',
            fontSize: 'clamp(12px,1.2vw,20px)', color: '#888',
          }}>{HANBUN_IMAGES[hanbunIndex].alt}</span>
        </div>
      )}

      {/* 송명선 상세 페이지로 이동하는 SPA Link 버튼 */}
      <Link 
        to="/song" 
        id="hp-song" 
        style={{
          position: 'absolute', 
          left: '300px', 
          top: '600px', 
          fontFamily: '"agahnsangsoo2012", sans-serif', 
          fontSize: '80px', 
          fontWeight: 800, 
          color: '#FF1D25', 
          textDecoration: 'none', 
          zIndex: 100, 
          transition: 'transform 0.2s ease', 
          transformOrigin: 'left center'
        }} 
        onMouseOver={(e) => e.target.style.transform='scale(1.1) rotate(-3deg)'} 
        onMouseOut={(e) => e.target.style.transform='scale(1) rotate(0deg)'}
      >
        송명선 &gt;
      </Link>
    </motion.div>
  );
}
