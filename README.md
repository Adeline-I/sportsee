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

## Backend

L'application utilise l'API SportSee : [Adeline-I/sportsee-backend](https://github.com/Adeline-I/sportsee-backend). Ce backend utilise npm et son `package-lock.json`.

```bash
git clone https://github.com/Adeline-I/sportsee-backend.git
cd sportsee-backend
npm ci
npm start
```

L'API est disponible sur http://localhost:8000.

## Configuration

Copier `.env.example` en `.env`, puis choisir la source des données :

| Variable           | Rôle                                                      |
| ------------------ | --------------------------------------------------------- |
| `VITE_DATA_SOURCE` | `api` (backend lancé) ou `mock` (fichiers de `app/mocks`) |
| `VITE_API_URL`     | adresse du backend                                        |

En mode `mock`, le backend n'est pas nécessaire : tous les identifiants sont acceptés et l'application affiche des données d'exemple (Sophie Martin).

Après une modification du `.env`, relancer `pnpm dev`.

## Lancement

```bash
pnpm dev
```

L'application est disponible sur http://localhost:5173.

## Identifiants de test

En mode `api` :

| Identifiant    | Mot de passe  |
| -------------- | ------------- |
| `sophiemartin` | `password123` |
| `emmaleroy`    | `password789` |
| `marcdubois`   | `password456` |

## Structure

```
app/
├── routes/      pages : connexion, dashboard, profil, 404
├── layouts/     cadre des pages connectées
├── components/  composants d'affichage
├── hooks/       chargement des données des pages
├── contexts/    session (token)
├── services/    appels à l'API ou au mock, mise en forme des données
├── utils/       calculs et formats
├── constants/   réglages des graphiques
├── mocks/       données d'exemple
└── types.ts     types des données
```

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
