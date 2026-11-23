export async function initPosts(){
  const track=document.querySelector('[data-posts-track]');
  if(!track) return;

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl=s=>{
    try{
      const u=new URL(s,location.href);
      return /^https?:$/.test(u.protocol)?u.href:'#';
    }catch{return '#'}
  };

  const iconIg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  const iconFb='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 9h3V6h-3c-2.2 0-3 1.3-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9z"/></svg>';

  try{
    const res=await fetch('data/posts.json',{cache:'no-cache'});
    if(!res.ok) return;
    const posts=await res.json();
    if(!Array.isArray(posts)||!posts.length) return;

    track.innerHTML=posts.map((p,i)=>{
      const isFb=p.rede==='facebook';
      const label=isFb?'Facebook':'Instagram';
      const img=p.imagem?`<div class="carousel__thumb"><img src="${esc(p.imagem)}" alt="" loading="${i===0?'eager':'lazy'}" decoding="async" width="640" height="640"></div>`:'';
      return `<a class="carousel__card" href="${esc(safeUrl(p.url))}" target="_blank" rel="noopener noreferrer">
        ${img}
        <div class="carousel__body">
          <div class="carousel__meta">${isFb?iconFb:iconIg} ${label}</div>
          <p class="carousel__text">${esc(p.legenda)}</p>
        </div>
      </a>`;
    }).join('');

    document.dispatchEvent(new CustomEvent('posts:updated'));
  }catch{
    /* mantém os cards estáticos do HTML */
  }
}
