import {initNav} from './modules/nav.js?v=20261123c';
import {initReveal} from './modules/reveal.js?v=20261123c';
import {initFab} from './modules/fab.js?v=20261123c';
import {initPathDraw} from './modules/path-draw.js?v=20261123c';
import {initPosts} from './modules/posts.js?v=20261123c';
import {initWrite} from './modules/write.js?v=20261123c';

// Cada módulo é independente: uma falha não derruba os demais.
const modules=[
  initNav,
  initReveal,
  initFab,
  initPathDraw,
];

document.addEventListener('DOMContentLoaded',()=>{
  initWrite();
  modules.forEach(init=>{
    try{init();}
    catch(err){console.error('[site] Falha ao iniciar módulo:',err);}
  });
  initPosts();
});
