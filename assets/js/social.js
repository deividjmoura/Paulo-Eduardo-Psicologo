(function(){var box=document.getElementById('posts');if(!box||!window.POSTS)return;
var I={facebook:'<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14 8h3V4h-3a4 4 0 0 0-4 4v2H7v4h3v8h4v-8h3l1-4h-4V8z"/></svg>',
instagram:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>'};
var N={facebook:'Facebook',instagram:'Instagram'};
function esc(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}
box.innerHTML=window.POSTS.map(function(p){
var d=new Date(p.data+'T12:00:00').toLocaleDateString('pt-BR',{day:'numeric',month:'long'});
var th=p.imagem?'<div class="thumb" style="background-image:url(\''+encodeURI(p.imagem)+'\')" role="img" aria-label="Imagem do post"></div>':'<div class="thumb '+p.rede+'" aria-hidden="true">'+I[p.rede]+'</div>';
return'<a class="post" href="'+encodeURI(p.url)+'" target="_blank" rel="noopener">'+th+'<div class="post-c"><small>'+I[p.rede]+N[p.rede]+' · '+d+'</small><p>'+esc(p.texto)+'</p><span class="ver">Ver no '+N[p.rede]+'</span></div></a>'}).join('');})();
