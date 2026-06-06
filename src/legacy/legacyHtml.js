const LEGACY_HTML = `

  <!-- 에디토리얼 홈 -->
  <div id="home-page" class="home-page hp-in">

    <!-- 상단 타이틀 -->
    <button class="hp-title" id="hp-title">안상수체에.대해.얼마나.알고.있니</button>

    <!-- 그룹커닝 자리에 귀여운 눈동자 마운트 -->
    <div class="hp-kerning" id="hp-cute-eyes-mount" style="display: flex; justify-content: center; align-items: center; width: 200px; height: 200px; transform: translate(-30px, -30px); z-index: 50;">
    </div>

    <!-- 타자기 (홈) -->
    <div class="hp-tajagi" id="hp-tajagi-home" style="cursor: pointer;">
      <img src="/image/타자기2.png" alt="종이" class="hp-tajagi-paper" />
      <img src="/image/타자기.png" alt="타자기" class="hp-tajagi-base" />
    </div>
    <!-- 학 (교체된 이미지): 1500,234 -->
    <div class="hp-hak" id="hp-hak" style="cursor: pointer;">
      <img src="/image/학.png" alt="학" class="hp-img" />
    </div>

    <!-- 확장 자리 제거됨 (유승현 텍스트 버튼으로 교체됨) -->

    <!-- 훈민정음 책: 137,490 / rotate:-15deg -->
    <div class="hp-hunmin" id="hp-hunmin" style="cursor: pointer;">
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

    <!-- 한눈에 보기 -->
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

    <!-- 유승현 섹션으로 이동하는 버튼 (구 확장 자리) -->
    <div class="hp-expand" style="z-index: 100; pointer-events: none; display: flex; justify-content: center; align-items: center;">
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

      <!-- 안체프로젝트 A-Project (이미지 섹션) -->
      <div class="dm-section dm-section--aproject-images" id="sec-aproject" style="width: 100%; min-height: 100vh; display: flex; justify-content: center; align-items: center;">
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
      </div>

      <!-- 안체프로젝트 A-Project (설명 및 스티커 섹션) -->
      <div class="dm-section dm-section--aproject-info" id="sec-aproject-info" style="width: 100%; min-height: 100vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <h2 class="dm-title">&lt;안체 프로젝트 A-Project&gt;</h2>
        <p class="dm-body">안체 프로젝트는 AG 안상수체 탄생 40주년을 기념해 진행된 프로젝트로, 참여 디자이너들이 AG 안상수체의 모듈을 활용해 새로운 탈네모틀 한글꼴을 제작하고 안상수와 한글에 대한 각자의 생각을 담아내는 연구 프로젝트다. 연구소는 디자이너들이 11,172자의 한글 완성형 글자를 완성할 수 있도록 제작 전 과정을 지원한다.</p>
        <img src="/image/안체프로젝트.png" class="ap-sticker" id="ap-sticker-btn" alt="안체프로젝트 바로가기" />
      </div>




    </div>

    <!-- 각주 오버레이 (detail-main 안 — 같은 스태킹 컨텍스트) -->
    <div class="fn-overlay" id="fn-overlay"></div>
    <div class="fn-card" id="fn-card"></div>



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

  

  

  

  

`;

export default LEGACY_HTML;
