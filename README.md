# Style-D

<div align="center">

**[Français](#français)** · **[English](#english)**

</div>

---

## Français

### 📋 Présentation

Bienvenue sur le code source de **Style-D**. J'avais envie me créer une expérience e-commerce. Le but n'était pas juste de faire une jolie vitrine, mais une application complète et fonctionnelle : exploration du catalogue, gestion du panier, authentification sécurisée, jusqu'au paiement final via l'API Stripe.

### 📑 Les pages

| Route                   | Ce qu'on y trouve                                                                                                      |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------- |
| `/` (Accueil)           | La vitrine principale, avec de grandes images optimisées à la volée, et un accès rapide aux catégories.                |
| `/shop`                 | Le catalogue complet. On peut scroller à travers tous les articles ou filtrer par catégorie (chapeaux, baskets, etc.). |
| `/auth`                 | La page de connexion/inscription, gérée par Firebase Auth (email ou compte Google).                                    |
| `/checkout`             | Le récapitulatif du panier. J'ai protégé cette route : impossible d'y accéder sans être connecté.                      |
| `/success` & `/failure` | Les pages de retour de Stripe, qui s'occupent de valider la commande et de vider le panier proprement.                 |

### 🌍 L'état global avec Zustand

Plutôt que de sortir l'artillerie lourde avec Redux ou de me battre avec des Contextes React complexes, j'ai choisi **Zustand**. C'est léger, c'est rapide, et ça m'a permis de séparer la logique très proprement :

- `cartStore` : S'occupe d'ajouter/retirer des articles, de calculer le total et de synchroniser le panier en base de données.
- `userStore` : Écoute les changements de Firebase pour savoir si l'utilisateur est connecté.
- `categoriesStore` : Va chercher tout le catalogue sur Firestore et le met en cache.

### 🔒 Sécurité et Flux de paiement

Je tenais à ce que la logique de paiement soit robuste, même pour un projet de portfolio :

- **Routes Protégées** : Le composant `ProtectedRoute` redirige proprement les curieux qui essaieraient d'aller sur `/checkout` sans être connectés.
- **Fiabilité du Panier** : Le panier n'est vidé _qu'après_ le retour de Stripe et la confirmation de la commande. Si l'utilisateur abandonne son paiement en cours de route, il retrouve ses articles intacts.
- **Images optimisées** : J'ai mis en place un proxy CDN (Weserv) pour redimensionner et convertir les grosses images en WebP à la volée. Le site charge instantanément.

### 🛠 Stack technique

| Catégorie             | Technologies               |
| --------------------- | -------------------------- |
| Framework             | React 19 + Vite            |
| Langage               | JavaScript / JSX           |
| Package manager       | Bun                        |
| Styling               | Styled Components + SCSS   |
| Authentification & DB | Firebase (Auth, Firestore) |
| Paiement              | Stripe API                 |
| State Management      | Zustand                    |

### 📁 Structure du projet

```
style-d/
├── public/                          # Ressources statiques
├── src/
│   ├── actions/
│   │   └── createCheckoutSession.js # Connexion à l'API Stripe
│   ├── assets/                      # Logos et SVG
│   ├── components/                  # Tous les composants UI réutilisables
│   │   └── protected-route/         # Logique de protection des pages
│   ├── libs/
│   │   └── firebase/                # Initialisation de Firebase
│   ├── routes/                      # Les vues principales
│   │   ├── authentication/
│   │   ├── checkout/
│   │   ├── home/
│   │   ├── shop/
│   │   └── success/
│   ├── stores/                      # Mes 3 stores Zustand
│   ├── utils/
│   │   └── firestoreInteractions.js # Appels à la base de données
│   ├── App.jsx                      # Le routeur
│   └── index.jsx                    # Point de montage
├── .env.local                       # Variables d'environnement
├── package.json
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

Welcome to the source code of **Style-D**. I wanted to challenge myself by building an e-commerce experience. The goal wasn't just to make a pretty storefront, but a fully functional app: browsing the catalog, managing a cart, secure authentication, all the way down to the final checkout via the Stripe API.

### 📑 Pages

| Route                   | What's there                                                                                      |
| ----------------------- | ------------------------------------------------------------------------------------------------- |
| `/` (Home)              | The main storefront, featuring large images optimized on the fly, and quick access to categories. |
| `/shop`                 | The full catalog. You can scroll through all items or filter by category (hats, sneakers, etc.).  |
| `/auth`                 | The login/registration page, handled by Firebase Auth (email or Google account).                  |
| `/checkout`             | The cart summary. I protected this route: you can't access it unless you're logged in.            |
| `/success` & `/failure` | The Stripe return pages, which take care of confirming the order and safely clearing the cart.    |

### 🌍 Global State with Zustand

Instead of bringing out the heavy artillery with Redux or wrestling with complex React Contexts, I went with **Zustand**. It's lightweight, fast, and allowed me to keep my logic very clean:

- `cartStore`: Handles adding/removing items, calculating totals, and syncing the cart to the database.
- `userStore`: Listens to Firebase to track the user's authentication state.
- `categoriesStore`: Fetches the entire catalog from Firestore and caches it.

### 🔒 Security and Payment Flow

I wanted the payment logic to be solid, even for a portfolio project:

- **Protected Routes**: The `ProtectedRoute` component smoothly redirects anyone trying to hit `/checkout` without being logged in.
- **Cart Reliability**: The cart is _only_ cleared after returning from Stripe with a confirmed order. If a user bails on the payment page, their cart items are waiting right where they left them.
- **Image Optimization**: I set up a CDN proxy (Weserv) to resize and convert heavy images to WebP on the fly. The site loads instantly.

### 🛠 Tech stack

| Category         | Technologies               |
| ---------------- | -------------------------- |
| Framework        | React 19 + Vite            |
| Language         | JavaScript / JSX           |
| Package manager  | Bun                        |
| Styling          | Styled Components + SCSS   |
| Auth & Database  | Firebase (Auth, Firestore) |
| Payment          | Stripe API                 |
| State Management | Zustand                    |

### 📁 Project structure

```
style-d/
├── public/                          # Static assets
├── src/
│   ├── actions/
│   │   └── createCheckoutSession.js # Stripe API connection
│   ├── assets/                      # Logos and SVGs
│   ├── components/                  # All reusable UI components
│   │   └── protected-route/         # Page protection logic
│   ├── libs/
│   │   └── firebase/                # Firebase initialization
│   ├── routes/                      # Main views
│   │   ├── authentication/
│   │   ├── checkout/
│   │   ├── home/
│   │   ├── shop/
│   │   └── success/
│   ├── stores/                      # My 3 Zustand stores
│   ├── utils/
│   │   └── firestoreInteractions.js # Database calls
│   ├── App.jsx                      # Router
│   └── index.jsx                    # Mount point
├── .env.local                       # Environment variables
├── package.json
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
