/**
 * Escrita progressiva: o parágrafo aparece letra a letra, com um cursor,
 * como se estivesse sendo escrito à mão.
 *
 * A estrutura final volta a ser texto puro (bom para seleção e leitores de tela).
 * Sem JS ou com prefers-reduced-motion o texto simplesmente já está lá.
 */
export function initWrite(){
  const el=document.querySelector('[data-write]');
  if(!el) return;

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce||!('IntersectionObserver' in window)||!el.textContent.trim()) return;

  const original=el.textContent.replace(/\s+/g,' ').trim();

  const sr=document.createElement('span');
  sr.className='write__sr';
  sr.textContent=original;

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
    chars.appendChild(w);
    if(wi<words.length-1) chars.appendChild(document.createTextNode(' '));
  });

  el.textContent='';
  el.append(sr,chars);
  el.classList.add('is-prepared');

  const caret=document.createElement('span');
  caret.className='write-caret';
  caret.setAttribute('aria-hidden','true');
  el.appendChild(caret);

  let started=false;
  const start=()=>{
    if(started) return;
    started=true;
    io.disconnect();
    type();
  };

  const io=new IntersectionObserver(entries=>{
    entries.forEach(entry=>{ if(entry.isIntersecting) start(); });
  },{threshold:.25});
  io.observe(el);

  // Rede de segurança: se o observer não disparar, começa assim que estiver visível.
  // Se a seção já foi ultrapassada (salto por âncora), mostra o texto sem animação.
  const fallback=()=>{
    if(started) return;
    const r=el.getBoundingClientRect();
    if(r.top<window.innerHeight&&r.bottom>0){
      start();
    }else if(r.bottom<=0){
      finish(false);
      window.removeEventListener('scroll',fallback);
    }
  };
  window.addEventListener('scroll',fallback,{passive:true});
  setTimeout(fallback,1200);

  function placeCaret(index){
    const target=letters[Math.min(index,letters.length-1)];
    if(!target) return;
    caret.style.transform=`translate(${target.offsetLeft+target.offsetWidth}px,${target.offsetTop}px)`;
  }

  function type(){
    const total=letters.length;
    const duration=Math.min(2600,Math.max(1100,total*6.5));
    const t0=performance.now();
    let shown=0;
    placeCaret(0);

    const step=now=>{
      const progress=Math.min(1,(now-t0)/duration);
      const target=Math.ceil(progress*total);
      while(shown<target){
        letters[shown].classList.add('on');
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

  let finished=false;
  function finish(animateCaret){
    if(finished) return;
    finished=true;
    if(animateCaret){
      caret.style.opacity='0';
      caret.style.transition='opacity .35s linear';
    }
    setTimeout(()=>{
      caret.remove();
      // volta ao texto puro: seleção natural e sem 300 elementos no DOM
      el.classList.remove('is-prepared');
      el.textContent=original;
    },animateCaret?420:0);
  }
}
