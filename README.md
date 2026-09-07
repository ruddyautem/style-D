# Style-D

<div align="center">

**[Français](#français)** · **[English](#english)**

</div>

---

## Français

### 📋 Présentation

Bienvenue sur le code source de **Style-D**, une boutique e-commerce streetwear développée avec React et Vite. L'objectif était de concevoir une application complète et fluide : exploration du catalogue, gestion du panier avec sélection multiple, authentification Firebase, historique des commandes et paiement sécurisé via Stripe.

### 📑 Les pages

| Route                   | Ce qu'on y trouve                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `/` (Accueil)           | La vitrine principale avec bannières défilantes, accès direct aux catégories et images optimisées.                     |
| `/shop`                 | Le catalogue complet, avec navigation par catégorie (chapeaux, vestes, baskets, etc.).                                |
| `/shop/:cat/:productId` | Page de détail de l'article avec sélecteur de taille (XS–XXL), réglage de quantité et invitation à la connexion.        |
| `/auth`                 | Page de connexion et inscription (email/mot de passe ou compte Google via Firebase Auth).                             |
| `/checkout`             | Récapitulatif du panier, sélection multiple, modale de confirmation, carte de test Stripe et affichage adapté mobile.  |
| `/orders`               | Historique des commandes passées avec le statut et le détail des articles.                                             |
| `/success` & `/failure` | Pages de retour après paiement Stripe (confirmation et validation du panier).                                          |

### 🌍 L'état global avec Zustand

Plutôt que d'utiliser Redux ou des Contextes complexes, j'ai choisi **Zustand** pour sa simplicité et sa légèreté :

- `cartStore` : Ajout/retrait d'articles, sélection multiple, calcul du total, modale de confirmation et synchronisation.
- `userStore` : Gestion de l'utilisateur connecté via Firebase Auth.
- `categoriesStore` : Récupération et mise en cache du catalogue Firestore.

### ✨ Fonctionnalités clés

- **Page produit dédiée & Tailles** : Page individuelle pour chaque article avec sélection de taille (XS à XXL), gestion de quantité, calcul du total en temps réel et rappel de connexion.
- **Défilement automatique (ScrollToTop)** : Remontée instantanée en haut de page à chaque changement de catégorie, de produit ou de route, pour un confort de navigation optimal sur mobile.
- **Gestion du panier** : Sélection multiple d'articles avec cases à cocher, barre d'actions groupées et modale de confirmation pour supprimer.
- **Navigation mobile & Gestes tactiles** : Menu catégories coulissant depuis la gauche, panier depuis la droite, et gestes de glissement tactiles (désactivés lors du zoom pour une navigation fluide).
- **Notifications (Toasts)** : Notifications interactives avec barre de temps animée, pause au survol et fermeture au clic.
- **Carte de test Stripe** : Aperçu visuel d'une carte avec les numéros de test pour faciliter les essais de paiement, lisible sur tous les écrans.
- **Adaptation mobile** : Interface soignée et bien centrée, y compris sur les petits écrans mobiles (< 380px) et formulaires sans débordement.
- **Routes protégées** : Redirection automatique si l'utilisateur n'est pas connecté pour accéder au paiement ou aux commandes.
- **Images optimisées** : Redimensionnement et conversion automatique en WebP pour un chargement rapide.

### 🛠 Stack technique

| Catégorie             | Technologies                         |
| --------------------- | ------------------------------------ |
| Framework             | React 19 + Vite                      |
| Langage               | JavaScript / JSX                     |
| Backend / Prod Server | Node.js (Express/HTTP) + Dokploy     |
| Package manager       | Bun                                  |
| Styling               | Styled Components + SCSS             |
| Notifications         | Sonner (toasts personnalisés)        |
| Authentification & DB | Firebase (Auth, Firestore)           |
| Paiement              | Stripe API                           |
| State Management      | Zustand                              |

### 📁 Structure du projet

```
style-d/
├── public/                          # Ressources statiques
├── src/
│   ├── actions/
│   │   └── createCheckoutSession.js # Connexion à l'API Stripe
│   ├── assets/                      # Logos et SVG
│   ├── components/                  # Composants UI réutilisables
│   │   ├── checkout-item/           # Lignes d'articles checkout avec steppers
│   │   ├── confirm-delete-modal/    # Modale de confirmation de suppression
│   │   ├── product-card/            # Cartes catalogue avec badge prix
│   │   ├── protected-route/         # Logique de protection des pages
│   │   └── scroll-to-top/           # Remontée automatique en haut de page
│   ├── libs/
│   │   └── firebase/                # Initialisation de Firebase
│   ├── routes/                      # Vues principales
│   │   ├── authentication/
│   │   ├── checkout/
│   │   ├── failure/
│   │   ├── home/
│   │   ├── navigation/
│   │   ├── orders/
│   │   ├── product/                 # Page de détail produit (tailles, quantité)
│   │   ├── shop/
│   │   └── success/
│   ├── stores/                      # Stores Zustand (cart, user, categories)
│   ├── utils/
│   │   └── firestoreInteractions.js # Appels à la base de données
│   ├── App.jsx                      # Le routeur
│   └── index.jsx                    # Point de montage
├── .env.local                       # Variables d'environnement
├── package.json
├── railpack.json                    # Configuration build Dokploy
├── server.js                        # Serveur de production Node
└── vite.config.js
```

### 🚀 Pour lancer le projet

```bash
git clone <url-du-repo>
cd style-d

bun install
bun run dev
```

Direction [http://localhost:5173](http://localhost:5173).

> 💡 Pensez à créer un fichier `.env.local` à la racine avec vos clés Firebase et Stripe pour que le projet puisse se connecter aux services.

---

## English

### 📋 Overview

Welcome to the source code of **Style-D**, a streetwear e-commerce web app built with React and Vite. The goal was to build a clean, responsive, and functional store: browsing the catalog, cart management with multi-selection, Firebase authentication, order history, and secure Stripe checkout.

### 📑 Pages

| Route                   | What's there                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| `/` (Home)              | Main storefront with animated banners, direct category links, and optimized images.               |
| `/shop`                 | Full catalog with category filtering (hats, jackets, sneakers, etc.).                              |
| `/shop/:cat/:productId` | Product detail page with size selection (XS–XXL), quantity controls, and sign-in prompt for guest. |
| `/auth`                 | Sign-in and registration page (email/password or Google sign-in via Firebase Auth).                |
| `/checkout`             | Cart summary, multi-item checkbox selection, bulk delete modal, Stripe test card & mobile layout. |
| `/orders`               | Order history with status and purchased item details.                                             |
| `/success` & `/failure` | Post-payment return pages confirming orders and resetting cart state.                             |

### 🌍 Global State with Zustand

Instead of Redux or heavy Context setups, I chose **Zustand** for its simplicity and light footprint:

- `cartStore`: Adding/removing items, multi-selection, total calculations, delete confirmation modal, and sync.
- `userStore`: Manages auth state from Firebase.
- `categoriesStore`: Loads and caches the product catalog from Firestore.

### ✨ Key Features

- **Dedicated Product Page & Sizing**: Individual product view with size selector (XS to XXL), quantity controls, live subtotal computation, and sign-in prompts.
- **Scroll to Top**: Automatic instant scroll to top on every route, category, or product navigation for an effortless mobile experience.
- **Cart Management**: Multi-item selection with checkboxes, bulk action toolbar, and delete confirmation modal.
- **Mobile Navigation & Swipe Gestures**: Left-sliding categories menu, right-sliding cart, and touch swipe gestures (disabled while zoomed in for smooth panning).
- **Toast Notifications**: Interactive toasts with animated progress timer, hover pause, and click to dismiss.
- **Stripe Test Card**: Visual card preview displaying test credentials for easy checkout testing across all screen sizes.
- **Mobile Responsive**: Clean and centered layout tuned for mobile devices, including smaller viewports (< 380px) and overflow-free forms.
- **Protected Routes**: Automatic redirect for unauthenticated users trying to access checkout or orders.
- **Optimized Images**: Automatic WebP resizing and caching proxy for fast loading.

### 🛠 Tech stack

| Category              | Technologies                         |
| --------------------- | ------------------------------------ |
| Framework             | React 19 + Vite                      |
| Language              | JavaScript / JSX                     |
| Backend / Prod Server | Node.js (Express/HTTP) + Dokploy     |
| Package manager       | Bun                                  |
| Styling               | Styled Components + SCSS             |
| Notifications         | Sonner (custom toasts)               |
| Auth & Database       | Firebase (Auth, Firestore)           |
| Payment               | Stripe API                           |
| State Management      | Zustand                              |

### 📁 Project structure

```
style-d/
├── public/                          # Static assets
├── src/
│   ├── actions/
│   │   └── createCheckoutSession.js # Stripe API connection
│   ├── assets/                      # Logos and SVGs
│   ├── components/                  # Reusable UI components
│   │   ├── checkout-item/           # Checkout product rows & steppers
│   │   ├── confirm-delete-modal/    # Deletion confirmation modal
│   │   ├── product-card/            # Catalog cards with price badge
│   │   ├── protected-route/         # Page protection logic
│   │   └── scroll-to-top/           # Automatic scroll restoration
│   ├── libs/
│   │   └── firebase/                # Firebase initialization
│   ├── routes/                      # Main views
│   │   ├── authentication/
│   │   ├── checkout/
│   │   ├── failure/
│   │   ├── home/
│   │   ├── navigation/
│   │   ├── orders/
│   │   ├── product/                 # Product detail page (sizes, quantity)
│   │   ├── shop/
│   │   └── success/
│   ├── stores/                      # Zustand stores (cart, user, categories)
│   ├── utils/
│   │   └── firestoreInteractions.js # Database calls
│   ├── App.jsx                      # Router
│   └── index.jsx                    # Mount point
├── .env.local                       # Environment variables
├── package.json
├── railpack.json                    # Dokploy build config
├── server.js                        # Node production server
└── vite.config.js
```

### 🚀 Running it locally

```bash
git clone <repo-url>
cd style-d

bun install
bun run dev
```

Then head to [http://localhost:5173](http://localhost:5173).

> 💡 Don't forget to create a `.env.local` file at the root with your Firebase and Stripe keys so the project can connect to those services.
