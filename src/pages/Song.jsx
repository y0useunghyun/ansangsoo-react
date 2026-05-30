import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import gonghanFont from '../fonts/OnulGongHanChe-Medium.otf';
import dongdaemunFont from '../fonts/OnulDongdaemun-Medium.otf';
import AncheProjectModal from '../components/AncheProjectModal';

export default function Song() {
  const location    = useLocation();
  const navigate    = useNavigate();
  const scrollRef    = useRef(null);
  const section5Ref  = useRef(null);
  const section7Ref  = useRef(null);
  const section8Ref  = useRef(null);
  const section10Ref = useRef(null);

  useEffect(() => {
    const targets = {
      yu:     section10Ref,
      expand: section10Ref,
      hunmin: section7Ref,
      hak:    section8Ref,
    };
    const target = targets[location.state?.scrollTo];
    if (target?.current && scrollRef.current) {
      setTimeout(() => {
        scrollRef.current.scrollTo({ top: target.current.offsetTop, behavior: 'instant' });
      }, 100);
    }
  }, [location.state]);
  const [scale, setScale] = useState(1);
  const [progress, setProgress] = useState(0);
  const [isAncheOpen, setIsAncheOpen] = useState(false);

  useEffect(() => {
    // 1920x1080 컨테이너를 화면에 꽉 차게 비율 유지하며 축소/확대
    const handleResize = () => {
      const scaleX = window.innerWidth / 1920;
      const scaleY = window.innerHeight / 1080;
      setScale(Math.min(scaleX, scaleY) * 0.9); // 약간의 여백(0.9)을 줌
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 내부 스크롤 컨테이너의 스크롤 프로그레스 계산 로직
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    const max = el.scrollHeight - el.clientHeight;
    const p = max > 0 ? Math.min(1, Math.max(0, el.scrollTop / max)) : 0;
    setProgress(p);

    // hunmin3 형광펜: 섹션이 화면에 들어오면 그리기
    if (hm3Ref.current) {
      const viewCenter = el.scrollTop + el.clientHeight / 2;
      const s = hm3Ref.current;
      setHm3Drawn(viewCenter >= s.offsetTop && viewCenter < s.offsetTop + s.offsetHeight);
    }

    // 뷰포트 중앙이 5번 섹션(과학동아) 안에 있을 때만 밧줄 표시
    if (section5Ref.current) {
      const s = section5Ref.current;
      const viewCenter = el.scrollTop + el.clientHeight / 2;
      setShowRope(viewCenter >= s.offsetTop && viewCenter < s.offsetTop + s.offsetHeight);
    } else {
      setShowRope(false);
    }

  };

  // 프로그레스 SVG 로직
  const clipWidth = 1843 * progress;
  const rightDTranslateX = 1843 * (progress - 1);
  const rightDOpacity = progress < 0.04 ? 0 : 1;

  // 1번 페이지 인터랙션 상태 (0: 첫문장, 1: 두번째, 2: 세번째, 3: 네번째)
  const [step, setStep] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  
  // 2번 페이지 인터랙션 상태
  const [step2, setStep2] = useState(0);

  // 10번 페이지 인터랙션 상태
  const [step3, setStep3] = useState(0);

  // 11번 페이지: 타임라인 가로 패닝
  const [hPx, setHPx]   = useState(0);
  const section11Ref = useRef(null);
  const H_STEP = 1400;
  const H_MAX  = 7200;

  // 밧줄 표시 여부 (4번 페이지에서만)
  const [showRope, setShowRope] = useState(false);

  // 기본형태 오버레이
  const [agOpen, setAgOpen]           = useState(false);
  const [agSvg, setAgSvg]             = useState('');
  const [agFixed, setAgFixed]         = useState(null); // 원 fixed 좌표
  const agCirclesRef  = useRef(null);
  const agLeftRef     = useRef(null);
  const agRightRef    = useRef(null);
  const agSectionRef  = useRef(null);
  const agWordRef     = useRef(null);

  // 원을 단어 위에 위치시키기
  useEffect(() => {
    const pos = () => {
      const s = agSectionRef.current, w = agWordRef.current, c = agCirclesRef.current;
      if (!s || !w || !c || agFixed) return;
      const sr = s.getBoundingClientRect(), wr = w.getBoundingClientRect();
      c.style.left = (wr.left - sr.left + wr.width  / 2) + 'px';
      c.style.top  = (wr.top  - sr.top  + wr.height / 2) + 'px';
    };
    pos();
    window.addEventListener('resize', pos);
    return () => window.removeEventListener('resize', pos);
  }, [agFixed]);

  // 오버레이 열린 뒤 SVG 선 그리기
  useEffect(() => {
    if (!agOpen || !agFixed || !agLeftRef.current || !agRightRef.current) return;
    const lr = agLeftRef.current.getBoundingClientRect();
    const rr = agRightRef.current.getBoundingClientRect();
    setAgSvg(
      `<line x1="${agFixed.x}" y1="${agFixed.y}" x2="${lr.right}" y2="${lr.top + lr.height * 0.3}" stroke="#98FB98" stroke-width="2" stroke-linecap="round"/>` +
      `<line x1="${agFixed.x}" y1="${agFixed.y}" x2="${rr.left}"  y2="${rr.top  + rr.height * 0.3}" stroke="#98FB98" stroke-width="2" stroke-linecap="round"/>`
    );
  }, [agOpen, agFixed]);

  const handleAgWord = (e) => {
    e.stopPropagation();
    const wr = agWordRef.current.getBoundingClientRect();
    setAgFixed({ x: wr.left + wr.width / 2, y: wr.top + wr.height / 2 });
    setAgOpen(true);
  };

  const handleAgOverlay = (e) => {
    if (e.target.closest('.ag-caption-panel')) return;
    setAgOpen(false); setAgFixed(null); setAgSvg('');
  };

  // hunmin3 하이라이트 IntersectionObserver
  const hm3Ref  = useRef(null);
  const [hm3Drawn, setHm3Drawn] = useState(false);

  // 히어로 드래그 ref
  const heroRef = useRef(null);
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const ITEM_W = 731.98 + 20;
    const TOTAL  = 4;
    let isDown = false, startX = 0, scrollLeft = 0, moved = false;
    const onDown  = (e) => { isDown = true; moved = false; hero.classList.add('is-grabbing'); startX = e.pageX - hero.getBoundingClientRect().left; scrollLeft = hero.scrollLeft; };
    const onLeave = ()  => { isDown = false; hero.classList.remove('is-grabbing'); };
    const onUp    = ()  => { isDown = false; hero.classList.remove('is-grabbing'); };
    const onMove  = (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - hero.getBoundingClientRect().left; const walk = (x - startX) * 1.5; if (Math.abs(walk) > 4) moved = true; hero.scrollLeft = scrollLeft - walk; };
    const onClick = (e) => { e.stopPropagation(); if (moved) { moved = false; return; } const idx = Math.round(hero.scrollLeft / ITEM_W); hero.scrollTo({ left: ((idx + 1) % TOTAL) * ITEM_W, behavior: 'smooth' }); };
    hero.addEventListener('mousedown',  onDown);
    hero.addEventListener('mouseleave', onLeave);
    hero.addEventListener('mouseup',    onUp);
    hero.addEventListener('mousemove',  onMove);
    hero.addEventListener('click',      onClick);
    return () => {
      hero.removeEventListener('mousedown',  onDown);
      hero.removeEventListener('mouseleave', onLeave);
      hero.removeEventListener('mouseup',    onUp);
      hero.removeEventListener('mousemove',  onMove);
      hero.removeEventListener('click',      onClick);
    };
  }, []);

  // 밧줄 refs
  const ropeWrapRef = useRef(null);
  const ropeImgRef  = useRef(null);
  const overlayRef  = useRef(null);

  useEffect(() => {
    const wrap    = ropeWrapRef.current;
    const rope    = ropeImgRef.current;
    const overlay = overlayRef.current;
    if (!wrap || !rope || !overlay) return;

    const THRESHOLD = 50;
    let dragging = false, startY = 0, delta = 0, isOpen = false;

    const ropeH    = () => rope.offsetHeight || 465;
    const ropeDown = () => window.innerHeight + 40 - ropeH();
    const ropeRest = () => 120 - ropeH();

    function openOverlay() {
      isOpen = true;
      wrap.classList.add('has-seen');
      wrap.style.animation = 'none';
      overlay.style.transition    = 'transform 1.6s cubic-bezier(0.5,0,0.15,1)';
      overlay.style.transform     = 'translateY(0)';
      overlay.style.pointerEvents = 'auto';
      wrap.style.transition    = 'transform 1.6s cubic-bezier(0.5,0,0.15,1)';
      wrap.style.transform     = 'translateY(' + (window.innerHeight + 40) + 'px)';
      wrap.style.pointerEvents = 'none';
    }

    function closeOverlay() {
      isOpen = false;
      overlay.style.pointerEvents = 'none';
      overlay.style.transition    = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      overlay.style.transform     = 'translateY(-100%)';
      wrap.style.zIndex        = '125';
      wrap.style.transition    = 'transform 0.7s cubic-bezier(0.4,0,0.2,1)';
      wrap.style.transform     = 'translateY(40px)';
      wrap.style.pointerEvents = '';
      wrap.classList.add('has-seen');
      setTimeout(() => {
        wrap.style.transition = 'transform 0.35s ease';
        wrap.style.transform  = 'translateY(' + ropeRest() + 'px)';
        setTimeout(() => { wrap.style.zIndex = ''; }, 400);
      }, 720);
    }

    function snapBack() {
      overlay.style.transition = 'transform 0.4s ease';
      overlay.style.transform  = 'translateY(-100%)';
      wrap.style.transition    = 'transform 0.4s ease';
      wrap.style.transform     = 'translateY(0)';
      wrap.style.zIndex        = '';
      wrap.style.pointerEvents = '';
    }

    function onPointerDown(e) {
      dragging = true; startY = e.clientY; delta = 0;
      wrap.classList.add('has-seen', 'is-dragging');
      wrap.style.animation     = 'none';
      wrap.style.transition    = 'none';
      wrap.style.transform     = 'translateY(0)';
      overlay.style.transition = 'none';
      overlay.style.transform  = 'translateY(' + (-window.innerHeight - 40) + 'px)';
      wrap.style.zIndex        = '130';
      wrap.setPointerCapture(e.pointerId);
      e.preventDefault();
    }

    function onPointerMove(e) {
      if (!dragging) return;
      delta = Math.min(Math.max(0, e.clientY - startY), ropeDown() * 1.1);
      wrap.style.transform    = 'translateY(' + delta + 'px)';
      overlay.style.transform = 'translateY(' + (delta - window.innerHeight - 40) + 'px)';
    }

    function onPointerUp(e) {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove('is-dragging');
      if (wrap.releasePointerCapture) wrap.releasePointerCapture(e.pointerId);
      (delta < 10 || delta >= THRESHOLD) ? openOverlay() : snapBack();
      delta = 0;
    }

    function onPointerCancel() {
      if (!dragging) return;
      dragging = false;
      wrap.classList.remove('is-dragging');
      snapBack(); delta = 0;
    }

    wrap.addEventListener('pointerdown',   onPointerDown);
    wrap.addEventListener('pointermove',   onPointerMove);
    wrap.addEventListener('pointerup',     onPointerUp);
    wrap.addEventListener('pointercancel', onPointerCancel);

    overlay.addEventListener('click', (e) => {
      if (e.target.closest('.rope-overlay-close')) return;
      if (!isOpen) return;
      closeOverlay();
    });

    const closeBtn = overlay.querySelector('.rope-overlay-close');
    if (closeBtn) {
      closeBtn.addEventListener('pointerdown', (e) => e.stopPropagation());
      closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeOverlay(); });
    }

    return () => {
      wrap.removeEventListener('pointerdown',   onPointerDown);
      wrap.removeEventListener('pointermove',   onPointerMove);
      wrap.removeEventListener('pointerup',     onPointerUp);
      wrap.removeEventListener('pointercancel', onPointerCancel);
    };
  }, []);

  // 4번 페이지 각주 상태
  const [fnActive, setFnActive] = useState(null);
  const [fnPos, setFnPos] = useState({ top: 0, left: 0 });
  const fnData = {
    1: { title: "(1) 안상수체는 왜 '안상수'체일까?", text: "먼저, 당연히 그래야 한다고 생각했어요. 다른 생각을 하지 못했죠. 두번째는 당시에 안그라픽스를 막 시작하는 시점이었는데, 내 이름을 붙이는게 가장 확실하게 내 일과 디자인에 책임을 지는 방법이라고 생각했어요. 내 이름을 걸었으니 소홀히 하기 어렵겠다는 생각을 했죠. 그런 생각으로 그땐 일말의 고민도 없이 '안상수'체라고 이름을 붙였어요." },
    2: { title: "(2) 안상수 1952~", img: "/image/안상수.webp", text: "시각디자이너, 타이포그라퍼. 1985년 '안상수체'를 멋지어 한글 글꼴의 탈네모 흐름을 이끌었으며, 이후 이상체, 미르체, 마노체 등을 선보였다. 1988년 실험잡지 「보고서/보고서」를 창간, 전위적인 타이포그라피를 실험하며 현재까지 한글 타이포그라피를 바탕으로 한 작업을 선보이고 있다." },
    3: { title: '(3) "이런 것도 글자냐"', text: "당시 한글 글꼴은 네모틀에 맞춰 설계하는 것이 당연한 관습이었다. 탈네모꼴인 안상수체는 그 관습을 정면으로 거스른 시도였고, 이 핀잔은 역설적으로 안상수체가 기존 타이포그라피의 문법을 얼마나 과감하게 벗어났는지를 보여준다." },
  };

  const handleFnClick = (e, id) => {
    e.stopPropagation();
    if (fnActive === id) { setFnActive(null); return; }
    const rect = e.currentTarget.getBoundingClientRect();
    const cardW = 276;
    const cardH = 380;
    let top  = rect.top - cardH - 16;
    if (top < 20) top = rect.bottom + 16;
    let left = rect.left;
    if (left + cardW > window.innerWidth - 20) left = window.innerWidth - cardW - 20;
    if (left < 20) left = 20;
    setFnPos({ top, left });
    setFnActive(id);
  };

  // 상/하단 클릭 시 스크롤 및 텍스트 진행 처리
  const handleViewportClick = (e) => {
    if (!scrollRef.current) return;
    
    const isTopHalf = e.clientY < window.innerHeight / 2;
    const isBottomHalf = e.clientY >= window.innerHeight / 2;
    const scrollTop = scrollRef.current.scrollTop;
    
    const isPage1  = scrollTop < window.innerHeight / 2;
    const isPage2  = scrollTop >= window.innerHeight / 2 && scrollTop < window.innerHeight * 1.5;
    const isPage10 = scrollTop >= window.innerHeight * 8.5 && scrollTop < window.innerHeight * 9.5;

    if (isBottomHalf) {
      if (isPage1 && step < 3) {
        if (step === 0) setShowPopup(true);
        if (step === 1) setShowPopup(false);
        setStep(prev => prev + 1);
      } else if (isPage2 && step2 < 2) {
        setStep2(prev => prev + 1);
      } else if (isPage10 && step3 < 3) {
        setStep3(prev => prev + 1);
      } else {
        scrollRef.current.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
      }
    } else if (isTopHalf) {
      if (isPage10 && step3 > 0) {
        setStep3(prev => prev - 1);
      } else if (isPage2 && step2 > 0) {
        setStep2(prev => prev - 1);
      } else if (isPage1 && step > 0) {
        if (step === 1) setShowPopup(false);
        if (step === 2) setShowPopup(true);
        setStep(prev => prev - 1);
      } else {
        scrollRef.current.scrollBy({ top: -window.innerHeight, behavior: 'smooth' });
      }
    }
  };

  const handleNameClick = (e) => {
    e.stopPropagation(); // 배경 클릭(스크롤/step 증가) 방지
    setShowPopup(prev => !prev);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100vw', height: '100vh', backgroundColor: '#fff', position: 'relative', overflow: 'hidden' }}
    >
      {/* 이식된 헤더 프로그레스바 + 홈버튼 */}
      <div className="dm-header" id="dm-header" style={{ pointerEvents: 'auto', zIndex: 100 }}>
        <Link to="/" className="dm-home-btn" id="dm-home-btn" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={(e) => e.stopPropagation()}>&lt; 홈</Link>
        <svg id="dm-progress-svg" className="dm-progress-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1918.2 97.7" preserveAspectRatio="none" style={{ pointerEvents: 'none' }}>
          <defs>
            <clipPath id="dm-clip">
              <rect id="dm-clip-rect" x="0" y="0" width={clipWidth} height="97.7"/>
            </clipPath>
          </defs>
          <path d="M56.8,31c-4-3.1-8.8-4.7-14-4.7-12.6,0-22.6,10.1-22.6,22.6s10.1,22.6,22.6,22.6,10.1-1.8,14-4.8v9.9h8.8V21.1h-8.8v9.9ZM42.8,62.6c-7.5,0-13.7-6.1-13.7-13.7s6.1-13.5,13.7-13.5,13.8,5.9,13.8,13.5-6.3,13.7-13.8,13.7Z"/>
          <g clipPath="url(#dm-clip)">
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
          </g>
          <g id="dm-right-d" transform={`translate(${rightDTranslateX},0)`} style={{ opacity: rightDOpacity }}>
            <path d="M1861.4,21.1h-8.8s0,55.5,0,55.5h8.8s0-9.9,0-9.9c4,3.1,8.8,4.8,14,4.8,12.6,0,22.6-10.1,22.6-22.6,0-12.6-10.1-22.6-22.6-22.6s-10.1,1.6-14,4.7v-9.9ZM1861.6,49c0-7.5,6.3-13.5,13.8-13.5s13.7,5.9,13.7,13.5c0,7.5-6.1,13.7-13.7,13.7s-13.8-6.1-13.8-13.7Z"/>
          </g>
        </svg>
      </div>

      <style>{`.song-scroll > section { scroll-snap-align: start; min-height: 100vh; }`}</style>

      {/* 내부 스크롤 영역 */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        onClick={handleViewportClick}
        className="song-scroll"
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          position: 'relative',
          cursor: 'pointer',
          scrollSnapType: 'y mandatory',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0px, black 150px)',
          maskImage: 'linear-gradient(to bottom, transparent 0px, black 150px)'
        }}
      >
        {/* 1번 페이지: 안상수체 인용구 (클릭 인터랙션) */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '1920px', height: '1080px', position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <div data-layer="인용구" style={{ position: 'absolute', left: '50px', top: '200px', width: '1567px', display: 'flex', flexDirection: 'column', gap: '50px', color: 'black', fontSize: '64px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, wordWrap: 'break-word', textAlign: 'left', lineHeight: '1.4' }}>
              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                여러분들은 좋아하는 글자체가 있으신가요?
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
                style={{ position: 'relative' }}
              >
                {/* 각주 팝업 (fn-card 스타일) & 천천히 깜빡이는 효과 */}
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: showPopup ? 1 : 0, y: showPopup ? 0 : 10, scale: showPopup ? 1 : 0.98 }}
                  transition={{ duration: 0.4 }}
                  style={{ 
                    position: 'absolute', 
                    top: '-160px', 
                    left: '100px', 
                    display: 'flex', 
                    flexDirection: 'row', 
                    gap: '60px', 
                    alignItems: 'center',
                    padding: '30px 50px',
                    borderRadius: '5px',
                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                    pointerEvents: showPopup ? 'auto' : 'none',
                    zIndex: 10,
                    overflow: 'hidden'
                  }}
                >
                  {/* 깜빡이는 초록색 배경 레이어 */}
                  <motion.div
                    animate={{ backgroundColor: ["#98FB98", "#7aeb7a", "#98FB98"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                    style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
                  />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: 'black', fontSize: '56px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, lineHeight: '1' }}>송명선</div>
                    <div style={{ color: 'black', fontSize: '18px', fontFamily: 'var(--font-onul)', fontWeight: 700, letterSpacing: '1px' }}>안상수체</div>
                  </div>
                  
                  {/* 구분선 */}
                  <div style={{ width: '2px', height: '60px', background: 'rgba(0,0,0,0.2)' }} />
                  
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                    <div style={{ color: 'black', fontSize: '46px', fontFamily: 'Pretendard', fontWeight: 700, lineHeight: '1', transform: 'translateY(5px)' }}>송명선</div>
                    <div style={{ color: 'black', fontSize: '18px', fontFamily: 'var(--font-onul)', fontWeight: 700, letterSpacing: '1px' }}>Pretendard</div>
                  </div>
                </motion.div>

                저는 <span className="dm-u" style={{ textUnderlineOffset: '18px' }} onClick={handleNameClick}>제 이름을</span> 쓰다가 안상수체를 좋아하게 됐습니다.
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                네모틀 글자들도 매력있는 글자체가 많지만,<br/>
                제 이름을 귀엽게 써주는 글자체는 안상수체가 제일 좋았습니다.
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: step >= 3 ? 1 : 0, y: step >= 3 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                그 후로 저는 안상수체가 제일 좋아하는 글자체가 되었습니다.
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2번 페이지: 새로운 질문과 4단 탈네모틀 폰트 비교 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
          <style>
            {`
              @font-face {
                  font-family: 'Gonghan';
                  src: url('${gonghanFont}') format('opentype');
              }
              @font-face {
                  font-family: 'Dongdaemun';
                  src: url('${dongdaemunFont}') format('opentype');
              }
            `}
          </style>
          <div style={{ width: '1920px', height: '1080px', position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            
            {/* 시네마틱 카메라 줌 컨테이너 */}
            <motion.div
              animate={{
                x: step2 >= 1 ? 710 : 0,
                y: step2 >= 1 ? -75 : 0,
                scale: step2 >= 1 ? 4.5 : 1
              }}
              transition={{ duration: 1.2, ease: [0.25, 1, 0.3, 1] }}
              style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0, transformOrigin: '250px 615px' }}
            >
              {/* 타이틀 */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={step2 >= 1 ? { opacity: 0 } : {}}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                data-layer="질문" 
                style={{ position: 'absolute', left: '100px', top: '250px', width: '1567px', color: 'black', fontSize: '64px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, wordWrap: 'break-word', textAlign: 'left', lineHeight: '1.4' }}
              >
                근데 많은 탈네모틀 중에<br/>
                왜 안상수체였을까요?
              </motion.div>

              {/* 4단 탈네모틀 폰트 전시 */}
              <motion.div 
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ position: 'absolute', left: '100px', top: '550px', width: '1720px', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px' }}
              >
                {/* 1. 안상수체 (확대 대상, 카메라는 여기를 추적함) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', alignItems: 'flex-start' }}>
                  <div style={{ fontSize: '130px', fontFamily: 'AGahnsangsoo2012', color: 'black', fontWeight: 700, lineHeight: 1, display: 'inline-flex' }}>
                    {[
                      { char: '송', jamo: 'ㅇ', left: '50%', transform: 'translateX(-50%)', bottom: '-61px' },
                      { char: '명', jamo: 'ㅇ', left: '74%', transform: 'translateX(-50%)', bottom: '-61px' },
                      { char: '선', jamo: 'ㄴ', left: '73.5%', transform: 'translateX(-50%)', bottom: '-60px' },
                    ].map(({ char, jamo, left, transform, bottom }, i) => (
                      <span key={i} style={{ position: 'relative', display: 'inline-block' }}>
                        {char}
                        <motion.span
                          animate={{ opacity: step2 === 2 ? 1 : 0 }}
                          transition={{ duration: 0.6, ease: 'easeInOut' }}
                          style={{
                            position: 'absolute',
                            bottom,
                            left,
                            transform,
                            fontSize: '132px',
                            fontFamily: 'AGahnsangsoo2012',
                            fontWeight: 700,
                            color: '#7aeb7a',
                            lineHeight: 1,
                            pointerEvents: 'none',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {jamo}
                        </motion.span>
                      </span>
                    ))}
                  </div>
                  <motion.div animate={{ opacity: step2 >= 1 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ fontSize: '15px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>안상수체</motion.div>
                </div>

                {/* 2. 오늘한체 (줌인 시 페이드아웃) */}
                <motion.div animate={{ opacity: step2 >= 1 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div style={{ fontSize: '130px', fontFamily: 'OnulHanChe', color: 'black', fontWeight: 700 }}>송명선</div>
                  <div style={{ fontSize: '15px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>오늘한체</div>
                </motion.div>

                {/* 3. 공한체 */}
                <motion.div animate={{ opacity: step2 >= 1 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div style={{ fontSize: '130px', fontFamily: '"공한체", "Gonghan", "Gong Han", sans-serif', color: 'black', fontWeight: 700 }}>송명선</div>
                  <div style={{ fontSize: '15px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>공한체</div>
                </motion.div>

                {/* 4. 동대문체 */}
                <motion.div animate={{ opacity: step2 >= 1 ? 0 : 1 }} transition={{ duration: 0.4 }} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                  <div style={{ fontSize: '130px', fontFamily: '"동대문체", "Dongdaemun", sans-serif', color: 'black', fontWeight: 400 }}>송명선</div>
                  <div style={{ fontSize: '15px', fontFamily: 'Pretendard', color: '#bbb', fontWeight: 500, letterSpacing: '2px' }}>동대문체</div>
                </motion.div>
              </motion.div>
            </motion.div>

            {/* 각주 카드 — step2>=3이면 유지 */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: step2 >= 2 ? 1 : 0, y: step2 >= 2 ? 0 : 10 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'absolute',
                right: '60px',
                top: '35%',
                transform: 'translateY(-50%)',
                width: '430px',
                padding: '24px 28px',
                borderRadius: '5px',
                background: '#98FB98',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <p style={{ width: '100%', fontSize: '19px', fontFamily: 'OnulHanChe', fontWeight: 700, color: 'black', lineHeight: '32.3px', margin: 0, wordBreak: 'keep-all' }}>
                다른 탈네모틀 글자체와 달리 한눈에 보인 차이점은, 안상수체는 첫 닿자와 받침의 형태를 같이 쓰고, 홀자의 위치를 가운데로 맞추어 아주 단순한 구조라는 것이다.<br/><br/>이 부분이 송명선이라는 이름을 더 귀엽게 보여주는 이유였다.
              </p>
            </motion.div>

          </div>
        </section>

        {/* 3번 페이지 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ width: '1920px', height: '1080px', position: 'relative', transform: `scale(${scale})`, transformOrigin: 'center center' }}>
            <div style={{ position: 'absolute', left: '100px', top: '200px', fontSize: '80px', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: 'black', lineHeight: 1.3 }}>
              그래서 저희는 안상수체에 대해서 더 말해보려고합니다.
            </div>
          </div>
        </section>

        {/* 4번 페이지: 히어로 이미지 */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="dm-section dm-section--hero" style={{ width: '100%' }}>
            <div className="dm-hero" ref={heroRef} id="dm-hero">
              <img src="/image/안체1.jpg" className="dm-hero-img" alt="안체1" />
              <img src="/image/안체2.jpg" className="dm-hero-img" alt="안체2" />
              <img src="/image/안체3.jpg" className="dm-hero-img" alt="안체3" />
              <img src="/image/안체4.jpg" className="dm-hero-img" alt="안체4" />
            </div>
            <p className="dm-label">AG 안상수체 2012</p>
          </div>
        </section>

        {/* 5번 페이지: AG 안상수체 2012 인트로 — 레거시 클래스 그대로 */}
        <section ref={section5Ref} style={{ width: '100%', minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
          <div className="dm-section dm-section--intro" style={{ minHeight: '100vh' }}>
            <img src="/image/협회전.png" className="dm-ref-big" alt="과학동아 제호 및 협회전 포스터" />
            <h1 className="dm-intro-title"><span className="dm-hl-line">AG 안상수체 2012</span></h1>
            <p className="dm-body dm-intro-body">
              <span className="dm-hl-line">
                <span className="dm-u dm-hl" onClick={(e) => handleFnClick(e, 1)}>'안상수'체</span>는 1985년{' '}
                <span className="dm-u dm-hl" onClick={(e) => handleFnClick(e, 2)}>디자이너 안상수</span>가 설계한 글자체로,
                같은 해 12월 제3회 ‹홍익시각디자이너협회 회원전› 포스터에 처음 등장한다.
                이후 1986년 1월 «과학동아» 창간호에서 많은 사람에게 알려지게 되는데,
                이 글꼴은 당시 다소 파격적인 형태로 인식된 듯하다.
                처음 만들었을 때는{' '}
                <span className="dm-u dm-hl" onClick={(e) => handleFnClick(e, 3)}>"이런 것도 글자냐"</span>고 핀잔을 받기도 했다는데,
                이는 한글 글자체는 당연히 네모틀에 잘 맞춰서 설계해야 한다는 개념을 탈피한 시도였기 때문이다.
              </span>
            </p>
            <p className="dm-ref-caption dm-ref-caption--float">
              좌 〈과학동아〉 제호(1986년 1월),<br/>우 제3회 홍익시각디자이너협회 회원전 포스터(1985년 12월)
            </p>
          </div>

          {/* fn-overlay */}
          {fnActive && <div className="fn-overlay is-open" onClick={(e) => { e.stopPropagation(); setFnActive(null); }} />}

          {/* 각주 카드 */}
          {fnActive && (
            <div
              className="fn-card is-open"
              onClick={(e) => e.stopPropagation()}
              style={{ top: fnPos.top, left: fnPos.left }}
            >
              {fnData[fnActive].img ? (
                <>
                  <div className="fn-card-header">
                    <p className="fn-card-title">{fnData[fnActive].title}</p>
                    <img className="fn-card-portrait" src={fnData[fnActive].img} alt="" />
                  </div>
                  <p className="fn-card-text">{fnData[fnActive].text}</p>
                </>
              ) : (
                <>
                  <p className="fn-card-title">{fnData[fnActive].title}</p>
                  <p className="fn-card-text">{fnData[fnActive].text}</p>
                </>
              )}
            </div>
          )}
        </section>

        {/* 6번 페이지: 안상수체의 기본 형태 */}
        <section style={{ width: '100%', minHeight: '100vh' }}>
          <div className="dm-section dm-section--form" style={{ minHeight: '100vh' }}>
            <div className="ag-form-section" ref={agSectionRef}>
              <div
                ref={agCirclesRef}
                className={`ag-form-circles${agOpen ? ' ag-circles-lit' : ''}`}
                style={agFixed ? { position: 'fixed', left: agFixed.x, top: agFixed.y, zIndex: 55 } : {}}
              >
                <div className="ag-form-circle ag-form-circle--3" />
                <div className="ag-form-circle ag-form-circle--2" />
                <div className="ag-form-circle ag-form-circle--1" />
              </div>
              <h2 className="ag-form-title">안상수체의 기본 형태</h2>
              <p className="ag-form-desc">
                안상수는 한글 활자 형태를 크게 두 가지로 구분하고,{' '}
                <span ref={agWordRef} className="ag-form-u" onClick={handleAgWord}>네모틀과 탈네모틀</span>{' '}
                글자꼴은 각각의 목적과 특성을 살리면서 발전할 것이라고 했다. 특히, 탈네모틀 글자꼴의 가능성에 대해서 높게 평가했다.
              </p>
            </div>
          </div>
        </section>

        {/* 7번 페이지: 훈민정음의 창제 원리를 따르다 */}
        <section ref={section7Ref} style={{ width: '100%' }}>
          <div className="dm-section dm-section--hunmin">
            <h2 className="dm-title hm-title">훈민정음의 창제 원리를 따르다</h2>
            <div className="hm-img-wrap">
              <img src="/image/창제원리.jpg" className="hm-img" alt="훈민정음 창제원리" />
              <p className="dm-ref-caption">『훈민정음 해례본』 자모음의 원리도</p>
            </div>
            <p className="dm-body">안상수체의 간결함은 훈민정음 창제 원리에 근거한다. 훈민정음은 닿자와 홀자 24개만 설계해 형태를 변형하지 않고 모든 경우에 사용하는 가장 간결하고 기하학적인 형태이다. 수직선, 수평선, 사선, 정원으로 구성된 24자의 낱자를 기본 형태로 삼아 쌍닿자, 이중홀자 등을 조합했다.</p>
          </div>
        </section>

        {/* 8번 페이지: 안상수체 1984 개발 과정 */}
        <section ref={section8Ref} style={{ width: '100%' }}>
          <div className="dm-section dm-section--dev1984" style={{ minHeight: '100vh' }}>
            <h2 className="dm-title dev1984-title">안상수체 1984 개발 과정</h2>
            <div className="dev1984-img-wrap">
              <img src="/image/학.svg" alt="학 도면" className="dev1984-img" />
              <div className="dev1984-highlight">
                <p>"당시 오토캐드는 기계 제도 및 건축 설계용으로만 쓰였으나, 이를 잘 이용하면<br/>글자 디자인에 매우 도움이 되겠다 싶어 매뉴얼을 구해 체득해나갔다."</p>
              </div>
            </div>
          </div>
        </section>

        {/* 9번 페이지: 첫닿자·홀자·받침 조합 */}
        <section style={{ width: '100%' }}>
          <div className="dm-section dm-section--hunmin3" ref={hm3Ref}>
            <div className="hm3-charts-wrap">
              <div className="hm3-chart hm3-chart--chot">
                <div className="hm3-chart-box">
                  <img src="/image/첫닿자.svg" alt="첫닿자 19자" className="hm3-chart-img" />
                </div>
              </div>
              <div className="hm3-chart hm3-chart--bat">
                <div className="hm3-chart-box">
                  <img src="/image/받침.svg" alt="받침 27자" className="hm3-chart-img" />
                </div>
              </div>
              <div className="hm3-chart hm3-chart--hol">
                <div className="hm3-chart-box">
                  <img src="/image/홀자.svg" alt="홀자 21자" className="hm3-chart-img" />
                </div>
              </div>
            </div>
            <p className="dm-body hm3-text">
              첫닿자 19자, 홀자 21자, 받침 27자로 11,172자를 만들어냈다.{' '}
              <span className={`hm3-highlight${hm3Drawn ? ' is-drawn' : ''}`}>
                이는 네모틀 글자체에서 글자마다 형태, 크기, 위치를 변형하여 11,172자를 각각 설계해야 했던 관습에서 벗어난 새롭고도 익숙한 접근이었다.
              </span>
            </p>
          </div>
        </section>
        {/* 10번 페이지: 확장 인트로 */}
        <section ref={section10Ref} style={{ width: '100%', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
          <div style={{ width: '100%', padding: '15vh 5vw', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: '50px', color: 'black', fontSize: 'clamp(22px, 2.8vw, 52px)', fontFamily: 'AGahnsangsoo2012', fontWeight: 700, lineHeight: '1.4' }}>
              <motion.div initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
                그런데, 1985년은 시작이었습니다.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step3 >= 1 ? 1 : 0, y: step3 >= 1 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                조사하기 전에는 안상수체가 어떻게 만들어졌는지도 몰랐고,<br/>
                굵기 3종이 처음부터 나왔을 거라고 생각했습니다. 글자체에 대해 너무 무지했던 거죠.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step3 >= 2 ? 1 : 0, y: step3 >= 2 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                그런데 조사하면서, 1985년부터 지금까지 꾸준히 변화를 시도해왔다는 걸 알게 됐습니다.
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: step3 >= 3 ? 1 : 0, y: step3 >= 3 ? 0 : 20 }}
                transition={{ duration: 0.5 }}
              >
                그렇게 곁에 있었기에 눈이 갈 수 있었고, 이렇게 꾸준히 변화해왔다는 점이 대단하게 느껴졌습니다.<br/>
                그래서 그 확장에 대해서 얘기해보려고 합니다.
              </motion.div>
          </div>
        </section>
        {/* 11번 페이지: 확장 가로 슬라이드 — 좌/우 클릭, 카메라 패닝 */}
        {/* 11번 페이지: 확장분포도 타임라인 */}
        <section
          ref={section11Ref}
          onClick={(e) => {
            e.stopPropagation();
            if (e.clientX < window.innerWidth / 2) {
              setHPx(p => Math.max(0, p - H_STEP));
            } else {
              if (hPx >= H_MAX) scrollRef.current?.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
              else setHPx(p => Math.min(H_MAX, p + H_STEP));
            }
          }}
          style={{ width: '100%', height: '100vh', overflow: 'hidden', position: 'relative', cursor: 'pointer', background: '#fff' }}
        >
          <motion.div
            animate={{ x: -(hPx * scale) }}
            transition={{ duration: 0.85, ease: [0.4, 0, 0.15, 1] }}
            style={{ position: 'absolute', top: '50%', left: 0, marginTop: `${-(1080 * scale) / 2}px`, width: `${9700 * scale}px`, height: `${1080 * scale}px` }}
          >
          <div style={{ width: '9700px', height: '1080px', position: 'absolute', top: 0, left: 0, transform: `scale(${scale})`, transformOrigin: 'top left' }}>

            {/* ── 메인 라인 (형광 그린) ── */}
            <div style={{ position: 'absolute', left: 600, top: 400, width: 8400, height: 20, background: 'rgba(152, 251, 152, 0.85)' }} />

            {/* 이상체 라인 (형광 핑크) */}
            <div style={{ position: 'absolute', left: 2700, top: 584, width: 4000, height: 16, background: 'rgba(255, 171, 225, 0.85)' }} />
            {/* 미르체 라인 (형광 시안) */}
            <div style={{ position: 'absolute', left: 2700, top: 734, width: 5200, height: 16, background: 'rgba(122, 235, 255, 0.85)' }} />
            {/* 마노체 라인 (형광 옐로우) */}
            <div style={{ position: 'absolute', left: 3300, top: 884, width: 4000, height: 16, background: 'rgba(255, 235, 87, 0.85)' }} />

            {/* ── 안상수체 메인 (top=361) ── */}
            {[
              { x: 600,  text: '1985\n안상수체 탄생 / 오토캐드 사용' },
              { x: 2100, text: '1991\n폰토그라퍼 사용 / 3종 파생' },
              { x: 4300, text: '2006\n폰트랩 사용' },
              { x: 5800, text: '2012\n5종 파생 / 그룹커닝 사용' },
              { x: 6400, text: '2013\n둥근안상수체 탄생' },
              { x: 8600, text: '2025\n안체 프로젝트' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 361, width: 460, fontSize: 50, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}

            {/* ── 풀어쓰기 (font 30px) ── */}
            {[
              { x: 100,  text: '1937\n최현배의 풀어쓰기 〈한글〉 5권 5호' },
              { x: 1500, text: '1989\n장봉선의 풀어쓰기 〈한글풀어쓰기 교본〉' },
              { x: 3300, text: '1993\n조정보의 풀어쓰기 〈한글정보〉 제 5호' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 193, width: 420, fontSize: 30, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.4 }}>{item.text}</div>
            ))}

            {/* ── 이상체 (top=545) ── */}
            {[
              { x: 2700, text: '1992\n이상체 탄생' },
              { x: 6400, text: '2013\n이상체 5종 파생' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 545, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}

            {/* ── 미르체 (top=695) ── */}
            {[
              { x: 2700, text: '1992\n미르체 탄생' },
              { x: 7600, text: '2015\n미르체 6종 파생' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 695, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}

            {/* ── 마노체 (top=845) ── */}
            {[
              { x: 3300, text: '1993\n마노체 탄생' },
              { x: 4900, text: '2007\n마노체 3종 파생' },
              { x: 7000, text: '2014\n마노체 5종 파생' },
            ].map((item, i) => (
              <div key={i} style={{ position: 'absolute', left: item.x, top: 845, width: 380, fontSize: 40, fontFamily: 'AGahnsangsoo2012', fontWeight: 700, color: '#000', whiteSpace: 'pre-line', lineHeight: 1.3 }}>{item.text}</div>
            ))}
          </div>
          </motion.div>
        </section>

        {/* 12번 페이지: 안체 프로젝트 A-Project */}
        <section style={{ width: '100%', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div className="dm-section dm-section--aproject" id="sec-aproject" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="dm-title">&lt;안체 프로젝트 A-Project&gt;</h2>
            <div className="dm-ap-grid">
              <figure className="dm-ap-thumb" data-fn="ap1">
                <img src="/image/네빌 브로디.png" alt="네빌 브로디" className="dm-ap-img" />
                <figcaption className="dm-ref-caption">네빌 브로디</figcaption>
              </figure>
              <figure className="dm-ap-thumb" data-fn="ap2">
                <img src="/image/사랑 쿨카르니.png" alt="사랑 쿨카르니" className="dm-ap-img" />
                <figcaption className="dm-ref-caption">사랑 쿨카르니</figcaption>
              </figure>
              <figure className="dm-ap-thumb" data-fn="ap3">
                <img src="/image/엠엠파리.png" alt="엠엠 파리" className="dm-ap-img" />
                <figcaption className="dm-ref-caption">엠엠 파리</figcaption>
              </figure>
              <figure className="dm-ap-thumb" data-fn="ap4">
                <img src="/image/하라 겐야.png" alt="하라 겐야" className="dm-ap-img" />
                <figcaption className="dm-ref-caption">하라 겐야</figcaption>
              </figure>
            </div>
            <p className="dm-body">안체 프로젝트는 AG 안상수체 탄생 40주년을 기념해 진행된 프로젝트로, 참여 디자이너들이 AG 안상수체의 모듈을 활용해 새로운 탈네모틀 한글꼴을 제작하고 안상수과 한글에 대한 각자의 생각을 담아내는 연구 프로젝트다. 연구소는 디자이너들이 11,172자의 한글 완성형 글자를 완성할 수 있도록 제작 전 과정을 지원한다.</p>
            <img 
              src="/image/안체프로젝트.png" 
              className="ap-sticker" 
              alt="안체프로젝트 바로가기" 
              style={{ cursor: 'pointer' }}
              onClick={(e) => {
                e.stopPropagation();
                setIsAncheOpen(!isAncheOpen);
              }}
            />
          </div>
        </section>
      </div>

      {/* 기본형태 오버레이 */}
      {agOpen && (
        <div className="ag-form-overlay is-open" onClick={handleAgOverlay}>
          <svg className="ag-overlay-svg" xmlns="http://www.w3.org/2000/svg" dangerouslySetInnerHTML={{ __html: agSvg }} />
          <div ref={agLeftRef} className="ag-caption-panel ag-caption-panel--left">
            <img src="/image/탈네모틀.svg" className="ag-caption-img" alt="탈네모틀" />
            <p className="ag-caption-text">(1) 탈네모틀<br/><br/>낱자를 조합하여 소리를 이루는 한글의 구조적 특징을 반영하여 네모틀을 벗어난 형태의 틀로, 네모틀의 상대적 개념.<br/><br/>초기에는 비네모틀, 탈사각틀이라는 표현이 혼재했으나 1990년대 이후 '탈네모틀'로 일반화되었다. 한글은 하나의 소리를 이루는 낱자의 종류가 적고, 조합 구조가 단순할수록 탈네모틀에 가까워진다.</p>
          </div>
          <div ref={agRightRef} className="ag-caption-panel ag-caption-panel--right">
            <img src="/image/네모틀.svg" className="ag-caption-img" alt="네모틀" />
            <p className="ag-caption-text">(2) 네모틀<br/><br/>전통 서법의 영향과 활자 조판의 편의성에서 비롯된 일정한 크기의 사각 모양 틀.<br/><br/>한글 창제 이후 1980년대까지 대부분의 한글 글자꼴은 일정한 네모의 틀 안에서 제작되었다. 지금까지도 네모틀은 전통적이며 전형적인 한글의 외형을 유지하는 대표적인 체계 요소이다.</p>
          </div>
        </div>
      )}

      {/* 밧줄 */}
      <div
        ref={ropeWrapRef}
        className="dm-rope-wrap"
        style={{ display: 'block', top: showRope ? '-40px' : '-300px', opacity: showRope ? 1 : 0, pointerEvents: showRope ? 'auto' : 'none', transition: 'top 0.8s cubic-bezier(0.3,0,0.2,1), opacity 0.6s ease' }}
      >
        <img ref={ropeImgRef} src="/image/밧줄.png" alt="밧줄" className="dm-rope" />
      </div>

      {/* 밧줄 오버레이 */}
      <div ref={overlayRef} className="rope-overlay" style={{ background: '#fff' }}>
        <div className="rope-content-box">
          <h2 className="rope-title">이런.일이.있었습니다.</h2>
          <div className="rope-columns">
            <div className="rope-col">
              <p className="rope-col-body">
                1949 · 공병우 —<br />빨랫줄 글자꼴<br /><br />
                1949년 세벌식 가로쓰기 타자기를 개발한 공병우는 '빨랫줄 글씨'를 탄생하게 했고, 이후 한글 타자기와 워드 프로세서에 사용되면서 탈네모틀 글자꼴의 원형이 되었다. 공속도 타자기에 의한 글자체는 글줄의 무게 중심선이 위에 있으며, 글자의 획수에 따라 글자 크기가 달라지는 조형적 특징을 가졌다. 이러한 '빨랫줄 글자꼴'은 이후 탈네모틀 글자꼴 연구에 큰 영향을 주었다.
              </p>
            </div>
            <div className="rope-col">
              <p className="rope-col-body">
                1976 · 조영제 —<br />탈네모틀 글자꼴 최초 학문적 제안<br /><br />
                탈네모틀 글자에 대한 연구는 1960년대 이후로 여러 가지 글자 표현으로 시도되었으나 조영제는 「한글 기계화(타자기)를 위한 구조의 연구」에서 글자꼴 구조에 대한 학문적 연구를 통해 처음으로 글자체에 적용하였다. 조영제의 탈네모틀 글자꼴 연구에서 글줄 기준선은 윗선에 맞춰져 있으며, 세벌식 타자기를 위해 디자인하여 낱자의 형태가 그대로 살아 있는 반면 낱글자의 형태를 네모틀 안에 국한하지 않고 자유롭게 취함으로써 글자의 밀도가 고르게 분포하도록 했다.
              </p>
            </div>
            <div className="rope-col">
              <p className="rope-col-body">
                1977 · 김인철 —<br />알파벳 기준선 응용<br /><br />
                1977년 김인철은 알파벳의 기준선을 응용하여 한글의 기준선을 만들고, 아래쪽에서 들쑥날쑥하게 하여 생긴 리듬감으로 한글의 가독성을 높이려고 시도했다. 일정한 기준에 따라 닿소리와 홀소리 글자가 모아지면서 가지런한 가로 글줄 균형선이 이루어지도록 하였다.
              </p>
            </div>
          </div>
        </div>
        <button className="rope-overlay-close">✕</button>
      </div>

      <AncheProjectModal isOpen={isAncheOpen} onClose={() => setIsAncheOpen(false)} />
    </motion.div>
  );
}
