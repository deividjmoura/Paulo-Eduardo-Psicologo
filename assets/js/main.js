import {initNav} from './modules/nav.js';
import {initReveal} from './modules/reveal.js';
import {initAccordion} from './modules/accordion.js';
import {initTabs} from './modules/tabs.js';
import {initCarousel} from './modules/carousel.js';
import {initFab} from './modules/fab.js';
import {initPathDraw} from './modules/path-draw.js';
import {initPosts} from './modules/posts.js';

// Cada módulo é independente: uma falha não derruba os demais.
const modules=[
  initNav,
  initReveal,
  initAccordion,
  initTabs,
  initFab,
  initPathDraw,
  initCarousel,
];

document.addEventListener('DOMContentLoaded',()=>{
  modules.forEach(init=>{
    try{init();}
    catch(err){console.error('[site] Falha ao iniciar módulo:',err);}
  });
  initPosts();
});
