import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import initLegacyApp from '../legacy/app.js';
import AncheProjectModal from '../components/AncheProjectModal';
import TypewriterIntro from './Typewriter';

export default function LegacyAppHost() {
  const navigate = useNavigate();
  const location = useLocation();
  const initialized = useRef(false);
  const [isAncheOpen, setIsAncheOpen] = useState(false);
  const [showTypewriterIntro, setShowTypewriterIntro] = useState(false);

  useEffect(() => {
    // 바닐라 JS에서 리액트 라우팅 대신 상태로 모달을 열도록 함수 덮어쓰기
    window.openTypewriterIntro = function() {
      setShowTypewriterIntro(true);
    };

    if (initialized.current) return;
    initialized.current = true;
    
    // 바닐라 앱 전체 실행
    const cleanup = initLegacyApp(navigate);
    
    return () => {
      if(cleanup) cleanup();
      initialized.current = false;
    };
  }, [navigate]);

  useEffect(() => {
    const handleOpenModal = () => setIsAncheOpen(true);
    window.addEventListener('open-anche-modal', handleOpenModal);
    return () => window.removeEventListener('open-anche-modal', handleOpenModal);
  }, []);

  useEffect(() => {
    if (location.state?.openAnche) {
      setTimeout(() => {
        setIsAncheOpen(true);
      }, 600); // Wait for the transition to finish before opening the modal
    }
    
    if (location.state?.openTajagi) {
      setTimeout(() => {
        if (typeof window.openTajagiSimulator === 'function') {
          window.openTajagiSimulator();
        }
      }, 100); // Slight delay to ensure DOM is ready
    }
  }, [location.state]);

  // 스티커 클릭 이벤트 직접 바인딩
  useEffect(() => {
    const typeSticker = document.getElementById('hp-tajagi-home');
    const gameSticker = document.getElementById('hp-game-sticker');
    const titleBtn   = document.getElementById('hp-title');
    const songBtn    = document.getElementById('hp-song');
    const yuBtn      = document.getElementById('hp-yu');

    const handleTypeClick  = (e) => { e.preventDefault(); e.stopPropagation(); setShowTypewriterIntro(true); };
    const handleGameClick  = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/game'); };
    const handleTitleClick = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/song'); };
    const handleSongClick  = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/song'); };
    const handleYuClick    = (e) => { e.preventDefault(); e.stopPropagation(); navigate('/song', { state: { scrollTo: 'yu' } }); };

    if (typeSticker) typeSticker.addEventListener('click', handleTypeClick);
    if (gameSticker) gameSticker.addEventListener('click', handleGameClick);
    if (titleBtn)    titleBtn.addEventListener('click', handleTitleClick);
    if (songBtn)     songBtn.addEventListener('click', handleSongClick);
    if (yuBtn)       yuBtn.addEventListener('click', handleYuClick);

    return () => {
      if (typeSticker) typeSticker.removeEventListener('click', handleTypeClick);
      if (gameSticker) gameSticker.removeEventListener('click', handleGameClick);
      if (titleBtn)    titleBtn.removeEventListener('click', handleTitleClick);
      if (songBtn)     songBtn.removeEventListener('click', handleSongClick);
      if (yuBtn)       yuBtn.removeEventListener('click', handleYuClick);
    };
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* TypewriterIntro 모달 오버레이 */}
      {showTypewriterIntro && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000 }}>
          <TypewriterIntro onClose={() => setShowTypewriterIntro(false)} onNext={() => {
            setShowTypewriterIntro(false);
            if (typeof window.openTajagiSimulator === 'function') {
              window.openTajagiSimulator();
            }
          }} />
        </div>
      )}

      <div dangerouslySetInnerHTML={{ __html: `

  <!-- 에디토리얼 홈 -->
  <div id="home-page" class="home-page hp-in">

    <!-- 상단 타이틀 -->
    <button class="hp-title" id="hp-title">안상수체에.대해.얼마나.알고.있니</button>

    <!-- 그룹커닝: 343,278 -->
    <div class="hp-kerning">
      <img src="/image/그룹커닝.png" alt="그룹커닝" class="hp-img" />
    </div>

    <!-- 타자기 (홈) -->
    <div class="hp-tajagi" id="hp-tajagi-home" style="cursor: pointer;">
      <img src="/image/타자기2.png" alt="종이" class="hp-tajagi-paper" />
      <img src="/image/타자기.png" alt="타자기" class="hp-tajagi-base" />
    </div>
    <!-- 학 (교체된 이미지): 1500,234 -->
    <div class="hp-hak">
      <img src="/image/학.png" alt="학" class="hp-img" />
    </div>

    <!-- 확장: 134,475 / 275×515 -->
    <div class="hp-expand">
      <img src="/image/확장.png" alt="확장" class="hp-img" />
    </div>

    <!-- 훈민정음 책: 137,490 / rotate:-15deg -->
    <div class="hp-hunmin">
      <img src="/image/훈민정음.png" alt="훈민정음" class="hp-img" />
    </div>

    <!-- 조영제/한글그리드 삭제됨 -->

    <!-- 안체프로젝트: 1118,475 / 352×306 -->
    <div class="hp-project-wrap">
      <button class="hp-project-obj" id="hp-project">
        <img src="/image/안체프로젝트.png" alt="안체프로젝트" class="hp-proj-img" />
      </button>
    </div>

    <!-- 멋지음안상수: 1428,708 / 348×275 -->
    <div class="hp-blob">
      <img src="/image/멋지음안상수.png" alt="멋지음안상수" class="hp-img" />
    </div>

    <!-- 게임기: 벽돌 자리 -->
    <div class="hp-brick-wrap" id="hp-game-sticker" style="cursor: pointer;">
      <svg width="100%" viewBox="0 0 24 32" style="image-rendering: pixelated; display: block;" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="2" width="18" height="24" rx="2" fill="#111"/>
        <rect x="4" y="3" width="16" height="22" rx="1" fill="#222"/>
        <rect x="6" y="5" width="12" height="10" fill="#111"/>
        <rect x="7" y="6" width="10" height="8" fill="#5f8a5f"/>
        <rect x="7" y="6" width="3" height="2" fill="#7aaa7a" opacity="0.6"/>
        <rect x="6" y="19" width="2" height="6" fill="#444"/>
        <rect x="5" y="21" width="4" height="2" fill="#444"/>
        <circle cx="16" cy="21" r="1.5" fill="#c0392b"/>
        <circle cx="19" cy="20" r="1.5" fill="#2980b9"/>
        <rect x="10" y="18" width="3" height="1" rx="0.5" fill="#555"/>
        <rect x="14" y="18" width="3" height="1" rx="0.5" fill="#555"/>
        <rect x="17" y="24" width="1" height="1" fill="#444"/>
        <rect x="19" y="24" width="1" height="1" fill="#444"/>
        <rect x="17" y="22" width="1" height="1" fill="#444"/>
        <rect x="19" y="22" width="1" height="1" fill="#444"/>
      </svg>
    </div>

    <!-- 한눈에 보기: 1563,10 -->
    <button class="hp-nav-btn" id="hp-hanbun">한눈에 보기</button>

    <!-- 멋지은 이들: 1711,10 -->
    <button class="hp-nav-btn" id="hp-meotjieun">멋지은 이들</button>

    <!-- 송명선 상세 페이지로 이동하는 버튼 -->
    <div style="position: absolute; left: 58%; top: 50%; transform: translate(-50%, -50%); z-index: 100; pointer-events: none;">
      <div style="animation: hp-drift-2 11s ease-in-out infinite;">
        <a href="/song" id="hp-song" style="display: block; pointer-events: auto; text-decoration: none; transition: transform 0.2s ease; transform-origin: center center;" onmouseover="this.style.transform='scale(1.1) rotate(-3deg)'" onmouseout="this.style.transform='scale(1) rotate(0deg)'">
          <div class="hp-song-inner">
            <span class="hp-song-normal">송명선</span>
            <span class="hp-song-jamo">ㅅㅗㅇㅁㅕㅇㅅㅓㄴ</span>
          </div>
        </a>
      </div>
    </div>

    <!-- 유승현 섹션으로 이동하는 버튼 -->
    <div style="position: absolute; left: 72%; top: 52%; z-index: 100; pointer-events: none;">
      <div style="animation: hp-drift-3 13s ease-in-out infinite;">
        <a href="/song" id="hp-yu" style="display: block; pointer-events: auto; text-decoration: none; transition: transform 0.2s ease; transform-origin: center center;" onmouseover="this.style.transform='scale(1.1) rotate(3deg)'" onmouseout="this.style.transform='scale(1) rotate(0deg)'">
          <div class="hp-yu-inner">
            <span class="hp-yu-normal">유승현</span>
            <span class="hp-yu-jamo">ㅇㅠㅅㅡㅇㅎㅕㄴ</span>
          </div>
        </a>
      </div>
    </div>

  </div>

  <!-- AG 안상수체 2012 세부 페이지 -->
  <div id="detail-ag" class="detail-page">
    <button class="dp-back" id="dp-ag-back">← 홈</button>

    <!-- 초상: 우측 고정, 클릭 시 텍스트 슬라이드인 -->
    <!-- 사이드바 순서: [이미지 우측에] ← [텍스트 좌측에서 등장] -->
    <!-- 텍스트 안 순서: 안상수 bio(위) → 왜 안상수체인가(아래) -->
    <div class="dp-portrait-wrap" id="dp-portrait-wrap">
      <div class="dp-sidebar-text">
        <div class="dp-sidebar-inner">
          <p class="dp-bio">
            안상수 (1952~)<br>
            시각디자이너, 타이포그라퍼. 1985년 '안상수체'를 멋지어 한글 글꼴의
            탈네모 흐름을 이끌었으며, 이후 이상체, 미르체, 마노체 등을 선보였다.
            1988년 실험잡지 「보고서/보고서」를 창간, 전위적인 타이포그라피를
            실험하며 현재까지 한글 타이포그라피를 바탕으로 한 작업을 선보이고 있다.
          </p>
          <p class="dp-quote-q">안상수체는 왜 안상수체인가?</p>
          <p class="dp-quote-a">
            '안상수체'로 명명한 이유는 두가지에요. 우선, 당연히 그래야 한다고
            생각했어요. 다른 생각을 하지 못했죠. 두번째는 당시에 안그라픽스를
            막 시작하는 시점이었는데, 내 이름을 붙이는게 가장 확실하게 내 일과
            디자인에 책임을 지는 방법이라고 생각했어요. 내 이름을 걸었으니
            소홀히 하기 어렵겠다는 생각을 했죠. 그런 생각으로 그땐 일말의
            고민도 없이 '안상수체'라고 이름을 붙였어요.
          </p>
        </div>
      </div>
      <img src="/image/안상수.webp" class="dp-portrait-img" alt="안상수" />
    </div>

    <div class="dp-scroll">

      <!-- 상단: 대제목 + 인트로 -->
      <div class="dp-top">
        <div class="dp-left">
          <h1 class="dp-title" id="dp-ag-title">AG 안상수체 2012</h1>
          <!-- 인트로 텍스트 (대제목 클릭 시 등장) -->
          <p class="dp-intro" id="dp-intro">
            〈안상수체〉는 디자이너 안상수가 1995년 설계한 세벌식 탈네모틀 글꼴이다.
            첫닿자 19자, 홀자 21자, 받침 27자를 조합하여 11,172자를 파생하는 세벌식 조합형 글꼴로
            탄생했다. 한글 자소는 수직선, 수평선, 사선, 정원 등 기하학적 형태로 구성되었으며
            홀자의 기둥이 길게 뻗어서 받침의 정가운데에 맞닿아 있는 것이 특징이다.
          </p>
        </div>
      </div>

    </div><!-- /dp-scroll -->

    <!-- 과학동아: 왼쪽 하단 고정 -->
    <div class="dp-card dp-card--pinned" id="dp-card-1">
      <div class="dp-card-img-wrap">
        <img src="/image/안체프로젝트.webp" class="dp-img-s1" alt="과학동아" />
        <img src="/image/안체프로젝트.webp" class="dp-img-s2" alt="과학동아" />
      </div>
      <div class="dp-card-body">
        <p class="dp-birth-text">
          [안상수체의 탄생] 1985년 12월 제3회 〈홍익 시각디자이너협회 회원전〉 포스터에 처음 사용되었으며, 이듬해 1986년 1월 창간된 《과학동아》의 제호 작업에도 쓰였다. 탈네모꼴 형태의 이 제호는 16비트 컴퓨터로 구현되어 과학적이고 현대적인 인상을 주었다. 한편 안상수는 1984년 벡터 방식의 캐드 프로그램(오토캐드 2.1)을 활용해 훈민정음의 창제원리에 기반해 닿소리·홀소리의 자소를 독립된 단위로 조합하는 방식으로 글자체의 모듈 골격을 체계화하고, 최소한의 자소로 가장 많은 글자를 구성할 수 있는 한글 본래의 조합 논리를 디지털 환경에 적용했다.
        </p>
      </div>
    </div>

  </div><!-- /detail-ag -->

  <!-- 스 세부 페이지 -->
  <div id="detail-su" class="detail-page">
    <button class="dp-back" id="dp-su-back">← 홈</button>
    <div class="su-stage" id="su-stage">
      <div class="su-char" id="su-char">스</div>
      <div class="su-text" id="su-text">
        <div class="su-text-inner">
          <div class="su-specimen-row"><span class="su-weight-label">300 Light</span><p class="su-note" style="font-weight:300">어도비 폰트에서 글꼴을 웹폰트로 끌고오면<br>안상수체에서 ‘스’라는 단어만<br>글씨체 지원이 안된다.</p></div>
          <div class="su-specimen-row"><span class="su-weight-label">500 Medium</span><p class="su-note" style="font-weight:500">어도비 폰트에서 글꼴을 웹폰트로 끌고오면<br>안상수체에서 ‘스’라는 단어만<br>글씨체 지원이 안된다.</p></div>
          <div class="su-specimen-row"><span class="su-weight-label">700 Bold</span><p class="su-note" style="font-weight:700">어도비 폰트에서 글꼴을 웹폰트로 끌고오면<br>안상수체에서 ‘스’라는 단어만<br>글씨체 지원이 안된다.</p></div>
        </div>
      </div>
    </div>
  </div><!-- /detail-su -->

  <!-- 안체프로젝트 세부 페이지 -->
  <div id="detail-anche" class="detail-page">
    <button class="dp-back" id="dp-anche-back">← 홈</button>

    <div class="ap-stage" id="ap-stage">

      <!-- 클릭 유도 이미지 그리드 -->
      <div class="ap-grid-anim">
      <div class="ap-grid-wrap" id="ap-grid-wrap">
        <div class="ap-grid">
          <!-- 이미지 1: 하라 겐야 -->
          <div class="ap-cell">
            <img src="/image/하라 겐야.png" class="ap-img" alt="하라 겐야" />
          </div>
          <div class="ap-label-col">
            <span class="ap-label-marker">[*]</span>
            <span class="ap-label-name">하라 겐야</span>
          </div>
          <!-- 이미지 2: 엠엠파리 -->
          <div class="ap-cell">
            <img src="/image/엠엠파리.png" class="ap-img" alt="엠엠파리" />
          </div>
          <div class="ap-label-col">
            <span class="ap-label-marker">[*]</span>
            <span class="ap-label-name">엠엠파리</span>
          </div>
          <!-- 이미지 3: 사랑 쿨카르니 -->
          <div class="ap-cell">
            <img src="/image/사랑 쿨카르니.png" class="ap-img" alt="사랑 쿨카르니" />
          </div>
          <div class="ap-label-col">
            <span class="ap-label-marker">[*]</span>
            <span class="ap-label-name">사랑 쿨카르니</span>
          </div>
          <!-- 이미지 4: 네빌 브로디 -->
          <div class="ap-cell">
            <img src="/image/네빌 브로디.png" class="ap-img" alt="네빌 브로디" />
          </div>
          <div class="ap-label-col">
            <span class="ap-label-marker">[*]</span>
            <span class="ap-label-name">네빌 브로디</span>
          </div>
        </div>
      </div>
      </div><!-- /ap-grid-anim -->

      <!-- 텍스트 패널 래퍼 (클립 경계 = 이미지 우측) -->
      <div class="ap-text-wrap" id="ap-text-wrap">
        <div class="ap-text-panel" id="ap-text-panel">
          <h2 class="ap-h1">〈안체 프로젝트 A-Project〉</h2>
          <p class="ap-h2">
            안체프로젝트는 AG 안상수체 탄생 40주년을 기념해 진행된 프로젝트로, 참여 디자이너들이 AG 안상수체의 모듈을 활용해 새로운 탈네모틀 한글꼴을 제작하고 안상수와 한글에 대한 각자의 생각을 담아내는 연구 프로젝트다. 연구소는 디자이너들이 11,172자의 한글 완성형 글자를 완성할 수 있도록 제작 전 과정을 지원한다.
          </p>
        </div>
      </div>

    </div><!-- /ap-stage -->

    <!-- GOGOGOGO 버튼 -->
    <button class="ap-gogo" id="ap-gogo">GOGOGOGO</button>

  </div><!-- /detail-anche -->

    <!-- 세벌식 타자기 연습 페이지 -->
  

  <!-- 한눈에 보기 페이지 -->
  <div id="detail-hanbun" class="detail-page">
    <div class="hb-header">
      <button class="hb-back-btn" id="hb-back-btn">&lt; 홈</button>
      <span class="hb-header-title">한눈에 보기</span>
    </div>
    <div class="hb-slider" id="hb-slider">
      <div class="hb-track" id="hb-track">
        <div class="hb-slide">
          <img src="/image/8주차_1조_송명선.jpg" class="hb-img" alt="송명선" />
        </div>
        <div class="hb-slide">
          <img src="/image/8주차_1조_유승현.png" class="hb-img" alt="유승현" />
        </div>
      </div>
      <button class="hb-arrow hb-arrow--left" id="hb-prev">＜</button>
      <button class="hb-arrow hb-arrow--right" id="hb-next">＞</button>
    </div>
  </div>

  <!-- 메인 세부 페이지 — 긴 스크롤 콘텐츠 -->
  <div id="detail-main" class="detail-page">



    <!-- 고정 헤더 -->
    <div class="dm-header" id="dm-header">
      <button class="dm-home-btn" id="dm-home-btn">&lt; 홈</button>
      <svg id="dm-progress-svg" class="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none">
        <defs>
          <clipPath id="dm-clip">
            <rect id="dm-clip-rect" x="0" y="0" width="0" height="97.7"/>
          </clipPath>
        </defs>
        <!-- 왼쪽 d -->
        <path d="M56.8,31c-4-3.1-8.8-4.7-14-4.7-12.6,0-22.6,10.1-22.6,22.6s10.1,22.6,22.6,22.6,10.1-1.8,14-4.8v9.9h8.8V21.1h-8.8v9.9ZM42.8,62.6c-7.5,0-13.7-6.1-13.7-13.7s6.1-13.5,13.7-13.5,13.8,5.9,13.8,13.5-6.3,13.7-13.8,13.7Z"/>
        <!-- 막대 그룹 — clipPath로 좌→우 reveal -->
        <g clip-path="url(#dm-clip)">
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
        </g><!-- /clip group -->
        <!-- 오른쪽 d — translateX 애니메이션 -->
        <g id="dm-right-d">
          <path d="M1861.4,21.1h-8.8s0,55.5,0,55.5h8.8s0-9.9,0-9.9c4,3.1,8.8,4.8,14,4.8,12.6,0,22.6-10.1,22.6-22.6,0-12.6-10.1-22.6-22.6-22.6s-10.1,1.6-14,4.7v-9.9ZM1861.6,49c0-7.5,6.3-13.5,13.8-13.5s13.7,5.9,13.7,13.5c0,7.5-6.1,13.7-13.7,13.7s-13.8-6.1-13.8-13.7Z"/>
        </g>
      </svg>
    </div>

    <!-- 스크롤 콘텐츠 -->
    <div class="dm-scroll">

      <!-- 섹션 0: 오프닝 스토리 (클릭 시 한 문단씩 등장) -->
      <div class="dm-section dm-section--story" id="dm-story">
        <div class="dm-story-text" id="dm-story-text">
          <p class="story-paragraph">안상수체를 알고 있나요? 정확한 이름은 몰랐어도, 본 적은 있을 거에요. 간판에서, 안내판에서, 컴퓨터 화면 어딘가에서. 40년 동안 우리 곁에 있었으니까요.</p>
          <p class="story-paragraph">긴 시간 동안, 안상수체는 끊임없이 변화하고, 확장하고, 쌓여왔습니다. 막내 돼지의 벽돌집처럼, 바람이 불어도 무너지지 않을 집을 지었습니다. 정형화 되지 않은 형태의 구옥이 어느날 눈에 들어오듯, 고유의 멋과 견고함을 지니고 있죠.</p>
          <p class="story-paragraph">이 웹페이지는 기리고 싶은 마음에 제작된 것입니다.<br>우리는 안체가 쌓아온 벽돌들을 하나하나 이야기 해보고 싶습니다...<img src="/image/벽돌.png" class="story-brick-dot" alt="벽돌"></p>
        </div>
      </div>

      <!-- 섹션 1: 안체 이미지 + 라벨 -->
      <div class="dm-section dm-section--hero">
        <div class="dm-hero" id="dm-hero">
          <img src="/image/안체1.jpg" class="dm-hero-img" alt="안체1" />
          <img src="/image/안체2.jpg" class="dm-hero-img" alt="안체2" />
          <img src="/image/안체3.jpg" class="dm-hero-img" alt="안체3" />
          <img src="/image/안체4.jpg" class="dm-hero-img" alt="안체4" />
        </div>
        <p class="dm-label">AG 안상수체 2012</p>
      </div>

      <!-- 섹션 2: 협회전+과학동아 이미지 + 타이틀 + 본문 -->
      <div class="dm-section dm-section--intro">
        <img src="/image/협회전.png" class="dm-ref-big" alt="과학동아 제호 및 협회전 포스터" />
        <h1 class="dm-intro-title"><span class="dm-hl-line">AG 안상수체 2012</span></h1>
        <p class="dm-body dm-intro-body">
          <span class="dm-hl-line"><span class="dm-u dm-hl" data-fn="1">'안상수'체</span>는 1985년 <span class="dm-u dm-hl" data-fn="2">디자이너 안상수</span>가 설계한 글자체로, 같은 해 12월 제3회 ‹홍익시각디자이너협회 회원전› 포스터에 처음 등장한다. 이후 1986년 1월 «과학동아» 창간호에서 많은 사람에게 알려지게 되는데, 이 글꼴은 당시 다소 파격적인 형태로 인식된 듯하다. 처음 만들었을 때는 <span class="dm-u dm-hl" data-fn="3">"이런 것도 글자냐"</span>고 핀잔을 받기도 했다는데, 이는 한글 글자체는 당연히 네모틀에 잘 맞춰서 설계해야 한다는 개념을 탈피한 시도였기 때문이다.</span>
        </p>
        <p class="dm-ref-caption dm-ref-caption--float">좌 &lt;과학동아&gt; 제호(1986년 1월),<br>우 제3회 홍익시각디자이너협회 회원전 포스터(1985년 12월)</p>
      </div>

      <!-- 섹션 3: 기본 형태 -->
      <div class="dm-section dm-section--form">
        <div class="ag-form-section">
          <div class="ag-form-circles">
            <div class="ag-form-circle ag-form-circle--3"></div>
            <div class="ag-form-circle ag-form-circle--2"></div>
            <div class="ag-form-circle ag-form-circle--1"></div>
          </div>
          <h2 class="ag-form-title">안상수체의 기본 형태</h2>
          <p class="ag-form-desc">안상수는 한글 활자 형태를 크게 두 가지로 구분하고, <span class="ag-form-u" id="ag-talnemo-word">네모틀과 탈네모틀</span> 글자꼴은 각각의 목적과 특성을 살리면서 발전할 것이라고 했다. 특히, 탈네모틀 글자꼴의 가능성 대해서 높게 평가했다.</p>
        </div>
      </div>

      <!-- 섹션 3b: 기역은 똑같은 기역 인용 -->
      <div class="dm-section dm-section--bigquote">
        <p class="dm-bigquote">기역은 똑같은 기역이라는 게 한글의 개념이다.<br>이걸 그대로 따르면 탈네모틀이 될 수밖에 없다고 상상했다.<br>단순하고 쉽다는 한글의 정신에도 어울린다.</p>
        <div class="bq-bricks">
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
        </div>
      </div>

      <!-- 섹션 4a: 훈민정음의 창제 원리를 따르다 -->
      <div class="dm-section dm-section--hunmin" id="sec-hunmin">
        <h2 class="dm-title hm-title">훈민정음의 창제 원리를 따르다</h2>
        <div class="hm-img-wrap">
          <img src="/image/창제원리.jpg" class="hm-img" id="hm-img" alt="훈민정음 창제원리" />
          <p class="hm-img-caption">『훈민정음 해례본』 자모음의 원리도</p>
        </div>
        <p class="dm-body">안상수체의 간결함은 훈민정음 창제 원리에 근거한다. 훈민정음은 닿자와 홀자 24개만 설계해 형태를 변형하지 않고 모든 경우에 사용하는 가장 간결하고 기하학적인 형태이다. 수직선, 수평선, 사선, 정원으로 구성된 24자의 낱자를 기본 형태로 삼아 쌍닿자, 이중홀자 등을 조합했다.</p>
      </div>

      <!-- 섹션 4b: 조합 방식 (기존 7쪽이었으나 8쪽으로 밀림) -->
      <!-- 새로 추가되는 7쪽: 안상수체 1984 개발 과정 -->
      <div class="dm-section dm-section--dev1984" id="sec-new7">
        <h2 class="dm-title dev1984-title">안상수체 1984 개발 과정</h2>
        
        <div class="dev1984-img-wrap">
          <!-- '학' 도면 이미지 -->
          <img src="/image/학.svg" alt="학 도면" class="dev1984-img" />
          
          <!-- 녹색 형광펜 박스 (회전) -->
          <div class="dev1984-highlight">
            <p>“당시 오토캐드는 기계 제도 및 건축 설계용으로만 쓰였으나, 이를 잘 이용하면<br>글자 디자인에 매우 도움이 되겠다 싶어 매뉴얼을 구해 체득해나갔다.”</p>
          </div>
        </div>
      </div>

      <div class="dm-section dm-section--hunmin2-new">
        <img src="/image/조형특징1.svg" alt="조형특징1" class="hm2-new-img" />
        <p class="dm-body hm2-new-text">안상수체는 첫 닿자와 받침의 형태를 같이 쓰고, 홀자의 위치를 가운데로 맞추어 아주 단순한 구조로 글자체를 설계했고,</p>
      </div>

      <div class="dm-section dm-section--hunmin3">
        <div class="hm3-charts-wrap">
          <div class="hm3-chart hm3-chart--chot">
            <div class="hm3-chart-box">
              <img src="/image/첫닿자.svg" alt="첫닿자 19자" class="hm3-chart-img" />
            </div>
          </div>
          <div class="hm3-chart hm3-chart--bat">
            <div class="hm3-chart-box">
              <img src="/image/받침.svg" alt="받침 21자" class="hm3-chart-img" />
            </div>
          </div>
          <div class="hm3-chart hm3-chart--hol">
            <div class="hm3-chart-box">
              <img src="/image/홀자.svg" alt="홀자 21자" class="hm3-chart-img" />
            </div>
          </div>
        </div>
        <p class="dm-body hm3-text">
          첫닿자 19자, 홀자 21자, 받침 27자를 조합하는 방식으로 손쉽게 11,172자를 만들어냈다. 
          <span class="hm3-highlight">이는 네모틀 글자체에서 글자마다 형태, 크기, 위치를 변형하여 11,172자를 각각 설계해야 했던 관습에서 벗어난 새롭고도 익숙한 접근이었다.</span>
        </p>
      </div>

      <!-- 섹션 4b-4: 확장성 텍스트 -->
      <div class="dm-section dm-section--story dm-section--story-2">
        <div class="dm-story-text">
          <p class="story-paragraph is-visible">시각 디자인 영역에서의 하나의 결과물이 오랫동안 쓰이는 범위는 매우 한정적이다. 1985년 발표한 안상수체는 30여년동안 다양한 방법으로 확장을 시도했다. 이 확장은 만든 이의 다양한 실험 속에서 지속되었고, 나아가 일상으로 파고들어 다양한 가능성을 열기도 했다.</p>
          <br>
          <p class="story-paragraph is-visible">안상수체의 확장성 - 노민지</p>
        </div>
        <div class="bq-bricks">
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
        </div>
      </div>

      <!-- 빈 페이지 4개 -->
      <!-- 섹션 5: 글자 가족의 파생 -->
      <div class="dm-section dm-section--hunmin">
        <h2 class="dm-title hm-title">1. 글자 가족의 파생</h2>
        <p class="dm-body">1985년 처음 만들어진 안상수체는 1991년 한글, 로마자, 숫자, 문장부호를 갖추어 한 벌의 글자체로 완성되었다. 이후 굵기 3종, 2012년에는 5종으로 확장되었고, 2013년에는 획을 둥글게 한 '둥근 안상수체'가 설계되어 굵기 5종의 가족을 갖게 되었다.</p>
      </div>
      <!-- 섹션 5.1: 배열의 해체 -->
      <div class="dm-section dm-section--hunmin">
        <h2 class="dm-title hm-title">2. 배열의 해체</h2>
        <p class="dm-body">1991년 발표된 '이상체'는 안상수체의 낱글자 배열을 풀어쓰기 방식으로 해체한 글자체다. 근대 소설가이자 시인인 '이상'의 전위적·초현실주의적 작품에서 영감을 받아 설계되었으며, 모아쓰기를 기본으로 하는 한글의 개념을 탈피한 새로운 시도였다.</p>
      </div>
      <!-- 섹션 5.3: 모듈 실험 -->
      <div class="dm-section dm-section--hunmin">
        <h2 class="dm-title hm-title">3. 모듈 실험</h2>
        <p class="dm-body">1992년 발표된 '미르체'는 길이가 같은 정사각형 모듈을 조립해 한글의 모든 닿자와 홀자를 만들어내는 방식이다. 2015년 판올림한 미르체는 평면과 입체 같은 공간 개념을 추가로 적용했다. 1993년 발표된 '마노체'는 일정한 길이와 굵기의 선과 원이 반복되는 비례 규칙으로 닿자와 홀자를 만들어낸다.</p>
      </div>
      <!-- 섹션 5.4: 기술의 발달 -->
      <div class="dm-section dm-section--hunmin">
        <h2 class="dm-title hm-title">4. 기술의 발달</h2>
        <div class="hm-img-wrap">
          <img src="/image/조형특징2.svg" class="hm-img" alt="조형특징" style="width: auto; height: 35vh; max-height: 400px; object-fit: contain;" />
        </div>
        <p class="dm-body">1985년 처음 만들어진 안상수체는 건축 설계용 프로그램 '오토캐드'로 설계되었다. 1991년에는 '폰토그라퍼'를 통해 영문과 기호를 추가해 한 벌의 폰트로 완성했고, 2012년 판올림에서는 '폰트랩'을 사용해 국내 최초로 '한글 그룹 커닝' 기술을 적용했다.</p>
      </div>

      <!-- 섹션 4b-9: 기하학적 형태 텍스트 -->
      <div class="dm-section dm-section--story dm-section--story-2">
        <div class="dm-story-text">
          <p class="story-paragraph is-visible">1985년 안상수에 의해 한글꼴이 완전히 재해석되면서,<br>기하학적 형태를 실험할 수 있는 가능성이 열렸다.</p>
        </div>
        <div class="bq-bricks">
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
          <img src="/image/벽돌.png" class="bq-brick" alt="벽돌" />
        </div>
      </div>



      <!-- 섹션 6: 안체프로젝트 A-Project -->
      <div class="dm-section dm-section--aproject" id="sec-aproject">
        <h2 class="dm-title">&lt;안체 프로젝트 A-Project&gt;</h2>
        <div class="dm-ap-grid">
          <figure class="dm-ap-thumb" data-fn="ap1">
            <img src="/image/네빌 브로디.png" alt="네빌 브로디" class="dm-ap-img" />
            <figcaption class="dm-ref-caption">네빌 브로디</figcaption>
          </figure>
          <figure class="dm-ap-thumb" data-fn="ap2">
            <img src="/image/사랑 쿨카르니.png" alt="사랑 쿨카르니" class="dm-ap-img" />
            <figcaption class="dm-ref-caption">사랑 쿨카르니</figcaption>
          </figure>
          <figure class="dm-ap-thumb" data-fn="ap3">
            <img src="/image/엠엠파리.png" alt="엠엠 파리" class="dm-ap-img" />
            <figcaption class="dm-ref-caption">엠엠 파리</figcaption>
          </figure>
          <figure class="dm-ap-thumb" data-fn="ap4">
            <img src="/image/하라 겐야.png" alt="하라 겐야" class="dm-ap-img" />
            <figcaption class="dm-ref-caption">하라 겐야</figcaption>
          </figure>
        </div>
        <p class="dm-body">안체 프로젝트는 AG 안상수체 탄생 40주년을 기념해 진행된 프로젝트로, 참여 디자이너들이 AG 안상수체의 모듈을 활용해 새로운 탈네모틀 한글꼴을 제작하고 안상수와 한글에 대한 각자의 생각을 담아내는 연구 프로젝트다. 연구소는 디자이너들이 11,172자의 한글 완성형 글자를 완성할 수 있도록 제작 전 과정을 지원한다.</p>
        <img src="/image/안체프로젝트.png" class="ap-sticker" id="ap-sticker-btn" alt="안체프로젝트 바로가기" />
      </div>

      <!-- 섹션 6.5: 엔딩 스토리 (한 문장씩 등장) -->
      <div class="dm-section dm-section--story dm-section--story-2" id="dm-ending-story" style="cursor: pointer; user-select: none;">
        <div class="dm-story-text">
          <p class="story-paragraph">저희가 준비한 내용은 여기서 끝입니다.</p>
          <p class="story-paragraph">하지만 안상수체는 끝나지 않습니다.</p>
          <p class="story-paragraph">1985년부터 지금 이 순간까지, 꾸준히 변화하고 쌓여온 것처럼—</p>
          <p class="story-paragraph">앞으로도 우리 곁에서 단단히 남아있을 테니까요.</p>
          <p class="story-paragraph">막내 돼지의 벽돌집처럼.</p>
        </div>
      </div>

      <!-- 섹션: 큰 집 이미지 -->
      <div class="dm-section dm-section--house">
        <div class="dm-house-wrap">
          <img src="/image/집.png" alt="집" class="dm-house-img" />
          <div class="dm-house-window">
             <img src="/image/안상수선생님친모아정사각형.png" alt="안상수" class="dm-house-person" />
          </div>
        </div>
      </div>


    </div>

    <!-- 각주 오버레이 (detail-main 안 — 같은 스태킹 컨텍스트) -->
    <div class="fn-overlay" id="fn-overlay"></div>
    <div class="fn-card" id="fn-card"></div>

    <!-- 기본 형태 오버레이 -->
    <div class="ag-form-overlay" id="ag-form-overlay">
      <svg class="ag-overlay-svg" id="ag-overlay-svg" xmlns="http://www.w3.org/2000/svg"></svg>

      <div class="ag-caption-panel ag-caption-panel--left" id="ag-caption-left">
        <img src="/image/탈네모틀.svg" class="ag-caption-img" alt="탈네모틀" />
        <p class="ag-caption-text">(1) 탈네모틀<br><br>낱자를 조합하여 소리를 이루는 한글의 구조적 특징을 반영하여 네모틀을 벗어난 형태의 틀로, 네모틀의 상대적 개념.<br><br>초기에는 비네모틀, 탈사각틀이라는 표현이 혼재했으나 1990년대 이후 '탈네모틀'로 일반화되었다. 한글은 하나의 소리를 이루는 낱자의 종류가 적고, 조합 구조가 단순할수록 탈네모틀에 가까워진다. 음절 단위로 만드는 네모틀한글글자꼴은 낱자의 형태가 각기 수십여 가지로 달라진다. 그러나 탈네모틀한글글자꼴은 그 변화폭이 현저히 작으며, 세벌체가 되면 각 낱자가 오직 한 가지 형태만을 갖게 된다. 디자이너의 의도에 따라 첫닿자 윗선 정렬, 보선 정렬, 받침 밑선 정렬 등 다양한 기준선을 가질 수 있는 점도 탈네모틀 한글 활자체의 특징이다.</p>
      </div>

      <div class="ag-caption-panel ag-caption-panel--right" id="ag-caption-right">
        <img src="/image/네모틀.svg" class="ag-caption-img" alt="네모틀" />
        <p class="ag-caption-text">(2) 네모틀<br><br>전통 서법의 영향과 활자 조판의 편의성에서 비롯된 일정한 크기의 사각 모양 틀.<br><br>한글 창제 이후 1980년대까지 대부분의 한글 글자꼴은 일정한 네모의 틀 안에서 제작되었다. 지금까지도 네모틀은 전통적이며 전형적인 한글의 외형을 유지하는 대표적인 체계 요소이다.</p>
      </div>
    </div>

  </div>

  <!-- 밧줄 — 홈 + detail-main 공용 (body 직속) -->
  <div class="dm-rope-wrap" id="dm-rope-wrap">
    <img src="/image/밧줄.png" alt="밧줄" class="dm-rope" id="dm-rope" />
  </div>

  <!-- 밧줄 오버레이 — 위에서 내려오는 패널 (body 직속, 항상 최상위) -->
  <div class="rope-overlay" id="rope-overlay">
    <!-- 벽돌 배경 -->
    <img src="/image/벽돌.png" class="rope-bg-brick" alt="" />
    <!-- 반투명 흰 화면 워시 -->
    <div class="rope-screen-wash"></div>

    <!-- 세벌식 타자기 데코 (우측 상단) -->
    <div class="rope-tajagi" id="hp-tajagi-rope" style="cursor: pointer;">
      <div class="rope-tajagi-ribbon"></div>
      <span class="rope-tajagi-text">세벌식 타자기</span>
      <img src="/image/타자기2.png" alt="종이" class="rope-tajagi-paper" />
      <img src="/image/타자기.png" alt="타자기" class="rope-tajagi-base" />
    </div>

    <!-- 콘텐츠 박스 -->
    <div class="rope-content-box">
      <h2 class="rope-title">이런.일이.있었습니다.</h2>
      <div class="rope-columns">
        <div class="rope-col">
          <p class="rope-col-body">1949 · 공병우 — <br>빨랫줄 글자꼴<br><br>1949년 세벌식 가로쓰기 타자기를 개발한 공병우는 '빨랫줄 글씨'를 탄생하게 했고, 이후 한글 타자기와 워드 프로세서에 사용되면서 탈네모틀 글자꼴의 원형이 되었다. 공속도 타자기에 의한 글자체는 글줄의 무게 중심선이 위에 있으며, 글자의 획수에 따라 글자 크기가 달라지는 조형적 특징을 가졌다. 이러한 '빨랫줄 글자꼴'은 이후 탈네모틀 글자꼴 연구에 큰 영향을 주었다.</p>
        </div>
        <div class="rope-col">
          <p class="rope-col-body">1976 · 조영제 — <br>탈네모틀 글자꼴 최초 학문적 제안<br><br>탈네모틀 글자에 대한 연구는 1960년대 이후로 여러 가지 글자 표현으로 시도되었으나 조영제는 「한글 기계화(타자기)를 위한 구조의 연구」에서 글자꼴 구조에 대한 학문적 연구를 통해 처음으로 글자체에 적용하였다. 조영제의 탈네모틀 글자꼴 연구에서 글줄 기준선은 윗선에 맞춰져 있으며, 세벌식 타자기를 위해 디자인하여 낱자의 형태가 그대로 살아 있는 반면 낱글자의 형태를 네모틀 안에 국한하지 않고 자유롭게 취함으로써 글자의 밀도가 고르게 분포하도록 했다.</p>
        </div>
        <div class="rope-col">
          <p class="rope-col-body">1977 · 김인철 — <br>알파벳 기준선 응용<br><br>1977년 김인철은 알파벳의 기준선을 응용하여 한글의 기준선을 만들고, 아래쪽에서 들쑥날쑥하게 하여 생긴 리듬감으로 한글의 가독성을 높이려고 시도했다. 일정한 기준에 따라 닿소리와 홑소리 글자가 모아지면서 가지런한 가로 글줄 균형선이 이루어지도록 하였다.</p>
        </div>
      </div>
    </div>

    <button class="rope-overlay-close" id="rope-overlay-close">✕</button>
  </div>

  <!-- 밧줄 오버레이 2 (7쪽 전용) -->
  <div class="rope-overlay" id="rope-overlay-2">
    <!-- 배경 (흰색 반투명) -->
    <div class="rope-screen-wash" style="background: rgba(255,255,255,0.95);"></div>

    <!-- 내용물 컨테이너 -->
    <div class="dev1984-overlay-content" id="dev1984-overlay-clicker" style="cursor: pointer;">
      <h2 class="dev1984-overlay-title">어떻게.만들었는가.</h2>
      
      <div class="dev1984-overlay-img-wrap">
        <img src="/image/학.svg" alt="학 도면" class="dev1984-overlay-img" />
      </div>

      <div class="dev1984-overlay-text-box">
        <div class="dev1984-step-title" id="dev1984-step-title">1. 프레임 만들기</div>
        <div class="dev1984-step-desc" id="dev1984-step-desc">모듈 골격을 추출해 설계도로 삼고, 첫닿자∙홀자∙받침의 위치와 쪽자 삽입지점∙선 굵기를 수치로 고정했다.</div>
      </div>
    </div>
    
    <button class="rope-overlay-close" id="rope-overlay-close-2">✕</button>
  </div>

  </div><!-- /detail-anche -->

  

  

  

  

` }} style={{width: '100%', height: '100%'}} />
      <AncheProjectModal isOpen={isAncheOpen} onClose={() => setIsAncheOpen(false)} />
    </motion.div>
  );
}
