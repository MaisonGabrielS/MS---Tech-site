const defaultServices=[
 {id:1,name:'Manutenção de Computadores',icon:'🖥️',description:'Diagnóstico, limpeza, formatação, instalação e otimização de computadores.'},
 {id:2,name:'Redes Residenciais',icon:'📡',description:'Instalação e configuração de redes, Wi-Fi, roteadores e equipamentos.'},
 {id:3,name:'Redes Empresariais',icon:'🌐',description:'Estruturação, organização e suporte de redes para empresas.'},
 {id:4,name:'Suporte Técnico',icon:'🛠️',description:'Atendimento técnico para resolver problemas de hardware e software.'},
 {id:5,name:'Instalação de Sistemas',icon:'⚙️',description:'Instalação e configuração de sistemas, drivers e aplicativos.'},
 {id:6,name:'Consultoria em TI',icon:'💡',description:'Orientação para melhorar segurança, desempenho e infraestrutura.'}
];
function getServices(){return JSON.parse(localStorage.getItem('ms_services')||'null')||defaultServices}
function saveServices(x){localStorage.setItem('ms_services',JSON.stringify(x))}
function renderServices(){
 const grid=document.querySelector('#servicesGrid'); if(!grid)return;
 const services=getServices();
 grid.innerHTML=services.map(s=>`<article class="card"><div class="icon">${s.icon||'💻'}</div><h3>${escapeHtml(s.name)}</h3><p>${escapeHtml(s.description)}</p></article>`).join('');
 const select=document.querySelector('#contactService');
 if(select) select.innerHTML='<option value="">Selecione o serviço</option>'+services.map(s=>`<option>${escapeHtml(s.name)}</option>`).join('');
}
function escapeHtml(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]))}
document.addEventListener('DOMContentLoaded',()=>{
 renderServices(); const y=document.querySelector('#year'); if(y)y.textContent=new Date().getFullYear();
 const form=document.querySelector('#contactForm');
 if(form)form.addEventListener('submit',e=>{
  e.preventDefault(); const d=Object.fromEntries(new FormData(form)); const requests=JSON.parse(localStorage.getItem('ms_requests')||'[]');
  requests.push({...d,date:new Date().toISOString()}); localStorage.setItem('ms_requests',JSON.stringify(requests));
  alert('Solicitação enviada com sucesso!'); form.reset();
 });
});