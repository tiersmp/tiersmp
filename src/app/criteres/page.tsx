import Header from '@/components/Header';
import Footer from '@/components/Footer';

const criteria = [
  {
    title: "1. Hébergement & stabilité",
    points: [
      "1.1 Qualité de l'hébergement : serveur dédié/cloud fiable (10), VPS correct (7), basique (4), gratuit/instable (0-2).",
      "1.2 Stabilité générale : aucun crash (10), rares crashs (7), fréquents (4), constant/insupportable (0-2)."
    ]
  },
  {
    title: "2. Twist / Gameplay",
    points: [
      "2.1 Originalité du twist : unique (10), intéressant mais déjà vu (7), peu original (4), banal (0-2).",
      "2.2 Profondeur & cohérence : gameplay riche et équilibré (10), intéressant mais déséquilibré (7), peu engageant (4), incohérent (0-2)."
    ]
  },
  {
    title: "3. Identité visuelle",
    points: [
      "3.1 Logo : original et non IA (10), correct (7), simple (4), inexistant/mauvais (0-2).",
      "3.2 Cohérence graphique : uniforme (10), partielle (7), faible (4), inexistante (0-2)."
    ]
  },
  {
    title: "4. Communauté & Modération",
    points: [
      "4.1 Activité et taille : communauté active (10), présente mais moins active (7), faible (4), inexistante (0-2).",
      "4.2 Qualité modération : active et claire (10), présente mais lente (7), faible ou incohérente (4), inexistante (0-2)."
    ]
  },
  {
    title: "5. Transparence",
    points: [
      "5.1 Règlement clair : complet et visible (10), correct mais incomplet (7), peu clair (4), inexistant (0-2).",
      "5.2 Anti-cheat et présentation de l'équipe : rigoureux et présent (10), partiel (7), faible (4), absent (0-2)."
    ]
  }
];

const tiers = [
  { range: "0-20", tier: "Tier 5", description: "Serveur très faible, à améliorer sur tous les aspects" },
  { range: "22-40", tier: "Tier 4", description: "Serveur faible, quelques points positifs mais manque de qualité globale" },
  { range: "42-60", tier: "Tier 3", description: "Serveur correct, gameplay intéressant, identité visuelle et communauté acceptables" },
  { range: "62-70", tier: "Tier 2", description: "Serveur de qualité, stable, twist original, communauté active" },
  { range: "72-80", tier: "Tier 1", description: "Serveur excellent, innovation et professionnalisme remarquables, modèle à suivre" }
];

export const metadata = {
  title: 'SmpTier — Critères',
  description: 'Découvrez les critères de classement des SMP francophones',
};

export default function CriteresPage() {
  return (
    <>
      <Header />
      
      <main>
        <section className="section card">
          <h2>Grille de notation et système de Tiers</h2>
          <div className="criteria-container">
            {criteria.map((criterion, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold mb-2 text-blue-400">{criterion.title}</h3>
                <ul className="list-disc pl-5 space-y-2 mb-4">
                  {criterion.points.map((point, pIndex) => (
                    <li key={pIndex} className="text-gray-300">{point}</li>
                  ))}
                </ul>
              </div>
            ))}

            <h2 className="text-2xl font-bold mt-10 mb-4 text-blue-400">
              Attribution des Tiers selon le score total
            </h2>
            <ul className="space-y-3">
              {tiers.map((tier, index) => (
                <li key={index} className="bg-gray-800 p-4 rounded-lg">
                  <span className="font-bold">{tier.range} points → {tier.tier} :</span> {tier.description}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
