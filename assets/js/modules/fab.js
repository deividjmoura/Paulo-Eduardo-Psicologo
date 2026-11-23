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

  // O botão flutuante some no hero (onde já há CTAs) e na seção de contato
  // (que repete WhatsApp e e-mail), para não cobrir conteúdo nem duplicar ações.
  if('IntersectionObserver' in window){
    const blockers=new Set();
    const sync=()=>{
      const hidden=blockers.size>0;
      fab.classList.toggle('is-hidden',hidden);
      if(hidden) close();
    };
    const watch=(el,key,opts)=>{
      if(!el) return;
      new IntersectionObserver(entries=>{
        entries.forEach(entry=>{
          if(entry.isIntersecting) blockers.add(key);
          else blockers.delete(key);
          sync();
        });
      },opts).observe(el);
    };
    watch(document.querySelector('.hero'),'hero',{threshold:.12});
    watch(document.getElementById('contato'),'contato',{threshold:.35});
    watch(document.querySelector('.footer'),'footer',{threshold:.05});
  }
}
