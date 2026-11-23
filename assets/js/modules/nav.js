export function initNav(){
  const nav=document.getElementById('nav');
  const burger=document.getElementById('burger');
  const panel=document.getElementById('nav-panel');
  if(!nav||!burger||!panel) return;

  const links=[...panel.querySelectorAll('a')];
  const isOpen=()=>nav.classList.contains('is-open');
  let lastFocus=null;

  function open(){
    if(isOpen()) return;
    lastFocus=document.activeElement;
    panel.removeAttribute('inert');
    panel.inert=false;
    nav.classList.add('is-open');
    panel.classList.add('is-open');
    burger.setAttribute('aria-expanded','true');
    burger.setAttribute('aria-label','Fechar menu');
    document.body.classList.add('is-locked');
    requestAnimationFrame(()=>links[0]?.focus());
  }

  function close(restoreFocus=true){
    if(!isOpen()) return;
    nav.classList.remove('is-open');
    panel.classList.remove('is-open');
    panel.inert=true;
    burger.setAttribute('aria-expanded','false');
    burger.setAttribute('aria-label','Abrir menu');
    document.body.classList.remove('is-locked');
    if(restoreFocus) (lastFocus instanceof HTMLElement?lastFocus:burger).focus();
  }

  burger.addEventListener('click',()=>isOpen()?close():open());
  links.forEach(a=>a.addEventListener('click',()=>close(false)));

  document.addEventListener('keydown',e=>{
    if(!isOpen()) return;
    if(e.key==='Escape'){
      e.preventDefault();
      close();
      return;
    }
    if(e.key==='Tab'){
      // Mantém o foco dentro do menu enquanto ele está aberto.
      const focusables=[burger,...panel.querySelectorAll('a[href],button:not([disabled])')]
        .filter(el=>el.offsetParent!==null||el===burger);
      if(!focusables.length) return;
      const first=focusables[0];
      const last=focusables[focusables.length-1];
      if(e.shiftKey&&document.activeElement===first){
        e.preventDefault();last.focus();
      }else if(!e.shiftKey&&document.activeElement===last){
        e.preventDefault();first.focus();
      }
    }
  });

  // Em telas grandes o menu não existe: garante estado fechado.
  const desktop=window.matchMedia('(min-width:901px)');
  const onChange=()=>{ if(desktop.matches) close(false); };
  if(desktop.addEventListener) desktop.addEventListener('change',onChange);
  else desktop.addListener(onChange);

  const onScroll=()=>{
    nav.classList.toggle('is-scrolled',window.scrollY>40);
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // Destaca o link da seção visível.
  const sections=[...document.querySelectorAll('main section[id]')];
  const navLinks=[...document.querySelectorAll('.nav__links a')];
  if('IntersectionObserver' in window&&sections.length&&navLinks.length){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(!en.isIntersecting) return;
        const id=en.target.id;
        navLinks.forEach(l=>{
          if(l.getAttribute('href')==='#'+id) l.setAttribute('aria-current','true');
          else l.removeAttribute('aria-current');
        });
      });
    },{rootMargin:'-45% 0px -50% 0px',threshold:0});
    sections.forEach(s=>io.observe(s));
  }
}
