const EVENTS = [
  {date:"2027-01-11",title:"Production kickoff",time:"4:00–5:30 PM",place:"Rehearsal Studio A",details:"Meet the team, review the production timeline and discuss next steps."},
  {date:"2027-01-14",title:"First table read",time:"6:00–8:00 PM",place:"Rehearsal Studio A",details:"Bring a notebook and your first draft of the script."},
  {date:"2027-01-18",title:"Cast biographies due",time:"All day",place:"Online",details:"Submit a 50–100 word bio using the form on this website."},
  {date:"2027-01-20",title:"Creative planning session",time:"5:30–7:00 PM",place:"Design Room",details:"Discuss the visual direction, lighting and design references."},
  {date:"2027-01-25",title:"Blocking rehearsal",time:"6:00–8:30 PM",place:"Main Stage",details:"Work through scenes 1–3 and establish key movement."},
  {date:"2027-02-02",title:"Technical check-in",time:"5:00–6:00 PM",place:"Main Stage",details:"Review the technical requirements and any equipment needs."},
  {date:"2027-02-09",title:"Run-through",time:"6:00–9:00 PM",place:"Main Stage",details:"Full group rehearsal and notes."},
  {date:"2027-03-03",title:"Production meeting",time:"4:00–5:00 PM",place:"Meeting Room",details:"Check milestones, responsibilities and next actions."}
];

const menu = document.getElementById('menu-toggle');
const nav = document.getElementById('site-nav');
menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened));});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));

const label=document.getElementById('month-label');
const grid=document.getElementById('calendar-grid');
const detail=document.getElementById('event-detail');
const today=new Date();
let month=new Date(2027,0,1);
let selected='2027-01-11';
const dateKey=(y,m,d)=>`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
function renderCalendar(){
  const y=month.getFullYear(),m=month.getMonth();
  label.textContent=new Intl.DateTimeFormat('en-CA',{month:'long',year:'numeric'}).format(month);
  grid.replaceChildren();
  const blanks=(new Date(y,m,1).getDay()+6)%7;
  const total=new Date(y,m+1,0).getDate();
  for(let j=0;j<blanks;j++){const spacer=document.createElement('span');spacer.className='calendar-day';spacer.setAttribute('aria-hidden','true');grid.append(spacer);}
  for(let d=1;d<=total;d++){
    const key=dateKey(y,m,d);const event=EVENTS.find(e=>e.date===key);
    const button=document.createElement('button');button.type='button';button.className='calendar-day'+(event?' event-day':'')+(key===selected?' selected':'')+(key===dateKey(today.getFullYear(),today.getMonth(),today.getDate())?' today':'');
    button.setAttribute('aria-label',`${key}${event?': '+event.title:''}`);button.setAttribute('aria-pressed',String(key===selected));
    const number=document.createElement('span');number.textContent=d;button.append(number);
    if(event){const dot=document.createElement('span');dot.className='event-marker';button.append(dot);}
    button.addEventListener('click',()=>{selected=key;renderCalendar();renderDetail(key);});grid.append(button);
  }
  renderDetail(selected);
}
function renderDetail(key){const e=EVENTS.find(x=>x.date===key);detail.replaceChildren();const date=document.createElement('p');date.className='event-date';date.textContent=new Date(key+'T12:00:00').toLocaleDateString('en-CA',{weekday:'long',month:'long',day:'numeric',year:'numeric'});detail.append(date);const title=document.createElement('h3');title.textContent=e?e.title:'No events scheduled';detail.append(title);if(e){const time=document.createElement('span');time.className='event-time';time.textContent=e.time;detail.append(time);const place=document.createElement('p');place.textContent='Location: '+e.place;detail.append(place);const notes=document.createElement('p');notes.textContent=e.details;detail.append(notes);}else{const msg=document.createElement('p');msg.textContent='Nothing planned for this day. Check the other highlighted dates.';detail.append(msg);}}
document.getElementById('prev-month').addEventListener('click',()=>{month=new Date(month.getFullYear(),month.getMonth()-1,1);selected=dateKey(month.getFullYear(),month.getMonth(),1);renderCalendar();});
document.getElementById('next-month').addEventListener('click',()=>{month=new Date(month.getFullYear(),month.getMonth()+1,1);selected=dateKey(month.getFullYear(),month.getMonth(),1);renderCalendar();});
document.getElementById('today-month').addEventListener('click',()=>{month=new Date(today.getFullYear(),today.getMonth(),1);selected=dateKey(today.getFullYear(),today.getMonth(),today.getDate());renderCalendar();});
renderCalendar();
