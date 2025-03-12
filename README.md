# Crop Cast 🌱☀️

## Présentation du projet

Outil de prévisions et de visualisation de données météorologiques précises et détaillées destinées spécifiquement au secteur agricole. Projet a été développé dans le cadre d'une démonstration technique et de motivation.

## Fonctionnalités principales

- **Visualisation cartographique interactive**
- **Prévisions météorologiques complètes** sur 14 jours avec données horaires
- **Analyse de données spécifiques à l'agriculture** :
  - Température (air et sol)
  - Humidité relative et humidité du sol
  - Précipitations
  - Exposition à la lumière et durée d'ensoleillement
  - Évapotranspiration
  - Vitesse du vent
- **Design responsive** 

## Architecture

### Frontend

- **React** avec **TypeScript**, utilisation de context provider, React Query
- **Leaflet**
- **Shadcn/ui**

### Backend

- **NestJS** avec **TypeScript** 
- **Cache Manager** pour optimiser les performances et réduire les appels API

### Infrastructure

- **Docker** et **Docker Compose** pour la conteneurisation
- Configuration de développement et de production distinctes

## Futures integrations potentielles

- Intégration de suggestion et de diagnostic générée par un assistant IA
    - Création de routes dans le backend pour un diagnostic, avec stream de réponse et prompt adéquat
- Intégration d'animations / amélioration des filtres sur la carte
- AJout de graphiques supplémentaires pour faciliter la visualisation des données
