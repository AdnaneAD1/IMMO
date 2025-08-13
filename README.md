# 🏡 ImmoMarket - Marketplace Immobilière

Une marketplace immobilière moderne et responsive construite avec **Next.js 15**, **TypeScript** et **Tailwind CSS**. ImmoMarket connecte particuliers et agences pour des transactions immobilières transparentes et sécurisées.

![Next.js](https://img.shields.io/badge/Next.js-15.4.6-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.0-38B2AC)

## ✨ Fonctionnalités

### 🔍 Recherche Avancée
- Filtres intelligents par prix, localisation, type de bien, surface, nombre de pièces
- Recherche par mots-clés avec suggestions
- Tri par pertinence, prix, date

### 🏠 Gestion des Annonces
- Affichage responsive en grille ou liste
- Différenciation visuelle entre particuliers et agences
- Système d'annonces premium avec mise en avant
- Galerie photos avec prévisualisation

### 💬 Messagerie Intégrée
- Interface de communication entre acheteurs/loueurs et vendeurs/agences
- Système de conversations par propriété
- Interface mockée prête pour l'intégration backend

### 🏆 Système Premium
- Badges premium pour les annonces mises en avant
- Positionnement prioritaire dans les résultats
- Statistiques de vues et favoris

### 🎨 Design Moderne
- Interface responsive et fluide
- Animations légères au survol
- Couleurs sobres et professionnelles
- Typographie claire et lisible

## 🚀 Technologies Utilisées

- **Framework** : Next.js 15 avec App Router
- **Langage** : TypeScript
- **Styling** : Tailwind CSS
- **Icônes** : Lucide React
- **Linting** : ESLint
- **Architecture** : Composants modulaires et réutilisables

## 📁 Structure du Projet

```
src/
├── app/                    # Pages App Router
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   └── properties/        # Pages des propriétés
├── components/            # Composants React
│   ├── layout/           # Header, Footer
│   ├── properties/       # Composants liés aux propriétés
│   └── ui/               # Composants UI réutilisables
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires et helpers
├── services/             # Services API mockés
└── types/                # Types TypeScript
```

## 🛠️ Installation et Démarrage

### Prérequis
- Node.js 18+ 
- npm ou yarn

### Installation

1. **Cloner le projet**
```bash
git clone <repository-url>
cd marketplace
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir dans le navigateur**
```
http://localhost:3000
```

## 📜 Scripts Disponibles

```bash
npm run dev          # Démarrer le serveur de développement
npm run build        # Construire pour la production
npm run start        # Démarrer le serveur de production
npm run lint         # Lancer ESLint
```

## 🏗️ Architecture

### Composants Principaux

- **PropertyCard** : Carte d'affichage des propriétés avec variantes (compact, featured)
- **SearchFilters** : Composant de recherche avancée avec filtres
- **Header/Footer** : Layout responsive avec navigation
- **Layout** : Structure principale avec SEO optimisé

### Services

- **PropertyService** : API mockée pour la gestion des propriétés
- **Hooks personnalisés** : useProperties, useSearch, useFeaturedProperties

### Types TypeScript

Types complets pour :
- Property, Agent, Location
- SearchFilters, Message, Conversation
- User et préférences

## 🎨 Design System

### Couleurs
- **Primary** : Bleu (#2563eb)
- **Secondary** : Jaune (#eab308) pour les éléments premium
- **Neutral** : Gris pour le texte et arrière-plans
- **Success** : Vert pour les validations
- **Error** : Rouge pour les erreurs

### Composants UI
- Cards avec hover effects
- Boutons avec states (hover, active, disabled)
- Formulaires avec validation visuelle
- Loading states et skeletons

## 🔮 Fonctionnalités Futures

### Prêt pour l'intégration
- **Backend API** : Structure préparée pour REST/GraphQL
- **Authentification** : Hooks et composants prêts
- **Paiements** : Architecture pour Stripe/PayPal
- **Géolocalisation** : Composants carte intégrables
- **Notifications** : Système de messaging temps réel
- **Enchères** : Structure pour système d'enchères

### Extensions possibles
- Application mobile React Native
- Dashboard administrateur
- Analytics et reporting
- Intégration CRM
- API publique pour développeurs

## 📱 Pages Disponibles

- **/** : Page d'accueil avec hero, featured properties, stats
- **/properties** : Liste des propriétés avec filtres avancés
- **/properties/[id]** : Détail d'une propriété (à implémenter)
- **/favorites** : Favoris utilisateur (à implémenter)
- **/messages** : Messagerie (à implémenter)
- **/profile** : Profil utilisateur (à implémenter)

## 🔧 Configuration

### Tailwind CSS
Configuration personnalisée dans `tailwind.config.ts` avec :
- Couleurs de marque
- Spacing personnalisé
- Breakpoints responsive
- Animations

### TypeScript
Configuration stricte dans `tsconfig.json` pour :
- Types stricts
- Paths absolus (@/)
- Optimisations de build

## 📊 Performance

### Optimisations incluses
- **Images** : Next.js Image avec lazy loading
- **Bundle** : Code splitting automatique
- **CSS** : Purge automatique avec Tailwind
- **SEO** : Meta tags et Open Graph
- **Accessibility** : ARIA labels et navigation clavier

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👨‍💻 Auteur

**ImmoMarket Team**
- Website: [immomarket.fr](https://immomarket.fr)
- Email: contact@immomarket.fr

---

*Construit avec ❤️ en utilisant Next.js et TypeScript*
