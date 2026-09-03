/* GVT PLAYTEST BENCH · slot 2 (the strip script) · FM-GVT-BENCH-01
   Runs AFTER the game's one inline script, in the same document (the game's top-level names are bare names here; its
   function declarations rebind on window: the 0559 seam law). Jobs: the reserved device (9 x32, the box refuses it),
   the run log's hooks (verdicts, XP, launches, the picker, cards, landings, doors, the coach, the briefings, THE RULER's
   own events, every META ledger line that moves on a save), the strip in the game's chin (the phone folds to one chip),
   the LOG, the NOTE pad (the sim holds while it is open), COPY RUN / DOWNLOAD RUN, the DIALS page. Never writes gvt_coach,
   never shortcuts a player-facing door. No em or en dashes in any string a player reads.
   CARD 2 (AD PLACEMENT and RETREAT): the AD PLACEMENT card (the painter behind slot 1's bridge: full screen, the game's own
   display font, a tap anywhere to go on, the X from frame one; the card stamped as the creative so the 25 s belt stands
   down), the seat named on every exit row whether or not a card showed (the gate's own inputs, read only), THE DIALS
   (EVERY SEAT lifts the cradle through GVT.adCfg and the cliff through the staged copy's one named token; TRACK
   PRE-ANSWERED answers the birthday gate 13+ through the game's own door), RETREAT (the running battle forfeited through
   the game's own loss door: lives to zero, the tan flag, endBattle(false); L1 = THE TAN RETREAT?! by the game's own rule).
   The bench never dials the ads outside EVERY SEAT and never adds a branch inside the game's gate.
   CARD 3 (THE LEDGER · THE HIDDEN HAND · BOOKMARKS · SAME DICE): the reward ledger read against the game's OWN tables (every rung a
   bare-name const or table; every grant the game's own ledger; every announce the win face's ticket or the card at home; every take
   his tap) beside the DESIGN road the docs intend (a mismatch prints DRIFT); OWED > HELD (the game's own pacing, named) > GRANTED >
   ANNOUNCED > TAKEN, MISSING only when a landing's line ended without it, EARLY below its rung, TAXED on a replay, boot-owed after a
   RETURN; THE HIDDEN HAND in plain words on every launch and verdict; SAVE THIS MOMENT / RETURN TO (this browser only); SAME DICE
   re-seeded at every level start and wave push. The ledger OBSERVES: it never writes a game ledger. */
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
    + '#benchAd{position:fixed;left:0;right:0;top:0;bottom:var(--bench-chin);z-index:46;background:#0d0b09;color:#F3EBD6;font-family:var(--uih,"Arial Narrow",Impact,"Helvetica Neue",Arial,sans-serif);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;text-align:center;padding:16px 90px;box-sizing:border-box;user-select:none;-webkit-user-select:none;cursor:pointer;touch-action:manipulation}'
    + '#benchAd .hd{font-size:120px;line-height:1;font-weight:800;letter-spacing:.06em;color:#FFF3C4;text-transform:uppercase}'
    + '#benchAd .seat{font-size:30px;line-height:1.2;color:#F3EBD6;letter-spacing:.04em;text-transform:uppercase}'
    + '#benchAd .foot{font-size:26px;line-height:1.25;color:#B8AE95;max-width:940px}'
    + '#benchAd .held{font-size:26px;line-height:1.2;color:#8F866F}'
    + '#benchAd .x{position:absolute;top:14px;right:14px;width:60px;height:60px;border-radius:12px;border:2px solid #7FA35C;background:#2a3a20;color:#F3EBD6;font:800 34px/56px var(--ui,"Arial Narrow",Impact,"Helvetica Neue",Arial,sans-serif);cursor:pointer;touch-action:manipulation;padding:0}'
    + '#benchAd.phone{padding:6px 60px;gap:6px}#benchAd.phone .hd{font-size:84px}#benchAd.phone .seat{font-size:26px}#benchAd.phone .foot{font-size:26px;max-width:640px}#benchAd.phone .x{width:48px;height:48px;font-size:30px;line-height:44px;top:8px;right:8px}'
    + '.bbtn.on{background:#FFF3C4;color:#14110e;border-color:#FFF3C4}'
    + '#benchRoad{font-size:26px;line-height:1.2;color:#FFF3C4;background:#0d0b09;border:2px solid #3a3d2a;border-radius:8px;padding:8px 12px;flex:0 0 auto}'
    + '#benchLedList{flex:1 1 auto;overflow:auto;background:#0d0b09;border:2px solid #3a3d2a;border-radius:8px;padding:8px 12px;font-size:26px;line-height:1.2;-webkit-overflow-scrolling:touch;overscroll-behavior:contain}'
    + '#benchLedList .lh{color:#FFF3C4;font-weight:800;letter-spacing:.05em;padding:8px 0 4px;text-transform:uppercase}'
    + '#benchLedList .lr{padding:3px 0;border-bottom:1px solid #221e18;word-break:break-word;color:#B8AE95}'
    + '#benchLedList .lr b{color:#F3EBD6;font-weight:800}'
    + '#benchLedList .lr.HELD{color:#E8C877}#benchLedList .lr.OWED{color:#FFD24A}#benchLedList .lr.MISSING,#benchLedList .lr.EARLY,#benchLedList .lr.DRIFT{color:#FF9A8C}#benchLedList .lr.GRANTED,#benchLedList .lr.ANNOUNCED,#benchLedList .lr.TAKEN,#benchLedList .lr.OPEN{color:#A9D18E}'
    + '#benchLedList .lr .st{color:#8F866F;font-size:.8em;margin-right:8px}'
    + '.benchOv input.bmName{flex:1 1 auto;min-width:200px;height:52px;background:#0d0b09;color:#F3EBD6;border:2px solid #7FA35C;border-radius:8px;font:26px/1.2 var(--ui,"Helvetica Neue",Arial,sans-serif);padding:0 12px;-webkit-user-select:text;user-select:text}'
    + '#benchBmList .bm{display:flex;gap:10px;align-items:center;flex-wrap:wrap;padding:8px 0;border-bottom:1px solid #221e18;font-size:26px;line-height:1.2}#benchBmList .bm .t{flex:1 1 260px;color:#F3EBD6}#benchBmList .bm .t small{display:block;color:#8F866F;font-size:.8em}'
    + '#benchLogList .r.ROAD{color:#FFF3C4}#benchLogList .r.HAND{color:#E8C877}#benchLogList .r.DICE,#benchLogList .r.BOOKMARK{color:#A9D18E}'
    + '#benchSheet .item .bbtn{vertical-align:middle;margin:0 10px 6px 0}'
    + '@media (prefers-reduced-motion: reduce){#benchBar,.benchOv,#benchToast,#benchAd{transition:none;animation:none}}';

  function el(tag, attrs, kids){ var e = D.createElement(tag); if(attrs) for(var k in attrs){ if(k === 'text') e.textContent = attrs[k]; else if(k === 'html') e.innerHTML = attrs[k]; else if(k === 'on') for(var ev in attrs.on) e.addEventListener(ev, attrs.on[ev]); else e.setAttribute(k, attrs[k]); } (kids || []).forEach(function(c){ if(c) e.appendChild(c); }); return e; }
  function btn(label, cls, fn){ return el('button', { 'class':'bbtn' + (cls? ' ' + cls : ''), type:'button', text:label, on:{ click:function(ev){ ev.preventDefault(); ev.stopPropagation(); try{ fn(ev); }catch(e){ B.err('bench', 'button ' + label + ': ' + (e && e.message), e && e.stack); } } } }); }
  function stop(ev){ ev.stopPropagation(); }
  function esc(s){ return String(s).replace(/[&<>"]/g, function(c){ return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]; }); }

  // ---------- THE DEVICE (the layer of its own, independent of any seed) ----------
  var devNote = '';
  if(gameUp && !W.__BENCH_NODEV){ try{ if(META.deviceId !== RIG){ var was = String(META.deviceId || '').slice(0, 8); META.deviceId = RIG; saveMeta(); devNote = ' · device rewritten to the reserved shape (was ' + (was || 'none') + '...)'; } }catch(e){} }

  // ---------- the state the stamps read ----------
  var last = { scr:'', card:'', verdict:'', firstRoom:false, replayNoted:false, verdictKey:'', pill:'', exit:'', retreat:null, ad:'', cas:0, refund:0, sargeDown:0, alarmAt:0, alarmAnn:false, sargeCd:0, momDue:false, verdicts:0, achSeen:{} };   // CARD 3: the hand's counters
  var STAMP = W.__BENCH_STAMP || {};   // CARD 3: the baked stamp (B.stamp is the row-stamp function; the build's cv/md5/sha/at live here)
  var adCard = null;   // CARD 2: the standing AD PLACEMENT card { m, seat, t0, el, iv }
  var dials = (B.run.hdr && B.run.hdr.dials) || B.dialsRead();   // CARD 2: EVERY SEAT · TRACK PRE-ANSWERED (the run header's, else the browser's)
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
    wrap('saveMeta', null, function(){ ledgerDiff(); roadTick('save'); });
    wrap('tel', null, function(r, pre, a){ B.log('RULER', String(a[0]) + (a[1] !== undefined? ' ' + a[1] : '') + (a[2] !== undefined? ' ' + a[2] : '')); });
    wrap('xpAward', null, function(promos, pre, a){ var amt = a[0], o = a[1] || {}; B.log('XP', '+' + amt + ' XP (' + (o.src || '') + ') → ' + bar()); if(promos > 0) B.log('PRIZE', 'PROMOTED TO LEVEL ' + (META.lvl | 0) + (o.forcePromo? ' (forced first promotion)' : '') + ' · picks owed ' + (META.pendingPicks | 0)); if(o.forcePromo && (META.lvl | 0) === 2) roadSeat('first', 'a', 'the gold row PROMOTED TO LEVEL 2 (the forced first promotion)'); roadTick('xp'); });
    wrap('endBattle', function(win){ var t = +(S.t || 0).toFixed(2), m = !win && S.levelN === 1 && !S.rival && (META.campaign | 0) === 0 && !S.coop; if(m) last.mercyAt = t; return { win:!!win, n:S.levelN | 0, camp:META.campaign | 0, stars:META.starBank | 0, mercy:m || (last.mercyAt === t && (S.levelN | 0) === 1), t:t, retreat:!!(last.retreat && last.retreat.n === (S.levelN | 0) && Date.now() - last.retreat.t < 30000), replay:(S.levelN | 0) <= (META.campaign | 0), lives:S.lives | 0, lost:S.lostLevel | 0, alarm:!!(S.sq && S.sq.boxAlarm), bite:!!(S.sq && S.sq.bite), plain:!S.rival && !S.momRaid && !S.bf && !S.coop && !(S.park && S.park.cfg === S.cfg) && !(S.raid && S.raid.cfg === S.cfg) }; },   // the first-battle mercy calls endBattle twice (the loss, then the game's own win): both calls read the same mark
      function(r, pre){ setTimeout(function(){ try{
        var mode = S.mode; if(mode !== 'win' && mode !== 'lose') return;
        var key = pre.n + ':' + pre.t + ':' + mode; if(key === last.verdictKey) return; last.verdictKey = key;
        var title = mode === 'win'? txt('winTitle') : txt('loseTitle'); var face = mode === 'win'? txt('win') : txt('lose');
        var ls = (META.levelStars || {})['l' + pre.n]; var line = (pre.retreat? 'RETREAT (forfeit) · ' : '') + 'L' + pre.n + ' ' + (mode === 'win'? 'WIN' : 'LOSS') + (pre.mercy? ' · THE TAN RETREAT?! (the first-battle mercy' + (pre.retreat? ': L1 has no loss face' : '') + ')' : '') + (pre.retreat && mode === 'lose'? ' · the game\'s own loss face (TRY AGAIN on the spot, Continue home, the tenth of XP)' : '') + ' · ' + title + (ls != null? ' · ' + ls + ' stars' : '') + ' · stars +' + ((META.starBank | 0) - pre.stars) + ' (in pocket ' + (META.starBank | 0) + ')' + ' · campaign ' + pre.camp + ' → ' + (META.campaign | 0);
        last.verdict = 'L' + pre.n + ' ' + (mode === 'win'? 'WIN' : 'LOSS') + (pre.retreat? ' (retreat)' : ''); if(pre.retreat) last.retreat = null;
        B.log('VERDICT', line, 'the face: ' + face.slice(0, 400));
        last.verdicts++; handVerdict(pre, mode); if(mode === 'win') roadVerdict(pre);   // CARD 3: the hand in plain words, then the tickets read off the face
      }catch(e){} }, 60); });
    wrap('startCampaign', function(n){ diceReseed((n || ((META.campaign | 0) + 1)) * 1000, 'L' + (n || ((META.campaign | 0) + 1)) + ' launch'); last.cas = 0; last.refund = 0; last.sargeDown = 0; last.alarmAt = 0; last.alarmAnn = false; }, function(r, pre, a){ var n = S.levelN | 0; var replay = n <= (META.campaign | 0); handLaunch(n, replay); B.log('LAUNCH', 'LAUNCH L' + n + (replay? ' · REPLAY TAXED (pays a fifth for five replays, then nothing)' : '') + ' · ' + state()); if(replay && !last.replayNoted){ last.replayNoted = true; toast('REPLAY PAYS A FIFTH. RESET FOR THE REAL PAY.', 6000); }
      try{ var k = ((META.lossRun || {})['l' + n]) | 0, mr = (typeof mercyRelief === 'function')? mercyRelief(n) : 1;   // CARD 2: the weak hand's reading at the launch (the full hidden hand is CARD 3's)
        if(mr < 1) B.log('LAUNCH', 'QUIET MERCY on L' + n + ': foe hp and the crate eased ' + Math.round((1 - mr) * 100) + '% (' + k + ' straight losses here; invisible by design; any win clears it)');
        else if(k >= 1) B.log('LAUNCH', 'L' + n + ' after ' + k + ' straight loss' + (k > 1? 'es' : '') + ': no relief yet (quiet mercy begins on the attempt after the second)');
        else if(n === 1 && last.retreatL1) B.log('LAUNCH', 'L1 again: never eased (the coach\'s level; the first battle is always a victory)');
        if(S.sq && S.sq.bite) B.log('LAUNCH', 'THE PROVEN PLAYER on L' + n + ': the box alarm bites earlier (the prior rung at three stars, no loss here yet)'); }catch(e){} });
    wrap('startBattlefield', null, function(){ B.log('LAUNCH', 'LAUNCH battleground · ' + state()); handBattleground(); });
    wrap('endBattlefield', null, function(){ try{ var bi = GVT.bfInfo(); if(bi && bi.dir) B.log('HAND', 'THE DIRECTOR at the whistle: gas ' + (+bi.dir.gas).toFixed(2) + ' (the rubber band on the computer\'s drip and decisions; gain ' + bi.dir.gain + ') · tide ' + (+bi.dir.W).toFixed(2) + ' · the field empty at most ' + (+bi.dir.maxEmpty).toFixed(1) + ' s'); }catch(e){} });
    wrap('sqPushWave', function(n){ diceReseed((S.levelN | 0) * 1000 + (n | 0), 'L' + (S.levelN | 0) + ' wave ' + (n | 0)); }, null);
    wrap('spawnWave', function(){ diceReseed((S.levelN | 0) * 1000 + ((S.wave | 0) + 1), 'L' + (S.levelN | 0) + ' wave ' + ((S.wave | 0) + 1)); }, null);
    wrap('spawnGroup', function(){ var w = S.wave | 0; if(w !== last.spawnWave){ last.spawnWave = w; last.spawnN = 0; } else last.spawnN = (last.spawnN | 0) + 1; diceReseed((S.levelN | 0) * 100000 + w * 100 + last.spawnN, 'L' + (S.levelN | 0) + ' wave ' + w + ' group ' + last.spawnN); }, null);   // the SPAWN itself re-seeds (level, wave, the group's ordinal): a group's spots, wobbles and clocks are drawn right here, so no frame between the push and the walk-on can move them
    wrap('campRefund', null, function(back){ last.cas++; last.refund += (back | 0); });
    wrap('ceremonyChain', null, function(r){ if(r === false) roadLineEnd(); roadTick('chain'); });
    wrap('showPicker', null, function(){ B.log('PICKER', 'PICKER dealt · x' + (META.pendingPicks | 0) + ' owed'); });
    wrapUI('pick', function(t){ return (META.up || {})[t] | 0; }, function(r, r0, a){ B.log('PICK', 'PICK ' + a[0] + ' · rank ' + r0 + ' → ' + ((META.up || {})[a[0]] | 0) + ' · picks left ' + (META.pendingPicks | 0)); });
    wrapUI('pickW', function(w){ return (META.sargeUp || {})[w] | 0; }, function(r, r0, a){ B.log('PICK', 'PICK Sarge ' + a[0] + ' · rank ' + r0 + ' → ' + ((META.sargeUp || {})[a[0]] | 0) + ' · picks left ' + (META.pendingPicks | 0)); });
    wrap('showMenu', null, function(){ var rc = ''; try{ rc = roomCur(); }catch(e){} if(!last.firstRoom){ last.firstRoom = true; B.log('ROOM', 'FIRST ROOM LANDING · ' + rc + ' · ' + state()); } else B.log('ROOM', 'ROOM landing · ' + rc); });
    wrap('openShop', null, function(r, pre, a){ B.log('DOOR', 'SHOP opened' + (a[0]? ' · ' + a[0] : '') + ' · store: web fall-through (a page with no store bridge on the bench: nothing priced, nothing granted, no pitch)'); });
    wrap('startPark', null, function(r, pre, a){ B.log('LAUNCH', 'PARK ' + a[0] + ' rung ' + a[1] + ' launched'); });
    wrap('openWorldRank', null, function(){ B.log('DOOR', 'RANKINGS opened (the real board, no YOU row)'); });
    wrap('openWarTable', null, function(){ B.log('DOOR', 'WAR TABLE opened'); });
    wrap('openCampScene', null, function(){ B.log('DOOR', 'CAMPAIGN scene opened'); });
    wrap('hqOpen', null, function(){ B.log('DOOR', 'HQ sheet opened'); });
    wrap('tvTap', function(){ return { armed:(typeof tvArmed === 'function')? tvArmed() : null, prov:(typeof ADS !== 'undefined' && ADS.provider) || '?' }; }, function(r, pre){ B.log('DOOR', 'TV tapped · ' + (pre.armed === false? 'the set is spent or asleep (a blink, no card)' : pre.prov === 'placeholder'? 'no ad provider on this run: the set pays directly, as the web pays' : 'a real provider is armed: the game asks first (ROLL IT!), then the bench paints the card')); });
    wrap('tvGrant', function(){ return { day:META.tvDay, stars:META.starBank | 0 }; }, function(r, pre){ if(META.tvDay !== pre.day) B.log('PRIZE', 'TV paid +' + ((META.starBank | 0) - pre.stars) + ' stars · the day burns (tvDay ' + META.tvDay + ')' + ((typeof ADS !== 'undefined' && ADS.provider !== 'placeholder')? ' · through the AD PLACEMENT card' : ' (the web pays directly)')); });
    wrap('adGate', function(){ return { games:(META.adGames | 0), sess:(typeof ADQ !== 'undefined')? (ADQ.games | 0) : -1 }; }, function(r, pre, a){ B.log('AD', 'AD GATE ' + a[0] + ' · a door launch: counters only, never a break (lifetime game ' + (META.adGames | 0) + ', this sitting\'s game ' + ((typeof ADQ !== 'undefined')? ADQ.games : '?') + ')'); });
    // CARD 2: the ad seats. squadAdGate is the ONE real seat (the verdict exits and the picker's exits reach it); the bench names the
    // exit and reads the gate's own inputs BEFORE it runs (read only), then says whether a card showed and, if not, every reason why.
    ['retryBtn', 'againBtn', 'pickOutBtn'].forEach(function(id){ var e = D.getElementById(id); if(e) e.addEventListener('click', function(){ last.exit = id === 'pickOutBtn'? 'THE ALL-MAXED DOOR (the picker\'s other exit)' : (String(e.textContent || '').replace(/\s+/g, ' ').trim().toUpperCase() || id) + ' (the verdict exit)'; }, true); });
    wrap('ppSettle', function(){ try{ var pk = D.getElementById('picker'); if((META.pendingPicks | 0) <= 0 && pk && !pk.classList.contains('hidden') && !PGFLOW && !BF_AGAIN && S.mode !== 'menu') last.exit = 'AFTER THE UPGRADE (the picker\'s drained exit, before the room)'; }catch(e){} }, null);
    wrap('campFlowLaunch', function(){ last.exit = 'AFTER THE UPGRADE AND THE CARDS, BEFORE L' + ((META.campaign | 0) + 1) + ' (the flow)'; }, null);
    wrap('bfAgainLaunch', function(){ last.exit = 'PLAY AGAIN (the battleground\'s exit)'; }, null);
    function adWhy(){   // the gate's own inputs, in squadAdGate's own order, read before it runs; never a branch inside it
      var o = { at:Date.now(), game:(META.adGames | 0), exit:last.exit || 'VERDICT EXIT', why:[], due:false, prov:'?' };
      try{
        var a = GVT.ads(); var games = o.game; o.prov = a.provider;
        var sq = !!((S.bf && S.bf.sqAdT) || (S.sq && S.sq.sqAdT)); if(sq) o.why.push('a squad exit (never on the bench)');
        var free = typeof adFree === 'function' && adFree();
        var soloDue = !sq && a.solo === 1 && a.provider !== 'placeholder' && a.sess.games > a.free && a.soloMax > 0 && a.next != null && games >= a.next && a.sess.soloPaid !== a.sess.games;
        if(a.steam) o.why.push('Steam: no ads');
        if(free) o.why.push('paid: No Ads on this save');
        if(a.cradle){ if(a.newbie > 0 && games <= a.newbie) o.why.push('cradle: game ' + games + ' of ' + a.newbie + ' (the six silent games)'); if(a.cliff) o.why.push('cliff: campaign ' + a.rung + ' (breaks begin after campaign ' + a.minCamp + ' is beaten)'); }
        if(a.provider === 'placeholder') o.why.push(a.track === 'teen'? 'no fill yet: the provider has not answered' : a.track === 'child'? 'child track: zero ads' : 'the track is unanswered: the birthday gate asks at the first room visit');
        if(a.sess.games <= a.free) o.why.push('the sitting\'s first game is free (AD_FREE_GAMES ' + a.free + ')');
        if(a.next != null && games < a.next) o.why.push('not due: next at game ' + a.next + ' (every ' + a.soloMin + ' to ' + a.soloMax + ')');
        if(a.sess.games > 0 && a.sess.soloPaid === a.sess.games) o.why.push('this verdict already paid its break');
        var gapLeft = (MAXA.lastShow && a.mgap > 0)? Math.ceil((a.mgap * 60000 - (Date.now() - MAXA.lastShow)) / 1000) : 0;
        if(META.paidEver) o.why.push('paid: a purchase on this save');
        if(a.msess >= a.mcap) o.why.push('swallowed: the sitting cap (' + a.mcap + ')');
        else if(gapLeft > 0) o.why.push('swallowed: gap, ' + gapLeft + ' s left of the phone\'s own minute');
        if(a.live) o.why.push('a show is live');
        o.due = soloDue && !a.cradle && !a.steam && !free;
      }catch(e){ o.why.push('the gate could not be read: ' + (e && e.message)); }
      return o;
    }
    wrap('squadAdGate', adWhy, function(r, pre){ var shown = !!(B.ads && B.ads.pend && B.ads.pend.at >= pre.at); last.exit = '';
      B.log('AD', 'GAME ' + pre.game + ' · ' + pre.exit + ' · ' + (shown? 'AD PLACEMENT shown' : (pre.due? 'DUE, ' : 'NO BREAK (') + (pre.why.length? pre.why.join('; ') : 'no reason read: a bench finding') + (pre.due? '' : ')'))); });
    wrap('hideAllOverlays', function(){ if(adCard) adFinish(adCard.m.kind === 'int', 'torn down by the game (an abort: the held launch still fires once)'); }, null);
    // the birthday gate (the phone's true beat): the log records the TRACK, never the date
    wrap('ageGateAnswer', null, function(t){ if(t) B.log('AD', 'BIRTHDAY GATE answered · track ' + t + (t === 'teen'? ' · the bench answers init: the provider arms' : ' · child track: zero ads on this throwaway, forever (an answer is sticky)')); else B.log('AD', 'BIRTHDAY GATE: an incomplete answer (the card stays)'); });
    wrapUI('ageSkip', null, function(){ B.log('AD', 'BIRTHDAY GATE skipped (the X) · zero ads this sitting · it asks again next boot (HEAD\'s rule)'); });
    wrapUI('adRoll', null, function(){ B.log('AD', 'ROLL IT! taken · the game asked in its own words first; the bench paints the TV card'); });
    wrapUI('adAskX', null, function(){ B.log('AD', 'ROLL IT! declined (the X) · no card, the set stays armed, the day unburned'); });
    wrap('adRepShow', null, function(){ var el = D.getElementById('adRep'); if(el) B.log('AD', 'REPORT CHIP dealt · ' + String(el.textContent || '').trim() + ' · 3 s at the foot of the room · a REAL link (' + String(el.getAttribute('href') || '').slice(0, 60) + ') left live: a public page; a tap leaves the bench, the run persists'); });
    wrap('naOfferShow', null, function(){ B.log('AD', 'store: the daily pitch dealt (a store surface: web fall-through, nothing priced or granted)'); });
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
    wrapUI('mileTake', function(){ roadTaken(head('milePop') || last.card, (typeof MB_TAKE !== 'undefined' && MB_TAKE)? 'IT\'S MINE walks the card\'s own door' : 'IT\'S MINE'); }, function(){ B.log('CARD', 'CARD taken · ' + (last.card || '?')); });   // CARD 3: the standing card's own head at the take (a card dealt by a fold in the same tick never flips the class)
    wrapUI('mboxTake', null, function(){ B.log('CARD', 'MYSTERY BOX taken'); });
    wrapUI('riteTake', function(){ roadTaken(head('milePop') || last.card, 'IT\'S MINE (the rite card)'); }, null);
    wrapUI('stockGo', function(id){ roadTaken(head('milePop') || last.card, 'TAKE ME THERE (the shop, the card ringed)'); }, null);
    if(hooks.missing.length) B.log('BENCH', 'hooks not found on this build (the log misses those rows): ' + hooks.missing.join(', '));

    // the cards and the once-ever chips: the class attribute of the known hosts + body-parented cards
    var CARD_IDS = { milePop:'CARD', mboxPop:'MYSTERY BOX', starPop:'STAR POP-UP', sabrite:'SABER RITE', paintrite:'PAINT RITE', soulrite:'SOUL RITE', pickrite:'FAVOR RITE', icerite:'ICE RITE', nameProm:'NAME CARD', picker:'PICKER', win:'WIN FACE', lose:'LOSS FACE', title:'TITLE', roomModal:'ROOM MODAL', toyshop:'SHOP', worldrank:'RANKINGS', wartable:'WAR TABLE', campscene:'CAMPAIGN SCENE', parkscene:'PARK SCENE', raidscene:'RAID SCENE' };
    var vis = {};
    function head(id){ if(id === 'milePop'){ var h = D.querySelector('#milePop .mb-h'), b = D.querySelector('#milePop .mb-band'), t = D.querySelector('#milePop .mb-take'); return [h && h.textContent, b && b.textContent, t && ('[' + t.textContent + ']')].filter(Boolean).join(' · ').replace(/\s+/g, ' ').trim(); } if(id === 'mboxPop' || id === 'starPop') return txt(id).slice(0, 120); return ''; }
    function watch(id){
      var e = D.getElementById(id); if(!e) return;
      vis[id] = !e.classList.contains('hidden');
      new MutationObserver(function(){ var v = !e.classList.contains('hidden'); var hd = (id === 'milePop' && v)? head(id) : ''; var swapped = id === 'milePop' && v && vis[id] && hd && hd !== last.card; if(v === vis[id] && !swapped) return; var was = vis[id]; vis[id] = v;   // CARD 3: a fold that deals the next card in the same tick (0564) never flips the class; the head's change is the deal
        if(id === 'milePop'){ if(v){ if(swapped) B.log('CARD', 'CARD folded · ' + last.card + ' (the fold dealt the next card in the same tick)'); last.card = hd; B.log('CARD', 'CARD dealt' + (hd? ' · ' + hd : '')); roadCard(hd); } else B.log('CARD', 'CARD folded' + (last.card? ' · ' + last.card : '')); }
        else if(id === 'mboxPop' || id === 'starPop' || /rite$/.test(id)){ if(v){ setTimeout(function(){ var hd2 = head(id); B.log('CARD', CARD_IDS[id] + ' dealt' + (hd2? ' · ' + hd2 : '')); if(id === 'paintrite') roadCard('PAINT DAY'); else if(id === 'sabrite') roadCard("SARGE'S SECRET WEAPON"); }, 30); } else B.log('CARD', CARD_IDS[id] + ' folded'); }
      }).observe(e, id === 'milePop'? { attributes:true, attributeFilter:['class'], childList:true } : { attributes:true, attributeFilter:['class'] });
    }
    Object.keys(CARD_IDS).forEach(watch);
    new MutationObserver(function(ms){ ms.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes || [], function(n){ if(!n || n.nodeType !== 1) return; if(n.id === 'safechip') B.log('ONCE', 'SAFETY CHIP shown · ' + txt('safechip').slice(0, 120)); if(n.id === 'sqBack') B.log('CARD', 'PARTY card dealt'); if(n.id === 'unofficial') B.log('BENCH', 'UNOFFICIAL COPY banner (this host is not a HOME host)'); if(n.id === 'ageGate') B.log('AD', 'BIRTHDAY GATE asked (the first room visit in an ad-capable shell: the phone\'s true beat) · THAT\'S ME or the X'); if(n.id === 'adAsk') B.log('AD', 'ROLL IT! dealt · the TV\'s own disclosure: A REAL AD FROM OUR SPONSORS (the game\'s words) · ROLL IT! or the X'); if(n.id === 'naOffer' || n.id === 'naoffer') B.log('AD', 'store: a no-ads offer card (web fall-through)'); }); }); }).observe(D.body, { childList:true });
    // the screen under the player, HEAD's own namer, polled
    setInterval(function(){ try{ var s = scr(); if(s !== last.scr){ last.scr = s; B.log('SCREEN', s + (s === 'play:camp'? ' · L' + (S.levelN | 0) : '')); } }catch(e){} handWatch(); roadTick('poll'); }, 250);

    // THE HOLD: the sim waits while the pad is open (the solo sim only; the v1.44 HQ-sheet law's own seat: frame() keeps painting)
    if(typeof W.update === 'function'){ var U0 = W.update; W.update = function(dt){ if(B.held && !S.coop) return; return U0.apply(this, arguments); }; hooks.on.push('update(hold)'); } else hooks.missing.push('update');
  }
  B.hold = function(on){ B.held = !!on; };

  // ---------- CARD 3: THE DICE (slot 2's half: the re-seeds) ----------
  // Under SAME DICE the generator installed in slot 1 is re-seeded at every level start (seed, level) and every wave push (seed,
  // level, wave), so the waves land the same however the fight between them went. REAL DICE: nothing here runs.
  function diceReseed(k, why){ var d = B.dice; if(!d || !d.on || typeof d.reseed !== 'function') return; d.reseed(k, why); if(/launch$/.test(why)) B.log('DICE', why + ' under SAME DICE ' + d.seed + ': the dice re-seeded (level ' + Math.floor(k / 1000) + '); every wave push re-seeds too (level, wave)'); }

  // ---------- CARD 3: THE LEDGER (the reward road, read against the game's own tables) ----------
  // The road is READ from the game the bench is running: every rung off HEAD's own const or table by bare name (the 0559 seam law: a
  // top-level const is a bare name here, never a window prop), every grant off the game's own ledger, every announce off the win face's
  // ticket and the #milePop card, every take off the game's own take doors. The bench OBSERVES and never writes a ledger. DESIGN = the
  // road the design docs intend (typed here, each cell with its doc); HEAD's rung stands beside it and a mismatch prints DRIFT, never
  // MISSING. States: ahead (the rung not crossed) > OWED (crossed, not granted) > HELD (owed, and the game's own pacing says not now:
  // the reason named) > GRANTED > ANNOUNCED (the ticket on the win face, the card at home: two seats, both stamped) > TAKEN (his tap);
  // MISSING = owed, not held, and a landing's line ended without it (ceremonyChain said nothing is owed); EARLY = granted below its rung;
  // TAXED = a replayed rung; boot-owed = handed over at the first landing after a RETURN or a pasted save (a newer build's heals).
  var DESIGN = {
    backyard:{ lvl:3, src:'0617 D5 + player-gates-0831 D4' }, ship:{ lvl:3, src:'0617 D5; popup-pacing-0831 D3: lands when he leaves the park' },
    dino:{ lvl:3, src:'juice-reach-0830 P2 Q1 + player-gates-0831 D1' }, teddy:{ lvl:4, src:'treasure-road-0827 §3; paced by popup-pacing-0831 D4' },
    lvl5:{ lvl:5, src:'the medal FIVE-STAR GENERAL (ACH lvl5)' }, elephant:{ lvl:8, src:'intro-flow-0901 D4 (treasure-road-0827 §3 said 2)' },
    winter:{ lvl:8, src:'newbie-road-0824 §2 (0528) + player-gates-0831 D3' }, yeti:{ lvl:8, src:'juice-reach-0830 P2 Q6 + player-gates-0831 D2' },
    tan:{ lvl:8, src:'treasure-road-0827 §3' }, train:{ lvl:10, src:'intro-flow-0901 D4 (treasure-road-0827 §3 said 6)' }, soccer:{ lvl:10, src:'treasure-road-0827 §3' },
    robot:{ lvl:12, src:'treasure-road-0827 §3' }, gold:{ lvl:14, src:'treasure-road-0827 §3' }, spacerug:{ lvl:16, src:'treasure-road-0827 §3' },
    football:{ lvl:18, src:'treasure-road-0827 §3' }, purple:{ lvl:20, src:'treasure-road-0827 §3' },
    first:{ lvl:1, src:'the first battle is always a victory (v0.6) + the forced promotion (intro-flow-0901 D3)' }, ducky:{ lvl:3, src:'0494c (feedback-0822-eve §4)' },
    lens:{ lvl:3, src:'0617 D5 (LENS_FREE_CAMP); the commander door 15 (0363); paced by popup-pacing-0831 D2' }, paint:{ lvl:4, src:'newbie-road-0824 §3 (0529)' },
    shotgun:{ lvl:5, src:'newbie-road-0824 §5: rung 5 is the shotgun\'s (SARGE_WEAPONS)' }, adcliff:{ lvl:5, src:'juice-reach-0830 P3 Q7' }, bigbtn:{ lvl:5, src:'juice-reach-0830 P4 Q17' },
    flowtop:{ lvl:6, src:'juice-reach-0830 P1 Q3' }, bells:{ lvl:9, src:'newbie-road-0824 §4 (0530)' }, sniper:{ lvl:10, src:'newbie-road-0824 §5 (SARGE_WEAPONS)' },
    purse:{ lvl:10, src:'v2.34 THE EARLY-CAMPAIGN PURSE' }, rooftop:{ lvl:18, src:'newbie-road-0824 §2 (0528)' }, saber:{ lvl:20, src:'SARGE_WEAPONS (v2.51)' }
  };
  var ROAD = { rows:[], built:false, drift:0, bootRun:false, cantSee:[] };
  function nowS(){ return '+' + B.mmss(Date.now() - (B.run.hdr.t0 || 0)); }
  function paceWhy(k){
    try{ if(dinoMoment()) return 'DINO PARK owns the moment (0665): the ship, the lens and the bear wait until he leaves the park'; }catch(e){}
    if(META.paceAt === PACE_BOOT && META.paceK !== k) return 'one paced beat a session (0665): ' + META.paceK + ' took this one; the ' + k + ' comes at a later session\'s first landing';
    return 'the teddy\'s card is owed at home first (0665)';
  }
  function rdStd(){ try{ if(milePopUp()) return 'one card at a time (0564): the fold deals the next'; }catch(e){} try{ var pk = D.getElementById('picker'); if(pk && !pk.classList.contains('hidden')) return 'the picker owns the screen: the cards deal after the last pick'; }catch(e){} if(S.mode !== 'menu' && !PGFLOW) return 'waits for the next landing (the room, or the flow\'s line after the picker)'; return ''; }
  function rdBuild(){
    var rows = [], lvl = META.lvl | 0, camp = META.campaign | 0;
    var RI = (typeof ROOM_INFO !== 'undefined')? ROOM_INFO : {}, DI = (typeof DECOR_INFO !== 'undefined')? DECOR_INFO : {}, DE = (typeof DECOR_EARN !== 'undefined')? DECOR_EARN : {}, SW = (typeof SARGE_WEAPONS !== 'undefined')? SARGE_WEAPONS : {}, TR = (typeof TREASURE_ROAD !== 'undefined')? TREASURE_ROAD : null;
    var seen = function(id){ return Array.isArray(META.decorSeen) && META.decorSeen.indexOf(id) >= 0; };
    var own = function(id){ try{ return decOwns(id); }catch(e){ return false; } };
    var room = function(id){ try{ return roomOwns(id); }catch(e){ return false; } };
    var wk = function(w){ try{ return wkOwned(w); }catch(e){ return false; } };
    var rite = function(w){ return Array.isArray(META.riteSeen) && META.riteSeen.indexOf('w:' + w) >= 0; };
    var busy = function(k){ try{ return paceBusy(k); }catch(e){ return false; } };
    var menu = function(){ return S.mode === 'menu'; };
    var nm = function(x){ return String(x || '').toUpperCase(); };
    var giftRow = function(key){ try{ for(var i = 0; i < GIFT_ROAD.length; i++) if(GIFT_ROAD[i].key === key) return GIFT_ROAD[i]; }catch(e){} return null; };
    function push(o){ var d = DESIGN[o.id]; o.design = d? d.lvl : '?'; o.src = d? d.src : 'no design cell'; o.drift = (d && d.lvl !== o.rung)? 1 : 0; o.kind = o.kind || 'prize'; o.st = ''; o.why = ''; rows.push(o); }
    // ---- COMMANDER (META.lvl) ----
    if(typeof BY_FREE_LVL !== 'undefined'){
      push({ id:'backyard', lad:'COMMANDER', rung:BY_FREE_LVL, name:'THE BACKYARD', head:'BY_FREE_LVL ' + BY_FREE_LVL + ' (META.lvl; bySweep at the landing)', granted:function(){ return room('backyard') || !!META.byGift; }, names:[nm(RI.backyard && RI.backyard.name), 'THE BACKYARD'], held:rdStd });
      push({ id:'ship', lad:'COMMANDER', rung:BY_FREE_LVL, name:'THE FLYING PIRATE SHIP', head:'DECOR_EARN.ship (the second room; BY_FREE_LVL ' + BY_FREE_LVL + '; shipCineSweep)', granted:function(){ return own('ship'); }, carded:function(){ return seen('ship'); }, names:[nm(DI.ship && DI.ship.name), 'THE FLYING PIRATE SHIP'],
        held:function(){ try{ if(dinoMoment()) return 'DINO PARK owns the moment (0665): the ship lands when he leaves the park'; }catch(e){} if(!menu()) return 'waits for a room landing: the ship lands on the bed or the lawn (shipCineSweep)'; var rc = ''; try{ rc = roomCur(); }catch(e){} if(rc !== 'bedroom' && rc !== 'backyard') return 'waits for a bedroom or backyard landing (the ship\'s stage)'; return rdStd(); } });
    }
    if(typeof DINO_GIFT_LVL !== 'undefined') push({ id:'dino', lad:'COMMANDER', rung:DINO_GIFT_LVL, name:'DINO PARK', head:'DINO_GIFT_LVL ' + DINO_GIFT_LVL + ' (META.lvl) + the backyard (dinoGift at dinoSweep\'s seat)', granted:function(){ return !!META.parkDino; }, carded:function(){ return !!META.parkDinoSeen; }, names:['DINO PARK'], held:function(){ return room('backyard')? rdStd() : 'waits for the backyard (bySweep deals it first in the chain)'; } });
    if(TR) TR.forEach(function(r){ if(r.lvl > 20) return; var isGift = r.kind === 'gift'; var name = isGift? nm(DI[r.id] && DI[r.id].name) : (function(){ try{ return nm(trName(r.id)); }catch(e){ return nm(r.id); } })();
      push({ id:r.id, lad:'COMMANDER', rung:r.lvl, kind:isGift? 'prize' : 'stock', name:name + (isGift? '' : ' (stock: TAKE ME THERE)'), head:'TREASURE_ROAD ' + r.id + ' lvl ' + r.lvl + ' (' + r.kind + ')',
        granted:isGift? function(){ return own(r.id); } : function(){ try{ return stockSeen(r.id) || trOwned(r); }catch(e){ return false; } }, carded:isGift? function(){ return seen(r.id); } : function(){ try{ return stockSeen(r.id); }catch(e){ return false; } },
        names:[name], held:function(){ if(r.id === 'teddy' && busy('teddy')) return paceWhy('teddy'); return rdStd(); } }); });
    push({ id:'lvl5', lad:'COMMANDER', rung:5, kind:'medal', name:'FIVE-STAR GENERAL (the medal)', head:'ACH lvl5 (Reach Commander Level 5; checkAch at the verdict and the room)', granted:function(){ return !!(META.ach && META.ach.lvl5); }, names:['FIVE-STAR GENERAL'], held:function(){ return ''; } });
    if(typeof WIN_GIFT_LVL !== 'undefined'){
      push({ id:'winter', lad:'COMMANDER', rung:WIN_GIFT_LVL, name:'THE WINTER FIELD', head:'WIN_GIFT_LVL ' + WIN_GIFT_LVL + ' (ROOM_GIFT.winter; roomGiftLvl reads META.lvl)', granted:function(){ return room('winter'); }, names:[nm(RI.winter && RI.winter.name), 'THE WINTER FIELD'], held:rdStd });
      push({ id:'yeti', lad:'COMMANDER', rung:WIN_GIFT_LVL, name:'YETI PARK', head:'WIN_GIFT_LVL ' + WIN_GIFT_LVL + ' + the winter room (yetiGift at castleSweep\'s seat)', granted:function(){ return !!META.parkYeti; }, carded:function(){ return !!META.parkYetiSeen; }, names:['YETI PARK'], held:function(){ return room('winter')? rdStd() : 'waits for the winter field (roomGiftSweep deals it first)'; } });
    }
    // ---- CAMPAIGN (META.campaign) ----
    push({ id:'first', lad:'CAMPAIGN', rung:1, name:'FIRST VICTORY + the forced promotion', head:'endBattle: the first battle is always a victory · xpAward forcePromo (PROMOTED TO LEVEL 2)', granted:function(){ return (META.campaign | 0) >= 1; }, names:['FIRST VICTORY'], held:function(){ return ''; } });
    var gd = giftRow('THE RUBBER DUCKY'); if(DE.ducky) push({ id:'ducky', lad:'CAMPAIGN', rung:DE.ducky.lvl | 0, name:'THE RUBBER DUCKY', head:'DECOR_EARN.ducky.lvl ' + (DE.ducky.lvl | 0) + (gd? ' (GIFT_ROAD)' : ''), granted:function(){ return own('ducky'); }, carded:function(){ return seen('ducky'); }, names:[nm(DI.ducky && DI.ducky.name), 'THE RUBBER DUCKY'], held:rdStd });
    if(typeof LENS_FREE_CAMP !== 'undefined') push({ id:'lens', lad:'CAMPAIGN', rung:LENS_FREE_CAMP, name:'THE MAGIC LENS', head:'LENS_FREE_CAMP ' + LENS_FREE_CAMP + ' (or LENS_FREE_LVL ' + ((typeof LENS_FREE_LVL !== 'undefined')? LENS_FREE_LVL : '?') + ' on the commander ladder; lensDue)', due:function(){ return (META.campaign | 0) >= LENS_FREE_CAMP || ((typeof LENS_FREE_LVL !== 'undefined') && (META.lvl | 0) >= LENS_FREE_LVL); }, granted:function(){ return !!META.lens; }, carded:function(){ return META.lensFree? !!META.lensAnn : !!META.lens; }, names:['THE MAGIC LENS'], held:function(){ return busy('lens')? paceWhy('lens') : rdStd(); } });
    var gp = giftRow('PAINT DAY'); if(typeof PAINT_GIFT_LVL !== 'undefined') push({ id:'paint', lad:'CAMPAIGN', rung:PAINT_GIFT_LVL, name:'PAINT DAY (the choice)', head:'PAINT_GIFT_LVL ' + PAINT_GIFT_LVL + ' (the paint rite at a room landing; GIFT_ROAD\'s owned = a jar or the keep)', granted:function(){ try{ return gp? !!gp.owned() : ((Array.isArray(META.dyes) && META.dyes.length > 0) || !!META.dyeGift); }catch(e){ return false; } }, names:['PAINT DAY'], held:function(){ if(!menu()) return 'waits for a room landing (the paint day is a full-screen rite, out of the flow\'s line)'; var pr = D.getElementById('paintrite'); if(pr && !pr.classList.contains('hidden')) return 'the rite stands: pick a jar or keep the green'; return rdStd(); } });
    ['shotgun', 'sniper', 'lightsaber'].forEach(function(w){ var wd = SW[w]; if(!wd || !(wd.unlock > 0)) return; var id = w === 'lightsaber'? 'saber' : w;
      push({ id:id, lad:'CAMPAIGN', rung:wd.unlock | 0, name:w === 'lightsaber'? 'SARGE\'S SECRET WEAPON (THE SABER)' : 'THE ' + nm(wd.name), head:'SARGE_WEAPONS.' + w + '.unlock ' + (wd.unlock | 0) + ' (the verdict\'s sargeNew; the rite card)', granted:function(){ return wk(w); }, carded:function(){ return rite(w); }, names:[nm(wd.name), 'THE ' + nm(wd.name), w === 'lightsaber'? 'SARGE\'S SECRET WEAPON' : ''], held:function(){ if(!rite(w) && !menu()) return 'the rite card deals at the picker\'s first line or the room landing'; return rdStd(); } }); });
    if(typeof AD_MIN_CAMP !== 'undefined') push({ id:'adcliff', lad:'CAMPAIGN', rung:AD_MIN_CAMP, kind:'state', name:'THE AD CLIFF OPENS (real breaks may begin: CARD 2\'s exit rows say when)', head:'AD_MIN_CAMP ' + AD_MIN_CAMP + ' (adNewbie)', granted:function(){ return (META.campaign | 0) >= AD_MIN_CAMP; }, names:[] });
    if(typeof UI_BIG_TOP !== 'undefined') push({ id:'bigbtn', lad:'CAMPAIGN', rung:UI_BIG_TOP, kind:'state', name:'THE BIG BUTTONS END (' + ((typeof UI_BIG_K !== 'undefined')? UI_BIG_K : '?') + 'x to 1x)', head:'UI_BIG_TOP ' + UI_BIG_TOP + ' (uiK)', granted:function(){ return (META.campaign | 0) >= UI_BIG_TOP; }, names:[] });
    if(typeof CAMP_FLOW_TOP !== 'undefined') push({ id:'flowtop', lad:'CAMPAIGN', rung:CAMP_FLOW_TOP, kind:'state', name:'THE LAST FLOWING RUNG (the next win lands in the room)', head:'CAMP_FLOW_TOP ' + CAMP_FLOW_TOP + ' (campFlowDue)', granted:function(){ return (META.campaign | 0) >= CAMP_FLOW_TOP; }, names:[] });
    if(typeof NIGHT_MIN_LVL !== 'undefined') push({ id:'bells', lad:'CAMPAIGN', rung:NIGHT_MIN_LVL, kind:'state', name:'THE NIGHT BELLS (the event doors open)', head:'NIGHT_MIN_LVL ' + NIGHT_MIN_LVL + ' (nightGateOpen; GIFT_ROAD)', granted:function(){ try{ return nightGateOpen(); }catch(e){ return (META.campaign | 0) >= NIGHT_MIN_LVL; } }, names:[] });
    if(typeof CAMP_PURSE_LVLS !== 'undefined') push({ id:'purse', lad:'CAMPAIGN', rung:CAMP_PURSE_LVLS, kind:'state', name:'THE PURSE ENDS (' + ((typeof CAMP_PURSE !== 'undefined')? CAMP_PURSE : '?') + ' stars a first clear through ' + CAMP_PURSE_LVLS + ', then ' + ((typeof CAMP_PURSE2 !== 'undefined')? CAMP_PURSE2 : '?') + ')', head:'CAMP_PURSE_LVLS ' + CAMP_PURSE_LVLS + ' (CAMP_PURSE · CAMP_PURSE2)', granted:function(){ return (META.campaign | 0) >= CAMP_PURSE_LVLS; }, names:[] });
    if(typeof ROOF_GIFT_LVL !== 'undefined') push({ id:'rooftop', lad:'CAMPAIGN', rung:ROOF_GIFT_LVL, name:'THE ROOFTOP', head:'ROOF_GIFT_LVL ' + ROOF_GIFT_LVL + ' (ROOM_GIFT.rooftop; roomGiftLvl reads META.campaign)', granted:function(){ return room('rooftop'); }, names:[nm(RI.rooftop && RI.rooftop.name), 'THE ROOFTOP'], held:rdStd });
    rows.sort(function(a, b){ return (a.lad === b.lad? 0 : (a.lad === 'COMMANDER'? -1 : 1)) || (a.rung - b.rung); });
    ROAD.rows = rows; ROAD.built = true; ROAD.drift = rows.filter(function(r){ return r.drift; }).length;
    ROAD.cantSee = [];
    try{ GIFT_ROAD.forEach(function(g){ var covered = rows.some(function(r){ return r.names && r.names.indexOf(nm(g.key)) >= 0; }) || (g.key === 'THE BACKYARD AND THE SHIP' && rows.some(function(r){ return r.id === 'ship'; })) || (g.key === 'THE NIGHT BELLS' && rows.some(function(r){ return r.id === 'bells'; })) || (g.key === 'THE SNIPER RIFLE' && rows.some(function(r){ return r.id === 'sniper'; })) || (g.key === 'THE SHOTGUN' && rows.some(function(r){ return r.id === 'shotgun'; })) || (g.key === 'SARGE\'S SECRET WEAPON' && rows.some(function(r){ return r.id === 'saber'; })); if(!covered) ROAD.cantSee.push(g.key); }); }catch(e){}
    ROAD.bootRun = /^(RETURNED|SEEDED)/.test(String(B.run.hdr.preset || ''));
    B.log('ROAD', 'THE ROAD read from the game\'s own tables: ' + rows.length + ' rows (' + rows.filter(function(r){ return r.lad === 'COMMANDER'; }).length + ' on the commander ladder, ' + rows.filter(function(r){ return r.lad === 'CAMPAIGN'; }).length + ' on the campaign ladder) · ' + (ROAD.drift? 'DRIFT on ' + ROAD.drift + ': ' + rows.filter(function(r){ return r.drift; }).map(function(r){ return r.name + ' HEAD ' + r.rung + ' vs design ' + r.design; }).join('; ') : 'no drift against the design road') + (ROAD.cantSee.length? ' · GIFT_ROAD rows the ledger cannot see: ' + ROAD.cantSee.join(', ') : ' · every GIFT_ROAD row covered') + (ROAD.bootRun? ' · a returned or pasted save: prizes handed over at this boot\'s first landing are marked boot-owed' : ''));
    roadTick('boot');
  }
  function rdFind(name){ var n = String(name || '').toUpperCase().replace(/\s+/g, ' ').trim(); if(!n) return null; var best = null; ROAD.rows.forEach(function(r){ (r.names || []).forEach(function(x){ if(x && n.indexOf(x) >= 0 && (!best || x.length > best.len)) best = { r:r, len:x.length }; }); }); return best? best.r : null; }
  function roadSnap(){ var rd = { at:Date.now(), lvl:META.lvl | 0, camp:META.campaign | 0, drift:ROAD.drift, missing:0, early:0, rows:[] }; ROAD.rows.forEach(function(r){ if(r.st === 'MISSING') rd.missing++; if(r.st === 'EARLY') rd.early++; rd.rows.push({ id:r.id, lad:r.lad, rung:r.rung, name:r.name, st:r.st, why:r.why, g:r.g || '', a:r.a || '', c:r.c || '', k:r.k || '', head:r.head, design:r.design, drift:r.drift, tax:r.tax | 0, boot:r.boot | 0 }); }); B.run.road = rd; B.persist(); }
  function roadLog(r, from, to, extra){ B.log('ROAD', (r.lad === 'COMMANDER'? 'LV ' : 'L') + r.rung + ' · ' + r.name + ' · ' + (from || 'ahead') + ' > ' + to + (r.why? ' (' + r.why + ')' : '') + (extra? ' · ' + extra : '') + ' · ' + r.head + ' · design ' + r.design + (r.drift? ' DRIFT' : '') + (r.boot? ' · boot-owed' : '')); }
  function roadTick(ev){
    if(!gameUp || !ROAD.built) return;
    var lvl = META.lvl | 0, camp = META.campaign | 0, changed = 0;
    ROAD.rows.forEach(function(r){
      var due = false, g = false, c = false, why = '';
      try{ due = r.due? !!r.due() : ((r.lad === 'COMMANDER'? lvl : camp) >= r.rung); }catch(e){}
      try{ g = !!r.granted(); }catch(e){}
      try{ c = r.carded? !!r.carded() : false; }catch(e){}
      if(g && !r.g){ r.g = ev === 'boot'? 'before this run' : nowS(); if(ev !== 'boot' && ROAD.bootRun && !last.verdicts) r.boot = 1; }   // a grant already standing at the boot read was earned before this run (a returned or pasted save); one that lands at this boot's first landing is the build's heal: boot-owed
      if(c && !r.c) r.c = ev === 'boot'? 'before this run' : nowS();
      var st = r.st;
      if(r.kind === 'state') st = g? 'OPEN' : (due? 'OWED' : '');
      else if(g && !due && !r.boot && st !== 'TAKEN') st = 'EARLY';
      else if(r.k) st = 'TAKEN';
      else if(c || r.c || r.a) st = 'ANNOUNCED';
      else if(g) st = 'GRANTED';
      else if(due){ if(st === 'MISSING'){ why = r.why; } else { try{ why = r.held? r.held() : ''; }catch(e){ why = ''; } st = why? 'HELD' : 'OWED'; } }
      else st = '';
      if(st !== r.st){ var from = r.st; r.why = why; roadLog(r, from, st, (st === 'GRANTED' || st === 'ANNOUNCED')? 'at ' + ev : ''); r.st = st; changed++; }
      else if(st === 'HELD' && why !== r.why){ r.why = why; changed++; }
    });
    if(changed){ roadSnap(); paintRoad(); }
  }
  function roadSeat(id, seat, note){ var r = null; ROAD.rows.forEach(function(x){ if(x.id === id) r = x; }); if(!r || r[seat]) return; r[seat] = nowS(); B.log('ROAD', (r.lad === 'COMMANDER'? 'LV ' : 'L') + r.rung + ' · ' + r.name + ' · ANNOUNCED: ' + note); roadTick('seat'); }
  function roadVerdict(pre){   // the win face's tickets: the ONE ticket with its WAITING foot, the gold row, the whisper (the winVerdict rig door, read-only)
    try{ var v = GVT.winVerdict(); (v.parts || []).forEach(function(p){ var t = String(p.t || ''); if(/^vz/.test(p.k) || p.k === 'z'){ var r = rdFind(t); if(r && !r.a){ r.a = nowS(); B.log('ROAD', (r.lad === 'COMMANDER'? 'LV ' : 'L') + r.rung + ' · ' + r.name + ' · ANNOUNCED on the win face: the ticket (' + t.replace(/\s+/g, ' ').slice(0, 80) + ')'); } else if(!r && t) B.log('ROAD', 'a ticket the ledger has no row for: ' + t.slice(0, 80)); } }); }catch(e){}
    if(pre.replay){ ROAD.rows.forEach(function(r){ if(r.lad === 'CAMPAIGN' && r.rung === pre.n && !r.tax){ r.tax = 1; B.log('ROAD', 'L' + r.rung + ' · ' + r.name + ' · TAXED (a replayed rung pays a fifth: REPLAY_F; nothing new is owed here)'); } }); }
    roadTick('verdict');
  }
  function roadCard(hd){ var r = rdFind(String(hd || '').split(' · ')[0]); if(!r) return; if(!r.c){ r.c = nowS(); B.log('ROAD', (r.lad === 'COMMANDER'? 'LV ' : 'L') + r.rung + ' · ' + r.name + ' · ANNOUNCED at home: the card dealt (' + String(hd).slice(0, 60) + ')'); } roadTick('card'); }
  function roadTaken(hd, how){ var r = rdFind(String(hd || '').split(' · ')[0]); if(!r || r.k) return; r.k = nowS(); B.log('ROAD', (r.lad === 'COMMANDER'? 'LV ' : 'L') + r.rung + ' · ' + r.name + ' · TAKEN: ' + how); roadTick('take'); }
  function roadLineEnd(){   // ceremonyChain said nothing is owed: every row still owed and not held is MISSING; a granted prize whose card never came, too
    var where = S.mode === 'menu'? 'the room landing (' + (function(){ try{ return roomCur(); }catch(e){ return '?'; } })() + ')' : (PGFLOW? 'the flow\'s line before L' + ((META.campaign | 0) + 1) : 'a fold');
    var rep = (typeof MB_END !== 'undefined' && MB_END === 'repeat')? ' (the same card twice: MB_END repeat)' : '';
    ROAD.rows.forEach(function(r){ if(r.kind === 'state' || r.st === 'TAKEN') return; var due = false, g = false, c = false, why = ''; try{ due = r.due? !!r.due() : (((r.lad === 'COMMANDER'? META.lvl : META.campaign) | 0) >= r.rung); g = !!r.granted(); c = r.carded? !!r.carded() : true; why = r.held? r.held() : ''; }catch(e){}
      if(!due || why) return;
      if(!g && r.st !== 'MISSING'){ var f = r.st; r.st = 'MISSING'; r.why = 'the line ended at ' + where + ' without it: ceremonyChain said nothing is owed' + rep; roadLog(r, f, 'MISSING'); }
      else if(g && !c && !r.c && r.st !== 'MISSING'){ var f2 = r.st; r.st = 'MISSING'; r.why = 'granted, its card never dealt: the line ended at ' + where + rep; roadLog(r, f2, 'MISSING'); }
    });
    roadSnap(); paintRoad();
  }
  function roadDone(r){ return r.st === 'TAKEN' || r.st === 'OPEN' || (!r.carded && (r.st === 'GRANTED' || r.st === 'ANNOUNCED')); }   // a row leaves the strip's next three once taken (or, with no card to take: FIRST VICTORY, the medal, the paint choice, once granted or announced); a state rule once OPEN
  function roadNext(n){ var lvl = META.lvl | 0, camp = META.campaign | 0; var open = []; ROAD.rows.forEach(function(r, i){ if(!roadDone(r)) open.push({ r:r, i:i, d:r.rung - (r.lad === 'COMMANDER'? lvl : camp) }); }); open.sort(function(a, b){ return (a.d - b.d) || (a.i - b.i); }); return open.slice(0, n || 3).map(function(o){ return o.r; }); }
  function shortName(s){ return String(s || '').replace(/\s*(\(| \+ ).*$/, '').replace(/^THE /, '').slice(0, 22); }
  function roadLine(){ if(!ROAD.built) return 'ROAD: not read'; return 'ROAD · ' + roadNext(3).map(function(r){ return (r.lad === 'COMMANDER'? 'LV' : 'L') + r.rung + ' ' + shortName(r.name) + (r.st? ': ' + r.st.toLowerCase() + (r.st === 'HELD' || r.st === 'MISSING'? ' (' + String(r.why).slice(0, 34) + ')' : '') : ''); }).join(' · '); }
  var roadT = 0;
  function paintRoad(){ if(!lastEl) return; if(roadT) return; lastEl.textContent = roadLine(); }
  function openLedger(){
    openOv('benchLedger', function(o){
      o.appendChild(el('h2', { text:'THE LEDGER · RUN ' + B.run.n + ' · commander LV ' + (META.lvl | 0) + ' · campaign ' + (META.campaign | 0) + (ROAD.drift? ' · DRIFT ' + ROAD.drift : ' · no drift') }));
      o.appendChild(el('div', { id:'benchRoad', text:roadLine() }));
      var list = el('div', { id:'benchLedList' });
      ['COMMANDER', 'CAMPAIGN'].forEach(function(lad){ list.appendChild(el('div', { 'class':'lh', text:lad + ' LADDER' + (lad === 'COMMANDER'? ' (META.lvl)' : ' (META.campaign)') }));
        ROAD.rows.forEach(function(r){ if(r.lad !== lad) return; var d = el('div', { 'class':'lr ' + (r.st || '') + (r.drift? ' DRIFT' : '') }); d.appendChild(el('span', { 'class':'st', text:(lad === 'COMMANDER'? 'LV ' : 'L') + r.rung })); d.appendChild(el('b', { text:r.name })); var seats = []; if(r.g) seats.push('granted ' + r.g); if(r.a) seats.push('ticket ' + r.a); if(r.c) seats.push('card ' + r.c); if(r.k) seats.push('taken ' + r.k); d.appendChild(D.createTextNode(' · ' + (r.st || 'ahead') + (r.why? ' (' + r.why + ')' : '') + (seats.length? ' · ' + seats.join(' · ') : '') + ' · ' + r.head + ' · design ' + r.design + (r.drift? ' DRIFT' : '') + (r.tax? ' · TAXED' : '') + (r.boot? ' · boot-owed' : ''))); list.appendChild(d); }); });
      list.appendChild(el('div', { 'class':'lh', text:'THE LAST FIVE EVENTS' }));
      B.run.log.slice(-5).forEach(function(r){ list.appendChild(rowEl(r)); });
      o.appendChild(list);
      var r = el('div', { 'class':'row' });
      r.appendChild(btn('CLOSE', '', function(){ closeOv('benchLedger'); }));
      r.appendChild(btn('COPY RUN', '', function(){ copyRun(B.run); }));
      r.appendChild(btn('LOG', '', function(){ closeOv('benchLedger'); openLog(); }));
      o.appendChild(r);
    });
  }

  // ---------- CARD 3: THE HIDDEN HAND (the game's own two hands, in plain words) ----------
  function handConst(n, d){ return (typeof n !== 'undefined')? n : d; }
  function handBoot(){
    try{ B.log('HAND', 'OUT OF THIS WINDOW BY DESIGN: THE HARD-BOT GATE (HARD_WR ' + HARD_WR + ' over HARD_GAMES ' + HARD_GAMES + ' battleground games) · NEMESIS (NEMESIS_TRIGGER ' + NEMESIS_TRIGGER + ' piggy defenses) · MOM at the door at MOM_TRIGGER_N ' + MOM_TRIGGER_N + ' toys on the floor (reachable by a commander who buys decor; ' + placedCount() + ' on the floor now) · the battleground\'s ROOKIE hand for the first BF_ROOKIE_GAMES ' + BF_ROOKIE_GAMES + ' games'); }catch(e){ B.log('HAND', 'the hand\'s far consts could not be read on this build: ' + (e && e.message)); }
  }
  function handLaunch(n, replay){
    try{
      var k = ((META.lossRun || {})['l' + n]) | 0, mr = (typeof mercyRelief === 'function')? mercyRelief(n) : 1, bite = !!(S.sq && S.sq.bite);
      var crate = S.tanBase? S.tanBase.hpMax : 0, alarmOn = (typeof campBoxAlarmBand === 'function')? campBoxAlarmBand() : false;
      var parts = [];
      if(n === 1) parts.push('THE COACH\'S LEVEL: never eased (mercyRelief 1), the first battle is always a victory (endBattle\'s rule); the casualty lesson: half the tags come back (CAMP_REFUND ' + handConst(CAMP_REFUND, '?') + '), Sarge back in ' + handConst(BF_SARGE_DOWN, '?') + ' s (BF_SARGE_DOWN)');
      else if(mr < 1) parts.push('QUIET MERCY: foe hp and the crate eased ' + Math.round((1 - mr) * 100) + '% (' + k + ' straight losses here; MERCY_AFTER ' + handConst(MERCY_AFTER, '?') + ' · MERCY_STEP ' + handConst(MERCY_STEP, '?') + ' · MERCY_FLOOR ' + handConst(MERCY_FLOOR, '?') + '; invisible by design; any win clears it)');
      else if(bite) parts.push('THE PROVEN PLAYER (0552a): the box alarm bites at ' + Math.round(handConst(BOX_ALARM_BITE, 0.6) * 100) + '% of the crate instead of ' + Math.round(handConst(BOX_ALARM, 0.5) * 100) + '% (BOX_ALARM_BITE; the prior rung at three stars, no loss here yet); Sarge says so at the first push');
      else parts.push('THE NEUTRAL HAND' + (k? ' (' + k + ' straight loss' + (k > 1? 'es' : '') + ': mercy begins on the attempt after the second)' : ''));
      if(alarmOn && n > 1) parts.push('THE BOX ALARM armed: the finale rides the crate at ' + Math.round(handConst(BOX_ALARM, 0.5) * 100) + '% after wave ' + handConst(BOX_ALARM_AFTER, 3) + ' (rungs 1 to ' + handConst(BOX_ALARM_TO, 5) + '); the crate ' + crate + ' (CAMP_CRATE_X ' + (((typeof CAMP_CRATE_X !== 'undefined') && CAMP_CRATE_X[n]) || 1) + ')');
      else if(n > 1) parts.push('no box alarm on this rung (past BOX_ALARM_TO ' + handConst(BOX_ALARM_TO, 5) + '); the crate ' + crate);
      if(typeof UI_BIG_TOP !== 'undefined') parts.push((META.campaign | 0) < UI_BIG_TOP? 'BIG BUTTONS ' + handConst(UI_BIG_K, '?') + 'x (UI_BIG_TOP ' + UI_BIG_TOP + ')' : 'the buttons at 1x (past UI_BIG_TOP ' + UI_BIG_TOP + ')');
      if(typeof CAMP_PURSE_LVLS !== 'undefined') parts.push(replay? 'a replay: the purse and the XP taxed (REPLAY_F ' + handConst(REPLAY_F, '?') + ')' : (n <= CAMP_PURSE_LVLS? 'the purse: ' + handConst(CAMP_PURSE, '?') + ' stars on a first clear (through ' + CAMP_PURSE_LVLS + ')' : 'the thin purse: ' + handConst(CAMP_PURSE2, '?') + ' stars on a first clear'));
      if(typeof AD_MIN_CAMP !== 'undefined') parts.push((META.campaign | 0) < AD_MIN_CAMP? 'the ad cliff shut (campaign ' + (META.campaign | 0) + ' of ' + AD_MIN_CAMP + ')' : 'the ad cliff open (campaign ' + (META.campaign | 0) + ')');
      B.log('HAND', 'L' + n + ': ' + parts.join(' · '));
    }catch(e){ B.log('HAND', 'L' + n + ': the hand could not be read: ' + (e && e.message)); }
  }
  function handVerdict(pre, mode){
    try{
      if(pre.mercy) B.log('HAND', 'L1: THE FIRST BATTLE IS ALWAYS A VICTORY fired: the tan retreated (endBattle\'s rule: the lives to 1, the win face THE TAN RETREAT?!)');
      if(mode === 'lose' && (typeof kindLoss === 'function') && kindLoss()) B.log('HAND', 'L' + pre.n + ': THE KINDEST DEFEAT (0532): NOT THIS TIME · Napoleon · the tenth of XP · TRY AGAIN big, Continue quiet · lossRun.l' + pre.n + ' ' + (((META.lossRun || {})['l' + pre.n]) | 0) + ' (quiet mercy counts it)');
      if(pre.plain) B.log('HAND', 'L' + pre.n + ' ' + (mode === 'win'? 'WIN' : 'LOSS') + ' at ' + pre.t + ' s: lives ' + pre.lives + ' · casualties ' + last.cas + (last.cas? ' (half the tags refunded: +' + last.refund + ', CAMP_REFUND ' + handConst(CAMP_REFUND, '?') + ')' : '') + ' · Sarge fell ' + last.sargeDown + 'x' + (last.sargeDown? ' (back in ' + handConst(BF_SARGE_DOWN, '?') + ' s each)' : '') + (pre.n > 1 && pre.n <= handConst(BOX_ALARM_TO, 5)? (last.alarmAt? ' · THE BOX ALARM fired at ' + last.alarmAt + ' s' + (pre.bite? ' (the bite mark)' : '') + ': the last wave dealt' : ' · THE BOX ALARM never fired: the crate stayed above its mark through wave ' + handConst(BOX_ALARM_AFTER, 3) + ' (the finale came on the clock)') : ''));
      if(mode === 'win'){ try{ var v = GVT.winVerdict(); (v.parts || []).forEach(function(p){ if(p.k === 'vw' || p.k === 'w') B.log('HAND', 'WHISPER on the win face: ' + String(p.t || '').replace(/\s+/g, ' ').slice(0, 160)); }); }catch(e){} }
    }catch(e){}
  }
  function handWatch(){
    if(!gameUp) return;
    try{
      if(S.mode === 'play' && S.sq && S.sq.boxAlarm && !last.alarmAnn){ last.alarmAnn = true; last.alarmAt = +(S.t || 0).toFixed(1); var b = S.tanBase; B.log('HAND', 'THE BOX ALARM fired at ' + last.alarmAt + ' s: the crate at ' + (b? Math.round(100 * b.hp / b.hpMax) : '?') + '% (the mark ' + Math.round((S.sq.bite? handConst(BOX_ALARM_BITE, 0.6) : handConst(BOX_ALARM, 0.5)) * 100) + '%' + (S.sq.bite? ', the bite' : '') + ') after wave ' + S.wave + ': the last wave dealt now (THE TAN RUSH OUT!)'); }
      var cd = S.sargeCd | 0; if(S.mode === 'play' && cd > 0 && last.sargeCd === 0){ last.sargeDown++; B.log('HAND', 'SARGE DOWN: back in ' + handConst(BF_SARGE_DOWN, '?') + ' s (BF_SARGE_DOWN; the tray card counts him down)'); } last.sargeCd = cd;
      var md = (typeof momDue === 'function')? !!momDue() : false; if(md !== last.momDue){ last.momDue = md; if(md) B.log('HAND', 'MOM IS AT THE DOOR: ' + placedCount() + ' toys on the floor (MOM_TRIGGER_N ' + handConst(MOM_TRIGGER_N, '?') + '); she replaces the day\'s invader until fought or the toys are boxed'); }
      (S.floats || []).forEach(function(f){ var t = String(f.txt || ''); if(/^ACHIEVEMENT/.test(t) && !last.achSeen[t]){ last.achSeen[t] = 1; B.log('PRIZE', 'MEDAL: ' + t.replace(/\s+/g, ' ')); if(/FIVE-STAR GENERAL/.test(t)) roadSeat('lvl5', 'a', 'the ACHIEVEMENT float (FIVE-STAR GENERAL)'); } });
    }catch(e){}
  }
  function handBattleground(){
    try{ var bi = GVT.bfInfo(); B.log('HAND', 'BATTLEGROUND game ' + (bi.played + 1) + ' (played ' + bi.played + '): ' + (bi.rookie? 'THE ROOKIE HAND (BF_ROOKIE_GAMES ' + handConst(BF_ROOKIE_GAMES, '?') + ': ' + Math.max(0, handConst(BF_ROOKIE_GAMES, 4) - bi.played) + ' rookie game' + (handConst(BF_ROOKIE_GAMES, 4) - bi.played === 1? '' : 's') + ' left; the enemy at ' + handConst(BF_ROOKIE_HP, '?') + ' hp, ' + handConst(BF_ROOKIE_RNG, '?') + ' reach, ' + handConst(BF_ROOKIE_LEAK, '?') + ' leak) · THE DIRECTOR gain ' + (bi.dir? bi.dir.gain : '?') : (bi.dir && bi.dir.gain? 'THE VETERAN DIRECTOR (gain ' + bi.dir.gain + ': the computer eases off when winning, presses when losing)' : 'a human on the other side: no director') + ' · ' + bi.diff)); }catch(e){}
  }

  // ---------- CARD 3: BOOKMARKS (SAVE THIS MOMENT · RETURN TO), this browser only ----------
  // A bookmark = every gvt_ key as the game last wrote it (the save lands at verdicts and landings, so a mid-level bookmark returns to
  // the last verdict: the bench says which) under bench_bm_<id>. RETURN TO = a RESET whose doorstep restores those keys (the
  // launcher's own road), a NEW run whose header reads RETURNED FROM. A bookmark returned on a newer build meets that build's boot
  // heals at the first landing: the ledger marks them boot-owed. Copyable as text; never on any wire.
  var BM_KEEP = 24;
  function bmKeys(){ var o = {}; try{ for(var i = 0; i < localStorage.length; i++){ var k = localStorage.key(i); if(k && k.indexOf('gvt_') === 0) o[k] = localStorage.getItem(k); } }catch(e){} return o; }
  function bmMoment(){ var lv = lvl(); if(lv) return lv + ' running: the save stands at ' + (last.verdict? 'after ' + last.verdict : 'the boot (no verdict yet)'); if(S.mode === 'menu') return 'in the room' + (last.verdict? ' after ' + last.verdict : ''); return last.verdict? 'after ' + last.verdict : scr(); }
  function bmDefault(){ return 'run ' + B.run.n + ' · ' + (last.verdict? 'after ' + last.verdict : (S.mode === 'menu'? 'in the room' : scr())) + ' · build ' + (STAMP.cv || '?'); }
  function bmList(){ var out = []; try{ for(var i = 0; i < localStorage.length; i++){ var k = localStorage.key(i); if(k && k.indexOf(B.K.bm) === 0){ var b = B.js(k, null); if(b && b.id) out.push(b); } } }catch(e){} return out.sort(function(a, b){ return String(b.at).localeCompare(String(a.at)); }); }
  function bmCut(name){
    var keys = bmKeys(); if(!keys.gvt_meta){ toast('NO SAVE TO BOOKMARK YET', 3000); return null; }
    var id = Date.now().toString(36) + Math.floor(Math.random() * 46656).toString(36);
    var bm = { bm:1, id:id, name:String(name || bmDefault()).slice(0, 80), at:new Date().toISOString(), run:B.run.n, build:{ cv:STAMP.cv, md5:STAMP.md5, sha:STAMP.sha, at:STAMP.at }, moment:bmMoment(), lvl:META.lvl | 0, camp:META.campaign | 0, dice:B.run.hdr.dice, seed:B.run.hdr.seed | 0, keys:keys };
    if(!B.wr(B.K.bm + id, JSON.stringify(bm))){ toast('THIS BROWSER REFUSED THE BOOKMARK (STORAGE FULL)', 4000); return null; }
    var all = bmList(); all.slice(BM_KEEP).forEach(function(b){ B.rm(B.K.bm + b.id); });
    B.log('BOOKMARK', 'SAVE THIS MOMENT · "' + bm.name + '" · the save as the game last wrote it: ' + bm.moment + ' · keys ' + Object.keys(keys).sort().join(' ') + ' · build ' + bm.build.cv + ' · lives in this browser only (copyable as text)');
    toast('BOOKMARK SAVED: ' + bm.name.toUpperCase().slice(0, 40), 3000);
    return bm;
  }
  function bmText(b){ return JSON.stringify({ bm:1, name:b.name, at:b.at, run:b.run, build:b.build, moment:b.moment, lvl:b.lvl, camp:b.camp, keys:b.keys }); }
  function bmCopy(b){ var t = bmText(b); var p = null; try{ if(navigator.clipboard && W.isSecureContext) p = navigator.clipboard.writeText(t); }catch(e){} if(!p){ textPage(t, 'BOOKMARK'); return; } p.then(function(){ toast('BOOKMARK COPIED AS TEXT (' + t.length + ' chars)', 3000); }, function(){ textPage(t, 'BOOKMARK'); }); }
  function bmReturn(b){ B.log('BOOKMARK', 'RETURN TO "' + b.name + '" (cut on build ' + (b.build && b.build.cv) + ', run ' + b.run + ') · the launcher resets and restores its keys on the doorstep; a new run begins'); B.persist(true); location.href = './?ret=' + encodeURIComponent(b.id); }
  function openBm(){
    var def = bmDefault();
    openOv('benchBm', function(o){
      o.appendChild(el('h2', { text:'SAVE THIS MOMENT · RUN ' + B.run.n }));
      o.appendChild(el('div', { 'class':'stampLine', text:'A bookmark is the save as the game last wrote it: ' + bmMoment() + '. A mid-level bookmark returns to that verdict. It lives in this browser only. RETURN TO resets and restores it as a new run.' }));
      var r0 = el('div', { 'class':'row' }); var inp = el('input', { 'class':'bmName', type:'text', maxlength:'80', autocomplete:'off', spellcheck:'false', on:{ pointerdown:stop, keydown:stop } }); inp.value = def; r0.appendChild(inp); o.appendChild(r0);
      var r = el('div', { 'class':'row' });
      r.appendChild(btn('SAVE THIS MOMENT', 'note', function(){ var b = bmCut(inp.value.trim() || def); closeOv('benchBm'); if(b) openBmList(); }));
      r.appendChild(btn('CANCEL', '', function(){ closeOv('benchBm'); }));
      o.appendChild(r);
      setTimeout(function(){ try{ inp.focus(); inp.select(); }catch(e){} }, 50);
    });
  }
  function openBmList(){
    openOv('benchBmList', function(o){
      o.appendChild(el('h2', { text:'BOOKMARKS · this browser only' }));
      o.appendChild(el('div', { 'class':'stampLine', text:'RETURN TO resets the throwaway and boots the game on that save (a new run, the header reads RETURNED FROM). COPY puts the bookmark on the clipboard as text. A bookmark returned on a newer build meets that build\'s boot heals: the ledger marks them boot-owed.' }));
      var list = el('div', { id:'benchBmList' }); var all = bmList();
      if(!all.length) list.appendChild(el('div', { 'class':'bm', text:'No bookmarks yet. SAVE THIS MOMENT cuts one.' }));
      all.forEach(function(b){ var d = el('div', { 'class':'bm' }); var t = el('div', { 'class':'t' }); t.appendChild(D.createTextNode(b.name)); t.appendChild(el('small', { text:'cut ' + B.etDate(b.at) + ' · ' + b.moment + ' · commander LV ' + b.lvl + ' · campaign ' + b.camp + ' · build ' + (b.build && b.build.cv) + (b.dice === 'SAME'? ' · SAME DICE ' + b.seed : '') })); d.appendChild(t);
        d.appendChild(btn('RETURN TO', 'note', function(){ bmReturn(b); })); d.appendChild(btn('COPY', '', function(){ bmCopy(b); })); d.appendChild(btn('DELETE', 'warn', function(){ B.rm(B.K.bm + b.id); B.log('BOOKMARK', 'deleted "' + b.name + '"'); closeOv('benchBmList'); openBmList(); })); list.appendChild(d); });
      o.appendChild(list);
      var r = el('div', { 'class':'row' });
      r.appendChild(btn('SAVE THIS MOMENT', 'note', function(){ closeOv('benchBmList'); openBm(); }));
      r.appendChild(btn('CLOSE', '', function(){ closeOv('benchBmList'); }));
      o.appendChild(r);
    });
  }

  // ---------- CARD 2: THE AD PLACEMENT CARD (the painter behind slot 1's bridge) ----------
  // Full screen over the game (z 46: over every game overlay, under the veil and the bench's own pad), AD PLACEMENT in the game's
  // display font as the biggest type on the bench, the seat's name under it, a tap anywhere to go on, the X from frame one. An
  // interstitial counts as complete either way (the seam's law); the TV's card pays only when finished, its X pays nothing and
  // leaves the day unburned. The card is stamped as the creative the moment it stands, so the 25 s belt stands down and a card
  // held while he dictates still launches exactly once, on the tap. Nothing is served; no word enters the game's dictionaries.
  function adSeat(m){ return m.kind === 'rew'? 'REWARDED · THE TV' : 'INTERSTITIAL · GAME ' + (gameUp? (META.adGames | 0) : '?') + ' · ' + (last.exit || 'VERDICT EXIT'); }
  function adShow(m){
    if(adCard){ B.log('AD', 'a second show asked while a card stands (id ' + m.id + ') · answered without a card, as a shell would'); B.ads.pend = null; setTimeout(function(){ B.gvtn('_adsResult', { id:m.id, kind:m.kind, completed:m.kind === 'int' }); B.adsReady(); }, 0); return; }
    var seat = adSeat(m); var isTV = m.kind === 'rew';
    var o = el('div', { id:'benchAd', 'class':phone? 'phone' : '' });
    o.appendChild(el('div', { 'class':'hd', text:'AD PLACEMENT' }));
    o.appendChild(el('div', { 'class':'seat', text:seat }));
    o.appendChild(el('div', { 'class':'foot', text:isTV? 'TAP ANYWHERE TO FINISH THE AD: THE SET PAYS +30 STARS. THE X PAYS NOTHING AND KEEPS THE DAY.' : 'TAP ANYWHERE TO GO ON. THE GAME COUNTS THIS AD AS WATCHED EITHER WAY. NOTHING IS SERVED.' }));
    var held = el('div', { 'class':'held', text:'held 0:00' }); o.appendChild(held);
    var x = el('button', { 'class':'x', type:'button', text:'\u2715', 'aria-label':'close the ad placement' }); o.appendChild(x);
    ['pointerdown', 'pointerup', 'touchstart', 'touchend', 'keydown'].forEach(function(evn){ o.addEventListener(evn, stop); });   // the card never hands a tap to the canvas
    x.addEventListener('click', function(ev){ ev.preventDefault(); ev.stopPropagation(); adFinish(!isTV, 'closed by the X'); });
    o.addEventListener('click', function(ev){ ev.stopPropagation(); adFinish(true, isTV? 'finished by a tap' : 'tapped'); });
    D.body.appendChild(o);
    adCard = { m:m, seat:seat, t0:Date.now(), el:o, iv:setInterval(function(){ held.textContent = 'held ' + B.mmss(Date.now() - adCard.t0); }, 1000) };
    last.ad = seat;
    B.log('AD', 'AD PLACEMENT shown · ' + seat + ' · show id ' + m.id + ' · a tap anywhere goes on, the X from frame one');
    setTimeout(function(){ if(!adCard || adCard.m !== m) return; B.gvtn('_adsCreative', { kind:m.kind, network:'bench', creativeId:'AD PLACEMENT ' + m.id, adUnit:'bench-' + m.kind }); B.log('AD', 'the card stamped as the creative (the 25 s belt stands down: the card waits for the tap; the screen reads ad)'); }, 0);
  }
  function adFinish(completed, how){
    var c = adCard; if(!c) return; adCard = null; clearInterval(c.iv); try{ c.el.remove(); }catch(e){}
    var held = ((Date.now() - c.t0) / 1000).toFixed(1); var isTV = c.m.kind === 'rew';
    B.log('AD', 'AD PLACEMENT · ' + c.seat + ' · ' + how + ' after ' + held + ' s · ' + (isTV? (completed? 'finished: the set pays +30 stars and the day burns' : 'not finished: pays nothing, the day stays unburned') : 'an interstitial counts as complete either way: the game goes on exactly once'));
    if(B.ads) B.ads.pend = null;
    B.gvtn('_adsResult', { id:c.m.id, kind:c.m.kind, completed:!!completed });
    setTimeout(function(){ B.adsReady(); }, 50);   // the shell reloads and says ready again
  }
  if(B.ads) B.ads.painter = adShow;

  // ---------- CARD 2: THE DIALS ----------
  // EVERY SEAT: the cradle's games half through the game's own dials (GVT.adCfg: newbie 0 · free 0 · every game), the cliff through
  // the staged copy's one named token (let AD_MIN_CAMP, 0 while the switch is on), the clock re-armed at the current game; the
  // minute gap and the sitting cap stand (a phone could not break inside them). OFF restores the live defaults read at the flip.
  // A run that never flips the switch never touches a dial (the live defaults stay the defaults).
  var SEAT_DEF = null;
  function seatApply(on){
    if(!gameUp || !W.GVT || typeof GVT.adCfg !== 'function' || typeof GVT.ads !== 'function') return false;
    if(!SEAT_DEF){ var a0 = GVT.ads(); SEAT_DEF = { newbie:a0.newbie, free:a0.free, soloMin:a0.soloMin, soloMax:a0.soloMax, minCamp:a0.minCamp }; }
    if(on){ GVT.adCfg({ newbie:0, free:0, soloMin:1, soloMax:1, next:Math.max(1, META.adGames | 0) }); try{ AD_MIN_CAMP = 0; }catch(e){ B.log('BENCH', 'the cliff is a const on this copy (the staged token is missing): EVERY SEAT lifts the games half only'); } }
    else { GVT.adCfg({ newbie:SEAT_DEF.newbie, free:SEAT_DEF.free, soloMin:SEAT_DEF.soloMin, soloMax:SEAT_DEF.soloMax, next:null }); try{ AD_MIN_CAMP = SEAT_DEF.minCamp; }catch(e){} }
    return true;
  }
  function trackApply(){   // the birthday gate answered by the dial through the game's own door (13+); the DOB is never kept, only the track
    if(!gameUp) return false;
    if(META.adTrack === 'teen'){ try{ if(typeof maxInit === 'function') maxInit(); }catch(e){} return true; }
    if(META.adTrack === 'child'){ B.log('DIAL', 'TRACK PRE-ANSWERED cannot lift a child track already answered on this throwaway (an answer is forever): RESET for a fresh gate'); return false; }
    var t = null; try{ t = ageGateAnswer(1, 1, 2000); }catch(e){}
    B.log('DIAL', t? 'TRACK PRE-ANSWERED · the birthday gate answered 13+ by the dial (track ' + t + ') · no gate asks this run · the bench answers init' : 'TRACK PRE-ANSWERED failed: ageGateAnswer is missing on this build');
    return !!t;
  }
  function dialsLine(){ var a = {}; try{ a = GVT.ads(); }catch(e){} return 'the gate reads: cradle ' + a.newbie + ' games · cliff campaign ' + a.minCamp + ' · first free ' + a.free + ' · every ' + a.soloMin + ' to ' + a.soloMax + ' · next at game ' + a.next + ' · gap ' + a.mgap + ' min · cap ' + a.mcap + ' · provider ' + a.provider + ' · track ' + (a.track || 'unanswered'); }
  function dialsSave(){ B.run.hdr.dials = { seat:dials.seat? 1 : 0, track:dials.track? 1 : 0, dice:dials.dice | 0 }; B.wr(B.K.dials, JSON.stringify(B.run.hdr.dials)); B.persist(true); }   // CARD 3: dice = the NEXT run's seed (0 = REAL); this run's own dice live in hdr.dice/seed
  function dialsBoot(){
    if(!gameUp) return;
    if(dials.seat) dials.track = 1;
    if(dials.track) trackApply();
    if(dials.seat) seatApply(true);
    dialsSave();
    setTimeout(function(){ B.log('DIAL', 'DIALS at boot · EVERY SEAT ' + (dials.seat? 'ON' : 'OFF') + ' · TRACK PRE-ANSWERED ' + (dials.track? 'ON' : 'OFF') + (dials.seat || dials.track? '' : ' (the phone\'s rhythm: the live defaults untouched)') + ' · ' + dialsLine()); }, 0);   // after the bridge's init answer lands (the same timer queue)
  }
  function flip(k){
    if(!gameUp) return;
    if(k === 'seat'){ dials.seat = dials.seat? 0 : 1; if(dials.seat){ dials.track = 1; trackApply(); } seatApply(!!dials.seat); }
    else if(k === 'dice'){ dials.dice = dials.dice? 0 : 4211; B.wr(B.K.dials, JSON.stringify({ seat:dials.seat? 1 : 0, track:dials.track? 1 : 0, dice:dials.dice })); B.log('DIAL', 'SAME DICE ' + (dials.dice? 'ON (seed ' + dials.dice + ')' : 'OFF') + ' for the NEXT run: the seed rides the reset, never the save; this run stays ' + B.diceText(B.run.hdr)); toast(dials.dice? 'SAME DICE ' + dials.dice + ' ON FOR THE NEXT RUN. RESET TO START IT.' : 'SAME DICE OFF: REAL DICE ON THE NEXT RUN', 4000); if(ovs.benchSheet){ closeOv('benchSheet'); openSheet(); } return; }
    else { if(dials.seat && dials.track){ toast('EVERY SEAT KEEPS THE TRACK PRE-ANSWERED', 3000); return; } dials.track = dials.track? 0 : 1; if(dials.track) trackApply(); else if(META.adTrack) toast('THE TRACK STAYS ANSWERED ON THIS THROWAWAY. RESET FOR A FRESH GATE.', 4000); }
    dialsSave(); paintHdr();
    B.log('DIAL', 'DIAL flipped · EVERY SEAT ' + (dials.seat? 'ON' : 'OFF') + ' · TRACK PRE-ANSWERED ' + (dials.track? 'ON' : 'OFF') + ' · ' + dialsLine());
    if(ovs.benchSheet){ closeOv('benchSheet'); openSheet(); }
  }

  // ---------- CARD 2: RETREAT (the weak player's honest shortcut) ----------
  // The running battle ends through the game's OWN loss door: the lives go to zero the way a leak takes them (the ouch, the red
  // breach ring, Sarge's bark), then the tan flag rises over the box and its ceremony calls endBattle(false), exactly as the last
  // leak does (the update loop's own lines). On L1 the game's own rule turns that loss into THE TAN RETREAT?! (there is no loss
  // face on L1). Never a save edit, never a rig verdict: quiet mercy's count, the kindest defeat, TRY AGAIN's ad seat, the loss XP
  // tenth and the ruler's loss ints all land as they land on a real loss. The row reads RETREAT (forfeit).
  function retreat(){
    if(!gameUp || S.mode !== 'play'){ toast('RETREAT: NO BATTLE IS RUNNING', 3000); return false; }
    if(S.bf){ toast('RETREAT IS THE CAMPAIGN\'S DOOR. A BATTLEGROUND ENDS BY ITS OWN WHISTLE.', 4000); B.log('BENCH', 'RETREAT refused: a battleground'); return false; }
    if(S.coop){ toast('RETREAT NEVER FOLDS A PARTY', 3000); B.log('BENCH', 'RETREAT refused: a party'); return false; }
    if(S.momRaid || S.train){ toast('RETREAT IS FOR THE CAMPAIGN, THE PARKS AND THE RAIDS', 3000); B.log('BENCH', 'RETREAT refused: not a level'); return false; }
    var n = S.levelN | 0, virgin = (n === 1 && !S.rival && (META.campaign | 0) === 0 && !S.coop);
    last.retreat = { n:n, t:Date.now() }; if(virgin) last.retreatL1 = 1;
    B.log('RETREAT', 'RETREAT (forfeit) · L' + n + ' at ' + (+S.t || 0).toFixed(1) + ' s · lives ' + (S.lives | 0) + ' to 0 · the line breaks and the tan walk into the box: the game\'s own loss door' + (virgin? ' · L1 has no loss face: THE TAN RETREAT?! by the game\'s own rule (the first battle is always a victory)' : ' · the tan flag rises, then the loss verdict (NOT THIS TIME)'));
    try{ S.lives = 0; SFX.ouch(); S.shake = 0.5; S.fx.push({ k:'ring', x:T.x - 10, y:T.y - 10, r:10, R:60, t:0, dur:0.5, col:'rgba(166,59,42,0.8)' }); try{ commSay('leak'); }catch(e){} }catch(e){}
    closeOv('benchSheet');
    try{ if(virgin) endBattle(false); else startVictoryFlag(120, 1, null, campFoeHex(), function(){ if(S.mode === 'play') endBattle(false); }, true); }catch(e){ B.err('bench', 'RETREAT: ' + (e && e.message), e && e.stack); return false; }
    return true;
  }

  // ---------- the face ----------
  var style = el('style', { id:'benchCss', text:CSS }); D.head.appendChild(style);
  var phone = B.isPhone();
  var bar_ = el('div', { id:'benchBar', 'class':phone? 'phone' : '' });
  var hdr = el('div', { id:'benchHdr' });
  var lastEl = el('div', { id:'benchLast' });
  var row = el('div', { id:'benchRow' });
  function chinPx(){ return phone? 40 : 80; }   // the dials page D3: the desk band clears the picker's row (its bottom sits 81 px above a 800-tall floor); the phone chip's 26 px type needs 40
  function applyChin(){ D.documentElement.style.setProperty('--bench-chin', chinPx() + 'px'); try{ if(W.GVT && typeof GVT.chin === 'function') GVT.chin(chinPx()); }catch(e){} }
  function hdrText(){ var h = B.run.hdr || {}; return 'RUN ' + B.run.n + ' · ' + B.buildLine() + ' · ' + (h.preset || '') + ' · ' + B.diceText(h) + (h.tag? ' · ' + h.tag : '') + (h.dials && h.dials.seat? ' · EVERY SEAT' : '') + (h.dials && h.dials.track? ' · TRACK PRE-ANSWERED' : '') + ' · ' + (h.screen || '') + ' ' + (h.bid || ''); }
  function paintHdr(){
    hdr.innerHTML = '';
    if(phone){ hdr.appendChild(el('b', { text:'RUN ' + B.run.n })); hdr.appendChild(el('span', { text:(lvl() || '') + ' ' + (B.run.hdr.preset || '') + ((B.run.hdr.dials && B.run.hdr.dials.seat)? ' · SEAT' : '') })); }
    else { hdr.appendChild(el('b', { text:'RUN ' + B.run.n })); hdr.appendChild(el('span', { text:hdrText().replace(/^RUN \d+ · /, '') })); }
  }
  function paintLast(r){ if(!r) return; lastEl.textContent = '+' + B.mmss(r.t) + ' · ' + r.k + ' · ' + r.x; if(roadT) clearTimeout(roadT); roadT = setTimeout(function(){ roadT = 0; paintRoad(); }, 5000); }   // CARD 3: the last event for five seconds, then the road (the next three rungs) stands on the strip
  B.listeners.push(function(r){ paintLast(r); if(logList && logOpen) appendRow(r, true); if(phone) paintHdr(); });

  var ovs = {}, logList = null, logOpen = false, padOpen = false, clearArm = 0;
  function openOv(id, build){ closeOv(id); var o = el('div', { 'class':'benchOv' + (phone? ' phone' : ''), id:id, on:{ pointerdown:stop, pointerup:stop, click:stop, touchstart:stop, touchend:stop, keydown:stop } }); build(o); D.body.appendChild(o); ovs[id] = o; return o; }
  function closeOv(id){ var o = ovs[id]; if(o){ o.remove(); delete ovs[id]; } if(id === 'benchLog'){ logOpen = false; logList = null; } if(id === 'benchPad'){ padOpen = false; B.hold(false); } }
  function toast(msg, ms){ var t = D.getElementById('benchToast'); if(t) t.remove(); t = el('div', { id:'benchToast', text:msg }); D.body.appendChild(t); setTimeout(function(){ if(t.parentNode) t.remove(); }, ms || 2500); }
  B.toast = toast;

  function rowEl(r){ var d = el('div', { 'class':'r ' + r.k }); d.appendChild(el('span', { 'class':'st', text:'+' + B.mmss(r.t) + ' · ' + (r.lv || '-') + ' · ' + r.scr + ((B.run.hdr && B.run.hdr.dice === 'SAME')? ' · SAME DICE ' + (B.run.hdr.seed | 0) : '') })); d.appendChild(D.createTextNode(r.k + ' · ' + r.x)); if(r.e && r.k === 'ERROR'){ d.appendChild(el('div', { 'class':'st', text:r.e.slice(0, 300) })); } return d; }
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
    return 'RUN ' + B.run.n + ' · ' + B.buildLine() + ' · ' + (lv? lv : 'last verdict ' + vd) + ' · ' + bar() + ' · ' + scr() + ' · last card: ' + lc + ' · +' + B.mmss(Date.now() - (h.t0 || 0)) + ' · ' + (h.tag || 'no tag') + ' · ' + B.diceText(h) + B.dialsText(h.dials) + (last.ad? ' · last ad seat: ' + last.ad : '') + (ROAD.built? ' · ' + roadLine() : '');
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
      items.appendChild(el('div', { 'class':'item' }, [btn('EVERY SEAT ' + (dials.seat? 'ON' : 'OFF'), dials.seat? 'on' : '', function(){ flip('seat'); }), D.createTextNode('An AD PLACEMENT card at every exit where a phone could break: the six-game cradle and the campaign-5 cliff lifted, the first game not free, the clock every game. The minute gap and the sitting cap stand (the phone\'s own law). Switches TRACK PRE-ANSWERED on. OFF = the phone\'s rhythm.')]));
      items.appendChild(el('div', { 'class':'item' }, [btn('TRACK PRE-ANSWERED ' + (dials.track? 'ON' : 'OFF'), dials.track? 'on' : '', function(){ flip('track'); }), D.createTextNode('The birthday gate answered 13+ by the dial, so no gate asks and the ad provider is armed from boot. OFF: the gate asks once per reset at the first room visit, the phone\'s true beat; the log records the track, never the date. The header names either switch.')]));
      items.appendChild(el('div', { 'class':'item' }, [btn('RETREAT', 'warn', retreat), D.createTextNode('Forfeit the running battle through the game\'s own loss door: the tan walk into the box, the tan flag, the loss face (TRY AGAIN, the tenth of XP, quiet mercy on the attempt after two straight losses). On L1 the game\'s own rule turns it into THE TAN RETREAT?! The row reads RETREAT (forfeit).')]));
      items.appendChild(el('div', { 'class':'item' }, [btn('THE LEDGER', '', function(){ closeOv('benchSheet'); openLedger(); }), D.createTextNode('The reward road read against the game\'s own tables: every prize OWED, HELD (the game\'s own pacing, named), GRANTED, ANNOUNCED (the ticket, the card), TAKEN; MISSING only when a landing\'s line ended without it; DRIFT where HEAD\'s rung differs from the design road. The strip shows the next three rungs; COPY RUN carries the whole road above the log.')]));
      items.appendChild(el('div', { 'class':'item' }, [btn('SAVE THIS MOMENT', 'note', function(){ closeOv('benchSheet'); openBm(); }), btn('BOOKMARKS', '', function(){ closeOv('benchSheet'); openBmList(); }), D.createTextNode('A bookmark is the save as the game last wrote it (verdicts and landings), kept in this browser only. RETURN TO resets and boots on it as a new run, so a change to level 4 needs no replay of levels 1 to 3. Copyable as text.')]));
      items.appendChild(el('div', { 'class':'item' }, [btn('SAME DICE ' + (dials.dice? 'ON (' + dials.dice + ')' : 'OFF'), dials.dice? 'on' : '', function(){ flip('dice'); }), D.createTextNode('For the NEXT run (the seed rides the reset, never the save): the dice seeded before the game boots and re-seeded at every level start and wave push, so a run after a change meets the same waves as the run before. The same waves, not a frame-identical battle: his taps and the fight inside a wave spend the dice their own way. The header and every row name the seed. OFF = REAL DICE (the law).')]));
      items.appendChild(el('div', { 'class':'item', text:'THE HIDDEN HAND rows (HAND) say which hand the game played on every launch and verdict: the first battle always a victory, quiet mercy, the box alarm and the proven player\'s bite, the casualty refund and Sarge\'s ten seconds, the battleground\'s rookie games and the director, the whispers; the hard-bot gate, Nemesis and MOM are out of this window by design. A WEAK HAND preset (two losses pre-counted) is NOT shipped: RETREAT walks the real road to the same place.' }));
      items.appendChild(el('div', { 'class':'item', text:'ABOUT THIS BENCH: the launcher page has the whole list. Never play the real web game in this browser: it shares this save, and RESET wipes it. Notes and runs live in this browser only; COPY RUN is the road to Claude.' }));
      items.appendChild(el('div', { 'class':'item', text:'HQ never hears of this commander. Every call to HQ is answered on this page; RANKINGS shows the real board with no YOU row. The bench stands in as the phone\'s ad provider: where a phone would sit through a real ad, the AD PLACEMENT card; nothing is served; the game decides when.' }));
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
      row.appendChild(btn('LEDGER', '', openLedger));
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
  dialsBoot();   // CARD 2: the switches applied to the standing game (the header already names them)
  if(gameUp){ try{ rdBuild(); }catch(e){ B.err('bench', 'the ledger could not read the road: ' + (e && e.message), e && e.stack); } handBoot(); paintRoad(); }   // CARD 3: the road read from the game's tables, the hand's far consts named once
  W.addEventListener('resize', function(){ var p = B.isPhone(); if(p !== phone){ phone = p; build(); applyChin(); } });

  // the rig's read-only door
  W.__benchUI = { hooks:hooks, chin:chinPx, phone:function(){ return phone; }, rects:function(){ var r = bar_.getBoundingClientRect(); return { bar:[r.left, r.top, r.width, r.height], btns:Array.prototype.map.call(bar_.querySelectorAll('.bbtn'), function(b){ var q = b.getBoundingClientRect(); return { t:b.textContent, r:[q.left, q.top, q.width, q.height], fs:parseFloat(getComputedStyle(b).fontSize) }; }), hdrFs:parseFloat(getComputedStyle(hdr).fontSize) }; },
    openPad:openPad, closePad:function(){ closeOv('benchPad'); }, padOpen:function(){ return padOpen; }, openLog:openLog, closeLog:function(){ closeOv('benchLog'); }, logOpen:function(){ return logOpen; }, sheet:openSheet, closeAll:function(){ Object.keys(ovs).forEach(closeOv); },
    stamp:stampLine, text:function(){ return B.text(B.run); }, copy:function(){ return copyRun(B.run); }, held:function(){ return B.held; }, lastCard:function(){ return last.card; }, state:state, gameUp:gameUp, rig:RIG, textPageOpen:function(){ return !!ovs.benchText; },
    // CARD 2 (read-only reads + the dials' own doors; the card's taps are the real buttons)
    ad:function(){ if(!adCard) return null; var r = adCard.el.getBoundingClientRect(), f = function(sel){ var e = adCard.el.querySelector(sel); if(!e) return null; var q = e.getBoundingClientRect(); return { r:[q.left, q.top, q.width, q.height], fs:parseFloat(getComputedStyle(e).fontSize), t:String(e.textContent || '').trim() }; }; return { kind:adCard.m.kind, id:adCard.m.id, seat:adCard.seat, heldMs:Date.now() - adCard.t0, r:[r.left, r.top, r.width, r.height], z:+getComputedStyle(adCard.el).zIndex, hd:f('.hd'), seatEl:f('.seat'), foot:f('.foot'), x:f('.x') }; },
    adTap:function(){ if(!adCard) return false; adCard.el.click(); return true; }, adX:function(){ if(!adCard) return false; adCard.el.querySelector('.x').click(); return true; },
    dials:function(){ return { seat:dials.seat? 1 : 0, track:dials.track? 1 : 0, dice:dials.dice | 0, def:SEAT_DEF }; }, flip:flip, retreat:retreat,
    // CARD 3 (read-only reads + the bench's own doors)
    road:function(){ return { built:ROAD.built, drift:ROAD.drift, cantSee:ROAD.cantSee.slice(), bootRun:ROAD.bootRun, line:roadLine(), next:roadNext(3).map(function(r){ return r.id; }), rows:ROAD.rows.map(function(r){ return { id:r.id, lad:r.lad, rung:r.rung, kind:r.kind, name:r.name, st:r.st, why:r.why, g:r.g || '', a:r.a || '', c:r.c || '', k:r.k || '', head:r.head, design:r.design, src:r.src, drift:r.drift, tax:r.tax | 0, boot:r.boot | 0 }; }) }; },
    ledger:openLedger, closeLedger:function(){ closeOv('benchLedger'); }, ledgerOpen:function(){ return !!ovs.benchLedger; },
    bmCut:bmCut, bmList:bmList, bmText:bmText, bmReturn:bmReturn, openBm:openBm, openBmList:openBmList, bmDefault:bmDefault,
    dice:function(){ var d = B.dice || {}; return { on:!!d.on, seed:d.seed | 0, draws:d.draws | 0, reseeds:d.reseeds | 0, last:d.last || '' }; },
    hand:function(){ return { cas:last.cas, refund:last.refund, sargeDown:last.sargeDown, alarmAt:last.alarmAt }; }, exit:function(){ return last.exit; }, lastAd:function(){ return last.ad; }, bridge:function(){ return B.ads? { on:B.ads.on, posts:B.ads.posts.slice(), shows:B.ads.shows, inits:B.ads.inits, answered:B.ads.answered, pend:B.ads.pend? Object.assign({}, B.ads.pend) : null } : null; } };
  B.log('BENCH', 'the strip is up · ' + (phone? 'the phone chip' : 'the desk band') + ' in the chin (' + chinPx() + ' px) · hooks ' + hooks.on.length + (hooks.missing.length? ' · missing ' + hooks.missing.length : ''));
})();
