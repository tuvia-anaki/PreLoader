(function(){
  if (document.getElementById('wave-preloader-global')) return;

  // Inject HTML
  document.body.insertAdjacentHTML("afterbegin", `
    <div id="wave-preloader-global" aria-hidden="true">
      <svg class="wave-shape" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path d="M0,170 C360,240 1080,100 1440,170 L1440,320 L0,320 Z"></path>
      </svg>
      <style>
        #wave-preloader-global {
          position:fixed; inset:0; z-index:9999;
          background:#FFFFFF;
          display:flex; flex-direction:column; justify-content:flex-end;
          overflow:hidden; pointer-events:none;
        }
        #wave-preloader-global .wave-shape { width:100%; height:42vh; }
        #wave-preloader-global path { fill:#212121; }
      </style>
    </div>
  `);

  // Load GSAP from CDN
  const gsapScript = document.createElement('script');
  gsapScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js";
  gsapScript.onload = initWavePreloader;
  document.head.appendChild(gsapScript);

  function initWavePreloader(){
    const root = document.getElementById('wave-preloader-global');
    if (!root) return;
    const path = root.querySelector('path');

    const SHAPE1 = "M0,180 C360,260 1080,80 1440,180 L1440,320 L0,320 Z";
    const SHAPE2 = "M0,140 C360,60 1080,280 1440,140 L1440,320 L0,320 Z";
    const SHAPE3 = "M0,170 C360,240 1080,100 1440,170 L1440,320 L0,320 Z";

    gsap.timeline({ repeat:-1, yoyo:true })
      .to(path, { duration:2.2, ease:"sine.inOut", attr:{ d: SHAPE1 }})
      .to(path, { duration:2.2, ease:"sine.inOut", attr:{ d: SHAPE2 }})
      .to(path, { duration:2.2, ease:"sine.inOut", attr:{ d: SHAPE3 }});

    function finish(){
      const tl = gsap.timeline({ onComplete: ()=> root.remove() });
      tl.to(path, {
        duration:1, ease:"power3.inOut",
        attr:{ d: "M0,0 C360,0 1080,0 1440,0 L1440,320 L0,320 Z" }
      })
      .to(root, { yPercent:-100, duration:1.2, ease:"power4.inOut" }, "-=0.8");
    }

    window.addEventListener('load', finish, { once:true });
    setTimeout(finish, 5000);
  }
})();
