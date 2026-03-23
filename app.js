const API = "https://therocks03.github.io/sambandh_GPT";
const CLINIC_ID = "clinic_1";

/* Navigation */
function showPage(page) {
document.querySelectorAll(".page").forEach(p => p.style.display="none");
document.getElementById(page).style.display = "block";
}

/* Patients */
async function addPatient() {
const name = document.getElementById("name").value;
const phone = document.getElementById("phone").value;

await fetch(`${API}/customers/add`, {
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({ clinicId:CLINIC_ID, name, phone })
});

loadPatients();
}

async function loadPatients() {
const res = await fetch(`${API}/customers/${CLINIC_ID}`);
const data = await res.json();

document.getElementById("totalPatients").innerText = data.length;

const table = document.getElementById("patientTable");
table.innerHTML = data.map(p => `     <tr>       <td>${p.name}</td>       <td>${p.phone}</td>       <td><button onclick="wa('${p.phone}')">WA</button></td>     </tr>
  `).join("");
}

function wa(phone){
window.open(`https://wa.me/${phone}`);
}

/* Churn */
async function runChurn() {
await fetch(`${API}/automation/run/${CLINIC_ID}`);
alert("AI Run Complete");
}

/* Admin */
async function loadUsers() {
const res = await fetch(`${API}/admin/users`, {
headers:{ role:"admin" }
});
const users = await res.json();

document.getElementById("totalUsers").innerText = users.length;

const table = document.getElementById("userTable");

table.innerHTML = users.map(u => `     <tr>       <td>${u.businessName}</td>       <td>${u.plan}</td>       <td>${u.isActive ? "Active" : "Disabled"}</td>     </tr>
  `).join("");
}

async function loadRevenue(){
const res = await fetch(`${API}/admin/revenue`, {
headers:{ role:"admin" }
});
const data = await res.json();
document.getElementById("totalRevenue").innerText = data.totalRevenue;
}

async function runGlobalAI(){
await fetch(`${API}/admin/run-all`, {
headers:{ role:"admin" }
});
alert("Global AI Triggered");
}

/* Init */
loadPatients();
loadUsers();
loadRevenue();
