# SportSee – Préparation de l'API d'IA

## Introduction

## 1. En bref

## 2. L'API utilisée

### Les limites

Un token est un morceau de texte d'environ 4 caractères. C'est l'unité qui sert à compter les limites et le prix.

| Limite                    | Valeur                                                                                 | Ce que ça veut dire                                                            |
| ------------------------- | -------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Taille de ce qu'on envoie | Environ 1 million de tokens                                                            | Largement assez pour les données d'un utilisateur                              |
| Longueur de la réponse    | Environ 65 000 tokens                                                                  | Assez pour un plan de 6 semaines                                               |
| Requêtes par minute       | 15                                                                                     | Au-delà, l'API renvoie l'erreur 429 `RESOURCE_EXHAUSTED` (ressources épuisées) |
| Requêtes par jour         | 500, remises à zéro à minuit, heure du Pacifique (9 h en France la plupart de l'année) | Au-delà, l'API renvoie l'erreur 429 `RESOURCE_EXHAUSTED` (ressources épuisées) |
| Coût                      | Gratuit avec l'offre gratuite                                                          | Avec l'offre payante, on paie selon le nombre de tokens envoyés et reçus       |
| Disponibilité             | L'IA est souvent surchargée : erreur 503 `UNAVAILABLE` (indisponible)                  | Il faut parfois attendre plus d'une minute avant de réessayer                  |
| Confidentialité           | Avec l'offre gratuite, Google peut utiliser ce qu'on lui envoie                        | On n'envoie que des données fictives                                           |

### La clé API

La clé est rangée dans l'environnement Postman « Gemini », dans la variable `apiKey`. Elle reste sur l'ordinateur : elle n'est jamais partagée ni exportée.

![Environnement Postman « Gemini » avec les variables baseUrl et apiKey](captures/environnement_gemini.png)

## 3. La requête

## 4. Les données envoyées

## 5. Le prompt

## 6. Les réglages testés

## 7. Limites, risques et éthique

## 8. Pour la suite
