/* GVT PLAYTEST BENCH · slot 1 (the pre-boot script) · FM-GVT-BENCH-01
   Runs AHEAD of the game's one inline script, in the bench page's own bytes. Three jobs:
   (1) THE DEAD WIRE: every call to the one NET host (nationgame.live) is answered here, in place, with the rig guard's own
       shape ({"ok":false,"err":"bench"}, 403): window.fetch (keepalive included), navigator.sendBeacon, XMLHttpRequest,
       WebSocket: EXCEPT one pass-through: GET /gvt/board with the device stripped, so RANKINGS paints the real board
       with no YOU row. HQ never hears of the bench commander. Every answered call is a LEAK row in the run log.
   (2) THE ERROR HOOKS: window 'error', 'unhandledrejection' and console.error land as ERROR rows (message + stack).
   (3) THE STORE: the bench's own localStorage keys (never gvt_*), the run header, the log writer. Slot 2 (bench.js)
       builds the face on this. This file never dials the ads and never writes gvt_coach. No em or en dashes in any
       string a player reads.
   (4) THE AD BRIDGE (CARD 2): the bench presents the shells' one ad handler (webkit.messageHandlers.gvtAds), so the
       game's LIVE gate decides when a break is due and the bench only paints: init and load answered ready, a show
       handed to slot 2's card painter (AD PLACEMENT), the result answered on the tap through the four GVTN doors.
       Never gvtIAP (the store stays a page with no bridge), never gvtSign. Nothing here opens a wire. */
(function(){
  'use strict';
  var W = window;
  var STAMP = W.__BENCH_STAMP || {};          // baked into game.html's head insertion by stage_bench.py
  var K = { runN:'bench_runN', cur:'bench_cur', run:'bench_run_', bid:'bench_bid', tag:'bench_tag', dials:'bench_dials' };
  var RUNS_KEEP = 40, LOG_CAP = 2000;         // the dials page: D6
  var B = W.__bench = { stamp:STAMP, K:K, wire:{ killed:0, passed:0, byPath:{} }, errors:[], listeners:[], state:null, held:false };

  // ---------- the store ----------
  function rd(k){ try{ return localStorage.getItem(k); }catch(e){ return null; } }
  function wr(k, v){ try{ localStorage.setItem(k, v); return true; }catch(e){ return false; } }
  function rm(k){ try{ localStorage.removeItem(k); }catch(e){} }
  function js(k, d){ try{ var s = rd(k); return s? JSON.parse(s) : d; }catch(e){ return d; } }
  function bid(){ var b = rd(K.bid); if(!b){ b = Math.random().toString(36).slice(2, 6); wr(K.bid, b); } return b; }
  function isPhone(){ return Math.min(W.innerWidth, W.innerHeight) <= 520; }
  function two(n){ return (n < 10? '0' : '') + n; }
  function clock(d){ try{ return d.toLocaleTimeString([], { hour:'numeric', minute:'2-digit', second:'2-digit' }); }catch(e){ return two(d.getHours()) + ':' + two(d.getMinutes()) + ':' + two(d.getSeconds()); } }
  function mmss(ms){ var s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ':' + two(s % 60); }
  function etTime(iso){ try{ return new Intl.DateTimeFormat('en-US', { timeZone:'America/New_York', hour:'numeric', minute:'2-digit' }).format(new Date(iso)) + ' ET'; }catch(e){ return String(iso || '').slice(11, 16); } }
  function etDate(iso){ try{ return new Intl.DateTimeFormat('en-US', { timeZone:'America/New_York', month:'numeric', day:'numeric', hour:'numeric', minute:'2-digit' }).format(new Date(iso)) + ' ET'; }catch(e){ return String(iso || '').slice(0, 16); } }
  B.rd = rd; B.wr = wr; B.rm = rm; B.js = js; B.bid = bid; B.isPhone = isPhone; B.clock = clock; B.mmss = mmss; B.etTime = etTime; B.etDate = etDate;
  B.buildLine = function(){ return 'BUILD ' + (STAMP.cv || '?') + ' · deployed ' + (STAMP.at? etTime(STAMP.at) : '?'); };
  // CARD 2 THE DIALS: EVERY SEAT (implies TRACK PRE-ANSWERED) · TRACK PRE-ANSWERED; a bench key, so RESET never touches it
  function dialsRead(){ var d = js(K.dials, null) || {}; var seat = d.seat? 1 : 0; return { seat:seat, track:(seat || d.track)? 1 : 0 }; }
  function dialsText(d){ d = d || {}; var a = []; if(d.seat) a.push('EVERY SEAT'); if(d.track) a.push('TRACK PRE-ANSWERED'); return ' · dials: ' + (a.length? a.join(', ') : 'none'); }
  B.dialsRead = dialsRead; B.dialsText = dialsText;

  // THE DOORSTEP: the launcher's reset leaves a flag; here, BEFORE the game's script runs (no flush of this page can undo it), every
  // gvt_ key is wiped once more and the preset's seed re-applied. Collect the keys first (Chrome reshuffles key(i) on removal).
  var doorstep = null;
  (function(){ var pend = js('bench_pend', null); if(!pend || !pend.at || Date.now() - pend.at > 120000){ if(pend) rm('bench_pend'); return; }
    var ks = []; try{ for(var i = 0; i < localStorage.length; i++){ var k = localStorage.key(i); if(k && k.indexOf('gvt_') === 0) ks.push(k); } }catch(e){}
    ks.sort().forEach(function(k){ rm(k); });
    if(pend.coach) wr('gvt_coach', '1');
    if(pend.meta) wr('gvt_meta', pend.meta);
    rm('bench_pend');
    doorstep = { preset:pend.preset, found:ks };
  })();
  // the run: minted by the launcher at RESET (bench_cur); a page opened with no run gets one marked NO RESET
  B.cur = js(K.cur, null);
  if(!B.cur || !B.cur.n){
    var n0 = (parseInt(rd(K.runN) || '0', 10) || 0) + 1; wr(K.runN, String(n0));
    B.cur = { n:n0, t0:Date.now(), at:new Date().toISOString(), preset:'NO RESET', tag:rd(K.tag) || '', dials:dialsRead(), dice:'REAL', screen:isPhone()? 'phone' : 'desk', bid:bid(), build:{ cv:STAMP.cv, md5:STAMP.md5, sha:STAMP.sha, at:STAMP.at } };
    wr(K.cur, JSON.stringify(B.cur));
  }
  B.run = js(K.run + B.cur.n, null) || { n:B.cur.n, hdr:B.cur, log:[], notes:[] };
  B.run.hdr = B.run.hdr || B.cur;
  var saveT = 0;
  function persist(now){
    if(saveT){ clearTimeout(saveT); saveT = 0; }
    if(!now){ saveT = setTimeout(function(){ saveT = 0; persist(true); }, 250); return; }
    if(B.run.log.length > LOG_CAP) B.run.log = B.run.log.slice(-LOG_CAP);
    if(!wr(K.run + B.run.n, JSON.stringify(B.run))){ B.trim(); wr(K.run + B.run.n, JSON.stringify(B.run)); }
  }
  B.persist = persist;
  B.trim = function(){   // keep the newest RUNS_KEEP runs in this browser
    var ns = B.runList().map(function(r){ return r.n; }).sort(function(a, b){ return b - a; });
    ns.slice(RUNS_KEEP).forEach(function(n){ rm(K.run + n); });
  };
  B.runList = function(){
    var out = [];
    try{ for(var i = 0; i < localStorage.length; i++){ var k = localStorage.key(i); if(k && k.indexOf(K.run) === 0){ var n = parseInt(k.slice(K.run.length), 10); if(n > 0) out.push(js(k, null) || { n:n, hdr:{}, log:[], notes:[] }); } } }catch(e){}
    return out.sort(function(a, b){ return b.n - a.n; });
  };

  // ---------- the log ----------
  // a row: { t: ms since the run began, c: the clock, lv: 'L2' or '', scr: the screen, k: the kind, x: the text }
  B.stamp = function(){ var st = null; try{ st = B.state && B.state(); }catch(e){} return { lv:(st && st.lv) || '', scr:(st && st.scr) || 'boot' }; };
  B.log = function(kind, text, extra){
    var st = B.stamp(), row = { t:Date.now() - (B.run.hdr.t0 || B.cur.t0), c:clock(new Date()), lv:st.lv, scr:st.scr, k:String(kind || 'EV'), x:String(text || '').slice(0, 900) };
    if(extra) row.e = String(extra).slice(0, 1400);
    B.run.log.push(row); persist();
    for(var i = 0; i < B.listeners.length; i++){ try{ B.listeners[i](row); }catch(e){} }
    return row;
  };
  B.note = function(text, stampLine){
    var st = B.stamp(), row = { t:Date.now() - (B.run.hdr.t0 || B.cur.t0), c:clock(new Date()), lv:st.lv, scr:st.scr, s:String(stampLine || '').slice(0, 600), x:String(text || '').slice(0, 4000) };
    B.run.notes.push(row); persist(true);
    B.log('NOTE', text.length > 120? text.slice(0, 117) + '...' : text);
    return row;
  };
  B.rowText = function(r){ return '[+' + mmss(r.t) + ' · ' + (r.lv || '-') + ' · ' + r.scr + '] ' + r.k + ' · ' + r.x + (r.e? '\n    ' + r.e.split('\n').join('\n    ') : ''); };
  // COPY RUN's one fixed grammar: the header · the road table (CARD 3) · the log oldest first · the notes with their stamps
  B.text = function(run){
    run = run || B.run; var h = run.hdr || {}, b = h.build || {};
    var wire = { killed:0, passed:0, errors:0 }, byPath = {};
    run.log.forEach(function(r){ if(r.k === 'LEAK'){ wire.killed++; var p = (r.x.match(/(GET|POST|BEACON|XHR|WS) ([^ ]+)/) || [])[2] || '?'; byPath[p] = (byPath[p] || 0) + 1; } else if(r.k === 'WIRE') wire.passed++; else if(r.k === 'ERROR') wire.errors++; });
    var paths = Object.keys(byPath).map(function(p){ return p + ' x' + byPath[p]; }).join(', ');
    var L = [];
    L.push('GVT PLAYTEST BENCH · RUN ' + run.n);
    L.push('BUILD ' + (b.cv || '?') + ' · deployed ' + (b.at? etDate(b.at) : '?') + ' (md5 ' + String(b.md5 || '').slice(0, 8) + ', HEAD ' + (b.sha || '?') + ')');
    L.push((h.at? etDate(h.at) : '') + ' · ' + (h.preset || '') + ' · ' + (h.dice || 'REAL') + ' DICE · tag ' + (h.tag || '(none)') + ' · ' + (h.screen || '') + ' (browser ' + (h.bid || '') + ')' + dialsText(h.dials));
    L.push('wire: ' + wire.killed + ' answered in place' + (paths? ' (' + paths + ')' : '') + ' · ' + wire.passed + ' board GET passed through · ' + wire.errors + ' error rows');
    L.push('');
    L.push('THE ROAD (CARD 3): not yet');
    L.push('');
    L.push('THE RUN LOG (oldest first)');
    run.log.forEach(function(r){ L.push(B.rowText(r)); });
    L.push('');
    L.push('NOTES (' + run.notes.length + ')');
    run.notes.forEach(function(r){ L.push('[+' + mmss(r.t) + ' · ' + (r.lv || '-') + ' · ' + r.scr + (r.s? ' · ' + r.s : '') + ']'); L.push('  ' + r.x.split('\n').join('\n  ')); });
    return L.join('\n') + '\n';
  };

  // ---------- THE DEAD WIRE ----------
  var HOST = /^https?:\/\/(www\.)?nationgame\.live(\/|$)/i;   // the one NET host: every /gvt/ call builds off the one NET constant (asserted at stage time)
  var BOARD = /\/gvt\/board(\?|$)/;
  function isWire(u){ return HOST.test(String(u || '')); }
  function pathOf(u){ try{ var a = new URL(String(u), location.href); return a.pathname; }catch(e){ return String(u).replace(/^https?:\/\/[^\/]+/, '').split('?')[0]; } }
  function dead(){ return new Response('{"ok":false,"err":"bench"}', { status:403, statusText:'bench', headers:{ 'Content-Type':'application/json' } }); }
  function leak(kind, u){ var p = pathOf(u); B.wire.killed++; B.wire.byPath[p] = (B.wire.byPath[p] || 0) + 1; B.log('LEAK', kind + ' ' + p + ' answered in place'); }
  var F0 = W.fetch;
  W.fetch = function(u, o){
    var url = (u && typeof u === 'object' && u.url)? u.url : String(u);
    if(isWire(url)){
      var m = String((o && o.method) || (u && u.method) || 'GET').toUpperCase();
      if(m === 'GET' && BOARD.test(url)){   // THE ONE PASS-THROUGH: the board with no device: a read, never a mint (resolve_ro)
        var clean = url.split('?')[0]; B.wire.passed++; B.log('WIRE', 'GET /gvt/board passed through (no device)');
        return F0.call(W, clean, { method:'GET', cache:'no-store', credentials:'omit' });
      }
      leak(m, url); return Promise.resolve(dead());
    }
    return F0.apply(W, arguments);
  };
  var SB0 = navigator.sendBeacon? navigator.sendBeacon.bind(navigator) : null;
  navigator.sendBeacon = function(u, d){ if(isWire(u)){ leak('BEACON', u); return true; } return SB0? SB0(u, d) : false; };
  var XO = XMLHttpRequest.prototype.open, XS = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(m, u){ this.__benchDead = isWire(u)? (String(m || 'GET').toUpperCase() + ' ' + String(u)) : null; return XO.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function(){ var x = this; if(x.__benchDead){ leak('XHR', x.__benchDead.split(' ')[1]); setTimeout(function(){ try{ x.dispatchEvent(new Event('error')); }catch(e){} }, 0); return; } return XS.apply(this, arguments); };
  if(W.WebSocket){ var WS0 = W.WebSocket; W.WebSocket = function(u, p){ if(isWire(u)){ leak('WS', u); throw new Error('bench: the wire is dead'); } return p === undefined? new WS0(u) : new WS0(u, p); }; W.WebSocket.prototype = WS0.prototype; try{ W.WebSocket.CONNECTING = 0; W.WebSocket.OPEN = 1; W.WebSocket.CLOSING = 2; W.WebSocket.CLOSED = 3; }catch(e){} }

  // ---------- THE ERROR HOOKS ----------
  function err(kind, msg, stack){
    var row = { kind:kind, msg:String(msg || '').slice(0, 400), stack:String(stack || '').slice(0, 1200), at:Date.now() };
    B.errors.push(row); if(B.errors.length > 200) B.errors = B.errors.slice(-200);
    B.log('ERROR', kind + ' · ' + row.msg, row.stack);
  }
  W.addEventListener('error', function(ev){ try{ if(ev && ev.error){ err('page error', ev.error.message || ev.message, ev.error.stack || (ev.filename + ':' + ev.lineno)); } else if(ev && ev.message){ err('page error', ev.message, (ev.filename || '') + ':' + (ev.lineno || '')); } }catch(e){} });
  W.addEventListener('unhandledrejection', function(ev){ try{ var r = ev && ev.reason; err('unhandled rejection', (r && r.message) || String(r), r && r.stack); }catch(e){} });
  var CE0 = console.error;
  console.error = function(){ try{ var a = Array.prototype.slice.call(arguments).map(function(x){ return (x && x.stack)? x.stack : String(x); }).join(' '); err('console.error', a.split('\n')[0], a); }catch(e){} return CE0.apply(console, arguments); };
  B.err = err;

  // ---------- THE AD BRIDGE (CARD 2): the bench stands in as the shells' ad provider ----------
  // The game's ADS_BRIDGE reads webkit.messageHandlers.gvtAds ONCE at boot; the bench presents that one handler (never gvtIAP, never
  // gvtSign). The page posts init / show / load; the shell's answers are the four GVTN doors (_adsInit · _adsReady · _adsCreative ·
  // _adsResult). The game's own gate (squadAdGate: the cradle, the cliff, the 2-3 clock, the minute gap, the sitting cap, the paid
  // flags) decides WHEN a break is due; the bench only paints the AD PLACEMENT card (slot 2 owns the painter) and answers the tap.
  var ADB = B.ads = { on:false, posts:[], pend:null, shows:0, inits:0, answered:0, painter:null };
  function gvtn(fn, d){ try{ var G = W.GVTN; if(G && typeof G[fn] === 'function'){ G[fn](d); return true; } }catch(e){ err('bench', 'GVTN.' + fn + ': ' + (e && e.message), e && e.stack); } return false; }
  function adsReady(){ gvtn('_adsReady', { int:true, rew:true }); }
  B.gvtn = gvtn; B.adsReady = adsReady;
  (function(){
    var MH = null;
    try{ W.webkit = W.webkit || {}; W.webkit.messageHandlers = W.webkit.messageHandlers || {}; MH = W.webkit.messageHandlers; }catch(e){ MH = null; }
    if(!MH){ B.log('BENCH', 'window.webkit refused the bench\'s ad handler: the bench cannot stand in as the provider on this page'); return; }
    if(MH.gvtAds){ B.log('BENCH', 'a real gvtAds handler already stands on this page: the bench does not stand in'); return; }
    MH.gvtAds = { postMessage:function(m){
      m = m || {}; var cmd = String(m.cmd || '');
      ADB.posts.push(cmd + (m.kind? ':' + m.kind : '') + (m.id != null? '#' + m.id : '')); if(ADB.posts.length > 60) ADB.posts.shift();
      if(cmd === 'init'){ ADB.inits++; setTimeout(function(){ gvtn('_adsInit', { ok:true }); adsReady(); ADB.answered++; B.log('AD', 'THE BENCH ANSWERS AS THE AD PROVIDER · init ok · fill: interstitial and rewarded (the shells\' bridge shape; nothing served, nothing on the wire)'); }, 0); return; }
      if(cmd === 'load'){ setTimeout(adsReady, 0); return; }
      if(cmd === 'show'){
        ADB.shows++; var req = { kind:String(m.kind || 'int'), id:m.id, at:Date.now() }; ADB.pend = req;
        if(typeof ADB.painter === 'function'){ try{ ADB.painter(req); return; }catch(e){ err('bench', 'the card painter: ' + (e && e.message), e && e.stack); } }
        ADB.pend = null; B.log('BENCH', 'a show was asked with no card painter on this page (slot 2 missing): answered as ' + (req.kind === 'int'? 'complete' : 'not finished') + ' at once');
        setTimeout(function(){ gvtn('_adsResult', { id:req.id, kind:req.kind, completed:req.kind === 'int' }); adsReady(); }, 0); return;
      }
      B.log('BENCH', 'the bridge received an unknown command: ' + cmd);
    } };
    ADB.on = true;
  })();

  // the run's first rows on this page
  var nb = /[?&]nb=/.test(location.search);
  B.log('PAGE', (nb? 'NEW BUILD reload landed (?nb) · ' : 'the bench page opened · ') + B.buildLine() + ' · ' + (B.cur.preset || '') + ' · ' + (B.cur.screen || ''));
  if(doorstep) B.log('RESET', 'the doorstep wipe before the game booted: ' + (doorstep.found.length? 'a gvt_ key still stood and was wiped again: ' + doorstep.found.join(' ') : 'clean, nothing stood') + ' · ' + doorstep.preset);
  W.addEventListener('pagehide', function(){ persist(true); });
  document.addEventListener('visibilitychange', function(){ if(document.hidden) persist(true); });
})();
