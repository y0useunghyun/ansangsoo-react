import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageHeader from '../components/PageHeader';

const CONCEPTS = [
  {
    id: 'intro',
    title: '안상수체 파헤치기',
    description: '안상수체는 한글 타이포그래피 역사상 가장 파격적인 실험이었습니다.\n어떤 철학이 담겨 있는지 함께 알아볼까요?',
    image: null,
  },
  {
    id: 'concept1',
    title: '1. 탈네모틀 (Out of Square)',
    description: '기존의 한글 폰트는 한자를 본따서 만든 보이지 않는 \'네모 틀\' 안에 갇혀 있었습니다.\n안상수체는 이 네모 틀을 깨부수고, 초성/중성/종성이 각자의 형태와 비율대로 자유롭게 존재하게 만들었습니다.',
    image: '🔳 ➡️ 🦋',
  },
  {
    id: 'concept2',
    title: '2. 빨랫줄 비례 (Clothesline Alignment)',
    description: '서양의 알파벳이 베이스라인(밑줄)에 맞춰 글자를 배열한다면, 안상수체는 한글의 특징을 살려 \'상단(윗줄)\'을 기준으로 글자를 배열합니다.\n마치 빨랫줄에 글자들을 널어놓은 듯한 독특하고 리듬감 있는 비례가 특징입니다.',
    image: '👕---👖---🧦',
  },
  {
    id: 'concept3',
    title: '3. 3가지 모임꼴',
    description: '안상수체는 모음(가운데소리)의 형태에 따라 크게 3가지로 글자를 조립합니다.\n\n가로모임: 가, 나, 다 (모음이 자음 오른쪽에 위치)\n세로모임: 고, 노, 도 (모음이 자음 아래에 위치)\n섞임모임: 과, 놔, 둬 (가로와 세로가 섞인 형태)',
    image: '🧩',
  }
];

const QUESTIONS = [
  {
    q: '안상수체가 기존 한글 폰트의 보이지 않는 사각형 구속을 벗어난 디자인 원칙을 무엇이라고 부를까요?',
    options: ['탈네모틀', '안네모틀', '빨랫줄 원리', '정방형 원리'],
    answer: 0
  },
  {
    q: '다음 중 안상수체의 기준선(Alignment) 원리를 가장 잘 설명한 것은?',
    options: ['모든 글자는 베이스라인(밑줄)에 맞춘다.', '글자의 상단을 기준선으로 삼는 빨랫줄 비례를 사용한다.', '글자의 중앙을 맞추는 센터 라인을 사용한다.', '기준선이 없이 무작위로 배열된다.'],
    answer: 1
  },
  {
    q: '다음 중 "섞임모임" 구조를 가진 글자는?',
    options: ['가', '별', '귤', '쾅'],
    answer: 3
  }
];

export default function ConceptGame() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0~3: 개념, 4: 게임시작, 5~7: 퀴즈, 8: 결과
  const [score, setScore] = useState(0);

  const handleNext = () => {
    setStep(prev => prev + 1);
  };

  const handleAnswer = (selectedIndex) => {
    const qIndex = step - 5;
    if (QUESTIONS[qIndex].answer === selectedIndex) {
      setScore(prev => prev + 1);
      // 정답 이펙트 
    }
    setStep(prev => prev + 1);
  };

  return (
    <div style={{
      width: '100vw', minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      fontFamily: 'agahnsangsoo2012, sans-serif',
      padding: '120px 40px 40px 40px', // 헤더 공간 확보를 위해 위쪽 패딩 추가
      position: 'relative',
      overflowX: 'hidden'
    }}>
      <PageHeader />

      <AnimatePresence mode="wait">
        {/* === 개념 갤러리 섹션 === */}
        {step < 4 && (
          <motion.div
            key={`concept-${step}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.4 }}
            style={{ maxWidth: '800px', width: '100%', backgroundColor: '#fff', padding: '60px', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', textAlign: 'center' }}
          >
            {CONCEPTS[step].image && (
              <div style={{ fontSize: '80px', marginBottom: '30px' }}>{CONCEPTS[step].image}</div>
            )}
            <h1 style={{ fontSize: '48px', marginBottom: '30px', color: '#111' }}>{CONCEPTS[step].title}</h1>
            <p style={{ fontSize: '26px', lineHeight: '1.6', color: '#444', whiteSpace: 'pre-wrap' }}>
              {CONCEPTS[step].description}
            </p>
            <div style={{ marginTop: '50px' }}>
              <button 
                onClick={handleNext}
                style={{ padding: '16px 40px', background: '#000', color: '#fff', border: 'none', borderRadius: '50px', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
              >
                {step === 3 ? '게임 시작하기 🎮' : '다음 알아보기 ➡️'}
              </button>
            </div>
          </motion.div>
        )}

        {/* === 게임 브릿지 === */}
        {step === 4 && (
          <motion.div
            key="game-intro"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            style={{ textAlign: 'center' }}
          >
            <h1 style={{ fontSize: '64px', marginBottom: '20px' }}>단어 맞추기 퀴즈</h1>
            <p style={{ fontSize: '28px', color: '#666', marginBottom: '40px' }}>앞서 배운 개념들을 얼마나 이해했는지 테스트해볼까요?</p>
            <button 
              onClick={handleNext}
              style={{ padding: '20px 60px', background: '#FF3366', color: '#fff', border: 'none', borderRadius: '16px', fontSize: '32px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012', boxShadow: '0 10px 20px rgba(255,51,102,0.3)' }}
            >
              도전!
            </button>
          </motion.div>
        )}

        {/* === 퀴즈 섹션 === */}
        {step >= 5 && step <= 7 && (
          <motion.div
            key={`quiz-${step}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            style={{ maxWidth: '800px', width: '100%' }}
          >
            <div style={{ fontSize: '24px', color: '#888', marginBottom: '20px' }}>문제 {step - 4} / 3</div>
            <h2 style={{ fontSize: '36px', lineHeight: '1.5', marginBottom: '40px', color: '#111', background: '#fff', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 20px rgba(0,0,0,0.05)' }}>
              {QUESTIONS[step - 5].q}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
              {QUESTIONS[step - 5].options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  style={{
                    padding: '24px', textAlign: 'left', fontSize: '28px', background: '#fff', 
                    border: '2px solid #ddd', borderRadius: '12px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012',
                    transition: 'all 0.2s'
                  }}
                  onMouseOver={e => { e.currentTarget.style.borderColor = '#000'; e.currentTarget.style.background = '#f9f9f9'; }}
                  onMouseOut={e => { e.currentTarget.style.borderColor = '#ddd'; e.currentTarget.style.background = '#fff'; }}
                >
                  <span style={{ fontWeight: 'bold', marginRight: '16px', color: '#999' }}>{idx + 1}</span> {opt}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* === 결과 섹션 === */}
        {step === 8 && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center', background: '#fff', padding: '80px', borderRadius: '30px', boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
          >
            <div style={{ fontSize: '100px', marginBottom: '20px' }}>{score === 3 ? '🎉' : '👏'}</div>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>
              {score} / 3 정답!
            </h1>
            <p style={{ fontSize: '28px', color: '#666', marginBottom: '50px' }}>
              {score === 3 ? '완벽합니다! 당신은 이미 안상수체 마스터입니다.' : '훌륭합니다! 안상수체의 철학을 잘 이해하고 계시네요.'}
            </p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
              <button 
                onClick={() => { setStep(0); setScore(0); }}
                style={{ padding: '16px 40px', background: '#eee', color: '#111', border: 'none', borderRadius: '12px', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
              >
                다시 학습하기
              </button>
              <button 
                onClick={() => navigate('/')}
                style={{ padding: '16px 40px', background: '#000', color: '#fff', border: 'none', borderRadius: '12px', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
              >
                홈으로 돌아가기
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
