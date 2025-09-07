'use client';

import CustomLink from './ui/CustomLink';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-6 md:mb-0">
            <img
              src="/logo.png"
              alt="SmpTier"
              width={32}
              height={32}
              className="rounded-full object-cover"
            />
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
              SmpTier
            </span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6">
            <CustomLink 
              href="/"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Accueil
            </CustomLink>
            <CustomLink 
              href="/classement"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Classement
            </CustomLink>
            <CustomLink 
              href="/criteres"
              className="text-foreground/80 hover:text-primary transition-colors"
            >
              Critères
            </CustomLink>
          </nav>
          
          <div className="mt-6 md:mt-0">
            <a 
              href="mailto:contact@smp-tier.fr" 
              className="text-foreground/60 hover:text-primary transition-colors text-sm"
            >
              Contact
            </a>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-border">
          <p className="text-center text-foreground/60 text-sm">
            &copy; {currentYear} Smp-Tier. Tous droits réservés.
          </p>
          <p className="mt-2 text-sm text-foreground/60 text-center">
            Fait avec ❤️ pour la communauté Minecraft
          </p>
        </div>
      </div>
    </footer>
  );
}
