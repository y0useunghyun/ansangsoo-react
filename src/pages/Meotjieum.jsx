import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const WIKI_DATA = [
  { label: '이름', value: '안상수' },
  { label: '출생', value: '1952년 충청북도 충주' },
  { label: '직업', value: '시각디자이너, 타이포그래퍼, 교육자' },
  { label: '학력', value: '홍익대학교 미술대학 및 동 대학원' },
  { label: '주요 약력', value: '홍익대 시각디자인과 교수, 파주타이포그래피학교(PaTI) 날개(교장)' }
];

export default function Meotjieum() {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ 
        width: '100vw', 
        height: '100vh', 
        backgroundColor: '#fff', 
        position: 'relative', 
        overflow: 'hidden',
        color: '#000',
        fontFamily: 'AGahnsangsoo2012, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}
    >
      {/* 홈 버튼 */}
      <button 
        onClick={() => navigate('/')}
        style={{
          position: 'absolute', top: '20px', left: '20px',
          background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer',
          fontFamily: 'AGahnsangsoo2012, sans-serif', fontWeight: 700, color: '#000', zIndex: 100
        }}
      >
        ← 홈
      </button>

      {/* 인물 사진 및 헤더 */}
      <div style={{ marginTop: '8vh', marginBottom: '40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '24px' }}>
        <img 
          src="/image/안상수.webp" 
          alt="안상수 선생님" 
          onError={(e) => { e.target.src = '/image/안상수.jpeg' }} // webp 로드 실패시 jpeg로 폴백
          style={{ 
            width: '220px', 
            height: 'auto',
            objectFit: 'cover'
          }} 
        />
        <h1 style={{ fontSize: '64px', margin: 0, fontWeight: 700 }}>안상수</h1>
      </div>

      {/* 전체 테이블 컨테이너 (여기에 마우스를 올리면 전체가 한 번에 뜸) */}
      <div 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{ 
          width: '1000px', 
          maxWidth: '95vw', 
          position: 'relative', 
          display: 'flex', 
          overflow: 'hidden',
          paddingBottom: '20px' // 여백 살짝 추가
        }}
      >
        {/* 왼쪽 절반: 라벨들 (좌측 정렬) */}
        <div style={{ width: '50%', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {WIKI_DATA.map((item, i) => (
            <div key={i} style={{ height: '60px', display: 'flex', alignItems: 'center', paddingLeft: '60px' }}>
              <span style={{ fontSize: '32px', fontWeight: 700 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* 오른쪽 절반: 검은색 종이 위에 한 번에 다 뜨는 정보들 */}
        <div style={{ 
          position: 'absolute', 
          right: 0, 
          top: 0, 
          width: '50%', 
          height: '100%',
          backgroundColor: '#000', 
          color: '#fff',
          display: 'flex', 
          flexDirection: 'column', 
          gap: '16px',
          transform: isHovered ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)',
          zIndex: 10
        }}>
          {WIKI_DATA.map((item, i) => (
            <div key={i} style={{ height: '60px', display: 'flex', alignItems: 'center', paddingLeft: '40px' }}>
              <span style={{ fontSize: '24px', fontWeight: 400, wordBreak: 'keep-all', lineHeight: '1.4' }}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 하단 링크 */}
      <div style={{ 
        marginTop: '60px', 
        display: 'flex', 
        gap: '40px',
        fontSize: '18px',
        fontWeight: 500
      }}>
        <a href="https://agfont.com/" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none', borderBottom: '1.5px solid #000', paddingBottom: '4px' }}>
          AG 타이포그라피연구소
        </a>
        <a href="http://ssahn.com/" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none', borderBottom: '1.5px solid #000', paddingBottom: '4px' }}>
          안상수.com
        </a>
        <a href="http://pati.kr/" target="_blank" rel="noreferrer" style={{ color: '#000', textDecoration: 'none', borderBottom: '1.5px solid #000', paddingBottom: '4px' }}>
          파주타이포그라피학교(PaTI)
        </a>
      </div>

    </motion.div>
  );
}
