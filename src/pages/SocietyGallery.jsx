import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// 실제 이미지 리스트 (만두피, 혜진님) - 컴포넌트 외부에서 한 번만 생성하여 purity 에러 방지
const files = [
  { src: '/image/dream.jpeg', caption: '꿈에그린주간보호', desc: '계원예술대학교에서 버스정류장으로 걷다 우연히 눈에 들어온 간판.', tooltipDir: 'right' },
  { src: '/image/hyejin.jpeg', caption: '과학동아', desc: '부산 여행 중 학우 혜진님이 발견해 보내준 사진.', tooltipDir: 'right' },
  { src: '/image/post.jpeg', caption: '우체국', desc: '근로 중 우체국에서 마주친 경고문(?)', tooltipDir: 'left' },
];

const ROTATIONS = [-8, 3, 10];

const societyImages = files.map((file, i) => ({
  id: i,
  rotate: ROTATIONS[i] ?? 0,
  marginTop: 0,
  marginLeft: 0,
  src: file.src,
  caption: file.caption,
  desc: file.desc,
  tooltipDir: file.tooltipDir,
}));

export default function SocietyGallery() {
  const scrollRef = useRef(null);
  const [progress] = useState(1);
  const [hoveredId, setHoveredId] = useState(null);

  // 화면 리사이즈 시 스케일 조정 (선택적)
  useEffect(() => {
    const handleResize = () => {
      // 필요한 경우 스케일 조정 로직 추가
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    setProgress(p);
  };

  const handleClick = (e) => {
    // 헤더나 링크 클릭 시 스크롤 방지
    if (e.target.closest('.dm-header') || e.target.closest('a')) return;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
    }
  };

  const clipWidth = 1843 * progress;
  const rightDTranslateX = 1843 * (progress - 1);
  const rightDOpacity = progress < 0.04 ? 0 : 1;

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100vw', height: '100vh', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}
    >
      <div className="dm-header" id="dm-header" style={{ pointerEvents: 'auto', zIndex: 100 }}>
        <Link to="/" className="dm-home-btn" id="dm-home-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>&lt; 홈</Link>
        <svg id="dm-progress-svg" className="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
          <defs>
            <clipPath id="dm-clip">
              <rect id="dm-clip-rect" x="0" y="0" width={clipWidth} height="97.7"/>
            </clipPath>
          </defs>
          <polygon points="94.1 23.4 94.1 74 94.1 74.3 112.6 74.3 112.6 74 112.6 23.4 112.6 23.2 94.1 23.2 94.1 23.4"/>
          <path d="M67.2,15.6c-3.6-1.1-7.3-1.7-11.1-1.7-20.2,0-36.5,15.7-36.5,35.1s16.3,34.9,36.5,34.9,7.5-.7,11.1-1.7v5.2h21.3V10.4h-21.3v5.2ZM56.1,59.4c-6.4,0-11.1-4.6-11.1-10.5s4.8-10.7,11.1-10.7,10.9,4.6,10.9,10.7-4.8,10.5-10.9,10.5Z"/>
          <g clipPath="url(#dm-clip)">
            <g id="dm-bars">
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
          <g id="dm-right-d" transform={`translate(${rightDTranslateX},0)`} style={{ opacity: rightDOpacity }}>
            <polygon points="1805.6 23.4 1805.6 74 1805.6 74.3 1824.1 74.3 1824.1 74 1824.1 23.4 1824.1 23.2 1805.6 23.2 1805.6 23.4"/>
            <path d="M1862.1,13.8c-3.9,0-7.5.7-11.1,1.7v-5.2h-21.3v77h21.3v-5.2c3.6,1.1,7.3,1.7,11.1,1.7,20.2,0,36.5-15.7,36.5-34.9s-16.3-35.1-36.5-35.1ZM1862.1,59.4c-6.1,0-10.9-4.6-10.9-10.5s4.8-10.7,10.9-10.7,11.1,4.6,11.1,10.7-4.8,10.5-11.1,10.5Z"/>
          </g>
        </svg>
      </div>

<div
        className="dm-scroll"
        ref={scrollRef}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: 'calc(100vh - 97px)', overflow: 'hidden', paddingTop: '120px' }}
      >
        <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
          <h1
            style={{
              fontFamily: 'AGahnsangsoo2012',
              textAlign: 'center',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              marginBottom: '40px',
              color: '#000',
              fontWeight: 'bold'
            }}
          >
            우연히 만난 안상수체들
          </h1>

          <style>{`
            .society-tooltip {
              position: absolute;
              top: 20px;
              background: rgba(0, 0, 0, 0.85);
              color: #fff;
              padding: 10px 14px;
              border-radius: 8px;
              font-family: 'AGahnsangsoo2012', sans-serif;
              font-size: 1.5rem;
              text-align: left;
              white-space: nowrap;
              opacity: 0;
              pointer-events: none;
              transition: opacity 0.2s ease, transform 0.2s ease;
              box-shadow: 0 4px 15px rgba(0,0,0,0.2);
              z-index: 20;
            }
            
            /* 우측 말풍선 */
            .society-tooltip.dir-right {
              right: -10px;
              transform: translateX(100%);
            }
            .society-img-wrap:hover .society-tooltip.dir-right {
              opacity: 1;
              transform: translateX(100%) translateX(20px);
            }
            .society-tooltip.dir-right::before {
              content: '';
              position: absolute;
              top: 16px;
              left: -10px;
              border-width: 6px 10px 6px 0;
              border-style: solid;
              border-color: transparent rgba(0, 0, 0, 0.85) transparent transparent;
            }

            /* 좌측 말풍선 */
            .society-tooltip.dir-left {
              left: -10px;
              transform: translateX(-100%);
            }
            .society-img-wrap:hover .society-tooltip.dir-left {
              opacity: 1;
              transform: translateX(-100%) translateX(-20px);
            }
            .society-tooltip.dir-left::before {
              content: '';
              position: absolute;
              top: 16px;
              right: -10px;
              border-width: 6px 0 6px 10px;
              border-style: solid;
              border-color: transparent transparent transparent rgba(0, 0, 0, 0.85);
            }
          `}</style>

          <div style={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '60px',
            padding: '40px'
          }}>
            {societyImages.map((img) => (
              <motion.div
                key={img.id}
                className="society-img-wrap"
                initial={{ rotate: img.rotate }}
                whileHover={{ scale: 1.05, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                onMouseEnter={() => setHoveredId(img.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  position: 'relative',
                  zIndex: hoveredId === img.id ? 60 : 1,
                }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{
                    maxWidth: '26vw',
                    maxHeight: '55vh',
                    width: 'auto',
                    height: 'auto',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                  }}
                />
                {img.desc && (
                  <div className={`society-tooltip dir-${img.tooltipDir}`}>
                    {img.desc}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
