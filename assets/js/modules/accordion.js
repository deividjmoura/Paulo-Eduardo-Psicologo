export function initAccordion(){
  const root=document.querySelector('[data-accordion]');
  if(!root) return;
  const items=[...root.querySelectorAll('.acc__item')];
  if(!items.length) return;

  items.forEach((item,i)=>{
    const btn=item.querySelector('.acc__btn');
    const panel=item.querySelector('.acc__panel');
    if(!btn||!panel) return;

    const id='acc-panel-'+i;
    panel.id=id;
    btn.setAttribute('aria-controls',id);

    const isOpen=btn.getAttribute('aria-expanded')==='true';
    btn.setAttribute('aria-expanded',String(isOpen));
    panel.inert=!isOpen;

    btn.addEventListener('click',()=>{
      const open=btn.getAttribute('aria-expanded')==='true';
      items.forEach(other=>{
        const b=other.querySelector('.acc__btn');
        const p=other.querySelector('.acc__panel');
        if(!b||!p) return;
        // Fecha todos e depois reabre o clicado, se necessário.
        b.setAttribute('aria-expanded','false');
        p.inert=true;
      });
      if(!open){
        btn.setAttribute('aria-expanded','true');
        panel.inert=false;
      }
    });
  });
}
