export default function initLegacyApp(navigate) {
  let _activeKbDown = null;
  let _activeKbUp = null;

  try {
    // ---- Original app.js ----
    'use strict';

/* ================================================================
   AG 안상수체 알아보기 — app.js
   이미지 자료 기반 콘텐츠
   ================================================================ */

/* ── 카테고리별 콘텐츠 ── */
const PAGES = {

  /* HOME — 2분할: 왼쪽 목록 + 오른쪽 호버 설명 */
  home: {
    title: '메인 홈',
    num: '◆',
    render() {
      return `
        <div class="hm-split">
          <nav class="hm-split-left">
            <div class="hm-split-menu">
              <button class="hm-group-btn" data-group="history">
                <span class="hm-group-range">01 – 03</span>
                <span class="hm-group-name">역사·배경</span>
                <span class="hm-group-arr">→</span>
              </button>
              <button class="hm-group-btn" data-group="structure">
                <span class="hm-group-range">04 – 06</span>
                <span class="hm-group-name">구조·원리</span>
                <span class="hm-group-arr">→</span>
              </button>
              <button class="hm-group-btn" data-group="digital">
                <span class="hm-group-range">07 – 08</span>
                <span class="hm-group-name">디지털·현재</span>
                <span class="hm-group-arr">→</span>
              </button>
              <button class="hm-group-btn" data-group="typing">
                <span class="hm-group-range">▶</span>
                <span class="hm-group-name">세벌식 타자연습</span>
                <span class="hm-group-arr">→</span>
              </button>
            </div>
          </nav>
          <div class="hm-split-right" id="hm-preview"></div>
        </div>
      `;
    }
  },

  /* 01. 안상수체의 탄생 */
  birth: {
    title: '안상수체의 탄생',
    num: '01',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">01</span>
          <span class="desc-title">안상수체의 탄생</span>
          <span class="desc-sub">1985</span>
        </div>

        <div class="desc-visual-large">AG  안상수체  2012</div>

        <p>⟨안상수체⟩는 디자이너 안상수가 1985년 설계한 세벌식 탈네모틀 글꼴이다. 첫닿자 19자, 홀자 21자, 받침 27자를 조합하여 11,172자를 파생하는 세벌식 조합 글꼴로, 한글 자소는 수직선, 수평선, 사선, 정원 등 기하학적 형태로 구성됐으며 홀자의 기둥이 길게 뻗어서 받침의 정가운데에 맞닿아 있는 것이 특징이다.</p>

        <div class="desc-two-col" style="margin-top:18px;">
          <div class="info-box">
            <div class="info-box-title">탄생 배경</div>
            <p>1985년 12월 제3회 〈홍익시각디자이너협회 회원전〉 포스터에 처음 사용되었으며, 이듬해 1986년 1월 창간된 <em>《과학동아》</em>의 제호 작업에도 쓰였다.</p>
            <p>안상수는 1984년 벡터 방식의 캐드 프로그램(오토캐드 2.1)을 활용해 훈민정음의 창제 원리에 기반하여 낱소리·홀소리의 자소를 독립된 단위로 조합하는 방식으로 글자 체계를 설계하고, 최소한의 자소로 가장 많은 글자를 구성할 수 있는 한글 본래의 조합 논리를 디지털 환경에 적용했다.</p>
          </div>
          <div class="info-box">
            <div class="info-box-title">안상수 교수는?</div>
            <p>안상수는 1952년생 시각디자이너로, 홍익대학교 시각디자인과 교수를 역임했다. 한국 현대 타이포그래피를 이끈 선구자로, 1988년 《보고서/보고서》를 창간하며 타이포그래피 실험을 이어갔다.</p>
            <p>파주타이포그라피학교(PaTI)를 설립하여 실험적 타이포그래피 교육의 장을 마련했다.</p>
          </div>
        </div>

        <div class="timeline">
          <div class="tl-item">
            <div class="tl-year">1984</div>
            <div class="tl-line"><div class="tl-dot"></div><div class="tl-bar"></div></div>
            <div class="tl-body"><strong>캐드 프로그램으로 시작</strong> — 오토캐드 2.1을 활용, 벡터 방식의 기초 설계 착수</div>
          </div>
          <div class="tl-item">
            <div class="tl-year">1985</div>
            <div class="tl-line"><div class="tl-dot"></div><div class="tl-bar"></div></div>
            <div class="tl-body"><strong>홍익대 회원전</strong> — 제3회 홍익시각디자이너협회 회원전 포스터에 최초 사용</div>
          </div>
          <div class="tl-item">
            <div class="tl-year">1986</div>
            <div class="tl-line"><div class="tl-dot"></div><div class="tl-bar"></div></div>
            <div class="tl-body"><strong>《과학동아》 제호</strong> — 창간호 제호 작업에 탈네모틀 서체로 게재</div>
          </div>
          <div class="tl-item">
            <div class="tl-year">1990</div>
            <div class="tl-line"><div class="tl-dot"></div><div class="tl-bar"></div></div>
            <div class="tl-body"><strong>디지털화</strong> — 벡터 기반 글꼴로 변환, 일반 배포 시작</div>
          </div>
          <div class="tl-item">
            <div class="tl-year">2012</div>
            <div class="tl-line"><div class="tl-dot"></div></div>
            <div class="tl-body"><strong>AG 안상수체 2012</strong> — 전면 리디자인 및 가변폰트 연구 착수</div>
          </div>
        </div>

      `;
    }
  },

  /* 02. 한글기계화운동 */
  mechanization: {
    title: '한글기계화운동',
    num: '02',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">02</span>
          <span class="desc-title">한글기계화운동</span>
          <span class="desc-sub">배경과 맥락</span>
        </div>

        <p>일제강점기 이후 한글 전용·가로쓰기가 확산되면서 문서를 빠르고 효율적으로 생산할 수단이 절실해졌고, 이에 한글을 기계로 구현하려는 움직임이 본격화됐다. 5벌식·4벌식을 거쳐 공병우의 세벌식으로 실용화됐으나, 정권이 2벌식을 표준으로 강제 채택하면서 기계화 운동의 본래 원리는 꺾였다. 그러나 이 세벌식의 조합 구조는 디자이너들에게 영감을 주어 탈네모틀 서체 탄생의 토대가 됐다.</p>

        <div class="desc-two-col" style="margin-top:14px;">
          <div class="info-box">
            <div class="info-box-title">세벌식과 탈네모틀</div>
            <p>세벌식은 초성·중성·종성을 각각 독립된 자판으로 입력하는 방식이다. 이 구조는 자소를 분리된 단위로 다룬다는 점에서, 안상수체의 조형 설계와 정확히 같은 논리를 공유한다.</p>
            <p>기계화의 논리가 타이포그래피의 미학으로 이어진 흐름이다.</p>
          </div>
          <div class="info-box">
            <div class="info-box-title">2벌식 표준화의 역설</div>
            <p>정권의 2벌식 강제 표준 채택으로 세벌식은 공식 기계화에서 밀려났지만, 세벌식의 조합 논리는 디자인 언어로 살아남았다.</p>
            <p>안상수체는 기계화의 실패가 오히려 타이포그래피의 혁신으로 이어진 사례이다.</p>
          </div>
        </div>

        <div class="info-box" style="margin-top:14px;">
          <div class="info-box-title">낱자의 독립</div>
          <p>초성·중성·종성을 분리된 단위(낱자)로 독립시키는 방식은, 기계 위에서 한글을 처리하기 위한 필수적 과정이었다. 안상수체는 이 "낱자의 독립"을 타이포그래피적 미학으로 승화시켰다.</p>
          <p>기존 서체에서 하나의 덩어리였던 초성·중성·종성이 각각 독립된 조형 단위로 배치되면서, 한글 타이포그래피의 새로운 패러다임이 열렸다.</p>
        </div>

        <div class="quote-large">"반드시 이웃이 있게 마련이다."</div>
      `;
    }
  },

  /* 03. 탈네모틀 */
  talnemo: {
    title: '탈 네모틀',
    num: '03',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">03</span>
          <span class="desc-title">탈 네모틀</span>
          <span class="desc-sub">조형의 해방</span>
        </div>

        <p>기존 한글 서체는 초성·중성·종성을 하나의 <strong>정사각형 칸(네모틀)</strong> 안에 채워 넣는 방식이었습니다. 안상수체는 이 틀에서 벗어나 자모를 독립 단위로 배치하는 <strong>'탈네모틀'</strong> 구조를 제안했습니다.</p>

        <div class="desc-two-col" style="margin-top:16px;">
          <div class="info-box">
            <div class="info-box-title">네모틀이란?</div>
            <p>전통 활자 시대부터 이어진 방식으로, 한 글자가 정해진 사각형 안에서 초성·중성·종성을 조합하는 형태다.</p>
            <p>가로세로 비율이 1:1인 정사각형 공간을 기준으로, 모든 글자가 동일한 크기를 갖게 된다.</p>
          </div>
          <div class="info-box">
            <div class="info-box-title">탈네모틀의 의미</div>
            <p>자모 하나하나가 독립적인 크기와 형태를 갖고, 글자 내부의 여백과 간격이 다양해진다.</p>
            <p>이는 서양 타이포그래피의 프로포셔널 설계와 유사한 논리로, 한글을 더 세밀하게 디자인할 수 있게 한다.</p>
          </div>
        </div>

        <div class="info-box" style="margin-top:14px;">
          <div class="info-box-title">조형적 특징</div>
          <p>안상수체의 자소는 <strong>수학식·수열식·정원</strong> 등 기하학적 형태로 구성됩니다. 홀자(모음)의 기저 변인상 바탕에 닿아 있으며, 자음의 구조도 최소한의 획으로 정리되어 있습니다.</p>
          <p>이러한 기하학적 단순성이 안상수체의 시각적 율동감과 현대성을 동시에 만들어냅니다.</p>
        </div>

        <div class="desc-three-col" style="margin-top:14px;">
          <div class="info-box" style="text-align:center;">
            <div class="info-box-title">네모틀 방식</div>
            <div style="font-size:28px;font-weight:800;letter-spacing:0;border:2px solid #ccc;padding:10px;margin:8px 0;">한글</div>
            <p style="font-size:11px;color:#888;">균일한 정사각형 배치</p>
          </div>
          <div style="display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:800;color:#b0aa9e;">→</div>
          <div class="info-box" style="text-align:center;">
            <div class="info-box-title">탈네모틀 방식</div>
            <div style="font-size:28px;font-weight:800;letter-spacing:8px;padding:10px;margin:8px 0;">ㅎㅏㄴ</div>
            <p style="font-size:11px;color:#888;">자모 독립 배치</p>
          </div>
        </div>
      `;
    }
  },

  /* 04. 개발 과정 */
  process: {
    title: '개발 과정',
    num: '04',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">04</span>
          <span class="desc-title">개발 과정</span>
          <span class="desc-sub">6단계 제작 원리</span>
        </div>

        <p>1984년, 안상수는 벡터 방식의 기계 제도용 캐드 프로그램 오토캐드(AutoCAD 2.1)를 활용해 한글 글꼴 설계에 착수했다. 건축 설계용 도구를 글자 디자인에 전용한 것으로, 컴퓨터를 완전히 숙지하지 못한 상태에서 시작했지만 이를 통해 한글 조형의 새로운 가능성을 발견했다.</p>

        <div class="step-grid">
          <div class="step-card">
            <div class="step-num">STEP 1</div>
            <div class="step-title">프레임 만들기</div>
            <div class="step-body">모든 문자를 구성할 격자를 설정하고, 자모의 위치와 크기를 결정하는 기본 틀을 만든다.</div>
          </div>
          <div class="step-card">
            <div class="step-num">STEP 2</div>
            <div class="step-title">낱음 요소의 분석</div>
            <div class="step-body">44자(첫닿자 19, 홀자 14, 받침달자 11)를 최소 단위로 설정하고, 블록들의 조합으로 자형을 구현했다.</div>
          </div>
          <div class="step-card">
            <div class="step-num">STEP 3</div>
            <div class="step-title">직선의 처리</div>
            <div class="step-body">슬라이드 도형을 사용하여 첫닿자·홀자·받침의 모든 외곽선을 폴리라인으로 변환했다.</div>
          </div>
          <div class="step-card">
            <div class="step-num">STEP 4</div>
            <div class="step-title">곡선의 처리</div>
            <div class="step-body">원호를 사용해 외곽선을 처리했다. ㅁ·ㅅ은 별도의 규칙을 적용해 정밀하게 처리했다.</div>
          </div>
          <div class="step-card">
            <div class="step-num">STEP 5</div>
            <div class="step-title">글자의 조합</div>
            <div class="step-body">확정된 자소를 조합하여 11,172자를 파생하는 조합형 글꼴 구조를 검증한다.</div>
          </div>
          <div class="step-card">
            <div class="step-num">STEP 6</div>
            <div class="step-title">하드카피</div>
            <div class="step-body">DXY.880 플로터로 출력하고, 규격에 맞지 않는 부분은 수정 사인펜으로 일일이 보정해 완성했다.</div>
          </div>
        </div>

        <div class="info-box" style="margin-top:4px;">
          <div class="info-box-title">구조적 특징</div>
          <p>각 자소를 독립된 모듈로 다루어, 어떤 자소와 합쳐지더라도 일정한 조형 원칙이 유지되도록 설계되어 있습니다. 이 원칙 덕분에 적은 자소로 많은 글자를 구성할 수 있는 한글의 조합 논리를 극대화할 수 있었습니다.</p>
        </div>
      `;
    }
  },

  /* 05. 모임꼴 */
  moim: {
    title: '모임꼴',
    num: '05',
    render() {
      const cons = [
        ['ㄱ','기역'],['ㄴ','니은'],['ㄷ','디귿'],['ㄹ','리을'],['ㅁ','미음'],['ㅂ','비읍'],
        ['ㅅ','시옷'],['ㅇ','이응'],['ㅈ','지읒'],['ㅊ','치읓'],['ㅋ','키읔'],['ㅌ','티읕'],
        ['ㅍ','피읖'],['ㅎ','히읗'],['ㄲ','쌍기역'],['ㄸ','쌍디귿'],['ㅃ','쌍비읍'],
        ['ㅆ','쌍시옷'],['ㅉ','쌍지읒'],
      ];
      const vows = [
        ['ㅏ','아'],['ㅐ','애'],['ㅑ','야'],['ㅒ','얘'],['ㅓ','어'],['ㅔ','에'],
        ['ㅕ','여'],['ㅖ','예'],['ㅗ','오'],['ㅘ','와'],['ㅙ','왜'],['ㅚ','외'],
        ['ㅛ','요'],['ㅜ','우'],['ㅝ','워'],['ㅞ','웨'],['ㅟ','위'],['ㅠ','유'],
        ['ㅡ','으'],['ㅢ','의'],['ㅣ','이'],
      ];
      const cell = ([ch, name]) =>
        `<div class="jamo-cell"><span class="jamo-char">${ch}</span><span class="jamo-name">${name}</span></div>`;
      return `
        <div class="desc-header">
          <span class="desc-num">05</span>
          <span class="desc-title">모임꼴</span>
          <span class="desc-sub">자모 배치 원리</span>
        </div>
        <p>안상수체의 초성·중성·종성은 독립된 모듈로 설계되어, 어떤 위치에 쓰이든 동일한 형태를 유지합니다.</p>
        <div class="desc-num" style="margin:8px 0 4px;font-size:10px;letter-spacing:2px;color:var(--gray);">자음 CONSONANTS</div>
        <div class="jamo-grid">${cons.map(cell).join('')}</div>
        <div class="desc-num" style="margin:8px 0 4px;font-size:10px;letter-spacing:2px;color:var(--gray);">모음 VOWELS</div>
        <div class="jamo-grid">${vows.map(cell).join('')}</div>
        <div class="info-box" style="margin-top:8px;">
          <div class="info-box-title">같은 모양, 다른 역할</div>
          <p>초성과 종성에 같은 자소가 쓰이더라도 안상수체에서 형태는 항상 동일합니다. ㄱ은 초성·종성 구분 없이 같은 모양이며, 위치만 달라질 뿐입니다. 이것이 안상수체 모듈화의 핵심입니다.</p>
        </div>
      `;
    }
  },

  /* 06. 조형체 종류 */
  types: {
    title: '조형체 종류',
    num: '06',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">06</span>
          <span class="desc-title">조형체 종류</span>
          <span class="desc-sub">A · B · C · D 타입</span>
        </div>

        <p>안상수체는 자소의 배치 방식에 따라 크게 A·B·C·D 네 가지 조형 타입으로 분류됩니다. 각 타입은 초성·중성·종성의 결합 방식과 공간 배분이 다릅니다.</p>

        <div class="type-grid">
          <div class="type-card">
            <div class="type-label">TYPE — A</div>
            <div class="type-name">초성 + 중성</div>
            <div class="type-demo">가 나 다</div>
            <div class="type-desc">종성 없이 초성과 중성만으로 구성되는 글자. 가장 단순한 구조로, 중성이 초성 오른쪽 또는 아랫쪽에 위치한다.</div>
          </div>
          <div class="type-card">
            <div class="type-label">TYPE — B</div>
            <div class="type-name">초성 + 중성 + 종성</div>
            <div class="type-demo">각 닭 밥</div>
            <div class="type-desc">초성·중성·종성이 모두 있는 완전한 글자. 종성이 글자 아래에 독립적으로 배치된다.</div>
          </div>
          <div class="type-card">
            <div class="type-label">TYPE — C</div>
            <div class="type-name">세로 중성</div>
            <div class="type-demo">모 도 보</div>
            <div class="type-desc">중성이 초성 아래에만 오는 구조. 세로 방향의 리듬감이 강조된다.</div>
          </div>
          <div class="type-card">
            <div class="type-label">TYPE — D</div>
            <div class="type-name">복합 중성</div>
            <div class="type-demo">봐 뭐 쪄</div>
            <div class="type-desc">합성 모음(복합 중성)을 사용하는 글자. 두 모음이 결합되어 독특한 공간 구조를 형성한다.</div>
          </div>
        </div>

        <div class="info-box" style="margin-top:4px;">
          <div class="info-box-title">조형의 일관성</div>
          <p>네 가지 타입 모두 동일한 기하학적 원칙을 따릅니다. 자소의 획 두께, 곡선 반지름, 여백 비율이 수학적으로 통일되어 있어, 어떤 글자든 안상수체 고유의 일관성을 유지합니다.</p>
          <p>이 원칙이 바로 안상수체를 단순한 '예쁜 글꼴'이 아닌 하나의 완결된 타이포그래피 시스템으로 만드는 이유입니다.</p>
        </div>
      `;
    }
  },

  /* 07. 모듈 조립 체험 */
  workshop: {
    title: '모듈 조립 체험',
    num: '07',
    isWorkshop: true,
    render() {
      /* 안상수체 핵심: 초성·중성·종성이 모두 같은 모양! */
      const choseong  = ['ㄱ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ','ㄲ','ㄸ','ㅃ','ㅆ','ㅉ'];
      const jungseong = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
      const jongseong = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄹ','ㅁ','ㅂ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

      const makeTiles = (items, role) =>
        items.map(j =>
          `<div class="ws-tile" data-jamo="${j}" data-role="${role}" draggable="false">
             <span class="ws-tile-char">${j}</span>
           </div>`
        ).join('');

      return `
        <div class="ws-header">
          <div class="desc-header" style="margin-bottom:6px;padding-bottom:8px;">
            <span class="desc-num">07</span>
            <span class="desc-title">모듈 조립 체험</span>
            <span class="desc-sub">Modular Assembly</span>
          </div>
          <div class="ws-hint">
            아래 자판에서 자모를 <strong>드래그</strong>해서 캔버스에 놓으세요.
            &mdash; <span class="ws-highlight">초성</span> <span class="ws-highlight">중성</span> <span class="ws-highlight">종성</span>은 모두 <strong>같은 모양의 모듈</strong>입니다. 위치만 다를 뿐!
            &nbsp;· 캔버스 위 모듈 재드래그하여 이동 &nbsp;· 호버 시 × 삭제
          </div>
        </div>

        <div class="ws-body">
          <div class="ws-canvas-wrap" id="ws-canvas">
            <div class="ws-canvas-hint" id="ws-hint">☐ 아래 자판에서 자모를 끌어다 놓으세요</div>
          </div>

          <div class="ws-palette" id="ws-palette">
            <div class="ws-palette-row">
              <span class="ws-palette-label">초성</span>
              ${makeTiles(choseong, '초성')}
            </div>
            <div class="ws-palette-row">
              <span class="ws-palette-label">중성</span>
              ${makeTiles(jungseong, '중성')}
            </div>
            <div class="ws-palette-row">
              <span class="ws-palette-label">종성</span>
              ${makeTiles(jongseong, '종성')}
            </div>
            <div class="ws-controls">
              <button class="ws-btn" id="ws-clear">↺ 캔버스 삭제</button>
              <span style="font-size:11px;color:#888;line-height:28px;margin-left:4px;">초성 ㄱ과 종성 ㄱ은 같은 모양 — 콘셈트만 다르다</span>
            </div>
          </div>
        </div>
      `;
    }
  },

  /* 08. 디지털화 */
  digital: {
    title: '디지털화',
    num: '08',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">08</span>
          <span class="desc-title">안상수체의 디지털화</span>
          <span class="desc-sub">벡터에서 가변폰트까지</span>
        </div>

        <p>안상수체는 1985년 캐드 소프트웨어로 설계되어 27자를 조합한 11,172자를 출력할 수 있었습니다. 이후 벡터 기반 포스트스크립트 방식으로 전환하면서 디지털 환경에서의 활용이 본격화되었습니다.</p>

        <div class="timeline">
          <div class="tl-item">
            <div class="tl-year">1985</div>
            <div class="tl-line"><div class="tl-dot"></div><div class="tl-bar"></div></div>
            <div class="tl-body"><strong>오토캐드 DXF 880도</strong> — 최초의 벡터 데이터. 캐드도면 프린터로 출력</div>
          </div>
          <div class="tl-item">
            <div class="tl-year">1990</div>
            <div class="tl-line"><div class="tl-dot"></div><div class="tl-bar"></div></div>
            <div class="tl-body"><strong>벡터 글꼴 변환</strong> — 포스트스크립트 기반 글꼴로 최초 전환. 인쇄 출판 분야에 본격 배포</div>
          </div>
          <div class="tl-item">
            <div class="tl-year">1993</div>
            <div class="tl-line"><div class="tl-dot"></div><div class="tl-bar"></div></div>
            <div class="tl-body"><strong>트루타입 변환</strong> — 일반 PC 환경에서도 사용 가능한 TTF 포맷 배포 시작</div>
          </div>
          <div class="tl-item">
            <div class="tl-year">2012</div>
            <div class="tl-line"><div class="tl-dot"></div><div class="tl-bar"></div></div>
            <div class="tl-body"><strong>AG 안상수체 2012</strong> — AG 타이포그라피연구소와 협업하여 전면 리뉴얼. OpenType 완전 지원</div>
          </div>
          <div class="tl-item">
            <div class="tl-year">현재</div>
            <div class="tl-line"><div class="tl-dot"></div></div>
            <div class="tl-body"><strong>가변폰트(Variable Font) 연구</strong> — 무게·너비·기울기를 축으로 연속 변형 가능한 가변폰트 개발 진행 중</div>
          </div>
        </div>

        <div class="desc-two-col" style="margin-top:8px;">
          <div class="info-box">
            <div class="info-box-title">벡터 모드로의 전환</div>
            <p>1990년대 초 PostScript 기반 출력 장비가 보급되면서, 안상수체는 벡터 방식으로 재설계되었습니다. 이로써 어떤 크기에서도 선명한 출력이 가능해졌습니다.</p>
          </div>
          <div class="info-box">
            <div class="info-box-title">캠리같은문패(1984)</div>
            <p>이상철 작가가 제작한 실험적 한글 타이포그래피 작업. 안상수체와 함께 1980년대 한국 실험 타이포그래피의 대표작으로 꼽힙니다.</p>
          </div>
        </div>

        <div class="quote-large">"지금까 바라보고 이었던 거야."<br/><span style="font-size:16px;letter-spacing:2px;font-weight:400;">— 안상수</span></div>
      `;
    }
  },

  /* 08. AG 안상수체 종류 */
  ag: {
    title: 'AG 안상수체',
    num: '08',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">08</span>
          <span class="desc-title">AG 안상수체 종류</span>
          <span class="desc-sub">AG 타이포그라피연구소 출시</span>
        </div>

        <p>AG 타이포그라피연구소와의 협업을 통해 2012년 기준 세 가지 버전의 안상수체가 배포·판매되고 있습니다.</p>

        <div class="ag-grid">
          <div class="ag-card">
            <div class="ag-card-header">AG 안상수체 줄무의</div>
            <div class="ag-card-demo">한글</div>
            <div class="ag-card-body">
              <p>AG 안상수체 2012를 바탕으로, 글자 중앙에 얇은 선을 추가해 디자인한 글꼴이다. 중앙을 가로지르는 얇은 선이 안상수체에 새로운 활력을 부여한다.</p>
            </div>
          </div>
          <div class="ag-card">
            <div class="ag-card-header">AG 둥근안상수체</div>
            <div class="ag-card-demo">한글</div>
            <div class="ag-card-body">
              <p>안상수체(1985)의 새로운 글자 가족으로, 직각 처리된 끝부분을 부드러운 원호로 다듬어 친근한 느낌을 강조한 파생 버전이다. 한글·라틴·숫자를 다목적으로 재구성했다.</p>
            </div>
          </div>
          <div class="ag-card">
            <div class="ag-card-header">AG 안상수체 베리어블</div>
            <div class="ag-card-demo">한글</div>
            <div class="ag-card-body">
              <p>AG 안상수체 2012를 바탕으로 8가지 형태의 글꼴을 구현한 가변폰트다. 세로모임꼴 너비·가로모임꼴 너비·받침 길이 세 가지 변수 축을 통해 연속적으로 변형 가능하다.</p>
            </div>
          </div>
        </div>

        <div class="info-box" style="margin-top:4px;">
          <div class="info-box-title">영원한 이별은 아니다.</div>
          <p style="font-size:18px;font-weight:800;letter-spacing:4px;margin:6px 0;">영원한 이별은 아니다.</p>
          <p>이 문장은 안상수체의 조형 원리를 가장 잘 드러내는 예시 문장으로 자주 사용됩니다. 각 자모의 독립성과 결합의 리듬감을 동시에 느낄 수 있습니다.</p>
        </div>

      `;
    }
  },

  /* 직접 써보기 */
  preview: {
    title: '직접 써보기',
    num: '✎',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">✎</span>
          <span class="desc-title">직접 써보기</span>
          <span class="desc-sub">안상수체 렌더링</span>
        </div>
        <div class="preview-tool">
          <div class="preview-controls">
            <textarea class="preview-text-input" id="preview-text" placeholder="한글을 자유롭게 입력하세요" maxlength="200" rows="3">안상수체</textarea>
            <div class="preview-sliders">
              <div class="preview-slider-wrap">
                <span>크기</span>
                <input type="range" id="preview-size" min="24" max="160" value="80" step="4" />
                <span id="preview-size-val">80px</span>
              </div>
              <div class="preview-slider-wrap">
                <span>자간</span>
                <input type="range" id="preview-letter" min="0" max="20" value="4" step="1" />
                <span id="preview-letter-val">4px</span>
              </div>
              <div class="preview-slider-wrap">
                <span>행간</span>
                <input type="range" id="preview-line" min="10" max="30" value="13" step="1" />
                <span id="preview-line-val">1.3</span>
              </div>
            </div>
          </div>
          <div class="preview-display" id="preview-display">안상수체</div>
        </div>
      `;
    }
  },

  /* 서체 비교 */
  compare: {
    title: '서체 비교',
    num: '≡',
    render() {
      return `
        <div class="desc-header">
          <span class="desc-num">≡</span>
          <span class="desc-title">서체 비교</span>
          <span class="desc-sub">네모틀 vs 탈네모틀</span>
        </div>
        <div class="compare-input-wrap">
          <input type="text" class="compare-text-input" id="compare-text" placeholder="비교할 텍스트를 입력하세요" value="한글 타이포그래피" maxlength="14" />
        </div>
        <div class="compare-grid">
          <div class="compare-card">
            <div class="compare-card-header">
              AG 안상수체
              <div class="compare-card-sub">탈네모틀</div>
            </div>
            <div class="compare-card-display" id="cmp-ahn" style="font-family:var(--font-ahn);">한글 타이포그래피</div>
            <div class="compare-card-desc">자모를 독립 모듈로 배치. 네모틀 밖으로 벗어나는 탈네모틀 구조.</div>
          </div>
          <div class="compare-card">
            <div class="compare-card-header">
              나눔고딕
              <div class="compare-card-sub">네모틀 산세리프</div>
            </div>
            <div class="compare-card-display" id="cmp-gothic" style="font-family:'Nanum Gothic',sans-serif;font-weight:800;">한글 타이포그래피</div>
            <div class="compare-card-desc">정사각형 네모틀 안에 자모를 균등 배치하는 현대적 한글 고딕 서체.</div>
          </div>
          <div class="compare-card">
            <div class="compare-card-header">
              나눔명조
              <div class="compare-card-sub">네모틀 세리프</div>
            </div>
            <div class="compare-card-display" id="cmp-myeong" style="font-family:'Nanum Myeongjo',serif;font-weight:700;">한글 타이포그래피</div>
            <div class="compare-card-desc">획의 시작과 끝에 세리프를 갖춘 전통 명조 계열 네모틀 서체.</div>
          </div>
        </div>
        <div class="info-box" style="margin-top:14px;">
          <div class="info-box-title">네모틀과 탈네모틀의 차이</div>
          <p>나눔고딕·나눔명조는 모든 글자가 동일한 정사각형 크기를 차지하지만, 안상수체는 자모의 독립성에 따라 글자 폭이 달라집니다.</p>
        </div>
      `;
    }
  },

  /* 타자 연습 세부 페이지는 이제 홈 메뉴 드롭다운으로 대체됨 */
  exit: {
    title: '끝',
    num: '✕',
    render() {
      return `
        <div class="desc-header"><span class="desc-title">감사합니다</span></div>
        <p>안상수체 알아보기를 이용해주셔서 감사합니다.</p>
        <div class="quote-large">영원한 이별은 아니다.</div>
      `;
    }
  },
};

/* ── 타이핑 연습 텍스트 ── */
const TYPING = {
  sentence: [
    '안상수체는 1985년 안상수가 디자인한 한글 전용 서체입니다.',
    '자모를 분리하여 배치하는 독창적인 구조가 특징입니다.',
    '탈네모틀이란 기존 정사각형 틀에서 자모를 해방하는 개념입니다.',
    '안상수체는 기존 모아쓰기 틀에서 벗어난 해방적 타이포그래피입니다.',
    '자음과 모음이 자유롭게 배치되어 시각적 율동감을 만들어냅니다.',
    '서양의 타이포그래피와 대등한 독립적 조형 체계를 정립한 서체입니다.',
    '안상수 교수는 파주타이포그라피학교 파티를 설립하기도 했습니다.',
    '영원한 이별은 아니다.',
  ],
  longtext: [],   /* 카테고리별로 동적 설정됨 */
};

/* ── 긴글연습 카테고리 및 텍스트 ── */
const LONGTEXT_CATS = [
  {
    id: 'feature',
    num: '01',
    name: '안상수체의 특징',
    desc: '조형 원리 · 모듈화 · 기하학',
    texts: [
      `안상수체는 기존 한글 서체와 근본적으로 다른 조형 원리를 지닌다. 전통 서체가 초성, 중성, 종성을 네모틀 안에 눌러 담는 방식이라면, 안상수체는 각 자소를 독립된 모듈로 취급한다. 자소는 어떤 글자에 쓰이든 동일한 크기와 형태를 유지하며, 조합에 따라 위치만 달라질 뿐이다.`,
      `안상수체의 획은 수학식 직선과 기하학적 곡선으로만 이루어진다. 손으로 쓴 붓글씨의 흔적이 전혀 없으며, 마치 자로 그은 듯한 엄격한 선형 구조가 특징이다. 이 원칙 덕분에 안상수체는 디지털 시대의 서체로서 완벽하게 구현될 수 있었다. 어떤 해상도에서도 획의 규칙성이 무너지지 않는다.`,
      `안상수체에서 자음 모듈은 초성으로 쓰이든 종성으로 쓰이든 형태가 동일하다. 예를 들어 기역은 초성 위치에서도, 종성 위치에서도 같은 획 구성과 비례 관계를 유지한다. 이것이 안상수가 말하는 모듈화의 핵심이다. 자소 자체에 의미가 있고, 위치는 그 다음의 문제이다. 이 원칙은 조합형 한글의 본래 논리와도 일치한다.`,
    ],
  },
  {
    id: 'nemo',
    num: '02',
    name: '네모틀과 탈네모틀',
    desc: '전통 구조 · 해방 · 새로운 조형',
    texts: [
      `네모틀이란 한글 한 글자를 정사각형 안에 배치하는 레이아웃 원칙이다. 조선시대 목판 인쇄부터 현대 납활자 시대까지 한글 서체 디자인의 불문율로 여겨졌다. 이 틀 안에서 초성, 중성, 종성은 전체 글자의 균형을 위해 크기와 비례를 조정해야만 했다.`,
      `탈네모틀은 글자를 정사각형 틀 안에 욱여넣는 기존 관행을 거부하는 움직임이다. 안상수는 각 자소가 고유한 크기를 가져야 한다고 주장했다. 자음은 자음의 본래 폭을, 모음은 모음의 본래 높이를 유지해야 한다는 것이다. 이 원칙을 따르면 글자마다 차지하는 공간이 달라진다.`,
      `탈네모틀 서체에서 낱말은 서로 다른 높이와 너비를 가진 자소들의 리듬감 있는 배열이 된다. 일정한 틀에 눌린 자소 대신, 각자의 형태를 온전히 드러내는 자소들이 나란히 서는 것이다. 안상수는 이를 '자소의 해방'이라고 불렀다. 자소는 특정 글자에 종속되는 것이 아니라, 자체로서 존재한다.`,
    ],
  },
  {
    id: 'change',
    num: '03',
    name: '한글 서체의 변화',
    desc: '역사 흐름 · 기계화 · 디지털',
    texts: [
      `한글 서체의 역사는 훈민정음 창제 이후 다양한 변화를 거쳐왔다. 조선시대의 필사체, 목판 인쇄체, 근대의 활자체, 컴퓨터 시대의 디지털 폰트까지 각 시대의 기술과 미감을 반영하며 발전해 왔다. 그 흐름 속에서 안상수체는 단순한 새 서체가 아니라, 한글 조형의 근본적인 재해석이었다.`,
      `1980년대 한국은 경제 성장과 함께 디자인 산업이 급격히 성장하던 시기였다. 그래픽 디자이너들은 서양 타이포그래피의 번역본에서 벗어나 한글 고유의 조형 언어를 모색하기 시작했다. 안상수는 그 선봉에서 한글 자모의 독자적인 조형성을 탐구했으며, 그 결실이 바로 안상수체이다.`,
      `컴퓨터와 레이저 프린터의 보급은 한글 서체 디자인의 판도를 바꾸었다. 납활자 시대에는 물리적으로 구현하기 어려웠던 다양한 형태의 서체가 디지털로 손쉽게 제작될 수 있게 되었다. 안상수체는 이 디지털 전환 시대의 한복판에서 태어났으며, 기하학 원칙에 기반한 구조 덕분에 디지털 환경에 완벽하게 적응할 수 있었다.`,
    ],
  },
  {
    id: 'birth',
    num: '04',
    name: '탄생과 역사',
    desc: '1985년 · 안상수 · 첫 발표',
    texts: [
      `1985년 제13회 홍익대학교 미대 타이포그래피 클럽 전시에서 안상수는 새로운 한글 서체를 처음 공개했다. 이 서체는 당시 디자인계에 큰 충격을 주었다. 누군가는 혁신이라 했고, 누군가는 낯섦에 고개를 저었다. 하지만 이 서체가 한국 타이포그래피의 새로운 장을 열었다는 점에서는 이견이 없었다.`,
      `안상수 교수는 홍익대학교 시각디자인과에서 수십 년간 후학을 양성하며 한국 그래픽 디자인의 지평을 넓혔다. 그는 서체 디자인에 그치지 않고, 공간 디자인, 출판, 전시 등 다양한 분야에서 활동했다. 파주타이포그라피학교, 이른바 파티를 설립하여 실험적 타이포그래피 교육의 장을 만들기도 했다.`,
      `안상수체가 처음 발표된 지 사십 년 가까이 지난 지금도 이 서체는 현역으로 활약하고 있다. 포스터, 책, 간판, 디지털 화면 등 다양한 매체에서 안상수체를 만날 수 있다. 시간이 지나도 퇴색하지 않는 이유는 이 서체의 조형 원리가 유행에 흔들리지 않는 기하학적 논리에 뿌리를 두고 있기 때문이다.`,
    ],
  },
  {
    id: 'module',
    num: '05',
    name: '모듈과 조합',
    desc: '자소 · 결합 원리 · 19+21+27',
    texts: [
      `한글은 자음 19개, 모음 21개, 받침 27개를 조합하여 만들 수 있는 음절의 수가 11,172개에 달한다. 안상수체는 이 방대한 조합을 최소한의 모듈로 운용한다. 초성, 중성, 종성에 같은 자소를 그대로 사용하기 때문에 디자이너가 만들어야 할 글리프 수가 대폭 줄어든다.`,
      `안상수체의 조합 방식은 레고 블록에 비유할 수 있다. 정해진 형태의 블록을 정해진 규칙으로 조합하면 무한한 결과물이 나온다. 자소라는 블록, 그리고 초성-중성-종성이라는 조합 규칙. 이 단순한 구조가 한글 전체를 아우른다. 안상수체는 이 구조를 가장 명료하게 시각화한 서체이다.`,
      `안상수체에서 자소는 어떤 글자에 쓰이든 동일한 형태를 유지하기 때문에, 글자 전체가 아닌 자소를 중심으로 서체를 경험하게 된다. 기역 하나, 이응 하나가 글자 안에서 자신의 존재감을 드러낸다. 이것이 안상수체가 독자에게 주는 독특한 시각적 경험이며, 한글의 조합 논리를 눈으로 느끼게 하는 방식이다.`,
    ],
  },
];

/* ── 세벌식 390 자판 레이아웃 ── */
const SEBEOL_LAYOUT = [
  [
    {code:'Backquote',key:'`',norm:'₩',shft:'~'},
    {code:'Digit1',key:'1',norm:'ㅎ',shft:'!'},
    {code:'Digit2',key:'2',norm:'ㅆ',shft:'@'},
    {code:'Digit3',key:'3',norm:'ㅂ',shft:'#'},
    {code:'Digit4',key:'4',norm:'ㅛ',shft:'$'},
    {code:'Digit5',key:'5',norm:'ㅠ',shft:'%'},
    {code:'Digit6',key:'6',norm:'ㅑ',shft:'^'},
    {code:'Digit7',key:'7',norm:'ㅖ',shft:'&'},
    {code:'Digit8',key:'8',norm:'ㅢ',shft:'*'},
    {code:'Digit9',key:'9',norm:'ㅜ',shft:'('},
    {code:'Digit0',key:'0',norm:'ㅋ',shft:')'},
    {code:'Minus',key:'-',norm:'-',shft:'_'},
    {code:'Equal',key:'=',norm:'=',shft:'+'},
    {code:'Backspace',key:'⌫',wide:'bs',norm:'',shft:''},
  ],
  [
    {code:'Tab',key:'Tab',wide:'tab',norm:'',shft:''},
    {code:'KeyQ',key:'Q',norm:'ㅅ',shft:''},
    {code:'KeyW',key:'W',norm:'ㄹ',shft:''},
    {code:'KeyE',key:'E',norm:'ㅕ',shft:''},
    {code:'KeyR',key:'R',norm:'ㅐ',shft:''},
    {code:'KeyT',key:'T',norm:'ㅓ',shft:''},
    {code:'KeyY',key:'Y',norm:'ㄹ',shft:''},
    {code:'KeyU',key:'U',norm:'ㄷ',shft:''},
    {code:'KeyI',key:'I',norm:'ㅁ',shft:''},
    {code:'KeyO',key:'O',norm:'ㅊ',shft:''},
    {code:'KeyP',key:'P',norm:'ㅍ',shft:''},
    {code:'BracketLeft',key:'[',norm:'[',shft:'{'},
    {code:'BracketRight',key:']',norm:']',shft:'}'},
    {code:'Backslash',key:'\\',wide:'bs2',norm:'\\',shft:'|'},
  ],
  [
    {code:'CapsLock',key:'Caps',wide:'caps',norm:'',shft:''},
    {code:'KeyA',key:'A',norm:'ㅇ',shft:''},
    {code:'KeyS',key:'S',norm:'ㄴ',shft:''},
    {code:'KeyD',key:'D',norm:'ㅣ',shft:''},
    {code:'KeyF',key:'F',norm:'ㅏ',shft:''},
    {code:'KeyG',key:'G',norm:'ㅡ',shft:''},
    {code:'KeyH',key:'H',norm:'ㄴ',shft:''},
    {code:'KeyJ',key:'J',norm:'ㅇ',shft:''},
    {code:'KeyK',key:'K',norm:'ㄱ',shft:''},
    {code:'KeyL',key:'L',norm:'ㅈ',shft:''},
    {code:'Semicolon',key:';',norm:'ㅂ',shft:':'},
    {code:'Quote',key:"'",norm:'ㅌ',shft:'"'},
    {code:'Enter',key:'↵',wide:'enter',norm:'',shft:''},
  ],
  [
    {code:'ShiftLeft',key:'⇧',wide:'sl',norm:'',shft:''},
    {code:'KeyZ',key:'Z',norm:'ㅁ',shft:''},
    {code:'KeyX',key:'X',norm:'ㄱ',shft:''},
    {code:'KeyC',key:'C',norm:'ㅔ',shft:''},
    {code:'KeyV',key:'V',norm:'ㅗ',shft:''},
    {code:'KeyB',key:'B',norm:'ㅜ',shft:''},
    {code:'KeyN',key:'N',norm:'ㅅ',shft:''},
    {code:'KeyM',key:'M',norm:'ㅎ',shft:''},
    {code:'Comma',key:',',norm:',',shft:'<'},
    {code:'Period',key:'.',norm:'.',shft:'>'},
    {code:'Slash',key:'/',norm:'ㅗ',shft:'?'},
    {code:'ShiftRight',key:'⇧',wide:'sr',norm:'',shft:''},
  ],
  [
    {code:'ControlLeft',key:'Ctrl',wide:'ctrl',norm:'',shft:''},
    {code:'MetaLeft',key:'⌘',wide:'meta',norm:'',shft:''},
    {code:'AltLeft',key:'Alt',wide:'alt',norm:'',shft:''},
    {code:'Space',key:'',wide:'space',norm:'',shft:''},
    {code:'AltRight',key:'Alt',wide:'alt',norm:'',shft:''},
    {code:'MetaRight',key:'⌘',wide:'meta',norm:'',shft:''},
    {code:'ControlRight',key:'Ctrl',wide:'ctrl',norm:'',shft:''},
  ],
];

function renderSebeolKeyboard() {
  const VOWELS = new Set('ㅏㅐㅑㅒㅓㅔㅕㅖㅗㅘㅙㅚㅛㅜㅝㅞㅟㅠㅡㅢㅣ'.split(''));
  const CONS   = new Set('ㄱㄲㄳㄴㄵㄶㄷㄸㄹㄺㄻㄼㄽㄾㄿㅀㅁㅂㅃㅄㅅㅆㅇㅈㅉㅊㅋㅌㅍㅎ'.split(''));
  const rows = SEBEOL_LAYOUT.map(row => {
    const keys = row.map(k => {
      const wc = k.wide ? ` kb-key--${k.wide}` : '';
      const tc = VOWELS.has(k.norm) ? ' kb-key--vowel' : CONS.has(k.norm) ? ' kb-key--cons' : '';
      let inner = '';
      if (k.norm && /[ㄱ-ㅎㅏ-ㅣ]/.test(k.norm)) {
        const ss = (k.shft && /[ㄱ-ㅎㅏ-ㅣ]/.test(k.shft)) ? `<span class="kb-s">${k.shft}</span>` : '';
        inner = `${ss}<span class="kb-n">${k.norm}</span>`;
      } else if (k.norm) {
        const ss = k.shft ? `<span class="kb-s">${k.shft}</span>` : '';
        inner = `${ss}<span class="kb-n kb-n--en">${k.norm}</span>`;
      } else {
        inner = `<span class="kb-label">${k.key}</span>`;
      }
      return `<div class="kb-key${wc}${tc}" data-code="${k.code}">${inner}</div>`;
    }).join('');
    return `<div class="kb-row">${keys}</div>`;
  }).join('');
  return `<div class="kb-board" id="kb-board">${rows}</div>`;
}

/* ── 상태 ── */
let typing = { text: '', startTime: null, timer: null, errorCount: 0 };
let _activeKbDown = null;
let _activeKbUp   = null;

/* ── DOM ── */
const descContent    = document.getElementById('desc-content');
const practiceOverlay = document.getElementById('practice-overlay');
const practiceBack   = document.getElementById('practice-back');
const practiceTitle  = document.getElementById('practice-title');
const practiceBody   = document.getElementById('practice-body');
const statusMsg      = document.getElementById('status-msg');

/* 현재 페이지 상태 */
let currentPageId  = 'home';

/* ── 그룹 정의 ── */
const GROUPS = {
  history: {
    label: '역사·배경',
    range: '01 – 03',
    preview: 'AG',
    desc: '1985년 안상수 디자이너가 개발한 탈네모틀 한글 서체의 탄생 배경과 한글기계화운동의 흐름, 네모틀을 보타대하는 새로운 조형 언어를 탐구합니다.',
    items: [
      { id: 'birth',         num: '01', name: '안상수체의 탄생' },
      { id: 'mechanization', num: '02', name: '한글기계화운동' },
      { id: 'talnemo',       num: '03', name: '탈 네모틀' },
    ]
  },
  structure: {
    label: '구조·원리',
    range: '04 – 06',
    preview: '꼴',
    desc: '첫닿자·홀자·받침의 모듈식 조합 원리, 모임꼴의 다양한 유형과 조형체의 종류를 통해 안상수체의 독자적 구조를 해부합니다.',
    items: [
      { id: 'process',  num: '04', name: '개발 과정' },
      { id: 'moim',     num: '05', name: '모임꼴' },
      { id: 'types',    num: '06', name: '조형체 종류' },
      { id: 'compare',  num: '≡',  name: '서체 비교' },
      { id: 'preview',  num: '✎',  name: '직접 써보기' },
      { id: 'workshop', num: '★',  name: '모듈 조립 체험' },
    ]
  },
  digital: {
    label: '디지털·현재',
    range: '07 – 08',
    preview: '字',
    desc: 'PC 시대로의 전환 과정과 널리 쓰이는 AG 안상수체의 디지털 구현과 현재적 의미를 살펴봅니다.',
    items: [
      { id: 'digital', num: '07', name: '디지털화' },
      { id: 'ag',      num: '08', name: 'AG 안상수체' },
    ]
  },
  typing: {
    label: '세벌식 타자연습',
    range: '▶',
    preview: '타',
    desc: '세벌식 390 자판으로 안상수체 문장을 직접 입력하며 타자 실력을 키웁니다. 화면 아래 자판을 보며 키 위치를 익힐 수 있습니다.',
    items: [
      { id: 'sentence', num: '▶', name: '문장 연습' },
      { id: 'longtext', num: '▶', name: '긴 글 연습' },
    ]
  },
  workshop: {
    label: '모듈 조립 체험',
    range: '★',
    preview: '조',
    desc: '첫닿자·홀자·받침을 직접 드래그하여 글자를 조합하는 인터랙티브 체험입니다. 안상수체의 조합형 원리를 직접 머리가 아닌 손으로 이해합니다.',
  },
  preview: {
    label: '직접 써보기',
    range: '✎',
    preview: '가',
    desc: '원하는 한글을 직접 입력하고 안상수체로 실시간 렌더링해보세요. 크기 슬라이더로 글자를 크고 작게 조절할 수 있습니다.',
  },
  compare: {
    label: '서체 비교',
    range: '≡',
    preview: '비',
    desc: '안상수체(탈네모틀)와 나눔고딕·나눔명조(네모틀)를 나란히 놓고 같은 텍스트로 비교해봅니다.',
  },
};


/* ── 카테고리 렌더 ── */
function renderPage(id) {
  const page = PAGES[id];
  if (!page) return;
  currentPageId = id;

  const descPanel    = document.querySelector('.description-panel');

  if (id === 'home') {
    descPanel?.classList.add('panel--home');
  } else {
    descPanel?.classList.remove('panel--home');
  }

  const backBtn = id !== 'home'
    ? `<button class="desc-back-btn" id="desc-back-btn">← 메인 홈</button>`
    : '';

  descContent.innerHTML = backBtn + page.render();
  statusMsg.textContent = id === 'home' ? '메인 홈' : `${page.title} — 선택됨`;
  bindActions(id);

  document.getElementById('desc-back-btn')?.addEventListener('click', () => {
    document.querySelectorAll('.category-item').forEach(el => el.removeAttribute('data-active'));
    descContent?.classList?.remove('workshop-mode');
    renderPage('home');
  });
}

function bindActions(id) {
  /* 그룹·콘텐츠 백: data-nav 클릭 → 콘텐츠 */
  descContent.querySelectorAll('[data-nav]').forEach(el => {
    el?.addEventListener('click', () => selectCategory(el.dataset.nav));
  });

  /* 홈 호버/클릭 프리뷰 로직 */
  if (id === 'home') {
    const preview = document.getElementById('hm-preview');
    let locked = false;

    function showPreview(groupId) {
      if (locked) return;
      const g = GROUPS[groupId];
      if (!g || !preview) return;
      preview.innerHTML = `
        <div class="hm-preview-visual">${g.preview || ''}</div>
        <div class="hm-preview-label">
          <span class="hm-preview-range">${g.range || ''}</span>
          <span class="hm-preview-title">${g.label}</span>
        </div>
        <p class="hm-preview-desc">${g.desc || ''}</p>
      `;
    }

    function showSubcategories(groupId) {
      const g = GROUPS[groupId];
      if (!g || !preview) return;
      locked = true;

      const itemsHtml = g.items ? g.items.map(item => {
        let subMenu = '';
        if (item.id === 'longtext') {
           subMenu = `<div class="hm-sub-items" id="sub-${item.id}" style="display:none; padding-left: 42px; margin-top: -8px; padding-bottom: 12px;">` +
             LONGTEXT_CATS.map(c => `
               <button class="hm-sub-btn" data-start-lt="${c.id}">↳ ${c.name}</button>
             `).join('') + `</div>`;
        } else if (item.id === 'sentence') {
           subMenu = `<div class="hm-sub-items" id="sub-${item.id}" style="display:none; padding-left: 42px; margin-top: -8px; padding-bottom: 12px;">
               <button class="hm-sub-btn" data-start-st="all">↳ 전체 문장 종합 연습</button>
             </div>`;
        }

        return `
          <div>
            <button class="hm-item${item.star ? ' hm-item--star' : ''}" data-nav="${item.id}">
              <span class="hm-num">${item.num}</span>
              <span class="hm-name">${item.name}</span>
              <span class="hm-arr">${item.star ? '★' : '→'}</span>
            </button>
            ${subMenu}
          </div>
        `;
      }).join('') : '';

      preview.innerHTML = `
        <div class="hm-preview-visual" style="opacity:0.2;">${g.preview || ''}</div>
        <div class="hm-preview-label">
          <span class="hm-preview-range">${g.range || ''}</span>
          <span class="hm-preview-title">${g.label}</span>
        </div>
        <div class="hm-group" style="position:relative; z-index:1;">
          ${itemsHtml}
        </div>
      `;

      // 내부 카테고리 클릭 이벤트 연결
      preview.querySelectorAll('[data-nav]').forEach(el => {
        el?.addEventListener('click', () => {
          const navId = el.dataset.nav;
          if (navId === 'longtext' || navId === 'sentence') {
            const sub = document.getElementById(`sub-${navId}`);
            if (sub) {
              sub.style.display = sub.style.display === 'none' ? 'block' : 'none';
            }
          } else {
            selectCategory(navId);
          }
        });
      });

      // 타이자 연습 세부 항목 드롭다운 실행 버튼 연결
      preview.querySelectorAll('[data-start-lt]').forEach(btn => {
        btn?.addEventListener('click', (ev) => {
          ev.stopPropagation();
          const cat = LONGTEXT_CATS.find(c => c.id === btn.dataset.startLt);
          if (!cat) return;
          TYPING.longtext = cat.texts;
          openTyping('longtext', cat.name);
        });
      });
      preview.querySelectorAll('[data-start-st]').forEach(btn => {
        btn?.addEventListener('click', (ev) => {
          ev.stopPropagation();
          openTyping('sentence');
        });
      });
    }

    // 그룹 버튼 호버 및 클릭 이벤트
    descContent.querySelectorAll('.hm-group-btn').forEach(btn => {
      btn?.addEventListener('mouseenter', () => {
        locked = false; // 다른 항목을 호버하면 서브메뉴(클릭) 상태 해제
        descContent.querySelectorAll('.hm-group-btn').forEach(b => b?.classList?.remove('is-hovered'));
        btn?.classList?.add('is-hovered');
        showPreview(btn.dataset.group || 'workshop');
      });

      btn?.addEventListener('click', () => {
        if (btn.dataset.nav) {
          // 직행 링크 (예: 모듈 조립)
          selectCategory(btn.dataset.nav);
        } else {
          // 서브 메뉴 표시
          showSubcategories(btn.dataset.group);
        }
      });
    });

    // 기본: 첫 번째 항목 표시
    const first = descContent.querySelector('.hm-group-btn');
    if (first) {
      first?.classList?.add('is-hovered');
      showPreview(first.dataset.group || 'workshop');
    }
  }

  /* start-btn data-action */
  descContent.querySelectorAll('[data-action]').forEach(el => {
    el?.addEventListener('click', () => {
      const a = el.dataset.action;
      if (a === 'open-sentence') openTyping('sentence');
      else if (a === 'open-longtext') openTyping('longtext');
    });
  });

  /* 긴글연습 카테고리 선택 */
  descContent.querySelectorAll('[data-lt-cat]').forEach(el => {
    el?.addEventListener('click', () => {
      const cat = LONGTEXT_CATS.find(c => c.id === el.dataset.ltCat);
      if (!cat) return;
      TYPING.longtext = cat.texts;
      openTyping('longtext', cat.name);
    });
  });


  /* 모듈 조립 체험 */
  if (id === 'workshop') {
    initWorkshop();
  }

  /* 직접 써보기 */
  if (id === 'preview') {
    const textInput   = document.getElementById('preview-text');
    const sizeInput   = document.getElementById('preview-size');
    const letterInput = document.getElementById('preview-letter');
    const lineInput   = document.getElementById('preview-line');
    const sizeVal     = document.getElementById('preview-size-val');
    const letterVal   = document.getElementById('preview-letter-val');
    const lineVal     = document.getElementById('preview-line-val');
    const display     = document.getElementById('preview-display');
    function updatePreview() {
      display.textContent          = textInput.value || '안상수체';
      display.style.fontSize       = sizeInput.value + 'px';
      display.style.letterSpacing  = letterInput.value + 'px';
      display.style.lineHeight     = (lineInput.value / 10).toFixed(1);
      sizeVal.textContent          = sizeInput.value + 'px';
      letterVal.textContent        = letterInput.value + 'px';
      lineVal.textContent          = (lineInput.value / 10).toFixed(1);
    }
    textInput?.addEventListener('input', updatePreview);
    sizeInput?.addEventListener('input', updatePreview);
    letterInput?.addEventListener('input', updatePreview);
    lineInput?.addEventListener('input', updatePreview);
  }

  /* 서체 비교 */
  if (id === 'compare') {
    const textInput = document.getElementById('compare-text');
    function updateCompare() {
      const val = textInput.value || '한글';
      document.getElementById('cmp-ahn').textContent    = val;
      document.getElementById('cmp-gothic').textContent = val;
      document.getElementById('cmp-myeong').textContent = val;
    }
    textInput?.addEventListener('input', updateCompare);
  }
}

function selectCategory(id) {
  document.querySelectorAll('.category-item').forEach(el => {
    el.setAttribute('data-active', el.dataset.id === id ? 'true' : 'false');
  });
  /* 워크숍 모드: desc-content 패딩 제거 */
  const isWS = (id === 'workshop');
  descContent?.classList?.toggle('workshop-mode', isWS);
  renderPage(id);
}

document.querySelectorAll('.category-item').forEach(el => {
  el?.addEventListener('click', () => selectCategory(el.dataset.id));
});

/* ── 타이핑 연습 ── */
function openTyping(mode, catTitle) {
  // 기존 키보드 핸들러 정리
  if (_activeKbDown) { document.removeEventListener('keydown', _activeKbDown); _activeKbDown = null; }
  if (_activeKbUp)   { document.removeEventListener('keyup',   _activeKbUp);   _activeKbUp   = null; }

  const texts = shuffle([...TYPING[mode]]);
  let idx = 0;
  typing = { text: texts[idx], startTime: null, timer: null, errorCount: 0 };

  const titles = { sentence: '세벌식 타자연습 · 문장', longtext: '세벌식 타자연습 · 긴글' };
  practiceTitle.textContent = catTitle ? `세벌식 타자연습 · ${catTitle}` : titles[mode];
  practiceBody.innerHTML = typingUI();
  practiceOverlay?.classList?.add('show');

  // 키보드 시각 피드백
  const kbBoard = document.getElementById('kb-board');
  _activeKbDown = (e) => { kbBoard?.querySelector(`[data-code="${e.code}"]`)?.classList.add('kb-pressed'); };
  _activeKbUp   = (e) => { kbBoard?.querySelector(`[data-code="${e.code}"]`)?.classList.remove('kb-pressed'); };
  document.addEventListener('keydown', _activeKbDown);
  document.addEventListener('keyup',   _activeKbUp);

  const display = document.getElementById('tp-display');
  const input   = document.getElementById('tp-input');
  const btnStart = document.getElementById('tp-start');
  const btnNext  = document.getElementById('tp-next');
  const btnReset = document.getElementById('tp-reset');

  renderTyping('');
  input.disabled = true;

  btnStart?.addEventListener('click', () => {
    typing.startTime = null;
    typing.errorCount = 0;
    resetStats();
    input.disabled = false;
    input.value = '';
    input.focus();
    renderTyping('');
  });

  btnNext?.addEventListener('click', () => {
    idx = (idx + 1) % texts.length;
    typing.text = texts[idx];
    typing.startTime = null;
    typing.errorCount = 0;
    clearInterval(typing.timer);
    input.value = '';
    if (!input.disabled) input.focus();
    resetStats();
    renderTyping('');
    // 결과창 제거
    practiceBody.querySelector('.result-box')?.remove();
  });

  btnReset?.addEventListener('click', () => {
    typing.startTime = null;
    clearInterval(typing.timer);
    input.disabled = true;
    input.value = '';
    resetStats();
    renderTyping('');
    practiceBody.querySelector('.result-box')?.remove();
  });

  input?.addEventListener('input', () => {
    const val = input.value;
    if (val.length === 1 && !typing.startTime) {
      typing.startTime = Date.now();
      startTimer();
    }
    renderTyping(val);
    updateStats(val);
    if (val.length >= typing.text.length) {
      setTimeout(() => showResult(val), 200);
    }
  });

  function renderTyping(val) {
    const t = typing.text;
    let h = '';
    for (let i = 0; i < t.length; i++) {
      const ch = esc(t[i]);
      if (i < val.length) {
        h += `<span class="${val[i]===t[i]?'char-correct':'char-incorrect'}">${ch}</span>`;
      } else if (i === val.length) {
        h += `<span class="char-current">${ch}</span>`;
      } else {
        h += `<span class="char-wait">${ch}</span>`;
      }
    }
    display.innerHTML = h;
  }

  function updateStats(val) {
    const elapsed = typing.startTime ? (Date.now()-typing.startTime)/60000 : 0;
    const correct = cntCorrect(val);
    const cpm = elapsed > 0 ? Math.round(correct/elapsed) : 0;
    const acc = val.length > 0 ? Math.round(correct/val.length*100) : 100;
    let errs = 0;
    for (let i=0;i<val.length;i++) if(val[i]!==typing.text[i]) errs++;
    typing.errorCount = errs;
    setT('tp-cpm', cpm.toLocaleString());
    setT('tp-acc', acc+'%');
    setT('tp-err', errs);
  }

  function startTimer() {
    clearInterval(typing.timer);
    typing.timer = setInterval(() => {
      if (!typing.startTime) return;
      const sec = Math.floor((Date.now()-typing.startTime)/1000);
      const m=Math.floor(sec/60), s=sec%60;
      setT('tp-time', `${m}:${String(s).padStart(2,'0')}`);
    }, 500);
  }

  function showResult(val) {
    clearInterval(typing.timer);
    input.disabled = true;
    const elapsed = typing.startTime?(Date.now()-typing.startTime)/1000:0;
    const correct = cntCorrect(val);
    const cpm = elapsed>0?Math.round(correct/elapsed*60):0;
    const acc = val.length>0?Math.round(correct/val.length*100):100;
    const sec=Math.floor(elapsed), m=Math.floor(sec/60), s=sec%60;
    (document.getElementById('tp-content') || practiceBody).insertAdjacentHTML('beforeend',`
      <div class="result-box">
        <div class="result-box-title">✓ 완료!</div>
        <div class="result-box-stats">
          타수 <strong>${cpm.toLocaleString()} 타/분</strong> &nbsp;·&nbsp;
          정확도 <strong>${acc}%</strong> &nbsp;·&nbsp;
          시간 <strong>${m}:${String(s).padStart(2,'0')}</strong> &nbsp;·&nbsp;
          오타 <strong>${typing.errorCount}회</strong>
        </div>
        <button class="start-btn" id="tp-result-next" style="margin-top:12px;">다음 문장 ▷</button>
      </div>
    `);
    document.getElementById('tp-result-next')?.addEventListener('click', () => {
      practiceBody.querySelector('.result-box')?.remove();
      idx = (idx+1)%texts.length;
      typing.text = texts[idx];
      typing.startTime = null;
      typing.errorCount = 0;
      clearInterval(typing.timer);
      input.disabled = false;
      input.value = '';
      input.focus();
      resetStats();
      renderTyping('');
    });
  }

  function resetStats() {
    setT('tp-cpm','0'); setT('tp-acc','100%');
    setT('tp-time','0:00'); setT('tp-err','0');
  }
  function cntCorrect(val) {
    let c=0;
    for(let i=0;i<val.length&&i<typing.text.length;i++) if(val[i]===typing.text[i]) c++;
    return c;
  }
}

function typingUI() {
  return `
    <div class="tp-content" id="tp-content">
      <div class="typing-display" id="tp-display"></div>
      <textarea class="typing-input-field" id="tp-input" placeholder="여기에 타이핑하세요..." spellcheck="false" autocomplete="off" autocorrect="off"></textarea>
      <div class="typing-stats">
        <div class="t-stat"><div class="t-stat-label">타 수</div><div class="t-stat-value" id="tp-cpm">0</div></div>
        <div class="t-stat"><div class="t-stat-label">정확도</div><div class="t-stat-value" id="tp-acc">100%</div></div>
        <div class="t-stat"><div class="t-stat-label">경과시간</div><div class="t-stat-value" id="tp-time">0:00</div></div>
        <div class="t-stat"><div class="t-stat-label">오타수</div><div class="t-stat-value" id="tp-err">0</div></div>
      </div>
      <div class="typing-btn-row">
        <button class="start-btn" id="tp-start" style="flex:1;">▶ 시작</button>
        <button class="start-btn ghost" id="tp-next" style="flex:1;">다음 ▷</button>
        <button class="start-btn ghost" id="tp-reset" style="flex:1;">↺ 초기화</button>
      </div>
    </div>
    <div class="kb-wrap">
      <div class="kb-legend-bar">
        <span class="kb-legend-text">세벌식 390 자판</span>
        <span class="kb-legend-hint">자음 ← · → 모음 &nbsp;|&nbsp; 쌍자음: Shift + 자음키</span>
      </div>
      ${renderSebeolKeyboard()}
    </div>
  `;
}

/* ── 닫기 ── */
practiceBack?.addEventListener('click', () => {
  clearInterval(typing.timer);
  if (_activeKbDown) { document.removeEventListener('keydown', _activeKbDown); _activeKbDown = null; }
  if (_activeKbUp)   { document.removeEventListener('keyup',   _activeKbUp);   _activeKbUp   = null; }
  practiceOverlay?.classList?.remove('show');
});

/* ── 유틸 ── */
function setT(id, v) { const e=document.getElementById(id); if(e) e.textContent=v; }
function esc(s) { return s===' '?'&nbsp;':s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;'); }
function shuffle(arr) {
  for(let i=arr.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[arr[i],arr[j]]=[arr[j],arr[i]];}
  return arr;
}

/* ═══════════════════════════════════════════════
   모듈 조립 체험 — 드래그 앤 드롭 엔진
   ═══════════════════════════════════════════════ */
function initWorkshop() {
  const canvas   = document.getElementById('ws-canvas');
  const hint     = document.getElementById('ws-hint');
  const clearBtn = document.getElementById('ws-clear');
  if (!canvas) return;

  /* 고스트 엘리먼트 (커서 따라다니는 복사본) */
  let ghost = null;
  /* 드래그 중인 정보 */
  let drag = null;
  /* 모듈 카운터 */
  let modCount = 0;

  /* ── 고스트 생성 ── */
  function createGhost(jamo, role) {
    const g = document.createElement('div');
    g.className = 'ws-ghost';
    g.innerHTML = `
      <span class="ws-ghost-char">${jamo}</span>
      <span class="ws-ghost-role">${role}</span>
    `;
    document.body.appendChild(g);
    return g;
  }

  /* ── 고스트 이동 ── */
  function moveGhost(x, y) {
    if (!ghost) return;
    ghost.style.left = (x - 36) + 'px';
    ghost.style.top  = (y - 36) + 'px';
  }

  /* ── 고스트 제거 ── */
  function removeGhost() {
    if (ghost) { ghost.remove(); ghost = null; }
  }

  /* ── 캔버스 힌트 토글 ── */
  function updateHint() {
    const hasModules = canvas.querySelector('.ws-module');
    hint?.classList.toggle('hidden', !!hasModules);
  }

  /* ── 캔버스에 모듈 생성 ── */
  function spawnModule(jamo, role, x, y) {
    const id = 'wm-' + (++modCount);
    const el = document.createElement('div');
    el.className = 'ws-module';
    el.dataset.role = role;
    el.id = id;
    el.style.left = Math.max(0, x - 36) + 'px';
    el.style.top  = Math.max(0, y - 36) + 'px';

    el.innerHTML = `
      <span class="ws-module-char">${jamo}</span>
      <span class="ws-module-role">${role}</span>
      <span class="ws-module-del" title="삭제">×</span>
    `;

    /* 삭제 버튼 */
    el.querySelector('.ws-module-del')?.addEventListener('pointerdown', (e) => {
      e.stopPropagation();
      el.remove();
      updateHint();
    });

    /* 모듈 자체 드래그 */
    el?.addEventListener('pointerdown', (e) => {
      if (e.target.classList.contains('ws-module-del')) return;
      e.preventDefault();
      e.stopPropagation();

      const rect = canvas.getBoundingClientRect();
      const startX = e.clientX - rect.left - parseInt(el.style.left);
      const startY = e.clientY - rect.top  - parseInt(el.style.top);

      el?.classList?.add('dragging-active');
      el.setPointerCapture(e.pointerId);

      drag = { type: 'canvas', el, startX, startY };
    });

    canvas.appendChild(el);
    updateHint();
    return el;
  }

  /* ── 팔레트 타일 → 드래그 시작 ── */
  document.querySelectorAll('#ws-palette .ws-tile').forEach(tile => {
    tile?.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      const jamo = tile.dataset.jamo;
      const role = tile.dataset.role;
      ghost = createGhost(jamo, role);
      moveGhost(e.clientX, e.clientY);
      drag = { type: 'palette', jamo, role };
      document.setPointerCapture?.(e.pointerId);
    });
  });

  /* ── pointermove ── */
  document.addEventListener('pointermove', (e) => {
    if (!drag) return;
    if (drag.type === 'palette') {
      moveGhost(e.clientX, e.clientY);
    } else if (drag.type === 'canvas') {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left - drag.startX;
      const ny = e.clientY - rect.top  - drag.startY;
      const maxX = rect.width  - 72;
      const maxY = rect.height - 72;
      drag.el.style.left = Math.min(Math.max(0, nx), maxX) + 'px';
      drag.el.style.top  = Math.min(Math.max(0, ny), maxY) + 'px';
    }
  });

  /* ── pointerup ── */
  document.addEventListener('pointerup', (e) => {
    if (!drag) return;

    if (drag.type === 'palette') {
      /* 캔버스 위에 드롭됐는지 확인 */
      const rect = canvas.getBoundingClientRect();
      const inCanvas =
        e.clientX >= rect.left && e.clientX <= rect.right &&
        e.clientY >= rect.top  && e.clientY <= rect.bottom;

      if (inCanvas) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        spawnModule(drag.jamo, drag.role, x, y);
      }
      removeGhost();
    } else if (drag.type === 'canvas') {
      drag.el?.classList?.remove('dragging-active');
    }

    drag = null;
  });

  /* ── 캔버스 초기화 ── */
  clearBtn?.addEventListener('click', () => {
    canvas.querySelectorAll('.ws-module').forEach(m => m.remove());
    updateHint();
  });
}

/* 스플래시 → 앱 전환은 index.html 인라인 스크립트에서 처리 */

/* ── 햄버거 버튼: hover로 사이드바 열고 닫기 ── */
(function() {
  const btn = document.getElementById('sidebar-toggle');
  const nav = document.querySelector('.category-nav');
  if (!btn || !nav) return;

  let timer = null;

  function openNav() {
    clearTimeout(timer);
    nav?.classList?.remove('collapsed');
  }

  function scheduleClose() {
    // 카테고리 페이지에서는 자동 닫히지 않음
    if (currentPageId !== 'home') return;
    timer = setTimeout(() => nav?.classList?.add('collapsed'), 200);
  }

  btn?.addEventListener('mouseenter', openNav);
  btn?.addEventListener('mouseleave', scheduleClose);
  nav?.addEventListener('mouseenter', openNav);
  nav?.addEventListener('mouseleave', scheduleClose);
})();

/* ── 메인 헤더 클릭 → 홈으로 ── */
document.getElementById('main-header')?.addEventListener('click', () => {
  document.querySelectorAll('.category-item').forEach(el => el.removeAttribute('data-active'));
  descContent?.classList?.remove('workshop-mode');
  renderPage('home');
  statusMsg.textContent = '메인 홈';
});




    
    // ---- All Original Inline Scripts ----
    
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
    if (hpAg) hpAg?.addEventListener('click', function () {
      var agRect = hpAg ? hpAg.getBoundingClientRect() : {left:0,top:0,height:1};

      detailAg.style.transition = 'none';
      detailAg.style.opacity = '0';
      detailAg.style.pointerEvents = 'none';
      detailAg?.classList?.add('dp-in');
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
    document.getElementById('dp-ag-back')?.addEventListener('click', function () {
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
        detailAg?.classList?.remove('dp-in');
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
    if (hpSu) hpSu?.addEventListener('click', function () {
      var hpRect = hpSu.getBoundingClientRect();

      // 설정: detail-su invisible + dp-in
      detailSu.style.transition = 'none';
      detailSu.style.opacity = '0';
      detailSu.style.pointerEvents = 'none';
      detailSu?.classList?.add('dp-in');
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
    if (document.getElementById('dp-su-back')) document.getElementById('dp-su-back')?.addEventListener('click', function () {
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
        detailSu?.classList?.remove('dp-in');
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
    suChar?.addEventListener('click', function () {
      document.getElementById('su-stage').classList.toggle('su-stage--open');
    });

    /* ================================================================
       홈 타이틀 클릭 → 메인 세부 페이지 전환
    ================================================================ */
    document.getElementById('hp-title')?.addEventListener('click', function () {
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
      detailMain?.classList?.add('dp-in');
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
    document.getElementById('dm-progress-svg')?.addEventListener('click', function () {
      var scroll = document.querySelector('.dm-scroll');
      if (scroll) scroll.scrollTo({ top: 0, behavior: 'smooth' });
    });

    /* 메인 세부 → 홈 전환 */
    document.getElementById('dm-home-btn')?.addEventListener('click', function () {
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
        detailMain?.classList?.remove('dp-in');
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
      dmScroll?.addEventListener('click', function (e) {
        if (e.target.closest('button, a, .dm-u, .dm-hero, .dm-ap-grid, .ap-sticker')) return;
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

      agWord?.addEventListener('click', function (e) {
        e.stopPropagation();
        var wr = agWord.getBoundingClientRect();
        savedCx = wr.left + wr.width  / 2;
        savedCy = wr.top  + wr.height / 2;

        agCircles?.classList?.add('ag-circles-lit');
        agCircles.style.position = 'fixed';
        agCircles.style.left     = savedCx + 'px';
        agCircles.style.top      = savedCy + 'px';
        agCircles.style.zIndex   = '55';

        agOverlay?.classList?.add('is-open');
        requestAnimationFrame(drawLines);
      });

      agOverlay?.addEventListener('click', function (e) {
        if (!e.target.closest('.ag-caption-panel')) {
          agOverlay?.classList?.remove('is-open');
          agCircles?.classList?.remove('ag-circles-lit');
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
    document.getElementById('hp-project')?.addEventListener('click', function () {
      openDetailMain('sec-aproject');
    });

    document.getElementById('hp-sijakagi')?.addEventListener('click', function () {
      openDetailMain('sec-birth');
    });

    // document.querySelector('.hp-kerning')?.addEventListener('click', function () {
    //   openDetailMain('sec-charform');
    // });

    document.querySelector('.hp-hunmin')?.addEventListener('click', function () {
      openDetailMain('sec-hunmin');
    });

    /* ================================================================
       안체프로젝트 → 홈 전환
    ================================================================ */
    document.getElementById('dp-anche-back')?.addEventListener('click', function () {
      // 텍스트 패널 열려있으면 닫기
      apStage?.classList?.remove('ap-stage--open');

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
        detailAnche?.classList?.remove('dp-in');
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
    document.getElementById('ap-sticker-btn')?.addEventListener('click', function () {
      window.dispatchEvent(new CustomEvent('open-anche-modal'));
    });

    /* ================================================================
       이미지 그리드 클릭 → 텍스트 패널 토글
    ================================================================ */
    document.getElementById('ap-grid-wrap')?.addEventListener('click', function () {
      apStage?.classList?.toggle('ap-stage--open');
    });

    /* ================================================================
       GOGOGOGO → 안체프로젝트 페이지 3 (나만의 안체) 직행
    ================================================================ */
    var detailAnche3 = document.getElementById('detail-anche3');

    document.getElementById('ap-gogo')?.addEventListener('click', function () {
      detailAnche.style.transition    = 'opacity 0.3s ease';
      detailAnche.style.opacity       = '0';
      detailAnche.style.pointerEvents = 'none';

      detailAnche3.style.transition    = 'none';
      detailAnche3.style.opacity       = '0';
      detailAnche3.style.pointerEvents = 'none';
      detailAnche3?.classList?.add('dp-in');
      void detailAnche3.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailAnche3.style.transition    = 'opacity 0.3s ease';
          detailAnche3.style.opacity       = '1';
          detailAnche3.style.pointerEvents = 'auto';
        });
      });

      setTimeout(function () {
        detailAnche?.classList?.remove('dp-in');
        detailAnche.style.opacity       = '';
        detailAnche.style.transition    = '';
        detailAnche.style.pointerEvents = '';
        apStage?.classList?.remove('ap-stage--open');
        ap3State.text = '';
        ap3Render();
      }, 400);
    });

    /* ================================================================
       페이지 3 → 페이지 1 전환
    ================================================================ */
    document.getElementById('dp-anche3-back')?.addEventListener('click', function () {
      detailAnche3.style.transition    = 'opacity 0.3s ease';
      detailAnche3.style.opacity       = '0';
      detailAnche3.style.pointerEvents = 'none';

      detailMain.style.transition    = 'none';
      detailMain.style.opacity       = '0';
      detailMain.style.pointerEvents = 'none';
      detailMain?.classList?.add('dp-in');
      void detailMain.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailMain.style.transition    = 'opacity 0.3s ease';
          detailMain.style.opacity       = '1';
          detailMain.style.pointerEvents = 'auto';
        });
      });

      setTimeout(function () {
        detailAnche3?.classList?.remove('dp-in');
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
      btn?.addEventListener('click', function () {
        var targetId = btn.getAttribute('data-sub');
        var isAlreadyActive = btn.classList.contains('ap3-active');

        ap3CtrlBtns.forEach(function (b) { b?.classList?.remove('ap3-active'); });
        document.querySelectorAll('.ap3-sub').forEach(function (s) { s.hidden = true; });

        if (!isAlreadyActive) {
          btn?.classList?.add('ap3-active');
          var panel = document.getElementById(targetId);
          if (panel) panel.hidden = false;
        }
      });
    });

    /* ================================================================
       페이지 3 — 선종류 버튼
    ================================================================ */
    document.querySelectorAll('.ap3-line-btn').forEach(function (btn) {
      btn?.addEventListener('click', function () {
        document.querySelectorAll('.ap3-line-btn').forEach(function (b) {
          b?.classList?.remove('ap3-active');
        });
        btn?.classList?.add('ap3-active');
        var raw = btn.getAttribute('data-dash');
        ap3State.lineDash = raw ? raw.split(',').map(Number) : [];
        ap3Render();
      });
    });

    /* 선 굵기 */
    var ap3Lw = document.getElementById('ap3-lw');
    ap3Lw?.addEventListener('input', function () {
      ap3State.lineWidth = parseFloat(ap3Lw.value);
      document.getElementById('ap3-lw-val').textContent = ap3Lw.value;
      ap3Render();
    });

    /* 글자 크기 */
    var ap3Sz = document.getElementById('ap3-sz');
    ap3Sz?.addEventListener('input', function () {
      ap3State.fontSize = parseInt(ap3Sz.value, 10);
      document.getElementById('ap3-sz-val').textContent = ap3Sz.value + 'px';
      ap3Render();
    });

    /* 행간 */
    var ap3Lh = document.getElementById('ap3-lh');
    ap3Lh?.addEventListener('input', function () {
      ap3State.lineHeight = parseInt(ap3Lh.value, 10) / 100;
      document.getElementById('ap3-lh-val').textContent = (ap3State.lineHeight).toFixed(1);
      ap3Render();
    });

    /* 위치 슬라이더 헬퍼 */
    function bindPos(id, valId, obj, key) {
      var el = document.getElementById(id);
      el?.addEventListener('input', function () {
        obj[key] = parseInt(el.value, 10);
        document.getElementById(valId).textContent = el.value;
        ap3Render();
      });
    }
    /* 인라인 텍스트 입력 + 글자크기 */
    var ap3TextInput = document.getElementById('ap3-text-input');
    var ap3InlineSz  = document.getElementById('ap3-inline-sz');
    ap3TextInput?.addEventListener('input', function () {
      ap3State.text = ap3TextInput.value;
      ap3Render();
    });
    ap3InlineSz?.addEventListener('input', function () {
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
    document.getElementById('ap3-jung-vert-sy')?.addEventListener('input', function () {
      ap3State.jungVert.sy = parseInt(this.value, 10) / 100;
      document.getElementById('ap3-jung-vert-sy-val').textContent = this.value + '%';
      ap3Render();
    });
    document.getElementById('ap3-jung-horiz-sx')?.addEventListener('input', function () {
      ap3State.jungHoriz.sx = parseInt(this.value, 10) / 100;
      document.getElementById('ap3-jung-horiz-sx-val').textContent = this.value + '%';
      ap3Render();
    });

    /* 선/면 색상 */
    document.getElementById('ap3-stroke-color')?.addEventListener('input', function () {
      ap3State.strokeColor = this.value;
      ap3Render();
    });
    document.getElementById('ap3-fill-color')?.addEventListener('input', function () {
      ap3State.fillColor = this.value;
      ap3Render();
    });
    /* 면 불투명도 슬라이더 */
    document.getElementById('ap3-fill-alpha')?.addEventListener('input', function () {
      ap3State.fillAlpha = parseInt(this.value, 10);
      document.getElementById('ap3-fill-alpha-val').textContent = this.value + '%';
      ap3Render();
    });

    /* 저장 버튼 */
    document.getElementById('ap3-save')?.addEventListener('click', function () {
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
      if (!slider || !track) return;
      var total    = 2;
      var current = 0;

      function goTo(idx) {
        current = idx;
        track.style.transform = 'translateX(-' + (idx * 50) + '%)';
      }
      goTo(0);

      document.getElementById('hb-prev')?.addEventListener('click', function () {
        if (current > 0) goTo(current - 1);
      });
      document.getElementById('hb-next')?.addEventListener('click', function () {
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
      page?.classList?.add('dp-in');
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
        page?.classList?.remove('dp-in');
        page.style.opacity       = '';
        page.style.transition    = '';
        page.style.pointerEvents = '';
        home.style.opacity       = '';
        home.style.transition    = '';
      }, 400);
    }

    document.getElementById('hp-hanbun')?.addEventListener('click', function () {
      openPage(detailHanbun);
    });

    document.getElementById('hb-back-btn')?.addEventListener('click', function () {
      history.back();
    });

    /* ================================================================
       트랙패드 / 브라우저 뒤로가기 → 홈 복귀
    ================================================================ */
    /* ================================================================
       메인 세부 — 히어로 드래그 스크롤 + 클릭 섹터 이동
    ================================================================ */
    (function () {
      var heros = [document.getElementById('dm-hero'), document.querySelector('.dm-ap-grid')];
      heros.forEach(function (hero) {
        if (!hero) return;
        var isDown = false, startX, scrollLeft, moved = false;
        var TOTAL  = 4;
        
        function getItemW() {
          return (hero.children[0] ? hero.children[0].offsetWidth : 731.98) + 20;
        }

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

        /* 클릭 → 다음 섹터 (footnote 클릭이랑 충돌 방지를 위해 img를 직접 클릭했을 때만 넘어가게 수정하거나, 그냥 스크롤용 드래그만 지원해도 충분함. 기존 히어로를 위해 유지) */
        hero.addEventListener('click', function (e) {
          if (moved) { 
            moved = false; 
            e.preventDefault();
            e.stopPropagation();
            return; 
          }
          
          e.stopPropagation(); // 각주가 열리지 않도록 상위로 전파 방지
          
          var ITEM_W = getItemW();
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
            e.stopPropagation(); // 각주 전파 방지
            var ITEM_W = getItemW();
            /* 탭 → 다음 섹터 */
            var idx = Math.round(hero.scrollLeft / ITEM_W);
            hero.scrollTo({ left: ((idx + 1) % TOTAL) * ITEM_W, behavior: 'smooth' });
          }
        }, { passive: false }); // stopPropagation을 위해 passive false로 해야할 수도 있지만 일단 유지(stopPropagation은 passive상관없음)
      });
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
  

/* --- Next Script --- */


  /* ================================================================
     세벌식 타자기 연습 페이지
  ================================================================ */
  window.initTajagiSimulatorEvents = function () {
    if (window._tajagiInitialized) return;
    window._tajagiInitialized = true;
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
      '~':'~', '`':'*',
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
      'Backquote':'`','Digit1':'1','Digit2':'2','Digit3':'3','Digit4':'4','Digit5':'5',
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
      '`':'~', '1':'!', '2':'@', '3':'#', '4':'$', '5':'%', '6':'^', '7':'&', '8':'*', '9':'(', '0':')', '-':'_', '=':'+',
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
        if (press) el?.classList?.add('is-pressed');
        else       el?.classList?.remove('is-pressed');
      });
    }

    /* ── 홈 → 세벌식 페이지 전환 ── */
    var tajagiBtns = document.querySelectorAll('#hp-tajagi-home, #hp-tajagi-rope');
    tajagiBtns.forEach(function(btn) {
      btn?.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var closeBtn = document.getElementById('rope-overlay-close');
        if (closeBtn) closeBtn.click();
        
        if (typeof window.openTypewriterIntro === 'function') {
          window.openTypewriterIntro();
        }
      });
    });

    /* ── 홈 → 단어 맞추기 게임 전환 ── */
    var gameSticker = document.getElementById('hp-game-sticker');
    if (gameSticker) {
      gameSticker?.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (typeof navigate === 'function') {
          navigate('/game');
        }
      });
    }


    /* ── 타자기 시뮬레이터 오픈 이벤트 (React에서 호출) ── */
    window.openTajagiSimulator = function() {
      // Get fresh references just in case
      var homePage = document.getElementById('home-page');
      var detailTajagi = document.getElementById('detail-tajagi');
      if (!detailTajagi) return;

      history.pushState({ page: 'detail-tajagi' }, '');
      
      if (homePage) {
        homePage.style.transition    = 'opacity 0.3s ease';
        homePage.style.opacity       = '0';
        homePage.style.pointerEvents = 'none';
      }

      detailTajagi.style.transition    = 'none';
      detailTajagi.style.opacity       = '0';
      detailTajagi.style.pointerEvents = 'none';
      detailTajagi?.classList?.add('dp-in');
      void detailTajagi.offsetHeight;

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          detailTajagi.style.transition    = 'opacity 0.3s ease';
          detailTajagi.style.opacity       = '1';
          detailTajagi.style.pointerEvents = 'auto';
        });
      });

      setTimeout(function () {
        if (homePage) {
          homePage.style.display       = 'none';
          homePage.style.opacity       = '';
          homePage.style.transition    = '';
          homePage.style.pointerEvents = '';
        }
        /* 상태 초기화 */
        tj.committed = ''; tj.cho = tj.jung = tj.jong = -1; tj.mode = 'idle';
        updateDisplay();
      }, 400);
    };

    /* ── 직접 써보기 / 원복 버튼 동작 ── */
    var tjStartBtn = document.getElementById('tj-start-btn');
    var tjRestoreBtn = document.getElementById('tj-restore-btn');
    var tjIntro = document.getElementById('tj-intro');
    var tjTextWrap = document.getElementById('tj-text');
    
    if (tjStartBtn && tjIntro) {
      tjStartBtn?.addEventListener('click', function() {
        tjIntro.style.display = 'none';
        tj.committed = '';
        if (tjTextWrap) tjTextWrap.innerHTML = '';
        if (typeof isMobile !== 'undefined' && isMobile && typeof tjMobileInput !== 'undefined' && tjMobileInput) {
          tjMobileInput.focus();
        }
      });
    }

    if (tjRestoreBtn && tjIntro) {
      tjRestoreBtn?.addEventListener('click', function() {
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
        detailTajagi?.classList?.remove('dp-in');
        detailTajagi.style.opacity       = '';
        detailTajagi.style.transition    = '';
        detailTajagi.style.pointerEvents = '';
        homePage.style.opacity    = '';
        homePage.style.transition = '';
      }, 400);
    }

    // home-page가 없으면 React 모드 — back 버튼은 React가 직접 처리
    if (tjBack && homePage) {
      tjBack?.addEventListener('click', closeTajagi);
    }


    /* ── 모바일 입력 ── */
    var tjMobileInput = document.getElementById('tj-mobile-input');
    var isMobile = ('ontouchstart' in window);

    if (isMobile && tjMobileInput) {
      document.getElementById('tj-output')?.addEventListener('click', function () {
        tjMobileInput.value = tj.committed;
        tjMobileInput.focus();
      });

      tjMobileInput?.addEventListener('input', function () {
        tj.committed = tjMobileInput.value;
        tj.cho = tj.jung = tj.jong = -1;
        tj.mode = 'idle';
        updateDisplay();
        if (tjMobileInput.value.length > 200) {
          tjMobileInput.value = tj.committed;
        }
      });

      tjMobileInput?.addEventListener('focus', function () {
        document.getElementById('tj-placeholder').style.display = 'none';
      });

      if (isMobile) {
        document.getElementById('tj-placeholder').textContent =
          '탭하여 입력 — 한글 키보드로 자유롭게 쓰세요';
      }
    }

  };
  

/* --- Next Script --- */


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
            ropeWrap?.classList?.remove('has-seen');
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
          ropeWrap?.classList?.remove('fade-out');
        } else {
          ropeWrap?.classList?.add('fade-out');
          lastRopePage = -1; // 밧줄 영역을 벗어나면 상태 초기화
        }
      }
    }

    update();
    dmScroll?.addEventListener('scroll', update, { passive: true });
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
      wrap?.classList?.add('has-seen');
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
      wrap?.classList?.add('has-seen');
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
    wrap?.addEventListener('pointerdown', function(e) {
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

      wrap?.classList?.add('has-seen');
      wrap.style.animation     = 'none';
      wrap.style.transition    = 'none';
      wrap.style.transform     = 'translateY(0)';
      activeOverlay.style.transition = 'none';
      activeOverlay.style.transform  = 'translateY(' + (-window.innerHeight - 40) + 'px)';
      wrap.style.zIndex        = '130';
      wrap?.classList?.add('is-dragging');
      wrap.setPointerCapture(e.pointerId);
      e.preventDefault();
    });

    wrap?.addEventListener('pointermove', function(e) {
      if (!dragging) return;
      var d = ropeDown();
      delta = Math.min(Math.max(0, e.clientY - startY), d * 1.1);
      wrap.style.transform    = 'translateY(' + delta + 'px)';
      activeOverlay.style.transform = 'translateY(' + (delta - window.innerHeight - 40) + 'px)';
    });

    wrap?.addEventListener('pointerup', function(e) {
      if (!dragging) return;
      dragging = false;
      wrap?.classList?.remove('is-dragging');
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

    wrap?.addEventListener('pointercancel', function() {
      if (!dragging) return;
      dragging = false;
      wrap?.classList?.remove('is-dragging');
      snapBack();
      delta = 0;
    });

    /* ── X 닫기 버튼 ── */
    if (closeBtn1) {
      closeBtn1?.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
      closeBtn1?.addEventListener('click', function(e) {
        e.stopPropagation();
        closeOverlay();
      });
    }
    if (closeBtn2) {
      closeBtn2?.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
      closeBtn2?.addEventListener('click', function(e) {
        e.stopPropagation();
        closeOverlay();
      });
    }

    /* ── 오버레이 클릭/탭 → 닫기 (X 버튼 클릭은 제외) ── */
    if (overlay1) {
      overlay1?.addEventListener('click', function(e) {
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
      
      dev1984Clicker?.addEventListener('click', function(e) {
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
    refImg?.addEventListener('click', function(e) {
      e.stopPropagation();
      introSection?.classList?.toggle('is-focused');
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

    storySection?.addEventListener('click', function(e) {
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
        highlight?.classList?.add('is-drawn');
      } else {
        highlight?.classList?.remove('is-drawn');
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

    endingSection?.addEventListener('click', function(e) {
      if (currentIndex < paragraphs.length) {
        e.stopPropagation();
        paragraphs[currentIndex].classList.add('is-visible');
        currentIndex++;
      }
    });
  })();
  
    
  } catch(e) {
    console.error('Legacy app error:', e);
  }

  // Override specific routing buttons (React Router 연결은 LegacyAppHost에서 처리함)

  return () => {
     if (_activeKbDown) document.removeEventListener('keydown', _activeKbDown);
     if (_activeKbUp) document.removeEventListener('keyup', _activeKbUp);
  };
}
