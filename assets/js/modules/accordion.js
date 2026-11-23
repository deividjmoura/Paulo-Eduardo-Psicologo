export function initAccordion(){
  const root=document.querySelector('[data-accordion]');
  if(!root) return;
  const items=[...root.querySelectorAll('.acc__item')];
  items.forEach((item,i)=>{
    const btn=item.querySelector('.acc__btn');
    const panel=item.querySelector('.acc__panel');
    if(!btn||!panel) return;
    const id='acc-panel-'+i;
    panel.id=id;
    btn.setAttribute('aria-controls',id);
    if(i===0){
      btn.setAttribute('aria-expanded','true');
    }else{
      btn.setAttribute('aria-expanded','false');
    }
    btn.addEventListener('click',()=>{
      const open=btn.getAttribute('aria-expanded')==='true';
      items.forEach(other=>{
        const b=other.querySelector('.acc__btn');
        if(b&&b!==btn) b.setAttribute('aria-expanded','false');
      });
      btn.setAttribute('aria-expanded',open?'false':'true');
    });
  });
}
