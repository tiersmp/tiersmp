# SmpTier - Classement des meilleurs SMP francophones

SmpTier est une plateforme permettant de classer et d'évaluer les serveurs SMP (Survival Multiplayer) francophones selon différents critères de qualité. Ce projet a été migré vers Next.js pour une meilleure performance et une meilleure maintenabilité.

## Fonctionnalités

- 📊 Classement public des meilleurs SMP francophones
- 📝 Formulaire de soumission de nouveaux SMP
- 🔍 Système de notation basé sur plusieurs critères
- 🔐 Interface d'administration pour la modération
- 📱 Design responsive pour tous les appareils

## Prérequis

- Node.js 16.14.0 ou supérieur
- Compte Firebase avec les services Firestore activés
- npm ou yarn

## Installation

1. Cloner le dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/tiersmp.git
   cd tiersmp
   ```

2. Installer les dépendances :
   ```bash
   npm install
   # ou
   yarn
   ```

3. Configurer les variables d'environnement :
   - Copier le fichier `.env.local.example` vers `.env.local`
   - Remplir les variables d'environnement avec vos informations Firebase

4. Démarrer le serveur de développement :
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## Configuration Firebase

1. Allez sur la [console Firebase](https://console.firebase.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez Firestore Database
4. Allez dans les paramètres du projet > Applications Web
5. Créez une nouvelle application web et notez la configuration
6. Mettez à jour les variables d'environnement dans `.env.local`

## Structure du projet

```
src/
├── app/                    # Dossier principal de l'application Next.js
│   ├── admin/              # Page d'administration
│   ├── classement/         # Page de classement des SMP
│   ├── criteres/           # Page des critères de notation
│   ├── tester/             # Formulaire de soumission
│   ├── track/              # Suivi de soumission
│   ├── globals.css         # Styles globaux
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Page d'accueil
├── components/             # Composants réutilisables
│   ├── Footer.tsx
│   └── Header.tsx
└── lib/                    # Utilitaires et configurations
    └── firebase.ts         # Configuration Firebase
```

## Déploiement

### Vercel (Recommandé)

1. Poussez votre code sur GitHub, GitLab ou Bitbucket
2. Connectez-vous à [Vercel](https://vercel.com/)
3. Importez votre dépôt
4. Ajoutez les variables d'environnement
5. Cliquez sur Déployer

### Autres plateformes

Vous pouvez également déployer sur n'importe quelle plateforme supportant Next.js :

- [Netlify](https://www.netlify.com/)
- [AWS Amplify](https://aws.amazon.com/amplify/)
- [Heroku](https://www.heroku.com/)
- Votre propre serveur avec Node.js

## Contribution

Les contributions sont les bienvenues ! Voici comment contribuer :

1. Forkez le projet
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-nouvelle-fonctionnalite`)
3. Committez vos changements (`git commit -am 'Ajout d\'une nouvelle fonctionnalité'`)
4. Poussez vers la branche (`git push origin feature/ma-nouvelle-fonctionnalite`)
5. Créez une Pull Request

## Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## Remerciements

- [Next.js](https://nextjs.org/) - Le framework React pour les applications web
- [Firebase](https://firebase.google.com/) - Plateforme de développement d'applications
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire
- [TypeScript](https://www.typescriptlang.org/) - JavaScript typé à l'échelle