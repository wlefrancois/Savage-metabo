const CK="sm_v511_checkins", WK="sm_v511_workouts", PK="sm_v511_program", MK="sm_v511_mode";
const EX={"Incline DB Press":["💪","30–45° bench, press to upper chest.","4","10",90],"Flat DB Press":["🏋️","Feet planted, steady press.","3","10",90],"Cable Fly":["🪽","Soft bend in elbows, squeeze chest.","3","15",60],"Rope Pushdown":["🔽","Pin elbows in, full extension.","4","12",60],"DB Curl":["💥","Keep elbows quiet, control down.","4","12",60],"Hammer Curl":["🔨","Neutral grip, slow lower.","3","15",60],"Chest Supported Row":["🚣","Chest down, squeeze shoulder blades.","4","10",75],"Lat Pulldown":["⬇️","Pull to upper chest, avoid swinging.","4","12",75],"Seated Cable Row":["↩️","Tall chest, pull elbows back.","3","12",75],"Face Pull":["🎯","Pull high, rotate thumbs back.","3","15",60],"Bird Dog":["🧠","Brace core, move slow.","3","10",45],"McGill Curl-Up":["🛡️","Lift slightly, no spinal crunch.","3","10",45],"Plank":["📏","Straight line, brace abs.","3","30 sec",45],"Leg Press":["🦵","Pain-free depth only.","4","12",90],"DB Romanian Deadlift":["⚙️","Hinge hips, neutral spine.","4","10",90],"Low Step-Ups":["📶","Low box, drive through heel.","3","10",60],"Hamstring Curl":["🧩","Control up and down.","3","15",60],"Calf Raise":["⬆️","Pause at top.","4","15",45],"Side Plank":["📐","Stack shoulders and hips.","3","30 sec",45],"Seated DB Shoulder Press":["🏛️","Stay tall, avoid back arch.","4","10",90],"Lateral Raise":["✈️","Lift to side, not shrug.","4","15",60],"Rear Delt Fly":["🪽","Open wide, squeeze rear delt.","4","15",60],"Farmer Carry":["🧳","Tall posture, slow steps.","5","rounds",60],"Pushups burnout":["🔥","Brace core, full-body plank.","1","burnout",60],"Curl burnout":["🔥","Controlled reps, no swinging.","1","burnout",60]};
const HOME=[["Day 1 — Chest + Arms","Upper chest, triceps, biceps",["Incline DB Press 4x10","Flat DB Press 3x10","Cable Fly 3x15","Rope Pushdown 4x12","DB Curl 4x12","Hammer Curl 3x15"]],["Day 2 — Back + Core","Back strength, posture, spine stability",["Chest Supported Row 4x10","Lat Pulldown 4x12","Seated Cable Row 3x12","Face Pull 3x15","Bird Dog 3 rounds","McGill Curl-Up 3 rounds","Plank 3x30 sec"]],["Day 3 — Legs Safe Mode","Knee-friendly lower body",["Leg Press 4x12","DB Romanian Deadlift 4x10","Low Step-Ups 3x10","Hamstring Curl 3x15","Calf Raise 4x15","Side Plank 3 rounds"]],["Day 4 — Wayne Armor","Shoulders, carries, presence",["Seated DB Shoulder Press 4x10","Lateral Raise 4x15","Rear Delt Fly 4x15","Farmer Carry 5 rounds","Pushups burnout","Curl burnout"]]];
let s=null,timer=null,rest=90;
const $=id=>document.getElementById(id);
function gc(){return JSON.parse(localStorage.getItem(CK)||"[]")} function sc(v){localStorage.setItem(CK,JSON.stringify(v))}
function gw(){return JSON.parse(localStorage.getItem(WK)||"[]")} function sw(v){localStorage.setItem(WK,JSON.stringify(v))}
function gp(){return localStorage.getItem(PK)||"30 Day Reset"} function sp(v){localStorage.setItem(PK,v)}
function gm(){return localStorage.getItem(MK)||"morning"} function sm(v){localStorage.setItem(MK,v)}
function today(){return new Date().toISOString().slice(0,10)}
function base(x){return x.replace(/\s+\d+x\d+$/,'').replace(/\s+x\d+$/,'').replace(/\s+rounds$/,'')}
function meta(x){return EX[base(x)]||["🎬","See example link for form.","1","work",60]}
function link(x){return `https://www.youtube.com/results?search_query=${encodeURIComponent(base(x)+" proper form")}`}
function ready(e){if(!e)return 0;const p=Math.min(Number(e.proteinGoal||e.proteinActual||0)/190,1)*20,s=Math.min(Number(e.stepsGoal||e.stepsActual||0)/8000,1)*15,en=(Math.min(Number(e.energy||0),10)/10)*20,sl=(Math.min(Number(e.sleep||0),10)/10)*10,b=((10-Math.min(Number(e.backPain||0),10))/10)*17.5,k=((10-Math.min(Number(e.kneePain||0),10))/10)*17.5,comp=(e.nutritionCompliance==="clean"?10:e.nutritionCompliance==="mostly"?7:e.nutritionCompliance==="off"?3:e.nutritionCompliance==="sugar"?2:e.nutritionCompliance==="alcohol"?1:5);return Math.max(0,Math.round(p+s+en+sl+b+k+comp-15))}
function coach(e,r){if(!e)return"Start with a morning check-in.";if(Number(e.backPain||0)>=6)return"Recovery walk + mobility. Protect the back today.";if(Number(e.kneePain||0)>=6)return"Upper body or recovery day. Keep knee stress down.";if(r>=85)return"Peak day. Push your main lift and finish strong.";if(r>=70)return"Solid day. Hit your full workout and protein target.";if(r>=55)return"Moderate day. Keep momentum without grinding.";return"Reset day. Focus on steps, hydration, protein, and recovery."}
function mission(e,r){if(!e)return{type:"READY",lead:"Complete your check-in to generate your mission.",items:[],reason:"No data yet."};if(Number(e.backPain||0)>=6)return{type:"RECOVERY",lead:"Protect your back and keep momentum.",items:["Walk 10–20 minutes","Do bird dogs + curl-ups","Hit protein goal"],reason:"Back pain is elevated, so intensity should drop."};if(Number(e.kneePain||0)>=6)return{type:"UPPER",lead:"Shift stress off the knee.",items:["Train upper body only","Keep steps easy but steady","No deep squats or step-ups"],reason:"Knee pain is elevated, so lower-body load should be reduced."};if(r>=85)return{type:"ATTACK",lead:"This is a high-readiness day.",items:["Hit your main workout","Push the first compound movement","Finish with your target steps"],reason:"Energy, pain, and momentum support a hard training day."};if(r>=70)return{type:"BUILD",lead:"Good day to move forward.",items:["Complete your planned workout","Hit protein goal","Stay on nutrition plan"],reason:"You are in a solid training window."};if(r>=55)return{type:"MODERATE",lead:"Keep momentum, not ego.",items:["Train with controlled effort","Choose cleaner food today","Get your minimum steps"],reason:"Some variables are off, but progress is still available."};return{type:"RESET",lead:"Win the day with basics.",items:["Recovery walk","Protein first at meals","Early sleep tonight"],reason:"Your recovery inputs suggest a reset day."}}
function streak(arr){if(!arr.length)return 0;const dates=[...new Set(arr.map(x=>x.date))].sort().reverse();let count=0;let d=new Date();while(true){const k=d.toISOString().slice(0,10);if(dates.includes(k)){count++;d.setDate(d.getDate()-1)}else break}return count}
document.querySelectorAll('.tab').forEach(b=>b.onclick=()=>{document.querySelectorAll('.tab').forEach(x=>x.classList.remove('active'));document.querySelectorAll('.panel').forEach(x=>x.classList.remove('active'));b.classList.add('active');$(b.dataset.t).classList.add('active')});
document.querySelectorAll('.mode').forEach(b=>b.onclick=()=>setMode(b.dataset.m));
document.querySelectorAll('.prog').forEach(b=>b.onclick=()=>{document.querySelectorAll('.prog').forEach(x=>x.classList.remove('active'));b.classList.add('active');sp(b.dataset.p);$('programStatus').textContent=`Active program: ${b.dataset.p}`});
function setMode(mode){sm(mode);document.querySelectorAll('.mode').forEach(b=>b.classList.toggle('active',b.dataset.m===mode));$('modeLabel').textContent=mode.toUpperCase();document.querySelectorAll('.morning').forEach(el=>el.classList.toggle('hidden',mode!=='morning'));document.querySelectorAll('.evening').forEach(el=>el.classList.toggle('hidden',mode!=='evening'))}
function chart(){const canvas=$('weightChart'),ctx=canvas.getContext('2d'),data=gc(),w=canvas.clientWidth,h=canvas.clientHeight;canvas.width=w*devicePixelRatio;canvas.height=h*devicePixelRatio;ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);ctx.clearRect(0,0,w,h);const s=[...data].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-10),vals=s.map(d=>Number(d.weight||0)).filter(v=>v>0);if(!vals.length){ctx.fillStyle='#94a3b8';ctx.font='14px sans-serif';ctx.fillText('No data yet',16,28);return}const min=Math.min(...vals),max=Math.max(...vals),range=Math.max(max-min,1);ctx.strokeStyle='rgba(255,255,255,.08)';for(let i=0;i<4;i++){const y=20+(h-40)*(i/3);ctx.beginPath();ctx.moveTo(10,y);ctx.lineTo(w-10,y);ctx.stroke()}ctx.strokeStyle='#f59e0b';ctx.lineWidth=3;ctx.beginPath();s.forEach((d,i)=>{const v=Number(d.weight||0),x=16+((w-32)*(s.length===1?0.5:i/(s.length-1))),y=h-18-(((v-min)/range)*(h-40));if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y)});ctx.stroke()}
function applyMissionToUI(m){$('missionType').textContent=m.type;$('missionLead').textContent=m.lead;$('missionList').innerHTML=m.items.length?m.items.map(x=>`<div class="missionchip">${x}</div>`).join(''):'<div class="hint">No mission yet.</div>';$('decisionReason').textContent=m.reason;$('homeMission').innerHTML=m.items.length?m.items.map(x=>`<div class="missionchip">${x}</div>`).join(''):'<div class="hint">No mission yet.</div>'}
function renderHome(){const c=gc(),e=[...c].sort((a,b)=>(b.date||'').localeCompare(a.date||''))[0],r=ready(e),m=mission(e,r);$('momentumScore').textContent=`${r}%`;$('momentumBar').style.width=`${r}%`;$('coachMessage').textContent=coach(e,r);$('statWeight').textContent=e?.weight?`${e.weight} lb`:'--';$('statWaist').textContent=e?.waist?`${e.waist} in`:'--';$('statStreak').textContent=streak(c);$('statWorkouts').textContent=gw().length;$('statProtein').textContent=e?`${e.proteinGoal||'--'} / ${e.proteinActual||'--'}`:'--';$('statSteps').textContent=e?`${e.stepsGoal||'--'} / ${e.stepsActual||'--'}`:'--';applyMissionToUI(m);chart()}
function save(){const x={date:$('date').value||today(),mode:gm(),weight:$('weight').value,waist:$('waist').value,sleep:$('sleep').value,energy:$('energy').value,backPain:$('backPain').value,kneePain:$('kneePain').value,proteinGoal:$('proteinGoal').value,stepsGoal:$('stepsGoal').value,proteinActual:$('proteinActual').value,stepsActual:$('stepsActual').value,workoutDone:$('workoutDone').value,nutritionCompliance:$('nutritionCompliance').value,notes:$('notes').value};const c=gc();c.push(x);sc(c);const r=ready(x),m=mission(x,r);applyMissionToUI(m);$('status').textContent=`Saved ${x.date} ${x.mode} check-in.`;document.querySelector('[data-t="mission"]').click();renderHome();renderHistory()}
function clearF(){$('date').value=today();['weight','waist','sleep','energy','backPain','kneePain','proteinGoal','stepsGoal','proteinActual','stepsActual','workoutDone','nutritionCompliance','notes'].forEach(id=>$(id).value='');$('status').textContent=''}
function renderTrain(){$('trainList').innerHTML=HOME.map(w=>{const m=meta(w[2][0]);const links=w[2].map(x=>`<a class="video" href="${link(x)}" target="_blank">${base(x)}</a>`).join(' ');return `<div class="card"><div class="row"><div><div class="title">${w[0]}</div><div class="small">${w[1]}</div></div><div class="badge">${w[2].length} ex</div></div><div class="icon">${m[0]}</div><div class="hint">${m[1]}</div>${w[2].map(x=>`<div class="hist">${x}</div>`).join('')}<div class="links"><a class="video primary" href="${link(w[2][0])}" target="_blank">▶ Watch Main Exercise</a>${links}</div><button class="start" data-name="${w[0]}" style="margin-top:12px;width:100%">Start Session</button></div>`}).join('');document.querySelectorAll('.start').forEach(b=>b.onclick=()=>{const w=HOME.find(x=>x[0]===b.dataset.name);startS(w)})}
function startS(w){s={name:w[0],items:w[2].map(x=>{const m=meta(x);return {name:base(x),icon:m[0],cue:m[1],sets:m[2],reps:m[3],rest:m[4],link:link(x)}}),idx:0,done:[]};$('sessionEmpty').classList.add('hidden');$('sessionCard').classList.remove('hidden');document.querySelector('[data-t="session"]').click();upd()}
function upd(){const e=s.items[s.idx];$('sessionWorkout').textContent=s.name;$('sessionProgress').textContent=`${s.idx+1} / ${s.items.length}`;$('sessionIcon').textContent=e.icon;$('sessionExercise').textContent=e.name;$('sessionCue').textContent=e.cue;$('sessionWatch').href=e.link;$('sessionTarget').textContent=`${e.sets} x ${e.reps}`;rest=e.rest||60;showRest();$('sessionStatus').textContent=`Completed: ${s.done.length}`}
function showRest(){$('restDisplay').textContent=`${String(Math.floor(rest/60)).padStart(2,'0')}:${String(rest%60).padStart(2,'0')}`}
function restStart(){clearInterval(timer);timer=setInterval(()=>{if(rest>0){rest--;showRest()}else{clearInterval(timer);$('sessionStatus').textContent='Rest done.'}},1000)}
function next(skip){const e=s.items[s.idx];s.done.push({name:e.name,skip});if(s.idx<s.items.length-1){s.idx++;upd()}else finish()}
function finish(){clearInterval(timer);const h=gw();h.push({date:today(),name:s.name,total:s.items.length,completed:s.done.filter(x=>!x.skip).length,exerciseNames:s.done.filter(x=>!x.skip).map(x=>x.name)});sw(h);$('sessionStatus').textContent=`Workout complete: ${s.name}`;s=null;renderHome();renderHistory()}
function renderHistory(){const c=[...gc()].reverse();$('checkinHistory').innerHTML=c.length?c.map(x=>`<div class="hist"><div class="row"><div><div class="value">${x.date} · ${x.mode}</div><div class="small">${x.notes||''}</div></div><div class="badge">${ready(x)}%</div></div><div class="small" style="margin-top:8px">Wt ${x.weight||'--'} · Waist ${x.waist||'--'} · Protein ${x.proteinGoal||'--'}/${x.proteinActual||'--'} · Steps ${x.stepsGoal||'--'}/${x.stepsActual||'--'}</div></div>`).join(''):'<div class="small">No check-ins yet.</div>';const h=[...gw()].reverse();$('workoutHistory').innerHTML=h.length?h.map(x=>`<div class="hist"><div class="row"><div><div class="value">${x.name}</div><div class="small">${x.date}</div></div><div class="badge">${x.completed}/${x.total}</div></div><div class="small" style="margin-top:8px">${x.exerciseNames.join(', ')}</div></div>`).join(''):'<div class="small">No completed workouts yet.</div>'}
function exportJ(){const blob=new Blob([JSON.stringify({checkins:gc(),workouts:gw(),program:gp()},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='savage_metabo_v511_data.json';a.click();URL.revokeObjectURL(url)}
$('saveBtn').onclick=save;$('clearBtn').onclick=clearF;$('restBtn').onclick=()=>s&&restStart();$('doneBtn').onclick=()=>s&&next(false);$('skipBtn').onclick=()=>s&&next(true);$('finishBtn').onclick=()=>s&&finish();$('exportBtn').onclick=exportJ;
$('date').value=today();setMode(gm());$('programStatus').textContent=`Active program: ${gp()}`;document.querySelectorAll('.prog').forEach(b=>b.classList.toggle('active',b.dataset.p===gp()));renderTrain();renderHome();renderHistory();


/* ===== v5.2 Elite Coach Merge Enhancements ===== */
function founderRankFromStreak(n){
  if(n >= 30) return 'Founder Standard';
  if(n >= 14) return 'Metabo Machine';
  if(n >= 7) return 'Savage Mode';
  if(n >= 3) return 'Momentum Rising';
  return 'Rookie';
}

function eliteMission(lead, missionType, e, scoreValue){
  if(!e){
    return {
      type: 'READY',
      lead: 'Complete your check-in to generate your mission.',
      items: [],
      reason: 'No data yet.'
    };
  }
  const back = Number(e.backPain || 0);
  const knee = Number(e.kneePain || 0);
  const sleep = Number(e.sleep || 0);
  const latestWeight = Number(e.weight || 0);

  if(back >= 6){
    return {
      type: 'RESET DAY',
      lead: 'Recovery wins today. Rebuild and return stronger.',
      items: [
        'Avoid spinal loading today.',
        'Take a 10–20 minute walk.',
        'Hit your protein target before night.'
      ],
      reason: 'Back pain is elevated, so today should prioritize protection and recovery.'
    };
  }
  if(knee >= 6){
    return {
      type: 'UPPER FOCUS',
      lead: 'Shift stress off the knee and keep the streak alive.',
      items: [
        'Train upper body or supported movements only.',
        'Keep steps steady, not aggressive.',
        'Skip deep squats and step-ups.'
      ],
      reason: 'Knee pain is elevated, so lower-body loading should be reduced.'
    };
  }
  if(scoreValue >= 85){
    return {
      type: 'ATTACK DAY',
      lead: 'You’re primed today. Push heavy and own the session.',
      items: [
        'Lead with your hardest movement.',
        'Finish every planned set with intent.',
        'Stay disciplined tonight to lock in momentum.'
      ],
      reason: 'Your readiness, energy, and recovery inputs support a hard push day.'
    };
  }
  if(scoreValue >= 70){
    return {
      type: 'BUILD DAY',
      lead: 'Strong enough to progress. Stack another victory.',
      items: [
        'Complete the full workout.',
        'Hit your protein goal.',
        'Get your target steps before bed.'
      ],
      reason: 'You are in a solid training window today.'
    };
  }

  const tips = [];
  if(sleep <= 3 && sleep > 0) tips.push('Keep caffeine controlled. Train later if possible.');
  tips.push('Keep today simple and disciplined.');
  tips.push('Win the basics: protein, water, and steps.');
  if(latestWeight > 0) tips.push('Stay consistent. The trend matters more than one day.');

  return {
    type: 'RESET DAY',
    lead: 'Recovery wins today. Rebuild and return stronger.',
    items: tips,
    reason: 'Today is better used for recovery, habit compliance, and momentum protection.'
  };
}

function computeWeeklyInsight(checkins){
  if(!checkins || !checkins.length){
    return 'Start logging check-ins to unlock trend insights.';
  }
  const sorted = [...checkins].sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  const recent = sorted.slice(-7);
  const firstW = Number(recent[0]?.weight || 0);
  const lastW = Number(recent[recent.length-1]?.weight || 0);
  const proteinVals = recent.map(x => Number(x.proteinActual || x.proteinGoal || 0)).filter(v => v>0);
  const stepVals = recent.map(x => Number(x.stepsActual || x.stepsGoal || 0)).filter(v => v>0);
  const avgProtein = proteinVals.length ? Math.round(proteinVals.reduce((a,b)=>a+b,0)/proteinVals.length) : 0;
  const avgSteps = stepVals.length ? Math.round(stepVals.reduce((a,b)=>a+b,0)/stepVals.length) : 0;
  const delta = (firstW && lastW) ? (lastW - firstW) : 0;

  if(firstW && lastW && delta < 0){
    return `Momentum confirmed. Weight is down ${Math.abs(delta).toFixed(1)} lb over your recent trend. Average protein: ${avgProtein || '--'}g. Average steps: ${avgSteps || '--'}.`;
  }
  if(firstW && lastW && delta > 0.5){
    return `Weight trend is up ${delta.toFixed(1)} lb recently. Tighten compliance, protect recovery, and keep your evening nutrition sharp. Average protein: ${avgProtein || '--'}g.`;
  }
  return `Momentum is neutral. Stay disciplined and stack another clean week. Average protein: ${avgProtein || '--'}g. Average steps: ${avgSteps || '--'}.`;
}

/* Wrap existing renderHome if present */
if (typeof renderHome === 'function') {
  const _renderHomeOriginal = renderHome;
  renderHome = function(){
    _renderHomeOriginal();
    try {
      const c = typeof gc === 'function' ? gc() : [];
      const e = c.length ? [...c].sort((a,b)=>(b.date||'').localeCompare(a.date||''))[0] : null;
      const scoreEl = document.getElementById('momentumScore');
      let scoreValue = 0;
      if (scoreEl && scoreEl.textContent) {
        scoreValue = Number(String(scoreEl.textContent).replace('%','')) || 0;
      }
      const m = eliteMission('', '', e, scoreValue);

      const missionTypeEl = document.getElementById('missionType');
      const missionLeadEl = document.getElementById('missionLead');
      const missionListEl = document.getElementById('missionList');
      const decisionReasonEl = document.getElementById('decisionReason');
      const homeMissionEl = document.getElementById('homeMission');
      const coachMessageEl = document.getElementById('coachMessage');
      const founderStreakEl = document.getElementById('founderStreak');
      const founderRankEl = document.getElementById('founderRank');
      const weeklyInsightEl = document.getElementById('weeklyInsight');

      if (missionTypeEl) missionTypeEl.textContent = m.type;
      if (missionLeadEl) missionLeadEl.textContent = m.lead;
      if (missionListEl) missionListEl.innerHTML = m.items.length ? m.items.map(x=>`<div class="missionchip">${x}</div>`).join('') : '<div class="hint">No mission yet.</div>';
      if (decisionReasonEl) decisionReasonEl.textContent = m.reason;
      if (homeMissionEl) homeMissionEl.innerHTML = m.items.length ? m.items.map(x=>`<div class="missionchip">${x}</div>`).join('') : '<div class="hint">No mission yet.</div>';
      if (coachMessageEl) coachMessageEl.textContent = m.lead;

      const st = (typeof streak === 'function') ? streak(c) : 0;
      if (founderStreakEl) founderStreakEl.textContent = st;
      if (founderRankEl) founderRankEl.textContent = founderRankFromStreak(st);
      if (weeklyInsightEl) weeklyInsightEl.textContent = computeWeeklyInsight(c);
    } catch (err) {
      console.log('Elite coach merge enhancement error', err);
    }
  }
}

/* Re-run enhanced home render after load */
setTimeout(() => {
  try { if (typeof renderHome === 'function') renderHome(); } catch(e) {}
}, 50);


/* ===== v5.3 Program Engine ===== */
function getProgramRules(programName){
  const rules = {
    "30 Day Reset": {
      effect: "Prioritizes consistency, hydration, protein, and walking over intensity.",
      missionPrefix: "RESET PROTOCOL",
      coachSuffix: "Win the basics before chasing intensity.",
      adjustments: {
        stepsBias: 1,
        intensity: "moderate",
        note: "Consistency first."
      }
    },
    "Travel Survival": {
      effect: "Shifts toward shorter sessions, damage control, and maintaining momentum while away.",
      missionPrefix: "TRAVEL SURVIVAL",
      coachSuffix: "Protect momentum. Maintain, don’t gain.",
      adjustments: {
        stepsBias: -1,
        intensity: "light",
        note: "Shorter sessions and practical food choices."
      }
    },
    "55+ Joint Smart Strength": {
      effect: "Reduces joint stress, adds mobility emphasis, and favors safer training choices.",
      missionPrefix: "JOINT SMART",
      coachSuffix: "Protect the joints and keep the streak alive.",
      adjustments: {
        stepsBias: 0,
        intensity: "controlled",
        note: "Mobility and low joint stress matter more."
      }
    },
    "Belly Fat Kill Mode": {
      effect: "Pushes step compliance, tighter evening nutrition, and waist-focused discipline.",
      missionPrefix: "FAT LOSS",
      coachSuffix: "Tighten compliance and finish the day clean.",
      adjustments: {
        stepsBias: 2,
        intensity: "firm",
        note: "Steps and nutrition discipline matter most."
      }
    }
  };
  return rules[programName] || rules["30 Day Reset"];
}

function eliteMissionByProgram(e, scoreValue, programName){
  const rules = getProgramRules(programName);
  const back = Number(e?.backPain || 0);
  const knee = Number(e?.kneePain || 0);
  const sleep = Number(e?.sleep || 0);

  if(programName === "55+ Joint Smart Strength"){
    if(back >= 4 || knee >= 4){
      return {
        type: "JOINT SMART",
        lead: "Train smart today. Protect the joints and build strength safely.",
        items: [
          "Choose supported or lower-impact movements.",
          "Add mobility before training.",
          "Skip ego lifting today."
        ],
        reason: "Joint Smart Strength lowers stress when pain signals are present."
      };
    }
  }

  if(programName === "Travel Survival"){
    return {
      type: "TRAVEL SURVIVAL",
      lead: scoreValue >= 65
        ? "Keep momentum on the road. Short, sharp, and disciplined."
        : "Travel day reset. Protect momentum with practical wins.",
      items: scoreValue >= 65
        ? ["Do a shorter hotel-style session.", "Make one clean meal decision.", "Hit your minimum movement target."]
        : ["Walk whenever possible.", "Keep meals simple and protein-first.", "Do not chase perfection today."],
      reason: "Travel Survival prioritizes practicality and damage control over perfection."
    };
  }

  if(programName === "Belly Fat Kill Mode"){
    if(scoreValue >= 70){
      return {
        type: "FAT LOSS PUSH",
        lead: "This is a fat-loss opportunity day. Stay sharp and finish clean.",
        items: [
          "Complete the workout.",
          "Push steps above your minimum target.",
          "Keep evening nutrition tight."
        ],
        reason: "Belly Fat Kill Mode rewards movement, discipline, and cleaner evenings."
      };
    }
    return {
      type: "FAT LOSS DISCIPLINE",
      lead: "You don’t need a perfect day. You need a clean one.",
      items: [
        "Walk more than usual today.",
        "Protein first at every meal.",
        "Avoid nighttime drift."
      ],
      reason: "This program leans on behavior control when readiness is lower."
    };
  }

  if(programName === "30 Day Reset"){
    if(scoreValue >= 70){
      return {
        type: "RESET BUILD",
        lead: "Build momentum with discipline, not chaos.",
        items: [
          "Complete the planned session.",
          "Hit your protein goal.",
          "Finish hydration and steps before bed."
        ],
        reason: "30 Day Reset favors consistency and clean execution."
      };
    }
    return {
      type: "RESET DAY",
      lead: "Recovery wins today. Rebuild and return stronger.",
      items: [
        "Walk 10–20 minutes.",
        "Keep meals simple and clean.",
        "Get to bed earlier tonight."
      ],
      reason: "30 Day Reset lowers complexity and protects consistency."
    };
  }

  // Fallback to existing elite coach flavor
  return {
    type: rules.missionPrefix,
    lead: "Stay on plan and keep momentum moving.",
    items: [
      "Follow the program priority.",
      "Stay disciplined tonight.",
      "Protect the streak."
    ],
    reason: rules.effect
  };
}

function computeProgramInsight(programName, checkins){
  const rules = getProgramRules(programName);
  const count = checkins?.length || 0;
  if(!count){
    return `${programName}: ${rules.effect}`;
  }
  const recent = [...checkins].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-5);
  const avgSteps = recent.map(x => Number(x.stepsActual || x.stepsGoal || 0)).filter(v=>v>0);
  const avgProtein = recent.map(x => Number(x.proteinActual || x.proteinGoal || 0)).filter(v=>v>0);
  const s = avgSteps.length ? Math.round(avgSteps.reduce((a,b)=>a+b,0)/avgSteps.length) : 0;
  const p = avgProtein.length ? Math.round(avgProtein.reduce((a,b)=>a+b,0)/avgProtein.length) : 0;
  return `${programName}: ${rules.effect} Recent average protein ${p || '--'}g. Recent average steps ${s || '--'}.`;
}

/* Wrap enhanced renderHome again */
if (typeof renderHome === 'function') {
  const _renderHomeV53Base = renderHome;
  renderHome = function(){
    _renderHomeV53Base();
    try {
      const checkins = typeof gc === 'function' ? gc() : [];
      const latest = checkins.length ? [...checkins].sort((a,b)=>(b.date||'').localeCompare(a.date||''))[0] : null;
      const scoreEl = document.getElementById('momentumScore');
      const scoreValue = scoreEl ? (Number(String(scoreEl.textContent).replace('%','')) || 0) : 0;
      const programName = (typeof gp === 'function') ? gp() : '30 Day Reset';
      const m = eliteMissionByProgram(latest, scoreValue, programName);

      const missionTypeEl = document.getElementById('missionType');
      const missionLeadEl = document.getElementById('missionLead');
      const missionListEl = document.getElementById('missionList');
      const decisionReasonEl = document.getElementById('decisionReason');
      const homeMissionEl = document.getElementById('homeMission');
      const coachMessageEl = document.getElementById('coachMessage');
      const programEffectEl = document.getElementById('programEffect');
      const programImpactEl = document.getElementById('programImpact');

      if (missionTypeEl) missionTypeEl.textContent = m.type;
      if (missionLeadEl) missionLeadEl.textContent = m.lead;
      if (missionListEl) missionListEl.innerHTML = m.items.length ? m.items.map(x=>`<div class="missionchip">${x}</div>`).join('') : '<div class="hint">No mission yet.</div>';
      if (decisionReasonEl) decisionReasonEl.textContent = m.reason;
      if (homeMissionEl) homeMissionEl.innerHTML = m.items.length ? m.items.map(x=>`<div class="missionchip">${x}</div>`).join('') : '<div class="hint">No mission yet.</div>';
      if (coachMessageEl) coachMessageEl.textContent = `${m.lead}`;
      const insight = computeProgramInsight(programName, checkins);
      if (programEffectEl) programEffectEl.textContent = insight;
      if (programImpactEl) programImpactEl.textContent = insight;
    } catch (err) {
      console.log('Program engine enhancement error', err);
    }
  }
}

/* Re-render after program selection change */
document.querySelectorAll('.prog').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      try { if (typeof renderHome === 'function') renderHome(); } catch(e) {}
    }, 10);
  });
});

setTimeout(() => {
  try { if (typeof renderHome === 'function') renderHome(); } catch(e) {}
}, 80);


/* ===== v5.4 Program Workout Mapping ===== */
const PROGRAM_WORKOUTS = {
  "30 Day Reset": [
    ["Walk + Core Reset","Low stress reset session",["Brisk walk 20 min","Bird Dog 3 rounds","McGill Curl-Up 3 rounds","Plank 3x30 sec"]],
    ["Full Body Basic Strength","Controlled full-body base",["Incline DB Press 3x10","Chest Supported Row 3x10","Leg Press 3x12","Face Pull 3x15"]],
    ["Recovery Pump","Get blood flow without overloading",["Cable Fly 3x15","Seated Cable Row 3x12","Lateral Raise 3x15","Hammer Curl 3x15"]],
    ["Mobility Day","Recovery and movement quality",["Bird Dog 3 rounds","McGill Curl-Up 3 rounds","Plank 3x30 sec","Brisk walk 15 min"]]
  ],
  "Travel Survival": [
    ["Hotel Room 20 Min","Fast bodyweight travel session",["Pushups burnout","Bodyweight box squat 3x12","Bird Dog 3x10","Brisk walk 10 min"]],
    ["Dumbbell Express","Minimal equipment hotel session",["Flat DB Press 3x12","Goblet Squat 3x12","Chest Supported Row 3x12","Seated DB Shoulder Press 3x10"]],
    ["Airport Mobility","Movement while traveling",["Bird Dog 3 rounds","McGill Curl-Up 3 rounds","Brisk walk 15 min","Plank 3x30 sec"]],
    ["Treadmill Burn","Simple movement win",["Treadmill incline walk 20 min","Plank 3x30 sec","Face Pull 3x15"]]
  ],
  "55+ Joint Smart Strength": [
    ["Joint Safe Push","Protected pressing emphasis",["Incline DB Press 3x10","Cable Fly 3x15","Rope Pushdown 3x12","Lateral Raise 3x15"]],
    ["Back + Core Stability","Spine-friendly strength",["Chest Supported Row 4x10","Face Pull 3x15","Bird Dog 3 rounds","McGill Curl-Up 3 rounds"]],
    ["Knee Friendly Legs","Lower stress lower body",["Leg Press 3x12","Hamstring Curl 3x15","Calf Raise 3x15","Side Plank 3 rounds"]],
    ["Shoulder Armor","Upper body support work",["Seated DB Shoulder Press 3x10","Rear Delt Fly 3x15","Face Pull 3x15","Hammer Curl 3x15"]]
  ],
  "Belly Fat Kill Mode": [
    ["Fat Burn Circuit","Higher movement density",["Incline DB Press 3x10","Chest Supported Row 3x10","Goblet Squat 3x12","Brisk walk 10 min"]],
    ["Upper Density Day","Push pace and volume",["Flat DB Press 3x10","Lat Pulldown 3x12","Rope Pushdown 3x12","DB Curl 3x12"]],
    ["Lower + Steps Combo","Legs plus movement bias",["Leg Press 3x12","Hamstring Curl 3x15","Calf Raise 3x15","Brisk walk 15 min"]],
    ["Conditioning Blast","Finish strong",["Treadmill incline walk 20 min","Pushups burnout","Plank 3x30 sec","Farmer Carry 4 rounds"]]
  ]
};

function getProgramWorkoutLibrary(){
  const programName = (typeof gp === 'function') ? gp() : '30 Day Reset';
  return PROGRAM_WORKOUTS[programName] || PROGRAM_WORKOUTS["30 Day Reset"];
}

function renderTrainByProgram(){
  try {
    const library = getProgramWorkoutLibrary();
    const programName = (typeof gp === 'function') ? gp() : '30 Day Reset';
    const hintEl = document.getElementById('trainProgramHint');
    if (hintEl) {
      hintEl.textContent = `${programName} is active. Train is now mapped to this program's workout library.`;
    }
    const listEl = document.getElementById('trainList');
    if (!listEl) return;

    listEl.innerHTML = library.map(w => {
      const m = (typeof meta === 'function') ? meta(w[2][0]) : ["🎬","See example link for form.","1","work",60];
      const links = w[2].map(x => `<a class="video" href="${link(x)}" target="_blank">${base(x)}</a>`).join(' ');
      return `<div class="card">
        <div class="row">
          <div>
            <div class="title">${w[0]}</div>
            <div class="small">${w[1]}</div>
          </div>
          <div class="badge">${w[2].length} ex</div>
        </div>
        <div class="icon">${m[0]}</div>
        <div class="hint">${m[1]}</div>
        ${w[2].map(x=>`<div class="hist">${x}</div>`).join('')}
        <div class="links">
          <a class="video primary" href="${link(w[2][0])}" target="_blank">▶ Watch Main Exercise</a>
          ${links}
        </div>
        <button class="start mapped-start" data-name="${w[0]}" style="margin-top:12px;width:100%">Start Session</button>
      </div>`;
    }).join('');

    document.querySelectorAll('.mapped-start').forEach(btn => {
      btn.addEventListener('click', () => {
        const selected = library.find(x => x[0] === btn.dataset.name);
        if (selected && typeof startS === 'function') startS(selected);
      });
    });
  } catch (err) {
    console.log('Program workout mapping render error', err);
  }
}

/* Override or wrap existing renderTrain */
if (typeof renderTrain === 'function') {
  renderTrain = function(){
    renderTrainByProgram();
  }
}

/* Re-render train whenever a program changes */
document.querySelectorAll('.prog').forEach(btn => {
  btn.addEventListener('click', () => {
    setTimeout(() => {
      try {
        renderTrainByProgram();
        if (typeof renderHome === 'function') renderHome();
      } catch(e) {}
    }, 20);
  });
});

/* Run mapped training render after load */
setTimeout(() => {
  try { renderTrainByProgram(); } catch(e) {}
}, 120);


/* ===== v5.4.1 Program Change Sync Fix ===== */
function syncProgramUI(){
  try{
    const programName = (typeof gp === 'function') ? gp() : '30 Day Reset';
    document.querySelectorAll('.prog').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.p === programName);
    });
    if (typeof renderTrainByProgram === 'function') renderTrainByProgram();
    if (typeof renderHome === 'function') renderHome();
  }catch(err){
    console.log('syncProgramUI error', err);
  }
}

/* Override program button behavior so selection always re-renders immediately */
document.querySelectorAll('.prog').forEach(btn => {
  btn.onclick = () => {
    try{
      if (typeof sp === 'function') sp(btn.dataset.p);
      document.getElementById('programStatus').textContent = `Active program: ${btn.dataset.p}`;
      syncProgramUI();
    }catch(err){
      console.log('program button click error', err);
    }
  };
});

/* Also re-render Train any time Train tab is opened */
document.querySelectorAll('.tab').forEach(btn => {
  const originalClick = btn.onclick;
  btn.onclick = () => {
    if (originalClick) originalClick();
    try{
      if (btn.dataset.t === 'train') {
        syncProgramUI();
      }
      if (btn.dataset.t === 'programs') {
        document.querySelectorAll('.prog').forEach(p => p.classList.toggle('active', p.dataset.p === ((typeof gp === 'function') ? gp() : '30 Day Reset')));
      }
    }catch(err){
      console.log('tab sync error', err);
    }
  };
});

/* Run one last hard sync after load */
setTimeout(() => {
  syncProgramUI();
}, 250);


/* ===== v5.5 Progress Engine ===== */
function safeNum(v){
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
}

function recentNumericTrend(items, field){
  const vals = items
    .map(x => ({date: x.date || '', value: safeNum(x[field])}))
    .filter(x => x.value > 0)
    .sort((a,b)=>(a.date||'').localeCompare(b.date||''));
  if (vals.length < 2) return null;
  const first = vals[0].value;
  const last = vals[vals.length - 1].value;
  return {first, last, delta: +(last - first).toFixed(1), count: vals.length};
}

function computeCompliance(checkins){
  const recent = [...checkins].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-7);
  if (!recent.length) return null;
  let points = 0;
  recent.forEach(x => {
    const protein = safeNum(x.proteinActual || x.proteinGoal);
    const steps = safeNum(x.stepsActual || x.stepsGoal);
    const nutrition = (x.nutritionCompliance || '').toLowerCase();
    if (protein >= 150) points += 1;
    if (steps >= 4000) points += 1;
    if (nutrition === 'clean' || nutrition === 'mostly' || nutrition === '') points += 1;
  });
  const maxPoints = recent.length * 3;
  return Math.round((points / maxPoints) * 100);
}

function computeWeeklyScore(checkins, workouts){
  const recentCheckins = [...checkins].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-7);
  const recentWorkouts = [...workouts].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-7);
  let score = 0;
  recentCheckins.forEach(x => {
    score += Math.min(safeNum(x.energy || 0), 10) * 3;
    score += Math.min(safeNum(x.sleep || 0), 10) * 2;
    score += Math.max(0, 10 - safeNum(x.backPain || 0) - safeNum(x.kneePain || 0)) * 1.5;
  });
  score += recentWorkouts.length * 12;
  const maxScore = Math.max(1, recentCheckins.length * (10*3 + 10*2 + 10*1.5) + 7*12);
  return Math.round((score / maxScore) * 100);
}

function computeWorkoutFrequency(workouts){
  const recent = [...workouts].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-14);
  return recent.length;
}

function progressClass(delta, directionGood){
  if (delta === null || delta === undefined) return '';
  if (directionGood === 'down'){
    if (delta < 0) return 'progress-good';
    if (delta > 0) return 'progress-bad';
    return 'progress-warn';
  }
  if (directionGood === 'up'){
    if (delta > 0) return 'progress-good';
    if (delta < 0) return 'progress-bad';
    return 'progress-warn';
  }
  return '';
}

function renderProgressEngine(){
  const checkins = (typeof gc === 'function') ? gc() : [];
  const workouts = (typeof gw === 'function') ? gw() : [];

  const weightTrend = recentNumericTrend(checkins.slice(-10), 'weight');
  const waistTrend = recentNumericTrend(checkins.slice(-10), 'waist');
  const compliance = computeCompliance(checkins);
  const weeklyScore = computeWeeklyScore(checkins, workouts);
  const workoutFreq = computeWorkoutFrequency(workouts);

  const weightEl = document.getElementById('weightChangeStat');
  const waistEl = document.getElementById('waistChangeStat');
  const compEl = document.getElementById('complianceStat');
  const weeklyEl = document.getElementById('weeklyScoreStat');
  const summaryEl = document.getElementById('progressSummary');
  const strengthEl = document.getElementById('strengthProgress');
  const scorecardEl = document.getElementById('weeklyScorecard');

  if (weightEl){
    if (weightTrend){
      weightEl.textContent = `${weightTrend.delta > 0 ? '+' : ''}${weightTrend.delta} lb`;
      weightEl.className = `big ${progressClass(weightTrend.delta, 'down')}`.trim();
    } else {
      weightEl.textContent = '--';
    }
  }

  if (waistEl){
    if (waistTrend){
      waistEl.textContent = `${waistTrend.delta > 0 ? '+' : ''}${waistTrend.delta} in`;
      waistEl.className = `big ${progressClass(waistTrend.delta, 'down')}`.trim();
    } else {
      waistEl.textContent = '--';
    }
  }

  if (compEl) compEl.textContent = compliance !== null ? `${compliance}%` : '--';
  if (weeklyEl) weeklyEl.textContent = `${weeklyScore}%`;

  if (summaryEl){
    if (!checkins.length){
      summaryEl.textContent = 'Log check-ins and workouts to unlock progress insights.';
    } else {
      const wt = weightTrend ? `${weightTrend.delta > 0 ? 'up' : weightTrend.delta < 0 ? 'down' : 'flat'} ${Math.abs(weightTrend.delta)} lb` : 'not enough weight data';
      const ws = waistTrend ? `${waistTrend.delta > 0 ? 'up' : waistTrend.delta < 0 ? 'down' : 'flat'} ${Math.abs(waistTrend.delta)} in` : 'not enough waist data';
      summaryEl.textContent = `Recent trend: weight ${wt}, waist ${ws}, compliance ${compliance !== null ? compliance + '%' : '--'}, workouts in last 14 entries window: ${workoutFreq}.`;
    }
  }

  if (strengthEl){
    if (!workouts.length){
      strengthEl.textContent = 'Complete workouts to build this section.';
    } else {
      const recent = [...workouts].sort((a,b)=>(a.date||'').localeCompare(b.date||'')).slice(-5);
      const avgCompletion = Math.round(recent.reduce((acc,w)=>acc + (safeNum(w.completed)/Math.max(1,safeNum(w.total)))*100, 0) / recent.length);
      strengthEl.textContent = `Recent workout completion quality: ${avgCompletion}%. Sessions logged: ${workouts.length}. Use this as your consistency strength marker until exercise-level load tracking is added.`;
    }
  }

  if (scorecardEl){
    const rows = [];
    rows.push(`<div class="hist">Founder Discipline Score: ${weeklyScore}%</div>`);
    rows.push(`<div class="hist">7-check-in Compliance: ${compliance !== null ? compliance + '%' : '--'}</div>`);
    rows.push(`<div class="hist">Workout Frequency: ${workoutFreq} recent sessions logged</div>`);
    if (weightTrend) rows.push(`<div class="hist">Weight Trend: ${weightTrend.delta > 0 ? '+' : ''}${weightTrend.delta} lb</div>`);
    if (waistTrend) rows.push(`<div class="hist">Waist Trend: ${waistTrend.delta > 0 ? '+' : ''}${waistTrend.delta} in</div>`);
    scorecardEl.innerHTML = rows.join('');
  }
}

/* Hook into existing render cycle */
if (typeof renderHome === 'function') {
  const _renderHomeV55Base = renderHome;
  renderHome = function(){
    _renderHomeV55Base();
    try { renderProgressEngine(); } catch(e) { console.log('progress render hook error', e); }
  };
}

/* Refresh progress after check-in and workout completion */
setTimeout(() => {
  try { renderProgressEngine(); } catch(e) {}
}, 120);
