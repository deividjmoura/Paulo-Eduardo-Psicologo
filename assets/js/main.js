import {initNav} from './modules/nav.js?v=20261123h';
import {initReveal} from './modules/reveal.js?v=20261123h';
import {initFab} from './modules/fab.js?v=20261123h';
import {initPathDraw} from './modules/path-draw.js?v=20261123h';
import {initPosts} from './modules/posts.js?v=20261123h';
import {initWrite} from './modules/write.js?v=20261123h';

// Cada módulo é independente: uma falha não derruba os demais.
const modules=[
  initNav,
  initReveal,
  initFab,
  initPathDraw,
];

function boot(){
  initWrite();
  modules.forEach(init=>{
    try{init();}
    catch(err){console.error('[site] Falha ao iniciar módulo:',err);}
  });
  initPosts();
}

if(document.readyState==='loading'){
  document.addEventListener('DOMContentLoaded',boot);
}else{
  boot();
}
