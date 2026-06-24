/* GameNest World - game.js v4.0 */
/* GameNest World - System JS v4.0 - Clean Build */
console.log('GameNest World v4.0 loading...');

/* HELPERS */
var rnd=function(a,b){return Math.floor(Math.random()*(b-a+1))+a;};
var pick=function(a){return a[rnd(0,a.length-1)];};
var shuffle=function(arr){
  var a=[].concat(arr);
  for(var i=a.length-1;i>0;i--){var j=rnd(0,i);var t=a[i];a[i]=a[j];a[j]=t;}
  return a;
};

/* MODAL */
function gw(){return document.getElementById('gw');}
function openGame(key){
  if(window._gl){cancelAnimationFrame(window._gl);clearTimeout(window._gl);window._gl=null;}
  var box=document.getElementById('modal-box');
  if(!box)return;
  box.innerHTML='<button class="modal-close" onclick="closeGame()">&#x2715;</button><div id="gw"></div>';
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow='hidden';
  if(typeof GAMES!=='undefined'&&GAMES[key]){
    try{GAMES[key]();}catch(e){console.error('Game error:',e);var g=gw();if(g)g.innerHTML='<h2>Error loading game</h2><p style="color:#64748b">'+e.message+'</p>';}
  }else{
    var g=gw();if(g)g.innerHTML='<h2>Coming soon!</h2><p style="color:#64748b">This game is being added.</p>';
  }
}
function closeGame(){
  if(window._gl){cancelAnimationFrame(window._gl);clearTimeout(window._gl);window._gl=null;}
  var ov=document.getElementById('overlay');if(ov)ov.classList.remove('active');
  document.body.style.overflow='';
}
function closeIfOut(e){if(e.target&&e.target.id==='overlay')closeGame();}
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeGame();});

/* FILTER */
function setFilter(f,btn){
  document.querySelectorAll('.flt').forEach(function(b){b.classList.remove('active');});
  if(btn)btn.classList.add('active');
  document.querySelectorAll('.game-card').forEach(function(card){
    card.style.display=(f==='all'||card.dataset.cat===f)?'':'none';
  });
  ['.quiz-section','.word-section','.math-section','.classic-section','.mem-section'].forEach(function(cls){
    var hdr=document.querySelector(cls);if(!hdr)return;
    var grid=hdr.nextElementSibling;
    var hasVis=grid&&Array.from(grid.querySelectorAll('.game-card')).some(function(c){return c.style.display!=='none';});
    hdr.style.display=(f==='all'||hasVis)?'':'none';
    if(grid)grid.style.display=(f==='all'||hasVis)?'':'none';
  });
}

/* SMOOTH SCROLL */
function ss(id){
  var el=document.getElementById(id);if(!el)return;
  var nh=(document.querySelector('nav')||{offsetHeight:53}).offsetHeight;
  var fb=document.querySelector('.filter-bar');
  var fh=fb?fb.offsetHeight:0;
  window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-nh-fh-6,behavior:'smooth'});
}

/* XP SYSTEM */
var LVS=[0,100,250,500,900,1500,2500,4000,6000,9000,15000];
var LVN=['Newbie','Beginner','Explorer','Thinker','Challenger','Expert','Master','Legend','Grandmaster','Champion','God Mode'];
function getXP(){return+(localStorage.getItem('gnw_xp')||0);}
function setXP(v){localStorage.setItem('gnw_xp',String(v));}
function getLv(){var x=getXP();for(var i=LVS.length-1;i>=0;i--)if(x>=LVS[i])return i;return 0;}
function getLvP(){var x=getXP(),l=getLv(),b=LVS[l],n=LVS[l+1]||LVS[l]*2;return Math.min(100,Math.round((x-b)/(n-b)*100));}
function earnXP(amt,name){
  setXP(getXP()+amt);
  updateXPUI();showToast(name,amt);
  checkStr();checkAch();updTasks(name);renderLB();renderTasks();
}
function updateXPUI(){
  var x=getXP(),l=getLv();
  var e1=document.getElementById('nav-xp'),e2=document.getElementById('xp-bar'),e3=document.getElementById('nav-lv');
  if(e1)e1.textContent=x+' XP';
  if(e2)e2.style.width=getLvP()+'%';
  if(e3)e3.textContent='Lv.'+l+' '+LVN[l];
}
function showToast(name,pts){
  var t=document.getElementById('xp-toast');if(!t)return;
  var m=document.getElementById('t-msg'),p=document.getElementById('t-pts');
  if(m)m.textContent=name+' complete!';
  if(p)p.textContent='+'+pts+' XP';
  t.classList.add('show');
  setTimeout(function(){t.classList.remove('show');},2500);
}

/* WATCH AD */
function watchAd(){
  var box=document.getElementById('modal-box');if(!box)return;
  var html='<button class="modal-close" onclick="closeGame()">&#x2715;</button>';
  html+='<div id="gw" style="text-align:center;padding:20px;">';
  html+='<div style="font-size:48px;margin-bottom:12px;">&#x1F4FA;</div>';
  html+='<h2 style="margin-bottom:8px;">Watch Ad &rarr; Earn Rewards!</h2>';
  html+='<p style="color:#64748b;font-size:14px;margin-bottom:16px;">Watch a short ad to earn +30 XP and +3 lives!</p>';
  html+='<div style="background:#f1f5f9;border:2px dashed #cbd5e1;border-radius:12px;height:120px;display:flex;align-items:center;justify-content:center;margin-bottom:16px;color:#94a3b8;font-size:13px;">&#x1F4E2; Ad plays here</div>';
  html+='<div id="ad-cd" style="font-size:28px;font-weight:800;color:#6366f1;margin-bottom:14px;">5</div>';
  html+='<button class="btn" id="ad-btn" disabled style="opacity:.4;">Claim +30 XP</button>';
  html+='</div>';
  box.innerHTML=html;
  document.getElementById('overlay').classList.add('active');
  document.body.style.overflow='hidden';
  var t=5;
  var iv=setInterval(function(){
    t--;
    var cd=document.getElementById('ad-cd');
    if(cd)cd.textContent=t>0?t:'Done!';
    if(t<=0){
      clearInterval(iv);
      var btn=document.getElementById('ad-btn');
      if(btn){
        btn.disabled=false;btn.style.opacity='1';
        btn.onclick=function(){earnXP(30,'Watch Ad');closeGame();};
      }
    }
  },1000);
}

/* TOURNAMENT */
function joinTournament(){
  openGame('g2048');
  earnXP(25,'Weekly Tournament');
  setTimeout(function(){
    var g=document.getElementById('gw');
    if(g){
      var b=document.createElement('div');
      b.style.cssText='background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;border-radius:8px;padding:8px 14px;font-size:12px;font-weight:700;margin-bottom:12px;text-align:center;';
      b.textContent='Trophy Tournament Mode - XP x3! Score as high as possible!';
      g.insertBefore(b,g.firstChild);
    }
  },200);
}

/* INVITE */
function copyInv(){
  var txt='https://gamenestworld.com/?ref=player';
  if(navigator.clipboard){
    navigator.clipboard.writeText(txt).then(function(){alert('Link copied! Share with friends to earn XP.');});
  }else{
    var inp=document.getElementById('inv-link');
    if(inp){inp.select();document.execCommand('copy');alert('Link copied!');}
  }
}

/* STREAK */
function checkStr(){
  var today=new Date().toDateString(),last=localStorage.getItem('gnw_day');
  var s=+(localStorage.getItem('gnw_s')||0);
  if(last!==today){
    var yesterday=new Date(Date.now()-86400000).toDateString();
    s=(last===yesterday)?s+1:1;
    localStorage.setItem('gnw_s',String(s));
    localStorage.setItem('gnw_day',today);
  }
  var el=document.getElementById('streak-n');if(el)el.textContent=String(s);
}

/* ACHIEVEMENTS */
var ACHS=[
  {id:'first',n:'First Game',i:'Game',p:10,ok:function(){return getXP()>0;}},
  {id:'xp100',n:'100 XP',i:'Bolt',p:20,ok:function(){return getXP()>=100;}},
  {id:'xp500',n:'500 XP',i:'Star',p:50,ok:function(){return getXP()>=500;}},
  {id:'xp1k',n:'1,000 XP',i:'Diamond',p:100,ok:function(){return getXP()>=1000;}},
  {id:'xp5k',n:'5,000 XP',i:'Crown',p:250,ok:function(){return getXP()>=5000;}},
  {id:'s3',n:'3-Day Streak',i:'Fire',p:30,ok:function(){return +(localStorage.getItem('gnw_s')||0)>=3;}},
  {id:'s7',n:'7-Day Streak',i:'Medal',p:75,ok:function(){return +(localStorage.getItem('gnw_s')||0)>=7;}},
  {id:'lv3',n:'Level 3',i:'Rocket',p:50,ok:function(){return getLv()>=3;}},
  {id:'lv5',n:'Level 5',i:'Trophy',p:100,ok:function(){return getLv()>=5;}},
  {id:'lv8',n:'Level 8',i:'Rainbow',p:200,ok:function(){return getLv()>=8;}},
];
var ACH_ICONS={Game:'🎮',Bolt:'⚡',Star:'🌟',Diamond:'💎',Crown:'👑',Fire:'🔥',Medal:'🏅',Rocket:'🚀',Trophy:'🏆',Rainbow:'🌈'};
function getUnlk(){return JSON.parse(localStorage.getItem('gnw_ach')||'[]');}
function checkAch(){
  var u=getUnlk(),ch=false;
  ACHS.forEach(function(a){if(u.indexOf(a.id)===-1&&a.ok()){u.push(a.id);ch=true;}});
  if(ch)localStorage.setItem('gnw_ach',JSON.stringify(u));
  renderAch();
}
function renderAch(){
  var row=document.getElementById('ach-row');if(!row)return;
  var u=getUnlk();
  var html='';
  ACHS.forEach(function(a){
    var unlocked=u.indexOf(a.id)!==-1;
    var icon=ACH_ICONS[a.i]||'*';
    html+='<div class="ach-pill '+(unlocked?'unlocked':'locked')+'" title="'+a.n+': +'+a.p+' XP">';
    html+='<span class="ach-icon">'+icon+'</span>';
    html+='<span class="ach-name">'+a.n+'</span>';
    html+='<span class="ach-pts">'+(unlocked?'Done':a.p+'XP')+'</span>';
    html+='</div>';
  });
  row.innerHTML=html;
}

/* DAILY TASKS */
var TSKS=[
  {id:'p3',n:'Play 3 games',i:'🎮',g:3,r:50,k:'gp'},
  {id:'q1',n:'Complete a Quiz',i:'🧠',g:1,r:30,k:'qd'},
  {id:'c1',n:'Play a Classic game',i:'🕹️',g:1,r:25,k:'cd'},
  {id:'lg',n:'Daily Login',i:'📅',g:1,r:20,k:'ld'},
];
function getTasks(){
  var today=new Date().toDateString();
  var d=JSON.parse(localStorage.getItem('gnw_t')||'{}');
  if(d.date!==today){
    var nd={date:today,gp:0,qd:0,cd:0,ld:1};
    localStorage.setItem('gnw_t',JSON.stringify(nd));
    return nd;
  }
  d.ld=1;return d;
}
function updTasks(name){
  var d=getTasks();
  d.gp=(d.gp||0)+1;
  if(name&&(name.indexOf('Quiz')!==-1||name.indexOf('Flag')!==-1||name.indexOf('True')!==-1))d.qd=(d.qd||0)+1;
  if(name&&(name.indexOf('Snake')!==-1||name.indexOf('Pong')!==-1||name.indexOf('Tetris')!==-1||name.indexOf('Flappy')!==-1||name.indexOf('TTT')!==-1))d.cd=(d.cd||0)+1;
  localStorage.setItem('gnw_t',JSON.stringify(d));
  renderTasks();
}
function renderTasks(){
  var list=document.getElementById('tasks-list');if(!list)return;
  var d=getTasks();var done=0;var html='';
  TSKS.forEach(function(t){
    var cur=Math.min(t.g,d[t.k]||0);var pct=Math.round(cur/t.g*100);
    if(cur>=t.g)done++;
    html+='<div class="task-row">';
    html+='<div class="task-icon">'+t.i+'</div>';
    html+='<div class="task-info">';
    html+='<div class="task-name">'+t.n+'</div>';
    html+='<div class="task-bar"><div class="task-fill" style="width:'+pct+'%"></div></div>';
    html+='<div class="task-sub">'+cur+'/'+t.g+'</div>';
    html+='</div>';
    html+='<div class="task-rwd">'+(cur>=t.g?'Done':'+'+t.r+' XP')+'</div>';
    html+='</div>';
  });
  list.innerHTML=html;
  var pe=document.getElementById('tasks-prog');
  if(pe)pe.textContent='('+done+'/'+TSKS.length+' done)';
}

/* LEADERBOARD */
var LB=[
  {n:'NightOwl',a:'🦁',g:'2048 - Score 14,200',x:4800},
  {n:'MindBlast',a:'🐯',g:'Wordle - 6 wins',x:3900},
  {n:'QuizKing',a:'🦊',g:'Expert Trivia 10/10',x:3200},
  {n:'SnakePro',a:'🐺',g:'Snake Level 18',x:2700},
  {n:'Puzzler',a:'🦅',g:'Sudoku 3:42',x:2100},
];
function renderLB(){
  var el=document.getElementById('lb-rows');if(!el)return;
  var myXP=getXP();
  var all=LB.concat([{n:'You',a:'⭐',g:'Your session',x:myXP}]);
  all.sort(function(a,b){return b.x-a.x;});
  var mr=0;
  for(var i=0;i<all.length;i++){if(all[i].n==='You'){mr=i+1;break;}}
  var re=document.getElementById('my-rank');if(re)re.textContent='#'+mr;
  var medals=['🥇','🥈','🥉'];
  var html='';
  all.slice(0,5).forEach(function(p,i){
    var isMe=p.n==='You';
    html+='<div class="lb-row" style="'+(isMe?'background:#eef2ff;border:1.5px solid #c7d2fe;':'')+ '">';
    html+='<div class="lb-rank '+(i===0?'gold':i===1?'silver':i===2?'bronze':'')+ '">'+(medals[i]||i+1)+'</div>';
    html+='<div class="lb-ava">'+p.a+'</div>';
    html+='<div class="lb-info">';
    html+='<div class="lb-name" style="'+(isMe?'color:#6366f1;font-weight:700;':'')+'">'+p.n+(isMe?' (you)':'')+'</div>';
    html+='<div class="lb-game">'+p.g+'</div>';
    html+='</div>';
    html+='<div style="text-align:right"><div class="lb-xp">'+p.x+'</div><div style="font-size:9px;color:#94a3b8">XP</div></div>';
    html+='</div>';
  });
  el.innerHTML=html;
}
function lbSw(btn,t){
  document.querySelectorAll('.lb-tab').forEach(function(b){b.classList.remove('active');});
  btn.classList.add('active');renderLB();
}

/* LANGUAGE SYSTEM - 28 languages */
var L={};
function mkL(o){
  var base={
    eyebrow:'51 Free Games - No Download - No Signup - 100% Free',
    h1a:'Play smarter,',h1b:'get better.',
    hero_sub:'Brain games, arcade classics, daily challenges - all free.',
    cta1:'Play Now - Free',s_games:'Games',s_dl:'Downloads',s_free:'Free Forever',s_lang:'Languages',
    days:'days',daily_lbl:'Daily Challenge',resets:'Resets in',play_today:'Play',
    t_lbl:'Weekly Tournament',playing:'playing',join:'Join Tournament',
    watch_t:'Watch ad - get +30 XP!',ach_t:'Achievements',tasks_t:'Daily Tasks',
    lb_t:'Leaderboard',today:'Today',week:'Week',all_t:'All Time',y_rank:'Your rank:',
    quiz_ttl:'Quiz Games',quiz_sub:'Test Your Knowledge',
    word_ttl:'Word Games',word_sub:'Letters and Language',
    math_ttl:'Math Games',math_sub:'Numbers and Logic',
    classic_ttl:'Classic Games',classic_sub:'Timeless Fun',
    mem_ttl:'Memory and Focus',mem_sub:'Train Your Brain',
    inv_t:'Invite Friends - Earn XP!',inv_s:'Share your link. Each friend earns you +100 XP.',
    copy_l:'Copy Link',foot_desc:'51 free browser games. No download, no signup.',
    privacy:'Privacy Policy',terms:'Terms of Use',contact:'Contact Us'
  };
  var result={};
  var keys=Object.keys(base);
  for(var i=0;i<keys.length;i++){result[keys[i]]=(o&&o[keys[i]]!==undefined)?o[keys[i]]:base[keys[i]];}
  return result;
}
L.en=mkL({eyebrow:'51 Free Games - No Download - No Signup - 100% Free'});
L.tr=mkL({eyebrow:'51 Ucretsiz Oyun - Indirme Yok - Kayit Yok',h1a:'Daha zeki oyna,',h1b:'daha iyi ol.',
  hero_sub:'Zeka oyunlari, klasikler, gunluk gorevler - hepsi ucretsiz.',cta1:'Hemen Oyna - Ucretsiz',
  s_games:'Oyun',s_dl:'Indirme',s_free:'Sonsuza Ucretsiz',s_lang:'Dil',days:'gun',
  daily_lbl:'Gunluk Gorev',resets:'Sifirlanıyor',play_today:'Oyna',
  t_lbl:'Haftalik Turnuva',playing:'oynuyor',join:'Turnuvaya Katil',
  watch_t:'Reklam izle - +30 XP kazan!',ach_t:'Basarimlar',tasks_t:'Gunluk Gorevler',
  lb_t:'Liderlik Tablosu',today:'Bugun',week:'Bu Hafta',all_t:'Tum Zamanlar',y_rank:'Siralamaniz:',
  quiz_ttl:'Quiz Oyunlari',quiz_sub:'Bilgini Test Et',
  word_ttl:'Kelime Oyunlari',word_sub:'Harf ve Dil',
  math_ttl:'Matematik',math_sub:'Sayilar ve Mantik',
  classic_ttl:'Klasik Oyunlar',classic_sub:'Zamansiz Eglence',
  mem_ttl:'Hafiza ve Odak',mem_sub:'Beynini Gelistir',
  inv_t:'Arkadasini Davet Et - XP Kazan!',inv_s:'Linkini paylas. Her arkadasin +100 XP kazandirir.',
  copy_l:'Kopyala',foot_desc:'51 ucretsiz tarayici oyunu.',
  privacy:'Gizlilik Politikasi',terms:'Sartlar',contact:'Iletisim'});
L.es=mkL({h1a:'Juega mas inteligente,',h1b:'mejora.',cta1:'Jugar Ahora - Gratis',s_games:'Juegos',s_free:'Gratis',days:'dias',
  daily_lbl:'Desafio Diario',play_today:'Jugar',t_lbl:'Torneo Semanal',playing:'jugando',join:'Unirse',
  watch_t:'Ver anuncio - +30 XP!',ach_t:'Logros',tasks_t:'Tareas Diarias',lb_t:'Clasificacion',
  today:'Hoy',week:'Semana',all_t:'Todo Tiempo',quiz_ttl:'Quiz',word_ttl:'Palabras',math_ttl:'Matematicas',
  classic_ttl:'Clasicos',mem_ttl:'Memoria',privacy:'Privacidad',terms:'Terminos',contact:'Contacto'});
L.fr=mkL({h1a:'Jouez plus intelligemment,',h1b:'progressez.',cta1:'Jouer Gratuitement',s_games:'Jeux',s_free:'Gratuit',days:'jours',
  daily_lbl:'Defi Quotidien',play_today:'Jouer',t_lbl:'Tournoi Hebdomadaire',playing:'joueurs',join:'Rejoindre',
  today:'Aujourd hui',week:'Semaine',all_t:'Tout Temps',
  quiz_ttl:'Quiz',word_ttl:'Mots',math_ttl:'Maths',classic_ttl:'Classiques',mem_ttl:'Memoire',
  privacy:'Confidentialite',terms:'Conditions',contact:'Contact'});
L.de=mkL({h1a:'Spiel kluger,',h1b:'werde besser.',cta1:'Jetzt Spielen - Kostenlos',s_games:'Spiele',s_free:'Kostenlos',days:'Tage',
  daily_lbl:'Tagliche Aufgabe',play_today:'Spielen',t_lbl:'Wochentliches Turnier',playing:'spielen',join:'Beitreten',
  today:'Heute',week:'Woche',all_t:'Alle Zeit',
  quiz_ttl:'Quiz',word_ttl:'Worter',math_ttl:'Mathe',classic_ttl:'Klassisch',mem_ttl:'Gedachtnis',
  privacy:'Datenschutz',terms:'AGB',contact:'Kontakt'});
L.pt=mkL({h1a:'Jogue mais inteligente,',h1b:'fique melhor.',cta1:'Jogar Agora - Gratis',s_games:'Jogos',s_free:'Gratis',days:'dias'});
L.it=mkL({h1a:'Gioca piu intelligente,',h1b:'migliora.',cta1:'Gioca Ora - Gratis',s_games:'Giochi',s_free:'Gratis',days:'giorni'});
L.ru=mkL({h1a:'Igraj umnee,',h1b:'stanovis luchshe.',cta1:'Igrat - Besplatno',s_games:'Igry',s_free:'Besplatno',days:'dney'});
L.ar=mkL({h1a:'Aleb bdhkae,',h1b:'tatwr.',cta1:'Alb Alan - Mjanan',s_games:'Alaab',s_free:'Mjan',days:'ayam'});
L.zh=mkL({h1a:'Geng congming de wan,',h1b:'yue lai yue hao.',cta1:'Li Ji Wan - Mian Fei',s_games:'Youxi',s_free:'Yong Jiu Mian Fei',days:'tian'});
L.ja=mkL({h1a:'Kashikoku asobo,',h1b:'motto umaku naro.',cta1:'Ima sugu purei - Muryo',s_games:'Gemu',s_free:'Eikyu muryo',days:'nichi'});
L.ko=mkL({h1a:'Deo seumateu hage peurei,',h1b:'deo baljeon haseyo.',cta1:'Jigeum peurei - mulyo',s_games:'Geim',s_free:'Yeongwonhi muryeo',days:'il'});
L.hi=mkL({h1a:'Smart khelo,',h1b:'behtar bano.',cta1:'Abhi khelen - Muft',s_games:'Game',s_free:'Hamesha Muft',days:'din'});
L.nl=mkL({h1a:'Speel slimmer,',h1b:'word beter.',cta1:'Speel Nu - Gratis',s_games:'Spellen',s_free:'Gratis',days:'dagen'});
L.pl=mkL({h1a:'Graj madrzej,',h1b:'stawaj sie lepszy.',cta1:'Graj Teraz - Za Darmo',s_games:'Gry',s_free:'Za Darmo',days:'dni'});
L.sv=mkL({h1a:'Spela smartare,',h1b:'bli battre.',cta1:'Spela Nu - Gratis',s_games:'Spel',days:'dagar'});
L.no=mkL({h1a:'Spill smartere,',h1b:'bli bedre.',cta1:'Spill Na - Gratis',s_games:'Spill',days:'dager'});
L.da=mkL({h1a:'Spil smartere,',h1b:'bliv bedre.',cta1:'Spil Nu - Gratis',s_games:'Spil',days:'dage'});
L.fi=mkL({h1a:'Pelaa alykkaammin,',h1b:'kehity.',cta1:'Pelaa Nyt - Ilmaiseksi',s_games:'Pelit',days:'paivaa'});
L.id=mkL({h1a:'Bermain lebih cerdas,',h1b:'berkembang.',cta1:'Main Sekarang - Gratis',s_games:'Game',days:'hari'});
L.ms=mkL({h1a:'Main lebih bijak,',h1b:'jadi lebih baik.',cta1:'Main Sekarang - Percuma',s_games:'Permainan',days:'hari'});
L.th=mkL({h1a:'Len yang chalad,',h1b:'phatthana.',cta1:'Len Loei - Fri',s_games:'Gem',days:'wan'});
L.vi=mkL({h1a:'Choi thong minh hon,',h1b:'ngay cang gioi hon.',cta1:'Choi Ngay - Mien Phi',s_games:'Tro Choi',days:'ngay'});
L.uk=mkL({h1a:'Graj rozumnishe,',h1b:'stavay krashchym.',cta1:'Graty - Bezkoshtovno',s_games:'Ihry',days:'dniv'});
L.cs=mkL({h1a:'Hraj chytreji,',h1b:'zlepsuj se.',cta1:'Hrat Nyni - Zdarma',s_games:'Hry',days:'dni'});
L.ro=mkL({h1a:'Joaca mai inteligent,',h1b:'devino mai bun.',cta1:'Joaca Acum - Gratuit',s_games:'Jocuri',days:'zile'});
L.hu=mkL({h1a:'Jatssz okosabban,',h1b:'fejlodj.',cta1:'Jatssz Most - Ingyen',s_games:'Jatekok',days:'nap'});
L.el=mkL({h1a:'Paixe pio exypna,',h1b:'beltiothei.',cta1:'Paixe Tora - Dorean',s_games:'Paixnidia',days:'meres'});

function applyL(lang){
  var t=L[lang]||L.en;
  document.querySelectorAll('[data-i18n]').forEach(function(el){
    var k=el.getAttribute('data-i18n');
    if(t[k]!==undefined)el.textContent=t[k];
  });
  document.documentElement.setAttribute('lang',lang);
  document.documentElement.setAttribute('dir',lang==='ar'?'rtl':'ltr');
  localStorage.setItem('gnw_lang',lang);
}
function changeLang(lang){
  applyL(lang);
  var sel=document.getElementById('lang-sel');if(sel)sel.value=lang;
}
function buildLangSel(){
  var sel=document.getElementById('lang-sel');if(!sel)return;
  var langs=[
    ['en','EN - English'],['tr','TR - Turkce'],['es','ES - Espanol'],['fr','FR - Francais'],
    ['de','DE - Deutsch'],['pt','PT - Portugues'],['it','IT - Italiano'],['ru','RU - Русский'],
    ['ar','AR - العربية'],['zh','ZH - 中文'],['ja','JA - 日本語'],['ko','KO - 한국어'],
    ['hi','HI - हिन्दी'],['nl','NL - Nederlands'],['pl','PL - Polski'],
    ['sv','SV - Svenska'],['no','NO - Norsk'],['da','DA - Dansk'],['fi','FI - Suomi'],
    ['id','ID - Bahasa'],['ms','MS - Melayu'],['th','TH - ภาษาไทย'],['vi','VI - Tieng Viet'],
    ['uk','UK - Українська'],['cs','CS - Cestina'],['ro','RO - Romana'],['hu','HU - Magyar'],['el','EL - Ελληνικά']
  ];
  var html='';
  langs.forEach(function(l){html+='<option value="'+l[0]+'">'+l[1]+'</option>';});
  sel.innerHTML=html;
}

/* DAILY CHALLENGE */
var DC_GAMES=['g2048','sudoku','snake','tetris','flappy','wordle','mines','spelling','chess','wordsearch'];
var DC_NAMES={g2048:'2048',sudoku:'Sudoku',snake:'Snake',tetris:'Tetris',flappy:'Flappy Bird',
  wordle:'Word Guess',mines:'Minesweeper',spelling:'Spelling Bee',chess:'Chess Puzzles',wordsearch:'Word Search'};

/* INIT */
document.addEventListener('DOMContentLoaded',function(){
  window._gl=null;
  console.log('GameNest World v4.0 - DOM Ready - JS Working!');

  /* Language */
  buildLangSel();
  var saved=localStorage.getItem('gnw_lang');
  if(saved&&L[saved]){
    applyL(saved);
    var sel=document.getElementById('lang-sel');if(sel)sel.value=saved;
  }else{
    var br=(navigator.language||'en').split('-')[0].toLowerCase();
    var mp={tr:'tr',es:'es',fr:'fr',de:'de',pt:'pt',it:'it',ru:'ru',ar:'ar',zh:'zh',
            ja:'ja',ko:'ko',hi:'hi',nl:'nl',pl:'pl',sv:'sv',no:'no',da:'da',fi:'fi',
            id:'id',ms:'ms',th:'th',vi:'vi',uk:'uk',cs:'cs',ro:'ro',hu:'hu',el:'el'};
    var dt=mp[br]||'en';
    applyL(dt);
    var sel2=document.getElementById('lang-sel');if(sel2)sel2.value=dt;
  }

  /* XP + Streak */
  updateXPUI();checkStr();

  /* Achievements */
  checkAch();

  /* Tasks */
  renderTasks();

  /* Leaderboard */
  renderLB();

  /* Daily Challenge */
  var today=new Date();
  var dcKey=DC_GAMES[(today.getDate()+today.getMonth())%DC_GAMES.length];
  var nameEl=document.getElementById('daily-name');
  if(nameEl)nameEl.textContent='Today: '+DC_NAMES[dcKey];
  var playBtn=document.getElementById('daily-btn');
  if(playBtn)playBtn.onclick=function(){openGame(dcKey);earnXP(50,'Daily Challenge');};

  /* Countdown timer */
  function tick(){
    var now=new Date(),mid=new Date();mid.setHours(24,0,0,0);
    var diff=mid-now;
    var h=String(Math.floor(diff/3600000)).padStart(2,'0');
    var m=String(Math.floor(diff%3600000/60000)).padStart(2,'0');
    var s=String(Math.floor(diff%60000/1000)).padStart(2,'0');
    var te=document.getElementById('daily-timer');if(te)te.textContent=h+':'+m+':'+s;
  }
  tick();setInterval(tick,1000);

  /* Tournament counter */
  var tc=1247;
  setInterval(function(){
    tc+=Math.floor(Math.random()*3-1);
    if(tc<1000)tc=1000;
    var ce=document.getElementById('t-cnt');if(ce)ce.textContent=tc.toLocaleString();
  },3000);

  console.log('GameNest World v4.0 - INIT COMPLETE - All systems GO!');
});

function gameCoinFlip(){
  gw().innerHTML=`<h2>🪙 Coin Flip</h2><div id="cf-coin" style="font-size:80px;margin:20px;transition:transform 0.5s">🪙</div><div id="cf-res" style="font-size:22px;margin-bottom:20px;">Press flip!</div><button class="g-btn" onclick="flipCoin()">Flip Coin</button><div id="cf-log" style="margin-top:16px;font-size:14px;color:#666;"></div>`;
  window._cfH=0;window._cfT=0;
}
function flipCoin(){
  const coin=document.getElementById('cf-coin');
  coin.style.transform='rotateY(720deg)';
  setTimeout(()=>{
    coin.style.transform='rotateY(0deg)';
    const h=Math.random()<0.5;
    window._cfH+=(h?1:0);window._cfT+=(h?0:1);
    document.getElementById('cf-res').textContent=h?'HEADS!':'TAILS!';
    document.getElementById('cf-log').textContent=`H:${window._cfH} T:${window._cfT}`;
  },500);
}

/* DICE ROLLER */
const DICE_FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
function gameDice(){
  gw().innerHTML=`<h2>🎲 Dice Roller</h2><div id="dr-dice" style="font-size:60px;margin:10px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap;"></div><div id="dr-sum" style="font-size:20px;margin:10px;"></div><div style="margin:10px;display:flex;gap:8px;justify-content:center;flex-wrap:wrap;">${[1,2,3,4].map(n=>`<button class="g-btn" onclick="rollDice(${n})">${n} Die${n>1?'ce':''}</button>`).join('')}</div>`;
}
function rollDice(n){
  const vals=Array.from({length:n},()=>rnd(1,6));
  document.getElementById('dr-dice').innerHTML=vals.map(v=>`<span>${DICE_FACES[v-1]}</span>`).join('');
  document.getElementById('dr-sum').textContent=n>1?`Sum: ${vals.reduce((a,b)=>a+b,0)}`:'';
}

/* ROCK PAPER SCISSORS */
function gameRPS(){
  window._rpsW=0;window._rpsL=0;window._rpsD=0;window._rpsRound=0;
  renderRPS('');
}
function renderRPS(msg){
  gw().innerHTML=`<h2>✊ Rock Paper Scissors</h2><div style="font-size:14px;color:#888;margin-bottom:8px;">Best of 5</div><div style="font-size:40px;margin:10px;" id="rps-disp">${msg||'Choose your move!'}</div><div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-bottom:12px;"><button class="g-btn" style="font-size:28px;" onclick="playRPS('✊')">✊</button><button class="g-btn" style="font-size:28px;" onclick="playRPS('✋')">✋</button><button class="g-btn" style="font-size:28px;" onclick="playRPS('✌️')">✌️</button></div><div style="font-size:16px;">Wins:${window._rpsW} Losses:${window._rpsL} Draws:${window._rpsD}</div>`;
}
function playRPS(c){
  const choices=['✊','✋','✌️'];
  const cpu=pick(choices);
  const wins={✊:'✌️',✋:'✊','✌️':'✋'};
  let res='';
  if(c===cpu)res='Draw!',window._rpsD++;
  else if(wins[c]===cpu)res='You Win! 🎉',window._rpsW++;
  else res='You Lose! 😢',window._rpsL++;
  window._rpsRound++;
  const done=window._rpsW===3||window._rpsL===3||window._rpsRound===5;
  const msg=`You: ${c} CPU: ${cpu} → ${res}`;
  if(done){
    gw().innerHTML=`<h2>✊ Rock Paper Scissors</h2><div style="font-size:36px;margin:20px;">${window._rpsW>=window._rpsL?'🏆 You Won the Match!':'💀 CPU Won the Match!'}</div><div>${msg}</div><div style="margin-top:8px;">Final: ${window._rpsW}W ${window._rpsL}L ${window._rpsD}D</div><button class="g-btn" style="margin-top:12px;" onclick="gameRPS()">Play Again</button>`;
  } else {
    renderRPS(msg);
  }
}

/* COLOR QUIZ */
const CQ_COLORS=[['#e74c3c','Red'],['#2ecc71','Green'],['#3498db','Blue'],['#f39c12','Orange'],['#9b59b6','Purple'],['#1abc9c','Teal'],['#e67e22','Amber'],['#2c3e50','Navy'],['#e91e63','Pink'],['#00bcd4','Cyan'],['#ff5722','Deep Orange'],['#607d8b','Blue Grey']];
function startColorQuiz(){window._cqScore=0;window._cqQ=0;nextColorQ();}
function nextColorQ(){
  if(window._cqQ>=10){gw().innerHTML=`<h2>🎨 Color Quiz</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._cqScore}/10</div><button class="g-btn" style="margin-top:12px;" onclick="startColorQuiz()">Play Again</button>`;return;}
  const correct=pick(CQ_COLORS);
  const opts=shuffle([correct,...shuffle(CQ_COLORS.filter(c=>c[0]!==correct[0])).slice(0,3)]);
  gw().innerHTML=`<h2>🎨 Color Quiz</h2><div style="font-size:14px;color:#888;">Q ${window._cqQ+1}/10 | Score:${window._cqScore}</div><div style="width:120px;height:120px;border-radius:50%;background:${correct[0]};margin:16px auto;box-shadow:0 4px 16px rgba(0,0,0,.2)"></div><p>What color is this?</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:300px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" onclick="colorAnswer('${o[0]}','${correct[0]}')">${o[1]}</button>`).join('')}</div>`;
}
function colorAnswer(chosen,correct){
  window._cqQ++;
  if(chosen===correct)window._cqScore++;
  nextColorQ();
}
function gameColorQuiz(){window._cqScore=0;window._cqQ=0;gw().innerHTML=`<h2>🎨 Color Quiz</h2><p>Identify the color shown!</p><button class="g-btn" onclick="startColorQuiz()">Start</button>`;}

/* MATH BASICS */
function gameMathBasic(){window._mbScore=0;window._mbQ=0;nextMathBasic();}
function nextMathBasic(){
  if(window._mbQ>=20){gw().innerHTML=`<h2>➕ Math Basics</h2><div style="font-size:48px;">🧮</div><div style="font-size:24px;">Score: ${window._mbScore}/20</div><button class="g-btn" style="margin-top:12px;" onclick="gameMathBasic()">Play Again</button>`;return;}
  const ops=['+','-'];const op=pick(ops);
  let a=rnd(1,20),b=rnd(1,20);
  if(op==='-'&&b>a)[a,b]=[b,a];
  const ans=op==='+'?a+b:a-b;
  const wrong=[ans+rnd(1,3),ans-rnd(1,3),ans+rnd(4,6)].filter(v=>v!==ans&&v>=0);
  const opts=shuffle([ans,...wrong.slice(0,3)]);
  gw().innerHTML=`<h2>➕ Math Basics</h2><div style="font-size:14px;color:#888;">Q ${window._mbQ+1}/20 | Score:${window._mbScore}</div><div style="font-size:48px;margin:16px;">${a} ${op} ${b} = ?</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:280px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" onclick="mathBasicAns(${o},${ans})">${o}</button>`).join('')}</div>`;
}
function mathBasicAns(chosen,correct){window._mbQ++;if(chosen===correct)window._mbScore++;nextMathBasic();}

/* FLAG QUIZ */
const FLAGS=[['🇺🇸','United States'],['🇬🇧','United Kingdom'],['🇫🇷','France'],['🇩🇪','Germany'],['🇯🇵','Japan'],['🇨🇳','China'],['🇧🇷','Brazil'],['🇮🇳','India'],['🇦🇺','Australia'],['🇨🇦','Canada'],['🇮🇹','Italy'],['🇪🇸','Spain'],['🇲🇽','Mexico'],['🇷🇺','Russia'],['🇰🇷','South Korea'],['🇳🇬','Nigeria'],['🇿🇦','South Africa'],['🇦🇷','Argentina'],['🇳🇱','Netherlands'],['🇸🇪','Sweden']];
function gameFlagQuiz(){window._fqScore=0;window._fqQ=0;gw().innerHTML=`<h2>🏳️ Flag Quiz</h2><p>Name the country flag!</p><button class="g-btn" onclick="nextFlagQ()">Start</button>`;}
function nextFlagQ(){
  if(window._fqQ>=10){gw().innerHTML=`<h2>🏳️ Flag Quiz</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._fqScore}/10</div><button class="g-btn" style="margin-top:12px;" onclick="gameFlagQuiz()">Play Again</button>`;return;}
  const correct=pick(FLAGS);
  const opts=shuffle([correct,...shuffle(FLAGS.filter(f=>f[0]!==correct[0])).slice(0,3)]);
  window._fqQ++;
  gw().innerHTML=`<h2>🏳️ Flag Quiz</h2><div style="font-size:14px;color:#888;">Q ${window._fqQ}/10 | Score:${window._fqScore}</div><div style="font-size:80px;margin:16px;">${correct[0]}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:300px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" onclick="flagAns('${o[1]}','${correct[1]}')">${o[1]}</button>`).join('')}</div>`;
}
function flagAns(chosen,correct){if(chosen===correct)window._fqScore++;nextFlagQ();}

/* NUMBER GUESS */
function gameNumGuess(){
  window._ngSecret=rnd(1,100);window._ngTries=7;
  gw().innerHTML=`<h2>🔢 Number Guess</h2><p>I'm thinking of a number 1–100</p><div id="ng-hint" style="font-size:18px;color:#666;margin:10px;min-height:28px;"></div><input id="ng-in" type="number" min="1" max="100" style="font-size:20px;width:80px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;" onkeydown="if(event.key==='Enter')guessNum()"><br><button class="g-btn" style="margin-top:10px;" onclick="guessNum()">Guess</button><div id="ng-tries" style="margin-top:10px;color:#888;font-size:14px;">7 tries left</div>`;
}
function guessNum(){
  const inp=document.getElementById('ng-in');
  const g=parseInt(inp.value);
  if(!g||g<1||g>100)return;
  const diff=Math.abs(g-window._ngSecret);
  window._ngTries--;
  let hint='';
  if(g===window._ngSecret){gw().innerHTML=`<h2>🔢 Number Guess</h2><div style="font-size:48px;">🎉</div><div style="font-size:22px;">Correct! It was ${window._ngSecret}!</div><button class="g-btn" style="margin-top:12px;" onclick="gameNumGuess()">Play Again</button>`;return;}
  if(window._ngTries===0){gw().innerHTML=`<h2>🔢 Number Guess</h2><div style="font-size:48px;">😢</div><div style="font-size:22px;">It was ${window._ngSecret}!</div><button class="g-btn" style="margin-top:12px;" onclick="gameNumGuess()">Play Again</button>`;return;}
  if(diff>30)hint=g<window._ngSecret?'🔥 Much higher!':'🔥 Much lower!';
  else if(diff>10)hint=g<window._ngSecret?'⬆️ Higher':'⬇️ Lower';
  else hint=g<window._ngSecret?'🔼 Just a bit higher!':'🔽 Just a bit lower!';
  document.getElementById('ng-hint').textContent=hint;
  document.getElementById('ng-tries').textContent=`${window._ngTries} tries left`;
  inp.value='';inp.focus();
}

/* REACTION TIME */
function gameReaction(){
  window._rtState='idle';
  gw().innerHTML=`<h2>⚡ Reaction Time</h2><div id="rt-box" onclick="rtClick()" style="width:260px;height:160px;border-radius:16px;background:#e0e0e0;display:flex;align-items:center;justify-content:center;cursor:pointer;margin:16px auto;font-size:18px;user-select:none;">Click to Start</div><div id="rt-hist" style="font-size:14px;color:#666;margin-top:8px;"></div>`;
  window._rtTimes=[];
}
function rtClick(){
  const box=document.getElementById('rt-box');
  if(window._rtState==='idle'){
    window._rtState='waiting';
    box.style.background='#ef5350';box.textContent='Wait for green...';
    const delay=rnd(1500,4000);
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
    const t=Date.now()-window._rtStart;
    window._rtState='idle';
    window._rtTimes.push(t);
    box.style.background='#e0e0e0';box.textContent=`${t}ms! Click for next round.`;
    const avg=Math.round(window._rtTimes.reduce((a,b)=>a+b,0)/window._rtTimes.length);
    document.getElementById('rt-hist').textContent=`Best: ${Math.min(...window._rtTimes)}ms | Avg: ${avg}ms | Rounds: ${window._rtTimes.length}`;
  }
}

/* TRUE OR FALSE */
const TF_QS=[
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
function gameTrueFalse(){window._tfScore=0;window._tfQ=0;window._tfQs=shuffle(TF_QS).slice(0,10);nextTF();}
function nextTF(){
  if(window._tfQ>=10){gw().innerHTML=`<h2>✅ True or False</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._tfScore}/10</div><button class="g-btn" style="margin-top:12px;" onclick="gameTrueFalse()">Play Again</button>`;return;}
  const [q,a]=window._tfQs[window._tfQ];
  gw().innerHTML=`<h2>✅ True or False</h2><div style="font-size:14px;color:#888;">Q ${window._tfQ+1}/10 | Score:${window._tfScore}</div><div style="font-size:18px;margin:20px 10px;line-height:1.5;">"${q}"</div><div style="display:flex;gap:16px;justify-content:center;"><button class="g-btn" onclick="tfAns(true,${a})">✅ True</button><button class="g-btn" onclick="tfAns(false,${a})">❌ False</button></div>`;
}
function tfAns(chosen,correct){window._tfQ++;if(chosen===correct)window._tfScore++;nextTF();}

/* SIMON SAYS */
const SIMON_COLS=['#ef5350','#4caf50','#2196f3','#ffc107'];
const SIMON_NAMES=['Red','Green','Blue','Yellow'];
function gameSimon(){window._simonSeq=[];window._simonStep=0;window._simonPlaying=false;simonStart();}
function simonStart(){
  window._simonSeq=[];window._simonStep=0;
  gw().innerHTML=`<h2>🔵 Simon Says</h2><div id="sim-msg" style="font-size:16px;margin:8px;">Watch the sequence!</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:220px;margin:16px auto;">${SIMON_COLS.map((c,i)=>`<div id="sim-${i}" onclick="simonPress(${i})" style="width:90px;height:90px;border-radius:12px;background:${c};opacity:0.4;cursor:pointer;transition:opacity .15s;"></div>`).join('')}</div><div id="sim-level" style="font-size:14px;color:#666;margin-top:8px;">Level 1</div>`;
  simonNextRound();
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
    const idx=window._simonSeq[i];
    const el=document.getElementById(`sim-${idx}`);
    el.style.opacity='1';
    setTimeout(()=>{el.style.opacity='0.4';setTimeout(()=>{i++;flash();},200);},500);
  }
  setTimeout(flash,600);
}
function simonPress(idx){
  if(window._simonPlaying)return;
  const el=document.getElementById(`sim-${idx}`);
  el.style.opacity='1';setTimeout(()=>el.style.opacity='0.4',200);
  if(idx!==window._simonSeq[window._simonStep]){
    document.getElementById('sim-msg').textContent=`❌ Wrong! Score: ${window._simonSeq.length-1}`;
    setTimeout(simonStart,1500);return;
  }
  window._simonStep++;
  if(window._simonStep===window._simonSeq.length)setTimeout(simonNextRound,600);
}

/* WORD SCRAMBLE */
const WS_WORDS=['PUZZLE','SCRAMBLE','JUNGLE','PLANET','BRIDGE','CASTLE','DRAGON','MIRROR','FILTER','RANDOM','PURPLE','SILVER','WINTER','GARDEN','BOTTLE'];
function gameWordScramble(){window._wsWord='';nextWS();}
function nextWS(){
  const w=pick(WS_WORDS);
  window._wsWord=w;
  const scrambled=shuffle(w.split('')).join('');
  gw().innerHTML=`<h2>🔀 Word Scramble</h2><div style="font-size:42px;letter-spacing:8px;margin:16px;font-weight:700;color:#3498db;">${scrambled}</div><p>Unscramble the word!</p><input id="ws-in" type="text" maxlength="${w.length}" style="font-size:20px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:160px;" onkeydown="if(event.key==='Enter')checkWS()"><br><button class="g-btn" style="margin-top:10px;" onclick="checkWS()">Submit</button><button class="g-btn" style="margin-top:10px;background:#95a5a6;" onclick="nextWS()">Skip</button><div id="ws-msg" style="margin-top:12px;font-size:18px;min-height:28px;"></div>`;
  document.getElementById('ws-in').focus();
}
function checkWS(){
  const v=document.getElementById('ws-in').value.toUpperCase().trim();
  const msg=document.getElementById('ws-msg');
  if(v===window._wsWord){msg.style.color='#2ecc71';msg.textContent='✅ Correct!';setTimeout(nextWS,1000);}
  else{msg.style.color='#e74c3c';msg.textContent='❌ Try again!';}
}

/* RIDDLES */
const RIDDLES=[
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
function gameRiddles(){window._rdIdx=0;window._rdShuf=shuffle(RIDDLES);nextRiddle();}
function nextRiddle(){
  if(window._rdIdx>=window._rdShuf.length){gw().innerHTML=`<h2>🤔 Riddles</h2><div style="font-size:48px;">🏆</div><div>All riddles done!</div><button class="g-btn" style="margin-top:12px;" onclick="gameRiddles()">Play Again</button>`;return;}
  const [q]=window._rdShuf[window._rdIdx];
  gw().innerHTML=`<h2>🤔 Riddles</h2><div style="font-size:14px;color:#888;">${window._rdIdx+1}/${window._rdShuf.length}</div><div style="font-size:18px;margin:20px 10px;line-height:1.6;">"${q}"</div><button class="g-btn" onclick="nextRiddleReveal()">Reveal Answer</button>`;
}
function nextRiddleReveal(){
  const [,a]=window._rdShuf[window._rdIdx];
  gw().innerHTML+=`<div style="font-size:22px;color:#2ecc71;margin:12px;font-weight:700;">Answer: ${a}</div><button class="g-btn" style="margin-top:8px;" onclick="nextRiddleNext()">Next Riddle</button>`;
  document.querySelector('[onclick="nextRiddleReveal()"]')&&document.querySelector('[onclick="nextRiddleReveal()"]').remove();
}
function nextRiddleNext(){window._rdIdx++;nextRiddle();}

/* EMOJI QUIZ */
const EQ_LIST=[
  ['🍎📱','Apple iPhone'],['🦁👑','Lion King'],['🕷️🕸️👨','Spider-Man'],
  ['🧊❄️🎵','Frozen'],['🚀⭐🌌','Star Wars'],['🦈🎬','Jaws'],
  ['🧙🔮💍','Lord of the Rings'],['🦇🌙🦸','Batman'],['🧊🍦🚐','Ice Cream Truck'],
  ['🌹💀💀','Romeo and Juliet'],['🚂💨🧙','Harry Potter'],['🦸🩸🦇','Dracula'],
];
function gameEmojiQuiz(){window._eqIdx=0;window._eqScore=0;window._eqList=shuffle(EQ_LIST);nextEQ();}
function nextEQ(){
  if(window._eqIdx>=window._eqList.length){gw().innerHTML=`<h2>😀 Emoji Quiz</h2><div style="font-size:48px;">🏆</div><div style="font-size:22px;">Score: ${window._eqScore}/${window._eqList.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameEmojiQuiz()">Play Again</button>`;return;}
  const [emoji]=window._eqList[window._eqIdx];
  gw().innerHTML=`<h2>😀 Emoji Quiz</h2><div style="font-size:14px;color:#888;">Q ${window._eqIdx+1}/${window._eqList.length} | Score:${window._eqScore}</div><div style="font-size:56px;margin:20px;">${emoji}</div><p>What movie/show/character is this?</p><input id="eq-in" type="text" style="font-size:16px;padding:8px;border:2px solid #ccc;border-radius:8px;width:220px;" onkeydown="if(event.key==='Enter')checkEQ()"><br><button class="g-btn" style="margin-top:10px;" onclick="checkEQ()">Submit</button><button class="g-btn" style="margin-top:10px;background:#95a5a6;" onclick="eqReveal()">Give Up</button><div id="eq-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('eq-in').focus();
}
function checkEQ(){
  const v=document.getElementById('eq-in').value.trim().toLowerCase();
  const [,ans]=window._eqList[window._eqIdx];
  const words=ans.toLowerCase().split(' ');
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
const OO_SETS=[
  [['Dog','Cat','Eagle','Fish'],'Eagle','Only bird'],
  [['Red','Blue','Green','Eleven'],'Eleven','Only number'],
  [['Apple','Banana','Carrot','Mango'],'Carrot','Only vegetable'],
  [['Paris','London','Berlin','Nile'],'Nile','Only river'],
  [['Piano','Guitar','Drum','Trumpet'],'Drum','Only non-melodic'],
  [['Shark','Dolphin','Whale','Salmon'],'Salmon','Only fish (others mammals/sharks)'],
  [['Moon','Sun','Mars','Atlantic'],'Atlantic','Only ocean'],
  [['Shakespeare','Dickens','Newton','Twain'],'Newton','Only scientist'],
];
function gameOddOne(){window._ooIdx=0;window._ooScore=0;window._ooSets=shuffle(OO_SETS);nextOO();}
function nextOO(){
  if(window._ooIdx>=window._ooSets.length){gw().innerHTML=`<h2>🔍 Odd One Out</h2><div style="font-size:48px;">🏆</div><div style="font-size:22px;">Score: ${window._ooScore}/${window._ooSets.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameOddOne()">Play Again</button>`;return;}
  const [items,odd,reason]=window._ooSets[window._ooIdx];
  const shuffled=shuffle([...items]);
  window._ooIdx++;
  gw().innerHTML=`<h2>🔍 Odd One Out</h2><div style="font-size:14px;color:#888;">Q ${window._ooIdx}/${window._ooSets.length} | Score:${window._ooScore}</div><p>Which doesn't belong?</p><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:280px;margin:16px auto;">${shuffled.map(i=>`<button class="g-btn" onclick="ooAns('${i}','${odd}','${reason}')">${i}</button>`).join('')}</div>`;
}
function ooAns(chosen,odd,reason){
  if(chosen===odd){window._ooScore++;gw().innerHTML+=`<div style="color:#2ecc71;font-size:18px;margin:10px;">✅ Correct! ${reason}</div><button class="g-btn" onclick="nextOO()">Next</button>`;}
  else{gw().innerHTML+=`<div style="color:#e74c3c;font-size:18px;margin:10px;">❌ It was: ${odd} — ${reason}</div><button class="g-btn" onclick="nextOO()">Next</button>`;}
  document.querySelectorAll('.g-btn:not(:last-child)').forEach(b=>{if(b.textContent!=='Next')b.disabled=true;});
}

/* COLOR MATCH (STROOP) */
const CM_COLORS=[['Red','#ef5350'],['Green','#4caf50'],['Blue','#2196f3'],['Yellow','#ffc107'],['Purple','#9c27b0'],['Orange','#ff9800']];
function gameColorMatch(){window._cmScore=0;window._cmQ=0;window._cmStart=Date.now();nextCM();}
function nextCM(){
  if(window._cmQ>=15){const elapsed=Math.round((Date.now()-window._cmStart)/1000);gw().innerHTML=`<h2>🎨 Color Match</h2><div style="font-size:48px;">🏆</div><div style="font-size:22px;">Score: ${window._cmScore}/15</div><div style="font-size:14px;color:#888;">Time: ${elapsed}s</div><button class="g-btn" style="margin-top:12px;" onclick="gameColorMatch()">Play Again</button>`;return;}
  const textColor=pick(CM_COLORS);
  const displayColor=pick(CM_COLORS.filter(c=>c[0]!==textColor[0]));
  const opts=shuffle(CM_COLORS.slice(0,4));
  window._cmCorrect=displayColor[0];
  window._cmQ++;
  gw().innerHTML=`<h2>🎨 Color Match (Stroop)</h2><div style="font-size:14px;color:#888;">Q ${window._cmQ}/15 | Score:${window._cmScore}</div><p style="font-size:14px;">Click the COLOR of the ink (not the word!)</p><div style="font-size:48px;font-weight:900;color:${displayColor[1]};margin:16px;">${textColor[0]}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:260px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" style="background:${o[1]};border-color:${o[1]};color:white;" onclick="cmAns('${o[0]}')">${o[0]}</button>`).join('')}</div>`;
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
function qeNext(){
  if(window._qeQ>=window._qeList.length){gw().innerHTML=`<h2>Quiz</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._qeScore}/${window._qeList.length}</div><button class="g-btn" style="margin-top:12px;" onclick="window._qeRestart()">Play Again</button>`;return;}
  const [q,...opts]=window._qeList[window._qeQ];
  const correct=opts[0];
  const shuffled=shuffle(opts);
  window._qeQ++;
  window._qeCorrect=correct;
  gw().innerHTML=`<h2>Quiz</h2><div style="font-size:14px;color:#888;">Q ${window._qeQ}/${window._qeList.length} | Score:${window._qeScore}</div><div style="font-size:17px;margin:16px 8px;line-height:1.5;">${q}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:320px;margin:0 auto;">${shuffled.map(o=>`<button class="g-btn" style="font-size:13px;padding:10px 8px;" onclick="qeAns('${o.replace(/'/g,"\\'")}','${correct.replace(/'/g,"\\'")}')">${o}</button>`).join('')}</div>`;
}
function qeAns(chosen,correct){
  if(chosen===correct)window._qeScore++;
  const btns=document.querySelectorAll('.g-btn');
  btns.forEach(b=>{
    if(b.textContent===correct)b.style.background='#2ecc71';
    else if(b.textContent===chosen&&chosen!==correct)b.style.background='#e74c3c';
    b.disabled=true;
  });
  setTimeout(qeNext,700);
}

const GQ_DATA=[
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
const GGQ_DATA=[
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
const SQ_DATA=[
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
const HQ_DATA=[
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
const MQ_DATA=[
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
const EXQ_DATA=[
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

function gameGenQuiz(){window._qeRestart=gameGenQuiz;makeQuizEngine(GQ_DATA,'General Knowledge','🧠')();}
function gameGeoQuiz(){window._qeRestart=gameGeoQuiz;const fn=makeQuizEngine(GGQ_DATA,'Geography Quiz','🌍');fn();}
function gameSciQuiz(){window._qeRestart=gameSciQuiz;const fn=makeQuizEngine(SQ_DATA,'Science Quiz','🔬');fn();}
function gameHistQuiz(){window._qeRestart=gameHistQuiz;const fn=makeQuizEngine(HQ_DATA,'History Quiz','📜');fn();}
function gameMovieQuiz(){window._qeRestart=gameMovieQuiz;const fn=makeQuizEngine(MQ_DATA,'Movie Quiz','🎬');fn();}
function gameExpertQuiz(){window._qeRestart=gameExpertQuiz;const fn=makeQuizEngine(EXQ_DATA,'Expert Trivia','🏆');fn();}

/* MEMORY CARDS */
const MEM_EMOJIS='🍎🍊🍋🍇🍓🍑🥝🍒🫐🥭🍍🍌🍐🎯🎮🎲🃏🎪🎨🎭'.split('');
function gameMemory(){startMemory(4,8,'memory');}
function gameMemHard(){startMemory(5,10,'memhard');}
function startMemory(cols,pairs,key){
  const emojis=shuffle(MEM_EMOJIS).slice(0,pairs);
  const cards=shuffle([...emojis,...emojis]).map((e,i)=>({emoji:e,id:i,flipped:false,matched:false}));
  window._memCards=cards;window._memFlipped=[];window._memMatches=0;window._memMoves=0;window._memCols=cols;window._memPairs=pairs;
  renderMem();
}
function renderMem(){
  const c=window._memCards;const cols=window._memCols;
  gw().innerHTML=`<h2>🃏 Memory Cards</h2><div style="font-size:14px;color:#888;margin-bottom:8px;">Moves: ${window._memMoves} | Pairs: ${window._memMatches}/${window._memPairs}</div><div style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:6px;max-width:${cols*60}px;margin:0 auto;">${c.map((card,i)=>`<div onclick="memClick(${i})" style="width:52px;height:52px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:24px;cursor:pointer;background:${card.flipped||card.matched?'#fff':'#3498db'};border:2px solid ${card.matched?'#2ecc71':'#bbb'};transition:all .2s;">${card.flipped||card.matched?card.emoji:'?'}</div>`).join('')}</div>`;
}
function memClick(i){
  if(window._memFlipped.length===2||window._memCards[i].flipped||window._memCards[i].matched)return;
  window._memCards[i].flipped=true;
  window._memFlipped.push(i);
  if(window._memFlipped.length===2){
    window._memMoves++;
    const [a,b]=window._memFlipped;
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
  window._tttBoard=Array(9).fill('');window._tttTurn='X';
  renderTTT('Your turn (X)');
}
function renderTTT(msg){
  gw().innerHTML=`<h2>⭕ Tic Tac Toe</h2><div style="font-size:14px;color:#888;margin-bottom:8px;">${msg}</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:6px;max-width:210px;margin:0 auto;">${window._tttBoard.map((v,i)=>`<div onclick="tttClick(${i})" style="width:60px;height:60px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:32px;cursor:pointer;background:#f0f0f0;border:2px solid #ddd;">${v}</div>`).join('')}</div><button class="g-btn" style="margin-top:12px;" onclick="gameTTT()">Restart</button>`;
}
const TTT_LINES=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
function checkTTT(b){for(const [a,c,d] of TTT_LINES)if(b[a]&&b[a]===b[c]&&b[a]===b[d])return b[a];if(b.every(v=>v))return'Draw';return null;}
function tttClick(i){
  if(window._tttBoard[i]||window._tttTurn!=='X')return;
  window._tttBoard[i]='X';
  const r=checkTTT(window._tttBoard);
  if(r){renderTTT(r==='Draw'?'Draw!':'🏆 You Win!');return;}
  window._tttTurn='O';
  renderTTT('CPU thinking...');
  setTimeout(()=>{
    aiTTT();
    const r2=checkTTT(window._tttBoard);
    if(r2){renderTTT(r2==='Draw'?'Draw!':'😢 CPU Wins!');return;}
    window._tttTurn='X';renderTTT('Your turn (X)');
  },400);
}
function aiTTT(){
  const b=window._tttBoard;
  for(const [a,c,d] of TTT_LINES){const line=[b[a],b[c],b[d]];if(line.filter(v=>v==='O').length===2&&line.includes('')){const idx=[a,c,d][line.indexOf('')];b[idx]='O';return;}}
  for(const [a,c,d] of TTT_LINES){const line=[b[a],b[c],b[d]];if(line.filter(v=>v==='X').length===2&&line.includes('')){const idx=[a,c,d][line.indexOf('')];b[idx]='O';return;}}
  if(!b[4])b[4]='O';
  else{const corners=[0,2,6,8].filter(i=>!b[i]);if(corners.length)b[pick(corners)]='O';else{const emp=b.map((_,i)=>i).filter(i=>!b[i]);if(emp.length)b[pick(emp)]='O';}}
}

/* HANGMAN */
const HM_WORDS=['JAVASCRIPT','PYTHON','ELEPHANT','UNIVERSITY','CHALLENGE','KEYBOARD','MONITOR','QUANTUM','GRAVITY','SYMPHONY','ALGORITHM','DINOSAUR','ASTRONAUT','CHOCOLATE','ADVENTURE'];
function gameHangman(){
  window._hmWord=pick(HM_WORDS);
  window._hmGuessed=new Set();window._hmWrong=0;
  renderHM();
}
function renderHM(){
  const w=window._hmWord;const g=window._hmGuessed;const wrong=window._hmWrong;
  const display=w.split('').map(c=>g.has(c)?c:'_').join(' ');
  const hangParts=['😐','😕','😨','😰','😱','😵','💀'];
  const letters='ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  const won=w.split('').every(c=>g.has(c));
  const lost=wrong>=6;
  gw().innerHTML=`<h2>🔤 Hangman</h2><div style="font-size:48px;">${hangParts[wrong]}</div><div style="font-size:24px;letter-spacing:8px;margin:12px;font-family:monospace;">${display}</div><div style="font-size:14px;color:#888;margin-bottom:8px;">Wrong: ${wrong}/6</div>${won?`<div style="font-size:24px;color:#2ecc71;margin:12px;">🎉 You Won!</div><button class="g-btn" onclick="gameHangman()">Play Again</button>`:lost?`<div style="font-size:18px;color:#e74c3c;margin:12px;">💀 Word was: ${w}</div><button class="g-btn" onclick="gameHangman()">Play Again</button>`:`<div style="display:flex;flex-wrap:wrap;gap:4px;max-width:320px;margin:0 auto;">${letters.map(l=>`<button onclick="hmGuess('${l}')" style="width:34px;height:34px;border-radius:6px;border:2px solid ${g.has(l)?(w.includes(l)?'#2ecc71':'#e74c3c'):'#ccc'};background:${g.has(l)?(w.includes(l)?'#2ecc71':'#e74c3c'):'#fff'};cursor:pointer;font-size:14px;font-weight:700;">${l}</button>`).join('')}</div>`}`;
}
function hmGuess(l){
  if(window._hmGuessed.has(l))return;
  window._hmGuessed.add(l);
  if(!window._hmWord.includes(l))window._hmWrong++;
  renderHM();
}

/* MATH QUIZ */
function gameMathQuiz(){window._mqScore=0;window._mqQ=0;nextMathQ();}
function nextMathQ(){
  if(window._mqQ>=10){gw().innerHTML=`<h2>🧮 Math Quiz</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._mqScore}/10</div><button class="g-btn" style="margin-top:12px;" onclick="gameMathQuiz()">Play Again</button>`;return;}
  const ops=['+','-','×','÷'];const op=pick(ops);
  let a,b,ans;
  if(op==='+'){a=rnd(10,99);b=rnd(10,99);ans=a+b;}
  else if(op==='-'){a=rnd(20,99);b=rnd(1,a-1);ans=a-b;}
  else if(op==='×'){a=rnd(2,12);b=rnd(2,12);ans=a*b;}
  else{b=rnd(2,9);ans=rnd(2,12);a=b*ans;}
  const wrong=[ans+rnd(1,5),ans-rnd(1,5),ans+rnd(6,12)].filter(v=>v>0&&v!==ans);
  const opts=shuffle([ans,...wrong.slice(0,3)]);
  window._mqQ++;
  gw().innerHTML=`<h2>🧮 Math Quiz</h2><div style="font-size:14px;color:#888;">Q ${window._mqQ}/10 | Score:${window._mqScore}</div><div style="font-size:42px;margin:16px;font-weight:700;">${a} ${op} ${b} = ?</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:280px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" onclick="mqAns(${o},${ans})">${o}</button>`).join('')}</div>`;
}
function mqAns(chosen,correct){window._mqQ++;if(chosen===correct)window._mqScore++;nextMathQ();}

/* TYPING SPEED */
const TYPING_SENTENCES=['The quick brown fox jumps over the lazy dog','Pack my box with five dozen liquor jugs','How vexingly quick daft zebras jump','The five boxing wizards jump quickly','Sphinx of black quartz judge my vow','Two driven jocks help fax my big quiz','The jay pig fox zebra and my wolves quack'];
function gameTyping(){
  const sentence=pick(TYPING_SENTENCES);
  window._tpSentence=sentence;window._tpStart=null;
  gw().innerHTML=`<h2>⌨️ Typing Speed</h2><div id="tp-text" style="font-size:18px;line-height:1.8;padding:12px;background:#f8f8f8;border-radius:8px;margin:12px 0;letter-spacing:1px;">${sentence}</div><textarea id="tp-in" style="width:100%;font-size:16px;padding:8px;border:2px solid #ccc;border-radius:8px;resize:none;height:60px;" placeholder="Start typing here..." oninput="typingCheck()"></textarea><div id="tp-res" style="margin-top:10px;font-size:16px;min-height:24px;"></div>`;
}
function typingCheck(){
  const inp=document.getElementById('tp-in');
  const v=inp.value;
  if(!window._tpStart&&v.length>0)window._tpStart=Date.now();
  const target=window._tpSentence;
  const colored=target.split('').map((c,i)=>{
    if(i>=v.length)return`<span>${c}</span>`;
    return v[i]===c?`<span style="color:#2ecc71;font-weight:700;">${c}</span>`:`<span style="color:#e74c3c;text-decoration:underline;">${c}</span>`;
  }).join('');
  document.getElementById('tp-text').innerHTML=colored;
  if(v===target){
    const elapsed=(Date.now()-window._tpStart)/60000;
    const words=target.split(' ').length;
    const wpm=Math.round(words/elapsed);
    document.getElementById('tp-res').innerHTML=`<span style="color:#2ecc71;font-weight:700;">✅ ${wpm} WPM!</span>`;
    inp.disabled=true;
  }
}

/* ANAGRAM */
const AG_WORDS=['listen/silent','earth/heart','race/care','ate/eat','evil/vile','act/cat','below/elbow','now/own','night/thing','state/taste'];
function gameAnagram(){window._agWord='';window._agTarget='';nextAG();}
function nextAG(){
  const pair=pick(AG_WORDS).split('/');
  window._agWord=pair[0].toUpperCase();window._agTarget=pair[1].toUpperCase();
  gw().innerHTML=`<h2>🔤 Anagram</h2><p>Make a new word from these letters!</p><div style="font-size:42px;letter-spacing:6px;margin:16px;font-weight:700;color:#3498db;">${window._agWord}</div><input id="ag-in" type="text" maxlength="${window._agWord.length}" style="font-size:22px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:160px;" onkeydown="if(event.key==='Enter')checkAG()"><br><button class="g-btn" style="margin-top:10px;" onclick="checkAG()">Submit</button><button class="g-btn" style="background:#95a5a6;margin-top:10px;" onclick="nextAG()">Skip</button><div id="ag-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('ag-in').focus();
}
function checkAG(){
  const v=document.getElementById('ag-in').value.toUpperCase().trim();
  const msg=document.getElementById('ag-msg');
  const sorted=s=>[...s].sort().join('');
  if(sorted(v)===sorted(window._agWord)&&v!==window._agWord&&v.length===window._agWord.length){
    msg.style.color='#2ecc71';msg.textContent=`✅ Correct! (was "${window._agTarget}")`;setTimeout(nextAG,1200);
  } else {
    msg.style.color='#e74c3c';msg.textContent='❌ Try again! Use the same letters.';
  }
}

/* TIMES TABLES */
function gameTimes(){window._ttScore=0;window._ttQ=0;nextTimes();}
function nextTimes(){
  if(window._ttQ>=20){gw().innerHTML=`<h2>✖️ Times Tables</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._ttScore}/20</div><button class="g-btn" style="margin-top:12px;" onclick="gameTimes()">Play Again</button>`;return;}
  const a=rnd(2,12),b=rnd(2,12);
  const ans=a*b;
  const wrong=[ans+rnd(1,4),ans-rnd(1,4),ans+a].filter(v=>v>0&&v!==ans);
  const opts=shuffle([ans,...wrong.slice(0,3)]);
  window._ttQ++;
  gw().innerHTML=`<h2>✖️ Times Tables</h2><div style="font-size:14px;color:#888;">Q ${window._ttQ}/20 | Score:${window._ttScore}</div><div style="font-size:48px;margin:16px;font-weight:700;">${a} × ${b} = ?</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:280px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" onclick="timesAns(${o},${ans})">${o}</button>`).join('')}</div>`;
}
function timesAns(c,a){window._ttQ++;if(c===a)window._ttScore++;nextTimes();}

/* MINESWEEPER */
function gameMines(){startMines(6,6,8,'mines');}
function gameMinesHard(){startMines(10,10,20,'mineshard');}
function startMines(rows,cols,mines,key){
  const total=rows*cols;
  const mineSet=new Set();while(mineSet.size<mines)mineSet.add(rnd(0,total-1));
  const board=Array.from({length:total},(_,i)=>({mine:mineSet.has(i),revealed:false,flagged:false,adj:0}));
  for(let i=0;i<total;i++){
    if(board[i].mine)continue;
    let count=0;
    const r=Math.floor(i/cols),c=i%cols;
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const nr=r+dr,nc=c+dc;if(nr>=0&&nr<rows&&nc>=0&&nc<cols&&board[nr*cols+nc].mine)count++;}
    board[i].adj=count;
  }
  window._msBoard=board;window._msRows=rows;window._msCols=cols;window._msMines=mines;window._msKey=key;window._msOver=false;
  renderMines();
}
function renderMines(){
  const b=window._msBoard;const cols=window._msCols;const rows=window._msRows;
  const sz=Math.min(38,Math.floor(280/cols));
  const adjColors=['','#2196f3','#4caf50','#e74c3c','#9c27b0','#f44336','#00bcd4','#000','#888'];
  gw().innerHTML=`<h2>💣 Minesweeper</h2><div style="font-size:13px;color:#888;margin-bottom:6px;">Right-click/long-press to flag • ${window._msMines} mines</div><div id="ms-grid" style="display:grid;grid-template-columns:repeat(${cols},1fr);gap:3px;max-width:${cols*sz+cols*3}px;margin:0 auto;">${b.map((cell,i)=>{
    let bg='#b0bec5',txt='',cursor='pointer';
    if(cell.revealed){bg=cell.mine?'#ef5350':'#f5f5f5';txt=cell.mine?'💣':(cell.adj||'');}
    if(cell.flagged&&!cell.revealed){bg='#ffc107';txt='🚩';}
    const color=cell.adj?adjColors[cell.adj]:'#333';
    return`<div onclick="msClick(${i})" oncontextmenu="msFlag(${i});return false;" style="width:${sz}px;height:${sz}px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:${sz>32?14:11}px;cursor:${cursor};background:${bg};color:${color};font-weight:700;border:1px solid rgba(0,0,0,.1);">${txt}</div>`;
  }).join('')}</div>`;
  if(window._msOver)gw().innerHTML+=`<button class="g-btn" style="margin-top:12px;" onclick="startMines(${rows},${cols},${window._msMines},'${window._msKey}')">Play Again</button>`;
}
function msClick(i){
  if(window._msOver)return;
  const b=window._msBoard;if(b[i].revealed||b[i].flagged)return;
  if(b[i].mine){b[i].revealed=true;window._msOver=true;b.forEach(c=>{if(c.mine)c.revealed=true;});renderMines();gw().innerHTML=`<div style="font-size:28px;margin-top:8px;">💥 BOOM! Game Over</div>`+gw().innerHTML.replace('<h2>💣 Minesweeper</h2>','');return;}
  msReveal(i);
  const unrevealed=b.filter(c=>!c.revealed&&!c.mine).length;
  if(unrevealed===0){window._msOver=true;renderMines();gw().innerHTML=`<div style="font-size:28px;margin-top:8px;">🏆 You Won!</div>`+gw().innerHTML.replace('<h2>💣 Minesweeper</h2>','');}
  else renderMines();
}
function msReveal(i){
  const b=window._msBoard;const cols=window._msCols;const rows=window._msRows;
  if(b[i].revealed)return;b[i].revealed=true;
  if(b[i].adj===0&&!b[i].mine){
    const r=Math.floor(i/cols),c=i%cols;
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){if(!dr&&!dc)continue;const nr=r+dr,nc=c+dc;if(nr>=0&&nr<rows&&nc>=0&&nc<cols)msReveal(nr*cols+nc);}
  }
}
function msFlag(i){if(window._msOver)return;const b=window._msBoard;if(b[i].revealed)return;b[i].flagged=!b[i].flagged;renderMines();}

/* WORD CHAIN */
function gameWordChain(){
  window._wcUsed=new Set();window._wcLast='';window._wcScore=0;
  gw().innerHTML=`<h2>🔗 Word Chain</h2><p>Each word must start with the last letter of the previous word!</p><div id="wc-chain" style="font-size:14px;color:#666;min-height:40px;margin:10px;word-wrap:break-word;"></div><input id="wc-in" type="text" style="font-size:18px;padding:8px;border:2px solid #ccc;border-radius:8px;width:200px;" placeholder="Enter a word..." onkeydown="if(event.key==='Enter')submitWordChain()"><button class="g-btn" style="margin-top:8px;display:block;margin:8px auto 0;" onclick="submitWordChain()">Submit</button><div id="wc-msg" style="margin-top:10px;min-height:24px;font-size:15px;"></div><div id="wc-score" style="font-size:14px;color:#888;margin-top:6px;">Score: 0</div>`;
}
function submitWordChain(){
  const inp=document.getElementById('wc-in');
  const w=inp.value.trim().toLowerCase().replace(/[^a-z]/g,'');
  const msg=document.getElementById('wc-msg');
  if(w.length<2){msg.style.color='#e74c3c';msg.textContent='Word too short!';return;}
  if(window._wcUsed.has(w)){msg.style.color='#e74c3c';msg.textContent='Already used!';return;}
  if(window._wcLast&&w[0]!==window._wcLast){msg.style.color='#e74c3c';msg.textContent=`Must start with "${window._wcLast.toUpperCase()}"!`;return;}
  window._wcUsed.add(w);window._wcLast=w[w.length-1];window._wcScore++;
  document.getElementById('wc-chain').textContent=[...window._wcUsed].join(' → ');
  document.getElementById('wc-score').textContent=`Score: ${window._wcScore}`;
  msg.style.color='#2ecc71';msg.textContent=`✅ Next must start with "${window._wcLast.toUpperCase()}"`;
  inp.value='';inp.focus();
}

/* CONNECT FOUR */
function gameC4(){
  window._c4Board=Array(42).fill(0);window._c4Turn=1;window._c4Over=false;
  renderC4('Your turn (🔴)');
}
function renderC4(msg){
  const b=window._c4Board;
  const colors=['#e0e0e0','#ef5350','#ffc107'];
  gw().innerHTML=`<h2>🔴 Connect Four</h2><div style="font-size:14px;color:#888;margin-bottom:6px;">${msg}</div><div style="display:grid;grid-template-columns:repeat(7,1fr);gap:4px;max-width:280px;margin:0 auto;">${b.map((v,i)=>`<div onclick="c4Drop(${i%7})" style="width:34px;height:34px;border-radius:50%;background:${colors[v]};cursor:pointer;border:2px solid rgba(0,0,0,.1);"></div>`).join('')}</div><button class="g-btn" style="margin-top:12px;" onclick="gameC4()">Restart</button>`;
}
function c4Top(col){for(let r=5;r>=0;r--){if(!window._c4Board[r*7+col])return r;}return -1;}
function c4Check(p){
  const b=window._c4Board;
  const lines=[];
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
  const r=c4Top(col);if(r<0)return;
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
  const b=window._c4Board;
  for(let col=0;col<7;col++){const r=c4Top(col);if(r>=0){b[r*7+col]=2;if(c4Check(2)){return;}b[r*7+col]=0;}}
  for(let col=0;col<7;col++){const r=c4Top(col);if(r>=0){b[r*7+col]=1;if(c4Check(1)){b[r*7+col]=0;b[r*7+col]=2;return;}b[r*7+col]=0;}}
  const pref=[3,2,4,1,5,0,6];for(const col of pref){const r=c4Top(col);if(r>=0){b[r*7+col]=2;return;}}
}

/* PATTERN MEMORY */
function gamePatternMem(){window._pmSeq=[];window._pmStep=0;window._pmPlaying=false;pmStart();}
function pmStart(){
  window._pmSeq.push(rnd(0,8));window._pmStep=0;window._pmPlaying=true;
  gw().innerHTML=`<h2>🧠 Pattern Memory</h2><div id="pm-msg" style="font-size:16px;margin:8px;">Watch the pattern!</div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px;max-width:220px;margin:16px auto;">${Array(9).fill(0).map((_,i)=>`<div id="pm-${i}" onclick="pmClick(${i})" style="width:60px;height:60px;border-radius:10px;background:#3498db;opacity:0.35;cursor:pointer;transition:opacity .15s;"></div>`).join('')}</div><div id="pm-level" style="font-size:14px;color:#888;">Level ${window._pmSeq.length}</div>`;
  let i=0;
  function flash(){
    if(i>=window._pmSeq.length){window._pmPlaying=false;document.getElementById('pm-msg').textContent='Your turn!';return;}
    const el=document.getElementById(`pm-${window._pmSeq[i]}`);
    el.style.opacity='1';setTimeout(()=>{el.style.opacity='0.35';setTimeout(()=>{i++;flash();},200);},450);
  }
  setTimeout(flash,500);
}
function pmClick(i){
  if(window._pmPlaying)return;
  const el=document.getElementById(`pm-${i}`);
  el.style.opacity='1';setTimeout(()=>el.style.opacity='0.35',200);
  if(i!==window._pmSeq[window._pmStep]){
    document.getElementById('pm-msg').textContent=`❌ Wrong! Score: ${window._pmSeq.length-1}`;
    setTimeout(gamePatternMem,1500);return;
  }
  window._pmStep++;
  if(window._pmStep===window._pmSeq.length){
    document.getElementById('pm-level').textContent=`Level ${window._pmSeq.length+1}`;
    setTimeout(pmStart,700);
  }
}

/* SNAKE */
function gameSnake(){
  const canvas=document.createElement('canvas');canvas.width=300;canvas.height=300;canvas.style.borderRadius='8px';canvas.style.border='2px solid #ddd';
  gw().innerHTML=`<h2>🐍 Snake</h2><div id="sn-score" style="font-size:16px;margin-bottom:8px;">Score: 0</div>`;
  gw().appendChild(canvas);
  gw().innerHTML+=`<div style="font-size:13px;color:#888;margin-top:6px;">Arrow keys or swipe to move</div>`;
  const ctx=canvas.getContext('2d');
  const SZ=20,COLS=15,ROWS=15;
  let snake=[{x:7,y:7}],dir={x:1,y:0},food={x:rnd(0,14),y:rnd(0,14)},score=0,dead=false;
  let lastTouch=null;
  function draw(){
    ctx.fillStyle='#f8f9fa';ctx.fillRect(0,0,300,300);
    ctx.fillStyle='#2ecc71';snake.forEach(s=>ctx.fillRect(s.x*SZ,s.y*SZ,SZ-1,SZ-1));
    ctx.fillStyle='#ef5350';ctx.fillRect(food.x*SZ,food.y*SZ,SZ-1,SZ-1);
  }
  function step(){
    if(dead)return;
    const head={x:snake[0].x+dir.x,y:snake[0].y+dir.y};
    if(head.x<0||head.x>=COLS||head.y<0||head.y>=ROWS||snake.some(s=>s.x===head.x&&s.y===head.y)){
      dead=true;ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,300,300);
      ctx.fillStyle='#fff';ctx.font='24px sans-serif';ctx.textAlign='center';ctx.fillText('Game Over',150,140);
      ctx.font='18px sans-serif';ctx.fillText('Score: '+score,150,170);
      return;
    }
    snake.unshift(head);
    if(head.x===food.x&&head.y===food.y){score++;document.getElementById('sn-score').textContent='Score: '+score;food={x:rnd(0,14),y:rnd(0,14)};}
    else snake.pop();
    draw();
    window._gameLoop=setTimeout(step,150);
  }
  document.addEventListener('keydown',function snKey(e){
    if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;
    e.preventDefault();
    const map={ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}};
    const nd=map[e.key];
    if(nd.x!==-dir.x||nd.y!==-dir.y)dir=nd;
    if(document.getElementById('gw')===null)document.removeEventListener('keydown',snKey);
  });
  canvas.addEventListener('touchstart',e=>{lastTouch=e.touches[0];},{passive:true});
  canvas.addEventListener('touchend',e=>{
    if(!lastTouch)return;
    const dx=e.changedTouches[0].clientX-lastTouch.clientX;
    const dy=e.changedTouches[0].clientY-lastTouch.clientY;
    if(Math.abs(dx)>Math.abs(dy)){dir=dx>0?{x:1,y:0}:{x:-1,y:0};}
    else{dir=dy>0?{x:0,y:1}:{x:0,y:-1};}
  },{passive:true});
  draw();window._gameLoop=setTimeout(step,150);
}

/* PONG */
function gamePong(){
  const canvas=document.createElement('canvas');canvas.width=320;canvas.height=220;canvas.style.borderRadius='8px';canvas.style.border='2px solid #ddd';
  gw().innerHTML=`<h2>🏓 Pong</h2><div id="pong-score" style="font-size:16px;margin-bottom:8px;">0 : 0</div>`;
  gw().appendChild(canvas);
  gw().innerHTML+=`<div style="font-size:13px;color:#888;margin-top:6px;">Move mouse/touch to control</div>`;
  const ctx=canvas.getContext('2d');
  const W=320,H=220,PH=50,PW=10,BALL=8;
  let py=85,cpu=85,bx=160,by=110,dx=3,dy=2,ps=0,cs=0;
  canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();py=e.clientY-r.top-PH/2;});
  canvas.addEventListener('touchmove',e=>{e.preventDefault();const r=canvas.getBoundingClientRect();py=e.touches[0].clientY-r.top-PH/2;},{passive:false});
  function loop(){
    bx+=dx;by+=dy;
    if(by<0||by>H-BALL)dy=-dy;
    cpu+=(by-cpu-PH/2)*0.08;
    if(bx<PW+BALL&&by>py-4&&by<py+PH+4){dx=Math.abs(dx);dy+=((by-py-PH/2)/PH)*2;}
    if(bx>W-PW-BALL&&by>cpu-4&&by<cpu+PH+4){dx=-Math.abs(dx);}
    if(bx<0){cs++;bx=160;by=110;dx=3;}
    if(bx>W){ps++;bx=160;by=110;dx=-3;}
    document.getElementById('pong-score').textContent=`${ps} : ${cs}`;
    ctx.fillStyle='#1a1d2e';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#fff';ctx.fillRect(0,py,PW,PH);ctx.fillRect(W-PW,cpu,PW,PH);
    ctx.fillRect(bx,by,BALL,BALL);
    ctx.fillStyle='rgba(255,255,255,.2)';ctx.fillRect(W/2,0,2,H);
    window._gameLoop=requestAnimationFrame(loop);
  }
  window._gameLoop=requestAnimationFrame(loop);
}

/* MAKE 24 */
function gameMake24(){start24();}
function start24(){
  window._24nums=Array.from({length:4},()=>rnd(1,9));
  gw().innerHTML=`<h2>🔢 Make 24</h2><div style="font-size:36px;margin:16px;font-weight:700;letter-spacing:8px;color:#3498db;">${window._24nums.join(' ')}</div><p>Use +, -, ×, ÷ and ( ) with these 4 numbers to make 24!</p><input id="m24-in" type="text" style="font-size:18px;padding:8px;border:2px solid #ccc;border-radius:8px;width:220px;" placeholder="e.g. (3+5)×(8÷4)" onkeydown="if(event.key==='Enter')check24()"><button class="g-btn" style="display:block;margin:10px auto 0;" onclick="check24()">Check</button><button class="g-btn" style="background:#95a5a6;" onclick="start24()">New Numbers</button><div id="m24-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('m24-in').focus();
}
function check24(){
  const inp=document.getElementById('m24-in').value.trim();
  const msg=document.getElementById('m24-msg');
  const used=window._24nums.slice().sort();
  const found=inp.match(/\d+/g);
  if(!found||found.map(Number).sort((a,b)=>a-b).join()!==used.sort((a,b)=>a-b).join()){msg.style.color='#e74c3c';msg.textContent='Must use exactly these numbers!';return;}
  try{
    const safe=inp.replace(/[^0-9+\-*/().×÷]/g,'').replace(/×/g,'*').replace(/÷/g,'/');
    const result=Function('"use strict";return ('+safe+')')();
    if(Math.abs(result-24)<0.0001){msg.style.color='#2ecc71';msg.textContent='🎉 Correct! = 24!';}
    else{msg.style.color='#e74c3c';msg.textContent=`= ${result}, not 24. Try again!`;}
  }catch{msg.style.color='#e74c3c';msg.textContent='Invalid expression!';}
}

/* ═══════════════════════════════════════════
   ADVANCED GAMES
═══════════════════════════════════════════ */

/* WORDLE */
const WD_WORDS=['CRANE','PLANT','STOVE','BRICK','GLIDE','FLUTE','WRECK','MOUNT','PIXEL','BLEND','SCOUT','TWIST','GROVE','QUEST','FLAME','TROUT','BLADE','FROST','CRISP','PROWL','CLASP','DROWN','FLINT','GROAN','PLUMB','SHREW','SWAMP','THUMP','WRIST','BLUNT'];
function gameWordle(){wordleInit();}
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
  const grid=document.getElementById('wd-grid');if(!grid)return;
  const g=window._wdGrid.slice();
  const cur=window._wdCurrent;
  for(let i=0;i<5;i++)g[window._wdRow*5+i]=cur[i]||'';
  grid.innerHTML=g.map((c,i)=>{
    const row=Math.floor(i/5);
    let bg='#fff',border='2px solid #d0d0d0',color='#1a1d2e';
    if(row<window._wdRow){border='2px solid transparent';}
    if(c&&row===window._wdRow)border='2px solid #888';
    return`<div style="width:46px;height:46px;border:${border};border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:22px;font-weight:900;background:${bg};color:${color};">${c}</div>`;
  }).join('');
  const past=window._wdGrid.slice(0,window._wdRow*5);
  for(let r=0;r<window._wdRow;r++){
    const guess=window._wdGrid.slice(r*5,r*5+5).join('');
    const tiles=grid.children;
    const wArr=[...window._wdWord];const used=Array(5).fill(false);
    const result=Array(5).fill('absent');
    for(let i=0;i<5;i++)if(guess[i]===wArr[i]){result[i]='correct';used[i]=true;}
    for(let i=0;i<5;i++)if(result[i]!=='correct'){const j=wArr.findIndex((c,k)=>c===guess[i]&&!used[k]&&result[k]!=='correct');if(j>=0){result[i]='present';used[j]=true;}}
    const colors={correct:'#6aaa64',present:'#c9b458',absent:'#787c7e'};
    for(let i=0;i<5;i++){const t=tiles[r*5+i];t.style.background=colors[result[i]];t.style.color='#fff';t.style.border='2px solid transparent';}
  }
  const kbDiv=document.getElementById('wd-kb');if(!kbDiv)return;
  const rows=['QWERTYUIOP','ASDFGHJKL','ZXCVBNM'];
  const kbState={};
  for(let r=0;r<window._wdRow;r++){
    const guess=window._wdGrid.slice(r*5,r*5+5).join('');
    const wArr=[...window._wdWord];const used=Array(5).fill(false);const result=Array(5).fill('absent');
    for(let i=0;i<5;i++)if(guess[i]===wArr[i]){result[i]='correct';used[i]=true;}
    for(let i=0;i<5;i++)if(result[i]!=='correct'){const j=wArr.findIndex((c,k)=>c===guess[i]&&!used[k]&&result[k]!=='correct');if(j>=0){result[i]='present';used[j]=true;}}
    for(let i=0;i<5;i++){if(result[i]==='correct')kbState[guess[i]]='correct';else if(result[i]==='present'&&kbState[guess[i]]!=='correct')kbState[guess[i]]='present';else if(!kbState[guess[i]])kbState[guess[i]]='absent';}
  }
  const colors={correct:'#6aaa64',present:'#c9b458',absent:'#787c7e'};
  kbDiv.innerHTML=rows.map(row=>`<div style="display:flex;justify-content:center;gap:4px;margin-bottom:4px;">${[...row].map(l=>`<button onclick="wdKbPress('${l}')" style="width:28px;height:36px;border-radius:4px;border:none;background:${kbState[l]?colors[kbState[l]]:'#d3d6da'};color:${kbState[l]?'#fff':'#1a1d2e'};font-weight:700;font-size:12px;cursor:pointer;">${l}</button>`).join('')}</div>`).join('');
}
function wdKbPress(l){if(window._wdCurrent.length<5){window._wdCurrent+=l;wordleRender();}}
function wordleGuess(){
  if(window._wdCurrent.length!==5)return;
  const guess=window._wdCurrent;
  const start=window._wdRow*5;
  for(let i=0;i<5;i++)window._wdGrid[start+i]=guess[i];
  window._wdRow++;window._wdCurrent='';
  wordleRender();
  const msg=document.getElementById('wd-msg');
  if(guess===window._wdWord){if(msg)msg.textContent='🎉 Brilliant! You got it!';document.removeEventListener('keydown',wordleKey);return;}
  if(window._wdRow>=6){if(msg)msg.textContent=`Word was: ${window._wdWord}`;document.removeEventListener('keydown',wordleKey);}
}

/* 2048 */
function game2048(){init2048();}
function init2048(){
  window._2048board=Array(16).fill(0);
  add2048();add2048();render2048();
  document.addEventListener('keydown',key2048);
  const gDiv=document.getElementById('gw');
  let t0=null;
  gDiv.addEventListener('touchstart',e=>{t0=e.touches[0];},{passive:true});
  gDiv.addEventListener('touchend',e=>{
    if(!t0)return;const dx=e.changedTouches[0].clientX-t0.clientX,dy=e.changedTouches[0].clientY-t0.clientY;
    if(Math.abs(dx)>Math.abs(dy)){move2048(dx>0?'r':'l');}else{move2048(dy>0?'d':'u');}
  },{passive:true});
}
function add2048(){
  const empty=window._2048board.map((_,i)=>i).filter(i=>!window._2048board[i]);
  if(!empty.length)return;
  const i=pick(empty);window._2048board[i]=Math.random()<0.9?2:4;
}
function render2048(){
  const b=window._2048board;
  const colors={0:'#cdc1b4',2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'};
  const max=Math.max(...b);
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
  const b=[...window._2048board];let changed=false;
  if(dir==='l'){for(let r=0;r<4;r++){const row=b.slice(r*4,r*4+4);const s=slide2048(row);for(let c=0;c<4;c++)if(b[r*4+c]!==s[c]){changed=true;b[r*4+c]=s[c];}}}
  else if(dir==='r'){for(let r=0;r<4;r++){const row=b.slice(r*4,r*4+4).reverse();const s=slide2048(row).reverse();for(let c=0;c<4;c++)if(b[r*4+c]!==s[c]){changed=true;b[r*4+c]=s[c];}}}
  else if(dir==='u'){for(let c=0;c<4;c++){const col=[b[c],b[4+c],b[8+c],b[12+c]];const s=slide2048(col);[0,1,2,3].forEach((r,i)=>{if(b[r*4+c]!==s[i]){changed=true;b[r*4+c]=s[i];}});}}
  else if(dir==='d'){for(let c=0;c<4;c++){const col=[b[c],b[4+c],b[8+c],b[12+c]].reverse();const s=slide2048(col).reverse();[0,1,2,3].forEach((r,i)=>{if(b[r*4+c]!==s[i]){changed=true;b[r*4+c]=s[i];}});}}
  if(changed){window._2048board=b;add2048();render2048();}
}
function key2048(e){
  if(!document.getElementById('gw'))return document.removeEventListener('keydown',key2048);
  const map={ArrowLeft:'l',ArrowRight:'r',ArrowUp:'u',ArrowDown:'d'};
  if(map[e.key]){e.preventDefault();move2048(map[e.key]);}
}

/* MATH SPRINT */
function gameMathSprint(){window._ms2Score=0;window._ms2Q=0;window._ms2Time=60;nextMathSprint();
  window._ms2Timer=setInterval(()=>{window._ms2Time--;document.getElementById('ms2-time')&&(document.getElementById('ms2-time').textContent=`⏱ ${window._ms2Time}s`);if(window._ms2Time<=0){clearInterval(window._ms2Timer);gw().innerHTML=`<h2>⚡ Math Sprint</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._ms2Score}/30</div><button class="g-btn" style="margin-top:12px;" onclick="gameMathSprint()">Play Again</button>`;}},1000);
}
function nextMathSprint(){
  if(window._ms2Q>=30){clearInterval(window._ms2Timer);gw().innerHTML=`<h2>⚡ Math Sprint</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._ms2Score}/30</div><button class="g-btn" style="margin-top:12px;" onclick="gameMathSprint()">Play Again</button>`;return;}
  const ops=['+','-','×'];const op=pick(ops);
  let a,b,ans;
  if(op==='+'){a=rnd(10,50);b=rnd(10,50);ans=a+b;}
  else if(op==='-'){a=rnd(20,80);b=rnd(5,a-1);ans=a-b;}
  else{a=rnd(3,12);b=rnd(3,12);ans=a*b;}
  const wrong=[ans+rnd(1,8),ans-rnd(1,8),ans+rnd(9,15)].filter(v=>v>0&&v!==ans);
  const opts=shuffle([ans,...wrong.slice(0,3)]);
  window._ms2Q++;
  gw().innerHTML=`<h2>⚡ Math Sprint</h2><div id="ms2-time" style="font-size:16px;color:#e74c3c;margin-bottom:4px;">⏱ ${window._ms2Time}s</div><div style="font-size:14px;color:#888;">Q ${window._ms2Q}/30 | Score:${window._ms2Score}</div><div style="font-size:40px;margin:12px;font-weight:700;">${a} ${op} ${b}</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:280px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" onclick="ms2Ans(${o},${ans})">${o}</button>`).join('')}</div>`;
}
function ms2Ans(c,a){if(c===a)window._ms2Score++;nextMathSprint();}

/* NUMBER SEQUENCE */
const NS_SETS=[
  [[2,4,6,8],10,'Add 2'],[[1,3,9,27],81,'×3'],[[100,90,80,70],60,'−10'],
  [[1,1,2,3,5],8,'Fibonacci'],[[2,4,8,16],32,'×2'],[[50,25,12],6,'÷2'],
  [[1,4,9,16],25,'Squares'],[[3,6,12,24],48,'×2'],[[10,8,6,4],2,'−2'],
  [[1,2,4,7,11],16,'+1+2+3...'],
];
function gameNumSeq(){window._nsIdx=0;window._nsScore=0;window._nsSets=shuffle(NS_SETS);nextNS();}
function nextNS(){
  if(window._nsIdx>=window._nsSets.length){gw().innerHTML=`<h2>📈 Number Sequence</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._nsScore}/${window._nsSets.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameNumSeq()">Play Again</button>`;return;}
  const [seq,ans,rule]=window._nsSets[window._nsIdx];
  const wrong=[ans+rnd(1,5),ans-rnd(1,5),ans*2].filter(v=>v!==ans&&v>0);
  const opts=shuffle([ans,...wrong.slice(0,3)]);
  window._nsIdx++;
  gw().innerHTML=`<h2>📈 Number Sequence</h2><div style="font-size:14px;color:#888;">Q ${window._nsIdx}/${window._nsSets.length} | Score:${window._nsScore}</div><div style="font-size:32px;margin:16px;letter-spacing:4px;font-weight:700;">${seq.join(', ')}, ?</div><div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;max-width:280px;margin:0 auto;">${opts.map(o=>`<button class="g-btn" onclick="nsAns(${o},${ans},'${rule}')">${o}</button>`).join('')}</div>`;
}
function nsAns(c,a,rule){
  if(c===a){window._nsScore++;document.getElementById('gw').innerHTML+=`<div style="color:#2ecc71;font-size:16px;margin:10px;">✅ Correct! Rule: ${rule}</div>`;setTimeout(nextNS,800);}
  else{document.getElementById('gw').innerHTML+=`<div style="color:#e74c3c;font-size:16px;margin:10px;">❌ Answer: ${a} — Rule: ${rule}</div>`;setTimeout(nextNS,1200);}
}

/* SPELLING BEE */
const SP_WORDS=[['EPHEMERAL','Lasting for a short time'],['SERENDIPITY','Finding something good without looking'],['UBIQUITOUS','Present everywhere'],['MELANCHOLY','Deep sadness'],['SURREPTITIOUS','Done secretly'],['PERSPICACIOUS','Having a ready insight'],['LOQUACIOUS','Tending to talk a lot'],['MAGNANIMOUS','Very generous'],['OBFUSCATE','To make unclear'],['CACOPHONY','A harsh mixture of sounds']];
function gameSpelling(){window._spIdx=0;window._spScore=0;window._spWords=shuffle(SP_WORDS);nextSpelling();}
function nextSpelling(){
  if(window._spIdx>=window._spWords.length){gw().innerHTML=`<h2>🐝 Spelling Bee</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._spScore}/${window._spWords.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameSpelling()">Play Again</button>`;return;}
  const [word,def]=window._spWords[window._spIdx];window._spCurrent=word;
  gw().innerHTML=`<h2>🐝 Spelling Bee</h2><div style="font-size:14px;color:#888;">Word ${window._spIdx+1}/${window._spWords.length} | Score:${window._spScore}</div><div style="font-size:16px;margin:16px 10px;color:#555;line-height:1.6;">"${def}"</div><p style="font-size:14px;color:#888;">Spell the word (${word.length} letters)</p><input id="sp-in" type="text" maxlength="${word.length+5}" style="font-size:18px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:200px;" onkeydown="if(event.key==='Enter')spCheck()"><button class="g-btn" style="display:block;margin:10px auto 0;" onclick="spCheck()">Submit</button><button class="g-btn" style="background:#95a5a6;" onclick="spHint()">Hint (first letter)</button><div id="sp-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('sp-in').focus();
}
function spCheck(){
  const v=document.getElementById('sp-in').value.toUpperCase().trim();
  const msg=document.getElementById('sp-msg');
  if(v===window._spCurrent){window._spScore++;msg.style.color='#2ecc71';msg.textContent='✅ Correct!';window._spIdx++;setTimeout(nextSpelling,900);}
  else{msg.style.color='#e74c3c';msg.textContent=`❌ Try again!`;}
}
function spHint(){const msg=document.getElementById('sp-msg');msg.style.color='#888';msg.textContent=`Hint: starts with "${window._spCurrent[0]}"`;}

/* BREAKOUT */
function gameBreakout(){
  const canvas=document.createElement('canvas');canvas.width=360;canvas.height=280;canvas.style.borderRadius='8px';canvas.style.border='2px solid #ddd';
  gw().innerHTML=`<h2>🧱 Breakout</h2><div id="bo-score" style="font-size:16px;margin-bottom:8px;">Score: 0 | Lives: 3</div>`;
  gw().appendChild(canvas);
  const ctx=canvas.getContext('2d');
  const W=360,H=280,PW=70,PH=10,BALL=8,ROWS=5,COLS=8,BW=40,BH=14;
  let px=145,bx=180,by=220,dx=3,dy=-3,score=0,lives=3,started=false;
  const bricks=[];
  const colors=['#ef5350','#ff9800','#ffc107','#4caf50','#2196f3'];
  for(let r=0;r<ROWS;r++)for(let c=0;c<COLS;c++)bricks.push({x:c*(BW+5)+5,y:r*(BH+5)+30,alive:true,color:colors[r]});
  canvas.addEventListener('mousemove',e=>{const r=canvas.getBoundingClientRect();px=e.clientX-r.left-PW/2;started=true;});
  canvas.addEventListener('touchmove',e=>{e.preventDefault();const r=canvas.getBoundingClientRect();px=e.touches[0].clientX-r.left-PW/2;started=true;},{passive:false});
  canvas.addEventListener('click',()=>started=true);
  function draw(){
    ctx.fillStyle='#1a1d2e';ctx.fillRect(0,0,W,H);
    bricks.forEach(b=>{if(!b.alive)return;ctx.fillStyle=b.color;ctx.fillRect(b.x,b.y,BW,BH);});
    ctx.fillStyle='#fff';ctx.fillRect(Math.max(0,Math.min(W-PW,px)),H-PH-5,PW,PH);
    ctx.fillStyle='#ffd700';ctx.beginPath();ctx.arc(bx,by,BALL,0,Math.PI*2);ctx.fill();
  }
  function loop(){
    if(!started){draw();window._gameLoop=requestAnimationFrame(loop);return;}
    bx+=dx;by+=dy;
    const realPx=Math.max(0,Math.min(W-PW,px));
    if(bx<BALL||bx>W-BALL)dx=-dx;
    if(by<BALL)dy=-dy;
    if(by>H-PH-5-BALL&&bx>realPx&&bx<realPx+PW&&dy>0)dy=-dy;
    if(by>H){lives--;document.getElementById('bo-score').textContent=`Score: ${score} | Lives: ${lives}`;if(lives<=0){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='24px sans-serif';ctx.textAlign='center';ctx.fillText('Game Over',W/2,H/2);ctx.font='18px sans-serif';ctx.fillText('Score: '+score,W/2,H/2+30);return;}bx=180;by=220;dx=3;dy=-3;started=false;}
    for(const b of bricks){if(!b.alive)continue;if(bx>b.x-BALL&&bx<b.x+BW+BALL&&by>b.y-BALL&&by<b.y+BH+BALL){b.alive=false;score+=10;dy=-dy;document.getElementById('bo-score').textContent=`Score: ${score} | Lives: ${lives}`;break;}}
    if(bricks.every(b=>!b.alive)){ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='24px sans-serif';ctx.textAlign='center';ctx.fillText('🏆 You Win!',W/2,H/2);return;}
    draw();window._gameLoop=requestAnimationFrame(loop);
  }
  window._gameLoop=requestAnimationFrame(loop);
}

/* TETRIS */
function gameTetris(){
  const canvas=document.createElement('canvas');canvas.width=160;canvas.height=320;canvas.style.borderRadius='8px';canvas.style.border='2px solid #ddd';
  const scoreDiv=document.createElement('div');scoreDiv.id='tet-score';scoreDiv.style.cssText='font-size:16px;margin-bottom:8px;';scoreDiv.textContent='Score: 0';
  gw().innerHTML=`<h2>🟦 Tetris Lite</h2>`;
  gw().appendChild(scoreDiv);gw().appendChild(canvas);
  gw().innerHTML+=`<div style="font-size:13px;color:#888;margin-top:6px;">Arrow keys or swipe</div>`;
  const ctx=canvas.getContext('2d');
  const W=8,H=16,SZ=20;
  const PIECES=[[[1,1,1,1]],[[1,1],[1,1]],[[0,1,0],[1,1,1]],[[1,0],[1,0],[1,1]],[[0,1],[0,1],[1,1]],[[0,1,1],[1,1,0]],[[1,1,0],[0,1,1]]];
  const COLORS=['#00bcd4','#ffc107','#9c27b0','#2196f3','#ff9800','#4caf50','#ef5350'];
  let board=Array.from({length:H},()=>Array(W).fill(0));
  let score=0,piece=null,px=0,py=0,pc=0;
  function spawn(){pc=rnd(0,6);piece=PIECES[pc];px=Math.floor((W-piece[0].length)/2);py=0;if(!valid())endGame();}
  function valid(p=piece,x=px,y=py){return p.every((row,r)=>row.every((c,col)=>!c||(y+r>=0&&y+r<H&&x+col>=0&&x+col<W&&!board[y+r][x+col])));}
  function place(){piece.forEach((row,r)=>row.forEach((c,col)=>{if(c)board[py+r][px+col]=pc+1;}));let lines=0;board=board.filter(r=>{if(r.some(c=>!c))return true;lines++;return false;});while(board.length<H)board.unshift(Array(W).fill(0));score+=lines*100;document.getElementById('tet-score').textContent='Score: '+score;spawn();}
  function draw(){ctx.fillStyle='#1a1d2e';ctx.fillRect(0,0,W*SZ,H*SZ);board.forEach((row,r)=>row.forEach((c,col)=>{if(c){ctx.fillStyle=COLORS[c-1];ctx.fillRect(col*SZ+1,r*SZ+1,SZ-2,SZ-2);}}));piece&&piece.forEach((row,r)=>row.forEach((c,col)=>{if(c){ctx.fillStyle=COLORS[pc];ctx.fillRect((px+col)*SZ+1,(py+r)*SZ+1,SZ-2,SZ-2);}}));}
  function endGame(){cancelAnimationFrame(window._gameLoop);window._gameLoop=null;ctx.fillStyle='rgba(0,0,0,.6)';ctx.fillRect(0,0,W*SZ,H*SZ);ctx.fillStyle='#fff';ctx.font='16px sans-serif';ctx.textAlign='center';ctx.fillText('Game Over',W*SZ/2,H*SZ/2);ctx.fillText('Score: '+score,W*SZ/2,H*SZ/2+24);}
  function step(){if(!piece)spawn();if(!valid(piece,px,py+1)){place();}else py++;draw();window._gameLoop=setTimeout(step,400);}
  document.addEventListener('keydown',function tetKey(e){
    if(!document.getElementById('gw'))return document.removeEventListener('keydown',tetKey);
    if(e.key==='ArrowLeft'&&valid(piece,px-1,py))px--;
    if(e.key==='ArrowRight'&&valid(piece,px+1,py))px++;
    if(e.key==='ArrowDown'&&valid(piece,px,py+1))py++;
    if(e.key==='ArrowUp'){const rot=piece[0].map((_,i)=>piece.map(r=>r[i]).reverse());if(valid(rot,px,py))piece=rot;}
    draw();
  });
  let touch0=null;
  canvas.addEventListener('touchstart',e=>{touch0=e.touches[0];},{passive:true});
  canvas.addEventListener('touchend',e=>{if(!touch0)return;const dx=e.changedTouches[0].clientX-touch0.clientX,dy=e.changedTouches[0].clientY-touch0.clientY;if(Math.abs(dx)>Math.abs(dy)){if(dx>20&&valid(piece,px+1,py))px++;if(dx<-20&&valid(piece,px-1,py))px--;}else if(dy>20&&valid(piece,px,py+1))py++;else{const rot=piece[0].map((_,i)=>piece.map(r=>r[i]).reverse());if(valid(rot,px,py))piece=rot;}draw();},{passive:true});
  spawn();step();
}

/* CROSSWORD LITE */
function gameCrossword(){
  const grid=[
    ['S','U','N','_','_'],
    ['_','_','I','_','_'],
    ['M','O','O','N','_'],
    ['_','_','N','_','_'],
    ['S','T','A','R','S'],
  ];
  const answers=[['SUN',0,0,'across'],['MOON',2,0,'across'],['STARS',4,0,'across'],['NOON',0,2,'down'],['NION','_','_','_']];
  const clues={across:['1. Center of our solar system (3)','3. Earth\'s natural satellite (4)','5. Celestial points of light (5)'],down:['2. Midday (4)']};
  gw().innerHTML=`<h2>📰 Crossword Lite</h2><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:3px;max-width:200px;margin:12px auto;">${grid.flat().map((c,i)=>`<div style="width:34px;height:34px;border-radius:4px;display:flex;align-items:center;justify-content:center;font-size:16px;font-weight:700;background:${c==='_'?'#1a1d2e':'#f0f0f0'};color:${c==='_'?'transparent':'#1a1d2e'};border:1px solid #ddd;">${c==='_'?'.':c}</div>`).join('')}</div><div style="text-align:left;max-width:280px;margin:0 auto;"><b>Across:</b><br>${clues.across.join('<br>')}<br><b>Down:</b><br>${clues.down.join('<br>')}</div><p style="font-size:14px;color:#888;">Can you solve these space-themed clues?</p><button class="g-btn" onclick="gameCrossword()">New Puzzle</button>`;
}

/* CHESS PUZZLES */
const CP=[
  {fen:'rnb1kbnr/pppp1ppp/8/4p3/6Pq/5P2/PPPPP2P/RNBQKBNR',move:'Qxf2#',desc:'Fool\'s Mate — Qxf2#'},
  {fen:'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R',move:'Bxf7+',desc:'Scholar\'s Attack — Bxf7+'},
  {fen:'8/8/8/8/8/k7/8/KQ6',move:'Qb2#',desc:'King+Queen vs King — Qb2#'},
];
function gameChess(){
  let idx=0;
  function show(){
    const p=CP[idx];
    gw().innerHTML=`<h2>♟️ Chess Puzzles</h2><div style="font-size:14px;color:#888;margin-bottom:8px;">Puzzle ${idx+1}/${CP.length}</div><div style="font-size:16px;margin:12px;">${p.desc}</div><p>What is the best move?</p><input id="ch-in" type="text" style="font-size:18px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:120px;" placeholder="e.g. Qxf2#"><button class="g-btn" style="display:block;margin:10px auto 0;" onclick="chCheck('${p.move}')">Submit</button><button class="g-btn" style="background:#95a5a6;" onclick="chReveal('${p.move}')">Show Answer</button><div id="ch-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  }
  window._chShow=show;show();
}
function chCheck(ans){
  const v=document.getElementById('ch-in').value.trim();
  const msg=document.getElementById('ch-msg');
  if(v===ans){msg.style.color='#2ecc71';msg.textContent='✅ Correct!';setTimeout(()=>{window._chIdx=(window._chIdx||0)+1;if(window._chIdx>=CP.length){gw().innerHTML=`<h2>♟️ Chess Puzzles</h2><div style="font-size:48px;">🏆</div><div>All puzzles solved!</div><button class="g-btn" onclick="gameChess()">Play Again</button>`;}else{CP_idx++;window._chShow();}},800);}
  else{msg.style.color='#e74c3c';msg.textContent='❌ Try again!';}
}
function chReveal(ans){document.getElementById('ch-msg').style.color='#888';document.getElementById('ch-msg').textContent='Answer: '+ans;}

/* SUDOKU */
const SUDOKU_PUZZLES=[
  {puzzle:'530070000600195000098000060800060003400803001700020006060000280000419005000080079',solution:'534678912672195348198342567859761423426853791713924856961537284287419635345286179'},
];
function gameSudoku(){
  const {puzzle,solution}=SUDOKU_PUZZLES[0];
  const cells=puzzle.split('');
  window._sudGrid=[...cells];window._sudSol=solution;window._sudFixed=cells.map(c=>c!=='0');
  renderSudoku();
}
function renderSudoku(){
  const g=window._sudGrid;const fixed=window._sudFixed;
  gw().innerHTML=`<h2>🔲 Sudoku</h2><div style="display:grid;grid-template-columns:repeat(9,1fr);gap:2px;max-width:300px;margin:0 auto;background:#888;padding:2px;border-radius:4px;">${g.map((v,i)=>{
    const r=Math.floor(i/9),c=i%9;
    const border='border-right:'+(c===2||c===5?'2px solid #888':'none')+';border-bottom:'+(r===2||r===5?'2px solid #888':'none');
    return`<input type="text" maxlength="1" value="${v==='0'?'':v}" ${fixed[i]?'readonly':''}  oninput="sudInput(${i},this.value)" style="width:30px;height:30px;border:none;text-align:center;font-size:16px;font-weight:${fixed[i]?700:400};color:${fixed[i]?'#1a1d2e':'#2196f3'};background:${fixed[i]?'#e0e0e0':'#fff'};cursor:${fixed[i]?'default':'pointer'};${border};">`;
  }).join('')}</div><button class="g-btn" style="margin-top:12px;" onclick="checkSudoku()">Check</button><div id="sud-msg" style="margin-top:10px;font-size:16px;min-height:24px;"></div>`;
}
function sudInput(i,v){const n=parseInt(v);if(n>=1&&n<=9)window._sudGrid[i]=String(n);else window._sudGrid[i]='0';}
function checkSudoku(){
  const correct=window._sudGrid.join('')===window._sudSol;
  const msg=document.getElementById('sud-msg');
  msg.style.color=correct?'#2ecc71':'#e74c3c';
  msg.textContent=correct?'🏆 Perfect! Sudoku Solved!':'❌ Not quite right. Keep trying!';
}

/* CIPHER DECODE */
const CI_PHRASES=[['KHOOR','HELLO',3],['ZRUOG','WORLD',3],['DQQHB','DANNY',3],['FRGH','CODE',3],['VHFUHW','SECRET',3],['PDJLF','MAGIC',3]];
function gameCipher(){
  window._ciIdx=0;window._ciScore=0;window._ciPhrases=shuffle(CI_PHRASES);nextCipher();
}
function nextCipher(){
  if(window._ciIdx>=window._ciPhrases.length){gw().innerHTML=`<h2>🔐 Cipher Decode</h2><div style="font-size:48px;">🏆</div><div style="font-size:24px;">Score: ${window._ciScore}/${window._ciPhrases.length}</div><button class="g-btn" style="margin-top:12px;" onclick="gameCipher()">Play Again</button>`;return;}
  const [encoded,decoded,shift]=window._ciPhrases[window._ciIdx];
  window._ciAnswer=decoded;
  gw().innerHTML=`<h2>🔐 Cipher Decode</h2><div style="font-size:14px;color:#888;">Phrase ${window._ciIdx+1}/${window._ciPhrases.length} | Score:${window._ciScore}</div><p>Caesar cipher (shift -${shift}). Decode:</p><div style="font-size:42px;font-weight:900;letter-spacing:8px;margin:16px;color:#3498db;">${encoded}</div><input id="ci-in" type="text" style="font-size:20px;padding:8px;border:2px solid #ccc;border-radius:8px;text-align:center;width:160px;text-transform:uppercase;" onkeydown="if(event.key==='Enter')ciCheck()"><button class="g-btn" style="display:block;margin:10px auto 0;" onclick="ciCheck()">Decode</button><div id="ci-msg" style="margin-top:10px;min-height:24px;font-size:16px;"></div>`;
  document.getElementById('ci-in').focus();
}
function ciCheck(){
  const v=document.getElementById('ci-in').value.toUpperCase().trim();
  const msg=document.getElementById('ci-msg');
  if(v===window._ciAnswer){window._ciScore++;msg.style.color='#2ecc71';msg.textContent='✅ Correct!';window._ciIdx++;setTimeout(nextCipher,800);}
  else{msg.style.color='#e74c3c';msg.textContent='❌ Try again!';}
}

/* LIGHTS OUT */
function gameLightsOut(){window._loGrid=Array(25).fill(0).map(()=>Math.random()>0.5?1:0);window._loMoves=0;renderLO();}
function renderLO(){
  const g=window._loGrid;
  gw().innerHTML=`<h2>💡 Lights Out</h2><div style="font-size:14px;color:#888;margin-bottom:8px;">Moves: ${window._loMoves} — Turn off all lights!</div><div style="display:grid;grid-template-columns:repeat(5,1fr);gap:6px;max-width:230px;margin:0 auto;">${g.map((v,i)=>`<div onclick="loClick(${i})" style="width:38px;height:38px;border-radius:8px;background:${v?'#ffc107':'#424242'};cursor:pointer;box-shadow:${v?'0 0 12px rgba(255,193,7,.8)':'none'};transition:all .2s;"></div>`).join('')}</div>${g.every(v=>!v)?`<div style="font-size:28px;margin-top:16px;">🏆 You Win in ${window._loMoves} moves!</div>`:`<button class="g-btn" style="margin-top:12px;" onclick="gameLightsOut()">Reset</button>`}`;
}
function loClick(i){
  const g=window._loGrid;window._loMoves++;
  const r=Math.floor(i/5),c=i%5;
  [[0,0],[-1,0],[1,0],[0,-1],[0,1]].forEach(([dr,dc])=>{const nr=r+dr,nc=c+dc;if(nr>=0&&nr<5&&nc>=0&&nc<5)g[nr*5+nc]^=1;});
  renderLO();
}

/* FLAPPY BIRD */
function gameFlappy(){
  const canvas=document.createElement('canvas');canvas.width=320;canvas.height=400;canvas.style.borderRadius='8px';canvas.style.border='2px solid #ddd';
  gw().innerHTML=`<h2>🐦 Flappy Bird</h2><div id="fl-score" style="font-size:16px;margin-bottom:8px;">Score: 0</div>`;
  gw().appendChild(canvas);
  gw().innerHTML+=`<div style="font-size:13px;color:#888;margin-top:6px;">Tap/Space to flap</div>`;
  const ctx=canvas.getContext('2d');
  const W=320,H=400,GAP=120,PW=50;
  let by=180,bvy=0,pipes=[],score=0,frames=0,started=false,dead=false;
  function addPipe(){const top=rnd(50,H-GAP-50);pipes.push({x:W,top});}
  function flap(){if(!started){started=true;}if(!dead)bvy=-7;}
  document.addEventListener('keydown',function flKey(e){if(e.code==='Space'){e.preventDefault();flap();}if(!document.getElementById('gw'))document.removeEventListener('keydown',flKey);});
  canvas.addEventListener('click',flap);canvas.addEventListener('touchstart',e=>{e.preventDefault();flap();},{passive:false});
  function draw(){
    ctx.fillStyle='#87ceeb';ctx.fillRect(0,0,W,H);
    ctx.fillStyle='#2ecc71';
    pipes.forEach(p=>{ctx.fillRect(p.x,0,PW,p.top);ctx.fillRect(p.x,p.top+GAP,PW,H-p.top-GAP);});
    ctx.fillStyle='#f39c12';ctx.beginPath();ctx.arc(60,by,14,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#1a1d2e';ctx.font='16px sans-serif';ctx.fillText('Score: '+score,10,20);
    if(!started){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='22px sans-serif';ctx.textAlign='center';ctx.fillText('Tap to Start',W/2,H/2);}
    if(dead){ctx.fillStyle='rgba(0,0,0,.5)';ctx.fillRect(0,0,W,H);ctx.fillStyle='#fff';ctx.font='24px sans-serif';ctx.textAlign='center';ctx.fillText('Game Over',W/2,H/2-20);ctx.font='18px sans-serif';ctx.fillText('Score: '+score,W/2,H/2+10);ctx.fillText('Tap to restart',W/2,H/2+40);}
  }
  function loop(){
    if(dead){draw();return;}
    if(started){
      bvy+=0.4;by+=bvy;
      frames++;if(frames%90===0)addPipe();
      pipes.forEach(p=>p.x-=2);pipes=pipes.filter(p=>p.x>-PW);
      for(const p of pipes){
        if(p.x<74&&p.x+PW>46&&(by-14<p.top||by+14>p.top+GAP)){dead=true;canvas.onclick=()=>{gameFlappy();};break;}
        if(p.x+PW<60&&!p.scored){p.scored=true;score++;document.getElementById('fl-score').textContent='Score: '+score;}
      }
      if(by>H-14||by<14)dead=true;
    }
    draw();window._gameLoop=requestAnimationFrame(loop);
  }
  window._gameLoop=requestAnimationFrame(loop);
}

/* ═══════════════════════════════════════════
   GAME DISPATCH MAP
═══════════════════════════════════════════ */
const GAMES={
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

function gameWordsearch(){
  const WORDS=['BRAIN','CHESS','SNAKE','PIXEL','QUEST','NINJA','LEVEL','SCORE','TETRIS','PUZZLE'];
  const N=10;let grid=Array.from({length:N},()=>Array(N).fill(''));
  const DIRS=[[0,1],[1,0],[1,1],[0,-1],[-1,0],[-1,-1],[1,-1],[-1,1]],placed=[];
  function place(w){
    const sd=[...DIRS].sort(()=>Math.random()-.5);
    for(let t=0;t<120;t++){const d=sd[t%8],r=rnd(0,N-1),c=rnd(0,N-1),pos=[];let ok=1;
      for(let i=0;i<w.length;i++){const nr=r+d[0]*i,nc=c+d[1]*i;
        if(nr<0||nr>=N||nc<0||nc>=N||grid[nr][nc]&&grid[nr][nc]!==w[i]){ok=0;break;}pos.push([nr,nc]);}
      if(ok){pos.forEach(([r2,c2],i)=>grid[r2][c2]=w[i]);placed.push({word:w,pos});return;}}
  }
  WORDS.forEach(place);
  const ABC='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for(let r=0;r<N;r++)for(let c=0;c<N;c++)if(!grid[r][c])grid[r][c]=ABC[rnd(0,25)];
  let found=new Set(),sel=false,s0=null,selC=[];
  function rndr(){
    const g=gw();if(!g)return;
    g.innerHTML='<h2>🔠 Word Search</h2><p style="color:var(--muted);font-size:13px;margin-bottom:10px;">Drag to select hidden words</p>'
    +'<div style="display:grid;grid-template-columns:repeat('+N+',1fr);gap:2px;max-width:300px;margin:0 auto 12px;">'
    +grid.flat().map((l,i)=>{const r=Math.floor(i/N),c2=i%N;
      const iF=[...found].some(fw=>{const p=placed.find(x=>x.word===fw);return p&&p.pos.some(([pr,pc])=>pr===r&&pc===c2);});
      const iS=selC.some(([sr,sc])=>sr===r&&sc===c2);
      return'<div class="wsc" data-r="'+r+'" data-c="'+c2+'" style="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;border-radius:5px;cursor:pointer;user-select:none;background:'+(iF?'#bbf7d0':iS?'#c7d2fe':'#f8faff')+';color:'+(iF?'#15803d':iS?'#4338ca':'#1e293b')+';border:1px solid '+(iF?'#86efac':iS?'#a5b4fc':'#e2e8f0')+'">'+l+'</div>';
    }).join('')+'</div>'
    +'<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:8px;">'
    +WORDS.map(w=>'<span style="font-size:11px;font-weight:700;padding:2px 8px;border-radius:99px;background:'+(found.has(w)?'#dcfce7':'#f1f5f9')+';color:'+(found.has(w)?'#15803d':'#64748b')+';text-decoration:'+(found.has(w)?'line-through':'none')+'">'+w+'</span>').join('')+'</div>'
    +(found.size===WORDS.length?'<div class="result-box">🎉 All found! <button class="btn" onclick="gameWordsearch()" style="margin-top:8px;">Play Again</button></div>':'');
    g.querySelectorAll('.wsc').forEach(el=>{
      el.onmousedown=()=>{sel=true;s0=[+el.dataset.r,+el.dataset.c];selC=[[+el.dataset.r,+el.dataset.c]];rndr();};
      el.onmouseover=()=>{if(!sel)return;mv(+el.dataset.r,+el.dataset.c);};
      el.ontouchstart=e=>{e.preventDefault();sel=true;s0=[+el.dataset.r,+el.dataset.c];selC=[[+el.dataset.r,+el.dataset.c]];rndr();};
      el.ontouchmove=e=>{e.preventDefault();const t=document.elementFromPoint(e.touches[0].clientX,e.touches[0].clientY);if(t&&t.dataset.r)mv(+t.dataset.r,+t.dataset.c);};
    });
    document.onmouseup=document.ontouchend=()=>{if(!sel)return;sel=false;chk();};
  }
  function mv(r2,c2){if(!s0)return;const[r1,c1]=s0,dr=r2-r1,dc=c2-c1,st=Math.max(Math.abs(dr),Math.abs(dc));if(!st)return;const sr=Math.round(dr/st),sc=Math.round(dc/st);if(Math.abs(sr)>1||Math.abs(sc)>1)return;selC=[];for(let i=0;i<=st;i++)selC.push([r1+sr*i,c1+sc*i]);rndr();}
  function chk(){for(const pw of placed){if(found.has(pw.word))continue;const s=JSON.stringify(selC);if(s===JSON.stringify(pw.pos)||s===JSON.stringify([...pw.pos].reverse())){found.add(pw.word);earnXP(20,'Word Search');break;}}selC=[];rndr();}
  rndr();
}

GAMES.wordsearch=gameWordsearch;

console.log('GameNest World game.js loaded - all functions ready!');
