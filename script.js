import { db } from './firebase-init.js';
import { collection, addDoc, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";
import { requireAdminPassword } from './helpers.js';

// Form inscription
const fileForm = document.getElementById("fileTestForm");
if (fileForm) {
  fileForm.addEventListener("submit", async e => {
    e.preventDefault();
    const name = document.getElementById("smpName").value;
    const discord = document.getElementById("smpDiscord").value;
    const ip = document.getElementById("smpIP").value;
    await addDoc(collection(db, "smp_inscriptions"), {name, discord, ip, date: new Date()});
    document.getElementById("fileMessage").innerText = "✅ Ton SMP a été inscrit !";
    fileForm.reset();
  });
}

// Classement public
const classementTable = document.getElementById("classementTable");
if (classementTable) {
  (async () => {
    const q = query(collection(db, "smp_public"), orderBy("tier"));
    const snap = await getDocs(q);
    snap.forEach(doc => {
      const d = doc.data();
      classementTable.innerHTML += `<tr><td>${d.name}</td><td>${d.discord}</td><td>${d.ip||"-"}</td><td>${d.tier}</td></tr>`;
    });
  })();
}

// Admin panel
const loadInscriptions = document.getElementById("loadInscriptions");
if (loadInscriptions) {
  loadInscriptions.addEventListener("click", async ()=> {
    if(!requireAdminPassword()) return alert("Accès refusé");
    const div = document.getElementById("inscriptions");
    div.innerHTML = "";
    const snap = await getDocs(collection(db, "smp_inscriptions"));
    snap.forEach(doc => {
      const d = doc.data();
      div.innerHTML += `<p>${d.name} - ${d.discord} (${d.ip||"-"})</p>`;
    });
  });
}

const loadClassement = document.getElementById("loadClassement");
if (loadClassement) {
  loadClassement.addEventListener("click", async ()=> {
    if(!requireAdminPassword()) return alert("Accès refusé");
    const div = document.getElementById("publicList");
    div.innerHTML = "";
    const snap = await getDocs(collection(db, "smp_public"));
    snap.forEach(doc => {
      const d = doc.data();
      div.innerHTML += `<p>${d.name} - Tier ${d.tier}</p>`;
    });
  });
}
