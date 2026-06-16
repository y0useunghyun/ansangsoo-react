import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PageHeader() {
  const navigate = useNavigate();

  return (
    <div className="dm-header" id="dm-header" style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 1000, display: 'flex', alignItems: 'center' }}>
      <button 
        className="dm-home-btn" 
        onClick={() => navigate('/')}
        style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontFamily: 'agahnsangsoo2012, sans-serif' }} // index.css에 정의된 스타일이 우선 적용됨
      >
        &lt; 홈
      </button>
      <svg id="dm-progress-svg" className="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none" style={{ flex: 1 }}>
        <defs>
          <clipPath id="dm-clip">
            <rect id="dm-clip-rect" x="0" y="0" width="100%" height="97.7"/>
          </clipPath>
        </defs>
        {/* 왼쪽 d */}
        <polygon points="94.1 23.4 94.1 74 94.1 74.3 112.6 74.3 112.6 74 112.6 23.4 112.6 23.2 94.1 23.2 94.1 23.4"/>
          <path d="M67.2,15.6c-3.6-1.1-7.3-1.7-11.1-1.7-20.2,0-36.5,15.7-36.5,35.1s16.3,34.9,36.5,34.9,7.5-.7,11.1-1.7v5.2h21.3V10.4h-21.3v5.2ZM56.1,59.4c-6.4,0-11.1-4.6-11.1-10.5s4.8-10.7,11.1-10.7,10.9,4.6,10.9,10.7-4.8,10.5-10.9,10.5Z"/>
        {/* 막대 그룹 — clipPath로 좌→우 reveal */}
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
        </g>{/* /clip group */}
        {/* 오른쪽 d — translateX 애니메이션 임시로 항상 보이게 */}
        <g id="dm-right-d" style={{ transform: 'translateX(0px)' }}>
          <polygon points="1805.6 23.4 1805.6 74 1805.6 74.3 1824.1 74.3 1824.1 74 1824.1 23.4 1824.1 23.2 1805.6 23.2 1805.6 23.4"/>
            <path d="M1862.1,13.8c-3.9,0-7.5.7-11.1,1.7v-5.2h-21.3v77h21.3v-5.2c3.6,1.1,7.3,1.7,11.1,1.7,20.2,0,36.5-15.7,36.5-34.9s-16.3-35.1-36.5-35.1ZM1862.1,59.4c-6.1,0-10.9-4.6-10.9-10.5s4.8-10.7,10.9-10.7,11.1,4.6,11.1,10.7-4.8,10.5-11.1,10.5Z"/>
        </g>
      </svg>
    </div>
  );
}
