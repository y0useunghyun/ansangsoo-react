import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

// 실제 이미지 리스트 (만두피, 혜진님) - 컴포넌트 외부에서 한 번만 생성하여 purity 에러 방지
const files = [
  { src: '/image/manduppi.jpeg', caption: '만두피', desc: '마트를 돌다가 우연히 발견한 만두피 제품.', tooltipDir: 'left' },
  { src: '/image/hyejin.jpeg', caption: '혜진님', desc: '부산 여행을 간 학우 혜진님이 찾아서 보내준 사진.', tooltipDir: 'right' }
];

const societyImages = files.map((file, i) => {
  // 왼쪽 사진은 왼쪽(-)으로, 오른쪽 사진은 오른쪽(+)으로 기울이기
  const sign = file.tooltipDir === 'left' ? -1 : 1;
  const rotate = sign * (Math.floor(Math.random() * 6) + 10);
  const marginTop = Math.floor(Math.random() * 40) - 20;
  const marginLeft = Math.floor(Math.random() * 40) - 20;

  return {
    id: i,
    rotate,
    marginTop,
    marginLeft,
    src: file.src,
    caption: file.caption,
    desc: file.desc,
    tooltipDir: file.tooltipDir
  };
});

export default function SocietyGallery() {
  const scrollRef = useRef(null);
  const [progress, setProgress] = useState(0);

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
          <path d="M56.8,31c-4-3.1-8.8-4.7-14-4.7-12.6,0-22.6,10.1-22.6,22.6s10.1,22.6,22.6,22.6,10.1-1.8,14-4.8v9.9h8.8V21.1h-8.8v9.9ZM42.8,62.6c-7.5,0-13.7-6.1-13.7-13.7s6.1-13.5,13.7-13.5,13.8,5.9,13.8,13.5-6.3,13.7-13.8,13.7Z"/>
          <g clipPath="url(#dm-clip)">
            <g id="dm-bars">
              <rect x="75.1" y="32.6" width="8.8" height="32.9"/><rect x="93.4" y="32.6" width="8.8" height="32.9"/><rect x="111.8" y="32.6" width="8.8" height="32.9"/><rect x="130.1" y="32.6" width="8.8" height="32.9"/><rect x="148.4" y="32.6" width="8.8" height="32.9"/><rect x="166.7" y="32.6" width="8.8" height="32.9"/><rect x="185.1" y="32.6" width="8.8" height="32.9"/><rect x="203.4" y="32.6" width="8.8" height="32.9"/><rect x="221.7" y="32.6" width="8.8" height="32.9"/><rect x="240" y="32.6" width="8.8" height="32.9"/>
              <rect x="258.4" y="32.6" width="8.8" height="32.9"/><rect x="276.7" y="32.6" width="8.8" height="32.9"/><rect x="295" y="32.6" width="8.8" height="32.9"/><rect x="313.3" y="32.6" width="8.8" height="32.9"/><rect x="331.7" y="32.6" width="8.8" height="32.9"/><rect x="350" y="32.6" width="8.8" height="32.9"/><rect x="368.3" y="32.6" width="8.8" height="32.9"/><rect x="386.6" y="32.6" width="8.8" height="32.9"/><rect x="405" y="32.6" width="8.8" height="32.9"/><rect x="423.3" y="32.6" width="8.8" height="32.9"/>
              <rect x="441.6" y="32.6" width="8.8" height="32.9"/><rect x="459.9" y="32.6" width="8.8" height="32.9"/><rect x="478.3" y="32.6" width="8.8" height="32.9"/><rect x="496.6" y="32.6" width="8.8" height="32.9"/><rect x="514.9" y="32.6" width="8.8" height="32.9"/><rect x="533.2" y="32.6" width="8.8" height="32.9"/><rect x="551.6" y="32.6" width="8.8" height="32.9"/><rect x="569.9" y="32.6" width="8.8" height="32.9"/><rect x="588.2" y="32.6" width="8.8" height="32.9"/><rect x="606.5" y="32.6" width="8.8" height="32.9"/>
              <rect x="624.8" y="32.6" width="8.8" height="32.9"/><rect x="643.2" y="32.6" width="8.8" height="32.9"/><rect x="661.5" y="32.6" width="8.8" height="32.9"/><rect x="679.8" y="32.6" width="8.8" height="32.9"/><rect x="698.1" y="32.6" width="8.8" height="32.9"/><rect x="716.5" y="32.6" width="8.8" height="32.9"/><rect x="734.8" y="32.6" width="8.8" height="32.9"/><rect x="753.1" y="32.6" width="8.8" height="32.9"/><rect x="771.4" y="32.6" width="8.8" height="32.9"/><rect x="789.8" y="32.6" width="8.8" height="32.9"/>
              <rect x="808.1" y="32.6" width="8.8" height="32.9"/><rect x="826.4" y="32.6" width="8.8" height="32.9"/><rect x="844.7" y="32.6" width="8.8" height="32.9"/><rect x="863.1" y="32.6" width="8.8" height="32.9"/><rect x="881.4" y="32.6" width="8.8" height="32.9"/><rect x="899.7" y="32.6" width="8.8" height="32.9"/><rect x="918" y="32.6" width="8.8" height="32.9"/><rect x="936.4" y="32.6" width="8.8" height="32.9"/><rect x="954.7" y="32.6" width="8.8" height="32.9"/><rect x="973" y="32.6" width="8.8" height="32.9"/>
              <rect x="991.3" y="32.6" width="8.8" height="32.9"/><rect x="1009.7" y="32.6" width="8.8" height="32.9"/><rect x="1028" y="32.6" width="8.8" height="32.9"/><rect x="1046.3" y="32.6" width="8.8" height="32.9"/><rect x="1064.6" y="32.6" width="8.8" height="32.9"/><rect x="1083" y="32.6" width="8.8" height="32.9"/><rect x="1101.3" y="32.6" width="8.8" height="32.9"/><rect x="1119.6" y="32.6" width="8.8" height="32.9"/><rect x="1137.9" y="32.6" width="8.8" height="32.9"/><rect x="1156.2" y="32.6" width="8.8" height="32.9"/>
              <rect x="1174.6" y="32.6" width="8.8" height="32.9"/><rect x="1192.9" y="32.6" width="8.8" height="32.9"/><rect x="1211.2" y="32.6" width="8.8" height="32.9"/><rect x="1229.5" y="32.6" width="8.8" height="32.9"/><rect x="1247.9" y="32.6" width="8.8" height="32.9"/><rect x="1266.2" y="32.6" width="8.8" height="32.9"/><rect x="1284.5" y="32.6" width="8.8" height="32.9"/><rect x="1302.8" y="32.6" width="8.8" height="32.9"/><rect x="1321.2" y="32.6" width="8.8" height="32.9"/><rect x="1339.5" y="32.6" width="8.8" height="32.9"/>
              <rect x="1357.8" y="32.6" width="8.8" height="32.9"/><rect x="1376.1" y="32.6" width="8.8" height="32.9"/><rect x="1394.5" y="32.6" width="8.8" height="32.9"/><rect x="1412.8" y="32.6" width="8.8" height="32.9"/><rect x="1431.1" y="32.6" width="8.8" height="32.9"/><rect x="1449.4" y="32.6" width="8.8" height="32.9"/><rect x="1467.8" y="32.6" width="8.8" height="32.9"/><rect x="1486.1" y="32.6" width="8.8" height="32.9"/><rect x="1504.4" y="32.6" width="8.8" height="32.9"/><rect x="1522.7" y="32.6" width="8.8" height="32.9"/>
              <rect x="1541.1" y="32.6" width="8.8" height="32.9"/><rect x="1559.4" y="32.6" width="8.8" height="32.9"/><rect x="1577.7" y="32.6" width="8.8" height="32.9"/><rect x="1596" y="32.6" width="8.8" height="32.9"/><rect x="1614.4" y="32.6" width="8.8" height="32.9"/><rect x="1632.7" y="32.6" width="8.8" height="32.9"/><rect x="1651" y="32.6" width="8.8" height="32.9"/><rect x="1669.3" y="32.6" width="8.8" height="32.9"/><rect x="1687.7" y="32.6" width="8.8" height="32.9"/><rect x="1706" y="32.6" width="8.8" height="32.9"/>
              <rect x="1724.3" y="32.6" width="8.8" height="32.9"/><rect x="1742.6" y="32.6" width="8.8" height="32.9"/><rect x="1760.9" y="32.6" width="8.8" height="32.9"/><rect x="1779.3" y="32.6" width="8.8" height="32.9"/><rect x="1797.6" y="32.6" width="8.8" height="32.9"/><rect x="1815.9" y="32.6" width="8.8" height="32.9"/><rect x="1834.2" y="32.6" width="8.8" height="32.9"/>
            </g>
          </g>
          <g id="dm-right-d" transform={`translate(${rightDTranslateX},0)`} style={{ opacity: rightDOpacity }}>
            <path d="M1861.4,21.1h-8.8s0,55.5,0,55.5h8.8s0-9.9,0-9.9c4,3.1,8.8,4.8,14,4.8,12.6,0,22.6-10.1,22.6-22.6,0-12.6-10.1-22.6-22.6-22.6s-10.1,1.6-14,4.7v-9.9ZM1861.6,49c0-7.5,6.3-13.5,13.8-13.5s13.7,5.9,13.7,13.5c0,7.5-6.1,13.7-13.7,13.7s-13.8-6.1-13.8-13.7Z"/>
          </g>
        </svg>
      </div>

      <div 
        className="dm-scroll" 
        onScroll={handleScroll} 
        onClick={handleClick} 
        ref={scrollRef}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ padding: '20vh 20px 100px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '150vh' }}>
          <h1
            style={{
              fontFamily: 'AGahnsangsoo2012',
              textAlign: 'center',
              fontSize: 'clamp(3rem, 6vw, 5rem)',
              marginBottom: '100px',
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
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '80px',
            padding: '40px'
          }}>
            {societyImages.map((img) => (
              <motion.div
                key={img.id}
                className="society-img-wrap"
                initial={{ rotate: img.rotate }}
                whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                style={{
                  position: 'relative',
                  marginTop: `${img.marginTop}px`,
                  marginLeft: `${img.marginLeft}px`,
                }}
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  style={{
                    width: '350px',
                    height: 'auto',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                    borderRadius: '4px'
                  }}
                />
                <div className={`society-tooltip dir-${img.tooltipDir}`}>
                  {img.desc}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
