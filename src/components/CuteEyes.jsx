import React, { useState, useEffect } from 'react';

export default function CuteEyes({ onClick }) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: e.clientX,
        y: e.clientY
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 눈알을 그리기 위한 공통 로직
  const renderEye = (centerX, centerY) => {
    // 화면 중앙 기준 좌표 계산
    const cx = window.innerWidth / 2 + centerX;
    const cy = window.innerHeight / 2 + centerY;
    
    // 마우스와 눈 중심 사이의 거리 및 각도
    const dx = mousePos.x - cx;
    const dy = mousePos.y - cy;
    const angle = Math.atan2(dy, dx);
    
    // 동공이 움직일 수 있는 최대 반경
    const maxRadius = 15;
    const distance = Math.min(Math.sqrt(dx * dx + dy * dy) * 0.05, maxRadius);
    
    // 동공 위치
    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;

    // 3D 회전 각도 계산 (마우스 위치에 따라 눈 전체가 살짝 기울어짐)
    const rotateY = (dx / window.innerWidth) * 40; 
    const rotateX = -(dy / window.innerHeight) * 40;

    return (
      <div style={{
        width: '60px',
        height: '70px',
        backgroundColor: '#fff',
        borderRadius: '50%',
        position: 'relative',
        boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.2), 0px 5px 10px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.1s ease-out'
      }}>
        {/* 눈동자 (동공) */}
        <div style={{
          width: '25px',
          height: '25px',
          backgroundColor: '#222',
          borderRadius: '50%',
          position: 'absolute',
          transform: `translate(${pupilX}px, ${pupilY}px)`,
          transition: 'transform 0.05s linear'
        }}>
          {/* 눈동자 하이라이트 (초롱초롱) */}
          <div style={{
            width: '8px',
            height: '8px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: '5px',
            left: '5px'
          }}></div>
          <div style={{
            width: '3px',
            height: '3px',
            backgroundColor: '#fff',
            borderRadius: '50%',
            position: 'absolute',
            top: '13px',
            left: '15px'
          }}></div>
        </div>
      </div>
    );
  };

  return (
    <div 
      onClick={onClick}
      style={{
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px',
      cursor: 'pointer',
      // 이모티콘처럼 귀엽게 둥둥 뜨는 애니메이션
      animation: 'float 3s ease-in-out infinite'
    }}>
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
      
      {/* 왼쪽 눈 */}
      {renderEye(-40, 0)}
      
      {/* 오른쪽 눈 */}
      {renderEye(40, 0)}
    </div>
  );
}
