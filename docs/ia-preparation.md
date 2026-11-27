# SportSee – Préparation de l'API d'IA

## Introduction

SportSee veut proposer à ses utilisateurs un plan d'entraînement de course à pied sur 6 semaines, créé par une IA à partir de leurs séances passées et de leur objectif.

Ce document prépare cette fonctionnalité. Il présente l'API utilisée, la requête, les données envoyées et le prompt, puis les limites, les risques et les pistes pour la suite. Tous les tests ont été faits dans Postman, avec des données fictives.

L'API prévue au départ était celle de Mistral. Au moment du projet, obtenir une clé API Mistral demandait un moyen de paiement. On a donc choisi l'API Gemini de Google, qui propose une offre gratuite suffisante pour un prototype.

## 1. En bref

## 2. L'API utilisée

### Le modèle

On utilise le modèle `gemini-3.5-flash-lite`, avec l'API Gemini de Google. C'est un modèle stable, que Google présente comme son modèle 3.5 le plus rapide et le moins cher ([liste des modèles](https://ai.google.dev/gemini-api/docs/models)).

![Fiche du modèle gemini-3.5-flash-lite dans Postman](captures/get_model_model_info.png)

### Les limites

Un token est un morceau de texte d'environ 4 caractères. C'est l'unité qui sert à compter les limites et le prix.

| Limite                    | Valeur                                                                                                                                                     | Ce que ça veut dire                                                                                                                                        |
| ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Taille de ce qu'on envoie | Environ 1 million de tokens                                                                                                                                | Largement assez pour les données d'un utilisateur                                                                                                          |
| Longueur de la réponse    | Environ 65 000 tokens                                                                                                                                      | Assez pour un plan de 6 semaines                                                                                                                           |
| Requêtes par minute       | 15                                                                                                                                                         | Au-delà, l'API renvoie l'erreur 429 `RESOURCE_EXHAUSTED` (ressources épuisées)                                                                             |
| Requêtes par jour         | 500, remises à zéro à minuit, heure du Pacifique (9 h en France la plupart de l'année)                                                                     | Au-delà, l'API renvoie l'erreur 429 `RESOURCE_EXHAUSTED` (ressources épuisées)                                                                             |
| Coût                      | Gratuit avec l'offre gratuite. Avec l'offre payante : 0,30 dollar par million de tokens envoyés et 2,50 dollars par million de tokens reçus                | Un plan (environ 900 tokens envoyés et 900 reçus) coûterait environ 0,25 centime de dollar                                                                 |
| Disponibilité             | L'IA est souvent surchargée : erreur 503 `UNAVAILABLE` (indisponible)                                                                                      | Il faut parfois attendre plus d'une minute avant de réessayer                                                                                              |
| Confidentialité           | Avec l'offre gratuite, Google peut utiliser ce qu'on lui envoie pour améliorer ses produits, sauf en Europe, où les règles de l'offre payante s'appliquent | Google demande de ne jamais envoyer d'informations sensibles, confidentielles ou personnelles avec l'offre gratuite : on n'envoie que des données fictives |

Sources : [quotas](https://ai.google.dev/gemini-api/docs/rate-limits), [prix](https://ai.google.dev/gemini-api/docs/pricing), [conditions d'utilisation](https://ai.google.dev/gemini-api/terms).

### Les conditions d'utilisation

Les conditions de Google posent trois règles importantes pour SportSee :

- pour proposer la fonctionnalité au public en Europe, l'offre payante est obligatoire ;
- l'API ne doit pas servir à donner des avis médicaux ;
- l'API ne doit pas être utilisée dans une application destinée aux moins de 18 ans, ou que des mineurs peuvent utiliser.

### La clé API

La clé est rangée dans l'environnement Postman « Gemini », dans la variable `apiKey`. Elle reste sur l'ordinateur : elle n'est jamais partagée ni exportée.

![Environnement Postman « Gemini » avec les variables baseUrl et apiKey](captures/environnement_gemini.png)

Elle est envoyée automatiquement avec chaque requête, dans le header `x-goog-api-key`. Ce réglage est fait une seule fois, sur la collection.

![Authentification de la collection avec le header x-goog-api-key](captures/authorization.png)

## 3. La requête

### L'adresse

| Élément | Valeur                                                                                          |
| ------- | ----------------------------------------------------------------------------------------------- |
| Méthode | `POST`                                                                                          |
| URL     | `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent` |

Dans Postman, le début de l'adresse est rangé dans la variable `baseUrl` de l'environnement.

### Les headers

| Header           | Valeur             | Rôle                                                        |
| ---------------- | ------------------ | ----------------------------------------------------------- |
| `x-goog-api-key` | La clé API         | Identifie le projet (voir la partie 2)                      |
| `Content-Type`   | `application/json` | Indique que le body est du JSON. Postman l'ajoute tout seul |

### Le body

Le body contient trois parties :

- `system_instruction` : les consignes données à l'IA, identiques pour tous les utilisateurs (voir la partie 5) ;
- `contents` : les données de l'utilisateur (voir la partie 4) ;
- `generationConfig` : la forme attendue de la réponse, décrite par un schéma (voir la partie 5).

```json
{
  "system_instruction": { "parts": [{ "text": "Les consignes" }] },
  "contents": [
    { "parts": [{ "text": "Les données de l'utilisateur, en JSON" }] }
  ],
  "generationConfig": {
    "responseFormat": {
      "text": { "mimeType": "APPLICATION_JSON", "schema": {} }
    }
  }
}
```

![Requête Generate training plan dans Postman](captures/generate_training_plan_requete.png)

### La réponse

Les informations utiles de la réponse :

- `candidates[0].content.parts[0].text` : le plan. C'est du JSON écrit sous forme de texte : l'application doit le convertir (avec `JSON.parse`) pour s'en servir. Dans nos tests, le plan est toujours arrivé en un seul morceau, mais l'API peut découper un texte en plusieurs morceaux (`parts`), qu'il faut alors mettre bout à bout.
- `finishReason` : `STOP` veut dire que la réponse est complète. `MAX_TOKENS` veut dire qu'elle a été coupée : le JSON serait alors incomplet et inutilisable.
- `usageMetadata` : le nombre de tokens envoyés (`promptTokenCount`) et reçus (`candidatesTokenCount`). C'est ce qui sert à calculer le coût.
- `thoughtSignature` : une version chiffrée, donc illisible, de la réflexion du modèle. Elle sert seulement dans une conversation en plusieurs échanges, pour que l'IA garde le fil. Notre requête ne fait qu'un échange : l'application peut l'ignorer.

![Réponse de la version finale du prompt dans Postman](captures/generate_training_plan_reponse.png)

### Les erreurs

| Erreur                                         | Cause                                                                      | Que faire                                                        |
| ---------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------- |
| 400 `INVALID_ARGUMENT` (argument invalide)     | Clé invalide, ou body mal écrit                                            | Corriger la clé ou le body. Inutile de réessayer                 |
| 403 `PERMISSION_DENIED` (permission refusée)   | Le projet n'a pas accès à l'API (vérification, facturation, clé divulguée) | Régler le compte ou créer une nouvelle clé. Inutile de réessayer |
| 429 `RESOURCE_EXHAUSTED` (ressources épuisées) | Trop de requêtes (quotas dépassés, voir la partie 2)                       | Réessayer plus tard                                              |
| 503 `UNAVAILABLE` (indisponible)               | L'IA est surchargée                                                        | Réessayer plus tard                                              |
| 500 et autres erreurs 5xx                      | Problème passager chez Google                                              | Réessayer plus tard                                              |

« Réessayer plus tard », c'est attendre de plus en plus longtemps entre deux essais (1 seconde, puis 2, puis 4…), avec un nombre maximum d'essais ([guide des erreurs](https://ai.google.dev/gemini-api/docs/troubleshooting)).

Les erreurs 400 et 503 ont été testées dans Postman :

![Erreur 400 : clé API invalide](captures/generate_content_error_invalid_api_key.png)

![Erreur 400 : body mal écrit](captures/generate_content_error_invalid_request.png)

![Erreur 503 : IA surchargée](captures/generate_content_error_model_overloaded.png)

### Limiter les requêtes

Chaque plan a un coût avec l'offre payante, et les quotas limitent le nombre de requêtes (voir la partie 2). Pour l'intégration dans l'application, on recommande de :

- désactiver le bouton pendant que l'IA prépare le plan, pour éviter les doubles clics ;
- enregistrer le plan reçu, pour que l'utilisateur le retrouve sans relancer l'IA ;
- limiter le nombre de nouveaux plans par utilisateur, par exemple un par jour ;
- limiter le nombre d'essais quand l'API renvoie une erreur 429 ou 503.

## 4. Les données envoyées

## 5. Le prompt

## 6. Les réglages testés

## 7. Limites, risques et éthique

## 8. Pour la suite
