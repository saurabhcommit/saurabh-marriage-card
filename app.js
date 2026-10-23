"use strict";
const $=s=>document.querySelector(s);
const toast=m=>{const t=$("#toast");t.textContent=m;t.classList.add("on");setTimeout(()=>t.classList.remove("on"),3500)};
// petals
const pl=$(".petals");for(let i=0;i<14;i++){const p=document.createElement("i");p.style.cssText=`left:${Math.random()*100}%;animation-duration:${8+Math.random()*8}s;animation-delay:-${Math.random()*12}s;background:${i%2?"#ff9f1c":"#ffc22e"}`;pl.append(p)}
// reveal
const io=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}}),{threshold:.15});
document.querySelectorAll(".reveal").forEach(el=>io.observe(el));
// countdown to 25 Nov 2026 10:00 IST (Tilak)
const start=new Date("2026-11-25T10:00:00+05:30").getTime();
function tick(){const r=start-Date.now();const c=$("#cd");
 if(r<=0){c.textContent="Our celebrations have begun — Radhe Radhe!";return}
 const d=Math.floor(r/864e5),h=Math.floor(r/36e5)%24,m=Math.floor(r/6e4)%60;
 c.textContent=`${d} days · ${h} hrs · ${m} min to the Tilak`}
tick();setInterval(tick,3e4);
// calendar (.ics) – times stored in UTC; IST = UTC+5:30
const A="Hotel Radha Krishna, Vrindavan",B="SNJ Lakshmi Dham, Vrindavan";
const prog=[["Tilak","20261125T043000Z","10:00 AM IST",A],["Haldi","20261125T083000Z","2:00 PM IST",A],["Sangeet","20261125T153000Z","9:00 PM IST",A],
["Baraat Aagaman","20261126T053000Z","11:00 AM IST",B],["Phere","20261126T063000Z","12:00 PM IST",B],["Vermala & Reception","20261126T153000Z","9:00 PM IST",B]];
function ics(){const add=(t,h)=>{const d=new Date(t.replace(/(\d{4})(\d\d)(\d\d)T(\d\d)(\d\d)(\d\d)Z/,"$1-$2-$3T$4:$5:$6Z"));d.setUTCHours(d.getUTCHours()+h);return d.toISOString().replace(/[-:]|\.\d+/g,"")};
 const ev=prog.map((p,i)=>`BEGIN:VEVENT\r\nUID:ps-${i}@preeti-saurabh\r\nDTSTAMP:20261023T000000Z\r\nDTSTART:${p[1]}\r\nDTEND:${add(p[1],p[0]==="Haldi"||p[0]==="Tilak"?2:p[0]==="Phere"?2:3)}\r\nSUMMARY:${p[0].replace("&","and")} – Preeti & Saurabh\r\nLOCATION:${p[3]}\r\nDESCRIPTION:${p[2]}. Divine Sangam of Preeti & Saurabh.\r\nEND:VEVENT`).join("\r\n");
 return `BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Preeti Saurabh//EN\r\n${ev}\r\nEND:VCALENDAR`}
$(".cal-btn").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([ics()],{type:"text/calendar"}));a.download="preeti-saurabh-wedding.ics";a.click();toast("Calendar file downloaded — Radhe Radhe!")};
// share
$("#share").onclick=async()=>{const d={title:"Preeti & Saurabh – Divine Sangam",text:"You are invited to our wedding in Vrindavan, 25–26 November 2026.",url:location.href};
 try{if(navigator.share)await navigator.share(d);else{await navigator.clipboard.writeText(location.href);toast("Link copied")}}catch(e){}};
// music
const au=$("#bg"),mb=$("#music");let manual=false;
async function play(){try{await au.play();mb.setAttribute("aria-pressed","true")}catch(e){}}
mb.onclick=()=>{manual=true;if(au.paused)play();else{au.pause();mb.setAttribute("aria-pressed","false")}};
addEventListener("scroll",()=>{if(!manual&&au.paused&&scrollY>40){manual=true;play()}},{passive:true});
// gate: dhol roll + open + start music (user click allows audio)
function dhol(){try{const C=new (window.AudioContext||window.webkitAudioContext)(),t=C.currentTime;
 const hit=(s,f,v)=>{const o=C.createOscillator(),g=C.createGain();o.frequency.setValueAtTime(f,s);o.frequency.exponentialRampToValueAtTime(f/2.2,s+.18);g.gain.setValueAtTime(v,s);g.gain.exponentialRampToValueAtTime(.001,s+.26);o.connect(g);g.connect(C.destination);o.start(s);o.stop(s+.3)};
 [0,.3,.45,.75,.9,1.05,1.35,1.5,1.65].forEach((d,i)=>hit(t+d,i%3?180:95,.8))}catch(e){}}
$("#enter").onclick=()=>{dhol();manual=true;document.body.classList.add("open");play();
 setTimeout(()=>{document.body.classList.remove("lock");$("#gate").remove()},2500)};
