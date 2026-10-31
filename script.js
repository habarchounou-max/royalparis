// ===== V5 : catalogue, fiches 3D, pointures, panier =====
(()=>{'use strict';const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],WA='https://wa.me/23565070303',F=n=>n.toLocaleString('fr-FR')+' FCFA';
const K={g:'Gadama et service',o:'Oud et encens',p:'Parfums et attars',s:'Sandales homme',c:'Cuisine et thé'};
const D={g:'Pots à couvercle et plateau, pensés pour recevoir avec élégance. Finitions brillantes ou satinées.',o:'Pour parfumer la maison à l’oud, au quotidien comme à l’arrivée des invités.',p:'Un flacon travaillé et un parfum concentré, à découvrir et à sentir en boutique.',s:'Cuir souple et semelle confort, à enfiler en un geste. Choisissez votre pointure.',c:'Pour servir le thé et le café, ou ranger la cuisine avec soin.'};
const P=[
['gadama-dore','g','Gadama doré, 3 pots',90000,100000],['gadama-argent','g','Gadama argenté, 3 pots',90000,100000],['gadama-argent-mat','g','Gadama argent mat, 3 pots',90000,100000],['gadama-dore-4','g','Gadama doré, 4 pots',115000],['gadama-argent-mat-4','g','Gadama argent mat, 4 pots',115000],
['service-6-pots-dore','g','Service 6 pots, plateau doré',65000,75000],['service-6-pots-argent','g','Service 6 pots, finition argent',68000],['service-6-verres-or','g','Service 6 verres dorés',72000],['service-4-pots-verre','g','Coffret 4 pots, verre et or',48000],['service-4-pots-ambre','g','Coffret 4 pots ambré',52000],
['moukhabar-main','o','Moukhabar électrique',12500,13000],['moukhabar-rond','o','Moukhabar design noir',18000],['oud-sultana','o','Coffret Oud Sultana',28000,32000],['diffuseur-voiture','o','Diffuseur d’encens pour voiture',9000],
['sandale-noire','s','Sandale cuir noir',18000],['sandale-noir-marron','s','Sandale cuir noir et marron',22000,25000],['sandale-beige','s','Sandale cuir beige',22000],['sandale-camel','s','Sandale cuir camel, bandes croisées',24000],['sandale-scratch-marron','s','Sandale scratch marron',15000],
['diamond-oudh','p','Diamond Oudh',22000,25000],['purple-oudh','p','Purple Oudh',16000,18000],['durrat-al-aroos','p','Durrat Al Aroos, huile parfumée',19000],['most-wanted','p','Most Wanted',17500],['aseel','p','Aseel',15000],['galaxy','p','Galaxy',14000],['signature','p','Signature',13500],['icon','p','Icon',13000],['rush','p','Rush',12500],['flora','p','Flora',12500],['blue-infinite','p','Blue Infinite',12500],['dana','p','Dana',12000],['white-fresh','p','White Fresh',12000],['paris-pure','p','Paris Pure',11500],['savage','p','Savage',11500],['moon-spark','p','Moon Spark',11000],['aqua-kiss','p','Aqua Kiss',11000],['rave-now','p','Rave Now',10500],['c7','p','C 7',10500],['cool-water','p','Cool Water',10000],['musk-herb','p','Musk Herb 47',9500],['attar-ehsan','p','Attar Ehsan',7500],
['thermos-noir-or','c','Duo de thermos noir et or',38000],['thermos-exco-duo','c','Duo de thermos blanc',36000,40000],['thermos-blanc-or','c','Thermos blanc et or',21000],['set-cafe-moka','c','Set café moka et plateau',45000],['bocaux-bambou-gourmand','c','Trio de bocaux garnis',17000],['bocaux-bambou-verre','c','Trio de bocaux, couvercle bambou',15000]
].map(([i,c,n,p,o])=>({i,c,n,p,o}));
const B=Object.fromEntries(P.map(p=>[p.i,p])),src=i=>`assets/p/${i}.webp`,SZ=[39,40,41,42,43,44,45];
let f=document.body.dataset.c||new URLSearchParams(location.search).get('c')||'all',q='',so='',zs=null,cart=[];try{cart=JSON.parse(localStorage.getItem('rp5')||'[]').filter(x=>B[x.i])}catch(e){}
let cur=[],cid='',mx=0,fav=[];try{fav=JSON.parse(localStorage.getItem('rpf')||'[]').filter(x=>B[x])}catch(e){}
const FE=['service-6-pots-dore','sandale-camel','galaxy','moukhabar-rond','thermos-noir-or','diamond-oudh','sandale-noir-marron','oud-sultana'];const pr=p=>`<span class="pr2">${F(p.p)}${p.o?` <s>${F(p.o)}</s>`:''}</span>`;
function grid(){const G=$('#grid');if(!G)return;let l=G.dataset.lim?FE.map(i=>B[i]):P.filter(p=>(f==='all'||p.c===f||(f==='fav'&&fav.includes(p.i)))&&(!mx||p.p<=mx)&&p.n.toLowerCase().includes(q));if(so)l=[...l].sort((a,b)=>so==='a'?a.p-b.p:b.p-a.p);cur=l.map(p=>p.i);
if($('#cnt'))$('#cnt').textContent=l.length+' article'+(l.length>1?'s':'');
$('#grid').innerHTML=l.map((p,n)=>`<article class="pc" style="--n:${Math.min(n,14)}"><button class="im" data-o="${p.i}" aria-label="Voir ${p.n}"><img src="${src(p.i)}" alt="${p.n}" width="450" height="450" loading="lazy"></button>${p.o?`<span class="tag">−${Math.round((1-p.p/p.o)*100)} %</span>`:''}<button class="hrt" type="button" data-h="${p.i}" aria-pressed="${fav.includes(p.i)}" aria-label="Favori : ${p.n}">${HS}</button><div class="bd"><h3>${p.n}</h3><small>${K[p.c]}</small>${pr(p)}<button class="ad" data-${p.c==='s'?'o':'a'}="${p.i}" aria-label="${p.c==='s'?'Choisir la pointure':'Ajouter'} : ${p.n}">+</button></div></article>`).join('')||(f==='fav'?'<p class="none">Aucun favori pour le moment : touchez le cœur sur un article.</p>':'<p class="none">Aucun article ne correspond.</p>')}
const chips=()=>{const E=$('#chips');if(E)E.innerHTML=[['all','Tout'],['fav','Favoris'+(fav.length?' · '+fav.length:'')],...Object.entries(K)].map(([k,v])=>`<button class="chip2" data-f="${k}" aria-pressed="${k===f}">${v}</button>`).join('')};
const pf=P.filter(p=>p.c==='p'),row=a=>[...a,...a].map(p=>`<button data-o="${p.i}" aria-label="${p.n}"><img src="${src(p.i)}" alt="" loading="lazy"></button>`).join('');
if($('#wall'))$('#wall').innerHTML=`<div>${row(pf.slice(0,11))}</div><div>${row(pf.slice(11))}</div>`;
if($('.hz-track'))$('.hz-track').innerHTML=['service-6-pots-dore','sandale-camel','galaxy','gadama-dore','oud-sultana','thermos-noir-or','diamond-oudh','sandale-noir-marron'].map((i,k)=>`<figure><img src="${src(i)}" alt="${B[i].n}" loading="lazy"><figcaption><b>0${k+1}</b>${B[i].n}<small>${F(B[i].p)}</small></figcaption></figure>`).join('');
const md=$('#md'),cl=$('#cl'),cart$=$('.cart'),ov=$('.ov'),lb=x=>B[x.i].n+(x.z?' — pointure '+x.z:'');
const HS='<svg viewBox="0 0 24 24" width="19" height="19" aria-hidden="true"><path d="M12 20.5s-7.5-4.7-9.4-9.3C1.3 8 3.1 4.8 6.4 4.8c2.1 0 3.7 1.2 5.6 3.1 1.9-1.9 3.5-3.1 5.6-3.1 3.3 0 5.1 3.2 3.8 6.4-1.9 4.6-9.4 9.3-9.4 9.3z"/></svg>',SHS='<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.6 10.5l6.8-4M8.6 13.5l6.8 4"/></svg>';
const lst=()=>cur.includes(cid)?cur:P.map(x=>x.i);
function step(d){const L=lst();open(L[(L.indexOf(cid)+d+L.length)%L.length])}
function fv(i){const k=fav.indexOf(i);k<0?fav.push(i):fav.splice(k,1);try{localStorage.setItem('rpf',JSON.stringify(fav))}catch(e){}
document.querySelectorAll('[data-h="'+i+'"]').forEach(x=>{x.setAttribute('aria-pressed',fav.includes(i));x.classList.remove('pop');void x.offsetWidth;x.classList.add('pop')});chips();if(f==='fav')grid()}
async function share(i){const u=new URL('boutique.html?p='+i,location.href).href;if(navigator.share){try{await navigator.share({title:B[i].n+' — ETS Royal Paris',url:u})}catch(e){}return}
try{await navigator.clipboard.writeText(u);window.RPT&&RPT('Lien copié')}catch(e){prompt('Copiez ce lien',u)}}
function open(i){const p=B[i];zs=null;cid=i;const L=lst(),k=L.indexOf(i),sim=P.filter(x=>x.c===p.c&&x.i!==i).slice(0,6);
md.innerHTML=`<div class="mg"><div class="st"><img id="mi" src="${src(i)}" alt="${p.n}"><button class="mnv p" type="button" data-nav="-1" aria-label="Article précédent">‹</button><button class="mnv n" type="button" data-nav="1" aria-label="Article suivant">›</button><span class="mct">${k+1} / ${L.length}</span></div><div class="mi"><button class="x mx" data-x aria-label="Fermer">✕</button><small>${K[p.c]}</small><h3>${p.n}</h3>${pr(p)}<p>${D[p.c]}</p>${p.c==='s'?`<div class="zs" role="group" aria-label="Pointure">${SZ.map(z=>`<button class="zb" data-z="${z}" aria-pressed="false">${z}</button>`).join('')}</div>`:''}<div class="mrow"><button class="btn b1" data-add="${i}">Ajouter à ma sélection</button><button class="ib2 hrt2" type="button" data-h="${i}" aria-pressed="${fav.includes(i)}" aria-label="Favori">${HS}</button><button class="ib2" type="button" data-sh="${i}" aria-label="Partager">${SHS}</button></div><a class="btn b2" target="_blank" rel="noopener noreferrer" href="${WA}?text=${encodeURIComponent('Bonjour ETS Royal Paris, je suis intéressé(e) par : '+p.n)}">Demander sur WhatsApp</a><div class="sim"><h4>Dans le même univers</h4><div>${sim.map(x=>`<button type="button" data-o="${x.i}" aria-label="${x.n}"><img src="${src(x.i)}" alt="" loading="lazy"></button>`).join('')}</div></div></div></div>`;if(!md.open)md.showModal();md.scrollTop=0}
md.addEventListener('pointermove',e=>{const m=$('#mi');if(!m)return;const r=m.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;m.style.transform=`perspective(900px) rotateY(${x*10}deg) rotateX(${-y*10}deg) scale(1.04)`});
md.addEventListener('pointerleave',()=>{const m=$('#mi');if(m)m.style.transform=''});
function extra(){const m=document.querySelector('.seg [aria-pressed=true]'),v=s=>(($(s)||{}).value||'').trim(),l=m&&m.dataset.m==='l';let s='\nMode : '+(l?'Livraison (à confirmer)':'Retrait en boutique');if(l&&v('#cadr'))s+='\nAdresse : '+v('#cadr');if(v('#cname'))s+='\nNom : '+v('#cname');if(v('#cnote'))s+='\nNote : '+v('#cnote');return s}
function draw(){cl.textContent='';let tot=0,n=0;cart.forEach((x,k)=>{const p=B[x.i];tot+=p.p*x.q;n+=x.q;const li=document.createElement('li');li.innerHTML='<b></b><span></span><div class="q"><button type="button" aria-label="Moins">−</button><em></em><button type="button" aria-label="Plus">+</button></div>';
li.querySelector('b').textContent=lb(x);li.querySelector('span').textContent=F(p.p*x.q);li.querySelector('em').textContent=x.q;const[m,pl]=li.querySelectorAll('.q button');m.onclick=()=>{if(--x.q<1)cart.splice(k,1);draw()};pl.onclick=()=>{x.q++;draw()};cl.appendChild(li)});
$('#cn').textContent=n;$('#ce').style.display=cart.length?'none':'block';$('#ctot').textContent=F(tot);const o=$('#cord');o.classList.toggle('off',!cart.length);
o.href=WA+'?text='+encodeURIComponent('Bonjour ETS Royal Paris, je souhaite commander :\n'+cart.map(x=>`- ${x.q} × ${lb(x)} (${F(B[x.i].p)})`).join('\n')+'\nTotal indicatif : '+F(tot)+extra()+'\nMerci de confirmer la disponibilité.');
try{localStorage.setItem('rp5',JSON.stringify(cart))}catch(e){}}
function add(i,z=null){const e=cart.find(x=>x.i===i&&x.z===z);e?e.q++:cart.push({i,z,q:1});draw();const c=$('.cartbtn');c.classList.add('pop');setTimeout(()=>c.classList.remove('pop'),250)}
const drawer=o=>{cart$.classList.toggle('on',o);ov.classList.toggle('on',o);cart$.setAttribute('aria-hidden',!o)};
document.addEventListener('click',e=>{const t=e.target,g=s=>t.closest(s);let b;
if(t===md||g('[data-x]'))md.close();
else if(b=g('[data-z]')){zs=b.dataset.z;$$('.zb').forEach(x=>x.setAttribute('aria-pressed',x===b))}
else if(b=g('[data-nav]')){step(+b.dataset.nav)}else if(b=g('[data-h]')){fv(b.dataset.h)}else if(b=g('[data-sh]')){share(b.dataset.sh)}else if(b=g('[data-add]')){const i=b.dataset.add;if(B[i].c==='s'&&!zs){b.textContent='Choisissez une pointure';setTimeout(()=>b.textContent='Ajouter à ma sélection',1600);return}add(i,zs);b.textContent='✓ Ajouté';setTimeout(()=>md.close(),650)}
else if(b=g('[data-o]'))open(b.dataset.o);
else if(b=g('[data-a]')){add(b.dataset.a);b.textContent='✓';setTimeout(()=>b.textContent='+',1000)}
else if(b=g('.add')){const id=b.dataset.id==='gadama'?'gadama-'+(($('.sw.on')||{dataset:{k:'dore'}}).dataset.k):b.dataset.id;add(id);b.textContent='✓ Ajouté';setTimeout(()=>b.textContent='+ Ma sélection',1400)}
else if(b=g('[data-f]')){f=b.dataset.f;chips();grid()}
else if(g('.cartbtn'))drawer(true);else if(g('.cart .x')||t===ov)drawer(false)});
addEventListener('keydown',e=>e.key==='Escape'&&drawer(false));
if($('#q'))$('#q').oninput=e=>{q=e.target.value.trim().toLowerCase();grid()};if($('#so'))$('#so').onchange=e=>{so=e.target.value;grid()};
if($('#bg'))$('#bg').oninput=e=>{const v=+e.target.value;mx=v>=+e.target.max?0:v;$('#bv').textContent=mx?F(mx):'Tout';grid()};
if($('#cf'))$('#cf').onsubmit=e=>{e.preventDefault();const d=new FormData(e.target);window.open(WA+'?text='+encodeURIComponent('Bonjour ETS Royal Paris, je suis '+d.get('n')+'.\n'+d.get('m')),'_blank','noopener')};
const cu=$('.cur');document.addEventListener('pointerover',e=>cu&&cu.classList.toggle('big',!!e.target.closest('a,button,.pc')));
document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.pc');if(c){const r=c.getBoundingClientRect();c.style.setProperty('--x',e.clientX-r.left+'px');c.style.setProperty('--y',e.clientY-r.top+'px')}},{passive:true});
if(f!=='all'&&f!=='fav'&&!K[f])f='all';chips();grid();draw();dispatchEvent(new Event('resize'));window.RP={P,B,K,src,F,open,FE,draw};{const pp=new URLSearchParams(location.search).get('p');if(pp&&B[pp])setTimeout(()=>open(pp),400)}
})();

(()=>{const $=s=>document.querySelector(s),r=document.documentElement;
$('#th')?.addEventListener('click',()=>{const d=(r.dataset.t||(matchMedia('(prefers-color-scheme:dark)').matches?'dark':'light'))==='dark'?'light':'dark';r.dataset.t=d;try{localStorage.rpt=d}catch(e){}});
const sw=[...document.querySelectorAll('.sw')];sw.forEach(b=>b.onclick=()=>{sw.forEach(x=>{x.classList.toggle('on',x===b);x.setAttribute('aria-pressed',x===b)});const i=$('#gImg');i.src=b.dataset.img;i.alt='Gadama '+b.dataset.name;$('#gBuy').href='https://wa.me/23565070303?text='+encodeURIComponent('Bonjour ETS Royal Paris, je suis intéressé(e) par le Gadama '+b.dataset.name+'.')});
if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('sw.js').catch(()=>{});
})();

/* ===== V8.1 : barre de progression, halo, magnétisme, chiffres animés, WhatsApp flottant ===== */
(()=>{const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
const pg=document.createElement('div');pg.id='prog';pg.setAttribute('aria-hidden','true');document.body.appendChild(pg);
const nav=$('.nav');
const up=()=>{const h=document.documentElement,m=h.scrollHeight-innerHeight;pg.style.transform=`scaleX(${m>0?Math.min(1,scrollY/m):0})`;nav&&nav.classList.toggle('scrolled',scrollY>24)};
addEventListener('scroll',up,{passive:true});addEventListener('resize',up);up();
const fab=document.createElement('a');fab.className='fab';fab.target='_blank';fab.rel='noopener noreferrer';fab.href='https://wa.me/23565070303?text='+encodeURIComponent('Bonjour ETS Royal Paris, je souhaite des renseignements.');
fab.innerHTML='<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg><span>WhatsApp</span>';document.body.appendChild(fab);
if(matchMedia('(hover:hover) and (pointer:fine)').matches&&!RM){
 const g=document.createElement('div');g.className='glow';g.setAttribute('aria-hidden','true');document.body.appendChild(g);
 let tx=0,ty=0,x=0,y=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;g.classList.add('on')},{passive:true});
 (function l(){x+=(tx-x)*.12;y+=(ty-y)*.12;g.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(l)})();
 document.addEventListener('pointermove',e=>{const b=e.target.closest&&e.target.closest('.btn,.cartbtn');document.querySelectorAll('.btn.mg2').forEach(o=>{if(o!==b){o.style.translate='';o.classList.remove('mg2')}});
  if(b){const r=b.getBoundingClientRect();b.classList.add('mg2');b.style.translate=`${((e.clientX-r.left)/r.width-.5)*10}px ${((e.clientY-r.top)/r.height-.5)*8}px`}},{passive:true});
 const cols=$('.cols');if(cols)addEventListener('pointermove',e=>{cols.style.translate=`${(e.clientX/innerWidth-.5)*-18}px ${(e.clientY/innerHeight-.5)*-14}px`},{passive:true});
}
const ns=[...document.querySelectorAll('[data-n]')];
if(ns.length){const io=new IntersectionObserver(es=>es.forEach(en=>{if(!en.isIntersecting)return;io.unobserve(en.target);const el=en.target,n=+el.dataset.n;if(RM){el.textContent=n;return}const t0=performance.now();(function s(t){const k=Math.min(1,(t-t0)/1400),e=1-Math.pow(1-k,4);el.textContent=Math.round(n*e);if(k<1)requestAnimationFrame(s)})(t0)}),{threshold:.6});ns.forEach(n=>{n.textContent='0';io.observe(n)})}
})();

/* ===== V8.2 : intro, fond WebGL, curseur, scroll épinglé, cartes 3D, Spotlight, confettis ===== */
(()=>{'use strict';
const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches,FINE=matchMedia('(hover:hover) and (pointer:fine)').matches,root=document.documentElement;

/* intro (une fois par session) */
try{if(!RM&&!sessionStorage.rpi){sessionStorage.rpi='1';const d=document.createElement('div');d.className='intro';d.setAttribute('aria-hidden','true');d.innerHTML='<b>Royal<i>.</i>Paris</b>';document.body.appendChild(d);setTimeout(()=>d.remove(),2300)}}catch(e){}

/* fond WebGL */
(()=>{const c=document.createElement('canvas');c.id='gl';c.setAttribute('aria-hidden','true');
const gl=c.getContext('webgl',{antialias:false,alpha:false,powerPreference:'low-power'});if(!gl)return;
const vs='attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}';
const fs=`precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;uniform float d;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<4;i++){s+=a*n(p);p*=2.02;a*=.5;}return s;}
void main(){vec2 uv=gl_FragCoord.xy/r;float ar=r.x/r.y;vec2 p=uv*vec2(ar,1.)*1.7;vec2 mm=m*vec2(ar,1.)*1.7;float dm=distance(p,mm);
p+=(p-mm)*.35*exp(-dm*2.2);
float q=fbm(p+vec2(t*.05,t*.03));float w=fbm(p+3.*q+vec2(-t*.04,t*.06));
vec3 vi=vec3(.42,.24,1.),pk=vec3(1.,.32,.5),li=vec3(.82,1.,.2),or=vec3(1.,.6,.2);
vec3 c=mix(vi,pk,smoothstep(.2,.8,w));c=mix(c,or,smoothstep(.55,.95,q)*.75);c=mix(c,li,smoothstep(.62,1.,w*q*2.1)*.85);
vec3 base=mix(vec3(.985,.978,.95),vec3(.075,.055,.15),d);
float k=mix(.25,.23,d)+.2*exp(-dm*2.6);
gl_FragColor=vec4(mix(base,c,k),1.);}`;
const sh=(t,s)=>{const o=gl.createShader(t);gl.shaderSource(o,s);gl.compileShader(o);return gl.getShaderParameter(o,gl.COMPILE_STATUS)?o:null};
const v=sh(gl.VERTEX_SHADER,vs),f=sh(gl.FRAGMENT_SHADER,fs);if(!v||!f)return;
const p=gl.createProgram();gl.attachShader(p,v);gl.attachShader(p,f);gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))return;gl.useProgram(p);
const b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
const a=gl.getAttribLocation(p,'a');gl.enableVertexAttribArray(a);gl.vertexAttribPointer(a,2,gl.FLOAT,false,0,0);
const U=n=>gl.getUniformLocation(p,n),ur=U('r'),ut=U('t'),um=U('m'),ud=U('d');
const SC=.5;const size=()=>{c.width=Math.max(2,Math.round(innerWidth*SC));c.height=Math.max(2,Math.round(innerHeight*SC));gl.viewport(0,0,c.width,c.height)};
const dark=()=>root.dataset.t?root.dataset.t==='dark':matchMedia('(prefers-color-scheme:dark)').matches;
let mx=.7,my=.6,tx=.7,ty=.6,dd=dark()?1:0,t0=performance.now(),run=true;
addEventListener('pointermove',e=>{tx=e.clientX/innerWidth;ty=1-e.clientY/innerHeight},{passive:true});
addEventListener('resize',()=>{size();if(RM)draw(2)});size();
const draw=t=>{mx+=(tx-mx)*.06;my+=(ty-my)*.06;dd+=((dark()?1:0)-dd)*.08;gl.uniform2f(ur,c.width,c.height);gl.uniform1f(ut,t);gl.uniform2f(um,mx,my);gl.uniform1f(ud,dd);gl.drawArrays(gl.TRIANGLES,0,3)};
document.body.prepend(c);root.classList.add('gl');
if(RM){draw(2);new MutationObserver(()=>draw(2)).observe(root,{attributes:true});return}
document.addEventListener('visibilitychange',()=>{run=!document.hidden;if(run)requestAnimationFrame(loop)});
function loop(now){if(!run)return;draw((now-t0)/1000+4);requestAnimationFrame(loop)}requestAnimationFrame(loop);
})();

/* curseur intelligent */
if(FINE&&!RM){const r=document.createElement('div');r.className='curs';r.setAttribute('aria-hidden','true');document.body.appendChild(r);
let x=0,y=0,tx=0,ty=0;addEventListener('pointermove',e=>{tx=e.clientX;ty=e.clientY;r.classList.add('on')},{passive:true});
document.addEventListener('pointerleave',()=>r.classList.remove('on'));
(function l(){x+=(tx-x)*.2;y+=(ty-y)*.2;r.style.transform=`translate(${x}px,${y}px)`;requestAnimationFrame(l)})();
document.addEventListener('pointerover',e=>{const t=e.target.closest?e.target:null;if(!t)return;let L='';
if(t.closest('.ad[data-a],[data-add],.add'))L='+';else if(t.closest('.ad[data-o],.im,.pc,.wall button,.hz-track figure'))L='Voir';else if(t.closest('.pan,.tile'))L='Go';
r.dataset.l=L;r.classList.toggle('lab',!!L);r.classList.toggle('h',!L&&!!t.closest('a,button,.chip2,select,input'))})}

/* scroll épinglé : défilement horizontal des univers */
(()=>{const hs=$('#hs');if(!hs)return;const tr=hs.querySelector('.hs-track'),bar=hs.querySelector('.hs-bar'),pans=[...hs.querySelectorAll('.pan')];
const mq=matchMedia('(min-width:1025px) and (prefers-reduced-motion:no-preference)');let tick=false;
const upd=()=>{tick=false;if(!mq.matches){tr.style.transform='';pans.forEach(p=>p.style.removeProperty('--px'));return}
const total=hs.offsetHeight-innerHeight,p=Math.max(0,Math.min(1,-hs.getBoundingClientRect().top/total)),max=Math.max(0,tr.scrollWidth-innerWidth);
tr.style.transform=`translate3d(${-p*max}px,0,0)`;hs.style.setProperty('--p',p);
pans.forEach(el=>{const rc=el.getBoundingClientRect();el.style.setProperty('--px',((rc.left+rc.width/2-innerWidth/2)*-.06).toFixed(1)+'px')})};
const rq=()=>{if(!tick){tick=true;requestAnimationFrame(upd)}};addEventListener('scroll',rq,{passive:true});addEventListener('resize',rq);mq.addEventListener?.('change',rq);upd()})();

/* cartes 3D + reflet holographique */
if(FINE&&!RM){document.addEventListener('pointermove',e=>{const c=e.target.closest&&e.target.closest('.pc');if(!c)return;const r=c.getBoundingClientRect(),px=(e.clientX-r.left)/r.width,py=(e.clientY-r.top)/r.height;
c.style.setProperty('--ry',((px-.5)*10).toFixed(2)+'deg');c.style.setProperty('--rx',((.5-py)*10).toFixed(2)+'deg');c.style.setProperty('--bx',(px*100).toFixed(0)+'%')},{passive:true});
document.addEventListener('pointerout',e=>{const c=e.target.closest&&e.target.closest('.pc');if(c&&!c.contains(e.relatedTarget)){c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')}})}

/* confettis à l'ajout */
const COL=['#c6ff2e','#ff4f7b','#7c4dff','#ff9d3a','#4dd0ff'];
function burst(cx,cy){for(let i=0;i<22;i++){const e=document.createElement('i');const w=6+Math.random()*6;
e.style.cssText=`position:fixed;left:${cx}px;top:${cy}px;width:${w}px;height:${w*1.6}px;background:${COL[i%5]};border-radius:2px;z-index:400;pointer-events:none`;document.body.appendChild(e);
const a=Math.random()*Math.PI*2,v=70+Math.random()*130;e.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${Math.cos(a)*v}px,${Math.sin(a)*v+60}px) rotate(${Math.random()*720-360}deg)`,opacity:0}],{duration:800+Math.random()*500,easing:'cubic-bezier(.1,.8,.3,1)'}).onfinish=()=>e.remove()}}
if(!RM)document.addEventListener('click',e=>{const b=e.target.closest('.ad[data-a],[data-add],.add');if(!b)return;
if(b.matches('[data-add]')){if(/pointure/i.test(b.textContent))return;setTimeout(()=>{const c=$('.cartbtn');if(c){const r=c.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)}},680)}
else{const r=b.getBoundingClientRect();burst(r.left+r.width/2,r.top+r.height/2)}});

/* recherche Spotlight (Ctrl/⌘ + K, « / », ou le bouton) */
(()=>{const R=window.RP;if(!R)return;const nav=$('.nav'),th=$('#th');if(!nav)return;
const nrm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
const btn=document.createElement('button');btn.type='button';btn.className='sbtn';btn.setAttribute('aria-label','Rechercher un article');
btn.innerHTML='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><span>Rechercher</span><kbd>Ctrl K</kbd>';
nav.insertBefore(btn,th||nav.querySelector('.cartbtn'));
const dg=document.createElement('dialog');dg.className='sp';dg.setAttribute('aria-label','Recherche');
dg.innerHTML='<div class="sp-in"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg><input type="search" placeholder="Chercher un article…" autocomplete="off" aria-label="Rechercher"><kbd>Esc</kbd></div><ul id="spl" role="listbox"></ul><div class="sp-ft"><span>↑ ↓ naviguer</span><span>↵ ouvrir</span><span>Esc fermer</span></div>';
document.body.appendChild(dg);const inp=dg.querySelector('input'),ul=dg.querySelector('#spl');let items=[],sel=0;
const row=(p,k)=>`<li class="r${k===sel?' on':''}" role="option" data-i="${p.i}"><img src="${R.src(p.i)}" alt="" loading="lazy"><div><b>${p.n}</b><small>${R.K[p.c]}</small></div><span>${R.F(p.p)}</span></li>`;
function render(){const q=nrm(inp.value.trim());
if(q){items=R.P.filter(p=>nrm(p.n).includes(q)||nrm(R.K[p.c]).includes(q)).slice(0,8);ul.innerHTML=items.length?items.map(row).join(''):'<li class="none">Aucun résultat. <a href="boutique.html" style="color:var(--ac);font-weight:650">Voir toute la boutique</a></li>'}
else{items=R.FE.map(i=>R.B[i]);ul.innerHTML='<h4>Coups de cœur</h4>'+items.map(row).join('')}}
const mark=()=>[...ul.querySelectorAll('.r')].forEach((li,k)=>{li.classList.toggle('on',k===sel);if(k===sel)li.scrollIntoView({block:'nearest'})});
const go=i=>{dg.close();R.open(i)};
const openSp=()=>{if(dg.open)return;sel=0;inp.value='';render();dg.showModal();inp.focus()};
btn.onclick=openSp;
addEventListener('keydown',e=>{const t=e.target,typing=t&&/INPUT|TEXTAREA|SELECT/.test(t.tagName);
if((e.key==='k'||e.key==='K')&&(e.ctrlKey||e.metaKey)){e.preventDefault();dg.open?dg.close():openSp()}
else if(e.key==='/'&&!typing&&!dg.open){e.preventDefault();openSp()}});
inp.addEventListener('input',()=>{sel=0;render()});
inp.addEventListener('keydown',e=>{const n=items.length;if(!n)return;
if(e.key==='ArrowDown'){e.preventDefault();sel=(sel+1)%n;mark()}else if(e.key==='ArrowUp'){e.preventDefault();sel=(sel-1+n)%n;mark()}else if(e.key==='Enter'){e.preventDefault();go(items[sel].i)}});
ul.addEventListener('click',e=>{const li=e.target.closest('.r');if(li)go(li.dataset.i)});
ul.addEventListener('pointermove',e=>{const li=e.target.closest('.r');if(li){const k=[...ul.querySelectorAll('.r')].indexOf(li);if(k!==sel){sel=k;mark()}}});
dg.addEventListener('click',e=>{if(e.target===dg)dg.close()});
})();
})();

/* ===== V8.3 : notification, panier enrichi, retour en haut, installation, swipe, élan des bandes ===== */
(()=>{'use strict';const $=s=>document.querySelector(s),RM=matchMedia('(prefers-reduced-motion:reduce)').matches;
/* notification */
let tt;const tw=document.createElement('div');tw.className='toast';tw.setAttribute('role','status');tw.setAttribute('aria-live','polite');document.body.appendChild(tw);
window.RPT=(m,act)=>{tw.innerHTML='<span></span>'+(act?'<button type="button">'+act+'</button>':'');tw.firstChild.textContent=m;if(act)tw.querySelector('button').onclick=()=>{tw.classList.remove('on');$('.cartbtn')?.click()};tw.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>tw.classList.remove('on'),3200)};
const cn=$('#cn');if(cn){let last=+cn.textContent||0;new MutationObserver(()=>{const n=+cn.textContent||0;if(n>last)RPT('✓ Ajouté · '+n+' article'+(n>1?'s':'')+' dans votre sélection','Voir');last=n}).observe(cn,{childList:true,characterData:true,subtree:true})}
/* panier : mode, nom mémorisé, mise à jour du message WhatsApp */
try{const n=localStorage.getItem('rpn');if(n&&$('#cname'))$('#cname').value=n}catch(e){}
document.addEventListener('click',e=>{const b=e.target.closest('.seg button');if(!b)return;document.querySelectorAll('.seg button').forEach(x=>x.setAttribute('aria-pressed',x===b));const a=$('#cadr');if(a)a.hidden=b.dataset.m!=='l';window.RP&&RP.draw()});
document.addEventListener('input',e=>{if(!e.target.closest('.cf2'))return;if(e.target.id==='cname')try{localStorage.setItem('rpn',e.target.value)}catch(x){}window.RP&&RP.draw()});
/* retour en haut avec anneau de progression */
const tp=document.createElement('button');tp.type='button';tp.className='top';tp.setAttribute('aria-label','Retour en haut');
tp.innerHTML='<svg viewBox="0 0 48 48" width="52" height="52" aria-hidden="true"><circle cx="24" cy="24" r="21" class="bg"/><circle cx="24" cy="24" r="21" class="fg"/></svg><svg class="ar" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
document.body.appendChild(tp);const fg=tp.querySelector('.fg');
tp.onclick=()=>scrollTo({top:0,behavior:RM?'auto':'smooth'});
let vel=0,ly=scrollY,anims=[];
const upd=()=>{const m=document.documentElement.scrollHeight-innerHeight,p=m>0?Math.min(1,scrollY/m):0;fg.style.strokeDashoffset=132*(1-p);tp.classList.toggle('on',scrollY>700)};
addEventListener('scroll',upd,{passive:true});upd();
/* les bandes défilantes accélèrent avec le scroll */
if(!RM){setTimeout(()=>{anims=document.getAnimations().filter(a=>a.animationName==='mq'&&a.effect&&a.effect.target&&a.effect.target.closest('.ticker'))},400);
let rate=1;(function l(){const y=scrollY;vel+=(Math.abs(y-ly)-vel)*.12;ly=y;const r=1+Math.min(vel,70)*.16;rate+=(r-rate)*.12;if(anims.length)anims.forEach(a=>a.playbackRate=rate);requestAnimationFrame(l)})()}
/* chargement doux des images du catalogue */
const g=$('#grid');if(g)new MutationObserver(()=>g.querySelectorAll('.im img').forEach(i=>{if(!i.complete&&!i.dataset.s){i.dataset.s=1;i.classList.add('ld0');i.addEventListener('load',()=>i.classList.remove('ld0'),{once:true});i.addEventListener('error',()=>i.classList.remove('ld0'),{once:true})}})).observe(g,{childList:true});
/* fiche : flèches clavier + glisser */
const md=$('#md');if(md){addEventListener('keydown',e=>{if(!md.open)return;if(e.key==='ArrowRight')md.querySelector('[data-nav="1"]')?.click();else if(e.key==='ArrowLeft')md.querySelector('[data-nav="-1"]')?.click()});
let sx=0,sy=0,on=false;md.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse'||!e.target.closest('.st'))return;on=true;sx=e.clientX;sy=e.clientY});
md.addEventListener('pointerup',e=>{if(!on)return;on=false;const dx=e.clientX-sx,dy=e.clientY-sy;if(Math.abs(dx)>60&&Math.abs(dx)>Math.abs(dy)*1.5)md.querySelector(dx<0?'[data-nav="1"]':'[data-nav="-1"]')?.click()})}
/* installation de l'application */
let dp;addEventListener('beforeinstallprompt',e=>{e.preventDefault();dp=e;const f=$('.fb');if(!f||$('.inst'))return;const b=document.createElement('button');b.type='button';b.className='inst';b.textContent='Installer l’application';b.onclick=async()=>{dp.prompt();await dp.userChoice;b.remove()};f.prepend(b)});
})();
