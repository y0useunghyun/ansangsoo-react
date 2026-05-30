
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
  