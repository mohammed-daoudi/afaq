# AFAQ HEALTH — Cahier des charges complet

**Plateforme digitale unifiée — Site vitrine, Portail B2B et Back-office**

| | |
|---|---|
| **Client** | AFAQ Health — Kénitra, Maroc |
| **Nature du document** | Description complète du projet (fonctionnelle et technique) |
| **Stack retenue** | Next.js (frontend) · Laravel (backend/API) · PostgreSQL + PostGIS (base de données) |
| **Direction créative** | Premium épuré, palette douce, 3D progressive, effet de brillance signature |

Ce document décrit l'ensemble de la plateforme AFAQ Health : un système d'information commercial unifié, et non une succession de projets indépendants. Il part du site vitrine — premier point de contact avec le marché — pour montrer comment celui-ci s'articule avec le portail professionnel (B2B) et le back-office interne, sur une base technique unique.

## Sommaire

1. [Vision et contexte](#1-vision-et-contexte)
2. [Architecture unifiée — une seule plateforme](#2-architecture-unifiée--une-seule-plateforme)
3. [Site vitrine — espace public](#3-site-vitrine--espace-public)
4. [Portail B2B — espace professionnel](#4-portail-b2b--espace-professionnel)
5. [Back-office AFAQ — administration interne](#5-back-office-afaq--administration-interne)
6. [Extensions prévues](#6-extensions-prévues)
7. [Rôles et permissions](#7-rôles-et-permissions)
8. [Modèle de données unifié](#8-modèle-de-données-unifié)
9. [Architecture technique](#9-architecture-technique)
10. [Exigences non fonctionnelles](#10-exigences-non-fonctionnelles)

---

## 1. Vision et contexte

AFAQ Health est une plateforme de développement, de représentation et de distribution de marques internationales de santé et de nutrition, basée à Kénitra, dédiée au Maroc et à l'Afrique de l'Ouest francophone. L'entreprise accompagne des laboratoires européens dans leur implantation durable sur des marchés à fort potentiel, en prenant en charge l'ensemble de la chaîne de valeur : stratégie d'accès au marché, conformité réglementaire, homologation des produits, développement commercial, structuration des réseaux de distribution, accompagnement scientifique et valorisation des marques.

AFAQ Health ne vend jamais au consommateur final. Son rôle est d'importer, d'homologuer et d'approvisionner un réseau professionnel — distributeurs, grossistes, pharmacies — qui délivre le bon produit, au bon endroit, avec le bon conseil.

### Chaîne de valeur

- Fabricant international — laboratoires européens partenaires, formulations certifiées
- AFAQ Health — importation, homologation AMMPS, stockage, pilotage commercial
- Distributeurs et grossistes — réseau national et régional, tarifs dédiés
- Pharmacies et officines — approvisionnées, conseil professionnel au patient

### Chiffres clés de positionnement

| Indicateur | Valeur |
|---|---|
| Marques exclusives | 3 (SOTYA, Colagenova, Naturamins) |
| Pays couverts | 9 — Maroc + 8 pays d'Afrique de l'Ouest francophone |
| Références homologuées | 20+ références enregistrées AMMPS |
| Fabrication | 100% européenne, laboratoires certifiés ISO 9001 |
| Positionnement | Conformité réglementaire de bout en bout (A à Z) + support scientifique et marketing 360 degrés |

### Périmètre du projet

La plateforme couvre trois espaces distincts mais techniquement unifiés : un site vitrine public, un portail B2B authentifié réservé aux comptes professionnels validés, et un back-office interne pour les équipes AFAQ. Il n'existe pas de vente en ligne au grand public : aucun prix n'est jamais affiché hors connexion, et aucune fonctionnalité panier/paiement n'existe côté grand public.

---

## 2. Architecture unifiée — une seule plateforme

Le projet n'est pas la somme de plusieurs projets indépendants : c'est une plateforme unique, construite sur un seul backend (Laravel) et une seule base de données (PostgreSQL), exposée au travers de trois façades qui partagent les mêmes données.

| Couche | Accès | Rôle |
|---|---|---|
| Site vitrine | Public, sans connexion | Image de marque, catalogue produits, localisation des pharmacies, blog/FAQ |
| Portail B2B | Authentifié, comptes validés par AFAQ | Commandes, tarifs personnalisés, documents, suivi |
| Back-office AFAQ | Interne, équipes AFAQ uniquement | CRM, stocks, pilotage commercial, reporting |

> **Exemple concret — le cas des pharmacies**
>
> Une pharmacie n'existe qu'une seule fois dans le système. Quand AFAQ valide le compte d'une pharmacie (processus décrit en section 4), cette même fiche devient automatiquement visible sur le localisateur public : nom, ville, quartier et coordonnées sont les champs publics d'une fiche qui contient aussi — de façon strictement privée — les identifiants de connexion, le tarif attribué et l'historique de commandes. Il n'existe pas de liste de pharmacies à maintenir séparément pour la carte publique : c'est une vue filtrée (comptes de type pharmacie, statut validé) de la même base de comptes utilisée pour l'authentification B2B. Ce même principe s'applique aux marques et aux produits : la fiche marque affichée publiquement est la même qui sert à filtrer le catalogue B2B ; la fiche produit affichée sans prix côté public est la même fiche affichée avec son tarif personnalisé côté B2B.

Conséquence directe pour le développement : une seule application Next.js sert à la fois le site vitrine (routes publiques) et le portail B2B (routes protégées par middleware d'authentification), et une seule API Laravel alimente les deux, le back-office AFAQ étant une interface d'administration distincte branchée sur la même base.

---

## 3. Site vitrine — espace public

Le site vitrine est la première impression qu'AFAQ Health donne à un pharmacien, un grossiste, un futur partenaire fabricant ou un patient en recherche d'un point de vente. Il s'appuie sur les éléments de marque et de contenu déjà définis par AFAQ Health — logo, identité, positionnement, chiffres clés, description des marques — en poussant plus loin le niveau d'exécution visuelle : palette adoucie, mise en scène 3D des produits et interactions signature au survol.

### 3.1 — Direction créative et identité visuelle

**Palette — version douce de l'identité existante**

Le logo AFAQ Health et ses couleurs sont déjà disponibles et servent de base. La proposition ci-dessous adoucit la palette de référence (vert sarcelle foncé, ivoire, ambre) en versions moins saturées, pour une sensation plus premium et moins chargée visuellement — à caler précisément sur le fichier logo une fois intégré au code.

| Usage | Teinte proposée | Rôle |
|---|---|---|
| Fond principal | Ivoire doux | Fond des sections claires |
| Fond secondaire | Vert sauge très clair | Sections alternées, cartes |
| Couleur de marque | Sarcelle profond adouci | Titres, wordmark, boutons principaux |
| Accent | Doré/ambre doux | Labels, soulignés, touches de brillance |
| Texte | Anthracite doux (jamais noir pur) | Corps de texte |

**Effet de brillance (signature visuelle)**

Un balayage lumineux diagonal (dégradé clair animé traversant l'élément) est appliqué au logo et aux boutons d'appel à l'action principaux — un signature visuel discret qui évoque le fini d'un packaging premium. Techniquement : un masque en dégradé animé en CSS/SVG, déclenché au survol pour les boutons et en boucle lente et discrète pour le logo en en-tête.

**Mise en scène 3D — approche progressive**

Les sections hero (accueil, pages marques) utilisent dans un premier temps des scènes 3D génératives — particules, formes organiques évoquant capsules et gouttes, dans les couleurs de la marque — sans dépendre d'aucun asset produit. Dès que des visuels produits réels sont intégrés au code (photos, packshots, labels), ils remplacent progressivement ces scènes pour un rendu plus fidèle, avec viewer interactif (rotation, zoom) sur les fiches produits.

> Stack recommandée : React Three Fiber + Drei (contrôle total, intégration Next.js native) ou Spline (alternative no-code plus rapide à produire). Fallback statique obligatoire sur mobile bas de gamme pour tenir l'objectif de performance.

### 3.2 — Architecture de l'information

Navigation principale : Accueil, Nos marques, Nos produits, Pourquoi nous, À propos, Notre réseau, Localiser, FAQ, et un accès distinct Espace professionnel (connexion au portail B2B). *Nos produits* est une addition à la structure de référence, positionnée naturellement à côté de Nos marques puisqu'elle rend la vitrine plus concrète aux yeux d'un visiteur professionnel.

### 3.3 — Détail des pages et sections

**Accueil**

Accroche institutionnelle réelle (« la santé par la nutrition, distribuée avec exigence ») avec hero 3D, chiffres clés (marques exclusives, pays couverts, références homologuées), schéma de la chaîne de valeur (fabricant, AFAQ Health, distributeurs, pharmacies, patient), mise en avant des marques, bloc localisateur, dernières actualités du blog, double appel à l'action — Accéder au portail B2B / Découvrir nos marques.

**Pourquoi AFAQ Health**

Cinq piliers de réassurance, déjà définis : références homologuées (20+ références AMMPS), pays en exclusivité (9, Maroc et Afrique de l'Ouest francophone), fabrication européenne (100%, laboratoires certifiés), conformité réglementaire de bout en bout, support scientifique et marketing (accompagnement des officines : PLV, formations, conseil produit).

**Nos marques**

Une page dédiée par marque, avec son propre univers visuel à l'intérieur du design system global :

- **SOTYA** (Espagne, Bescorp Health) — gamme complète de compléments alimentaires : stress, sommeil, immunité, vitalité, santé spécifique. 19 références enregistrées AMMPS.
- **Colagenova** (Espagne, Vaminter) — gamme experte de collagène marin et de solutions beauté-mobilité, structurée par indication. Lancement Maroc prévu en 2027.
- **Naturamins** (Europe) — nouvelle marque du portefeuille, en cours de préparation réglementaire et commerciale pour le marché marocain.

**Nos produits — catalogue vitrine (14 références pour le lancement)**

Grille de cartes produits (14 au lancement, structure extensible), chaque carte affichant le visuel produit (photo/packshot), le label/étiquette, la marque associée et la catégorie (complément alimentaire, beauté, santé spécifique).

*Interaction au survol* : chaque carte réagit au curseur par un léger effet de bascule 3D (tilt en profondeur qui suit la position du curseur), puis révèle par un fondu/glissement fluide un panneau détaillant la description complète du produit : composition principale, bénéfices, indications, conseils d'utilisation. Sur mobile et tactile (absence de survol), la même information s'ouvre au toucher avec une transition équivalente.

> **Point important — ce n'est pas de l'e-commerce**
>
> Cette section reste strictement informationnelle : aucun prix, aucun bouton d'ajout au panier. AFAQ Health travaille exclusivement avec des pharmacies et grossistes validés — la commande réelle, avec tarif personnalisé, se fait uniquement dans le portail B2B authentifié (section 4). Chaque fiche produit publique porte un appel à l'action discret du type « réservé aux professionnels », qui redirige vers la connexion si le visiteur n'est pas identifié.

> Technique : transformation CSS 3D (perspective + rotation pilotée par la position de la souris) combinée à Framer Motion pour la révélation du texte — reste dans l'enveloppe technique déjà retenue, sans nouvelle dépendance lourde.

**Qui sommes-nous**

Mission, expertise et quatre différenciateurs déjà définis : conformité réglementaire (chaque référence enregistrée AMMPS avant commercialisation), exclusivité territoriale (Maroc et huit pays d'Afrique de l'Ouest francophone), partenaires reconnus (laboratoires européens certifiés ISO 9001), vision multi-pays (organisation pensée pour l'expansion régionale, pays par pays).

**Notre réseau**

Schéma en quatre étapes, déjà défini, reliant fabricant, AFAQ Health, distributeurs et pharmacies — réaffirme visuellement le positionnement : AFAQ Health n'est jamais en contact direct avec le patient, seulement avec le réseau professionnel.

**Localiser une pharmacie**

Carte interactive avec recherche par ville, quartier ou nom, résultats triés par proximité réelle. Comme rappelé en section 2, les points affichés proviennent des comptes pharmacie validés dans le portail B2B — pas d'une liste gérée séparément.

**FAQ et Contact**

FAQ dédiée aux questions fréquentes (patients et professionnels). Formulaires de contact distincts — support, service commercial, demande de partenariat fabricant — routés vers le bon destinataire, avec validation stricte et protection anti-spam.

---

## 4. Portail B2B — espace professionnel

Espace authentifié réservé aux comptes validés par AFAQ Health : pharmacies, grossistes, distributeurs. C'est ici — et uniquement ici — que se passent la consultation des tarifs et la commande.

**Comptes et accès**
- Types de comptes : pharmacie, grossiste, distributeur, commercial AFAQ, direction, administrateur
- Inscription en ligne suivie d'une validation manuelle par AFAQ avant activation du compte
- C'est précisément ce moment de validation qui fait apparaître une pharmacie sur le localisateur public (section 2 et 3)
- Tableau de bord personnalisé selon le rôle

**Catalogue professionnel**
- Catalogue complet avec stock, conditionnement, nouveautés et promotions
- Fiches produits enrichies (documents techniques, visuels HD, certificats)
- Tarification strictement personnalisée par compte — le prix d'un client n'est jamais visible par un autre

**Commandes**

Panier, passation, modification avant validation, suivi en temps réel, réimpression et historique complet. Workflow de commande en sept étapes, avec notification à chaque changement de statut :

`Commande → Validation → Préparation → Expédition → Livraison → Facturation → Paiement`

**Tableau de bord client et documents**
- Historique de commandes, factures, avoirs, encours
- Espace documentaire : fiches techniques, visuels HD, PLV, catalogues, certificats, documents réglementaires
- Téléchargements groupés

**Promotions**

Offres et remises ciblées par type de compte ou par volume, campagnes limitées dans le temps, visibles uniquement des comptes concernés.

---

## 5. Back-office AFAQ — administration interne

Interface réservée aux équipes AFAQ Health (direction, commerciaux, administrateurs), bâtie sur la même base de données que le site vitrine et le portail B2B.

| Module | Contenu |
|---|---|
| CRM | Fiche client complète, visites, commentaires, objectifs, historique des échanges |
| Gestion commerciale | Pipeline prospects/clients, relances, suivi par commercial |
| Gestion des stocks | Entrées/sorties, stock réel, stock réservé, alertes de rupture |
| Tableau de bord Direction | Chiffre d'affaires, marge, commandes, rotation, top produits/clients/régions |
| Reporting | Exports Excel et PDF, statistiques consolidées |
| Marketing | Campagnes email, SMS, notifications push, segmentation par type de compte |
| Gestion documentaire | Contrats, documents réglementaires, autorisations, dossiers AMMPS |
| Administration | Utilisateurs, permissions, journaux d'accès, sauvegardes |

---

## 6. Extensions prévues

**Portail fabricants**

Accès en lecture seule pour les laboratoires partenaires (SOTYA, Colagenova, Naturamins, futurs partenaires) sur leurs propres données : ventes, stocks, prévisionnel, commandes — sans accès aux données des autres marques ni des autres comptes.

**Extension multi-pays**

AFAQ Health détient déjà des droits d'exclusivité sur 9 pays (Maroc et 8 pays d'Afrique de l'Ouest francophone). Cette extension consiste à opérationnaliser cette exclusivité dans la plateforme : catalogue, tarifs et réglementation propres à chaque pays, sans dupliquer l'architecture technique — seule la couche de données se décline par pays.

---

## 7. Rôles et permissions

| Rôle | Périmètre d'accès |
|---|---|
| Super administrateur | Contrôle total de la plateforme |
| Direction AFAQ | Tableaux de bord consolidés, reporting, validation des comptes |
| Commercial AFAQ | CRM, pipeline prospects, suivi des commandes de son portefeuille |
| Distributeur / Grossiste | Catalogue professionnel, commandes, tarifs, factures et documents propres |
| Pharmacie | Catalogue professionnel, commandes, tarifs, factures et documents propres ; visible sur le localisateur public une fois validée |
| Fabricant (extension) | Lecture seule sur ses propres produits : ventes, stocks, prévisionnel |

---

## 8. Modèle de données unifié

Le principe directeur (section 2) se traduit ainsi au niveau des données : les entités publiques du site vitrine sont des vues filtrées des mêmes tables que celles utilisées par le portail B2B et le back-office — il n'existe pas de duplication de contenu entre les espaces.

| Entité | Contenu principal |
|---|---|
| `accounts` | Type (pharmacie/grossiste/distributeur/commercial/direction/admin), statut (en attente/validé/actif), identifiants d'authentification, tarif attribué — sert à la fois de login B2B et de source du localisateur public (si type=pharmacie et statut=validé) |
| `brands` | Marques : SOTYA, Colagenova, Naturamins et futures — nom, origine, description, logo, couleurs, storytelling |
| `products` | 14 références au lancement — marque associée, catégorie (complément alimentaire/beauté/santé), photo, label, composition, bénéfices, description ; aucun champ de prix public |
| `pricing` | Tarif personnalisé par compte et par produit, strictement cloisonné |
| `orders` / `order_items` | Commandes et lignes de commande, statut de workflow |
| `documents` | Fiches techniques, visuels, certificats — liés à un compte, une marque ou un produit |
| `blog_posts` | Articles du blog scientifique |
| `crm_entries` | Visites, relances, objectifs — liés à un compte |
| `stock_movements` | Entrées/sorties de stock, alertes de rupture |

---

## 9. Architecture technique

**Frontend — Next.js**

Une application unique (App Router, TypeScript) sert le site vitrine en rendu statique (SSG) avec régénération incrémentale (ISR) pour les contenus qui évoluent — marques, produits, blog — et le portail B2B en routes protégées par middleware d'authentification, en rendu dynamique. Tailwind CSS pour le design system, React Three Fiber/Drei ou Spline pour la 3D, Framer Motion pour les animations et interactions (dont le hover produits), next/image pour l'optimisation des visuels.

**Backend — Laravel**

API centrale unique consommée en JSON par Next.js (REST pour le vitrine ; GraphQL envisageable pour le B2B, où les requêtes — tarifs personnalisés, commandes imbriquées — sont plus complexes). Administration du back-office via Filament, gratuit et open-source, pour que l'équipe AFAQ gère marques, produits, comptes, blog et pharmacies sans développeur.

**Base de données — PostgreSQL + PostGIS**

PostgreSQL pour l'intégrité relationnelle de l'ensemble des entités. L'extension PostGIS est recommandée spécifiquement pour le localisateur de pharmacies : elle permet des requêtes géospatiales natives (distance réelle, recherche par rayon) bien plus efficaces qu'un calcul de distance approximé.

**Authentification**

Laravel Sanctum pour l'authentification web de première partie (Next.js vers Laravel), avec OAuth2 (Laravel Passport) pour les intégrations tierces futures — ERP, portail fabricants. MFA obligatoire pour les rôles internes AFAQ (direction, commercial, administrateur), conformément à l'exigence de sécurité du projet.

**Intégrations**
- ERP / Comptabilité
- Transport et logistique
- Email et SMS
- WhatsApp Business
- Power BI (reporting avancé)

**Hébergement**

Microsoft Azure ou AWS pour l'ensemble backend/base de données. Pour le frontend Next.js, option Vercel (ISR et fonctions Edge natives) en complément, ou conteneurisation Docker sur la même infrastructure Azure/AWS pour une gestion unifiée — choix à trancher selon les préférences d'infogérance d'AFAQ.

---

## 10. Exigences non fonctionnelles

| Exigence | Détail |
|---|---|
| Sécurité | Cloisonnement strict des données par compte, authentification renforcée (MFA pour les rôles AFAQ), HTTPS intégral, journalisation des accès |
| Performance | Pages publiques sous 2 secondes ; portail B2B fluide jusqu'à 500 comptes actifs ; chargement différé des scènes 3D et repli statique sur mobile bas de gamme |
| Disponibilité | Objectif 99,5% ; sauvegardes automatisées quotidiennes, géo-redondantes |
| Conformité | Loi 09-08 (protection des données personnelles, Maroc) ; mentions légales et politique de confidentialité |
| Accessibilité | Contraste suffisant, alternatives textuelles sur visuels et éléments 3D, navigation clavier, attributs ARIA sur les composants interactifs |
| Évolutivité | Architecture modulaire permettant d'ajouter marques, pays ou modules sans refonte — notamment en vue des extensions (portail fabricants, multi-pays) |

---

*AFAQ Health — Cahier des charges complet — Document de travail. Kénitra, Maroc.*