import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const IMAGES = [
  { src: '/image/8주차_1조_송명선.jpg', alt: '송명선' },
  { src: '/image/8주차_1조_유승현.png', alt: '유승현' },
];

export default function Hanbun() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const [zoomOrigin, setZoomOrigin] = useState('center center');

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
      style={{ position: 'fixed', inset: 0, background: '#fff', zIndex: 100, overflow: zoomed ? 'visible' : 'hidden' }}
    >
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
            <div className="hb-slide" key={idx}>
              <img
                src={img.src}
                alt={img.alt}
                className={`hb-img${zoomed && index === idx ? ' zoomed' : ''}`}
                style={{ transformOrigin: zoomed && index === idx ? zoomOrigin : 'center' }}
                onClick={index === idx ? handleImgClick : undefined}
              />
            </div>
          ))}
        </div>
        <button className="hb-arrow hb-arrow--left" disabled={index === 0} onClick={() => { setIndex(0); setZoomed(false); }}>＜</button>
        <button className="hb-arrow hb-arrow--right" disabled={index === 1} onClick={() => { setIndex(1); setZoomed(false); }}>＞</button>
      </div>
    </motion.div>
  );
}
