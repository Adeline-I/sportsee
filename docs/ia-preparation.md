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

## 4. Les données envoyées

## 5. Le prompt

## 6. Les réglages testés

## 7. Limites, risques et éthique

## 8. Pour la suite
