if(sessionStorage.getItem('ms_admin')!=='1')location.href='login.html';
const services=()=>JSON.parse(localStorage.getItem('ms_services')||'null')||[
{id:1,name:'Manutenção de Computadores',icon:'🖥️',description:'Diagnóstico, limpeza, formatação, instalação e otimização de computadores.'},
{id:2,name:'Redes Residenciais',icon:'📡',description:'Instalação e configuração de redes, Wi-Fi, roteadores e equipamentos.'},
{id:3,name:'Redes Empresariais',icon:'🌐',description:'Estruturação, organização e suporte de redes para empresas.'},
{id:4,name:'Suporte Técnico',icon:'🛠️',description:'Atendimento técnico para resolver problemas de hardware e software.'},
{id:5,name:'Instalação de Sistemas',icon:'⚙️',description:'Instalação e configuração de sistemas, drivers e aplicativos.'},
{id:6,name:'Consultoria em TI',icon:'💡',description:'Orientação para melhorar segurança, desempenho e infraestrutura.'}];
const save=s=>localStorage.setItem('ms_services',JSON.stringify(s));
const reqs=()=>JSON.parse(localStorage.getItem('ms_requests')||'[]');
const esc=v=>String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
function renderServices(){
 const s=services(); document.querySelector('#statServices').textContent=s.length;
 document.querySelector('#serviceList').innerHTML=s.map(x=>`<div style="padding:10px 0;border-bottom:1px solid #eee"><b>${esc(x.icon)} ${esc(x.name)}</b><br><small>${esc(x.description)}</small><br><button class="btn btn-small danger" onclick="removeService(${x.id})">Excluir</button></div>`).join('');
 const sel=document.querySelector('#filterService'); const old=sel.value; sel.innerHTML='<option value="">Todos os serviços</option>'+s.map(x=>`<option>${esc(x.name)}</option>`).join('');sel.value=old;
}
function removeService(id){if(confirm('Excluir este serviço?')){save(services().filter(x=>x.id!==id));renderServices()}}
document.querySelector('#serviceForm').addEventListener('submit',e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));const s=services();s.push({id:Date.now(),...d});save(s);e.target.reset();renderServices()});
function renderRequests(){
 let r=reqs();const date=document.querySelector('#filterDate').value,service=document.querySelector('#filterService').value;
 if(date)r=r.filter(x=>x.date.slice(0,10)===date);if(service)r=r.filter(x=>x.service===service);
 document.querySelector('#statRequests').textContent=reqs().length;
 const now=new Date();document.querySelector('#statMonth').textContent=reqs().filter(x=>{const d=new Date(x.date);return d.getMonth()===now.getMonth()&&d.getFullYear()===now.getFullYear()}).length;
 document.querySelector('#requests').innerHTML=r.length?r.map((x,i)=>`<tr><td>${new Date(x.date).toLocaleString('pt-BR')}</td><td>${esc(x.name)}</td><td>${esc(x.phone)}</td><td>${esc(x.service)}</td><td>${esc(x.message)}</td><td><button class="btn btn-small danger" onclick="removeRequest(${reqs().indexOf(x)})">Excluir</button></td></tr>`).join(''):'<tr><td colspan="6">Nenhuma solicitação encontrada.</td></tr>';
}
function removeRequest(i){if(confirm('Excluir esta solicitação?')){const r=reqs();r.splice(i,1);localStorage.setItem('ms_requests',JSON.stringify(r));renderRequests()}}
function clearFilters(){document.querySelector('#filterDate').value='';document.querySelector('#filterService').value='';renderRequests()}
function logout(){sessionStorage.removeItem('ms_admin');location.href='login.html'}
renderServices();renderRequests();