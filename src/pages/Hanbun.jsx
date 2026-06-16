import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IMAGES = [
  { src: '/image/asset_img_1.jpg', alt: '송명선' },
  { src: '/image/asset_img_2.png', alt: '유승현' },
];

export default function Hanbun() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('center center');
  const [navHint, setNavHint] = useState(null);

  const handleImgClick = (e) => {
    if (!zoomed) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setZoomOrigin(`${x}% ${y}%`);
      setZoomed(true);
    } else {
      setZoomed(false);
      setZoomOrigin('center center');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onMouseMove={(e) => setNavHint(e.clientX < window.innerWidth / 2 ? 'left' : 'right')}
      onMouseLeave={() => setNavHint(null)}
      style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 100, overflow: zoomed ? 'visible' : 'hidden' }}
    >
      <div
        className="dm-nav-hint dm-nav-hint--left"
        style={{ opacity: index <= 0 ? 0 : navHint === 'left' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-arrow">←</span>
        <span className="dm-nav-hint-label">이전</span>
      </div>
      <div
        className="dm-nav-hint dm-nav-hint--right"
        style={{ opacity: index >= IMAGES.length - 1 ? 0 : navHint === 'right' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out' }}
      >
        <span className="dm-nav-hint-label">다음</span>
        <span className="dm-nav-hint-arrow">→</span>
      </div>
      {/* 프로그레스 바 */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 5, display: 'flex', gap: 3, zIndex: 20 }}>
        {IMAGES.map((_, i) => (
          <div key={i} style={{ flex: 1, background: index === i ? '#000' : '#ddd', transition: 'background 0.35s' }} />
        ))}
      </div>

      {/* 홈 버튼 */}
      <button
        className="hb-back-btn"
        style={{ position: 'fixed', top: 18, left: 22, zIndex: 20 }}
        onClick={() => navigate('/')}
      >{'< 홈'}</button>

      {/* 슬라이더 */}
      <div className="hb-slider" style={{ overflow: 'visible', top: 5 }}>
        <div className="hb-track" style={{ transform: `translateX(${-index * 50}%)` }}>
          {IMAGES.map((img, idx) => (
            <div className="hb-slide" key={idx} style={{ position: 'relative' }}>
              <img
                src={img.src}
                alt={img.alt}
                className={`hb-img${zoomed && index === idx ? ' zoomed' : ''}`}
                style={{ transformOrigin: zoomed && index === idx ? zoomOrigin : 'center' }}
                onClick={index === idx ? handleImgClick : undefined}
              />
              <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: zoomed && index === idx ? 1 : 0 }}
                 transition={{ duration: 0.3 }}
                 style={{
                   position: 'absolute',
                   bottom: '40px',
                   left: '50%',
                   transform: 'translateX(-50%)',
                   background: 'rgba(0,0,0,0.75)',
                   color: '#fff',
                   padding: '10px 24px',
                   borderRadius: '30px',
                   fontSize: '15px',
                   fontFamily: 'Pretendard, sans-serif',
                   fontWeight: 500,
                   pointerEvents: 'none',
                   zIndex: 50,
                   letterSpacing: '1px'
                 }}
              >
                {img.alt}
              </motion.div>
            </div>
          ))}
        </div>
        <button className="hb-arrow hb-arrow--left" disabled={index === 0} onClick={() => { setIndex(0); setZoomed(false); }} />
        <button className="hb-arrow hb-arrow--right" disabled={index === 1} onClick={() => { setIndex(1); setZoomed(false); }} />
      </div>
    </motion.div>
  );
}
