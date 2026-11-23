/**
 * Escrita progressiva: o parágrafo aparece letra a letra, com um cursor,
 * como se estivesse sendo escrito à mão.
 *
 * O HTML original só é transformado quando o parágrafo entra de fato na
 * área visível da tela — antes disso (e sem JS, ou com prefers-reduced-motion)
 * ele é um parágrafo comum, com o texto inteiro e os espaços normais.
 * Ao terminar a animação, volta a ser texto puro.
 */
export function initWrite(){
  const el=document.querySelector('[data-write]');
  if(!el) return;

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)||!el.textContent.trim()) return;

  const original=el.textContent.replace(/\s+/g,' ').trim();

  let state=null;
  let started=false;

  // Evita que o parágrafo apareça pronto na borda inferior antes de animar,
  // mantendo o texto puro no DOM até entrar na área visível.
  el.classList.add('is-write-pending');

  const isComfortablyVisible=()=>{
    const r=el.getBoundingClientRect();
    const vh=window.innerHeight||document.documentElement.clientHeight;
    if(r.height<=0||vh<=0) return false;
    const visibleTop=Math.max(r.top,0);
    const visibleBottom=Math.min(r.bottom,vh*0.9);
    const visibleH=Math.max(0,visibleBottom-visibleTop);
    return (visibleH/r.height)>=0.28||(visibleH/vh)>=0.35||(r.top>=0&&r.top<vh*0.72);
  };

  let ticking=false;
  const onScroll=()=>{
    if(started||ticking) return;
    ticking=true;
    requestAnimationFrame(()=>{
      ticking=false;
      maybeStart();
    });
  };

  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) maybeStart();
    });
  },{threshold:[0,0.2,0.35],rootMargin:'0px 0px -10% 0px'});

  const cleanupWatchers=()=>{
    io.disconnect();
    window.removeEventListener('scroll',onScroll);
    document.removeEventListener('scroll',onScroll,true);
    window.removeEventListener('resize',onScroll);
    window.removeEventListener('hashchange',onScroll);
  };

  const maybeStart=()=>{
    if(started||!isComfortablyVisible()) return;
    cleanupWatchers();
    start();
  };

  io.observe(el);
  window.addEventListener('scroll',onScroll,{passive:true});
  document.addEventListener('scroll',onScroll,{passive:true,capture:true});
  window.addEventListener('resize',onScroll,{passive:true});
  window.addEventListener('hashchange',onScroll,{passive:true});
  maybeStart();

  function build(){
    const chars=document.createElement('span');
    chars.className='write__chars';
    chars.setAttribute('aria-hidden','true');

    const letters=[];
    original.split(' ').forEach((word,wi,words)=>{
      const w=document.createElement('span');
      w.className='w';
      [...word].forEach(char=>{
        const s=document.createElement('span');
        s.className='ch';
        s.textContent=char;
        w.appendChild(s);
        letters.push(s);
      });
      // o espaço vai dentro da palavra: extratotexto/extratores preservam a frase
      if(wi<words.length-1) w.appendChild(document.createTextNode(' '));
      chars.appendChild(w);
    });

    el.textContent='';
    el.appendChild(chars);
    el.setAttribute('aria-label',original);
    el.classList.remove('is-write-pending');
    el.classList.add('is-prepared');

    const caret=document.createElement('span');
    caret.className='write-caret';
    caret.setAttribute('aria-hidden','true');
    el.appendChild(caret);

    return {letters,caret};
  }

  function placeCaret(index){
    const {letters,caret}=state;
    const target=letters[Math.min(index,letters.length-1)];
    if(!target) return;
    const box=el.getBoundingClientRect();
    const rect=target.getBoundingClientRect();
    const x=rect.right-box.left;
    const y=rect.top-box.top+Math.max(0,(rect.height-(caret.offsetHeight||0))/2);
    caret.style.transform=`translate(${x}px,${y}px)`;
  }

  function finish(animateCaret){
    if(!state) return;
    const caret=state.caret;
    if(animateCaret){
      caret.style.opacity='0';
      caret.style.transition='opacity .35s linear';
    }
    setTimeout(()=>{
      caret.remove();
      el.classList.remove('is-prepared');
      el.removeAttribute('aria-label');
      el.textContent=original;
      state=null;
    },animateCaret?420:0);
  }

  function type(){
    const total=state.letters.length;
    const duration=Math.min(13000,Math.max(6400,total*52));
    const t0=performance.now();
    let shown=0;
    placeCaret(0);

    const step=now=>{
      const progress=Math.min(1,(now-t0)/duration);
      const target=Math.ceil(progress*total);
      while(shown<target&&shown<total){
        state.letters[shown].classList.add('on');
        shown++;
      }
      if(shown<total){
        placeCaret(shown);
        requestAnimationFrame(step);
      }else{
        placeCaret(total-1);
        finish(true);
      }
    };
    requestAnimationFrame(step);
  }

  function start(){
    if(started) return;
    started=true;
    state=build();
    type();
  }
}
