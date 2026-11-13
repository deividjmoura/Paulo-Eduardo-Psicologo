(function(){
  var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealTargets=[].slice.call(document.querySelectorAll('#atendimento .forma, .quem .pan'));
  if(!reduce && 'IntersectionObserver' in window){
    revealTargets.forEach(function(el){el.classList.add('mobile-slide')});
    var mobileObserver=new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('is-visible');
          mobileObserver.unobserve(entry.target);
        }
      });
    },{threshold:.12,rootMargin:'0px 0px -28px 0px'});
    revealTargets.forEach(function(el){mobileObserver.observe(el)});
  }else{
    revealTargets.forEach(function(el){el.classList.add('is-visible')});
  }

  var io=('IntersectionObserver' in window)?new IntersectionObserver(function(es){
    es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})
  },{threshold:.12}):null;
  var reveal=document.querySelectorAll('.r');
  if(io){reveal.forEach(function(el){io.observe(el)})}
  else{reveal.forEach(function(el){el.classList.add('in')})}

  var lit=document.getElementById('lit'),words=[];
  if(lit&&!reduce){
    lit.innerHTML=lit.textContent.trim().split(/\s+/).map(function(w){return'<span class="lw">'+w+'</span>'}).join(' ');
    words=[].slice.call(lit.querySelectorAll('.lw'));
  }
  var steps=[].slice.call(document.querySelectorAll('.passos li'));
  function tick(){
    var h=innerHeight;
    if(words.length){
      var r=lit.getBoundingClientRect(),p=Math.max(0,Math.min(1,(h*.85-r.top)/(r.height+h*.4)));
      words.forEach(function(w,i){w.classList.toggle('on',i/words.length<p*1.08)});
    }
    steps.forEach(function(s){s.classList.toggle('on',reduce||s.getBoundingClientRect().top<h*.7)});
  }
  var t=false;
  addEventListener('scroll',function(){
    if(!t){t=true;requestAnimationFrame(function(){tick();t=false})}
  },{passive:true});
  addEventListener('resize',tick);
  tick();
})();
