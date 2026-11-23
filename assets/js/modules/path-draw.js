export function initPathDraw(){
  const path=document.querySelector('.tcc__path');
  if(!path) return;
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(reduce){path.classList.add('is-drawn');return}
  if(!('IntersectionObserver' in window)){path.classList.add('is-drawn');return}
  const io=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        path.classList.add('is-drawn');
        io.unobserve(path);
      }
    });
  },{threshold:0.2});
  io.observe(path);
}
