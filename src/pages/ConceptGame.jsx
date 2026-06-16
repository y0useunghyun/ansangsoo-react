import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CHO_LIST  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG_LIST = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG_LIST = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const SB_CHO = {
  '0': 15, ')': 15,
  'y': 5, 'Y': 5, 'u': 3, 'U': 3, 'i': 6, 'I': 6, 'o': 14, 'O': 14, 'p': 17, 'P': 17,
  'h': 2, 'H': 2, 'j': 11, 'J': 11, 'k': 0, 'K': 0, 'l': 12, 'L': 12, ';': 7, ':': 7, "'": 16, '"': 16,
  'n': 9, 'N': 9, 'm': 18, 'M': 18
};
const SB_JUNG = {
  '4': 12, '$': 12, '5': 17, '%': 17, '6': 2, '^': 2, '7': 7, '&': 7, '8': 19, '*': 19, '9': 13, '(': 13,
  'e': 6, 'E': 6, 'r': 1, 'R': 1, 't': 4, 'T': 4, 'd': 20, 'D': 20, 'f': 0, 'F': 0, 'g': 18, 'G': 18,
  'c': 5, 'C': 5, 'v': 8, 'V': 8, 'b': 13, 'B': 13, '/': 8, '?': 8
};
const SB_JONG = {
  '1': 27, '!': 27, '2': 20, '@': 20, '3': 17, '#': 17,
  'q': 19, 'Q': 19, 'w': 8, 'W': 8, 'a': 21, 'A': 21, 's': 4, 'S': 4, 'z': 16, 'Z': 16, 'x': 1, 'X': 1
};
const JONG_TO_CHO = {
  1:0, 2:1, 4:2, 7:3, 8:5, 16:6, 17:7, 19:9, 20:10,
  21:11, 22:12, 23:14, 24:15, 25:16, 26:17, 27:18
};
const JUNG_CPD = {
  '8,0':9,'8,1':10,'8,20':11,'13,4':14,'13,5':15,'13,20':16,'18,20':19
};
const JONG_CPD = {
  '1,19':3,'4,22':5,'4,27':6,'8,1':9,'8,16':10,'8,17':11,'8,19':12,'8,25':13,'8,26':14,'8,27':15,'17,19':18
};

function makeChar(st) {
  if (st.mode === 'cho') {
    return st.cho >= 0 ? CHO_LIST[st.cho] : '';
  } else if (st.mode === 'cho_jung' || st.mode === 'cho_jung_jong') {
    if (st.cho === -1 && st.jong === -1) {
      return JUNG_LIST[st.jung];
    }
    const cho = st.cho >= 0 ? st.cho : 11; // 11 is 'ㅇ'
    const code = 0xAC00 + (cho * 21 * 28) + (st.jung * 28) + (st.jong === -1 ? 0 : st.jong);
    return String.fromCharCode(code);
  } else if (st.mode === 'idle') {
    return '';
  }
  return '';
}

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



  const [speedConfig, setSpeedConfig] = useState({ baseSpeed: 3.2, spawnInterval: 2800 });
  const [activeKeys, setActiveKeys] = useState({});
  const [st, setSt] = useState({ cho: -1, jung: -1, jong: -1, mode: 'idle' });
  const [committedText, setCommittedText] = useState('');

  const commit = (stObj) => {
    if (stObj.mode === 'idle') return;
    const char = makeChar(stObj);
    if (!char) return;

    setWords(prev => {
      let matchedIdx = -1;
      let newWords = prev.map((w, idx) => {
        if (matchedIdx === -1 && w.word.startsWith(char)) {
          if (w.word.length > 1) {
            matchedIdx = idx;
            return { ...w, word: w.word.substring(1) };
          } else {
            matchedIdx = idx;
            setScore(s => s + 1);
            setPops(p => [...p, { id: w.id, word: w.word, x: w.x, y: w.y }]);
            setTimeout(() => setPops(curr => curr.filter(item => item.id !== w.id)), 700);
            
            clearTimeout(defTimerRef.current);
            setDef({ word: w.word, def: w.def });
            defTimerRef.current = setTimeout(() => setDef(null), 6000);
            return null;
          }
        }
        return w;
      }).filter(Boolean);
      return newWords;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (phaseRef.current !== 'playing') return;
      if (e.repeat) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      
      const key = e.key;
      setActiveKeys(prev => ({ ...prev, [key]: true }));

      if (key === 'Backspace') {
        if (st.mode === 'idle') {
          setCommittedText(prev => prev.slice(0, -1));
        } else {
          setSt({ cho: -1, jung: -1, jong: -1, mode: 'idle' });
        }
        return;
      }
      
      if (key === 'Enter' || key === ' ') {
        commit(st);
        setSt({ cho: -1, jung: -1, jong: -1, mode: 'idle' });
        return;
      }

      if (key.length !== 1) return;

      const choIdx = SB_CHO[key];
      const jungIdx = SB_JUNG[key];
      const jongIdx = SB_JONG[key];

      if (choIdx !== undefined) {
        commit(st);
        setSt({ cho: choIdx, jung: -1, jong: -1, mode: 'cho' });
      } else if (jungIdx !== undefined) {
        if (st.mode === 'cho') {
          setSt({ ...st, jung: jungIdx, mode: 'cho_jung' });
        } else if (st.mode === 'cho_jung') {
          const cpd = JUNG_CPD[`${st.jung},${jungIdx}`];
          if (cpd !== undefined) {
            setSt({ ...st, jung: cpd });
          } else {
            commit(st);
            setSt({ cho: -1, jung: jungIdx, jong: -1, mode: 'cho_jung' });
          }
        } else if (st.mode === 'cho_jung_jong' || st.mode === 'idle') {
          commit(st);
          setSt({ cho: -1, jung: jungIdx, jong: -1, mode: 'cho_jung' });
        }
      } else if (jongIdx !== undefined) {
        if (st.mode === 'cho_jung') {
          setSt({ ...st, jong: jongIdx, mode: 'cho_jung_jong' });
        } else if (st.mode === 'cho_jung_jong') {
          const cpd2 = JONG_CPD[`${st.jong},${jongIdx}`];
          if (cpd2 !== undefined) {
            setSt({ ...st, jong: cpd2 });
          } else {
            commit(st);
            const choIdx3 = JONG_TO_CHO[jongIdx];
            if (choIdx3 !== undefined) {
              setSt({ cho: choIdx3, jung: -1, jong: -1, mode: 'cho' });
            }
          }
        } else {
          commit(st);
          const choIdx2 = JONG_TO_CHO[jongIdx];
          if (choIdx2 !== undefined) {
            setSt({ cho: choIdx2, jung: -1, jong: -1, mode: 'cho' });
          }
        }
      }
    };

    const handleKeyUp = (e) => {
      setActiveKeys(prev => {
        const next = { ...prev };
        delete next[e.key];
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [st, phase]);

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

  const startGame = (diff = '중급') => {
    let bSpeed = 3.2;
    let sInterval = 2800;
    if (diff === '초급') { bSpeed = 1.5; sInterval = 3800; }
    else if (diff === '중급') { bSpeed = 3.5; sInterval = 2400; }
    else if (diff === '고급') { bSpeed = 6.0; sInterval = 1500; }
    setSpeedConfig({ baseSpeed: bSpeed, spawnInterval: sInterval });
    setSt({ cho: -1, jung: -1, jong: -1, mode: 'idle' });
    setCommittedText('');

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

    const SPEED = speedConfig.baseSpeed;
    const TICK = 33;

    tickRef.current = setInterval(() => {
      if (phaseRef.current !== 'playing') return;
      const h = areaRef.current?.clientHeight ?? window.innerHeight;
      const FLOOR = h - 350;

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
    spawnRef.current = setInterval(spawn, speedConfig.spawnInterval);

    return () => {
      clearInterval(tickRef.current);
      clearInterval(spawnRef.current);
    };
  }, [phase]);

  

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
        style={{ position: 'absolute', top: 20, left: 24, zIndex: 200, background: 'none', border: '1px solid #333', color: '#666', padding: '8px 18px', borderRadius: '0', cursor: 'pointer', fontFamily: 'agahnsangsoo2012', fontSize: '14px' }}
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
          <div style={{ display: 'flex', gap: '16px' }}>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => startGame('초급')}
              style={{ padding: '16px 40px', background: '#555', color: '#fff', border: 'none', borderRadius: '0', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
            >
              초급
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => startGame('중급')}
              style={{ padding: '16px 40px', background: '#111', color: '#fff', border: 'none', borderRadius: '0', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
            >
              중급
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
              onClick={() => startGame('고급')}
              style={{ padding: '16px 40px', background: '#e74c3c', color: '#fff', border: 'none', borderRadius: '0', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}
            >
              고급
            </motion.button>
          </div>
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
              style={{ padding: '16px 52px', background: '#111', color: '#fff', border: 'none', borderRadius: '0', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}>
              다시하기
            </motion.button>
            <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => navigate('/')}
              style={{ padding: '16px 52px', background: 'none', color: '#111', border: '2px solid #111', borderRadius: '0', fontSize: '24px', cursor: 'pointer', fontFamily: 'agahnsangsoo2012' }}>
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
                    padding: '32px 36px', borderRadius: '0',
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
            
            {/* 세벌식 입력 UI */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '800px', transform: 'scale(0.85)', transformOrigin: 'bottom center' }}>
              <div style={{ position: 'absolute', top: -60, left: 0, right: 0, textAlign: 'center', fontSize: '40px', fontWeight: 'bold', color: '#111' }}>
                <span style={{ color: '#ccc' }}>{committedText}</span>
                <span style={{ color: '#e67e00' }}>{makeChar(st)}</span>
                <span style={{ display: 'inline-block', width: 2, height: 40, background: '#e67e00', animation: 'blink 1s step-end infinite', verticalAlign: 'bottom', marginLeft: 4 }}></span>
              </div>
              <style dangerouslySetInnerHTML={{__html: `
                .tj-keyboard { display: flex; flex-direction: column; gap: 6px; background: #ddd; padding: 12px; border-radius: 12px; font-family: agahnsangsoo2012, sans-serif; }
                .tj-kb-row { display: flex; gap: 6px; justify-content: center; }
                .tj-key { flex: 1; height: 50px; background: #fff; border-radius: 0px; display: flex; flex-direction: column; justify-content: center; align-items: center; box-shadow: 0 2px 0 #bbb; font-size: 16px; color: #333; position: relative; transition: all 0.1s; }
                .tj-key.active { background: #eee; transform: translateY(2px); box-shadow: 0 0 0 #bbb; }
                .tj-key--space { flex: 6; }
                .tj-key--wider { flex: 1.5; font-size: 14px; background: #ccc; }
                .tj-key-shift { position: absolute; top: 4px; left: 6px; font-size: 11px; color: #888; }
                .tj-key-jamo { font-size: 20px; font-weight: bold; }
                .tj-key[data-type="cho"] { color: #FF3366; border-bottom: 3px solid #FF3366; }
                .tj-key[data-type="jung"] { color: #00C49A; border-bottom: 3px solid #00C49A; }
                .tj-key[data-type="jong"] { color: #3B82F6; border-bottom: 3px solid #3B82F6; }
              `}}/>
                              <div className="tj-keyboard" id="tj-keyboard-inner">
                  <div className="tj-legend">
                    <div className="tj-legend-item"><div className="tj-legend-dot tj-legend-dot--cho"></div>초성</div>
                    <div className="tj-legend-item"><div className="tj-legend-dot tj-legend-dot--jung"></div>중성</div>
                    <div className="tj-legend-item"><div className="tj-legend-dot tj-legend-dot--jong"></div>종성(받침)</div>
                  </div>

                  {/* Row 1 */}
                  <div className="tj-kb-row">
                    <div className={"tj-key tj-key--sym" + (activeKeys['`'] ? ' active' : '')}><span className="tj-key-shift">~</span><span className="tj-key-jamo">₩</span></div>
                    <div className={"tj-key" + (activeKeys['1'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift">!</span><span className="tj-key-jamo">ㅎ</span></div>
                    <div className={"tj-key" + (activeKeys['2'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift">@</span><span className="tj-key-jamo">ㅆ</span></div>
                    <div className={"tj-key" + (activeKeys['3'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift">#</span><span className="tj-key-jamo">ㅂ</span></div>
                    <div className={"tj-key" + (activeKeys['4'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift">$</span><span className="tj-key-jamo">ㅛ</span></div>
                    <div className={"tj-key" + (activeKeys['5'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift">%</span><span className="tj-key-jamo">ㅠ</span></div>
                    <div className={"tj-key" + (activeKeys['6'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift">^</span><span className="tj-key-jamo">ㅑ</span></div>
                    <div className={"tj-key" + (activeKeys['7'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift">&amp;</span><span className="tj-key-jamo">ㅖ</span></div>
                    <div className={"tj-key" + (activeKeys['8'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift">*</span><span className="tj-key-jamo">ㅢ</span></div>
                    <div className={"tj-key" + (activeKeys['9'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift">(</span><span className="tj-key-jamo">ㅜ</span></div>
                    <div className={"tj-key" + (activeKeys['0'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift">)</span><span className="tj-key-jamo">ㅋ</span></div>
                    <div className={"tj-key tj-key--sym" + (activeKeys['-'] ? ' active' : '')}><span className="tj-key-shift">_</span><span className="tj-key-jamo">-</span></div>
                    <div className={"tj-key tj-key--sym" + (activeKeys['='] ? ' active' : '')}><span className="tj-key-shift">+</span><span className="tj-key-jamo">=</span></div>
                    <div className={"tj-key tj-key--wide tj-key--sym" + (activeKeys['Backspace'] ? ' active' : '')}><span className="tj-key-jamo">⌫</span></div>
                  </div>

                  {/* Row 2 */}
                  <div className="tj-kb-row">
                    <div className={"tj-key tj-key--wide tj-key--sym" + (activeKeys['Tab'] ? ' active' : '')}><span className="tj-key-jamo">Tab</span></div>
                    <div className={"tj-key" + (activeKeys['q'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅅ</span></div>
                    <div className={"tj-key" + (activeKeys['w'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄹ</span></div>
                    <div className={"tj-key" + (activeKeys['e'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅕ</span></div>
                    <div className={"tj-key" + (activeKeys['r'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅐ</span></div>
                    <div className={"tj-key" + (activeKeys['t'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅓ</span></div>
                    <div className={"tj-key" + (activeKeys['y'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄹ</span></div>
                    <div className={"tj-key" + (activeKeys['u'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄷ</span></div>
                    <div className={"tj-key" + (activeKeys['i'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅁ</span></div>
                    <div className={"tj-key" + (activeKeys['o'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅊ</span></div>
                    <div className={"tj-key" + (activeKeys['p'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅍ</span></div>
                    <div className={"tj-key tj-key--sym" + (activeKeys['['] ? ' active' : '')}><span className="tj-key-shift">{'{'}</span><span className="tj-key-jamo">[</span></div>
                    <div className={"tj-key tj-key--sym" + (activeKeys[']'] ? ' active' : '')}><span className="tj-key-shift">{'}'}</span><span className="tj-key-jamo">]</span></div>
                    <div className={"tj-key tj-key--sym" + (activeKeys['\\'] ? ' active' : '')}><span className="tj-key-shift">|</span><span className="tj-key-jamo">\</span></div>
                  </div>

                  {/* Row 3 */}
                  <div className="tj-kb-row">
                    <div className="tj-key tj-key--wider tj-key--sym"><span className="tj-key-jamo">Caps</span></div>
                    <div className={"tj-key" + (activeKeys['a'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅇ</span></div>
                    <div className={"tj-key" + (activeKeys['s'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄴ</span></div>
                    <div className={"tj-key" + (activeKeys['d'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅣ</span></div>
                    <div className={"tj-key" + (activeKeys['f'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅏ</span></div>
                    <div className={"tj-key" + (activeKeys['g'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅡ</span></div>
                    <div className={"tj-key" + (activeKeys['h'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄴ</span></div>
                    <div className={"tj-key" + (activeKeys['j'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅇ</span></div>
                    <div className={"tj-key" + (activeKeys['k'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄱ</span></div>
                    <div className={"tj-key" + (activeKeys['l'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅈ</span></div>
                    <div className={"tj-key" + (activeKeys[';'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift">:</span><span className="tj-key-jamo">ㅂ</span></div>
                    <div className={"tj-key" + (activeKeys['\''] ? ' active' : '')} data-type="cho"><span className="tj-key-shift">"</span><span className="tj-key-jamo">ㅌ</span></div>
                    <div className={"tj-key tj-key--wider tj-key--sym" + (activeKeys['Enter'] ? ' active' : '')}><span className="tj-key-jamo">↵</span></div>
                  </div>

                  {/* Row 4 */}
                  <div className="tj-kb-row">
                    <div className={"tj-key tj-key--wider tj-key--sym" + (activeKeys['Shift'] ? ' active' : '')}><span className="tj-key-jamo">⇧</span></div>
                    <div className={"tj-key" + (activeKeys['z'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅁ</span></div>
                    <div className={"tj-key" + (activeKeys['x'] ? ' active' : '')} data-type="jong"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㄱ</span></div>
                    <div className={"tj-key" + (activeKeys['c'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅔ</span></div>
                    <div className={"tj-key" + (activeKeys['v'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅗ</span></div>
                    <div className={"tj-key" + (activeKeys['b'] ? ' active' : '')} data-type="jung"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅜ</span></div>
                    <div className={"tj-key" + (activeKeys['n'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅅ</span></div>
                    <div className={"tj-key" + (activeKeys['m'] ? ' active' : '')} data-type="cho"><span className="tj-key-shift"></span><span className="tj-key-jamo">ㅎ</span></div>
                    <div className={"tj-key tj-key--sym" + (activeKeys[','] ? ' active' : '')}><span className="tj-key-shift">&lt;</span><span className="tj-key-jamo">,</span></div>
                    <div className={"tj-key tj-key--sym" + (activeKeys['.'] ? ' active' : '')}><span className="tj-key-shift">&gt;</span><span className="tj-key-jamo">.</span></div>
                    <div className={"tj-key tj-key--sym" + (activeKeys['/'] ? ' active' : '')}><span className="tj-key-shift">?</span><span className="tj-key-jamo">ㅗ</span></div>
                    <div className={"tj-key tj-key--wider tj-key--sym" + (activeKeys['Shift'] ? ' active' : '')}><span className="tj-key-jamo">⇧</span></div>
                  </div>

                  {/* 스페이스 */}
                  <div className="tj-kb-row">
                    <div className={"tj-key tj-key--space tj-key--sym" + (activeKeys[' '] ? ' active' : '')}><span className="tj-key-jamo"> </span></div>
                  </div>
                </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
