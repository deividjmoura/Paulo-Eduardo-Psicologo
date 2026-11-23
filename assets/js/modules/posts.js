export async function initPosts(){
  const grid=document.querySelector('[data-posts-grid]');
  if(!grid) return;

  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl=s=>{
    try{
      const u=new URL(s,location.href);
      return /^https?:$/.test(u.protocol)?u.href:'#';
    }catch{return '#'}
  };

  const iconIg='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>';
  const iconFb='<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06C2 17.08 5.66 21.24 10.44 22v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34V22C18.34 21.24 22 17.08 22 12.06z"/></svg>';

  try{
    const res=await fetch('data/posts.json',{cache:'no-cache'});
    if(!res.ok) return;
    const posts=await res.json();
    if(!Array.isArray(posts)||!posts.length) return;

    grid.innerHTML=posts.map((p,i)=>{
      const isFb=p.rede==='facebook';
      const label=isFb?'Facebook':'Instagram';
      const img=p.imagem?`<div class="post-card__thumb"><img src="${esc(p.imagem)}" alt="" loading="${i===0?'eager':'lazy'}" decoding="async" width="640" height="640"></div>`:'';
      return `<a class="post-card" href="${esc(safeUrl(p.url))}" target="_blank" rel="noopener noreferrer">
        ${img}
        <div class="post-card__body">
          <div class="post-card__meta">${isFb?iconFb:iconIg} ${label}</div>
          <p class="post-card__text">${esc(p.legenda)}</p>
        </div>
      </a>`;
    }).join('');
  }catch{
    /* mantém os cards estáticos do HTML */
  }
}
