import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AncheProjectModal from '../components/AncheProjectModal';

export default function AProject() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [navHint, setNavHint] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [totalSections, setTotalSections] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (scrollRef.current) {
      setTotalSections(scrollRef.current.querySelectorAll('.dm-section').length);
    }
  }, []);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const sections = el.querySelectorAll('.dm-section');
    const scrollTop = el.scrollTop;
    let idx = 0;
    sections.forEach((s, i) => {
      if (s.offsetTop <= scrollTop + 50) idx = i;
    });
    setSectionIndex(idx);
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? scrollTop / max : 0);
  };

  const handleMouseMove = (e) => {
    setNavHint(e.clientY < window.innerHeight / 2 ? 'top' : 'bot');
  };

  const handleClick = (e) => {
    if (e.target.closest('button, a, .ap-sticker')) return;
    const el = scrollRef.current;
    if (!el) return;

    // 이미지 클릭 시 → 좌반 = 이전, 우반 = 다음
    if (e.target.closest('.dm-ap-thumb')) {
      const grid = el.querySelector('.dm-ap-grid');
      if (grid) {
        const step = 752; // thumb 732px + gap 20px
        if (e.clientX >= window.innerWidth / 2) {
          grid.scrollBy({ left: step, behavior: 'smooth' });
        } else {
          grid.scrollBy({ left: -step, behavior: 'smooth' });
        }
      }
      return;
    }

    // 나머지 영역: 위/아래 클릭으로 세로 이동
    const sections = el.querySelectorAll('.dm-section');
    const scrollTop = el.scrollTop;
    const isUpper = e.clientY < window.innerHeight / 2;
    if (isUpper) {
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offsetTop < scrollTop - 50) {
          el.scrollTo({ top: sections[i].offsetTop, behavior: 'smooth' });
          return;
        }
      }
    } else {
      for (let i = 0; i < sections.length; i++) {
        if (sections[i].offsetTop > scrollTop + 50) {
          el.scrollTo({ top: sections[i].offsetTop, behavior: 'smooth' });
          return;
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', background: '#fff' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setNavHint(null)}
    >
      {/* 고정 헤더 */}
      <div className="dm-header" id="dm-header">
        <button className="dm-home-btn" onClick={() => navigate('/')}>&lt; 홈</button>
        <svg className="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none" onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}>
          <defs>
            <clipPath id="dm-clip">
              <rect id="dm-clip-rect" x="0" y="0" width={progress * 1918.2} height="97.7" />
            </clipPath>
          </defs>
          <polygon points="94.1 23.4 94.1 74 94.1 74.3 112.6 74.3 112.6 74 112.6 23.4 112.6 23.2 94.1 23.2 94.1 23.4"/>
          <path d="M67.2,15.6c-3.6-1.1-7.3-1.7-11.1-1.7-20.2,0-36.5,15.7-36.5,35.1s16.3,34.9,36.5,34.9,7.5-.7,11.1-1.7v5.2h21.3V10.4h-21.3v5.2ZM56.1,59.4c-6.4,0-11.1-4.6-11.1-10.5s4.8-10.7,11.1-10.7,10.9,4.6,10.9,10.7-4.8,10.5-10.9,10.5Z"/>
          <g clipPath="url(#dm-clip)">
            <g>
              <rect x="117.5" y="23.4" width="18.5" height="50.8"/><rect x="141" y="23.4" width="18.5" height="50.8"/><rect x="164.4" y="23.4" width="18.5" height="50.8"/><rect x="187.9" y="23.4" width="18.5" height="50.8"/><rect x="211.3" y="23.4" width="18.5" height="50.8"/><rect x="234.7" y="23.4" width="18.5" height="50.8"/><rect x="258.2" y="23.4" width="18.5" height="50.8"/><rect x="281.6" y="23.4" width="18.5" height="50.8"/><rect x="305.1" y="23.4" width="18.5" height="50.8"/><rect x="328.5" y="23.4" width="18.5" height="50.8"/>
              <rect x="352" y="23.4" width="18.5" height="50.8"/><rect x="375.4" y="23.4" width="18.5" height="50.8"/><rect x="398.9" y="23.4" width="18.5" height="50.8"/><rect x="422.3" y="23.4" width="18.5" height="50.8"/><rect x="445.8" y="23.4" width="18.5" height="50.8"/><rect x="469.2" y="23.4" width="18.5" height="50.8"/><rect x="492.6" y="23.4" width="18.5" height="50.8"/><rect x="516.1" y="23.4" width="18.5" height="50.8"/><rect x="539.5" y="23.4" width="18.5" height="50.8"/><rect x="563" y="23.4" width="18.5" height="50.8"/>
              <rect x="586.4" y="23.4" width="18.5" height="50.8"/><rect x="609.9" y="23.4" width="18.5" height="50.8"/><rect x="633.3" y="23.4" width="18.5" height="50.8"/><rect x="656.8" y="23.4" width="18.5" height="50.8"/><rect x="680.2" y="23.4" width="18.5" height="50.8"/><rect x="703.7" y="23.4" width="18.5" height="50.8"/><rect x="727.1" y="23.4" width="18.5" height="50.8"/><rect x="750.5" y="23.4" width="18.5" height="50.8"/><rect x="774" y="23.4" width="18.5" height="50.8"/><rect x="797.4" y="23.4" width="18.5" height="50.8"/>
              <rect x="820.9" y="23.4" width="18.5" height="50.8"/><rect x="844.3" y="23.4" width="18.5" height="50.8"/><rect x="867.8" y="23.4" width="18.5" height="50.8"/><rect x="891.2" y="23.4" width="18.5" height="50.8"/><rect x="914.7" y="23.4" width="18.5" height="50.8"/><rect x="938.1" y="23.4" width="18.5" height="50.8"/><rect x="961.6" y="23.4" width="18.5" height="50.8"/><rect x="985" y="23.4" width="18.5" height="50.8"/><rect x="1008.4" y="23.4" width="18.5" height="50.8"/><rect x="1031.9" y="23.4" width="18.5" height="50.8"/>
              <rect x="1055.3" y="23.4" width="18.5" height="50.8"/><rect x="1078.8" y="23.4" width="18.5" height="50.8"/><rect x="1102.2" y="23.4" width="18.5" height="50.8"/><rect x="1125.7" y="23.4" width="18.5" height="50.8"/><rect x="1149.1" y="23.4" width="18.5" height="50.8"/><rect x="1172.6" y="23.4" width="18.5" height="50.8"/><rect x="1196" y="23.4" width="18.5" height="50.8"/><rect x="1219.5" y="23.4" width="18.5" height="50.8"/><rect x="1242.9" y="23.4" width="18.5" height="50.8"/><rect x="1266.3" y="23.4" width="18.5" height="50.8"/>
              <rect x="1289.8" y="23.4" width="18.5" height="50.8"/><rect x="1313.2" y="23.4" width="18.5" height="50.8"/><rect x="1336.7" y="23.4" width="18.5" height="50.8"/><rect x="1360.1" y="23.4" width="18.5" height="50.8"/><rect x="1383.6" y="23.4" width="18.5" height="50.8"/><rect x="1407" y="23.4" width="18.5" height="50.8"/><rect x="1430.5" y="23.4" width="18.5" height="50.8"/><rect x="1453.9" y="23.4" width="18.5" height="50.8"/><rect x="1477.4" y="23.4" width="18.5" height="50.8"/><rect x="1500.8" y="23.4" width="18.5" height="50.8"/>
              <rect x="1524.2" y="23.4" width="18.5" height="50.8"/><rect x="1547.7" y="23.4" width="18.5" height="50.8"/><rect x="1571.1" y="23.4" width="18.5" height="50.8"/><rect x="1594.6" y="23.4" width="18.5" height="50.8"/><rect x="1618" y="23.4" width="18.5" height="50.8"/><rect x="1641.5" y="23.4" width="18.5" height="50.8"/><rect x="1664.9" y="23.4" width="18.5" height="50.8"/><rect x="1688.4" y="23.4" width="18.5" height="50.8"/><rect x="1711.8" y="23.4" width="18.5" height="50.8"/><rect x="1735.2" y="23.4" width="18.5" height="50.8"/>
              <rect x="1758.7" y="23.4" width="18.5" height="50.8"/><rect x="1782.1" y="23.4" width="18.5" height="50.8"/>
            </g>
          </g>
          <g>
            <polygon points="1805.6 23.4 1805.6 74 1805.6 74.3 1824.1 74.3 1824.1 74 1824.1 23.4 1824.1 23.2 1805.6 23.2 1805.6 23.4"/>
            <path d="M1862.1,13.8c-3.9,0-7.5.7-11.1,1.7v-5.2h-21.3v77h21.3v-5.2c3.6,1.1,7.3,1.7,11.1,1.7,20.2,0,36.5-15.7,36.5-34.9s-16.3-35.1-36.5-35.1ZM1862.1,59.4c-6.1,0-10.9-4.6-10.9-10.5s4.8-10.7,10.9-10.7,11.1,4.6,11.1,10.7-4.8,10.5-11.1,10.5Z"/>
          </g>
        </svg>
      </div>

      {/* 이전 네비 힌트 */}
      <div
        className="dm-nav-hint dm-nav-hint--top"
        style={{ position: 'absolute', opacity: sectionIndex <= 0 ? 0 : navHint === 'top' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out', zIndex: 200 }}
      >
        <span className="dm-nav-hint-arrow">↑</span>
        <span className="dm-nav-hint-label">이전</span>
      </div>

      {/* 다음 네비 힌트 */}
      <div
        className="dm-nav-hint dm-nav-hint--bot"
        style={{ position: 'absolute', opacity: sectionIndex >= totalSections - 1 ? 0 : navHint === 'bot' ? 1 : 0.35, transition: 'opacity 0.4s ease-in-out', zIndex: 200 }}
      >
        <span className="dm-nav-hint-label">다음</span>
        <span className="dm-nav-hint-arrow">↓</span>
      </div>

      {/* 스크롤 컨텐츠 */}
      <div
        className="dm-scroll"
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={handleClick}
      >
        {/* 섹션 1: 디자이너 이미지 그리드 */}
        <div
          className="dm-section dm-section--aproject-images"
          id="sec-aproject"
          style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <div className="dm-ap-grid">
            <figure className="dm-ap-thumb">
              <img src="/image/asset_img_6.png" alt="네빌 브로디" className="dm-ap-img" />
              <figcaption className="dm-ref-caption">네빌 브로디</figcaption>
            </figure>
            <figure className="dm-ap-thumb">
              <img src="/image/asset_img_12.png" alt="사랑 쿨카르니" className="dm-ap-img" />
              <figcaption className="dm-ref-caption">사랑 쿨카르니</figcaption>
            </figure>
            <figure className="dm-ap-thumb">
              <img src="/image/asset_img_27.png" alt="엠엠 파리" className="dm-ap-img" />
              <figcaption className="dm-ref-caption">엠엠 파리</figcaption>
            </figure>
            <figure className="dm-ap-thumb">
              <img src="/image/asset_img_38.png" alt="하라 겐야" className="dm-ap-img" />
              <figcaption className="dm-ref-caption">하라 겐야</figcaption>
            </figure>
          </div>
        </div>

        {/* 섹션 2: 제목 + 설명 + 스티커 */}
        <div
          className="dm-section dm-section--aproject-info"
          id="sec-aproject-info"
          style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
        >
          <h2 className="dm-title">&lt;안체 프로젝트 A-Project&gt;</h2>
          <p className="dm-body">안체 프로젝트는 AG 안상수체 탄생 40주년을 기념해 진행된 프로젝트로, 참여 디자이너들이 AG 안상수체의 모듈을 활용해 새로운 탈네모틀 한글꼴을 제작하고 안상수와 한글에 대한 각자의 생각을 담아내는 연구 프로젝트다. 연구소는 디자이너들이 11,172자의 한글 완성형 글자를 완성할 수 있도록 제작 전 과정을 지원한다.</p>
          <img
            src="/image/asset_img_25.png"
            className="ap-sticker"
            alt="안체프로젝트 바로가기"
            onClick={(e) => { e.stopPropagation(); setIsModalOpen(true); }}
            style={{ cursor: 'pointer' }}
          />
        </div>
      </div>

      <AncheProjectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </motion.div>
  );
}
