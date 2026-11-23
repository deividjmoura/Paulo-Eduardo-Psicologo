export function initCarousel(){
  const root=document.querySelector('[data-carousel]');
  if(!root) return;
  const track=root.querySelector('.carousel__track');
  const nav=root.querySelector('.carousel__nav');
  const prev=root.querySelector('[data-carousel-prev]');
  const next=root.querySelector('[data-carousel-next]');
  if(!track) return;

  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let ticking=false;

  function step(){
    const card=track.querySelector('.carousel__card');
    if(!card) return track.clientWidth;
    const gap=parseFloat(getComputedStyle(track).columnGap)||16;
    return card.getBoundingClientRect().width+gap;
  }

  function update(){
    const max=track.scrollWidth-track.clientWidth;
    const hasOverflow=max>2;
    if(nav){
      if(hasOverflow) nav.removeAttribute('hidden');
      else nav.setAttribute('hidden','');
    }
    if(prev) prev.disabled=!hasOverflow||track.scrollLeft<=2;
    if(next) next.disabled=!hasOverflow||track.scrollLeft>=max-2;
  }

  function onScroll(){
    if(ticking) return;
    ticking=true;
    requestAnimationFrame(()=>{update();ticking=false});
  }

  function scrollByCard(dir){
    track.scrollBy({left:dir*step(),behavior:reduce?'auto':'smooth'});
  }

  prev?.addEventListener('click',()=>scrollByCard(-1));
  next?.addEventListener('click',()=>scrollByCard(1));
  track.addEventListener('scroll',onScroll,{passive:true});
  window.addEventListener('resize',update,{passive:true});
  document.addEventListener('posts:updated',update);
  if('ResizeObserver' in window) new ResizeObserver(update).observe(track);

  update();
}
