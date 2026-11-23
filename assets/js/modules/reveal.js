export function initReveal(){
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const els=[...document.querySelectorAll('.reveal, .reveal-line')];
  if(reduce||!('IntersectionObserver' in window)){
    els.forEach(el=>el.classList.add('is-in'));
    return;
  }

  const show=el=>{
    if(el.classList.contains('is-in')) return false;
    el.classList.add('is-in');
    io.unobserve(el);
    return true;
  };

  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting) show(e.target); });
  },{threshold:0.12,rootMargin:'0px 0px -8% 0px'});

  els.forEach(el=>io.observe(el));

  // Rede de segurança: rolagem rápida (ou salto por âncora) pode passar
  // batido pelo observer. Tudo o que já chegou à viewport é revelado.
  let ticking=false;
  const sweep=()=>{
    ticking=false;
    const bottom=window.innerHeight*0.96;
    els.forEach(el=>{
      if(el.classList.contains('is-in')) return;
      const r=el.getBoundingClientRect();
      if(r.top<bottom) show(el);
    });
  };
  const queue=()=>{ if(!ticking){ticking=true;requestAnimationFrame(sweep);} };
  addEventListener('scroll',queue,{passive:true});
  addEventListener('resize',queue,{passive:true});
  addEventListener('hashchange',queue,{passive:true});
  sweep();
}
