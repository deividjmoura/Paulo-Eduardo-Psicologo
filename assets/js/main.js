import {initNav} from './modules/nav.js?v=20261123b';
import {initReveal} from './modules/reveal.js?v=20261123b';
import {initFab} from './modules/fab.js?v=20261123b';
import {initPathDraw} from './modules/path-draw.js?v=20261123b';
import {initPosts} from './modules/posts.js?v=20261123b';

// Cada módulo é independente: uma falha não derruba os demais.
const modules=[
  initNav,
  initReveal,
  initFab,
  initPathDraw,
];

document.addEventListener('DOMContentLoaded',()=>{
  modules.forEach(init=>{
    try{init();}
    catch(err){console.error('[site] Falha ao iniciar módulo:',err);}
  });
  initPosts();
});
