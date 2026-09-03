/* GVT PLAYTEST BENCH · slot 2 (the strip script) · FM-GVT-BENCH-01
   Runs AFTER the game's one inline script, in the same document (the game's top-level names are bare names here; its
   function declarations rebind on window: the 0559 seam law). Jobs: the reserved device (9 x32, the box refuses it),
   the run log's hooks (verdicts, XP, launches, the picker, cards, landings, doors, the coach, the briefings, THE RULER's
   own events, every META ledger line that moves on a save), the strip in the game's chin (the phone folds to one chip),
   the LOG, the NOTE pad (the sim holds while it is open), COPY RUN / DOWNLOAD RUN, the DIALS page. Never dials the ads,
   never writes gvt_coach, never shortcuts a door. No em or en dashes in any string a player reads. */
(function(){
  'use strict';
  var W = window, D = document, B = W.__bench;
  if(!B){ return; }
  var RIG = new Array(33).join('9');   // the reserved rig shape: one hex digit x32 that no kit uses (the box's RIG_DEV_RE refuses it at the top of do_POST)
  var UI_ = W.UI;
  var gameUp = (typeof S !== 'undefined') && (typeof META !== 'undefined') && !!D.getElementById('cv');
  var hooks = { on:[], missing:[] };
  var CSS = ''
    + ':root{--bench-chin:0px}'
    + '#benchBar{position:fixed;left:0;right:0;bottom:0;height:var(--bench-chin);background:#14110e;border-top:2px solid #7FA35C;color:#F3EBD6;font-family:var(--ui,"Arial Narrow",Impact,"Helvetica Neue",Arial,sans-serif);z-index:40;box-sizing:border-box;display:flex;flex-direction:column;justify-content:center;gap:3px;padding:3px 12px;overflow:hidden;user-select:none;-webkit-user-select:none}'
    + '#benchBar.phone{flex-direction:row;align-items:center;gap:10px;padding:0 8px}'
    + '#benchHdr{display:flex;gap:14px;align-items:baseline;font-size:26px;line-height:1.05;white-space:nowrap;overflow:hidden;flex:0 0 auto}'
    + '#benchHdr b{color:#FFF3C4;letter-spacing:.04em}'
    + '#benchLast{color:#B8AE95;font-size:26px;line-height:1.05;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1 1 auto;min-width:0}'
    + '#benchRow{display:flex;gap:8px;align-items:stretch}'
    + '.bbtn{background:#2a3a20;color:#F3EBD6;border:2px solid #7FA35C;border-radius:8px;font-family:inherit;font-weight:800;font-size:26px;letter-spacing:.05em;text-transform:uppercase;padding:0 16px;height:44px;line-height:40px;cursor:pointer;white-space:nowrap;touch-action:manipulation}'
    + '.bbtn.note{background:#7FA35C;color:#14110e;flex:1 1 auto;font-size:28px}'
    + '.bbtn.warn{border-color:#D96A55;background:#3a2020}'
    + '.bbtn:active{filter:brightness(1.2)}'
    + '#benchBar.phone .bbtn{height:32px;line-height:28px;font-size:26px;padding:0 10px;border-width:2px}'
    + '#benchBar.phone .bbtn.note{flex:0 0 auto;font-size:26px}'
    + '#benchBar.phone #benchHdr{font-size:26px;gap:8px;flex:1 1 auto;min-width:0}'
    + '#benchBar.phone #benchLast{display:none}'
    + '.benchOv{position:fixed;inset:0;background:rgba(10,8,6,.96);color:#F3EBD6;font-family:var(--ui,"Arial Narrow",Impact,"Helvetica Neue",Arial,sans-serif);z-index:60;display:flex;flex-direction:column;padding:14px 16px;box-sizing:border-box;gap:10px;touch-action:pan-y}'
    + '.benchOv h2{margin:0;font-size:28px;color:#FFF3C4;letter-spacing:.05em;text-transform:uppercase;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
    + '.benchOv .stampLine{font-size:26px;color:#B8AE95;line-height:1.2}'
    + '.benchOv .row{display:flex;gap:10px;flex-wrap:wrap;align-items:stretch}'
    + '.benchOv textarea{flex:1 1 auto;min-height:120px;width:100%;box-sizing:border-box;background:#0d0b09;color:#F3EBD6;border:2px solid #7FA35C;border-radius:8px;font:26px/1.3 var(--ui,"Helvetica Neue",Arial,sans-serif);padding:12px;resize:none;-webkit-user-select:text;user-select:text}'
    + '.benchOv.phone textarea{font-size:26px;min-height:70px}'
    + '.benchOv.phone h2{font-size:26px}.benchOv.phone .stampLine{font-size:26px}.benchOv.phone .bbtn{height:40px;line-height:36px;font-size:26px}'
    + '#benchLogList{flex:1 1 auto;overflow:auto;background:#0d0b09;border:2px solid #3a3d2a;border-radius:8px;padding:8px 12px;font-size:26px;line-height:1.2;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}'
    + '.benchOv.phone #benchLogList{font-size:26px}'
    + '#benchLogList .r{padding:3px 0;border-bottom:1px solid #221e18;word-break:break-word}'
    + '#benchLogList .r .st{color:#8F866F;font-size:.8em;margin-right:8px}'
    + '#benchLogList .r.ERROR{color:#FF9A8C}#benchLogList .r.LEAK,#benchLogList .r.WIRE,#benchLogList .r.RULER{color:#8F866F;font-size:.85em}#benchLogList .r.PRIZE,#benchLogList .r.VERDICT{color:#FFF3C4}#benchLogList .r.NOTE{color:#A9D18E}'
    + '#benchToast{position:fixed;left:50%;bottom:calc(var(--bench-chin) + 14px);transform:translateX(-50%);background:#FFF3C4;color:#14110e;font-family:var(--ui,"Arial Narrow",Impact,sans-serif);font-weight:800;font-size:26px;padding:10px 18px;border-radius:10px;z-index:65;max-width:92vw;text-align:center;pointer-events:none}'
    + '#benchSheet .item{font-size:26px;padding:10px 0;color:#F3EBD6;border-bottom:1px solid #2a2620;line-height:1.3}'
    + '@media (prefers-reduced-motion: reduce){#benchBar,.benchOv,#benchToast{transition:none;animation:none}}';

  function el(tag, attrs, kids){ var e = D.createElement(tag); if(attrs) for(var k in attrs){ if(k === 'text') e.textContent = attrs[k]; else if(k === 'html') e.innerHTML = attrs[k]; else if(k === 'on') for(var ev in attrs.on) e.addEventListener(ev, attrs.on[ev]); else e.setAttribute(k, attrs[k]); } (kids || []).forEach(function(c){ if(c) e.appendChild(c); }); return e; }
  function btn(label, cls, fn){ return el('button', { 'class':'bbtn' + (cls? ' ' + cls : ''), type:'button', text:label, on:{ click:function(ev){ ev.preventDefault(); ev.stopPropagation(); try{ fn(ev); }catch(e){ B.err('bench', 'button ' + label + ': ' + (e && e.message), e && e.stack); } } } }); }
  function stop(ev){ ev.stopPropagation(); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }

  // ---------- THE DEVICE (the layer of its own, independent of any seed) ----------
  var devNote = '';
  if(gameUp && !W.__BENCH_NODEV){ try{ if(META.deviceId !== RIG){ var was = String(META.deviceId || '').slice(0, 8); META.deviceId = RIG; saveMeta(); devNote = ' · device rewritten to the reserved shape (was ' + (was || 'none') + '...)'; } }catch(e){} }

  // ---------- the state the stamps read ----------
  var last = { scr:'', card:'', verdict:'', firstRoom:false, replayNoted:false, verdictKey:'', pill:'' };
  function lvl(){ try{ return (S.mode === 'play' || S.mode === 'win' || S.mode === 'lose')? (S.bf? 'BF' : 'L' + (S.levelN | 0)) : ''; }catch(e){ return ''; } }
  function scr(){ try{ return telScreen(); }catch(e){ try{ return S.mode; }catch(e2){ return '?'; } } }
  function bar(){ try{ return 'LV ' + (META.lvl | 0) + ' ' + (META.xp | 0) + '/' + xpNeed() + ' XP · ' + (META.starBank | 0) + ' stars'; }catch(e){ return ''; } }
  function state(){ try{ return 'campaign ' + (META.campaign | 0) + ' · ' + bar() + ' · picks ' + (META.pendingPicks | 0); }catch(e){ return ''; } }
  B.state = function(){ return { lv:lvl(), scr:scr() }; };

  // ---------- the hooks (bare-name rebinding of the game's function declarations) ----------
  function wrap(name, before, after){
    var f = W[name];
    if(typeof f !== 'function'){ hooks.missing.push(name); return; }
    W[name] = function(){ var pre = null, args = arguments; try{ if(before) pre = before.apply(this, args); }catch(e){} var r = f.apply(this, args); try{ if(after) after.call(this, r, pre, args); }catch(e){ B.err('bench', 'hook ' + name + ': ' + (e && e.message), e && e.stack); } return r; };
    hooks.on.push(name);
  }
  function wrapUI(name, before, after){
    if(!UI_ || typeof UI_[name] !== 'function'){ hooks.missing.push('UI.' + name); return; }
    var f = UI_[name];
    UI_[name] = function(){ var pre = null, args = arguments; try{ if(before) pre = before.apply(this, args); }catch(e){} var r = f.apply(this, args); try{ if(after) after.call(this, r, pre, args); }catch(e){ B.err('bench', 'hook UI.' + name + ': ' + (e && e.message), e && e.stack); } return r; };
    hooks.on.push('UI.' + name);
  }
  function txt(id){ var e = D.getElementById(id); return e? String(e.innerText || e.textContent || '').replace(/\s+/g, ' ').trim() : ''; }

  // the META ledger: every line that moves on a save (the prizes as the game deals them)
  var SKIP = /^(deviceId|stats\.|tel|lastSync|spdCV|adT$|adShown|evSeenAt|lastSeen|paceAt|seenAt|lastBoot)/;
  function flat(o, p, out, depth){
    if(depth > 3) return;
    for(var k in o){ if(!Object.prototype.hasOwnProperty.call(o, k)) continue; var v = o[k], path = p? p + '.' + k : k; if(SKIP.test(path)) continue;
      if(v && typeof v === 'object' && !Array.isArray(v)) flat(v, path, out, depth + 1);
      else out[path] = Array.isArray(v)? '[' + v.map(function(x){ return typeof x === 'object'? JSON.stringify(x) : String(x); }).join(', ') + ']' : (v === undefined? 'undefined' : JSON.stringify(v)); }
    return out;
  }
  var snap = gameUp? flat(META, '', {}, 0) : {};
  function ledgerDiff(){
    var now = flat(META, '', {}, 0), rows = [], k;
    for(k in now) if(now[k] !== snap[k]) rows.push(k + ': ' + (snap[k] === undefined? '(new)' : snap[k]).slice(0, 60) + ' → ' + now[k].slice(0, 60));
    for(k in snap) if(!(k in now)) rows.push(k + ': ' + snap[k].slice(0, 60) + ' → (gone)');
    snap = now;
    if(!rows.length) return;
    var show = rows.slice(0, 14); show.forEach(function(r){ B.log('LEDGER', r); });
    if(rows.length > 14) B.log('LEDGER', '...and ' + (rows.length - 14) + ' more lines moved on this save');
  }

  if(gameUp){
    B.log('STATE', state() + ' · name "' + (META.name || '') + '" · coach key ' + (B.rd('gvt_coach')? 'burned (the hint, not the pills)' : 'none (the pills)') + devNote);
    wrap('saveMeta', null, function(){ ledgerDiff(); });
    wrap('tel', null, function(r, pre, a){ B.log('RULER', String(a[0]) + (a[1] !== undefined? ' ' + a[1] : '') + (a[2] !== undefined? ' ' + a[2] : '')); });
    wrap('xpAward', null, function(promos, pre, a){ var amt = a[0], o = a[1] || {}; B.log('XP', '+' + amt + ' XP (' + (o.src || '') + ') → ' + bar()); if(promos > 0) B.log('PRIZE', 'PROMOTED TO LEVEL ' + (META.lvl | 0) + (o.forcePromo? ' (forced first promotion)' : '') + ' · picks owed ' + (META.pendingPicks | 0)); });
    wrap('endBattle', function(win){ return { win:!!win, n:S.levelN | 0, camp:META.campaign | 0, stars:META.starBank | 0, mercy:!win && S.levelN === 1 && !S.rival && (META.campaign | 0) === 0 && !S.coop, t:+(S.t || 0).toFixed(2) }; },
      function(r, pre){ setTimeout(function(){ try{
        var mode = S.mode; if(mode !== 'win' && mode !== 'lose') return;
        var key = pre.n + ':' + pre.t + ':' + mode; if(key === last.verdictKey) return; last.verdictKey = key;
        var title = mode === 'win'? txt('winTitle') : txt('loseTitle'); var face = mode === 'win'? txt('win') : txt('lose');
        var ls = (META.levelStars || {})['l' + pre.n]; var line = 'L' + pre.n + ' ' + (mode === 'win'? 'WIN' : 'LOSS') + (pre.mercy? ' · THE TAN RETREAT?! (the first-battle mercy)' : '') + ' · ' + title + (ls != null? ' · ' + ls + ' stars' : '') + ' · stars +' + ((META.starBank | 0) - pre.stars) + ' (in pocket ' + (META.starBank | 0) + ')' + ' · campaign ' + pre.camp + ' → ' + (META.campaign | 0);
        last.verdict = 'L' + pre.n + ' ' + (mode === 'win'? 'WIN' : 'LOSS');
        B.log('VERDICT', line, 'the face: ' + face.slice(0, 400));
      }catch(e){} }, 60); });
    wrap('startCampaign', null, function(r, pre, a){ var n = S.levelN | 0; var replay = n <= (META.campaign | 0); B.log('LAUNCH', 'LAUNCH L' + n + (replay? ' · REPLAY TAXED (pays a fifth for five replays, then nothing)' : '') + ' · ' + state()); if(replay && !last.replayNoted){ last.replayNoted = true; toast('REPLAY PAYS A FIFTH. RESET FOR THE REAL PAY.', 6000); } });
    wrap('startBattlefield', null, function(){ B.log('LAUNCH', 'LAUNCH battleground · ' + state()); });
    wrap('showPicker', null, function(){ B.log('PICKER', 'PICKER dealt · x' + (META.pendingPicks | 0) + ' owed'); });
    wrapUI('pick', function(t){ return (META.up || {})[t] | 0; }, function(r, r0, a){ B.log('PICK', 'PICK ' + a[0] + ' · rank ' + r0 + ' → ' + ((META.up || {})[a[0]] | 0) + ' · picks left ' + (META.pendingPicks | 0)); });
    wrapUI('pickW', function(w){ return (META.sargeUp || {})[w] | 0; }, function(r, r0, a){ B.log('PICK', 'PICK Sarge ' + a[0] + ' · rank ' + r0 + ' → ' + ((META.sargeUp || {})[a[0]] | 0) + ' · picks left ' + (META.pendingPicks | 0)); });
    wrap('showMenu', null, function(){ var rc = ''; try{ rc = roomCur(); }catch(e){} if(!last.firstRoom){ last.firstRoom = true; B.log('ROOM', 'FIRST ROOM LANDING · ' + rc + ' · ' + state()); } else B.log('ROOM', 'ROOM landing · ' + rc); });
    wrap('openShop', null, function(r, pre, a){ B.log('DOOR', 'SHOP opened' + (a[0]? ' · ' + a[0] : '')); });
    wrap('startPark', null, function(r, pre, a){ B.log('LAUNCH', 'PARK ' + a[0] + ' rung ' + a[1] + ' launched'); });
    wrap('openWorldRank', null, function(){ B.log('DOOR', 'RANKINGS opened (the real board, no YOU row)'); });
    wrap('openWarTable', null, function(){ B.log('DOOR', 'WAR TABLE opened'); });
    wrap('openCampScene', null, function(){ B.log('DOOR', 'CAMPAIGN scene opened'); });
    wrap('hqOpen', null, function(){ B.log('DOOR', 'HQ sheet opened'); });
    wrap('tvTap', null, function(){ B.log('DOOR', 'TV tapped'); });
    wrap('tvGrant', null, function(){ B.log('PRIZE', 'TV paid (the web pays directly; CARD 2 adds AD PLACEMENT)'); });
    wrap('adGate', null, function(r, pre, a){ B.log('AD', 'AD GATE ' + a[0] + ' (the web shows nothing at the break)'); });
    wrap('namePromptShow', null, function(r, pre, a){ B.log('CARD', (a[0]? 'RENAME card dealt' : 'CHOOSE YOUR NAME dealt') + ' · prefill "' + (META.name || '') + '"'); });
    wrapUI('namePromptSave', null, function(){ B.log('EV', 'NAME saved "' + (META.name || '') + '" (kept locally; nobody at HQ to veto it)'); });
    wrapUI('namePromptKeep', null, function(){ B.log('EV', 'NAME kept "' + (META.name || '') + '"'); });
    wrap('safeOnce', function(){ return !!META.safeSeen; }, function(r, pre){ if(!pre && META.safeSeen) B.log('ONCE', 'SAFETY LINE fired (Sarge, once ever) · ' + scr()); });
    wrap('commBriefing', null, function(r, pre, a){ if(r) B.log('ONCE', 'BRIEFING ' + a[0] + ' dealt (Sarge)'); });
    wrap('commSay', null, function(r, pre, a){ B.log('SARGE', 'Sarge says · ' + String(a[0])); });
    wrap('coachStart', null, function(){ B.log('ONCE', (typeof coach !== 'undefined' && coach)? 'COACH started (boot camp, the pills)' : 'COACH skipped (the key is burned: a used phone shows the hint)'); });
    wrap('coachPill', null, function(r, pre, a){ var p = String(a[0]); if(p !== last.pill){ last.pill = p; B.log('COACH', 'COACH PILL · ' + p); } });   // painted every frame while it stands: one row per line
    wrap('coachDone', null, function(){ B.log('ONCE', 'COACH retired'); });
    wrap('shopIntroTry', null, function(r){ if(r) B.log('ONCE', 'SHOP INTRO dealt (the crate beckons)'); });
    wrap('nbChipShow', null, function(){ B.log('BUILD', 'NEW BUILD chip dealt (UPDATE NOW / NOT NOW)'); });
    wrap('nbGo', function(){ B.log('BUILD', 'UPDATE NOW taken · the page reloads on the deployed build'); B.persist(true); }, null);
    wrapUI('hqRetreat', null, function(){ B.log('EV', 'RETREAT to HQ mid-level'); });
    wrapUI('mileTake', null, function(){ B.log('CARD', 'CARD taken · ' + (last.card || '?')); });
    wrapUI('mboxTake', null, function(){ B.log('CARD', 'MYSTERY BOX taken'); });
    if(hooks.missing.length) B.log('BENCH', 'hooks not found on this build (the log misses those rows): ' + hooks.missing.join(', '));

    // the cards and the once-ever chips: the class attribute of the known hosts + body-parented cards
    var CARD_IDS = { milePop:'CARD', mboxPop:'MYSTERY BOX', starPop:'STAR POP-UP', sabrite:'SABER RITE', paintrite:'PAINT RITE', soulrite:'SOUL RITE', pickrite:'FAVOR RITE', icerite:'ICE RITE', nameProm:'NAME CARD', picker:'PICKER', win:'WIN FACE', lose:'LOSS FACE', title:'TITLE', roomModal:'ROOM MODAL', toyshop:'SHOP', worldrank:'RANKINGS', wartable:'WAR TABLE', campscene:'CAMPAIGN SCENE', parkscene:'PARK SCENE', raidscene:'RAID SCENE' };
    var vis = {};
    function head(id){ if(id === 'milePop'){ var h = D.querySelector('#milePop .mb-h'), b = D.querySelector('#milePop .mb-band'), t = D.querySelector('#milePop .mb-take'); return [h && h.textContent, b && b.textContent, t && ('[' + t.textContent + ']')].filter(Boolean).join(' · ').replace(/\s+/g, ' ').trim(); } if(id === 'mboxPop' || id === 'starPop') return txt(id).slice(0, 120); return ''; }
    function watch(id){
      var e = D.getElementById(id); if(!e) return;
      vis[id] = !e.classList.contains('hidden');
      new MutationObserver(function(){ var v = !e.classList.contains('hidden'); if(v === vis[id]) return; vis[id] = v;
        if(id === 'milePop' || id === 'mboxPop' || id === 'starPop' || /rite$/.test(id)){ if(v){ setTimeout(function(){ var hd = head(id); if(id === 'milePop') last.card = hd; B.log('CARD', CARD_IDS[id] + ' dealt' + (hd? ' · ' + hd : '')); }, 30); } else B.log('CARD', CARD_IDS[id] + ' folded' + (id === 'milePop' && last.card? ' · ' + last.card : '')); }
      }).observe(e, { attributes:true, attributeFilter:['class'] });
    }
    Object.keys(CARD_IDS).forEach(watch);
    new MutationObserver(function(ms){ ms.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes || [], function(n){ if(!n || n.nodeType !== 1) return; if(n.id === 'safechip') B.log('ONCE', 'SAFETY CHIP shown · ' + txt('safechip').slice(0, 120)); if(n.id === 'sqBack') B.log('CARD', 'PARTY card dealt'); if(n.id === 'unofficial') B.log('BENCH', 'UNOFFICIAL COPY banner (this host is not a HOME host)'); }); }); }).observe(D.body, { childList:true });
    // the screen under the player, HEAD's own namer, polled
    setInterval(function(){ try{ var s = scr(); if(s !== last.scr){ last.scr = s; B.log('SCREEN', s + (s === 'play:camp'? ' · L' + (S.levelN | 0) : '')); } }catch(e){} }, 250);

    // THE HOLD: the sim waits while the pad is open (the solo sim only; the v1.44 HQ-sheet law's own seat: frame() keeps painting)
    if(typeof W.update === 'function'){ var U0 = W.update; W.update = function(dt){ if(B.held && !S.coop) return; return U0.apply(this, arguments); }; hooks.on.push('update(hold)'); } else hooks.missing.push('update');
  }
  B.hold = function(on){ B.held = !!on; };

  // ---------- the face ----------
  var style = el('style', { id:'benchCss', text:CSS }); D.head.appendChild(style);
  var phone = B.isPhone();
  var bar_ = el('div', { id:'benchBar', 'class':phone? 'phone' : '' });
  var hdr = el('div', { id:'benchHdr' });
  var lastEl = el('div', { id:'benchLast' });
  var row = el('div', { id:'benchRow' });
  function chinPx(){ return phone? 40 : 80; }   // the dials page D3: the desk band clears the picker's row (its bottom sits 81 px above a 800-tall floor); the phone chip's 26 px type needs 40
  function applyChin(){ D.documentElement.style.setProperty('--bench-chin', chinPx() + 'px'); try{ if(W.GVT && typeof GVT.chin === 'function') GVT.chin(chinPx()); }catch(e){} }
  function hdrText(){ var h = B.run.hdr || {}; return 'RUN ' + B.run.n + ' · ' + B.buildLine() + ' · ' + (h.preset || '') + ' · ' + (h.dice || 'REAL') + ' DICE' + (h.tag? ' · ' + h.tag : '') + ' · ' + (h.screen || '') + ' ' + (h.bid || ''); }
  function paintHdr(){
    hdr.innerHTML = '';
    if(phone){ hdr.appendChild(el('b', { text:'RUN ' + B.run.n })); hdr.appendChild(el('span', { text:(lvl() || '') + ' ' + (B.run.hdr.preset || '') })); }
    else { hdr.appendChild(el('b', { text:'RUN ' + B.run.n })); hdr.appendChild(el('span', { text:hdrText().replace(/^RUN \d+ · /, '') })); }
  }
  function paintLast(r){ if(!r) return; lastEl.textContent = '+' + B.mmss(r.t) + ' · ' + r.k + ' · ' + r.x; }
  B.listeners.push(function(r){ paintLast(r); if(logList && logOpen) appendRow(r, true); if(phone) paintHdr(); });

  var ovs = {}, logList = null, logOpen = false, padOpen = false, clearArm = 0;
  function openOv(id, build){ closeOv(id); var o = el('div', { 'class':'benchOv' + (phone? ' phone' : ''), id:id, on:{ pointerdown:stop, pointerup:stop, click:stop, touchstart:stop, touchend:stop, keydown:stop } }); build(o); D.body.appendChild(o); ovs[id] = o; return o; }
  function closeOv(id){ var o = ovs[id]; if(o){ o.remove(); delete ovs[id]; } if(id === 'benchLog'){ logOpen = false; logList = null; } if(id === 'benchPad'){ padOpen = false; B.hold(false); } }
  function toast(msg, ms){ var t = D.getElementById('benchToast'); if(t) t.remove(); t = el('div', { id:'benchToast', text:msg }); D.body.appendChild(t); setTimeout(function(){ if(t.parentNode) t.remove(); }, ms || 2500); }
  B.toast = toast;

  function rowEl(r){ var d = el('div', { 'class':'r ' + r.k }); d.appendChild(el('span', { 'class':'st', text:'+' + B.mmss(r.t) + ' · ' + (r.lv || '-') + ' · ' + r.scr })); d.appendChild(D.createTextNode(r.k + ' · ' + r.x)); if(r.e && r.k === 'ERROR'){ d.appendChild(el('div', { 'class':'st', text:r.e.slice(0, 300) })); } return d; }
  function appendRow(r, scrollIt){ if(!logList) return; logList.appendChild(rowEl(r)); if(scrollIt) logList.scrollTop = logList.scrollHeight; }
  function openLog(){
    openOv('benchLog', function(o){
      o.appendChild(el('h2', { text:'THE RUN LOG · RUN ' + B.run.n + ' · ' + B.buildLine() }));
      logList = el('div', { id:'benchLogList' }); B.run.log.forEach(function(r){ appendRow(r, false); }); o.appendChild(logList);
      var r = el('div', { 'class':'row' });
      r.appendChild(btn('CLOSE', '', function(){ closeOv('benchLog'); }));
      r.appendChild(btn('COPY RUN', '', function(){ copyRun(B.run); }));
      if(!phone) r.appendChild(btn('DOWNLOAD RUN', '', function(){ downloadRun(B.run); }));
      r.appendChild(btn('CLEAR', 'warn', function(ev){ if(Date.now() - clearArm > 4000){ clearArm = Date.now(); toast('TAP CLEAR AGAIN TO WIPE THIS BROWSER\'S RUN LOGS', 4000); return; } clearRuns(); closeOv('benchLog'); openLog(); }));
      o.appendChild(r);
    });
    logOpen = true; setTimeout(function(){ if(logList) logList.scrollTop = logList.scrollHeight; }, 0);
  }
  function clearRuns(){ B.runList().forEach(function(r){ if(r.n !== B.run.n) B.rm(B.K.run + r.n); }); B.run.log = []; B.run.notes = []; B.persist(true); B.log('BENCH', 'LOG CLEARED (every run in this browser)'); toast('RUN LOGS CLEARED'); }
  function stampLine(){
    var h = B.run.hdr || {}, lc = last.card || 'none yet', lv = lvl(), vd = last.verdict || 'none yet';
    return 'RUN ' + B.run.n + ' · ' + B.buildLine() + ' · ' + (lv? lv : 'last verdict ' + vd) + ' · ' + bar() + ' · ' + scr() + ' · last card: ' + lc + ' · +' + B.mmss(Date.now() - (h.t0 || 0)) + ' · ' + (h.tag || 'no tag') + ' · ' + (h.dice || 'REAL') + ' DICE · dials: none';
  }
  function openPad(){
    if(padOpen) return;
    var st = stampLine();
    openOv('benchPad', function(o){
      o.appendChild(el('h2', { text:'NOTE · RUN ' + B.run.n }));
      o.appendChild(el('div', { 'class':'stampLine', text:st }));
      var ta = el('textarea', { placeholder:'What did that feel like? Type or dictate. The stamp above is the bench\'s; the feeling is yours.', on:{ pointerdown:stop, keydown:stop } });
      o.appendChild(ta);
      var r = el('div', { 'class':'row' });
      r.appendChild(btn('SAVE NOTE', 'note', function(){ var v = ta.value.trim(); if(v){ B.note(v, st); toast('NOTE SAVED TO RUN ' + B.run.n); } closeOv('benchPad'); }));
      r.appendChild(btn('CANCEL', '', function(){ closeOv('benchPad'); }));
      o.appendChild(r);
      setTimeout(function(){ try{ ta.focus(); }catch(e){} }, 50);
    });
    padOpen = true; B.hold(true);   // AFTER openOv (its closeOv of a stale pad clears the state)
  }
  function textPage(text, n){
    openOv('benchText', function(o){
      o.appendChild(el('h2', { text:'RUN ' + n + ' AS TEXT · select all, then use your browser\'s copy' }));
      var ta = el('textarea', { readonly:'readonly', on:{ pointerdown:stop } }); ta.value = text; o.appendChild(ta);
      var r = el('div', { 'class':'row' });
      r.appendChild(btn('SELECT ALL', 'note', function(){ ta.focus(); ta.select(); try{ ta.setSelectionRange(0, ta.value.length); }catch(e){} var ok = false; try{ ok = D.execCommand('copy'); }catch(e){} toast(ok? 'COPIED' : 'SELECTED. NOW USE THE BROWSER\'S COPY.', 3000); }));
      r.appendChild(btn('CLOSE', '', function(){ closeOv('benchText'); }));
      o.appendChild(r);
    });
  }
  function copyRun(run){
    var text = B.text(run);
    var p = null; try{ if(navigator.clipboard && W.isSecureContext) p = navigator.clipboard.writeText(text); }catch(e){ p = null; }
    if(!p){ textPage(text, run.n); return Promise.resolve(false); }
    return p.then(function(){ toast('RUN ' + run.n + ' COPIED · ' + text.length + ' characters · paste it to Claude', 3000); return true; }, function(){ textPage(text, run.n); return false; });
  }
  function downloadRun(run){ var text = B.text(run); try{ var a = el('a', { href:URL.createObjectURL(new Blob([text], { type:'text/markdown' })), download:'run-' + ('0000' + run.n).slice(-4) + '.md' }); D.body.appendChild(a); a.click(); setTimeout(function(){ a.remove(); }, 500); toast('RUN ' + run.n + ' DOWNLOADED'); }catch(e){ textPage(text, run.n); } }
  B.copyRun = copyRun; B.downloadRun = downloadRun;
  function reset(){ B.log('BENCH', 'RESET tapped · the launcher wipes the throwaway and walks back in'); B.persist(true); location.href = './?reset=fresh'; }
  function openSheet(){
    openOv('benchSheet', function(o){
      o.appendChild(el('h2', { text:'RUN ' + B.run.n + ' · ' + B.buildLine() }));
      o.appendChild(el('div', { 'class':'stampLine', text:hdrText() }));
      var r = el('div', { 'class':'row' });
      r.appendChild(btn('COPY RUN', 'note', function(){ copyRun(B.run); }));
      r.appendChild(btn('RESET', 'warn', reset));
      r.appendChild(btn('CLOSE', '', function(){ closeOv('benchSheet'); }));
      o.appendChild(r);
      var items = el('div', { id:'benchSheetItems' });
      items.appendChild(el('div', { 'class':'item', text:'DIALS: none yet. EVERY SEAT, TRACK PRE-ANSWERED and RETREAT ride CARD 2; SAME DICE and the bookmarks ride CARD 3.' }));
      items.appendChild(el('div', { 'class':'item', text:'ABOUT THIS BENCH: the launcher page has the whole list. Never play the real web game in this browser: it shares this save, and RESET wipes it. Notes and runs live in this browser only; COPY RUN is the road to Claude.' }));
      items.appendChild(el('div', { 'class':'item', text:'HQ never hears of this commander. Every call to HQ is answered on this page; RANKINGS shows the real board with no YOU row.' }));
      items.appendChild(el('div', { 'class':'item', text:'The bench plays the DEPLOYED build. When a new build ships, the UPDATE NOW chip appears in a quiet room, as on the web.' }));
      o.appendChild(items);
      o.appendChild(btn('OPEN THE LAUNCHER (RUNS, ABOUT, PRESETS)', '', function(){ B.persist(true); location.href = './'; }));
    });
  }
  function build(){
    bar_.innerHTML = ''; row.innerHTML = '';
    bar_.className = phone? 'phone' : '';
    if(phone){
      bar_.appendChild(hdr);
      bar_.appendChild(btn('NOTE', 'note', openPad));
      bar_.appendChild(btn('LOG', '', openLog));
      bar_.appendChild(btn('MORE', '', openSheet));
    } else {
      var top = el('div', { style:'display:flex;gap:14px;align-items:baseline;min-width:0' }); top.appendChild(hdr); top.appendChild(lastEl); bar_.appendChild(top);
      row.appendChild(btn('NOTE', 'note', openPad));
      row.appendChild(btn('LOG', '', openLog));
      row.appendChild(btn('COPY RUN', '', function(){ copyRun(B.run); }));
      row.appendChild(btn('RESET', 'warn', reset));
      row.appendChild(btn('DIALS', '', openSheet));
      row.appendChild(btn('ABOUT', '', function(){ B.persist(true); location.href = './#about'; }));
      bar_.appendChild(row);
    }
    paintHdr(); paintLast(B.run.log[B.run.log.length - 1]);
  }
  ['pointerdown', 'pointerup', 'click', 'touchstart', 'touchend'].forEach(function(evn){ bar_.addEventListener(evn, stop); });   // the strip never hands a tap to the canvas
  D.body.appendChild(bar_);
  build(); applyChin();
  W.addEventListener('resize', function(){ var p = B.isPhone(); if(p !== phone){ phone = p; build(); applyChin(); } });

  // the rig's read-only door
  W.__benchUI = { hooks:hooks, chin:chinPx, phone:function(){ return phone; }, rects:function(){ var r = bar_.getBoundingClientRect(); return { bar:[r.left, r.top, r.width, r.height], btns:Array.prototype.map.call(bar_.querySelectorAll('.bbtn'), function(b){ var q = b.getBoundingClientRect(); return { t:b.textContent, r:[q.left, q.top, q.width, q.height], fs:parseFloat(getComputedStyle(b).fontSize) }; }), hdrFs:parseFloat(getComputedStyle(hdr).fontSize) }; },
    openPad:openPad, closePad:function(){ closeOv('benchPad'); }, padOpen:function(){ return padOpen; }, openLog:openLog, closeLog:function(){ closeOv('benchLog'); }, logOpen:function(){ return logOpen; }, sheet:openSheet, closeAll:function(){ Object.keys(ovs).forEach(closeOv); },
    stamp:stampLine, text:function(){ return B.text(B.run); }, copy:function(){ return copyRun(B.run); }, held:function(){ return B.held; }, lastCard:function(){ return last.card; }, state:state, gameUp:gameUp, rig:RIG, textPageOpen:function(){ return !!ovs.benchText; } };
  B.log('BENCH', 'the strip is up · ' + (phone? 'the phone chip' : 'the desk band') + ' in the chin (' + chinPx() + ' px) · hooks ' + hooks.on.length + (hooks.missing.length? ' · missing ' + hooks.missing.length : ''));
})();
