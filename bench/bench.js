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
   The bench never dials the ads outside EVERY SEAT and never adds a branch inside the game's gate. */
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
  var last = { scr:'', card:'', verdict:'', firstRoom:false, replayNoted:false, verdictKey:'', pill:'', exit:'', retreat:null, ad:'' };
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
    wrap('saveMeta', null, function(){ ledgerDiff(); });
    wrap('tel', null, function(r, pre, a){ B.log('RULER', String(a[0]) + (a[1] !== undefined? ' ' + a[1] : '') + (a[2] !== undefined? ' ' + a[2] : '')); });
    wrap('xpAward', null, function(promos, pre, a){ var amt = a[0], o = a[1] || {}; B.log('XP', '+' + amt + ' XP (' + (o.src || '') + ') → ' + bar()); if(promos > 0) B.log('PRIZE', 'PROMOTED TO LEVEL ' + (META.lvl | 0) + (o.forcePromo? ' (forced first promotion)' : '') + ' · picks owed ' + (META.pendingPicks | 0)); });
    wrap('endBattle', function(win){ var t = +(S.t || 0).toFixed(2), m = !win && S.levelN === 1 && !S.rival && (META.campaign | 0) === 0 && !S.coop; if(m) last.mercyAt = t; return { win:!!win, n:S.levelN | 0, camp:META.campaign | 0, stars:META.starBank | 0, mercy:m || (last.mercyAt === t && (S.levelN | 0) === 1), t:t, retreat:!!(last.retreat && last.retreat.n === (S.levelN | 0) && Date.now() - last.retreat.t < 30000) }; },   // the first-battle mercy calls endBattle twice (the loss, then the game's own win): both calls read the same mark
      function(r, pre){ setTimeout(function(){ try{
        var mode = S.mode; if(mode !== 'win' && mode !== 'lose') return;
        var key = pre.n + ':' + pre.t + ':' + mode; if(key === last.verdictKey) return; last.verdictKey = key;
        var title = mode === 'win'? txt('winTitle') : txt('loseTitle'); var face = mode === 'win'? txt('win') : txt('lose');
        var ls = (META.levelStars || {})['l' + pre.n]; var line = (pre.retreat? 'RETREAT (forfeit) · ' : '') + 'L' + pre.n + ' ' + (mode === 'win'? 'WIN' : 'LOSS') + (pre.mercy? ' · THE TAN RETREAT?! (the first-battle mercy' + (pre.retreat? ': L1 has no loss face' : '') + ')' : '') + (pre.retreat && mode === 'lose'? ' · the game\'s own loss face (TRY AGAIN on the spot, Continue home, the tenth of XP)' : '') + ' · ' + title + (ls != null? ' · ' + ls + ' stars' : '') + ' · stars +' + ((META.starBank | 0) - pre.stars) + ' (in pocket ' + (META.starBank | 0) + ')' + ' · campaign ' + pre.camp + ' → ' + (META.campaign | 0);
        last.verdict = 'L' + pre.n + ' ' + (mode === 'win'? 'WIN' : 'LOSS') + (pre.retreat? ' (retreat)' : ''); if(pre.retreat) last.retreat = null;
        B.log('VERDICT', line, 'the face: ' + face.slice(0, 400));
      }catch(e){} }, 60); });
    wrap('startCampaign', null, function(r, pre, a){ var n = S.levelN | 0; var replay = n <= (META.campaign | 0); B.log('LAUNCH', 'LAUNCH L' + n + (replay? ' · REPLAY TAXED (pays a fifth for five replays, then nothing)' : '') + ' · ' + state()); if(replay && !last.replayNoted){ last.replayNoted = true; toast('REPLAY PAYS A FIFTH. RESET FOR THE REAL PAY.', 6000); }
      try{ var k = ((META.lossRun || {})['l' + n]) | 0, mr = (typeof mercyRelief === 'function')? mercyRelief(n) : 1;   // CARD 2: the weak hand's reading at the launch (the full hidden hand is CARD 3's)
        if(mr < 1) B.log('LAUNCH', 'QUIET MERCY on L' + n + ': foe hp and the crate eased ' + Math.round((1 - mr) * 100) + '% (' + k + ' straight losses here; invisible by design; any win clears it)');
        else if(k >= 1) B.log('LAUNCH', 'L' + n + ' after ' + k + ' straight loss' + (k > 1? 'es' : '') + ': no relief yet (quiet mercy begins on the attempt after the second)');
        else if(n === 1 && last.retreatL1) B.log('LAUNCH', 'L1 again: never eased (the coach\'s level; the first battle is always a victory)');
        if(S.sq && S.sq.bite) B.log('LAUNCH', 'THE PROVEN PLAYER on L' + n + ': the box alarm bites earlier (the prior rung at three stars, no loss here yet)'); }catch(e){} });
    wrap('startBattlefield', null, function(){ B.log('LAUNCH', 'LAUNCH battleground · ' + state()); });
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
    new MutationObserver(function(ms){ ms.forEach(function(m){ Array.prototype.forEach.call(m.addedNodes || [], function(n){ if(!n || n.nodeType !== 1) return; if(n.id === 'safechip') B.log('ONCE', 'SAFETY CHIP shown · ' + txt('safechip').slice(0, 120)); if(n.id === 'sqBack') B.log('CARD', 'PARTY card dealt'); if(n.id === 'unofficial') B.log('BENCH', 'UNOFFICIAL COPY banner (this host is not a HOME host)'); if(n.id === 'ageGate') B.log('AD', 'BIRTHDAY GATE asked (the first room visit in an ad-capable shell: the phone\'s true beat) · THAT\'S ME or the X'); if(n.id === 'adAsk') B.log('AD', 'ROLL IT! dealt · the TV\'s own disclosure: A REAL AD FROM OUR SPONSORS (the game\'s words) · ROLL IT! or the X'); if(n.id === 'naOffer' || n.id === 'naoffer') B.log('AD', 'store: a no-ads offer card (web fall-through)'); }); }); }).observe(D.body, { childList:true });
    // the screen under the player, HEAD's own namer, polled
    setInterval(function(){ try{ var s = scr(); if(s !== last.scr){ last.scr = s; B.log('SCREEN', s + (s === 'play:camp'? ' · L' + (S.levelN | 0) : '')); } }catch(e){} }, 250);

    // THE HOLD: the sim waits while the pad is open (the solo sim only; the v1.44 HQ-sheet law's own seat: frame() keeps painting)
    if(typeof W.update === 'function'){ var U0 = W.update; W.update = function(dt){ if(B.held && !S.coop) return; return U0.apply(this, arguments); }; hooks.on.push('update(hold)'); } else hooks.missing.push('update');
  }
  B.hold = function(on){ B.held = !!on; };

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
  function dialsSave(){ B.run.hdr.dials = { seat:dials.seat? 1 : 0, track:dials.track? 1 : 0 }; B.wr(B.K.dials, JSON.stringify(B.run.hdr.dials)); B.persist(true); }
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
  function hdrText(){ var h = B.run.hdr || {}; return 'RUN ' + B.run.n + ' · ' + B.buildLine() + ' · ' + (h.preset || '') + ' · ' + (h.dice || 'REAL') + ' DICE' + (h.tag? ' · ' + h.tag : '') + (h.dials && h.dials.seat? ' · EVERY SEAT' : '') + (h.dials && h.dials.track? ' · TRACK PRE-ANSWERED' : '') + ' · ' + (h.screen || '') + ' ' + (h.bid || ''); }
  function paintHdr(){
    hdr.innerHTML = '';
    if(phone){ hdr.appendChild(el('b', { text:'RUN ' + B.run.n })); hdr.appendChild(el('span', { text:(lvl() || '') + ' ' + (B.run.hdr.preset || '') + ((B.run.hdr.dials && B.run.hdr.dials.seat)? ' · SEAT' : '') })); }
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
    return 'RUN ' + B.run.n + ' · ' + B.buildLine() + ' · ' + (lv? lv : 'last verdict ' + vd) + ' · ' + bar() + ' · ' + scr() + ' · last card: ' + lc + ' · +' + B.mmss(Date.now() - (h.t0 || 0)) + ' · ' + (h.tag || 'no tag') + ' · ' + (h.dice || 'REAL') + ' DICE' + B.dialsText(h.dials) + (last.ad? ' · last ad seat: ' + last.ad : '');
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
      items.appendChild(el('div', { 'class':'item', text:'SAME DICE and the bookmarks ride CARD 3.' }));
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
  W.addEventListener('resize', function(){ var p = B.isPhone(); if(p !== phone){ phone = p; build(); applyChin(); } });

  // the rig's read-only door
  W.__benchUI = { hooks:hooks, chin:chinPx, phone:function(){ return phone; }, rects:function(){ var r = bar_.getBoundingClientRect(); return { bar:[r.left, r.top, r.width, r.height], btns:Array.prototype.map.call(bar_.querySelectorAll('.bbtn'), function(b){ var q = b.getBoundingClientRect(); return { t:b.textContent, r:[q.left, q.top, q.width, q.height], fs:parseFloat(getComputedStyle(b).fontSize) }; }), hdrFs:parseFloat(getComputedStyle(hdr).fontSize) }; },
    openPad:openPad, closePad:function(){ closeOv('benchPad'); }, padOpen:function(){ return padOpen; }, openLog:openLog, closeLog:function(){ closeOv('benchLog'); }, logOpen:function(){ return logOpen; }, sheet:openSheet, closeAll:function(){ Object.keys(ovs).forEach(closeOv); },
    stamp:stampLine, text:function(){ return B.text(B.run); }, copy:function(){ return copyRun(B.run); }, held:function(){ return B.held; }, lastCard:function(){ return last.card; }, state:state, gameUp:gameUp, rig:RIG, textPageOpen:function(){ return !!ovs.benchText; },
    // CARD 2 (read-only reads + the dials' own doors; the card's taps are the real buttons)
    ad:function(){ if(!adCard) return null; var r = adCard.el.getBoundingClientRect(), f = function(sel){ var e = adCard.el.querySelector(sel); if(!e) return null; var q = e.getBoundingClientRect(); return { r:[q.left, q.top, q.width, q.height], fs:parseFloat(getComputedStyle(e).fontSize), t:String(e.textContent || '').trim() }; }; return { kind:adCard.m.kind, id:adCard.m.id, seat:adCard.seat, heldMs:Date.now() - adCard.t0, r:[r.left, r.top, r.width, r.height], z:+getComputedStyle(adCard.el).zIndex, hd:f('.hd'), seatEl:f('.seat'), foot:f('.foot'), x:f('.x') }; },
    adTap:function(){ if(!adCard) return false; adCard.el.click(); return true; }, adX:function(){ if(!adCard) return false; adCard.el.querySelector('.x').click(); return true; },
    dials:function(){ return { seat:dials.seat? 1 : 0, track:dials.track? 1 : 0, def:SEAT_DEF }; }, flip:flip, retreat:retreat, exit:function(){ return last.exit; }, lastAd:function(){ return last.ad; }, bridge:function(){ return B.ads? { on:B.ads.on, posts:B.ads.posts.slice(), shows:B.ads.shows, inits:B.ads.inits, answered:B.ads.answered, pend:B.ads.pend? Object.assign({}, B.ads.pend) : null } : null; } };
  B.log('BENCH', 'the strip is up · ' + (phone? 'the phone chip' : 'the desk band') + ' in the chin (' + chinPx() + ' px) · hooks ' + hooks.on.length + (hooks.missing.length? ' · missing ' + hooks.missing.length : ''));
})();
