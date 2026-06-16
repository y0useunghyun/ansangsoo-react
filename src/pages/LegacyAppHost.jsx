import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import initLegacyApp from '../legacy/app.js';
import LEGACY_HTML from '../legacy/legacyHtml.js';

const LEGACY_DOM = { __html: LEGACY_HTML };
import AncheProjectModal from '../components/AncheProjectModal';
import TypewriterIntro from './Typewriter';
import CuteEyes from '../components/CuteEyes';
export default function LegacyAppHost() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialized = useRef(false);
  const [isAncheOpen, setIsAncheOpen] = useState(false);
  const [showTypewriterIntro, setShowTypewriterIntro] = useState(false);
  const [anyDetailOpen, setAnyDetailOpen] = useState(false);

  useEffect(() => {
    // 바닐라 JS에서 리액트 라우팅 대신 상태로 모달을 열도록 함수 덮어쓰기
    window.openTypewriterIntro = function() {
      setShowTypewriterIntro(true);
    };
    window.__openHanbun = function() { navigate('/hanbun'); };
    window.__openAhn = function() { navigate('/ahn'); };

    if (initialized.current) return;
    initialized.current = true;

    // 바닐라 앱 전체 실행
    const cleanup = initLegacyApp(navigate);

    window.forceOpenHanbun = () => navigate('/hanbun');

    // initLegacyApp이 hp-hanbun에 openPage(history.pushState)를 바인딩하므로
    // 클론으로 기존 리스너 전부 제거하고 React 핸들러만 붙임
    const hanbunEl = document.getElementById('hp-hanbun');
    if (hanbunEl && hanbunEl.parentNode) {
      const clone = hanbunEl.cloneNode(true);
      hanbunEl.parentNode.replaceChild(clone, hanbunEl);
      clone.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate('/hanbun');
      });
    }

    // 유승현 버튼 클릭 시 한눈에 보기 모달 열기
    setTimeout(() => {
      const yooBtn = document.getElementById('hp-yoo-btn');
      if (yooBtn) {
        yooBtn.addEventListener('click', () => {
          document.getElementById('hp-hanbun')?.click();
        });
      }

      // 한눈에 보기 이미지 클릭 시 클릭한 곳을 중심으로 확대/축소
      const hbImages = document.querySelectorAll('.hb-img');
      hbImages.forEach(img => {
        img.addEventListener('click', (e) => {
          if (!img.classList.contains('zoomed')) {
            const rect = img.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            img.style.transformOrigin = `${x}% ${y}%`;
            img.classList.add('zoomed');
          } else {
            img.classList.remove('zoomed');
            setTimeout(() => { img.style.transformOrigin = 'center'; }, 300);
          }
        });
      });
    }, 100);
    
    // CuteEyes 마운트
    setTimeout(() => {
      const mount = document.getElementById('hp-cute-eyes-mount');
      if (mount && !mount.dataset.mounted) {
        mount.dataset.mounted = 'true';
        const root = ReactDOM.createRoot(mount);
        root.render(<CuteEyes onClick={() => navigate('/society')} />);
      }
    }, 100);
    
    return () => {
      if(cleanup) cleanup();
      initialized.current = false;
    };
  }, [navigate]);

  // .detail-page.dp-in 생기면 버튼 숨기기
  useEffect(() => {
    const check = () => setAnyDetailOpen(!!document.querySelector('.detail-page.dp-in'));
    const observer = new MutationObserver(check);
    observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleOpenModal = () => setIsAncheOpen(true);
    window.addEventListener('open-anche-modal', handleOpenModal);
    return () => window.removeEventListener('open-anche-modal', handleOpenModal);
  }, []);



  useEffect(() => {
    if (location.state?.openAnche) {
      setTimeout(() => {
        setIsAncheOpen(true);
      }, 600); // Wait for the transition to finish before opening the modal
    }
    
    if (location.state?.openTajagi) {
      setTimeout(() => {
        if (typeof window.openTajagiSimulator === 'function') {
          window.openTajagiSimulator();
        }
      }, 100); // Slight delay to ensure DOM is ready
    }
  }, [location.state]);

  // 스티커 클릭 이벤트 직접 바인딩
  useEffect(() => {
    const handleTypeClick      = (e) => { e.preventDefault(); e.stopPropagation(); setShowTypewriterIntro(true); };
    const handleGameClick      = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/game'); };
    const handleHakClick       = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/hak'); };
    const handleHunminClick    = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/hunmin'); };
    const handleSongClick      = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/song'); };
    const handleYuClick        = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/yu'); };
    const handleMeotjieumClick = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/meotjieum'); };
    const handleAhnClick       = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/ahn'); };
    const handleProjectClick    = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/aproject'); };
    const handleMakersClick     = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/makers'); };

    let typeSticker, gameSticker, hakSticker, hunminSticker, songBtn, yuBtn, blobBtn, ahnEl, projectBtn, makersBtn;

    setTimeout(() => {
      typeSticker   = document.getElementById('hp-tajagi-home');
      gameSticker   = document.getElementById('hp-game-sticker');
      hakSticker    = document.getElementById('hp-hak');
      hunminSticker = document.getElementById('hp-hunmin');
      songBtn       = document.getElementById('hp-song');
      yuBtn         = document.getElementById('hp-yu');
      blobBtn       = document.getElementById('hp-blob-btn');
      ahnEl         = document.getElementById('hp-ahn');
      projectBtn    = document.getElementById('hp-project');
      makersBtn     = document.getElementById('hp-meotjieun');

      if (typeSticker)   typeSticker.addEventListener('click', handleTypeClick);
      if (gameSticker)   gameSticker.addEventListener('click', handleGameClick);
      if (hakSticker)    hakSticker.addEventListener('click', handleHakClick);
      if (hunminSticker) hunminSticker.addEventListener('click', handleHunminClick);
      if (songBtn)       songBtn.addEventListener('click', handleSongClick);
      if (yuBtn)         yuBtn.addEventListener('click', handleYuClick);
      if (blobBtn)       blobBtn.addEventListener('click', handleMeotjieumClick);
      if (ahnEl)         ahnEl.addEventListener('click', handleAhnClick);
      if (projectBtn)    projectBtn.addEventListener('click', handleProjectClick);
      if (makersBtn)     makersBtn.addEventListener('click', handleMakersClick);
    }, 200);

    return () => {
      if (typeSticker)   typeSticker.removeEventListener('click', handleTypeClick);
      if (gameSticker)   gameSticker.removeEventListener('click', handleGameClick);
      if (hakSticker)    hakSticker.removeEventListener('click', handleHakClick);
      if (hunminSticker) hunminSticker.removeEventListener('click', handleHunminClick);
      if (songBtn)       songBtn.removeEventListener('click', handleSongClick);
      if (yuBtn)         yuBtn.removeEventListener('click', handleYuClick);
      if (blobBtn)       blobBtn.removeEventListener('click', handleMeotjieumClick);
      if (ahnEl)         ahnEl.removeEventListener('click', handleAhnClick);
      if (projectBtn)    projectBtn.removeEventListener('click', handleProjectClick);
      if (makersBtn)     makersBtn.removeEventListener('click', handleMakersClick);
    };
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
    >


      {/* 모바일 전용 헤더 */}
      {!anyDetailOpen && !showTypewriterIntro && !isAncheOpen && (
        <div className="mobile-home-header">
          <button
            className="mobile-home-header__title"
          >
            안상수체에.대해.얼마나.알고.있니
          </button>
          <div className="mobile-home-header__nav">
            <button onClick={() => navigate('/hanbun')} className="mobile-home-header__nav-btn">한눈에 보기</button>
            <button onClick={() => navigate('/makers')} className="mobile-home-header__nav-btn">멋지은 이들</button>
          </div>
        </div>
      )}

      {/* TypewriterIntro 모달 오버레이 */}
      {showTypewriterIntro && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <TypewriterIntro onClose={() => {
              setShowTypewriterIntro(false);
              const tajagi = document.getElementById('detail-tajagi');
              if (tajagi) tajagi.classList.remove('dp-in');
            }} />
        </div>
      )}

      <div dangerouslySetInnerHTML={LEGACY_DOM} style={{width: '100%', height: '100%'}} />
      <AncheProjectModal isOpen={isAncheOpen} onClose={() => setIsAncheOpen(false)} />
    </motion.div>
  );
}
