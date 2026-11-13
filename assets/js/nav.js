(function(){var n=document.getElementById('nav'),b=document.getElementById('burger'),m=document.getElementById('menu');
function set(o){n.classList.toggle('aberto',o);m.classList.toggle('on',o);b.setAttribute('aria-expanded',o);document.body.classList.toggle('lock',o)}
b.addEventListener('click',function(){set(!m.classList.contains('on'))});
m.addEventListener('click',function(e){if(e.target.closest('a'))set(false)});
addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});
addEventListener('resize',function(){if(innerWidth>860)set(false)});
function s(){n.classList.toggle('s',scrollY>40)}addEventListener('scroll',s,{passive:true});s();})();
