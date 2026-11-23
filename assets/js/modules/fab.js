export function initFab(){
  const fab=document.getElementById('fab');
  const btn=document.getElementById('fab-btn');
  const sheet=document.getElementById('fab-sheet');
  if(!fab||!btn||!sheet) return;

  function close(){
    fab.classList.remove('is-open');
    btn.setAttribute('aria-expanded','false');
  }
  function open(){
    fab.classList.add('is-open');
    btn.setAttribute('aria-expanded','true');
    sheet.querySelector('a')?.focus();
  }
  btn.addEventListener('click',()=>{
    fab.classList.contains('is-open')?close():open();
  });
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape') close();
  });
  document.addEventListener('click',e=>{
    if(!fab.contains(e.target)) close();
  });
}
