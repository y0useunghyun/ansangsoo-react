import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
  { word: '탈네모틀', def: '네모 틀을 벗어난 글자꼴. 초·중·종성이 각자의 형태로 자유롭게 배치된다.' },
  { word: '훈민정음', def: '세종대왕이 창제한 한글의 원형. 안상수체는 이 창제 원리를 조형 언어로 삼았다.' },
  { word: '세벌식', def: '초성·중성·종성을 각각 다른 글쇠에 배치한 자판. 공병우 박사가 1949년 고안했다.' },
  { word: '모듈', def: '최소한의 자소 단위를 조합해 최대한의 글자를 만드는 안상수체의 핵심 원리.' },
  { word: '기하학', def: '수직선·수평선·사선·정원으로만 이루어진 안상수체의 조형 언어.' },
  { word: '공병우', def: '세벌식 타자기를 발명한 안과의사. 한글 기계화 역사를 바꿔놓은 인물.' },
  { word: '초성', def: '음절의 첫소리 자음. 세벌식 자판에서는 왼손 영역에 배치된다.' },
  { word: '중성', def: '음절 가운데의 모음. 세벌식에서 중앙 영역을 차지한다.' },
  { word: '종성', def: '음절 끝의 받침 자음. 세벌식에서는 오른손 영역에 별도 배치된다.' },
  { word: '확장', def: '안상수체는 40년간 확장을 거듭했다. 파생 서체, 배열 해체, 모듈 실험 등으로.' },
  { word: '빨랫줄', def: '안상수체의 정렬 원리. 글자 상단을 한 줄에 맞춰 빨랫줄처럼 늘어놓는다.' },
  { word: '오토캐드', def: '안상수가 1984년 글자 설계에 활용한 캐드 프로그램. 당시 건축용 도구였다.' },
  { word: '안상수체', def: '1985년 디자이너 안상수가 설계한 탈네모틀 한글 서체. 40년 동안 우리 곁에 있었다.' },
  { word: '타이포그라피', def: '글자를 매개로 하는 시각 디자인. 안상수는 한글 타이포그라피의 새 길을 열었다.' },
  { word: '글자꼴', def: '글자의 조형적 형태. 안상수체는 탈네모틀 글자꼴의 가능성을 개척했다.' },
];

let uid = 0;

export default function ConceptGame() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState('idle'); // idle | playing | over
  const [words, setWords] = useState([]);
  const [input, setInput] = useState('');
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(5);
  const [pops, setPops] = useState([]);
  const [def, setDef] = useState(null);

  const wordsRef = useRef([]);
  const livesRef = useRef(5);
  const phaseRef = useRef('idle');
  const areaRef = useRef(null);
  const inputRef = useRef(null);
  const tickRef = useRef(null);
  const spawnRef = useRef(null);
  const defTimerRef = useRef(null);

  phaseRef.current = phase;
  livesRef.current = lives;

  const startGame = () => {
    uid = 0;
    wordsRef.current = [];
    setWords([]);
    setInput('');
    setScore(0);
    setLives(5);
    setPops([]);
    setDef(null);
    setPhase('playing');
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    if (phase !== 'playing') return;

    const SPEED = 3.2;
    const TICK = 33;

    tickRef.current = setInterval(() => {
      if (phaseRef.current !== 'playing') return;
      const h = areaRef.current?.clientHeight ?? window.innerHeight;
      const FLOOR = h - 100;

      wordsRef.current = wordsRef.current.map(w => ({ ...w, y: w.y + w.speed }));
      const fallen = wordsRef.current.filter(w => w.y >= FLOOR);
      wordsRef.current = wordsRef.current.filter(w => w.y < FLOOR);

      if (fallen.length > 0) {
        const next = livesRef.current - fallen.length;
        setLives(next);
        if (next <= 0) {
          clearInterval(tickRef.current);
          clearInterval(spawnRef.current);
          setPhase('over');
          return;
        }
      }

      setWords([...wordsRef.current]);
    }, TICK);

    const usedWords = new Set();
    const spawn = () => {
      if (phaseRef.current !== 'playing') return;
      const w = areaRef.current?.clientWidth ?? window.innerWidth;
      const pool = WORDS.filter(d => !usedWords.has(d.word));
      if (pool.length === 0) usedWords.clear();
      const data = pool[Math.floor(Math.random() * pool.length)];
      usedWords.add(data.word);
      const item = {
        id: ++uid,
        word: data.word,
        def: data.def,
        x: 40 + Math.random() * (w - 220),
        y: -50,
        speed: SPEED + Math.random() * 0.4,
      };
      wordsRef.current = [...wordsRef.current, item];
      setWords([...wordsRef.current]);
    };

    spawn();
    spawnRef.current = setInterval(spawn, 2800);

    return () => {
      clearInterval(tickRef.current);
      clearInterval(spawnRef.current);
    };
  }, [phase]);

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);

    const matched = wordsRef.current.find(w => w.word === val);
    if (!matched) return;

    // 맞췄을 때
    setPops(prev => [...prev, { id: matched.id, word: matched.word, x: matched.x, y: matched.y }]);
    wordsRef.current = wordsRef.current.filter(w => w.id !== matched.id);
    setWords([...wordsRef.current]);
    setScore(s => s + 1);
    setInput('');

    clearTimeout(defTimerRef.current);
    setDef({ word: matched.word, def: matched.def });
    defTimerRef.current = setTimeout(() => setDef(null), 6000);

    setTimeout(() => setPops(prev => prev.filter(p => p.id !== matched.id)), 700);
  };

  const heartStr = '♥'.repeat(lives) + '♡'.repeat(Math.max(0, 5 - lives));

  return (
    <div
      ref={areaRef}
      style={{
        width: '100vw', height: '100vh',
        background: '#fff',
        position: 'relative', overflow: 'hidden',
        fontFamily: 'agahnsangsoo2012, sans-serif',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* 홈 */}
      <button
        onClick={() => navigate('/')}
        style={{ position: 'absolute', top: 20, left: 24, zIndex: 200, background: 'none', border: '1px solid #333', color: '#666', padding: '8px 18px', borderRadius: '20px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012', fontSize: '14px' }}
      >
        ← 홈
      </button>

      {/* 스코어 / 라이프 */}
      {phase === 'playing' && (
        <div style={{ position: 'absolute', top: 24, right: 32, zIndex: 200, color: '#111', userSelect: 'none', textAlign: 'right', lineHeight: 1.2 }}>
          <div style={{ fontSize: '40px', color: '#e74c3c', letterSpacing: '4px' }}>{heartStr}</div>
          <div style={{ fontSize: '28px', color: '#111', marginTop: 4 }}>{score}개</div>
        </div>
      )}

      {/* ─── 대기 화면 ─── */}
      {phase === 'idle' && (
        <div style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h1 style={{ fontSize: '64px', color: '#111', margin: '0 0 24px', fontWeight: 'bold', letterSpacing: '-1px' }}>낱말 받기</h1>
          <p style={{ fontSize: '22px', color: '#aaa', margin: '0 0 60px', textAlign: 'center', lineHeight: 1.9, fontFamily: 'agahnsangsoo2012' }}>
            단어가 하늘에서 떨어집니다<br />
            타이핑해서 잡아내면 개념을 알 수 있어요
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={startGame}
            style={{ padding: '16px 64px', background: '#111', color: '#fff', border: 'none', borderRadius: '40px', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
          >
            시작하기
          </motion.button>
        </div>
      )}

      {/* ─── 게임 오버 ─── */}
      {phase === 'over' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          style={{ position: 'absolute', inset: 0, background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
        >
          <motion.div
            initial={{ scale: 0, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
            style={{ fontSize: '160px', fontWeight: 'bold', color: '#111', lineHeight: 1, letterSpacing: '-6px' }}
          >
            {score}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ fontSize: '28px', color: '#aaa', marginTop: 8, marginBottom: 64 }}
          >
            {score >= 10 ? '완벽해요 🎉' : score >= 5 ? '잘했어요 👍' : '한 번 더!'}
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            style={{ display: 'flex', gap: 16 }}
          >
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={startGame}
              style={{ padding: '16px 52px', background: '#111', color: '#fff', border: 'none', borderRadius: '40px', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}>
              다시하기
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/')}
              style={{ padding: '16px 52px', background: 'none', color: '#111', border: '2px solid #111', borderRadius: '40px', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}>
              홈으로
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* ─── 게임 플레이 ─── */}
      {phase === 'playing' && (
        <>
          {/* 떨어지는 단어들 */}
          {words.map(w => {
            const isMatch = input.length > 0 && w.word.startsWith(input);
            return (
              <div
                key={w.id}
                style={{
                  position: 'absolute',
                  left: w.x, top: w.y,
                  fontSize: '30px',
                  color: isMatch ? '#e67e00' : '#111',
                  opacity: isMatch ? 1 : 0.75,
                  textShadow: isMatch ? '0 0 16px #e67e0044' : 'none',
                  userSelect: 'none', pointerEvents: 'none',
                  transition: 'color 0.1s, opacity 0.1s',
                }}
              >
                <span style={{ color: '#e67e00' }}>{isMatch ? w.word.slice(0, input.length) : ''}</span>
                <span>{isMatch ? w.word.slice(input.length) : w.word}</span>
              </div>
            );
          })}

          {/* 팡 이펙트 */}
          <AnimatePresence>
            {pops.map(p => (
              <motion.div
                key={p.id}
                initial={{ opacity: 1, scale: 1, x: p.x, y: p.y }}
                animate={{ opacity: 0, scale: 2.2, y: p.y - 40 }}
                exit={{}}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                style={{ position: 'absolute', fontSize: '30px', color: '#e67e00', pointerEvents: 'none', whiteSpace: 'nowrap' }}
              >
                {p.word}
              </motion.div>
            ))}
          </AnimatePresence>

          {/* 입력창 + 개념 설명 카드 (함께 하단 고정) */}
          <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', width: 560, display: 'flex', flexDirection: 'column', gap: 8 }}>
            <AnimatePresence>
              {def && (
                <motion.div
                  key={def.word}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    background: '#fff', color: '#111',
                    padding: '32px 36px', borderRadius: '20px',
                    textAlign: 'center', zIndex: 50,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)',
                    border: '1px solid #eee',
                  }}
                >
                  <div style={{ fontSize: '34px', fontWeight: 'bold', marginBottom: 14 }}>{def.word}</div>
                  <div style={{ fontSize: '26px', color: '#555', lineHeight: 1.7 }}>{def.def}</div>
                </motion.div>
              )}
            </AnimatePresence>
            <input
              ref={inputRef}
              value={input}
              onChange={handleInput}
              placeholder="여기에 입력하세요"
              autoComplete="off" autoCorrect="off" autoCapitalize="none" spellCheck="false"
              style={{
                width: '100%', padding: '15px 24px',
                background: '#f5f5f5', color: '#111',
                border: '1.5px solid #ddd', borderRadius: '40px',
                fontSize: '22px', fontFamily: 'agahnsangsoo2012',
                outline: 'none', textAlign: 'center', boxSizing: 'border-box',
                caretColor: '#e67e00',
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
