(function(){
  var toggle=document.getElementById('navToggle');
  var nav=document.getElementById('mainNav');
  if(toggle&&nav){
    toggle.addEventListener('click',function(){var open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu')});
    nav.querySelectorAll('a').forEach(function(link){link.addEventListener('click',function(){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')})});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false')}});
  }
  var year=document.getElementById('year');if(year)year.textContent=new Date().getFullYear();
})();
