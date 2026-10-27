(() => {
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canvas = document.getElementById("matrix"), ctx = canvas?.getContext("2d");
if (canvas && ctx && !reduced) {
 let w=0,h=0,drops=[],cols=0,last=0; const glyphs="01アイウエオカキクケコサシスセソ<>/{}[]";
 function resize(){const dpr=Math.min(devicePixelRatio||1,2);w=innerWidth;h=innerHeight;canvas.width=w*dpr;canvas.height=h*dpr;canvas.style.width=w+"px";canvas.style.height=h+"px";ctx.setTransform(dpr,0,0,dpr,0,0);cols=Math.ceil(w/19);drops=Array.from({length:cols},()=>Math.random()*-h/18)}
 resize();addEventListener("resize",resize,{passive:true});
 function draw(t){if(t-last>65){last=t;ctx.fillStyle="rgba(5,8,7,.11)";ctx.fillRect(0,0,w,h);ctx.font="12px monospace";for(let i=0;i<drops.length;i++){ctx.fillStyle=Math.random()>.985?"#b7ffd2":"#39ff88";ctx.globalAlpha=Math.random()*.45+.15;ctx.fillText(glyphs[Math.floor(Math.random()*glyphs.length)],i*19,drops[i]*19);if(drops[i]*19>h&&Math.random()>.975)drops[i]=0;drops[i]+=.38+Math.random()*.45}ctx.globalAlpha=1}requestAnimationFrame(draw)}requestAnimationFrame(draw);
}
const role=document.getElementById("typed-role"),phrases=["whoami","analyze --signals","build --with-purpose","defend --by-design"];
if(role&&!reduced){let pi=0,ci=0,del=false;function type(){const s=phrases[pi];role.textContent=s.slice(0,ci);if(!del&&ci<s.length){ci++;setTimeout(type,80)}else if(!del){del=true;setTimeout(type,1500)}else if(ci>0){ci--;setTimeout(type,35)}else{del=false;pi=(pi+1)%phrases.length;setTimeout(type,350)}}type()}
const items=document.querySelectorAll(".reveal");
if("IntersectionObserver"in window&&!reduced){const ob=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");ob.unobserve(e.target)}}),{threshold:.12});items.forEach(x=>ob.observe(x))}else items.forEach(x=>x.classList.add("visible"));
const form=document.getElementById("shell-form"),input=document.getElementById("shell-input"),out=document.getElementById("shell-output");
const cmds={help:["Available commands:"," help — list commands"," whoami — profile identity"," stack — current tools and skills"," missions — selected projects"," contact — GitHub profile"," clear — clear terminal"],whoami:["Ahmed Hussen","Computer Science student | Cybersecurity | Software Engineering","Think like an attacker. Build like an engineer. Defend like it matters."],stack:["Development: JavaScript, React, HTML/CSS, C++, Java, Python (basic), FastAPI","Security: Blue Team fundamentals, CTFs, OSINT, threat intelligence","Environment: Linux/Kali, Git, GitHub, VS Code, Bash"],missions:["ADERA — fraud-intelligence concept (currently under evaluation)","SARA — hospitality assistant; contribution: React-led frontend/UI","Software development — programming practice and learning projects"],contact:["GitHub: https://github.com/Ahmedmkofficial"]};
function line(s,cls){const p=document.createElement("p");p.textContent=s;if(cls)p.className=cls;out.appendChild(p)}
form?.addEventListener("submit",e=>{e.preventDefault();const raw=input.value.trim();if(!raw)return;const cmd=raw.toLowerCase();line("visitor@phantom:~$ "+raw,"green");if(cmd==="clear")out.replaceChildren();else if(Object.prototype.hasOwnProperty.call(cmds,cmd))cmds[cmd].forEach(s=>line(s));else line('Command not found: '+raw+'. Type "help" for available commands.');out.scrollTop=out.scrollHeight;input.value=""});
const year=document.getElementById("year");if(year)year.textContent=new Date().getFullYear();
})();
