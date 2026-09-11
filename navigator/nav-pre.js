/* GVT NAVIGATOR ON THE GO · slot 1 (the pre-boot script) · FM-GVT-NAV-GO-01
   Runs AHEAD of the game's one inline script, in the navigator page's own bytes. Four jobs:
   (1) THE DEAD WIRE (the playtest bench's shape): every call to the one NET host (nationgame.live) is answered here, in
       place, with the rig guard's own shape ({"ok":false,"err":"navigator"}, 403): window.fetch (keepalive included),
       navigator.sendBeacon, XMLHttpRequest, WebSocket. The ONE pass-through: GET /gvt/board with the query stripped (a read
       of the real board, no device). HQ never hears of the Director.
   (2) THE AUDIO TAP (the studio's): every node wired to the speakers is also wired to a MediaStream the recorder can take,
       through one bus (SOUND off = the bus at 0, the voice still lands).
   (3) THE SAVE SEED (the studio's): ?save=director|rookie|fresh seeds gvt_meta BEFORE the game boots (a sync XHR against the
       static save/*.json beside this page; rookie takes lvl=N, 1..39); every load re-seeds, so an armed link always opens on
       the same fight; the coach is skipped unless coach=1. No save= means the save that is here.
   (4) THE ERROR COUNT for the rig (window.__NAV.errors). Nothing here opens a wire of its own. */
(function(){
  'use strict';
  var W = window;
  var N = W.__NAV = { stamp: W.__NAV_STAMP || {}, wire: { killed: 0, passed: 0, byPath: {} }, errors: [], seed: null };
  // ---------- (1) the dead wire ----------
  var HOST = /^https?:\/\/(www\.)?nationgame\.live(\/|$)/i;   // the one NET host: every /gvt/ call builds off the one NET constant (asserted at stage time)
  var BOARD = /\/gvt\/board(\?|$)/;
  function isWire(u){ try{ return HOST.test(String(u)); }catch(e){ return false; } }
  function pathOf(u){ try{ return String(u).replace(/^https?:\/\/[^\/]+/, '').split('?')[0]; }catch(e){ return '?'; } }
  function leak(kind, u){ N.wire.killed++; var p = kind + ' ' + pathOf(u); N.wire.byPath[p] = (N.wire.byPath[p] || 0) + 1; }
  function dead(){ return new Response('{"ok":false,"err":"navigator"}', { status: 403, headers: { 'Content-Type': 'application/json' } }); }
  var F0 = W.fetch;
  W.fetch = function(input, init){
    var url = (input && typeof input === 'object' && 'url' in input)? input.url : String(input);
    if(isWire(url)){
      var m = String((init && init.method) || (input && typeof input === 'object' && input.method) || 'GET').toUpperCase();
      if(m === 'GET' && BOARD.test(url)){ N.wire.passed++; return F0.call(W, url.split('?')[0], init); }   // THE ONE PASS-THROUGH: the board, no device: a read, never a mint
      leak('FETCH', url);
      return Promise.resolve(dead());
    }
    return F0.apply(W, arguments);
  };
  var SB0 = W.navigator.sendBeacon? W.navigator.sendBeacon.bind(W.navigator) : null;
  W.navigator.sendBeacon = function(u, d){ if(isWire(u)){ leak('BEACON', u); return true; } return SB0? SB0(u, d) : false; };
  var XO = XMLHttpRequest.prototype.open, XS = XMLHttpRequest.prototype.send;
  XMLHttpRequest.prototype.open = function(m, u){ this.__navDead = isWire(u)? String(u) : null; return XO.apply(this, arguments); };
  XMLHttpRequest.prototype.send = function(){ var x = this; if(x.__navDead){ leak('XHR', x.__navDead); setTimeout(function(){ try{ x.dispatchEvent(new Event('error')); }catch(e){} }, 0); return; } return XS.apply(this, arguments); };
  if(W.WebSocket){ var WS0 = W.WebSocket; W.WebSocket = function(u, p){ if(isWire(u)){ leak('WS', u); throw new Error('navigator: the wire is dead'); } return p === undefined? new WS0(u) : new WS0(u, p); }; W.WebSocket.prototype = WS0.prototype; try{ W.WebSocket.CONNECTING = 0; W.WebSocket.OPEN = 1; W.WebSocket.CLOSING = 2; W.WebSocket.CLOSED = 3; }catch(e){} }
  // ---------- (2) the audio tap ----------
  try{ var o = AudioNode.prototype.connect; AudioNode.prototype.connect = function(d){ var a = arguments; try{ if(d instanceof AudioDestinationNode){ var c = d.context; if(!c.__stDest) c.__stDest = c.createMediaStreamDestination(); if(!c.__stBus){ c.__stBus = c.createGain(); o.call(c.__stBus, c.__stDest); } o.call(this, c.__stBus); } }catch(e){} return o.apply(this, a); }; }catch(e){}
  // ---------- (3) the save seed ----------
  (function(){
    try{
      var q = new URLSearchParams(location.search), sv = q.get('save');
      if(!sv) return;
      if(sv === 'fresh'){ localStorage.removeItem('gvt_meta'); N.seed = 'fresh'; }
      else if(sv === 'director' || sv === 'rookie'){
        var lv = Math.max(1, Math.min(39, parseInt(q.get('lvl') || '2', 10) || 2));
        var file = sv === 'director'? 'save/director.json' : 'save/rookie-L' + lv + '.json';
        var x = new XMLHttpRequest(); x.open('GET', file, false); x.send();
        if(x.status === 200 && x.responseText){ localStorage.setItem('gvt_meta', x.responseText); N.seed = sv === 'rookie'? 'rookie L' + lv : 'director'; }
        else N.seed = 'seed missing: ' + file + ' (' + x.status + ')';
      }
      else N.seed = 'unknown save: ' + sv;
      if(q.get('coach') !== '1') localStorage.setItem('gvt_coach', '1'); else localStorage.removeItem('gvt_coach');
    }catch(e){ N.seed = 'seed failed: ' + String(e).slice(0, 120); }
  })();
  // ---------- (4) the error count ----------
  W.addEventListener('error', function(e){ try{ N.errors.push(String(e && (e.message || e.error) || e).slice(0, 300)); }catch(x){} });
  W.addEventListener('unhandledrejection', function(e){ try{ N.errors.push('rejection: ' + String(e && e.reason || e).slice(0, 300)); }catch(x){} });
})();
