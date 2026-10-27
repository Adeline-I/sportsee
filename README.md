# SportSee

Tableau de bord d'activité sportive.

## Prérequis

- [Node.js](https://nodejs.org/) 24 (LTS)
- [pnpm](https://pnpm.io/)

## Installation

```bash
git clone https://github.com/Adeline-I/sportsee.git
cd sportsee
pnpm install
```

## Lancement

```bash
pnpm dev
```

L'application est disponible sur http://localhost:5173.

## Backend

L'application utilise l'API SportSee : [Adeline-I/sportsee-backend](https://github.com/Adeline-I/sportsee-backend). Ce backend utilise npm et son `package-lock.json`.

```bash
git clone https://github.com/Adeline-I/sportsee-backend.git
cd sportsee-backend
npm ci
npm start
```

L'API est disponible sur http://localhost:8000. Les identifiants de démo sont dans le [README du backend](https://github.com/Adeline-I/sportsee-backend#41-available-users).

## Postman

1. Importer les deux fichiers du dossier `postman/`.
2. Sélectionner l'environnement **Local**.
3. Lancer la requête **Login** : le token est ensuite réutilisé automatiquement par les autres requêtes.

## Scripts

| Commande         | Rôle                                            |
| ---------------- | ----------------------------------------------- |
| `pnpm dev`       | lance le serveur de développement               |
| `pnpm build`     | construit la version finale dans `build/client` |
| `pnpm typecheck` | vérifie les types TypeScript                    |
| `pnpm lint`      | vérifie le code avec ESLint                     |
