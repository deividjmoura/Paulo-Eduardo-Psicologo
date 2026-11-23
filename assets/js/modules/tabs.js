export function initTabs(){
  const root=document.querySelector('[data-tabs]');
  if(!root) return;
  const tabs=[...root.querySelectorAll('[role="tab"]')];
  const panels=[...root.querySelectorAll('[role="tabpanel"]')];

  function activate(idx){
    tabs.forEach((t,i)=>{
      const selected=i===idx;
      t.setAttribute('aria-selected',selected);
      t.tabIndex=selected?0:-1;
      panels[i]?.classList.toggle('is-active',selected);
      panels[i]?.toggleAttribute('hidden',!selected);
    });
    tabs[idx]?.focus();
  }

  tabs.forEach((tab,i)=>{
    tab.addEventListener('click',()=>activate(i));
    tab.addEventListener('keydown',e=>{
      let next=i;
      if(e.key==='ArrowRight'||e.key==='ArrowDown') next=(i+1)%tabs.length;
      else if(e.key==='ArrowLeft'||e.key==='ArrowUp') next=(i-1+tabs.length)%tabs.length;
      else if(e.key==='Home') next=0;
      else if(e.key==='End') next=tabs.length-1;
      else return;
      e.preventDefault();
      activate(next);
    });
  });
  activate(0);
}
