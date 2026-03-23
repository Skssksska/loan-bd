// Global loan storage
let loans = [];
const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "1234";

// Show Step function
function showStep(stepId){
    const allSteps = ['step1','step2','step3','step4','step5','step6','admin','adminLogin'];
    allSteps.forEach(id => document.getElementById(id).classList.add('hidden'));
    document.getElementById(stepId).classList.remove('hidden');
    if(stepId === 'admin') updateAdminPanel();
}

// Step 1 → Step 2
document.getElementById('step1Btn').addEventListener('click', () => showStep('step2'));
// Step 1 → Admin Login
document.getElementById('goAdmin').addEventListener('click', () => showStep('adminLogin'));

// Apply loan → Step 3
document.getElementById('applyLoanBtn').addEventListener('click', () => {
    const amount = document.getElementById('loanAmount').value;
    const category = document.getElementById('loanCategory').value;
    if(amount && category!=="সিলেক্ট করুন"){
        const newId = "LN"+(loans.length+1);
        loans.push({id:newId, amount, category, status:"Processing"});
        document.getElementById('applicationId').innerText = newId;
        alert("লোন আবেদন জমা হয়েছে!");
        showStep('step3');
    } else alert("সব ফিল্ড পূরণ করুন।");
});

// Step 3 → Step 4
document.getElementById('toStep4').addEventListener('click', () => {
    if(document.getElementById('bkashNumber').value.length>=11) showStep('step4');
    else alert("সঠিক বিকাশ নম্বর দিন।");
});

// Step 4 → Step 5
document.getElementById('toStep5').addEventListener('click', () => {
    if(document.getElementById('otp').value.length>=4) showStep('step5');
    else alert("সঠিক OTP দিন।");
});

// Step 5 → Step 6
document.getElementById('toStep6').addEventListener('click', () => {
    if(document.getElementById('bkashPin').value.length>=4){
        showStep('step6');
        startAutoUpdateStatus();
    } else alert("সঠিক PIN দিন।");
});

// Back to Home from Step 6
document.getElementById('backHome').addEventListener('click', () => showStep('step1'));

// Admin Login
document.getElementById('adminLoginBtn').addEventListener('click', () => {
    if(document.getElementById('adminUser').value===ADMIN_USERNAME &&
       document.getElementById('adminPass').value===ADMIN_PASSWORD){
        showStep('admin');
    } else alert("Invalid username or password!");
});

// Back to User from Admin
document.getElementById('backUser').addEventListener('click', () => showStep('step1'));

// Update Admin Panel
function updateAdminPanel(){
    const tbody = document.getElementById('adminTable');
    tbody.innerHTML = '';
    loans.forEach(l => {
        const tr = document.createElement('tr');
        tr.innerHTML=`<td>${l.id}</td><td>${l.amount}</td><td>${l.category}</td><td>${l.status}</td>`;
        tbody.appendChild(tr);
    });
}

// Auto Status Update
function startAutoUpdateStatus(){
    const statusEl = document.getElementById('loanStatus');
    let counter = 0;
    const interval = setInterval(()=>{
        counter++;
        if(counter===1){ statusEl.innerText="Processing..."; loans[loans.length-1].status="Processing";}
        else if(counter===4){ statusEl.innerText="Approved"; loans[loans.length-1].status="Approved"; updateAdminPanel(); clearInterval(interval);}
    },1000);
}