// GVT NAVIGATOR ON THE GO — the studio's in-page footage tool (marketing/studio/studio.js) on a page with NO server behind
// it: built by design/navigator-0911/nav/mknav.py, injected at the LAST </body> of the deployed client by stage_nav.py.
// The take sink is the File System Access API (a save dialog at RECORD, one write per chunk, close at STOP) with an in-memory
// Blob + a download as the fallback; the voice stem downloads at STOP. Takes land on the laptop running the page.
//
// WHAT IT DOES
//   · Layout: the game shows its WHOLE world (no scrolling) in the top of the window; a studio
//     strip lives in the game's own bottom "chin" band (GVT.chin) with the monitor + controls.
//   · Render: the game canvas gets a high-res backing store (K backing px per world px, K =
//     1920 / band height ≈ 3.56) and every frame a 9:16 window of it is blitted 1:1 into a
//     1080×1920 record canvas — the same framing as the 8/25 portrait masters (band 36–576).
//   · HUD off: the blit happens at drawHUD's doorstep, so the top bar, tray, hints, coach and
//     announce cards never land in the recording (the 8/25 render hack, minus the clip).
//   · Hand off: S.drag / S.sel / S.jetAim are lifted out of the world pass (no ghost, no ring,
//     no deploy shade, no jet arc in the recording) and drawn back for the operator after the blit.
//   · The recording is the record canvas alone (canvas.captureStream + MediaRecorder H.264):
//     no DOM, no cursor, ever. Chunks stream to server.mjs → takes/<stamp>_<scene>.mp4.
//   · Camera: the 8/25 heat-window director (jet > ball > boss > heat > front), camera-only,
//     or manual (← → / wheel over the monitor). Nothing in the game's own camera is touched.
(() => {
  if (window.__ST) return;
  const ST = window.__ST = {
    on: false, hud: false, hand: false, cursor: true, audio: true, voice: false, auto: true, panel: true, vf: true,
    mic: null, micSrc: null, micGain: null, micAn: null, voiceDest: null, vrec: null, vq: null, micDev: '', micLabel: '',
    frame: 'portrait', zoom: 'normal', K: 3.5556, strip: 0,
    cam: { x: 0, y: 0, tx: null, ty: null, prio: 99, holdUntil: 0, src: '', heat: 0, lastF: 0 },
    frames: 0, fps: 0, gaps: 0, lastDraw: 0, rec: null, take: null, q: Promise.resolve(), bytes: 0, t0: 0, err: 0,
  };
  const OUTS = { portrait: { w: 1080, h: 1920 }, landscape: { w: 1920, h: 1080 } };
  const BANDS = { normal: [36, 576], tight: [96, 536], wide: [0, 600] };   // world y-window the tall frame shows
  const ZOOMS = ['normal', 'tight', 'wide'];
  const CAM_EVENT_SPD = 620, CAM_IDLE_SPD = 220;   // world px/s — the portrait rig's dials
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const now = () => performance.now() / 1000;
  const hyp = (a, b, c, d) => Math.hypot(a - c, b - d);
  const segDist = (px, py, x1, y1, x2, y2) => { const dx = x2 - x1, dy = y2 - y1, L2 = dx * dx + dy * dy; const t = L2 ? clamp(((px - x1) * dx + (py - y1) * dy) / L2, 0, 1) : 0; return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy)); };

  // ---------- geometry ----------
  const OUT = () => OUTS[ST.frame];
  const band = () => BANDS[ST.zoom];
  const WW = () => (S.bf ? WORLD_W : W);
  const gameCam = () => { const c = S.bf ? S.bf.cam : ((W > VW && S.cCam) || null); return { x: c ? c.x : 0, y: c ? (c.y || 0) : 0 }; };
  const cropW = () => { const b = band(), bh = b[1] - b[0]; return ST.frame === 'portrait' ? bh * OUT().w / OUT().h : bh * 16 / 9; };
  function cropRect() {   // logical screen coords (world minus the game's own camera)
    const b = band(), bh = b[1] - b[0], cw = cropW(), g = gameCam();
    const x = clamp(ST.cam.x, 0, Math.max(0, WW() - cw)) - g.x;
    const y = clamp(b[0] + ST.cam.y - g.y, 0, Math.max(0, H - bh));
    return { x, y, w: cw, h: bh };
  }
  function setK() { const b = band(); ST.K = Math.min(4.5, OUT().h / (b[1] - b[0])); }

  // ---------- layout: the whole world on screen, the strip in the chin ----------
  function stripWanted() {
    if (!ST.panel) return 0;
    const ww = window.innerWidth, wh = window.innerHeight;
    const gameH = Math.min(wh, (ww / WW()) * H);          // width-limited world height
    return Math.round(clamp(Math.max(wh * 0.4, wh - gameH - 8), 260, wh * 0.62));
  }
  function stResize() {
    const want = stripWanted();
    if (Math.abs(want - ST.strip) > 2) { ST.strip = want; layoutStrip(); GVT.chin(want); return; }   // chinApply dispatches resize → back here with the chin set
    const ww = window.innerWidth, wh = window.innerHeight - chinPx();
    const w = WW();
    scale = Math.min(ww / w, wh / H);
    VW = w;                                                // the WHOLE world — the game's camera clamps to 0
    const K = ST.K;
    cv.width = Math.round(VW * K); cv.height = Math.round(H * K);
    cv.style.width = (VW * scale) + 'px'; cv.style.height = (H * scale) + 'px';
    cx.setTransform(K, 0, 0, K, 0, 0);
    if (S.bf) { S.bf.cam.x = clampCam(S.bf.cam.x); S.bf.cam.y = clampCamY(S.bf.cam.y || 0); }
    else if (S.cCam) { S.cCam.x = clampCam(S.cCam.x); S.cCam.y = clampCamY(S.cCam.y || 0); }
  }

  // ---------- the record canvas ----------
  const rc = document.createElement('canvas'); rc.id = 'st-rc';
  const rcx = rc.getContext('2d', { alpha: false });
  function sizeRc() { const o = OUT(); if (rc.width !== o.w || rc.height !== o.h) { rc.width = o.w; rc.height = o.h; } layoutStrip(); }
  let blitted = false;
  function blit() {
    if (blitted) return; blitted = true;
    const K = ST.K;
    if (ST.frame === 'landscape' && ST.hud) {              // the whole desktop frame with its HUD, letterboxed
      rcx.fillStyle = '#000'; rcx.fillRect(0, 0, rc.width, rc.height);
      const s = Math.min(rc.width / cv.width, rc.height / cv.height), dw = cv.width * s, dh = cv.height * s;
      rcx.drawImage(cv, 0, 0, cv.width, cv.height, (rc.width - dw) / 2, (rc.height - dh) / 2, dw, dh);
      return;
    }
    const r = cropRect();
    rcx.drawImage(cv, r.x * K, r.y * K, r.w * K, r.h * K, 0, 0, rc.width, rc.height);
  }

  // ---------- draw / drawHUD wrappers ----------
  const _draw = draw, _drawHUD = drawHUD;
  let stash = null;
  function liftHand() {
    if (ST.hand || !(S.drag || S.sel || S.jetAim)) return null;
    const st = { drag: S.drag, sel: S.sel, jet: S.jetAim };
    S.drag = null; S.sel = null; S.jetAim = null;
    return st;
  }
  function restoreHand() { if (!stash) return; S.drag = stash.drag; S.sel = stash.sel; S.jetAim = stash.jet; }
  drawHUD = function () {
    if (!ST.hud) { try { blit(); } catch (e) { ST.err++; } restoreHand(); }
    return _drawHUD.apply(this, arguments);
  };
  draw = function () {
    const t = performance.now();
    if (ST.on && ST.lastDraw && t - ST.lastDraw > 40) ST.gaps++;
    ST.lastDraw = t; ST.frames++;
    blitted = false;
    stash = liftHand();
    try { _draw(); } finally { restoreHand(); }
    try {
      if (!blitted) blit();                                // HUD in the take: the whole frame
      handOverlay(stash); stash = null;
      if (ST.vf) viewfinder();
      camFrame();
    } catch (e) { ST.err++; }
  };
  window.addEventListener('resize', stResize);
  resize = stResize;                                        // startBattlefield/startCampaign call resize() by name

  // the operator still sees his hand — drawn back after the blit, world space (the game's own lines)
  function handOverlay(st) {
    if (!st) return;
    const g = gameCam();
    cx.save(); cx.translate(-g.x, -g.y);
    try {
      if (st.sel) ring(st.sel.x, st.sel.y, st.sel.def.minRng ? 200 : (st.sel.def.rng || st.sel.def.auraR || 0), 'rgba(255,255,255,0.10)', 'rgba(255,255,255,0.7)');
      const d = st.drag;
      if (d) {
        if (!S.bf && (S.tanBase || (S.raid && S.raid.cfg === S.cfg) || S.park)) {
          const dpx = campDeployX(), q9 = quiltField() && !PF_PATCH;
          cx.fillStyle = q9 ? 'rgba(143,134,173,0.16)' : 'rgba(166,59,42,0.07)'; cx.fillRect(dpx, 64, W - dpx - 4, WORLD_H - 64 - 88);
          cx.strokeStyle = q9 ? '#8f86ad' : 'rgba(255,243,196,0.4)'; cx.lineWidth = q9 ? 3 : 2; cx.setLineDash(q9 ? [12, 10] : [10, 10]);
          cx.beginPath(); cx.moveTo(dpx, 70); cx.lineTo(dpx, WORLD_H - 92); cx.stroke(); cx.setLineDash([]);
        }
        const ok = d.unit ? true : canPlace(d.x, d.y, d.type, S.bf ? bfMyTeam() : undefined);
        const def = UDEF[d.type];
        const rr2 = def.minRng ? 200 : (def.rng || def.auraR || (def.ram ? def.ramR * 1.7 : 0));
        ring(d.x, d.y, rr2, ok ? 'rgba(255,255,255,0.10)' : 'rgba(166,59,42,0.15)', ok ? 'rgba(255,255,255,0.7)' : 'rgba(220,90,70,0.9)');
        drawSprite(d.type, d.x, d.y, unitW(d.type), 0, 0, unitImg(d.type, S.bf ? bfMe() : null), S.bf && bfMyTeam() === 'foe');
        cx.globalAlpha = 0.25; cx.fillStyle = '#000'; cx.beginPath(); cx.ellipse(d.x + 26, d.y + 30, 60, 24, 0.4, 0, 7); cx.fill(); cx.globalAlpha = 1;
      }
      if (st.jet) {
        const js = jetSarge();
        if (js) {
          const L = jetResolve(js, st.jet.moved ? st.jet.x : null, st.jet.moved ? st.jet.y : null);
          cx.fillStyle = 'rgba(255,243,196,0.9)';
          for (let i = 1; i <= 12; i++) { const q = i / 13, sm = q * q * (3 - 2 * q); const px = js.x + (L.x - js.x) * sm, py = js.y + (L.y - js.y) * sm - JET_H * 4 * q * (1 - q); cx.beginPath(); cx.arc(px, py, 2.4, 0, 7); cx.fill(); }
          cx.globalAlpha = 0.35; cx.fillStyle = 'rgba(255,243,196,0.5)'; cx.beginPath(); cx.ellipse(L.x, L.y, 10, 4, 0, 0, 7); cx.fill(); cx.globalAlpha = 1;
          cx.strokeStyle = 'rgba(255,243,196,0.85)'; cx.lineWidth = 2.5; cx.beginPath(); cx.arc(L.x, L.y - 4, 16, 0, 7); cx.stroke();
        }
      }
    } catch (e) { ST.err++; }
    cx.restore();
  }

  // the viewfinder: the take's window drawn on the operator's canvas (never in the take)
  function viewfinder() {
    if (ST.frame === 'landscape' && ST.hud) return;
    const r = cropRect();
    cx.save(); cx.setTransform(ST.K, 0, 0, ST.K, 0, 0);
    cx.fillStyle = 'rgba(0,0,0,0.13)'; cx.beginPath(); cx.rect(0, 0, VW, H); cx.rect(r.x, r.y, r.w, r.h); cx.fill('evenodd');
    cx.lineWidth = 2; cx.setLineDash([]);
    cx.strokeStyle = ST.on ? 'rgba(255,64,64,0.95)' : 'rgba(255,255,255,0.8)'; cx.strokeRect(r.x, r.y, r.w, r.h);
    const L = 18; cx.lineWidth = 4;
    for (const [px, py, sx, sy] of [[r.x, r.y, 1, 1], [r.x + r.w, r.y, -1, 1], [r.x, r.y + r.h, 1, -1], [r.x + r.w, r.y + r.h, -1, -1]]) {
      cx.beginPath(); cx.moveTo(px, py + sy * L); cx.lineTo(px, py); cx.lineTo(px + sx * L, py); cx.stroke();
    }
    if (ST.on) { cx.fillStyle = 'rgba(255,64,64,0.95)'; cx.beginPath(); cx.arc(r.x + 14, r.y + 14, 6, 0, 7); cx.fill(); }
    cx.restore();
  }

  // ---------- camera director (the 8/25 driver's, camera-only) ----------
  const C = ST.cam;
  const CAMPm = () => !S.bf;
  const live = () => S.mode === 'play' && (S.bf ? (!S.bf.resolved && !S.bf.ending) : !!S.cfg);
  const myUnits = () => CAMPm() ? S.units.filter(u => !u.dead) : S.units.filter(u => !u.dead && u.side === 'you');
  const foeUnits = () => CAMPm() ? (S.foes || []).filter(f => !f.dead) : S.units.filter(u => !u.dead && u.side === 'foe');
  const mySarge = () => CAMPm() ? S.units.find(u => !u.dead && u.type === 'sarge') : S.units.find(u => !u.dead && u.type === 'sarge' && u.seat === S.bf.mySeat);
  const RK = [];   // recent kills {t,x,y}
  const alive = new Map();
  function killTick() {
    const cur = new Set();
    for (const u of S.units) { if (u.dead) continue; cur.add(u.id); alive.set(u.id, { x: u.x, y: u.y }); }
    if (CAMPm()) for (const f of (S.foes || [])) { if (f.dead) continue; const k = 'f' + f.id; cur.add(k); alive.set(k, { x: f.x, y: f.y }); }
    for (const [id, s] of alive) if (!cur.has(id)) { alive.delete(id); RK.push({ t: now(), x: s.x, y: s.y }); }
    if (RK.length > 60) RK.splice(0, RK.length - 60);
  }
  function heatWindow() {
    const cw = cropW(), BIN = 40, nb = Math.ceil(WW() / BIN) + 1, heat = new Float32Array(nb), hy = new Float32Array(nb);
    const add = (x, y, w) => { const b = Math.max(0, Math.min(nb - 1, Math.round(x / BIN))); heat[b] += w; hy[b] += w * y; };
    const t = now();
    for (const u of S.units) if (!u.dead) add(u.x, u.y, u.side === 'nem' ? (u.k === 'kingrex' ? 6 : 2.5) : (u.type === 'sarge' ? 1.0 : 0.55));
    for (const p of (S.fires || [])) add(p.x, p.y, 3 * Math.max(0.2, 1 - (p.t || 0) / (p.life || 5)));
    for (const b of (S.gboul || [])) if (b && b.x != null) add(b.x, b.y, 2.5);
    if (CAMPm()) for (const f of (S.foes || [])) if (!f.dead) add(f.x, f.y, f.boss ? 4 : 0.7);
    if (S.shots) for (const sh of S.shots) if (sh && sh.x != null) add(sh.x, sh.y || 300, 1.4);
    for (let i = RK.length - 1; i >= 0; i--) { const k = RK[i]; const age = t - k.t; if (age > 2.5) { RK.splice(i, 1); continue; } add(k.x, k.y, 4.5 * (1 - age / 2.5)); }
    const sc = S.bf && S.bf.soccer;
    if (sc && !sc.gone && sc.clk >= sc.at && sc.x != null) add(sc.x, sc.y || 300, 5);
    const tr = S.bf && S.bf.train;
    if (tr && tr.cars) for (const c of tr.cars) if (!c.off) add((c.fx + c.bx) / 2, (c.fy + c.by) / 2, 1.2);
    for (const b of ((S.cfg && S.cfg.terrain && S.cfg.terrain.balls) || [])) add(b.x, b.y, 0.8);
    const win = Math.max(1, Math.round(cw / BIN));
    let best = 0, bestI = 0, run = 0;
    for (let i = 0; i < nb; i++) { run += heat[i]; if (i >= win) run -= heat[i - win]; if (run > best) { best = run; bestI = i; } }
    if (best <= 0) return null;
    let wy = 0, ww = 0; for (let i = Math.max(0, bestI - win + 1); i <= bestI; i++) { wy += hy[i]; ww += heat[i]; }
    const x0 = (bestI - win + 1) * BIN;
    return { x: x0 - (cw - win * BIN) / 2, y: ww ? wy / ww : WORLD_H / 2, heat: best };
  }
  function camTarget(t) {
    const cw = cropW(), bf = S.bf, mine = myUnits(), foes = foeUnits();
    const paras = S.units.filter(u => u.para && u.side === 'foe' && !u.dead && (u.jetT > 0 || (u.landT && t - u.landT < 3)));
    for (const u of paras) if (!(u.jetT > 0) && !u.landT) u.landT = t;
    if (paras.length) { const mx = paras.reduce((a, u) => a + u.x, 0) / paras.length, my = paras.reduce((a, u) => a + u.y, 0) / paras.length; return { x: mx - cw * 0.5, y: my - 300, prio: 0, hold: 1.6, src: 'para' }; }
    const sg = mySarge();
    if (sg && sg.jetT > 0) return { x: sg.x - cw * 0.5, y: sg.y - 300, prio: 0, hold: 1.2, src: 'jet' };
    if (CAMPm()) {
      const boss = foes.find(f => f.boss);
      if (boss) {
        let nm = null, nd = 1e9;
        for (const u of mine) { const d = hyp(u.x, u.y, boss.x, boss.y); if (d < nd) { nd = d; nm = u; } }
        if (nm && nd < 430) return { x: (boss.x + nm.x) / 2 - cw * 0.5, y: (boss.y + nm.y) / 2 - 300, prio: 1, hold: 1.2, src: 'boss' };
      }
      const hw = heatWindow();
      if (hw && hw.heat >= 5) return { x: hw.x, y: hw.y - 300, prio: 5, hold: 1.4, src: 'heat', heat: hw.heat };
      const fx = foes.length ? Math.min(...foes.map(f => f.x)) : W - 400;
      const mx = mine.length ? Math.max(...mine.map(u => u.x)) : 300;
      return { x: (fx + mx) / 2 - cw * 0.5, y: WORLD_H / 2 - 300, prio: 8, hold: 0.8, src: 'front' };
    }
    const sc = bf.soccer;
    if (sc && !sc.gone && sc.clk >= sc.at - 1.0 && sc.x != null) return { x: sc.x + sc.dir * 120 - cw * 0.5, y: (sc.y || WORLD_H / 2) - 300, prio: 1, hold: 0.4, src: 'ball' };
    if (mine.some(u => u.x > WORLD_W - 680)) return { x: bf.base.foe.x - cw * 0.55, y: bf.base.foe.y - 300, prio: 2, hold: 2.6, src: 'foebase' };
    if (foes.some(u => u.x < 640)) return { x: 0, y: bf.base.you.y - 300, prio: 3, hold: 2.2, src: 'mybase' };
    if (bf.train && bf.train.cars) {
      const cars = bf.train.cars.filter(c => !c.off);
      if (cars.length) {
        const loco = cars[0], lx = (loco.fx + loco.bx) / 2, ly = (loco.fy + loco.by) / 2;
        const near = S.units.filter(u => !u.dead && cars.some(c => segDist(u.x, u.y, c.fx, c.fy, c.bx, c.by) < 260)).length;
        if (near >= 1) return { x: lx - cw * 0.5, y: ly - 300, prio: 3, hold: 0.5, src: 'trainrun' };
      }
    }
    if (bf.train && bf.train.warn && S.units.filter(u => !u.dead && hyp(u.x, u.y, MID, 514) < 330).length >= 2) return { x: MID - cw * 0.5, y: 514 - 270, prio: 4, hold: 2.0, src: 'train' };
    const hw = heatWindow();
    if (hw && hw.heat >= 6) return { x: hw.x, y: hw.y - 300, prio: 5, hold: 1.4, src: 'heat', heat: hw.heat };
    const xs = mine.map(u => u.x).sort((a, b) => b - a).slice(0, 3);
    const front = xs.length ? xs.reduce((a, b) => a + b, 0) / xs.length : MID - 320;
    const fy = mine.length ? mine.reduce((a, u) => a + u.y, 0) / mine.length : WORLD_H / 2;
    if (hw && hw.heat >= 2.5) return { x: hw.x, y: hw.y - 300, prio: 7, hold: 1.0, src: 'warm', heat: hw.heat };
    return { x: front - cw * 0.42, y: fy - 300, prio: 8, hold: 0.8, src: 'idle' };
  }
  function camTick() {
    if (!ST.auto || !live()) return;
    const t = now(), cw = cropW();
    let cand; try { cand = camTarget(t); } catch (e) { ST.err++; return; }
    if (!cand) return;
    const maxX = Math.max(0, WW() - cw);
    if (t < C.holdUntil && cand.prio > C.prio && cand.src !== C.src) { /* keep the more important shot */ }
    else if (cand.src === 'heat' && C.src === 'heat' && C.tx != null && cand.heat < (C.heat || 0) * 1.3 && Math.abs(clamp(cand.x, 0, maxX) - C.tx) < cw * 1.2 && t < C.holdUntil + 2.5) { /* parked — stillness reads pro */ }
    else {
      const tx = clamp(cand.x, 0, maxX);
      if (cand.prio >= 8 && C.tx != null && Math.abs(tx - C.tx) < Math.max(40, cw * 0.16) && cand.src === C.src) return;   // deadband
      C.prio = cand.prio; C.src = cand.src; C.holdUntil = t + cand.hold; C.heat = cand.heat || 0; C.tx = tx; C.ty = cand.y;
    }
  }
  function camFrame() {   // per-frame easing, exact parking (no shimmer crawl)
    const cw = cropW(), t = now();
    const dt = Math.min(0.05, t - (C.lastF || t)) || 0.016; C.lastF = t;
    const maxX = Math.max(0, WW() - cw), maxY = Math.max(0, WORLD_H - H);
    if (C.tx == null) { C.x = clamp(C.x, 0, maxX); return; }
    const spd = (!ST.auto || C.prio <= 4) ? CAM_EVENT_SPD : CAM_IDLE_SPD;
    const dx = clamp(C.tx, 0, maxX) - C.x;
    if (Math.abs(dx) < 1.2) C.x = clamp(C.tx, 0, maxX);
    else C.x += Math.sign(dx) * Math.min(Math.abs(dx) * 3.2 * dt, spd * dt);
    C.x = clamp(C.x, 0, maxX);
    if (maxY > 0 && C.ty != null) {
      const dy = clamp(C.ty, 0, maxY) - C.y;
      if (Math.abs(dy) < 1.2) C.y = clamp(C.ty, 0, maxY);
      else C.y += Math.sign(dy) * Math.min(Math.abs(dy) * 3.0 * dt, spd * 0.7 * dt);
    } else C.y = 0;
  }
  function nudge(dx) { ST.auto = false; const cw = cropW(); C.tx = clamp((C.tx == null ? C.x : C.tx) + dx, 0, Math.max(0, WW() - cw)); C.prio = 0; C.src = 'hand'; ui(); }
  const keysDown = {};
  setInterval(() => { try { killTick(); camTick(); if (keysDown.ArrowLeft) nudge(-42); if (keysDown.ArrowRight) nudge(42); } catch (e) { ST.err++; } }, 100);
  setInterval(() => { ST.fps = ST.frames; ST.frames = 0; ui(); }, 1000);

  // ---------- voice-over: the mic mixed into the take, and a clean stem beside it ----------
  // The mic rides the game's own AudioContext: mic → gain → AC.__stDest (the take's audio track, where
  // the game's nodes also land through the tap's bus) and → voiceDest (a second, voice-only stream the
  // stem recorder takes). Never to AC.destination — you would hear yourself, and the room would feed back.
  const micBuf = new Float32Array(512);
  let meterEl = null;
  // Wyatt 8/27: "Dont use the buddy microphone, use the mac one" — the Buddy mic never gets picked or listed;
  // with no pick of his own the built-in MacBook mic is the mic, not whatever the system calls default.
  const MIC_BAN = /buddy/i, MIC_PREF = /macbook.*microphone|built-in/i;
  async function micDevices() {
    let devs = []; try { devs = (await navigator.mediaDevices.enumerateDevices()).filter(d => d.kind === 'audioinput' && d.deviceId !== 'default' && d.deviceId !== 'communications' && !MIC_BAN.test(d.label || '')); } catch (e) {}
    return devs;
  }
  async function micChoose() {   // → deviceId or '' (let the browser decide)
    const devs = await micDevices();
    const saved = ST.micDev || localStorage.getItem('st_mic') || '';
    if (saved && devs.some(d => d.deviceId === saved)) return saved;
    if (saved) { ST.micDev = ''; try { localStorage.removeItem('st_mic'); } catch (e) {} }   // a banned or vanished pick is forgotten
    const pref = devs.find(d => MIC_PREF.test(d.label || '')) || devs[0];
    return pref ? pref.deviceId : '';
  }
  function busGain() { try { if (typeof AC !== 'undefined' && AC && AC.__stBus) AC.__stBus.gain.value = ST.audio ? 1 : 0; } catch (e) {} }
  // the take's destination + the game's bus, built here if the tap has not built them yet (the mic can come first)
  function ensureDest() {
    if (typeof AC === 'undefined' || !AC) return null;
    if (!AC.__stDest) AC.__stDest = AC.createMediaStreamDestination();
    if (!AC.__stBus) { AC.__stBus = AC.createGain(); AC.__stBus.connect(AC.__stDest); }
    if (!AC.__stKeep) { try { const k = AC.createConstantSource(); k.offset.value = 0; k.connect(AC.__stDest); k.start(); AC.__stKeep = k; } catch (e) {} }   // digital silence, always on: the take's audio track never starves (an mp4 muxer waits on a silent-by-absence track until STOP)
    return AC.__stDest;
  }
  async function micOn() {
    if (ST.mic) return true;
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) { status('this browser gives no microphone'); ST.voice = false; return false; }
    try { if (typeof audio === 'function') audio(); } catch (e) {}
    if (typeof AC === 'undefined' || !AC) { status('no audio context yet — click the game once, then T'); ST.voice = false; return false; }
    const aec = localStorage.getItem('st_aec') !== '0';
    // exact, never ideal: Chrome answers an ideal deviceId with the DEFAULT device (always under --use-fake-ui-for-media-stream)
    const base = { echoCancellation: aec, noiseSuppression: aec, autoGainControl: true };
    let stream;
    // labels only exist once the origin holds the permission — a first plain open grants it, then the mic is chosen by name
    if (!ST.micGranted) { try { const s0 = await navigator.mediaDevices.getUserMedia({ audio: true, video: false }); for (const t of s0.getTracks()) t.stop(); ST.micGranted = true; } catch (e) { status('microphone refused: ' + (e && e.name || e) + ' — allow the mic for this site'); ST.voice = false; ui(); return false; } }
    const dev = await micChoose();
    try { stream = await navigator.mediaDevices.getUserMedia({ audio: dev ? Object.assign({ deviceId: { exact: dev } }, base) : base, video: false }); }
    catch (e) {
      if (dev && e && (e.name === 'OverconstrainedError' || e.name === 'NotFoundError')) {   // the picked mic is gone — the default, and forget the pick
        ST.micDev = ''; try { localStorage.removeItem('st_mic'); } catch (e2) {}
        try { stream = await navigator.mediaDevices.getUserMedia({ audio: base, video: false }); } catch (e3) { status('microphone refused: ' + (e3 && e3.name || e3)); ST.voice = false; ui(); return false; }
      } else { status('microphone refused: ' + (e && e.name || e) + ' — allow the mic for this site'); ST.voice = false; ui(); return false; }
    }
    try {
      ensureDest();
      ST.mic = stream;
      ST.micSrc = AC.createMediaStreamSource(stream);
      ST.micGain = AC.createGain(); ST.micGain.gain.value = 1;
      ST.micAn = AC.createAnalyser(); ST.micAn.fftSize = 512;
      ST.voiceDest = AC.createMediaStreamDestination();
      ST.micSrc.connect(ST.micGain); ST.micGain.connect(ST.micAn); ST.micGain.connect(AC.__stDest); ST.micGain.connect(ST.voiceDest);
      if (AC.state !== 'running') AC.resume();
    } catch (e) { status('mic wiring failed: ' + String(e && e.message || e).slice(0, 100)); micOff(); ST.voice = false; ui(); return false; }
    const tr = stream.getAudioTracks()[0]; ST.micLabel = tr ? tr.label : 'mic';
    if (tr) tr.onended = () => { micOff(); ST.voice = false; status('the microphone went away'); ui(); };
    listMics();
    status('voice live: ' + ST.micLabel + ' — watch the meter; R records you with the game');
    ST.micPeak = -200; ST.micWarned = false;
    // a device that hears NOTHING (digital zero — a muted USB mic, a virtual device) is skipped for the next one
    setTimeout(async () => {
      if (!ST.mic || ST.mic !== stream || ST.on) return;
      if (ST.micPeak > -80) return;
      const tried = (ST.micTried = ST.micTried || new Set()); tried.add(tr ? tr.getSettings().deviceId : dev);
      const devs = (await micDevices()).filter(d => !tried.has(d.deviceId));
      if (!devs.length) { status(ST.micLabel + ' is dead silent and no other mic answers — check the mic and the Mac\'s Sound → Input'); return; }
      status(ST.micLabel + ' is dead silent — trying ' + (devs[0].label || 'the next mic'));
      ST.micDev = devs[0].deviceId; try { localStorage.setItem('st_mic', ST.micDev); } catch (e) {}
      micOff(); micOn(); ui();
    }, 1400);
    return true;
  }
  function micOff() {
    try { if (ST.micSrc) ST.micSrc.disconnect(); } catch (e) {}
    try { if (ST.micGain) ST.micGain.disconnect(); } catch (e) {}
    try { if (ST.mic) for (const t of ST.mic.getTracks()) t.stop(); } catch (e) {}
    ST.mic = null; ST.micSrc = null; ST.micGain = null; ST.micAn = null; ST.voiceDest = null; ST.micLabel = '';
  }
  async function listMics() {
    try {
      const devs = await micDevices(); const sel = $('st-micsel'); if (!sel) return;
      const cur = ST.micDev || localStorage.getItem('st_mic') || (ST.mic && ST.mic.getAudioTracks()[0] && ST.mic.getAudioTracks()[0].getSettings().deviceId) || '';
      sel.innerHTML = devs.map(d => `<option value="${esc(d.deviceId)}"${d.deviceId === cur ? ' selected' : ''}>${esc(d.label || 'microphone')}</option>`).join('') || '<option value="">no microphone</option>';
    } catch (e) {}
  }
  function meterFrame() {
    if (!meterEl) return;
    if (!ST.micAn) { meterEl.style.width = '0'; return; }
    ST.micAn.getFloatTimeDomainData(micBuf); let sum = 0; for (let i = 0; i < micBuf.length; i++) sum += micBuf[i] * micBuf[i];
    const rms = Math.sqrt(sum / micBuf.length), db = 20 * Math.log10(rms || 1e-9), pct = clamp((db + 50) / 50, 0, 1);   // −50 dB → empty, 0 dB → full
    ST.micDb = db; ST.micPeak = Math.max(db, (ST.micPeak == null ? -200 : ST.micPeak) - 0.6);   // a peak that decays ~10 dB/s
    if (ST.on && ST.vrec && !ST.micWarned && now() - ST.t0 > 3 && ST.micPeak < -55) { ST.micWarned = true; status('VOICE IS SILENT — ' + (ST.micLabel || 'the mic') + ' hears nothing; pick another mic in the list (the built-in one works)'); }
    meterEl.style.width = (pct * 100).toFixed(0) + '%'; meterEl.style.background = pct > 0.92 ? '#e05a5a' : pct > 0.65 ? '#e0b64a' : '#7fb35c';
  }
  setInterval(meterFrame, 60);
  function setVoice(v) { ST.voice = v; if (v) micOn(); else { micOff(); status('voice off'); } ui(); }

  // ---------- the take sink: a file on THIS computer (no server behind the page) ----------
  function takeName(mime) { const d = new Date(), p = (n) => String(n).padStart(2, '0'); const st = `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}-${p(d.getSeconds())}`; return `${st}_${String(sceneName() || 'take').replace(/[^a-z0-9._-]+/gi, '-').slice(0, 40)}.${/webm/.test(mime) ? 'webm' : 'mp4'}`; }
  function pickerHere() { try { return typeof window.showSaveFilePicker === 'function' && new URLSearchParams(location.search).get('dl') !== '1'; } catch (e) { return false; } }
  function sinkWhere() { return pickerHere() ? 'RECORD asks where to save the take (a file on this computer)' : 'takes download to this browser\'s downloads folder (no file dialog in this browser)'; }
  function download(blob, name) { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; a.style.display = 'none'; document.body.appendChild(a); a.click(); setTimeout(() => { try { URL.revokeObjectURL(a.href); a.remove(); } catch (e) {} }, 60000); }
  async function sinkOpen(name, mime) {
    const t = { name, mime, where: 'download', bytes: 0, parts: [], vparts: [], vmime: '', w: null, t0: now(), note: '' };
    if (pickerHere()) {   // inside the click/keypress RECORD already is (the picker needs the gesture; nothing awaits before this)
      try {
        const webm = /webm/.test(mime);
        const h = await window.showSaveFilePicker({ suggestedName: name, types: [{ description: webm ? 'WebM video' : 'MP4 video', accept: webm ? { 'video/webm': ['.webm'] } : { 'video/mp4': ['.mp4'] } }] });
        t.w = await h.createWritable(); t.name = h.name || name; t.where = 'file';
      } catch (e) {
        if (e && e.name === 'AbortError') return null;   // he closed the dialog: no take
        t.note = 'the save dialog refused (' + (e && e.name || e) + '): this take downloads at STOP instead'; t.w = null; t.where = 'download';
      }
    }
    t.write = async (blob) => { t.bytes += blob.size; if (t.w) await t.w.write(blob); else t.parts.push(blob); };
    t.finish = async () => {
      const secs = +(now() - t.t0).toFixed(1);
      if (t.w) await t.w.close(); else download(new Blob(t.parts, { type: t.mime }), t.name);
      let voice = null;
      if (t.vparts.length) { voice = t.name.replace(/\.(mp4|webm)$/, '') + '.voice.' + (/mp4/.test(t.vmime) ? 'm4a' : 'webm'); download(new Blob(t.vparts, { type: t.vmime }), voice); }
      t.parts.length = 0; t.vparts.length = 0;
      return { name: t.name, where: t.where === 'file' ? 'saved where you chose' : 'downloaded', secs, w: OUT().w, h: OUT().h, bytes: t.bytes, voice };
    };
    t.abort = async () => { try { if (t.w) await t.w.abort(); } catch (e) {} t.parts.length = 0; t.vparts.length = 0; };
    return t;
  }
  ST.sinkWhere = sinkWhere; ST.pickerHere = pickerHere;

  // ---------- HOW TO (the strip's button) ----------
  let aboutEl = null;
  function aboutToggle() {
    if (aboutEl) { aboutEl.remove(); aboutEl = null; return; }
    aboutEl = document.createElement('div'); aboutEl.id = 'st-about-p';
    aboutEl.innerHTML = `<div class="st-about-box"><div class="st-about-h">HOW TO RECORD</div><ol>
      <li>On the launcher pick a save, then an armed fight. Click the card (or Space) to start.</li>
      <li>Zoom is on: the MONITOR shows the 9:16 take. Z = tight or wide, F = 16:9.</li>
      <li>The UI is OFF in the take. H puts it back in. D hand, C cursor, M sound, T voice-over.</li>
      <li>RECORD (R) asks where to save the take on this computer, then records what the monitor shows.</li>
      <li>STOP (R again) closes the file. It is done when the status line says saved.</li>
      <li>Takes live on your laptop, never on the big Mac. If QuickTime or Final Cut is picky: <code>ffmpeg -i take.mp4 -c copy -movflags +faststart take-qt.mp4</code></li></ol>
      <div class="st-about-k">R record/stop · H UI in take · D hand in take · C cursor · M sound · T voice-over · A camera auto · arrows pan · F frame · Z zoom · V finder · P strip · HOME = this fight again</div>
      <div class="st-about-w">Never play the real web game in this browser: this page and playgvt.net share one save, and picking a seed overwrites it.</div>
      <div class="st-about-k">${esc(sinkWhere())}.</div>
      <button id="st-about-x" class="st-b">CLOSE</button></div>`;
    document.body.appendChild(aboutEl);
    aboutEl.querySelector('#st-about-x').addEventListener('click', () => aboutToggle());
  }
  ST.aboutToggle = aboutToggle;

  // ---------- recorder ----------
  // H.264 High + AAC first (QuickTime/Final Cut-native — Chrome 151 muxes Opus into mp4 otherwise; server.mjs transcodes that to AAC as the fallback)
  function mimePick() { for (const m of ['video/mp4;codecs=avc1.640033,mp4a.40.2', 'video/mp4;codecs=avc1.640033', 'video/mp4;codecs=avc1.4d0033', 'video/mp4;codecs=avc1', 'video/mp4', 'video/webm;codecs=h264', 'video/webm;codecs=vp9', 'video/webm']) if (window.MediaRecorder && MediaRecorder.isTypeSupported(m)) return m; return null; }
  function sceneName() {
    if (S.bf) return `${S.bf.mapId}-${S.bf.team}v${S.bf.team}`;
    if (S.momRaid) return 'mom';
    if (S.raid && S.raid.k) return 'raid-' + S.raid.k;
    if (S.park && S.park.id) return `${S.park.id}-park-${S.park.n}`;
    if (S.levelN) return 'L' + S.levelN;
    return 'take';
  }
  async function recStart() {
    if (ST.on || ST.rec) return;
    const mime = mimePick(); if (!mime) return status('this Chrome has no MediaRecorder video codec');
    const sink = await sinkOpen(takeName(mime), mime); if (!sink) return status('no take: the save dialog was closed');
    if (sink.note) status(sink.note);
    const stream = rc.captureStream(60);
    let audio = false;
    if (ST.voice && !ST.mic) await micOn();
    const voiceStem = !!(ST.voice && ST.mic && ST.voiceDest);
    if (ST.audio || voiceStem) {
      // AC / audio() are the game's top-level let/function — reachable as bare names (shared global lexical scope), never as window.AC
      try { if (typeof audio === 'function') audio(); if (typeof AC !== 'undefined' && AC && AC.state !== 'running') AC.resume(); } catch (e) {}
      try { if (ensureDest()) { busGain(); const tr = AC.__stDest.stream.getAudioTracks()[0]; if (tr) { stream.addTrack(tr); ST.audioIn = true; audio = true; } } } catch (e) {}
    }
    const take = sink;
    ST.take = take; ST.bytes = 0; ST.gaps = 0; ST.q = Promise.resolve(); ST.vq = Promise.resolve(); ST.vrec = null;
    if (voiceStem) {   // the clean voice stem — a second recorder on the voice-only stream
      const vm = ['audio/mp4;codecs=mp4a.40.2', 'audio/mp4', 'audio/webm;codecs=opus', 'audio/webm'].find(m => MediaRecorder.isTypeSupported(m));
      if (vm) {
        try {
          const vr = ST.vrec = new MediaRecorder(ST.voiceDest.stream, { mimeType: vm, audioBitsPerSecond: 160e3 });
          vr.ondataavailable = (e) => { if (!e.data || !e.data.size) return; take.vparts.push(e.data); take.vmime = vm; };
          vr.start(1000);
        } catch (e) { ST.vrec = null; }
      }
    }
    const rec = ST.rec = new MediaRecorder(stream, { mimeType: mime, videoBitsPerSecond: 24e6, audioBitsPerSecond: 160e3 });
    rec.ondataavailable = (e) => {
      if (!e.data || !e.data.size) return;
      const blob = e.data; ST.bytes += blob.size;
      ST.q = ST.q.then(() => take.write(blob)).catch(() => { ST.sinkErr = (ST.sinkErr || 0) + 1; });
    };
    rec.onstart = () => { ST.on = true; ST.t0 = now(); ui(); };
    rec.onerror = (e) => { status('recorder error: ' + (e.error && e.error.name || e)); };
    rec.start(1000);
    status(`recording ${audio ? (ST.audio ? 'with game sound' : 'game muted') : 'silent'}${voiceStem ? ' + VOICE (' + ST.micLabel + ')' : ''} · ${mime.split(';')[0]}`);
  }
  function recStop() {
    const r = ST.rec; if (!r) return;
    const take = ST.take, vr = ST.vrec; ST.vrec = null;
    const vDone = vr ? new Promise(res => { vr.onstop = res; try { vr.stop(); } catch (e) { res(); } }) : Promise.resolve();
    r.onstop = async () => {
      ST.on = false; ST.rec = null; ui();
      await vDone; await ST.q; await (ST.vq || Promise.resolve());
      let d = null; try { d = await take.finish(); } catch (e) { d = { error: String(e && e.message || e).slice(0, 120) }; }
      ST.last = d;
      if (d && d.name) status(`saved ${d.name} (${d.where}) — ${d.secs}s · ${d.w}×${d.h} · ${ST.fps} fps · ${(d.bytes / 1e6).toFixed(1)} MB${d.voice ? ' + voice stem ' + d.voice + ' (downloaded)' : ''}${ST.gaps ? ` · ${ST.gaps} frame gaps` : ''}`);
      else status('take finished but the file could not be closed' + (d && d.error ? ': ' + d.error : ''));
      ui();
    };
    r.stop();
  }
  const toggleRec = () => (ST.on || ST.rec) ? recStop() : recStart();

  // ---------- panel ----------
  const $ = (id) => document.getElementById(id);
  let stripEl, monEl, statusEl, statusT = 0;
  function status(msg) { ST.status = msg; if (statusEl) statusEl.textContent = msg; statusT = now(); }
  function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
  function doorHTML() {
    const maps = (typeof BF_MAPS !== 'undefined' ? BF_MAPS.map(m => m.id) : []).filter(m => !/^nem/.test(m));
    const armies = typeof ARMIES !== 'undefined' ? ARMIES.map(a => a.id) : [];
    const opt = (arr, sel) => arr.map(v => `<option value="${esc(v)}"${v === sel ? ' selected' : ''}>${esc(v)}</option>`).join('');
    return `
      <select id="st-kind"><option value="bf">BATTLEGROUND</option><option value="camp">CAMPAIGN LEVEL</option><option value="raid">RAID / HIDEOUT</option><option value="park">PARK</option><option value="mom">MOM ALERT</option></select>
      <span class="st-door" data-kind="bf"><select id="st-map">${opt(['random', ...maps], 'random')}</select><select id="st-size">${opt(['1', '2', '3', '4'], '3')}</select><select id="st-diff">${opt(['easy', 'medium', 'hard'], 'medium')}</select><select id="st-enemy">${opt(['daily', ...armies], 'tan')}</select></span>
      <span class="st-door" data-kind="camp" hidden>L <input id="st-lvl" type="number" min="1" max="200" value="12" style="width:52px"></span>
      <span class="st-door" data-kind="raid" hidden><select id="st-raid">${opt(['ice', 'bone', 'croak', 'fields'], 'ice')}</select><select id="st-tier">${opt(['e', 'm', 'h', 'g'], 'h')}</select></span>
      <span class="st-door" data-kind="park" hidden><select id="st-park">${opt(['yeti', 'dino', 'western', 'teddy'], 'dino')}</select> rung <input id="st-rung" type="number" min="1" max="60" value="20" style="width:52px"></span>
      <button id="st-go" class="st-b st-go">GO</button>
      <button id="st-cash" class="st-b" title="+1000 stars in the purse (staging)">+1000 ★</button>
      <button id="st-home" class="st-b" title="back to the room (reload)">HOME</button>`;
  }
  function buildPanel() {
    const css = document.createElement('style'); css.id = 'st-css';
    css.textContent = `
      #st{position:fixed;left:0;right:0;bottom:0;height:var(--chin,0px);background:#15161a;color:#e8e6df;z-index:120;display:flex;gap:14px;padding:10px 12px;box-sizing:border-box;font:13px/1.35 -apple-system,'Helvetica Neue',Arial,sans-serif;border-top:1px solid #2b2d33;overflow:hidden;cursor:default}
      #st[hidden]{display:none}
      #st-mon{position:relative;flex:0 0 auto;height:100%;display:flex;flex-direction:column;align-items:center;gap:4px}
      #st-rc{height:calc(100% - 22px);width:auto;background:#000;border:1px solid #3a3d45;border-radius:4px}
      #st-badge{font-size:12px;color:#9a9da6;letter-spacing:.04em;white-space:nowrap}
      #st-badge.on{color:#ff5a5a;font-weight:700}
      #st-ctl{flex:1 1 auto;display:flex;flex-direction:column;gap:8px;min-width:0}
      .st-row{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
      .st-b{background:#262830;color:#e8e6df;border:1px solid #3a3d45;border-radius:6px;padding:6px 10px;font:inherit;cursor:pointer;white-space:nowrap}
      .st-b:hover{background:#31343d}
      .st-b.on{background:#3d5a2e;border-color:#6d9a4a}
      .st-b.off{opacity:.75}
      .st-b kbd{display:inline-block;margin-left:6px;padding:0 5px;border:1px solid #4a4d55;border-radius:4px;font:11px/16px ui-monospace,Menlo,monospace;color:#b8bbc4;background:#1b1c21}
      .st-rec{background:#7a1f1f;border-color:#b23a3a;font-weight:700;padding:8px 16px;font-size:14px}
      .st-rec.on{background:#d33;border-color:#ff7a7a;animation:st-pulse 1.2s ease-in-out infinite}
      @keyframes st-pulse{50%{filter:brightness(1.35)}}
      .st-go{background:#2e4a7a;border-color:#4a72b2;font-weight:700}
      #st select,#st input{background:#1b1c21;color:#e8e6df;border:1px solid #3a3d45;border-radius:5px;padding:5px 6px;font:inherit}
      #st-meter{display:inline-block;width:84px;height:12px;background:#1b1c21;border:1px solid #3a3d45;border-radius:6px;overflow:hidden;vertical-align:middle}
      #st-meter i{display:block;height:100%;width:0;background:#7fb35c;transition:width .06s linear}
      #st-micsel{max-width:170px}
      .st-chk{display:inline-flex;align-items:center;gap:4px;color:#c9ccd4;font-size:12px;white-space:nowrap}
      .st-lbl{color:#9a9da6;font-size:12px;letter-spacing:.08em;margin-right:2px}
      #st-status{color:#c9ccd4;min-height:18px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      #st-meta{color:#7e828c;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
      .st-hint{color:#7e828c;font-size:12px}
      #st-armed{position:fixed;left:0;right:0;top:0;bottom:var(--chin,0px);z-index:110;display:flex;align-items:center;justify-content:center;background:rgba(8,9,12,.62);cursor:pointer;font:15px/1.4 -apple-system,'Helvetica Neue',Arial,sans-serif;color:#e8e6df}
      .st-armed-box{background:#15161a;border:2px solid #6d9a4a;border-radius:14px;padding:26px 38px;text-align:center;box-shadow:0 12px 40px rgba(0,0,0,.6);max-width:80vw}
      .st-armed-k{font-size:12px;letter-spacing:.3em;color:#9fd07a;font-weight:700}
      .st-armed-l{font:800 30px/1.15 'Arial Narrow',Impact,-apple-system,sans-serif;letter-spacing:.02em;margin:8px 0 6px}
      .st-armed-s{color:#9a9da6}
      .st-armed-go{margin-top:16px;display:inline-block;background:#3d5a2e;border:1px solid #6d9a4a;border-radius:8px;padding:10px 18px;font-weight:700}
      .st-armed-go kbd{margin-left:8px;padding:0 6px;border:1px solid #6d9a4a;border-radius:4px;font:11px/16px ui-monospace,Menlo,monospace}
      body.st-nocursor #wrap, body.st-nocursor #wrap *{cursor:none!important}
      body.st-nocursor .overlay, body.st-nocursor .overlay *{cursor:none!important}
      #st-about-p{position:fixed;inset:0;z-index:130;background:rgba(8,9,12,.78);display:flex;align-items:center;justify-content:center;font:20px/1.5 -apple-system,'Helvetica Neue',Arial,sans-serif;color:#e8e6df}
      .st-about-box{background:#15161a;border:2px solid #6d9a4a;border-radius:14px;padding:26px 34px;max-width:min(92vw,900px);max-height:90vh;overflow:auto;box-shadow:0 12px 40px rgba(0,0,0,.6)}
      .st-about-h{font:800 30px/1.1 'Arial Narrow',Impact,-apple-system,sans-serif;letter-spacing:.02em;margin:0 0 10px}
      .st-about-box ol{margin:0 0 14px;padding-left:28px} .st-about-box li{margin:0 0 8px}
      .st-about-k{font-size:16px;color:#c9ccd4;margin:0 0 10px} .st-about-k code{font:15px ui-monospace,Menlo,monospace;background:#0e0f12;border:1px solid #3a3d45;border-radius:5px;padding:1px 6px}
      .st-about-w{font-size:17px;color:#ffb86b;margin:0 0 14px}`;
    document.head.appendChild(css);
    stripEl = document.createElement('div'); stripEl.id = 'st';
    stripEl.innerHTML = `
      <div id="st-mon"><div id="st-badge">MONITOR · what the take sees</div></div>
      <div id="st-ctl">
        <div class="st-row">
          <button id="st-recb" class="st-b st-rec">● RECORD<kbd>R</kbd></button>
          <span id="st-status">ready</span>
        </div>
        <div class="st-row">
          <button id="st-hud" class="st-b">UI IN TAKE<kbd>H</kbd></button>
          <button id="st-hand" class="st-b">HAND IN TAKE<kbd>D</kbd></button>
          <button id="st-cursor" class="st-b">CURSOR<kbd>C</kbd></button>
          <button id="st-audio" class="st-b">SOUND IN TAKE<kbd>M</kbd></button>
          <button id="st-voice" class="st-b" title="your microphone in the take (mixed with the game) + a clean voice stem beside it">VOICE-OVER<kbd>T</kbd></button><span id="st-meter" title="mic level"><i></i></span><select id="st-micsel" title="microphone (the Mac's built-in mic unless you pick another; the Buddy mic is never used)"><option value="">MacBook microphone</option></select><label class="st-chk" title="Chrome's echo cancellation + noise suppression on the mic. ON with speakers (it can duck your voice under loud game sound); OFF with headphones = the cleanest voice"><input type="checkbox" id="st-aec" checked> echo cancel</label>
          <button id="st-auto" class="st-b">CAMERA AUTO<kbd>A</kbd></button>
          <button id="st-left" class="st-b" title="pan the take left (hold)">◀<kbd>←</kbd></button>
          <button id="st-right" class="st-b" title="pan the take right (hold)">▶<kbd>→</kbd></button>
          <button id="st-frame" class="st-b">9:16<kbd>F</kbd></button>
          <button id="st-zoom" class="st-b">ZOOM<kbd>Z</kbd></button>
          <button id="st-vf" class="st-b">FINDER<kbd>V</kbd></button>
          <button id="st-panel" class="st-b" title="hide this strip (P brings it back)">HIDE<kbd>P</kbd></button>
        </div>
        <div class="st-row">${doorHTML()}</div>
        <div class="st-row" id="st-sarge-row"><span class="st-lbl">SARGE</span><select id="st-wpn" title="what Sarge carries — switches live, even mid-fight"></select><select id="st-spec" title="the Commander's specialization"></select><select id="st-saber" title="saber colour"></select><span class="st-hint" id="st-sarge-note"></span></div>
        <div class="st-row">
          <button id="st-about" class="st-b">HOW TO</button>
          <button id="st-launch" class="st-b" title="back to the launcher: pick a save, an armed fight">LAUNCHER</button>
          <span id="st-meta"></span>
        </div>
        <div class="st-row"><span class="st-lbl">TAKES</span><span id="st-sink" class="st-hint"></span></div>
        <div class="st-hint">The take is the monitor: the canvas only — no strip, no cursor, no cards. Hand off = no drag ghost, ring, deploy shade or jet arc in the take (you still see them). Wheel over the monitor pans; ← → pan; A hands the camera back to the director. VOICE-OVER mixes your mic into the take and saves a clean <b>.voice.m4a</b> stem beside it; SOUND off keeps the voice and mutes the game. <b>Takes land on this computer</b> (RECORD asks where; a download where there is no file dialog), never on the big Mac.</div>
      </div>`;
    document.body.appendChild(stripEl);
    $('st-mon').insertBefore(rc, $('st-badge'));
    monEl = $('st-mon'); statusEl = $('st-status');
    const on = (id, f) => $(id).addEventListener('click', (e) => { e.preventDefault(); f(); ui(); $(id).blur(); });
    on('st-recb', toggleRec);
    on('st-hud', () => ST.hud = !ST.hud);
    on('st-hand', () => ST.hand = !ST.hand);
    on('st-cursor', () => ST.cursor = !ST.cursor);
    on('st-audio', () => ST.audio = !ST.audio);
    on('st-voice', () => setVoice(!ST.voice));
    meterEl = document.querySelector('#st-meter i');
    $('st-micsel').addEventListener('change', () => { ST.micDev = $('st-micsel').value; ST.micTried = null; try { localStorage.setItem('st_mic', ST.micDev); } catch (e) {} if (ST.mic) { micOff(); micOn(); } });
    try { $('st-aec').checked = localStorage.getItem('st_aec') !== '0'; } catch (e) {}
    $('st-aec').addEventListener('change', () => { try { localStorage.setItem('st_aec', $('st-aec').checked ? '1' : '0'); } catch (e) {} if (ST.mic) { micOff(); micOn(); } });
    on('st-auto', () => { ST.auto = !ST.auto; if (!ST.auto) { C.tx = C.x; C.src = 'hand'; } });
    on('st-frame', () => setFrame(ST.frame === 'portrait' ? 'landscape' : 'portrait'));
    on('st-zoom', () => setZoom(ZOOMS[(ZOOMS.indexOf(ST.zoom) + 1) % ZOOMS.length]));
    on('st-vf', () => ST.vf = !ST.vf);
    on('st-panel', () => setPanel(false));
    on('st-about', () => aboutToggle());
    on('st-launch', () => { location.href = './'; });
    on('st-go', go);
    $('st-wpn').addEventListener('change', () => sargeApply($('st-wpn').value, null, null));
    $('st-spec').addEventListener('change', () => sargeApply(null, +$('st-spec').value, null));
    $('st-saber').addEventListener('change', () => sargeApply(null, null, $('st-saber').value));
    sargeFill();
    on('st-cash', () => { if (S.mode === 'play') { S.plastic = (S.plastic || 0) + 1000; status('+1000 ★'); } });
    on('st-home', () => { if (ARMED) location.reload(); else location.href = location.pathname; });
    if (ARMED) { const hb = $('st-home'); hb.textContent = 'RESET FIGHT'; hb.title = 're-arm this same fight (the save re-seeds too)'; }
    const hold = (id, dx) => { const el = $(id); let iv = null; const stop = () => { if (iv) clearInterval(iv); iv = null; }; el.addEventListener('pointerdown', () => { nudge(dx); iv = setInterval(() => nudge(dx), 100); }); el.addEventListener('pointerup', stop); el.addEventListener('pointerleave', stop); };
    hold('st-left', -42); hold('st-right', 42);
    $('st-kind').addEventListener('change', () => { for (const el of stripEl.querySelectorAll('.st-door')) el.hidden = el.dataset.kind !== $('st-kind').value; });
    rc.addEventListener('wheel', (e) => { e.preventDefault(); nudge((Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * 1.5); }, { passive: false });
    rc.title = 'wheel / trackpad swipe pans the take';
    ui();
  }
  function layoutStrip() { if (!stripEl) return; }
  function ui() {
    if (!stripEl) return;
    const set = (id, on, label) => { const el = $(id); if (!el) return; el.classList.toggle('on', !!on); el.classList.toggle('off', !on); if (label) el.firstChild.textContent = label; };
    set('st-hud', ST.hud); set('st-hand', ST.hand); set('st-cursor', ST.cursor); set('st-audio', ST.audio); set('st-voice', ST.voice && !!ST.mic); set('st-auto', ST.auto); set('st-vf', ST.vf);
    busGain();
    set('st-frame', true, ST.frame === 'portrait' ? '9:16 ' : '16:9 '); $('st-frame').classList.remove('off');
    set('st-zoom', true, 'ZOOM ' + ST.zoom.toUpperCase() + ' '); $('st-zoom').classList.remove('off');
    const rb = $('st-recb'); rb.classList.toggle('on', ST.on); rb.firstChild.textContent = ST.on ? '■ STOP ' : '● RECORD ';
    const b = $('st-badge'); b.classList.toggle('on', ST.on);
    b.textContent = ST.on ? `● REC ${fmtT(now() - ST.t0)} · ${(ST.bytes / 1e6).toFixed(0)} MB${ST.vrec ? ' · VOICE' : ''}` : `MONITOR ${OUT().w}×${OUT().h} · ${ST.hud ? 'UI' : 'no UI'} · ${ST.hand ? 'hand' : 'no hand'}${ST.mic ? ' · voice live' : ''}`;
    const c = cropRect();
    $('st-meta').textContent = `${ST.fps} fps · cam ${ST.auto ? 'auto:' + (C.src || '—') : 'manual'} @ ${Math.round(c.x + gameCam().x)} · window ${Math.round(c.w)}×${c.h} world px · K ${ST.K.toFixed(2)} · ${S.mode}${ST.err ? ' · err ' + ST.err : ''}${ST.sinkErr ? ' · SINK ERR ' + ST.sinkErr : ''}`;
    document.body.classList.toggle('st-nocursor', !ST.cursor);
    if (ST.status && now() - statusT > 25 && !ST.on) { /* keep the last message */ }
  }
  const fmtT = (s) => { s = Math.max(0, Math.floor(s)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  function setFrame(f) { ST.frame = f; setK(); sizeRc(); stResize(); C.tx = C.x; }
  function setZoom(z) { ST.zoom = z; setK(); stResize(); }
  function setPanel(v) { ST.panel = v; if (stripEl) stripEl.hidden = !v; stResize(); if (!v) status('strip hidden — P brings it back'); }

  // ---------- Sarge: weapon · the Commander's specialization · saber colour ----------
  // Wyatt 8/27: "let me change my sarge specialization" — the room's pickers, on the strip. Everything is
  // read from the game's own tables and ownership readers (SARGE_WEAPONS/wkOwned · CS_DEF/csOwned ·
  // SABER_COLORS/sabColOwned); the write is the game's own (csPick's lines: META.cmdSpec + sargeWeapon +
  // saveMeta). The sim reads META live (sargeStats, the art), so a Sarge on the field changes hands at once.
  // The pick rides the URL (sarge= spec= saber=) so RESET FIGHT — which re-seeds the save — keeps it.
  function sargeFill() {
    const w = $('st-wpn'), sp = $('st-spec'), sb = $('st-saber'); if (!w || typeof META === 'undefined') return;
    try {
      const cur = META.sargeWeapon || 'pistol';
      const ids = (typeof SARGE_ORDER !== 'undefined' ? SARGE_ORDER : Object.keys(SARGE_WEAPONS)).filter(k => SARGE_WEAPONS[k]);
      w.innerHTML = ids.map(k => { const own = (typeof wkOwned === 'function') ? wkOwned(k) : true; return `<option value="${k}"${k === cur ? ' selected' : ''}${own ? '' : ' disabled'}>${esc(SARGE_WEAPONS[k].name)}${own ? '' : ' (locked)'}</option>`; }).join('');
      const isCmd = cur === 'commander';
      let n = META.cmdSpec | 0; if (typeof cmdSpec === 'function') { try { n = cmdSpec(); } catch (e) {} }
      sp.innerHTML = (typeof CS_DEF !== 'undefined' ? CS_DEF : []).map((d, i) => i === 0 ? '' : `<option value="${i}"${i === n ? ' selected' : ''}${(typeof csOwned === 'function' && !csOwned(i)) ? ' disabled' : ''}>${esc(d.name)}${(typeof csOwned === 'function' && !csOwned(i)) ? ' (locked)' : ''}</option>`).join('');
      sp.disabled = !isCmd; sp.title = isCmd ? "the Commander's specialization" : 'pick THE COMMANDER to choose a specialization';
      const owned = (META.sabColOwned || []).slice(); const cols = (typeof SABER_COLORS !== 'undefined' ? SABER_COLORS : []).filter(c => owned.indexOf(c.hex) >= 0 || c.hex === META.saberColor);
      sb.innerHTML = cols.map(c => `<option value="${c.hex}"${c.hex === META.saberColor ? ' selected' : ''}>${esc(c.id)} saber</option>`).join('') || '<option value="">saber</option>';
      sb.disabled = !(cur === 'lightsaber' || cur === 'commander') || !cols.length;
      $('st-sarge-note').textContent = isCmd && n > 0 && typeof CS_NOTE !== 'undefined' && CS_NOTE[n] ? CS_NOTE[n].toLowerCase() : '';
    } catch (e) { ST.err++; }
  }
  function sargeApply(wpn, spec, saber) {
    try {
      if (wpn && SARGE_WEAPONS[wpn] && (typeof wkOwned !== 'function' || wkOwned(wpn))) META.sargeWeapon = wpn;
      if (spec != null && META.sargeWeapon === 'commander') { const n = spec | 0; if (n >= 1 && n <= 3 && (typeof csOwned !== 'function' || csOwned(n))) META.cmdSpec = n; }
      if (saber && (META.sabColOwned || []).indexOf(saber) >= 0) META.saberColor = saber;
      if (typeof saveMeta === 'function') saveMeta();
      if (typeof buildUnitTint === 'function') { try { buildUnitTint(); } catch (e) {} }
    } catch (e) { ST.err++; }
    // the URL carries the pick so RESET FIGHT (a reload = a re-seed) keeps it
    try { const u = new URL(location.href); u.searchParams.set('sarge', META.sargeWeapon || 'pistol'); if (META.sargeWeapon === 'commander') u.searchParams.set('spec', String(META.cmdSpec | 0)); else u.searchParams.delete('spec'); if (META.saberColor) u.searchParams.set('saber', META.saberColor); history.replaceState(null, '', u.toString()); } catch (e) {}
    sargeFill(); ui();
  }
  ST.sargeApply = sargeApply; ST.sargeFill = sargeFill;

  // ---------- doors ----------
  function go() {
    const kind = $('st-kind').value;
    try { if (typeof audio === 'function') audio(); } catch (e) {}
    try {
      if (kind === 'bf') {
        const map = $('st-map').value, size = +$('st-size').value, diff = $('st-diff').value, en = $('st-enemy').value;
        const riv = en === 'daily' ? null : ARMIES.find(a => a.id === en);
        startBattlefield(map, diff, size, null, riv || undefined);
      } else if (kind === 'camp') startCampaign(clamp(+$('st-lvl').value || 1, 1, 200));
      else if (kind === 'raid') { RAID_CUR = $('st-raid').value; startRaid($('st-tier').value); }
      else if (kind === 'park') startPark($('st-park').value, clamp(+$('st-rung').value || 1, 1, 60));
      else if (kind === 'mom') startMomRaid();
      C.x = 0; C.tx = null; C.src = ''; C.prio = 99; alive.clear(); RK.length = 0;
      stResize(); sargeFill();
      status('scene: ' + sceneName());
    } catch (e) { status('door failed: ' + String(e && e.message || e).slice(0, 120)); ST.err++; }
  }

  // ---------- staged tabs: ?save=…&scene=… arms a fight; nothing runs until the card is clicked ----------
  const Q = new URLSearchParams(location.search);
  const ARMED = Q.get('scene') ? {
    scene: Q.get('scene'), lvl: +Q.get('lvl') || 0, map: Q.get('map') || 'random', size: +Q.get('size') || 2, diff: Q.get('diff') || 'medium', enemy: Q.get('enemy') || 'daily',
    raid: Q.get('raid') || 'ice', tier: Q.get('tier') || 'h', park: Q.get('park') || 'dino', rung: +Q.get('rung') || 1,
    cash: +Q.get('cash') || 0, wave: Q.get('wave'), waveAt: +Q.get('waveAt') || 1.2, label: Q.get('label') || '', go: Q.get('go') === '1', save: Q.get('save') || '',
  } : null;
  function armedLabel() {
    const a = ARMED; if (!a) return '';
    if (a.label) return a.label;
    if (a.scene === 'camp') { const n = a.lvl || 1; let nm = ''; try { nm = LEVEL_NAMES[(typeof campBaseRung === 'function' ? campBaseRung(n) : n) - 1] || ''; } catch (e) {} return `LEVEL ${n}${nm ? ' · ' + nm : ''}`; }
    if (a.scene === 'bf') return `${a.map.toUpperCase()} ${a.size}v${a.size} ${a.diff.toUpperCase()} vs ${a.enemy.toUpperCase()}`;
    if (a.scene === 'raid') return `${a.raid.toUpperCase()} RAID · ${a.tier.toUpperCase()}`;
    if (a.scene === 'park') return `${a.park.toUpperCase()} PARK · RUNG ${a.rung}`;
    if (a.scene === 'mom') return 'MOM ALERT';
    return a.scene;
  }
  function armedDoor() {
    const a = ARMED;
    try { if (typeof audio === 'function') audio(); } catch (e) {}
    if (a.scene === 'camp') startCampaign(clamp(a.lvl || 1, 1, 200));
    else if (a.scene === 'bf') { const riv = a.enemy === 'daily' ? undefined : (ARMIES.find(x => x.id === a.enemy) || undefined); startBattlefield(a.map, a.diff, clamp(a.size, 1, 4), null, riv); }
    else if (a.scene === 'raid') { RAID_CUR = a.raid; startRaid(a.tier); }
    else if (a.scene === 'park') startPark(a.park, clamp(a.rung, 1, 60));
    else if (a.scene === 'mom') startMomRaid();
    C.x = 0; C.tx = null; C.src = ''; C.prio = 99; alive.clear(); RK.length = 0;
    stResize(); sargeFill();
    if (a.cash > 0) S.plastic = Math.max(S.plastic || 0, a.cash);
    if (a.wave && a.scene !== 'bf') {   // the ticker jumps to the wave waveAt seconds in (time to set a line first)
      if (a.waveAt > 2) status('started: ' + armedLabel() + ' — the jump to wave ' + a.wave + ' comes at ' + a.waveAt + ' s');
      setTimeout(() => { try { if (S.mode === 'play' && S.sq && S.cfg && S.cfg.waves) { const n = S.cfg.waves.length; S.wave = a.wave === 'last' ? n - 1 : clamp(((+a.wave) | 0) - 1, 0, n - 1); S.sq.nextT = S.sq.t; status('wave ' + (S.wave + 1) + ' of ' + n + ' called in'); } } catch (e) { ST.err++; } }, a.waveAt * 1000);
    }
    status('started: ' + armedLabel() + ' — R records');
    document.title = armedLabel() + ' · GVT NAVIGATOR';
  }
  const readyForDoor = () => document.readyState === 'complete' && typeof S !== 'undefined' && S.mode !== 'play' && typeof startCampaign === 'function';
  function armedCard() {
    const card = document.createElement('div'); card.id = 'st-armed';
    const who = ARMED.save === 'rookie' ? 'the rookie · a level-' + (ARMED.lvl || 2) + ' army' : ARMED.save === 'director' ? 'the Director · everything, rank 60' : ARMED.save === 'fresh' ? 'a fresh save' : 'the save that is here';
    card.innerHTML = `<div class="st-armed-box"><div class="st-armed-k">ARMED</div><div class="st-armed-l">${esc(armedLabel())}</div><div class="st-armed-s">${esc(who)}</div><div class="st-armed-go">CLICK TO START <kbd>space</kbd></div></div>`;
    document.body.appendChild(card);
    const fire = () => {
      if (card.dataset.busy) return; card.dataset.busy = '1';
      card.querySelector('.st-armed-go').textContent = 'starting…';
      const tick = () => { if (readyForDoor()) { try { armedDoor(); } catch (e) { status('door failed: ' + String(e && e.message || e).slice(0, 120)); ST.err++; } card.remove(); ST.armedFire = null; } else setTimeout(tick, 150); };
      tick();
    };
    card.addEventListener('click', fire);
    ST.armedFire = fire;
    return card;
  }

  // ---------- hotkeys ----------
  window.addEventListener('keydown', (e) => {
    const tg = e.target; if (tg && (tg.tagName === 'INPUT' || tg.tagName === 'TEXTAREA' || tg.tagName === 'SELECT' || tg.isContentEditable)) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;
    if (k === 'ArrowLeft' || k === 'ArrowRight') { keysDown[k] = true; if (!e.repeat) nudge(k === 'ArrowLeft' ? -42 : 42); e.preventDefault(); return; }
    if (e.repeat) return;
    if (k === ' ' && ST.armedFire) { ST.armedFire(); e.preventDefault(); return; }
    const K = k.toLowerCase();
    if (K === 'r') toggleRec();
    else if (K === 'h') ST.hud = !ST.hud;
    else if (K === 'd') ST.hand = !ST.hand;
    else if (K === 'c') ST.cursor = !ST.cursor;
    else if (K === 'm') ST.audio = !ST.audio;
    else if (K === 't') setVoice(!ST.voice);
    else if (K === 'a') { ST.auto = !ST.auto; if (!ST.auto) { C.tx = C.x; C.src = 'hand'; } }
    else if (K === 'f') setFrame(ST.frame === 'portrait' ? 'landscape' : 'portrait');
    else if (K === 'z') setZoom(ZOOMS[(ZOOMS.indexOf(ST.zoom) + 1) % ZOOMS.length]);
    else if (K === 'v') ST.vf = !ST.vf;
    else if (K === 'p') setPanel(!ST.panel);
    else return;
    e.preventDefault(); ui();
  }, { capture: true });
  window.addEventListener('keyup', (e) => { if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') keysDown[e.key] = false; });

  // ---------- boot ----------
  try { GVT.momBoot(false); } catch (e) {}
  try { GVT.adCfg({ camp: 0, bf: 0 }); } catch (e) {}
  try { if (typeof META !== 'undefined' && META) META.deviceId = '9'.repeat(32); } catch (e) {}   // the reserved device: no leaderboard, rival or telemetry row can ever name this commander
  setK(); sizeRc(); buildPanel(); stResize();
  try { $('st-sink').textContent = sinkWhere() + '. Takes live on this computer, never on the big Mac.'; } catch (e) {}
  ST.setBand = (y0, y1) => { BANDS.custom = [y0, y1]; ST.zoom = 'custom'; if (!ZOOMS.includes('custom')) ZOOMS.push('custom'); setK(); stResize(); return { K: ST.K, w: cropW() }; };
  ST.recStart = recStart; ST.recStop = recStop; ST.go = go; ST.rc = rc; ST.cropRect = cropRect; ST.status = 'ready';
  status('ready — ' + sinkWhere() + '; R records the monitor');
  if (Q.get('sarge') || Q.get('spec') || Q.get('saber')) { try { sargeApply(Q.get('sarge'), Q.get('spec') != null ? +Q.get('spec') : null, Q.get('saber')); } catch (e) { ST.err++; } }
  if (ARMED) {
    ST.armed = ARMED; document.title = armedLabel() + ' · GVT NAVIGATOR';
    if (ARMED.go) { const tick = () => { if (readyForDoor()) { setTimeout(() => { try { armedDoor(); } catch (e) { ST.err++; status('door failed: ' + String(e && e.message || e).slice(0, 120)); } }, 400); } else setTimeout(tick, 150); }; tick(); }
    else { armedCard(); status('armed: ' + armedLabel() + ' — click the card (or Space) to start'); }
  }
})();
