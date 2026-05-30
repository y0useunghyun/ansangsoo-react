import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  const navigate = useNavigate();
  return (
    // framer-motion을 통해 페이지 전환 애니메이션 추가 (원한다면 나중에 더 화려하게 가능)
    <motion.div 
      className="home-page hp-in"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ display: 'block', position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}
    >
      {/* 
        기존 index.html의 home-page 내부 요소들을 
        단 1픽셀의 오차도 없이 1:1로 이식했습니다. 
        class 이름이 기존 style.css와 100% 일치하므로 똑같이 렌더링됩니다.
      */}

      <button className="hp-title" id="hp-title">안상수체에.대해.얼마나.알고.있니</button>

      <div className="hp-kerning">
        <img src="/image/그룹커닝.png" alt="그룹커닝" className="hp-img" />
      </div>

      <div className="hp-tajagi" id="hp-tajagi-home" style={{ cursor: 'pointer' }}>
        <img src="/image/타자기2.png" alt="종이" className="hp-tajagi-paper" />
        <img src="/image/타자기.png" alt="타자기" className="hp-tajagi-base" />
      </div>

      <div className="hp-hak">
        <img src="/image/학.png" alt="학" className="hp-img" />
      </div>

      <div className="hp-expand">
        <img src="/image/확장.png" alt="확장" className="hp-img" />
      </div>

      <div className="hp-hunmin">
        <img src="/image/훈민정음.png" alt="훈민정음" className="hp-img" />
      </div>

      <div className="hp-joyoungjae">
        <img src="/image/조영제.png" alt="조영제" className="hp-img" />
      </div>

      <div className="hp-project-wrap">
        <button className="hp-project-obj" id="hp-project">
          <img src="/image/안체프로젝트.png" alt="안체프로젝트" className="hp-proj-img" />
        </button>
      </div>

      <div className="hp-blob">
        <img src="/image/멋지음안상수.png" alt="멋지음안상수" className="hp-img" />
      </div>

      <div className="hp-brick-wrap">
        <img src="/image/벽돌.png" alt="벽돌" className="hp-brick-img" />
        <button className="hp-sijakagi" id="hp-sijakagi" onClick={() => navigate('/main')}>시작하기</button>
      </div>

      <button className="hp-nav-btn" id="hp-hanbun">한눈에 보기</button>
      <button className="hp-nav-btn" id="hp-meotjieun">멋지은 이들</button>

      {/* 송명선 상세 페이지로 이동하는 SPA Link 버튼 */}
      <Link 
        to="/song" 
        id="hp-song" 
        style={{
          position: 'absolute', 
          left: '300px', 
          top: '600px', 
          fontFamily: '"agahnsangsoo2012", sans-serif', 
          fontSize: '80px', 
          fontWeight: 800, 
          color: '#FF1D25', 
          textDecoration: 'none', 
          zIndex: 100, 
          transition: 'transform 0.2s ease', 
          transformOrigin: 'left center'
        }} 
        onMouseOver={(e) => e.target.style.transform='scale(1.1) rotate(-3deg)'} 
        onMouseOut={(e) => e.target.style.transform='scale(1) rotate(0deg)'}
      >
        송명선 &gt;
      </Link>
    </motion.div>
  );
}
