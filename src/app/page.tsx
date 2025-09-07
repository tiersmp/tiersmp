import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CustomLink from '@/components/ui/CustomLink';

export default function Home() {
  return (
    <>
      <Header />
      
      <main>
        <section className="hero">
          <div className="hero-card">
            <h1>Découvrez le Top des SMP FR</h1>
            <p className="lead">
              Évaluez et trouvez les serveurs SMP francophones selon qualité, originalité, 
              identité visuelle et communauté.
            </p>
            <div className="cta flex flex-wrap gap-4 justify-center">
              <CustomLink href="/tester" className="btn btn-primary">Soumettre mon SMP</CustomLink>
              <CustomLink href="/criteres" className="btn btn-secondary">Voir les critères</CustomLink>
            </div>
          </div>
        </section>

        <section className="section card">
          <h2>Pourquoi SmpTier ?</h2>
          <p className="lead">
            Un classement clair et transparent pour aider les joueurs à trouver les serveurs qui valent le coup. 
            Chaque SMP est évalué manuellement par notre équipe.
          </p>
          <p className="lead">
            Mises à jour régulières et critères détaillés pour un classement précis.
          </p>
          <p className="lead">
            Rejoignez notre{' '}
            <a href="https://discord.gg/qQcJsSXDR6" target="_blank" rel="noopener noreferrer">
              Discord
            </a>{' '}
            pour suivre l'évolution des SMP.
          </p>
        </section>
      </main>

      <Footer />
    </>
  );
}
