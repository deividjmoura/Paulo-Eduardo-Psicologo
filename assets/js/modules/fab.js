export function initFab(){
  const fab=document.getElementById('fab');
  const btn=document.getElementById('fab-btn');
  const sheet=document.getElementById('fab-sheet');
  if(!fab||!btn||!sheet) return;

  const isOpen=()=>fab.classList.contains('is-open');

  function close(restoreFocus=false){
    if(!isOpen()) return;
    fab.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
    btn.setAttribute('aria-label','Abrir contatos');
    if(restoreFocus||sheet.contains(document.activeElement)) btn.focus();
  }

  function open(){
    fab.classList.add('is-open');
    btn.setAttribute('aria-expanded','true');
    btn.setAttribute('aria-label','Fechar contatos');
    sheet.querySelector('a')?.focus();
  }

  btn.addEventListener('click',()=>isOpen()?close():open());
  sheet.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>close(false)));

  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'&&isOpen()){
      e.preventDefault();
      close(true);
    }
  });
  document.addEventListener('click',e=>{
    if(!fab.contains(e.target)) close();
  });

  // No primeiro ecrã o botão flutuante cobre os CTAs do hero;
  // ele aparece depois de rolar além da abertura.
  const hero=document.querySelector('.hero');
  if(hero&&'IntersectionObserver' in window){
    const io=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        fab.classList.toggle('is-hidden',entry.isIntersecting);
        if(entry.isIntersecting) close();
      });
    },{threshold:.12});
    io.observe(hero);
  }
}
