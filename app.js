
const KEY='sm_v52';
const $=id=>document.getElementById(id);
function getData(){return JSON.parse(localStorage.getItem(KEY)||'[]')}
function setData(v){localStorage.setItem(KEY,JSON.stringify(v))}
function tabs(){
 document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{
  document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');
  document.getElementById(b.dataset.tab).classList.add('active');
 });
}
function rank(s){
 if(s>=30)return 'Founder Standard';
 if(s>=14)return 'Metabo Machine';
 if(s>=7)return 'Savage Mode';
 if(s>=3)return 'Momentum Rising';
 return 'Rookie';
}
function score(x){
 const sleep=Number(x.sleep||0), energy=Number(x.energy||0), pain=10-Number(x.pain||0);
 return Math.max(0, Math.min(100, Math.round((sleep*4)+(energy*5)+(pain*3))));
}
function missionText(s,pain,sleep,weightTrend){
 if(pain>=8) return ['RESET DAY','Recovery wins today. Rebuild and return stronger.',
 ['Avoid spinal loading today.','Walk 20 minutes.','Mobility + protein first.']];
 if(s>=85) return ['ATTACK DAY','You’re primed today. Push heavy and own the session.',
 ['Lead with your hardest lift.','Finish all planned work.','Stay disciplined tonight.']];
 if(s>=65) return ['BUILD DAY','Strong enough to progress. Stack another victory.',
 ['Train with intent.','Hit protein target.','Get your steps in.']];
 let tips=['Keep it simple today.','Hydrate early.','Win one habit.'];
 if(sleep<=3) tips.unshift('Keep caffeine controlled. Train later if possible.');
 if(weightTrend<0) tips.unshift('Momentum confirmed. Stay disciplined.');
 return ['RESET DAY','Recovery wins today. Rebuild and return stronger.',tips];
}
function streak(arr){
 if(!arr.length) return 0;
 let c=0, d=new Date();
 const set=new Set(arr.map(x=>x.date));
 while(true){
   const k=d.toISOString().slice(0,10);
   if(set.has(k)){c++; d.setDate(d.getDate()-1);}
   else break;
 }
 return c;
}
function render(){
 const arr=getData();
 const latest=arr[arr.length-1];
 const st=streak(arr);
 $('streak').textContent=st;
 $('rank').textContent=rank(st);
 $('historyList').innerHTML=arr.slice().reverse().map(x=>`<div class="tip">${x.date} · ${x.weight||'--'} lb · Score ${score(x)}%</div>`).join('') || '<div class="small">No history yet.</div>';
 if(!latest) return;
 const sc=score(latest);
 $('score').textContent=sc+'%';
 $('meterFill').style.width=sc+'%';
 $('weightStat').textContent=(latest.weight||'--')+' lb';
 const prev=arr.length>1 ? Number(arr[arr.length-2].weight||0) : Number(latest.weight||0);
 const wt=Number(latest.weight||0)-prev;
 const m=missionText(sc, Number(latest.pain||0), Number(latest.sleep||0), wt);
 $('missionType').textContent=m[0];
 $('missionLead').textContent=m[1];
 $('coachHome').textContent=m[1];
 $('missionTips').innerHTML=m[2].map(t=>`<div class="tip">${t}</div>`).join('');
}
$('saveBtn').onclick=()=>{
 const x={
  date:new Date().toISOString().slice(0,10),
  weight:$('weight').value,
  sleep:$('sleep').value,
  energy:$('energy').value,
  pain:$('pain').value
 };
 const arr=getData(); arr.push(x); setData(arr);
 $('saveStatus').textContent='Mission generated.';
 render();
 document.querySelector('[data-tab="mission"]').click();
}
tabs(); render();
