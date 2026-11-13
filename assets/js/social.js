(function(){
  var box=document.getElementById('posts');
  if(!box||!window.POSTS)return;
  var I={
    facebook:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>',
    instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'
  };
  var N={facebook:'Facebook',instagram:'Instagram'};
  function esc(s){var d=document.createElement('div');d.textContent=String(s||'');return d.innerHTML}
  function safeUrl(s){try{var u=new URL(s,location.href);return /^https?:$/.test(u.protocol)?u.href:'#'}catch(e){return '#'}}
  box.innerHTML=window.POSTS.map(function(p,i){
    var rede=N[p.rede]?p.rede:'instagram';
    var data=p.data?new Date(p.data+'T12:00:00'):null;
    var dataLabel=data&&!isNaN(data)?data.toLocaleDateString('pt-BR',{day:'numeric',month:'long'}):'';
    var media=p.imagem
      ?'<div class="thumb"><img src="/'+esc(p.imagem)+'" alt="Imagem da publicação" width="640" height="640" '+(i===0?'fetchpriority="high"':'')+'></div>'
      :'<div class="thumb '+rede+'" aria-hidden="true">'+I[rede]+'</div>';
    var reveal=i%2===0?'reveal-left':'reveal-right';
    return '<a class="post '+reveal+'" href="'+esc(safeUrl(p.url))+'" target="_blank" rel="noopener noreferrer">'+media+
      '<div class="post-c"><small>'+I[rede]+'<span>'+N[rede]+(dataLabel?' · '+dataLabel:'')+'</span></small><p>'+esc(p.texto)+'</p><span class="ver">Ver no '+N[rede]+'</span></div></a>';
  }).join('');

  box.querySelectorAll('.thumb img').forEach(function(img){
    img.addEventListener('error',function(){
      if(!img.dataset.fallback){
        img.dataset.fallback='1';
        var name=img.getAttribute('src').split('/').pop();
        img.src='https://raw.githubusercontent.com/deividjmoura/Paulo-Eduardo-Psicologo/main/assets/img/'+encodeURIComponent(name);
      }else{
        img.remove();
      }
    });
  });

  var cards=box.querySelectorAll('.post');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    },{threshold:.08,rootMargin:'0px 0px -12px 0px'});
    cards.forEach(function(card){io.observe(card)});
  }else{
    cards.forEach(function(card){card.classList.add('is-visible')});
  }
})();
