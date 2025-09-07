/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Configuration des images
  images: {
    domains: [
      'firebasestorage.googleapis.com',
      'smptiers.fr',
      'www.smptiers.fr'
    ],
    // Désactiver l'optimisation d'image pour les chemins spécifiques
    path: '/_next/image',
    // Désactiver le cache des images
    disableStaticImages: true,
  },
  // Configuration expérimentale
  experimental: {
    // Optimisations
    optimizeCss: false,
    optimizePackageImports: [],
    
    // Configuration CORS
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        '192.168.56.1:3000',
        'smptiers.fr',
        'www.smptiers.fr'
      ]
    }
  },
  // Configuration des alias pour les imports
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname + '/src',
    };
    return config;
  },
  // Configuration des en-têtes de sécurité
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
