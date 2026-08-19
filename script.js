const toggle=document.querySelector(".menu-toggle");
const nav=document.querySelector(".nav-links");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("active");toggle.setAttribute("aria-expanded",open)});
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("active");toggle.setAttribute("aria-expanded","false")}));
document.getElementById("contactForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("formMessage").textContent="Thanks! Your message has been received in this demo.";e.target.reset()});
