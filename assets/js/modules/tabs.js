export function initTabs(){
  const root=document.querySelector('[data-tabs]');
  if(!root) return;
  const tabs=[...root.querySelectorAll('[role="tab"]')];
  const panels=[...root.querySelectorAll('[role="tabpanel"]')];
  if(!tabs.length||!panels.length) return;

  tabs.forEach(tab=>{
    if(!tab.id) tab.id='tab-'+Math.random().toString(36).slice(2,8);
    const panel=panels.find(p=>p.id===tab.getAttribute('aria-controls'));
    if(panel) panel.setAttribute('aria-labelledby',tab.id);
  });

  function activate(idx,focus=true){
    tabs.forEach((t,i)=>{
      const selected=i===idx;
      t.setAttribute('aria-selected',String(selected));
      t.tabIndex=selected?0:-1;
      const p=panels[i];
      if(p){
        p.classList.toggle('is-active',selected);
        p.hidden=!selected;
        if(selected) p.removeAttribute('inert');
        else p.inert=true;
      }
    });
    if(focus) tabs[idx]?.focus();
  }

  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>activate(i,false));
    tab.addEventListener('keydown',e=>{
      let next=i;
      if(e.key==='ArrowRight'||e.key==='ArrowDown') next=(i+1)%tabs.length;
      else if(e.key==='ArrowLeft'||e.key==='ArrowUp') next=(i-1+tabs.length)%tabs.length;
      else if(e.key==='Home') next=0;
      else if(e.key==='End') next=tabs.length-1;
      else return;
      e.preventDefault();
      activate(next,true);
    });
  });

  // Sincroniza o estado inicial sem roubar o foco da página.
  const initial=tabs.findIndex(t=>t.getAttribute('aria-selected')==='true');
  activate(initial<0?0:initial,false);
}
