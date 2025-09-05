export const ADMIN_PASSWORD = "smpsecret";

export function requireAdminPassword() {
    const input = prompt("Mot de passe admin ?");
    return input === ADMIN_PASSWORD;
}
