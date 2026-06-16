import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AncheProjectModal from '../components/AncheProjectModal';
import TypewriterIntro from './Typewriter';

const ITEMS = [
  {
    id: 'project',
    image: '/image/asset_img_25.png',
    action: 'anche',
  },
  {
    id: 'ahn',
    image: '/image/asset_img_20.jpg',
    path: '/ahn',
  },
  {
    id: 'hak',
    image: '/image/asset_img_39.png',
    path: '/hak',
  },
  {
    id: 'meotjieum',
    image: '/image/asset_img_8.png',
    path: '/meotjieum',
  },
  {
    id: 'typewriter',
    image: '/image/asset_img_34.png',
    action: 'typewriter',
  },
  {
    id: 'game',
    gameboy: true,
    path: '/game',
  },
  {
    id: 'song',
    text: '송명선',
    color: '#FF1D25',
    path: '/song',
  },
  {
    id: 'yu',
    text: '유승현',
    color: '#000',
    path: '/yu',
  },
];

function GameboyIcon() {
  return (
    <svg
      width="90"
      height="120"
      viewBox="0 0 24 32"
      style={{ imageRendering: 'pixelated', display: 'block' }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="2" width="18" height="24" rx="2" fill="#111" />
      <rect x="4" y="3" width="16" height="22" rx="1" fill="#222" />
      <rect x="6" y="5" width="12" height="10" fill="#111" />
      <rect x="7" y="6" width="10" height="8" fill="#5f8a5f" />
      <rect x="7" y="6" width="3" height="2" fill="#7aaa7a" opacity="0.6" />
      <rect x="6" y="19" width="2" height="6" fill="#444" />
      <rect x="5" y="21" width="4" height="2" fill="#444" />
      <circle cx="16" cy="21" r="1.5" fill="#c0392b" />
      <circle cx="19" cy="20" r="1.5" fill="#2980b9" />
      <rect x="10" y="18" width="3" height="1" rx="0.5" fill="#555" />
      <rect x="14" y="18" width="3" height="1" rx="0.5" fill="#555" />
      <rect x="17" y="24" width="1" height="1" fill="#444" />
      <rect x="19" y="24" width="1" height="1" fill="#444" />
      <rect x="17" y="22" width="1" height="1" fill="#444" />
      <rect x="19" y="22" width="1" height="1" fill="#444" />
    </svg>
  );
}

export default function MobileHome() {
  const navigate = useNavigate();
  const [ancheOpen, setAncheOpen] = useState(false);
  const [typewriterOpen, setTypewriterOpen] = useState(false);

  const handleItem = (item) => {
    if (item.action === 'anche') setAncheOpen(true);
    else if (item.action === 'typewriter') setTypewriterOpen(true);
    else if (item.path) navigate(item.path);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        width: '100vw',
        minHeight: '100dvh',
        backgroundColor: '#fff',
        overflowY: 'auto',
        fontFamily: 'AGahnsangsoo2012, sans-serif',
        paddingBottom: '80px',
      }}
    >
      {/* ── 헤더: 타이틀 + 우측 네비 (웹과 동일 스타일) ── */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '4px 12px',
          padding: '14px 20px 12px',
        }}
      >
        <button
          onClick={() => navigate('/song')}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            fontSize: 'clamp(20px, 6vw, 32px)',
            fontFamily: 'AGahnsangsoo2012, sans-serif',
            fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '-0.02em',
            lineHeight: 1.25,
            textAlign: 'left',
          }}
        >
          안상수체에.대해.얼마나.알고.있니
        </button>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'baseline' }}>
          <button
            onClick={() => navigate('/hanbun')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 'clamp(20px, 6vw, 32px)',
              fontFamily: 'AGahnsangsoo2012, sans-serif',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            한눈에 보기
          </button>
          <button
            onClick={() => navigate('/society')}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              fontSize: 'clamp(20px, 6vw, 32px)',
              fontFamily: 'AGahnsangsoo2012, sans-serif',
              fontWeight: 700,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            멋지은 이들
          </button>
        </div>
      </div>

      {/* ── 아이콘 세로 배치 ── */}
      <div>
        {ITEMS.map((item, i) => (
          <div
            key={item.id}
            onClick={() => handleItem(item)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: i % 2 === 0 ? 'flex-start' : 'flex-end',
              padding: '28px 24px',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent',
            }}
            onTouchStart={(e) => (e.currentTarget.style.opacity = '0.6')}
            onTouchEnd={(e) => (e.currentTarget.style.opacity = '1')}
          >
            {/* 아이콘 */}
            <div style={{ width: '52vw', maxWidth: '240px' }}>
              {item.gameboy ? (
                <GameboyIcon />
              ) : (
                <img
                  src={item.image}
                  alt={item.label}
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
              )}
            </div>

          </div>
        ))}
      </div>

      {/* 모달들 */}
      {ancheOpen && (
        <AncheProjectModal isOpen={ancheOpen} onClose={() => setAncheOpen(false)} />
      )}
      {typewriterOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <TypewriterIntro onClose={() => setTypewriterOpen(false)} />
        </div>
      )}
    </motion.div>
  );
}
