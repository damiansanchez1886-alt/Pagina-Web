// Tu correo: cámbialo aquí y en el enlace de contacto
var CORREO = "damian@ejemplo.com";
document.getElementById("y").textContent = new Date().getFullYear();

var burger = document.getElementById("burger"), menu = document.getElementById("menu");
burger.addEventListener("click", function(){
  var o = menu.classList.toggle("open");
  burger.setAttribute("aria-expanded", o);
});
menu.addEventListener("click", function(e){
  if (e.target.tagName === "A") { menu.classList.remove("open"); burger.setAttribute("aria-expanded", false); }
});

// Resalta la sección activa en el menú
var links = document.querySelectorAll("nav a");
var io = new IntersectionObserver(function(es){
  es.forEach(function(e){
    if (e.isIntersecting) links.forEach(function(a){ a.classList.toggle("on", a.getAttribute("href") === "#" + e.target.id); });
  });
}, {rootMargin: "-45% 0px -50% 0px"});
document.querySelectorAll("main section[id]").forEach(function(s){ io.observe(s); });

// Formulario: valida y abre el correo del visitante con el mensaje listo
document.getElementById("form").addEventListener("submit", function(e){
  e.preventDefault();
  var f = e.target, m = document.getElementById("msg");
  var n = f.nombre.value.trim(), c = f.correo.value.trim(), t = f.mensaje.value.trim();
  if (!n || !t || !/^\S+@\S+\.\S+$/.test(c)) { m.textContent = "Completa tu nombre, un correo válido y el mensaje."; return; }
  var asunto = encodeURIComponent("Consulta: " + f.servicio.value + " (" + n + ")");
  var cuerpo = encodeURIComponent(t + "\n\nNombre: " + n + "\nCorreo: " + c);
  window.location.href = "mailto:" + CORREO + "?subject=" + asunto + "&body=" + cuerpo;
  m.textContent = "Se abrirá tu aplicación de correo para enviar el mensaje.";
});
