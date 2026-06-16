import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const BIOS = {
  송명선: '안녕하세요, 송명선 입니다. 계원예술대학교 시각디자인과에 재학 중입니다. 편집 디자인과 타이포그래피를 특히 즐겁게 배우고 있습니다. 곧 다가올 여름방학을 기대하고 있습니다.',
  유승현: '안녕하세요, 유승현 입니다. 저 역시 계원예술대학교 시각디자인과에 재학중입니다. UIUX, 인터랙션 디자인, 편집 디자인을 열심히 배우고 저만의 디자인을 관통할 수 있는 핵심은 무엇인가에 대해 많은 고민을 하고 있습니다. 저 역시 다가올 여름방학이 기대됩니다!',
};

export default function Makers() {
  const navigate = useNavigate();
  const [active, setActive] = useState(null);

  const toggle = (name) => setActive(prev => prev === name ? null : name);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        width: '100vw',
        height: '100vh',
        background: '#fff',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'AGahnsangsoo2012, sans-serif',
      }}
    >
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: 30, left: 30,
          background: 'none', border: 'none', cursor: 'pointer',
          fontFamily: 'AGahnsangsoo2012, sans-serif',
          fontSize: 28, fontWeight: 700, color: '#000',
        }}
      >
        &lt; 홈
      </button>

      <div style={{ position: 'absolute', top: '35%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '14vw', alignItems: 'center' }}>
        {['송명선', '유승현'].map((name) => (
          <div key={name} style={{ position: 'relative' }}>
            <span
              onClick={() => toggle(name)}
              style={{
                fontSize: 'clamp(5rem, 12vw, 13rem)',
                fontWeight: 700,
                color: '#000',
                cursor: 'pointer',
                userSelect: 'none',
                display: 'block',
              }}
            >
              {name}
            </span>
            <AnimatePresence>
              {active === name && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '20px',
                    width: '420px',
                    fontSize: 'clamp(1.1rem, 1.8vw, 1.6rem)',
                    fontWeight: 500,
                    color: '#000',
                    lineHeight: 1.8,
                    wordBreak: 'keep-all',
                    textAlign: 'left',
                  }}
                >
                  {BIOS[name]}
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
