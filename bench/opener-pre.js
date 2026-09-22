/* GVT THE OPENER — PREVIEW (design/opener-0922): fresh-pre.js verbatim on the gvtop_ prefix — the preview's OWN save wiped at every load; a real gvt_ save on this origin is never read or touched. */
/* GVT THE FRESH PAGE (fresh.html, 9/19/2026): the deployed game booted as a first-time account, nothing else on the screen.
   Runs BEFORE the game's script (the ONE head insertion stage_bench.py makes, beside the bench's game.html):
   (1) THE WIPE: every localStorage key with the gvt_ prefix removed (collected first: Chrome reshuffles key(i) on removal) and
       sessionStorage cleared, so every load of this URL is a new account. The URL is the reset button: a reload = a new run.
   (2) THE DEAD WIRE (the bench's, verbatim): every call to the one NET host (nationgame.live) answered in place with the rig guard's
       own shape ({"ok":false,"err":"bench"}, 403): fetch (keepalive included), sendBeacon, XMLHttpRequest, WebSocket. The ONE
       pass-through: GET /gvt/board with the query stripped, so RANKINGS paints the real board (no YOU row). HQ never hears: no
       account is minted on the box, nothing done here reaches a leaderboard.
   No band, no chip, no log, no hooks, no ad stand-in, no bench stamp on the window: the game's own road exactly as the web plays it. */
(function(W){
  'use strict';
  var wiped = [];
  try{ var ks = []; for(var i = 0; i < localStorage.length; i++){ var k = localStorage.key(i); if(k && k.indexOf('gvtop_') === 0) ks.push(k); }
    ks.sort().forEach(function(k){ try{ localStorage.removeItem(k); wiped.push(k); }catch(e){} }); }catch(e){}
  try{ sessionStorage.clear(); }catch(e){}
  var FR = W.__fresh = { wiped:wiped, at:Date.now(), wire:{ killed:0, passed:0, byPath:{} } };
  // ---------- THE DEAD WIRE ----------
  var HOST = /^https?:\/\/(www\.)?nationgame\.live(\/|$)/i;   // the one NET host: every /gvt/ call builds off the one NET constant (asserted at stage time)
  var BOARD = /\/gvt\/board(\?|$)/;
  function isWire(u){ return HOST.test(String(u || '')); }
  function pathOf(u){ try{ var a = new URL(String(u), location.href); return a.pathname; }catch(e){ return String(u).replace(/^https?:\/\/[^\/]+/, '').split('?')[0]; } }
  function dead(){ return new Response('{"ok":false,"err":"bench"}', { status:403, statusText:'bench', headers:{ 'Content-Type':'application/json' } }); }
  function leak(kind, u){ var p = pathOf(u); FR.wire.killed++; FR.wire.byPath[p] = (FR.wire.byPath[p] || 0) + 1; }
  var F0 = W.fetch;
  W.fetch = function(u, o){
    var url = (u && typeof u === 'object' && u.url)? u.url : String(u);
    if(isWire(url)){
      var m = String((o && o.method) || (u && u.method) || 'GET').toUpperCase();
      if(m === 'GET' && BOARD.test(url)){   // THE ONE PASS-THROUGH: the board with no device: a read, never a mint (resolve_ro)
        var clean = url.split('?')[0]; FR.wire.passed++;
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
})(window);
