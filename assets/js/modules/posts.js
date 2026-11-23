export async function initPosts(){
  const track=document.querySelector('[data-posts-track]');
  if(!track) return;

  try{
    const res=await fetch('data/posts.json',{cache:'no-cache'});
    if(!res.ok) return;
    const posts=await res.json();
    if(!Array.isArray(posts)||!posts.length) return;

    const iconIg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
    const iconFb='<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 9h3V6h-3c-2.2 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z"/></svg>';

    track.innerHTML=posts.map(p=>{
      const icon=p.rede==='facebook'?iconFb:iconIg;
      const label=p.rede==='facebook'?'Facebook':'Instagram';
      return `<a class="carousel__card" href="${p.url}" target="_blank" rel="noopener noreferrer">
        <div class="carousel__thumb"><img src="${p.imagem}" alt="" loading="lazy" decoding="async" width="400" height="500"></div>
        <div class="carousel__body">
          <div class="carousel__meta">${icon} ${label}</div>
          <p class="carousel__text">${p.legenda}</p>
        </div>
      </a>`;
    }).join('');
  }catch(e){/* keep static fallback */}
}
