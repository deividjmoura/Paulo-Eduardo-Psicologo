export function initCarousel(){
  const root=document.querySelector('[data-carousel]');
  if(!root) return;
  const track=root.querySelector('.carousel__track');
  const prev=root.querySelector('[data-carousel-prev]');
  const next=root.querySelector('[data-carousel-next]');
  if(!track) return;

  function scrollByCard(dir){
    const card=track.querySelector('.carousel__card');
    if(!card) return;
    const amount=card.getBoundingClientRect().width+16;
    track.scrollBy({left:dir*amount,behavior:'smooth'});
  }
  prev?.addEventListener('click',()=>scrollByCard(-1));
  next?.addEventListener('click',()=>scrollByCard(1));
}
