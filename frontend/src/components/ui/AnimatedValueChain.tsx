"use client";

import React, { useEffect, useRef } from "react";

const ICONS: Record<string, React.ReactNode> = {
  factory: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M3 21V11l6 3.5V11l6 3.5V5h4v16z" />
      <path d="M7 18h2M12 18h2" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M2 6h11v10H2z" />
      <path d="M13 9h4l3 3v4h-7z" />
      <circle cx="6.5" cy="17.5" r="1.8" />
      <circle cx="16.5" cy="17.5" r="1.8" />
    </svg>
  ),
  pharma: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" />
    </svg>
  ),
};

const GEO = {"W":778,"H":961,"barcelona":[690.3,122.8],"afaq":[422.4,402.5],"casablanca":[377.9,438.3],"marrakech":[365.4,512.2],"agadir":[313.7,557.0],"strait":[446.5,343.7],"lblEs":[515.2,100.7],"lblMa":[496.0,539.5],"lblAtl":[345.8,367.3],"lblMed":[672.0,279.9],"lblStrait":[410.0,326.0],"via":[[640.0,214.5],[611.2,303.9],[505.6,337.8]]};

const steps = [
  { t: 'Fabricants européens', d: 'Partenariat exclusif avec les meilleurs laboratoires européens.', c: '#ff5d54', p: GEO.barcelona, i: 'factory' },
  { t: 'AFAQ Health', d: 'Expertise médicale, garant de la conformité réglementaire.', c: '#f6a935', p: GEO.afaq, i: 'shield' },
  { t: 'Dawa Maghreb', d: 'Distribution nationale, logistique rapide et fiable.', c: '#f2fff9', p: GEO.casablanca, i: 'truck', hub: true },
  { t: 'Pharmacies', d: "Réseau d'officines partenaires, conseil de proximité.", c: '#f6a935', p: GEO.marrakech, i: 'pharma' },
  { t: 'Consommateurs', d: 'La santé et le bien-être au centre de nos priorités.', c: '#ff5d54', p: GEO.agadir, i: 'heart' }
];

const STRAIT = GEO.strait;

export default function AnimatedValueChain() {
  const layoutRef = useRef<HTMLDivElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const trailRef = useRef<SVGPathElement>(null);
  const nodesRef = useRef<(SVGGElement | null)[]>([]);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  const capRef = useRef<SVGGElement>(null);
  const cbRef = useRef<SVGPathElement>(null);
  const stampRef = useRef<SVGGElement>(null);
  const fxRef = useRef<SVGGElement>(null);
  const spotCRef = useRef<SVGCircleElement>(null);
  const linkRef = useRef<SVGSVGElement>(null);
  const linkPathRef = useRef<SVGPathElement>(null);
  const linkDotRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const NS = 'http://www.w3.org/2000/svg';
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const layout = layoutRef.current;
    const wrap = wrapRef.current;
    const svg = svgRef.current;
    const route = routeRef.current;
    const trail = trailRef.current;
    const cap = capRef.current;
    const cb = cbRef.current;
    const stamp = stampRef.current;
    const fx = fxRef.current;
    const spotC = spotCRef.current;

    if (!layout || !wrap || !svg || !route || !trail || !cap || !cb || !stamp || !fx || !spotC) return;

    /* ---- smooth route through the real city coordinates (Catmull-Rom → Bézier) ---- */
    const pts = [steps[0].p, ...GEO.via, STRAIT, steps[1].p, steps[2].p, steps[3].p, steps[4].p];
    let d = 'M' + pts[0][0] + ',' + pts[0][1];
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i - 1] || pts[i];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;
      d += ' C' + (p1[0] + (p2[0] - p0[0]) / 6).toFixed(1) + ',' + (p1[1] + (p2[1] - p0[1]) / 6).toFixed(1) +
           ' ' + (p2[0] - (p3[0] - p1[0]) / 6).toFixed(1) + ',' + (p2[1] - (p3[1] - p1[1]) / 6).toFixed(1) +
           ' ' + p2[0] + ',' + p2[1];
    }
    route.setAttribute('d', d);
    trail.setAttribute('d', d);
    const total = route.getTotalLength();
    trail.style.strokeDasharray = total.toString();
    trail.style.strokeDashoffset = total.toString();

    /* ---- where each step sits along the route ---- */
    const nodeLen = steps.map(s => {
      let best = 0, bd = 1e9;
      for (let l = 0; l <= total; l += 1) {
        const q = route.getPointAtLength(l);
        const dd = (q.x - s.p[0]) * (q.x - s.p[0]) + (q.y - s.p[1]) * (q.y - s.p[1]);
        if (dd < bd) { bd = dd; best = l; }
      }
      return best;
    });
    nodeLen[nodeLen.length - 1] = total;

    /* ---- interaction: hover / focus / click pin ---- */
    let hoverIdx: number | null = null;
    let pin: number | null = null;
    function target() { return pin !== null ? pin : hoverIdx; }

    const activeNodes = nodesRef.current.filter(Boolean) as SVGGElement[];
    const activeCards = cardsRef.current.filter(Boolean) as HTMLElement[];

    function bind(el: HTMLElement | SVGElement, i: number) {
      const enter = () => { hoverIdx = i; if (reduce) jump(); };
      const leave = () => { hoverIdx = null; if (reduce) jump(); };
      const click = () => { pin = (pin === i) ? null : i; if (reduce) jump(); };
      el.addEventListener('pointerenter', enter);
      el.addEventListener('pointerleave', leave);
      el.addEventListener('click', click);
      return () => {
        el.removeEventListener('pointerenter', enter);
        el.removeEventListener('pointerleave', leave);
        el.removeEventListener('click', click);
      };
    }

    const unbinds: (() => void)[] = [];

    activeCards.forEach((c, i) => {
      unbinds.push(bind(c, i));
      
      const focus = () => { hoverIdx = i; if (reduce) jump(); };
      const blur = () => { hoverIdx = null; c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); if (reduce) jump(); };
      const keydown = (e: KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pin = (pin === i) ? null : i; if (reduce) jump(); } };
      const move = (e: PointerEvent) => {
        if (e.pointerType !== 'mouse') return;
        const r = c.getBoundingClientRect();
        const x = e.clientX - r.left, y = e.clientY - r.top;
        c.style.setProperty('--mx', x + 'px'); 
        c.style.setProperty('--my', y + 'px');
        c.style.setProperty('--ry', ((x / r.width) - .5) * 5 + 'deg');
        c.style.setProperty('--rx', (.5 - (y / r.height)) * 5 + 'deg');
      };
      const leave = () => { c.style.setProperty('--rx', '0deg'); c.style.setProperty('--ry', '0deg'); };

      c.addEventListener('focus', focus);
      c.addEventListener('blur', blur);
      c.addEventListener('keydown', keydown);
      c.addEventListener('pointermove', move);
      c.addEventListener('pointerleave', leave);

      unbinds.push(() => {
        c.removeEventListener('focus', focus);
        c.removeEventListener('blur', blur);
        c.removeEventListener('keydown', keydown as EventListener);
        c.removeEventListener('pointermove', move as EventListener);
        c.removeEventListener('pointerleave', leave);
      });
    });

    activeNodes.forEach((n, i) => {
      unbinds.push(bind(n, i));
    });

    /* ---- effects ---- */
    function burst(x: number, y: number, c: string) {
      if (!fx) return;
      for (let k = 0; k < 14; k++) {
        const el = document.createElementNS(NS, 'circle');
        el.setAttribute('cx', x.toString()); 
        el.setAttribute('cy', y.toString()); 
        el.setAttribute('r', (2 + Math.random() * 2.4).toFixed(1)); 
        el.setAttribute('fill', c);
        fx.appendChild(el);
        const a = k / 14 * Math.PI * 2 + Math.random() * .4;
        const dist = 40 + Math.random() * 40;
        const an = el.animate(
          [{ transform: 'translate(0px,0px)', opacity: 1 }, { transform: 'translate(' + Math.cos(a) * dist + 'px,' + Math.sin(a) * dist + 'px)', opacity: 0 }],
          { duration: 900 + Math.random() * 300, easing: 'cubic-bezier(.1,.7,.3,1)' }
        );
        an.onfinish = () => { el.remove(); };
      }
    }

    function stampIn() {
      if (!stamp || !wrap) return;
      stamp.classList.remove('show'); 
      void stamp.getBoundingClientRect(); 
      stamp.classList.add('show');
      wrap.classList.remove('shake'); 
      void wrap.offsetWidth; 
      wrap.classList.add('shake');
    }

    function drawLink(r: number) {
      if (r < 0 || window.innerWidth <= 1000) { if (linkRef.current) linkRef.current.style.opacity = '0'; return; }
      if (!layoutRef.current || !nodesRef.current[r] || !cardsRef.current[r] || !linkPathRef.current || !linkDotRef.current || !linkRef.current) return;
      
      const lb = layoutRef.current.getBoundingClientRect();
      const nbRing = nodesRef.current[r]?.querySelector('.ring') as Element | null;
      if (!nbRing) return;
      const nb = nbRing.getBoundingClientRect();
      const cardEl = cardsRef.current[r];
      if (!cardEl || !cardEl.parentNode) return;
      const cbx = (cardEl.parentNode as Element).getBoundingClientRect();
      
      const x1 = nb.right - lb.left + 4;
      const y1 = nb.top + nb.height / 2 - lb.top;
      const x2 = cbx.left - lb.left - 6;
      const y2 = cbx.top + cbx.height / 2 - lb.top;
      const mx = (x1 + x2) / 2;
      
      linkPathRef.current.setAttribute('d', 'M' + x1.toFixed(1) + ',' + y1.toFixed(1) + ' C' + mx.toFixed(1) + ',' + y1.toFixed(1) + ' ' + mx.toFixed(1) + ',' + y2.toFixed(1) + ' ' + x2.toFixed(1) + ',' + y2.toFixed(1));
      linkPathRef.current.style.stroke = steps[r].c;
      linkDotRef.current.setAttribute('cx', x2.toString());
      linkDotRef.current.setAttribute('cy', y2.toString());
      linkDotRef.current.style.fill = steps[r].c;
      linkRef.current.style.opacity = '.85';
    }

    function apply(r: number) {
      activeNodes.forEach((n, i) => { n.classList.toggle('on', i === r); n.classList.toggle('done', i < r); });
      activeCards.forEach((c, i) => { c.classList.toggle('on', i === r); c.classList.toggle('done', i < r); });
      const col = steps[Math.max(0, Math.min(r, steps.length - 1))].c;
      if (cb) cb.style.fill = col; 
      if (cap) cap.style.setProperty('--cc', col);
      if (r < 1 && stamp) stamp.classList.remove('show');
      drawLink(r);
    }

    /* ---- animation loop ---- */
    let t = 0, prevR = -2, last = performance.now(), endT = 0, visible = true;
    const startAt = last + 800;
    const SPEED = total / 8;
    let rafId: number;

    const onResize = () => drawLink(prevR);
    window.addEventListener('resize', onResize);
    unbinds.push(() => window.removeEventListener('resize', onResize));

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => drawLink(prevR));
    }

    function draw() {
      if (!route || !trail || !cap || !spotC) return;
      const p = route.getPointAtLength(t);
      const a = route.getPointAtLength(Math.min(total, t + 2));
      const b = route.getPointAtLength(Math.max(0, t - 2));
      const ang = Math.atan2(a.y - b.y, a.x - b.x) * 180 / Math.PI;
      cap.setAttribute('transform', 'translate(' + p.x.toFixed(1) + ' ' + p.y.toFixed(1) + ') rotate(' + ang.toFixed(1) + ') scale(1.5)');
      trail.style.strokeDashoffset = (total - t).toString();
      spotC.setAttribute('cx', p.x.toString()); 
      spotC.setAttribute('cy', p.y.toString());

      let r = -1; 
      for (let i = 0; i < nodeLen.length; i++) { 
        if (t >= nodeLen[i] - 16) r = i; 
      }
      
      if (r !== prevR) {
        if (r > prevR && !reduce) {
          burst(steps[r].p[0], steps[r].p[1], steps[r].c);
          if (prevR < 1 && r >= 1) stampIn();
        }
        apply(r);
        if (reduce && r >= 1 && stamp) stamp.classList.add('show');
        prevR = r;
      }
    }

    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min(.05, (now - last) / 1000); 
      last = now;
      if (!visible) return;
      
      const tg = target();
      if (tg !== null) {
        t += (nodeLen[tg] - t) * Math.min(1, dt * 4.5);
        endT = 0; 
        if (cap) cap.style.opacity = '1';
      } else if (now >= startAt) {
        if (t >= total - 1) {
          endT += dt;
          if (endT > 1.9) { t = 0; endT = 0; if (cap) cap.style.opacity = '1'; }
          else if (endT > 1.1) { if (cap) cap.style.opacity = '0'; }
        } else {
          let dn = 1e9; 
          for (let i = 0; i < nodeLen.length; i++) dn = Math.min(dn, Math.abs(nodeLen[i] - t));
          const k = Math.min(1, dn / 60);
          const f = .2 + .8 * k * k * (3 - 2 * k);
          t = Math.min(total, t + SPEED * f * dt);
        }
      }
      draw();
    }

    function jump() {
      const tg = target();
      t = tg !== null ? nodeLen[tg] : total;
      draw();
    }

    let observer: IntersectionObserver;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver((es) => { visible = es[0].isIntersecting; }, { threshold: 0 });
      observer.observe(svg);
    }

    if (reduce) {
      t = total; 
      if (trail) trail.style.strokeDashoffset = '0'; 
      draw();
    } else {
      rafId = requestAnimationFrame(frame);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (observer && svg) observer.unobserve(svg);
      unbinds.forEach(fn => fn());
    };
  }, []);

  return (
    <section className="animated-vc-section relative overflow-hidden ">
      <style dangerouslySetInnerHTML={{__html: `
        .animated-vc-section {
          --bg: #0e3532; 
          --bg2: #092624; 
          --ink: #effcf7; 
          --mute: #a9cfc5;
          --red: #ff5d54; 
          --amber: #f6a935; 
          --mint: #f2fff9;
          
          background: radial-gradient(900px 480px at 50% -8%, #1c5852 0%, transparent 65%),
                      radial-gradient(700px 400px at 90% 100%, #0b2e2b 0%, transparent 70%),
                      var(--bg);
          color: var(--ink);
          padding-bottom: 96px;
        }
        
        /* Layout */
        .animated-vc-section .stage { max-width: 1200px; margin: 0 auto; padding: 72px 24px 96px; }
        .animated-vc-section .head { text-align: center; }
        .animated-vc-section .eyebrow { margin: 0 0 12px; color: var(--amber); font-weight: 500; font-size: 15px; letter-spacing: .06em; }
        .animated-vc-section h1 { margin: 0; font: 600 clamp(36px, 5.2vw, 60px)/1.05 var(--font-outfit), system-ui, sans-serif; letter-spacing: -.01em; }
        .animated-vc-section .sub { margin: 18px auto 0; max-width: 54ch; color: var(--mute); font-size: 18px; line-height: 1.55; }

        .animated-vc-section .layout {
          position: relative; display: grid; grid-template-columns: minmax(0,1.15fr) minmax(0,1fr);
          gap: 56px; align-items: stretch; max-width: 1152px; margin: 48px auto 0;
        }
        .animated-vc-section .map-wrap { position: relative; width: 100%; max-width: 600px; justify-self: center; }
        .animated-vc-section .map-wrap svg { display: block; width: 100%; height: auto; overflow: visible; }
        .animated-vc-section .map-wrap.shake { animation: shake .4s ease-out; }
        @keyframes shake {
          0%{transform:translate(0,0)} 15%{transform:translate(-4px,3px)} 30%{transform:translate(4px,-3px)}
          45%{transform:translate(-3px,-2px)} 60%{transform:translate(3px,2px)} 100%{transform:translate(0,0)}
        }
        .animated-vc-section .land { animation: landIn 1.4s ease-out both; }
        @keyframes landIn { from{opacity:0} to{opacity:1} }
        .animated-vc-section .ctx { fill: rgba(255,255,255,.012); stroke: rgba(255,255,255,.1); stroke-width: 1; stroke-linejoin: round; }
        .animated-vc-section .land-label { font: 600 36px var(--font-outfit), sans-serif; fill: rgba(255,255,255,.09); }
        .animated-vc-section .sea { font: 400 13px var(--font-inter), sans-serif; fill: rgba(169,207,197,.6); }
        .animated-vc-section .strait { text-anchor: end; font: 400 13px var(--font-inter), sans-serif; fill: var(--mute); }

        .animated-vc-section .route-base { fill: none; stroke: rgba(255,255,255,.3); stroke-width: 2; stroke-linecap: round; stroke-dasharray: 2 9; animation: flow 1.1s linear infinite; }
        @keyframes flow { to{ stroke-dashoffset: -11; } }
        .animated-vc-section .trail { fill: none; stroke-width: 4; stroke-linecap: round; stroke-linejoin: round; }

        .animated-vc-section .ripple { fill: none; stroke: rgba(255,255,255,.55); stroke-width: 1.5; transform-box: fill-box; transform-origin: center; animation: ripple 3s ease-out infinite; }
        .animated-vc-section .ripple.r2 { animation-delay: 1.5s; }
        @keyframes ripple { 0%{transform:scale(.3);opacity:.9} 100%{transform:scale(3.4);opacity:0} }

        .animated-vc-section #cap { transition: opacity .5s; }
        .animated-vc-section #cap .cb { transition: fill .5s; }

        .animated-vc-section .node { cursor: pointer; }
        .animated-vc-section .node .ring { fill: var(--bg); stroke: var(--c); stroke-width: 2.5; }
        .animated-vc-section .node .fill { fill: var(--c); opacity: 0; transition: opacity .4s; }
        .animated-vc-section .node .halo { fill: none; stroke: var(--c); stroke-width: 2; opacity: 0; transform-box: fill-box; transform-origin: center; }
        .animated-vc-section .node text { fill: var(--c); font: 600 15px var(--font-outfit), sans-serif; text-anchor: middle; dominant-baseline: central; transition: fill .4s; pointer-events: none; }
        .animated-vc-section .node.hub text { font-size: 19px; }
        .animated-vc-section .node.done .fill { opacity: .22; }
        .animated-vc-section .node.on .fill { opacity: 1; }
        .animated-vc-section .node.on text { fill: #0b2b29; }
        .animated-vc-section .node.on .halo { animation: ping 1.8s ease-out infinite; }
        @keyframes ping { 0%{transform:scale(1);opacity:.8} 100%{transform:scale(2.4);opacity:0} }
        
        .animated-vc-section .orbit { fill: none; stroke: rgba(255,255,255,.4); stroke-width: 1.5; stroke-dasharray: 3 8; transform-box: fill-box; transform-origin: center; animation: spin 24s linear infinite; }
        @keyframes spin { to{ transform:rotate(360deg); } }

        .animated-vc-section .stamp { opacity: 0; transform-box: fill-box; transform-origin: center; }
        .animated-vc-section .stamp.show { animation: stampIn .55s cubic-bezier(.2,1.5,.4,1) forwards; }
        @keyframes stampIn { 0%{opacity:0;transform:scale(2.6)} 60%{opacity:1} 100%{opacity:1;transform:scale(1)} }
        .animated-vc-section .stamp rect { fill: rgba(9,38,36,.92); stroke: var(--amber); stroke-width: 2; }
        .animated-vc-section .stamp text { fill: var(--amber); font: 700 16px var(--font-outfit), sans-serif; text-anchor: middle; dominant-baseline: central; }
        .animated-vc-section .stamp path { fill: none; stroke: var(--amber); stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

        .animated-vc-section .link { position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; overflow: visible; opacity: 0; transition: opacity .3s; }
        .animated-vc-section .link path { fill: none; stroke-width: 2; stroke-dasharray: 3 7; stroke-linecap: round; animation: flow 1s linear infinite; }
        .animated-vc-section .link circle { transition: fill .3s; }

        .animated-vc-section .hint { margin: 22px 0 0; text-align: center; color: var(--mute); font-size: 14px; }

        /* Cards */
        .animated-vc-section .cards { list-style: none; margin: 0; padding: 0; display: grid; grid-template-rows: repeat(5,1fr); gap: 14px; }
        .animated-vc-section .cards li { display: flex; }
        .animated-vc-section .card {
          --c:#fff; --rx:0deg; --ry:0deg; --lift:0px; --mx:50%; --my:0%;
          position: relative; flex: 1; overflow: hidden; cursor: pointer; outline: none;
          display: grid; grid-template-columns: auto 1fr; column-gap: 18px; align-items: center;
          padding: 16px 22px; border-radius: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,.07), rgba(255,255,255,.02));
          border: 1px solid rgba(255,255,255,.11);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transform: perspective(900px) rotateX(var(--rx)) rotateY(var(--ry)) translateX(var(--lift));
          transition: transform .25s ease, border-color .4s, box-shadow .4s;
        }
        .animated-vc-section .card.hub { border-color: rgba(255,255,255,.24); }
        .animated-vc-section .card::before {
          content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .3s;
          background: radial-gradient(260px circle at var(--mx) var(--my), color-mix(in srgb,var(--c) 24%,transparent), transparent 65%);
        }
        .animated-vc-section .card:hover::before, .animated-vc-section .card.on::before { opacity: 1; }
        .animated-vc-section .card.on {
          --lift: -10px;
          border-color: color-mix(in srgb,var(--c) 75%,transparent);
          box-shadow: 0 18px 44px -22px var(--c);
        }
        .animated-vc-section .card:focus-visible { outline: 2px solid var(--c); outline-offset: 3px; }
        .animated-vc-section .card > * { position: relative; }
        .animated-vc-section .num {
          position: absolute; top: 50%; right: 18px; transform: translateY(-50%);
          font: 700 50px/1 var(--font-outfit), sans-serif;
          color: transparent; -webkit-text-stroke: 1px rgba(255,255,255,.18); transition: color .4s, -webkit-text-stroke-color .4s;
        }
        .animated-vc-section .card.on .num { -webkit-text-stroke-color: var(--c); color: color-mix(in srgb,var(--c) 20%,transparent); }
        .animated-vc-section .ico {
          display: grid; place-items: center; width: 46px; height: 46px; border-radius: 50%;
          border: 1.5px solid var(--c); color: var(--c); transition: background .4s, color .4s;
        }
        .animated-vc-section .ico svg { width: 22px; height: 22px; fill: none; stroke: currentColor; stroke-width: 1.8; stroke-linecap: round; stroke-linejoin: round; }
        .animated-vc-section .card.done .ico { background: color-mix(in srgb,var(--c) 16%,transparent); }
        .animated-vc-section .card.on .ico { background: var(--c); color: #0b2b29; }
        .animated-vc-section .txt { padding-right: 56px; }
        .animated-vc-section .card h2 { margin: 0 0 6px; font: 600 19px/1.2 var(--font-outfit), sans-serif; }
        .animated-vc-section .card p { margin: 0; color: var(--mute); font-size: 15px; line-height: 1.5; }

        @media (max-width: 1000px) {
          .animated-vc-section .stage { padding: 56px 16px 72px; }
          .animated-vc-section .layout { grid-template-columns: 1fr; gap: 28px; margin-top: 36px; }
          .animated-vc-section .map-wrap { max-width: 520px; }
          .animated-vc-section .cards { grid-template-rows: none; max-width: 560px; width: 100%; margin: 0 auto; }
          .animated-vc-section .card { --lift: 0px; }
          .animated-vc-section .card.on { --lift: 0px; transform: perspective(900px) translateY(-4px); }
          .animated-vc-section .link { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .animated-vc-section *, .animated-vc-section *::before, .animated-vc-section *::after { animation: none !important; transition: none !important; }
          .animated-vc-section .stamp.show { opacity: 1; }
        }
      `}} />

      <main className="stage">
        <header className="head">
          <p className="eyebrow">Notre processus</p>
          <h1>Chaîne de Valeur</h1>
          <p className="sub">De l'Espagne au Maroc — chaque étape est pensée pour garantir qualité, conformité et proximité.</p>
        </header>

        <div className="layout" id="layout" ref={layoutRef}>
          <div className="map-wrap" id="wrap" ref={wrapRef}>
            <svg id="map" ref={svgRef} viewBox="0 0 778 961" role="img" aria-label="Carte de l'Espagne et du Maroc entier (provinces du Sud comprises) avec le trajet des produits, de Barcelone à Agadir">
              <defs>
                <pattern id="avc-dots" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.3" fill="#ffffff" fillOpacity=".32"/></pattern>
                <pattern id="avc-dots2" width="10" height="10" patternUnits="userSpaceOnUse"><circle cx="5" cy="5" r="1.9" fill="#8ff0cf"/></pattern>
                <path id="avc-es" d="M48.5,652.3L46.9,651.4L45.1,652.4L43,654.9L40.3,654.4L39.4,654.8L39.7,656.1L40.7,656.9L43.1,657.2L44.3,658.6L45.5,659L45.9,657.4L47,656.2L47.2,655.4L48.5,653.4ZM129.2,645.7L128,644.5L127.5,641.9L127.8,639.6L126.8,639.7L126.9,640.9L126.1,641.2L118.2,640L118.5,641.2L118,642.2L118.1,643.1L116.8,644.8L114.7,646.2L114.5,648.9L115.6,651.7L117.1,653.1L118.9,654.6L122.3,655.7L123.5,654.5L126.3,653.6L128.7,651.4L128.3,649.7L129.2,648.4L128.8,646.9ZM71.3,639.5L68.5,638.2L66.9,638.5L66,639.9L65.8,642.5L66.9,644.1L69.4,645.4L70.9,644.9L73.2,643.1L73.7,642.4L73.1,640.8ZM95.1,640.6L95.4,638.4L97.3,634.6L97.1,632.9L97.4,632.2L99.3,630.9L101.4,628.3L104.7,626.3L105,625.3L104.3,624.9L102.3,625.6L98.7,625.3L98.5,625.9L95.7,627.2L95.3,628.2L92.6,630.7L90.7,631L90.1,631.5L87.5,631.5L84.2,632.8L82,631.9L79.5,633.2L81.7,636.5L82,638.5L83.3,640.1L83.8,641.4L85.5,643.2L86.6,646.1L90.2,645L91.3,645.2ZM178.1,620L177.1,619L176,618.6L173.1,619.6L171.6,624.7L168.3,630.3L166.3,635L165.6,638.1L161.9,641.2L158.8,642.4L156.9,642.3L156.6,643.5L159.1,643.5L161.8,644.2L163.2,643.6L166.7,639.9L169,638.8L173.9,637.8L174.9,637.2L177,632.4L177.8,631.3L177.4,628.7L178.3,626L178.4,621.3ZM53.7,618.8L52.8,617.9L52.6,616.3L51.2,615.2L49.9,615.7L47.6,614.9L44.9,617.7L44.7,618.8L45.6,619.6L46,621.6L48.6,626.3L49.1,628.8L50,629.5L52.5,625.1L52.9,623.5L52.3,621.4L53.7,619.5ZM189.9,600.7L189.3,600.9L187.6,604.6L184.4,605L182.7,606.3L179.8,607.3L178.2,609.6L177.8,612.5L176.8,613.7L177,614.6L179.5,615L180,615.5L182.1,612.8L185,612.3L185.9,611.4L188.5,610.5L189.9,608.8L190.3,606.5L190,604.8L191.4,602ZM188.3,601.4L189.1,600.8L189.5,599.9L189.2,599.2L188.5,599L187.5,601ZM597.6,277.2L597.1,275.7L597.4,273.8L596.8,272.7L596.7,272.8L596.9,276.4ZM671.4,237L671.4,236.1L670.9,235.4L669.6,236L668.4,235.3L666.6,232.8L666.2,233.9L665.6,233.8L665.1,234.6L665.4,234.9L665.1,237.4L666,237.2L667.5,235.8L669.6,237.1ZM672.7,221.5L672.2,219L670,217.9L667.2,218.5L665.7,219.5L664.2,219.5L662.2,221.3L662.4,224L660.4,224.2L659.8,224.6L660.1,225.1L659.7,227.4L661.1,228.6L661.9,227.9L662.6,228.6L663.8,228.4L664.7,229.6L665.7,229.6L666.1,227.2L667,226.3L667.5,226.8L669.1,225.6L670.1,224L671.2,223.3L671.8,221.9ZM714.6,217.8L715.6,217.9L716.2,217L716.2,215.1L714,216.5ZM730.9,191.6L728.1,190.2L726.2,191.7L724,191.7L722,190.9L721.2,190.1L720.8,188.3L722.8,187.3L723.4,185.7L721,186.4L719.8,186.2L719.9,184.9L720.5,185.1L723.7,183.1L723,183.1L722.5,182.5L719.2,183.9L714.7,184.8L711.8,186.6L710.8,186.6L707.5,188.8L705.7,190.8L705,190.8L703,193.2L701.4,193.7L699.8,195.4L696.2,197.4L696,198.9L697.3,201.1L698.4,200.5L698.8,201L699.3,200.5L700.2,201.4L699.8,201.8L700.6,203.3L701.4,203.2L703,200.7L705.8,199.4L706.6,199.6L708.6,201.1L709,201.9L708.4,203.6L708.8,203.9L709.2,206.2L710,207.2L711.2,207.7L715.5,207.7L716.5,208.4L716.8,209.6L718.7,211.6L724.9,206.8L725.4,205.1L725.8,205.4L726.1,203.1L727.1,201.1L729.8,198.2L729.7,196.9L731.3,195.4L732,191.7ZM563.3,38.1L563.4,36.1L562.8,35.7L559.2,38L559.9,38.6L559.4,38.9L558.1,38L553.6,39.7L552.7,40.4L552.2,39.8L551.2,40L550.5,39.2L546.3,39.6L541.9,37.7L541.3,36.8L535.6,34.9L535.1,35.2L534.7,36.9L533.9,34.4L532.2,33.2L526.5,34.1L526.7,34.7L523.9,36.5L524.5,39L521.9,36.9L520.6,37.4L516.2,35.3L512.2,34.4L510.8,34.6L510.5,34.1L510,34.9L508.7,34.1L509.8,33.1L511.1,33.4L511,32.5L508.6,32L507,31.1L507.1,30.3L506.3,30.3L501.5,32L501.5,32.6L500.6,32.3L501,33.8L500.1,33.2L498.8,34.3L498.2,34.4L498.4,34.1L497.8,33.5L500.2,32L498.3,31.2L496.5,32L494.7,32.1L493.6,32.9L494,33.5L493.4,33.8L492.4,33.2L491.9,33.8L489.7,33.9L486.8,35.2L481.3,35.5L480.7,36.2L479,35.4L477.4,36.2L476.5,35.4L469.3,34.7L462.7,32.3L461.6,32.9L459.4,32.2L459,32.4L457.9,31.7L455.1,31.5L451.2,29.4L449.4,29.4L448.9,30.2L447.6,30.8L447.3,30.5L448.3,29.2L448.2,28.6L439.1,28.4L438.5,27.4L438.1,28L435.1,24.4L433.5,23.9L433.2,24.8L431.8,25L431.8,27.2L428,27.2L426.6,28L423.1,27.7L421.7,26.8L418.7,28L415.4,28.4L413.8,27.7L414,28.6L412.5,29L409.7,27.7L408,27.6L406.3,28.5L404.1,28L398.6,28.1L396.8,28.6L395.4,32L395.1,31.2L395.8,29.6L395.4,28.4L394.3,28L393.7,28.4L389.9,28L388.1,28.4L388.6,27.5L387.1,26.7L385.1,23.1L381.1,21.1L379.5,20.8L378.4,21.6L378,21.4L377.1,22.7L376.3,19.9L374.7,21L374.5,20.2L375.4,19L374.9,18.1L374,19.5L370.8,21.2L370.4,21.7L370.6,22.3L369.8,22.1L369,22.3L369.6,23.3L369.3,23.6L367.7,23.5L368.2,22.9L368.8,22.9L369,21.4L369.7,21.4L368.6,19.4L367.7,19.3L365.4,21.4L362.9,21.8L362.4,23.2L363.1,24.1L362.7,24.8L363.1,24.8L362.4,24.9L362,24.1L357.4,27.7L356.4,28.2L354.8,28.1L355.5,29.6L355,30.2L354.7,30.1L354.1,32.3L355.6,32.3L356.6,31.4L357,31.7L356.6,32L359.4,31.4L359.1,32.2L355.6,32.7L355,33.2L356.3,34.3L359.2,34.8L358.1,35.9L358.1,39.3L356.2,36.1L354.2,35.2L353.5,37.7L352.4,36.1L350.6,36.6L349.2,37.5L348.6,38.5L346.9,39.3L345.8,38.8L342.6,40.2L340.2,39.6L338.7,38.3L337.9,38.2L333.2,40.6L334,41.1L334.5,42.1L335.5,42.3L335,42.7L333.3,43.1L332.4,42.6L331.9,43.8L331.1,44.4L329.6,44.7L328.4,44.2L327.4,44.8L325.8,46.2L326.1,47L327.6,46.5L327.6,46.9L329.4,46.5L329.4,46.8L328.3,47.1L326.7,48.5L325.8,48L324.5,50.4L323.9,50.6L324.1,51.7L324.8,52.3L323.5,56.4L324.2,57.8L325.3,55.9L325.9,55.7L326.1,56.3L326.5,56.2L326.5,55.2L327.4,56.2L328.5,56.6L328,58.1L328.3,59.3L329.6,60.3L329.2,61.1L328.5,61.2L329.6,63.6L330.6,63.5L331.3,62.7L331.2,62L334.4,62L335.6,61L335.7,60L336.4,60.4L336.1,62.1L335.3,62.3L331.8,65.8L330.5,70.6L331.7,71.4L332.4,73.5L333.4,72.6L333.8,71.4L335.3,70.7L334.8,70.2L336.3,69.1L336.2,69.6L336.6,70L337,69.7L337.7,68.7L337.4,68.3L337.9,66.9L339.7,68.7L340.7,68L341.4,66.6L340,70.3L338.5,71.8L338.8,74.7L338.4,75L338.4,76.5L336.8,76.1L337.3,75.5L336.6,75L334.6,76.1L336.4,76.7L337,78.5L337.8,79L340.6,78.8L342.6,77.4L343.8,77.4L340.1,81.6L338.2,81.7L338.3,83.6L338.1,84L337.5,83.3L337,85.4L339.7,85.2L343.2,83.5L344,81.9L344.8,81.4L344.9,83L339,87.9L338.7,88.9L337.7,89.5L338.4,90.1L338.4,90.8L336.1,91.3L336.6,101L337.1,101.2L339.9,99.1L340.8,97.8L343.3,96.4L344.7,94.2L346.5,94.1L348.8,92.9L353.7,92.1L357.7,89.8L358.3,90.9L358.3,93.4L358.7,93.8L360.4,93.3L361.8,94.7L361.3,96L359,97.9L357.4,100.5L357.7,102.1L359.1,102.9L359.1,104.6L361.8,104.7L363.2,104.3L365,102.3L366.6,102.2L367.2,100.4L367.8,100.1L368.1,102.5L369.1,102.5L369.6,101.8L373.7,100.8L375.6,101.8L377.4,101.9L376.9,103.2L377.4,103.9L379.3,103.7L380.3,102.2L381.8,102.8L382.6,104.8L384.3,103.2L386.5,103.1L389.8,101.6L390.5,100.7L390.4,98L392.1,97L395.2,98.9L397,97.9L398.6,98.9L401.4,98.9L402.2,98.4L402.4,97.1L403.4,97.3L404.5,99.1L405.5,99.4L408.9,99L409.3,98.1L410.5,98.9L410.4,101.5L412,102.1L410.3,107.6L411.5,111.1L412.7,111.3L414.1,110.3L417.1,110.9L420.1,112.4L422.2,114.9L419.9,118L419.7,119.3L418.5,121.7L416.7,122.3L416.7,123.1L416,123.1L415,124.7L412.9,126.6L410.8,127.7L408.1,127.8L406.2,130.9L404.6,132.4L404.3,134.5L403.1,136.4L401.8,137L399.8,136.8L399.1,137.1L398.6,138.5L400.5,141.3L401.4,143.9L402.7,145.2L402,145.9L401.9,149.4L402.7,154.1L401.6,156.8L402.8,159.7L401.4,162.7L401.6,164.1L403.4,166.3L402.8,167.3L401,168.9L400.7,170.1L400.1,170.6L398.3,170.6L396.3,171.8L395.4,173.7L396.3,176.3L398.2,176.9L400.6,180.9L399.2,184.7L399.1,187L396.8,189.5L397,190.7L396.1,194L390.9,194.8L389.3,194.3L385.9,194.9L379,194.6L380.3,198.2L382.4,200.5L383.4,201.1L384,202.3L386.8,203.8L386.2,206.8L386.3,208.6L388.8,211.6L388.3,213.2L389,214.6L391.4,215.7L391.8,216.5L391.4,217.7L391.8,218.4L392.7,218.7L393.9,218.1L395.6,218.2L397.3,220L397.2,221.5L397.7,222.1L396.1,225.1L394.7,226.6L395.1,227.4L395,228.7L393.4,229.8L392,230.1L387.8,234.2L387.4,237.3L388.1,238.4L386.6,240.9L385.7,243.5L386.1,244.5L385.3,245.4L386.7,246.3L391.5,252.5L392.7,255.8L393.5,256.5L394.8,256.4L396,255.5L397.9,255.2L398.5,255.6L396,262.7L392.9,262L391.7,263.7L390.9,264.1L389.7,263.9L388.1,264.5L388.2,265.7L387,269.7L386.1,271.2L382.6,274.5L381.7,278.3L380.3,279.7L379.9,281.6L381.8,284.8L383.5,296.2L384.6,296.7L386.3,295.9L394.1,295.7L392.7,295.3L393.6,294.9L399.1,297L398,294.6L399,294.6L401.5,292.1L399.4,295.3L400.2,297.3L405,299.9L412.8,305.6L413.7,306.5L416.4,311.6L417.5,311.6L417.7,311.2L417.8,307.9L419.7,306.9L420.3,307.4L421.1,307.4L422.6,306.7L421.7,307.9L419.1,307.7L418,308.6L417.7,312.1L414.9,313.9L414.8,314.6L416.2,318.5L416.6,319L419.7,319.4L421.3,320.9L421.6,323.5L423.1,323.4L421.4,325L420.6,323.4L419.5,322.4L418.9,322.6L419.9,323.5L421.8,327.8L422.9,329.1L423.7,331.7L425.4,332.6L427.6,336.2L429.3,336.7L431.5,336.5L435.3,340.4L438,341.4L438.7,341.1L440.6,342.3L441.2,343.5L446.8,341.3L447.1,340.6L446.6,337.9L447.2,336.6L448.6,336.9L449.3,338.2L450,338.2L450.1,336.3L451.7,333.4L451.5,332.8L452.7,332L454.8,327.4L457.3,326.7L458.8,325.8L461,325.6L463.9,323.7L469.7,324.2L471.7,323.6L473.1,322.7L474,321L476,320.7L478.9,315.5L479.9,315L485.6,315.4L489.3,314.9L491,314L494,314.9L498,313.9L501.4,315L505.6,314.2L507.2,315.4L508.3,315.1L509.5,316.1L511.5,316.1L514.3,314.1L517.5,313.8L525.2,314.5L526.9,313.9L528.4,314.6L529.7,315.9L530.5,315.4L532.6,316.7L533.8,316.7L535.7,316.1L537.1,314.8L538.3,311.5L538.9,311.2L541.4,310.7L542.9,311.3L545.2,310.5L547.8,311.5L550.3,314.5L551.5,314.8L552.7,314.5L553.6,313.3L554.5,312.9L555,311.5L556.4,310.1L557.2,307.9L560,306.3L559.8,304.4L561.4,300.9L562.8,295.6L565.5,292.6L567.3,289.4L567.9,289.4L568.3,288.6L572.3,286.5L572.9,286.8L573.7,284.6L578.4,281.3L580.4,281.5L581,280.6L583.1,281.3L583.5,282.1L585.4,282.5L585,281.5L586,280.6L589.6,280.8L591.2,281.6L592.4,280.8L597.5,279.7L598.2,279L598.1,278.1L597.6,277.7L597.3,278.2L596.6,278.1L594.9,277.1L593.4,274L594.8,272.9L595.6,270.8L596.5,271.9L596.5,269.2L597.8,265.9L599.9,264L600.2,258.9L600.8,257L601.9,255.9L604.3,255.7L604.7,255.2L604.2,251.5L604.5,249.8L605.6,249.9L606.1,248.9L607.6,248.8L608.2,246.8L610.3,244.5L615.1,242.1L618.4,241.6L618.9,241.1L619.4,238.7L620.3,238.1L623.4,237.9L623.5,236.6L625.4,235.6L626.5,234.1L628.3,233.3L628.1,232.2L626.3,231.1L626.7,230.8L625.7,229.7L619.8,227.5L617.4,225.3L615.7,222.6L613.5,218.1L613.1,215.9L613.9,215.2L611.2,209.4L610.3,204.9L610.5,201.4L612.6,197.2L614.1,195.2L614.6,193.1L617.9,187.6L620.7,184.1L622.1,181.1L622.9,179.9L625.4,177.9L627.4,174.1L632,169.3L634.2,165L635.1,164.1L635.3,163.1L636.8,160.9L638.8,156.5L640,155.5L642.6,154.6L644.2,154.6L643.1,156.5L642,157.1L641.3,156.6L639.8,156.8L640.5,158L642.5,157.5L645.9,153.5L647.9,152.9L648.3,152.4L648.8,150.7L647.7,150.5L645.3,148.3L644.8,148.2L645.4,148.9L644.8,149.1L643,148.2L643.7,147L648.9,141.1L653.4,137L655.9,136.2L657.3,136.1L658.3,136.7L659.8,134.7L670.1,131.2L672.8,131L679,129.1L685.4,127.9L689,126.3L690.9,124L693.4,120.1L696.7,118.3L699.2,116.4L709.7,111.7L710.1,110.6L710.8,110.6L711.7,109.6L714.7,108.8L715.2,107.9L719,105.1L719.3,103.9L720.5,103L721.6,103.1L724.2,98.8L724.3,97.9L723.5,96.9L723.1,95L723.7,93.5L722.3,91.6L720.7,90.4L720.6,87L721,86.1L722.2,85.2L723.5,86.1L725.2,86.1L727,82.5L726.2,82L725.2,82.2L724.8,81.6L723.3,81.8L722.8,81.3L722.2,79.3L722.6,77.8L719.6,78L718.5,77.5L717.7,76.3L716.3,76.1L715.7,76.5L714.7,76.1L713.6,76.9L712,77.1L710,78.6L706.9,78.9L705.3,80.3L706,81.8L702.3,81.2L701.3,82.4L699.1,81.2L698.3,79.9L696.8,79.6L693.7,77.9L690.7,78.6L689.2,78.5L686.8,81L685.1,81.4L683.6,80.6L682.5,77.6L680.6,77.1L678.2,75.6L676.2,75.3L675.4,74.7L674.8,75.2L673.7,75L673.3,76.3L670.2,77L669.3,77.9L667.1,77.7L665.8,75.4L667.2,74.6L666.5,73.5L665.8,73.5L666.5,70.7L664.4,66.7L663.6,66.4L663.8,65.7L659.1,65.5L657.6,65.8L655.6,63L652.3,62.6L651.2,61.9L650.3,62.4L646.8,60.4L643.4,59.7L641.8,60.1L641.3,62.9L641.6,63.4L641.1,64.2L642.1,65.5L641.8,66.6L635.7,66.5L633.9,66.9L633.3,66.8L632.1,65.4L629.6,67.5L628.4,65.7L626.2,65L619.6,66.8L617,65.4L615.8,63.5L615.6,62L613.3,62.4L612.9,61.6L610.5,59.9L610.1,60.7L609.5,60.5L607.2,62.2L606.3,62.2L603.7,61.4L603.7,62.5L602.6,63L602.1,61.9L601.3,61.8L600.1,59.6L597.1,58.1L596.5,55.4L595.6,55.1L593.2,55.5L590.6,55.3L589.4,54.9L587.9,53.6L585.2,52.7L584,52.8L581.9,51.3L579.4,50.6L578.7,49.4L579.6,48.2L578.9,48.1L577.7,49L577.1,51.6L575.7,51.7L574.2,51.1L573.2,49.4L575.2,47.1L576,44L575.9,42.4L575,41.4L573.9,41.6L570.9,40.6L570,42L568.9,42.2L568.4,41.8L568.2,40.2L566.9,39.7L564.9,40.3L564.6,39.1ZM758.3,183.7L756.9,183.3L757.5,183.1L757.3,181.8L754.5,179.6L754.3,178.5L753.4,180.2L753.3,179.3L752.2,177.9L750.8,178.8L746.1,179.1L745.3,178.8L743.1,179.3L742.7,179.8L742.8,181.2L744,181.9L743.4,183.9L744.6,184.4L748.2,183.9L756.7,188.9L758.4,188.7L758.5,185.9L759.6,186.8ZM683.1,76.9L684.8,77.3L684.1,75.9L683.8,75.4Z"/>
                <path id="avc-ma" d="M76.4,877.2L74.6,891.4L73.5,897.2L75,900.4L74.3,895.7L78.1,881L204.3,881L201.8,840.9L199.8,834.2L199.5,832L199.9,829.7L201,827.5L204.3,822.8L217,814L225.5,812.2L232.5,808.8L235.8,807.9L236.2,807.4L236.3,718.1L342.8,717.9L343,621.9L343.4,620.2L351,615.5L353,612.7L354.7,611.9L359,608.3L363.6,606L366.6,603.2L377,595.4L385.6,595.6L388.5,592.5L392.1,591L398.1,591L403.7,593.3L406.4,590.7L410.9,590.2L415.6,588.9L420.1,588.4L428.8,588.4L436.6,587.1L437.7,590.5L440.4,591.5L443.5,590.5L446.9,586.1L452,577.1L455.2,573.7L464.8,566.2L472.8,562.3L477.3,558.7L480.9,554L484,552.2L487.8,551.2L492.7,550.9L498.1,549.6L504.1,546.5L503.7,541.8L505.3,540.3L507.1,537.4L505.3,534.6L504.8,532.5L502.7,531L501.4,529.2L500.8,529L498.9,530.4L497.9,530L497.8,529.4L498.7,527.5L498.7,523.1L500.9,521.3L503.2,521.2L503.7,511.5L505.9,510.3L508.4,510.5L517.8,508.8L524.7,506.7L530.3,506L526.8,496.4L528.6,495.3L534.5,494.8L540.3,493.2L580.8,495.1L582.1,494.8L582.7,493.5L582.5,492.7L581.4,492L579,492.5L578.9,491.9L579.9,490.6L581,484.7L581.8,483.4L584.9,482.4L587.8,479.5L587.3,478.6L578.3,471.7L576.3,471L575.3,470.1L570.9,462.8L572.7,461.2L572.8,458L570.5,456L568.8,452.8L567.2,451.2L566.9,446.1L569.2,440.3L569,439L567.6,435.6L565.1,434L564.9,433.4L566.3,431.1L565.8,425.8L567.4,418.8L564.9,410.7L562.9,407.5L566.3,403.3L564.8,402.8L560.9,398.8L564.1,393.4L563.6,392.6L557.4,388.3L556.3,385.9L554.8,385.8L550.6,382.9L549.7,381.1L549.7,379.6L548,378.8L543.5,377.2L540.2,379.2L535.5,378.8L532.4,377.5L528.7,373.4L529,374.6L532.9,378.5L529.4,377.9L527.8,376.3L527.6,373.8L528,372.9L526.5,370.1L526,368.4L526.3,366.1L525.8,365.6L523.3,370.8L522.3,371.8L521,371.5L518.6,373.7L514.6,375.2L511.6,375.3L505.9,373.9L503.2,371.8L502.4,371.7L500.9,372.7L500.3,374.5L499.6,374.9L495.9,374.7L495.1,373.5L495.7,373.1L495.4,372.6L488.6,375.1L484.2,375.8L482.3,377L480.8,377.1L468.1,373.6L465.1,371.2L463.7,370.7L461.2,367.9L458.7,366.7L456,362.8L452.8,360.1L451.9,356.2L451,356.2L450.6,355.5L449.7,350.4L450.1,349.2L451.5,348.1L451.7,347.2L450.9,347.7L449.1,346.7L447.8,346.7L447.5,347.3L446.5,347L445.8,347.3L443.5,349.6L441.6,350.8L440.3,350.2L438.6,350.3L436.2,351.9L431.7,351.8L430.8,353L430.3,356.2L428.4,361.2L428,363.4L422.2,378.2L419.5,387.7L410.9,405.7L407.4,411L402.5,420.4L399.1,424L395.8,426.7L393.6,428L389.5,429.6L385.5,432.5L383.8,432.4L379.9,436L377.4,437L375.4,436.8L374.4,438L369,440.1L368.3,441L361.4,443.8L355.7,445.4L352.7,448.6L350.3,450.2L347.9,450L344.9,453.6L344.7,455.4L340.6,459.9L337,464.8L332.8,468L329.2,472.3L324.5,476.4L323.9,478.2L324.9,480.3L324.8,481.1L323.5,484.9L324.3,485.7L323.9,490.8L322.3,493.3L321.1,497.2L317.3,501.1L316.6,502.4L311.4,508.3L310.6,512.3L308.2,515.8L307.4,518.1L305.7,520.7L306.9,522L307,522.9L305.7,531.2L306.3,533.2L306.4,541.3L306.8,542.2L306.6,543.5L304.4,547.4L304.4,548.8L304.8,549.4L306.3,549.6L308.5,551.1L309.4,552.4L310.4,552.8L311.5,555.9L313.2,557.9L313.3,559.6L311.8,568.2L309.8,573L306.6,578.8L299.1,587.6L298.2,590.5L296.3,593.9L295.1,594.8L292.4,599.2L291.1,599.7L289.7,601.2L286.4,606.3L282.4,610L266.8,618.7L260.3,626L258.4,627.3L257.9,628.6L254.3,633.4L253.3,634.2L236.1,641.7L234.8,642.8L226.1,644.3L220.4,646.2L215.7,646.1L210,647.1L206.9,648.3L205.8,649.2L204.7,652.5L203.4,654.8L199.3,657.5L197.1,665.4L195.4,669.5L194.9,669.7L195.2,670.5L191.9,675.8L189.4,685.3L186.8,691.1L185,693.3L175.2,700L171.3,702L167,702.8L165.9,704.5L163.2,707.1L160,708.4L157.9,711L157,713.2L157.4,714.8L157.2,717.3L156.4,720.1L152.9,725.6L151.6,728.9L150.9,732.4L149.9,734.8L147.8,737.5L146.6,741.7L145.6,745.8L146.3,751.6L145.8,753.8L146,756.2L144.1,763.7L140.8,766.9L140.3,768.8L138.6,770L135.9,770.8L134.3,772.1L131.3,776.4L126.6,780.7L126.1,781.8L124.3,783.2L121,787.6L116.2,789.9L113.9,791.9L110.7,796.4L108.7,800L108.5,800.6L109,800.9L110.7,799.1L112.4,795.1L113.2,794.3L114.2,794.2L115.3,793.5L116,791.6L116.1,795.9L114.2,799.5L111.8,802.1L110.2,804.9L109.4,807.9L108,810.4L106.9,811.4L104.3,817.2L102.8,818.6L102,820.1L101.8,820.8L103.7,820.5L103.8,822.9L102.2,825.6L101.2,826.5L99.5,826.9L99.1,828L99.3,829.2L98,832L97.4,837.9L95.1,840.4L93.9,845L92.7,846.6L88.6,848.6L87.7,847.9L86.2,848.5L82.7,853.5L79.3,860.4L78.2,864.1L77.9,865.6L78.5,866.7L77.8,868.5L77.9,870.6Z"/>
                <radialGradient id="avc-spotGrad"><stop offset="0" stopColor="#fff" stopOpacity="1"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient>
                <mask id="avc-spot" maskUnits="userSpaceOnUse" x="0" y="0" width="778" height="961">
                  <rect width="778" height="961" fill="#000"/>
                  <circle ref={spotCRef} id="spotC" cx="-999" cy="-999" r="120" fill="url(#avc-spotGrad)"/>
                </mask>
                <linearGradient id="avc-fadeG" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#fff"/><stop offset="0.9521" stopColor="#fff"/><stop offset="1" stopColor="#000"/>
                </linearGradient>
                <linearGradient id="avc-fadeL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity="1"/><stop offset="1" stopColor="#000" stopOpacity="0"/></linearGradient>
                <linearGradient id="avc-fadeR" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#000" stopOpacity="0"/><stop offset="1" stopColor="#000" stopOpacity="1"/></linearGradient>
                <linearGradient id="avc-fadeT" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="1"/><stop offset="1" stopColor="#000" stopOpacity="0"/></linearGradient>
                <mask id="avc-fade" maskUnits="userSpaceOnUse" x="0" y="0" width="778" height="961">
                  <rect width="778" height="961" fill="url(#avc-fadeG)"/>
                  <rect x="0" y="0" width="26" height="961" fill="url(#avc-fadeL)"/>
                  <rect x="694" y="0" width="84" height="961" fill="url(#avc-fadeR)"/>
                  <rect x="0" y="0" width="778" height="70" fill="url(#avc-fadeT)"/>
                </mask>
                <linearGradient id="avc-trailG" gradientUnits="userSpaceOnUse" x1="0" y1="122.8" x2="0" y2="557.0">
                  <stop offset="0" stopColor="#ff5d54"/><stop offset=".3" stopColor="#f6a935"/><stop offset=".55" stopColor="#f2fff9"/><stop offset=".78" stopColor="#f6a935"/><stop offset="1" stopColor="#ff5d54"/>
                </linearGradient>
                <filter id="avc-glow" x="-20%" y="-10%" width="140%" height="120%">
                  <feGaussianBlur stdDeviation="4" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
                </filter>
              </defs>

              <g className="land" mask="url(#avc-fade)">
                <path className="ctx" data-c="FRA" d="M576.6,13.8L573.5,27.5L569.7,33.6L567.6,35.5L564.8,35.9L564,36.5L563.4,36.1L563.3,38.1L564.6,39.1L564.9,40.3L566.9,39.7L568.2,40.2L568.4,41.8L568.9,42.2L570,42L570.9,40.6L573.9,41.6L575,41.4L575.9,42.4L576,44L575.2,47.1L573.2,49.4L574.2,51.1L575.7,51.7L577.1,51.6L577.7,49L578.9,48.1L579.6,48.2L578.7,49.4L579.4,50.6L581.9,51.3L584,52.8L585.2,52.7L587.9,53.6L589.4,54.9L590.6,55.3L593.2,55.5L595.6,55.1L596.5,55.4L597.1,58.1L600.1,59.6L601.3,61.8L602.1,61.9L602.6,63L603.7,62.5L603.7,61.4L606.3,62.2L607.2,62.2L609.5,60.5L610.1,60.7L610.5,59.9L612.9,61.6L613.3,62.4L615.6,62L615.8,63.5L617,65.4L619.6,66.8L626.2,65L628.4,65.7L629.6,67.5L632.1,65.4L633.3,66.8L633.9,66.9L635.7,66.5L641.4,66.8L642.1,66.2L641.9,64.8L641.1,64.2L641.6,63.4L641.3,62.9L641.8,60.1L644,59.8L646.8,60.4L650.3,62.4L651.2,61.9L652.3,62.6L655.6,63L657.6,65.8L659.1,65.5L663.8,65.7L663.6,66.4L664.4,66.7L666.5,70.7L667.2,70.4L667.7,68.7L670.2,68.3L672.3,69.7L675.9,70L675.6,70.9L677.3,72.1L675.9,72.7L675.6,75.1L678.2,75.6L680.6,77.1L682.5,77.6L683.6,80.6L684.7,81.4L686.5,81.2L689.2,78.5L690.7,78.6L693.7,77.9L696.8,79.6L698.3,79.9L699.1,81.2L701.3,82.4L702.3,81.2L706,81.8L705.3,80.3L706.9,78.9L710,78.6L712,77.1L713.6,76.9L714.7,76.1L715.7,76.5L716.3,76.1L717.7,76.3L718.5,77.5L719.6,78L722.6,77.8L722.4,76.7L721.4,75.2L721.2,73.7L718.9,73L718.5,72.4L718,66.9L718.6,57.1L718,55.5L720.4,48.4L724.6,43.4L727,41.5L729.1,40.6L731.3,40.4L732.6,41L733.2,40.7L736.7,36.6L740.5,34.9L746.9,29.6L748.5,28.8L752.2,28.8L753.1,29.6L752.6,30.6L753.1,31.6L754.6,32.7L761.9,33.4L765.2,33L766.6,33.6L767.6,34.7L766.9,36.7L770.1,37.8L775,37.8L775.1,36.9L772.6,34.5L772.1,33L772.1,29.8L771,27.6L772,28.6L772.6,30L772.6,33.3L773.1,34.5L775.5,36.3L776.2,38L777.6,36.9L776.6,37L776,35.4L776.3,34.8L778.5,33.7L779,34L779,-1L579.2,-1ZM684.1,75.9L684.8,77.3L683.1,76.9L683.8,75.4Z"/>
                <path className="ctx" data-c="MLI" d="M756.1,955.7L728.3,961.3L726.7,961.2L724,958.8L721.9,957.8L720.7,956.7L720.1,955.4L721.3,953L722.4,952L723,949.5L724.8,948.2L725.1,947.4L724,945L724.2,943.8L723.2,941.8L723.7,933.6L723.2,932.7L715.1,928.6L701.3,926.1L697.6,924.7L694.9,920.5L691.2,917.3L690,917.2L687.1,919.3L683.4,917.9L681.3,918.7L680.2,916.6L677.7,916.2L673.9,913.1L673.4,908.8L670.7,906.2L664.4,904.2L662.3,901.6L657.7,901.4L657.4,899.4L658.6,892.6L657.5,889L573.3,829.6L466.5,753.5L409.8,753.6L432.3,962L756.1,962Z"/>
                <path className="ctx" data-c="DZA" d="M773.4,308L767.4,308.2L766.4,308.6L762.9,307.5L759.1,308L757.2,307.5L755.5,308.3L753.9,307.8L752.2,308.6L749.8,308L747.1,308.2L744.8,307.3L740.5,308.3L737.6,311L732.2,312.9L727.7,312.7L724.1,311.5L723.5,313.6L722.5,314.2L721.3,314.3L720.1,313.9L717.3,311.5L714.7,311.6L712,313.8L710.2,316.2L704,320.1L699.1,320.3L697.7,320L696.7,318.6L695.3,318.4L686.7,321.1L683.9,321.5L680.2,321.2L678.5,321.7L677.2,321.5L675.7,322L667.3,322.8L664.6,322L661.3,323.3L658.5,323.5L656.5,324.4L654.2,324.4L651.1,325.8L650.4,327.2L648.5,328.8L646.5,329.3L644.9,330.3L641.4,330.7L639.8,332.1L638.6,332.5L635.2,334.9L631.8,335.6L631.1,337.5L629.9,338.4L627.8,339.1L624.9,341.7L621.9,349.2L619.6,351.1L618.1,351.9L616.2,352L611.7,350.5L611.1,350L611.1,348.6L609.6,347.4L607.4,348.3L605.5,348.1L605.5,349.3L604.1,352.5L603.5,352.9L602.3,352.8L601.9,353.9L600.8,354.7L598.6,354.8L598,353.9L595.9,353.4L595.1,352.7L594.4,352.9L593.6,354.2L592.4,355L591.3,354.6L587.7,356.3L584.1,360.2L582.9,360.5L580.9,365.1L580.2,367.8L579.4,368.8L578.2,369.4L577,370.7L572.5,371.5L568.7,374.8L568.4,375.5L560,376.4L564.4,378L562.8,378.1L558.2,380.1L557.2,379.8L555.1,380.1L551.8,379.1L549.7,379.6L549.7,381.1L550.6,382.9L554.8,385.8L556.3,385.9L557.4,388.3L564.2,393.1L560.9,398.8L564.8,402.8L566.3,403.3L562.9,407.5L564.9,410.7L567.4,418.8L565.8,425.8L566.3,431.1L564.9,433.4L565.1,434L567.6,435.6L569,439L569.2,440.3L566.9,446.1L567.2,451.2L568.8,452.8L570.5,456L572.8,458L572.7,461.2L570.9,462.8L575.3,470.1L576.3,471L578.3,471.7L587.3,478.6L587.8,479.5L584.9,482.4L581.8,483.4L581,484.7L579.9,490.6L578.9,491.9L579,492.5L581.4,492L582.5,492.7L582.7,493.5L582.1,494.8L580.8,495.1L540.3,493.2L534.5,494.8L528.6,495.3L526.8,496.4L530.3,506L524.7,506.7L517.8,508.8L508.4,510.5L505.9,510.3L503.7,511.5L503.2,521.2L500.9,521.3L498.7,523.1L498.7,527.5L497.8,529.4L497.9,530L498.9,530.4L500.8,529L501.4,529.2L502.7,531L504.8,532.5L505.3,534.6L507.1,537.4L505.3,540.3L503.7,541.8L504.1,546.5L498.1,549.6L492.7,550.9L487.8,551.2L484,552.2L480.9,554L477.3,558.7L472.8,562.3L464.8,566.2L455.2,573.7L452,577.1L446.9,586.1L443.5,590.5L440.4,591.5L437.7,590.5L436.6,587.1L428.8,588.4L420.1,588.4L415.6,588.9L410.9,590.2L406.4,590.7L403.7,593.3L398.1,591L392.1,591L388.5,592.5L385.6,595.6L377,595.4L366.6,603.2L363.6,606L359,608.3L354.7,611.9L353,612.7L351,615.5L343.4,620.2L343,621.9L343,671.9L444.3,738.4L461,749.7L657.5,889L658.6,892.6L657.4,899.4L657.7,901.4L662.3,901.6L664.4,904.2L670.7,906.2L673.4,908.8L673.9,913.1L677.7,916.2L680.2,916.6L681.3,918.7L683.4,917.9L687.1,919.3L690,917.2L691.2,917.3L694.9,920.5L697.6,924.7L701.3,926.1L715.1,928.6L723.2,932.7L723.7,933.6L723.2,941.8L724.2,943.8L724,945L725.1,947.4L724.8,948.2L723,949.5L722.4,952L721.3,953L720.1,956L721.2,957.3L724,958.8L726.7,961.2L728.3,961.3L779,951.1L779,310.3Z"/>
                <path className="ctx" data-c="AND" d="M675.9,72.7L677.3,72.1L675.6,70.9L675.9,70L672.3,69.7L670.2,68.3L667.7,68.7L667.2,70.4L666.5,70.7L666.2,71.4L666.4,72.1L665.8,73.5L666.5,73.5L667.1,74L667.2,74.6L665.8,75.4L666.8,77.4L669.3,77.9L670.2,77L673.3,76.3L673.8,74.9L675.1,75.1Z"/>
                <path className="ctx" data-c="PRT" d="M77.5,473.7L81.7,473.8L83,473.3L84.8,470.5L87.3,469.5L83.3,468.9L79.4,466.3L74.6,467.3L70.9,465.1L68.9,466.8L68.8,468L69.9,469.8L72.2,471.5ZM96.7,459L98.4,457.8L100,458L99.5,456.1L97.9,456.2L96.6,458.3L96.1,458.5ZM393.4,229.8L395,228.7L395.1,227.4L394.7,226.6L396.1,225.1L397.7,222.1L397.2,221.5L397.3,220L395.6,218.2L393.9,218.1L392.7,218.7L391.8,218.4L391.4,217.7L391.8,216.5L391.4,215.7L389,214.6L388.3,213.2L388.8,211.6L386.3,208.6L386.2,206.8L386.8,203.8L384,202.3L383.4,201.1L382.4,200.5L380.3,198.2L379,194.6L385.9,194.9L389.3,194.3L390.9,194.8L396.1,194L397,190.7L396.8,189.5L399.1,187L399.2,184.7L400.6,180.9L398.2,176.9L396.3,176.3L395.4,173.7L396.3,171.8L398.3,170.6L400.1,170.6L400.7,170.1L401,168.9L402.8,167.3L403.4,166.3L401.6,164.1L401.4,162.7L402.8,159.7L401.6,156.8L402.7,154.1L401.9,149.4L402,145.9L402.7,145.2L401.4,143.9L400.5,141.3L398.6,138.5L399.1,137.1L399.8,136.8L401.8,137L403.1,136.4L404.3,134.5L404.6,132.4L406.2,130.9L408.1,127.8L410.8,127.7L412.9,126.6L415,124.7L416,123.1L416.7,123.1L416.7,122.3L418.5,121.7L419.7,119.3L419.9,118L422.2,114.9L420.1,112.4L417.1,110.9L414.1,110.3L412.7,111.3L411.5,111.1L410.3,107.6L412,102.1L410.4,101.5L410.5,98.9L409.3,98.1L408.9,99L405.5,99.4L404.5,99.1L403.4,97.3L402.4,97.1L402.2,98.4L401.4,98.9L398.6,98.9L397,97.9L395.2,98.9L392.1,97L390.4,98L390.5,100.7L389.8,101.6L386.5,103.1L384.3,103.2L382.6,104.8L381.8,102.8L380.3,102.2L379.3,103.7L377.4,103.9L376.9,103.2L377.4,101.9L375.6,101.8L373.7,100.8L369.6,101.8L369.1,102.5L368.1,102.5L367.8,100.1L367.2,100.4L366.6,102.2L365,102.3L363.2,104.3L361.8,104.7L359.1,104.6L359.1,102.9L357.7,102.1L357.4,100.5L359,97.9L361.3,96L361.8,94.7L360.4,93.3L358.7,93.8L358.3,93.4L358.3,90.9L357.7,89.8L353.7,92.1L348.8,92.9L346.5,94.1L344.7,94.2L343.3,96.4L340.8,97.8L340.4,99.4L337,102.5L336.7,103.4L336.6,107.7L337.2,109.1L339,109.5L342.5,108.4L341,109.5L338.3,110.1L338.2,110.5L340,119.2L339.7,122.4L341,125.2L341.2,128.6L342.9,132.4L344.1,132.7L343.5,133.5L343.8,139.4L340.8,153.8L341.9,151.5L342.7,147.5L343.2,146.6L343.6,147L343.8,145.7L344.1,146.6L342.9,148.3L343.4,149.8L344.3,150.2L346.5,149.5L345.5,150.3L343.6,150.8L343.5,151.3L344.3,152.1L343.6,153.1L342.5,153L342.7,154.1L342.1,153.8L341,155.3L341,154.1L340.7,154.3L337.1,169.7L335.7,172.8L336.1,174.4L338.7,175.1L339.7,176.3L338.4,176.2L337.5,175.4L337,176L330.5,194.6L329.9,198.8L328.5,201.4L326.9,202.4L325.4,204.5L326.2,205.6L325.8,205.9L325.1,205.4L324.5,205.4L321.5,207.5L319.7,207.2L321.5,209.7L321.9,211.7L321.6,214.6L319.3,219.5L318.8,221.5L319.3,225.5L318.2,228.9L316.9,230.5L317.3,233.2L317.1,234.7L317.7,234.9L319.8,234.9L322.5,236.3L323.7,235.1L325.8,235.3L329.2,234.5L329.7,233.5L329.6,229.7L334.9,221L338,220.4L340.3,218.7L338.4,220.7L335.7,221.2L334.6,222.1L332.4,226.3L333.2,228.9L334,228.9L333.8,229.5L334.6,231.9L332.1,234L331.1,235.3L329.2,235.9L329.4,236.7L328.2,235.8L324.7,236.5L326.9,241.1L326.7,244.4L325.4,245.8L325.4,246.6L326.4,246.8L328.1,246L331.2,245.7L333.1,244.9L332.8,244.7L334.2,243L335.8,242.7L339.6,244L339.8,243L338.8,242.1L339.4,241.9L340.1,240.6L340.6,240.6L340.4,241.7L341.2,242.3L340.7,243.7L341.2,245.2L343.6,246.3L345.4,246.6L343.8,247.1L340.6,246.2L339.2,246.3L339.2,245.7L337,244.8L335.9,243.8L335.1,243.5L334.6,244L336.7,245.3L339.4,249L340,256L338.7,261.1L337,264.7L336.2,265.5L338.5,266.6L339,267.6L339.3,269.9L338.7,274.1L338.9,274.8L340.7,274.5L340.6,275.5L339.2,275.9L338.4,279.8L339.3,282.4L338.7,287.2L338,289.5L336.6,291.5L337.1,292.8L336.6,294.6L335.3,295.9L335.6,297.1L333.3,301.4L332.9,303.1L333.3,302.9L334.5,303.6L336.7,302.1L337.3,302.3L340.9,300.6L342.8,300.6L344.3,299.2L346.2,299L350.8,300.6L353.1,300L355.4,300.8L359.1,300.4L363.7,302.4L365.5,304.5L365.1,303.4L366.1,303.8L366.4,303.4L370.6,304L380.4,297.1L382.5,296.7L383.8,297.3L384,296.8L383.1,294.4L382.6,288.4L381.8,284.8L380.3,282.7L379.8,281.1L380.3,279.7L381.7,278.3L382.6,274.5L386.1,271.2L387,269.7L388.2,265.7L388.1,264.5L389.7,263.9L390.9,264.1L391.7,263.7L392.9,262L396,262.7L398.5,255.6L397.9,255.2L396,255.5L394.8,256.4L393.5,256.5L392.7,255.8L391.5,252.5L386.7,246.3L385.3,245.4L386.1,244.5L385.7,243.5L386.6,240.9L388.1,238.4L387.4,237.3L387.7,234.5L388.1,233.5L392,230.1Z"/>
                <path className="ctx" data-c="NER" d="M756.1,955.7L756.1,962L779,962L779,951.1Z"/>
                <path className="ctx" data-c="MRT" d="M98.9,935.8L97.3,937.6L96.1,940.2L97.8,937.6L99.1,936ZM97.7,931.1L96.7,933L96.3,932.5L95.8,932.7L95.2,933.9L95.2,935.1L94,937.3L94.3,939.2L95,940.2L97.1,936.1L98,931.5ZM409.8,753.6L466.5,753.5L444.3,738.4L343,671.9L343,717.4L342.2,718.1L236.3,718.1L236.2,807.4L235.8,807.9L232.5,808.8L225.5,812.2L217,814L204.3,822.8L201,827.5L199.9,829.7L199.5,832L199.8,834.2L201.8,840.9L204.3,881L78.1,881L77.8,881.3L76.6,887.6L74.3,895.7L75,900.4L75.9,897.4L75.2,895.7L76.7,894.8L76.9,891.8L76.5,892L76.3,891.4L79.4,887L80.9,890.2L82.7,892.9L83.1,894.6L83.6,895L84,894.6L86.1,900.3L87.3,901.4L87.7,902.8L87.3,903.5L88.9,904.5L91.4,907.5L91.9,906.2L91.9,901.4L92.8,901.8L93.4,903.6L95.7,903.6L93.8,904.4L94.5,904.9L95.1,904.6L95.2,906.1L96.3,907.2L97.9,911.6L97.7,912.4L98.5,913.1L99.4,915.3L100.2,916.4L101.2,916.7L102.3,918.7L102,920.6L101.1,921.9L100.4,922L101.8,924.6L101.7,926.5L98.8,930.4L99,930.9L100.3,929.5L100.9,929.9L100.6,931.2L100.6,931.8L101.3,931.3L100.9,932.5L101.3,933.6L96.5,941.1L95.3,942.1L95,943.4L93.8,944.8L93.9,946.6L94.7,946.6L95.2,944.2L97.1,942.3L97.6,942L96.3,944.8L99,942.1L99.7,942.2L99.7,942.6L97.3,946.5L95.8,947.4L94,947.6L92.1,947.1L91.7,947.7L92.6,948.7L93.8,951.8L97,953.1L99.8,956.1L101.2,958.5L102.5,962L432.3,962Z"/>
                
                <use href="#avc-es" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.22)" strokeWidth="1" strokeLinejoin="round"/>
                <use href="#avc-ma" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.22)" strokeWidth="1" strokeLinejoin="round"/>
                <use href="#avc-es" fill="url(#avc-dots)"/>
                <use href="#avc-ma" fill="url(#avc-dots)"/>
                <g mask="url(#avc-spot)">
                  <use href="#avc-es" fill="url(#avc-dots2)"/>
                  <use href="#avc-ma" fill="url(#avc-dots2)"/>
                </g>
                <text className="land-label" id="lblEs" textAnchor="middle" x={GEO.lblEs[0]} y={GEO.lblEs[1]}>Espagne</text>
                <text className="land-label" id="lblMa" textAnchor="middle" x={GEO.lblMa[0]} y={GEO.lblMa[1]}>Maroc</text>
                <text className="sea" id="lblAtl" textAnchor="middle" x={GEO.lblAtl[0]} y={GEO.lblAtl[1]}>Océan Atlantique</text>
                <text className="sea" id="lblMed" textAnchor="middle" x={GEO.lblMed[0]} y={GEO.lblMed[1]}>Méditerranée</text>
              </g>

              <circle className="ripple" id="rip1" r="9" cx={STRAIT[0]} cy={STRAIT[1]}/>
              <circle className="ripple r2" id="rip2" r="9" cx={STRAIT[0]} cy={STRAIT[1]}/>
              <text className="strait" id="lblStrait" textAnchor="end" x={GEO.lblStrait[0]} y={GEO.lblStrait[1]}>Détroit de Gibraltar</text>

              <path ref={routeRef} id="route" className="route-base" d=""/>
              <path ref={trailRef} id="trail" className="trail" d="" stroke="url(#avc-trailG)" filter="url(#avc-glow)"/>

              <g id="nodes">
                {steps.map((s, i) => {
                  const r = s.hub ? 28 : 22;
                  return (
                    <g 
                      key={i} 
                      ref={el => { nodesRef.current[i] = el; }}
                      className={`node ${s.hub ? 'hub' : ''}`} 
                      data-i={i} 
                      style={{ '--c': s.c } as React.CSSProperties} 
                      transform={`translate(${s.p[0]} ${s.p[1]})`}
                    >
                      {s.hub && <circle className="orbit" r="46"/>}
                      <circle className="ring" r={r}/>
                      <circle className="fill" r={r}/>
                      <circle className="halo" r={r}/>
                      <text>0{i + 1}</text>
                    </g>
                  );
                })}
              </g>

              <g id="stampPos" transform={`translate(${steps[1].p[0]+120} ${steps[1].p[1]+46}) rotate(-8)`}>
                <g ref={stampRef} id="stamp" className="stamp">
                  <rect x="-72" y="-20" width="144" height="40" rx="8"/>
                  <path d="M-56 0l6 6 11-12"/>
                  <text x="10" y="1">Conforme</text>
                </g>
              </g>

              <g ref={fxRef} id="fx"></g>

              <g ref={capRef} id="cap" style={{ '--cc': '#ff5d54' } as React.CSSProperties}>
                <g className="capbody">
                  <path d="M0,-7H-9a7,7 0 0 0 0,14H0Z" fill="#ffffff"/>
                  <path ref={cbRef} className="cb" d="M0,-7H9a7,7 0 0 1 0,14H0Z" fill="#ff5d54"/>
                  <path d="M-8,-3.4H7" stroke="#ffffff" strokeOpacity=".55" strokeWidth="1.5" strokeLinecap="round"/>
                </g>
              </g>
            </svg>
          </div>

          <ol className="cards" id="cards">
            {steps.map((s, i) => (
              <li key={i}>
                <article 
                  ref={el => { cardsRef.current[i] = el; }}
                  className={`card ${s.hub ? 'hub' : ''}`} 
                  tabIndex={0} 
                  data-i={i} 
                  style={{ '--c': s.c } as React.CSSProperties}
                >
                  <span className="num" aria-hidden="true">0{i + 1}</span>
                  <span className="ico">{ICONS[s.i]}</span>
                  <span className="txt">
                    <h2>{s.t}</h2>
                    <p>{s.d}</p>
                  </span>
                </article>
              </li>
            ))}
          </ol>

          <svg className="link" id="link" ref={linkRef} aria-hidden="true">
            <path id="linkPath" ref={linkPathRef} d=""/>
            <circle id="linkDot" ref={linkDotRef} r="4"/>
          </svg>
        </div>
      </main>
    </section>
  );
}
