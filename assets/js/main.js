import {initNav} from './modules/nav.js';
import {initReveal} from './modules/reveal.js';
import {initAccordion} from './modules/accordion.js';
import {initTabs} from './modules/tabs.js';
import {initCarousel} from './modules/carousel.js';
import {initFab} from './modules/fab.js';
import {initPathDraw} from './modules/path-draw.js';
import {initPosts} from './modules/posts.js';

document.addEventListener('DOMContentLoaded',()=>{
  initNav();
  initReveal();
  initAccordion();
  initTabs();
  initCarousel();
  initFab();
  initPathDraw();
  initPosts();
});
