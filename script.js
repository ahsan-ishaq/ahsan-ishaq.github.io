/* Scroll reveal */
(function(){
  var els=document.querySelectorAll('.rv');
  if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('in')});return;}
  var io=new IntersectionObserver(function(list){
    list.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});
  },{threshold:.16});
  els.forEach(function(e){io.observe(e)});
})();

/* Floating blue particles and celebration confetti */
(function(){
  var c=document.getElementById('fx');
  if(!c || !c.getContext) return;
  var g=c.getContext('2d'),W,H,dots=[],conf=[];
  function size(){W=c.width=window.innerWidth;H=c.height=window.innerHeight}
  size();window.addEventListener('resize',size);
  for(var i=0;i<42;i++) dots.push({x:Math.random()*W,y:Math.random()*H,r:Math.random()*2+.6,v:Math.random()*.4+.15,a:Math.random()*.5+.2});
  var cols=['#2f7bff','#8fc2ff','#ffffff','#1b4fd8','#5aa0ff'];
  function burst(){for(var i=0;i<145;i++)conf.push({x:W/2,y:H*.55,vx:(Math.random()-.5)*16,vy:-Math.random()*16-4,s:Math.random()*8+4,c:cols[i%cols.length],rot:Math.random()*6});}
  function loop(){
    g.clearRect(0,0,W,H);
    dots.forEach(function(d){d.y-=d.v;if(d.y<-5){d.y=H+5;d.x=Math.random()*W;}g.globalAlpha=d.a;g.fillStyle='#8fc2ff';g.beginPath();g.arc(d.x,d.y,d.r,0,6.3);g.fill();});
    conf=conf.filter(function(p){return p.y<H+20;});
    conf.forEach(function(p){p.vy+=.35;p.x+=p.vx;p.y+=p.vy;p.vx*=.99;p.rot+=.15;g.save();g.globalAlpha=1;g.translate(p.x,p.y);g.rotate(p.rot);g.fillStyle=p.c;g.fillRect(-p.s/2,-p.s/4,p.s,p.s/2);g.restore();});
    requestAnimationFrame(loop);
  }
  loop();
  setTimeout(burst,1600);
  var btn=document.getElementById('go');
  if(btn)btn.addEventListener('click',function(){burst();setTimeout(burst,450);setTimeout(burst,900);document.getElementById('msg').classList.add('show');});
})();
