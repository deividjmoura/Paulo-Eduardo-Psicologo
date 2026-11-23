(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Generic reveal
  var io = ('IntersectionObserver' in window) ? new IntersectionObserver(function(es){
    es.forEach(function(e){
      if(e.isIntersecting){
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, {threshold: .12}) : null;
  var reveal = document.querySelectorAll('.r');
  if(io){ reveal.forEach(function(el){ io.observe(el); }); }
  else { reveal.forEach(function(el){ el.classList.add('in'); }); }

  // Propósito word reveal
  var lit = document.getElementById('lit'), words = [];
  if(lit && !reduce){
    lit.innerHTML = lit.textContent.trim().split(/\s+/).map(function(w){
      return '<span class="lw">' + w + '</span>';
    }).join(' ');
    words = [].slice.call(lit.querySelectorAll('.lw'));
  }

  // Abordagem steps
  var steps = [].slice.call(document.querySelectorAll('.passos li'));

  // Sticky Valores panels
  var blocks = [].slice.call(document.querySelectorAll('.valor-block'));
  var panels = [].slice.call(document.querySelectorAll('.valores-panel'));
  var activePanel = 0;

  function setPanel(idx){
    if(idx === activePanel || !panels.length) return;
    activePanel = idx;
    panels.forEach(function(p, i){
      p.classList.toggle('is-active', i === idx);
    });
  }

  function tick(){
    var h = innerHeight;

    if(words.length){
      var r = lit.getBoundingClientRect();
      var p = Math.max(0, Math.min(1, (h * .85 - r.top) / (r.height + h * .4)));
      words.forEach(function(w, i){
        w.classList.toggle('on', i / words.length < p * 1.08);
      });
    }

    steps.forEach(function(s){
      s.classList.toggle('on', reduce || s.getBoundingClientRect().top < h * .7);
    });

    // Sticky panel switch based on which valor-block is most in view
    if(blocks.length && panels.length){
      var best = 0;
      var bestScore = -Infinity;
      blocks.forEach(function(b, i){
        var rect = b.getBoundingClientRect();
        var blockCenter = rect.top + rect.height / 2;
        var viewCenter = h / 2;
        var score = -Math.abs(blockCenter - viewCenter);
        if(rect.bottom > 0 && rect.top < h && score > bestScore){
          bestScore = score;
          best = i;
        }
      });
      setPanel(best);
    }
  }

  var ticking = false;
  addEventListener('scroll', function(){
    if(!ticking){
      ticking = true;
      requestAnimationFrame(function(){
        tick();
        ticking = false;
      });
    }
  }, {passive: true});
  addEventListener('resize', tick);
  tick();
})();
