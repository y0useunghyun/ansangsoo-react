import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import initLegacyApp from '../legacy/app.js';

export default function MainApp() {
  const navigate = useNavigate();

  useEffect(() => {
    // app.js 실행
    const cleanup = initLegacyApp(navigate);
    
    // 시작하기를 눌렀을 때, 디폴트로 sec-birth 화면이 뜨도록 강제 오픈
    setTimeout(() => {
       const detailMain = document.getElementById('detail-main');
       if (detailMain) {
          // CSS에 의해 숨겨진 메인 화면을 강제로 띄웁니다
          detailMain.classList.add('dp-in');
          detailMain.style.opacity = '1';
          detailMain.style.pointerEvents = 'auto';
          
          if (window.positionAgCircles) window.positionAgCircles();
          if (typeof window.startHmFloat === 'function') window.startHmFloat();

          const target = document.getElementById('sec-birth');
          if (target) {
            const scroll = document.querySelector('.dm-scroll');
            if (scroll) scroll.scrollTop = target.offsetTop;
          }
       }
    }, 100);

    return () => {
      if(cleanup) cleanup();
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
      <div dangerouslySetInnerHTML={{ __html: `<!-- AG 안상수체 2012 세부 페이지 -->
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
  <div id="detail-tajagi" class="detail-page" tabindex="-1">
    <div class="tj-intro-fn" id="tj-intro">
      세벌식 자판은 초성, 중성, 종성(받침) 글쇠가 각각 다른 자리에 배열된 한글 타자판입니다.<br>
      한글의 창제 원리인 '모아쓰기'를 기계 구조에 적용한 공병우 박사의 세벌식 타자기는 
      글쇠를 누르는 순서대로 글자가 조합되어 타자 속도가 빠르고 리듬감 있게 글을 쓸 수 있었습니다. 
      이는 이후 안상수체의 기하학적인 탈네모틀 글자꼴 설계에도 큰 영감을 주었습니다.<br>
      아래 타자판에서 세벌식 자판의 독특한 배열을 직접 체험해 보세요.
    </div>
    
    <div class="tj-actions" id="tj-actions">
      <button id="tj-restore-btn" class="tj-action-btn">새로고침</button>
      <button id="tj-start-btn" class="tj-action-btn">직접 입력해보기</button>
    </div>
    <div class="tj-output-wrap">
      <div class="tj-output" id="tj-output">
        <div class="tj-text" id="tj-text"></div>
      </div>
    </div>
    <input type="text" id="tj-mobile-input" class="tj-mobile-input"
      autocomplete="off" autocorrect="off" autocapitalize="none"
      spellcheck="false" inputmode="text" />

    <div class="tj-keyboard-wrap" id="tj-keyboard-wrap">
      <div class="tj-keyboard" id="tj-keyboard-inner">
      <div class="tj-legend">
        <div class="tj-legend-item"><div class="tj-legend-dot tj-legend-dot--cho"></div>초성</div>
        <div class="tj-legend-item"><div class="tj-legend-dot tj-legend-dot--jung"></div>중성</div>
        <div class="tj-legend-item"><div class="tj-legend-dot tj-legend-dot--jong"></div>종성(받침)</div>
      </div>

      <!-- Row 1 (Number Row) -->
      <div class="tj-kb-row">
        <div class="tj-key tj-key--sym" data-key="\`"><span class="tj-key-shift">~</span><span class="tj-key-jamo">*</span></div>
        <div class="tj-key" data-key="1" data-type="jong"><span class="tj-key-shift">ㄲ</span><span class="tj-key-jamo">ㅎ</span></div>
        <div class="tj-key" data-key="2" data-type="jong"><span class="tj-key-shift">ㄺ</span><span class="tj-key-jamo">ㅆ</span></div>
        <div class="tj-key" data-key="3" data-type="jong"><span class="tj-key-shift">ㅈ</span><span class="tj-key-jamo">ㅂ</span></div>
        <div class="tj-key" data-key="4" data-type="jung"><span class="tj-key-shift">ㄿ</span><span class="tj-key-jamo">ㅛ</span></div>
        <div class="tj-key" data-key="5" data-type="jung"><span class="tj-key-shift">ㄾ</span><span class="tj-key-jamo">ㅠ</span></div>
        <div class="tj-key" data-key="6" data-type="jung"><span class="tj-key-shift">=</span><span class="tj-key-jamo">ㅑ</span></div>
        <div class="tj-key" data-key="7" data-type="jung"><span class="tj-key-shift">"</span><span class="tj-key-jamo">ㅖ</span></div>
        <div class="tj-key" data-key="8" data-type="jung"><span class="tj-key-shift">"</span><span class="tj-key-jamo">ㅓ</span></div>
        <div class="tj-key" data-key="9" data-type="jung"><span class="tj-key-shift">|</span><span class="tj-key-jamo">ㅜ</span></div>
        <div class="tj-key" data-key="0" data-type="jong"><span class="tj-key-shift">~</span><span class="tj-key-jamo">ㅋ</span></div>
        <div class="tj-key tj-key--sym" data-key="-"><span class="tj-key-shift">;</span><span class="tj-key-jamo">,</span></div>
        <div class="tj-key tj-key--sym" data-key="="><span class="tj-key-shift">+</span><span class="tj-key-jamo">></span></div>
        <div class="tj-key tj-key--wide tj-key--sym" data-key="Backspace"><span class="tj-key-jamo">⌫</span></div>
      </div>

      <!-- Row 2 (QWERTY Row) -->
      <div class="tj-kb-row">
        <div class="tj-key tj-key--wide tj-key--sym" data-key="Tab"><span class="tj-key-jamo">Tab</span></div>
        <div class="tj-key" data-key="q" data-type="cho"><span class="tj-key-shift">ㅍ</span><span class="tj-key-jamo">ㅅ</span></div>
        <div class="tj-key" data-key="w" data-type="cho"><span class="tj-key-shift">ㅌ</span><span class="tj-key-jamo">ㄹ</span></div>
        <div class="tj-key" data-key="e" data-type="cho"><span class="tj-key-shift">ㄵ</span><span class="tj-key-jamo">ㅋ</span></div>
        <div class="tj-key" data-key="r" data-type="jung"><span class="tj-key-shift">ㅀ</span><span class="tj-key-jamo">ㅐ</span></div>
        <div class="tj-key" data-key="t" data-type="jung"><span class="tj-key-shift">ㄽ</span><span class="tj-key-jamo">ㅏ</span></div>
        <div class="tj-key" data-key="y" data-type="jong"><span class="tj-key-shift">5</span><span class="tj-key-jamo">ㄹ</span></div>
        <div class="tj-key" data-key="u" data-type="jong"><span class="tj-key-shift">6</span><span class="tj-key-jamo">ㄷ</span></div>
        <div class="tj-key" data-key="i" data-type="jong"><span class="tj-key-shift">7</span><span class="tj-key-jamo">ㅁ</span></div>
        <div class="tj-key" data-key="o" data-type="jong"><span class="tj-key-shift">8</span><span class="tj-key-jamo">ㅊ</span></div>
        <div class="tj-key" data-key="p" data-type="jong"><span class="tj-key-shift">9</span><span class="tj-key-jamo">ㅍ</span></div>
        <div class="tj-key tj-key--sym" data-key="["><span class="tj-key-shift">%</span><span class="tj-key-jamo">(</span></div>
        <div class="tj-key tj-key--sym" data-key="]"><span class="tj-key-shift">/</span><span class="tj-key-jamo"><</span></div>
        <div class="tj-key tj-key--sym" data-key="\"><span class="tj-key-shift">ㅃ</span><span class="tj-key-jamo">:</span></div>
      </div>

      <!-- Row 3 (ASDF Row) -->
      <div class="tj-kb-row">
        <div class="tj-key tj-key--wider tj-key--sym"><span class="tj-key-jamo">Caps</span></div>
        <div class="tj-key" data-key="a" data-type="cho"><span class="tj-key-shift">ㄷ</span><span class="tj-key-jamo">ㅇ</span></div>
        <div class="tj-key" data-key="s" data-type="cho"><span class="tj-key-shift">ㄶ</span><span class="tj-key-jamo">ㄴ</span></div>
        <div class="tj-key" data-key="d" data-type="jung"><span class="tj-key-shift">ㄼ</span><span class="tj-key-jamo">ㅣ</span></div>
        <div class="tj-key" data-key="f" data-type="jung"><span class="tj-key-shift">ㄻ</span><span class="tj-key-jamo">ㅏ</span></div>
        <div class="tj-key" data-key="g" data-type="jung"><span class="tj-key-shift">ㅂ</span><span class="tj-key-jamo">ㅡ</span></div>
        <div class="tj-key" data-key="h" data-type="jong"><span class="tj-key-shift">0</span><span class="tj-key-jamo">ㄴ</span></div>
        <div class="tj-key" data-key="j" data-type="jong"><span class="tj-key-shift">1</span><span class="tj-key-jamo">ㅇ</span></div>
        <div class="tj-key" data-key="k" data-type="jong"><span class="tj-key-shift">2</span><span class="tj-key-jamo">ㄱ</span></div>
        <div class="tj-key" data-key="l" data-type="jong"><span class="tj-key-shift">3</span><span class="tj-key-jamo">ㅈ</span></div>
        <div class="tj-key" data-key=";" data-type="jong"><span class="tj-key-shift">4</span><span class="tj-key-jamo">ㅂ</span></div>
        <div class="tj-key" data-key="'" data-type="jong"><span class="tj-key-shift">"</span><span class="tj-key-jamo">ㅌ</span></div>
        <div class="tj-key tj-key--wider tj-key--sym" data-key="Enter"><span class="tj-key-jamo">↵</span></div>
      </div>

      <!-- Row 4 (ZXCV Row) -->
      <div class="tj-kb-row">
        <div class="tj-key tj-key--wider tj-key--sym" data-key="Shift"><span class="tj-key-jamo">⇧</span></div>
        <div class="tj-key" data-key="z" data-type="cho"><span class="tj-key-shift">ㅊ</span><span class="tj-key-jamo">ㅁ</span></div>
        <div class="tj-key" data-key="x" data-type="cho"><span class="tj-key-shift">ㅄ</span><span class="tj-key-jamo">ㄱ</span></div>
        <div class="tj-key" data-key="c" data-type="jung"><span class="tj-key-shift">ㅋ</span><span class="tj-key-jamo">ㅔ</span></div>
        <div class="tj-key" data-key="v" data-type="jung"><span class="tj-key-shift">ㄲ</span><span class="tj-key-jamo">ㅗ</span></div>
        <div class="tj-key" data-key="b" data-type="jung"><span class="tj-key-shift">?</span><span class="tj-key-jamo">ㅜ</span></div>
        <div class="tj-key" data-key="n" data-type="jong"><span class="tj-key-shift">-</span><span class="tj-key-jamo">ㅅ</span></div>
        <div class="tj-key" data-key="m" data-type="jong"><span class="tj-key-shift">=</span><span class="tj-key-jamo">ㅎ</span></div>
        <div class="tj-key tj-key--sym" data-key=","><span class="tj-key-shift">,</span><span class="tj-key-jamo">;</span></div>
        <div class="tj-key tj-key--sym" data-key="."><span class="tj-key-shift">:</span><span class="tj-key-jamo">.</span></div>
        <div class="tj-key tj-key--sym" data-key="/"><span class="tj-key-shift">!</span><span class="tj-key-jamo">ㅗ</span></div>
        <div class="tj-key tj-key--wider tj-key--sym" data-key="Shift"><span class="tj-key-jamo">⇧</span></div>
      </div>

      <!-- 스페이스행 -->
      <div class="tj-kb-row">
        <div class="tj-key tj-key--space tj-key--sym" data-key=" "><span class="tj-key-jamo"> </span></div>
      </div>
      </div>
      </div>
    </div>
  </div><!-- /detail-tajagi -->

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

  <!-- 안체프로젝트 세부 페이지 2 — 나만의 안체 만들기 -->
  <div id="detail-anche3" class="detail-page">
    <button class="dp-back" id="dp-anche3-back">← 뒤로</button>

    <!-- 좌측: 캔버스 영역 -->
    <div class="ap3-main">
      <h2 class="ap3-title">나만의 안체 만들기</h2>
      <!-- 인라인 텍스트 입력 바 -->
      <div class="ap3-input-bar">
        <textarea id="ap3-text-input" placeholder="한글을 입력하세요. 실시간으로 렌더링됩니다."></textarea>
        <label for="ap3-inline-sz">글자크기</label>
        <input type="number" id="ap3-inline-sz" value="80" min="30" max="200" step="4" />
        <label>px</label>
      </div>
      <div class="ap3-canvas-wrap">
        <canvas id="ap3-canvas"></canvas>
      </div>
    </div>

    <!-- 우측: 컨트롤 열 -->
    <div class="ap3-ctrl-col" id="ap3-ctrl-col">
      <button class="ap3-ctrl-btn ap3-active" data-sub="ap3-sub-stroke">선종류 변경</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-color">색상 변경</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-ratio">비율 변경</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-cho">초성 위치 변경</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-jung-vert">가로모임꼴 민글자</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-jung-horiz">세로모임꼴 민글자</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-jung-mixed">섞임모임꼴 민글자</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-jong-vert">가로모임꼴 받침글자</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-jong-horiz">세로모임꼴 받침글자</button>
      <button class="ap3-ctrl-btn" data-sub="ap3-sub-jong-mixed">섞임모임꼴 받침글자</button>
    </div>
    <button class="ap3-save-btn" id="ap3-save">저장</button>

    <!-- 서브 패널: 선종류 (기본 표시) -->
    <div class="ap3-sub" id="ap3-sub-stroke">
      <div class="ap3-sub-label">선 종류</div>
      <div class="ap3-line-grid">
        <button class="ap3-line-btn ap3-active" data-dash="">실선</button>
        <button class="ap3-line-btn" data-dash="7,5">파선</button>
        <button class="ap3-line-btn" data-dash="2,4">점선</button>
        <button class="ap3-line-btn" data-dash="14,4,2,4">일점쇄선</button>
      </div>
      <div class="ap3-sub-label">선 굵기</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-lw" min="0.5" max="8" step="0.5" value="1.5" />
        <span id="ap3-lw-val">1.5</span>
      </div>
    </div>

    <!-- 서브 패널: 비율 -->
    <div class="ap3-sub" id="ap3-sub-ratio" hidden>
      <div class="ap3-sub-label">글자 크기</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-sz" min="30" max="200" step="4" value="80" />
        <span id="ap3-sz-val">80px</span>
      </div>
      <div class="ap3-sub-label">행간</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-lh" min="100" max="300" step="5" value="160" />
        <span id="ap3-lh-val">1.6</span>
      </div>
    </div>

    <!-- 서브 패널: 초성 위치 -->
    <div class="ap3-sub" id="ap3-sub-cho" hidden>
      <div class="ap3-sub-label">초성 가로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-cho-x" min="-40" max="40" step="1" value="0" />
        <span id="ap3-cho-x-val">0</span>
      </div>
      <div class="ap3-sub-label">초성 세로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-cho-y" min="-40" max="40" step="1" value="0" />
        <span id="ap3-cho-y-val">0</span>
      </div>
    </div>

    <!-- 서브 패널: 가로모임꼴 민글자 (ㅏ,ㅐ,ㅑ,ㅓ,ㅔ,ㅕ,ㅣ 등) -->
    <div class="ap3-sub" id="ap3-sub-jung-vert" hidden>
      <div class="ap3-sub-label">가로모임꼴 민글자 — 중성 가로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jung-vert-x" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jung-vert-x-val">0</span>
      </div>
      <div class="ap3-sub-label">가로모임꼴 중성 세로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jung-vert-y" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jung-vert-y-val">0</span>
      </div>
      <div class="ap3-sub-label">가로모임꼴 중성 길이 (세로)</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jung-vert-sy" min="50" max="200" step="5" value="100" />
        <span id="ap3-jung-vert-sy-val">100%</span>
      </div>
    </div>

    <!-- 서브 패널: 세로모임꼴 민글자 (ㅗ,ㅛ,ㅜ,ㅠ,ㅡ 등) -->
    <div class="ap3-sub" id="ap3-sub-jung-horiz" hidden>
      <div class="ap3-sub-label">세로모임꼴 민글자 — 중성 가로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jung-horiz-x" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jung-horiz-x-val">0</span>
      </div>
      <div class="ap3-sub-label">세로모임꼴 중성 세로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jung-horiz-y" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jung-horiz-y-val">0</span>
      </div>
      <div class="ap3-sub-label">세로모임꼴 중성 길이 (가로)</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jung-horiz-sx" min="50" max="200" step="5" value="100" />
        <span id="ap3-jung-horiz-sx-val">100%</span>
      </div>
    </div>

    <!-- 서브 패널: 가로모임꼴 받침글자 -->
    <div class="ap3-sub" id="ap3-sub-jong-vert" hidden>
      <div class="ap3-sub-label">가로모임꼴 받침글자 — 종성 가로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jong-vert-x" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jong-vert-x-val">0</span>
      </div>
      <div class="ap3-sub-label">가로모임꼴 종성 세로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jong-vert-y" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jong-vert-y-val">0</span>
      </div>
    </div>

    <!-- 서브 패널: 세로모임꼴 받침글자 -->
    <div class="ap3-sub" id="ap3-sub-jong-horiz" hidden>
      <div class="ap3-sub-label">세로모임꼴 받침글자 — 종성 가로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jong-horiz-x" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jong-horiz-x-val">0</span>
      </div>
      <div class="ap3-sub-label">세로모임꼴 종성 세로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jong-horiz-y" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jong-horiz-y-val">0</span>
      </div>
    </div>

    <!-- 서브 패널: 섞임모임꼴 민글자 (ㅘ,ㅙ,ㅚ,ㅝ,ㅞ,ㅟ,ㅢ 등) -->
    <div class="ap3-sub" id="ap3-sub-jung-mixed" hidden>
      <div class="ap3-sub-label">섞임모임꼴 민글자 — 중성 가로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jung-mixed-x" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jung-mixed-x-val">0</span>
      </div>
      <div class="ap3-sub-label">섞임모임꼴 민글자 — 중성 세로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jung-mixed-y" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jung-mixed-y-val">0</span>
      </div>
    </div>

    <!-- 서브 패널: 섞임모임꼴 받침글자 -->
    <div class="ap3-sub" id="ap3-sub-jong-mixed" hidden>
      <div class="ap3-sub-label">섞임모임꼴 받침글자 — 종성 가로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jong-mixed-x" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jong-mixed-x-val">0</span>
      </div>
      <div class="ap3-sub-label">섞임모임꼴 받침글자 — 종성 세로</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-jong-mixed-y" min="-40" max="40" step="1" value="0" />
        <span id="ap3-jong-mixed-y-val">0</span>
      </div>
    </div>

    <!-- 서브 패널: 색상 (선+면 동시 적용) -->
    <div class="ap3-sub" id="ap3-sub-color" hidden>
      <div class="ap3-sub-label">선 색상 (획)</div>
      <div class="ap3-color-row">
        <input type="color" id="ap3-stroke-color" value="#000000" class="ap3-color-picker" />
        <span class="ap3-color-label">획 색상</span>
      </div>
      <div class="ap3-sub-label">면 색상 (야첨) <span style="font-size:9px;color:#aaa">면색을 퀌명도 0으로 설정하면 획만 적용</span></div>
      <div class="ap3-color-row">
        <input type="color" id="ap3-fill-color" value="#ffffff" class="ap3-color-picker" />
        <span class="ap3-color-label">야첨 색상</span>
      </div>
      <div class="ap3-sub-label">면 불투명도</div>
      <div class="ap3-slider-wrap">
        <input type="range" id="ap3-fill-alpha" min="0" max="100" step="1" value="0" />
        <span id="ap3-fill-alpha-val">0%</span>
      </div>
    </div>

  </div><!-- /detail-anche3 -->

  <script>
  (function () {
    var home     = document.getElementById('home-page');
    var detailAg = document.getElementById('detail-ag');
    var detailSu = document.getElementById('detail-su');
    var detailMain   = document.getElementById('detail-main');
    var hpAg     = document.getElementById('hp-ag');
    var hpSu     = document.getElementById('hp-su');
    var dpTitle  = document.getElementById('dp-ag-title');
    var suChar       = document.getElementById('su-char');
    var detailAnche  = document.getElementById('detail-anche');
    var apStage      = document.getElementById('ap-stage');

    /* ================================================================
       과학동아 카드 rAF 플로팅
    ================================================================ */
    var cardFloatAF = null;
    var cardImgWrap = document.querySelector('#dp-card-1 .dp-card-img-wrap');
    var cardBody    = document.querySelector('#dp-card-1 .dp-card-body');

    function startCardFloat() {
      if (cardFloatAF) return;
      var t0 = performance.now();
      function tick(now) {
        var t  = (now - t0) / 1000;
        var ix = Math.sin(t * 0.55) * 12;
        var iy = Math.cos(t * 0.38) * 16;
        cardImgWrap.style.transform = 'translate(' + ix + 'px,' + iy + 'px)';
        var bx = Math.sin(t * 0.32 + 1.5) * 9;
        var by = Math.cos(t * 0.47 + 0.8) * 11;
        cardBody.style.transform = 'translate(' + bx + 'px,' + by + 'px)';
        cardFloatAF = requestAnimationFrame(tick);
      }
      cardFloatAF = requestAnimationFrame(tick);
    }

    function stopCardFloat() {
      if (cardFloatAF) { cancelAnimationFrame(cardFloatAF); cardFloatAF = null; }
      cardImgWrap.style.transform = '';
      cardBody.style.transform    = '';
    }

    /* ================================================================
       창제원리 이미지 rAF 플로팅
    ================================================================ */
    var hmFloatAF = null;
    var hmImg = document.getElementById('hm-img');

    function startHmFloat() {
      if (hmFloatAF || !hmImg) return;
      var t0 = performance.now();
      function tick(now) {
        var t = (now - t0) / 1000;
        var x = Math.sin(t * 0.48) * 10;
        var y = Math.cos(t * 0.35) * 14;
        hmImg.style.transform = 'translate(' + x + 'px,' + y + 'px)';
        hmFloatAF = requestAnimationFrame(tick);
      }
      hmFloatAF = requestAnimationFrame(tick);
    }

    /* ================================================================
       홈 → AG 세부 전환 (FLIP) — hpAg 없으면 스킵
    ================================================================ */
    if (hpAg) hpAg.addEventListener('click', function () {
      var agRect = hpAg ? hpAg.getBoundingClientRect() : {left:0,top:0,height:1};

      detailAg.style.transition = 'none';
      detailAg.style.opacity = '0';
      detailAg.style.pointerEvents = 'none';
      detailAg.classList.add('dp-in');
      void detailAg.offsetHeight;

      var titleRect = dpTitle.getBoundingClientRect();
      var dx    = agRect.left - titleRect.left;
      var dy    = agRect.top  - titleRect.top;
      var scale = agRect.height / titleRect.height;

      dpTitle.style.transition      = 'none';
      dpTitle.style.transformOrigin = 'top left';
      dpTitle.style.transform       = 'translate(' + dx + 'px,' + dy + 'px) scale(' + scale + ')';

      home.style.transition   = 'opacity 0.3s ease';
      home.style.opacity      = '0';
      home.style.pointerEvents = 'none';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailAg.style.transition   = 'opacity 0.3s ease';
          detailAg.style.opacity      = '1';
          detailAg.style.pointerEvents = 'auto';
          dpTitle.style.transition = 'transform 0.45s cubic-bezier(.22,1,.36,1)';
          dpTitle.style.transform  = '';
        });
      });

      setTimeout(function () {
        home.style.display      = 'none';
        home.style.opacity      = '';
        home.style.transition   = '';
        home.style.pointerEvents = '';
        dpTitle.style.transition      = '';
        dpTitle.style.transformOrigin = '';
        startCardFloat();
      }, 500);
    });

    /* ================================================================
       AG 세부 → 홈 전환 (FLIP)
    ================================================================ */
    document.getElementById('dp-ag-back').addEventListener('click', function () {
      var titleRect = dpTitle.getBoundingClientRect();

      home.style.display      = '';
      home.style.opacity      = '0';
      home.style.transition   = 'none';
      void home.offsetHeight;
      var agRect = hpAg ? hpAg.getBoundingClientRect() : {left:0,top:0,height:1};

      var dx    = agRect.left - titleRect.left;
      var dy    = agRect.top  - titleRect.top;
      var scale = agRect.height / titleRect.height;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          dpTitle.style.transition      = 'transform 0.45s cubic-bezier(.22,1,.36,1)';
          dpTitle.style.transformOrigin = 'top left';
          dpTitle.style.transform       = 'translate(' + dx + 'px,' + dy + 'px) scale(' + scale + ')';

          detailAg.style.transition   = 'opacity 0.3s ease';
          detailAg.style.opacity      = '0';
          detailAg.style.pointerEvents = 'none';

          home.style.transition = 'opacity 0.3s ease';
          home.style.opacity    = '1';
        });
      });

      setTimeout(function () {
        detailAg.classList.remove('dp-in');
        detailAg.style.opacity      = '';
        detailAg.style.transition   = '';
        detailAg.style.pointerEvents = '';
        home.style.opacity    = '';
        home.style.transition = '';
        dpTitle.style.transition      = '';
        dpTitle.style.transform       = '';
        dpTitle.style.transformOrigin = '';
        stopCardFloat();
      }, 500);
    });

    /* ================================================================
       홈 → 스 세부 전환 (FLIP) — hp-su 엘리먼트가 있을 때만 실행
    ================================================================ */
    if (hpSu) hpSu.addEventListener('click', function () {
      var hpRect = hpSu.getBoundingClientRect();

      // 설정: detail-su invisible + dp-in
      detailSu.style.transition = 'none';
      detailSu.style.opacity = '0';
      detailSu.style.pointerEvents = 'none';
      detailSu.classList.add('dp-in');
      void detailSu.offsetHeight;

      // su-char 애니메이션 일시정지 후 위치 측정
      suChar.style.animationPlayState = 'paused';
      var charRect = suChar.getBoundingClientRect();
      suChar.style.animationPlayState = '';

      var dx    = hpRect.left - charRect.left;
      var dy    = hpRect.top  - charRect.top;
      var scale = hpRect.height / charRect.height;

      suChar.style.transition      = 'none';
      suChar.style.transformOrigin = 'top left';
      suChar.style.transform       = 'translate(' + dx + 'px,' + dy + 'px) scale(' + scale + ')';

      home.style.transition   = 'opacity 0.3s ease';
      home.style.opacity      = '0';
      home.style.pointerEvents = 'none';

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailSu.style.transition   = 'opacity 0.3s ease';
          detailSu.style.opacity      = '1';
          detailSu.style.pointerEvents = 'auto';
          suChar.style.transition = 'transform 0.5s cubic-bezier(.22,1,.36,1)';
          suChar.style.transform  = '';
        });
      });

      setTimeout(function () {
        home.style.display      = 'none';
        home.style.opacity      = '';
        home.style.transition   = '';
        home.style.pointerEvents = '';
        suChar.style.transition      = '';
        suChar.style.transformOrigin = '';
      }, 550);
    });

    /* ================================================================
       스 세부 → 홈 전환 (FLIP)
    ================================================================ */
    if (document.getElementById('dp-su-back')) document.getElementById('dp-su-back').addEventListener('click', function () {
      // 열린 텍스트 닫기
      document.getElementById('su-stage').classList.remove('su-stage--open');

      suChar.style.animationPlayState = 'paused';
      var charRect = suChar.getBoundingClientRect();
      suChar.style.animationPlayState = '';

      home.style.display      = '';
      home.style.opacity      = '0';
      home.style.transition   = 'none';
      void home.offsetHeight;
      var hpRect = hpSu.getBoundingClientRect();

      var dx    = hpRect.left - charRect.left;
      var dy    = hpRect.top  - charRect.top;
      var scale = hpRect.height / charRect.height;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          suChar.style.transition      = 'transform 0.5s cubic-bezier(.22,1,.36,1)';
          suChar.style.transformOrigin = 'top left';
          suChar.style.transform       = 'translate(' + dx + 'px,' + dy + 'px) scale(' + scale + ')';

          detailSu.style.transition   = 'opacity 0.3s ease';
          detailSu.style.opacity      = '0';
          detailSu.style.pointerEvents = 'none';

          home.style.transition = 'opacity 0.3s ease';
          home.style.opacity    = '1';
        });
      });

      setTimeout(function () {
        detailSu.classList.remove('dp-in');
        detailSu.style.opacity      = '';
        detailSu.style.transition   = '';
        detailSu.style.pointerEvents = '';
        home.style.opacity    = '';
        home.style.transition = '';
        suChar.style.transition      = '';
        suChar.style.transform       = '';
        suChar.style.transformOrigin = '';
      }, 550);
    });

    /* ================================================================
       su-char 클릭 → 텍스트 슬라이드인
    ================================================================ */
    suChar.addEventListener('click', function () {
      document.getElementById('su-stage').classList.toggle('su-stage--open');
    });

    /* ================================================================
       홈 타이틀 클릭 → 메인 세부 페이지 전환
    ================================================================ */
    document.getElementById('hp-title').addEventListener('click', function () {
      openDetailMain();
    });

    /* ================================================================
       홈 → 메인 세부 페이지 전환
    ================================================================ */
    function openDetailMain(sectionId) {
      history.pushState({ page: 'detail-main' }, '');
      home.style.transition    = 'opacity 0.3s ease';
      home.style.opacity       = '0';
      home.style.pointerEvents = 'none';

      detailMain.style.transition    = 'none';
      detailMain.style.opacity       = '0';
      detailMain.style.pointerEvents = 'none';
      detailMain.classList.add('dp-in');
      void detailMain.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailMain.style.transition    = 'opacity 0.3s ease';
          detailMain.style.opacity       = '1';
          detailMain.style.pointerEvents = 'auto';
          if (window.positionAgCircles) window.positionAgCircles();
          startHmFloat();

          if (sectionId) {
            var target = document.getElementById(sectionId);
            if (target) {
              var scroll = document.querySelector('.dm-scroll');
              scroll.scrollTop = target.offsetTop;
            }
          }
        });
      });

      setTimeout(function () {
        home.style.display       = 'none';
        home.style.opacity       = '';
        home.style.transition    = '';
        home.style.pointerEvents = '';
      }, 400);
    }

    /* 프로그레스바 클릭 → 맨 위로 */
    document.getElementById('dm-progress-svg').addEventListener('click', function () {
      var scroll = document.querySelector('.dm-scroll');
      if (scroll) scroll.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* 메인 세부 → 홈 전환 */
    document.getElementById('dm-home-btn').addEventListener('click', function () {
      var scroll = document.querySelector('.dm-scroll');
      if (scroll) scroll.scrollTop = 0;

      home.style.display       = '';
      home.style.opacity       = '0';
      home.style.transition    = 'none';
      void home.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailMain.style.transition    = 'opacity 0.3s ease';
          detailMain.style.opacity       = '0';
          detailMain.style.pointerEvents = 'none';

          home.style.transition = 'opacity 0.3s ease';
          home.style.opacity    = '1';
        });
      });

      setTimeout(function () {
        detailMain.classList.remove('dp-in');
        detailMain.style.opacity       = '';
        detailMain.style.transition    = '';
        detailMain.style.pointerEvents = '';
        home.style.opacity    = '';
        home.style.transition = '';
      }, 400);
    });

    /* ================================================================
       dm-scroll 클릭 → 다음 섹션 이동
    ================================================================ */
    (function () {
      var dmScroll = document.querySelector('.dm-scroll');
      dmScroll.addEventListener('click', function (e) {
        if (e.target.closest('button, a, .dm-u, .dm-hero')) return;
        var sections = dmScroll.querySelectorAll('.dm-section');
        var scrollTop = dmScroll.scrollTop;
        var isUpperHalf = e.clientY < window.innerHeight / 2;

        if (isUpperHalf) {
          for (var i = sections.length - 1; i >= 0; i--) {
            if (sections[i].offsetTop < scrollTop - 50) {
              dmScroll.scrollTo({ top: sections[i].offsetTop, behavior: 'smooth' });
              return;
            }
          }
        } else {
          for (var i = 0; i < sections.length; i++) {
            if (sections[i].offsetTop > scrollTop + 50) {
              dmScroll.scrollTo({ top: sections[i].offsetTop, behavior: 'smooth' });
              return;
            }
          }
        }
      });
    })();

    /* ================================================================
       기본 형태 원 + 텍스트 클릭 → 캡션 오버레이
    ================================================================ */
    (function () {
      var agOverlay  = document.getElementById('ag-form-overlay');
      var agSvg      = document.getElementById('ag-overlay-svg');
      var agLeft     = document.getElementById('ag-caption-left');
      var agRight    = document.getElementById('ag-caption-right');
      var agWord     = document.getElementById('ag-talnemo-word');
      var agCircles  = document.querySelector('.ag-form-circles');
      var agSection  = document.querySelector('.ag-form-section');
      var savedCx = 0, savedCy = 0;

      function positionCircles() {
        if (!agSection || !agWord) return;
        var sr = agSection.getBoundingClientRect();
        var wr = agWord.getBoundingClientRect();
        agCircles.style.left = (wr.left - sr.left + wr.width  / 2) + 'px';
        agCircles.style.top  = (wr.top  - sr.top  + wr.height / 2) + 'px';
      }
      window.positionAgCircles = positionCircles;
      window.addEventListener('resize', positionCircles);

      function drawLines() {
        var lr = agLeft.getBoundingClientRect();
        var lx = lr.right;
        var ly = lr.top + lr.height * 0.3;

        var rr = agRight.getBoundingClientRect();
        var rx = rr.left;
        var ry = rr.top + rr.height * 0.3;

        agSvg.innerHTML =
          '<line x1="' + savedCx + '" y1="' + savedCy + '" x2="' + lx + '" y2="' + ly + '" stroke="#98FB98" stroke-width="2" stroke-linecap="round"/>' +
          '<line x1="' + savedCx + '" y1="' + savedCy + '" x2="' + rx + '" y2="' + ry + '" stroke="#98FB98" stroke-width="2" stroke-linecap="round"/>';
      }

      agWord.addEventListener('click', function (e) {
        e.stopPropagation();
        var wr = agWord.getBoundingClientRect();
        savedCx = wr.left + wr.width  / 2;
        savedCy = wr.top  + wr.height / 2;

        agCircles.classList.add('ag-circles-lit');
        agCircles.style.position = 'fixed';
        agCircles.style.left     = savedCx + 'px';
        agCircles.style.top      = savedCy + 'px';
        agCircles.style.zIndex   = '55';

        agOverlay.classList.add('is-open');
        requestAnimationFrame(drawLines);
      });

      agOverlay.addEventListener('click', function (e) {
        if (!e.target.closest('.ag-caption-panel')) {
          agOverlay.classList.remove('is-open');
          agCircles.classList.remove('ag-circles-lit');
          agCircles.style.position = '';
          agCircles.style.zIndex   = '';
          agSvg.innerHTML = '';
          positionCircles();
        }
      });
    })();

    /* ================================================================
       홈 오브젝트 클릭 → detail-main 특정 섹션으로 이동
    ================================================================ */
    document.getElementById('hp-project').addEventListener('click', function () {
      openDetailMain('sec-aproject');
    });

    document.getElementById('hp-sijakagi').addEventListener('click', function () {
      openDetailMain('sec-birth');
    });

    document.querySelector('.hp-kerning').addEventListener('click', function () {
      openDetailMain('sec-charform');
    });

    document.querySelector('.hp-hunmin').addEventListener('click', function () {
      openDetailMain('sec-hunmin');
    });

    /* ================================================================
       안체프로젝트 → 홈 전환
    ================================================================ */
    document.getElementById('dp-anche-back').addEventListener('click', function () {
      // 텍스트 패널 열려있으면 닫기
      apStage.classList.remove('ap-stage--open');

      home.style.display       = '';
      home.style.opacity       = '0';
      home.style.transition    = 'none';
      void home.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailAnche.style.transition    = 'opacity 0.3s ease';
          detailAnche.style.opacity       = '0';
          detailAnche.style.pointerEvents = 'none';

          home.style.transition = 'opacity 0.3s ease';
          home.style.opacity    = '1';
        });
      });

      setTimeout(function () {
        detailAnche.classList.remove('dp-in');
        detailAnche.style.opacity       = '';
        detailAnche.style.transition    = '';
        detailAnche.style.pointerEvents = '';
        home.style.opacity    = '';
        home.style.transition = '';
        /* 모드 초기화 */
        if (tjIntro) {
          tjIntro.style.display = 'block';
          if (tjStartBtn) tjStartBtn.style.display = 'inline-block';
          tjPlaceholder2.style.display = 'none';
          tjTextWrap.style.display = 'none';
        }
      }, 400);
    });

    /* ================================================================
       ap-sticker-btn 클릭 → 안체프로젝트 페이지
    ================================================================ */
    document.getElementById('ap-sticker-btn').addEventListener('click', function () {
      var detailAnche3 = document.getElementById('detail-anche3');
      detailMain.style.transition    = 'opacity 0.3s ease';
      detailMain.style.opacity       = '0';
      detailMain.style.pointerEvents = 'none';

      detailAnche3.style.transition    = 'none';
      detailAnche3.style.opacity       = '0';
      detailAnche3.style.pointerEvents = 'none';
      detailAnche3.classList.add('dp-in');
      void detailAnche3.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailAnche3.style.transition    = 'opacity 0.3s ease';
          detailAnche3.style.opacity       = '1';
          detailAnche3.style.pointerEvents = 'auto';
        });
      });

      setTimeout(function () {
        detailMain.classList.remove('dp-in');
        detailMain.style.opacity       = '';
        detailMain.style.transition    = '';
        detailMain.style.pointerEvents = '';
      }, 400);
    });

    /* ================================================================
       이미지 그리드 클릭 → 텍스트 패널 토글
    ================================================================ */
    document.getElementById('ap-grid-wrap').addEventListener('click', function () {
      apStage.classList.toggle('ap-stage--open');
    });

    /* ================================================================
       GOGOGOGO → 안체프로젝트 페이지 3 (나만의 안체) 직행
    ================================================================ */
    var detailAnche3 = document.getElementById('detail-anche3');

    document.getElementById('ap-gogo').addEventListener('click', function () {
      detailAnche.style.transition    = 'opacity 0.3s ease';
      detailAnche.style.opacity       = '0';
      detailAnche.style.pointerEvents = 'none';

      detailAnche3.style.transition    = 'none';
      detailAnche3.style.opacity       = '0';
      detailAnche3.style.pointerEvents = 'none';
      detailAnche3.classList.add('dp-in');
      void detailAnche3.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailAnche3.style.transition    = 'opacity 0.3s ease';
          detailAnche3.style.opacity       = '1';
          detailAnche3.style.pointerEvents = 'auto';
        });
      });

      setTimeout(function () {
        detailAnche.classList.remove('dp-in');
        detailAnche.style.opacity       = '';
        detailAnche.style.transition    = '';
        detailAnche.style.pointerEvents = '';
        apStage.classList.remove('ap-stage--open');
        ap3State.text = '';
        ap3Render();
      }, 400);
    });

    /* ================================================================
       페이지 3 → 페이지 1 전환
    ================================================================ */
    document.getElementById('dp-anche3-back').addEventListener('click', function () {
      detailAnche3.style.transition    = 'opacity 0.3s ease';
      detailAnche3.style.opacity       = '0';
      detailAnche3.style.pointerEvents = 'none';

      detailMain.style.transition    = 'none';
      detailMain.style.opacity       = '0';
      detailMain.style.pointerEvents = 'none';
      detailMain.classList.add('dp-in');
      void detailMain.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailMain.style.transition    = 'opacity 0.3s ease';
          detailMain.style.opacity       = '1';
          detailMain.style.pointerEvents = 'auto';
        });
      });

      setTimeout(function () {
        detailAnche3.classList.remove('dp-in');
        detailAnche3.style.opacity       = '';
        detailAnche3.style.transition    = '';
        detailAnche3.style.pointerEvents = '';
        detailMain.style.opacity         = '';
        detailMain.style.transition      = '';
      }, 400);
    });

    /* ================================================================
       페이지 3 — 캔버스 렌더링 (한글 자모 분리 + 선종류 적용)
    ================================================================ */

    /* 한글 자모 테이블 */
    var K_CHO  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    var K_JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
    var K_JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    /* 수직 모음(가로모임꼴): ㅏ(0) ㅐ(1) ㅑ(2) ㅒ(3) ㅓ(4) ㅔ(5) ㅕ(6) ㅖ(7) ㅣ(20) */
    var VERT_JUNG  = [0,1,2,3,4,5,6,7,20];
    /* 섞임모임꼴: ㅘ(9) ㅙ(10) ㅚ(11) ㅝ(14) ㅞ(15) ㅟ(16) ㅢ(19) */
    var MIXED_JUNG = [9,10,11,14,15,16,19];

    function decomposeKo(ch) {
      var c = ch.charCodeAt(0) - 0xAC00;
      if (c < 0 || c > 11171) return null;
      var jong = c % 28;
      var jung = Math.floor(c / 28) % 21;
      var cho  = Math.floor(c / 588);
      return { cho: K_CHO[cho], jung: K_JUNG[jung], jong: K_JONG[jong], ji: jung };
    }

    var ap3State = {
      text:          '',
      lineDash:      [],
      lineWidth:     1.5,
      fontSize:      80,
      lineHeight:    1.6,
      strokeColor:   '#000000',
      fillColor:     '#ffffff',
      fillAlpha:     0,
      cho:           { x: 0, y: 0 },
      jungVert:      { x: 0, y: 0, sy: 1.0 },  /* 가로모임꼴 민글자 */
      jungHoriz:     { x: 0, y: 0, sx: 1.0 },  /* 세로모임꼴 민글자 */
      jungMixed:     { x: 0, y: 0 },            /* 섞임모임꼴 민글자 */
      jongVert:      { x: 0, y: 0 },
      jongHoriz:     { x: 0, y: 0 },
      jongMixed:     { x: 0, y: 0 }             /* 섞임모임꼴 받침글자 */
    };

    function ap3Render() {
      var canvas = document.getElementById('ap3-canvas');
      if (!canvas) return;
      var ctx = canvas.getContext('2d');
      var dpr = window.devicePixelRatio || 1;
      var wrap = canvas.parentElement;
      var W = wrap.clientWidth, H = wrap.clientHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, W, H);

      var text = ap3State.text || '';
      if (!text.trim()) {
        ctx.font      = '15px Pretendard, sans-serif';
        ctx.fillStyle = '#ccc';
        ctx.fillText('한글을 입력하면 여기에 렌더링됩니다', 32, 44);
        return;
      }

      var sz     = ap3State.fontSize;
      var jSz    = Math.round(sz * 0.64);  /* 자모 크기 */
      var lineH  = sz * ap3State.lineHeight;
      var pad    = 36;
      var maxW   = W - pad * 2;

      ctx.strokeStyle = ap3State.strokeColor;
      /* 면 색상: fillColor에 fillAlpha 적용 */
      var fa = ap3State.fillAlpha / 100;
      var fc = ap3State.fillColor;
      /* hex → rgba 변환 */
      var fr = parseInt(fc.slice(1,3), 16);
      var fg = parseInt(fc.slice(3,5), 16);
      var fb = parseInt(fc.slice(5,7), 16);
      ctx.fillStyle   = 'rgba(' + fr + ',' + fg + ',' + fb + ',' + fa + ')';
      ctx.lineWidth   = ap3State.lineWidth;
      ctx.setLineDash(ap3State.lineDash);
      ctx.lineJoin    = 'round';
      ctx.lineCap     = 'round';
      ctx.textBaseline = 'top';

      /* 선+면 동시 그리기 헬퍼 */
      function drawText(str, tx, ty) {
        if (fa > 0) ctx.fillText(str, tx, ty);
        ctx.strokeText(str, tx, ty);
      }

      var x = pad, y = pad + sz * 0.08;

      for (var i = 0; i < text.length; i++) {
        var ch = text[i];
        if (ch === '\n') { x = pad; y += lineH; continue; }

        var dec = decomposeKo(ch);

        if (!dec) {
          /* 비한글 문자 */
          ctx.font = sz * 0.82 + 'px agahnsangsoo2012, sans-serif';
          var cw = ctx.measureText(ch).width;
          if (x + cw > maxW) { x = pad; y += lineH; }
          if (y > H) break;
          drawText(ch, x, y + sz * 0.1);
          x += cw + sz * 0.04;
          continue;
        }

        /* 한글: 자모 분리 배치 */
        if (x + sz > maxW) { x = pad; y += lineH; }
        if (y > H) break;

        ctx.font = jSz + 'px agahnsangsoo2012, sans-serif';

        var isVert  = VERT_JUNG.indexOf(dec.ji) !== -1;
        var isMixed = MIXED_JUNG.indexOf(dec.ji) !== -1;
        var hasJong = dec.jong !== '';
        var co  = ap3State.cho;
        var juo = isVert ? ap3State.jungVert : (isMixed ? ap3State.jungMixed : ap3State.jungHoriz);
        var joo = isVert ? ap3State.jongVert : (isMixed ? ap3State.jongMixed : ap3State.jongHoriz);

        if (isVert) {
          /* 수직 모음(ㅣ계열): 초성 좌, 중성 우 */
          drawText(dec.cho,
            x + sz * 0.03 + co.x,
            y + (hasJong ? sz * 0.02 : sz * 0.10) + co.y);
          /* 가로모임꼴 중성: 세로 스케일 */
          ctx.save();
          var jvx = x + sz * 0.42 + juo.x;
          var jvy = y + sz * 0.02 + juo.y;
          ctx.translate(jvx + jSz * 0.5, jvy);
          ctx.scale(1, juo.sy || 1);
          ctx.translate(-(jvx + jSz * 0.5), -jvy);
          drawText(dec.jung, jvx, jvy);
          ctx.restore();
          if (hasJong)
            drawText(dec.jong,
              x + sz * 0.12 + joo.x,
              y + sz * 0.58 + joo.y);
        } else {
          /* 수평 모음(ㅡ계열): 초성 상, 중성 하 */
          drawText(dec.cho,
            x + sz * 0.16 + co.x,
            y + sz * 0.02 + co.y);
          /* 세로모임꼴 중성: 가로 스케일 */
          ctx.save();
          var jhx = x + sz * 0.06 + juo.x;
          var jhy = y + sz * 0.40 + juo.y;
          ctx.translate(jhx, jhy + jSz * 0.5);
          ctx.scale(juo.sx || 1, 1);
          ctx.translate(-jhx, -(jhy + jSz * 0.5));
          drawText(dec.jung, jhx, jhy);
          ctx.restore();
          if (hasJong)
            drawText(dec.jong,
              x + sz * 0.20 + joo.x,
              y + sz * 0.72 + joo.y);
        }

        x += sz;
      }
    }

    /* ================================================================
       페이지 3 — 컨트롤 버튼 토글
    ================================================================ */
    var ap3CtrlBtns = document.querySelectorAll('.ap3-ctrl-btn');
    ap3CtrlBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-sub');
        var isAlreadyActive = btn.classList.contains('ap3-active');

        ap3CtrlBtns.forEach(function (b) { b.classList.remove('ap3-active'); });
        document.querySelectorAll('.ap3-sub').forEach(function (s) { s.hidden = true; });

        if (!isAlreadyActive) {
          btn.classList.add('ap3-active');
          var panel = document.getElementById(targetId);
          if (panel) panel.hidden = false;
        }
      });
    });

    /* ================================================================
       페이지 3 — 선종류 버튼
    ================================================================ */
    document.querySelectorAll('.ap3-line-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        document.querySelectorAll('.ap3-line-btn').forEach(function (b) {
          b.classList.remove('ap3-active');
        });
        btn.classList.add('ap3-active');
        var raw = btn.getAttribute('data-dash');
        ap3State.lineDash = raw ? raw.split(',').map(Number) : [];
        ap3Render();
      });
    });

    /* 선 굵기 */
    var ap3Lw = document.getElementById('ap3-lw');
    ap3Lw.addEventListener('input', function () {
      ap3State.lineWidth = parseFloat(ap3Lw.value);
      document.getElementById('ap3-lw-val').textContent = ap3Lw.value;
      ap3Render();
    });

    /* 글자 크기 */
    var ap3Sz = document.getElementById('ap3-sz');
    ap3Sz.addEventListener('input', function () {
      ap3State.fontSize = parseInt(ap3Sz.value, 10);
      document.getElementById('ap3-sz-val').textContent = ap3Sz.value + 'px';
      ap3Render();
    });

    /* 행간 */
    var ap3Lh = document.getElementById('ap3-lh');
    ap3Lh.addEventListener('input', function () {
      ap3State.lineHeight = parseInt(ap3Lh.value, 10) / 100;
      document.getElementById('ap3-lh-val').textContent = (ap3State.lineHeight).toFixed(1);
      ap3Render();
    });

    /* 위치 슬라이더 헬퍼 */
    function bindPos(id, valId, obj, key) {
      var el = document.getElementById(id);
      el.addEventListener('input', function () {
        obj[key] = parseInt(el.value, 10);
        document.getElementById(valId).textContent = el.value;
        ap3Render();
      });
    }
    /* 인라인 텍스트 입력 + 글자크기 */
    var ap3TextInput = document.getElementById('ap3-text-input');
    var ap3InlineSz  = document.getElementById('ap3-inline-sz');
    ap3TextInput.addEventListener('input', function () {
      ap3State.text = ap3TextInput.value;
      ap3Render();
    });
    ap3InlineSz.addEventListener('input', function () {
      var sz = parseInt(ap3InlineSz.value, 10);
      if (!isNaN(sz) && sz >= 30 && sz <= 200) {
        ap3State.fontSize = sz;
        /* 비율 패널 슬라이더 동기화 */
        var szSlider = document.getElementById('ap3-sz');
        if (szSlider) { szSlider.value = sz; document.getElementById('ap3-sz-val').textContent = sz + 'px'; }
        ap3Render();
      }
    });

    bindPos('ap3-cho-x',        'ap3-cho-x-val',        ap3State.cho,       'x');
    bindPos('ap3-cho-y',        'ap3-cho-y-val',        ap3State.cho,       'y');
    bindPos('ap3-jung-vert-x',  'ap3-jung-vert-x-val',  ap3State.jungVert,  'x');
    bindPos('ap3-jung-vert-y',  'ap3-jung-vert-y-val',  ap3State.jungVert,  'y');
    bindPos('ap3-jung-horiz-x', 'ap3-jung-horiz-x-val', ap3State.jungHoriz, 'x');
    bindPos('ap3-jung-horiz-y', 'ap3-jung-horiz-y-val', ap3State.jungHoriz, 'y');
    bindPos('ap3-jong-vert-x',  'ap3-jong-vert-x-val',  ap3State.jongVert,  'x');
    bindPos('ap3-jong-vert-y',  'ap3-jong-vert-y-val',  ap3State.jongVert,  'y');
    bindPos('ap3-jong-horiz-x', 'ap3-jong-horiz-x-val', ap3State.jongHoriz, 'x');
    bindPos('ap3-jong-horiz-y', 'ap3-jong-horiz-y-val', ap3State.jongHoriz, 'y');
    bindPos('ap3-jung-mixed-x', 'ap3-jung-mixed-x-val', ap3State.jungMixed, 'x');
    bindPos('ap3-jung-mixed-y', 'ap3-jung-mixed-y-val', ap3State.jungMixed, 'y');
    bindPos('ap3-jong-mixed-x', 'ap3-jong-mixed-x-val', ap3State.jongMixed, 'x');
    bindPos('ap3-jong-mixed-y', 'ap3-jong-mixed-y-val', ap3State.jongMixed, 'y');

    /* 중성 길이 슬라이더 */
    document.getElementById('ap3-jung-vert-sy').addEventListener('input', function () {
      ap3State.jungVert.sy = parseInt(this.value, 10) / 100;
      document.getElementById('ap3-jung-vert-sy-val').textContent = this.value + '%';
      ap3Render();
    });
    document.getElementById('ap3-jung-horiz-sx').addEventListener('input', function () {
      ap3State.jungHoriz.sx = parseInt(this.value, 10) / 100;
      document.getElementById('ap3-jung-horiz-sx-val').textContent = this.value + '%';
      ap3Render();
    });

    /* 선/면 색상 */
    document.getElementById('ap3-stroke-color').addEventListener('input', function () {
      ap3State.strokeColor = this.value;
      ap3Render();
    });
    document.getElementById('ap3-fill-color').addEventListener('input', function () {
      ap3State.fillColor = this.value;
      ap3Render();
    });
    /* 면 불투명도 슬라이더 */
    document.getElementById('ap3-fill-alpha').addEventListener('input', function () {
      ap3State.fillAlpha = parseInt(this.value, 10);
      document.getElementById('ap3-fill-alpha-val').textContent = this.value + '%';
      ap3Render();
    });

    /* 저장 버튼 */
    document.getElementById('ap3-save').addEventListener('click', function () {
      var canvas = document.getElementById('ap3-canvas');
      var link = document.createElement('a');
      link.download = 'my-anche.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });

    /* ================================================================
       한눈에 보기 슬라이더
    ================================================================ */
    (function () {
      var slider   = document.getElementById('hb-slider');
      var track    = document.getElementById('hb-track');
      var total    = 2;
      var current = 0;

      function goTo(idx) {
        current = idx;
        track.style.transform = 'translateX(-' + (idx * 50) + '%)';
      }
      goTo(0);

      document.getElementById('hb-prev').addEventListener('click', function () {
        if (current > 0) goTo(current - 1);
      });
      document.getElementById('hb-next').addEventListener('click', function () {
        if (current < total - 1) goTo(current + 1);
      });
    })();

    /* ================================================================
       한눈에 보기 페이지 전환
    ================================================================ */
    var detailHanbun = document.getElementById('detail-hanbun');

    function openPage(page) {
      history.pushState({ page: page.id }, '');
      home.style.transition    = 'opacity 0.3s ease';
      home.style.opacity       = '0';
      home.style.pointerEvents = 'none';
      page.style.transition    = 'none';
      page.style.opacity       = '0';
      page.style.pointerEvents = 'none';
      page.classList.add('dp-in');
      void page.offsetHeight;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          page.style.transition    = 'opacity 0.3s ease';
          page.style.opacity       = '1';
          page.style.pointerEvents = 'auto';
        });
      });
      setTimeout(function () {
        home.style.display       = 'none';
        home.style.opacity       = '';
        home.style.transition    = '';
        home.style.pointerEvents = '';
      }, 400);
    }

    function closePage(page) {
      home.style.display       = '';
      home.style.opacity       = '0';
      home.style.transition    = 'none';
      void home.offsetHeight;
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          page.style.transition    = 'opacity 0.3s ease';
          page.style.opacity       = '0';
          page.style.pointerEvents = 'none';
          home.style.transition    = 'opacity 0.3s ease';
          home.style.opacity       = '1';
        });
      });
      setTimeout(function () {
        page.classList.remove('dp-in');
        page.style.opacity       = '';
        page.style.transition    = '';
        page.style.pointerEvents = '';
        home.style.opacity       = '';
        home.style.transition    = '';
      }, 400);
    }

    document.getElementById('hp-hanbun').addEventListener('click', function () {
      openPage(detailHanbun);
    });

    document.getElementById('hb-back-btn').addEventListener('click', function () {
      history.back();
    });

    /* ================================================================
       트랙패드 / 브라우저 뒤로가기 → 홈 복귀
    ================================================================ */
    /* ================================================================
       메인 세부 — 히어로 드래그 스크롤 + 클릭 섹터 이동
    ================================================================ */
    (function () {
      var hero = document.getElementById('dm-hero');
      if (!hero) return;
      var isDown = false, startX, scrollLeft, moved = false;
      var ITEM_W = 731.98 + 20; /* 이미지 너비 + gap */
      var TOTAL  = 4;

      hero.addEventListener('mousedown', function (e) {
        isDown = true;
        moved  = false;
        hero.classList.add('is-grabbing');
        startX     = e.pageX - hero.getBoundingClientRect().left;
        scrollLeft = hero.scrollLeft;
      });
      hero.addEventListener('mouseleave', function () { isDown = false; hero.classList.remove('is-grabbing'); });
      hero.addEventListener('mouseup',    function () { isDown = false; hero.classList.remove('is-grabbing'); });
      hero.addEventListener('mousemove',  function (e) {
        if (!isDown) return;
        e.preventDefault();
        var x    = e.pageX - hero.getBoundingClientRect().left;
        var walk = (x - startX) * 1.5;
        if (Math.abs(walk) > 4) moved = true;
        hero.scrollLeft = scrollLeft - walk;
      });

      /* 클릭 → 다음 섹터 */
      hero.addEventListener('click', function () {
        if (moved) { moved = false; return; }
        var idx     = Math.round(hero.scrollLeft / ITEM_W);
        var nextIdx = (idx + 1) % TOTAL;
        hero.scrollTo({ left: nextIdx * ITEM_W, behavior: 'smooth' });
      });

      /* 터치 스와이프 → 다음/이전 섹터 (모바일) */
      var touchStartX = 0;
      hero.addEventListener('touchstart', function (e) {
        touchStartX = e.touches[0].clientX;
      }, { passive: true });
      hero.addEventListener('touchend', function (e) {
        var dx = e.changedTouches[0].clientX - touchStartX;
        if (Math.abs(dx) < 10) {
          /* 탭 → 다음 섹터 */
          var idx = Math.round(hero.scrollLeft / ITEM_W);
          hero.scrollTo({ left: ((idx + 1) % TOTAL) * ITEM_W, behavior: 'smooth' });
        }
      }, { passive: true });
    })();

    history.replaceState({ page: 'home' }, '');

    window.addEventListener('popstate', function (e) {
      var allPages = [detailHanbun, detailMain, detailAnche, detailAg, detailSu,
                      document.getElementById('detail-anche3'),
                      document.getElementById('detail-tajagi')];
      allPages.forEach(function (p) {
        if (p && p.classList.contains('dp-in')) {
          closePage(p);
        }
      });
    });

  })();
  </script>

  <script>
  /* ================================================================
     세벌식 타자기 연습 페이지
  ================================================================ */
  (function () {
    var detailTajagi = document.getElementById('detail-tajagi');
    var tjBack       = document.getElementById('tj-back-btn');
    var tjTextEl     = document.getElementById('tj-text');
    var tjPlaceholder = document.getElementById('tj-placeholder');
    var homePage     = document.getElementById('home-page');

    /* ── 세벌식 390 자판 매핑 ── */
    var CHO_LIST  = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
    var JUNG_LIST = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
    var JONG_LIST = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

    /* 초성 키 맵 (key → 초성 인덱스) */
    var SB_CHO = {
      '!': 1, '1': 18, '2': 10, '#': 12, '3': 7,
      'Q': 17, 'q': 9, 'W': 16, 'w': 5, 'e': 15,
      'A': 3, 'a': 11, 's': 2, 'G': 7,
      'Z': 14, 'z': 6, 'x': 0, '|': 8
    };
    /* 중성 키 맵 (key → 중성 인덱스) */
    var SB_JUNG = {
      '4': 12, '5': 17, '6': 2, '7': 7, '8': 4, '9': 13,
      'r': 1, 't': 0, 'd': 20, 'f': 0, 'g': 18, 'c': 5, 'v': 8, 'b': 13, '/': 8
    };
    /* 종성(받침) 키 맵 */
    var SB_JONG = {
      '@': 9, '$': 14, '%': 13, '0': 24,
      'E': 5, 'R': 15, 'T': 12, 'y': 8, 'u': 7, 'i': 16, 'o': 23, 'p': 26,
      'S': 6, 'D': 11, 'F': 10, 'h': 4, 'j': 21, 'k': 1, 'l': 22, ';': 17, "'": 25,
      'X': 18, 'C': 24, 'V': 2, 'n': 19, 'm': 27
    };
    /* 겸용 키 없음 */
    var SB_DUAL_JONG = {};
    /* 종성 인덱스 → 초성 인덱스 변환 (받침 키를 초성으로 쓸 때) */
    var JONG_TO_CHO = {
      1:0, 2:1, 4:2, 7:3, 8:5, 16:6, 17:7, 19:9, 20:10,
      21:11, 22:12, 23:14, 24:15, 25:16, 26:17, 27:18
    };

    /* 복합 중성: 'jung1,jung2' → 합성 중성 인덱스 */
    var JUNG_CPD = {
      '8,0':9,'8,1':10,'8,20':11,       /* ㅗ+ㅏ=ㅘ, ㅗ+ㅐ=ㅙ, ㅗ+ㅣ=ㅚ */
      '13,4':14,'13,5':15,'13,20':16,   /* ㅜ+ㅓ=ㅝ, ㅜ+ㅔ=ㅞ, ㅜ+ㅣ=ㅟ */
      '18,20':19                         /* ㅡ+ㅣ=ㅢ */
    };
    /* 복합 중성 분리 */
    var JUNG_SPLIT = {9:[8,0],10:[8,1],11:[8,20],14:[13,4],15:[13,5],16:[13,20],19:[18,20]};

    /* 복합 종성: 'jong1,jong2' → 합성 종성 인덱스 */
    var JONG_CPD = {
      '1,19':3,                           /* ㄱ+ㅅ=ㄳ */
      '4,22':5,'4,27':6,                  /* ㄴ+ㅈ=ㄵ, ㄴ+ㅎ=ㄶ */
      '8,1':9,'8,16':10,'8,17':11,'8,19':12,'8,25':13,'8,26':14,'8,27':15, /* ㄹ겹받침 */
      '17,19':18                          /* ㅂ+ㅅ=ㅄ */
    };
    /* 복합 종성 분리 */
    var JONG_SPLIT = {3:[1,19],5:[4,22],6:[4,27],9:[8,1],10:[8,16],11:[8,17],12:[8,19],13:[8,25],14:[8,26],15:[8,27],18:[17,19]};

    /* ── 조합 상태 ── */
    var tj = {
      committed: '',
      cho:  -1,
      jung: -1,
      jong: -1,
      mode: 'idle'  /* idle | cho | cho_jung | cho_jung_jong */
    };

    function makeChar(cho, jung, jong) {
      if (jung === -1) return cho >= 0 ? CHO_LIST[cho] : '';
      var c = cho >= 0 ? cho : 11; /* 초성 없으면 ㅇ */
      return String.fromCharCode(0xAC00 + (c * 21 + jung) * 28 + (jong >= 0 ? jong : 0));
    }

    function currentChar() {
      if (tj.mode === 'idle') return '';
      if (tj.mode === 'cho')  return CHO_LIST[tj.cho];
      /* 초성 없이 중성만 → ㅏ ㅑ 자모 그대로 (ㅇ 안 붙임) */
      if (tj.cho < 0 && tj.jong < 0) return JUNG_LIST[tj.jung];
      return makeChar(tj.cho, tj.jung, tj.jong);
    }

    function commit() {
      tj.committed += currentChar();
      tj.cho = tj.jung = tj.jong = -1;
      tj.mode = 'idle';
    }

    function updateDisplay() {
      var txt = tj.committed + currentChar();
      if (txt.length === 0) {
        tjTextEl.innerHTML = '';
      } else {
        tjTextEl.innerHTML = txt.replace(/\n/g, '<br>') + '<span class="tj-cursor"></span>';
      }
    }

    function handleBackspace() {
      if (tj.mode === 'cho_jung_jong') {
        if (JONG_SPLIT[tj.jong]) {
          tj.jong = JONG_SPLIT[tj.jong][0]; /* 겹받침 → 앞 자음만 */
        } else {
          tj.jong = -1;
          tj.mode = 'cho_jung';
        }
      } else if (tj.mode === 'cho_jung') {
        if (JUNG_SPLIT[tj.jung]) {
          tj.jung = JUNG_SPLIT[tj.jung][0]; /* 복합 중성 → 앞 모음만 */
        } else {
          tj.jung = -1;
          tj.mode = 'cho';
        }
      } else if (tj.mode === 'cho') {
        tj.cho = -1;
        tj.mode = 'idle';
      } else if (tj.committed.length > 0) {
        tj.committed = tj.committed.slice(0, -1);
      }
      updateDisplay();
    }

    var SYMBOL_MAP = {
      '~':'~', '\`':'*',
      '^':'=', '&':'"', '*':'"', '(':'|', ')':'~',
      '_':';', '-':',', '+':'+', '=':'>',
      'Y':'5', 'U':'6', 'I':'7', 'O':'8', 'P':'9',
      '{':'%', '[':'(', '}':'/', ']':'<',
      '\\':':',
      'H':'0', 'J':'1', 'K':'2', 'L':'3',
      ':':'4',
      '"':'"',
      'B':'?',
      'N':'-',
      'M':'=',
      '<':',',
      '>':':',
      '.':'.',
      '?':'!'
    };

    function processKey(key, shift) {
      if (key === 'Backspace') { handleBackspace(); return; }
      if (key === ' ')  { commit(); tj.committed += ' ';  updateDisplay(); return; }
      if (key === 'Enter') { commit(); tj.committed += '\n'; updateDisplay(); return; }
      if (key.length !== 1) return;

      var ch = key;

      if (SYMBOL_MAP[ch] !== undefined) {
         commit();
         tj.committed += SYMBOL_MAP[ch];
         updateDisplay();
         return;
      }

      var choIdx  = SB_CHO[ch];
      var jungIdx = SB_JUNG[ch];
      var jongIdx = SB_JONG[ch];

      if (choIdx !== undefined) {
        /* 초성 키 → 이전 글자 확정 + 새 초성 */
        commit();
        tj.cho  = choIdx;
        tj.mode = 'cho';

      } else if (jungIdx !== undefined) {
        /* 중성 키 */
        if (tj.mode === 'cho') {
          tj.jung = jungIdx;
          tj.mode = 'cho_jung';
        } else if (tj.mode === 'cho_jung') {
          var cpd = JUNG_CPD[tj.jung + ',' + jungIdx];
          if (cpd !== undefined) {
            tj.jung = cpd; /* 복합 모음 조합 */
          } else {
            commit();
            tj.cho  = -1;
            tj.jung = jungIdx;
            tj.mode = 'cho_jung';
          }
        } else if (tj.mode === 'cho_jung_jong') {
          /* 세벌식: 받침 확정 후 ㅇ+중성으로 새 글자 시작
             (초성 키 없이 모음이 바로 오는 비정상 입력 처리) */
          commit();
          tj.cho  = -1;
          tj.jung = jungIdx;
          tj.mode = 'cho_jung';
        } else {
          /* idle → 단독 모음 (ㅇ+모음) */
          commit();
          tj.cho  = -1;
          tj.jung = jungIdx;
          tj.mode = 'cho_jung';
        }

      } else if (jongIdx !== undefined) {
        /* 종성 키 */
        if (tj.mode === 'cho_jung') {
          tj.jong = jongIdx;
          tj.mode = 'cho_jung_jong';
        } else if (tj.mode === 'cho_jung_jong') {
          var cpd2 = JONG_CPD[tj.jong + ',' + jongIdx];
          if (cpd2 !== undefined) {
            tj.jong = cpd2; /* 겹받침 조합 */
          } else {
            commit();
            var choIdx3 = JONG_TO_CHO[jongIdx];
            if (choIdx3 !== undefined) {
              tj.cho  = choIdx3;
              tj.mode = 'cho';
            } else {
              tj.committed += JONG_LIST[jongIdx];
            }
          }
        } else {
          /* 단독 받침 → JONG_TO_CHO로 초성 변환 */
          commit();
          var choIdx2 = JONG_TO_CHO[jongIdx];
          if (choIdx2 !== undefined) {
            tj.cho  = choIdx2;
            tj.mode = 'cho';
          } else {
            tj.committed += JONG_LIST[jongIdx];
          }
        }

      } else {
        /* 일반 문자 (영문, 특수문자) */
        commit();
        tj.committed += ch;
      }

      updateDisplay();
    }

    /* ── e.code → 물리 키 문자 변환 (OS 입력기 독립) ── */
    var CODE_TO_KEY = {
      'Backquote':'\`','Digit1':'1','Digit2':'2','Digit3':'3','Digit4':'4','Digit5':'5',
      'Digit6':'6','Digit7':'7','Digit8':'8','Digit9':'9','Digit0':'0','Minus':'-','Equal':'=',
      'KeyQ':'q','KeyW':'w','KeyE':'e','KeyR':'r','KeyT':'t',
      'KeyY':'y','KeyU':'u','KeyI':'i','KeyO':'o','KeyP':'p',
      'BracketLeft':'[','BracketRight':']','Backslash':'\\',
      'KeyA':'a','KeyS':'s','KeyD':'d','KeyF':'f','KeyG':'g',
      'KeyH':'h','KeyJ':'j','KeyK':'k','KeyL':'l','Semicolon':';',"Quote":"'",
      'KeyZ':'z','KeyX':'x','KeyC':'c','KeyV':'v','KeyB':'b',
      'KeyN':'n','KeyM':'m','Comma':',','Period':'.','Slash':'/',
      'Space':' ','Backspace':'Backspace','Enter':'Enter'
    };

    var SHIFT_MAP = {
      '\`':'~', '1':'!', '2':'@', '3':'#', '4':'$', '5':'%', '6':'^', '7':'&', '8':'*', '9':'(', '0':')', '-':'_', '=':'+',
      '[':'{', ']':'}', '\\':'|', ';':':', '\'':'"', ',':'<', '.':'>', '/':'?'
    };

    function codeToKey(code, shift) {
      var base = CODE_TO_KEY[code];
      if (!base) return null;
      if (shift) {
        if (base.length === 1 && base >= 'a' && base <= 'z') return base.toUpperCase();
        if (SHIFT_MAP[base]) return SHIFT_MAP[base];
      }
      return base;
    }

    /* ── 키보드 이벤트 ── */
    var shiftDown = false;

    document.addEventListener('keydown', function (e) {
      if (!detailTajagi.classList.contains('dp-in')) return;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') { shiftDown = true; return; }
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      var key = codeToKey(e.code, shiftDown);
      if (!key) return;
      e.preventDefault();
      highlightKey(e.code, true);
      processKey(key, shiftDown);
    });

    document.addEventListener('keyup', function (e) {
      if (!detailTajagi.classList.contains('dp-in')) return;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') { shiftDown = false; }
      highlightKey(e.code, false);
    });

    /* ── 키보드 UI 하이라이트 (code 기반) ── */
    var CODE_TO_DATAKEY = {
      'Digit1':'1','Digit2':'2','Digit3':'3','Digit4':'4','Digit5':'5',
      'Digit6':'6','Digit7':'7','Digit8':'8','Digit9':'9','Digit0':'0',
      'Minus':'-','Equal':'=',
      'KeyQ':'q','KeyW':'w','KeyE':'e','KeyR':'r','KeyT':'t',
      'KeyY':'y','KeyU':'u','KeyI':'i','KeyO':'o','KeyP':'p',
      'KeyA':'a','KeyS':'s','KeyD':'d','KeyF':'f','KeyG':'g',
      'KeyH':'h','KeyJ':'j','KeyK':'k','KeyL':'l','Semicolon':';',
      'KeyZ':'z','KeyX':'x','KeyC':'c','KeyV':'v','KeyB':'b',
      'KeyN':'n','KeyM':'m','Space':' ',
      'Backspace':'Backspace','Enter':'Enter',
      'ShiftLeft':'Shift','ShiftRight':'Shift'
    };

    function highlightKey(code, press) {
      var dataKey = CODE_TO_DATAKEY[code];
      if (!dataKey) return;
      var els = document.querySelectorAll('#detail-tajagi .tj-key[data-key="' + dataKey + '"]');
      els.forEach(function (el) {
        if (press) el.classList.add('is-pressed');
        else       el.classList.remove('is-pressed');
      });
    }

    /* ── 홈 → 세벌식 페이지 전환 ── */
    var tajagiBtns = document.querySelectorAll('#hp-tajagi-home, #hp-tajagi-rope');
    tajagiBtns.forEach(function(btn) {
      btn.addEventListener('click', function () {
        var closeBtn = document.getElementById('rope-overlay-close');
      if (closeBtn) closeBtn.click();

      history.pushState({ page: 'detail-tajagi' }, '');
      homePage.style.transition    = 'opacity 0.3s ease';
      homePage.style.opacity       = '0';
      homePage.style.pointerEvents = 'none';

      detailTajagi.style.transition    = 'none';
      detailTajagi.style.opacity       = '0';
      detailTajagi.style.pointerEvents = 'none';
      detailTajagi.classList.add('dp-in');
      void detailTajagi.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailTajagi.style.transition    = 'opacity 0.3s ease';
          detailTajagi.style.opacity       = '1';
          detailTajagi.style.pointerEvents = 'auto';
        });
      });

      setTimeout(function () {
        homePage.style.display       = 'none';
        homePage.style.opacity       = '';
        homePage.style.transition    = '';
        homePage.style.pointerEvents = '';
        /* 상태 초기화 */
        tj.committed = ''; tj.cho = tj.jung = tj.jong = -1; tj.mode = 'idle';
        updateDisplay();
      }, 400);
    });
    });

    /* ── 직접 써보기 / 원복 버튼 동작 ── */
    var tjStartBtn = document.getElementById('tj-start-btn');
    var tjRestoreBtn = document.getElementById('tj-restore-btn');
    var tjIntro = document.getElementById('tj-intro');
    var tjTextWrap = document.getElementById('tj-text');
    
    if (tjStartBtn && tjIntro) {
      tjStartBtn.addEventListener('click', function() {
        tjIntro.style.display = 'none';
        tj.committed = '';
        if (tjTextWrap) tjTextWrap.innerHTML = '';
        if (typeof isMobile !== 'undefined' && isMobile && typeof tjMobileInput !== 'undefined' && tjMobileInput) {
          tjMobileInput.focus();
        }
      });
    }

    if (tjRestoreBtn && tjIntro) {
      tjRestoreBtn.addEventListener('click', function() {
        tjIntro.style.display = 'block';
        tj.committed = '';
        if (tjTextWrap) tjTextWrap.innerHTML = '';
      });
    }

    /* ── 세벌식 페이지 → 홈 전환 ── */
    function closeTajagi() {
      homePage.style.display       = '';
      homePage.style.opacity       = '0';
      homePage.style.transition    = 'none';
      void homePage.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailTajagi.style.transition    = 'opacity 0.3s ease';
          detailTajagi.style.opacity       = '0';
          detailTajagi.style.pointerEvents = 'none';
          homePage.style.transition = 'opacity 0.3s ease';
          homePage.style.opacity    = '1';
        });
      });

      setTimeout(function () {
        detailTajagi.classList.remove('dp-in');
        detailTajagi.style.opacity       = '';
        detailTajagi.style.transition    = '';
        detailTajagi.style.pointerEvents = '';
        homePage.style.opacity    = '';
        homePage.style.transition = '';
      }, 400);
    }

    if (tjBack) {
      tjBack.addEventListener('click', closeTajagi);
    }


    /* ── 모바일 입력 ── */
    var tjMobileInput = document.getElementById('tj-mobile-input');
    var isMobile = ('ontouchstart' in window);

    if (isMobile && tjMobileInput) {
      document.getElementById('tj-output').addEventListener('click', function () {
        tjMobileInput.value = tj.committed;
        tjMobileInput.focus();
      });

      tjMobileInput.addEventListener('input', function () {
        tj.committed = tjMobileInput.value;
        tj.cho = tj.jung = tj.jong = -1;
        tj.mode = 'idle';
        updateDisplay();
        if (tjMobileInput.value.length > 200) {
          tjMobileInput.value = tj.committed;
        }
      });

      tjMobileInput.addEventListener('focus', function () {
        document.getElementById('tj-placeholder').style.display = 'none';
      });

      if (isMobile) {
        document.getElementById('tj-placeholder').textContent =
          '탭하여 입력 — 한글 키보드로 자유롭게 쓰세요';
      }
    }

  })();
  </script>

  <script>
  /* ================================================================
     각주 팝업 시스템
  ================================================================ */
  (function () {
    var overlay    = document.getElementById('fn-overlay');
    var card       = document.getElementById('fn-card');
    var activeSpan = null;

    var FN_DATA = {
      '1': {
        title: "(1) 안상수체는 왜 '안상수'체일까?",
        text:  "먼저, 당연히 그래야 한다고 생각했어요. 다른 생각을 하지 못했죠. 두번째는 당시에 안그라픽스를 막 시작하는 시점이었는데, 내 이름을 붙이는게 가장 확실하게 내 일과 디자인에 책임을 지는 방법이라고 생각했어요. 내 이름을 걸었으니 소홀히 하기 어렵겠다는 생각을 했죠. 그런 생각으로 그땐 일말의 고민도 없이 '안상수'체라고 이름을 붙였어요."
      },
      '2': {
        title: "(2) 안상수 1952~",
        img:   "image/안상수.webp",
        text:  "시각디자이너, 타이포그라퍼. 1985년 '안상수체'를 멋지어 한글 글꼴의 탈네모 흐름을 이끌었으며, 이후 이상체, 미르체, 마노체 등을 선보였다. 1988년 실험잡지 「보고서/보고서」를 창간, 전위적인 타이포그라피를 실험하며 현재까지 한글 타이포그라피를 바탕으로 한 작업을 선보이고 있다."
      },
      '3': {
        title: "(3) \"이런 것도 글자냐\"",
        text:  "당시 한글 글꼴은 네모틀에 맞춰 설계하는 것이 당연한 관습이었다. 탈네모꼴인 안상수체는 그 관습을 정면으로 거스른 시도였고, 이 핀잔은 역설적으로 안상수체가 기존 타이포그라피의 문법을 얼마나 과감하게 벗어났는지를 보여준다."
      },
      'hm1': { imgOnly: true },
      'hm2': { imgOnly: true },
      'hm3': { imgOnly: true },
      'ap1': {
        title: "네빌 브로디 Neville Brody (1957~)",
        img:   "image/네빌 브로디.png",
        text:  "영국 그래픽 디자이너·타이포그래퍼. 잡지 «더 페이스»의 아트디렉터로 이름을 알렸으며, 실험적 타이포그래피와 독창적 그래픽 언어로 1980년대 영국 디자인 씬을 선도했다. 안체 프로젝트에서 안상수체 모듈로 새로운 탈네모틀 한글꼴을 선보였다."
      },
      'ap2': {
        title: "사랑 쿨카르니 Sarang Kulkarni",
        img:   "image/사랑 쿨카르니.png",
        text:  "인도 출신 그래픽 디자이너. 활자체 디자인과 인쇄 문화를 중심으로 작업하며, 다양한 문자 체계와 현대 타이포그래피의 접점을 탐구한다. 안체 프로젝트에서 안상수체의 구조적 원리를 재해석한 작업을 선보였다."
      },
      'ap3': {
        title: "엠엠 파리 M/M Paris",
        img:   "image/엠엠파리.png",
        text:  "프랑스 파리 기반 디자인 듀오 미카엘 아무나우와 마티아스 아우구스티니아크로 구성. 패션·음악·미술계를 넘나들며 독창적 타이포그래픽 언어를 구축해왔다. 안체 프로젝트에서 안상수체 모듈을 활용한 실험적 한글꼴을 제작했다."
      },
      'ap4': {
        title: "하라 겐야 Kenya Hara 原研哉 (1958~)",
        img:   "image/하라 겐야.png",
        text:  "일본 그래픽 디자이너. 무인양품(MUJI)의 아트디렉터로 잘 알려져 있으며, '백(白)'의 개념을 중심으로 여백과 단순함의 미학을 탐구한다. 안체 프로젝트에서 한글의 여백과 구조를 재발견한 작업을 선보였다."
      }
    };

    function buildCard(data) {
      if (data.img) {
        card.innerHTML =
          '<div class="fn-card-header">' +
            '<p class="fn-card-title">' + data.title + '</p>' +
            '<img class="fn-card-portrait" src="' + data.img + '" alt="" />' +
          '</div>' +
          '<p class="fn-card-text">' + data.text + '</p>';
      } else {
        card.innerHTML =
          '<p class="fn-card-title">' + data.title + '</p>' +
          '<p class="fn-card-text">' + data.text + '</p>';
      }
    }

    var hmSpans = document.querySelectorAll('.dm-u[data-fn^="hm"]');
    var activeThumb = null;

    function closeApThumb() {
      if (activeThumb) { activeThumb.classList.remove('ap-active'); activeThumb = null; }
    }

    function closeFn() {
      overlay.classList.remove('is-open');
      card.classList.remove('is-open');
      if (activeSpan) { activeSpan.classList.remove('fn-active'); activeSpan = null; }
      hmSpans.forEach(function(s) { s.classList.remove('fn-active'); });
      closeApThumb();
    }

    document.querySelectorAll('.dm-u[data-fn]').forEach(function (span) {
      span.addEventListener('click', function (e) {
        e.stopPropagation();
        var fn   = span.getAttribute('data-fn');
        var data = FN_DATA[fn];
        if (!data) return;

        if (data.imgOnly) {
          var alreadyOpen = hmSpans[0] && hmSpans[0].classList.contains('fn-active');
          if (alreadyOpen) { closeFn(); return; }
          if (activeSpan) activeSpan.classList.remove('fn-active');
          activeSpan = span;
          hmSpans.forEach(function(s) { s.classList.add('fn-active'); });
          overlay.classList.add('is-open');
          return;
        }

        if (activeSpan === span) { closeFn(); return; }
        if (activeSpan) activeSpan.classList.remove('fn-active');
        activeSpan = span;
        span.classList.add('fn-active');


        buildCard(data);

        /* 내용 채운 뒤 실제 높이로 위치 계산 */
        card.style.visibility = 'hidden';
        card.classList.add('is-open');
        var rect   = span.getBoundingClientRect();
        var cardW  = 276;
        var cardH  = card.offsetHeight;
        var top    = rect.top - cardH - 16;
        if (top < 20) top = rect.bottom + 16;
        var left   = rect.left;
        if (left + cardW > window.innerWidth - 20) left = window.innerWidth - cardW - 20;
        if (left < 20) left = 20;

        card.style.top        = top  + 'px';
        card.style.left       = left + 'px';
        card.style.visibility = '';

        overlay.classList.add('is-open');
      });
    });

    document.querySelectorAll('.dm-ap-thumb').forEach(function(thumb) {
      thumb.addEventListener('click', function(e) {
        e.stopPropagation();
        var isActive = activeThumb === thumb;
        closeFn();
        if (!isActive) {
          var fn   = thumb.getAttribute('data-fn');
          var data = FN_DATA[fn];
          if (!data) return;

          activeThumb = thumb;
          thumb.classList.add('ap-active');

          buildCard(data);
          card.style.visibility = 'hidden';
          card.classList.add('is-open');

          var rect  = thumb.getBoundingClientRect();
          var cardW = 276;
          var cardH = card.offsetHeight;
          var top   = rect.top - cardH - 16;
          if (top < 20) top = rect.bottom + 16;
          var left  = rect.left + rect.width / 2 - cardW / 2;
          if (left + cardW > window.innerWidth - 20) left = window.innerWidth - cardW - 20;
          if (left < 20) left = 20;

          card.style.top        = top  + 'px';
          card.style.left       = left + 'px';
          card.style.visibility = '';

          overlay.classList.add('is-open');
        }
      });
    });

    overlay.addEventListener('click', closeFn);
  })();
  </script>

  <script>
  /* 상단바 SVG 스크롤 진행도 애니메이션 */
  (function () {
    var dmScroll  = document.querySelector('#detail-main .dm-scroll');
    var clipRect  = document.getElementById('dm-clip-rect');
    var rightD    = document.getElementById('dm-right-d');
    var ropeWrap  = document.getElementById('dm-rope-wrap');
    var lastRopePage = -1;

    function update() {
      var max = dmScroll.scrollHeight - dmScroll.clientHeight;
      var p   = max > 0 ? Math.min(1, Math.max(0, dmScroll.scrollTop / max)) : 0;
      clipRect.setAttribute('width', 1843 * p);
      rightD.setAttribute('transform', 'translate(' + (1843 * (p - 1)) + ',0)');
      rightD.style.opacity = p < 0.04 ? 0 : 1;

      if (ropeWrap) {
        var sections = dmScroll.querySelectorAll('.dm-section');
        var scrollTop = dmScroll.scrollTop;
        var currentIdx = 0;
        for (var i = 0; i < sections.length; i++) {
          if (sections[i].offsetTop <= scrollTop + window.innerHeight * 0.5) {
            currentIdx = i;
          }
        }
        
        // 섹션 2 (0-base) = 3번 페이지, 섹션 6 = 7번 페이지에서 표시
        if (currentIdx === 2 || currentIdx === 6) {
          if (lastRopePage !== currentIdx) {
            // 다른 밧줄 페이지로 진입 시 밧줄을 새것처럼 초기화
            ropeWrap.classList.remove('has-seen');
            ropeWrap.style.animation = '';
            ropeWrap.style.transition = '';
            ropeWrap.style.transform = '';
            
            // 열려있던 오버레이가 있다면 원상복구
            var ov1 = document.getElementById('rope-overlay');
            var ov2 = document.getElementById('rope-overlay-2');
            if (ov1) { ov1.style.transform = 'translateY(-100%)'; ov1.style.pointerEvents = 'none'; }
            if (ov2) { ov2.style.transform = 'translateY(-100%)'; ov2.style.pointerEvents = 'none'; }
            
            lastRopePage = currentIdx;
          }
          ropeWrap.classList.remove('fade-out');
        } else {
          ropeWrap.classList.add('fade-out');
          lastRopePage = -1; // 밧줄 영역을 벗어나면 상태 초기화
        }
      }
    }

    update();
    dmScroll.addEventListener('scroll', update, { passive: true });
  })();

  /* ── 밧줄 + 패널 동기 인터랙션 ── */
  (function() {
    var wrap      = document.getElementById('dm-rope-wrap');
    var rope      = document.getElementById('dm-rope');
    var overlay1  = document.getElementById('rope-overlay');
    var overlay2  = document.getElementById('rope-overlay-2');
    var closeBtn1 = document.getElementById('rope-overlay-close');
    var closeBtn2 = document.getElementById('rope-overlay-close-2');
    if (!wrap || !rope || !overlay1) return;

    var THRESHOLD = 50;
    var dragging  = false;
    var startY    = 0;
    var delta     = 0;
    var isOpen    = false;
    var activeOverlay = overlay1;

    /* 밧줄 이미지 실제 높이 */
    function ropeH() { return rope.offsetHeight || 465; }
    /* 밧줄 끝이 화면 바닥에 딱 닿는 translateY */
    function ropeDown() { return window.innerHeight + 40 - ropeH(); }
    /* 80px만 화면 상단에 살짝 보이는 translateY (조금 남게) */
    function ropeRest() { return 120 - ropeH(); }

    /* 열기: 오버레이 내려옴 / 밧줄은 오버레이 바닥에 달려 화면 아래로 숨어버림 */
    function openOverlay() {
      isOpen = true;
      wrap.classList.add('has-seen');
      wrap.style.animation        = 'none';
      activeOverlay.style.transition    = 'transform 1.6s cubic-bezier(0.5,0,0.15,1)';
      activeOverlay.style.transform     = 'translateY(0)';
      activeOverlay.style.pointerEvents = 'auto';
      wrap.style.transition       = 'transform 1.6s cubic-bezier(0.5,0,0.15,1)';
      wrap.style.transform        = 'translateY(' + (window.innerHeight + 40) + 'px)';
      wrap.style.pointerEvents    = 'none';
      wrap.style.zIndex           = '';
    }

    /* 닫기: 오버레이 바닥이 밧줄 상단에 붙어 같이 올라옴 */
    function closeOverlay() {
      isOpen = false;
      activeOverlay.style.pointerEvents = 'none';
      activeOverlay.style.transition    = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      activeOverlay.style.transform     = 'translateY(-100%)';
      wrap.style.zIndex           = '125';
      wrap.style.transition       = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      wrap.style.transform        = 'translateY(40px)';
      wrap.style.pointerEvents    = '';
      wrap.classList.add('has-seen');
      setTimeout(function() {
        wrap.style.transition = 'transform 0.35s ease';
        wrap.style.transform  = 'translateY(' + ropeRest() + 'px)';
        setTimeout(function() { wrap.style.zIndex = ''; }, 400);
      }, 720);
    }

    /* 충분히 안 당김 → 원위치 복귀 */
    function snapBack() {
      activeOverlay.style.transition = 'transform 0.4s ease';
      activeOverlay.style.transform  = 'translateY(-100%)';
      wrap.style.transition    = 'transform 0.4s ease';
      wrap.style.transform     = 'translateY(0)';
      wrap.style.zIndex        = '';
      wrap.style.pointerEvents = '';
    }

    /* ── 밧줄 드래그 / 클릭 ── */
    wrap.addEventListener('pointerdown', function(e) {
      dragging = true;
      startY   = e.clientY;
      delta    = 0;
      
      var dmScrollEl = document.querySelector('#detail-main .dm-scroll');
      var currentIdx = 0;
      if (dmScrollEl) {
        var sections = dmScrollEl.querySelectorAll('.dm-section');
        var scrollTop = dmScrollEl.scrollTop;
        for (var i = 0; i < sections.length; i++) {
          if (sections[i].offsetTop <= scrollTop + window.innerHeight * 0.5) {
            currentIdx = i;
          }
        }
      }
      if (currentIdx === 6) {
        activeOverlay = overlay2;
      } else {
        activeOverlay = overlay1;
      }

      wrap.classList.add('has-seen');
      wrap.style.animation     = 'none';
      wrap.style.transition    = 'none';
      wrap.style.transform     = 'translateY(0)';
      activeOverlay.style.transition = 'none';
      activeOverlay.style.transform  = 'translateY(' + (-window.innerHeight - 40) + 'px)';
      wrap.style.zIndex        = '130';
      wrap.classList.add('is-dragging');
      wrap.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    wrap.addEventListener('pointermove', function(e) {
      if (!dragging) return;
      var d = ropeDown();
      delta = Math.min(Math.max(0, e.clientY - startY), d * 1.1);
      wrap.style.transform    = 'translateY(' + delta + 'px)';
      activeOverlay.style.transform = 'translateY(' + (delta - window.innerHeight - 40) + 'px)';
    });

    wrap.addEventListener('pointerup', function(e) {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove('is-dragging');
      if (typeof wrap.releasePointerCapture === 'function') {
        wrap.releasePointerCapture(e.pointerId);
      }
      if (delta < 10 || delta >= THRESHOLD) {
        openOverlay();
      } else {
        snapBack();
      }
      delta = 0;
    });

    wrap.addEventListener('pointercancel', function() {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove('is-dragging');
      snapBack();
      delta = 0;
    });

    /* ── X 닫기 버튼 ── */
    if (closeBtn1) {
      closeBtn1.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
      closeBtn1.addEventListener('click', function(e) {
        e.stopPropagation();
        closeOverlay();
      });
    }
    if (closeBtn2) {
      closeBtn2.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
      closeBtn2.addEventListener('click', function(e) {
        e.stopPropagation();
        closeOverlay();
      });
    }

    /* ── 오버레이 클릭/탭 → 닫기 (X 버튼 클릭은 제외) ── */
    if (overlay1) {
      overlay1.addEventListener('click', function(e) {
        if (e.target.closest('.rope-overlay-close')) return;
        if (!isOpen) return;
        closeOverlay();
      });
    }
    
    // overlay2 클릭 이벤트는 밑의 6단계 진행을 위해 따로 제어하므로 배경 닫기는 일단 막거나 조건부로 처리
    // 닫기 버튼으로만 닫히도록 하거나 6단계가 끝나면 닫히도록.
    
    // 1984 6단계 클릭 로직
    var dev1984Clicker = document.getElementById('dev1984-overlay-clicker');
    if (dev1984Clicker && overlay2) {
      var steps = [
        { t: "1. 프레임 만들기", d: "모듈 골격을 추출해 설계도로 삼고, 첫닿자∙홀자∙받침의 위치와 쪽자 삽입지점∙선 굵기를 수치로 고정했다." },
        { t: "2. 자형 요소의 분석", d: "44자(첫닿자 19, 홀자 14, 받침닿자 11)를 최소 단위로 설정하고, 블록 명령으로 조합해 자형을 구현했다." },
        { t: "3. 직선의 처리", d: "처음에 솔리드 명령을 사용하여 그렸지만 오토캐드 2.6프로그램을 구한 뒤에는 모두 폴리라인으로 바꾸었다." },
        { t: "4. 곡선의 처리", d: "면 채우기 기능이 없어 원호로 외곽선을 그린 뒤 라인 밀도를 높여 메궜다.<br>ㅇ,ㅅ은 해치 명령으로, 동그라미는 이후 폴리라인으로 처리했다." },
        { t: "5. 글자의 조합", d: "쪽자를 블록으로 저장해 불러내 조합하고, 완성된 낱글자도 블록으로 저장했다.<br>삽입지점을 지정해 글자 간격이 균일하게 맞도록 했다." },
        { t: "6. 하드카피", d: "롤란드 DXY 880 플로터로 출력했으나 품질이 고르지 않아 수성 사인펜으로 일일이 수작업 수정했다." }
      ];
      var stepIdx = 0;
      var titleEl = document.getElementById('dev1984-step-title');
      var descEl = document.getElementById('dev1984-step-desc');
      
      dev1984Clicker.addEventListener('click', function(e) {
        if (e.target.closest('.rope-overlay-close')) return;
        stepIdx++;
        if (stepIdx >= steps.length) {
          // 6번째에서 한 번 더 누르면 창 닫기!
          closeOverlay();
          // 다음 번에 다시 열 때를 위해 초기화
          setTimeout(function() {
            stepIdx = 0;
            titleEl.textContent = steps[stepIdx].t;
            descEl.innerHTML = steps[stepIdx].d;
          }, 1000);
        } else {
          titleEl.textContent = steps[stepIdx].t;
          descEl.innerHTML = steps[stepIdx].d;
        }
      });
    }
  })();

  /* ── 인트로 이미지 클릭: 텍스트 토글 ── */
  (function() {
    var introSection = document.querySelector('.dm-section--intro');
    var refImg = introSection ? introSection.querySelector('.dm-ref-big') : null;
    if (!refImg) return;
    refImg.addEventListener('click', function(e) {
      e.stopPropagation();
      introSection.classList.toggle('is-focused');
    });
  })();

  /* ── 오프닝 스토리 클릭 시 한 문단씩 등장 ── */
  (function() {
    var storySection = document.getElementById('dm-story');
    if (!storySection) return;

    var paragraphs = storySection.querySelectorAll('.story-paragraph');
    var currentIndex = 0;

    if (paragraphs.length > 0) {
      paragraphs[0].classList.add('is-visible');
      currentIndex = 1;
    }

    storySection.addEventListener('click', function(e) {
      if (currentIndex < paragraphs.length) {
        e.stopPropagation();
        paragraphs[currentIndex].classList.add('is-visible');
        currentIndex++;
      }
    });
  })();

  /* ── 훈민정음3 형광펜 애니메이션 ── */
  (function() {
    var hm3Section = document.querySelector('.dm-section--hunmin3');
    var highlight = document.querySelector('.hm3-highlight');
    if (!hm3Section || !highlight) return;
    
    var observer = new IntersectionObserver(function(entries) {
      if (entries[0].isIntersecting) {
        highlight.classList.add('is-drawn');
      } else {
        highlight.classList.remove('is-drawn');
      }
    }, { threshold: 0.5 });
    
    observer.observe(hm3Section);
  })();

  /* ── 엔딩 스토리 클릭 시 한 문장씩 등장 ── */
  (function() {
    var endingSection = document.getElementById('dm-ending-story');
    if (!endingSection) return;

    var paragraphs = endingSection.querySelectorAll('.story-paragraph');
    var currentIndex = 0;

    if (paragraphs.length > 0) {
      paragraphs[0].classList.add('is-visible');
      currentIndex = 1;
    }

    endingSection.addEventListener('click', function(e) {
      if (currentIndex < paragraphs.length) {
        e.stopPropagation();
        paragraphs[currentIndex].classList.add('is-visible');
        currentIndex++;
      }
    });
  })();
  </script>

` }} style={{width: '100%', height: '100%'}} />
    </motion.div>
  );
}
