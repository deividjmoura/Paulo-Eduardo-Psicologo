(function(){var f=document.getElementById('fab'),b=f.querySelector('.fab-btn');
function set(o){f.classList.toggle('on',o);b.setAttribute('aria-expanded',o)}
b.addEventListener('click',function(){set(!f.classList.contains('on'))});
document.addEventListener('click',function(e){if(!f.contains(e.target))set(false)});
addEventListener('keydown',function(e){if(e.key==='Escape')set(false)});})();
