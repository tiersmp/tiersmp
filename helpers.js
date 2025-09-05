// helpers.js
export const ADMIN_PASSWORD = "smpsecret"; // change le si besoin

export function requireAdminPassword() {
  const input = prompt("Mot de passe admin ?");
  if (input === ADMIN_PASSWORD) return true;
  alert("Mauvais mot de passe !");
  return false;
}

// petite utilité pour badges depuis modules qui importent helpers
export function tierBadgeHTML(tier){
  const t = Number(tier) || 5;
  return `<span class="badge tier-${t}">Tier ${t}</span>`;
}
