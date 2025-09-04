const ADMIN_PASSWORD = 'smpsecret';
const TEST_PASSWORD = 'testsecret';

function checkAdminPassword(){
  const pass = document.getElementById('adminPassword')?.value;
  if(pass === ADMIN_PASSWORD){
    document.getElementById('adminForm').style.display = 'block';
  } else alert('Mot de passe incorrect');
}

document.getElementById('addSMPForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const smp = {
    name: document.getElementById('adminSMPName').value,
    discord: document.getElementById('adminSMPDiscord').value,
    ip: document.getElementById('adminSMPIP').value,
    tier: document.getElementById('adminSMPTier').value
  };
  let smps = JSON.parse(localStorage.getItem('smps')) || [];
  smps.push(smp);
  localStorage.setItem('smps', JSON.stringify(smps));
  alert('SMP ajouté !');
  location.reload();
});

function loadClassement(){
  const table = document.getElementById('classementTable');
  if(!table) return;
  const smps = JSON.parse(localStorage.getItem('smps')) || [];
  table.innerHTML = '';
  smps.forEach(smp => {
    const row = document.createElement('tr');
    row.innerHTML = `<td>${smp.name}</td><td>${smp.discord}</td><td>${smp.ip || '-'}</td><td>${smp.tier}</td>`;
    table.appendChild(row);
  });
}
loadClassement();

document.getElementById('fileTestForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  let file = JSON.parse(localStorage.getItem('fileTest')) || [];
  file.push({name: document.getElementById('smpName').value, discord: document.getElementById('smpDiscord').value, ip: document.getElementById('smpIP').value});
  localStorage.setItem('fileTest', JSON.stringify(file));
  document.getElementById('fileMessage').innerText = 'Inscription réussie ! Patientez votre tour.';
  this.reset();
});

function checkTestPassword(){
  const pass = document.getElementById('testPassword')?.value;
  if(pass === TEST_PASSWORD){
    document.getElementById('questions').style.display = 'block';
  } else alert('Mot de passe incorrect');
}

document.getElementById('testForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  alert('Réponses enregistrées !');
  this.reset();
});