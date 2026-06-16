import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  if (!isMobile || location.pathname === '/') return null;

  const handleNav = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const navItems = [
    { name: '홈', path: '/' },
    { name: '안상수체', path: '/ahn' },
    { name: '훈민정음', path: '/hunmin' },
    { name: '조형특징', path: '/hak' },
    { name: '조합원리', path: '/yu' },
    { name: '확장', path: '/expand' },
    { name: '멋지음', path: '/meotjieum' }
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: '28px',
          zIndex: 9999,
          cursor: 'pointer'
        }}
      >
        ⊞
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: '#fff',
              zIndex: 10000,
              display: 'flex',
              flexDirection: 'column',
              padding: '40px 24px',
              fontFamily: 'AGahnsangsoo2012, sans-serif'
            }}
          >
            <button 
              onClick={() => setIsOpen(false)}
              style={{
                alignSelf: 'flex-end',
                background: 'none',
                border: 'none',
                fontSize: '48px',
                lineHeight: 1,
                cursor: 'pointer',
                marginBottom: '40px'
              }}
            >
              ×
            </button>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', alignItems: 'center' }}>
              {navItems.map((item, i) => (
                <button
                  key={i}
                  onClick={() => handleNav(item.path)}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '36px',
                    fontWeight: 700,
                    color: location.pathname === item.path ? '#FF1D25' : '#000',
                    cursor: 'pointer'
                  }}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
