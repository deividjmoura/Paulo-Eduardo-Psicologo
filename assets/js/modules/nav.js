export function initNav(){
  const nav=document.getElementById('nav');
  const burger=document.getElementById('burger');
  const panel=document.getElementById('nav-panel');
  if(!nav||!burger||!panel) return;

  const links=[...panel.querySelectorAll('a')];
  let lastFocus=null;

  function open(){
    lastFocus=document.activeElement;
    nav.classList.add('is-open');
    panel.classList.add('is-open');
    burger.setAttribute('aria-expanded','true');
    document.body.classList.add('is-locked');
    panel.hidden=false;
    links[0]?.focus();
  }
  function close(){
    nav.classList.remove('is-open');
    panel.classList.remove('is-open');
    burger.setAttribute('aria-expanded','false');
    document.body.classList.remove('is-locked');
    panel.hidden=true;
    lastFocus?.focus();
  }
  burger.addEventListener('click',()=>{
    const openState=burger.getAttribute('aria-expanded')==='true';
    openState?close():open();
  });
  links.forEach(a=>a.addEventListener('click',close));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&nav.classList.contains('is-open')) close();
  });

  const onScroll=()=>{
    nav.classList.toggle('is-scrolled',window.scrollY>40);
  };
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  const sections=[...document.querySelectorAll('main section[id]')];
  const navLinks=[...document.querySelectorAll('.nav__links a')];
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(en=>{
        if(en.isIntersecting){
          const id=en.target.id;
          navLinks.forEach(l=>{
            l.toggleAttribute('aria-current',l.getAttribute('href')==='#'+id);
          });
        }
      });
    },{rootMargin:'-40% 0px -50% 0px',threshold:0});
    sections.forEach(s=>io.observe(s));
  }
}
