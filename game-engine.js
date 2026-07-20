window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-GMVJJQ96Y8');

/* ---- next inline block ---- */




























function closeWin(){var o=document.getElementById('win-overlay');if(o)o.remove();}
var _LVL = {
  game: null,
  level: 1,
  maxLevel: 50,
  lives: 3,
  score: 0,
  streak: 0,
  bestLevel: {},

  init: function(gameKey, maxLvl) {
    this.game = gameKey;
    this.maxLevel = maxLvl || 50;
    this.level = +(localStorage.getItem('lvl_'+gameKey) || 1);
    this.lives = 3;
    this.score = 0;
    this.streak = 0;
    this.bestLevel[gameKey] = +(localStorage.getItem('bestlvl_'+gameKey) || 1);
  },

  getConfig: function() {
    var l = this.level;
    return {
      level: l,
      difficulty: l <= 10 ? 'Easy' : l <= 25 ? 'Medium' : l <= 40 ? 'Hard' : 'Expert',
      speed: Math.max(0.3, 1 - (l-1)*0.015),
      timeLimit: Math.max(5, 30 - Math.floor(l/2)),
      options: Math.min(6, 2 + Math.floor(l/8)),
      lives: this.lives
    };
  },

  win: function(pts) {
    this.score += (pts || 10) + this.level * 2;
    this.streak++;
    this.level = Math.min(this.maxLevel, this.level + 1);
    localStorage.setItem('lvl_'+this.game, this.level);
    if(this.level > (this.bestLevel[this.game]||0)) {
      this.bestLevel[this.game] = this.level;
      localStorage.setItem('bestlvl_'+this.game, this.level);
    }
    var xp = pts + this.level * 3;
    earnXP(xp, this.game + ' Level ' + (this.level-1));
    playSound('score');
    return this.level > this.maxLevel;
  },

  lose: function() {
    this.streak = 0;
    this.lives--;
    updateLivesUI();
    playSound('lose');
    if(this.lives <= 0) {
      this.level = Math.max(1, this.level - 2);
      localStorage.setItem('lvl_'+this.game, this.level);
      showNoLivesModal();
      return false;
    }
    return true;
  },

  renderHeader: function(title, color) {
    var cfg = this.getConfig();
    var diffColors = {Easy:'#4ade80',Medium:'#fbbf24',Hard:'#f87171',Expert:'#c084fc'};
    var dc = diffColors[cfg.difficulty] || '#60a5fa';
    var h = '<div style="margin-bottom:14px;">';
    h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:10px;">';
    h += '<div style="font-size:19px;font-weight:900;color:#ffffff;letter-spacing:-.3px;">'+title+'</div>';
    h += '<div style="display:flex;gap:6px;align-items:center;">';
    h += '<div style="background:'+dc+'22;color:'+dc+';border:1px solid '+dc+'55;border-radius:8px;padding:3px 10px;font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:.06em;">'+cfg.difficulty+'</div>';
    h += '<div id="modal-lives" style="display:flex;gap:2px;font-size:17px;"></div>';
    h += '</div></div>';
    h += '<div style="display:flex;align-items:center;gap:8px;background:rgba(0,0,0,.25);border-radius:10px;padding:8px 12px;">';
    h += '<div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.6);white-space:nowrap;">Lv '+this.level+'/'+this.maxLevel+'</div>';
    h += '<div style="flex:1;background:rgba(255,255,255,.12);border-radius:99px;height:6px;">';
    h += '<div style="background:'+dc+';height:6px;border-radius:99px;width:'+Math.round(this.level/this.maxLevel*100)+'%;transition:width .5s;box-shadow:0 0 8px '+dc+'88;"></div>';
    h += '</div>';
    h += '<div style="font-size:12px;font-weight:800;color:'+dc+';white-space:nowrap;">⭐ '+this.score+'</div>';
    h += '</div></div>';
    setTimeout(updateLivesUI, 30);
    return h;
  }
};

function closeWin(){var o=document.getElementById('win-overlay');if(o)o.remove();}
var _LVL = {
  game: null,
  level: 1,
  maxLevel: 50,
  lives: 3,
  score: 0,
  streak: 0,
  bestLevel: {},

  init: function(gameKey, maxLvl) {
    this.game = gameKey;
    this.maxLevel = maxLvl || 50;
    this.level = +(localStorage.getItem('lvl_'+gameKey) || 1);
    this.lives = 3;
    this.score = 0;
    this.streak = 0;
    this.bestLevel[gameKey] = +(localStorage.getItem('bestlvl_'+gameKey) || 1);
  },

  getConfig: function() {
    var l = this.level;
    return {
      level: l,
      difficulty: l <= 10 ? 'Easy' : l <= 25 ? 'Medium' : l <= 40 ? 'Hard' : 'Expert',
      speed: Math.max(0.3, 1 - (l-1)*0.015),
      timeLimit: Math.max(5, 30 - Math.floor(l/2)),
      options: Math.min(6, 2 + Math.floor(l/8)),
      lives: this.lives
    };
  },

  win: function(pts) {
    this.score += (pts || 10) + this.level * 2;
    this.streak++;
    this.level = Math.min(this.maxLevel, this.level + 1);
    localStorage.setItem('lvl_'+this.game, this.level);
    if(this.level > (this.bestLevel[this.game]||0)) {
      this.bestLevel[this.game] = this.level;
      localStorage.setItem('bestlvl_'+this.game, this.level);
    }
    var xp = pts + this.level * 3;
    earnXP(xp, this.game + ' Level ' + (this.level-1));
    playSound('score');
    if(typeof trackGamePlay==='function') trackGamePlay();
    return this.level > this.maxLevel;
  },

  lose: function() {
    this.streak = 0;
    this.lives--;
    updateLivesUI();
    playSound('lose');
    if(this.lives <= 0) {
      this.level = Math.max(1, this.level - 2);
      localStorage.setItem('lvl_'+this.game, this.level);
      showNoLivesModal();
      return false;
    }
    return true;
  },

  renderHeader: function(title, color) {
    var cfg = this.getConfig();
    var diffColors = {Easy:'#22c55e',Medium:'#f59e0b',Hard:'#ef4444',Expert:'#8b5cf6'};
    var dc = diffColors[cfg.difficulty] || '#6366f1';
    var h = '<div style="margin-bottom:12px;">';
    h += '<div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:8px;">';
    h += '<div style="font-size:18px;font-weight:900;color:'+(color||'var(--text)')+';">'+title+'</div>';
    h += '<div style="display:flex;gap:6px;align-items:center;">';
    h += '<div style="background:'+dc+'22;color:'+dc+';border:1px solid '+dc+'44;border-radius:6px;padding:3px 8px;font-size:11px;font-weight:700;">'+cfg.difficulty+'</div>';
    h += '<div id="modal-lives" style="display:flex;gap:2px;"></div>';
    h += '</div></div>';
    // Level progress bar
    h += '<div style="display:flex;align-items:center;gap:8px;">';
    h += '<div style="font-size:12px;font-weight:700;color:'+(color||'var(--muted)')+';">Lv '+this.level+'/'+this.maxLevel+'</div>';
    h += '<div style="flex:1;background:rgba(255,255,255,.15);border-radius:99px;height:6px;">';
    h += '<div style="background:'+(color||'#6366f1')+';height:6px;border-radius:99px;width:'+Math.round(this.level/this.maxLevel*100)+'%;transition:width .5s;"></div>';
    h += '</div>';
    h += '<div style="font-size:12px;font-weight:700;color:'+(color||'var(--muted)')+';">⭐ '+this.score+'</div>';
    h += '</div></div>';
    setTimeout(updateLivesUI, 50);
    return h;
  }
};

/* ══ SCORE POPUP ANIMATION ══ */
function showScorePop(text) {
  var box = document.getElementById('modal-box');
  if(!box) return;
  var pop = document.createElement('div');
  pop.className = 'score-pop';
  pop.textContent = text;
  pop.style.cssText = 'position:fixed;top:30%;left:50%;transform:translateX(-50%);font-size:28px;font-weight:900;color:#ffd700;text-shadow:0 2px 8px rgba(0,0,0,.5);animation:scoreUp .9s ease forwards;pointer-events:none;z-index:9999;';
  document.body.appendChild(pop);
  setTimeout(function(){if(pop.parentNode)pop.parentNode.removeChild(pop);},900);
}


function safeRun(code){try{eval(code);}catch(e){}}

function closeElem(id){var o=document.getElementById(id);if(o)o.remove();}

function closeWinOverlay(){var o=document.getElementById('win-overlay');if(o)o.remove();}
function closeLivesModal(){var o=document.getElementById('no-lives-ov');if(o)o.remove();closeGame();}

/* ════ GAMENEST WORLD - SYSTEM v6 ════ */
var rnd=function(a,b){return Math.floor(Math.random()*(b-a+1))+a;};
var pick=function(a){return a[rnd(0,a.length-1)];};
var shuffle=function(arr){var a=arr.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}return a;};
function gw(){return document.getElementById('gw');}

/* XP SYSTEM */
var _xp=+(localStorage.getItem('gnw_xp')||0);
var _level=+(localStorage.getItem('gnw_level')||1);
function getXP(){return _xp;}
function setXP(v){_xp=v;localStorage.setItem('gnw_xp',v);}
function earnXP(n,src){
  _xp+=n;localStorage.setItem('gnw_xp',_xp);
  var needed=_level*100;
  if(_xp>=needed){_level++;localStorage.setItem('gnw_level',_level);playSound('win');}
  updateXPUI();
}
function getXP(){return _xp;}
function updateXPUI(){
  var el=document.getElementById('xp-bar');if(!el)return;
  var needed=_level*100;var pct=Math.min(100,Math.round(_xp%needed/needed*100));
  el.style.width=pct+'%';
  var lv=document.getElementById('xp-label');
  if(lv)lv.textContent=_xp+' XP — Lv.'+_level;
}

/* SOUND */
var _soundOn=localStorage.getItem('gnw_sound')!=='0';
function playSound(type){
  if(!_soundOn)return;
  try{
    var ac=new(window.AudioContext||window.webkitAudioContext)();
    var o=ac.createOscillator(),g=ac.createGain();
    o.connect(g);g.connect(ac.destination);
    var s={score:{f:880,d:.1},win:{f:1047,d:.4},lose:{f:200,d:.3},click:{f:660,d:.05},pop:{f:440,d:.07}};
    var sv=s[type]||s.click;
    o.type='sine';o.frequency.value=sv.f;
    if(type==='win')o.frequency.exponentialRampToValueAtTime(1568,ac.currentTime+.2);
    if(type==='lose')o.frequency.exponentialRampToValueAtTime(110,ac.currentTime+.3);
    g.gain.setValueAtTime(.12,ac.currentTime);
    g.gain.exponentialRampToValueAtTime(.001,ac.currentTime+sv.d);
    o.start();o.stop(ac.currentTime+sv.d);
  }catch(e){}
}
function toggleSound(){
  _soundOn=!_soundOn;localStorage.setItem('gnw_sound',_soundOn?'1':'0');
  var b=document.getElementById('sound-btn');if(b)b.textContent=_soundOn?'🔊':'🔇';
}

/* TOAST */
function showToast(msg,xp){
  var t=document.getElementById('toast');if(!t)return;
  t.textContent=msg+(xp?(' +'+xp+'XP'):'');
  t.style.opacity='1';t.style.transform='translateY(0)';
  setTimeout(function(){t.style.opacity='0';t.style.transform='translateY(20px)';},2500);
}

/* FAVORITES */
function getFavs(){return JSON.parse(localStorage.getItem('gnw_favs')||'[]');}
function isFav(key){return getFavs().indexOf(key)>=0;}
function toggleFav(el){
  var key=el.getAttribute('data-gkey');
  var favs=getFavs(),idx=favs.indexOf(key);
  if(idx>=0){favs.splice(idx,1);el.textContent='🤍';}
  else{favs.push(key);el.textContent='❤️';playSound('pop');}
  localStorage.setItem('gnw_favs',JSON.stringify(favs));
}

/* RECENTLY PLAYED */
function addRecent(key){
  var r=JSON.parse(localStorage.getItem('gnw_recent')||'[]');
  r=r.filter(function(k){return k!==key;});
  r.unshift(key);
  localStorage.setItem('gnw_recent',JSON.stringify(r.slice(0,8)));
}

/* SHARE */
function shareGame(el){
  var key=el.getAttribute('data-gkey2')||'';
  var url='https://gamenestworld.com/'+key+'.html';
  if(navigator.share)navigator.share({title:'GameNest World',url:url});
  else if(navigator.clipboard)navigator.clipboard.writeText(url).then(function(){showToast('Link copied!',0);});
}

/* (fullscreen handled by toggleGameFullscreen, defined below) */

/* LIVES */
var _lives=3,_maxLives=3,_currentGame=null;
function getLives(){return _lives;}
function gainLive(n){_lives=Math.min(6,_lives+(n||1));updateLivesUI();}
function resetLives(){_lives=3;updateLivesUI();}
function loseLive(){
  _lives=Math.max(0,_lives-1);updateLivesUI();playSound('lose');
  if(_lives<=0){showNoLivesModal();return false;}
  return true;
}
function updateLivesUI(){
  var lb=document.getElementById('modal-lives');if(!lb)return;
  var h='';for(var i=0;i<3;i++)h+='<span style="font-size:18px;'+(i>=_lives?'opacity:.2':'')+'">❤️</span>';
  lb.innerHTML=h;
}
function showNoLivesModal(){
  var box=document.getElementById('modal-box');if(!box)return;
  var ov2=document.createElement('div');
  ov2.id='no-lives-ov';
  ov2.style.cssText='position:absolute;inset:0;background:rgba(0,0,0,.88);display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:20px;z-index:10;padding:24px;box-sizing:border-box;';
  ov2.innerHTML='<div style="font-size:52px;margin-bottom:12px;">💔</div>'
    +'<div style="color:#fff;font-size:22px;font-weight:900;margin-bottom:6px;text-align:center;">No Lives Left!</div>'
    +'<div style="color:rgba(255,255,255,.6);font-size:14px;margin-bottom:24px;text-align:center;">Watch a short ad to get +3 lives!</div>'
    +'<button onclick="adForLives()" style="width:100%;max-width:240px;padding:15px;border-radius:14px;background:#f59e0b;border:none;color:#fff;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:10px;">📺 Watch Ad → +3 Lives</button>'
    +'<button onclick="xpBuyLife()" style="width:100%;max-width:240px;padding:12px;border-radius:14px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:10px;">⭐ Spend 50 XP → +1 Life</button>'
    +'<button onclick="closeLivesModal()" style="background:none;border:none;color:rgba(255,255,255,.3);font-size:13px;cursor:pointer;">Exit Game</button>';
  box.style.position='relative';
  box.appendChild(ov2);
}
function closeLivesModal(){var o=document.getElementById('no-lives-ov');if(o)o.remove();closeGame();}
window.adForLives=function(){
  var o=document.getElementById('no-lives-ov');if(o)o.remove();
  showRewardedAd('continue',function(){gainLive(3);});
};
window.xpBuyLife=function(){
  if(_xp>=50){setXP(_xp-50);gainLive(1);var o=document.getElementById('no-lives-ov');if(o)o.remove();showToast('+1 Life!',0);}
  else showToast('Need 50 XP!',0);
};

/* WIN/LOSE OVERLAYS */
function showWin(title,msg,xp){
  playSound('win');
  var d=document.createElement('div');d.className='win-overlay';d.id='win-overlay';
  d.innerHTML='<div class="win-box"><div style="font-size:48px;margin-bottom:8px;">🏆</div>'
    +'<div style="font-size:22px;font-weight:900;color:#1e293b;margin-bottom:6px;">'+title+'</div>'
    +'<div style="color:#64748b;font-size:14px;margin-bottom:16px;">'+msg+'</div>'
    +(xp?'<div style="background:#fef3c7;border-radius:8px;padding:8px;font-size:15px;font-weight:700;color:#d97706;margin-bottom:16px;">+'+xp+' XP!</div>':'')
    +'<button class="btn" onclick="closeWinOverlay()">Continue</button></div>';
  document.body.appendChild(d);
  d.onclick=function(e){if(e.target===d)d.remove();};
}
function showLose(title,msg){
  playSound('lose');
  var d=document.createElement('div');d.className='win-overlay';d.id='win-overlay';
  d.innerHTML='<div class="win-box"><div style="font-size:48px;margin-bottom:8px;">😔</div>'
    +'<div style="font-size:22px;font-weight:900;color:#1e293b;margin-bottom:6px;">'+title+'</div>'
    +'<div style="color:#64748b;font-size:14px;margin-bottom:16px;">'+msg+'</div>'
    +'<button class="btn" onclick="closeWinOverlay()">Try Again</button></div>';
  document.body.appendChild(d);
}
function showScorePop(text){
  var p=document.createElement('div');
  p.style.cssText='position:fixed;top:30%;left:50%;transform:translateX(-50%);font-size:28px;font-weight:900;color:#ffd700;text-shadow:0 2px 8px rgba(0,0,0,.5);animation:scoreUp .9s ease forwards;pointer-events:none;z-index:9999;';
  p.textContent=text;document.body.appendChild(p);
  setTimeout(function(){if(p.parentNode)p.parentNode.removeChild(p);},900);
}

/* OPEN / CLOSE GAME */
var _gamePlayCount=0;
function openGame(key){
  if(window._gl){try{cancelAnimationFrame(window._gl);}catch(e){}try{clearTimeout(window._gl);}catch(e){}window._gl=null;}
  addRecent(key);
  playSound('click');
  _currentGame=key;
  resetLives();
  _gamePlayCount=(_gamePlayCount||0)+1;
  /* interstitial disabled */

  var CATS={'fruitpop': 'classic', 'rainbowbubble': 'classic', 'citydash': 'classic', 'blockpuzzle': 'classic', 'colorjoy': 'classic', 'minirace': 'classic', 'parkingpuzzle': 'classic', 'colorquiz': 'quiz', 'flagquiz': 'quiz', 'truefalse': 'quiz', 'riddles': 'quiz', 'emojiquiz': 'quiz', 'oddone': 'quiz', 'genquiz': 'quiz', 'geoquiz': 'quiz', 'sciquiz': 'quiz', 'moviequiz': 'quiz', 'expertquiz': 'quiz', 'histquiz': 'quiz', 'wordscramble': 'word', 'hangman': 'word', 'typing': 'word', 'anagram': 'word', 'wordchain': 'word', 'wordle': 'word', 'crossword': 'word', 'spelling': 'word', 'cipher': 'word', 'wordsearch': 'word', 'mathbasic': 'math', 'mathquiz': 'math', 'times': 'math', 'make24': 'math', 'mathsprint': 'math', 'numseq': 'math', 'sudoku': 'math', 'coin': 'classic', 'dice': 'classic', 'rps': 'classic', 'numguess': 'classic', 'reaction': 'classic', 'ttt': 'classic', 'mines': 'classic', 'c4': 'classic', 'snake': 'classic', 'pong': 'classic', 'g2048': 'classic', 'chess': 'classic', 'tetris': 'classic', 'flappy': 'classic', 'mineshard': 'classic', 'breakout': 'classic', 'lightsout': 'classic', 'colormatch': 'memory', 'simon': 'memory', 'memory': 'memory', 'patternmem': 'memory', 'memhard': 'memory'};
  var THEMES={
    'quiz':    {'bg':'linear-gradient(145deg,#eef2ff 0%,#dffcff 52%,#fff7ed 100%)','accent':'#6366f1','border':'rgba(99,102,241,.30)','text':'#172033'},
    'word':    {'bg':'linear-gradient(145deg,#dcfce7 0%,#ccfbf1 55%,#f0fdf4 100%)','accent':'#10b981','border':'rgba(16,185,129,.30)','text':'#172033'},
    'math':    {'bg':'linear-gradient(145deg,#fef3c7 0%,#ffedd5 52%,#dffcff 100%)','accent':'#f97316','border':'rgba(249,115,22,.30)','text':'#172033'},
    'classic': {'bg':'linear-gradient(145deg,#e0f2fe 0%,#ede9fe 50%,#fce7f3 100%)','accent':'#8b5cf6','border':'rgba(139,92,246,.30)','text':'#172033'},
    'memory':  {'bg':'linear-gradient(145deg,#fce7f3 0%,#fae8ff 50%,#fef3c7 100%)','accent':'#ec4899','border':'rgba(236,72,153,.30)','text':'#172033'}
  };
  var HOW_TO={
  'fruitpop':{how:'Swap fruits to match 3 or more and reach the target score',controls:'🖱️ Click two nearby fruits'},
  'rainbowbubble':{how:'Click groups of matching balls to pop them and clear the board',controls:'🖱️ Click groups'},
  'citydash':{how:'Run through 3 lanes, dodge cones and collect stars',controls:'← → Arrow keys or buttons'},
  'blockpuzzle':{how:'Place blocks on the board. Complete rows or columns to clear them',controls:'🖱️ Pick piece + click board'},
  'colorjoy':{how:'Choose colors and paint animals, fruits and flowers',controls:'🖱️ Pick color + click shapes'},
  'minirace':{how:'Drive fast, avoid traffic and collect coins',controls:'← → Arrow keys or buttons'},
  'parkingpuzzle':{how:'Move the car around obstacles and park on the green spot',controls:'Arrow buttons'},
  'colorquiz':{how:'Click the button with the correct color name',controls:'🖱️ Click'},
  'flagquiz':{how:'Look at the flag and click the correct country name',controls:'🖱️ Click'},
  'truefalse':{how:'Read the statement and click TRUE or FALSE',controls:'🖱️ Click'},
  'riddles':{how:'Read the riddle and type your answer, then press Enter',controls:'⌨️ Type + Enter'},
  'emojiquiz':{how:'Look at the emojis and pick what they represent',controls:'🖱️ Click'},
  'oddone':{how:'Find the item that does NOT belong with the others',controls:'🖱️ Click'},
  'genquiz':{how:'Answer general knowledge questions before time runs out',controls:'🖱️ Click'},
  'geoquiz':{how:'Answer geography questions about countries and capitals',controls:'🖱️ Click'},
  'sciquiz':{how:'Answer science questions about physics, chemistry & biology',controls:'🖱️ Click'},
  'moviequiz':{how:'Answer questions about movies, actors and directors',controls:'🖱️ Click'},
  'expertquiz':{how:'Very hard trivia questions — only for experts!',controls:'🖱️ Click'},
  'histquiz':{how:'Answer history questions about dates and events',controls:'🖱️ Click'},
  'wordscramble':{how:'Unscramble the letters to find the hidden word',controls:'⌨️ Type + Enter'},
  'hangman':{how:'Click letters to guess the hidden word before the man is hanged',controls:'🖱️ Click letters'},
  'typing':{how:'Type the text shown as fast and accurately as possible',controls:'⌨️ Keyboard'},
  'anagram':{how:'Rearrange the letters to make a completely different word',controls:'⌨️ Type + Enter'},
  'wordchain':{how:'Type a word that starts with the last letter of the previous word',controls:'⌨️ Type + Enter'},
  'wordle':{how:'Guess the 5-letter word in 6 tries. Green=correct, Yellow=wrong place',controls:'🖱️ Click letters or ⌨️ Keyboard'},
  'crossword':{how:'Find hidden words in the grid — they can go in any direction',controls:'🖱️ Click & Drag'},
  'spelling':{how:'Unscramble the letters to spell the word correctly',controls:'⌨️ Type + Enter'},
  'cipher':{how:'Decode the Caesar cipher — each letter is shifted by a number',controls:'⌨️ Type + Enter'},
  'wordsearch':{how:'Find all hidden words in the grid — click and drag to select',controls:'🖱️ Click & Drag'},
  'mathbasic':{how:'Solve the math problem and click the correct answer',controls:'🖱️ Click'},
  'mathquiz':{how:'Answer math questions (add, subtract, multiply, divide)',controls:'🖱️ Click'},
  'times':{how:'Click the correct answer to the multiplication problem',controls:'🖱️ Click'},
  'make24':{how:'Use all 4 numbers with +−×÷ to make exactly 24',controls:'⌨️ Type formula + Check'},
  'mathsprint':{how:'Solve as many math problems as possible in 60 seconds',controls:'⌨️ Type + Enter'},
  'numseq':{how:'Find the pattern and click what number comes next',controls:'🖱️ Click'},
  'sudoku':{how:'Fill the 9×9 grid so each row, column and box has 1-9',controls:'🖱️ Click cell → Type number'},
  'coin':{how:'Click the button to flip a coin and see heads or tails',controls:'🖱️ Click'},
  'dice':{how:'Click Roll to roll the dice and see your result',controls:'🖱️ Click'},
  'rps':{how:'Choose Rock, Paper or Scissors — best of 5 wins!',controls:'🖱️ Click'},
  'numguess':{how:'Guess the secret number — hints tell you Higher or Lower',controls:'⌨️ Type + Enter'},
  'reaction':{how:'Wait for GREEN then click as fast as possible! (click early = penalty)',controls:'🖱️ Click when green'},
  'ttt':{how:'Get 3 in a row horizontally, vertically or diagonally to win',controls:'🖱️ Click cell'},
  'mines':{how:'Click to reveal cells — avoid mines! Numbers show nearby mines',controls:'🖱️ Left click=reveal, Right click=flag'},
  'c4':{how:'Drop pieces to connect 4 in a row — vertical, horizontal or diagonal',controls:'🖱️ Click column'},
  'snake':{how:'Eat food to grow longer — avoid walls and your own tail!',controls:'← → ↑ ↓ Arrow keys or on-screen buttons'},
  'pong':{how:'Move your paddle to hit the ball — first to 5 points wins!',controls:'🖱️ Mouse or ↑↓ Arrow keys'},
  'g2048':{how:'Swipe or press arrows to merge tiles — reach the 2048 tile!',controls:'← → ↑ ↓ Arrow keys'},
  'chess':{how:'Find the best chess move (mate in 1-2). Click your answer',controls:'🖱️ Click'},
  'tetris':{how:'Rotate and place falling blocks to complete full lines',controls:'← → move, ↑ rotate, ↓ faster, P pause'},
  'flappy':{how:'Tap/click to make the bird flap and fly through the pipes!',controls:'🖱️ Click or Space bar'},
  'mineshard':{how:'Expert 10×10 minesweeper — more mines, bigger challenge',controls:'🖱️ Left=reveal, Right=flag'},
  'breakout':{how:'Move the paddle to bounce the ball and break all bricks',controls:'🖱️ Mouse or ← → keys'},
  'lightsout':{how:'Click cells to toggle lights — turn ALL lights off to win',controls:'🖱️ Click'},
  'colormatch':{how:'Click the COLOR of the ink (not the word!) — Stroop effect',controls:'🖱️ Click color name'},
  'simon':{how:'Watch the color sequence then repeat it by clicking in order',controls:'🖱️ Click colors in sequence'},
  'memory':{how:'Click cards to flip them — find all matching pairs',controls:'🖱️ Click cards'},
  'patternmem':{how:'Watch the pattern light up then click the same cells',controls:'🖱️ Click cells'},
  'memhard':{how:'Advanced 5×4 memory grid — more cards, harder patterns',controls:'🖱️ Click cards'},
};
  var DESCS={'fruitpop': 'Match fruits and blast the board', 'rainbowbubble': 'Pop rainbow ball groups', 'citydash': 'Fast 3-lane city runner', 'blockpuzzle': 'Place blocks and clear lines', 'colorjoy': 'Color animals, fruits and flowers', 'minirace': 'Fast colorful racing', 'parkingpuzzle': 'Park the car safely', 'colorquiz': 'Name the color shown!', 'flagquiz': 'Which country is this flag?', 'truefalse': 'True or false — quick!', 'riddles': 'Solve the brain teaser', 'emojiquiz': 'What do these emojis mean?', 'oddone': 'Which one does not belong?', 'genquiz': 'Test your general knowledge', 'geoquiz': 'Capitals & world geography', 'sciquiz': 'Physics, chemistry & biology', 'moviequiz': 'Can you name the movie?', 'expertquiz': 'Expert-level trivia challenge', 'histquiz': 'Dates & historical events', 'wordscramble': 'Unscramble the letters!', 'hangman': 'Guess letters to save the man', 'typing': 'Type fast! 60 second WPM test', 'anagram': 'Rearrange to make a new word', 'wordchain': 'Each word starts with last letter', 'wordle': 'Guess the 5-letter word', 'crossword': 'Fill in the crossword puzzle', 'spelling': 'Unscramble and spell correctly', 'cipher': 'Decode the Caesar cipher', 'wordsearch': 'Find all hidden words in grid', 'mathbasic': 'Addition, subtraction & more', 'mathquiz': 'Mixed math operations', 'times': 'Multiplication tables race', 'make24': 'Use 4 numbers to make 24', 'mathsprint': '30 math questions in 60 seconds', 'numseq': 'What number comes next?', 'sudoku': 'Fill the 9×9 number grid', 'coin': 'Heads or tails?', 'dice': 'Roll 1-6 dice!', 'rps': 'Rock, Paper, Scissors battle', 'numguess': 'Guess the number 1-100', 'reaction': 'Click when you see green!', 'ttt': 'Tic Tac Toe vs smart AI', 'mines': 'Clear the minefield!', 'c4': 'Connect 4 in a row!', 'snake': 'Eat food, grow longer', 'pong': 'Classic ball & paddle game', 'g2048': 'Merge tiles to reach 2048', 'chess': 'Find the best chess move', 'tetris': 'Falling blocks puzzle', 'flappy': 'Tap to fly through pipes', 'mineshard': '10×10 expert minesweeper', 'breakout': 'Break all the bricks!', 'lightsout': 'Turn all lights off', 'colormatch': 'Click the ink color, not the word!', 'simon': 'Repeat the color sequence', 'memory': 'Find all matching pairs', 'patternmem': 'Remember & repeat the pattern', 'memhard': 'Advanced 5×4 memory grid'};

  var cat=CATS[key]||'classic';
  var th=THEMES[cat]||THEMES.classic;
  var desc=DESCS[key]||'Play and have fun!';

  var box=document.getElementById('modal-box');
  if(!box)return;

  /* Apply colorful kid-friendly light theme */
  box.style.background=th.bg;
  box.style.border='2px solid '+th.border;
  box.style.color=th.text;
  box.style.boxShadow='0 24px 70px rgba(15,23,42,.18)';
  box.style.setProperty('--text',th.text);
  box.style.setProperty('--muted','#64748b');
  box.style.setProperty('--border',th.border);

  var fav=typeof isFav==='function'&&isFav(key);

  box.innerHTML=
    '<div style="display:flex;align-items:center;gap:6px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid '+th.border+';">'
    +'<button onclick="closeGame()" style="background:rgba(255,255,255,.15);border:none;border-radius:10px;width:32px;height:32px;cursor:pointer;font-size:17px;color:'+th.text+';font-weight:700;flex-shrink:0;">&times;</button>'
    +'<div id="modal-lives" style="display:flex;gap:2px;font-size:16px;"></div>'
    +'<div style="flex:1"></div>'
    +'<button data-gkey="'+key+'" onclick="toggleFav(this)" style="background:rgba(255,255,255,.12);border:1px solid '+th.border+';border-radius:8px;padding:5px 9px;cursor:pointer;font-size:15px;">'+(fav?'❤️':'🤍')+'</button>'
    +'<button onclick="shareGame(this)" data-gkey2="'+key+'" style="background:rgba(255,255,255,.12);border:1px solid '+th.border+';border-radius:8px;padding:5px 9px;cursor:pointer;font-size:11px;font-weight:700;color:'+th.accent+';">Share</button>'
    +'<button id="fs-btn" onclick="toggleGameFullscreen()" style="background:rgba(255,255,255,.12);border:1px solid '+th.border+';border-radius:8px;padding:5px 9px;cursor:pointer;font-size:12px;color:'+th.text+';">⛶</button>'
    +'<button id="sound-btn" onclick="toggleSound()" style="background:rgba(255,255,255,.12);border:1px solid '+th.border+';border-radius:8px;padding:5px 9px;cursor:pointer;font-size:12px;">'+(_soundOn?'🔊':'🔇')+'</button>'
    +'</div>'
    /* Game description */
    +'<div style="border-radius:14px;overflow:hidden;margin-bottom:10px;">'
    +'<div style="background:rgba(255,255,255,.72);padding:10px 14px;border-left:4px solid '+th.accent+';border-radius:14px;border:1px solid rgba(255,255,255,.88);box-shadow:0 6px 18px rgba(15,23,42,.06);">'
    +'<div style="font-size:13px;font-weight:800;color:'+th.text+';margin-bottom:6px;">'+desc+'</div>'
    +((HOW_TO[key])?'<div style="display:flex;gap:12px;flex-wrap:wrap;">'
    +'<span style="font-size:11px;color:'+th.accent+';font-weight:700;">'+HOW_TO[key].controls+'</span>'
    +'<span style="font-size:11px;color:#64748b;font-weight:600;">'+HOW_TO[key].how+'</span>'
    +'</div>':'')
    +'</div></div>'
    /* Game area */
    +'<div id="gw" style="color:'+th.text+';">'
    +'<div style="text-align:center;padding:40px;">'
    +'<div style="display:inline-block;width:32px;height:32px;border:3px solid rgba(15,23,42,.12);border-top-color:'+th.accent+';border-radius:50%;animation:spin .7s linear infinite;"></div>'
    +'<p style="margin-top:12px;color:#64748b;font-size:13px;font-weight:700;">Loading...</p>'
    +'</div></div>';

  /* Style btn inside modal for dark bg */
  var style=document.createElement('style');
  style.id='modal-btn-style';
  style.textContent='#modal-box{--text:'+th.text+';--muted:#64748b;--border:'+th.border+';}'
    +'#modal-box .btn{background:linear-gradient(135deg,#fda4af,#c4b5fd,#7dd3fc)!important;color:#172033!important;border:1px solid rgba(255,255,255,.9)!important;box-shadow:0 8px 20px rgba(15,23,42,.10)!important;}'
    +'#modal-box .btn:hover{filter:saturate(1.15) brightness(1.03)!important;transform:translateY(-1px)!important;}'
    +'#modal-box .btn-sec{background:#fff!important;color:#334155!important;border:1px solid '+th.border+'!important;box-shadow:0 4px 12px rgba(15,23,42,.06)!important;}'
    +'#modal-box input[type=text],#modal-box input[type=number]{background:#fff!important;color:#172033!important;border:1.5px solid '+th.border+'!important;box-shadow:0 4px 12px rgba(15,23,42,.05)!important;}'
    +'#modal-box input::placeholder{color:#94a3b8!important;}'
    +'#modal-box button.g-btn{background:linear-gradient(135deg,#ffffff,#fef3c7)!important;color:#172033!important;border:1.5px solid '+th.border+'!important;box-shadow:0 6px 14px rgba(15,23,42,.08)!important;font-weight:900!important;}'
    +'#modal-box button.g-btn:hover{filter:saturate(1.12)!important;transform:translateY(-1px)!important;}'
    +'#modal-box select{background:#fff;color:#172033;border:1.5px solid '+th.border+';border-radius:8px;padding:4px 8px;font-weight:700;}'
    +'#modal-box canvas{box-shadow:0 10px 26px rgba(15,23,42,.12)!important;}'
    +'#modal-box [style*="color:rgba(255,255,255"]{color:#64748b!important;}'
    +'#modal-box [style*="background:rgba(255,255,255"]{background:rgba(255,255,255,.72)!important;}'
    +'#modal-box .tet-stat{background:rgba(255,255,255,.60)!important;border-radius:10px;padding:5px 7px;}'
    +'#modal-box #gw{color:#172033!important;}';
  var old=document.getElementById('modal-btn-style');if(old)old.remove();
  document.head.appendChild(style);

  updateLivesUI();
  var ov=document.getElementById('overlay');if(ov)ov.classList.add('active');
  document.body.style.overflow='hidden';

  setTimeout(function(){
    if(typeof GAMES!=='undefined'&&GAMES[key]){
      try{GAMES[key]();}
      catch(e){
        console.error(key,e.message);
        var g=gw();
        if(g)g.innerHTML='<div style="text-align:center;padding:30px;">'
          +'<div style="font-size:40px;margin-bottom:10px;">⚠️</div>'
          +'<div style="color:#f87171;font-weight:700;margin-bottom:12px;">'+e.message+'</div>'
          +'<button onclick="openGame(\''+key+'\')" class="btn" style="margin-top:10px;">Retry</button>'
          +'</div>';
      }
    }else{
      var g=gw();
      if(g)g.innerHTML='<div style="text-align:center;padding:30px;">'
        +'<div style="font-size:40px;margin-bottom:10px;">🚧</div>'
        +'<div style="font-size:16px;font-weight:700;color:rgba(255,255,255,.7);">Coming Soon!</div>'
        +'</div>';
    }
  },60);
}

function closeGame(){
  if(window._gl){try{cancelAnimationFrame(window._gl);}catch(e){}try{clearTimeout(window._gl);}catch(e){}window._gl=null;}
  var ov=document.getElementById('overlay');if(ov)ov.classList.remove('active');
  var box=document.getElementById('modal-box');
  if(box){box.innerHTML='';box.style.cssText='';box.style.background='';box.style.border='';}if(typeof _modalExp!=='undefined'){_modalExp=false;}
  var st=document.getElementById('modal-btn-style');if(st)st.remove();
  document.body.style.overflow='';
  _currentGame=null;
}

function closeIfOut(e){if(e.target===document.getElementById('overlay'))closeGame();}

/* SEARCH */
function searchGames(q){
  q=q.toLowerCase().trim();
  document.querySelectorAll('.game-card').forEach(function(card){
    var name=(card.querySelector('.g-name')||{textContent:''}).textContent.toLowerCase();
    var desc=(card.querySelector('.g-desc')||{textContent:''}).textContent.toLowerCase();
    card.style.display=(!q||name.includes(q)||desc.includes(q))?'':'none';
  });
}

/* FILTER */
function setFilter(cat,btn){
  document.querySelectorAll('.flt').forEach(function(b){b.classList.remove('active');});
  if(btn){
    btn.classList.add('active');
    btn.style.animation='none';
    requestAnimationFrame(function(){requestAnimationFrame(function(){btn.style.animation='';});});
  }
  document.querySelectorAll('.game-card').forEach(function(card){
    if(cat==='all'||card.dataset.cat===cat){
      card.style.display='';
      card.style.animation='cardFadeIn .3s ease';
    } else {
      card.style.display='none';
    }
  });
  if(cat==='all'){
    document.getElementById('games').scrollIntoView({behavior:'smooth',block:'start'});
  } else {
    var ids={quiz:'section-quiz',word:'section-word',math:'section-math',classic:'section-classic',memory:'section-memory'};
    var el=document.getElementById(ids[cat]);
    if(el){
      setTimeout(function(){
        var top=el.getBoundingClientRect().top+window.scrollY-110;
        window.scrollTo({top:top,behavior:'smooth'});
      },80);
    }
  }
}

function checkAdPrompt(level){
  if(level>0&&level%5===0&&level!==_lastLvlPrompt){
    _lastLvlPrompt=level;
    setTimeout(function(){showLevelUpModal(level);},1500);
  }
}
function showLevelUpModal(level){
  var ex=document.getElementById('levelup-modal');if(ex)ex.remove();
  var d=document.createElement('div');d.id='levelup-modal';
  d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:99999;';
  d.innerHTML='<div style="background:linear-gradient(145deg,#1e1b4b,#3730a3);border-radius:20px;padding:32px 24px;text-align:center;max-width:300px;width:90%;border:1px solid rgba(129,140,248,.3);">'
    +'<div style="font-size:48px;margin-bottom:8px;">'+(level%25===0?'🏆':level%10===0?'🌟':'⬆️')+'</div>'
    +'<div style="color:#e0e7ff;font-size:22px;font-weight:900;margin-bottom:4px;">Level '+level+'!</div>'
    +'<div style="color:rgba(255,255,255,.7);font-size:14px;margin-bottom:20px;">Keep going!</div>'
    +'<button onclick="adForLevelBonus(this)" style="width:100%;padding:14px;border-radius:12px;background:#f59e0b;border:none;color:#fff;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px;">📺 Watch Ad → +5 Lives</button>'
    +'<button onclick="closeLevelUp()" style="width:100%;padding:10px;border-radius:10px;background:none;border:none;color:rgba(255,255,255,.4);font-size:13px;cursor:pointer;">Continue playing</button>'
    +'</div>';
  document.body.appendChild(d);
}
function closeLevelUp(){var lm=document.getElementById('levelup-modal');if(lm)lm.remove();}
function adForLevelBonus(btn){
  btn.textContent='Watching... 5s';btn.disabled=true;
  var s=5;var iv=setInterval(function(){s--;btn.textContent='Watching... '+s+'s';if(s<=0){clearInterval(iv);gainLive(5);playSound('win');closeLevelUp();}},1000);
}

/* SAVE/CONTINUE */
function saveGameState(key,state){try{localStorage.setItem('sv_'+key,JSON.stringify({state:state,time:Date.now()}));}catch(e){}}
function loadGameState(key){try{var d=JSON.parse(localStorage.getItem('sv_'+key)||'null');if(!d)return null;if(Date.now()-d.time>86400000){localStorage.removeItem('sv_'+key);return null;}return d.state;}catch(e){return null;}}
function clearSave(key){localStorage.removeItem('sv_'+key);}
function hasSave(key){return !!localStorage.getItem('sv_'+key);}
function showContinuePrompt(key,name,onCont,onNew){
  if(!hasSave(key)){onNew();return;}
  var g=gw();if(!g)return;
  g.innerHTML='<div style="text-align:center;padding:32px 20px;">'
    +'<div style="font-size:52px;margin-bottom:12px;">💾</div>'
    +'<div style="font-size:20px;font-weight:900;color:#1e293b;margin-bottom:16px;">Continue '+name+'?</div>'
    +'<button onclick="window._cpY&&window._cpY()" class="btn" style="width:100%;margin-bottom:10px;padding:15px;">▶ Continue</button>'
    +'<button onclick="window._cpN&&window._cpN()" class="btn btn-sec" style="width:100%;padding:13px;">New Game</button>'
    +'</div>';
  window._cpY=onCont;window._cpN=function(){clearSave(key);onNew();};
}

/* DAILY CHALLENGE */
var DAILY_GAMES=['colorquiz','flagquiz','mathbasic','wordle','hangman','simon','ttt','numguess','memory','typing','anagram','wordscramble','geoquiz','sciquiz','times','colormatch','riddles','emojiquiz','genquiz','reaction'];
function initDaily(){
  var day=Math.floor(Date.now()/86400000);
  var idx=day%DAILY_GAMES.length;
  var key=DAILY_GAMES[idx];
  var NAMES={colorquiz:'Color Quiz',flagquiz:'Flag Quiz',mathbasic:'Math Basics',wordle:'Word Guess',hangman:'Hangman',simon:'Simon Says',ttt:'Tic Tac Toe',numguess:'Number Guess',memory:'Memory Cards',typing:'Typing Speed',anagram:'Anagram',wordscramble:'Word Scramble',geoquiz:'Geography Quiz',sciquiz:'Science Quiz',times:'Times Tables',colormatch:'Color Match',riddles:'Riddles',emojiquiz:'Emoji Quiz',genquiz:'General Knowledge',reaction:'Reaction Time'};
  var dn=document.getElementById('daily-name');if(dn)dn.textContent='Today: '+(NAMES[key]||key);
  var db=document.getElementById('daily-btn');if(db){db.onclick=function(){openGame(key);earnXP(50,'Daily Challenge');};}
  // Countdown timer
  function updateTimer(){
    var now=new Date();var midnight=new Date(now);midnight.setHours(24,0,0,0);
    var diff=Math.floor((midnight-now)/1000);
    var h=Math.floor(diff/3600),m=Math.floor((diff%3600)/60),s=diff%60;
    var te=document.getElementById('daily-timer');
    if(te)te.textContent=(h<10?'0':'')+h+':'+(m<10?'0':'')+m+':'+(s<10?'0':'')+s;
  }
  updateTimer();setInterval(updateTimer,1000);
}

/* I18N - Basic */
var _lang=navigator.language&&navigator.language.slice(0,2)||'en';
var I18N={en:{},tr:{t_lbl:'🏆 Haftalık Turnuva',t_name:'2048 Şampiyonası'},es:{},fr:{}};

/* INIT */

/* ══ PREMIUM EFFECTS JS ══ */

/* ── CONFETTI ── */
function launchConfetti(count) {
  count = count || 80;
  var colors = ['#6366f1','#818cf8','#4ade80','#f472b6','#fbbf24','#60a5fa','#fb923c','#a78bfa'];
  for (var i = 0; i < count; i++) {
    (function(i) {
      setTimeout(function() {
        var el = document.createElement('div');
        el.className = 'confetti-piece';
        el.style.left = Math.random() * 100 + 'vw';
        el.style.top = '-10px';
        el.style.background = colors[Math.floor(Math.random()*colors.length)];
        el.style.width = (6 + Math.random()*8) + 'px';
        el.style.height = (6 + Math.random()*8) + 'px';
        el.style.animationDuration = (2 + Math.random()*2) + 's';
        el.style.animationDelay = '0s';
        document.body.appendChild(el);
        setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);}, 4000);
      }, i * 30);
    })(i);
  }
}

/* ── SPARKS ── */
function launchSparks(x, y, count) {
  count = count || 12;
  var colors = ['#fbbf24','#f59e0b','#fff','#818cf8','#4ade80'];
  for (var i = 0; i < count; i++) {
    var el = document.createElement('div');
    el.className = 'spark';
    var angle = (i / count) * Math.PI * 2;
    var dist = 40 + Math.random() * 60;
    el.style.left = x + 'px';
    el.style.top = y + 'px';
    el.style.background = colors[Math.floor(Math.random()*colors.length)];
    el.style.setProperty('--tx', Math.cos(angle)*dist + 'px');
    el.style.setProperty('--ty', Math.sin(angle)*dist + 'px');
    el.style.animationDuration = (.5 + Math.random()*.5) + 's';
    document.body.appendChild(el);
    setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el);}, 1000);
  }
}

/* ── ACHIEVEMENT POPUP ── */
var _achQueue = [];
var _achShowing = false;
function showAchievement(icon, title, desc) {
  _achQueue.push({icon:icon,title:title,desc:desc});
  if (!_achShowing) processAchQueue();
}
function processAchQueue() {
  if (!_achQueue.length) { _achShowing = false; return; }
  _achShowing = true;
  var ach = _achQueue.shift();
  var el = document.createElement('div');
  el.className = 'achievement-popup';
  el.innerHTML = '<div style="font-size:36px;flex-shrink:0;">'+ach.icon+'</div>'
    + '<div><div style="color:#fbbf24;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;margin-bottom:2px;">Achievement Unlocked!</div>'
    + '<div style="color:#fff;font-size:14px;font-weight:700;margin-bottom:2px;">'+ach.title+'</div>'
    + '<div style="color:rgba(255,255,255,.5);font-size:11px;">'+ach.desc+'</div></div>';
  document.body.appendChild(el);
  playSound('win');
  setTimeout(function(){ el.classList.add('show'); }, 50);
  setTimeout(function(){
    el.style.right = '-320px';
    setTimeout(function(){ if(el.parentNode)el.parentNode.removeChild(el); processAchQueue(); }, 400);
  }, 3500);
}

/* ── RIPPLE EFFECT ── */
function addRipple(e) {
  var btn = e.currentTarget;
  btn.classList.remove('ripple');
  requestAnimationFrame(function(){requestAnimationFrame(function(){btn.classList.add('ripple');});});
}

function disableQuizBtns(correctText, wrongText) {
  var g = document.getElementById('gw'); if(!g) return;
  g.querySelectorAll('button').forEach(function(b) {
    b.disabled = true; b.style.cursor = 'not-allowed';
    var t = b.textContent.trim();
    if(correctText && t === correctText) {
      b.style.background='#22c55e !important';b.style.background='#22c55e';b.style.color='#fff';b.style.borderColor='#22c55e';b.style.opacity='1';
    } else if(wrongText && t === wrongText) {
      b.style.background='#ef4444';b.style.color='#fff';b.style.borderColor='#ef4444';b.style.opacity='1';
    } else {
      b.style.opacity='0.4';
    }
  });
}
/* Disable ALL gw buttons (call before showing result) */
function lockBtns() {
  var g=document.getElementById('gw');if(!g)return;
  g.querySelectorAll('button').forEach(function(b){b.disabled=true;b.style.pointerEvents='none';});
}


var _modalExp=false;
function toggleGameFullscreen(){
  var ov=document.getElementById('overlay');
  if(!ov)return;
  if(!document.fullscreenElement){
    var req=ov.requestFullscreen||ov.webkitRequestFullscreen||ov.msRequestFullscreen;
    if(req)req.call(ov);
  }else{
    var exit=document.exitFullscreen||document.webkitExitFullscreen||document.msExitFullscreen;
    if(exit)exit.call(document);
  }
}
function updateFsBtnIcon(){
  var btn=document.getElementById('fs-btn');
  if(btn)btn.textContent=document.fullscreenElement?'⤡':'⛶';
}
document.addEventListener('fullscreenchange',updateFsBtnIcon);
document.addEventListener('webkitfullscreenchange',updateFsBtnIcon);
/* Legacy alias kept in case other code still calls the old name */
function expandModal(){toggleGameFullscreen();}
function goFullscreen(){toggleGameFullscreen();}
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.btn,.flt').forEach(function(btn) {
    btn.addEventListener('click', addRipple);
  });
});

/* ── MOUSE TRAIL ── */
var _trailOn = true;
var _trailEls = [];
document.addEventListener('mousemove', function(e) {
  if (!_trailOn) return;
  var el = document.createElement('div');
  el.style.cssText = 'position:fixed;left:'+e.clientX+'px;top:'+e.clientY+'px;width:6px;height:6px;border-radius:50%;background:rgba(129,140,248,.6);pointer-events:none;z-index:99990;transform:translate(-50%,-50%);transition:all .6s;';
  document.body.appendChild(el);
  setTimeout(function(){ el.style.opacity='0'; el.style.transform='translate(-50%,-50%) scale(2)'; }, 50);
  setTimeout(function(){ if(el.parentNode)el.parentNode.removeChild(el); }, 650);
});

/* ── OVERRIDE showWin WITH CONFETTI ── */
var _origShowWin = showWin;
showWin = function(title, msg, xp) {
  launchConfetti(100);
  launchSparks(window.innerWidth/2, window.innerHeight/3, 20);
  playSound('win');
  var d = document.createElement('div');
  d.className = 'win-overlay';
  d.id = 'win-overlay';
  d.innerHTML = '<div class="win-box" style="text-align:center;">'
    + '<div style="font-size:64px;margin-bottom:8px;animation:winPop .4s ease;">🏆</div>'
    + '<div style="font-size:24px;font-weight:900;color:#e0e7ff;margin-bottom:6px;">'+title+'</div>'
    + '<div style="color:rgba(255,255,255,.6);font-size:14px;margin-bottom:16px;">'+msg+'</div>'
    + (xp ? '<div style="background:rgba(251,191,36,.2);border:1px solid rgba(251,191,36,.3);border-radius:10px;padding:10px;font-size:18px;font-weight:800;color:#fbbf24;margin-bottom:16px;">+'+xp+' XP Earned!</div>' : '')
    + '<button class="btn" onclick="closeWin()" style="padding:12px 32px;font-size:15px;">Continue Playing</button>'
    + '</div>';
  document.body.appendChild(d);
  d.onclick = function(e){ if(e.target===d)d.remove(); };
  if (xp && xp >= 50) {
    setTimeout(function(){ showAchievement('⭐','Big Score!','Earned '+xp+' XP in one game'); }, 1000);
  }
};

/* ── OVERRIDE showLose ── */
showLose = function(title, msg) {
  playSound('lose');
  var d = document.createElement('div');
  d.className = 'win-overlay'; d.id = 'win-overlay';
  d.innerHTML = '<div class="win-box" style="text-align:center;">'
    + '<div style="font-size:56px;margin-bottom:8px;">💔</div>'
    + '<div style="font-size:22px;font-weight:900;color:#fca5a5;margin-bottom:6px;">'+title+'</div>'
    + '<div style="color:rgba(255,255,255,.5);font-size:14px;margin-bottom:16px;">'+msg+'</div>'
    + '<button class="btn" onclick="closeWin()"tyle="padding:12px 32px;">Try Again</button>'
    + '</div>';
  document.body.appendChild(d);
  d.onclick = function(e){ if(e.target===d)d.remove(); };
};

/* ── FLOATING BACKGROUND ICONS ── */
function addFloatingIcons() {
  var icons = ['🎮','⭐','🎯','🏆','💎','🎲','🔥','⚡','🌟','🎪'];
  var container = document.createElement('div');
  container.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden;';
  container.id = 'floating-icons';
  for (var i = 0; i < 8; i++) {
    var el = document.createElement('div');
    var startX = Math.random() * 100;
    var dur = 15 + Math.random() * 20;
    var delay = Math.random() * -20;
    var size = 16 + Math.random() * 20;
    el.style.cssText = 'position:absolute;font-size:'+size+'px;left:'+startX+'vw;bottom:-60px;opacity:.06;animation:iconRise '+dur+'s '+delay+'s linear infinite;';
    el.textContent = icons[i % icons.length];
    container.appendChild(el);
  }
  document.body.appendChild(container);
}

/* ── LEVEL UP MODAL OVERRIDE ── */
showLevelUpModal = function(level) {
  var ex = document.getElementById('levelup-modal'); if(ex)ex.remove();
  launchConfetti(40);
  var d = document.createElement('div'); d.id='levelup-modal';
  d.style.cssText='position:fixed;inset:0;background:rgba(0,0,0,.8);display:flex;align-items:center;justify-content:center;z-index:99999;backdrop-filter:blur(16px);';
  var emoji = level%25===0?'🏆':level%10===0?'🌟':'⬆️';
  d.innerHTML='<div style="background:linear-gradient(145deg,#1e1b4b,#312e81);border-radius:24px;padding:36px 28px;text-align:center;max-width:320px;width:90%;border:1px solid rgba(129,140,248,.3);box-shadow:0 0 60px rgba(99,102,241,.3);">'
    +'<div style="font-size:64px;margin-bottom:12px;animation:winPop .4s ease;">'+emoji+'</div>'
    +'<div style="color:#e0e7ff;font-size:24px;font-weight:900;margin-bottom:6px;">Level '+level+'!</div>'
    +'<div style="color:rgba(255,255,255,.5);font-size:14px;margin-bottom:24px;">You are on fire! Keep going!</div>'
    +'<button onclick="adForLevelBonus(this)" style="width:100%;padding:15px;border-radius:14px;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;color:#fff;font-size:15px;font-weight:700;cursor:pointer;margin-bottom:10px;box-shadow:0 4px 20px rgba(245,158,11,.4);">📺 Watch Ad → +5 Lives</button>'
    +'<button onclick="closeLevelUp()" style="background:none;border:none;color:rgba(255,255,255,.3);font-size:13px;cursor:pointer;">Continue playing</button>'
    +'</div>';
  document.body.appendChild(d);
};

/* ── CSS KEYFRAMES (dynamic) ── */
var dynStyle = document.createElement('style');
dynStyle.textContent = '@keyframes iconRise{0%{transform:translateY(0) rotate(0deg);opacity:.06}50%{opacity:.1}100%{transform:translateY(-110vh) rotate(360deg);opacity:0}}'
  +'@keyframes winPop{0%{transform:scale(.5);opacity:0}60%{transform:scale(1.15)}100%{transform:scale(1);opacity:1}}'
  +'@keyframes scoreUp{0%{transform:translateX(-50%) scale(1);opacity:1}100%{transform:translateX(-50%) translateY(-70px) scale(1.4);opacity:0}}';
document.head.appendChild(dynStyle);

/* ── COUNT-UP ANIMATION ── */
function animateCount(el, target, duration) {
  duration = duration || 1000;
  var start = 0;
  var step = target / (duration / 16);
  var timer = setInterval(function(){
    start = Math.min(start + step, target);
    el.textContent = Math.floor(start).toLocaleString();
    el.classList.add('count-up');
    if (start >= target) clearInterval(timer);
  }, 16);
}

/* ── INIT PREMIUM ── */
document.addEventListener('DOMContentLoaded', function(){
  addFloatingIcons();
  /* Animate hero stats */
  setTimeout(function(){
    document.querySelectorAll('.hnum-n').forEach(function(el){
      var text = el.textContent;
      if (text === '51') animateCount(el, 51, 1000);
    });
  }, 500);
  /* First game achievement */
  setTimeout(function(){
    showAchievement('🎮','Welcome!','Welcome to GameNest World!');
  }, 2000);
});

/* Helper */
function closeElem(id){var o=document.getElementById(id);if(o)o.remove();}


document.addEventListener('DOMContentLoaded',function(){
  window._gl=null;
  updateXPUI();
  initDaily();
  /* Patch _LVL.win for ad prompts */
  if(typeof _LVL!=='undefined'){
    var _ow=_LVL.win.bind(_LVL);
    _LVL.win=function(pts){var r=_ow(pts);checkAdPrompt(_LVL.level);return r;};
  }
  /* Support button */
  if(typeof addSupportButton==='function')addSupportButton();
  if(typeof renderAffiliateSection==='function')renderAffiliateSection();
  
  /* Patch _LVL.win */
  if(typeof _LVL!=='undefined'&&_LVL.win){
    var _ow=_LVL.win.bind(_LVL);
    _LVL.win=function(pts){var r=_ow(pts);if(typeof checkAdPrompt==='function')checkAdPrompt(_LVL.level);return r;};
  }

  console.log('GameNest World v8 Build 202607060938 - Ready! Dark theme + Colorful filters');
});



/* ══ PLAYER NAME + HIGH SCORE SYSTEM ══ */
var _playerName = localStorage.getItem('gnw_player_name') || '';

function getPlayerName(callback) {
  if(_playerName){ callback(_playerName); return; }
  var g=gw();if(!g)return;
  var div=document.createElement('div');
  div.id='name-entry-overlay';
  div.style.cssText='position:absolute;inset:0;background:rgba(0,0,0,.88);display:flex;align-items:center;justify-content:center;z-index:100;border-radius:16px;backdrop-filter:blur(8px);';
  div.innerHTML='<div style="text-align:center;padding:28px;max-width:260px;">'
    +'<div style="font-size:48px;margin-bottom:12px;">🎮</div>'
    +'<div style="font-size:18px;font-weight:800;color:#fff;margin-bottom:6px;">Enter Your Name</div>'
    +'<div style="font-size:13px;color:rgba(255,255,255,.5);margin-bottom:16px;">Your scores will be saved!</div>'
    +'<input id="pname-inp" type="text" maxlength="16" placeholder="Your name..." autocomplete="off" style="width:100%;padding:12px 16px;border-radius:10px;border:1.5px solid rgba(255,255,255,.25);background:rgba(255,255,255,.1);color:#fff;font-size:16px;font-weight:700;text-align:center;font-family:inherit;outline:none;box-sizing:border-box;margin-bottom:12px;caret-color:#818cf8;">'
    +'<button onclick="confirmPlayerName()" style="width:100%;padding:13px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;color:#fff;font-size:15px;font-weight:700;cursor:pointer;box-shadow:0 4px 16px rgba(99,102,241,.4);">Lets Play! 🚀</button>'
    +'</div>';
  g.style.position='relative';
  g.appendChild(div);
  setTimeout(function(){
    var inp=document.getElementById('pname-inp');
    if(inp){inp.focus();inp.onkeydown=function(e){if(e.key==='Enter')confirmPlayerName();};}
  },100);
  window._nameCallback=callback;
}

window.confirmPlayerName=function(){
  var inp=document.getElementById('pname-inp');
  var name=(inp&&inp.value.trim())||'Player';
  _playerName=name;
  localStorage.setItem('gnw_player_name',name);
  var ov=document.getElementById('name-entry-overlay');if(ov)ov.remove();
  if(window._nameCallback)window._nameCallback(name);
};

function saveScore(game,score){
  var key='hs_'+game;
  var scores=JSON.parse(localStorage.getItem(key)||'[]');
  scores.push({name:_playerName||'Player',score:score,date:new Date().toLocaleDateString()});
  scores.sort(function(a,b){return b.score-a.score;});
  scores=scores.slice(0,5);
  localStorage.setItem(key,JSON.stringify(scores));
  return scores;
}

function getScores(game){return JSON.parse(localStorage.getItem('hs_'+game)||'[]');}
function getBest(game){var s=getScores(game);return s.length?s[0].score:0;}

function showScoreBoard(game,gameName,currentScore){
  var scores=saveScore(game,currentScore);
  var g=gw();if(!g)return;
  var rank=scores.findIndex(function(s){return s.score===currentScore&&s.name===(_playerName||'Player')});
  var isTop=rank===0;
  var h='<div style="text-align:center;padding:16px;">';
  h+='<div style="font-size:56px;margin-bottom:8px;">'+(isTop?'🏆':'⭐')+'</div>';
  if(isTop)h+='<div style="font-size:12px;font-weight:800;color:#fbbf24;margin-bottom:4px;text-transform:uppercase;letter-spacing:.08em;">🏆 New High Score!</div>';
  h+='<div style="font-size:30px;font-weight:900;color:#fff;margin-bottom:16px;">'+currentScore.toLocaleString()+' pts</div>';
  h+='<div style="background:rgba(0,0,0,.3);border-radius:12px;padding:12px;margin-bottom:14px;text-align:left;">';
  h+='<div style="font-size:11px;font-weight:800;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:.08em;margin-bottom:8px;">'+gameName+' Top Scores</div>';
  var medals=['🥇','🥈','🥉','4️⃣','5️⃣'];
  scores.forEach(function(s,i){
    var isMe=s.name===(_playerName||'Player')&&s.score===currentScore&&i===rank;
    h+='<div style="display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid rgba(255,255,255,.06);">';
    h+='<span>'+medals[i]+'</span>';
    h+='<span style="flex:1;font-size:13px;font-weight:700;color:'+(isMe?'#fbbf24':'rgba(255,255,255,.8)')+';">'+s.name+'</span>';
    h+='<span style="font-size:13px;font-weight:800;color:'+(isMe?'#fbbf24':'#818cf8')+';">'+s.score.toLocaleString()+'</span>';
    h+='</div>';
  });
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  h+='<button onclick="'+game+'Restart()" style="padding:12px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;color:#fff;font-size:14px;font-weight:700;cursor:pointer;">🔄 Play Again</button>';
  h+='<button onclick="closeGame()" style="padding:12px;border-radius:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:14px;font-weight:700;cursor:pointer;">🏠 Home</button>';
  h+='</div></div>';
  g.innerHTML=h;
  earnXP(Math.max(5,Math.floor(currentScore/10)),gameName);
  playSound('win');
  if(typeof launchConfetti==='function')launchConfetti(50);
}


function gameCoinFlip() {
  var wins=0, losses=0, streak=0, bestStreak=+(localStorage.getItem('streak_coin')||0);
  window.coinRender=function(msg, result) {
    var g=gw(); if(!g) return;
    var h='<div style="text-align:center;padding:16px;">';
    h+='<div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:4px;">🪙 Coin Flip</div>';
    h+='<div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:16px;">Best Streak: '+bestStreak+'</div>';
    // Coin
    h+='<div id="coin-el" style="width:100px;height:100px;border-radius:50%;margin:0 auto 16px;display:flex;align-items:center;justify-content:center;font-size:50px;';
    if(result==='heads') h+='background:linear-gradient(135deg,#fbbf24,#f59e0b);box-shadow:0 0 30px rgba(251,191,36,.5);';
    else if(result==='tails') h+='background:linear-gradient(135deg,#94a3b8,#64748b);box-shadow:0 0 20px rgba(148,163,184,.3);';
    else h+='background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);';
    h+='animation:'+(result?'coinSpin .5s ease':'')+';">'+(result==='heads'?'👑':result==='tails'?'🦅':'🪙')+'</div>';
    if(msg) h+='<div style="font-size:16px;font-weight:800;color:'+(result==='heads'?'#fbbf24':'#94a3b8')+'!important;margin-bottom:12px;">'+msg+'</div>';
    h+='<div style="display:flex;justify-content:center;gap:8px;margin-bottom:14px;">';
    h+='<div style="background:rgba(255,255,255,.08);border-radius:10px;padding:8px 16px;text-align:center;"><div style="font-size:20px;font-weight:900;color:#4ade80;">'+wins+'</div><div style="font-size:10px;color:rgba(255,255,255,.4);">HEADS</div></div>';
    h+='<div style="background:rgba(255,255,255,.08);border-radius:10px;padding:8px 16px;text-align:center;"><div style="font-size:20px;font-weight:900;color:#818cf8;">'+streak+'</div><div style="font-size:10px;color:rgba(255,255,255,.4);">STREAK</div></div>';
    h+='<div style="background:rgba(255,255,255,.08);border-radius:10px;padding:8px 16px;text-align:center;"><div style="font-size:20px;font-weight:900;color:#f87171;">'+losses+'</div><div style="font-size:10px;color:rgba(255,255,255,.4);">TAILS</div></div>';
    h+='</div>';
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
    h+='<button onclick="flipCoin(\'heads\')" style="padding:16px;border-radius:14px;background:linear-gradient(135deg,#fbbf24,#f59e0b);border:none;color:#fff;font-size:16px;font-weight:800;cursor:pointer;transition:all .15s;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">👑 Heads</button>';
    h+='<button onclick="flipCoin(\'tails\')" style="padding:16px;border-radius:14px;background:linear-gradient(135deg,#64748b,#475569);border:none;color:#fff;font-size:16px;font-weight:800;cursor:pointer;transition:all .15s;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">🦅 Tails</button>';
    h+='</div></div>';
    g.innerHTML = h;
  }
  window.flipCoin = function(choice) {
    var result = Math.random() < 0.5 ? 'heads' : 'tails';
    if(choice === result) {
      wins++; streak++;
      if(streak > bestStreak){ bestStreak=streak; localStorage.setItem('streak_coin',bestStreak); }
      playSound('score'); showScorePop('+1 🎉');
      window.coinRender('✅ ' + result.toUpperCase() + '! Correct!', result);
    } else {
      losses++; streak=0; playSound('lose');
      window.coinRender('❌ ' + result.toUpperCase() + '! Wrong!', result);
    }
    earnXP(choice===result?5:1,'Coin Flip');
  };
  window.coinRestart = function(){ gameCoinFlip(); };
  window.coinRender('', '');
}


function flipCoin(){
  var coin=document.getElementById('cf-coin');
  coin.style.transform='rotateY(720deg)';
  setTimeout(()=>{
    coin.style.transform='rotateY(0deg)';
    var h=Math.random()<0.5;
    window._cfH+=(h?1:0);window._cfT+=(h?0:1);
    document.getElementById('cf-res').textContent=h?'HEADS!':'TAILS!';
    document.getElementById('cf-log').textContent=`H:${window._cfH} T:${window._cfT}`;
  },500);
}

/* DICE ROLLER */
var DICE_FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
function gameDice() {
  var total=0, rolls=0;
  var DOTS = [
    '',
    '⚀','⚁','⚂','⚃','⚄','⚅'
  ];
  window.diceRender=function(results) {
    var g=gw(); if(!g) return;
    var h='<div style="text-align:center;padding:16px;">';
    h+='<div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:4px;">🎲 Dice Roller</div>';
    h+='<div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:16px;">Total rolled: '+total+' | Rolls: '+rolls+'</div>';
    // Dice display
    h+='<div style="display:flex;justify-content:center;gap:10px;margin-bottom:20px;min-height:80px;align-items:center;">';
    if(results && results.length) {
      results.forEach(function(r){
        h+='<div style="font-size:56px;animation:rollDice .3s ease;filter:drop-shadow(0 4px 8px rgba(0,0,0,.4));">'+DOTS[r]+'</div>';
      });
    } else {
      h+='<div style="font-size:48px;color:rgba(255,255,255,.2);">🎲</div>';
    }
    h+='</div>';
    if(results && results.length > 1){
      var sum = results.reduce(function(a,b){return a+b;},0);
      h+='<div style="font-size:20px;font-weight:800;color:#fbbf24;margin-bottom:16px;">Sum: '+sum+'</div>';
    }
    // How many dice
    h+='<div style="margin-bottom:12px;">';
    h+='<div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:8px;">Number of dice:</div>';
    h+='<div style="display:flex;justify-content:center;gap:8px;" id="dice-count-btns">';
    [1,2,3,4,5,6].forEach(function(n){
      h+='<button onclick="setDiceCount('+n+')" id="dc-'+n+'" style="width:36px;height:36px;border-radius:8px;border:1px solid rgba(255,255,255,.2);background:rgba(255,255,255,.08);color:#fff;font-size:14px;font-weight:700;cursor:pointer;">'+n+'</button>';
    });
    h+='</div></div>';
    h+='<button onclick="rollDice()" style="width:100%;padding:16px;border-radius:14px;background:linear-gradient(135deg,#7c3aed,#6366f1);border:none;color:#fff;font-size:18px;font-weight:800;cursor:pointer;letter-spacing:.02em;box-shadow:0 4px 20px rgba(99,102,241,.4);">🎲 Roll!</button>';
    h+='</div>';
    g.innerHTML = h;
    // Highlight selected count
    var selBtn = document.getElementById('dc-'+(window._diceCount||1));
    if(selBtn){ selBtn.style.background='rgba(99,102,241,.5)'; selBtn.style.borderColor='#818cf8'; }
  }
  window._diceCount = 1;
  window.setDiceCount = function(n){ window._diceCount=n; rollDice&&rollDice(); };
  window.rollDice = function(){
    var results=[];
    for(var i=0;i<(window._diceCount||1);i++) results.push(rnd(1,6));
    var sum = results.reduce(function(a,b){return a+b;},0);
    total+=sum; rolls++;
    playSound('click'); earnXP(1,'Dice');
    window.diceRender(results);
  };
  window.diceRender(null);
}


function rollDice(n){
  var vals=Array.from({length:n},()=>rnd(1,6));
  document.getElementById('dr-dice').innerHTML=vals.map(v=>`<span>${DICE_FACES[v-1]}</span>`).join('');
  document.getElementById('dr-sum').textContent=n>1?`Sum: ${vals.reduce((a,b)=>a+b,0)}`:'';
}

/* ROCK PAPER SCISSORS */
function gameRPS() {
  var playerScore=0, cpuScore=0, round=0, maxRounds=5;
  var choices=['Rock','Paper','Scissors'];
  var beats={'Rock':'Scissors','Paper':'Rock','Scissors':'Paper'};
  var emojis={'Rock':'🪨','Paper':'📄','Scissors':'✂️'};

  window.rpsRender=function(msg, playerPick, cpuPick, resultColor) {
    var g=gw(); if(!g) return;
    var h='<div style="text-align:center;">';
    h+='<div style="font-size:18px;font-weight:900;color:#fff;margin-bottom:4px;">✊ Rock Paper Scissors</div>';
    h+='<div style="font-size:12px;color:rgba(255,255,255,.4);margin-bottom:14px;">Best of '+maxRounds+' rounds</div>';
    // Score
    h+='<div style="display:flex;justify-content:space-between;align-items:center;background:rgba(0,0,0,.3);border-radius:12px;padding:12px 20px;margin-bottom:14px;">';
    h+='<div><div style="font-size:28px;font-weight:900;color:#4ade80;">'+playerScore+'</div><div style="font-size:11px;color:rgba(255,255,255,.4);">YOU</div></div>';
    h+='<div style="font-size:18px;color:rgba(255,255,255,.3);">Round '+(round+1)+'/'+maxRounds+'</div>';
    h+='<div><div style="font-size:28px;font-weight:900;color:#f87171;">'+cpuScore+'</div><div style="font-size:11px;color:rgba(255,255,255,.4);">CPU</div></div>';
    h+='</div>';
    // Battle display
    if(playerPick && cpuPick){
      h+='<div style="display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:12px;">';
      h+='<div style="font-size:52px;filter:drop-shadow(0 4px 8px rgba(0,0,0,.4));">'+emojis[playerPick]+'</div>';
      h+='<div style="font-size:20px;font-weight:900;color:rgba(255,255,255,.3);">VS</div>';
      h+='<div style="font-size:52px;filter:drop-shadow(0 4px 8px rgba(0,0,0,.4));">'+emojis[cpuPick]+'</div>';
      h+='</div>';
    }
    if(msg) h+='<div style="font-size:16px;font-weight:800;color:'+(resultColor||'#fff')+';margin-bottom:14px;padding:8px;background:rgba(255,255,255,.06);border-radius:8px;">'+msg+'</div>';
    // Buttons
    if(round < maxRounds){
      h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;">';
      choices.forEach(function(c2){
        h+='<button onclick="rpsClick(\''+c2+'\')" style="padding:16px 8px;border-radius:14px;background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.15);color:#fff;font-size:13px;font-weight:700;cursor:pointer;transition:all .2s;" onmouseover="this.style.background=\'rgba(255,255,255,.18)\';this.style.transform=\'scale(1.08)\'" onmouseout="this.style.background=\'rgba(255,255,255,.08)\';this.style.transform=\'scale(1)\'">';
        h+='<div style="font-size:32px;margin-bottom:4px;">'+emojis[c2]+'</div>'+c2+'</button>';
      });
      h+='</div>';
    }
    h+='</div>';
    g.innerHTML=h;
  }

  window.rpsClick = function(player) {
    if(round >= maxRounds) return;
    var cpu = choices[Math.floor(Math.random()*3)];
    var msg, color;
    if(player===cpu){ msg='🤝 Draw!'; color='#fbbf24'; }
    else if(beats[player]===cpu){ playerScore++; msg='🎉 You Win! '+emojis[player]+' beats '+emojis[cpu]; color='#4ade80'; playSound('score'); earnXP(15,'RPS'); }
    else { cpuScore++; msg='😔 CPU Wins! '+emojis[cpu]+' beats '+emojis[player]; color='#f87171'; playSound('lose'); earnXP(2,'RPS'); }
    round++;
    window.rpsRender(msg, player, cpu, color);
    if(round >= maxRounds) {
      setTimeout(function(){
        if(playerScore > cpuScore){ showScoreBoard('rps','Rock Paper Scissors',playerScore*20); }
        else{ var g=gw();if(g){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:16px;';fb.innerHTML='<div style="font-size:48px;margin-bottom:8px;">😔</div><div style="font-size:20px;font-weight:900;color:#f87171;">CPU Wins '+cpuScore+'-'+playerScore+'!</div><button onclick="gameRPS()" style="margin-top:12px;padding:12px 24px;border-radius:10px;background:#6366f1;border:none;color:#fff;font-weight:700;cursor:pointer;">Play Again</button>';g.innerHTML='';g.appendChild(fb);} playSound('lose'); }
      }, 1000);
    }
  };
  window.rpsRestart = function(){ gameRPS(); };
  window.rpsRender('Choose your weapon!', null, null, null);
}


function gameColorQuiz() {
  _LVL.init('colorquiz', 40);
  var cfg = _LVL.getConfig();

  var ALL_COLORS = [
    {hex:'#ff0000',name:'Red'},{hex:'#00ff00',name:'Lime'},{hex:'#0000ff',name:'Blue'},
    {hex:'#ffff00',name:'Yellow'},{hex:'#ff00ff',name:'Magenta'},{hex:'#00ffff',name:'Cyan'},
    {hex:'#ff8000',name:'Orange'},{hex:'#8000ff',name:'Purple'},{hex:'#00ff80',name:'Spring Green'},
    {hex:'#ff0080',name:'Rose'},{hex:'#0080ff',name:'Azure'},{hex:'#80ff00',name:'Chartreuse'},
    {hex:'#800000',name:'Maroon'},{hex:'#008000',name:'Green'},{hex:'#000080',name:'Navy'},
    {hex:'#808000',name:'Olive'},{hex:'#800080',name:'Purple'},{hex:'#008080',name:'Teal'},
    {hex:'#c0392b',name:'Crimson'},{hex:'#e74c3c',name:'Alizarin'},{hex:'#e67e22',name:'Carrot'},
    {hex:'#f39c12',name:'Sunflower'},{hex:'#27ae60',name:'Nephritis'},{hex:'#16a085',name:'Green Sea'},
    {hex:'#2980b9',name:'Belize Blue'},{hex:'#8e44ad',name:'Wisteria'},{hex:'#2c3e50',name:'Midnight Blue'},
    {hex:'#95a5a6',name:'Concrete'},{hex:'#7f8c8d',name:'Asbestos'},{hex:'#bdc3c7',name:'Silver'},
    {hex:'#d35400',name:'Pumpkin'},{hex:'#c0392b',name:'Pomegranate'},{hex:'#1abc9c',name:'Turquoise'},
    {hex:'#3498db',name:'Peter River'},{hex:'#9b59b6',name:'Amethyst'},{hex:'#34495e',name:'Wet Asphalt'},
    {hex:'#f1c40f',name:'Amber'},{hex:'#e8daef',name:'Lavender'},{hex:'#a9cce3',name:'Light Blue'},
    {hex:'#a2d9ce',name:'Mint'}
  ];

  // Higher levels = more similar colors (harder to distinguish)
  var poolSize = Math.min(ALL_COLORS.length, 8 + _LVL.level * 0.8 | 0);
  var pool = ALL_COLORS.slice(0, poolSize);

  // Similar colors at higher levels
  if (_LVL.level > 20) {
    pool = pool.sort(function() { return Math.random() - 0.5; });
  }

  var correct = pool[Math.floor(Math.random() * pool.length)];
  var numOpts = Math.min(6, 2 + Math.floor(_LVL.level / 8));
  var opts = [correct];
  while (opts.length < numOpts) {
    var c2 = pool[Math.floor(Math.random() * pool.length)];
    if (!opts.find(function(o) { return o.name === c2.name; })) opts.push(c2);
  }
  opts = opts.sort(function() { return Math.random() - 0.5; });

  var timeLimit = cfg.timeLimit;
  var timer = timeLimit;
  var timerEl;

  window.cqRender=function() {
    var g = gw(); if (!g) return;
    var h = _LVL.renderHeader('🎨 Color Quiz', '#818cf8');
    h += '<div style="text-align:center;margin-bottom:16px;">';
    h += '<div style="width:140px;height:140px;border-radius:50%;background:'+correct.hex+';margin:0 auto 12px;box-shadow:0 8px 32px '+correct.hex+'88;transition:all .3s;"></div>';
    h += '<div style="font-size:16px;font-weight:700;margin-bottom:8px;color:var(--text);">What color is this?</div>';
    if(timeLimit < 30) h += '<div id="cq-timer" style="font-size:24px;font-weight:900;color:'+( timer<=5?'#ef4444':'#6366f1')+';margin-bottom:8px;">⏱ '+timer+'s</div>';
    h += '</div>';
    h += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">';
    opts.forEach(function(opt) {
      h += '<button onclick="cqAnswer(\''+opt.name+'\')" style="padding:12px;border-radius:12px;border:2px solid #e2e8f0;background:#fff;cursor:pointer;font-size:14px;font-weight:700;color:#1e293b;transition:all .2s;" onmouseover="this.style.background=\''+opt.hex+'\';this.style.color=\'#fff\';this.style.borderColor=\''+opt.hex+'\';" onmouseout="this.style.background=\'#fff\';this.style.color=\'#1e293b\';this.style.borderColor=\'#e2e8f0\';">'+opt.name+'</button>';
    });
    h += '</div>';
    g.innerHTML = h;
  }

  window.cqAnswer = function(name) {
    if(window._cqTimer) clearInterval(window._cqTimer);
    disableQuizBtns(correct.name, name !== correct.name ? name : null);
    if (name === correct.name) {
      _LVL.win(20); showScorePop('+20');
      setTimeout(function() { gameColorQuiz(); }, 900);
    } else {
      var alive = _LVL.lose();
      if(alive) setTimeout(function() { gameColorQuiz(); }, 1400);
    }
  };

  // Timer for levels 10+
  if(_LVL.level >= 10) {
    window._cqTimer = setInterval(function() {
      timer--;
      var te = document.getElementById('cq-timer');
      if(te) { te.textContent = '⏱ '+timer+'s'; te.style.color = timer<=5?'#ef4444':'#6366f1'; }
      if(timer <= 0) {
        clearInterval(window._cqTimer);
        _LVL.lose();
        var g = gw(); if(g) {
          var info = document.createElement('div');
          info.style.cssText = 'position:absolute;inset:0;background:rgba(239,68,68,.9);display:flex;align-items:center;justify-content:center;border-radius:12px;font-size:24px;font-weight:900;color:#fff;';
          info.textContent = 'Time Up! It was: ' + correct.name;
          g.style.position = 'relative'; g.appendChild(info);
        }
        setTimeout(function() { gameColorQuiz(); }, 1500);
      }
    }, 1000);
  }

  window.cqRender();
}


function gameMathBasic() {
  _LVL.init('mathbasic', 50);
  var level = _LVL.level;

  // Operations unlock as levels increase
  var ops = ['+'];
  if(level > 5) ops.push('-');
  if(level > 15) ops.push('*');
  if(level > 25) ops.push('/');

  var op = ops[Math.floor(Math.random() * ops.length)];
  var maxNum = Math.min(100, 5 + level * 2);

  var a, b, answer;
  if(op === '+') { a = rnd(1,maxNum); b = rnd(1,maxNum); answer = a+b; }
  else if(op === '-') { a = rnd(maxNum/2|0, maxNum); b = rnd(1, a); answer = a-b; }
  else if(op === '*') { a = rnd(2,Math.min(12,level)); b = rnd(2,Math.min(12,level)); answer = a*b; }
  else { answer = rnd(2,Math.min(12,level)); b = rnd(2,Math.min(12,level)); a = answer*b; }

  var opSymbol = {'+':'+','-':'-','*':'×','/':'÷'}[op];

  // Wrong answers
  var opts = [answer];
  while(opts.length < 4) {
    var wrong = answer + rnd(-Math.max(5,answer/2|0), Math.max(5,answer/2|0));
    if(wrong !== answer && wrong > 0 && !opts.includes(wrong)) opts.push(wrong);
  }
  opts = opts.sort(function(){return Math.random()-.5;});

  // Timer gets shorter at higher levels
  var timeLimit = Math.max(5, 15 - Math.floor(level/5));
  var timer = timeLimit;

  var g = gw(); if(!g) return;
  var h = _LVL.renderHeader('➕ Math Basics', '#fb923c');
  h += '<div style="text-align:center;background:rgba(255,255,255,.1);border-radius:16px;padding:24px;margin-bottom:16px;">';
  h += '<div style="font-size:48px;font-weight:900;color:#1e293b;letter-spacing:2px;">'+a+' '+opSymbol+' '+b+' = ?</div>';
  if(level >= 5) h += '<div id="mb-timer" style="font-size:20px;font-weight:800;color:'+(timer<=5?'#ef4444':'#6366f1')+';margin-top:8px;">⏱ '+timer+'s</div>';
  h += '</div>';
  h += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">';
  opts.forEach(function(opt){
    h += '<button onclick="mbAnswer('+opt+')" style="padding:16px;border-radius:12px;border:2px solid #e2e8f0;background:#fff;cursor:pointer;font-size:22px;font-weight:900;color:#1e293b;transition:all .15s;" onmouseover="this.style.background=\'#6366f1\';this.style.color=\'#fff\';" onmouseout="this.style.background=\'#fff\';this.style.color=\'#1e293b\';">'+opt+'</button>';
  });
  h += '</div>';
  g.innerHTML = h;

  if(level >= 5) {
    window._mbTimer = setInterval(function(){
      timer--;
      var te=document.getElementById('mb-timer');
      if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#6366f1';}
      if(timer<=0){clearInterval(window._mbTimer);_LVL.lose();setTimeout(function(){gameMathBasic();},800);}
    },1000);
  }

  window.mbAnswer = function(val) {
    if(window._mbTimer) clearInterval(window._mbTimer);
    if(val === answer) {
      _LVL.win(15); showScorePop('+15');
      setTimeout(function(){gameMathBasic();},600);
    } else {
      var alive = _LVL.lose();
      var btns=g.querySelectorAll('button');
      btns.forEach(function(btn){if(+btn.textContent===answer)btn.style.background='#22c55e';else if(+btn.textContent===val)btn.style.background='#ef4444';btn.style.color='#fff';btn.disabled=true;});
      if(alive) setTimeout(function(){gameMathBasic();},1000);
    }
  };
}


function mathBasicAns(chosen,correct){window._mbQ++;if(chosen===correct)window._mbScore++;nextMathBasic();}

/* FLAG QUIZ */
var FLAGS=[['🇺🇸','United States'],['🇬🇧','United Kingdom'],['🇫🇷','France'],['🇩🇪','Germany'],['🇯🇵','Japan'],['🇨🇳','China'],['🇧🇷','Brazil'],['🇮🇳','India'],['🇦🇺','Australia'],['🇨🇦','Canada'],['🇮🇹','Italy'],['🇪🇸','Spain'],['🇲🇽','Mexico'],['🇷🇺','Russia'],['🇰🇷','South Korea'],['🇳🇬','Nigeria'],['🇿🇦','South Africa'],['🇦🇷','Argentina'],['🇳🇱','Netherlands'],['🇸🇪','Sweden']];
function gameFlagQuiz() {
  _LVL.init('flagquiz', 50);
  var cfg = _LVL.getConfig();

  // 50 countries organized easy → hard
  var ALL_FLAGS = [
    {flag:'🇺🇸',name:'USA'},{flag:'🇬🇧',name:'United Kingdom'},{flag:'🇫🇷',name:'France'},
    {flag:'🇩🇪',name:'Germany'},{flag:'🇯🇵',name:'Japan'},{flag:'🇨🇳',name:'China'},
    {flag:'🇧🇷',name:'Brazil'},{flag:'🇮🇹',name:'Italy'},{flag:'🇨🇦',name:'Canada'},
    {flag:'🇦🇺',name:'Australia'},{flag:'🇪🇸',name:'Spain'},{flag:'🇲🇽',name:'Mexico'},
    {flag:'🇷🇺',name:'Russia'},{flag:'🇮🇳',name:'India'},{flag:'🇰🇷',name:'South Korea'},
    {flag:'🇸🇦',name:'Saudi Arabia'},{flag:'🇦🇷',name:'Argentina'},{flag:'🇿🇦',name:'South Africa'},
    {flag:'🇹🇷',name:'Turkey'},{flag:'🇳🇱',name:'Netherlands'},{flag:'🇸🇪',name:'Sweden'},
    {flag:'🇳🇴',name:'Norway'},{flag:'🇩🇰',name:'Denmark'},{flag:'🇫🇮',name:'Finland'},
    {flag:'🇵🇹',name:'Portugal'},{flag:'🇬🇷',name:'Greece'},{flag:'🇵🇱',name:'Poland'},
    {flag:'🇺🇦',name:'Ukraine'},{flag:'🇨🇭',name:'Switzerland'},{flag:'🇦🇹',name:'Austria'},
    {flag:'🇧🇪',name:'Belgium'},{flag:'🇨🇿',name:'Czech Republic'},{flag:'🇭🇺',name:'Hungary'},
    {flag:'🇷🇴',name:'Romania'},{flag:'🇧🇬',name:'Bulgaria'},{flag:'🇭🇷',name:'Croatia'},
    {flag:'🇸🇰',name:'Slovakia'},{flag:'🇸🇮',name:'Slovenia'},{flag:'🇱🇹',name:'Lithuania'},
    {flag:'🇱🇻',name:'Latvia'},{flag:'🇪🇪',name:'Estonia'},{flag:'🇮🇸',name:'Iceland'},
    {flag:'🇮🇪',name:'Ireland'},{flag:'🇳🇿',name:'New Zealand'},{flag:'🇸🇬',name:'Singapore'},
    {flag:'🇲🇾',name:'Malaysia'},{flag:'🇹🇭',name:'Thailand'},{flag:'🇻🇳',name:'Vietnam'},
    {flag:'🇵🇭',name:'Philippines'},{flag:'🇮🇩',name:'Indonesia'}
  ];

  var level = _LVL.level;
  var poolEnd = Math.min(ALL_FLAGS.length, 5 + level);
  var pool = ALL_FLAGS.slice(0, poolEnd);
  var correct = pool[Math.floor(Math.random() * pool.length)];
  var numOpts = Math.min(6, 3 + Math.floor(level/10));
  var opts = [correct];
  while(opts.length < numOpts) {
    var f2 = pool[Math.floor(Math.random() * pool.length)];
    if(!opts.find(function(o){return o.name===f2.name;})) opts.push(f2);
  }
  opts = opts.sort(function(){return Math.random()-.5;});

  var g = gw(); if(!g) return;
  var h = _LVL.renderHeader('🏳️ Flag Quiz', '#4ade80');
  h += '<div style="text-align:center;margin-bottom:16px;">';
  h += '<div style="font-size:100px;margin-bottom:8px;line-height:1;">'+correct.flag+'</div>';
  h += '<div style="font-size:15px;font-weight:600;color:var(--muted);">Which country is this flag?</div>';
  h += '</div>';
  h += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:8px;">';
  opts.forEach(function(opt) {
    h += '<button onclick="fqAnswer(\''+opt.name+'\')" style="padding:12px;border-radius:12px;border:2px solid #e2e8f0;background:#fff;cursor:pointer;font-size:13px;font-weight:700;color:#1e293b;transition:all .15s;" onmouseover="this.style.background=\'#6366f1\';this.style.color=\'#fff\';this.style.borderColor=\'#6366f1\';" onmouseout="this.style.background=\'#fff\';this.style.color=\'#1e293b\';this.style.borderColor=\'#e2e8f0\';">'+opt.name+'</button>';
  });
  h += '</div>';
  g.innerHTML = h;

  window.fqAnswer = function(name) {
    if(name === correct.name) {
      _LVL.win(25); showScorePop('+25');
      setTimeout(function(){gameFlagQuiz();}, 700);
    } else {
      var alive = _LVL.lose();
      var btns = g.querySelectorAll('button');
      btns.forEach(function(btn){if(btn.textContent===correct.name)btn.style.background='#22c55e';else if(btn.textContent===name)btn.style.background='#ef4444';btn.style.color='#fff';btn.disabled=true;});
      if(alive) setTimeout(function(){gameFlagQuiz();},1200);
    }
  };
}


function flagAns(chosen,correct){if(chosen===correct)window._fqScore++;nextFlagQ();}

/* NUMBER GUESS */
function gameNumGuess(){
  _LVL.init('numguess',40);
  var level=_LVL.level;
  var maxNum=Math.min(10000,Math.floor(10*Math.pow(1.2,level-1)));
  var maxTries=Math.max(3,10-Math.floor(level/5));
  var target=rnd(1,maxNum);
  var tries=0;var history=[];
  window.ngRender=function(){
    var g=gw();if(!g)return;
    var h=_LVL.renderHeader('🔢 Number Guess','#60a5fa');
    h+='<div style="text-align:center;margin-bottom:16px;">';
    h+='<div style="font-size:14px;color:var(--muted);margin-bottom:4px;">Guess a number between <strong>1</strong> and <strong>'+maxNum.toLocaleString()+'</strong></div>';
    h+='<div style="font-size:13px;color:var(--muted);">Tries left: <strong style="color:'+(tries>=maxTries-1?'#ef4444':'#22c55e')+';">'+(maxTries-tries)+'</strong></div>';
    h+='</div>';
    if(history.length){
      h+='<div style="background:rgba(255,255,255,.08);border-radius:10px;padding:10px;margin-bottom:12px;max-height:80px;overflow-y:auto;">';
      history.slice(-3).forEach(function(item){h+='<div style="font-size:13px;text-align:center;padding:2px 0;color:'+(item.dir==='correct'?'#22c55e':item.dir==='higher'?'#f59e0b':'#60a5fa')+';">'+item.guess+' → '+item.dir.toUpperCase()+'</div>';});
      h+='</div>';
    }
    h+='<div style="display:flex;gap:8px;margin-bottom:8px;">';
    h+='<input id="ng-inp" type="number" min="1" max="'+maxNum+'" placeholder="Your guess..." style="flex:1;padding:14px;border-radius:12px;border:2px solid #e2e8f0;font-size:18px;font-weight:700;font-family:inherit;text-align:center;outline:none;" onkeydown="if(event.key===\'Enter\')ngGuess();">';
    h+='<button class="btn" onclick="ngGuess()" style="padding:14px 20px;font-size:16px;">Go!</button>';
    h+='</div>';
    g.innerHTML=h;
    document.getElementById('ng-inp').focus();
  }
  window.ngRender();
  window.ngGuess=function(){
    var val=+(document.getElementById('ng-inp').value||0);
    if(!val||val<1||val>maxNum)return;
    tries++;
    if(val===target){
      _LVL.win(50);showScorePop('+50');
      var g=gw();if(g){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:16px;background:#dcfce7;border-radius:12px;margin-top:10px;font-weight:700;color:#15803d;font-size:16px;';fb.textContent='Correct! It was '+target+'. Found in '+tries+' tries!';g.appendChild(fb);}
      setTimeout(function(){gameNumGuess();},1800);
    }else if(tries>=maxTries){
      _LVL.lose();history.push({guess:val,dir:'correct → '+target});window.ngRender();
      setTimeout(function(){gameNumGuess();},1500);
    }else{
      history.push({guess:val,dir:val<target?'higher':'lower'});
      window.ngRender();
    }
  };
}


function gameReaction(){
  _LVL.init('reaction',30);
  var level=_LVL.level;
  var rounds=Math.min(10,3+Math.floor(level/3));
  var results=[];var waiting=false;var canClick=false;var startTime;var tId;
  var targetMs=Math.max(150,400-level*8);
  function runRound(){
    var g=gw();if(!g)return;
    waiting=true;canClick=false;
    var delay=1000+Math.random()*3000;
    var h=_LVL.renderHeader('⚡ Reaction Time','#fbbf24');
    h+='<div id="rt-box" onclick="rtClick()" style="width:100%;height:180px;border-radius:16px;background:#1e293b;display:flex;align-items:center;justify-content:center;cursor:pointer;margin-bottom:12px;transition:background .1s;">';
    h+='<div id="rt-msg" style="font-size:18px;font-weight:700;color:#94a3b8;">Wait for green...</div>';
    h+='</div>';
    h+='<div style="text-align:center;color:var(--muted);font-size:13px;">Round '+(results.length+1)+'/'+rounds+'</div>';
    if(results.length){
      var avg=Math.round(results.reduce(function(a,b){return a+b;},0)/results.length);
      h+='<div style="text-align:center;font-size:13px;color:var(--muted);margin-top:4px;">Avg: '+avg+'ms | Target: <'+targetMs+'ms</div>';
    }
    g.innerHTML=h;
    tId=setTimeout(function(){
      waiting=false;canClick=true;startTime=Date.now();
      var box=document.getElementById('rt-box');var msg=document.getElementById('rt-msg');
      if(box)box.style.background='#22c55e';
      if(msg){msg.textContent='CLICK NOW!';msg.style.color='#fff';msg.style.fontSize='24px';}
    },delay);
  }
  window.rtClick=function(){
    if(waiting){clearTimeout(tId);_LVL.lose();var g=gw();if(g){var msg=document.getElementById('rt-msg');if(msg){msg.textContent='Too early! Wait for green!';msg.style.color='#ef4444';}}setTimeout(runRound,1500);return;}
    if(!canClick)return;
    canClick=false;
    var rt=Date.now()-startTime;
    results.push(rt);
    var box=document.getElementById('rt-box');var msg=document.getElementById('rt-msg');
    if(box)box.style.background=rt<targetMs?'#6366f1':'#f59e0b';
    if(msg)msg.textContent=rt+'ms '+(rt<targetMs?'⚡ Fast!':'Slow...');
    if(results.length>=rounds){
      var avg=Math.round(results.reduce(function(a,b){return a+b;},0)/results.length);
      if(avg<targetMs){_LVL.win(40);showScorePop('+40');}else{_LVL.lose();}
      setTimeout(function(){gameReaction();},1500);
    }else{setTimeout(runRound,1200);}
  };
  runRound();
}


function rtClick(){
  var box=document.getElementById('rt-box');
  if(window._rtState==='idle'){
    window._rtState='waiting';
    box.style.background='#ef5350';box.textContent='Wait for green...';
    var delay=rnd(1500,4000);
    window._rtTimeout=setTimeout(()=>{
      window._rtState='ready';
      window._rtStart=Date.now();
      box.style.background='#4caf50';box.textContent='CLICK NOW!';
    },delay);
  } else if(window._rtState==='waiting'){
    clearTimeout(window._rtTimeout);
    window._rtState='idle';
    box.style.background='#e0e0e0';box.textContent='Too early! Click to try again.';
  } else if(window._rtState==='ready'){
    var t=Date.now()-window._rtStart;
    window._rtState='idle';
    window._rtTimes.push(t);
    box.style.background='#e0e0e0';box.textContent=`${t}ms! Click for next round.`;
    var avg=Math.round(window._rtTimes.reduce((a,b)=>a+b,0)/window._rtTimes.length);
    document.getElementById('rt-hist').textContent=`Best: ${Math.min(...window._rtTimes)}ms | Avg: ${avg}ms | Rounds: ${window._rtTimes.length}`;
  }
}

/* TRUE OR FALSE */
var TF_QS=[
  ['The Great Wall of China is visible from space.',false],
  ['Humans have more than 5 senses.',true],
  ['Lightning never strikes the same place twice.',false],
  ['A day on Venus is longer than a year on Venus.',true],
  ['Water boils at 100°C at sea level.',true],
  ['Goldfish have a 3-second memory.',false],
  ['The Eiffel Tower is in Rome.',false],
  ['Diamonds are made of carbon.',true],
  ['Bats are blind.',false],
  ['The Amazon River is in South America.',true],
  ['Mount Everest is the tallest mountain from base to peak.',false],
  ['Honey never expires.',true],
  ['The sun is a planet.',false],
  ['Octopuses have three hearts.',true],
  ['Napoleon was unusually short for his time.',false],
];
function gameTrueFalse() {
  _LVL.init('truefalse', 50);
  var level = _LVL.level;

  var ALL_FACTS = [
    // Easy (1-10)
    ['The sky is blue.',true],['Fish can fly.',false],['The sun is a star.',true],
    ['Cats have 6 legs.',false],['Water boils at 100°C.',true],['The moon is a planet.',false],
    ['Humans have 5 senses.',true],['A triangle has 4 sides.',false],['Dogs are mammals.',true],
    ['Ice is hotter than fire.',false],
    // Medium (11-20)
    ['The Earth orbits the Sun.',true],['Sound travels faster than light.',false],
    ['Diamonds are made of carbon.',true],['The Amazon is in Asia.',false],
    ['Whales are fish.',false],['Bats are blind.',false],
    ['The capital of Australia is Sydney.',false],['DNA stands for deoxyribonucleic acid.',true],
    ['Spiders have 8 legs.',true],['Penguins live in the Arctic.',false],
    // Hard (21-35)
    ['Light travels at about 299,792 km/s.',true],['The human body has 206 bones.',true],
    ['Mount Everest is in Japan.',false],['Photosynthesis produces oxygen.',true],
    ['The Great Wall of China is visible from space.',false],['Goldfish have a 3-second memory.',false],
    ['A group of crows is called a murder.',true],['Elephants are afraid of mice.',false],
    ['The heart of a shrimp is in its head.',true],['Honey never expires.',true],
    ['Sharks are the only fish that can blink.',false],['A snail can sleep for 3 years.',true],
    ['The Eiffel Tower was built in 1889.',true],['Sloths can hold their breath for 40 min.',true],
    ['Butterflies taste with their feet.',true],
    // Expert (36-50)
    ['A day on Venus is longer than its year.',true],['Hot water freezes faster than cold.',true],
    ['Cleopatra lived closer to the Moon landing than to pyramid building.',true],
    ['Oxford University is older than the Aztec Empire.',true],
    ['Nintendo was founded in 1889.',true],
    ['Antarctica has more ice than any other continent.',true],
    ['The average human walks 100,000 miles in their lifetime.',true],
    ['A bolt of lightning contains enough energy to toast 100,000 slices of bread.',true],
    ['Octopuses have three hearts.',true],['Wombat poop is cube-shaped.',true],
    ['There are more possible chess games than atoms in the observable universe.',true],
    ['Bananas are technically berries.',true],['Strawberries are not berries.',true],
    ['Cats have more bones than humans.',true],['A group of flamingos is called a flamboyance.',true]
  ];

  var idx = Math.min(ALL_FACTS.length-1, Math.floor(Math.random()*(level+5)));
  var fact = ALL_FACTS[idx];
  var stmt = fact[0], ans = fact[1];

  // Timer shortens significantly at higher levels
  var timeLimit = Math.max(4, 20 - Math.floor(level*0.4));
  var timer = timeLimit;

  var g = gw(); if(!g) return;
  var h = _LVL.renderHeader('✅ True or False', '#4ade80');
  h += '<div style="background:rgba(255,255,255,.08);border-radius:16px;padding:24px;margin-bottom:20px;min-height:80px;display:flex;align-items:center;justify-content:center;text-align:center;">';
  h += '<div style="font-size:16px;font-weight:600;line-height:1.5;color:var(--text);">'+stmt+'</div>';
  h += '</div>';
  if(level >= 5) h += '<div id="tf-timer" style="text-align:center;font-size:22px;font-weight:900;color:'+(timer<=5?'#ef4444':'#6366f1')+';margin-bottom:12px;">⏱ '+timer+'s</div>';
  h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">';
  h += '<button onclick="tfAns(true)" style="padding:20px;border-radius:14px;background:#22c55e;color:#fff;font-size:20px;font-weight:900;border:none;cursor:pointer;transition:all .15s;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">✅ TRUE</button>';
  h += '<button onclick="tfAns(false)" style="padding:20px;border-radius:14px;background:#ef4444;color:#fff;font-size:20px;font-weight:900;border:none;cursor:pointer;transition:all .15s;" onmouseover="this.style.transform=\'scale(1.05)\'" onmouseout="this.style.transform=\'scale(1)\'">❌ FALSE</button>';
  h += '</div>';
  g.innerHTML = h;

  if(level >= 5) {
    window._tfTimer = setInterval(function(){
      timer--;
      var te=document.getElementById('tf-timer');
      if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#6366f1';}
      if(timer<=0){clearInterval(window._tfTimer);_LVL.lose();setTimeout(function(){gameTrueFalse();},800);}
    },1000);
  }

  window.tfAns = function(val) {
    if(window._tfTimer) clearInterval(window._tfTimer);
    if(val === ans) {
      _LVL.win(20); showScorePop('+20');
      setTimeout(function(){gameTrueFalse();},600);
    } else {
      var alive = _LVL.lose();
      var g2=gw();if(g2){
        var fb=document.createElement('div');
        fb.style.cssText='text-align:center;padding:12px;background:'+(ans?'#dcfce7':'#fef2f2')+';border-radius:10px;margin-top:10px;font-weight:700;';
        fb.textContent='The answer was: '+(ans?'TRUE ✅':'FALSE ❌');
        g2.appendChild(fb);
      }
      if(alive) setTimeout(function(){gameTrueFalse();},1500);
    }
  };
}


function nextTF(){
  if(window._tfQ>=10){gw().innerHTML=`<h2>✅ True or False</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._tfScore}/10</div><button class="g-btn" style="margin-top:12px;" onclick="gameTrueFalse()">Play Again</button>`;return;}
  var [q,a]=window._tfQs[window._tfQ];
  gw().innerHTML=`<h2>✅ True or False</h2><div style="font-size:14px;color:#888;">Q ${window._tfQ+1}/10 | Score:${window._tfScore}</div><div style="font-size:18px;margin:20px 10px;line-height:1.5;">"${q}"</div><div style="display:flex;gap:16px;justify-content:center;"><button class="g-btn" onclick="tfAns(true,${a})">✅ True</button><button class="g-btn" onclick="tfAns(false,${a})">❌ False</button></div>`;
}
function tfAns(chosen,correct){window._tfQ++;if(chosen===correct)window._tfScore++;nextTF();}

/* SIMON SAYS */
var SIMON_COLS=['#ef5350','#4caf50','#2196f3','#ffc107'];
var SIMON_NAMES=['Red','Green','Blue','Yellow'];
function gameSimon(){
  _LVL.init('simon',40);
  var level=_LVL.level;
  var COLORS=['#ef4444','#22c55e','#3b82f6','#eab308'];
  var NAMES=['Red','Green','Blue','Yellow'];
  var sequence=[];var playerIdx=0;var showing=false;
  var startLen=Math.max(1,Math.floor(level/3));
  for(var i=0;i<startLen;i++)sequence.push(Math.floor(Math.random()*4));

  function flash(idx,cb){
    var btn=document.getElementById('simon-'+idx);
    if(!btn){if(cb)cb();return;}
    btn.style.opacity='1';btn.style.transform='scale(1.1)';
    setTimeout(function(){btn.style.opacity='.3';btn.style.transform='scale(1)';if(cb)setTimeout(cb,100+Math.max(0,50-level*2));},Math.max(100,400-level*10));
  }

  function showSequence(){
    showing=true;playerIdx=0;
    var i=0;
    function next(){
      if(i>=sequence.length){showing=false;return;}
      flash(sequence[i],function(){i++;setTimeout(next,100);});
    }
    setTimeout(next,500);
  }

  window.simonRender=function(){
    var g=gw();if(!g)return;
    var h=_LVL.renderHeader('🔴 Simon Says','#f472b6');
    h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin:12px 0;max-width:220px;margin-left:auto;margin-right:auto;">';
    COLORS.forEach(function(color,i){
      h+='<button id="simon-'+i+'" onclick="simonClick('+i+')" style="height:90px;border-radius:12px;background:'+color+';opacity:.3;border:none;cursor:pointer;font-size:15px;font-weight:700;color:#fff;transition:all .1s;text-shadow:0 1px 4px rgba(0,0,0,.4);">'+NAMES[i]+'</button>';
    });
    h+='</div>';
    h+='<div style="text-align:center;font-size:14px;font-weight:600;color:var(--muted);" id="simon-status">Watch and repeat the sequence!</div>';
    h+='<div style="text-align:center;font-size:13px;color:var(--muted);margin-top:4px;">Sequence length: '+sequence.length+'</div>';
    g.innerHTML=h;
    showSequence();
  }

  window.simonClick=function(idx){
    if(showing)return;
    flash(idx);
    if(idx===sequence[playerIdx]){
      playerIdx++;
      if(playerIdx>=sequence.length){
        playSound('score');showScorePop('+'+sequence.length*5+'!');
        sequence.push(Math.floor(Math.random()*4));
        _LVL.win(sequence.length*5);
        setTimeout(function(){window.simonRender();},800);
      }
    }else{
      _LVL.lose();
      var st=document.getElementById('simon-status');
      if(st){st.textContent='Wrong! The sequence was '+sequence.length+' long.';st.style.color='#ef4444';}
      setTimeout(function(){gameSimon();},1500);
    }
  };
  window.simonRender();
}


function simonNextRound(){
  window._simonSeq.push(rnd(0,3));
  window._simonPlaying=true;
  window._simonStep=0;
  document.getElementById('sim-msg').textContent='Watch!';
  document.getElementById('sim-level').textContent=`Level ${window._simonSeq.length}`;
  let i=0;
  function flash(){
    if(i>=window._simonSeq.length){window._simonPlaying=false;document.getElementById('sim-msg').textContent='Your turn!';return;}
    var idx=window._simonSeq[i];
    var el=document.getElementById(`sim-${idx}`);
    el.style.opacity='1';
    setTimeout(()=>{el.style.opacity='0.4';setTimeout(()=>{i++;flash();},200);},500);
  }
  setTimeout(flash,600);
}
function simonPress(idx){
  if(window._simonPlaying)return;
  var el=document.getElementById(`sim-${idx}`);
  el.style.opacity='1';setTimeout(()=>el.style.opacity='0.4',200);
  if(idx!==window._simonSeq[window._simonStep]){
    document.getElementById('sim-msg').textContent=`❌ Wrong! Score: ${window._simonSeq.length-1}`;
    setTimeout(simonStart,1500);return;
  }
  window._simonStep++;
  if(window._simonStep===window._simonSeq.length)setTimeout(simonNextRound,600);
}

/* WORD SCRAMBLE */
var WS_WORDS=['PUZZLE','SCRAMBLE','JUNGLE','PLANET','BRIDGE','CASTLE','DRAGON','MIRROR','FILTER','RANDOM','PURPLE','SILVER','WINTER','GARDEN','BOTTLE'];
function gameWordScramble(){
  _LVL.init('wordscramble',50);
  var level=_LVL.level;
  var WORDS_BY_LEVEL=[
    // Easy (1-10): 4-5 letter words
    ['GAME','PLAY','WORD','JUMP','FISH','BIRD','CAKE','FIRE','GOLD','STAR'],
    // Medium (11-25): 6-7 letter words
    ['PLANET','BRIDGE','FLOWER','CASTLE','MIRROR','BOTTLE','JUNGLE','ROCKET','GARDEN','FROZEN'],
    // Hard (26-40): 8-9 letter words
    ['ABSOLUTE','CALENDAR','DIRECTOR','ELEPHANT','FRAGMENT','GRATEFUL','HOSPITAL','INVENTOR','JUDGMENT','KEYBOARD'],
    // Expert (41-50): 10+ letter words
    ['BASKETBALL','CELEBRATED','DICTIONARY','EARTHQUAKE','FAHRENHEIT','GOALKEEPER','HELICOPTER','IMPOSSIBLE','JOURNALISM','KNOWLEDGEABLE']
  ];
  var tier=level<=10?0:level<=25?1:level<=40?2:3;
  var wordList=WORDS_BY_LEVEL[tier];
  var word=wordList[Math.floor(Math.random()*wordList.length)];
  var scrambled=word.split('').sort(function(){return Math.random()-.5;}).join('');
  while(scrambled===word)scrambled=word.split('').sort(function(){return Math.random()-.5;}).join('');
  var timeLimit=Math.max(8,30-level);var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🔀 Word Scramble','#4ade80');
  h+='<div style="text-align:center;margin-bottom:16px;">';
  h+='<div style="font-size:36px;font-weight:900;letter-spacing:6px;color:#6366f1;background:rgba(99,102,241,.1);padding:16px;border-radius:12px;margin-bottom:8px;">'+scrambled+'</div>';
  h+='<div style="font-size:13px;color:var(--muted);">Unscramble this word!</div>';
  if(level>=5)h+='<div id="ws-timer" style="font-size:20px;font-weight:800;margin-top:8px;color:'+(timer<=5?'#ef4444':'#6366f1')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<input id="ws-inp" type="text" placeholder="Type the word..." style="width:100%;padding:14px;border-radius:12px;border:2px solid #e2e8f0;font-size:18px;font-weight:700;font-family:inherit;text-transform:uppercase;text-align:center;outline:none;box-sizing:border-box;margin-bottom:10px;" onkeydown="if(event.key===\'Enter\')wsCheck();">';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  h+='<button class="btn" onclick="wsCheck()" style="padding:14px;font-size:16px;">Submit</button>';
  h+='<button class="btn btn-sec" onclick="wsHint()" style="padding:14px;font-size:16px;">💡 Hint (-5pts)</button>';
  h+='</div>';
  h+='<div id="ws-hint-area" style="text-align:center;margin-top:8px;font-size:13px;color:var(--muted);"></div>';
  g.innerHTML=h;
  document.getElementById('ws-inp').focus();
  if(level>=5){
    window._wsTimer=setInterval(function(){timer--;var te=document.getElementById('ws-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#6366f1';}if(timer<=0){clearInterval(window._wsTimer);_LVL.lose();setTimeout(function(){gameWordScramble();},800);}},1000);
  }
  window.wsCheck=function(){
    if(window._wsTimer)clearInterval(window._wsTimer);
    var val=(document.getElementById('ws-inp').value||'').trim().toUpperCase();
    if(val===word){_LVL.win(30);showScorePop('+30');setTimeout(function(){gameWordScramble();},700);}
    else{var alive=_LVL.lose();var inp=document.getElementById('ws-inp');if(inp){inp.style.borderColor='#ef4444';inp.value='';}var ha=document.getElementById('ws-hint-area');if(ha)ha.textContent='Incorrect! The word was: '+word;if(alive)setTimeout(function(){gameWordScramble();},1500);}
  };
  window.wsHint=function(){
    var ha=document.getElementById('ws-hint-area');
    var revealed=Math.min(word.length-1,Math.floor(word.length/2));
    if(ha)ha.textContent='Hint: '+word.slice(0,revealed)+'_'.repeat(word.length-revealed);
    _LVL.score=Math.max(0,_LVL.score-5);
  };
}


function nextWS(){
  var w=pick(WS_WORDS);
  window._wsWord=w;
  var scrambled=shuffle(w.split('')).join('');
  gw().innerHTML=`<h2>🔀 Word Scramble</h2><div style="font-size:42px;letter-spacing:8px;margin:16px;font-weight:700;color:#3498db;">${scrambled}</div><p>Unscramble the word!</p><input id="ws-in" type="text" maxlength="${w.length}" style="font-size:20px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:160px;" onkeydown="if(event.key==='Enter')checkWS()"><br><button class="g-btn" style="margin-top:10px;" onclick="checkWS()">Submit</button><button class="g-btn" style="margin-top:10px;background:#95a5a6;" onclick="nextWS()">Skip</button><div id="ws-msg" style="margin-top:12px;font-size:18px;min-height:28px;"></div>`;
  document.getElementById('ws-in').focus();
}
function checkWS(){
  var v=document.getElementById('ws-in').value.toUpperCase().trim();
  var msg=document.getElementById('ws-msg');
  if(v===window._wsWord){msg.style.color='#2ecc71';msg.textContent='✅ Correct!';setTimeout(nextWS,1000);}
  else{msg.style.color='#e74c3c';msg.textContent='❌ Try again!';}
}

/* RIDDLES */
var RIDDLES=[
  ["I have hands but can't clap. What am I?","A clock"],
  ["I'm full of holes but still holds water. What am I?","A sponge"],
  ["The more you take, the more you leave behind. What am I?","Footsteps"],
  ["I speak without a mouth and hear without ears. What am I?","An echo"],
  ["I have cities but no houses. I have mountains but no trees. What am I?","A map"],
  ["What gets wetter as it dries?","A towel"],
  ["What has a tail and a head but no body?","A coin"],
  ["What is always in front of you but can't be seen?","The future"],
  ["What has one eye but can't see?","A needle"],
  ["I can be cracked, made, told, and played. What am I?","A joke"],
];
function gameRiddles(){
  _LVL.init('riddles',40);
  var ALL=[
    // Easy
    ['I have hands but cannot clap. What am I?','A clock'],
    ['The more you take, the more you leave behind. What am I?','Footsteps'],
    ['What has keys but no locks, space but no room?','A keyboard'],
    ['I speak without a mouth and hear without ears. What am I?','An echo'],
    ['What gets wetter as it dries?','A towel'],
    ['I have cities, but no houses live there. What am I?','A map'],
    ['What can you catch but not throw?','A cold'],
    ['I am always in front of you but cannot be seen. What am I?','The future'],
    ['What has a head and a tail but no body?','A coin'],
    ['The more you remove, the bigger I become. What am I?','A hole'],
    // Medium
    ['I have branches but no fruit or leaves. What am I?','A bank'],
    ['What invention lets you look through a wall?','A window'],
    ['What runs but never walks?','A river'],
    ['I have a thumb and four fingers but I am not alive. What am I?','A glove'],
    ['What can fill a room but takes no space?','Light'],
    ['Forward I am heavy, backward I am not. What am I?','Ton'],
    ['What goes up but never comes down?','Age'],
    ['I have no legs but I travel far. What am I?','A ship'],
    ['What can travel around the world while staying in one spot?','A stamp'],
    ['I have teeth but cannot eat. What am I?','A comb'],
    // Hard
    ['I have an eye but cannot see. What am I?','A needle'],
    ['The more you share me, the less you have. What am I?','A secret'],
    ['What has many keys but cannot open a door?','A piano'],
    ['I am always hungry and must always be fed. What am I?','Fire'],
    ['What can you keep after giving it to someone?','Your word'],
    ['I fly without wings, I cry without eyes. What am I?','A cloud'],
    ['What gets sharper the more you use it?','Your brain'],
    ['I have no voice, yet I speak to you. What am I?','A book'],
    ['Born in water, raised on land, dies in fire. What am I?','Salt'],
    ['What is as light as a feather but even the strongest man cannot hold it for long?','His breath'],
    // Expert
    ['The man who invented it does not want it. The man who bought it does not need it. The man who needs it does not know it. What is it?','A coffin'],
    ['I can be cracked, made, told, and played. What am I?','A joke'],
    ['What word becomes shorter when you add two letters to it?','Short'],
    ['How many letters are in the alphabet?','11'],
    ['I am not alive, but I grow. I have no mouth, but I need water. What am I?','A plant'],
    ['What loses its head in the morning and gets it back at night?','A pillow'],
    ['What can run but never walks, has a mouth but never talks?','A river'],
    ['I have lakes with no water, mountains with no stone, and cities with no buildings. What am I?','A map'],
    ['What is always in front of you but cannot be seen?','The future'],
    ['What has one eye but cannot see?','A needle']
  ];
  var level=_LVL.level;
  var idx=Math.floor(Math.random()*Math.min(ALL.length,10+level));
  var riddle=ALL[idx];
  var q=riddle[0],ans=riddle[1].toLowerCase();
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🤔 Riddles','#818cf8');
  h+='<div style="background:rgba(255,255,255,.08);border-radius:16px;padding:20px;margin-bottom:16px;text-align:center;">';
  h+='<div style="font-size:32px;margin-bottom:10px;">🧩</div>';
  h+='<div style="font-size:15px;line-height:1.6;font-weight:600;color:var(--text);">'+q+'</div>';
  h+='</div>';
  h+='<input id="riddle-ans" type="text" placeholder="Type your answer..." style="width:100%;padding:14px;border-radius:12px;border:2px solid #e2e8f0;font-size:15px;font-family:inherit;outline:none;box-sizing:border-box;margin-bottom:10px;" onkeydown="if(event.key===\'Enter\')checkRiddle();">';
  h+='<button class="btn" onclick="checkRiddle()" style="width:100%;padding:14px;font-size:16px;">Submit Answer</button>';
  h+='<div id="riddle-hint" style="margin-top:10px;text-align:center;color:var(--muted);font-size:13px;">Hint: '+ans[0].toUpperCase()+'_'.repeat(ans.length-1)+'</div>';
  g.innerHTML=h;
  document.getElementById('riddle-ans').focus();
  window.checkRiddle=function(){
    var val=(document.getElementById('riddle-ans').value||'').toLowerCase().trim();
    if(val===ans||ans.includes(val)&&val.length>2){
      _LVL.win(30);showScorePop('+30');
      var g2=gw();if(g2){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:12px;background:#dcfce7;border-radius:10px;margin-top:10px;font-size:16px;font-weight:700;color:#15803d;';fb.textContent='Correct! Answer: '+riddle[1];g2.appendChild(fb);}
      setTimeout(function(){gameRiddles();},1500);
    }else{
      var alive=_LVL.lose();
      var inp=document.getElementById('riddle-ans');if(inp){inp.style.borderColor='#ef4444';inp.value='';}
      var hint=document.getElementById('riddle-hint');if(hint)hint.textContent='Wrong! The answer was: '+riddle[1];
      if(alive)setTimeout(function(){gameRiddles();},2000);
    }
  };
}


function nextRiddle(){
  if(window._rdIdx>=window._rdShuf.length){gw().innerHTML=`<h2>🤔 Riddles</h2><div style="font-size:48px;">🏆</div><div>All riddles done!</div><button class="g-btn" style="margin-top:12px;" onclick="gameRiddles()">Play Again</button>`;return;}
  var [q]=window._rdShuf[window._rdIdx];
  gw().innerHTML=`<h2>🤔 Riddles</h2><div style="font-size:14px;color:#888;">${window._rdIdx+1}/${window._rdShuf.length}</div><div style="font-size:18px;margin:20px 10px;line-height:1.6;">"${q}"</div><button class="g-btn" onclick="nextRiddleReveal()">Reveal Answer</button>`;
}
function nextRiddleReveal(){
  var [,a]=window._rdShuf[window._rdIdx];
  gw().innerHTML+=`<div style="font-size:22px;color:#2ecc71;margin:12px;font-weight:700;">Answer: ${a}</div><button class="g-btn" style="margin-top:8px;" onclick="nextRiddleNext()">Next Riddle</button>`;
  document.querySelector('[onclick="nextRiddleReveal()"]')&&document.querySelector('[onclick="nextRiddleReveal()"]').remove();
}
function nextRiddleNext(){window._rdIdx++;nextRiddle();}

/* EMOJI QUIZ */
var EQ_LIST=[
  ['🍎📱','Apple iPhone'],['🦁👑','Lion King'],['🕷️🕸️👨','Spider-Man'],
  ['🧊❄️🎵','Frozen'],['🚀⭐🌌','Star Wars'],['🦈🎬','Jaws'],
  ['🧙🔮💍','Lord of the Rings'],['🦇🌙🦸','Batman'],['🧊🍦🚐','Ice Cream Truck'],
  ['🌹💀💀','Romeo and Juliet'],['🚂💨🧙','Harry Potter'],['🦸🩸🦇','Dracula'],
];
function gameEmojiQuiz(){
  _LVL.init('emojiquiz',45);
  var ALL=[
    {emoji:'🌊🏄','ans':'Surfing'},
    {emoji:'🌙⭐','ans':'Night Sky'},
    {emoji:'🔥💧','ans':'Fire and Water'},
    {emoji:'🎵🎸','ans':'Rock Music'},
    {emoji:'🍕🇮🇹','ans':'Italian Pizza'},
    {emoji:'🏔️🧗','ans':'Rock Climbing'},
    {emoji:'🎬🍿','ans':'Movie Night'},
    {emoji:'📚🤓','ans':'Studying'},
    {emoji:'🌺🐝','ans':'Bee and Flower'},
    {emoji:'🚀🌕','ans':'Moon Landing'},
    {emoji:'🎭😂😢','ans':'Drama'},
    {emoji:'🌈☔','ans':'Rainbow After Rain'},
    {emoji:'🦁🌿','ans':'Lion in Jungle'},
    {emoji:'⚽🏆','ans':'Football Trophy'},
    {emoji:'🎂🕯️','ans':'Birthday'},
    {emoji:'🐠🌊','ans':'Tropical Fish'},
    {emoji:'☕📰','ans':'Morning Coffee'},
    {emoji:'🎪🤹','ans':'Circus'},
    {emoji:'💻👨‍💻','ans':'Coding'},
    {emoji:'🌍♻️','ans':'Recycle Earth'},
    {emoji:'🎸🤘','ans':'Rock and Roll'},
    {emoji:'🦋🌸','ans':'Spring'},
    {emoji:'🏠❤️','ans':'Home Sweet Home'},
    {emoji:'🎯🏹','ans':'Archery'},
    {emoji:'🌊🏖️','ans':'Beach'},
    {emoji:'🍎📚','ans':'School'},
    {emoji:'🦅🗽','ans':'American Eagle'},
    {emoji:'🎻🎼','ans':'Classical Music'},
    {emoji:'🌊🐋','ans':'Whale Ocean'},
    {emoji:'🔬🧬','ans':'DNA Science'},
    {emoji:'🎪🎠','ans':'Carnival'},
    {emoji:'🏋️💪','ans':'Weightlifting'},
    {emoji:'🌋🔥','ans':'Volcano'},
    {emoji:'🐉🔥','ans':'Dragon Fire'},
    {emoji:'🌺🍹','ans':'Tropical Drink'},
    {emoji:'🎯🎲','ans':'Strategy Game'},
    {emoji:'🦚🌈','ans':'Peacock Colors'},
    {emoji:'🏺🏛️','ans':'Ancient Greece'},
    {emoji:'🚂🌿','ans':'Train Through Nature'},
    {emoji:'🦠🔬','ans':'Virus Microscope'},
    {emoji:'🎆🎇','ans':'Fireworks'},
    {emoji:'🦩🌅','ans':'Flamingo Sunset'},
    {emoji:'🏰👸','ans':'Princess Castle'},
    {emoji:'🌡️🤒','ans':'Sick Fever'},
    {emoji:'🎣🐟','ans':'Fishing'}
  ];
  var level=_LVL.level;
  var pool=ALL.slice(0,Math.min(ALL.length,8+level));
  var item=pool[Math.floor(Math.random()*pool.length)];
  var correct=item.ans;
  var wrong=ALL.filter(function(a){return a.ans!==correct;}).sort(function(){return Math.random()-.5;}).slice(0,3).map(function(a){return a.ans;});
  var opts=[correct].concat(wrong).sort(function(){return Math.random()-.5;});
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('😀 Emoji Quiz','#f472b6');
  h+='<div style="text-align:center;padding:20px;background:rgba(255,255,255,.08);border-radius:16px;margin-bottom:16px;">';
  h+='<div style="font-size:64px;letter-spacing:8px;margin-bottom:8px;">'+item.emoji+'</div>';
  h+='<div style="font-size:14px;font-weight:600;color:var(--muted);">What does this represent?</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  opts.forEach(function(opt){
    h+='<button onclick="eqAns(\''+opt+'\')" style="padding:12px;border-radius:12px;border:2px solid #e2e8f0;background:#fff;cursor:pointer;font-size:13px;font-weight:700;color:#1e293b;transition:all .15s;" onmouseover="this.style.background=\'#ec4899\';this.style.color=\'#fff\';" onmouseout="this.style.background=\'#fff\';this.style.color=\'#1e293b\';">'+opt+'</button>';
  });
  h+='</div>';
  g.innerHTML=h;
  window.eqAns=function(val){
    if(val===correct){_LVL.win(25);showScorePop('+25');setTimeout(function(){gameEmojiQuiz();},700);}
    else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===correct)b.style.background='#22c55e';else if(b.textContent===val)b.style.background='#ef4444';b.style.color='#fff';b.disabled=true;});if(alive)setTimeout(function(){gameEmojiQuiz();},1200);}
  };
}


function nextEQ(){
  if(window._eqIdx>=window._eqList.length){gw().innerHTML=`<h2>😀 Emoji Quiz</h2><div style="font-size:48px;">🏆</div><div style="font-size:22px;">Score: ${window._eqScore}/${window._eqList.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameEmojiQuiz()">Play Again</button>`;return;}
  var [emoji]=window._eqList[window._eqIdx];
  gw().innerHTML=`<h2>😀 Emoji Quiz</h2><div style="font-size:14px;color:#888;">Q ${window._eqIdx+1}/${window._eqList.length} | Score:${window._eqScore}</div><div style="font-size:56px;margin:20px;">${emoji}</div><p>What movie/show/character is this?</p><input id="eq-in" type="text" style="font-size:16px;padding:8px;border:2px solid #ccc;border-radius:8px;width:220px;" onkeydown="if(event.key==='Enter')checkEQ()"><br><button class="g-btn" style="margin-top:10px;" onclick="checkEQ()">Submit</button><button class="g-btn" style="margin-top:10px;background:#95a5a6;" onclick="eqReveal()">Give Up</button><div id="eq-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('eq-in').focus();
}
function checkEQ(){
  var v=document.getElementById('eq-in').value.trim().toLowerCase();
  var [,ans]=window._eqList[window._eqIdx];
  var words=ans.toLowerCase().split(' ');
  if(words.some(w=>v.includes(w)&&w.length>3)){
    window._eqScore++;window._eqIdx++;
    document.getElementById('eq-msg').style.color='#2ecc71';
    document.getElementById('eq-msg').textContent='✅ Correct! '+ans;
    setTimeout(nextEQ,1000);
  } else {
    document.getElementById('eq-msg').style.color='#e74c3c';
    document.getElementById('eq-msg').textContent='❌ Try again!';
  }
}
function eqReveal(){window._eqIdx++;const [,ans]=window._eqList[window._eqIdx-1];document.getElementById('eq-msg').style.color='#666';document.getElementById('eq-msg').textContent='Answer: '+ans;setTimeout(nextEQ,1200);}

/* ODD ONE OUT */
var OO_SETS=[
  [['Dog','Cat','Eagle','Fish'],'Eagle','Only bird'],
  [['Red','Blue','Green','Eleven'],'Eleven','Only number'],
  [['Apple','Banana','Carrot','Mango'],'Carrot','Only vegetable'],
  [['Paris','London','Berlin','Nile'],'Nile','Only river'],
  [['Piano','Guitar','Drum','Trumpet'],'Drum','Only non-melodic'],
  [['Shark','Dolphin','Whale','Salmon'],'Salmon','Only fish (others mammals/sharks)'],
  [['Moon','Sun','Mars','Atlantic'],'Atlantic','Only ocean'],
  [['Shakespeare','Dickens','Newton','Twain'],'Newton','Only scientist'],
];
function gameOddOne(){
  _LVL.init('oddone',40);
  var level=_LVL.level;
  var ALL=[
    {items:['Apple','Banana','Carrot','Mango'],odd:'Carrot',reason:'Not a fruit'},
    {items:['Dog','Cat','Fish','Wolf'],odd:'Fish',reason:'Not a mammal'},
    {items:['Red','Green','Blue','Five'],odd:'Five',reason:'Not a color'},
    {items:['Paris','London','Berlin','Amazon'],odd:'Amazon',reason:'Not a capital city'},
    {items:['Piano','Guitar','Violin','Drum'],odd:'Drum',reason:'Not a stringed instrument'},
    {items:['Mercury','Venus','Moon','Mars'],odd:'Moon',reason:'Not a planet'},
    {items:['Add','Subtract','Multiply','Color'],odd:'Color',reason:'Not a math operation'},
    {items:['Eagle','Penguin','Parrot','Ostrich'],odd:'Parrot',reason:'Can fly... actually Eagles fly, Penguin cannot'},
    {items:['Iron','Gold','Silver','Wood'],odd:'Wood',reason:'Not a metal'},
    {items:['Book','Pen','Computer','Bicycle'],odd:'Bicycle',reason:'Not a writing/computing tool'},
    {items:['Rose','Lily','Tulip','Oak'],odd:'Oak',reason:'Not a flower'},
    {items:['Circle','Square','Triangle','Cube'],odd:'Cube',reason:'Not a 2D shape'},
    {items:['Jazz','Rock','Classical','Painting'],odd:'Painting',reason:'Not music'},
    {items:['Oxygen','Carbon','Hydrogen','Water'],odd:'Water',reason:'Not an element'},
    {items:['Sprint','Marathon','Relay','Swimming'],odd:'Swimming',reason:'Not a running event'},
    {items:['Sahara','Gobi','Amazon','Atacama'],odd:'Amazon',reason:'Not a desert'},
    {items:['1','4','9','14'],odd:'14',reason:'Not a perfect square'},
    {items:['Python','Java','HTML','C++'],odd:'HTML',reason:'Not a programming language'},
    {items:['Heart','Liver','Brain','Stomach'],odd:'Brain',reason:'Not a digestive organ'},
    {items:['Copper','Bronze','Brass','Silver'],odd:'Silver',reason:'Not an alloy'},
    {items:['Photon','Electron','Neutron','Atom'],odd:'Atom',reason:'Not a subatomic particle'},
    {items:['Hamlet','Othello','Macbeth','Sherlock'],odd:'Sherlock',reason:'Not Shakespeare'},
    {items:['ATP','DNA','RNA','H2O'],odd:'H2O',reason:'Not a biological molecule type'},
    {items:['2','3','4','5'],odd:'4',reason:'Not a prime number'},
    {items:['Everest','K2','Alps','Kilimanjaro'],odd:'Alps',reason:'Not a single peak'},
    {items:['Buddha','Jesus','Muhammad','Socrates'],odd:'Socrates',reason:'Not a religious founder'},
    {items:['Violin','Cello','Bass','Flute'],odd:'Flute',reason:'Not a string instrument'},
    {items:['Respiration','Photosynthesis','Fermentation','Deforestation'],odd:'Deforestation',reason:'Not a metabolic process'},
    {items:['Volt','Ampere','Newton','Ohm'],odd:'Newton',reason:'Not an electrical unit'},
    {items:['Cubism','Impressionism','Baroque','Quantum'],odd:'Quantum',reason:'Not an art movement'}
  ];
  var idx=Math.min(ALL.length-1,Math.floor(level/40*ALL.length)+Math.floor(Math.random()*3));
  var item=ALL[idx];
  var shuffled=item.items.slice().sort(function(){return Math.random()-.5;});
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🔍 Odd One Out','#fb923c');
  h+='<div style="text-align:center;font-size:14px;color:var(--muted);margin-bottom:16px;">Which one does NOT belong?</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">';
  shuffled.forEach(function(opt){
    h+='<button onclick="ooAns(\''+opt+'\')" style="padding:16px 12px;border-radius:14px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:15px;font-weight:700;color:var(--text);transition:all .2s;" onmouseover="this.style.background=\'rgba(251,146,60,.4)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';
  });
  h+='</div>';
  if(level>=20)h+='<div id="oo-timer" style="text-align:center;margin-top:10px;font-size:18px;font-weight:800;color:#fb923c;">⏱ '+(15-Math.floor(level/3))+'s</div>';
  g.innerHTML=h;
  if(level>=20){
    var t=Math.max(5,15-Math.floor(level/3));
    window._ooTimer=setInterval(function(){t--;var te=document.getElementById('oo-timer');if(te)te.textContent='⏱ '+t+'s';if(t<=0){clearInterval(window._ooTimer);_LVL.lose();setTimeout(function(){gameOddOne();},800);}},1000);
  }
  window.ooAns=function(val){lockBtns();
    if(window._ooTimer)clearInterval(window._ooTimer);
    if(val===item.odd){_LVL.win(30);showScorePop('+30');var g2=gw();if(g2){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:10px;background:rgba(34,197,94,.3);border-radius:10px;margin-top:8px;color:#fff;font-size:13px;';fb.textContent='Correct! '+item.reason;g2.appendChild(fb);}setTimeout(function(){gameOddOne();},1500);}
    else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===item.odd)b.style.background='rgba(34,197,94,.5)';else if(b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.style.color='#fff';b.disabled=true;});if(alive)setTimeout(function(){gameOddOne();},1500);}
  };
}


function ooAns(chosen,odd,reason){
  if(chosen===odd){window._ooScore++;gw().innerHTML+=`<div style="color:#2ecc71;font-size:18px;margin:10px;">✅ Correct! ${reason}</div><button class="g-btn" onclick="nextOO()">Next</button>`;}
  else{gw().innerHTML+=`<div style="color:#e74c3c;font-size:18px;margin:10px;">❌ It was: ${odd} — ${reason}</div><button class="g-btn" onclick="nextOO()">Next</button>`;}
  document.querySelectorAll('.g-btn:not(:last-child)').forEach(b=>{if(b.textContent!=='Next')b.disabled=true;});
}

/* COLOR MATCH (STROOP) */
var CM_COLORS=[['Red','#ef5350'],['Green','#4caf50'],['Blue','#2196f3'],['Yellow','#ffc107'],['Purple','#9c27b0'],['Orange','#ff9800']];
function gameColorMatch(){
  _LVL.init('colormatch',40);
  var level=_LVL.level;
  var COLORS=['Red','Green','Blue','Yellow','Purple','Orange','Pink','Cyan'];
  var HEX={'Red':'#ef4444','Green':'#22c55e','Blue':'#3b82f6','Yellow':'#eab308','Purple':'#8b5cf6','Orange':'#f97316','Pink':'#ec4899','Cyan':'#06b6d4'};
  var poolSize=Math.min(COLORS.length,4+Math.floor(level/5));
  var pool=COLORS.slice(0,poolSize);
  var wordColor=pool[Math.floor(Math.random()*pool.length)];
  var inkColor=pool[Math.floor(Math.random()*pool.length)];
  // At higher levels: always mismatch for harder Stroop
  if(level>20&&wordColor===inkColor)inkColor=pool[(pool.indexOf(inkColor)+1)%pool.length];
  var correctAns=(level<=10)?wordColor:inkColor; // Easy: match word, Hard: match ink
  var opts=pool.slice(0,Math.min(pool.length,4+Math.floor(level/10))).sort(function(){return Math.random()-.5;});
  if(!opts.includes(correctAns))opts[0]=correctAns;
  opts=opts.sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(2,8-Math.floor(level/6));var timer=timeLimit;
  var g=gw();if(!g)return;
  var instruction=level<=10?'Click the WORD you see':'Click the INK COLOR';
  var h=_LVL.renderHeader('🌈 Color Match','#f472b6');
  h+='<div style="text-align:center;margin-bottom:16px;">';
  h+='<div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:10px;">'+instruction+'</div>';
  h+='<div style="font-size:56px;font-weight:900;color:'+HEX[inkColor]+';text-shadow:0 2px 12px '+HEX[inkColor]+'66;margin-bottom:10px;transition:all .2s;">'+wordColor+'</div>';
  if(level>=5)h+='<div id="cm-timer" style="font-size:22px;font-weight:900;color:'+(timer<=2?'#ef4444':'#f472b6')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:repeat('+(opts.length<=4?2:3)+',1fr);gap:8px;">';
  opts.forEach(function(c2){h+='<button onclick="cmAns(\''+c2+'\')" style="padding:14px;border-radius:12px;border:2px solid '+HEX[c2]+'66;background:'+HEX[c2]+'22;cursor:pointer;font-size:14px;font-weight:700;color:'+HEX[c2]+';transition:all .15s;" onmouseover="this.style.background=\''+HEX[c2]+'44\';" onmouseout="this.style.background=\''+HEX[c2]+'22\';">'+c2+'</button>';});
  h+='</div>';
  g.innerHTML=h;
  if(level>=5){window._cmTimer=setInterval(function(){timer--;var te=document.getElementById('cm-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=2?'#ef4444':'#f472b6';}if(timer<=0){clearInterval(window._cmTimer);_LVL.lose();setTimeout(function(){gameColorMatch();},600);}},1000);}
  window.cmAns=function(val){if(window._cmTimer)clearInterval(window._cmTimer);if(val===correctAns){_LVL.win(15);showScorePop('+15');setTimeout(function(){gameColorMatch();},400);}else{var alive=_LVL.lose();if(alive)setTimeout(function(){gameColorMatch();},800);}};
}


function cmAns(chosen){if(chosen===window._cmCorrect)window._cmScore++;nextCM();}

/* ═══════════════════════════════════════════
   MEDIUM GAMES
═══════════════════════════════════════════ */

/* GENERIC QUIZ ENGINE */
function makeQuizEngine(qArr, title, icon){
  return function(){
    window._qeScore=0;window._qeQ=0;window._qeList=shuffle(qArr).slice(0,10);
    gw().innerHTML=`<h2>${icon} ${title}</h2><p>10 questions. Good luck!</p><button class="g-btn" onclick="qeNext()">Start</button>`;
  };
}
function qeAns(chosen,correct){
  if(chosen===correct)window._qeScore++;
  var btns=document.querySelectorAll('.g-btn');
  btns.forEach(b=>{
    if(b.textContent===correct)b.style.background='#2ecc71';
    else if(b.textContent===chosen&&chosen!==correct)b.style.background='#e74c3c';
    b.disabled=true;
  });
  setTimeout(qeNext,700);
}

var GQ_DATA=[
  ['What is the capital of France?','Paris','London','Berlin','Madrid'],
  ['Which planet is largest?','Jupiter','Saturn','Mars','Neptune'],
  ['Who painted the Mona Lisa?','Leonardo da Vinci','Raphael','Michelangelo','Caravaggio'],
  ['How many bones in the adult human body?','206','208','196','212'],
  ['What year did World War II end?','1945','1944','1946','1943'],
  ['Which element has symbol Au?','Gold','Silver','Copper','Arsenic'],
  ['What is the largest ocean?','Pacific','Atlantic','Indian','Arctic'],
  ['Who wrote Romeo and Juliet?','Shakespeare','Dickens','Tolstoy','Twain'],
  ['How many sides does a hexagon have?','6','5','7','8'],
  ['What is the speed of light (approx)?','299,792 km/s','150,000 km/s','500,000 km/s','200,000 km/s'],
  ['Which country is the Amazon River in?','Brazil','Peru','Colombia','Venezuela'],
  ['What is H2O?','Water','Hydrogen','Oxygen','Salt'],
];
var GGQ_DATA=[
  ['Capital of Japan?','Tokyo','Osaka','Kyoto','Hiroshima'],
  ['Largest country by area?','Russia','Canada','USA','China'],
  ['Which continent is Egypt in?','Africa','Asia','Europe','Middle East'],
  ['Longest river in the world?','Nile','Amazon','Mississippi','Yangtze'],
  ['Capital of Australia?','Canberra','Sydney','Melbourne','Brisbane'],
  ['Which mountain is tallest?','Everest','K2','Kangchenjunga','Lhotse'],
  ['Which ocean borders Europe to the west?','Atlantic','Pacific','Indian','Arctic'],
  ['Country of Eiffel Tower?','France','Italy','Spain','Belgium'],
  ['Capital of Canada?','Ottawa','Toronto','Vancouver','Montreal'],
  ['What language is spoken in Brazil?','Portuguese','Spanish','English','French'],
];
var SQ_DATA=[
  ['What planet is closest to the Sun?','Mercury','Venus','Earth','Mars'],
  ['Chemical symbol for iron?','Fe','Ir','In','Io'],
  ['What gas do plants absorb?','CO2','Oxygen','Nitrogen','Hydrogen'],
  ['How many chromosomes in human cells?','46','23','92','48'],
  ['What is the powerhouse of the cell?','Mitochondria','Nucleus','Ribosome','Vacuole'],
  ['Speed of sound in air (approx)?','343 m/s','300 m/s','500 m/s','1000 m/s'],
  ['What type of bond shares electrons?','Covalent','Ionic','Hydrogen','Metallic'],
  ['Which organ produces insulin?','Pancreas','Liver','Kidney','Stomach'],
  ['What is the atomic number of Carbon?','6','8','12','14'],
  ['What force keeps planets in orbit?','Gravity','Magnetism','Nuclear','Friction'],
];
var HQ_DATA=[
  ['In what year did the Berlin Wall fall?','1989','1991','1987','1993'],
  ['Who was the first US President?','George Washington','John Adams','Thomas Jefferson','Benjamin Franklin'],
  ['What empire did Julius Caesar lead?','Roman','Greek','Persian','Ottoman'],
  ['The French Revolution began in what year?','1789','1776','1799','1804'],
  ['Who was the first woman to win a Nobel Prize?','Marie Curie','Ada Lovelace','Florence Nightingale','Rosalind Franklin'],
  ['What ancient wonder was in Alexandria?','Lighthouse','Colossus','Hanging Gardens','Statue of Zeus'],
  ['Which country sent the first human to space?','USSR','USA','Germany','UK'],
  ['The Magna Carta was signed in what year?','1215','1066','1307','1415'],
  ['Who led India to independence?','Mahatma Gandhi','Nehru','Bose','Patel'],
  ['What year did the Titanic sink?','1912','1914','1910','1918'],
];
var MQ_DATA=[
  ['Director of Inception?','Christopher Nolan','Steven Spielberg','James Cameron','Ridley Scott'],
  ['Which movie features the line "You cant handle the truth"?','A Few Good Men','Top Gun','Born on the Fourth of July','Rain Man'],
  ['First movie to gross $1 billion?','Titanic','Jurassic Park','The Lion King','Independence Day'],
  ['Animated movie set in Arendelle?','Frozen','Tangled','Brave','Moana'],
  ['Who played Iron Man?','Robert Downey Jr.','Chris Evans','Chris Hemsworth','Mark Ruffalo'],
  ['What studio made Toy Story?','Pixar','Disney','DreamWorks','Illumination'],
  ['Movie franchise featuring Vin Diesel?','Fast & Furious','Transformers','Mission Impossible','Die Hard'],
  ['What award does the Oscar represent?','Academy Award','Golden Globe','BAFTA','SAG Award'],
  ['Matrix actress playing Trinity?','Carrie-Anne Moss','Halle Berry','Jennifer Lawrence','Charlize Theron'],
  ['Titanic director?','James Cameron','Steven Spielberg','Ron Howard','Ridley Scott'],
];
var EXQ_DATA=[
  ['What is the rarest blood type?','AB-','O-','B-','A-'],
  ['Which element has the highest melting point?','Tungsten','Carbon','Iron','Platinum'],
  ['The Treaty of Westphalia ended which war?','Thirty Years War','Hundred Years War','Seven Years War','War of Spanish Succession'],
  ['What is the Fibonacci sequence starting?','0,1,1,2,3,5','1,2,3,5,8','0,1,2,3,5','1,1,2,4,7'],
  ['Who proved the incompleteness theorems?','Gödel','Turing','Cantor','Hilbert'],
  ['What language is Kafka written in?','German','Czech','French','Hungarian'],
  ['Mitochondrial DNA is inherited from?','Mother','Father','Both equally','Random'],
  ['Schrödinger equation describes?','Quantum wave function','Relativity','Thermodynamics','Electromagnetism'],
  ['Which philosopher wrote the Republic?','Plato','Aristotle','Socrates','Descartes'],
  ['CRISPR stands for...?','Clustered Regularly Interspaced Short Palindromic Repeats','Compound RNA Integration System','Cellular Reprogramming Insertion System','None'],
];

function gameGenQuiz(){
  _LVL.init('genquiz',50);
  var level=_LVL.level;
  var ALL_Q=[
    // Easy
    {q:'What color do you get mixing red and blue?',a:'Purple',w:['Green','Orange','Brown']},
    {q:'How many sides does a triangle have?',a:'3',w:['4','5','6']},
    {q:'What is the capital of France?',a:'Paris',w:['London','Berlin','Rome']},
    {q:'What planet is closest to the Sun?',a:'Mercury',w:['Venus','Earth','Mars']},
    {q:'How many continents are there?',a:'7',w:['5','6','8']},
    {q:'What is H2O?',a:'Water',w:['Salt','Oxygen','Hydrogen']},
    {q:'How many days in a week?',a:'7',w:['5','6','8']},
    {q:'What animal says moo?',a:'Cow',w:['Pig','Horse','Sheep']},
    {q:'How many letters in the English alphabet?',a:'26',w:['24','25','28']},
    {q:'What is the largest ocean?',a:'Pacific',w:['Atlantic','Indian','Arctic']},
    // Medium
    {q:'Who wrote Romeo and Juliet?',a:'Shakespeare',w:['Dickens','Austen','Tolkien']},
    {q:'What is the speed of light (km/s)?',a:'299,792',w:['150,000','199,792','399,792']},
    {q:'How many bones in the human body?',a:'206',w:['198','215','212']},
    {q:'What year did WW2 end?',a:'1945',w:['1943','1944','1946']},
    {q:'What is the chemical symbol for gold?',a:'Au',w:['Go','Gd','Ag']},
    {q:'Which planet has rings?',a:'Saturn',w:['Jupiter','Mars','Neptune']},
    {q:'What is the square root of 144?',a:'12',w:['11','13','14']},
    {q:'How many players in a soccer team?',a:'11',w:['9','10','12']},
    {q:'What is the longest river in the world?',a:'Nile',w:['Amazon','Yangtze','Mississippi']},
    {q:'What year did man first land on the Moon?',a:'1969',w:['1965','1967','1971']},
    // Hard
    {q:'What is the powerhouse of the cell?',a:'Mitochondria',w:['Nucleus','Ribosome','Vacuole']},
    {q:'Who developed the theory of relativity?',a:'Einstein',w:['Newton','Darwin','Hawking']},
    {q:'What is the capital of Australia?',a:'Canberra',w:['Sydney','Melbourne','Perth']},
    {q:'Which element has atomic number 79?',a:'Gold',w:['Silver','Platinum','Iron']},
    {q:'How many symphonies did Beethoven write?',a:'9',w:['6','7','10']},
    {q:'What year was the Eiffel Tower built?',a:'1889',w:['1876','1901','1895']},
    {q:'What is the hardest natural substance?',a:'Diamond',w:['Steel','Quartz','Titanium']},
    {q:'Who painted the Sistine Chapel?',a:'Michelangelo',w:['Da Vinci','Raphael','Botticelli']},
    {q:'What is the smallest country in the world?',a:'Vatican City',w:['Monaco','Liechtenstein','San Marino']},
    {q:'What is pi to 4 decimal places?',a:'3.1416',w:['3.1214','3.1592','3.1618']},
    // Expert
    {q:'What is the half-life of Carbon-14?',a:'5,730 years',w:['1,000 years','10,000 years','50,000 years']},
    {q:'Who invented the World Wide Web?',a:'Tim Berners-Lee',w:['Bill Gates','Steve Jobs','Linus Torvalds']},
    {q:'What is the Fibonacci sequence start?',a:'0,1,1,2,3,5',w:['1,1,2,3,5,8','0,1,2,3,4,5','1,2,3,5,8,13']},
    {q:'How many moons does Jupiter have?',a:'95',w:['67','79','88']},
    {q:'What is the Krebs cycle?',a:'Cellular respiration',w:['Photosynthesis','Mitosis','DNA replication']},
    {q:'In what year was the first iPhone released?',a:'2007',w:['2005','2006','2008']},
    {q:'What is the Pythagorean theorem?',a:'a²+b²=c²',w:['a+b=c','a×b=c²','a²-b²=c']},
    {q:'Who wrote "A Brief History of Time"?',a:'Stephen Hawking',w:['Carl Sagan','Neil deGrasse Tyson','Brian Greene']},
    {q:'What is the largest desert in the world?',a:'Antarctica',w:['Sahara','Arabian','Gobi']},
    {q:'What is quantum entanglement?',a:'Particle correlation',w:['Wave function','Energy quanta','Spin orbit']}
  ];
  var maxIdx=Math.min(ALL_Q.length-1,Math.floor(level/50*ALL_Q.length));
  var range=Math.min(ALL_Q.length,10+level);
  var q=ALL_Q[Math.floor(Math.random()*Math.min(range,ALL_Q.length))];
  var opts=[q.a].concat(q.w).sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(5,20-Math.floor(level/4));var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🧠 General Knowledge','#818cf8');
  h+='<div style="background:rgba(255,255,255,.08);border-radius:14px;padding:18px;margin-bottom:14px;text-align:center;">';
  h+='<div style="font-size:15px;font-weight:700;line-height:1.5;color:var(--text);">'+q.q+'</div>';
  if(level>=8)h+='<div id="gq-timer" style="font-size:20px;font-weight:900;margin-top:8px;color:'+(timer<=5?'#ef4444':'#818cf8')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  opts.forEach(function(opt){
    h+='<button onclick="gqAns(\''+opt.replace(/'/g,"\\'")+'\')" style="padding:12px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:13px;font-weight:700;color:var(--text);transition:all .15s;" onmouseover="this.style.background=\'rgba(129,140,248,.4)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';
  });
  h+='</div>';
  g.innerHTML=h;
  if(level>=8){
    window._gqTimer=setInterval(function(){timer--;var te=document.getElementById('gq-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#818cf8';}if(timer<=0){clearInterval(window._gqTimer);_LVL.lose();setTimeout(function(){gameGenQuiz();},800);}},1000);
  }
  window.gqAns=function(val){lockBtns();
    if(window._gqTimer)clearInterval(window._gqTimer);
    if(val===q.a){_LVL.win(25);showScorePop('+25');setTimeout(function(){gameGenQuiz();},700);}
    else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===q.a)b.style.background='rgba(34,197,94,.5)';else if(b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.disabled=true;});if(alive)setTimeout(function(){gameGenQuiz();},1300);}
  };
}


function gameGeoQuiz(){
  _LVL.init('geoquiz',50);
  var level=_LVL.level;
  var ALL=[
    {q:'Capital of France?',a:'Paris',w:['London','Berlin','Rome']},
    {q:'Capital of Japan?',a:'Tokyo',w:['Osaka','Kyoto','Hiroshima']},
    {q:'Largest country by area?',a:'Russia',w:['Canada','China','USA']},
    {q:'Capital of Australia?',a:'Canberra',w:['Sydney','Melbourne','Perth']},
    {q:'Which country has the most population?',a:'India',w:['China','USA','Indonesia']},
    {q:'Longest river in the world?',a:'Nile',w:['Amazon','Yangtze','Mississippi']},
    {q:'Highest mountain in the world?',a:'Everest',w:['K2','Kangchenjunga','Makalu']},
    {q:'Capital of Brazil?',a:'Brasilia',w:['Rio de Janeiro','São Paulo','Salvador']},
    {q:'Which ocean is the largest?',a:'Pacific',w:['Atlantic','Indian','Arctic']},
    {q:'Capital of Canada?',a:'Ottawa',w:['Toronto','Vancouver','Montreal']},
    {q:'Capital of Germany?',a:'Berlin',w:['Munich','Hamburg','Frankfurt']},
    {q:'Which country has the Eiffel Tower?',a:'France',w:['Belgium','Italy','Spain']},
    {q:'Capital of Egypt?',a:'Cairo',w:['Alexandria','Luxor','Aswan']},
    {q:'Smallest country in the world?',a:'Vatican City',w:['Monaco','Liechtenstein','San Marino']},
    {q:'Which continent has the most countries?',a:'Africa',w:['Asia','Europe','Americas']},
    {q:'Capital of Argentina?',a:'Buenos Aires',w:['Mendoza','Cordoba','Rosario']},
    {q:'Capital of India?',a:'New Delhi',w:['Mumbai','Kolkata','Chennai']},
    {q:'Which country has the Colosseum?',a:'Italy',w:['Greece','Spain','Turkey']},
    {q:'Capital of South Korea?',a:'Seoul',w:['Busan','Incheon','Daegu']},
    {q:'Which is the driest desert?',a:'Atacama',w:['Sahara','Gobi','Arabian']},
    {q:'Capital of Mexico?',a:'Mexico City',w:['Guadalajara','Monterrey','Puebla']},
    {q:'Which country is known as the Land of the Rising Sun?',a:'Japan',w:['China','South Korea','Thailand']},
    {q:'Capital of Turkey?',a:'Ankara',w:['Istanbul','Izmir','Bursa']},
    {q:'Which river flows through Egypt?',a:'Nile',w:['Congo','Niger','Zambezi']},
    {q:'Capital of Russia?',a:'Moscow',w:['Saint Petersburg','Novosibirsk','Kazan']},
    {q:'Which country has the most islands?',a:'Sweden',w:['Norway','Finland','Indonesia']},
    {q:'Capital of Saudi Arabia?',a:'Riyadh',w:['Jeddah','Mecca','Medina']},
    {q:'Which ocean borders Africa and Asia?',a:'Indian Ocean',w:['Atlantic','Pacific','Arctic']},
    {q:'Capital of New Zealand?',a:'Wellington',w:['Auckland','Christchurch','Dunedin']},
    {q:'Which country has the Amazon rainforest?',a:'Brazil',w:['Colombia','Peru','Venezuela']},
    {q:'Capital of Thailand?',a:'Bangkok',w:['Chiang Mai','Pattaya','Phuket']},
    {q:'Which is the longest wall ever built?',a:'Great Wall of China',w:['Hadrian\'s Wall','Berlin Wall','Aurelian Wall']},
    {q:'Capital of Kenya?',a:'Nairobi',w:['Mombasa','Kisumu','Nakuru']},
    {q:'Which country has the Taj Mahal?',a:'India',w:['Pakistan','Bangladesh','Nepal']},
    {q:'Capital of Norway?',a:'Oslo',w:['Bergen','Stavanger','Trondheim']},
    {q:'Which sea is saltiest?',a:'Dead Sea',w:['Red Sea','Caspian Sea','Black Sea']},
    {q:'Capital of Poland?',a:'Warsaw',w:['Krakow','Gdansk','Wroclaw']},
    {q:'Which continent is Antarctica?',a:'Antarctica',w:['An ocean','An island','Part of South America']},
    {q:'Capital of Nigeria?',a:'Abuja',w:['Lagos','Kano','Ibadan']},
    {q:'Which country has the most UNESCO sites?',a:'Italy',w:['China','Spain','France']},
    {q:'Capital of Philippines?',a:'Manila',w:['Cebu','Davao','Makati']},
    {q:'Where is the Sahara Desert?',a:'North Africa',w:['Middle East','Central Asia','Southern Africa']},
    {q:'Capital of Vietnam?',a:'Hanoi',w:['Ho Chi Minh City','Da Nang','Hue']},
    {q:'Which is the highest plateau?',a:'Tibetan Plateau',w:['Colorado Plateau','Iranian Plateau','Deccan Plateau']},
    {q:'Capital of Colombia?',a:'Bogota',w:['Medellin','Cali','Cartagena']},
    {q:'Which country has most active volcanoes?',a:'Indonesia',w:['Japan','USA','Philippines']},
    {q:'Capital of Ukraine?',a:'Kyiv',w:['Lviv','Kharkiv','Odessa']},
    {q:'Which city is built on water?',a:'Venice',w:['Amsterdam','Bangkok','Stockholm']},
    {q:'Capital of Peru?',a:'Lima',w:['Cusco','Arequipa','Trujillo']},
    {q:'Which is the deepest lake?',a:'Lake Baikal',w:['Lake Tanganyika','Caspian Sea','Lake Superior']}
  ];
  var range=Math.min(ALL.length,10+level);
  var q=ALL[Math.floor(Math.random()*range)];
  var opts=[q.a].concat(q.w).sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(5,20-Math.floor(level/4));var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🌍 Geography Quiz','#60a5fa');
  h+='<div style="background:rgba(255,255,255,.08);border-radius:14px;padding:18px;margin-bottom:14px;text-align:center;">';
  h+='<div style="font-size:36px;margin-bottom:8px;">🗺️</div>';
  h+='<div style="font-size:15px;font-weight:700;color:var(--text);">'+q.q+'</div>';
  if(level>=5)h+='<div id="geo-timer" style="font-size:20px;font-weight:800;margin-top:8px;color:'+(timer<=5?'#ef4444':'#60a5fa')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  opts.forEach(function(opt){
    h+='<button onclick="geoAns(\''+opt.replace(/'/g,"\\'")+'\')" style="padding:12px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:13px;font-weight:700;color:var(--text);transition:all .15s;" onmouseover="this.style.background=\'rgba(96,165,250,.4)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';
  });
  h+='</div>';
  g.innerHTML=h;
  if(level>=5){
    window._geoTimer=setInterval(function(){timer--;var te=document.getElementById('geo-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#60a5fa';}if(timer<=0){clearInterval(window._geoTimer);_LVL.lose();setTimeout(function(){gameGeoQuiz();},800);}},1000);
  }
  window.geoAns=function(val){lockBtns();
    if(window._geoTimer)clearInterval(window._geoTimer);
    if(val===q.a){_LVL.win(25);showScorePop('+25');setTimeout(function(){gameGeoQuiz();},700);}
    else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===q.a)b.style.background='rgba(34,197,94,.5)';else if(b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.disabled=true;});if(alive)setTimeout(function(){gameGeoQuiz();},1200);}
  };
}


function gameSciQuiz(){
  _LVL.init('sciquiz',45);
  var level=_LVL.level;
  var ALL=[
    {q:'What is the chemical symbol for water?',a:'H2O',w:['CO2','O2','H2']},
    {q:'How many planets are in our solar system?',a:'8',w:['7','9','10']},
    {q:'What force keeps us on Earth?',a:'Gravity',w:['Magnetism','Friction','Inertia']},
    {q:'What is the powerhouse of the cell?',a:'Mitochondria',w:['Nucleus','Ribosome','Golgi']},
    {q:'What planet is the Red Planet?',a:'Mars',w:['Jupiter','Venus','Saturn']},
    {q:'What gas do plants absorb?',a:'Carbon Dioxide',w:['Oxygen','Nitrogen','Hydrogen']},
    {q:'What is the speed of light?',a:'299,792 km/s',w:['150,000 km/s','450,000 km/s','100,000 km/s']},
    {q:'What is the atomic number of Carbon?',a:'6',w:['4','8','12']},
    {q:'Which gas is most abundant in atmosphere?',a:'Nitrogen',w:['Oxygen','Carbon Dioxide','Argon']},
    {q:'What is the boiling point of water?',a:'100°C',w:['50°C','120°C','90°C']},
    {q:'How many chromosomes do humans have?',a:'46',w:['23','48','44']},
    {q:'What is DNA composed of?',a:'Nucleotides',w:['Amino acids','Proteins','Lipids']},
    {q:'Which element is a liquid at room temperature?',a:'Mercury',w:['Bromine','Gallium','Cesium']},
    {q:'What is the name for H2O as a gas?',a:'Steam',w:['Vapor','Mist','Fog']},
    {q:'What is the SI unit of force?',a:'Newton',w:['Joule','Watt','Pascal']},
    {q:'Which vitamin is produced by sunlight?',a:'Vitamin D',w:['Vitamin A','Vitamin C','Vitamin B12']},
    {q:'What type of radiation has the shortest wavelength?',a:'Gamma rays',w:['X-rays','Ultraviolet','Microwaves']},
    {q:'What is the pH of neutral water?',a:'7',w:['5','9','6']},
    {q:'What is the largest organ in the human body?',a:'Skin',w:['Liver','Brain','Heart']},
    {q:'What is the half-life of Carbon-14?',a:'5,730 years',w:['1,000 years','10,000 years','570 years']},
    {q:'What particle has no charge?',a:'Neutron',w:['Proton','Electron','Positron']},
    {q:'What is the process of cell division called?',a:'Mitosis',w:['Meiosis','Osmosis','Diffusion']},
    {q:'Which planet has the strongest magnetic field?',a:'Jupiter',w:['Saturn','Earth','Neptune']},
    {q:'What is Avogadros number?',a:'6.022 x 10^23',w:['3.14 x 10^23','9.81 x 10^23','1.67 x 10^23']},
    {q:'What is the chemical formula for salt?',a:'NaCl',w:['KCl','CaCl','MgCl']},
    {q:'What is the name of the closest star to Earth?',a:'Proxima Centauri',w:['Sirius','Alpha Centauri A','Vega']},
    {q:'What is the SI unit of electrical resistance?',a:'Ohm',w:['Volt','Ampere','Farad']},
    {q:'Which blood type is the universal donor?',a:'O negative',w:['A positive','AB negative','B positive']},
    {q:'What is Newtons third law?',a:'Action-reaction',w:['Inertia','Acceleration','Conservation']},
    {q:'What is the smallest unit of matter?',a:'Atom',w:['Molecule','Quark','Electron']},
    {q:'What causes rainbows?',a:'Light refraction',w:['Reflection','Diffraction','Absorption']},
    {q:'What is the most common element in universe?',a:'Hydrogen',w:['Helium','Carbon','Oxygen']},
    {q:'How many bones are in the human skull?',a:'22',w:['14','29','8']},
    {q:'What type of bond shares electrons?',a:'Covalent',w:['Ionic','Metallic','Hydrogen']},
    {q:'What is the freezing point of water in Fahrenheit?',a:'32°F',w:['0°F','28°F','41°F']},
    {q:'What organ produces insulin?',a:'Pancreas',w:['Liver','Kidney','Thyroid']},
    {q:'Which wave type requires a medium?',a:'Mechanical',w:['Electromagnetic','Radio','Light']},
    {q:'What is the chemical symbol for potassium?',a:'K',w:['P','Po','Pt']},
    {q:'What is terminal velocity?',a:'Maximum falling speed',w:['Launch speed','Escape velocity','Sound speed']},
    {q:'How many moons does Mars have?',a:'2',w:['0','1','3']},
    {q:'What is the name for the study of earthquakes?',a:'Seismology',w:['Geology','Volcanology','Tectonics']},
    {q:'Which planet rotates on its side?',a:'Uranus',w:['Neptune','Saturn','Venus']},
    {q:'What is the chemical symbol for silver?',a:'Ag',w:['Si','S','Sr']},
    {q:'What causes tides?',a:'Moon gravity',w:['Sun gravity','Earth rotation','Wind']},
    {q:'How many valence electrons does Carbon have?',a:'4',w:['2','6','8']}
  ];
  var range=Math.min(ALL.length,10+level);
  var q=ALL[Math.floor(Math.random()*range)];
  var opts=[q.a].concat(q.w).sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(5,18-Math.floor(level/3));var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🔬 Science Quiz','#22d3ee');
  h+='<div style="background:rgba(255,255,255,.08);border-radius:14px;padding:18px;margin-bottom:14px;text-align:center;">';
  h+='<div style="font-size:30px;margin-bottom:8px;">🔬⚗️🧬</div>';
  h+='<div style="font-size:15px;font-weight:700;color:var(--text);">'+q.q+'</div>';
  if(level>=5)h+='<div id="sci-timer" style="font-size:20px;font-weight:900;margin-top:8px;color:'+(timer<=5?'#ef4444':'#22d3ee')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  opts.forEach(function(opt){h+='<button onclick="sciAns(\''+opt.replace(/'/g,"\\'")+'\')" style="padding:12px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:13px;font-weight:700;color:var(--text);transition:all .15s;" onmouseover="this.style.background=\'rgba(34,211,238,.3)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';});
  h+='</div>';
  g.innerHTML=h;
  if(level>=5){window._sciTimer=setInterval(function(){timer--;var te=document.getElementById('sci-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#22d3ee';}if(timer<=0){clearInterval(window._sciTimer);_LVL.lose();setTimeout(function(){gameSciQuiz();},800);}},1000);}
  window.sciAns=function(val){lockBtns();if(window._sciTimer)clearInterval(window._sciTimer);if(val===q.a){_LVL.win(25);showScorePop('+25');setTimeout(function(){gameSciQuiz();},700);}else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===q.a)b.style.background='rgba(34,197,94,.5)';else if(b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.disabled=true;});if(alive)setTimeout(function(){gameSciQuiz();},1300);}};
}


function gameHistQuiz(){
  _LVL.init('histquiz',40);
  var level=_LVL.level;
  var ALL=[
    {q:'When did World War II end?',a:'1945',w:['1943','1944','1946']},
    {q:'Who was the first US President?',a:'George Washington',w:['John Adams','Thomas Jefferson','Abraham Lincoln']},
    {q:'When did the French Revolution begin?',a:'1789',w:['1776','1793','1804']},
    {q:'What ancient wonder was in Alexandria?',a:'Lighthouse',w:['Colossus','Mausoleum','Gardens']},
    {q:'Which empire was ruled by Genghis Khan?',a:'Mongol Empire',w:['Ottoman Empire','Roman Empire','Persian Empire']},
    {q:'When did man first land on the Moon?',a:'1969',w:['1965','1971','1967']},
    {q:'Who wrote the Declaration of Independence?',a:'Thomas Jefferson',w:['Benjamin Franklin','John Adams','James Madison']},
    {q:'What year did the Berlin Wall fall?',a:'1989',w:['1985','1991','1987']},
    {q:'Which pharaoh built the Great Pyramid?',a:'Khufu',w:['Ramesses','Tutankhamun','Cleopatra']},
    {q:'When was the Magna Carta signed?',a:'1215',w:['1066','1415','1307']},
    {q:'Who invented the printing press?',a:'Johannes Gutenberg',w:['Leonardo da Vinci','Isaac Newton','Galileo Galilei']},
    {q:'What year did WWI begin?',a:'1914',w:['1912','1916','1918']},
    {q:'Who led the Indian independence movement?',a:'Mahatma Gandhi',w:['Nehru','Subhas Bose','Tilak']},
    {q:'What was the name of the first artificial satellite?',a:'Sputnik',w:['Vostok','Explorer','Telstar']},
    {q:'Which empire was ruled by Augustus Caesar?',a:'Roman Empire',w:['Byzantine Empire','Ottoman Empire','Holy Roman Empire']},
    {q:'When did the Renaissance begin?',a:'14th century',w:['12th century','16th century','13th century']},
    {q:'Who discovered America in 1492?',a:'Columbus',w:['Vespucci','Cabot','Drake']},
    {q:'What was the longest war in US history?',a:'War in Afghanistan',w:['Vietnam War','Revolutionary War','Civil War']},
    {q:'Who was the first woman to win a Nobel Prize?',a:'Marie Curie',w:['Jane Addams','Pearl Buck','Bertha Suttner']},
    {q:'What year was the Titanic disaster?',a:'1912',w:['1910','1914','1908']},
    {q:'Which civilization built Machu Picchu?',a:'Inca',w:['Aztec','Maya','Olmec']},
    {q:'When was the first iPhone released?',a:'2007',w:['2005','2008','2009']},
    {q:'What year was the United Nations founded?',a:'1945',w:['1919','1939','1950']},
    {q:'Who was the first Emperor of China?',a:'Qin Shi Huang',w:['Kublai Khan','Yongle','Wu Zetian']},
    {q:'What year was the internet invented?',a:'1989',w:['1975','1995','1983']},
    {q:'Which country was the first to give women the right to vote?',a:'New Zealand',w:['Australia','Finland','USA']},
    {q:'What was the name of the ship Darwin sailed on?',a:'HMS Beagle',w:['HMS Victory','HMS Endeavour','HMS Challenger']},
    {q:'When did Nelson Mandela become president of South Africa?',a:'1994',w:['1990','1996','1991']},
    {q:'Who invented the telephone?',a:'Alexander Graham Bell',w:['Thomas Edison','Nikola Tesla','Guglielmo Marconi']},
    {q:'What was the first country to land on Mars?',a:'USA',w:['USSR','China','ESA']}
  ];
  var range=Math.min(ALL.length,10+level);
  var q=ALL[Math.floor(Math.random()*range)];
  var opts=[q.a].concat(q.w).sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(6,20-Math.floor(level/3));var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('📜 History Quiz','#f59e0b');
  h+='<div style="background:rgba(255,255,255,.08);border-radius:14px;padding:18px;margin-bottom:14px;text-align:center;">';
  h+='<div style="font-size:28px;margin-bottom:8px;">🏛️📜⚔️</div>';
  h+='<div style="font-size:15px;font-weight:700;color:var(--text);">'+q.q+'</div>';
  if(level>=5)h+='<div id="hi-timer" style="font-size:20px;font-weight:900;margin-top:8px;color:'+(timer<=5?'#ef4444':'#f59e0b')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  opts.forEach(function(opt){h+='<button onclick="hiAns(\''+opt.replace(/'/g,"\\'")+'\')" style="padding:12px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:13px;font-weight:700;color:var(--text);transition:all .15s;" onmouseover="this.style.background=\'rgba(245,158,11,.3)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';});
  h+='</div>';
  g.innerHTML=h;
  if(level>=5){window._hiTimer=setInterval(function(){timer--;var te=document.getElementById('hi-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#f59e0b';}if(timer<=0){clearInterval(window._hiTimer);_LVL.lose();setTimeout(function(){gameHistQuiz();},800);}},1000);}
  window.hiAns=function(val){lockBtns();if(window._hiTimer)clearInterval(window._hiTimer);if(val===q.a){_LVL.win(25);showScorePop('+25');setTimeout(function(){gameHistQuiz();},700);}else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===q.a)b.style.background='rgba(34,197,94,.5)';else if(b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.disabled=true;});if(alive)setTimeout(function(){gameHistQuiz();},1300);}};
}


function gameMovieQuiz(){
  _LVL.init('moviequiz',40);
  var level=_LVL.level;
  var ALL=[
    {q:'Who directed Titanic (1997)?',a:'James Cameron',w:['Steven Spielberg','Christopher Nolan','Ridley Scott']},
    {q:'In which movie does "I\'ll be back" appear?',a:'The Terminator',w:['Predator','RoboCop','Die Hard']},
    {q:'Which film won the first Academy Award for Best Picture?',a:'Wings (1927)',w:['The Jazz Singer','Sunrise','Ben-Hur']},
    {q:'Who played Iron Man in the MCU?',a:'Robert Downey Jr.',w:['Chris Evans','Chris Hemsworth','Mark Ruffalo']},
    {q:'What year was Star Wars first released?',a:'1977',w:['1975','1979','1980']},
    {q:'Which movie features the line "You had me at hello"?',a:'Jerry Maguire',w:['Notting Hill','When Harry Met Sally','Pretty Woman']},
    {q:'Who voiced Woody in Toy Story?',a:'Tom Hanks',w:['Tim Allen','Tom Cruise','Will Smith']},
    {q:'Which film has the highest box office revenue ever?',a:'Avatar',w:['Avengers Endgame','Titanic','Star Wars']},
    {q:'In The Dark Knight, who played the Joker?',a:'Heath Ledger',w:['Jack Nicholson','Jared Leto','Joaquin Phoenix']},
    {q:'Which Pixar movie features a rat who wants to cook?',a:'Ratatouille',w:['Remy','Chef','The Kitchen']},
    {q:'What is the name of the ship in Alien (1979)?',a:'Nostromo',w:['Sulaco','Prometheus','Discovery']},
    {q:'Who played Neo in The Matrix?',a:'Keanu Reeves',w:['Laurence Fishburne','Hugo Weaving','Will Smith']},
    {q:'Which movie features the song "Let It Go"?',a:'Frozen',w:['Tangled','Moana','Brave']},
    {q:'What year was The Shawshank Redemption released?',a:'1994',w:['1991','1996','1998']},
    {q:'Who directed Pulp Fiction?',a:'Quentin Tarantino',w:['Martin Scorsese','Francis Ford Coppola','Oliver Stone']},
    {q:'Which Bond film featured the theme song "Skyfall"?',a:'Skyfall',w:['Casino Royale','Spectre','No Time to Die']},
    {q:'In which city does La La Land take place?',a:'Los Angeles',w:['New York','Chicago','San Francisco']},
    {q:'Who played Forrest Gump?',a:'Tom Hanks',w:['Tom Cruise','Kevin Costner','Mel Gibson']},
    {q:'Which film won Best Picture at the 2020 Oscars?',a:'Parasite',w:['1917','Ford v Ferrari','Joker']},
    {q:'What is the highest-rated film on IMDb?',a:'The Shawshank Redemption',w:['The Godfather','The Dark Knight','Schindlers List']},
    {q:'Who plays Captain Jack Sparrow?',a:'Johnny Depp',w:['Orlando Bloom','Keira Knightley','Bill Nighy']},
    {q:'Which movie features talking toys?',a:'Toy Story',w:['Antz','A Bugs Life','Shrek']},
    {q:'Who directed Jurassic Park?',a:'Steven Spielberg',w:['James Cameron','George Lucas','Ron Howard']},
    {q:'What is the name of the lion in The Lion King?',a:'Simba',w:['Mufasa','Nala','Scar']},
    {q:'Which 2019 film earned over $2 billion worldwide?',a:'Avengers Endgame',w:['The Lion King','Frozen 2','Spider-Man Far From Home']},
    {q:'Who played Black Widow in the MCU?',a:'Scarlett Johansson',w:['Brie Larson','Elizabeth Olsen','Zoe Saldana']},
    {q:'In which film does Leonardo DiCaprio play a con artist?',a:'Catch Me If You Can',w:['The Wolf of Wall Street','Shutter Island','Inception']},
    {q:'What film features the character Dobby?',a:'Harry Potter',w:['The Chronicles of Narnia','Lord of the Rings','Percy Jackson']},
    {q:'Who composed the music for Interstellar?',a:'Hans Zimmer',w:['John Williams','Howard Shore','Danny Elfman']},
    {q:'Which film shows a red door leading to Wonderland?',a:'Alice in Wonderland',w:['The Wizard of Oz','Labyrinth','Pan']},
    {q:'What is the name of the spaceship in 2001: A Space Odyssey?',a:'Discovery One',w:['Enterprise','Nostromo','Millennium Falcon']},
    {q:'Who directed Schindlers List?',a:'Steven Spielberg',w:['Roman Polanski','Roberto Benigni','Lasse Hallstrom']},
    {q:'In which film does a clownfish search for his son?',a:'Finding Nemo',w:['The Little Mermaid','Shark Tale','Moana']},
    {q:'What year was The Godfather released?',a:'1972',w:['1969','1974','1970']},
    {q:'Who directed 2001: A Space Odyssey?',a:'Stanley Kubrick',w:['Ridley Scott','George Lucas','Alfred Hitchcock']},
    {q:'In which film does Will Smith play a genie?',a:'Aladdin (2019)',w:['Bright','Ali','The Fresh Prince']},
    {q:'What is the name of the pub in Shaun of the Dead?',a:'The Winchester',w:['The Queen Vic','The Slaughtered Lamb','The Crown']},
    {q:'Which actor played Batman in the 1989 film?',a:'Michael Keaton',w:['Val Kilmer','George Clooney','Christian Bale']},
    {q:'In which film does Tom Hanks play a man stuck in an airport?',a:'The Terminal',w:['Cast Away','Philadelphia','Forrest Gump']},
    {q:'Which animated film features the character Shrek?',a:'Shrek',w:['Bee Movie','Antz','A Bugs Life']}
  ];
  var range=Math.min(ALL.length,10+level);
  var q=ALL[Math.floor(Math.random()*range)];
  var opts=[q.a].concat(q.w).sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(6,20-Math.floor(level/3));var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🎬 Movie Quiz','#818cf8');
  h+='<div style="background:rgba(255,255,255,.08);border-radius:14px;padding:18px;margin-bottom:14px;">';
  h+='<div style="font-size:36px;text-align:center;margin-bottom:8px;">🎬</div>';
  h+='<div style="font-size:15px;font-weight:700;text-align:center;color:var(--text);">'+q.q+'</div>';
  if(level>=5)h+='<div id="mv-timer" style="text-align:center;font-size:20px;font-weight:900;margin-top:8px;color:'+(timer<=5?'#ef4444':'#818cf8')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr;gap:8px;">';
  opts.forEach(function(opt){h+='<button onclick="mvAns(\''+opt.replace(/'/g,"\\'")+'\')" style="padding:12px 16px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:14px;font-weight:600;color:var(--text);text-align:left;transition:all .15s;" onmouseover="this.style.background=\'rgba(129,140,248,.3)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';});
  h+='</div>';
  g.innerHTML=h;
  if(level>=5){window._mvTimer=setInterval(function(){timer--;var te=document.getElementById('mv-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#818cf8';}if(timer<=0){clearInterval(window._mvTimer);_LVL.lose();setTimeout(function(){gameMovieQuiz();},800);}},1000);}
  window.mvAns=function(val){lockBtns();if(window._mvTimer)clearInterval(window._mvTimer);if(val===q.a){_LVL.win(25);showScorePop('+25');setTimeout(function(){gameMovieQuiz();},700);}else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===q.a)b.style.background='rgba(34,197,94,.5)';else if(b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.disabled=true;});if(alive)setTimeout(function(){gameMovieQuiz();},1300);}};
}


function gameExpertQuiz(){
  _LVL.init('expertquiz',30);
  var level=_LVL.level;
  var ALL=[
    {q:'What is the Planck constant?',a:'6.626 x 10^-34 J·s',w:['3.14 x 10^-34','9.81 x 10^-34','1.38 x 10^-34']},
    {q:'What is Schrodingers cat thought experiment about?',a:'Quantum superposition',w:['Wave-particle duality','Uncertainty principle','Entanglement']},
    {q:'Who proved Fermats Last Theorem?',a:'Andrew Wiles',w:['Pierre de Fermat','Kurt Godel','Henri Poincare']},
    {q:'What is the Riemann Hypothesis about?',a:'Distribution of prime numbers',w:['Prime factorization','Infinite series','Complex analysis']},
    {q:'What is the Haversine formula used for?',a:'Great-circle distance',w:['Tidal calculations','Orbital mechanics','Gravitational lensing']},
    {q:'What is the Godel Incompleteness Theorem?',a:'Some truths cannot be proven',w:['All math is consistent','Logic is complete','Numbers are finite']},
    {q:'What is quantum entanglement?',a:'Correlated quantum states',w:['Particle fusion','Wave collapse','Energy transfer']},
    {q:'Who developed the Standard Model?',a:'Multiple physicists',w:['Einstein alone','Bohr and Heisenberg','Feynman alone']},
    {q:'What is the Navier-Stokes equation?',a:'Fluid dynamics',w:['Quantum mechanics','General relativity','Thermodynamics']},
    {q:'What is the Busy Beaver problem?',a:'Uncomputable function',w:['Graph theory','Neural networks','Encryption']},
    {q:'What is the Langlands program?',a:'Unified number theory',w:['String theory','Quantum gravity','Topology']},
    {q:'What is P vs NP?',a:'Complexity theory problem',w:['Graph coloring','Sorting algorithm','Data structure']},
    {q:'What is the abc conjecture?',a:'Number theory conjecture',w:['Algebraic conjecture','Geometric conjecture','Statistical conjecture']},
    {q:'What is the Monty Hall problem?',a:'Conditional probability',w:['Game theory','Statistics paradox','Bayesian logic']},
    {q:'What is Kolmogorov complexity?',a:'Algorithmic information',w:['Neural complexity','Graph complexity','Quantum complexity']},
    {q:'What is the mass of a Higgs boson?',a:'125.1 GeV/c²',w:['91.2 GeV/c²','80.4 GeV/c²','173 GeV/c²']},
    {q:'What is AdS/CFT correspondence?',a:'String theory/gauge duality',w:['M-theory','Brane cosmology','Loop quantum gravity']},
    {q:'What is Ramanujan known for?',a:'Number theory prodigy',w:['Set theory founder','Calculus inventor','Topology pioneer']},
    {q:'What is the Banach-Tarski paradox?',a:'Ball can be doubled',w:['Infinite series diverge','Primes are infinite','Sets are uncountable']},
    {q:'What is the Yang-Mills existence problem?',a:'Mass gap in QFT',w:['Particle spin','Field equations','Wave functions']},
    {q:'What is Turings halting problem?',a:'Undecidable computation',w:['Sorting problem','Search problem','Encryption problem']},
    {q:'What is the holographic principle?',a:'3D info in 2D boundary',w:['Light refraction','Quantum tunneling','Dark matter']},
    {q:'What is entropy in information theory?',a:'Measure of uncertainty',w:['Data compression','Signal noise','Error correction']},
    {q:'What is supersymmetry?',a:'Fermion-boson symmetry',w:['String symmetry','Gauge symmetry','CPT symmetry']},
    {q:'What is the Collatz conjecture?',a:'3n+1 always reaches 1',w:['Primes are infinite','Goldbach proved','Twin primes exist']},
    {q:'What is the significance of e^(iπ)+1=0?',a:'Euler identity',w:['Fourier identity','Gauss identity','Riemann identity']},
    {q:'What is the four color theorem?',a:'Maps need 4 colors max',w:['Graphs have 4 colors','Groups have 4 elements','Sets have 4 types']},
    {q:'What is Goldbach conjecture?',a:'Every even number = 2 primes',w:['Primes are infinite','Twin primes exist','Mersenne primes']},
    {q:'What is the Birch and Swinnerton-Dyer conjecture?',a:'Elliptic curve points',w:['Prime distribution','Complex zeros','Algebraic integers']},
    {q:'What is the Poincare conjecture?',a:'3D sphere homeomorphism',w:['Riemann surface','Manifold classification','Knot theory']}
  ];
  var q=ALL[Math.min(ALL.length-1,Math.floor(level/30*ALL.length)+Math.floor(Math.random()*4))];
  var opts=[q.a].concat(q.w).sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(8,25-level);var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🏆 Expert Trivia','#fbbf24');
  h+='<div style="background:rgba(255,255,255,.08);border-radius:14px;padding:18px;margin-bottom:14px;text-align:center;">';
  h+='<div style="font-size:30px;margin-bottom:8px;">🎓</div>';
  h+='<div style="font-size:14px;font-weight:700;color:var(--text);line-height:1.5;">'+q.q+'</div>';
  if(level>=5)h+='<div id="ex-timer" style="font-size:20px;font-weight:900;margin-top:8px;color:'+(timer<=8?'#ef4444':'#fbbf24')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr;gap:8px;">';
  opts.forEach(function(opt){h+='<button onclick="exAns(\''+opt.replace(/'/g,"\\'")+'\')" style="padding:12px 16px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:13px;font-weight:600;color:var(--text);text-align:left;transition:all .15s;" onmouseover="this.style.background=\'rgba(251,191,36,.3)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';});
  h+='</div>';
  g.innerHTML=h;
  if(level>=5){window._exTimer=setInterval(function(){timer--;var te=document.getElementById('ex-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=8?'#ef4444':'#fbbf24';}if(timer<=0){clearInterval(window._exTimer);_LVL.lose();setTimeout(function(){gameExpertQuiz();},800);}},1000);}
  window.exAns=function(val){lockBtns();if(window._exTimer)clearInterval(window._exTimer);if(val===q.a){_LVL.win(50);showScorePop('+50!');setTimeout(function(){gameExpertQuiz();},700);}else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===q.a)b.style.background='rgba(34,197,94,.5)';else if(b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.disabled=true;});if(alive)setTimeout(function(){gameExpertQuiz();},1500);}};
}


function gameMemory(){
  _LVL.init('memory',40);
  var level=_LVL.level;
  var COLS=level<=5?2:level<=15?3:level<=25?4:level<=35?5:6;
  var ROWS=level<=5?2:level<=15?3:level<=25?3:level<=35?4:4;
  var TOTAL=COLS*ROWS;
  var EMOJIS=['🎮','⚡','🌟','🎯','🔥','💎','🏆','🎪','🎭','🎨','🎵','🎸','🦄','🐉','🌈','🚀','🌙','⭐','🎲','🃏','🦁','🐯','🦊','🐺'];
  var pairs=EMOJIS.slice(0,TOTAL/2);
  var cards=pairs.concat(pairs).sort(function(){return Math.random()-.5;});
  var revealed=[];var matched=[];var flipping=false;var moves=0;
  var maxMoves=Math.floor(TOTAL*1.5+level*0.5);
  window.memRender=function(){
    var g=gw();if(!g)return;
    var h=_LVL.renderHeader('🃏 Memory Cards','#f472b6');
    h+='<div style="display:flex;justify-content:space-between;margin-bottom:8px;font-size:13px;font-weight:600;color:var(--muted);">';
    h+='<div>Moves: <strong style="color:var(--text);">'+moves+'</strong>/'+maxMoves+'</div>';
    h+='<div>Pairs: <strong style="color:#22c55e;">'+matched.length/2+'</strong>/'+(TOTAL/2)+'</div>';
    h+='</div>';
    h+='<div style="display:grid;grid-template-columns:repeat('+COLS+',1fr);gap:6px;">';
    cards.forEach(function(card,i){
      var isRev=revealed.includes(i)||matched.includes(i);
      var isMatch=matched.includes(i);
      h+='<div onclick="memClick('+i+')" style="aspect-ratio:1;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:'+(level<=15?24:20)+'px;cursor:pointer;background:'+(isMatch?'#dcfce7':isRev?'#eef2ff':'#e2e8f0')+';border:2px solid '+(isMatch?'#86efac':isRev?'#a5b4fc':'#cbd5e1')+';transition:all .2s;'+(isMatch?'transform:scale(1.05);':'')+'">'+( isRev?card:'')+'</div>';
    });
    h+='</div>';
    g.innerHTML=h;
  }
  window.memClick=function(i){
    if(flipping||matched.includes(i)||revealed.includes(i))return;
    revealed.push(i);moves++;
    if(revealed.length===2){
      flipping=true;
      if(cards[revealed[0]]===cards[revealed[1]]){
        matched=matched.concat(revealed);revealed=[];flipping=false;
        playSound('score');showScorePop('+10');
        if(matched.length===TOTAL){_LVL.win(60);showScorePop('+60!');setTimeout(function(){gameMemory();},1500);}
        else window.memRender();
      }else{
        window.memRender();
        setTimeout(function(){revealed=[];flipping=false;if(moves>=maxMoves){_LVL.lose();setTimeout(function(){gameMemory();},1000);}else window.memRender();},1000);
      }
    }else window.memRender();
  };
  window.memRender();
}


function gameMemHard(){startMemory(5,10,'memhard');}
function startMemory(cols,pairs,key){
  var emojis=shuffle(MEM_EMOJIS).slice(0,pairs);
  var cards=shuffle([...emojis,...emojis]).map((e,i)=>({emoji:e,id:i,flipped:false,matched:false}));
  window._memCards=cards;window._memFlipped=[];window._memMatches=0;window._memMoves=0;window._memCols=cols;window._memPairs=pairs;
  renderMem();
}
function renderMem(){
  var c=window._memCards;const cols=window._memCols;
  gw().innerHTML=`<h2>🃏 Memory Cards</h2><div style="font-size:14px;color:#888;margin-bottom:8px;">Moves: ${window._memMoves} | Pairs: ${window._memMatches}/${window._memPairs}</div><div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;max-width:${cols*60}px;margin:0 auto;">${c.map((card,i)=>`<div onclick="memClick(${i})" style="width:52px;height:52px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;background:${card.flipped||card.matched?'#fff':'#3498db'};border:2px solid ${card.matched?'#2ecc71':'#bbb'};transition:all .2s;">${card.flipped||card.matched?card.emoji:'?'}</div>`).join('')}</div>`;
}
function memClick(i){
  if(window._memFlipped.length===2||window._memCards[i].flipped||window._memCards[i].matched)return;
  window._memCards[i].flipped=true;
  window._memFlipped.push(i);
  if(window._memFlipped.length===2){
    window._memMoves++;
    var [a,b]=window._memFlipped;
    if(window._memCards[a].emoji===window._memCards[b].emoji){
      window._memCards[a].matched=true;window._memCards[b].matched=true;
      window._memMatches++;window._memFlipped=[];
      renderMem();
      if(window._memMatches===window._memPairs){setTimeout(()=>gw().innerHTML+=`<div style="font-size:28px;margin-top:12px;">🏆 Done in ${window._memMoves} moves!</div>`,200);}
    } else {
      renderMem();
      setTimeout(()=>{window._memCards[a].flipped=false;window._memCards[b].flipped=false;window._memFlipped=[];renderMem();},900);
    }
  } else renderMem();
}

/* TIC TAC TOE */
function gameTTT(){
  _LVL.init('ttt',20);
  var level=_LVL.level;
  var board=Array(9).fill(null);var turn='X';var over=false;
  var aiStrength=Math.min(10,Math.floor(level/2)); // 1-10 AI difficulty
  function wins(b,p){var L=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];return L.some(function(l){return l.every(function(i){return b[i]===p;});});}
  function isDraw(b){return b.every(Boolean)&&!wins(b,'X')&&!wins(b,'O');}
  function minimax(b,isMax,depth){
    if(wins(b,'O'))return 10-depth;if(wins(b,'X'))return depth-10;if(b.every(Boolean))return 0;
    var best=isMax?-Infinity:Infinity;
    b.forEach(function(_,i){if(!b[i]){b[i]=isMax?'O':'X';var v=minimax(b,!isMax,depth+1);b[i]=null;best=isMax?Math.max(best,v):Math.min(best,v);}});
    return best;
  }
  function aiMove(){
    if(aiStrength>=8){
      var best=-Infinity,move=null;
      board.forEach(function(_,i){if(!board[i]){board[i]='O';var v=minimax(board,false,0);board[i]=null;if(v>best){best=v;move=i;}}});
      return move;
    }else if(aiStrength>=5){
      // Sometimes optimal, sometimes random
      if(Math.random()<0.6){var best2=-Infinity,move2=null;board.forEach(function(_,i){if(!board[i]){board[i]='O';var v=minimax(board,false,0);board[i]=null;if(v>best2){best2=v;move2=i;}}});return move2;}
    }
    var empty=board.map(function(_,i){return i;}).filter(function(i){return !board[i];});
    return empty[Math.floor(Math.random()*empty.length)];
  }
  window.tttRender=function(msg){
    var g=gw();if(!g)return;
    var h=_LVL.renderHeader('⭕ Tic Tac Toe','#a78bfa');
    h+='<div style="text-align:center;margin-bottom:10px;">';
    if(msg)h+='<div style="font-size:15px;font-weight:700;color:'+(msg.includes('win')||msg.includes('Win'))?'#22c55e':'#ef4444'+';margin-bottom:8px;">'+msg+'</div>';
    else h+='<div style="font-size:14px;color:rgba(255,255,255,.6);margin-bottom:8px;">Your turn (X) — AI Level '+aiStrength+'</div>';
    h+='</div>';
    h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:240px;margin:0 auto 12px;">';
    board.forEach(function(cell,i){
      var col=cell==='X'?'#60a5fa':cell==='O'?'#f472b6':'rgba(255,255,255,.8)';
      h+='<div onclick="tttClick('+i+')" style="aspect-ratio:1;border-radius:12px;background:rgba(255,255,255,.1);border:2px solid rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;font-size:36px;font-weight:900;cursor:pointer;color:'+col+';transition:all .15s;" onmouseover="this.style.background=\'rgba(255,255,255,.2)\'" onmouseout="this.style.background=\'rgba(255,255,255,.1)\'">'+( cell||'')+'</div>';
    });
    h+='</div>';
    h+='<div style="text-align:center;"><button onclick="gameTTT()" class="btn btn-sec" style="padding:8px 20px;font-size:13px;border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7);">New Game</button></div>';
    g.innerHTML=h;
  }
  window.tttClick=function(i){
    if(board[i]||over||turn!=='X')return;
    board[i]='X';
    if(wins(board,'X')){over=true;_LVL.win(30);showScorePop('+30');window.tttRender('🎉 You win!');return;}
    if(isDraw(board)){over=true;window.tttRender('Draw!');return;}
    turn='O';window.tttRender();
    setTimeout(function(){
      var ai=aiMove();if(ai===null||ai===undefined)return;
      board[ai]='O';
      if(wins(board,'O')){over=true;_LVL.lose();window.tttRender('😔 AI wins!');return;}
      if(isDraw(board)){over=true;window.tttRender('Draw!');return;}
      turn='X';window.tttRender();
    },400);
  };
  window.tttRender();
}


function checkTTT(b){for(const [a,c,d] of TTT_LINES)if(b[a]&&b[a]===b[c]&&b[a]===b[d])return b[a];if(b.every(v=>v))return'Draw';return null;}
function tttClick(i){
  if(window._tttBoard[i]||window._tttTurn!=='X')return;
  window._tttBoard[i]='X';
  var r=checkTTT(window._tttBoard);
  if(r){renderTTT(r==='Draw'?'Draw!':'🏆 You Win!');return;}
  window._tttTurn='O';
  renderTTT('CPU thinking...');
  setTimeout(()=>{
    aiTTT();
    var r2=checkTTT(window._tttBoard);
    if(r2){renderTTT(r2==='Draw'?'Draw!':'😢 CPU Wins!');return;}
    window._tttTurn='X';renderTTT('Your turn (X)');
  },400);
}
function aiTTT(){
  var b=window._tttBoard;
  for(const [a,c,d] of TTT_LINES){const line=[b[a],b[c],b[d]];if(line.filter(v=>v==='O').length===2&&line.includes('')){const idx=[a,c,d][line.indexOf('')];b[idx]='O';return;}}
  for(const [a,c,d] of TTT_LINES){const line=[b[a],b[c],b[d]];if(line.filter(v=>v==='X').length===2&&line.includes('')){const idx=[a,c,d][line.indexOf('')];b[idx]='O';return;}}
  if(!b[4])b[4]='O';
  else{const corners=[0,2,6,8].filter(i=>!b[i]);if(corners.length)b[pick(corners)]='O';else{const emp=b.map((_,i)=>i).filter(i=>!b[i]);if(emp.length)b[pick(emp)]='O';}}
}

/* HANGMAN */
var HM_WORDS=['JAVASCRIPT','PYTHON','ELEPHANT','UNIVERSITY','CHALLENGE','KEYBOARD','MONITOR','QUANTUM','GRAVITY','SYMPHONY','ALGORITHM','DINOSAUR','ASTRONAUT','CHOCOLATE','ADVENTURE'];
function gameHangman(){
  _LVL.init('hangman',50);
  var level=_LVL.level;
  var WORDS_BY_TIER=[
    ['CAT','DOG','SUN','CAR','BOX','BEE','ANT','OWL','JAR','CUP'],
    ['APPLE','BREAD','CLOUD','DANCE','EARTH','FLAME','GRAPE','HOUSE','IVORY','JEWEL'],
    ['BRIDGE','CASTLE','DESERT','EMPIRE','FOREST','GARDEN','HARBOR','INSECT','JUNGLE','KNIGHT'],
    ['ABSOLUTE','BACTERIA','CALENDAR','DIAMETER','ELECTRON','FRACTURE','GORGEOUS','HERITAGE','IMMINENT','JUNCTION'],
    ['ALGORITHM','BASKETBALL','CHRYSALIS','DEMOCRACY','EARTHQUAKES','FAHRENHEIT','GOALKEEPER','HELICOPTER','ILLUMINATE','JAVASCRIPT'],
    ['ARCHITECTURE','BIBLIOGRAPHY','CIRCUMSTANCE','DISINTEGRATE','ENCYCLOPEDIA','FLUORESCENCE','GALVANIZATION','HALLUCINATION','INDETERMINATE','JUXTAPOSITION']
  ];
  var tier=Math.min(5,Math.floor(level/8));
  var word=WORDS_BY_TIER[tier][Math.floor(Math.random()*10)];
  var maxWrong=Math.max(3,7-Math.floor(level/10));
  var guessed=[];var wrong=0;
  var HANGMAN_PARTS=[
    '<circle cx="120" cy="40" r="18" stroke="#ef4444" stroke-width="3" fill="none"/>',
    '<line x1="120" y1="58" x2="120" y2="110" stroke="#ef4444" stroke-width="3"/>',
    '<line x1="120" y1="75" x2="90" y2="100" stroke="#ef4444" stroke-width="3"/>',
    '<line x1="120" y1="75" x2="150" y2="100" stroke="#ef4444" stroke-width="3"/>',
    '<line x1="120" y1="110" x2="95" y2="140" stroke="#ef4444" stroke-width="3"/>',
    '<line x1="120" y1="110" x2="145" y2="140" stroke="#ef4444" stroke-width="3"/>'
  ];
  window.hmRender=function(){
    var g=gw();if(!g)return;
    var h=_LVL.renderHeader('🪝 Hangman','#a78bfa');
    // SVG Hangman
    h+='<svg width="240" height="160" style="display:block;margin:0 auto 12px;" viewBox="0 0 240 160">';
    h+='<line x1="20" y1="155" x2="220" y2="155" stroke="#64748b" stroke-width="3"/>';
    h+='<line x1="60" y1="155" x2="60" y2="10" stroke="#64748b" stroke-width="3"/>';
    h+='<line x1="60" y1="10" x2="120" y2="10" stroke="#64748b" stroke-width="3"/>';
    h+='<line x1="120" y1="10" x2="120" y2="22" stroke="#64748b" stroke-width="2"/>';
    for(var i=0;i<Math.min(wrong,HANGMAN_PARTS.length);i++)h+=HANGMAN_PARTS[i];
    h+='</svg>';
    // Word display
    h+='<div style="text-align:center;margin-bottom:12px;">';
    h+='<div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:8px;">';
    word.split('').forEach(function(letter){
      h+='<div style="width:32px;height:36px;border-bottom:3px solid '+(guessed.includes(letter)?'#22c55e':'#6366f1')+';display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;color:#1e293b;">'+(guessed.includes(letter)?letter:'')+'</div>';
    });
    h+='</div>';
    h+='<div style="font-size:13px;color:#ef4444;font-weight:600;">Wrong: '+wrong+'/'+maxWrong+'</div>';
    h+='</div>';
    // Keyboard
    h+='<div style="display:flex;flex-wrap:wrap;gap:4px;justify-content:center;">';
    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function(l){
      var used=guessed.includes(l);var correct=word.includes(l)&&used;var wrong2=!word.includes(l)&&used;
      h+='<button onclick="hmGuess(\''+l+'\')" '+(used?'disabled':'')+' style="width:32px;height:32px;border-radius:6px;border:1.5px solid '+(correct?'#22c55e':wrong2?'#ef4444':'#e2e8f0')+';background:'+(correct?'#dcfce7':wrong2?'#fef2f2':'#fff')+';cursor:'+(used?'default':'pointer')+';font-size:12px;font-weight:700;color:'+(correct?'#15803d':wrong2?'#dc2626':'#1e293b')+';">'+l+'</button>';
    });
    h+='</div>';
    g.innerHTML=h;
  }
  window.hmGuess=function(letter){
    guessed.push(letter);
    if(!word.includes(letter)){wrong++;}
    var won=word.split('').every(function(l){return guessed.includes(l);});
    if(won){_LVL.win(50);showScorePop('+50');window.hmRender();setTimeout(function(){gameHangman();},1500);}
    else if(wrong>=maxWrong){_LVL.lose();window.hmRender();var g=gw();if(g){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:10px;background:#fef2f2;border-radius:10px;margin-top:8px;font-weight:700;color:#dc2626;';fb.textContent='The word was: '+word;g.appendChild(fb);}setTimeout(function(){gameHangman();},2000);}
    else window.hmRender();
  };
  window.hmRender();
}


function hmGuess(l){
  if(window._hmGuessed.has(l))return;
  window._hmGuessed.add(l);
  if(!window._hmWord.includes(l))window._hmWrong++;
  renderHM();
}

/* MATH QUIZ */
function gameMathQuiz(){
  _LVL.init('mathquiz',50);
  var level=_LVL.level;
  var ops=['+','-'];
  if(level>8)ops.push('*');
  if(level>18)ops.push('/');
  var op=ops[Math.floor(Math.random()*ops.length)];
  var max=Math.min(500,10+level*8);
  var a,b,ans;
  if(op==='+'){ a=rnd(1,max);b=rnd(1,max);ans=a+b; }
  else if(op==='-'){ a=rnd(max/2|0,max);b=rnd(1,a);ans=a-b; }
  else if(op==='*'){ a=rnd(2,Math.min(25,5+level));b=rnd(2,Math.min(25,5+level));ans=a*b; }
  else{ ans=rnd(2,Math.min(20,4+level));b=rnd(2,Math.min(15,3+level));a=ans*b; }
  var sym={'+':'+','-':'-','*':'×','/':'÷'}[op];
  var opts=[ans];
  while(opts.length<4){var w=ans+rnd(-Math.max(10,ans/3|0),Math.max(10,ans/3|0));if(w>0&&w!==ans&&!opts.includes(w))opts.push(w);}
  opts.sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(4,12-Math.floor(level/6));var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🔢 Math Quiz','#fb923c');
  h+='<div style="text-align:center;background:rgba(255,255,255,.08);padding:24px;border-radius:16px;margin-bottom:14px;">';
  h+='<div style="font-size:44px;font-weight:900;color:var(--text);letter-spacing:2px;">'+a+' '+sym+' '+b+' = ?</div>';
  if(level>=5)h+='<div id="mq-timer" style="font-size:22px;font-weight:900;margin-top:8px;color:'+(timer<=4?'#ef4444':'#fb923c')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  opts.forEach(function(opt){
    h+='<button onclick="mqAns('+opt+')" style="padding:18px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:24px;font-weight:900;color:var(--text);transition:all .15s;" onmouseover="this.style.background=\'rgba(251,146,60,.4)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';
  });
  h+='</div>';
  g.innerHTML=h;
  if(level>=5){
    window._mqTimer=setInterval(function(){timer--;var te=document.getElementById('mq-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=4?'#ef4444':'#fb923c';}if(timer<=0){clearInterval(window._mqTimer);_LVL.lose();setTimeout(function(){gameMathQuiz();},800);}},1000);
  }
  window.mqAns=function(val){
    if(window._mqTimer)clearInterval(window._mqTimer);
    if(val===ans){_LVL.win(20);showScorePop('+20');setTimeout(function(){gameMathQuiz();},600);}
    else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(+b.textContent===ans)b.style.background='rgba(34,197,94,.5)';else if(+b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.style.color='#fff';b.disabled=true;});if(alive)setTimeout(function(){gameMathQuiz();},1000);}
  };
}


function mqAns(chosen,correct){window._mqQ++;if(chosen===correct)window._mqScore++;nextMathQ();}

/* TYPING SPEED */
var TYPING_SENTENCES=['The quick brown fox jumps over the lazy dog','Pack my box with five dozen liquor jugs','How vexingly quick daft zebras jump','The five boxing wizards jump quickly','Sphinx of black quartz judge my vow','Two driven jocks help fax my big quiz','The jay pig fox zebra and my wolves quack'];
function gameTyping(){
  _LVL.init('typing',40);
  var level=_LVL.level;
  var TEXTS=[
    'the quick brown fox jumps over the lazy dog',
    'pack my box with five dozen liquor jugs',
    'how vexingly quick daft zebras jump',
    'sphinx of black quartz judge my vow',
    'two driven jocks help fax my big quiz',
    'five quacking zephyrs jolt my wax bed',
    'the five boxing wizards jump quickly',
    'jackdaws love my big sphinx of quartz',
    'fix problem quickly with galvanized jets',
    'amazingly few discotheques provide jukeboxes',
    'the early bird catches the worm but the second mouse gets the cheese',
    'practice makes perfect so keep typing every single day to improve your speed',
    'technology has transformed the way we communicate work and live our daily lives',
    'the art of programming is the art of organizing complexity and managing details',
    'success is not final failure is not fatal it is the courage to continue that counts'
  ];
  var textIdx=Math.min(TEXTS.length-1,Math.floor(level/3));
  var text=TEXTS[textIdx];
  var duration=Math.max(20,60-level);
  var timeLeft=duration;var started=false;var timerInt;var typed=0;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('⌨️ Typing Speed','#60a5fa');
  h+='<div id="typing-text" style="font-size:16px;line-height:1.8;background:rgba(255,255,255,.08);padding:14px;border-radius:12px;margin-bottom:10px;font-family:monospace;letter-spacing:.05em;">'+text.split('').map(function(c,i){return '<span id="tc-'+i+'">'+c+'</span>';}).join('')+'</div>';
  h+='<div style="display:flex;gap:8px;margin-bottom:8px;align-items:center;">';
  h+='<div id="typing-timer" style="font-size:22px;font-weight:900;color:#6366f1;min-width:50px;">'+duration+'s</div>';
  h+='<div style="flex:1;background:rgba(255,255,255,.1);border-radius:99px;height:8px;">';
  h+='<div id="typing-prog" style="background:#6366f1;height:8px;border-radius:99px;width:100%;transition:width .1s;"></div></div>';
  h+='<div id="typing-wpm" style="font-size:18px;font-weight:700;min-width:70px;text-align:right;">0 WPM</div>';
  h+='</div>';
  h+='<input id="typing-inp" type="text" placeholder="Start typing here..." style="width:100%;padding:14px;border-radius:12px;border:2px solid #e2e8f0;font-size:16px;font-family:monospace;outline:none;box-sizing:border-box;" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">';
  g.innerHTML=h;
  var inp=document.getElementById('typing-inp');
  if(inp)inp.focus();
  inp.oninput=function(){
    if(!started){
      started=true;
      timerInt=setInterval(function(){
        timeLeft--;
        var te=document.getElementById('typing-timer');if(te){te.textContent=timeLeft+'s';te.style.color=timeLeft<=10?'#ef4444':'#6366f1';}
        var pg=document.getElementById('typing-prog');if(pg)pg.style.width=(timeLeft/duration*100)+'%';
        if(timeLeft<=0){
          clearInterval(timerInt);
          var val=inp.value||'';
          var words=val.trim().split(/\s+/).filter(Boolean).length;
          var wpm=Math.round(words/(duration/60));
          var targetWpm=30+level*2;
          if(wpm>=targetWpm){_LVL.win(wpm);showScorePop(wpm+' WPM!');}else{_LVL.lose();}
          var g2=gw();if(g2){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:14px;background:rgba(255,255,255,.1);border-radius:12px;margin-top:10px;';fb.innerHTML='<div style="font-size:28px;font-weight:900;">'+wpm+' WPM</div><div style="font-size:13px;color:rgba(255,255,255,.6);">Target: '+targetWpm+' WPM</div>';g2.appendChild(fb);}
          setTimeout(function(){gameTyping();},2000);
        }
      },1000);
    }
    var val=inp.value;
    var words=val.trim().split(/\s+/).filter(Boolean).length;
    var elapsed=(duration-timeLeft)||1;
    var wpm=Math.round(words/(elapsed/60));
    var we=document.getElementById('typing-wpm');if(we)we.textContent=wpm+' WPM';
    // Color highlight
    for(var i=0;i<text.length;i++){
      var sp=document.getElementById('tc-'+i);
      if(!sp)continue;
      if(i>=val.length){sp.style.color='';sp.style.background='';}
      else if(val[i]===text[i]){sp.style.color='#22c55e';sp.style.background='rgba(34,197,94,.1)';}
      else{sp.style.color='#ef4444';sp.style.background='rgba(239,68,68,.1)';}
    }
  };
}


function gameAnagram(){
  _LVL.init('anagram',45);
  var level=_LVL.level;
  var PAIRS_BY_TIER=[
    [['LISTEN','SILENT'],['HEART','EARTH'],['RACE','CARE'],['STOP','TOPS'],['PALM','LAMP']],
    [['GARDEN','DANGER'],['MASTER','STREAM'],['RESCUE','SECURE'],['GRAPES','GASPER'],['STABLE','TABLES']],
    [['PLANETS','PLATENS'],['TEACHER','CHEATER'],['KITCHEN','THICKEN'],['LIBRARY','BRARILY'],['PAINTER','PERTAIN']],
    [['SCULPTURE','CUPRITES'],['ADVENTURE','EVENTURAD'],['ALGORITHM','LOGARITHM'],['EDUCATION','AUDACIOUS'],['SECRETARY','YACHTERS']],
    [['LOGARITHMS','ALGORITHMS'],['SCHOOLMASTER','CLASSROOM HE'],['CONVERSATION','VOICES RANT ON'],['ASTRONOMER','MOON STARER'],['PRESBYTERIAN','BRITNEY SPEARS']]
  ];
  var tier=Math.min(4,Math.floor(level/9));
  var pair=PAIRS_BY_TIER[tier][Math.floor(Math.random()*5)];
  var word=pair[0],answer=pair[1];
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🔤 Anagram','#4ade80');
  h+='<div style="text-align:center;margin-bottom:16px;">';
  h+='<div style="font-size:13px;color:var(--muted);margin-bottom:8px;">Rearrange these letters to make a new word:</div>';
  h+='<div style="font-size:36px;font-weight:900;letter-spacing:6px;color:#6366f1;background:rgba(99,102,241,.1);padding:16px;border-radius:12px;">'+word+'</div>';
  h+='</div>';
  h+='<input id="ag-inp" type="text" placeholder="Type the anagram..." style="width:100%;padding:14px;border-radius:12px;border:2px solid #e2e8f0;font-size:18px;font-weight:700;text-transform:uppercase;text-align:center;font-family:inherit;outline:none;box-sizing:border-box;margin-bottom:10px;" onkeydown="if(event.key===\'Enter\')agCheck();">';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  h+='<button class="btn" onclick="agCheck()" style="padding:14px;font-size:16px;">Check</button>';
  h+='<button class="btn btn-sec" onclick="agHint()" style="padding:14px;font-size:16px;">💡 Hint</button>';
  h+='</div>';
  h+='<div id="ag-hint-text" style="text-align:center;margin-top:8px;color:var(--muted);font-size:13px;"></div>';
  g.innerHTML=h;
  document.getElementById('ag-inp').focus();
  window.agCheck=function(){
    var val=(document.getElementById('ag-inp').value||'').trim().toUpperCase().replace(/\s+/g,'');
    var ans=answer.toUpperCase().replace(/\s+/g,'');
    if(val===ans){_LVL.win(35);showScorePop('+35');var g2=gw();if(g2){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:12px;background:#dcfce7;border-radius:10px;margin-top:10px;font-weight:700;color:#15803d;';fb.textContent='Correct! '+word+' → '+answer;g2.appendChild(fb);}setTimeout(function(){gameAnagram();},1500);}
    else{var alive=_LVL.lose();var inp=document.getElementById('ag-inp');if(inp){inp.style.borderColor='#ef4444';inp.value='';}var ht=document.getElementById('ag-hint-text');if(ht)ht.textContent='Wrong! Answer: '+answer;if(alive)setTimeout(function(){gameAnagram();},1800);}
  };
  window.agHint=function(){var ht=document.getElementById('ag-hint-text');if(ht)ht.textContent='Starts with: '+answer[0]+' ('+answer.length+' letters)';};
}


function nextAG(){
  var pair=pick(AG_WORDS).split('/');
  window._agWord=pair[0].toUpperCase();window._agTarget=pair[1].toUpperCase();
  gw().innerHTML=`<h2>🔤 Anagram</h2><p>Make a new word from these letters!</p><div style="font-size:42px;letter-spacing:6px;margin:16px;font-weight:700;color:#3498db;">${window._agWord}</div><input id="ag-in" type="text" maxlength="${window._agWord.length}" style="font-size:22px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:160px;" onkeydown="if(event.key==='Enter')checkAG()"><br><button class="g-btn" style="margin-top:10px;" onclick="checkAG()">Submit</button><button class="g-btn" style="background:#95a5a6;margin-top:10px;" onclick="nextAG()">Skip</button><div id="ag-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('ag-in').focus();
}
function checkAG(){
  var v=document.getElementById('ag-in').value.toUpperCase().trim();
  var msg=document.getElementById('ag-msg');
  var sorted=s=>[...s].sort().join('');
  if(sorted(v)===sorted(window._agWord)&&v!==window._agWord&&v.length===window._agWord.length){
    msg.style.color='#2ecc71';msg.textContent=`✅ Correct! (was "${window._agTarget}")`;setTimeout(nextAG,1200);
  } else {
    msg.style.color='#e74c3c';msg.textContent='❌ Try again! Use the same letters.';
  }
}

/* TIMES TABLES */
function gameTimes(){
  _LVL.init('times',50);
  var level=_LVL.level;
  var maxTable=Math.min(20,2+Math.floor(level/3));
  var a=rnd(2,maxTable),b=rnd(2,maxTable),ans=a*b;
  var opts=[ans];
  while(opts.length<4){var w=ans+rnd(-ans/2|0,ans/2|0);if(w>0&&w!==ans&&!opts.includes(w))opts.push(w);}
  opts.sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(3,10-Math.floor(level/6));var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('✖️ Times Tables','#fb923c');
  h+='<div style="text-align:center;background:rgba(255,255,255,.08);padding:28px;border-radius:16px;margin-bottom:14px;">';
  h+='<div style="font-size:52px;font-weight:900;color:var(--text);letter-spacing:3px;">'+a+' × '+b+' = ?</div>';
  h+='<div style="font-size:13px;color:rgba(255,255,255,.5);margin-top:6px;">Tables up to '+maxTable+'</div>';
  if(level>=5)h+='<div id="tt-timer" style="font-size:22px;font-weight:900;margin-top:8px;color:'+(timer<=3?'#ef4444':'#fb923c')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  opts.forEach(function(opt){h+='<button onclick="ttAns('+opt+')" style="padding:18px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:26px;font-weight:900;color:var(--text);transition:all .15s;" onmouseover="this.style.background=\'rgba(251,146,60,.4)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';});
  h+='</div>';
  g.innerHTML=h;
  if(level>=5){window._ttTimer=setInterval(function(){timer--;var te=document.getElementById('tt-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=3?'#ef4444':'#fb923c';}if(timer<=0){clearInterval(window._ttTimer);_LVL.lose();setTimeout(function(){gameTimes();},600);}},1000);}
  window.ttAns=function(val){if(window._ttTimer)clearInterval(window._ttTimer);if(val===ans){_LVL.win(10);showScorePop('+10');setTimeout(function(){gameTimes();},400);}else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(+b.textContent===ans)b.style.background='rgba(34,197,94,.5)';else if(+b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.style.color='#fff';b.disabled=true;});if(alive)setTimeout(function(){gameTimes();},800);}};
}


function timesAns(c,a){window._ttQ++;if(c===a)window._ttScore++;nextTimes();}

/* MINESWEEPER */
function gameMines(){startMines(6,6,8,'mines');}
function gameMinesHard(){startMines(10,10,20,'mineshard');}
function startMines(rows,cols,mines,key){
  var total=rows*cols;
  var mineSet=new Set();while(mineSet.size<mines)mineSet.add(rnd(0,total-1));
  var board=Array.from({length:total},(_,i)=>({mine:mineSet.has(i),revealed:false,flagged:false,adj:0}));
  for(let i=0;i<total;i++){
    if(board[i].mine)continue;
    let count=0;
    var r=Math.floor(i/cols),c=i%cols;
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const nr=r+dr,nc=c+dc;if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&board[nr*cols+nc].mine)count++;}
    board[i].adj=count;
  }
  window._msBoard=board;window._msRows=rows;window._msCols=cols;window._msMines=mines;window._msKey=key;window._msOver=false;
  renderMines();
}
function renderMines(){
  var g=gw();
  var b=window._msBoard||[];
  var rows=window._msRows||6, cols=window._msCols||6, mines=window._msMines||8;
  if(!g||!b.length)return;
  var flagged=b.filter(function(c){return c.flagged;}).length;
  var safeLeft=b.filter(function(c){return !c.mine&&!c.revealed;}).length;
  var isHard=rows>=10;
  var maxW=isHard?460:320;
  var cellSize=isHard?34:42;
  var h='';
  h+='<div style="text-align:center;margin-bottom:12px;">';
  h+='<div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">';
  h+='<span style="background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:6px 12px;font-size:12px;font-weight:800;color:#fff;">💣 Mines: '+mines+'</span>';
  h+='<span style="background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:6px 12px;font-size:12px;font-weight:800;color:#fff;">🚩 Flags: '+flagged+'</span>';
  h+='<span style="background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:6px 12px;font-size:12px;font-weight:800;color:#fff;">✅ Safe left: '+safeLeft+'</span>';
  h+='</div>';
  h+='<div style="font-size:11px;color:rgba(255,255,255,.6);margin-bottom:10px;">Left click: open cell · Right click: flag</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:repeat('+cols+','+cellSize+'px);gap:5px;justify-content:center;max-width:'+maxW+'px;margin:0 auto;touch-action:manipulation;">';
  for(var i=0;i<b.length;i++){
    var c=b[i];
    var label='';
    var bg='linear-gradient(135deg,rgba(255,255,255,.22),rgba(255,255,255,.10))';
    var border='rgba(255,255,255,.28)';
    var color='#fff';
    if(c.revealed){
      bg='rgba(255,255,255,.9)';
      border='rgba(255,255,255,.65)';
      color='#312e81';
      if(c.mine){label='💣';bg='linear-gradient(135deg,#fecaca,#f87171)';color='#7f1d1d';}
      else if(c.adj>0){label=c.adj;var numColors=['','#2563eb','#16a34a','#dc2626','#7c3aed','#ea580c','#0891b2','#be123c','#111827'];color=numColors[c.adj]||'#111827';}
    }else if(c.flagged){
      label='🚩';
      bg='linear-gradient(135deg,#fde68a,#fbbf24)';
      color='#78350f';
      border='rgba(251,191,36,.8)';
    }
    h+='<button onclick="msClick('+i+')" oncontextmenu="event.preventDefault();msFlag('+i+');return false;" title="Cell '+(i+1)+'" style="width:'+cellSize+'px;height:'+cellSize+'px;border-radius:10px;border:1px solid '+border+';background:'+bg+';color:'+color+';font-size:'+(isHard?15:18)+'px;font-weight:900;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:inset 0 1px 0 rgba(255,255,255,.35);user-select:none;">'+label+'</button>';
  }
  h+='</div>';
  h+='<div style="text-align:center;margin-top:14px;display:flex;justify-content:center;gap:8px;flex-wrap:wrap;">';
  h+='<button class="btn" onclick="startMines('+rows+','+cols+','+mines+',\''+(window._msKey||'mines')+'\')" style="padding:8px 14px;font-size:12px;">New Game</button>';
  h+='</div>';
  g.innerHTML=h;
}
function msClick(i){
  if(window._msOver)return;
  var b=window._msBoard;if(b[i].revealed||b[i].flagged)return;
  if(b[i].mine){b[i].revealed=true;window._msOver=true;b.forEach(c=>{if(c.mine)c.revealed=true;});renderMines();gw().innerHTML=`<div style="font-size:28px;margin-top:8px;">💥 BOOM! Game Over</div>`+gw().innerHTML.replace('<h2>💣 Minesweeper</h2>','');return;}
  msReveal(i);
  var unrevealed=b.filter(c=>!c.revealed&&!c.mine).length;
  if(unrevealed===0){window._msOver=true;renderMines();gw().innerHTML=`<div style="font-size:28px;margin-top:8px;">🏆 You Won!</div>`+gw().innerHTML.replace('<h2>💣 Minesweeper</h2>','');}
  else renderMines();
}
function msReveal(i){
  var b=window._msBoard;const cols=window._msCols;const rows=window._msRows;
  if(b[i].revealed)return;b[i].revealed=true;
  if(b[i].adj===0&&!b[i].mine){
    var r=Math.floor(i/cols),c=i%cols;
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const nr=r+dr,nc=c+dc;if(nr>=0&&nr<rows&&nc>=0&&nc<cols)msReveal(nr*cols+nc);}
  }
}
function msFlag(i){if(window._msOver)return;const b=window._msBoard;if(b[i].revealed)return;b[i].flagged=!b[i].flagged;renderMines();}

/* WORD CHAIN */
function gameWordChain(){
  _LVL.init('wordchain',35);
  var level=_LVL.level;
  var CHAINS_BY_LEVEL=[
    [['CAT','TOP','PEN','NET','TEN'],'Each word starts with last letter of previous'],
    [['APPLE','EAGLE','EARTH','HAIR','RAIN'],'Words connected by last → first letter'],
    [['BRIDGE','ENERGY','YELLOW','WINDOW','WANDER'],'Longer word chain - think carefully!'],
    [['COMPUTER','RATION','NUMBER','RESULT','TABLE'],'Expert chain - same rule, harder words'],
    [['ALGORITHM','MATRIX','XYLOPHONE','ELEVEN','NATURE'],'Master level word chain'],
  ];
  var tier=Math.min(4,Math.floor(level/7));
  var chain=CHAINS_BY_LEVEL[tier];
  var words=chain[0].slice();var lastWord=words[words.length-1];
  var lastLetter=lastWord[lastWord.length-1].toUpperCase();
  var timeLimit=Math.max(10,30-level);var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🔗 Word Chain','#4ade80');
  h+='<div style="margin-bottom:14px;">';
  h+='<div style="font-size:13px;color:rgba(255,255,255,.6);margin-bottom:10px;">'+chain[1]+'</div>';
  h+='<div style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-bottom:12px;">';
  words.forEach(function(w,i){h+='<span style="background:rgba(255,255,255,.15);border-radius:8px;padding:6px 12px;font-size:15px;font-weight:700;color:var(--text);">'+w+'</span>'+(i<words.length-1?'<span style="color:rgba(255,255,255,.3);">→</span>':'');});
  h+='<span style="color:#4ade80;font-size:18px;font-weight:900;margin-left:4px;">→ ?</span>';
  h+='</div>';
  h+='<div style="background:rgba(99,255,99,.1);border:1px solid rgba(74,222,128,.3);border-radius:10px;padding:10px;text-align:center;margin-bottom:10px;">';
  h+='<div style="font-size:13px;color:#4ade80;font-weight:600;">Next word must start with: <span style="font-size:24px;font-weight:900;">'+lastLetter+'</span></div>';
  h+='</div>';
  if(level>=5)h+='<div id="wc-timer" style="text-align:center;font-size:20px;font-weight:900;margin-bottom:8px;color:'+(timer<=5?'#ef4444':'#4ade80')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<input id="wc-inp" type="text" placeholder="Type a word starting with '+lastLetter+'..." style="width:100%;padding:14px;border-radius:12px;border:2px solid rgba(74,222,128,.3);background:rgba(255,255,255,.08);font-size:16px;font-weight:700;color:var(--text);font-family:inherit;text-transform:uppercase;text-align:center;outline:none;box-sizing:border-box;margin-bottom:10px;" onkeydown="if(event.key===\'Enter\')wcCheck();">';
  h+='<button class="btn" onclick="wcCheck()" style="width:100%;padding:14px;font-size:16px;">Submit Word</button>';
  g.innerHTML=h;
  document.getElementById('wc-inp').focus();
  if(level>=5){window._wcTimer=setInterval(function(){timer--;var te=document.getElementById('wc-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#4ade80';}if(timer<=0){clearInterval(window._wcTimer);_LVL.lose();setTimeout(function(){gameWordChain();},800);}},1000);}
  window.wcCheck=function(){
    if(window._wcTimer)clearInterval(window._wcTimer);
    var val=(document.getElementById('wc-inp').value||'').trim().toUpperCase();
    if(val.length>=2&&val[0]===lastLetter&&!words.includes(val)){
      _LVL.win(20);showScorePop('+20');
      var g2=gw();if(g2){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:10px;background:rgba(34,197,94,.3);border-radius:10px;margin-top:8px;color:#fff;font-weight:700;';fb.textContent='Great! '+lastWord+' → '+val;g2.appendChild(fb);}
      setTimeout(function(){gameWordChain();},1200);
    }else{
      var alive=_LVL.lose();
      var inp=document.getElementById('wc-inp');if(inp){inp.style.borderColor='#ef4444';inp.value='';}
      var msg=val.length<2?'Too short!':val[0]!==lastLetter?'Must start with '+lastLetter+'!':'Already used!';
      var g3=gw();if(g3){var fb2=document.createElement('div');fb2.style.cssText='text-align:center;padding:8px;background:rgba(239,68,68,.3);border-radius:8px;margin-top:6px;color:#fff;font-size:13px;';fb2.textContent=msg;g3.appendChild(fb2);}
      if(alive)setTimeout(function(){gameWordChain();},1500);
    }
  };
}


function gameC4(){
  window._c4Board=Array(42).fill(0);window._c4Turn=1;window._c4Over=false;
  renderC4('Your turn (🔴)');
}
function renderC4(msg){
  var b=window._c4Board;
  var colors=['#e0e0e0','#ef5350','#ffc107'];
  gw().innerHTML=`<h2>🔴 Connect Four</h2><div style="font-size:14px;color:#888;margin-bottom:6px;">${msg}</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-width:280px;margin:0 auto;">${b.map((v,i)=>`<div onclick="c4Drop(${i%7})" style="width:34px;height:34px;border-radius:50%;background:${colors[v]};cursor:pointer;border:2px solid rgba(0,0,0,.1);"></div>`).join('')}</div><button class="g-btn" style="margin-top:12px;" onclick="gameC4()">Restart</button>`;
}
function c4Top(col){for(let r=5;r>=0;r--){if(!window._c4Board[r*7+col])return r;}return -1;}
function c4Check(p){
  var b=window._c4Board;
  var lines=[];
  for(let r=0;r<6;r++)for(let c=0;c<7;c++){
    if(c+3<7)lines.push([r*7+c,r*7+c+1,r*7+c+2,r*7+c+3]);
    if(r+3<6)lines.push([r*7+c,(r+1)*7+c,(r+2)*7+c,(r+3)*7+c]);
    if(c+3<7&&r+3<6)lines.push([r*7+c,(r+1)*7+c+1,(r+2)*7+c+2,(r+3)*7+c+3]);
    if(c-3>=0&&r+3<6)lines.push([r*7+c,(r+1)*7+c-1,(r+2)*7+c-2,(r+3)*7+c-3]);
  }
  return lines.some(l=>l.every(i=>b[i]===p));
}
function c4Drop(col){
  if(window._c4Over||window._c4Turn!==1)return;
  var r=c4Top(col);if(r<0)return;
  window._c4Board[r*7+col]=1;
  if(c4Check(1)){window._c4Over=true;renderC4('🏆 You Win!');return;}
  if(window._c4Board.every(v=>v)){window._c4Over=true;renderC4('Draw!');return;}
  window._c4Turn=2;renderC4('CPU thinking...');
  setTimeout(()=>{
    c4AI();
    if(c4Check(2)){window._c4Over=true;renderC4('😢 CPU Wins!');return;}
    window._c4Turn=1;renderC4('Your turn (🔴)');
  },400);
}
function c4AI(){
  var b=window._c4Board;
  for(let col=0;col<7;col++){const r=c4Top(col);if(r>=0){b[r*7+col]=2;if(c4Check(2)){return;}b[r*7+col]=0;}}
  for(let col=0;col<7;col++){const r=c4Top(col);if(r>=0){b[r*7+col]=1;if(c4Check(1)){b[r*7+col]=0;b[r*7+col]=2;return;}b[r*7+col]=0;}}
  var pref=[3,2,4,1,5,0,6];for(const col of pref){const r=c4Top(col);if(r>=0){b[r*7+col]=2;return;}}
}

/* PATTERN MEMORY */
function gamePatternMem(){
  _LVL.init('patternmem',40);
  var level=_LVL.level;
  var gridSize=Math.min(6,3+Math.floor(level/8));
  var patternLen=Math.min(gridSize*gridSize,2+Math.floor(level/2));
  var pattern=[];var cells=gridSize*gridSize;
  while(pattern.length<patternLen){var c=Math.floor(Math.random()*cells);if(!pattern.includes(c))pattern.push(c);}
  var playerPattern=[];var phase='show';
  var showSpeed=Math.max(300,800-level*15);
  window.pmRender=function(showingIdx){
    var g=gw();if(!g)return;
    var h=_LVL.renderHeader('🔲 Pattern Memory','#f472b6');
    h+='<div style="text-align:center;margin-bottom:10px;">';
    h+='<div style="font-size:13px;font-weight:700;color:rgba(255,255,255,.7);">'+(phase==='show'?'Watch the pattern!':'Repeat the pattern!')+'</div>';
    h+='<div style="font-size:13px;color:rgba(255,255,255,.5);">'+patternLen+' cells to remember</div>';
    h+='</div>';
    h+='<div style="display:grid;grid-template-columns:repeat('+gridSize+',1fr);gap:6px;max-width:300px;margin:0 auto;">';
    for(var i=0;i<cells;i++){
      var isPattern=pattern.includes(i);
      var isShowing=(phase==='show'&&showingIdx!==undefined&&pattern.indexOf(i)<=showingIdx);
      var isClicked=playerPattern.includes(i);
      var isCorrect=isClicked&&pattern.includes(i);
      var bg=isShowing?'#f472b6':(phase==='play'&&isClicked?(isCorrect?'#22c55e':'#ef4444'):'rgba(255,255,255,.1)');
      h+='<div onclick="pmClick('+i+')" style="aspect-ratio:1;border-radius:8px;background:'+bg+';cursor:pointer;border:2px solid rgba(255,255,255,'+(isShowing?'.6':'.15')+');transition:all .15s;box-shadow:'+(isShowing?'0 0 12px #f472b6':'none')+';"></div>';
    }
    h+='</div>';
    if(phase==='play'){
      h+='<div style="text-align:center;margin-top:10px;font-size:13px;color:rgba(255,255,255,.5);">'+playerPattern.length+'/'+patternLen+' selected</div>';
      h+='<button class="btn btn-sec" onclick="pmClear()" style="width:100%;margin-top:8px;padding:10px;border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7);">Clear</button>';
    }
    g.innerHTML=h;
  }
  function showPattern(){
    var i=0;
    function next(){
      window.pmRender(i);
      i++;
      if(i<patternLen)setTimeout(next,showSpeed);
      else setTimeout(function(){phase='play';window.pmRender();},showSpeed+200);
    }
    next();
  }
  window.pmClick=function(idx){
    if(phase!=='play')return;
    if(playerPattern.includes(idx)){playerPattern=playerPattern.filter(function(x){return x!==idx;});window.pmRender();return;}
    playerPattern.push(idx);window.pmRender();
    if(playerPattern.length===patternLen){
      var correct=pattern.every(function(c){return playerPattern.includes(c);});
      if(correct){_LVL.win(30);showScorePop('+30');setTimeout(function(){gamePatternMem();},1000);}
      else{_LVL.lose();setTimeout(function(){gamePatternMem();},1500);}
    }
  };
  window.pmClear=function(){playerPattern=[];window.pmRender();};
  window.pmRender();setTimeout(showPattern,500);
}


function gameSnake(){
  var W=20,H=20,CS=20;
  var snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];
  var dir={x:1,y:0},ndir={x:1,y:0};
  var food={x:15,y:10};
  var score=0,best=+(localStorage.getItem('bestSnake')||0);
  var running=false,paused=false,speed=140;
  var g=gw();if(!g)return;

  g.innerHTML='<div id="snake-wrap" style="text-align:center;user-select:none;">'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;padding:0 4px;">'
    +'<div style="font-size:18px;font-weight:900;color:var(--text);">Snake</div>'
    +'<div style="display:flex;gap:6px;">'
    +'<div id="sn-score" style="background:#dcfce7;color:#15803d;border-radius:6px;padding:4px 10px;font-size:13px;font-weight:700;">0</div>'
    +'<div id="sn-best" style="background:#fef3c7;color:#d97706;border-radius:6px;padding:4px 10px;font-size:13px;font-weight:700;">Best: '+best+'</div>'
    +'</div></div>'
    +'<canvas id="snakeCanvas" width="'+(W*CS)+'" height="'+(H*CS)+'" style="border-radius:10px;border:2px solid #86efac;cursor:pointer;max-width:100%;background:#dcfce7;"></canvas>'
    +'<div id="sn-msg" style="margin:10px 0;font-size:15px;font-weight:700;color:var(--text);">Tap canvas or press Space to start!</div>'
    +'<div style="display:grid;grid-template-columns:repeat(3,44px);gap:6px;justify-content:center;margin:6px auto;">'
    +'<div></div><button class="g-btn" style="width:44px;height:44px;font-size:18px;" onpointerdown="snDir(0,-1)">↑</button><div></div>'
    +'<button class="g-btn" style="width:44px;height:44px;font-size:18px;" onpointerdown="snDir(-1,0)">←</button>'
    +'<button class="g-btn" style="width:44px;height:44px;font-size:18px;" onpointerdown="snPause()">⏸</button>'
    +'<button class="g-btn" style="width:44px;height:44px;font-size:18px;" onpointerdown="snDir(1,0)">→</button>'
    +'<div></div><button class="g-btn" style="width:44px;height:44px;font-size:18px;" onpointerdown="snDir(0,1)">↓</button><div></div>'
    +'</div></div>';

  var canvas=document.getElementById('snakeCanvas');
  var ctx=canvas.getContext('2d');

  function randFood(){
    var pos;
    do{pos={x:rnd(0,W-1),y:rnd(0,H-1)};}
    while(snake.some(function(s){return s.x===pos.x&&s.y===pos.y;}));
    return pos;
  }

  function draw(){
    // Bright kid-friendly board background
    ctx.fillStyle='#dcfce7';ctx.fillRect(0,0,W*CS,H*CS);
    // Grid
    ctx.strokeStyle='rgba(22,163,74,.18)';ctx.lineWidth=1;
    for(var i=0;i<W;i++){ctx.beginPath();ctx.moveTo(i*CS,0);ctx.lineTo(i*CS,H*CS);ctx.stroke();}
    for(var j=0;j<H;j++){ctx.beginPath();ctx.moveTo(0,j*CS);ctx.lineTo(W*CS,j*CS);ctx.stroke();}
    // Food - glowing apple
    ctx.shadowColor='#ff4444';ctx.shadowBlur=10;
    ctx.fillStyle='#ff4444';
    ctx.beginPath();ctx.arc(food.x*CS+CS/2,food.y*CS+CS/2,CS/2-3,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur=0;
    ctx.fillStyle='#ff8888';ctx.beginPath();ctx.arc(food.x*CS+CS/2-2,food.y*CS+CS/2-3,3,0,Math.PI*2);ctx.fill();
    // Snake body
    snake.forEach(function(seg,i){
      var ratio=1-i/snake.length*0.5;
      if(i===0){
        ctx.shadowColor='#00ff88';ctx.shadowBlur=12;
        ctx.fillStyle='#00ff88';
      } else {
        ctx.shadowBlur=0;
        var g2=ctx.createLinearGradient(seg.x*CS,seg.y*CS,(seg.x+1)*CS,(seg.y+1)*CS);
        g2.addColorStop(0,'rgba(0,204,102,'+ratio+')');
        g2.addColorStop(1,'rgba(0,153,76,'+ratio+')');
        ctx.fillStyle=g2;
      }
      var pad=i===0?1:2;
      ctx.beginPath();
      if(ctx.roundRect){ctx.roundRect(seg.x*CS+pad,seg.y*CS+pad,CS-pad*2,CS-pad*2,3);}
      else{ctx.rect(seg.x*CS+pad,seg.y*CS+pad,CS-pad*2,CS-pad*2);}
      ctx.fill();
      ctx.shadowBlur=0;
    });
    // Eyes on head
    var h=snake[0];
    ctx.fillStyle='#0f172a';
    var ex=h.x*CS+CS/2+dir.x*3,ey=h.y*CS+CS/2+dir.y*3;
    var px=dir.y*4,py=-dir.x*4;
    ctx.beginPath();ctx.arc(ex+px,ey+py,2.5,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(ex-px,ey-py,2.5,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';
    ctx.beginPath();ctx.arc(ex+px-0.5,ey+py-0.5,1,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.arc(ex-px-0.5,ey-py-0.5,1,0,Math.PI*2);ctx.fill();
  }

  function tick(){
    if(!running||paused)return;
    dir=ndir;
    var head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
    // Wall wrap
    head.x=(head.x+W)%W; head.y=(head.y+H)%H;
    // Self collision
    if(snake.some(function(s){return s.x===head.x&&s.y===head.y;})){
      running=false;
      if(score>best){best=score;localStorage.setItem('bestSnake',best);}
      playSound('lose');
      earnXP(Math.max(5,score),'Snake');
      draw();
      ctx.fillStyle='rgba(0,0,0,.75)';ctx.fillRect(0,0,W*CS,H*CS);
      ctx.fillStyle='#ff4444';ctx.font='bold 28px Plus Jakarta Sans,sans-serif';ctx.textAlign='center';
      ctx.fillText('Game Over!',W*CS/2,H*CS/2-20);
      ctx.fillStyle='#fff';ctx.font='18px Inter,sans-serif';
      ctx.fillText('Score: '+score,W*CS/2,H*CS/2+15);
      ctx.fillStyle='rgba(255,255,255,.6)';ctx.font='14px Inter,sans-serif';
      ctx.fillText('Tap to restart',W*CS/2,H*CS/2+45);
      var msg=document.getElementById('sn-msg');if(msg)msg.textContent='Game Over! Score: '+score+' - Tap to restart';
      return;
    }
    snake.unshift(head);
    if(head.x===food.x&&head.y===food.y){
      score+=10+(snake.length>10?5:0);
      food=randFood();
      speed=Math.max(60,speed-1);
      playSound('score');
      var el=document.getElementById('sn-score');if(el)el.textContent=score;
      if(score>best){best=score;localStorage.setItem('bestSnake',best);var be=document.getElementById('sn-best');if(be)be.textContent='Best: '+best;}
    } else {snake.pop();}
    draw();
    window._gl=setTimeout(tick,speed);
  }

  window.snDir=function(x,y){
    if(!running){snStart();return;}
    if(snake.length>1&&x===-dir.x&&y===-dir.y)return;
    ndir={x:x,y:y};
  };
  window.snPause=function(){
    if(!running)return;
    paused=!paused;
    if(!paused)tick();
    var msg=document.getElementById('sn-msg');if(msg)msg.textContent=paused?'Paused - Tap ⏸ to resume':'Playing...';
  };
  window.snStart=function(){
    snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];
    dir={x:1,y:0};ndir={x:1,y:0};score=0;speed=140;running=true;paused=false;
    food=randFood();
    var el=document.getElementById('sn-score');if(el)el.textContent=0;
    var msg=document.getElementById('sn-msg');if(msg)msg.textContent='Playing... walls wrap around!';
    if(window._gl)clearTimeout(window._gl);
    tick();
  };

  canvas.onclick=function(){if(!running)snStart();};
  canvas.ontouchstart=function(e){e.preventDefault();if(!running)snStart();};

  draw();
  var keyH=function(e){
    var m={ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0},ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},a:{x:-1,y:0},d:{x:1,y:0},w:{x:0,y:-1},s:{x:0,y:1}};
    if(m[e.key]){e.preventDefault();window.snDir(m[e.key].x,m[e.key].y);}
    if(e.code==='Space'){e.preventDefault();if(!running)window.snStart();else window.snPause();}
  };
  document.addEventListener('keydown',keyH);
  window._snakeClean=function(){document.removeEventListener('keydown',keyH);running=false;};
}


function gamePong(){
  var W=360,H=240,BALL_R=7,PAD_W=10,PAD_H=60,PAD_SPEED=5;
  var ball={x:W/2,y:H/2,vx:4,vy:3};
  var player={y:H/2-PAD_H/2,score:0};
  var cpu={y:H/2-PAD_H/2,score:0};
  var running=false,g=gw();if(!g)return;

  g.innerHTML='<div style="text-align:center;">'
    +'<canvas id="pongCanvas" width="'+W+'" height="'+H+'" style="border-radius:10px;border:2px solid #93c5fd;cursor:none;max-width:100%;display:block;margin:0 auto;background:#dffcff;"></canvas>'
    +'<div id="pong-msg" style="margin-top:8px;font-size:14px;font-weight:600;color:var(--muted);">Click or tap to start!</div>'
    +'<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:8px;">'
    +'<button class="g-btn" onpointerdown="pongUp(true)" onpointerup="pongUp(false)" ontouchstart="pongUp(true)" ontouchend="pongUp(false)" style="padding:10px;">↑ Up</button>'
    +'<button class="g-btn" onpointerdown="pongDn(true)" onpointerup="pongDn(false)" ontouchstart="pongDn(true)" ontouchend="pongDn(false)" style="padding:10px;">↓ Down</button>'
    +'</div></div>';

  var canvas=document.getElementById('pongCanvas'),ctx=canvas.getContext('2d');
  var keys={up:false,down:false};

  function resetBall(){ball={x:W/2,y:H/2,vx:(Math.random()>0.5?1:-1)*4,vy:(Math.random()-0.5)*6};}
  function draw(){
    ctx.fillStyle='#dffcff';ctx.fillRect(0,0,W,H);
    // Center line
    ctx.strokeStyle='rgba(14,165,233,.30)';ctx.setLineDash([8,8]);ctx.lineWidth=2;
    ctx.beginPath();ctx.moveTo(W/2,0);ctx.lineTo(W/2,H);ctx.stroke();ctx.setLineDash([]);
    // Scores
    ctx.fillStyle='#172033';ctx.font='bold 28px Plus Jakarta Sans,sans-serif';ctx.textAlign='center';
    ctx.fillText(player.score,W/4,36);ctx.fillText(cpu.score,W*3/4,36);
    ctx.font='10px Inter,sans-serif';ctx.fillStyle='#64748b';
    ctx.fillText('YOU',W/4,50);ctx.fillText('CPU',W*3/4,50);
    // Paddles
    ctx.fillStyle='#fef3c7';
    if(ctx.roundRect){
      ctx.beginPath();ctx.roundRect(8,player.y,PAD_W,PAD_H,4);ctx.fill();
      ctx.beginPath();ctx.roundRect(W-PAD_W-8,cpu.y,PAD_W,PAD_H,4);ctx.fill();
    } else {
      ctx.fillRect(8,player.y,PAD_W,PAD_H);
      ctx.fillRect(W-PAD_W-8,cpu.y,PAD_W,PAD_H);
    }
    // Ball
    ctx.shadowColor='#60a5fa';ctx.shadowBlur=12;
    ctx.fillStyle='#60a5fa';ctx.beginPath();ctx.arc(ball.x,ball.y,BALL_R,0,Math.PI*2);ctx.fill();
    ctx.shadowBlur=0;
  }
  function update(){
    if(!running)return;
    // Player paddle
    if(keys.up&&player.y>0)player.y-=PAD_SPEED;
    if(keys.down&&player.y<H-PAD_H)player.y+=PAD_SPEED;
    // CPU AI
    var cpuCenter=cpu.y+PAD_H/2;var diff=ball.y-cpuCenter;
    var aiSpeed=Math.min(Math.abs(diff),3+level);
    cpu.y+=diff>0?aiSpeed:-aiSpeed;
    cpu.y=Math.max(0,Math.min(H-PAD_H,cpu.y));
    // Ball
    ball.x+=ball.vx;ball.y+=ball.vy;
    // Wall bounce
    if(ball.y-BALL_R<0){ball.y=BALL_R;ball.vy*=-1;}
    if(ball.y+BALL_R>H){ball.y=H-BALL_R;ball.vy*=-1;}
    // Paddle bounce - player
    if(ball.x-BALL_R<8+PAD_W&&ball.y>player.y&&ball.y<player.y+PAD_H&&ball.vx<0){
      ball.vx=Math.abs(ball.vx)*1.05;var rel=(ball.y-(player.y+PAD_H/2))/(PAD_H/2);ball.vy=rel*6;playSound('score');
    }
    // Paddle bounce - CPU
    if(ball.x+BALL_R>W-PAD_W-8&&ball.y>cpu.y&&ball.y<cpu.y+PAD_H&&ball.vx>0){
      ball.vx=-Math.abs(ball.vx)*1.05;var rel2=(ball.y-(cpu.y+PAD_H/2))/(PAD_H/2);ball.vy=rel2*6;
    }
    // Cap speed
    var spd=Math.sqrt(ball.vx*ball.vx+ball.vy*ball.vy);if(spd>14){ball.vx=ball.vx/spd*14;ball.vy=ball.vy/spd*14;}
    // Score
    if(ball.x<0){cpu.score++;earnXP(2,'Pong');playSound('lose');resetBall();draw();
      var msg=document.getElementById('pong-msg');if(msg)msg.textContent='CPU scored! '+(player.score+' : '+cpu.score);return;}
    if(ball.x>W){player.score++;earnXP(10,'Pong');playSound('score');resetBall();draw();
      var msg2=document.getElementById('pong-msg');if(msg2)msg2.textContent='You scored! '+(player.score+' : '+cpu.score);
      if(player.score>=5){running=false;var m3=document.getElementById('pong-msg');if(m3)m3.textContent='You Win! Final: '+player.score+':'+cpu.score;playSound('win');earnXP(50,'Pong Win');return;}
    }
    if(cpu.score>=7){running=false;var m4=document.getElementById('pong-msg');if(m4)m4.textContent='CPU Wins! Try again!';playSound('lose');return;}
    draw();window._gl=requestAnimationFrame(update);
  }
  var level=1;
  canvas.onclick=function(){if(!running){running=true;resetBall();var m=document.getElementById('pong-msg');if(m)m.textContent='Use ↑↓ buttons or mouse to move!';update();}};
  canvas.ontouchstart=function(e){e.preventDefault();canvas.onclick();};
  canvas.onmousemove=function(e){var rect=canvas.getBoundingClientRect();var my=e.clientY-rect.top;player.y=my-PAD_H/2;player.y=Math.max(0,Math.min(H-PAD_H,player.y));};
  canvas.ontouchmove=function(e){e.preventDefault();var rect=canvas.getBoundingClientRect();var my=e.touches[0].clientY-rect.top;player.y=my-PAD_H/2;player.y=Math.max(0,Math.min(H-PAD_H,player.y));};
  window.pongUp=function(v){keys.up=v;};
  window.pongDn=function(v){keys.down=v;};
  draw();
  var keyH=function(e){if(e.key==='ArrowUp'){e.preventDefault();keys.up=true;}if(e.key==='ArrowDown'){e.preventDefault();keys.down=true;}};
  var keyU=function(e){if(e.key==='ArrowUp')keys.up=false;if(e.key==='ArrowDown')keys.down=false;};
  document.addEventListener('keydown',keyH);document.addEventListener('keyup',keyU);
}


function gameMake24(){
  _LVL.init('make24',40);
  var level=_LVL.level;
  // Easier puzzles at lower levels
  var PUZZLES=[
    // Easy (always solvable with simple ops)
    [[1,2,3,4],'(1+2+3)*4=24'],[' [2,3,4,6]','2*3*4-6... try again'],[1,3,4,6,'try'],[2,4,6,8,'try'],
    [[4,4,4,4],'44-44... or (4-4/4)*4... actually 4*(4-4+4)=16... try!'],
    [[1,2,6,8],'8/(1-2/6)? No... 6/(1-2/4)? try'],
    [[3,3,8,8],'8/(3-8/3)=24'],
    [[1,3,4,6],'6/(1-3/4)=24'],
    [[2,3,4,6],'(2-3+6)*4... or 3*4*(6/2... no'],
    [[4,4,10,10],'(10*10-4)/4'],
  ];
  var maxNum=Math.min(13,3+Math.floor(level/4));
  var nums=[rnd(1,maxNum),rnd(1,maxNum),rnd(1,maxNum),rnd(1,maxNum)];
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🎯 Make 24','#fb923c');
  h+='<div style="text-align:center;margin-bottom:16px;">';
  h+='<div style="display:flex;justify-content:center;gap:12px;margin-bottom:12px;">';
  nums.forEach(function(n){h+='<div style="width:64px;height:64px;border-radius:12px;background:rgba(251,146,60,.3);border:2px solid #fb923c;display:flex;align-items:center;justify-content:center;font-size:28px;font-weight:900;color:#fb923c;">'+n+'</div>';});
  h+='</div>';
  h+='<div style="font-size:14px;color:rgba(255,255,255,.6);">Use +, -, ×, ÷ and ( ) with these 4 numbers to make <span style="color:#fb923c;font-size:18px;font-weight:900;">24</span>!</div>';
  h+='<div style="font-size:12px;color:rgba(255,255,255,.4);margin-top:4px;">Use each number exactly once</div>';
  h+='</div>';
  h+='<input id="m24-inp" type="text" placeholder="e.g. (3+5)*(8/4)" style="width:100%;padding:14px;border-radius:12px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.08);font-size:16px;font-weight:700;color:var(--text);font-family:monospace;text-align:center;outline:none;box-sizing:border-box;margin-bottom:10px;" onkeydown="if(event.key===\'Enter\')m24Check();">';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  h+='<button class="btn" onclick="m24Check()" style="padding:14px;font-size:16px;">Check!</button>';
  h+='<button class="btn btn-sec" onclick="m24Skip()" style="padding:14px;font-size:16px;border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7);">Skip (-5pts)</button>';
  h+='</div>';
  h+='<div id="m24-result" style="text-align:center;margin-top:8px;font-size:13px;color:rgba(255,255,255,.5);"></div>';
  g.innerHTML=h;
  document.getElementById('m24-inp').focus();
  window.m24Check=function(){
    var expr=(document.getElementById('m24-inp').value||'').trim().replace(/x/gi,'*').replace(/×/g,'*').replace(/÷/g,'/');
    var res;
    try{res=Function('"use strict";return ('+expr+')')();}catch(e){var rt=document.getElementById('m24-result');if(rt)rt.textContent='Invalid expression!';return;}
    if(Math.abs(res-24)<0.001){
      // Check all 4 numbers used
      var usedNums=[];var tmp=expr.replace(/[^0-9]/g,' ').trim().split(/\s+/).map(Number).filter(Boolean);
      var sortedInput=nums.slice().sort();var sortedUsed=tmp.slice().sort();
      var valid=JSON.stringify(sortedInput)===JSON.stringify(sortedUsed);
      if(valid){_LVL.win(40);showScorePop('+40!');var rt2=document.getElementById('m24-result');if(rt2)rt2.textContent='Correct! '+expr+' = 24';setTimeout(function(){gameMake24();},1500);}
      else{var rt3=document.getElementById('m24-result');if(rt3)rt3.textContent='Use exactly these 4 numbers: '+nums.join(', ');}
    }else{var rt4=document.getElementById('m24-result');if(rt4)rt4.textContent=expr+' = '+res+' (need 24)';}
  };
  window.m24Skip=function(){_LVL.score=Math.max(0,_LVL.score-5);setTimeout(function(){gameMake24();},300);};
}


function start24(){
  window._24nums=Array.from({length:4},()=>rnd(1,9));
  gw().innerHTML=`<h2>🔢 Make 24</h2><div style="font-size:36px;margin:16px;font-weight:700;letter-spacing:8px;color:#3498db;">${window._24nums.join(' ')}</div><p>Use +, -, ×, ÷ and ( ) with these 4 numbers to make 24!</p><input id="m24-in" type="text" style="font-size:18px;padding:8px;border:2px solid #ccc;border-radius:8px;width:220px;" placeholder="e.g. (3+5)×(8÷4)" onkeydown="if(event.key==='Enter')check24()"><button class="g-btn" style="display:block;margin:10px auto 0;" onclick="check24()">Check</button><button class="g-btn" style="background:#95a5a6;" onclick="start24()">New Numbers</button><div id="m24-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('m24-in').focus();
}
function check24(){
  var inp=document.getElementById('m24-in').value.trim();
  var msg=document.getElementById('m24-msg');
  var used=window._24nums.slice().sort();
  var found=inp.match(/\d+/g);
  if(!found||found.map(Number).sort((a,b)=>a-b).join()!==used.sort((a,b)=>a-b).join()){msg.style.color='#e74c3c';msg.textContent='Must use exactly these numbers!';return;}
  try{
    var safe=inp.replace(/[^0-9+\-*/().×÷]/g,'').replace(/×/g,'*').replace(/÷/g,'/');
    var result=Function('"use strict";return ('+safe+')')();
    if(Math.abs(result-24)<0.0001){msg.style.color='#2ecc71';msg.textContent='🎉 Correct! = 24!';}
    else{msg.style.color='#e74c3c';msg.textContent=`= ${result}, not 24. Try again!`;}
  }catch{msg.style.color='#e74c3c';msg.textContent='Invalid expression!';}
}

/* ═══════════════════════════════════════════
   ADVANCED GAMES
═══════════════════════════════════════════ */

/* WORDLE */
var WD_WORDS=['CRANE','PLANT','STOVE','BRICK','GLIDE','FLUTE','WRECK','MOUNT','PIXEL','BLEND','SCOUT','TWIST','GROVE','QUEST','FLAME','TROUT','BLADE','FROST','CRISP','PROWL','CLASP','DROWN','FLINT','GROAN','PLUMB','SHREW','SWAMP','THUMP','WRIST','BLUNT'];
function gameWordle(){
  _LVL.init('wordle',30);
  var level=_LVL.level;
  // Word pools by difficulty
  var EASY=['PLANE','BRAIN','CHAIR','DREAM','FLAME','GRACE','HEART','JUICE','KNIFE','LIGHT','MAGIC','NIGHT','OCEAN','PAINT','QUEEN','RIVER','STONE','TIGER','ULTRA','VOICE','WATER','XENON','YEARS','ZEBRA','APPLE','BAKER','CANDY','DANCE','EAGLE','FRESH'];
  var HARD=['SQUAT','GLYPH','FJORD','NYMPH','TRYST','CRYPT','GAWKY','JAZZY','PROXY','SIXTH','APHID','BLITZ','EXPEL','FLOWN','QUEUE','THYME','USURP','VOILA','WRUNG','XYLEM'];
  var words= level<=10?EASY:level<=20?EASY.concat(HARD):HARD;
  var word=words[Math.floor(Math.random()*words.length)].toUpperCase();
  var maxGuesses=Math.max(3,7-Math.floor(level/10));
  var guesses=[];var current='';
  window.wdlRender=function(){
    var g=gw();if(!g)return;
    var h=_LVL.renderHeader('🟩 Word Guess','#4ade80');
    h+='<div style="margin-bottom:10px;text-align:center;font-size:13px;color:var(--muted);">Guess the 5-letter word ('+maxGuesses+' tries)</div>';
    // Grid
    h+='<div style="display:flex;flex-direction:column;gap:4px;align-items:center;margin-bottom:10px;">';
    for(var i=0;i<maxGuesses;i++){
      h+='<div style="display:flex;gap:4px;">';
      var g2=guesses[i]||'';
      var isActive=(i===guesses.length);
      var display=isActive?current:g2;
      for(var j=0;j<5;j++){
        var ch=display[j]||'';
        var bg='transparent',border='2px solid rgba(255,255,255,.3)',col='var(--text)';
        if(g2&&!isActive){
          if(ch===word[j]){bg='#22c55e';border='2px solid #22c55e';col='#fff';}
          else if(word.includes(ch)){bg='#eab308';border='2px solid #eab308';col='#fff';}
          else{bg='rgba(255,255,255,.1)';border='2px solid rgba(255,255,255,.2)';col='rgba(255,255,255,.5)';}
        }else if(ch){border='2px solid rgba(255,255,255,.6)';}
        h+='<div style="width:46px;height:46px;border:'+border+';border-radius:8px;background:'+bg+';display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;color:'+col+';">'+ch+'</div>';
      }
      h+='</div>';
    }
    h+='</div>';
    // Keyboard
    var ROWS=[['Q','W','E','R','T','Y','U','I','O','P'],['A','S','D','F','G','H','J','K','L'],['ENTER','Z','X','C','V','B','N','M','⌫']];
    var used={};guesses.forEach(function(g3){g3.split('').forEach(function(ch,i){if(ch===word[i])used[ch]='#22c55e';else if(word.includes(ch)&&used[ch]!=='#22c55e')used[ch]='#eab308';else if(!used[ch])used[ch]='rgba(255,255,255,.2)';});});
    h+='<div style="display:flex;flex-direction:column;gap:4px;align-items:center;">';
    ROWS.forEach(function(row){
      h+='<div style="display:flex;gap:3px;">';
      row.forEach(function(key){
        var bg=used[key]||'rgba(255,255,255,.15)';var w=key.length>1?'56px':'34px';
        h+='<button onclick="wdKey(\''+key+'\')" style="width:'+w+';height:38px;border-radius:6px;border:none;background:'+bg+';color:#fff;font-size:'+(key.length>1?'10':'14')+'px;font-weight:700;cursor:pointer;transition:all .1s;">'+key+'</button>';
      });
      h+='</div>';
    });
    h+='</div>';
    g.innerHTML=h;
  }
  window.wdKey=function(key){
    if(key==='ENTER'){
      if(current.length!==5)return;
      guesses.push(current);
      var won=current===word;
      current='';
      window.wdlRender();
      if(won){_LVL.win(100);showScorePop('+100!');setTimeout(function(){gameWordle();},2000);}
      else if(guesses.length>=maxGuesses){
        _LVL.lose();
        var g2=gw();if(g2){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:12px;background:rgba(239,68,68,.3);border-radius:10px;margin-top:8px;font-weight:700;color:#fff;';fb.textContent='Word was: '+word;g2.appendChild(fb);}
        setTimeout(function(){gameWordle();},2000);
      }
    }else if(key==='⌫'){current=current.slice(0,-1);window.wdlRender();}
    else if(current.length<5){current+=key;window.wdlRender();}
  };
  document.addEventListener('keydown',function wdKH(e){
    if(!document.getElementById('modal-box'))return document.removeEventListener('keydown',wdKH);
    if(e.key==='Enter')window.wdKey('ENTER');
    else if(e.key==='Backspace')window.wdKey('⌫');
    else if(e.key.match(/^[a-zA-Z]$/)&&e.key.length===1)window.wdKey(e.key.toUpperCase());
  });
  window.wdlRender();
}


function wordleInit(){
  window._wdWord=pick(WD_WORDS);window._wdRow=0;window._wdGrid=Array(30).fill('');window._wdCurrent='';
  gw().innerHTML=`<h2>🟩 Word Guess</h2><div id="wd-grid" style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;max-width:270px;margin:12px auto;"></div><div id="wd-kb" style="max-width:300px;margin:8px auto;"></div><div id="wd-msg" style="margin-top:8px;font-size:16px;min-height:24px;"></div>`;
  wordleRender();
  document.addEventListener('keydown',wordleKey);
}
function wordleKey(e){
  if(!document.getElementById('gw'))return document.removeEventListener('keydown',wordleKey);
  if(e.key==='Enter')wordleGuess();
  else if(e.key==='Backspace'){window._wdCurrent=window._wdCurrent.slice(0,-1);wordleRender();}
  else if(/^[a-zA-Z]$/.test(e.key)&&window._wdCurrent.length<5){window._wdCurrent+=e.key.toUpperCase();wordleRender();}
}
function wordleRender(){
  var grid=document.getElementById('wd-grid');if(!grid)return;
  var g=window._wdGrid.slice();
  var cur=window._wdCurrent;
  for(let i=0;i<5;i++)g[window._wdRow*5+i]=cur[i]||'';
  grid.innerHTML=g.map((c,i)=>{
    var row=Math.floor(i/5);
    let bg='#fff',border='2px solid #d0d0d0',color='#1a1d2e';
    if(row<window._wdRow){border='2px solid transparent';}
    if(c&&row===window._wdRow)border='2px solid #888';
    return`<div style="width:46px;height:46px;border:${border};border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;background:${bg};color:${color};">${c}</div>`;
  }).join('');
  var past=window._wdGrid.slice(0,window._wdRow*5);
  for(let r=0;r<window._wdRow;r++){
    var guess=window._wdGrid.slice(r*5,r*5+5).join('');
    var tiles=grid.children;
    var wArr=[...window._wdWord];const used=Array(5).fill(false);
    var result=Array(5).fill('absent');
    for(let i=0;i<5;i++)if(guess[i]===wArr[i]){result[i]='correct';used[i]=true;}
    for(let i=0;i<5;i++)if(result[i]!=='correct'){const j=wArr.findIndex((c,k)=>c===guess[i]&&!used[k]&&result[k]!=='correct');if(j>=0){result[i]='present';used[j]=true;}}
    var colors={correct:'#6aaa64',present:'#c9b458',absent:'#787c7e'};
    for(let i=0;i<5;i++){const t=tiles[r*5+i];t.style.background=colors[result[i]];t.style.color='#fff';t.style.border='2px solid transparent';}
  }
  var kbDiv=document.getElementById('wd-kb');if(!kbDiv)return;
  var rows=['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'];
  var kbState={};
  for(let r=0;r<window._wdRow;r++){
    var guess=window._wdGrid.slice(r*5,r*5+5).join('');
    var wArr=[...window._wdWord];const used=Array(5).fill(false);const result=Array(5).fill('absent');
    for(let i=0;i<5;i++)if(guess[i]===wArr[i]){result[i]='correct';used[i]=true;}
    for(let i=0;i<5;i++)if(result[i]!=='correct'){const j=wArr.findIndex((c,k)=>c===guess[i]&&!used[k]&&result[k]!=='correct');if(j>=0){result[i]='present';used[j]=true;}}
    for(let i=0;i<5;i++){if(result[i]==='correct')kbState[guess[i]]='correct';else if(result[i]==='present'&&kbState[guess[i]]!=='correct')kbState[guess[i]]='present';else if(!kbState[guess[i]])kbState[guess[i]]='absent';}
  }
  var colors={correct:'#6aaa64',present:'#c9b458',absent:'#787c7e'};
  kbDiv.innerHTML=rows.map(row=>`<div style="display:flex;justify-content:center;gap:4px;margin-bottom:4px;">${[...row].map(l=>`<button onclick="wdKbPress('${l}')" style="width:28px;height:36px;border-radius:4px;border:none;background:${kbState[l]?colors[kbState[l]]:'#d3d6da'};color:${kbState[l]?'#fff':'#1a1d2e'};font-weight:700;font-size:12px;cursor:pointer;">${l}</button>`).join('')}</div>`).join('');
}
function wdKbPress(l){if(window._wdCurrent.length<5){window._wdCurrent+=l;wordleRender();}}
function wordleGuess(){
  if(window._wdCurrent.length!==5)return;
  var guess=window._wdCurrent;
  var start=window._wdRow*5;
  for(let i=0;i<5;i++)window._wdGrid[start+i]=guess[i];
  window._wdRow++;window._wdCurrent='';
  wordleRender();
  var msg=document.getElementById('wd-msg');
  if(guess===window._wdWord){if(msg)msg.textContent='🎉 Brilliant! You got it!';document.removeEventListener('keydown',wordleKey);return;}
  if(window._wdRow>=6){if(msg)msg.textContent=`Word was: ${window._wdWord}`;document.removeEventListener('keydown',wordleKey);}
}

/* 2048 */
function game2048(){init2048();}
function init2048(){
  window._2048board=Array(16).fill(0);
  add2048();add2048();render2048();
  document.addEventListener('keydown',key2048);
  var gDiv=document.getElementById('gw');
  let t0=null;
  gDiv.addEventListener('touchstart',e=>{t0=e.touches[0];},{passive:true});
  gDiv.addEventListener('touchend',e=>{
    if(!t0)return;const dx=e.changedTouches[0].clientX-t0.clientX,dy=e.changedTouches[0].clientY-t0.clientY;
    if(Math.abs(dx)>Math.abs(dy)){move2048(dx>0?'r':'l');}else{move2048(dy>0?'d':'u');}
  },{passive:true});
}
function add2048(){
  var empty=window._2048board.map((_,i)=>i).filter(i=>!window._2048board[i]);
  if(!empty.length)return;
  var i=pick(empty);window._2048board[i]=Math.random()<0.9?2:4;
}
function render2048(){
  var b=window._2048board;
  var colors={0:'#cdc1b4',2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'};
  var max=Math.max(...b);
  gw().innerHTML=`<h2>🔢 2048</h2><div style="font-size:14px;color:#888;margin-bottom:6px;">Best: ${max} | Arrow keys or swipe</div><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:6px;max-width:280px;margin:0 auto;background:#bbada0;padding:6px;border-radius:8px;">${b.map(v=>`<div style="width:58px;height:58px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:${v>99?v>999?16:20:24}px;font-weight:900;background:${colors[v]||'#3c3a32'};color:${v>4?'#f9f6f2':'#776e65'};">${v||''}</div>`).join('')}</div>${b.includes(2048)?'<div style="font-size:28px;margin-top:12px;">🏆 You got 2048!</div>':''}${!b.some((_,i)=>{const r=Math.floor(i/4),c=i%4;return !b[i]||(c<3&&b[i]===b[i+1])||(r<3&&b[i]===b[i+4]);})&&!b.includes(0)?'<div style="font-size:22px;margin-top:10px;">Game Over!</div>':''}`;
}
function slide2048(row){
  let a=row.filter(v=>v);
  for(let i=0;i<a.length-1;i++)if(a[i]===a[i+1]){a[i]*=2;a[i+1]=0;}
  a=a.filter(v=>v);
  while(a.length<4)a.push(0);
  return a;
}
function move2048(dir){
  var b=[...window._2048board];let changed=false;
  if(dir==='l'){for(let r=0;r<4;r++){const row=b.slice(r*4,r*4+4);const s=slide2048(row);for(let c=0;c<4;c++)if(b[r*4+c]!==s[c]){changed=true;b[r*4+c]=s[c];}}}
  else if(dir==='r'){for(let r=0;r<4;r++){const row=b.slice(r*4,r*4+4).reverse();const s=slide2048(row).reverse();for(let c=0;c<4;c++)if(b[r*4+c]!==s[c]){changed=true;b[r*4+c]=s[c];}}}
  else if(dir==='u'){for(let c=0;c<4;c++){const col=[b[c],b[4+c],b[8+c],b[12+c]];const s=slide2048(col);[0,1,2,3].forEach((r,i)=>{if(b[r*4+c]!==s[i]){changed=true;b[r*4+c]=s[i];}});}}
  else if(dir==='d'){for(let c=0;c<4;c++){const col=[b[c],b[4+c],b[8+c],b[12+c]].reverse();const s=slide2048(col).reverse();[0,1,2,3].forEach((r,i)=>{if(b[r*4+c]!==s[i]){changed=true;b[r*4+c]=s[i];}});}}
  if(changed){window._2048board=b;add2048();render2048();}
}
function key2048(e){
  if(!document.getElementById('gw'))return document.removeEventListener('keydown',key2048);
  var map={ArrowLeft:'l',ArrowRight:'r',ArrowUp:'u',ArrowDown:'d'};
  if(map[e.key]){e.preventDefault();move2048(map[e.key]);}
}

/* MATH SPRINT */
function gameMathSprint(){
  _LVL.init('mathsprint',35);
  var level=_LVL.level;
  var total=Math.min(50,15+level);
  var timeLimit=Math.max(20,60-level);
  var correct=0,answered=0;var timerInt;var timeLeft=timeLimit;
  function getQ(){
    var ops=['+','-'];if(level>5)ops.push('*');if(level>15)ops.push('/');
    var op=ops[Math.floor(Math.random()*ops.length)];
    var max=Math.min(50,5+level*2);var a,b,ans;
    if(op==='+'){ a=rnd(1,max);b=rnd(1,max);ans=a+b; }
    else if(op==='-'){ a=rnd(max/2|0,max);b=rnd(1,a);ans=a-b; }
    else if(op==='*'){ a=rnd(2,Math.min(12,level));b=rnd(2,Math.min(12,level));ans=a*b; }
    else{ ans=rnd(2,Math.min(12,level));b=rnd(2,Math.min(10,level));a=ans*b; }
    var sym={'+':'+','-':'-','*':'x','/':'÷'}[op];
    return{q:a+' '+sym+' '+b,ans:ans};
  }
  var questions=[];for(var i=0;i<total;i++)questions.push(getQ());
  var qIdx=0;
  window.msRender=function(){
    var g=gw();if(!g)return;
    var h=_LVL.renderHeader('🏃 Math Sprint','#fb923c');
    h+='<div style="display:flex;justify-content:space-between;margin-bottom:10px;font-weight:700;">';
    h+='<div style="color:var(--muted);">'+answered+'/'+total+'</div>';
    h+='<div id="ms-timer" style="font-size:20px;font-weight:900;color:'+(timeLeft<=10?'#ef4444':'#fb923c')+';">⏱ '+timeLeft+'s</div>';
    h+='<div style="color:#22c55e;">✓ '+correct+'</div>';
    h+='</div>';
    h+='<div style="background:rgba(255,255,255,.1);border-radius:8px;height:6px;margin-bottom:12px;">';
    h+='<div style="background:#fb923c;height:6px;border-radius:8px;width:'+(qIdx/total*100)+'%;transition:width .3s;"></div>';
    h+='</div>';
    if(qIdx<questions.length){
      var q=questions[qIdx];
      h+='<div style="text-align:center;font-size:44px;font-weight:900;color:var(--text);margin-bottom:14px;">'+q.q+' = ?</div>';
      h+='<input id="ms-inp" type="number" placeholder="Answer..." style="width:100%;padding:16px;border-radius:12px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);font-size:22px;font-weight:900;color:var(--text);text-align:center;font-family:inherit;outline:none;box-sizing:border-box;margin-bottom:8px;" onkeydown="if(event.key===\'Enter\')msSubmit();">';
      h+='<button class="btn" onclick="msSubmit()" style="width:100%;padding:14px;font-size:16px;">Submit (Enter)</button>';
    }else{
      clearInterval(timerInt);
      var pct=Math.round(correct/total*100);
      h+='<div style="text-align:center;padding:20px;">';
      h+='<div style="font-size:48px;margin-bottom:10px;">'+(pct>=80?'🏆':pct>=60?'⭐':'💪')+'</div>';
      h+='<div style="font-size:22px;font-weight:900;color:var(--text);">'+pct+'% Correct!</div>';
      h+='<div style="font-size:16px;color:var(--muted);margin:6px 0;">'+correct+'/'+total+' in '+( timeLimit-timeLeft)+'s</div>';
      h+='<button class="btn" onclick="gameMathSprint()" style="margin-top:16px;padding:14px 32px;">Play Again</button>';
      h+='</div>';
      if(pct>=70){_LVL.win(correct*2);showScorePop('+'+correct*2+'!');}else{_LVL.lose();}
    }
    g.innerHTML=h;
    if(qIdx<questions.length){var inp=document.getElementById('ms-inp');if(inp)inp.focus();}
  }
  window.msSubmit=function(){
    var val=+(document.getElementById('ms-inp').value||'NaN');
    answered++;qIdx++;
    if(val===questions[answered-1]&&val!==questions[answered-1]){}// skip
    if(questions[answered-1]&&val===questions[answered-1].ans)correct++;
    if(answered>=total||timeLeft<=0){clearInterval(timerInt);window.msRender();}else window.msRender();
  };
  window.msRender();
  timerInt=setInterval(function(){
    timeLeft--;
    var te=document.getElementById('ms-timer');if(te){te.textContent='⏱ '+timeLeft+'s';te.style.color=timeLeft<=10?'#ef4444':'#fb923c';}
    if(timeLeft<=0){clearInterval(timerInt);qIdx=total;window.msRender();}
  },1000);
}


function ms2Ans(c,a){if(c===a)window._ms2Score++;nextMathSprint();}

/* NUMBER SEQUENCE */
var NS_SETS=[
  [[2,4,6,8],10,'Add 2'],[[1,3,9,27],81,'×3'],[[100,90,80,70],60,'−10'],
  [[1,1,2,3,5],8,'Fibonacci'],[[2,4,8,16],32,'×2'],[[50,25,12],6,'÷2'],
  [[1,4,9,16],25,'Squares'],[[3,6,12,24],48,'×2'],[[10,8,6,4],2,'−2'],
  [[1,2,4,7,11],16,'+1+2+3...'],
];
function gameNumSeq(){
  _LVL.init('numseq',45);
  var level=_LVL.level;
  var SEQUENCES=[
    // Easy
    {seq:[2,4,6,8],next:10,rule:'+2'},
    {seq:[1,3,5,7],next:9,rule:'+2 odd numbers'},
    {seq:[5,10,15,20],next:25,rule:'+5'},
    {seq:[1,2,4,8],next:16,rule:'×2'},
    {seq:[100,90,80,70],next:60,rule:'-10'},
    {seq:[1,4,9,16],next:25,rule:'Square numbers'},
    {seq:[2,6,18,54],next:162,rule:'×3'},
    {seq:[1,1,2,3,5],next:8,rule:'Fibonacci'},
    {seq:[3,6,12,24],next:48,rule:'×2'},
    {seq:[50,45,40,35],next:30,rule:'-5'},
    // Medium
    {seq:[1,3,6,10],next:15,rule:'Triangular numbers'},
    {seq:[2,3,5,7,11],next:13,rule:'Prime numbers'},
    {seq:[1,8,27,64],next:125,rule:'Cube numbers'},
    {seq:[0,1,4,9,16],next:25,rule:'n² starting 0'},
    {seq:[1,2,6,24],next:120,rule:'Factorials'},
    {seq:[64,32,16,8],next:4,rule:'÷2'},
    {seq:[1,3,7,15],next:31,rule:'2^n - 1'},
    {seq:[2,5,10,17,26],next:37,rule:'n²+1'},
    {seq:[1,5,14,30],next:55,rule:'Pyramidal numbers'},
    {seq:[3,8,15,24],next:35,rule:'n²+2n'},
    // Hard
    {seq:[1,2,5,14],next:42,rule:'Catalan numbers'},
    {seq:[2,3,5,11,23],next:47,rule:'Safe primes'},
    {seq:[1,6,21,66],next:195,rule:'Pascal triangle'},
    {seq:[4,7,12,19,28],next:39,rule:'n²+3'},
    {seq:[1,7,25,79],next:241,rule:'3^n - 2'},
    {seq:[2,10,30,68],next:130,rule:'2n³+2n'},
    {seq:[1,4,13,40],next:121,rule:'3^n+1 /2... pattern'},
    {seq:[3,5,11,21,43],next:85,rule:'2n+... pattern'},
    {seq:[1,3,4,7,11,18],next:29,rule:'Lucas numbers'},
    {seq:[5,12,29,70],next:169,rule:'Each term ×2 + pattern'},
  ];
  var idx=Math.min(SEQUENCES.length-1,Math.floor(level/45*SEQUENCES.length)+Math.floor(Math.random()*3));
  var seq=SEQUENCES[idx];
  var wrong=[seq.next+rnd(1,5),seq.next-rnd(1,5),seq.next+rnd(5,15),seq.next*2].filter(function(v){return v>0&&v!==seq.next;});
  var opts=[seq.next].concat(wrong.slice(0,3)).sort(function(){return Math.random()-.5;});
  var timeLimit=Math.max(6,20-Math.floor(level/3));var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('📈 Number Sequence','#fb923c');
  h+='<div style="text-align:center;margin-bottom:16px;">';
  h+='<div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:10px;">';
  seq.seq.forEach(function(n){h+='<span style="background:rgba(255,255,255,.15);border-radius:10px;padding:10px 16px;font-size:24px;font-weight:900;color:var(--text);">'+n+'</span>';h+='<span style="color:rgba(255,255,255,.3);font-size:20px;">→</span>';});
  h+='<span style="background:rgba(251,146,60,.3);border:2px dashed #fb923c;border-radius:10px;padding:10px 16px;font-size:24px;font-weight:900;color:#fb923c;">?</span>';
  h+='</div>';
  h+='<div style="font-size:13px;color:rgba(255,255,255,.4);">What comes next in the sequence?</div>';
  if(level>=8)h+='<div id="ns-timer" style="font-size:20px;font-weight:900;margin-top:8px;color:'+(timer<=5?'#ef4444':'#fb923c')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  opts.forEach(function(opt){h+='<button onclick="nsAns('+opt+')" style="padding:16px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:22px;font-weight:900;color:var(--text);transition:all .15s;" onmouseover="this.style.background=\'rgba(251,146,60,.3)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+opt+'</button>';});
  h+='</div>';
  h+='<div style="text-align:center;margin-top:10px;"><button onclick="nsHint()" style="background:none;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:5px 12px;color:rgba(255,255,255,.5);cursor:pointer;font-size:12px;">💡 Hint: '+seq.rule+'</button></div>';
  g.innerHTML=h;
  if(level>=8){window._nsTimer=setInterval(function(){timer--;var te=document.getElementById('ns-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#fb923c';}if(timer<=0){clearInterval(window._nsTimer);_LVL.lose();setTimeout(function(){gameNumSeq();},800);}},1000);}
  window.nsAns=function(val){if(window._nsTimer)clearInterval(window._nsTimer);if(val===seq.next){_LVL.win(35);showScorePop('+35');setTimeout(function(){gameNumSeq();},700);}else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(+b.textContent===seq.next)b.style.background='rgba(34,197,94,.5)';else if(+b.textContent===val)b.style.background='rgba(239,68,68,.5)';b.style.color='#fff';b.disabled=true;});if(alive)setTimeout(function(){gameNumSeq();},1200);}};
  window.nsHint=function(){showScorePop(seq.rule);};
}


function nextNS(){
  if(window._nsIdx>=window._nsSets.length){gw().innerHTML=`<h2>📈 Number Sequence</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._nsScore}/${window._nsSets.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameNumSeq()">Play Again</button>`;return;}
  var [seq,ans,rule]=window._nsSets[window._nsIdx];
  var wrong=[ans+rnd(1,5),ans-rnd(1,5),ans*2].filter(v=>v!==ans&&v>0);
  var opts=shuffle([ans,...wrong.slice(0,3)]);
  window._nsIdx++;
  gw().innerHTML=`<h2>📈 Number Sequence</h2><div style="font-size:14px;color:#888;">Q ${window._nsIdx}/${window._nsSets.length} | Score:${window._nsScore}</div><div style="font-size:32px;margin:16px;letter-spacing:4px;font-weight:700;">${seq.join(', ')}, ?</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:280px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" onclick="nsAns(${o},${ans},'${rule}')">${o}</button>`).join('')}</div>`;
}
function nsAns(c,a,rule){
  if(c===a){window._nsScore++;document.getElementById('gw').innerHTML+=`<div style="color:#2ecc71;font-size:16px;margin:10px;">✅ Correct! Rule: ${rule}</div>`;setTimeout(nextNS,800);}
  else{document.getElementById('gw').innerHTML+=`<div style="color:#e74c3c;font-size:16px;margin:10px;">❌ Answer: ${a} — Rule: ${rule}</div>`;setTimeout(nextNS,1200);}
}

/* SPELLING BEE */
var SP_WORDS=[['EPHEMERAL','Lasting for a short time'],['SERENDIPITY','Finding something good without looking'],['UBIQUITOUS','Present everywhere'],['MELANCHOLY','Deep sadness'],['SURREPTITIOUS','Done secretly'],['PERSPICACIOUS','Having a ready insight'],['LOQUACIOUS','Tending to talk a lot'],['MAGNANIMOUS','Very generous'],['OBFUSCATE','To make unclear'],['CACOPHONY','A harsh mixture of sounds']];
function gameSpelling(){
  _LVL.init('spelling',40);
  var level=_LVL.level;
  var WORDS_BY_TIER=[
    ['cat','dog','run','big','sun','hat','cup','box','bed','red'],
    ['apple','brain','climb','dance','eagle','flame','grace','happy','ivory','judge'],
    ['bridge','castle','desert','empire','forest','garden','harbor','insect','jungle','knight'],
    ['absolute','bacteria','calendar','diameter','electron','fragment','gorgeous','heritage','imminent','junction'],
    ['algorithm','basketball','chrysalis','democracy','fahrenheit','goalkeeper','helicopter','illuminate','javascript','knowledgeable'],
    ['architecture','bibliography','circumstance','disintegrate','encyclopedia','fluorescence','galvanization','hallucination','indeterminate','juxtaposition']
  ];
  var tier=Math.min(5,Math.floor(level/7));
  var word=WORDS_BY_TIER[tier][Math.floor(Math.random()*10)];
  var scrambled=word.toUpperCase().split('').sort(function(){return Math.random()-.5;}).join(' ');
  var timeLimit=Math.max(8,30-level);var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🐝 Spelling Bee','#fbbf24');
  h+='<div style="text-align:center;margin-bottom:16px;">';
  h+='<div style="font-size:48px;margin-bottom:6px;">🐝</div>';
  h+='<div style="font-size:20px;font-weight:900;color:var(--text);letter-spacing:8px;background:rgba(255,255,255,.1);padding:14px;border-radius:12px;">'+scrambled+'</div>';
  h+='<div style="font-size:13px;color:rgba(255,255,255,.6);margin-top:8px;">Unscramble and spell the word correctly</div>';
  if(level>=5)h+='<div id="sp-timer" style="font-size:22px;font-weight:900;margin-top:8px;color:'+(timer<=5?'#ef4444':'#fbbf24')+';">⏱ '+timer+'s</div>';
  h+='</div>';
  h+='<input id="sp-inp" type="text" placeholder="Spell the word..." style="width:100%;padding:14px;border-radius:12px;border:2px solid rgba(255,255,255,.3);background:rgba(255,255,255,.1);font-size:18px;font-weight:700;color:var(--text);font-family:monospace;text-align:center;outline:none;box-sizing:border-box;margin-bottom:10px;" autocorrect="off" autocapitalize="off" spellcheck="false" onkeydown="if(event.key===\'Enter\')spCheck();">';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  h+='<button class="btn" onclick="spCheck()" style="padding:14px;">Submit</button>';
  h+='<button class="btn btn-sec" onclick="spHint()" style="padding:14px;border-color:rgba(255,255,255,.2);color:rgba(255,255,255,.7);">Hint 💡</button>';
  h+='</div>';
  h+='<div id="sp-hint" style="text-align:center;margin-top:8px;color:rgba(255,255,255,.5);font-size:13px;"></div>';
  g.innerHTML=h;
  document.getElementById('sp-inp').focus();
  if(level>=5){window._spTimer=setInterval(function(){timer--;var te=document.getElementById('sp-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=5?'#ef4444':'#fbbf24';}if(timer<=0){clearInterval(window._spTimer);_LVL.lose();setTimeout(function(){gameSpelling();},800);}},1000);}
  window.spCheck=function(){
    if(window._spTimer)clearInterval(window._spTimer);
    var val=(document.getElementById('sp-inp').value||'').trim().toLowerCase();
    if(val===word){_LVL.win(30);showScorePop('+30');setTimeout(function(){gameSpelling();},700);}
    else{var alive=_LVL.lose();var inp=document.getElementById('sp-inp');if(inp){inp.style.borderColor='#ef4444';inp.value='';}var h2=document.getElementById('sp-hint');if(h2)h2.textContent='Correct: '+word;if(alive)setTimeout(function(){gameSpelling();},1500);}
  };
  window.spHint=function(){var h2=document.getElementById('sp-hint');if(h2)h2.textContent='First 2 letters: '+word.slice(0,2).toUpperCase()+' ('+word.length+' letters)';};
}


function nextSpelling(){
  if(window._spIdx>=window._spWords.length){gw().innerHTML=`<h2>🐝 Spelling Bee</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._spScore}/${window._spWords.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameSpelling()">Play Again</button>`;return;}
  var [word,def]=window._spWords[window._spIdx];window._spCurrent=word;
  gw().innerHTML=`<h2>🐝 Spelling Bee</h2><div style="font-size:14px;color:#888;">Word ${window._spIdx+1}/${window._spWords.length} | Score:${window._spScore}</div><div style="font-size:16px;margin:16px 10px;color:#555;line-height:1.6;">"${def}"</div><p style="font-size:14px;color:#888;">Spell the word (${word.length} letters)</p><input id="sp-in" type="text" maxlength="${word.length+5}" style="font-size:18px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:200px;" onkeydown="if(event.key==='Enter')spCheck()"><button class="g-btn" style="display:block;margin:10px auto 0;" onclick="spCheck()">Submit</button><button class="g-btn" style="background:#95a5a6;" onclick="spHint()">Hint (first letter)</button><div id="sp-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('sp-in').focus();
}
function spCheck(){
  var v=document.getElementById('sp-in').value.toUpperCase().trim();
  var msg=document.getElementById('sp-msg');
  if(v===window._spCurrent){window._spScore++;msg.style.color='#2ecc71';msg.textContent='✅ Correct!';window._spIdx++;setTimeout(nextSpelling,900);}
  else{msg.style.color='#e74c3c';msg.textContent=`❌ Try again!`;}
}
function gameBreakout(){
  var g=gw();if(!g)return;
  var canvas=document.createElement('canvas');
  var W=Math.min(340,window.innerWidth-60),H=260;
  canvas.width=W;canvas.height=H;
  canvas.style.cssText='display:block;margin:0 auto;border-radius:12px;background:#fff7ed;border:2px solid #fdba74;cursor:none;';
  g.innerHTML='<div style="text-align:center;"><div style="font-size:16px;font-weight:900;color:#172033;margin-bottom:8px;">🧱 Breakout</div><div id="bo-score" style="font-size:13px;color:#818cf8;margin-bottom:8px;">Score: 0 | Best: '+getBest('breakout')+'</div></div>';
  g.querySelector('div').appendChild(canvas);
  var ctx=canvas.getContext('2d');

  var PAD_W=70,PAD_H=10,BALL_R=7,COLS=8,ROWS=5;
  var pad={x:W/2-PAD_W/2,y:H-20,w:PAD_W,h:PAD_H};
  var ball={x:W/2,y:H-40,dx:3,dy:-3};
  var bricks=[],score=0,lives=3,running=false;
  var COLORS=['#f87171','#fb923c','#fbbf24','#4ade80','#60a5fa'];

  function initBricks(){
    bricks=[];
    var bW=(W-20)/COLS-4,bH=16;
    for(var r=0;r<ROWS;r++)for(var col=0;col<COLS;col++){
      bricks.push({x:10+col*(bW+4),y:30+r*(bH+4),w:bW,h:bH,alive:true,color:COLORS[r%COLORS.length]});
    }
  }

  function draw(){
    ctx.fillStyle='#fff7ed';ctx.fillRect(0,0,W,H);
    // Paddle
    ctx.fillStyle='#818cf8';
    ctx.beginPath();ctx.roundRect(pad.x,pad.y,pad.w,pad.h,5);ctx.fill();
    // Ball
    ctx.fillStyle='#fff';
    ctx.beginPath();ctx.arc(ball.x,ball.y,BALL_R,0,Math.PI*2);ctx.fill();
    // Bricks
    bricks.forEach(function(b){
      if(!b.alive)return;
      ctx.fillStyle=b.color;
      ctx.beginPath();ctx.roundRect(b.x,b.y,b.w,b.h,4);ctx.fill();
    });
    // Lives
    for(var i=0;i<lives;i++){ctx.fillStyle='#f87171';ctx.beginPath();ctx.arc(12+i*18,12,6,0,Math.PI*2);ctx.fill();}
    if(!running){
      ctx.fillStyle='#172033';ctx.font='bold 16px Inter';ctx.textAlign='center';
      ctx.fillText('Tap/Click to Start',W/2,H/2);
    }
  }

  function update(){
    if(!running)return;
    ball.x+=ball.dx;ball.y+=ball.dy;
    // Wall bounce
    if(ball.x-BALL_R<0||ball.x+BALL_R>W)ball.dx*=-1;
    if(ball.y-BALL_R<0)ball.dy*=-1;
    // Paddle
    if(ball.y+BALL_R>pad.y&&ball.x>pad.x&&ball.x<pad.x+pad.w&&ball.dy>0){
      ball.dy=-Math.abs(ball.dy);
      ball.dx+=((ball.x-(pad.x+pad.w/2))/pad.w)*3;
      ball.dx=Math.max(-5,Math.min(5,ball.dx));
    }
    // Brick collision
    bricks.forEach(function(b){
      if(!b.alive)return;
      if(ball.x>b.x&&ball.x<b.x+b.w&&ball.y>b.y&&ball.y<b.y+b.h){
        b.alive=false;ball.dy*=-1;score+=10;playSound('score');
        var el=document.getElementById('bo-score');
        if(el)el.textContent='Score: '+score+' | Best: '+getBest('breakout');
      }
    });
    // All bricks cleared
    if(bricks.every(function(b){return!b.alive;})){
      running=false;earnXP(score,'Breakout');
      showScoreBoard('breakout','Breakout',score);return;
    }
    // Ball lost
    if(ball.y+BALL_R>H){
      lives--;ball.x=W/2;ball.y=H-60;ball.dx=3*(Math.random()<.5?1:-1);ball.dy=-3;running=false;
      if(lives<=0){showScoreBoard('breakout','Breakout',score);return;}
    }
    draw();
    window._gl=requestAnimationFrame(update);
  }

  function startBall(){
    if(!running){running=true;update();}
  }

  canvas.onclick=startBall;
  canvas.ontouchstart=function(e){e.preventDefault();startBall();};
  canvas.onmousemove=function(e){
    var rect=canvas.getBoundingClientRect();
    pad.x=Math.max(0,Math.min(W-pad.w,e.clientX-rect.left-pad.w/2));
    if(!running)draw();
  };
  var kH=function(e){if(e.key==='ArrowLeft')pad.x=Math.max(0,pad.x-20);if(e.key==='ArrowRight')pad.x=Math.min(W-pad.w,pad.x+20);};
  document.addEventListener('keydown',kH);
  window._snakeClean=function(){document.removeEventListener('keydown',kH);};

  initBricks();draw();
}

function gameTetris(){
  var W=10,H=20,CS=24;
  var score=0,lines=0,level=1,best=+(localStorage.getItem('bestTetris')||0);
  var running=false,paused=false;
  var board=[];
  var PIECES=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]]];
  var COLORS=['','#00f5ff','#ffd700','#a855f7','#22c55e','#ef4444','#3b82f6','#f97316'];
  var cur,curX,curY,curC,nxt,nxtC;
  var g=gw();if(!g)return;

  g.innerHTML='<div style="display:flex;gap:10px;justify-content:center;">'
    +'<div>'
    +'<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">'
    +'<div style="font-size:16px;font-weight:900;color:var(--text);">Tetris</div>'
    +'<button id="tet-pause" class="g-btn" onclick="tetPause()" style="font-size:11px;padding:4px 8px;">Pause</button>'
    +'</div>'
    +'<canvas id="tetCanvas" width="'+(W*CS)+'" height="'+(H*CS)+'" style="border-radius:8px;border:2px solid #93c5fd;display:block;background:#e0f2fe;"></canvas>'
    +'<div style="display:grid;grid-template-columns:repeat(4,1fr);gap:4px;margin-top:8px;">'
    +'<button class="g-btn" onpointerdown="tetMove(-1)" style="font-size:16px;">←</button>'
    +'<button class="g-btn" onpointerdown="tetDrop()" style="font-size:14px;">↓</button>'
    +'<button class="g-btn" onpointerdown="tetMove(1)" style="font-size:16px;">→</button>'
    +'<button class="g-btn" onpointerdown="tetRot()" style="font-size:14px;">↻</button>'
    +'</div>'
    +'<button class="g-btn" onpointerdown="tetHard()" style="width:100%;margin-top:4px;font-size:12px;">Hard Drop ⬇⬇</button>'
    +'</div>'
    +'<div style="width:88px;">'
    +'<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:4px;">Next</div>'
    +'<canvas id="tetNext" width="88" height="88" style="border-radius:6px;border:1px solid var(--border);background:#e0f2fe;display:block;margin-bottom:10px;"></canvas>'
    +'<div class="tet-stat"><div style="font-size:10px;color:var(--muted);">Score</div><div id="tScore" style="font-size:18px;font-weight:800;">0</div></div>'
    +'<div class="tet-stat" style="margin-top:6px;"><div style="font-size:10px;color:var(--muted);">Lines</div><div id="tLines" style="font-size:16px;font-weight:700;">0</div></div>'
    +'<div class="tet-stat" style="margin-top:6px;"><div style="font-size:10px;color:var(--muted);">Level</div><div id="tLevel" style="font-size:16px;font-weight:700;">1</div></div>'
    +'<div class="tet-stat" style="margin-top:6px;"><div style="font-size:10px;color:var(--muted);">Best</div><div id="tBest" style="font-size:14px;font-weight:700;">'+best+'</div></div>'
    +'</div></div>';

  var canvas=document.getElementById('tetCanvas'),ctx=canvas.getContext('2d');
  var nc=document.getElementById('tetNext'),nctx=nc.getContext('2d');

  function newBoard(){board=Array.from({length:H},function(){return Array(W).fill(0);});}
  function newPiece(){
    cur=nxt||PIECES[rnd(0,PIECES.length-1)];curC=nxtC||rnd(1,COLORS.length-1);
    curX=Math.floor(W/2)-Math.floor(cur[0].length/2);curY=0;
    nxt=PIECES[rnd(0,PIECES.length-1)];nxtC=rnd(1,COLORS.length-1);
    if(collide(cur,curX,curY)){running=false;gameOverTet();}
  }
  function collide(p,x,y){
    return p.some(function(row,r){return row.some(function(v,c){
      if(!v)return false;var nx=x+c,ny=y+r;
      return nx<0||nx>=W||ny>=H||(ny>=0&&board[ny][nx]);
    });});
  }
  function rotate(p){return p[0].map(function(_,i){return p.map(function(row){return row[i];}).reverse();});}
  function draw(){
    ctx.fillStyle='#e0f2fe';ctx.fillRect(0,0,W*CS,H*CS);
    ctx.strokeStyle='rgba(59,130,246,.18)';ctx.lineWidth=.5;
    for(var i=0;i<=W;i++){ctx.beginPath();ctx.moveTo(i*CS,0);ctx.lineTo(i*CS,H*CS);ctx.stroke();}
    for(var j=0;j<=H;j++){ctx.beginPath();ctx.moveTo(0,j*CS);ctx.lineTo(W*CS,j*CS);ctx.stroke();}
    // Board
    board.forEach(function(row,r){row.forEach(function(v,c){
      if(v){drawBlock(ctx,c*CS,r*CS,CS,COLORS[v]);}
    });});
    // Ghost
    var gy=curY;while(!collide(cur,curX,gy+1))gy++;
    cur.forEach(function(row,r){row.forEach(function(v,c){
      if(v&&curY!==gy){ctx.fillStyle='rgba(15,23,42,.12)';ctx.fillRect((curX+c)*CS+1,(gy+r)*CS+1,CS-2,CS-2);}
    });});
    // Current
    cur.forEach(function(row,r){row.forEach(function(v,c){
      if(v)drawBlock(ctx,(curX+c)*CS,(curY+r)*CS,CS,COLORS[curC]);
    });});
    // Next
    nctx.fillStyle='#e0f2fe';nctx.fillRect(0,0,88,88);
    if(nxt){
      var ns=16,ox=Math.floor((4-nxt[0].length)/2)*ns+8,oy=Math.floor((4-nxt.length)/2)*ns+8;
      nxt.forEach(function(row,r){row.forEach(function(v,c){
        if(v)drawBlock(nctx,ox+c*ns,oy+r*ns,ns,COLORS[nxtC]);
      });});
    }
  }
  function drawBlock(ctx,x,y,s,color){
    ctx.fillStyle=color;
    if(ctx.roundRect){ctx.beginPath();ctx.roundRect(x+1,y+1,s-2,s-2,2);ctx.fill();}
    else{ctx.fillRect(x+1,y+1,s-2,s-2);}
    ctx.fillStyle='rgba(255,255,255,.25)';ctx.fillRect(x+2,y+2,s-4,4);
    ctx.fillStyle='rgba(0,0,0,.2)';ctx.fillRect(x+2,y+s-5,s-4,3);
  }
  function place(){
    cur.forEach(function(row,r){row.forEach(function(v,c){if(v&&curY+r>=0)board[curY+r][curX+c]=curC;});});
    var cleared=0;
    for(var r=H-1;r>=0;r--){
      if(board[r].every(function(v){return v;})){board.splice(r,1);board.unshift(Array(W).fill(0));cleared++;r++;}
    }
    if(cleared){
      var pts=[0,100,300,500,800];score+=pts[cleared]*level;lines+=cleared;level=Math.floor(lines/10)+1;
      if(score>best){best=score;localStorage.setItem('bestTetris',best);}
      playSound('score');earnXP(cleared*10,'Tetris');
      var ts=document.getElementById('tScore');if(ts)ts.textContent=score;
      var tl=document.getElementById('tLines');if(tl)tl.textContent=lines;
      var tv=document.getElementById('tLevel');if(tv)tv.textContent=level;
      var tb=document.getElementById('tBest');if(tb)tb.textContent=best;
    }
    newPiece();draw();
  }
  function gameOverTet(){
    playSound('lose');earnXP(Math.floor(score/50),'Tetris');
    ctx.fillStyle='rgba(0,0,0,.8)';ctx.fillRect(0,0,W*CS,H*CS);
    ctx.fillStyle='#ef4444';ctx.font='bold 22px Plus Jakarta Sans,sans-serif';ctx.textAlign='center';
    ctx.fillText('Game Over!',W*CS/2,H*CS/2-20);
    ctx.fillStyle='#fff';ctx.font='16px Inter,sans-serif';ctx.fillText('Score: '+score,W*CS/2,H*CS/2+10);
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='12px Inter,sans-serif';ctx.fillText('Tap New Game',W*CS/2,H*CS/2+35);
  }
  function drop(){if(!collide(cur,curX,curY+1))curY++;else place();draw();}
  window.tetMove=function(d){if(!running||paused)return;if(!collide(cur,curX+d,curY))curX+=d;draw();};
  window.tetRot=function(){if(!running||paused)return;var r=rotate(cur);if(!collide(r,curX,curY))cur=r;else if(!collide(r,curX+1,curY)){cur=r;curX++;}else if(!collide(r,curX-1,curY)){cur=r;curX--;}draw();};
  window.tetDrop=function(){if(!running||paused)return;drop();};
  window.tetHard=function(){if(!running||paused)return;while(!collide(cur,curX,curY+1)){curY++;score+=2;}place();};
  window.tetPause=function(){paused=!paused;running=!paused;var b=document.getElementById('tet-pause');if(b)b.textContent=paused?'Resume':'Pause';if(!paused)tick();};
  function tick(){if(!running||paused)return;drop();window._gl=setTimeout(tick,Math.max(50,500-level*40));}
  newBoard();newPiece();running=true;draw();tick();
  var keyH=function(e){
    var m={ArrowLeft:function(){tetMove(-1);},ArrowRight:function(){tetMove(1);},ArrowUp:function(){tetRot();},ArrowDown:function(){tetDrop();},x:function(){tetHard();},p:function(){tetPause();}};
    if(m[e.key]){e.preventDefault();m[e.key]();}
  };
  document.addEventListener('keydown',keyH);
}


function gameCrossword(){
  var grid=[
    ['S','U','N','_','_'],
    ['_','_','I','_','_'],
    ['M','O','O','N','_'],
    ['_','_','N','_','_'],
    ['S','T','A','R','S'],
  ];
  var answers=[['SUN',0,0,'across'],['MOON',2,0,'across'],['STARS',4,0,'across'],['NOON',0,2,'down'],['NION','_','_','_']];
  var clues={across:['1. Center of our solar system (3)','3. Earth\'s natural satellite (4)','5. Celestial points of light (5)'],down:['2. Midday (4)']};
  gw().innerHTML=`<h2>📰 Crossword Lite</h2><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px;max-width:200px;margin:12px auto;">${grid.flat().map((c,i)=>`<div style="width:34px;height:34px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;background:${c==='_'?'#1a1d2e':'#f0f0f0'};color:${c==='_'?'transparent':'#1a1d2e'};border:1px solid #ddd;">${c==='_'?'.':c}</div>`).join('')}</div><div style="text-align:left;max-width:280px;margin:0 auto;"><b>Across:</b><br>${clues.across.join('<br>')}<br><b>Down:</b><br>${clues.down.join('<br>')}</div><p style="font-size:14px;color:#888;">Can you solve these space-themed clues?</p><button class="g-btn" onclick="gameCrossword()">New Puzzle</button>`;
}

/* CHESS PUZZLES */
var CP=[
  {fen:'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR',move:'Qxf2#',desc:'Fool\'s Mate — Qxf2#'},
  {fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R',move:'Bxf7+',desc:'Scholar\'s Attack — Bxf7+'},
  {fen:'8/8/8/8/8/k7/8/KQ6',move:'Qb2#',desc:'King+Queen vs King — Qb2#'},
];
function gameChess(){
  _LVL.init('chess',30);
  var level=_LVL.level;
  var PUZZLES=[
    // Easy - Mate in 1
    {fen:'Scholar mate setup',desc:'White: Qh5+Bc4 vs Black king on e8',solution:'Qxf7#',hint:'Queen takes f7',difficulty:'Easy - Mate in 1',moves:['Qxf7#'],wrong:['Qf3','Bc4','Nf3']},
    {fen:'Back rank',desc:'White Rook on d1, Black king on e8 with no escape',solution:'Rd8#',hint:'Rook to d8',difficulty:'Easy - Mate in 1',moves:['Rd8#'],wrong:['Rd7','Re1','Rb1']},
    {fen:'Fool mate',desc:'White bishop on c4, queen on h5',solution:'Qxf7#',hint:'Queen captures f7',difficulty:'Easy - Mate in 1',moves:['Qxf7#'],wrong:['Qf3','Bxf7','Nf3']},
    {fen:'Smothered mate',desc:'Knight can fork king and queen',solution:'Nf7#',hint:'Knight to f7',difficulty:'Easy - Mate in 1',moves:['Nf7#'],wrong:['Ne4','Ng5','Nd6']},
    {fen:'Queen mate',desc:'Queen and rook battery',solution:'Qd8#',hint:'Queen to d8',difficulty:'Easy - Mate in 1',moves:['Qd8#'],wrong:['Rd8','Qe7','Qb8']},
    // Medium
    {fen:'Double check',desc:'Discovered check opportunity',solution:'Nxd5+',hint:'Knight captures d5 with check',difficulty:'Medium - Win Material',moves:['Nxd5+'],wrong:['Nf4','Ne3','Nc3']},
    {fen:'Fork tactic',desc:'Knight fork: king and rook',solution:'Ne7+',hint:'Knight to e7 forking king and rook',difficulty:'Medium - Fork',moves:['Ne7+'],wrong:['Nd5','Nc6','Nf5']},
    {fen:'Pin tactic',desc:'Pin the knight to win the queen',solution:'Bb5',hint:'Bishop pins the knight',difficulty:'Medium - Pin',moves:['Bb5'],wrong:['Bc4','Ba6','Bd3']},
    {fen:'Skewer',desc:'Skewer king to win rook',solution:'Bg5+',hint:'Bishop skewers king',difficulty:'Medium - Skewer',moves:['Bg5+'],wrong:['Bf4','Bh4','Be3']},
    {fen:'Zwischenzug',desc:'In-between move wins material',solution:'Nxe5',hint:'Knight captures e5',difficulty:'Medium',moves:['Nxe5'],wrong:['Nf3','Nd4','Nc3']},
    // Hard
    {fen:'Deflection',desc:'Deflect the defender',solution:'Rxd5',hint:'Rook captures d5 to deflect',difficulty:'Hard - Deflection',moves:['Rxd5'],wrong:['Rd6','Rd7','Rd4']},
    {fen:'Interference',desc:'Interfere with piece coordination',solution:'Nd5',hint:'Knight to d5 interferes',difficulty:'Hard - Interference',moves:['Nd5'],wrong:['Ne3','Nc3','Nf4']},
    {fen:'Decoy',desc:'Decoy the queen to win',solution:'Rd8+',hint:'Rook decoys queen',difficulty:'Hard - Decoy',moves:['Rd8+'],wrong:['Rb8','Rc8','Re8']},
    {fen:'X-ray',desc:'X-ray attack through pieces',solution:'Qxd8',hint:'Queen x-ray through the rook',difficulty:'Hard - X-ray',moves:['Qxd8'],wrong:['Qe7','Qb8','Qc7']},
    {fen:'Zugzwang',desc:'Any move loses for the opponent',solution:'Ka6',hint:'King to a6 creates zugzwang',difficulty:'Hard - Zugzwang',moves:['Ka6'],wrong:['Ka4','Kb6','Kc6']},
  ];
  var idx=Math.min(PUZZLES.length-1,Math.floor(level/30*PUZZLES.length));
  var puzzle=PUZZLES[idx];
  var timeLimit=Math.max(10,40-level);var timer=timeLimit;
  var allMoves=[puzzle.moves[0]].concat(puzzle.wrong).sort(function(){return Math.random()-.5;});
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('♟️ Chess Puzzles','#a78bfa');
  h+='<div style="background:rgba(255,255,255,.08);border-radius:12px;padding:16px;margin-bottom:12px;">';
  h+='<div style="font-size:12px;font-weight:700;color:rgba(255,255,255,.5);margin-bottom:6px;">'+puzzle.difficulty+'</div>';
  h+='<div style="font-size:15px;font-weight:700;margin-bottom:6px;color:var(--text);">'+puzzle.desc+'</div>';
  h+='<div style="font-size:13px;color:rgba(255,255,255,.6);">White to move. Find the best move!</div>';
  h+='</div>';
  if(level>=5)h+='<div id="chess-timer" style="text-align:center;font-size:20px;font-weight:800;margin-bottom:10px;color:'+(timer<=10?'#ef4444':'#a78bfa')+';">⏱ '+timer+'s</div>';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:10px;">';
  allMoves.forEach(function(move){
    h+='<button onclick="chessAns(\''+move+'\')" style="padding:14px;border-radius:12px;border:2px solid rgba(255,255,255,.2);background:rgba(255,255,255,.1);cursor:pointer;font-size:16px;font-weight:900;color:var(--text);font-family:monospace;transition:all .15s;" onmouseover="this.style.background=\'rgba(167,139,250,.4)\';" onmouseout="this.style.background=\'rgba(255,255,255,.1)\';">'+move+'</button>';
  });
  h+='</div>';
  h+='<div style="text-align:center;"><button onclick="chessHint()" style="background:none;border:1px solid rgba(255,255,255,.2);border-radius:8px;padding:6px 14px;color:rgba(255,255,255,.6);cursor:pointer;font-size:12px;">💡 Hint (-10pts)</button></div>';
  g.innerHTML=h;
  if(level>=5){
    window._chessTimer=setInterval(function(){timer--;var te=document.getElementById('chess-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=10?'#ef4444':'#a78bfa';}if(timer<=0){clearInterval(window._chessTimer);_LVL.lose();setTimeout(function(){gameChess();},800);}},1000);
  }
  window.chessAns=function(move){
    if(window._chessTimer)clearInterval(window._chessTimer);
    if(move===puzzle.moves[0]){_LVL.win(40);showScorePop('+40');setTimeout(function(){gameChess();},800);}
    else{var alive=_LVL.lose();var btns=g.querySelectorAll('button');btns.forEach(function(b){if(b.textContent===puzzle.moves[0])b.style.background='rgba(34,197,94,.5)';else if(b.textContent===move)b.style.background='rgba(239,68,68,.5)';b.disabled=true;});if(alive)setTimeout(function(){gameChess();},1500);}
  };
  window.chessHint=function(){_LVL.score=Math.max(0,_LVL.score-10);var g2=gw();if(g2){var fb=document.createElement('div');fb.style.cssText='text-align:center;padding:8px;color:rgba(255,255,255,.7);font-size:13px;margin-top:6px;';fb.textContent='Hint: '+puzzle.hint;g2.appendChild(fb);}};
}


function chCheck(ans){
  var v=document.getElementById('ch-in').value.trim();
  var msg=document.getElementById('ch-msg');
  if(v===ans){msg.style.color='#2ecc71';msg.textContent='✅ Correct!';setTimeout(()=>{window._chIdx=(window._chIdx||0)+1;if(window._chIdx>=CP.length){gw().innerHTML=`<h2>♟️ Chess Puzzles</h2><div style="font-size:48px;">🏆</div><div>All puzzles solved!</div><button class="g-btn" onclick="gameChess()">Play Again</button>`;}else{CP_idx++;window._chShow();}},800);}
  else{msg.style.color='#e74c3c';msg.textContent='❌ Try again!';}
}
function chReveal(ans){document.getElementById('ch-msg').style.color='#888';document.getElementById('ch-msg').textContent='Answer: '+ans;}

/* SUDOKU */
var SUDOKU_PUZZLES=[
  {puzzle:'530070000600195000098000060800060003400803001700020006060000280000419005000080079',solution:'534678912672195348198342567859761423426853791713924856961537284287419635345286179'},
];
function gameSudoku(){
  var EASY_PUZZLES=[
    {p:'530070000600195000098000060800060003400803001700020006060000280000419005000080079',s:'534678912672195348198342567859761423426853791713924856961537284287419635345286179'},
    {p:'010020300004005060070000009006900040000700800090004020500000010080300400003010090',s:'815427396234895761976231459156982743423716852798543126542369817687154934361879025'},
  ];
  var idx=Math.floor(Math.random()*EASY_PUZZLES.length);
  var puz=EASY_PUZZLES[idx];
  var cells=puz.p.split('');
  window._sudGrid=cells.slice();
  window._sudSol=puz.s;
  window._sudFixed=cells.map(function(v){return v!=='0';});
  window._sudSel=-1;
  sudokuRender();
}
function sudokuRender(){
  var g=window._sudGrid;var fixed=window._sudFixed;var sel=window._sudSel;
  var el=gw();if(!el)return;
  var h='<div style="text-align:center;">';
  h+='<div style="font-size:16px;font-weight:800;color:#fff;margin-bottom:10px;">🔲 Sudoku</div>';
  h+='<div id="sud-grid" style="display:inline-grid;grid-template-columns:repeat(9,32px);gap:1px;background:rgba(255,255,255,.2);padding:3px;border-radius:8px;">';
  for(var i=0;i<81;i++){
    var r=Math.floor(i/9),col=i%9;
    var val=g[i]==='0'?'':g[i];
    var isSel=sel===i;
    var isFixed=fixed[i];
    var borderR=(col===2||col===5)?'border-right:2px solid rgba(255,255,255,.4);':'';
    var borderB=(r===2||r===5)?'border-bottom:2px solid rgba(255,255,255,.4);':'';
    var bg=isSel?'rgba(99,102,241,.6)':(isFixed?'rgba(255,255,255,.15)':'rgba(255,255,255,.06)');
    var color=isFixed?'rgba(255,255,255,.9)':'#818cf8';
    h+='<div onclick="sudClick('+i+')" style="width:32px;height:32px;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:'+(isFixed?'800':'700')+';color:'+color+';background:'+bg+';cursor:'+(isFixed?'default':'pointer')+';border-radius:3px;'+borderR+borderB+'">'+val+'</div>';
  }
  h+='</div>';
  h+='<div style="display:grid;grid-template-columns:repeat(5,1fr);gap:4px;max-width:200px;margin:10px auto;">';
  for(var n=1;n<=9;n++){
    h+='<button onclick="sudNum('+n+')" style="padding:8px;border-radius:8px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:14px;font-weight:700;cursor:pointer;">'+n+'</button>';
  }
  h+='<button onclick="sudNum(0)" style="padding:8px;border-radius:8px;background:rgba(239,68,68,.2);border:1px solid rgba(239,68,68,.3);color:#f87171;font-size:14px;font-weight:700;cursor:pointer;">✕</button>';
  h+='</div>';
  h+='<button onclick="checkSudoku()" style="padding:10px 24px;border-radius:10px;background:linear-gradient(135deg,#6366f1,#8b5cf6);border:none;color:#fff;font-size:14px;font-weight:700;cursor:pointer;margin-top:4px;">✓ Check</button>';
  h+='<div id="sud-msg" style="margin-top:8px;font-size:13px;min-height:20px;"></div></div>';
  el.innerHTML=h;
}
window.sudClick=function(i){window._sudSel=i;sudokuRender();};
window.sudNum=function(n){
  var i=window._sudSel;
  if(i<0||window._sudFixed[i])return;
  window._sudGrid[i]=n===0?'0':String(n);
  sudokuRender();
};
window.checkSudoku=function(){
  var correct=window._sudGrid.join('')===window._sudSol;
  var msg=document.getElementById('sud-msg');
  if(msg){msg.style.color=correct?'#4ade80':'#f87171';msg.textContent=correct?'🏆 Perfect! Solved!':'❌ Not quite. Keep trying!';}
  if(correct){earnXP(100,'Sudoku');playSound('win');launchConfetti&&launchConfetti(60);}
};

/* CIPHER DECODE */
var CI_PHRASES=[['KHOOR','HELLO',3],['ZRUOG','WORLD',3],['DQQHB','DANNY',3],['FRGH','CODE',3],['VHFUHW','SECRET',3],['PDJLF','MAGIC',3]];
function gameCipher(){
  _LVL.init('cipher',35);
  var level=_LVL.level;
  var PHRASES=[
    ['HELLO WORLD','Easy'],['THE CAT SAT','Easy'],['PLAY MORE GAMES','Easy'],
    ['BRAIN GAMES ARE FUN','Medium'],['THE QUICK BROWN FOX','Medium'],
    ['PRACTICE MAKES PERFECT','Medium'],['KNOWLEDGE IS POWER','Medium'],
    ['EVERY CLOUD HAS SILVER LINING','Hard'],['THE EARLY BIRD CATCHES THE WORM','Hard'],
    ['NECESSITY IS MOTHER OF INVENTION','Expert']
  ];
  var tier=Math.min(PHRASES.length-1,Math.floor(level/35*PHRASES.length)+Math.floor(Math.random()*2));
  var phrase=PHRASES[tier][0];
  var shift=3+Math.floor(level%18);
  var encoded=phrase.split('').map(function(ch){
    if(ch>='A'&&ch<='Z')return String.fromCharCode((ch.charCodeAt(0)-65+shift)%26+65);
    return ch;
  }).join('');
  var timeLimit=Math.max(15,45-level);var timer=timeLimit;
  var g=gw();if(!g)return;
  var h=_LVL.renderHeader('🔐 Cipher Decode','#818cf8');
  h+='<div style="background:rgba(99,102,241,.08);border-radius:14px;padding:14px;margin-bottom:12px;">';
  h+='<div style="font-size:11px;color:#818cf8;font-weight:700;margin-bottom:6px;">ENCODED (Caesar +'+shift+')</div>';
  h+='<div style="font-size:20px;font-weight:900;color:#1e293b;letter-spacing:3px;word-break:break-all;">'+encoded+'</div>';
  h+='</div>';
  h+='<div style="font-size:12px;color:#64748b;text-align:center;margin-bottom:8px;">A→'+String.fromCharCode(65+shift)+', B→'+String.fromCharCode(66+shift>90?66+shift-26:66+shift)+'...</div>';
  if(level>=5)h+='<div id="ci-timer" style="text-align:center;font-size:22px;font-weight:900;margin-bottom:10px;color:'+(timer<=10?'#ef4444':'#818cf8')+';">⏱ '+timer+'s</div>';
  h+='<input id="ci-inp" type="text" placeholder="Type decoded message..." style="width:100%;padding:13px;border-radius:12px;border:2px solid #e2e8f0;font-size:14px;font-weight:700;font-family:inherit;text-transform:uppercase;letter-spacing:2px;outline:none;box-sizing:border-box;margin-bottom:10px;" autocorrect="off" autocapitalize="characters">';
  h+='<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">';
  h+='<button class="btn" onclick="ciCheck()" style="padding:13px;">Decode!</button>';
  h+='<button class="btn btn-sec" onclick="ciHint()" style="padding:13px;">💡 Hint</button>';
  h+='</div><div id="ci-fb" style="text-align:center;margin-top:8px;font-size:12px;color:#64748b;"></div>';
  g.innerHTML=h;
  var inp=document.getElementById('ci-inp');
  if(inp){inp.focus();inp.onkeydown=function(e){if(e.key==='Enter')ciCheck();};}
  if(level>=5){window._ciTmr=setInterval(function(){timer--;var te=document.getElementById('ci-timer');if(te){te.textContent='⏱ '+timer+'s';te.style.color=timer<=10?'#ef4444':'#818cf8';}if(timer<=0){clearInterval(window._ciTmr);_LVL.lose();setTimeout(function(){gameCipher();},800);}},1000);}
  window.ciCheck=function(){
    if(window._ciTmr)clearInterval(window._ciTmr);
    var val=(document.getElementById('ci-inp').value||'').trim().toUpperCase();
    if(val===phrase){_LVL.win(40);showScorePop('+40');setTimeout(function(){gameCipher();},1000);}
    else{var alive=_LVL.lose();var fb=document.getElementById('ci-fb');if(fb)fb.textContent='Wrong! Answer: '+phrase;if(alive)setTimeout(function(){gameCipher();},1800);}
  };
  window.ciHint=function(){var fb=document.getElementById('ci-fb');if(fb)fb.textContent='First word: '+phrase.split(' ')[0];};
}


function nextCipher(){
  if(window._ciIdx>=window._ciPhrases.length){gw().innerHTML=`<h2>🔐 Cipher Decode</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._ciScore}/${window._ciPhrases.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameCipher()">Play Again</button>`;return;}
  var [encoded,decoded,shift]=window._ciPhrases[window._ciIdx];
  window._ciAnswer=decoded;
  gw().innerHTML=`<h2>🔐 Cipher Decode</h2><div style="font-size:14px;color:#888;">Phrase ${window._ciIdx+1}/${window._ciPhrases.length} | Score:${window._ciScore}</div><p>Caesar cipher (shift -${shift}). Decode:</p><div style="font-size:42px;font-weight:900;letter-spacing:8px;margin:16px;color:#3498db;">${encoded}</div><input id="ci-in" type="text" style="font-size:20px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:160px;text-transform:uppercase;" onkeydown="if(event.key==='Enter')ciCheck()"><button class="g-btn" style="display:block;margin:10px auto 0;" onclick="ciCheck()">Decode</button><div id="ci-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('ci-in').focus();
}
function ciCheck(){
  var v=document.getElementById('ci-in').value.toUpperCase().trim();
  var msg=document.getElementById('ci-msg');
  if(v===window._ciAnswer){window._ciScore++;msg.style.color='#2ecc71';msg.textContent='✅ Correct!';window._ciIdx++;setTimeout(nextCipher,800);}
  else{msg.style.color='#e74c3c';msg.textContent='❌ Try again!';}
}

/* LIGHTS OUT */
function gameLightsOut(){window._loGrid=Array(25).fill(0).map(()=>Math.random()>0.5?1:0);window._loMoves=0;renderLO();}
function loClick(i){
  var g=window._loGrid;window._loMoves++;
  var r=Math.floor(i/5),c=i%5;
  [[0,0],[-1,0],[1,0],[0,-1],[0,1]].forEach(([dr,dc])=>{const nr=r+dr,nc=c+dc;if(nr>=0&&nr<5&&nc>=0&&nc<5)g[nr*5+nc]^=1;});
  renderLO();
}

/* FLAPPY BIRD */
function gameFlappy(){
  var W=320,H=480,BR=13,GAP=145,PSPEED=2.8,PW=50;
  var bird={x:75,y:H/2,v:0,r:0};
  var pipes=[],score=0,best=+(localStorage.getItem('bestFlappy')||0);
  var state='idle',frame=0;
  var G=0.48,JUMP=-8.5;
  var g=gw();if(!g)return;

  g.innerHTML='<div style="text-align:center;">'
    +'<canvas id="flappyCanvas" width="'+W+'" height="'+H+'" style="border-radius:12px;max-width:100%;cursor:pointer;display:block;margin:0 auto;"></canvas>'
    +'<div id="flappy-msg" style="margin-top:6px;font-size:14px;font-weight:600;color:var(--muted);">Tap or press Space to flap!</div>'
    +'</div>';

  var canvas=document.getElementById('flappyCanvas'),ctx=canvas.getContext('2d');
  var animFrame;

  function jump(){
    if(state==='idle'){state='playing';frame=0;pipes=[];score=0;bird={x:75,y:H/2,v:0,r:0};addPipe();animate();}
    else if(state==='playing'){bird.v=JUMP;bird.r=-30;playSound('click');}
    else if(state==='dead'){state='idle';draw();}
  }
  function addPipe(){var th=60+Math.random()*(H-GAP-120);pipes.push({x:W,th:th,done:false});}

  function draw(){
    // Sky
    var sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#1e40af');sky.addColorStop(0.6,'#3b82f6');sky.addColorStop(1,'#93c5fd');
    ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
    // Clouds
    [[40,80,50],[130,50,35],[240,90,45],[290,55,30]].forEach(function(cl){
      ctx.fillStyle='rgba(255,255,255,.7)';
      ctx.beginPath();ctx.ellipse(cl[0],cl[1],cl[2],cl[2]*0.5,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(cl[0]-15,cl[1]+5,cl[2]*0.6,cl[2]*0.35,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(cl[0]+15,cl[1]+5,cl[2]*0.6,cl[2]*0.35,0,0,Math.PI*2);ctx.fill();
    });
    // Ground
    ctx.fillStyle='#92400e';ctx.fillRect(0,H-48,W,48);
    ctx.fillStyle='#65a30d';ctx.fillRect(0,H-52,W,8);
    var gx=((frame*PSPEED)%40);
    ctx.fillStyle='#84cc16';
    for(var gxi=0;gxi<W+40;gxi+=40){ctx.fillRect(gxi-gx,H-48,20,4);}
    // Pipes
    pipes.forEach(function(p){
      var pg=ctx.createLinearGradient(p.x,0,p.x+PW,0);
      pg.addColorStop(0,'#166534');pg.addColorStop(0.4,'#22c55e');pg.addColorStop(1,'#15803d');
      ctx.fillStyle=pg;
      ctx.fillRect(p.x,0,PW,p.th);
      ctx.fillRect(p.x,p.th+GAP,PW,H-p.th-GAP-48);
      // Pipe caps
      ctx.fillStyle='#16a34a';
      ctx.fillRect(p.x-5,p.th-22,PW+10,22);
      ctx.fillRect(p.x-5,p.th+GAP,PW+10,22);
    });
    // Bird
    ctx.save();ctx.translate(bird.x,bird.y);ctx.rotate(Math.max(-30,Math.min(80,bird.r))*Math.PI/180);
    // Body
    ctx.fillStyle='#fbbf24';ctx.beginPath();ctx.ellipse(0,0,BR,BR-2,0,0,Math.PI*2);ctx.fill();
    // Wing
    ctx.fillStyle='#f59e0b';ctx.beginPath();ctx.ellipse(-2,-BR+3,8,5,-0.4,0,Math.PI*2);ctx.fill();
    // Eye
    ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(BR-5,-3,5,5,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#1e293b';ctx.beginPath();ctx.ellipse(BR-4,-3,3,3,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#fff';ctx.beginPath();ctx.ellipse(BR-3,-4,1.5,1.5,0,0,Math.PI*2);ctx.fill();
    // Beak
    ctx.fillStyle='#f97316';ctx.beginPath();ctx.moveTo(BR+1,0);ctx.lineTo(BR+9,3);ctx.lineTo(BR+1,5);ctx.fill();
    ctx.restore();
    // Score
    if(state==='playing'){
      ctx.fillStyle='rgba(0,0,0,.3)';ctx.fillRect(W/2-30,8,60,36);
      ctx.fillStyle='#fff';ctx.font='bold 26px Plus Jakarta Sans,sans-serif';ctx.textAlign='center';ctx.fillText(score,W/2,34);
    }
    // Overlay
    if(state==='idle'){
      ctx.fillStyle='rgba(255,255,255,.35)';ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#fbbf24';ctx.font='bold 34px Plus Jakarta Sans,sans-serif';ctx.textAlign='center';ctx.fillText('Flappy Bird',W/2,150);
      ctx.fillStyle='#172033';ctx.font='16px Inter,sans-serif';ctx.fillText('Tap to Fly!',W/2,190);
      ctx.fillStyle='#475569';ctx.font='14px Inter,sans-serif';ctx.fillText('Best: '+best,W/2,220);
    }
    if(state==='dead'){
      ctx.fillStyle='rgba(255,255,255,.55)';ctx.fillRect(0,0,W,H);
      ctx.fillStyle='#ef4444';ctx.font='bold 30px Plus Jakarta Sans,sans-serif';ctx.textAlign='center';ctx.fillText('Game Over!',W/2,160);
      ctx.fillStyle='#172033';ctx.font='20px Inter,sans-serif';ctx.fillText('Score: '+score,W/2,200);
      if(score===best&&score>0){ctx.fillStyle='#ffd700';ctx.font='16px Inter,sans-serif';ctx.fillText('New Best!',W/2,230);}
      ctx.fillStyle='#475569';ctx.font='14px Inter,sans-serif';ctx.fillText('Tap to restart',W/2,265);
    }
  }
  function animate(){
    if(state!=='playing')return;
    frame++;
    bird.v+=G;bird.y+=bird.v;bird.r+=4;
    if(bird.y-BR<0){bird.y=BR;bird.v=0;}
    if(frame%95===0)addPipe();
    pipes.forEach(function(p){
      p.x-=PSPEED;
      if(!p.done&&p.x+PW<bird.x){p.done=true;score++;if(score>best){best=score;localStorage.setItem('bestFlappy',best);}earnXP(5,'Flappy Bird');playSound('score');}
      if(bird.x+BR-6>p.x&&bird.x-BR+6<p.x+PW&&(bird.y-BR+4<p.th||bird.y+BR-4>p.th+GAP)){die();}
    });
    if(bird.y+BR>H-48){die();}
    pipes=pipes.filter(function(p){return p.x>-PW;});
    draw();
    animFrame=requestAnimationFrame(animate);
  }
  function die(){
    state='dead';cancelAnimationFrame(animFrame);playSound('lose');earnXP(score,'Flappy Bird');draw();
    var m=document.getElementById('flappy-msg');if(m)m.textContent='Game Over! Score: '+score+' - Tap to try again!';
  }
  canvas.onclick=jump;canvas.ontouchstart=function(e){e.preventDefault();jump();};
  draw();
  var spH=function(e){if(e.code==='Space'){e.preventDefault();jump();}};
  document.addEventListener('keydown',spH);
}



/* ══════════════════════════════════════════════════════════
   GAMENEST WORLD - COMPLETE MONETIZATION SYSTEM
   Revenue streams: Rewarded Video, Interstitial, Affiliate
   ══════════════════════════════════════════════════════════ */

/* ── AD CONFIG (Replace with real advertising code after approval) ──
   Advertising publisher id: ca-pub-3359266836868361
   For rewarded ads: use rewarded video API when approved
   For now: simulated 5s countdown = same UX as real rewarded ads */

var AD_CONFIG = {
  pub: 'ca-pub-3359266836868361',
  rewardedSlot: 'auto',
  interstitialSlot: 'auto',
  bannerSlot: 'auto',
  enabled: true,
  rewardedCooldown: 30000, /* 30s between rewarded ads */
  lastRewardedTime: 0,
  interstitialFreq: 3,   /* show after every 3rd game */
  gamesPlayed: 0
};

/* ── REWARDED VIDEO AD SYSTEM ── */
function showRewardedAd(reason, onComplete) {
  /* reason: 'hint' | 'extra_life' | 'show_answer' | 'continue' | 'bonus' */
  var now = Date.now();
  var cooldownLeft = AD_CONFIG.rewardedCooldown - (now - AD_CONFIG.lastRewardedTime);

  var REWARDS = {
    hint:        { title: 'Get a Hint!',         reward: 'Hint Unlocked', xp: 0,  icon: '💡' },
    extra_life:  { title: 'Get an Extra Life!',  reward: '+1 Life',       xp: 5,  icon: '❤️' },
    show_answer: { title: 'Reveal the Answer!',  reward: 'Answer Shown',  xp: 0,  icon: '🔍' },
    continue:    { title: 'Continue Playing!',   reward: '+3 Lives',      xp: 10, icon: '▶️' },
    bonus:       { title: 'Bonus Reward!',       reward: '+50 XP',        xp: 50, icon: '🎁' },
    skip_level:  { title: 'Skip This Level!',    reward: 'Level Skipped', xp: 5,  icon: '⏭️' }
  };
  var r = REWARDS[reason] || REWARDS.bonus;

  /* Create ad modal */
  var existing = document.getElementById('rewarded-modal');
  if (existing) existing.remove();

  var modal = document.createElement('div');
  modal.id = 'rewarded-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.85);display:flex;align-items:center;justify-content:center;z-index:99999;backdrop-filter:blur(8px);';

  var countdown = 5;
  modal.innerHTML = rewardedModalHTML(r, countdown, false);
  document.body.appendChild(modal);

  var iv = setInterval(function() {
    countdown--;
    var cd = document.getElementById('rwrd-countdown');
    var bar = document.getElementById('rwrd-bar');
    var btn = document.getElementById('rwrd-claim');
    if (cd) cd.textContent = countdown > 0 ? countdown + 's' : '✓';
    if (bar) bar.style.width = ((5-countdown)/5*100) + '%';
    if (countdown <= 0) {
      clearInterval(iv);
      AD_CONFIG.lastRewardedTime = Date.now();
      if (btn) { btn.disabled = false; btn.style.opacity = '1'; btn.style.cursor = 'pointer'; }
      var adBox = document.getElementById('rwrd-ad-box');
      if (adBox) adBox.innerHTML = '<div style="font-size:48px;text-align:center;padding:20px;">✅</div>';
    }
  }, 1000);

  window._claimReward = function() {
    if (countdown > 0) return;
    modal.remove();
    /* Give reward */
    if (reason === 'extra_life' || reason === 'continue') gainLive(reason === 'continue' ? 3 : 1);
    if (r.xp > 0) earnXP(r.xp, 'Rewarded Ad');
    playSound('win');
    showToast(r.reward, r.xp);
    if (onComplete) onComplete();
  };

  window._skipReward = function() {
    clearInterval(iv);
    modal.remove();
  };
}

function rewardedModalHTML(r, cd, done) {
  return '<div style="background:linear-gradient(145deg,#1e1b4b,#312e81);border-radius:24px;padding:28px 24px;text-align:center;max-width:320px;width:90%;border:1px solid rgba(129,140,248,.3);">'
    + '<div style="font-size:48px;margin-bottom:8px;">'+r.icon+'</div>'
    + '<div style="color:#e0e7ff;font-size:20px;font-weight:900;margin-bottom:4px;">'+r.title+'</div>'
    + '<div style="color:rgba(255,255,255,.5);font-size:13px;margin-bottom:16px;">Watch a short ad to earn: <strong style="color:#818cf8;">'+r.reward+'</strong></div>'
    /* Simulated ad area */
    + '<div id="rwrd-ad-box" style="background:#000;border-radius:12px;height:140px;margin-bottom:14px;display:flex;align-items:center;justify-content:center;overflow:hidden;position:relative;">'
    + '<div style="color:#374151;font-size:12px;text-align:center;padding:20px;">'
    + '<div style="font-size:32px;margin-bottom:8px;">📺</div>'
    + '<div>Advertisement</div>'
    + '<div style="font-size:10px;margin-top:4px;color:#6b7280;">(Video Reward)</div>'
    + '</div>'
    + '<div style="position:absolute;top:8px;right:8px;background:rgba(0,0,0,.7);color:#fff;font-size:11px;padding:3px 8px;border-radius:4px;" id="rwrd-countdown">'+cd+'s</div>'
    + '</div>'
    /* Progress bar */
    + '<div style="background:rgba(255,255,255,.1);border-radius:99px;height:6px;margin-bottom:14px;overflow:hidden;">'
    + '<div id="rwrd-bar" style="background:#818cf8;height:6px;border-radius:99px;width:0%;transition:width 1s linear;"></div>'
    + '</div>'
    + '<button id="rwrd-claim" onclick="_claimReward()" disabled style="width:100%;padding:14px;border-radius:12px;background:#4338ca;border:none;color:#fff;font-size:15px;font-weight:700;cursor:not-allowed;margin-bottom:10px;opacity:.4;transition:all .3s;">Claim '+r.reward+'</button>'
    + '<button onclick="_skipReward()" style="background:none;border:none;color:rgba(255,255,255,.3);font-size:12px;cursor:pointer;">Skip</button>'
    + '</div>';
}

/* ── INTERSTITIAL AD (shown between games) ── */
var _gamesPlayedCount = 0;

function trackGamePlay() {
  _gamesPlayedCount++;
  if (_gamesPlayedCount % AD_CONFIG.interstitialFreq === 0) {
    setTimeout(showInterstitial, 500);
  }
}

function showInterstitial() {
  var existing = document.getElementById('interstitial-modal');
  if (existing) return;

  var modal = document.createElement('div');
  modal.id = 'interstitial-modal';
  modal.style.cssText = 'position:fixed;inset:0;background:#000;display:flex;align-items:center;justify-content:center;z-index:99998;';

  var skip = 5;
  modal.innerHTML = '<div style="width:100%;max-width:600px;text-align:center;padding:20px;position:relative;">'
    + '<div style="background:#1a1a2e;border-radius:16px;padding:20px;margin-bottom:16px;min-height:250px;display:flex;flex-direction:column;align-items:center;justify-content:center;">'
    + '<div style="font-size:12px;color:#6b7280;margin-bottom:12px;">Advertisement</div>'
    + '<ins class="adsbygoogle" style="display:block;width:100%;max-width:560px;min-height:200px;" data-ad-client="ca-pub-3359266836868361" data-ad-slot="0000000004" data-ad-format="auto" data-full-width-responsive="true"></ins>'
    + '</div>'
    + '<button id="skip-btn" onclick="closeInterstitial()" style="background:#374151;color:#9ca3af;border:none;border-radius:8px;padding:10px 24px;font-size:14px;cursor:pointer;" disabled>'
    + 'Skip in <span id="skip-cd">'+skip+'</span>s'
    + '</button>'
    + '</div>';

  document.body.appendChild(modal);
  try{ (adsbygoogle = window.adsbygoogle || []).push({}); }catch(e){}

  var iv = setInterval(function() {
    skip--;
    var cd = document.getElementById('skip-cd');
    var btn = document.getElementById('skip-btn');
    if (cd) cd.textContent = skip;
    if (skip <= 0) {
      clearInterval(iv);
      if (btn) { btn.disabled = false; btn.style.background = '#4338ca'; btn.style.color = '#fff'; btn.textContent = 'Close Ad'; }
    }
  }, 1000);
}

window.closeInterstitial = function() {
  var modal = document.getElementById('interstitial-modal');
  if (modal) modal.remove();
};

/* ── AFFILIATE SYSTEM ── */
var AFFILIATES = [
  {
    name: 'Chess.com Premium',
    desc: 'Take your chess to the next level',
    icon: '♟️',
    url: 'https://www.chess.com/premium',
    tag: '?utm_source=gamenestworld',
    color: '#16a34a',
    bg: '#dcfce7',
    commission: '30%',
    category: 'chess'
  },
  {
    name: 'Lumosity Brain Training',
    desc: 'Train memory, attention & problem solving',
    icon: '🧠',
    url: 'https://www.lumosity.com',
    tag: '?utm_source=gamenestworld',
    color: '#7c3aed',
    bg: '#ede9fe',
    commission: '25%',
    category: 'brain'
  },
  {
    name: 'Duolingo Plus',
    desc: 'Learn languages while having fun',
    icon: '🦜',
    url: 'https://www.duolingo.com',
    tag: '?utm_source=gamenestworld',
    color: '#15803d',
    bg: '#dcfce7',
    commission: '15%',
    category: 'word'
  },
  {
    name: 'NordVPN',
    desc: 'Secure your gaming sessions',
    icon: '🔒',
    url: 'https://nordvpn.com',
    tag: '?utm_source=gamenestworld',
    color: '#1d4ed8',
    bg: '#dbeafe',
    commission: '40%',
    category: 'all'
  },
  {
    name: 'Amazon Gaming',
    desc: 'Best gaming gear & accessories',
    icon: '🎮',
    url: 'https://www.amazon.com/gaming',
    tag: '?tag=gamenestworld-20',
    color: '#d97706',
    bg: '#fef3c7',
    commission: '6%',
    category: 'all'
  },
  {
    name: 'Brilliant.org',
    desc: 'Math & science courses — perfect for puzzle lovers',
    icon: '🔬',
    url: 'https://brilliant.org',
    tag: '?utm_source=gamenestworld',
    color: '#dc2626',
    bg: '#fef2f2',
    commission: '30%',
    category: 'math'
  }
];

/* Show affiliate after game based on category */
function showAffiliateAfterGame(gameCategory) {
  var relevant = AFFILIATES.filter(function(a) {
    return a.category === gameCategory || a.category === 'all';
  });
  if (!relevant.length) return;
  var aff = relevant[Math.floor(Math.random() * relevant.length)];

  var existing = document.getElementById('affiliate-banner');
  if (existing) existing.remove();

  var banner = document.createElement('div');
  banner.id = 'affiliate-banner';
  banner.style.cssText = 'position:fixed;bottom:20px;right:20px;max-width:280px;background:#fff;border-radius:16px;padding:16px;box-shadow:0 8px 32px rgba(0,0,0,.2);border:1px solid #e2e8f0;z-index:9997;animation:slideIn .4s ease;';
  banner.innerHTML = '<button onclick="document.getElementById(\'affiliate-banner\').remove()" style="position:absolute;top:8px;right:8px;background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;">&times;</button>'
    + '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px;">'
    + '<div style="width:40px;height:40px;border-radius:10px;background:'+aff.bg+';display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;">'+aff.icon+'</div>'
    + '<div><div style="font-size:13px;font-weight:700;color:#1e293b;">'+aff.name+'</div>'
    + '<div style="font-size:11px;color:#64748b;">'+aff.desc+'</div></div>'
    + '</div>'
    + '<a href="'+aff.url+aff.tag+'" target="_blank" rel="noopener" onclick="trackAffiliate(\''+aff.name+'\')" style="display:block;width:100%;padding:10px;background:'+aff.color+';color:#fff;text-align:center;border-radius:10px;font-size:13px;font-weight:700;text-decoration:none;box-sizing:border-box;">Check it out →</a>'
    + '<div style="font-size:10px;color:#cbd5e1;text-align:center;margin-top:6px;">Sponsored · We earn a commission</div>';

  document.body.appendChild(banner);
  setTimeout(function() {
    var el = document.getElementById('affiliate-banner');
    if (el) el.remove();
  }, 15000);
}

function trackAffiliate(name) {
  /* Track click in Analytics */
  if (window.gtag) gtag('event', 'affiliate_click', { affiliate: name });
}

/* ── DONATE / SUPPORT BUTTON ── */
function showSupportModal() {
  var existing = document.getElementById('support-modal');
  if (existing) { existing.remove(); return; }

  var modal = document.createElement('div');
  modal.id = 'support-modal';
  modal.style.cssText = 'position:fixed;bottom:80px;right:20px;background:#fff;border-radius:20px;padding:20px;max-width:260px;box-shadow:0 12px 40px rgba(0,0,0,.2);border:1px solid #e2e8f0;z-index:9996;animation:slideIn .3s ease;';
  modal.innerHTML = '<button onclick="document.getElementById(\'support-modal\').remove()" style="position:absolute;top:10px;right:10px;background:none;border:none;color:#94a3b8;cursor:pointer;font-size:16px;">&times;</button>'
    + '<div style="text-align:center;margin-bottom:14px;">'
    + '<div style="font-size:32px;margin-bottom:6px;">☕</div>'
    + '<div style="font-size:15px;font-weight:800;color:#1e293b;">Support GameNest!</div>'
    + '<div style="font-size:12px;color:#64748b;margin-top:4px;">Keep all 58 games free forever</div>'
    + '</div>'
    + '<a href="https://ko-fi.com/gamenestworld" target="_blank" rel="noopener" style="display:block;padding:12px;background:#ff5e5b;color:#fff;border-radius:12px;text-align:center;font-size:14px;font-weight:700;text-decoration:none;margin-bottom:8px;">☕ Buy me a coffee ($3)</a>'
    + '<a href="https://ko-fi.com/gamenestworld" target="_blank" rel="noopener" style="display:block;padding:10px;background:#fff;border:2px solid #e2e8f0;color:#64748b;border-radius:12px;text-align:center;font-size:13px;font-weight:600;text-decoration:none;">💝 Monthly supporter ($5/mo)</a>';
  document.body.appendChild(modal);
}

/* ── REVENUE TRACKING ── */
var _revenue = {
  adImpressions: 0,
  rewardedCompleted: 0,
  affiliateClicks: 0,
  estimatedRPM: 2.5, /* $2.50 per 1000 ad views */

  estimate: function() {
    var daily = (this.adImpressions / 1000) * this.estimatedRPM;
    return daily.toFixed(2);
  }
};

/* ── INTEGRATE REWARDED ADS INTO _LVL SYSTEM ── */
/* Override showNoLivesModal to show rewarded ad */
function showNoLivesModal() {
  var box = document.getElementById('modal-box');
  if (!box) return;

  var overlay = document.createElement('div');
  overlay.id = 'no-lives-overlay';
  overlay.style.cssText = 'position:absolute;inset:0;background:rgba(0,0,0,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;border-radius:20px;z-index:10;padding:24px;box-sizing:border-box;';
  overlay.innerHTML = '<div style="font-size:52px;margin-bottom:12px;animation:pulse 1s infinite;">💔</div>'
    + '<div style="color:#fff;font-size:22px;font-weight:900;margin-bottom:6px;text-align:center;">No Lives Left!</div>'
    + '<div style="color:rgba(255,255,255,.6);font-size:14px;margin-bottom:24px;text-align:center;">Watch a short ad to restore lives and keep your progress!</div>'
    /* Option 1: Watch ad */
    + '<button onclick="rewardedForLives()" style="width:100%;max-width:240px;padding:15px;border-radius:14px;background:linear-gradient(135deg,#f59e0b,#d97706);border:none;color:#fff;font-size:16px;font-weight:700;cursor:pointer;margin-bottom:10px;box-shadow:0 4px 20px rgba(245,158,11,.4);">📺 Watch Ad → +3 Lives</button>'
    /* Option 2: Use XP */
    + '<button onclick="xpForLives()" style="width:100%;max-width:240px;padding:13px;border-radius:14px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:14px;font-weight:600;cursor:pointer;margin-bottom:10px;">⭐ Spend 50 XP → +1 Life (You have '+getXP()+'XP)</button>'
    /* Option 3: Exit */
    + '<button onclick="var o=document.getElementById(\'no-lives-overlay\');if(o)o.remove();closeGame();" style="background:none;border:none;color:rgba(255,255,255,.3);font-size:13px;cursor:pointer;">Exit Game</button>';

  box.style.position = 'relative';
  box.appendChild(overlay);
}

window.rewardedForLives = function() {
  var overlay = document.getElementById('no-lives-overlay');
  if (overlay) overlay.remove();
  showRewardedAd('continue', function() {
    gainLive(3);
    _revenue.rewardedCompleted++;
  });
};

window.xpForLives = function() {
  if (getXP() >= 50) {
    setXP(getXP() - 50);
    updateXPUI();
    gainLive(1);
    var overlay = document.getElementById('no-lives-overlay');
    if (overlay) overlay.remove();
    showToast('+1 Life!', 0);
  } else {
    showToast('Not enough XP!', 0);
  }
};

/* ── HINT BUTTON (rewarded) ── */
function getHintRewarded(onHint) {
  showRewardedAd('hint', onHint);
}

/* ── ANSWER REVEAL (rewarded) ── */
function revealAnswerRewarded(onReveal) {
  showRewardedAd('show_answer', onReveal);
}

/* ── SUPPORT FLOATING BUTTON ── */
function addSupportButton() {
  var existing = document.getElementById('support-fab');
  if (existing) return;
  var fab = document.createElement('button');
  fab.id = 'support-fab';
  fab.onclick = showSupportModal;
  fab.style.cssText = 'position:fixed;bottom:20px;right:20px;width:48px;height:48px;border-radius:50%;background:linear-gradient(135deg,#ff5e5b,#ff8c00);color:#fff;border:none;font-size:20px;cursor:pointer;box-shadow:0 4px 16px rgba(255,94,91,.4);z-index:9995;transition:all .2s;';
  fab.title = 'Support GameNest';
  fab.textContent = '☕';
  fab.onmouseover = function() { fab.style.transform = 'scale(1.1)'; };
  fab.onmouseout = function() { fab.style.transform = 'scale(1)'; };
  document.body.appendChild(fab);
}

/* ── AFFILIATE SECTION IN PAGE ── */
function renderAffiliateSection() {
  var section = document.getElementById('affiliate-section');
  if (!section) return;
  var h = '<div style="max-width:1160px;margin:0 auto;padding:0 20px 40px;">';
  h += '<div style="font-size:18px;font-weight:900;color:var(--text);margin-bottom:16px;">🎯 Recommended for Gamers</div>';
  h += '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">';
  if(!Array.isArray(AFFILIATES)||!AFFILIATES.length)return;
  AFFILIATES.forEach(function(aff) {
    h += '<a href="'+aff.url+aff.tag+'" target="_blank" rel="noopener" onclick="trackAffiliate(\''+aff.name+'\')" style="display:block;background:#fff;border-radius:14px;padding:16px;border:1.5px solid #e2e8f0;text-decoration:none;transition:all .2s;" onmouseover="this.style.transform=\'translateY(-3px)\';this.style.boxShadow=\'0 8px 24px rgba(0,0,0,.1)\'" onmouseout="this.style.transform=\'\';this.style.boxShadow=\'\'">';
    h += '<div style="font-size:28px;margin-bottom:8px;">'+aff.icon+'</div>';
    h += '<div style="font-size:13px;font-weight:700;color:#1e293b;margin-bottom:4px;">'+aff.name+'</div>';
    h += '<div style="font-size:11px;color:#64748b;margin-bottom:10px;">'+aff.desc+'</div>';
    h += '<div style="font-size:11px;font-weight:700;color:'+aff.color+';">Try Free →</div>';
    h += '</a>';
  });
  h += '</div></div>';
  section.innerHTML = h;
}

/* ── CSS ANIMATIONS ── */
var monetStyle = document.createElement('style');
monetStyle.textContent = '@keyframes slideIn{from{transform:translateY(20px);opacity:0}to{transform:translateY(0);opacity:1}}@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.1)}}';
document.head.appendChild(monetStyle);


function gameWordsearch(){
  var WORDS=['BRAIN','CHESS','SNAKE','PIXEL','QUEST','NINJA','LEVEL','SCORE','TETRIS','PUZZLE','GAMES','MOUSE','CLICK','BONUS','TIMER','LIVES','QUEST','HERO','STAR','COIN'];
  var N=10;
  var grid=[];
  for(var i=0;i<N;i++){grid.push([]);for(var j=0;j<N;j++)grid[i].push('');}
  var DIRS=[[0,1],[1,0],[1,1],[0,-1],[-1,0],[-1,-1],[1,-1],[-1,1]];
  var placed=[];var found=[];
  
  function place(word){
    var dirs=[].concat(DIRS).sort(function(){return Math.random()-.5;});
    for(var t=0;t<150;t++){
      var d=dirs[t%8];
      var r=rnd(0,N-1),col=rnd(0,N-1);
      var pos=[];var ok=1;
      for(var i=0;i<word.length;i++){
        var nr=r+d[0]*i,nc=col+d[1]*i;
        if(nr<0||nr>=N||nc<0||nc>=N){ok=0;break;}
        if(grid[nr][nc]&&grid[nr][nc]!==word[i]){ok=0;break;}
        pos.push([nr,nc]);
      }
      if(ok){
        pos.forEach(function(p,i){grid[p[0]][p[1]]=word[i];});
        placed.push({word:word,pos:pos});
        return true;
      }
    }
    return false;
  }
  
  var useWords=shuffle(WORDS).slice(0,8);
  useWords.forEach(function(w){place(w);});
  
  // Fill empty cells
  var ALPHA='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(var i=0;i<N;i++)for(var j=0;j<N;j++)if(!grid[i][j])grid[i][j]=ALPHA[rnd(0,25)];
  
  var selStart=null;var selCells=[];var score=0;
  
  window.wsRender=function(){
    var g=gw();if(!g)return;
    var h='<div style="text-align:center;">';
    h+='<div style="font-size:18px;font-weight:900;color:var(--text);margin-bottom:8px;">🔠 Word Search</div>';
    h+='<div style="font-size:13px;color:var(--muted);margin-bottom:10px;">Found: '+found.length+'/'+useWords.length+'</div>';
    
    // Word list
    h+='<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:6px;margin-bottom:12px;">';
    useWords.forEach(function(w){
      var done=found.indexOf(w)>=0;
      h+='<span style="font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;background:'+(done?'#22c55e':'#f1f5f9')+';color:'+(done?'#fff':'#64748b')+';text-decoration:'+(done?'line-through':'none')+';">'+w+'</span>';
    });
    h+='</div>';
    
    // Grid
    h+='<div id="ws-grid" style="display:inline-grid;grid-template-columns:repeat('+N+',30px);gap:2px;user-select:none;">';
    for(var r=0;r<N;r++){
      for(var col2=0;col2<N;col2++){
        var key=r+'-'+col2;
        var isSel=selCells.some(function(c){return c[0]===r&&c[1]===col2;});
        var isFound=false;
        placed.forEach(function(pw){if(found.indexOf(pw.word)>=0){pw.pos.forEach(function(p){if(p[0]===r&&p[1]===col2)isFound=true;});}});
        h+='<div data-r="'+r+'" data-c="'+col2+'" onmousedown="wsStart('+r+','+col2+')" onmouseover="wsOver('+r+','+col2+')" onmouseup="wsEnd()" ontouchstart="wsStart('+r+','+col2+')" style="width:30px;height:30px;border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:800;cursor:pointer;background:'+(isFound?'#22c55e':isSel?'#818cf8':'#f8faff')+';color:'+(isFound||isSel?'#fff':'#1e293b')+';border:1px solid '+(isFound?'#16a34a':isSel?'#6366f1':'#e2e8f0')+';">'+grid[r][col2]+'</div>';
      }
    }
    h+='</div>';
    h+='<div style="margin-top:10px;font-size:13px;font-weight:700;color:#6366f1;">Score: '+score+'</div>';
    h+='</div>';
    g.innerHTML=h;
  }
  
  window.wsStart=function(r,col){selStart=[r,col];selCells=[[r,col]];window.wsRender();};
  window.wsOver=function(r,col){
    if(!selStart)return;
    var r0=selStart[0],c0=selStart[1];
    var dr=r-r0,dc=col-c0;
    var steps=Math.max(Math.abs(dr),Math.abs(dc));
    if(steps===0){selCells=[[r0,c0]];window.wsRender();return;}
    var sr=dr===0?0:(dr>0?1:-1),sc=dc===0?0:(dc>0?1:-1);
    selCells=[];
    for(var i=0;i<=steps;i++)selCells.push([r0+sr*i,c0+sc*i]);
    window.wsRender();
  };
  window.wsEnd=function(){
    if(!selCells.length)return;
    var word=selCells.map(function(c){return grid[c[0]][c[1]];}).join('');
    var rword=word.split('').reverse().join('');
    placed.forEach(function(pw){
      if(found.indexOf(pw.word)<0){
        var match=false;
        if(word===pw.word||rword===pw.word)match=true;
        if(!match){
          var s=JSON.stringify(selCells);var ps=JSON.stringify(pw.pos);var psr=JSON.stringify(pw.pos.slice().reverse());
          if(s===ps||s===psr)match=true;
        }
        if(match){found.push(pw.word);score+=20;earnXP(20,'Word Search');playSound('score');showScorePop('+20');}
      }
    });
    selStart=null;selCells=[];
    if(found.length>=useWords.length){
      earnXP(100,'Word Search Complete');
      showWin('Puzzle Complete!','Found all '+useWords.length+' words!',100);
    }
    window.wsRender();
  };
  window.wsRender();
}

var GAMES={
  coin:gameCoinFlip,dice:gameDice,rps:gameRPS,colorquiz:gameColorQuiz,
  mathbasic:gameMathBasic,flagquiz:gameFlagQuiz,numguess:gameNumGuess,
  reaction:gameReaction,truefalse:gameTrueFalse,simon:gameSimon,
  wordscramble:gameWordScramble,riddles:gameRiddles,emojiquiz:gameEmojiQuiz,
  oddone:gameOddOne,colormatch:gameColorMatch,
  genquiz:gameGenQuiz,memory:gameMemory,ttt:gameTTT,hangman:gameHangman,
  mathquiz:gameMathQuiz,typing:gameTyping,anagram:gameAnagram,
  geoquiz:gameGeoQuiz,times:gameTimes,mines:gameMines,sciquiz:gameSciQuiz,
  wordchain:gameWordChain,c4:gameC4,patternmem:gamePatternMem,snake:gameSnake,
  moviequiz:gameMovieQuiz,pong:gamePong,make24:gameMake24,
  wordle:gameWordle,g2048:game2048,mathsprint:gameMathSprint,mineshard:gameMinesHard,
  histquiz:gameHistQuiz,crossword:gameCrossword,chess:gameChess,sudoku:gameSudoku,
  expertquiz:gameExpertQuiz,spelling:gameSpelling,breakout:gameBreakout,
  numseq:gameNumSeq,tetris:gameTetris,cipher:gameCipher,lightsout:gameLightsOut,
  flappy:gameFlappy,memhard:gameMemHard,
};
GAMES.wordsearch=gameWordsearch;


function changeLang(l){localStorage.setItem('gnw_lang',l);}
function joinTournament(){openGame('g2048');earnXP(10,'Tournament');}
document.addEventListener('DOMContentLoaded',function(){
  var ylb=document.getElementById('your-xp-lb');
  if(ylb)ylb.textContent='You — '+(_xp||0)+' XP';
});





function gameG2048() {
  var SIZE=4, score=0, best=getBest('g2048');
  var board=[], gameOver=false;

  var COLORS={
    0:'rgba(255,255,255,.05)',2:'#eee4da',4:'#ede0c8',8:'#f2b179',
    16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',
    256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'
  };
  var TEXT_COLORS={0:'transparent',2:'#776e65',4:'#776e65',8:'#f9f6f2',
    16:'#f9f6f2',32:'#f9f6f2',64:'#f9f6f2',128:'#f9f6f2',
    256:'#f9f6f2',512:'#f9f6f2',1024:'#f9f6f2',2048:'#f9f6f2'};

  function newBoard(){board=[];for(var i=0;i<SIZE;i++){board.push([]);for(var j=0;j<SIZE;j++)board[i].push(0);}addTile();addTile();}
  function addTile(){
    var empty=[];
    for(var i=0;i<SIZE;i++)for(var j=0;j<SIZE;j++)if(!board[i][j])empty.push([i,j]);
    if(!empty.length)return;
    var pos=empty[Math.floor(Math.random()*empty.length)];
    board[pos[0]][pos[1]]=Math.random()<0.9?2:4;
  }
  function compress(row){var f=row.filter(function(x){return x;});while(f.length<SIZE)f.push(0);return f;}
  function merge(row){
    for(var i=0;i<SIZE-1;i++){
      if(row[i]&&row[i]===row[i+1]){row[i]*=2;score+=row[i];if(score>best){best=score;saveScore('g2048',best);}row[i+1]=0;}
    }return row;
  }
  function move(dir){
    var moved=false;
    for(var i=0;i<SIZE;i++){
      var row=[];
      for(var j=0;j<SIZE;j++)row.push(dir<2?board[i][j]:board[j][i]);
      if(dir===1||dir===3)row.reverse();
      var orig=row.join();
      row=merge(compress(row));
      if(dir===1||dir===3)row.reverse();
      if(row.join()!==orig)moved=true;
      for(var j=0;j<SIZE;j++){if(dir<2)board[i][j]=row[j];else board[j][i]=row[j];}
    }
    if(moved){addTile();window.g2048Render();}
    // Check game over
    if(!board.some(function(r){return r.some(function(c){return !c;});})){
      var canMove=false;
      for(var i=0;i<SIZE&&!canMove;i++)for(var j=0;j<SIZE&&!canMove;j++){
        if(j<SIZE-1&&board[i][j]===board[i][j+1])canMove=true;
        if(i<SIZE-1&&board[i][j]===board[i+1][j])canMove=true;
      }
      if(!canMove){gameOver=true;setTimeout(function(){showScoreBoard('g2048','2048',score);},800);}
    }
    if(board.some(function(r){return r.some(function(c){return c===2048;});})){
      earnXP(500,'2048 Win!');showScorePop('2048! 🏆');
    }
  }

  window.g2048Render=function(){
    var g=gw();if(!g)return;
    var cs=Math.min(68,Math.floor((Math.min(400,window.innerWidth-60)-16)/4));
    var h='<div style="max-width:320px;margin:0 auto;padding:8px;">';
    h+='<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;">';
    h+='<div style="font-size:20px;font-weight:900;color:#fff;">2048</div>';
    h+='<div style="display:flex;gap:8px;">';
    h+='<div style="background:rgba(0,0,0,.3);border-radius:8px;padding:6px 12px;text-align:center;"><div style="font-size:16px;font-weight:800;color:#fbbf24;">'+score+'</div><div style="font-size:9px;color:rgba(255,255,255,.4);">SCORE</div></div>';
    h+='<div style="background:rgba(0,0,0,.3);border-radius:8px;padding:6px 12px;text-align:center;"><div style="font-size:16px;font-weight:800;color:#818cf8;">'+best+'</div><div style="font-size:9px;color:rgba(255,255,255,.4);">BEST</div></div>';
    h+='</div></div>';
    h+='<div id="board-2048" style="background:rgba(0,0,0,.4);border-radius:12px;padding:8px;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;touch-action:none;">';
    board.forEach(function(row){row.forEach(function(val){
      var bg=COLORS[Math.min(val,2048)]||'#3d3a33';
      var tc=TEXT_COLORS[Math.min(val,2048)]||'#f9f6f2';
      var fs=val>=1024?18:val>=128?22:26;
      h+='<div style="height:'+cs+'px;border-radius:8px;background:'+bg+';display:flex;align-items:center;justify-content:center;font-size:'+fs+'px;font-weight:900;color:'+tc+';'+(val?'box-shadow:0 2px 8px rgba(0,0,0,.3);':'')+'">'+( val||'')+'</div>';
    });});
    h+='</div>';
    h+='<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:10px;">';
    h+='<div></div><button onclick="move2048(0)" style="padding:12px;border-radius:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:18px;cursor:pointer;">↑</button><div></div>';
    h+='<button onclick="move2048(3)" style="padding:12px;border-radius:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:18px;cursor:pointer;">←</button>';
    h+='<button onclick="move2048(1)" style="padding:12px;border-radius:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:18px;cursor:pointer;">↓</button>';
    h+='<button onclick="move2048(2)" style="padding:12px;border-radius:10px;background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);color:#fff;font-size:18px;cursor:pointer;">→</button>';
    h+='</div>';
    h+='<button onclick="newGame2048()" style="width:100%;margin-top:8px;padding:10px;border-radius:10px;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.15);color:rgba(255,255,255,.7);font-size:13px;cursor:pointer;">New Game</button>';
    h+='</div>';
    g.innerHTML=h;
    // Touch/swipe
    var bd=document.getElementById('board-2048');
    if(bd){
      var tx,ty;
      bd.ontouchstart=function(e){tx=e.touches[0].clientX;ty=e.touches[0].clientY;};
      bd.ontouchend=function(e){
        var dx=e.changedTouches[0].clientX-tx,dy=e.changedTouches[0].clientY-ty;
        if(Math.abs(dx)>Math.abs(dy)){if(dx>20)move(2);else if(dx<-20)move(3);}
        else{if(dy>20)move(1);else if(dy<-20)move(0);}
      };
    }
  }

  window.move2048=function(d){if(!gameOver)move(d);};
  window.newGame2048=function(){score=0;gameOver=false;newBoard();window.g2048Render();};
  window.g2048Restart=function(){window.newGame2048();};

  var kH=function(e){var m={ArrowUp:0,ArrowDown:1,ArrowRight:2,ArrowLeft:3};if(m[e.key]!==undefined&&!gameOver){e.preventDefault();move(m[e.key]);}};
  document.addEventListener('keydown',kH);

  newBoard(); window.g2048Render();
}
























/* ---- next inline block ---- */


(function(){
  'use strict';

  /* --- Wider language list + browser-language auto detect --- */
  var SUPPORTED_LANGS = ['en','tr','es','fr','de','pt','it','nl','pl','uk','ru','ar','fa','he','zh','ja','ko','hi','bn','ur','id','ms','vi','th','fil','el','ro','sv','no','da','fi','cs','hu','bg','hr','sr','sk','sl','lt','lv','et','sw'];
  var RTL_LANGS = {ar:1,fa:1,he:1,ur:1};
  var UI_TEXT = {
    en:{search:'Search games...',all:'All Games',quiz:'Quiz',word:'Word',math:'Math',classic:'Classic',memory:'Memory',daily:'Daily Challenge',watch:'Watch',play:'Play →',next:'Next question...',great:'Great! ✅',tryAgain:'Try again!',correctWas:'Correct answer:'},
    tr:{search:'Oyun ara...',all:'Tüm Oyunlar',quiz:'Bilgi',word:'Kelime',math:'Matematik',classic:'Klasik',memory:'Hafıza',daily:'Günlük Görev',watch:'İzle',play:'Oyna →',next:'Sonraki soru...',great:'Harika! ✅',tryAgain:'Tekrar dene!',correctWas:'Doğru cevap:'},
    es:{search:'Buscar juegos...',all:'Todos',quiz:'Quiz',word:'Palabras',math:'Mate',classic:'Clásicos',memory:'Memoria',daily:'Reto diario',watch:'Ver',play:'Jugar →',next:'Siguiente pregunta...',great:'¡Genial! ✅',tryAgain:'Inténtalo otra vez',correctWas:'Respuesta correcta:'},
    fr:{search:'Rechercher...',all:'Tous',quiz:'Quiz',word:'Mots',math:'Maths',classic:'Classiques',memory:'Mémoire',daily:'Défi du jour',watch:'Regarder',play:'Jouer →',next:'Question suivante...',great:'Super ! ✅',tryAgain:'Réessaie !',correctWas:'Bonne réponse :'},
    de:{search:'Spiele suchen...',all:'Alle Spiele',quiz:'Quiz',word:'Wörter',math:'Mathe',classic:'Klassisch',memory:'Gedächtnis',daily:'Tagesaufgabe',watch:'Ansehen',play:'Spielen →',next:'Nächste Frage...',great:'Super! ✅',tryAgain:'Nochmal versuchen!',correctWas:'Richtige Antwort:'},
    pt:{search:'Buscar jogos...',all:'Todos',quiz:'Quiz',word:'Palavras',math:'Matemática',classic:'Clássicos',memory:'Memória',daily:'Desafio diário',watch:'Assistir',play:'Jogar →',next:'Próxima pergunta...',great:'Ótimo! ✅',tryAgain:'Tente novamente!',correctWas:'Resposta correta:'},
    ar:{search:'ابحث عن ألعاب...',all:'كل الألعاب',quiz:'اختبار',word:'كلمات',math:'رياضيات',classic:'كلاسيكي',memory:'ذاكرة',daily:'تحدي اليوم',watch:'شاهد',play:'العب →',next:'السؤال التالي...',great:'رائع! ✅',tryAgain:'حاول مرة أخرى!',correctWas:'الإجابة الصحيحة:'},
    zh:{search:'搜索游戏...',all:'全部游戏',quiz:'问答',word:'文字',math:'数学',classic:'经典',memory:'记忆',daily:'每日挑战',watch:'观看',play:'开始 →',next:'下一题...',great:'太棒了! ✅',tryAgain:'再试一次!',correctWas:'正确答案:'},
    ja:{search:'ゲーム検索...',all:'すべて',quiz:'クイズ',word:'単語',math:'数学',classic:'定番',memory:'記憶',daily:'デイリー',watch:'見る',play:'遊ぶ →',next:'次の問題...',great:'すごい! ✅',tryAgain:'もう一度!',correctWas:'正解:'},
    ko:{search:'게임 검색...',all:'전체 게임',quiz:'퀴즈',word:'단어',math:'수학',classic:'클래식',memory:'기억',daily:'오늘의 도전',watch:'보기',play:'시작 →',next:'다음 문제...',great:'좋아요! ✅',tryAgain:'다시 시도!',correctWas:'정답:'}
  };
  function normalizeLang(code){
    code = (code || 'en').toLowerCase();
    if(code.indexOf('zh')===0) return 'zh';
    if(code.indexOf('pt')===0) return 'pt';
    if(code.indexOf('fil')===0 || code.indexOf('tl')===0) return 'fil';
    var base = code.split('-')[0];
    return SUPPORTED_LANGS.indexOf(base) >= 0 ? base : 'en';
  }
  function detectLang(){
    var list = (navigator.languages && navigator.languages.length) ? navigator.languages : [navigator.language || navigator.userLanguage || 'en'];
    for(var i=0;i<list.length;i++){ var l = normalizeLang(list[i]); if(l) return l; }
    return 'en';
  }
  function getUIText(lang){ return UI_TEXT[lang] || UI_TEXT.en; }
  window.applyGameNestLanguage = function(lang){
    lang = normalizeLang(lang);
    var t = getUIText(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = RTL_LANGS[lang] ? 'rtl' : 'ltr';
    var search = document.querySelector('.nav-search input'); if(search) search.placeholder = t.search;
    var labels = {all:t.all, quiz:t.quiz, word:t.word, math:t.math, classic:t.classic, memory:t.memory};
    document.querySelectorAll('.flt').forEach(function(btn){
      var cat = btn.getAttribute('data-cat');
      var span = btn.querySelector('.flt-lbl');
      if(span && labels[cat]) span.textContent = labels[cat];
    });
    var dailyBadge = document.querySelector('.daily-badge'); if(dailyBadge) dailyBadge.textContent = '🔥 ' + t.daily;
    var dailyBtn = document.getElementById('daily-btn'); if(dailyBtn) dailyBtn.textContent = t.play;
    document.querySelectorAll('.watch-btn').forEach(function(b){ if(b.textContent.trim()) b.textContent = '▶ ' + t.watch; });
    var sel = document.querySelector('.lang-sel');
    if(sel && sel.value !== lang && [].slice.call(sel.options).some(function(o){return o.value===lang;})) sel.value = lang;
  };
  window.changeLang = function(lang){
    if(lang === 'auto'){
      localStorage.removeItem('gnw_lang');
      lang = detectLang();
    } else {
      lang = normalizeLang(lang);
      localStorage.setItem('gnw_lang', lang);
    }
    window.applyGameNestLanguage(lang);
  };
  document.addEventListener('DOMContentLoaded', function(){
    var selected = localStorage.getItem('gnw_lang') || detectLang();
    window.applyGameNestLanguage(selected);
  });

  /* --- Safe quiz progression fix: answer -> feedback -> next question --- */
  function t(){ return getUIText(normalizeLang(localStorage.getItem('gnw_lang') || detectLang())); }
  function clearGameTimers(){
    ['_cqTimer','_fqTimer','_tfTimer','_mbTimer','_genTimer','_geoTimer','_sciTimer','_histTimer','_movieTimer','_expertTimer'].forEach(function(k){
      if(window[k]){ try{ clearInterval(window[k]); clearTimeout(window[k]); }catch(e){} window[k]=null; }
    });
  }
  function nextGame(fn, delay){
    setTimeout(function(){
      try{ window._gnwAnswerLocked = false; fn(); }
      catch(e){
        window._gnwAnswerLocked = false;
        var g = (typeof gw === 'function') ? gw() : document.getElementById('gw');
        if(g){ g.innerHTML = '<div style="text-align:center;padding:28px;color:#172033;"><div style="font-size:42px;">⚠️</div><div style="font-weight:900;margin:8px 0;">Game reload needed</div><button class="g-btn" onclick="openGame(_currentGame||\'colorquiz\')">Retry</button></div>'; }
        console.error('Next game failed:', e);
      }
    }, delay || 800);
  }
  function levelWin(gameKey, maxLevel, xp){
    var ok = false;
    try{ if(window._LVL){ _LVL.win(xp || 20); ok = true; } }catch(e){ console.warn('Level win fallback:', e); }
    if(!ok){
      try{
        var lv = +(localStorage.getItem('lvl_'+gameKey) || 1);
        localStorage.setItem('lvl_'+gameKey, Math.min(maxLevel || 50, lv + 1));
        if(typeof earnXP === 'function') earnXP(xp || 20, gameKey);
        if(typeof playSound === 'function') playSound('score');
      }catch(e){}
    }
  }
  function levelLose(){
    try{ return window._LVL ? _LVL.lose() : true; }
    catch(e){ console.warn('Level lose fallback:', e); return true; }
  }
  function markAnswer(correctText, chosenText){
    var g = (typeof gw === 'function') ? gw() : document.getElementById('gw');
    if(!g) return;
    g.querySelectorAll('button[data-answer]').forEach(function(b){
      b.disabled = true;
      b.style.pointerEvents = 'none';
      b.style.cursor = 'not-allowed';
      var val = b.getAttribute('data-answer');
      if(val === correctText){
        b.style.background = '#22c55e'; b.style.color = '#fff'; b.style.borderColor = '#22c55e'; b.style.opacity = '1';
      } else if(val === chosenText){
        b.style.background = '#ef4444'; b.style.color = '#fff'; b.style.borderColor = '#ef4444'; b.style.opacity = '1';
      } else { b.style.opacity = '.45'; }
    });
  }
  function feedback(msg, good){
    var g = (typeof gw === 'function') ? gw() : document.getElementById('gw');
    if(!g) return;
    var old = document.getElementById('gnw-answer-feedback'); if(old) old.remove();
    var div = document.createElement('div');
    div.id = 'gnw-answer-feedback';
    div.style.cssText = 'margin-top:12px;text-align:center;border-radius:14px;padding:10px 12px;font-weight:900;color:#172033;background:'+(good?'#dcfce7':'#fee2e2')+';border:2px solid '+(good?'#22c55e':'#ef4444')+';box-shadow:0 8px 18px rgba(15,23,42,.10);';
    div.textContent = msg;
    g.appendChild(div);
  }
  function safeText(s){ return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
  function jsArg(s){ return String(s).replace(/\\/g,'\\\\').replace(/'/g,"\\'"); }
  function header(title, color){
    try{ return _LVL.renderHeader(title, color); }
    catch(e){ return '<div style="font-size:18px;font-weight:900;color:#172033;margin-bottom:12px;">'+title+'</div>'; }
  }

  window.gameColorQuiz = function(){
    window._gnwAnswerLocked = false; clearGameTimers();
    _LVL.init('colorquiz', 40);
    var ALL_COLORS = [
      {hex:'#ff0000',name:'Red'},{hex:'#00c853',name:'Green'},{hex:'#0000ff',name:'Blue'},
      {hex:'#ffd600',name:'Yellow'},{hex:'#ff00ff',name:'Magenta'},{hex:'#00bcd4',name:'Cyan'},
      {hex:'#ff8000',name:'Orange'},{hex:'#8b5cf6',name:'Purple'},{hex:'#00ff80',name:'Spring Green'},
      {hex:'#ff0080',name:'Rose'},{hex:'#0080ff',name:'Azure'},{hex:'#80ff00',name:'Chartreuse'},
      {hex:'#800000',name:'Maroon'},{hex:'#008000',name:'Dark Green'},{hex:'#000080',name:'Navy'},
      {hex:'#808000',name:'Olive'},{hex:'#008080',name:'Teal'},{hex:'#e74c3c',name:'Crimson'},
      {hex:'#f39c12',name:'Amber'},{hex:'#1abc9c',name:'Turquoise'},{hex:'#3498db',name:'Sky Blue'},
      {hex:'#9b59b6',name:'Amethyst'},{hex:'#bdc3c7',name:'Silver'},{hex:'#f8bbd0',name:'Pink'}
    ];
    var level = _LVL.level || 1;
    var pool = ALL_COLORS.slice(0, Math.min(ALL_COLORS.length, 8 + Math.floor(level * .75)));
    var correct = pool[Math.floor(Math.random()*pool.length)];
    var numOpts = Math.min(6, 2 + Math.floor(level/8));
    var opts = [correct];
    while(opts.length < numOpts){ var c = pool[Math.floor(Math.random()*pool.length)]; if(!opts.some(function(o){return o.name===c.name;})) opts.push(c); }
    opts.sort(function(){return Math.random()-.5;});
    var g = (typeof gw === 'function') ? gw() : document.getElementById('gw'); if(!g) return;
    var h = header('🎨 Color Quiz', '#818cf8');
    h += '<div style="text-align:center;margin-bottom:16px;">';
    h += '<div style="width:140px;height:140px;border-radius:50%;background:'+correct.hex+';margin:0 auto 12px;box-shadow:0 10px 30px '+correct.hex+'77;border:6px solid rgba(255,255,255,.72);"></div>';
    h += '<div style="font-size:16px;font-weight:900;margin-bottom:8px;color:#172033;">What color is this?</div></div>';
    h += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">';
    opts.forEach(function(opt){
      h += '<button type="button" data-answer="'+safeText(opt.name)+'" onclick="gnwColorAnswer(\''+jsArg(opt.name)+'\')" style="pointer-events:auto;padding:14px;border-radius:14px;border:2px solid #dbeafe;background:#fff;cursor:pointer;font-size:14px;font-weight:900;color:#172033;transition:all .15s;">'+safeText(opt.name)+'</button>';
    });
    h += '</div>';
    g.innerHTML = h;
    window.gnwColorAnswer = function(name){
      if(window._gnwAnswerLocked) return; window._gnwAnswerLocked = true; clearGameTimers();
      markAnswer(correct.name, name);
      if(name === correct.name){ levelWin('colorquiz', 40, 20); if(typeof showScorePop==='function') showScorePop('+20'); feedback(t().great+' '+t().next, true); nextGame(window.gameColorQuiz, 750); }
      else { var alive = levelLose(); feedback(t().correctWas+' '+correct.name, false); if(alive) nextGame(window.gameColorQuiz, 1200); else window._gnwAnswerLocked=false; }
    };
  };

  window.gameFlagQuiz = function(){
    window._gnwAnswerLocked = false; clearGameTimers();
    _LVL.init('flagquiz', 50);
    var ALL_FLAGS = [
      {flag:'🇺🇸',name:'USA'},{flag:'🇬🇧',name:'United Kingdom'},{flag:'🇫🇷',name:'France'},{flag:'🇩🇪',name:'Germany'},{flag:'🇯🇵',name:'Japan'},{flag:'🇨🇳',name:'China'},
      {flag:'🇧🇷',name:'Brazil'},{flag:'🇮🇹',name:'Italy'},{flag:'🇨🇦',name:'Canada'},{flag:'🇦🇺',name:'Australia'},{flag:'🇪🇸',name:'Spain'},{flag:'🇲🇽',name:'Mexico'},
      {flag:'🇷🇺',name:'Russia'},{flag:'🇮🇳',name:'India'},{flag:'🇰🇷',name:'South Korea'},{flag:'🇸🇦',name:'Saudi Arabia'},{flag:'🇦🇷',name:'Argentina'},{flag:'🇿🇦',name:'South Africa'},
      {flag:'🇹🇷',name:'Turkey'},{flag:'🇳🇱',name:'Netherlands'},{flag:'🇸🇪',name:'Sweden'},{flag:'🇳🇴',name:'Norway'},{flag:'🇩🇰',name:'Denmark'},{flag:'🇫🇮',name:'Finland'},
      {flag:'🇵🇹',name:'Portugal'},{flag:'🇬🇷',name:'Greece'},{flag:'🇵🇱',name:'Poland'},{flag:'🇺🇦',name:'Ukraine'},{flag:'🇨🇭',name:'Switzerland'},{flag:'🇦🇹',name:'Austria'},
      {flag:'🇧🇪',name:'Belgium'},{flag:'🇨🇿',name:'Czech Republic'},{flag:'🇭🇺',name:'Hungary'},{flag:'🇷🇴',name:'Romania'},{flag:'🇧🇬',name:'Bulgaria'},{flag:'🇭🇷',name:'Croatia'},
      {flag:'🇸🇰',name:'Slovakia'},{flag:'🇸🇮',name:'Slovenia'},{flag:'🇱🇹',name:'Lithuania'},{flag:'🇱🇻',name:'Latvia'},{flag:'🇪🇪',name:'Estonia'},{flag:'🇮🇸',name:'Iceland'},
      {flag:'🇮🇪',name:'Ireland'},{flag:'🇳🇿',name:'New Zealand'},{flag:'🇸🇬',name:'Singapore'},{flag:'🇲🇾',name:'Malaysia'},{flag:'🇹🇭',name:'Thailand'},{flag:'🇻🇳',name:'Vietnam'},
      {flag:'🇵🇭',name:'Philippines'},{flag:'🇮🇩',name:'Indonesia'}
    ];
    var level = _LVL.level || 1;
    var pool = ALL_FLAGS.slice(0, Math.min(ALL_FLAGS.length, 5 + level));
    var correct = pool[Math.floor(Math.random()*pool.length)];
    var opts = [correct], numOpts = Math.min(6, 3 + Math.floor(level/10));
    while(opts.length < numOpts){ var f = pool[Math.floor(Math.random()*pool.length)]; if(!opts.some(function(o){return o.name===f.name;})) opts.push(f); }
    opts.sort(function(){return Math.random()-.5;});
    var g = (typeof gw === 'function') ? gw() : document.getElementById('gw'); if(!g) return;
    var h = header('🏳️ Flag Quiz', '#4ade80');
    h += '<div style="text-align:center;margin-bottom:16px;"><div style="font-size:96px;margin-bottom:8px;line-height:1;filter:drop-shadow(0 8px 16px rgba(15,23,42,.12));">'+correct.flag+'</div><div style="font-size:15px;font-weight:800;color:#64748b;">Which country is this flag?</div></div>';
    h += '<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;">';
    opts.forEach(function(opt){ h += '<button type="button" data-answer="'+safeText(opt.name)+'" onclick="gnwFlagAnswer(\''+jsArg(opt.name)+'\')" style="pointer-events:auto;padding:14px;border-radius:14px;border:2px solid #dbeafe;background:#fff;cursor:pointer;font-size:14px;font-weight:900;color:#172033;transition:all .15s;">'+safeText(opt.name)+'</button>'; });
    h += '</div>'; g.innerHTML = h;
    window.gnwFlagAnswer = function(name){
      if(window._gnwAnswerLocked) return; window._gnwAnswerLocked = true;
      markAnswer(correct.name, name);
      if(name === correct.name){ levelWin('flagquiz', 50, 25); if(typeof showScorePop==='function') showScorePop('+25'); feedback(t().great+' '+t().next, true); nextGame(window.gameFlagQuiz, 750); }
      else { var alive = levelLose(); feedback(t().correctWas+' '+correct.name, false); if(alive) nextGame(window.gameFlagQuiz, 1200); else window._gnwAnswerLocked=false; }
    };
  };

  window.gameTrueFalse = function(){
    window._gnwAnswerLocked = false; clearGameTimers();
    _LVL.init('truefalse', 50);
    var FACTS = [
      ['The sky is blue.',true],['Fish can fly.',false],['The sun is a star.',true],['Cats have 6 legs.',false],['Water boils at 100°C.',true],['The moon is a planet.',false],['Humans have 5 senses.',true],['A triangle has 4 sides.',false],['Dogs are mammals.',true],['Ice is hotter than fire.',false],
      ['The Earth orbits the Sun.',true],['Sound travels faster than light.',false],['Diamonds are made of carbon.',true],['Whales are fish.',false],['Bats are blind.',false],['DNA stands for deoxyribonucleic acid.',true],['Spiders have 8 legs.',true],['Penguins live in the Arctic.',false],
      ['Light travels at about 299,792 km/s.',true],['The human body has 206 bones.',true],['Photosynthesis produces oxygen.',true],['Goldfish have a 3-second memory.',false],['Honey never expires.',true],['The Eiffel Tower was built in 1889.',true],['Butterflies taste with their feet.',true],
      ['A day on Venus is longer than its year.',true],['Oxford University is older than the Aztec Empire.',true],['Nintendo was founded in 1889.',true],['Bananas are technically berries.',true],['Strawberries are not berries.',true]
    ];
    var level = _LVL.level || 1;
    var fact = FACTS[Math.floor(Math.random()*Math.min(FACTS.length, level+7))];
    var stmt = fact[0], ans = fact[1];
    var g = (typeof gw === 'function') ? gw() : document.getElementById('gw'); if(!g) return;
    var h = header('✅ True or False', '#22c55e');
    h += '<div style="background:rgba(255,255,255,.82);border-radius:18px;padding:24px;margin-bottom:20px;min-height:82px;display:flex;align-items:center;justify-content:center;text-align:center;border:1px solid rgba(255,255,255,.9);"><div style="font-size:17px;font-weight:900;line-height:1.5;color:#172033;">'+safeText(stmt)+'</div></div>';
    h += '<div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">';
    h += '<button type="button" data-answer="true" onclick="gnwTFAnswer(true)" style="pointer-events:auto;padding:21px;border-radius:16px;background:#22c55e;color:#fff;font-size:20px;font-weight:900;border:2px solid #22c55e;cursor:pointer;transition:all .15s;">✅ TRUE</button>';
    h += '<button type="button" data-answer="false" onclick="gnwTFAnswer(false)" style="pointer-events:auto;padding:21px;border-radius:16px;background:#ef4444;color:#fff;font-size:20px;font-weight:900;border:2px solid #ef4444;cursor:pointer;transition:all .15s;">❌ FALSE</button>';
    h += '</div>'; g.innerHTML = h;
    window.gnwTFAnswer = function(val){
      if(window._gnwAnswerLocked) return; window._gnwAnswerLocked = true; clearGameTimers();
      markAnswer(String(ans), String(val));
      if(val === ans){ levelWin('truefalse', 50, 20); if(typeof showScorePop==='function') showScorePop('+20'); feedback(t().great+' '+t().next, true); nextGame(window.gameTrueFalse, 700); }
      else { var alive = levelLose(); feedback(t().correctWas+' '+(ans?'TRUE':'FALSE'), false); if(alive) nextGame(window.gameTrueFalse, 1200); else window._gnwAnswerLocked=false; }
    };
  };

  /* Replace old game registry pointers with fixed versions. */
  function installFixedGames(){
    if(window.GAMES){
      GAMES.colorquiz = window.gameColorQuiz;
      GAMES.flagquiz = window.gameFlagQuiz;
      GAMES.truefalse = window.gameTrueFalse;
    }
  }
  installFixedGames();
  document.addEventListener('DOMContentLoaded', installFixedGames);

  /* Make answer buttons always clickable unless our answer lock intentionally disables them. */
  var st = document.createElement('style');
  st.textContent = '#gw button[data-answer]{pointer-events:auto!important;user-select:none!important;touch-action:manipulation!important;}#gw button[data-answer]:not(:disabled):hover{transform:translateY(-2px) scale(1.015)!important;box-shadow:0 10px 20px rgba(15,23,42,.10)!important;}';
  document.head.appendChild(st);
})();


/* ---- next inline block ---- */


(function(){
  'use strict';

  function el(id){return document.getElementById(id);} 
  function gwrap(){return (typeof gw==='function'?gw():el('gw'));}
  function rand(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
  function currentKey(){return window._currentGame || (window.GNW_STATS && window.GNW_STATS.key) || 'colorquiz';}
  window.gnwCurrentKey = currentKey;

  window.GNW_STATS = window.GNW_STATS || null;
  window.gnwStartStats = function(key){
    window.GNW_STATS = {key:key,correct:0,wrong:0,score:0,lines:0,started:Date.now(),shown:false};
  };
  window.gnwAddCorrect = function(n){
    if(!window.GNW_STATS) window.gnwStartStats(currentKey());
    window.GNW_STATS.correct += (n||1);
  };
  window.gnwAddWrong = function(n){
    if(!window.GNW_STATS) window.gnwStartStats(currentKey());
    window.GNW_STATS.wrong += (n||1);
  };
  window.gnwAddScore = function(n){
    if(!window.GNW_STATS) window.gnwStartStats(currentKey());
    window.GNW_STATS.score += (n||0);
  };

  var praises = ['Great!','Good!','Excellent!','Awesome!','Perfect!','Well done!'];
  window.gnwSpeakPraise = function(word){
    try{
      if(window._soundOn === false) return;
      var now = Date.now();
      if(window._gnwLastSpeak && now-window._gnwLastSpeak < 650) return;
      window._gnwLastSpeak = now;
      var text = word || praises[Math.floor(Math.random()*praises.length)];
      if(typeof showScorePop === 'function') showScorePop(text.replace('!','') + ' ⭐');
      if('speechSynthesis' in window){
        var u = new SpeechSynthesisUtterance(text);
        u.lang = (document.documentElement.lang || navigator.language || 'en-US');
        u.rate = 1.03; u.pitch = 1.18; u.volume = .9;
        try{ window.speechSynthesis.cancel(); }catch(e){}
        window.speechSynthesis.speak(u);
      }
    }catch(e){}
  };

  window.gnwShowEndStats = function(reason, extraHtml){
    var s = window.GNW_STATS || {correct:0,wrong:0,score:0,key:currentKey(),started:Date.now()};
    if(s.shown) return;
    s.shown = true;
    var total = (s.correct||0) + (s.wrong||0);
    var acc = total ? Math.round((s.correct||0)*100/total) : 0;
    var seconds = Math.max(1, Math.round((Date.now()-(s.started||Date.now()))/1000));
    try{ if(typeof playSound==='function') playSound(reason==='win'?'win':'lose'); }catch(e){}
    var old = el('gnw-end-stats'); if(old) old.remove();
    var d = document.createElement('div');
    d.id = 'gnw-end-stats';
    d.className = 'win-overlay';
    d.style.cssText = 'background:rgba(15,23,42,.58);backdrop-filter:blur(8px);';
    d.innerHTML = '<div id="gnw-end-stats-card" class="win-box" style="max-width:390px;width:92%;background:linear-gradient(145deg,#ffffff,#eff6ff 48%,#fff7ed);border:3px solid rgba(255,255,255,.96);box-shadow:0 24px 70px rgba(15,23,42,.28);color:#172033;">'
      + '<div style="font-size:54px;margin-bottom:6px;">'+(reason==='win'?'🏆':'🎮')+'</div>'
      + '<div style="font-size:25px;font-weight:950;color:#172033;margin-bottom:6px;">Game Summary</div>'
      + '<div style="font-size:13px;font-weight:800;color:#64748b;">'+(reason==='win'?'Completed!':'Game finished')+'</div>'
      + '<div class="gnw-stat-grid">'
      + '<div class="gnw-stat"><strong style="color:#22c55e;">'+(s.correct||0)+'</strong>Correct</div>'
      + '<div class="gnw-stat"><strong style="color:#ef4444;">'+(s.wrong||0)+'</strong>Wrong</div>'
      + '<div class="gnw-stat"><strong style="color:#f59e0b;">'+acc+'%</strong>Success</div>'
      + '<div class="gnw-stat"><strong style="color:#8b5cf6;">'+seconds+'s</strong>Time</div>'
      + '</div>'
      + (extraHtml||'')
      + '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;">'
      + '<button class="btn" onclick="var k=(window.gnwCurrentKey?window.gnwCurrentKey():(window._currentGame||\'colorquiz\'));document.getElementById(\'gnw-end-stats\').remove();openGame(k)">Play Again</button>'
      + '<button class="btn btn-sec" onclick="document.getElementById(\'gnw-end-stats\').remove();closeGame();">Close</button>'
      + '</div></div>';
    document.body.appendChild(d);
  };

  function patchCore(){
    if(window._gnwCorePatched) return;
    if(typeof window.openGame === 'function'){
      var oldOpen = window.openGame;
      window.openGame = function(key){
        try{ window.gnwStartStats(key); }catch(e){}
        return oldOpen.apply(this, arguments);
      };
    }
    if(typeof window.closeGame === 'function'){
      var oldClose = window.closeGame;
      window.closeGame = function(){
        try{ if(window._snakeClean) window._snakeClean(); }catch(e){}
        try{ if(window._tetClean) window._tetClean(); }catch(e){}
        return oldClose.apply(this, arguments);
      };
    }
    if(window._LVL && typeof _LVL.win === 'function' && !_LVL._gnwPatched){
      var oldWin = _LVL.win;
      var oldLose = _LVL.lose;
      _LVL.win = function(pts){
        var before = this.level;
        var res = oldWin.apply(this, arguments);
        try{ window.gnwAddCorrect(1); window.gnwSpeakPraise(); }catch(e){}
        try{ if(before < this.maxLevel && this.level >= this.maxLevel){ setTimeout(function(){ window.gnwShowEndStats('win'); }, 550); } }catch(e){}
        return res;
      };
      _LVL.lose = function(){
        try{ window.gnwAddWrong(1); }catch(e){}
        var alive = oldLose.apply(this, arguments);
        if(!alive){ setTimeout(function(){
          var ov = el('no-lives-ov');
          if(ov && !el('gnw-small-summary')){
            var s = window.GNW_STATS || {correct:0,wrong:0};
            var card = document.createElement('div');
            card.id = 'gnw-small-summary';
            card.style.cssText = 'background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.22);border-radius:14px;padding:10px 12px;margin:0 0 14px;color:#fff;font-weight:900;text-align:center;';
            card.innerHTML = '✅ Correct: '+(s.correct||0)+' &nbsp; ❌ Wrong: '+(s.wrong||0);
            ov.insertBefore(card, ov.querySelector('button'));
          }
        }, 80); }
        return alive;
      };
      _LVL._gnwPatched = true;
    }
    window._gnwCorePatched = true;
  }

  window.gameSnake = function(){
    try{ if(window._snakeClean) window._snakeClean(); }catch(e){}
    var W=24,H=24,CS=18;
    var snake,dir,nextDir,food,score,best,running,paused,timer,speed,particles;
    var g=gwrap(); if(!g) return;
    best=+(localStorage.getItem('bestSnakePro') || localStorage.getItem('bestSnake') || 0);
    g.innerHTML = '<div class="gnw-game-stage" id="snake-pro">'
      + '<div class="gnw-game-hud"><div class="gnw-game-title">🐍 Snake Pro</div><div style="display:flex;gap:8px;flex-wrap:wrap;">'
      + '<div class="gnw-chip">Score <b id="sn-score">0</b></div><div class="gnw-chip">Best <b id="sn-best">'+best+'</b></div><div class="gnw-chip">Speed <b id="sn-speed">1</b></div></div></div>'
      + '<div class="gnw-arcade-shell" style="max-width:'+(W*CS+24)+'px;"><canvas class="gnw-screen" id="snakeCanvas" width="'+(W*CS)+'" height="'+(H*CS)+'"></canvas></div>'
      + '<div id="sn-msg" class="gnw-pro-msg">Tap board or press Space to start. Eat apples, avoid your tail!</div>'
      + '<div class="gnw-control-pad" style="grid-template-columns:repeat(3,56px);">'
      + '<div></div><button type="button" onpointerdown="snDir(0,-1)">↑</button><div></div>'
      + '<button type="button" onpointerdown="snDir(-1,0)">←</button><button type="button" onpointerdown="snPause()">⏯</button><button type="button" onpointerdown="snDir(1,0)">→</button>'
      + '<button type="button" onpointerdown="snRestart()">↻</button><button type="button" onpointerdown="snDir(0,1)">↓</button><button type="button" onpointerdown="snBoost()">⚡</button>'
      + '</div></div>';
    var canvas=el('snakeCanvas'), ctx=canvas.getContext('2d');
    particles=[];
    function reset(){
      snake=[{x:12,y:12},{x:11,y:12},{x:10,y:12}]; dir={x:1,y:0}; nextDir={x:1,y:0};
      score=0; speed=120; food=randomFood(); running=false; paused=false; particles=[];
      setText('sn-score','0'); setText('sn-speed','1'); msg('Tap board or press Space to start.'); draw();
    }
    function setText(id,v){var e=el(id); if(e)e.textContent=v;}
    function msg(t){var e=el('sn-msg'); if(e)e.textContent=t;}
    function randomFood(){var p; do{p={x:rand(0,W-1),y:rand(0,H-1)};}while(snake.some(function(s){return s.x===p.x&&s.y===p.y;})); return p;}
    function start(){if(running)return; running=true; paused=false; msg('Playing! Use arrows, WASD, swipe, or buttons.'); loop();}
    function drawBoard(){
      var grd=ctx.createLinearGradient(0,0,W*CS,H*CS); grd.addColorStop(0,'#bbf7d0'); grd.addColorStop(.55,'#dcfce7'); grd.addColorStop(1,'#dffcff');
      ctx.fillStyle=grd; ctx.fillRect(0,0,W*CS,H*CS);
      for(var y=0;y<H;y++) for(var x=0;x<W;x++){
        if((x+y)%2===0){ ctx.fillStyle='rgba(255,255,255,.18)'; ctx.fillRect(x*CS,y*CS,CS,CS); }
      }
      ctx.strokeStyle='rgba(34,197,94,.16)'; ctx.lineWidth=1;
      for(var i=0;i<=W;i++){ctx.beginPath();ctx.moveTo(i*CS,0);ctx.lineTo(i*CS,H*CS);ctx.stroke();}
      for(var j=0;j<=H;j++){ctx.beginPath();ctx.moveTo(0,j*CS);ctx.lineTo(W*CS,j*CS);ctx.stroke();}
    }
    function roundRect(x,y,w,h,r){ if(ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();} else ctx.fillRect(x,y,w,h); }
    function draw(){
      drawBoard();
      particles.forEach(function(p){ ctx.fillStyle=p.c; ctx.globalAlpha=p.a; ctx.beginPath(); ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill(); ctx.globalAlpha=1; });
      // apple
      var fx=food.x*CS+CS/2, fy=food.y*CS+CS/2;
      ctx.shadowColor='#fb7185'; ctx.shadowBlur=16; ctx.fillStyle='#ef4444'; ctx.beginPath(); ctx.arc(fx,fy,CS*.38,0,Math.PI*2); ctx.fill(); ctx.shadowBlur=0;
      ctx.fillStyle='#22c55e'; ctx.fillRect(fx+2,fy-CS*.56,5,8);
      snake.forEach(function(seg,i){
        var x=seg.x*CS+1,y=seg.y*CS+1,s=CS-2;
        ctx.shadowColor=i===0?'#22c55e':'transparent'; ctx.shadowBlur=i===0?12:0;
        ctx.fillStyle=i===0?'#22c55e':(i%2?'#34d399':'#10b981'); roundRect(x,y,s,s,5); ctx.shadowBlur=0;
        ctx.fillStyle='rgba(255,255,255,.35)'; roundRect(x+3,y+3,s-6,4,2);
        if(i===0){
          ctx.fillStyle='#111827';
          var ex=dir.x!==0?dir.x*3:0, ey=dir.y!==0?dir.y*3:0;
          ctx.beginPath();ctx.arc(x+s/2-4+(dir.y? -3:0)+ex,y+s/2-4+(dir.x? -3:0)+ey,2,0,Math.PI*2);ctx.fill();
          ctx.beginPath();ctx.arc(x+s/2+4+(dir.y? 3:0)+ex,y+s/2+4+(dir.x? 3:0)+ey,2,0,Math.PI*2);ctx.fill();
        }
      });
    }
    function burst(){ for(var i=0;i<12;i++) particles.push({x:food.x*CS+CS/2,y:food.y*CS+CS/2,vx:(Math.random()-.5)*4,vy:(Math.random()-.5)*4,r:rand(2,4),a:1,c:['#f97316','#facc15','#22c55e','#fb7185'][rand(0,3)]}); }
    function stepParticles(){ particles.forEach(function(p){p.x+=p.vx;p.y+=p.vy;p.a-=.06;p.r*=.98;}); particles=particles.filter(function(p){return p.a>0;}); }
    function tick(){
      if(!running || paused) return;
      dir=nextDir;
      var head={x:(snake[0].x+dir.x+W)%W,y:(snake[0].y+dir.y+H)%H};
      if(snake.some(function(s){return s.x===head.x && s.y===head.y;})) return gameOver();
      snake.unshift(head);
      if(head.x===food.x && head.y===food.y){
        score+=10; window.gnwAddCorrect(1); window.gnwAddScore(10); burst(); food=randomFood();
        if(score>best){best=score;localStorage.setItem('bestSnakePro',best);localStorage.setItem('bestSnake',best);} 
        setText('sn-score',score); setText('sn-best',best); setText('sn-speed',Math.min(9,1+Math.floor(score/50)));
        try{ if(score%20===0) window.gnwSpeakPraise(); else if(typeof playSound==='function') playSound('score'); }catch(e){}
        speed=Math.max(58,120-Math.floor(score/20)*7);
      } else snake.pop();
      stepParticles(); draw(); timer=setTimeout(tick,speed);
    }
    function loop(){ clearTimeout(timer); tick(); }
    function gameOver(){
      running=false; paused=false; clearTimeout(timer); window.gnwAddWrong(1); draw();
      ctx.fillStyle='rgba(15,23,42,.72)'; ctx.fillRect(0,0,W*CS,H*CS);
      ctx.fillStyle='#fff'; ctx.textAlign='center'; ctx.font='900 32px Inter,Arial'; ctx.fillText('Game Over',W*CS/2,H*CS/2-16);
      ctx.font='800 18px Inter,Arial'; ctx.fillText('Score: '+score,W*CS/2,H*CS/2+18);
      msg('Game Over — press ↻ or Space to play again.');
      setTimeout(function(){window.gnwShowEndStats('lose','<div style="background:#fff;border:2px solid #dbeafe;border-radius:14px;padding:10px;font-weight:900;">🐍 Snake Score: '+score+' · Best: '+best+'</div>');},350);
    }
    window.snDir=function(x,y){ if(!running) start(); if(snake.length>1 && x===-dir.x && y===-dir.y) return; nextDir={x:x,y:y}; };
    window.snPause=function(){ if(!running){start();return;} paused=!paused; msg(paused?'Paused':'Playing!'); if(!paused) loop(); };
    window.snRestart=function(){ clearTimeout(timer); reset(); start(); };
    window.snBoost=function(){ if(!running) start(); speed=Math.max(50,speed-18); msg('Speed boost! ⚡'); };
    canvas.addEventListener('pointerdown',function(e){ if(!running) start(); window._snTouch={x:e.clientX,y:e.clientY}; });
    canvas.addEventListener('pointerup',function(e){ var t=window._snTouch; if(!t)return; var dx=e.clientX-t.x, dy=e.clientY-t.y; if(Math.max(Math.abs(dx),Math.abs(dy))>20){ if(Math.abs(dx)>Math.abs(dy)) window.snDir(dx>0?1:-1,0); else window.snDir(0,dy>0?1:-1); } });
    var keyH=function(e){ var k=e.key.toLowerCase(); var m={arrowleft:[-1,0],a:[-1,0],arrowright:[1,0],d:[1,0],arrowup:[0,-1],w:[0,-1],arrowdown:[0,1],s:[0,1]}; if(m[k]){e.preventDefault(); window.snDir(m[k][0],m[k][1]);} if(e.code==='Space'){e.preventDefault(); if(!running || !paused && !running) start(); else window.snPause();} if(k==='r'){window.snRestart();} };
    document.addEventListener('keydown',keyH);
    window._snakeClean=function(){clearTimeout(timer);running=false;document.removeEventListener('keydown',keyH);};
    reset();
  };

  window.gameTetris = function(){
    try{ if(window._tetClean) window._tetClean(); }catch(e){}
    var W=10,H=20,CS=24,board,cur,next,curX,curY,curC,nextC,hold=null,holdC=0,canHold=true;
    var score=0,lines=0,level=1,best=+(localStorage.getItem('bestTetrisPro') || localStorage.getItem('bestTetris') || 0),running=true,paused=false,timer;
    var PIECES=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0,0],[1,1,1]],[[0,0,1],[1,1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]]];
    var COLORS=['','#22d3ee','#facc15','#a855f7','#22c55e','#ef4444','#3b82f6','#f97316'];
    var g=gwrap(); if(!g) return;
    g.innerHTML='<div class="gnw-game-stage" id="tetris-pro">'
      + '<div class="gnw-game-hud"><div class="gnw-game-title">🟦 Tetris Pro</div><div style="display:flex;gap:8px;flex-wrap:wrap;">'
      + '<div class="gnw-chip">Score <b id="tScore">0</b></div><div class="gnw-chip">Lines <b id="tLines">0</b></div><div class="gnw-chip">Level <b id="tLevel">1</b></div><div class="gnw-chip">Best <b id="tBest">'+best+'</b></div></div></div>'
      + '<div style="display:grid;grid-template-columns:minmax(0,260px) 96px;gap:14px;justify-content:center;align-items:start;">'
      + '<div><div class="gnw-arcade-shell" style="max-width:'+(W*CS+24)+'px;"><canvas class="gnw-screen" id="tetCanvas" width="'+(W*CS)+'" height="'+(H*CS)+'"></canvas></div>'
      + '<div class="gnw-control-pad" style="grid-template-columns:repeat(4,58px);"><button type="button" onpointerdown="tetMove(-1)">←</button><button type="button" onpointerdown="tetSoft()">↓</button><button type="button" onpointerdown="tetMove(1)">→</button><button type="button" onpointerdown="tetRot()">↻</button></div>'
      + '<button type="button" class="gnw-big-btn" onclick="tetHard()" style="width:100%;margin-top:8px;">Hard Drop ⬇⬇</button></div>'
      + '<div><div class="gnw-chip" style="margin-bottom:8px;text-align:center;">NEXT</div><canvas id="tetNext" width="96" height="96" style="width:96px;height:96px;background:#eff6ff;border:2px solid #bfdbfe;border-radius:16px;box-shadow:0 8px 18px rgba(15,23,42,.10);"></canvas>'
      + '<div class="gnw-chip" style="margin:10px 0 8px;text-align:center;">HOLD</div><canvas id="tetHold" width="96" height="96" style="width:96px;height:96px;background:#fdf2f8;border:2px solid #fbcfe8;border-radius:16px;box-shadow:0 8px 18px rgba(15,23,42,.10);"></canvas>'
      + '<button type="button" class="gnw-big-btn" onclick="tetHold()" style="width:100%;font-size:13px!important;">Hold C</button><button type="button" class="gnw-big-btn" onclick="tetPause()" style="width:100%;margin-top:8px;font-size:13px!important;" id="tetPauseBtn">Pause P</button><button type="button" class="gnw-big-btn" onclick="tetRestart()" style="width:100%;margin-top:8px;font-size:13px!important;">Restart R</button></div>'
      + '</div><div id="tet-msg" class="gnw-pro-msg">Use keyboard or buttons. Clear lines to score!</div></div>';
    var canvas=el('tetCanvas'),ctx=canvas.getContext('2d'),nctx=el('tetNext').getContext('2d'),hctx=el('tetHold').getContext('2d');
    function setText(id,v){var e=el(id); if(e)e.textContent=v;}
    function newBoard(){board=Array.from({length:H},function(){return Array(W).fill(0);});}
    function pick(){return {p:PIECES[rand(0,PIECES.length-1)],c:rand(1,COLORS.length-1)};}
    function spawn(){var n=next||pick(); cur=n.p;curC=n.c; next=pick(); curX=Math.floor(W/2)-Math.floor(cur[0].length/2);curY=0;canHold=true; if(collide(cur,curX,curY)) gameOver();}
    function collide(p,x,y){return p.some(function(row,r){return row.some(function(v,c){if(!v)return false;var nx=x+c,ny=y+r;return nx<0||nx>=W||ny>=H||(ny>=0&&board[ny][nx]);});});}
    function rotate(p){return p[0].map(function(_,i){return p.map(function(row){return row[i];}).reverse();});}
    function roundRect(c,x,y,w,h,r){ if(c.roundRect){c.beginPath();c.roundRect(x,y,w,h,r);c.fill();} else c.fillRect(x,y,w,h); }
    function drawBlock(c,x,y,s,color){ var grd=c.createLinearGradient(x,y,x+s,y+s); grd.addColorStop(0,'#fff');grd.addColorStop(.18,color);grd.addColorStop(1,color); c.fillStyle=grd; roundRect(c,x+1,y+1,s-2,s-2,4); c.fillStyle='rgba(255,255,255,.42)'; roundRect(c,x+4,y+4,s-8,5,3); c.fillStyle='rgba(15,23,42,.16)'; roundRect(c,x+4,y+s-7,s-8,4,3); }
    function drawBackground(){var bg=ctx.createLinearGradient(0,0,0,H*CS);bg.addColorStop(0,'#dffcff');bg.addColorStop(.55,'#dbeafe');bg.addColorStop(1,'#eef2ff');ctx.fillStyle=bg;ctx.fillRect(0,0,W*CS,H*CS);ctx.strokeStyle='rgba(59,130,246,.16)';ctx.lineWidth=1;for(var x=0;x<=W;x++){ctx.beginPath();ctx.moveTo(x*CS,0);ctx.lineTo(x*CS,H*CS);ctx.stroke();}for(var y=0;y<=H;y++){ctx.beginPath();ctx.moveTo(0,y*CS);ctx.lineTo(W*CS,y*CS);ctx.stroke();}}
    function drawMini(c,p,color,bg){c.clearRect(0,0,96,96);c.fillStyle=bg;c.fillRect(0,0,96,96); if(!p)return; var s=18,ox=(96-p[0].length*s)/2,oy=(96-p.length*s)/2; p.forEach(function(row,r){row.forEach(function(v,col){if(v)drawBlock(c,ox+col*s,oy+r*s,s,color);});});}
    function draw(){
      drawBackground();
      board.forEach(function(row,r){row.forEach(function(v,c){if(v)drawBlock(ctx,c*CS,r*CS,CS,COLORS[v]);});});
      if(cur){var gy=curY;while(!collide(cur,curX,gy+1))gy++;cur.forEach(function(row,r){row.forEach(function(v,c){if(v&&gy!==curY){ctx.fillStyle='rgba(15,23,42,.14)';roundRect(ctx,(curX+c)*CS+2,(gy+r)*CS+2,CS-4,CS-4,4);}});});cur.forEach(function(row,r){row.forEach(function(v,c){if(v)drawBlock(ctx,(curX+c)*CS,(curY+r)*CS,CS,COLORS[curC]);});});}
      drawMini(nctx,next&&next.p,next&&COLORS[next.c],'#eff6ff'); drawMini(hctx,hold,COLORS[holdC]||'#cbd5e1','#fdf2f8');
    }
    function updateHud(){setText('tScore',score);setText('tLines',lines);setText('tLevel',level);setText('tBest',best);}
    function place(){cur.forEach(function(row,r){row.forEach(function(v,c){if(v&&curY+r>=0)board[curY+r][curX+c]=curC;});});var cleared=0;for(var r=H-1;r>=0;r--){if(board[r].every(Boolean)){board.splice(r,1);board.unshift(Array(W).fill(0));cleared++;r++;}}if(cleared){var pts=[0,100,300,500,800][cleared]*level;score+=pts;lines+=cleared;level=1+Math.floor(lines/8);window.gnwAddCorrect(cleared);window.gnwAddScore(pts);if(score>best){best=score;localStorage.setItem('bestTetrisPro',best);localStorage.setItem('bestTetris',best);}try{window.gnwSpeakPraise(cleared>=4?'Excellent!':cleared>=2?'Great!':'Good!');}catch(e){}updateHud();}spawn();}
    function down(){if(!running||paused)return;if(!collide(cur,curX,curY+1))curY++;else place();draw();}
    function tick(){if(!running||paused)return;down();timer=setTimeout(tick,Math.max(90,560-level*42));}
    function gameOver(){running=false;clearTimeout(timer);window.gnwAddWrong(1);draw();ctx.fillStyle='rgba(15,23,42,.72)';ctx.fillRect(0,0,W*CS,H*CS);ctx.fillStyle='#fff';ctx.textAlign='center';ctx.font='900 30px Inter,Arial';ctx.fillText('Game Over',W*CS/2,H*CS/2-20);ctx.font='800 16px Inter,Arial';ctx.fillText('Score: '+score+' · Lines: '+lines,W*CS/2,H*CS/2+12);setTimeout(function(){window.gnwShowEndStats('lose','<div style="background:#fff;border:2px solid #dbeafe;border-radius:14px;padding:10px;font-weight:900;">🟦 Tetris Score: '+score+' · Lines: '+lines+' · Best: '+best+'</div>');},350);}
    window.tetMove=function(d){if(!running||paused)return;if(!collide(cur,curX+d,curY))curX+=d;draw();};
    window.tetRot=function(){if(!running||paused)return;var r=rotate(cur);if(!collide(r,curX,curY))cur=r;else if(!collide(r,curX+1,curY)){cur=r;curX++;}else if(!collide(r,curX-1,curY)){cur=r;curX--;}draw();};
    window.tetSoft=function(){if(!running||paused)return;score++;down();updateHud();};
    window.tetHard=function(){if(!running||paused)return;var n=0;while(!collide(cur,curX,curY+1)){curY++;score+=2;n++;}if(n)updateHud();place();draw();};
    window.tetHold=function(){if(!running||paused||!canHold)return;canHold=false; if(!hold){hold=cur;holdC=curC;spawn();}else{var p=hold,c=holdC;hold=cur;holdC=curC;cur=p;curC=c;curX=Math.floor(W/2)-Math.floor(cur[0].length/2);curY=0;}draw();};
    window.tetPause=function(){if(!running)return;paused=!paused;var b=el('tetPauseBtn');if(b)b.textContent=paused?'Resume P':'Pause P';var m=el('tet-msg');if(m)m.textContent=paused?'Paused':'Playing!';if(!paused)tick();};
    window.tetRestart=function(){clearTimeout(timer);start();};
    function start(){score=0;lines=0;level=1;running=true;paused=false;hold=null;holdC=0;canHold=true;newBoard();next=pick();spawn();updateHud();draw();clearTimeout(timer);tick();}
    var keyH=function(e){var k=e.key.toLowerCase();var act={arrowleft:function(){tetMove(-1);},arrowright:function(){tetMove(1);},arrowup:function(){tetRot();},x:function(){tetRot();},arrowdown:function(){tetSoft();},' ':function(){tetHard();},c:function(){tetHold();},p:function(){tetPause();},r:function(){tetRestart();}}[k]; if(act){e.preventDefault();act();}};
    document.addEventListener('keydown',keyH);
    window._tetClean=function(){clearTimeout(timer);running=false;document.removeEventListener('keydown',keyH);};
    start();
  };

  function installProGames(){
    patchCore();
    if(window.GAMES){ window.GAMES.snake = window.gameSnake; window.GAMES.tetris = window.gameTetris; }
  }
  installProGames();
  document.addEventListener('DOMContentLoaded', installProGames);
})();


/* ---- next inline block ---- */


/* =========================================================
   GameNest World - Kid Celebration + Broken Games Fix Pack
   Fixes: flappy, chess AI, 2048, snake screen, reaction,
   memory cards, memory hard, lights out, expand button,
   rewards, fireworks, symbols, and removes recommendations.
   ========================================================= */
(function(){
  'use strict';

  function $(id){return document.getElementById(id);} 
  function g(){return (typeof gw==='function'?gw():$('gw'));}
  function r(min,max){return Math.floor(Math.random()*(max-min+1))+min;}
  function shuf(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
  function safeSound(type){try{ if(typeof playSound==='function') playSound(type||'score'); }catch(e){}}
  function addCorrect(n){try{ if(typeof window.gnwAddCorrect==='function') window.gnwAddCorrect(n||1); }catch(e){}}
  function addWrong(n){try{ if(typeof window.gnwAddWrong==='function') window.gnwAddWrong(n||1); }catch(e){}}
  function addScore(n){try{ if(typeof window.gnwAddScore==='function') window.gnwAddScore(n||0); }catch(e){}}

  /* Remove Recommended section completely */
  window.renderAffiliateSection = function(){ var s=$('affiliate-section'); if(s){s.innerHTML='';s.style.display='none';} };
  function hideRecommended(){ var s=$('affiliate-section'); if(s){s.innerHTML='';s.style.display='none';} }
  document.addEventListener('DOMContentLoaded',hideRecommended);
  hideRecommended();

  /* Big friendly game symbols + expanded modal */
  var st=document.createElement('style');
  st.id='gnw-kid-fix-style';
  st.textContent = `
    #affiliate-section{display:none!important;}
    #modal-box{transition:max-width .25s ease,width .25s ease,transform .25s ease;}
    #modal-box.gnw-expanded-game{width:98vw!important;max-width:1180px!important;max-height:97vh!important;font-size:18px!important;}
    #modal-box.gnw-expanded-game #gw{font-size:18px!important;}
    #modal-box.gnw-expanded-game .gnw-game-title{font-size:28px!important;}
    #modal-box.gnw-expanded-game .gnw-chip{font-size:15px!important;padding:9px 12px!important;}
    #modal-box.gnw-expanded-game .kid-game-card{transform:scale(1.06);transform-origin:top center;}
    .kid-game-card{background:linear-gradient(145deg,#ffffff,#fdf2f8 45%,#fef3c7)!important;border:2px solid rgba(255,255,255,.95)!important;border-radius:24px!important;box-shadow:0 22px 55px rgba(15,23,42,.16)!important;padding:18px!important;color:#172033!important;}
    .kid-title{font-size:24px;font-weight:950;color:#172033;margin:0 0 8px;letter-spacing:-.4px;}
    .kid-sub{font-size:14px;font-weight:800;color:#64748b;margin-bottom:12px;}
    .kid-btn{border:none;border-radius:16px;padding:14px 18px;font-weight:950;font-family:inherit;cursor:pointer;box-shadow:0 8px 20px rgba(15,23,42,.10);transition:transform .12s ease,filter .12s ease;background:linear-gradient(135deg,#fef3c7,#bfdbfe,#fbcfe8);color:#172033;}
    .kid-btn:hover{transform:translateY(-2px) scale(1.02);filter:saturate(1.14);}
    .kid-grid{display:grid;gap:10px;justify-content:center;}
    .kid-card-tile{border-radius:20px;border:3px solid #bfdbfe;background:linear-gradient(145deg,#ffffff,#eff6ff);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:54px;font-weight:950;box-shadow:0 10px 22px rgba(15,23,42,.10);transition:transform .15s ease,background .15s ease,border-color .15s ease;user-select:none;}
    .kid-card-tile:hover{transform:translateY(-3px) scale(1.02);}
    .kid-card-tile.face-down{background:linear-gradient(135deg,#fbcfe8,#c4b5fd,#93c5fd);color:#fff;font-size:44px;}
    .kid-card-tile.matched{background:linear-gradient(135deg,#bbf7d0,#dcfce7);border-color:#4ade80;animation:kidPop .45s ease;}
    .kid-stat-row{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin:10px 0 14px;}
    .kid-pill{background:#fff;border:2px solid #e0e7ff;border-radius:999px;padding:7px 12px;font-size:13px;font-weight:950;color:#172033;}
    .kid-arcade-screen{position:relative;display:block;margin:0 auto;border-radius:24px;border:8px solid #0f172a;background:#0b1220;box-shadow:inset 0 0 0 3px rgba(255,255,255,.08),0 25px 55px rgba(15,23,42,.28);max-width:100%;}
    .kid-firework{position:fixed;z-index:100000;pointer-events:none;width:9px;height:9px;border-radius:50%;animation:kidFire 1050ms ease-out forwards;}
    .kid-star{position:fixed;z-index:100000;pointer-events:none;font-size:28px;animation:kidStar 1150ms ease-out forwards;text-shadow:0 8px 18px rgba(15,23,42,.20);}
    .kid-level-toast{position:fixed;left:50%;top:18%;transform:translateX(-50%) scale(.72);z-index:100001;background:linear-gradient(135deg,#fef3c7,#fbcfe8,#bfdbfe);border:4px solid #fff;border-radius:28px;padding:18px 28px;color:#172033;font-size:30px;font-weight:950;box-shadow:0 20px 60px rgba(15,23,42,.25);animation:kidToast 1200ms cubic-bezier(.34,1.56,.64,1) forwards;text-align:center;}
    @keyframes kidFire{0%{transform:translate(0,0) scale(1);opacity:1}100%{transform:translate(var(--x),var(--y)) scale(.25);opacity:0}}
    @keyframes kidStar{0%{transform:translate(0,0) rotate(0) scale(.55);opacity:0}18%{opacity:1}100%{transform:translate(var(--x),var(--y)) rotate(360deg) scale(1.2);opacity:0}}
    @keyframes kidToast{0%{transform:translateX(-50%) scale(.55);opacity:0}18%{transform:translateX(-50%) scale(1.08);opacity:1}72%{transform:translateX(-50%) scale(1)}100%{transform:translateX(-50%) translateY(-18px) scale(.92);opacity:0}}
    @keyframes kidPop{0%{transform:scale(.88)}60%{transform:scale(1.08)}100%{transform:scale(1)}}
    .lo-cell{width:72px;height:72px;border-radius:18px;border:3px solid #dbeafe;cursor:pointer;font-size:34px;font-weight:950;box-shadow:0 9px 20px rgba(15,23,42,.10);transition:transform .12s ease,filter .12s ease;}
    .lo-cell:hover{transform:translateY(-2px) scale(1.04);}
    .chess-square{width:58px;height:58px;display:flex;align-items:center;justify-content:center;font-size:42px;cursor:pointer;user-select:none;transition:transform .1s ease,box-shadow .1s ease;}
    .chess-square:hover{transform:scale(1.04);box-shadow:inset 0 0 0 3px #fbbf24;}
    .chess-selected{box-shadow:inset 0 0 0 4px #22c55e!important;}
    .chess-legal{box-shadow:inset 0 0 0 4px #60a5fa!important;}
    .game-card .g-iw,.top12-card .t-icon{font-size:40px!important;}
    .game-card .g-em{font-size:40px!important;line-height:1!important;}
    #modal-box #gw button{font-size:16px;font-weight:950;}
  `;
  document.head.appendChild(st);

  var praiseWords=['Good!','Very Good!','Great!','Excellent!','Awesome!','Amazing!','Perfect!','Super!','Fantastic!','Brilliant!'];
  window.gnwSpeakPraise=function(word){
    var text=word||praiseWords[r(0,praiseWords.length-1)];
    try{ if(typeof showScorePop==='function') showScorePop(text+' ⭐'); }catch(e){}
    kidMiniFireworks(18);
    try{
      if(window._soundOn===false) return;
      var now=Date.now(); if(window._kidLastSpeak && now-window._kidLastSpeak<700) return; window._kidLastSpeak=now;
      if('speechSynthesis' in window){
        var u=new SpeechSynthesisUtterance(text); u.lang=(document.documentElement.lang||navigator.language||'en-US'); u.rate=1.02; u.pitch=1.2; u.volume=.9;
        try{speechSynthesis.cancel();}catch(e){} speechSynthesis.speak(u);
      }
    }catch(e){}
  };

  function kidMiniFireworks(count){
    var colors=['#f43f5e','#f59e0b','#22c55e','#3b82f6','#a855f7','#06b6d4','#facc15'];
    for(var i=0;i<count;i++){
      var p=document.createElement('div'); p.className='kid-firework';
      p.style.left=(50+r(-18,18))+'vw'; p.style.top=(34+r(-8,12))+'vh';
      p.style.background=colors[r(0,colors.length-1)];
      p.style.setProperty('--x',r(-170,170)+'px'); p.style.setProperty('--y',r(-170,170)+'px');
      document.body.appendChild(p); setTimeout((function(x){return function(){x.remove();};})(p),1200);
    }
  }
  window.kidBigCelebration=function(text){
    safeSound('win'); kidMiniFireworks(75);
    var stars=['⭐','✨','🎉','🌟','💫','🏆','🎈'];
    for(var i=0;i<34;i++){
      var s=document.createElement('div'); s.className='kid-star'; s.textContent=stars[r(0,stars.length-1)];
      s.style.left=r(8,92)+'vw'; s.style.top=r(10,80)+'vh';
      s.style.setProperty('--x',r(-90,90)+'px'); s.style.setProperty('--y',r(-170,90)+'px');
      document.body.appendChild(s); setTimeout((function(x){return function(){x.remove();};})(s),1300);
    }
    var t=document.createElement('div'); t.className='kid-level-toast'; t.textContent=text||praiseWords[r(0,praiseWords.length-1)]+' Level Complete!';
    document.body.appendChild(t); setTimeout(function(){t.remove();},1300);
  };

  /* Patch level system for praise and fireworks between levels */
  function patchLevels(){
    if(!window._LVL || _LVL._kidFirePatch) return;
    var oldWin=_LVL.win, oldLose=_LVL.lose;
    _LVL.win=function(pts){
      var res=oldWin.apply(this,arguments);
      try{ addCorrect(1); window.gnwSpeakPraise(); window.kidBigCelebration('Level Complete!'); }catch(e){}
      return res;
    };
    _LVL.lose=function(){ addWrong(1); return oldLose.apply(this,arguments); };
    _LVL._kidFirePatch=true;
  }
  patchLevels(); document.addEventListener('DOMContentLoaded',patchLevels);

  /* Fullscreen button now uses the real browser Fullscreen API (see toggleGameFullscreen) */
  window.expandModal=function(){toggleGameFullscreen();};

  window.MEM_EMOJIS=['🍎','🍌','🍓','🍇','🍉','🍒','🍍','🥝','🍑','🍋','🥭','🍐','🍊','🫐','🍈','🥥','⭐','🌈','🎈','🚀','🦄','🐼','🐯','🐸'];

  function statHeader(title,sub){
    return '<div class="kid-title">'+title+'</div><div class="kid-sub">'+(sub||'')+'</div>';
  }

  /* MEMORY CARDS - fruit, bigger icons, working */
  function makeMemoryGame(key,pairs,cols,title){
    var area=g(); if(!area) return;
    var icons=shuf(window.MEM_EMOJIS).slice(0,pairs);
    var deck=shuf(icons.concat(icons)).map(function(v,i){return {v:v,id:i,open:false,done:false};});
    var opened=[],moves=0,matched=0,busy=false,started=Date.now();
    if(typeof window.gnwStartStats==='function') window.gnwStartStats(key);
    function render(){
      var size= pairs>8 ? 78 : 102;
      area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:680px;margin:0 auto;">'
        +statHeader(title,'Find all matching fruit pairs. Big symbols, easy to see!')
        +'<div class="kid-stat-row"><div class="kid-pill">Moves: '+moves+'</div><div class="kid-pill">Pairs: '+matched+'/'+pairs+'</div><div class="kid-pill">✅ '+((window.GNW_STATS&&GNW_STATS.correct)||0)+' / ❌ '+((window.GNW_STATS&&GNW_STATS.wrong)||0)+'</div></div>'
        +'<div class="kid-grid" style="grid-template-columns:repeat('+cols+','+size+'px);">'
        +deck.map(function(c,i){return '<button class="kid-card-tile '+((c.open||c.done)?'':'face-down')+' '+(c.done?'matched':'')+'" style="width:'+size+'px;height:'+size+'px;" onclick="kidMemFlip('+i+')">'+(c.open||c.done?c.v:'❔')+'</button>';}).join('')
        +'</div><button class="kid-btn" style="margin-top:16px;" onclick="'+(key==='memhard'?'gameMemHard':'gameMemory')+'()">New Game</button></div>';
    }
    window.kidMemFlip=function(i){
      if(busy || deck[i].open || deck[i].done) return;
      deck[i].open=true; opened.push(i); safeSound('click');
      if(opened.length===2){
        moves++;
        var a=deck[opened[0]], b=deck[opened[1]];
        if(a.v===b.v){
          a.done=b.done=true; opened=[]; matched++; addCorrect(1); addScore(10); window.gnwSpeakPraise();
          if(matched===pairs){ setTimeout(function(){ window.kidBigCelebration('Excellent! You found all pairs!'); if(typeof window.gnwShowEndStats==='function') window.gnwShowEndStats('win','<div class="kid-pill">Moves: '+moves+' · Time: '+Math.round((Date.now()-started)/1000)+'s</div>'); },350); }
        }else{
          busy=true; addWrong(1); setTimeout(function(){a.open=false;b.open=false;opened=[];busy=false;render();},650);
        }
      }
      render();
    };
    render();
  }
  window.gameMemory=function(){makeMemoryGame('memory',6,3,'🍓 Memory Cards');};
  window.gameMemHard=function(){makeMemoryGame('memhard',10,5,'🍍 Advanced Memory');};

  /* LIGHTS OUT - working */
  window.gameLightsOut=function(){
    var area=g(); if(!area) return;
    var N=5, grid=[], moves=0;
    if(typeof window.gnwStartStats==='function') window.gnwStartStats('lightsout');
    function randomize(){grid=Array(N*N).fill(0);moves=0;for(var i=0;i<10;i++)toggle(r(0,N*N-1),true);}
    function toggle(i,silent){ var rr=Math.floor(i/N),cc=i%N; [[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var y=rr+d[0],x=cc+d[1]; if(y>=0&&y<N&&x>=0&&x<N){grid[y*N+x]=1-grid[y*N+x];}}); if(!silent)moves++; }
    function won(){return grid.every(function(v){return v===0;});}
    window.kidLOTap=function(i){toggle(i);safeSound('click'); if(won()){addCorrect(1);window.kidBigCelebration('Excellent! Lights Out!');setTimeout(function(){if(typeof window.gnwShowEndStats==='function')window.gnwShowEndStats('win','<div class="kid-pill">Moves: '+moves+'</div>');},500);} render();};
    function render(){
      area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:560px;margin:0 auto;">'+statHeader('💡 Lights Out','Turn all lights off. Click a light to toggle nearby lights.')
      +'<div class="kid-stat-row"><div class="kid-pill">Moves: '+moves+'</div><div class="kid-pill">Goal: all lights off</div></div>'
      +'<div class="kid-grid" style="grid-template-columns:repeat(5,72px);">'+grid.map(function(v,i){return '<button class="lo-cell" onclick="kidLOTap('+i+')" style="background:'+(v?'linear-gradient(135deg,#fde68a,#facc15)':'linear-gradient(135deg,#e0f2fe,#bfdbfe)')+';color:#172033;">'+(v?'💡':'')+'</button>';}).join('')+'</div>'
      +'<button class="kid-btn" style="margin-top:16px;" onclick="gameLightsOut()">New Puzzle</button></div>';
    }
    window.renderLO=render;
    randomize(); render();
  };
  window.renderLO=function(){ if(typeof window.gameLightsOut==='function') window.gameLightsOut(); };

  /* REACTION TIME - working */
  window.gameReaction=function(){
    var area=g(); if(!area)return;
    if(typeof window.gnwStartStats==='function') window.gnwStartStats('reaction');
    var round=0,total=0,state='ready',started=0,timer=null,early=0;
    function render(msg,bg){
      area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:680px;margin:0 auto;">'+statHeader('⚡ Reaction Time','Wait for GREEN, then click as fast as you can!')
        +'<div id="reactBox" onclick="kidReactTap()" style="height:220px;border-radius:24px;display:flex;align-items:center;justify-content:center;font-size:38px;font-weight:950;color:#fff;cursor:pointer;background:'+(bg||'linear-gradient(135deg,#60a5fa,#a78bfa)')+';box-shadow:0 18px 35px rgba(15,23,42,.18);">'+msg+'</div>'
        +'<div class="kid-stat-row"><div class="kid-pill">Round: '+round+'/3</div><div class="kid-pill">Average: '+(round?Math.round(total/round):0)+'ms</div><div class="kid-pill">Early: '+early+'</div></div>'
        +'<button class="kid-btn" onclick="kidReactStart()">Start</button></div>';
    }
    window.kidReactStart=function(){ clearTimeout(timer); state='wait'; render('Wait...', 'linear-gradient(135deg,#f97316,#fb7185)'); timer=setTimeout(function(){state='green';started=performance.now();render('CLICK NOW!','linear-gradient(135deg,#22c55e,#86efac)');},r(900,2300)); };
    window.kidReactTap=function(){
      if(state==='ready'){window.kidReactStart();return;}
      if(state==='wait'){early++;addWrong(1);clearTimeout(timer);state='ready';render('Too early! Try again','linear-gradient(135deg,#ef4444,#fb7185)');return;}
      if(state==='green'){
        var ms=Math.round(performance.now()-started);total+=ms;round++;addCorrect(1);addScore(Math.max(1,500-ms));
        window.gnwSpeakPraise(ms<300?'Excellent!':ms<450?'Great!':'Good!');
        state='ready';
        if(round>=3){window.kidBigCelebration('Great Reaction!');setTimeout(function(){if(typeof window.gnwShowEndStats==='function')window.gnwShowEndStats('win','<div class="kid-pill">Average Reaction: '+Math.round(total/3)+'ms</div>');},500);}
        else render(ms+'ms! Next round','linear-gradient(135deg,#22c55e,#60a5fa)');
      }
    };
    render('Tap START','linear-gradient(135deg,#60a5fa,#a78bfa)');
  };

  /* 2048 - reliable playable version */
  window.game2048=function(){
    var area=g(); if(!area)return;
    if(typeof window.gnwStartStats==='function') window.gnwStartStats('g2048');
    var board,score=0,best=+(localStorage.getItem('best2048Kid')||0),won=false;
    function empty(){var e=[];for(var i=0;i<16;i++)if(!board[i])e.push(i);return e;}
    function add(){var e=empty(); if(!e.length)return; board[e[r(0,e.length-1)]]=Math.random()<.9?2:4;}
    function start(){board=Array(16).fill(0);score=0;won=false;add();add();render();}
    function canMove(){if(empty().length)return true;for(var i=0;i<16;i++){var row=Math.floor(i/4),col=i%4;if(col<3&&board[i]===board[i+1])return true;if(row<3&&board[i]===board[i+4])return true;}return false;}
    function slide(line){var arr=line.filter(Boolean);for(var i=0;i<arr.length-1;i++){if(arr[i]===arr[i+1]){arr[i]*=2;score+=arr[i];arr.splice(i+1,1);addCorrect(1);window.gnwSpeakPraise(arr[i]>=512?'Excellent!':'Good!');}}while(arr.length<4)arr.push(0);return arr;}
    function move(dir){var old=board.join(',');var nb=board.slice();
      for(var k=0;k<4;k++){
        var line;
        if(dir==='left'){line=[nb[k*4],nb[k*4+1],nb[k*4+2],nb[k*4+3]];line=slide(line);for(var c=0;c<4;c++)nb[k*4+c]=line[c];}
        if(dir==='right'){line=[nb[k*4+3],nb[k*4+2],nb[k*4+1],nb[k*4]];line=slide(line);for(var c=0;c<4;c++)nb[k*4+3-c]=line[c];}
        if(dir==='up'){line=[nb[k],nb[4+k],nb[8+k],nb[12+k]];line=slide(line);for(var rr=0;rr<4;rr++)nb[rr*4+k]=line[rr];}
        if(dir==='down'){line=[nb[12+k],nb[8+k],nb[4+k],nb[k]];line=slide(line);for(var rr=0;rr<4;rr++)nb[(3-rr)*4+k]=line[rr];}
      }
      if(nb.join(',')!==old){board=nb;add(); if(score>best){best=score;localStorage.setItem('best2048Kid',best);} if(board.indexOf(2048)>=0&&!won){won=true;window.kidBigCelebration('2048! Excellent!');} render(); if(!canMove()){addWrong(1);setTimeout(function(){if(typeof window.gnwShowEndStats==='function')window.gnwShowEndStats('lose','<div class="kid-pill">Score: '+score+' · Best: '+best+'</div>');},500);} }
    }
    window.kid2048Move=move; window.kid2048Restart=start;
    function render(){
      var colors={0:'#e2d8cb',2:'#fff7ed',4:'#ffedd5',8:'#fed7aa',16:'#fdba74',32:'#fb923c',64:'#f97316',128:'#fde68a',256:'#facc15',512:'#a7f3d0',1024:'#67e8f9',2048:'#c4b5fd'};
      area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:520px;margin:0 auto;">'+statHeader('🔢 2048','Use arrows, swipe, or buttons. Merge tiles to reach 2048!')
      +'<div class="kid-stat-row"><div class="kid-pill">Score: '+score+'</div><div class="kid-pill">Best: '+best+'</div></div>'
      +'<div id="kid2048board" style="touch-action:none;display:grid;grid-template-columns:repeat(4,82px);gap:10px;background:#c7b8a9;border-radius:22px;padding:10px;justify-content:center;margin:0 auto;max-width:388px;">'
      +board.map(function(v){return '<div style="width:82px;height:82px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:'+(v>999?24:32)+'px;font-weight:950;color:'+(v>4?'#fff':'#172033')+';background:'+(colors[v]||'#475569')+';box-shadow:inset 0 -4px 0 rgba(15,23,42,.10);">'+(v||'')+'</div>';}).join('')+'</div>'
      +'<div class="kid-grid" style="grid-template-columns:repeat(3,64px);margin-top:14px;"><div></div><button class="kid-btn" onclick="kid2048Move(\'up\')">↑</button><div></div><button class="kid-btn" onclick="kid2048Move(\'left\')">←</button><button class="kid-btn" onclick="kid2048Restart()">↻</button><button class="kid-btn" onclick="kid2048Move(\'right\')">→</button><div></div><button class="kid-btn" onclick="kid2048Move(\'down\')">↓</button><div></div></div></div>';
      var bd=$('kid2048board'), sx=0,sy=0; if(bd){bd.addEventListener('touchstart',function(e){sx=e.touches[0].clientX;sy=e.touches[0].clientY;},{passive:true});bd.addEventListener('touchend',function(e){var dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;if(Math.max(Math.abs(dx),Math.abs(dy))>20)move(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up'));},{passive:true});}
    }
    var key=function(e){var m={ArrowLeft:'left',ArrowRight:'right',ArrowUp:'up',ArrowDown:'down'}; if(m[e.key]){e.preventDefault();move(m[e.key]);}}; document.addEventListener('keydown',key); window._kid2048Clean=function(){document.removeEventListener('keydown',key);}; start();
  };

  /* Flappy Bird - reliable */
  window.gameFlappy=function(){
    var area=g(); if(!area)return;
    if(typeof window.gnwStartStats==='function') window.gnwStartStats('flappy');
    var W=390,H=520,bird,pipes,score,best=+(localStorage.getItem('bestFlappyKid')||0),running=false,over=false,raf=0,last=0;
    area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:500px;margin:0 auto;">'+statHeader('🐦 Flappy Bird','Tap, click, or press Space to flap through pipes!')+'<canvas id="kidFlappy" width="'+W+'" height="'+H+'" style="width:390px;max-width:100%;border-radius:24px;box-shadow:0 20px 45px rgba(15,23,42,.18);cursor:pointer;"></canvas><div class="kid-stat-row"><div class="kid-pill">Score: <span id="flScore">0</span></div><div class="kid-pill">Best: '+best+'</div></div><button class="kid-btn" onclick="kidFlappyRestart()">Restart</button></div>';
    var c=$('kidFlappy'),ctx=c.getContext('2d');
    function reset(){bird={x:84,y:230,vy:0};pipes=[];score=0;running=false;over=false;last=0;draw('Tap to Fly!');}
    function flap(){ if(over){reset();return;} if(!running){running=true;last=performance.now();loop(last);} bird.vy=-7.2; safeSound('click'); }
    window.kidFlappyRestart=reset;
    function draw(msg){
      var sky=ctx.createLinearGradient(0,0,0,H);sky.addColorStop(0,'#93c5fd');sky.addColorStop(.7,'#bfdbfe');sky.addColorStop(1,'#dcfce7');ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
      ctx.fillStyle='rgba(255,255,255,.85)';for(var i=0;i<5;i++){ctx.beginPath();ctx.ellipse((i*95+55)%W,60+(i%3)*28,42,18,0,0,Math.PI*2);ctx.fill();}
      pipes.forEach(function(p){var grd=ctx.createLinearGradient(p.x,0,p.x+54,0);grd.addColorStop(0,'#16a34a');grd.addColorStop(.5,'#4ade80');grd.addColorStop(1,'#15803d');ctx.fillStyle=grd;ctx.fillRect(p.x,0,58,p.top);ctx.fillRect(p.x,p.top+p.gap,58,H-p.top-p.gap-46);ctx.fillStyle='#166534';ctx.fillRect(p.x-5,p.top-18,68,18);ctx.fillRect(p.x-5,p.top+p.gap,68,18);});
      ctx.fillStyle='#a3e635';ctx.fillRect(0,H-46,W,10);ctx.fillStyle='#b9825d';ctx.fillRect(0,H-36,W,36);
      ctx.save();ctx.translate(bird.x,bird.y);ctx.rotate(Math.max(-.5,Math.min(.7,bird.vy/10)));ctx.fillStyle='#facc15';ctx.beginPath();ctx.arc(0,0,18,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fff';ctx.beginPath();ctx.arc(7,-6,7,0,Math.PI*2);ctx.fill();ctx.fillStyle='#111827';ctx.beginPath();ctx.arc(9,-6,3,0,Math.PI*2);ctx.fill();ctx.fillStyle='#fb923c';ctx.beginPath();ctx.moveTo(17,0);ctx.lineTo(34,7);ctx.lineTo(17,12);ctx.closePath();ctx.fill();ctx.restore();
      ctx.fillStyle='#fff';ctx.font='950 42px Inter,Arial';ctx.textAlign='center';ctx.strokeStyle='rgba(15,23,42,.28)';ctx.lineWidth=5;ctx.strokeText(score,W/2,58);ctx.fillText(score,W/2,58);
      if(msg){ctx.fillStyle='#172033';ctx.font='950 30px Inter,Arial';ctx.fillText(msg,W/2,170);ctx.font='800 17px Inter,Arial';ctx.fillText('Best: '+best,W/2,205);}
    }
    function loop(t){var dt=Math.min(32,t-last);last=t;if(!running)return; bird.vy+=0.42;bird.y+=bird.vy; if(!pipes.length||pipes[pipes.length-1].x<W-175)pipes.push({x:W+20,top:r(82,300),gap:145,passed:false});pipes.forEach(function(p){p.x-=2.9; if(!p.passed&&p.x+58<bird.x){p.passed=true;score++;addCorrect(1);addScore(5);$('flScore').textContent=score;if(score>best){best=score;localStorage.setItem('bestFlappyKid',best);}window.gnwSpeakPraise(score%5===0?'Excellent!':'Good!');}});pipes=pipes.filter(function(p){return p.x>-80;});
      var hit=bird.y<0||bird.y>H-48||pipes.some(function(p){return bird.x+16>p.x&&bird.x-16<p.x+58&&(bird.y-16<p.top||bird.y+16>p.top+p.gap);});
      draw(); if(hit){over=true;running=false;addWrong(1);draw('Game Over');setTimeout(function(){if(typeof window.gnwShowEndStats==='function')window.gnwShowEndStats('lose','<div class="kid-pill">Flappy Score: '+score+' · Best: '+best+'</div>');},500);return;} raf=requestAnimationFrame(loop);}
    c.addEventListener('pointerdown',flap); var key=function(e){if(e.code==='Space'){e.preventDefault();flap();}};document.addEventListener('keydown',key);window._flappyClean=function(){cancelAnimationFrame(raf);document.removeEventListener('keydown',key);}; reset();
  };

  /* Snake - real arcade screen, no graph-paper look */
  window.gameSnake=function(){
    var area=g(); if(!area)return;
    if(typeof window.gnwStartStats==='function') window.gnwStartStats('snake');
    var W=28,H=22,CS=20,snake,dir,next,food,score=0,best=+(localStorage.getItem('bestSnakeArcade')||0),running=false,paused=false,timer=null;
    area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:760px;margin:0 auto;">'+statHeader('🐍 Snake Arcade','Eat apples, grow longer, and avoid the walls!')+'<div class="kid-stat-row"><div class="kid-pill">Score: <span id="snS">0</span></div><div class="kid-pill">Best: <span id="snB">'+best+'</span></div></div><canvas class="kid-arcade-screen" id="kidSnake" width="'+(W*CS)+'" height="'+(H*CS)+'"></canvas><div class="kid-grid" style="grid-template-columns:repeat(3,62px);margin-top:14px;"><div></div><button class="kid-btn" onclick="kidSnakeDir(0,-1)">↑</button><div></div><button class="kid-btn" onclick="kidSnakeDir(-1,0)">←</button><button class="kid-btn" onclick="kidSnakePause()">⏯</button><button class="kid-btn" onclick="kidSnakeDir(1,0)">→</button><button class="kid-btn" onclick="kidSnakeRestart()">↻</button><button class="kid-btn" onclick="kidSnakeDir(0,1)">↓</button><button class="kid-btn" onclick="kidSnakeBoost()">⚡</button></div></div>';
    var c=$('kidSnake'),ctx=c.getContext('2d');
    function placeFood(){do{food={x:r(1,W-2),y:r(1,H-2)};}while(snake.some(function(s){return s.x===food.x&&s.y===food.y;}));}
    function reset(){snake=[{x:14,y:11},{x:13,y:11},{x:12,y:11}];dir={x:1,y:0};next={x:1,y:0};score=0;running=false;paused=false;placeFood();draw('Press Space or tap arrows');$('snS').textContent=0;}
    function start(){if(!running){running=true;tick();}}
    window.kidSnakeDir=function(x,y){if(dir.x+x===0&&dir.y+y===0)return;next={x:x,y:y};start();};
    window.kidSnakePause=function(){paused=!paused;if(!paused)tick();};
    window.kidSnakeRestart=function(){clearTimeout(timer);reset();};
    window.kidSnakeBoost=function(){start();step();};
    function draw(msg){
      var bg=ctx.createRadialGradient(W*CS/2,H*CS/2,40,W*CS/2,H*CS/2,W*CS/1.1);bg.addColorStop(0,'#154e36');bg.addColorStop(.65,'#062d23');bg.addColorStop(1,'#031b17');ctx.fillStyle=bg;ctx.fillRect(0,0,W*CS,H*CS);
      ctx.strokeStyle='rgba(52,211,153,.16)';ctx.lineWidth=5;ctx.strokeRect(6,6,W*CS-12,H*CS-12);
      for(var i=0;i<30;i++){ctx.fillStyle='rgba(34,197,94,.05)';ctx.beginPath();ctx.arc((i*97)% (W*CS), (i*53)% (H*CS), 12,0,Math.PI*2);ctx.fill();}
      var fx=food.x*CS+CS/2, fy=food.y*CS+CS/2;ctx.shadowColor='#ef4444';ctx.shadowBlur=20;ctx.fillStyle='#ef4444';ctx.beginPath();ctx.arc(fx,fy,CS*.42,0,Math.PI*2);ctx.fill();ctx.shadowBlur=0;ctx.fillStyle='#bbf7d0';ctx.fillRect(fx+3,fy-CS*.65,6,9);
      snake.forEach(function(s,i){var x=s.x*CS+2,y=s.y*CS+2;var grd=ctx.createLinearGradient(x,y,x+CS,y+CS);grd.addColorStop(0,i?'#86efac':'#4ade80');grd.addColorStop(1,i?'#16a34a':'#22c55e');ctx.fillStyle=grd;ctx.shadowColor=i?'transparent':'#4ade80';ctx.shadowBlur=i?0:18;if(ctx.roundRect){ctx.beginPath();ctx.roundRect(x,y,CS-4,CS-4,7);ctx.fill();}else ctx.fillRect(x,y,CS-4,CS-4);ctx.shadowBlur=0;if(i===0){ctx.fillStyle='#052e16';ctx.beginPath();ctx.arc(x+7,y+7,2.6,0,Math.PI*2);ctx.arc(x+CS-9,y+CS-9,2.6,0,Math.PI*2);ctx.fill();}});
      if(msg){ctx.fillStyle='rgba(255,255,255,.95)';ctx.font='950 28px Inter,Arial';ctx.textAlign='center';ctx.fillText(msg,W*CS/2,H*CS/2);}
    }
    function step(){if(!running||paused)return;dir=next;var h={x:snake[0].x+dir.x,y:snake[0].y+dir.y};if(h.x<0||h.x>=W||h.y<0||h.y>=H||snake.some(function(s){return s.x===h.x&&s.y===h.y;})){running=false;addWrong(1);draw('Game Over');setTimeout(function(){if(typeof window.gnwShowEndStats==='function')window.gnwShowEndStats('lose','<div class="kid-pill">Snake Score: '+score+' · Best: '+best+'</div>');},500);return;}snake.unshift(h);if(h.x===food.x&&h.y===food.y){score++;addCorrect(1);addScore(5);$('snS').textContent=score;if(score>best){best=score;localStorage.setItem('bestSnakeArcade',best);$('snB').textContent=best;}placeFood();window.gnwSpeakPraise(score%5===0?'Excellent!':'Good!');}else snake.pop();draw();}
    function tick(){clearTimeout(timer);if(!running||paused)return;step();timer=setTimeout(tick,Math.max(62,130-score*2));}
    var key=function(e){var m={ArrowLeft:[-1,0],a:[-1,0],ArrowRight:[1,0],d:[1,0],ArrowUp:[0,-1],w:[0,-1],ArrowDown:[0,1],s:[0,1]};if(m[e.key]){e.preventDefault();kidSnakeDir(m[e.key][0],m[e.key][1]);}if(e.code==='Space'){e.preventDefault();start();}if(e.key.toLowerCase()==='r')kidSnakeRestart();};document.addEventListener('keydown',key);window._snakeClean=function(){clearTimeout(timer);document.removeEventListener('keydown',key);};reset();
  };

  /* Chess vs simple AI */
  window.gameChess=function(){
    var area=g(); if(!area)return;
    if(typeof window.gnwStartStats==='function') window.gnwStartStats('chess');
    var board,sel=null,turn='w',msg='Your move — play White.',values={p:1,n:3,b:3,r:5,q:9,k:99};
    var sym={K:'♔',Q:'♕',R:'♖',B:'♗',N:'♘',P:'♙',k:'♚',q:'♛',r:'♜',b:'♝',n:'♞',p:'♟'};
    function init(){board=['rnbqkbnr','pppppppp','........','........','........','........','PPPPPPPP','RNBQKBNR'].map(function(s){return s.split('');});turn='w';sel=null;msg='Your move — play White.';render();}
    function color(p){return p==='.'?null:(p===p.toUpperCase()?'w':'b');}
    function inside(r,c){return r>=0&&r<8&&c>=0&&c<8;}
    function movesAt(rr,cc){var p=board[rr][cc],co=color(p);if(!co)return[];var res=[],low=p.toLowerCase();function add(r2,c2){if(!inside(r2,c2))return false;var q=board[r2][c2];if(q==='.'){res.push([r2,c2]);return true;} if(color(q)!==co)res.push([r2,c2]); return false;}function ray(ds){ds.forEach(function(d){var r2=rr+d[0],c2=cc+d[1];while(add(r2,c2)){r2+=d[0];c2+=d[1];}});} if(low==='p'){var dir=co==='w'?-1:1,start=co==='w'?6:1;if(inside(rr+dir,cc)&&board[rr+dir][cc]==='.')res.push([rr+dir,cc]);if(rr===start&&board[rr+dir][cc]==='.'&&board[rr+2*dir][cc]==='.')res.push([rr+2*dir,cc]);[-1,1].forEach(function(dc){var r2=rr+dir,c2=cc+dc;if(inside(r2,c2)&&board[r2][c2]!=='.'&&color(board[r2][c2])!==co)res.push([r2,c2]);});}
      if(low==='n')[[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]].forEach(function(d){add(rr+d[0],cc+d[1]);});
      if(low==='b')ray([[1,1],[1,-1],[-1,1],[-1,-1]]); if(low==='r')ray([[1,0],[-1,0],[0,1],[0,-1]]); if(low==='q')ray([[1,1],[1,-1],[-1,1],[-1,-1],[1,0],[-1,0],[0,1],[0,-1]]); if(low==='k')[[1,1],[1,0],[1,-1],[0,1],[0,-1],[-1,1],[-1,0],[-1,-1]].forEach(function(d){add(rr+d[0],cc+d[1]);}); return res;}
    function allMoves(co){var a=[];for(var rr=0;rr<8;rr++)for(var cc=0;cc<8;cc++)if(color(board[rr][cc])===co)movesAt(rr,cc).forEach(function(m){a.push({from:[rr,cc],to:m,capture:board[m[0]][m[1]]});});return a;}
    function makeMove(fr,to){var p=board[fr[0]][fr[1]],cap=board[to[0]][to[1]];board[to[0]][to[1]]=p;board[fr[0]][fr[1]]='.';if(p==='P'&&to[0]===0)board[to[0]][to[1]]='Q';if(p==='p'&&to[0]===7)board[to[0]][to[1]]='q';return cap;}
    window.kidChessTap=function(rr,cc){if(turn!=='w')return;var p=board[rr][cc];if(sel){var legal=movesAt(sel[0],sel[1]).some(function(m){return m[0]===rr&&m[1]===cc;});if(legal){var cap=makeMove(sel,[rr,cc]);sel=null;addCorrect(1);safeSound('score');if(cap==='k'){window.kidBigCelebration('Checkmate! Excellent!');if(typeof window.gnwShowEndStats==='function')window.gnwShowEndStats('win');return;}turn='b';msg='AI is thinking...';render();setTimeout(ai,450);return;}sel=null;} if(color(p)==='w'){sel=[rr,cc];msg='Choose where to move.';} render();};
    function ai(){var moves=allMoves('b');if(!moves.length){msg='You win!';window.kidBigCelebration('Excellent Chess!');if(typeof window.gnwShowEndStats==='function')window.gnwShowEndStats('win');render();return;}moves.sort(function(a,b){return (values[(b.capture||'.').toLowerCase()]||0)-(values[(a.capture||'.').toLowerCase()]||0)+Math.random()-.5;});var m=moves[0];var cap=makeMove(m.from,m.to);if(cap==='K'){addWrong(1);msg='AI wins. Try again!';if(typeof window.gnwShowEndStats==='function')window.gnwShowEndStats('lose');render();return;}turn='w';msg='Your move — play White.';render();}
    function render(){var legal=sel?movesAt(sel[0],sel[1]).map(function(m){return m[0]+'-'+m[1];}):[];area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:620px;margin:0 auto;">'+statHeader('♟️ Chess vs AI','You are White. Click a piece, then click where to move. AI plays Black.')+'<div class="kid-pill" style="display:inline-block;margin-bottom:12px;">'+msg+'</div><div style="display:inline-grid;grid-template-columns:repeat(8,58px);border:5px solid #7c3aed;border-radius:18px;overflow:hidden;box-shadow:0 18px 38px rgba(15,23,42,.18);">';for(var rr=0;rr<8;rr++)for(var cc=0;cc<8;cc++){var light=(rr+cc)%2===0,cl=(sel&&sel[0]===rr&&sel[1]===cc)?' chess-selected':(legal.indexOf(rr+'-'+cc)>=0?' chess-legal':'');area.innerHTML+='<div onclick="kidChessTap('+rr+','+cc+')" class="chess-square'+cl+'" style="background:'+(light?'#fef3c7':'#c4b5fd')+';color:'+(color(board[rr][cc])==='b'?'#111827':'#ffffff')+';text-shadow:0 2px 5px rgba(15,23,42,.35);">'+(sym[board[rr][cc]]||'')+'</div>';}area.innerHTML+='</div><br><button class="kid-btn" style="margin-top:14px;" onclick="gameChess()">New Chess Game</button></div>';}
    init();
  };

  function install(){
    hideRecommended();
    if(window.GAMES){
      GAMES.memory=window.gameMemory; GAMES.memhard=window.gameMemHard; GAMES.lightsout=window.gameLightsOut;
      GAMES.reaction=window.gameReaction; GAMES.g2048=window.game2048; GAMES.flappy=window.gameFlappy;
      GAMES.snake=window.gameSnake; GAMES.chess=window.gameChess;
    }
  }
  install(); document.addEventListener('DOMContentLoaded',install);
})();


/* ---- next inline block ---- */


(function(){
  function kidCleanupGames(){try{if(window._flappyClean)window._flappyClean();}catch(e){}try{if(window._kid2048Clean)window._kid2048Clean();}catch(e){}try{if(window._snakeClean)window._snakeClean();}catch(e){}try{if(window._tetClean)window._tetClean();}catch(e){}}
  if(!window._kidOpenClosePatched){
    if(typeof window.closeGame==='function'){var oldClose=window.closeGame;window.closeGame=function(){kidCleanupGames();return oldClose.apply(this,arguments);};}
    if(typeof window.openGame==='function'){var oldOpen=window.openGame;window.openGame=function(){kidCleanupGames();return oldOpen.apply(this,arguments);};}
    window._kidOpenClosePatched=true;
  }
})();


/* ---- next inline block ---- */


/* =========================================================
   GameNest World - New Popular Game Types Pack
   Adds original, non-branded games inspired by popular genres:
   fruit match, ball pop, runner, block puzzle, coloring, race, parking.
   ========================================================= */
(function(){
  'use strict';
  function $(id){return document.getElementById(id);} 
  function g(){return (typeof gw==='function'?gw():$('gw'));}
  function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
  function pick(a){return a[rnd(0,a.length-1)];}
  function shuf(a){var b=a.slice();for(var i=b.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=b[i];b[i]=b[j];b[j]=t;}return b;}
  function speak(t){try{if(window.gnwSpeakPraise)window.gnwSpeakPraise(t||pick(['Good!','Very Good!','Great!','Excellent!','Awesome!']));}catch(e){}}
  function celebrate(t){try{if(window.kidBigCelebration)window.kidBigCelebration(t||'Excellent!');}catch(e){}}
  function addC(n){try{if(window.gnwAddCorrect)window.gnwAddCorrect(n||1);}catch(e){}}
  function addW(n){try{if(window.gnwAddWrong)window.gnwAddWrong(n||1);}catch(e){}}
  function addS(n){try{if(window.gnwAddScore)window.gnwAddScore(n||0);}catch(e){}}
  function startStats(k){try{if(window.gnwStartStats)window.gnwStartStats(k);}catch(e){}}
  function endStats(res,extra){try{if(window.gnwShowEndStats)window.gnwShowEndStats(res||'win',extra||'');}catch(e){}}
  function sound(t){try{if(window.playSound)window.playSound(t||'score');}catch(e){}}
  function kidTitle(title,sub){return '<div class="kid-title">'+title+'</div><div class="kid-sub">'+(sub||'')+'</div>';}
  function stat(txt){return '<div class="kid-pill">'+txt+'</div>';}

  var newGames=[
    {key:'fruitpop',cat:'classic',emoji:'🍓',name:'Fruit Pop Blast',desc:'Match fruits',bg:'#fff1f2',border:'#fb7185'},
    {key:'rainbowbubble',cat:'classic',emoji:'🫧',name:'Rainbow Bubble Pop',desc:'Pop color balls',bg:'#e0f2fe',border:'#38bdf8'},
    {key:'citydash',cat:'classic',emoji:'🏃',name:'City Dash Runner',desc:'Run & collect stars',bg:'#ede9fe',border:'#8b5cf6'},
    {key:'blockpuzzle',cat:'classic',emoji:'🧱',name:'Block Puzzle World',desc:'Place blocks',bg:'#fef3c7',border:'#f59e0b'},
    {key:'colorjoy',cat:'classic',emoji:'🎨',name:'Color Joy Studio',desc:'Animals fruits flowers',bg:'#dcfce7',border:'#22c55e'},
    {key:'minirace',cat:'classic',emoji:'🏎️',name:'Mini Race Rush',desc:'Fast racing',bg:'#fee2e2',border:'#ef4444'},
    {key:'parkingpuzzle',cat:'classic',emoji:'🅿️',name:'Parking Puzzle',desc:'Park the car',bg:'#cffafe',border:'#06b6d4'}
  ];

  /* Games below are now included directly in the static Classic Games grid above */
  function updateCounts(){
    var all=document.querySelectorAll('.game-card').length;
    var classic=document.querySelectorAll('.game-card[data-cat="classic"]').length;
    var a=document.querySelector('.flt-all .flt-count'); if(a)a.textContent=all;
    var c=document.querySelector('.flt-classic .flt-count'); if(c)c.textContent=classic;
    document.querySelectorAll('.hero-sub,.footer-tagline').forEach(function(el){el.textContent=el.textContent.replace(/51|58/g,String(all));});
  }

  /* FRUIT POP BLAST - match 3 */
  window.gameFruitPop=function(){
    var area=g(); if(!area)return; startStats('fruitpop');
    var N=7, fruits=['🍎','🍌','🍓','🍇','🍊','🍉'], board=[], selected=null, score=0, moves=30, target=900;
    function init(){board=[];for(var i=0;i<N*N;i++)board[i]=pick(fruits);score=0;moves=30;selected=null;render();}
    function idx(r,c){return r*N+c;} function rc(i){return [Math.floor(i/N),i%N];}
    function matches(){var out={}; for(var r=0;r<N;r++){var run=[idx(r,0)];for(var c=1;c<N;c++){var i=idx(r,c);if(board[i]===board[run[0]])run.push(i);else{if(run.length>=3)run.forEach(function(x){out[x]=1;});run=[i];}}if(run.length>=3)run.forEach(function(x){out[x]=1;});}
      for(var c=0;c<N;c++){var run=[idx(0,c)];for(var r=1;r<N;r++){var i=idx(r,c);if(board[i]===board[run[0]])run.push(i);else{if(run.length>=3)run.forEach(function(x){out[x]=1;});run=[i];}}if(run.length>=3)run.forEach(function(x){out[x]=1;});}
      return Object.keys(out).map(function(x){return +x;});}
    function drop(cleared){cleared.forEach(function(i){board[i]='';}); for(var c=0;c<N;c++){var col=[];for(var r=N-1;r>=0;r--){var v=board[idx(r,c)];if(v)col.push(v);}for(var r=N-1,k=0;r>=0;r--,k++){board[idx(r,c)]=col[k]||pick(fruits);}}}
    function resolve(){var chain=0;function step(){var m=matches(); if(!m.length){render(); if(score>=target){celebrate('Fruit Blast Complete!');setTimeout(function(){endStats('win',stat('Score: '+score)+' '+stat('Moves left: '+moves));},550);} else if(moves<=0){endStats('lose',stat('Score: '+score)+' '+stat('Target: '+target));} return;} chain++;score+=m.length*12*chain;addC(1);addS(m.length*12);speak(chain>1?'Excellent!':'Great!');drop(m);render();setTimeout(step,180);} step();}
    window.kidFruitTap=function(i){if(moves<=0||score>=target)return; if(selected===null){selected=i;render();return;} if(selected===i){selected=null;render();return;} var a=rc(selected),b=rc(i);if(Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])!==1){selected=i;render();return;} var t=board[selected];board[selected]=board[i];board[i]=t;var m=matches(); if(!m.length){t=board[selected];board[selected]=board[i];board[i]=t;addW(1);sound('lose');} else {moves--;sound('pop');selected=null;resolve();return;} selected=null;render();};
    function render(){area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:760px;margin:0 auto;">'+kidTitle('🍓 Fruit Pop Blast','Swap nearby fruits. Match 3 or more to blast them!')+'<div class="kid-stat-row">'+stat('Score: '+score)+' '+stat('Target: '+target)+' '+stat('Moves: '+moves)+'</div><div class="kid-grid" style="grid-template-columns:repeat('+N+',74px);">'+board.map(function(v,i){return '<button onclick="kidFruitTap('+i+')" class="kid-card-tile" style="width:74px;height:74px;font-size:42px;background:'+(selected===i?'linear-gradient(135deg,#fef08a,#fbcfe8)':'linear-gradient(135deg,#ffffff,#fff7ed)')+';border-color:'+(selected===i?'#f59e0b':'#fecdd3')+';">'+v+'</button>';}).join('')+'</div><button class="kid-btn" style="margin-top:16px;" onclick="gameFruitPop()">New Fruit Game</button></div>';}
    init();
  };

  /* RAINBOW BUBBLE POP - same color groups */
  window.gameRainbowBubble=function(){
    var area=g(); if(!area)return; startStats('rainbowbubble');
    var W=9,H=8,balls=['🔴','🟠','🟡','🟢','🔵','🟣'], grid=[], score=0,moves=25;
    function init(){grid=[];for(var i=0;i<W*H;i++)grid[i]=pick(balls);score=0;moves=25;render();}
    function neigh(i){var r=Math.floor(i/W),c=i%W,a=[];[[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var y=r+d[0],x=c+d[1];if(y>=0&&y<H&&x>=0&&x<W)a.push(y*W+x);});return a;}
    function group(i){var v=grid[i],seen={},q=[i],out=[];if(!v)return out;seen[i]=1;while(q.length){var x=q.pop();out.push(x);neigh(x).forEach(function(n){if(!seen[n]&&grid[n]===v){seen[n]=1;q.push(n);}});}return out;}
    function compact(){for(var c=0;c<W;c++){var col=[];for(var r=H-1;r>=0;r--){var v=grid[r*W+c];if(v)col.push(v);}for(var r=H-1,k=0;r>=0;r--,k++)grid[r*W+c]=col[k]||'';} }
    function anyMoves(){for(var i=0;i<grid.length;i++)if(group(i).length>=2)return true;return false;}
    window.kidBubbleTap=function(i){if(moves<=0)return;var gr=group(i);if(gr.length<2){addW(1);sound('lose');return;}gr.forEach(function(x){grid[x]='';});score+=gr.length*gr.length*5;moves--;addC(1);addS(gr.length*8);speak(gr.length>=6?'Excellent!':'Good!');compact();render();if(!anyMoves()||moves<=0){celebrate('Bubble Pop Complete!');setTimeout(function(){endStats('win',stat('Score: '+score)+' '+stat('Moves left: '+moves));},600);}};
    function render(){area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:800px;margin:0 auto;">'+kidTitle('🫧 Rainbow Bubble Pop','Click matching color groups. Bigger groups give more points!')+'<div class="kid-stat-row">'+stat('Score: '+score)+' '+stat('Moves: '+moves)+' '+stat('Goal: pop groups of 2+')+'</div><div class="kid-grid" style="grid-template-columns:repeat('+W+',62px);">'+grid.map(function(v,i){return '<button onclick="kidBubbleTap('+i+')" class="kid-card-tile" style="width:62px;height:62px;font-size:34px;background:linear-gradient(135deg,#eff6ff,#ffffff);border-color:#bae6fd;">'+(v||'')+'</button>';}).join('')+'</div><button class="kid-btn" style="margin-top:16px;" onclick="gameRainbowBubble()">New Bubble Board</button></div>';}
    init();
  };

  /* CITY DASH RUNNER */
  window.gameCityDash=function(){
    var area=g(); if(!area)return; startStats('citydash'); popularCleanup();
    area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:620px;margin:0 auto;">'+kidTitle('🏃 City Dash Runner','Dodge cones, collect stars, and keep running!')+'<div class="kid-stat-row">'+stat('Score: <span id="dashScore">0</span>')+stat('Best: <span id="dashBest">'+(localStorage.bestCityDash||0)+'</span>')+'</div><canvas id="dashCanvas" class="kid-arcade-screen" width="420" height="620"></canvas><div class="kid-grid" style="grid-template-columns:repeat(3,78px);margin-top:14px;"><button class="kid-btn" onclick="kidDashMove(-1)">←</button><button class="kid-btn" onclick="kidDashStart()">Start</button><button class="kid-btn" onclick="kidDashMove(1)">→</button></div></div>';
    var c=$('dashCanvas'),ctx=c.getContext('2d'),lane=1,score=0,best=+(localStorage.bestCityDash||0),obs=[],coins=[],running=false,over=false,frame=0,raf=0;
    function roadX(l){return 95+l*115;}
    function spawn(){if(frame%55===0)obs.push({lane:rnd(0,2),y:-70}); if(frame%38===0)coins.push({lane:rnd(0,2),y:-45});}
    window.kidDashMove=function(d){lane=Math.max(0,Math.min(2,lane+d));if(!running)window.kidDashStart();};
    window.kidDashStart=function(){if(over){return window.gameCityDash();}running=true;};
    function draw(){var sky=ctx.createLinearGradient(0,0,0,620);sky.addColorStop(0,'#7dd3fc');sky.addColorStop(1,'#c4b5fd');ctx.fillStyle=sky;ctx.fillRect(0,0,420,620);ctx.fillStyle='#334155';ctx.fillRect(55,0,310,620);for(var i=1;i<3;i++){ctx.strokeStyle='rgba(255,255,255,.45)';ctx.setLineDash([22,22]);ctx.lineWidth=5;ctx.beginPath();ctx.moveTo(55+i*103,0);ctx.lineTo(55+i*103,620);ctx.stroke();ctx.setLineDash([]);}for(var b=0;b<6;b++){ctx.fillStyle=b%2?'#fde68a':'#bbf7d0';ctx.fillRect((b%2?10:370),b*115+((frame*2)%115)-40,38,70);}coins.forEach(function(o){ctx.font='34px Arial';ctx.fillText('⭐',roadX(o.lane)-18,o.y);});obs.forEach(function(o){ctx.font='44px Arial';ctx.fillText('🚧',roadX(o.lane)-24,o.y);});ctx.font='58px Arial';ctx.fillText('🏃',roadX(lane)-28,520);if(!running){ctx.fillStyle='rgba(15,23,42,.55)';ctx.fillRect(0,0,420,620);ctx.fillStyle='#fff';ctx.font='900 32px Inter,Arial';ctx.textAlign='center';ctx.fillText(over?'Game Over':'Tap Start!',210,295);ctx.font='800 18px Inter,Arial';ctx.fillText('Score: '+score,210,330);ctx.textAlign='left';}}
    function loop(){frame++;if(running){spawn();obs.forEach(function(o){o.y+=5+Math.floor(score/250);});coins.forEach(function(o){o.y+=5+Math.floor(score/250);});obs=obs.filter(function(o){if(o.y>620){score+=2;return false;}return true;});coins=coins.filter(function(o){if(o.y>505&&o.y<570&&o.lane===lane){score+=25;addC(1);speak('Good!');return false;}return o.y<650;});obs.forEach(function(o){if(o.y>485&&o.y<560&&o.lane===lane){running=false;over=true;addW(1);sound('lose');if(score>best){best=score;localStorage.bestCityDash=best;}setTimeout(function(){endStats('lose',stat('Dash Score: '+score)+' '+stat('Best: '+best));},650);}});$('dashScore').textContent=score;$('dashBest').textContent=best;}draw();raf=requestAnimationFrame(loop);window._popularClean=function(){cancelAnimationFrame(raf);document.removeEventListener('keydown',key);};}
    function key(e){if(e.key==='ArrowLeft'){e.preventDefault();window.kidDashMove(-1);}if(e.key==='ArrowRight'){e.preventDefault();window.kidDashMove(1);}if(e.code==='Space'){e.preventDefault();window.kidDashStart();}}
    document.addEventListener('keydown',key);draw();loop();
  };

  /* BLOCK PUZZLE WORLD */
  window.gameBlockPuzzle=function(){
    var area=g(); if(!area)return; startStats('blockpuzzle');
    var N=8, board=Array(N*N).fill(0), score=0, pieces=[], sel=-1, shapes=[[[0,0]],[[0,0],[0,1]],[[0,0],[1,0]],[[0,0],[0,1],[0,2]],[[0,0],[1,0],[2,0]],[[0,0],[0,1],[1,0],[1,1]],[[0,0],[1,0],[1,1]],[[0,1],[1,0],[1,1]],[[0,0],[0,1],[0,2],[1,1]]];
    function newPieces(){pieces=[pick(shapes),pick(shapes),pick(shapes)];sel=-1;}
    function canPlace(shape,pos){var rr=Math.floor(pos/N),cc=pos%N;return shape.every(function(p){var r=rr+p[0],c=cc+p[1];return r>=0&&r<N&&c>=0&&c<N&&!board[r*N+c];});}
    function place(shape,pos){var rr=Math.floor(pos/N),cc=pos%N;shape.forEach(function(p){board[(rr+p[0])*N+(cc+p[1])]=1;});}
    function clearLines(){var clearRows=[],clearCols=[];for(var r=0;r<N;r++){var ok=true;for(var c=0;c<N;c++)if(!board[r*N+c])ok=false;if(ok)clearRows.push(r);}for(var c=0;c<N;c++){var ok=true;for(var r=0;r<N;r++)if(!board[r*N+c])ok=false;if(ok)clearCols.push(c);}clearRows.forEach(function(r){for(var c=0;c<N;c++)board[r*N+c]=0;});clearCols.forEach(function(c){for(var r=0;r<N;r++)board[r*N+c]=0;});var lines=clearRows.length+clearCols.length;if(lines){score+=lines*100;addC(lines);speak(lines>=2?'Excellent!':'Great!');celebrate(lines+' Line Clear!');}return lines;}
    function anyFit(){return pieces.some(function(s){return s&&board.some(function(_,i){return canPlace(s,i);});});}
    window.kidBlockSelect=function(i){sel=i;render();};
    window.kidBlockPlace=function(i){if(sel<0||!pieces[sel])return;if(!canPlace(pieces[sel],i)){addW(1);sound('lose');return;}place(pieces[sel],i);score+=pieces[sel].length*10;addS(10);pieces[sel]=null;sel=-1;clearLines();if(pieces.every(function(p){return !p;}))newPieces();render();if(!anyFit()){setTimeout(function(){endStats('lose',stat('Block Score: '+score));},450);}};
    function pieceHtml(s,i){if(!s)return '<div style="height:90px"></div>';var maxR=Math.max.apply(null,s.map(function(p){return p[0];}))+1,maxC=Math.max.apply(null,s.map(function(p){return p[1];}))+1;var cells='';for(var r=0;r<maxR;r++)for(var c=0;c<maxC;c++){var on=s.some(function(p){return p[0]===r&&p[1]===c;});cells+='<div style="width:26px;height:26px;border-radius:7px;background:'+(on?'linear-gradient(135deg,#60a5fa,#a78bfa)':'transparent')+';"></div>'; }return '<button onclick="kidBlockSelect('+i+')" style="border:3px solid '+(sel===i?'#f59e0b':'#dbeafe')+';background:#fff;border-radius:16px;padding:10px;min-width:96px;min-height:92px;cursor:pointer;"><div style="display:grid;grid-template-columns:repeat('+maxC+',26px);gap:4px;justify-content:center;">'+cells+'</div></button>';}
    function render(){area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:760px;margin:0 auto;">'+kidTitle('🧱 Block Puzzle World','Pick a block, place it on the board, complete rows or columns!')+'<div class="kid-stat-row">'+stat('Score: '+score)+stat('Select a piece → click board')+'</div><div class="kid-grid" style="grid-template-columns:repeat('+N+',50px);">'+board.map(function(v,i){return '<button onclick="kidBlockPlace('+i+')" style="width:50px;height:50px;border-radius:11px;border:2px solid #bfdbfe;background:'+(v?'linear-gradient(135deg,#60a5fa,#a78bfa)':'linear-gradient(135deg,#f8fafc,#e0f2fe)')+';cursor:pointer;"></button>';}).join('')+'</div><div style="display:flex;justify-content:center;gap:12px;margin-top:16px;flex-wrap:wrap;">'+pieces.map(pieceHtml).join('')+'</div><button class="kid-btn" style="margin-top:14px;" onclick="gameBlockPuzzle()">New Block Game</button></div>';}
    newPieces();render();
  };

  /* COLOR JOY STUDIO */
  window.gameColorJoy=function(){
    var area=g(); if(!area)return; startStats('colorjoy');
    var colors=['#ef4444','#f97316','#facc15','#22c55e','#38bdf8','#8b5cf6','#ec4899','#ffffff'], chosen=colors[0], mode='animals', filled={}, sets={animals:['🐶','🐱','🐰','🦁','🐸','🐠','🦋','🐼'],fruits:['🍎','🍌','🍓','🍇','🍉','🍊','🍍','🥝'],flowers:['🌸','🌼','🌹','🌻','🌷','🪷','💐','🌺']};
    window.kidColorMode=function(m){mode=m;filled={};render();}; window.kidPickColor=function(c){chosen=c;render();}; window.kidPaint=function(i){filled[i]=chosen;addC(1);speak('Beautiful!');render();if(Object.keys(filled).length>=sets[mode].length){celebrate('Beautiful Coloring!');setTimeout(function(){endStats('win',stat('Colored: '+Object.keys(filled).length));},600);}};
    function render(){area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:820px;margin:0 auto;">'+kidTitle('🎨 Color Joy Studio','Paint animals, fruits, and flowers with bright colors.')+'<div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;"><button class="kid-btn" onclick="kidColorMode(\'animals\')">🐾 Animals</button><button class="kid-btn" onclick="kidColorMode(\'fruits\')">🍓 Fruits</button><button class="kid-btn" onclick="kidColorMode(\'flowers\')">🌸 Flowers</button></div><div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:14px;">'+colors.map(function(c){return '<button onclick="kidPickColor(\''+c+'\')" style="width:42px;height:42px;border-radius:50%;border:4px solid '+(chosen===c?'#172033':'#fff')+';background:'+c+';box-shadow:0 6px 14px rgba(15,23,42,.16);cursor:pointer;"></button>';}).join('')+'</div><div class="kid-grid" style="grid-template-columns:repeat(4,118px);">'+sets[mode].map(function(e,i){return '<button class="kid-card-tile" onclick="kidPaint('+i+')" style="width:118px;height:118px;font-size:58px;background:'+(filled[i]||'linear-gradient(135deg,#ffffff,#f8fafc)')+';border-color:#dbeafe;">'+e+'</button>';}).join('')+'</div></div>';}
    render();
  };

  /* MINI RACE RUSH */
  window.gameMiniRace=function(){
    var area=g(); if(!area)return; startStats('minirace'); popularCleanup();
    area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:620px;margin:0 auto;">'+kidTitle('🏎️ Mini Race Rush','Dodge cars and collect coins. Bright arcade racing!')+'<div class="kid-stat-row">'+stat('Score: <span id="raceScore">0</span>')+stat('Best: <span id="raceBest">'+(localStorage.bestMiniRace||0)+'</span>')+'</div><canvas id="raceCanvas" class="kid-arcade-screen" width="430" height="620"></canvas><div class="kid-grid" style="grid-template-columns:repeat(3,78px);margin-top:14px;"><button class="kid-btn" onclick="kidRaceMove(-1)">←</button><button class="kid-btn" onclick="kidRaceStart()">Start</button><button class="kid-btn" onclick="kidRaceMove(1)">→</button></div></div>';
    var c=$('raceCanvas'),ctx=c.getContext('2d'),lane=1,score=0,best=+(localStorage.bestMiniRace||0),cars=[],coins=[],running=false,over=false,frame=0,raf=0;
    function x(l){return 92+l*122;}
    window.kidRaceMove=function(d){lane=Math.max(0,Math.min(2,lane+d));if(!running)window.kidRaceStart();};window.kidRaceStart=function(){if(over)return window.gameMiniRace();running=true;};
    function draw(){ctx.fillStyle='#14532d';ctx.fillRect(0,0,430,620);ctx.fillStyle='#475569';ctx.fillRect(42,0,346,620);ctx.strokeStyle='#fef3c7';ctx.lineWidth=5;ctx.setLineDash([26,22]);ctx.beginPath();ctx.moveTo(42+115,0);ctx.lineTo(42+115,620);ctx.moveTo(42+230,0);ctx.lineTo(42+230,620);ctx.stroke();ctx.setLineDash([]);coins.forEach(function(o){ctx.font='32px Arial';ctx.fillText('🪙',x(o.lane)-16,o.y);});cars.forEach(function(o){ctx.font='52px Arial';ctx.fillText(o.e,x(o.lane)-28,o.y);});ctx.font='64px Arial';ctx.fillText('🏎️',x(lane)-34,520);if(!running){ctx.fillStyle='rgba(15,23,42,.58)';ctx.fillRect(0,0,430,620);ctx.fillStyle='#fff';ctx.font='900 34px Inter,Arial';ctx.textAlign='center';ctx.fillText(over?'Crash!':'Start Race!',215,295);ctx.font='800 18px Inter,Arial';ctx.fillText('Score: '+score,215,330);ctx.textAlign='left';}}
    function loop(){frame++;if(running){if(frame%46===0)cars.push({lane:rnd(0,2),y:-60,e:pick(['🚗','🚙','🚕','🚌'])});if(frame%34===0)coins.push({lane:rnd(0,2),y:-40});cars.forEach(function(o){o.y+=6+Math.floor(score/220);});coins.forEach(function(o){o.y+=6+Math.floor(score/220);});cars=cars.filter(function(o){if(o.y>620){score+=3;return false;}return true;});coins=coins.filter(function(o){if(o.y>500&&o.y<570&&o.lane===lane){score+=30;addC(1);speak('Great!');return false;}return o.y<650;});cars.forEach(function(o){if(o.y>485&&o.y<565&&o.lane===lane){running=false;over=true;addW(1);if(score>best){best=score;localStorage.bestMiniRace=best;}setTimeout(function(){endStats('lose',stat('Race Score: '+score)+' '+stat('Best: '+best));},600);}});$('raceScore').textContent=score;$('raceBest').textContent=best;}draw();raf=requestAnimationFrame(loop);window._popularClean=function(){cancelAnimationFrame(raf);document.removeEventListener('keydown',key);};}
    function key(e){if(e.key==='ArrowLeft'){e.preventDefault();window.kidRaceMove(-1);}if(e.key==='ArrowRight'){e.preventDefault();window.kidRaceMove(1);}if(e.code==='Space'){e.preventDefault();window.kidRaceStart();}}
    document.addEventListener('keydown',key);draw();loop();
  };

  /* PARKING PUZZLE */
  window.gameParkingPuzzle=function(){
    var area=g(); if(!area)return; startStats('parkingpuzzle');
    var N=6, car={r:5,c:0}, goal={r:0,c:5}, moves=0, obstacles={'1,1':1,'1,2':1,'2,4':1,'3,1':1,'4,3':1,'3,4':1};
    window.kidParkMove=function(dr,dc){var nr=car.r+dr,nc=car.c+dc;if(nr<0||nr>=N||nc<0||nc>=N||obstacles[nr+','+nc]){addW(1);sound('lose');return;}car={r:nr,c:nc};moves++;addC(1);sound('click');render();if(car.r===goal.r&&car.c===goal.c){celebrate('Perfect Parking!');setTimeout(function(){endStats('win',stat('Moves: '+moves));},550);}};
    function render(){var cells='';for(var r=0;r<N;r++)for(var c=0;c<N;c++){var isCar=car.r===r&&car.c===c,isGoal=goal.r===r&&goal.c===c,isObs=obstacles[r+','+c];cells+='<div style="width:72px;height:72px;border-radius:16px;display:flex;align-items:center;justify-content:center;font-size:42px;border:3px solid #bfdbfe;background:'+(isGoal?'#bbf7d0':isObs?'#cbd5e1':'#f8fafc')+';">'+(isCar?'🚗':isGoal?'🅿️':isObs?'🧱':'')+'</div>';}
      area.innerHTML='<div class="kid-game-card" style="text-align:center;max-width:620px;margin:0 auto;">'+kidTitle('🅿️ Parking Puzzle','Move the car to the green parking spot. Avoid blocks!')+'<div class="kid-stat-row">'+stat('Moves: '+moves)+stat('Goal: 🅿️')+'</div><div class="kid-grid" style="grid-template-columns:repeat('+N+',72px);">'+cells+'</div><div class="kid-grid" style="grid-template-columns:repeat(3,70px);margin-top:14px;"><div></div><button class="kid-btn" onclick="kidParkMove(-1,0)">↑</button><div></div><button class="kid-btn" onclick="kidParkMove(0,-1)">←</button><button class="kid-btn" onclick="gameParkingPuzzle()">↻</button><button class="kid-btn" onclick="kidParkMove(0,1)">→</button><div></div><button class="kid-btn" onclick="kidParkMove(1,0)">↓</button><div></div></div></div>';}
    render();
  };

  function popularCleanup(){try{if(window._popularClean){window._popularClean();window._popularClean=null;}}catch(e){}}
  function install(){
    updateCounts();
    if(window.GAMES){
      GAMES.fruitpop=window.gameFruitPop;GAMES.rainbowbubble=window.gameRainbowBubble;GAMES.citydash=window.gameCityDash;GAMES.blockpuzzle=window.gameBlockPuzzle;GAMES.colorjoy=window.gameColorJoy;GAMES.minirace=window.gameMiniRace;GAMES.parkingpuzzle=window.gameParkingPuzzle;
    }
  }
  install(); document.addEventListener('DOMContentLoaded',install);
  if(!window._popularGamesOpenClosePatched){
    if(typeof window.closeGame==='function'){var oldClose=window.closeGame;window.closeGame=function(){popularCleanup();return oldClose.apply(this,arguments);};}
    if(typeof window.openGame==='function'){var oldOpen=window.openGame;window.openGame=function(k){popularCleanup();return oldOpen.apply(this,arguments);};}
    window._popularGamesOpenClosePatched=true;
  }
})();


/* ---- next inline block ---- */


(function(){
  'use strict';
  function $(id){return document.getElementById(id);}
  function area(){return (typeof window.gw==='function' ? window.gw() : $('gw'));}
  function rnd(a,b){return Math.floor(Math.random()*(b-a+1))+a;}
  function pick(a){return a[Math.floor(Math.random()*a.length)];}
  function startStats(k){try{window.gnwStartStats&&window.gnwStartStats(k);}catch(e){}}
  function endStats(res,extra){try{window.gnwShowEndStats&&window.gnwShowEndStats(res||'win',extra||'');}catch(e){}}
  function addC(n){try{window.gnwAddCorrect&&window.gnwAddCorrect(n||1);}catch(e){}}
  function addW(n){try{window.gnwAddWrong&&window.gnwAddWrong(n||1);}catch(e){}}
  function addS(n){try{window.gnwAddScore&&window.gnwAddScore(n||0);}catch(e){}}
  function sound(t){try{window.playSound&&window.playSound(t||'pop');}catch(e){}}
  function praise(txt){try{if(window.gnwSpeakPraise)window.gnwSpeakPraise(txt||pick(['Good!','Very Good!','Great!','Excellent!','Awesome!']));}catch(e){}}
  function celebrate(txt){try{if(window.kidBigCelebration)window.kidBigCelebration(txt||'Excellent!');}catch(e){}}
  function stat(t){return '<span class="kid-pill">'+t+'</span>';}
  function title(h,sub){return '<div style="margin-bottom:14px;"><h2 style="font-size:clamp(22px,3vw,32px);font-weight:950;margin:0 0 8px;color:#172033;">'+h+'</h2><div style="font-size:clamp(13px,1.8vw,16px);font-weight:800;color:#64748b;">'+sub+'</div></div>';}

  function updateFullscreenClass(){
    var ov=$('overlay');
    if(ov) ov.classList.toggle('gnw-fullscreen-on', !!document.fullscreenElement);
  }
  document.addEventListener('fullscreenchange',updateFullscreenClass);

  /* Fixed Fruit Pop Blast: responsive board, real swap/match/drop/refill */
  window.gameFruitPop=function(){
    var a=area(); if(!a)return; startStats('fruitpop');
    var N=6, fruits=['🍎','🍌','🍓','🍇','🍊','🍉'], board=[], selected=null, score=0, moves=28, target=520, busy=false;
    function idx(r,c){return r*N+c;} function rc(i){return [Math.floor(i/N),i%N];}
    function fillBoard(){
      board=[];
      for(var i=0;i<N*N;i++) board[i]=pick(fruits);
      var guard=0;
      while(matches().length && guard++<30){matches().forEach(function(i){board[i]=pick(fruits);});}
    }
    function matches(){
      var out={};
      for(var r=0;r<N;r++){var run=[idx(r,0)];for(var c=1;c<N;c++){var i=idx(r,c);if(board[i]&&board[i]===board[run[0]])run.push(i);else{if(run.length>=3)run.forEach(function(x){out[x]=1;});run=[i];}}if(run.length>=3)run.forEach(function(x){out[x]=1;});}
      for(var c=0;c<N;c++){var run=[idx(0,c)];for(var r=1;r<N;r++){var i=idx(r,c);if(board[i]&&board[i]===board[run[0]])run.push(i);else{if(run.length>=3)run.forEach(function(x){out[x]=1;});run=[i];}}if(run.length>=3)run.forEach(function(x){out[x]=1;});}
      return Object.keys(out).map(Number);
    }
    function dropAndFill(cleared){
      cleared.forEach(function(i){board[i]='';});
      for(var c=0;c<N;c++){
        var col=[];for(var r=N-1;r>=0;r--){var v=board[idx(r,c)];if(v)col.push(v);}
        for(var r=N-1,k=0;r>=0;r--,k++) board[idx(r,c)]=col[k]||pick(fruits);
      }
    }
    function resolve(chain){
      busy=true;
      var m=matches();
      if(!m.length){busy=false;render(); if(score>=target){celebrate('Fruit Blast Complete!');setTimeout(function(){endStats('win',stat('Score: '+score)+' '+stat('Moves left: '+moves));},500);}else if(moves<=0){setTimeout(function(){endStats('lose',stat('Score: '+score)+' '+stat('Target: '+target));},250);} return;}
      score+=m.length*14*(chain||1); addC(1); addS(m.length*10); praise((chain||1)>1?'Excellent!':'Great!'); sound('pop');
      dropAndFill(m); render(m);
      setTimeout(function(){resolve((chain||1)+1);},210);
    }
    window.kidFruitTap=function(i){
      if(busy||moves<=0||score>=target)return;
      if(selected===null){selected=i;render();return;}
      if(selected===i){selected=null;render();return;}
      var p=rc(selected),q=rc(i),near=Math.abs(p[0]-q[0])+Math.abs(p[1]-q[1])===1;
      if(!near){selected=i;render();return;}
      var t=board[selected]; board[selected]=board[i]; board[i]=t;
      if(!matches().length){t=board[selected]; board[selected]=board[i]; board[i]=t; addW(1); sound('lose'); selected=null; render(); return;}
      moves--; selected=null; resolve(1);
    };
    function render(blast){
      var cells=board.map(function(v,i){return '<button class="gnw-fruit-cell '+(selected===i?'sel':'')+'" onclick="kidFruitTap('+i+')" aria-label="fruit cell">'+v+'</button>';}).join('');
      a.innerHTML='<div class="kid-game-card" style="text-align:center;">'+title('🍓 Fruit Pop Blast','Swap nearby fruits. Match 3 or more to blast them!')+'<div class="kid-stat-row">'+stat('Score: '+score)+stat('Target: '+target)+stat('Moves: '+moves)+'</div><div class="gnw-fit-wrap"><div class="gnw-fit-grid gnw-fruit-grid">'+cells+'</div></div><button class="kid-btn" style="margin-top:16px;" onclick="gameFruitPop()">New Fruit Game</button></div>';
    }
    fillBoard(); render();
  };

  /* Fixed Rainbow Bubble Pop: board fits and refills; always playable */
  window.gameRainbowBubble=function(){
    var a=area(); if(!a)return; startStats('rainbowbubble');
    var W=7,H=7, colors=['#ef4444','#f97316','#facc15','#22c55e','#3b82f6','#a855f7'], grid=[], score=0, moves=24;
    function init(){grid=[];for(var i=0;i<W*H;i++)grid[i]=pick(colors);score=0;moves=24;render();}
    function neigh(i){var r=Math.floor(i/W),c=i%W,arr=[];[[1,0],[-1,0],[0,1],[0,-1]].forEach(function(d){var y=r+d[0],x=c+d[1];if(y>=0&&y<H&&x>=0&&x<W)arr.push(y*W+x);});return arr;}
    function group(i){var v=grid[i],seen={},q=[i],out=[];if(!v)return out;seen[i]=1;while(q.length){var x=q.pop();out.push(x);neigh(x).forEach(function(n){if(!seen[n]&&grid[n]===v){seen[n]=1;q.push(n);}});}return out;}
    function compactRefill(){for(var c=0;c<W;c++){var col=[];for(var r=H-1;r>=0;r--){var v=grid[r*W+c];if(v)col.push(v);}for(var r=H-1,k=0;r>=0;r--,k++)grid[r*W+c]=col[k]||pick(colors);}}
    window.kidBubbleTap=function(i){
      if(moves<=0)return;
      var gr=group(i);
      if(gr.length<2){addW(1);sound('lose');return;}
      gr.forEach(function(x){grid[x]='';}); score+=gr.length*gr.length*6; moves--; addC(1); addS(gr.length*8); praise(gr.length>=6?'Excellent!':gr.length>=4?'Very Good!':'Good!'); sound('pop'); compactRefill(); render();
      if(moves<=0){celebrate('Bubble Pop Complete!');setTimeout(function(){endStats('win',stat('Score: '+score));},450);}
    };
    function render(){
      var cells=grid.map(function(c,i){return '<button class="gnw-bubble-cell" onclick="kidBubbleTap('+i+')"><span class="gnw-ball" style="background:'+c+'"></span></button>';}).join('');
      a.innerHTML='<div class="kid-game-card" style="text-align:center;">'+title('🫧 Rainbow Bubble Pop','Click groups of matching balls. Bigger groups give more points!')+'<div class="kid-stat-row">'+stat('Score: '+score)+stat('Moves: '+moves)+stat('Pop 2+ same color')+'</div><div class="gnw-fit-wrap"><div class="gnw-fit-grid gnw-bubble-grid">'+cells+'</div></div><button class="kid-btn" style="margin-top:16px;" onclick="gameRainbowBubble()">New Bubble Board</button></div>';
    }
    init();
  };

  /* Fixed Coloring: real coloring-book style SVG pages */
  window.gameColorJoy=function(){
    var a=area(); if(!a)return; startStats('colorjoy');
    var palette=['#ef4444','#fb923c','#facc15','#22c55e','#38bdf8','#8b5cf6','#ec4899','#ffffff'], chosen=palette[0], mode='flowers', page=0, fills={};
    var pages={
      flowers:[flowerSvg,roseSvg],
      animals:[catSvg,birdSvg],
      fruits:[fruitSvg,strawberrySvg]
    };
    window.kidColorMode=function(m){mode=m;page=0;fills={};render();};
    window.kidPickColor=function(c){chosen=c;render();};
    window.kidPaintPart=function(id){fills[id]=chosen;addC(1);praise('Beautiful!');sound('pop');render();};
    window.kidNextColorPage=function(){page=(page+1)%pages[mode].length;fills={};render();};
    function fill(id){return fills[id]||'#ffffff';}
    function svgButton(id,shape){return shape.replace('data-id="'+id+'"','data-id="'+id+'" onclick="kidPaintPart(\''+id+'\')" style="fill:'+fill(id)+'"');}
    function flowerSvg(){return '<svg viewBox="0 0 520 520" role="img" aria-label="flower coloring page">'+
      svgButton('petal1','<ellipse data-id="petal1" class="gnw-color-part" cx="260" cy="118" rx="42" ry="76"/>')+
      svgButton('petal2','<ellipse data-id="petal2" class="gnw-color-part" cx="338" cy="154" rx="42" ry="76" transform="rotate(45 338 154)"/>')+
      svgButton('petal3','<ellipse data-id="petal3" class="gnw-color-part" cx="374" cy="238" rx="42" ry="76" transform="rotate(90 374 238)"/>')+
      svgButton('petal4','<ellipse data-id="petal4" class="gnw-color-part" cx="320" cy="316" rx="42" ry="76" transform="rotate(135 320 316)"/>')+
      svgButton('petal5','<ellipse data-id="petal5" class="gnw-color-part" cx="218" cy="316" rx="42" ry="76" transform="rotate(45 218 316)"/>')+
      svgButton('petal6','<ellipse data-id="petal6" class="gnw-color-part" cx="146" cy="238" rx="42" ry="76" transform="rotate(90 146 238)"/>')+
      svgButton('petal7','<ellipse data-id="petal7" class="gnw-color-part" cx="182" cy="154" rx="42" ry="76" transform="rotate(135 182 154)"/>')+
      svgButton('center','<circle data-id="center" class="gnw-color-part" cx="260" cy="238" r="58"/>')+
      svgButton('stem','<path data-id="stem" class="gnw-color-part" d="M250 296 C238 370 230 430 230 500 L276 500 C278 430 276 360 270 296 Z"/>')+
      svgButton('leaf1','<path data-id="leaf1" class="gnw-color-part" d="M238 386 C150 350 132 410 214 430 C240 430 262 410 238 386 Z"/>')+
      svgButton('leaf2','<path data-id="leaf2" class="gnw-color-part" d="M270 420 C350 372 392 430 300 460 C280 455 268 440 270 420 Z"/>')+
      '</svg>';}
    function roseSvg(){return '<svg viewBox="0 0 520 520">'+
      svgButton('rose1','<path data-id="rose1" class="gnw-color-part" d="M260 105 C350 120 390 210 340 280 C300 340 220 340 180 280 C130 205 170 120 260 105 Z"/>')+
      svgButton('rose2','<path data-id="rose2" class="gnw-color-part" d="M260 155 C318 165 332 226 290 258 C250 288 198 260 206 210 C212 176 230 160 260 155 Z"/>')+
      svgButton('rose3','<path data-id="rose3" class="gnw-color-part" d="M250 200 C288 190 306 222 280 244 C246 270 220 235 250 200 Z"/>')+
      svgButton('stem','<path data-id="stem" class="gnw-color-part" d="M248 320 L236 500 L284 500 L270 320 Z"/>')+
      svgButton('leaf1','<path data-id="leaf1" class="gnw-color-part" d="M238 380 C155 340 130 410 220 430 C245 430 260 405 238 380 Z"/>')+
      svgButton('leaf2','<path data-id="leaf2" class="gnw-color-part" d="M276 404 C355 360 392 426 305 456 C282 452 266 430 276 404 Z"/>')+'</svg>';}
    function catSvg(){return '<svg viewBox="0 0 520 520">'+
      svgButton('body','<ellipse data-id="body" class="gnw-color-part" cx="260" cy="320" rx="128" ry="142"/>')+
      svgButton('head','<circle data-id="head" class="gnw-color-part" cx="260" cy="190" r="105"/>')+
      svgButton('ear1','<path data-id="ear1" class="gnw-color-part" d="M185 128 L154 48 L235 92 Z"/>')+
      svgButton('ear2','<path data-id="ear2" class="gnw-color-part" d="M335 128 L366 48 L285 92 Z"/>')+
      svgButton('tail','<path data-id="tail" class="gnw-color-part" d="M372 318 C475 300 470 428 392 404 C358 394 360 352 395 356 C424 360 426 396 396 392"/>')+
      svgButton('paw1','<ellipse data-id="paw1" class="gnw-color-part" cx="214" cy="452" rx="42" ry="30"/>')+
      svgButton('paw2','<ellipse data-id="paw2" class="gnw-color-part" cx="306" cy="452" rx="42" ry="30"/>')+
      '<circle cx="222" cy="178" r="10"/><circle cx="298" cy="178" r="10"/><path class="gnw-outline" d="M248 220 Q260 232 272 220 M260 232 Q240 250 220 236 M260 232 Q280 250 300 236"/></svg>';}
    function birdSvg(){return '<svg viewBox="0 0 520 520">'+
      svgButton('body','<ellipse data-id="body" class="gnw-color-part" cx="260" cy="296" rx="115" ry="138"/>')+
      svgButton('wing','<path data-id="wing" class="gnw-color-part" d="M260 280 C355 250 390 330 300 398 C258 370 246 325 260 280 Z"/>')+
      svgButton('head','<circle data-id="head" class="gnw-color-part" cx="218" cy="156" r="72"/>')+
      svgButton('beak','<path data-id="beak" class="gnw-color-part" d="M280 160 L370 132 L294 196 Z"/>')+
      svgButton('tail','<path data-id="tail" class="gnw-color-part" d="M350 350 L468 388 L358 420 Z"/>')+
      svgButton('leg1','<path data-id="leg1" class="gnw-color-part" d="M225 426 L210 500 L240 500 L252 426 Z"/>')+
      svgButton('leg2','<path data-id="leg2" class="gnw-color-part" d="M292 424 L308 500 L338 500 L318 424 Z"/>')+
      '<circle cx="232" cy="146" r="10"/></svg>';}
    function fruitSvg(){return '<svg viewBox="0 0 520 520">'+
      svgButton('apple','<path data-id="apple" class="gnw-color-part" d="M172 160 C130 160 92 204 96 278 C100 372 170 448 232 420 C250 412 270 412 288 420 C350 448 420 372 424 278 C428 204 390 160 348 160 C306 160 292 182 260 182 C228 182 214 160 172 160 Z"/>')+
      svgButton('leaf','<path data-id="leaf" class="gnw-color-part" d="M264 124 C286 70 348 68 380 96 C340 122 304 144 264 124 Z"/>')+
      svgButton('stem','<path data-id="stem" class="gnw-color-part" d="M250 84 L280 84 L270 166 L246 166 Z"/>')+'</svg>';}
    function strawberrySvg(){return '<svg viewBox="0 0 520 520">'+
      svgButton('berry','<path data-id="berry" class="gnw-color-part" d="M260 125 C390 120 430 250 360 370 C324 432 292 470 260 488 C228 470 196 432 160 370 C90 250 130 120 260 125 Z"/>')+
      svgButton('leaf1','<path data-id="leaf1" class="gnw-color-part" d="M260 132 L218 70 L260 96 L304 70 Z"/>')+
      svgButton('leaf2','<path data-id="leaf2" class="gnw-color-part" d="M218 138 L142 98 L210 100 Z"/>')+
      svgButton('leaf3','<path data-id="leaf3" class="gnw-color-part" d="M304 138 L378 98 L310 100 Z"/>')+
      '<g fill="#111827"><circle cx="210" cy="230" r="6"/><circle cx="260" cy="220" r="6"/><circle cx="310" cy="230" r="6"/><circle cx="230" cy="300" r="6"/><circle cx="286" cy="305" r="6"/><circle cx="260" cy="382" r="6"/></g></svg>';}
    function render(){
      var svg=pages[mode][page]();
      var tabs='<button class="kid-btn" onclick="kidColorMode(\'flowers\')">🌸 Flowers</button><button class="kid-btn" onclick="kidColorMode(\'animals\')">🐾 Animals</button><button class="kid-btn" onclick="kidColorMode(\'fruits\')">🍓 Fruits</button><button class="kid-btn" onclick="kidNextColorPage()">Next Picture →</button>';
      var pal=palette.map(function(c){return '<button onclick="kidPickColor(\''+c+'\')" style="width:48px;height:48px;border-radius:50%;border:5px solid '+(chosen===c?'#172033':'#fff')+';background:'+c+';box-shadow:0 6px 14px rgba(15,23,42,.16);cursor:pointer;"></button>';}).join('');
      a.innerHTML='<div class="kid-game-card" style="text-align:center;">'+title('🎨 Color Joy Studio','Choose a color, then click inside the picture to paint.')+'<div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:12px;">'+tabs+'</div><div style="display:flex;justify-content:center;gap:8px;flex-wrap:wrap;margin-bottom:16px;">'+pal+'</div><div class="gnw-color-page">'+svg+'</div></div>';
    }
    render();
  };

  /* Fixed Parking Puzzle: smaller board, visible controls, keyboard support */
  window.gameParkingPuzzle=function(){
    var a=area(); if(!a)return; startStats('parkingpuzzle');
    if(window._parkingClean){try{window._parkingClean();}catch(e){}}
    var N=5, car={r:4,c:0}, goal={r:0,c:4}, moves=0, blocks={'1,1':1,'1,2':1,'2,3':1,'3,1':1,'3,3':1};
    function can(r,c){return r>=0&&r<N&&c>=0&&c<N&&!blocks[r+','+c];}
    window.kidParkMove=function(dr,dc){
      var nr=car.r+dr,nc=car.c+dc;
      if(!can(nr,nc)){addW(1);sound('lose');return;}
      car={r:nr,c:nc};moves++;addC(1);sound('click');render();
      if(car.r===goal.r&&car.c===goal.c){celebrate('Perfect Parking!');setTimeout(function(){endStats('win',stat('Moves: '+moves));},450);}
    };
    function render(){
      var cells='';
      for(var r=0;r<N;r++)for(var c=0;c<N;c++){var isCar=car.r===r&&car.c===c,isGoal=goal.r===r&&goal.c===c,isBlock=blocks[r+','+c];cells+='<div class="gnw-park-cell '+(isGoal?'goal ':'')+(isBlock?'block ':'')+'">'+(isCar?'🚗':isGoal?'🅿️':isBlock?'🧱':'')+'</div>';}
      a.innerHTML='<div class="kid-game-card" style="text-align:center;">'+title('🅿️ Parking Puzzle','Move the car to the green parking spot. Avoid blocks!')+'<div class="kid-stat-row">'+stat('Moves: '+moves)+stat('Use arrow keys or buttons')+'</div><div class="gnw-fit-wrap"><div class="gnw-fit-grid gnw-park-grid">'+cells+'</div></div><div class="gnw-park-controls"><div></div><button class="kid-btn" onclick="kidParkMove(-1,0)">↑</button><div></div><button class="kid-btn" onclick="kidParkMove(0,-1)">←</button><button class="kid-btn" onclick="gameParkingPuzzle()">↻</button><button class="kid-btn" onclick="kidParkMove(0,1)">→</button><div></div><button class="kid-btn" onclick="kidParkMove(1,0)">↓</button><div></div></div></div>';
    }
    function key(e){var k=e.key;if(k==='ArrowUp'){e.preventDefault();window.kidParkMove(-1,0);}if(k==='ArrowDown'){e.preventDefault();window.kidParkMove(1,0);}if(k==='ArrowLeft'){e.preventDefault();window.kidParkMove(0,-1);}if(k==='ArrowRight'){e.preventDefault();window.kidParkMove(0,1);}}
    document.addEventListener('keydown',key);window._parkingClean=function(){document.removeEventListener('keydown',key);};
    render();
  };

  function installFixes(){
    if(window.GAMES){
      window.GAMES.fruitpop=window.gameFruitPop;
      window.GAMES.rainbowbubble=window.gameRainbowBubble;
      window.GAMES.colorjoy=window.gameColorJoy;
      window.GAMES.parkingpuzzle=window.gameParkingPuzzle;
    }
  }
  installFixes();
  document.addEventListener('DOMContentLoaded',installFixes);

  /* Clean Parking keyboard listener when leaving or changing games */
  if(!window._gnwNewGamesCleanPatch){
    var oldOpen=window.openGame;
    if(typeof oldOpen==='function') window.openGame=function(){try{window._parkingClean&&window._parkingClean();}catch(e){} return oldOpen.apply(this,arguments);};
    var oldClose=window.closeGame;
    if(typeof oldClose==='function') window.closeGame=function(){try{window._parkingClean&&window._parkingClean();}catch(e){} return oldClose.apply(this,arguments);};
    window._gnwNewGamesCleanPatch=true;
  }
})();
