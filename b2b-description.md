# AFAQ HEALTH

## Architecture complète — Site Public, Portail B2B & Back-Office

---

# 1. Vue globale du système

L’écosystème digital AFAQ Health est organisé autour de trois grandes parties :

1. **Site Public**
2. **Portail B2B**
3. **Back-Office / Administration**

L’architecture cible prévue dans le document sépare clairement le site public du futur portail professionnel B2B.

```text
                              AFAQ HEALTH
                                   │
                ┌──────────────────┴──────────────────┐
                │                                     │
          SITE PUBLIC                            PORTAIL B2B
                │                                     │
        ┌───────┼────────┐                ┌───────────┼───────────┐
        │       │        │                │           │           │
    Produits  Marques  Pharmacies     Pharmacies  Grossistes  Distributeurs
        │
    Conseils
        │
    Informations
        │
    Recherche pharmacie
                                                  │
                                                  ▼
                                            BACK-OFFICE
                                                  │
                         ┌────────────────────────┼──────────────────────┐
                         │                        │                      │
                    Utilisateurs              Catalogue                CRM
                         │                        │                      │
                      Clients                  Stock                    BI
                                                  │
                                               Factures
                                                  │
                                               Documents
```

Le document prévoit notamment un futur espace professionnel contenant :

* Connexion
* Catalogue B2B
* Tarifs
* Commandes
* Factures
* Documents

---

# 2. SITE PUBLIC

Le site public est destiné principalement aux consommateurs et aux visiteurs souhaitant découvrir AFAQ Health, ses marques et ses produits.

Il ne constitue pas une boutique e-commerce grand public.

Le parcours principal est :

```text
Découvrir AFAQ Health
        ↓
Découvrir les marques
        ↓
Découvrir les produits
        ↓
Comprendre les produits
        ↓
Trouver une pharmacie
```

Il n’y a pas de vente directe au consommateur sur cette première version.

Le site public ne doit donc pas afficher :

* prix publics de vente B2B ;
* panier professionnel ;
* commandes B2B ;
* factures ;
* stocks professionnels ;
* informations commerciales privées.

---

# 3. ESPACE PROFESSIONNEL

La page « Professionnels » constitue le point d'entrée vers l'écosystème B2B.

Elle permet de présenter les services destinés aux professionnels et d'orienter chaque professionnel vers son espace.

Les profils professionnels identifiés sont :

* Pharmacie
* Grossiste
* Distributeur

La page contient notamment :

* présentation des services professionnels ;
* bouton « Demander un accès professionnel » ;
* bouton « Se connecter ».

---

# 4. PORTAIL B2B

Le portail B2B est destiné aux partenaires professionnels d’AFAQ Health.

Il constitue une plateforme privée accessible uniquement après authentification.

Les utilisateurs B2B sont principalement :

```text
                PORTAIL B2B
                    │
       ┌────────────┼────────────┐
       │            │            │
   PHARMACIEN    GROSSISTE   DISTRIBUTEUR
```

Le document prévoit pour cette future plateforme :

* authentification ;
* comptes pharmacies ;
* comptes grossistes ;
* comptes distributeurs ;
* tarifs personnalisés ;
* commandes ;
* stock ;
* factures ;
* promotions ;
* documents ;
* CRM ;
* reporting.

---

# 5. AUTHENTIFICATION

Chaque professionnel dispose d'un compte professionnel.

Le système doit permettre :

* connexion ;
* déconnexion ;
* récupération du mot de passe ;
* changement du mot de passe ;
* gestion du profil ;
* contrôle des permissions ;
* accès aux fonctionnalités correspondant au type de compte.

## Demande d'accès professionnel

Un professionnel qui ne possède pas encore de compte peut envoyer une demande d'accès.

Exemple de processus :

```text
Professionnels
      ↓
Demander un accès
      ↓
Formulaire
      ↓
Validation AFAQ Health
      ↓
Création du compte
      ↓
Activation
      ↓
Connexion au portail B2B
```

La validation permet à AFAQ Health de contrôler les professionnels avant de leur donner accès aux informations commerciales.

---

# 6. RÔLE : PHARMACIEN

Le pharmacien représente une pharmacie utilisant AFAQ Health comme fournisseur/partenaire.

Après connexion, il accède à son espace professionnel.

## Tableau de bord

Le tableau de bord peut présenter :

* commandes récentes ;
* commandes en cours ;
* commandes livrées ;
* factures récentes ;
* documents disponibles ;
* promotions disponibles ;
* informations du compte.

## Catalogue B2B

Le pharmacien peut consulter le catalogue réservé aux professionnels.

Pour chaque produit :

* nom ;
* référence ;
* marque ;
* catégorie ;
* présentation ;
* conditionnement ;
* informations produit ;
* disponibilité ;
* tarif professionnel ;
* promotions éventuelles.

## Tarifs

Les prix affichés sont des prix professionnels.

Ils peuvent être personnalisés selon :

* pharmacie ;
* contrat ;
* conditions commerciales ;
* promotions ;
* quantité.

La gestion détaillée de ces règles relève du back-office.

## Commandes

Le pharmacien peut :

1. consulter le catalogue ;
2. sélectionner des produits ;
3. indiquer les quantités ;
4. consulter le montant ;
5. valider la commande ;
6. recevoir une confirmation ;
7. suivre son statut.

Exemple :

```text
Panier
  ↓
Validation
  ↓
Commande créée
  ↓
En attente de traitement
  ↓
Préparation
  ↓
Expédition / Livraison
  ↓
Livrée
```

## Historique

Le pharmacien peut consulter :

* commandes passées ;
* dates ;
* références ;
* produits ;
* quantités ;
* montants ;
* statuts.

## Factures

Le pharmacien peut consulter ses factures et télécharger les documents disponibles.

## Documents

L'espace permet également d'accéder aux documents professionnels associés à son compte ou aux produits.

## Profil pharmacie

Le professionnel peut consulter les informations de sa pharmacie :

* nom ;
* adresse ;
* coordonnées ;
* informations professionnelles ;
* informations de livraison ;
* informations de facturation.

---

# 7. RÔLE : GROSSISTE

Le grossiste dispose d'un espace professionnel adapté à son activité.

Il accède au catalogue B2B AFAQ Health.

## Fonctionnalités principales

* consultation du catalogue ;
* consultation des tarifs grossiste ;
* consultation de la disponibilité ;
* création de commandes ;
* suivi des commandes ;
* historique ;
* consultation des factures ;
* téléchargement des documents ;
* gestion de son profil.

Le grossiste peut bénéficier de conditions commerciales différentes de celles d'une pharmacie.

```text
                     AFAQ HEALTH
                          │
                       Grossiste
                          │
              ┌───────────┼───────────┐
              │           │           │
           Catalogue    Tarifs     Commandes
              │           │           │
              └───────────┼───────────┘
                          │
                       Factures
```

---

# 8. RÔLE : DISTRIBUTEUR

Le distributeur possède également un compte B2B.

Ses fonctionnalités principales sont :

* accès au catalogue ;
* tarifs distributeur ;
* disponibilité des produits ;
* commandes ;
* suivi des commandes ;
* historique ;
* factures ;
* documents ;
* profil professionnel.

Le système doit différencier les droits et conditions commerciales du distributeur de ceux du pharmacien et du grossiste.

---

# 9. CATALOGUE B2B

Le catalogue B2B constitue le catalogue commercial destiné aux professionnels.

Il reprend les produits AFAQ Health disponibles à la commercialisation professionnelle.

## Organisation

```text
Catalogue B2B
│
├── Marques
│
├── Catégories
│
├── Produits
│
└── Recherche
```

## Recherche

Le professionnel doit pouvoir rechercher un produit par exemple par :

* nom ;
* référence ;
* marque ;
* catégorie.

## Filtres

Des filtres peuvent permettre de sélectionner :

* marque ;
* catégorie ;
* disponibilité ;
* type de produit ;
* promotion.

---

# 10. TARIFICATION B2B

La tarification B2B est différente du contenu public.

Le site public ne montre pas les tarifs professionnels.

Dans le portail B2B, le tarif affiché dépend du compte professionnel.

Exemple :

```text
Produit X
│
├── Tarif Pharmacie
├── Tarif Grossiste
└── Tarif Distributeur
```

La personnalisation peut ensuite être étendue à :

```text
Produit
   ↓
Type de client
   ↓
Contrat / conditions commerciales
   ↓
Tarif personnalisé
   ↓
Promotion éventuelle
   ↓
Prix final
```

La gestion de ces règles doit être réalisée depuis le back-office.

---

# 11. STOCK

Le futur portail B2B doit pouvoir intégrer les informations de stock.

Le stock permet notamment de déterminer si un produit est disponible pour une commande.

Statuts possibles :

* Disponible ;
* Stock limité ;
* Rupture ;
* Indisponible temporairement.

Le document prévoit explicitement le stock dans la vision B2B future.

La source réelle du stock pourra ultérieurement être connectée au système interne d'AFAQ Health ou à un ERP.

---

# 12. COMMANDES

Le module de commandes constitue l'un des modules centraux du portail B2B.

## Création

```text
Catalogue
   ↓
Produit
   ↓
Quantité
   ↓
Panier
   ↓
Validation
   ↓
Commande
```

## Informations d'une commande

Une commande peut contenir :

* numéro de commande ;
* client ;
* date ;
* produits ;
* quantités ;
* prix unitaires ;
* remises ;
* montant total ;
* adresse de livraison ;
* statut ;
* documents associés.

## Statuts

Le système peut gérer un cycle :

```text
BROUILLON
    ↓
COMMANDÉE
    ↓
EN TRAITEMENT
    ↓
EN PRÉPARATION
    ↓
EXPÉDIÉE
    ↓
LIVRÉE
```

Avec éventuellement :

```text
ANNULÉE
```

---

# 13. FACTURATION

Le portail B2B doit permettre aux professionnels d'accéder à leurs factures.

Pour chaque facture :

* numéro ;
* date ;
* client ;
* commande associée ;
* montant ;
* statut ;
* document PDF.

Exemple :

```text
Commande #CMD-2026-00125
          ↓
Facture #FAC-2026-00452
          ↓
Téléchargement PDF
```

La gestion de la facturation doit rester séparée de la simple consultation du catalogue.

---

# 14. DOCUMENTS

Le portail B2B comprend un espace documentaire.

Les documents peuvent être associés :

* au compte professionnel ;
* à une commande ;
* à une facture ;
* à un produit ;
* à une marque ;
* à une campagne ou promotion.

Exemple :

```text
Documents
│
├── Fiches produits
├── Documents commerciaux
├── Documents réglementaires
├── Factures
└── Documents liés aux commandes
```

---

# 15. PROMOTIONS

Le portail B2B peut présenter les promotions disponibles pour un professionnel.

Une promotion peut être définie selon :

* produit ;
* marque ;
* catégorie ;
* type de client ;
* période ;
* quantité ;
* conditions commerciales.

Exemple :

```text
Produit
   ↓
Promotion active
   ↓
Client éligible ?
   ↓
Oui
   ↓
Prix/remise appliqué
```

La gestion des promotions est prévue dans la vision B2B future.

---

# 16. BACK-OFFICE

Le Back-Office est l'interface interne utilisée par AFAQ Health.

Il permet à l'équipe AFAQ Health de gérer l'ensemble de l'écosystème.

Architecture :

```text
BACK-OFFICE
│
├── Dashboard
├── Utilisateurs
├── Clients professionnels
├── Produits
├── Marques
├── Catégories
├── Tarifs
├── Stock
├── Commandes
├── Factures
├── Documents
├── Promotions
├── CRM
└── Reporting / BI
```

---

# 17. GESTION DES UTILISATEURS

L'administrateur peut gérer les comptes.

Fonctions :

* créer un compte ;
* modifier un compte ;
* désactiver un compte ;
* réactiver un compte ;
* attribuer un rôle ;
* valider une demande d'accès ;
* consulter les informations du professionnel.

Rôles principaux :

```text
ADMIN
COMMERCIAL
PHARMACIEN
GROSSISTE
DISTRIBUTEUR
```

---

# 18. GESTION DES CLIENTS PROFESSIONNELS

Le Back-Office contient une vue centralisée des partenaires professionnels.

Exemple :

```text
Clients professionnels
│
├── Pharmacies
├── Grossistes
└── Distributeurs
```

Pour chaque client :

* informations générales ;
* coordonnées ;
* statut ;
* commandes ;
* historique ;
* factures ;
* documents ;
* conditions commerciales.

---

# 19. RÔLE COMMERCIAL

Le commercial AFAQ Health constitue un utilisateur interne.

Il ne possède pas les mêmes droits qu'un administrateur.

Il peut notamment consulter les informations commerciales nécessaires à son activité.

Exemple de fonctionnalités :

* consulter les clients ;
* consulter les pharmacies ;
* consulter les grossistes ;
* consulter les distributeurs ;
* consulter les commandes ;
* suivre l'activité commerciale ;
* consulter les produits ;
* consulter les tarifs selon ses permissions.

Dans une version plus avancée, le commercial peut être intégré au CRM.

---

# 20. CRM

Le CRM permet à AFAQ Health de centraliser la relation avec les professionnels.

Le document prévoit explicitement l'intégration future d'un CRM dans le back-office.

Le CRM peut regrouper :

* clients ;
* prospects ;
* contacts ;
* historique des interactions ;
* commandes ;
* activité commerciale ;
* suivi des comptes ;
* informations commerciales.

Architecture :

```text
CLIENT
  │
  ├── Informations
  ├── Contacts
  ├── Commandes
  ├── Factures
  ├── Documents
  └── Historique commercial
```

---

# 21. REPORTING / BI

La vision cible prévoit également une couche de reporting et de BI.

```text
PORTAIL B2B
      │
      ▼
BACK-OFFICE
      │
      ▼
REPORTING / BI
```

Les données peuvent permettre de suivre :

* chiffre d'affaires ;
* commandes ;
* volumes ;
* produits les plus commandés ;
* clients actifs ;
* activité par type de client ;
* évolution des ventes ;
* performances commerciales ;
* stock ;
* promotions.

Le document positionne cette couche dans la vision cible avec CRM / STOCK / BI.

---

# 22. GESTION DU CATALOGUE

Le catalogue doit être administrable depuis le back-office.

L'administrateur peut gérer :

* produits ;
* marques ;
* catégories ;
* images ;
* documents ;
* informations produit.

Le CMS de la V1 prévoit déjà la gestion des produits, marques, articles, images, catégories et autres contenus.

La future architecture B2B réutilise donc cette base catalogue.

---

# 23. RELATION ENTRE SITE PUBLIC ET B2B

Le site public et le portail B2B utilisent le même écosystème AFAQ Health mais avec des niveaux d'accès différents.

```text
                         AFAQ HEALTH
                              │
             ┌────────────────┴────────────────┐
             │                                 │
        SITE PUBLIC                         PORTAIL B2B
             │                                 │
        Informations                    Informations privées
             │                                 │
        Produits                         Catalogue B2B
        Marques                          Tarifs
        Conseils                         Commandes
        Pharmacies                       Factures
             │                            Documents
             │                                 │
             └──────────────┬──────────────────┘
                            │
                       BACK-OFFICE
```

Le site public reste accessible sans authentification.

Le portail B2B nécessite une authentification professionnelle.

---

# 24. PARCOURS DU PHARMACIEN

```text
Site public
    ↓
Professionnels
    ↓
Connexion
    ↓
Espace Pharmacie
    ↓
Tableau de bord
    ↓
Catalogue B2B
    ↓
Produit
    ↓
Tarif professionnel
    ↓
Panier
    ↓
Commande
    ↓
Suivi
    ↓
Facture
```

---

# 25. PARCOURS DU GROSSISTE

```text
Connexion
    ↓
Espace Grossiste
    ↓
Catalogue B2B
    ↓
Tarifs grossiste
    ↓
Sélection produits
    ↓
Commande
    ↓
Traitement
    ↓
Livraison
    ↓
Facture
```

---

# 26. PARCOURS DU DISTRIBUTEUR

```text
Connexion
    ↓
Espace Distributeur
    ↓
Catalogue
    ↓
Tarifs distributeur
    ↓
Commande
    ↓
Suivi
    ↓
Facturation
    ↓
Documents
```

---

# 27. PARCOURS ADMINISTRATEUR

```text
Connexion Back-Office
        ↓
Dashboard
        ↓
Gestion des utilisateurs
        ↓
Gestion des clients
        ↓
Gestion catalogue
        ↓
Gestion tarifs
        ↓
Gestion stock
        ↓
Gestion commandes
        ↓
Gestion factures
        ↓
Gestion documents
        ↓
CRM
        ↓
Reporting / BI
```

---

# 28. MODÈLE DES PERMISSIONS

Le système doit utiliser une gestion des rôles et permissions.

| Fonctionnalité       | Pharmacie | Grossiste | Distributeur |   Commercial | Admin |
| -------------------- | --------: | --------: | -----------: | -----------: | ----: |
| Site public          |         ✓ |         ✓ |            ✓ |            ✓ |     ✓ |
| Catalogue B2B        |         ✓ |         ✓ |            ✓ |            ✓ |     ✓ |
| Tarifs               |         ✓ |         ✓ |            ✓ |            ✓ |     ✓ |
| Commandes            |         ✓ |         ✓ |            ✓ | Consultation |     ✓ |
| Factures             |         ✓ |         ✓ |            ✓ | Consultation |     ✓ |
| Documents            |         ✓ |         ✓ |            ✓ |            ✓ |     ✓ |
| Gestion utilisateurs |         — |         — |            — |            — |     ✓ |
| Gestion catalogue    |         — |         — |            — | Selon droits |     ✓ |
| Gestion tarifs       |         — |         — |            — | Selon droits |     ✓ |
| Gestion stock        |         — |         — |            — | Consultation |     ✓ |
| CRM                  |         — |         — |            — |            ✓ |     ✓ |
| Reporting / BI       |         — |         — |            — |            ✓ |     ✓ |

Cette matrice constitue une proposition de détail des permissions ; le document source définit les grandes catégories de comptes et fonctionnalités mais ne fournit pas une matrice RBAC aussi détaillée.

---

# 29. DONNÉES PRINCIPALES

L'architecture doit pouvoir gérer plusieurs types d'entités.

```text
USER
│
├── ProfessionalAccount
│       ├── Pharmacy
│       ├── Wholesaler
│       └── Distributor
│
├── Brand
│
├── Product
│
├── ProductCategory
│
├── Order
│
├── OrderItem
│
├── Invoice
│
├── Document
│
├── Price
│
├── Promotion
│
├── Stock
│
└── CRMRecord
```

La V1 publique définit déjà notamment les entités Brand, Product, ProductCategory, Article, Pharmacy, ContactRequest, Document et User.

---

# 30. ARCHITECTURE FONCTIONNELLE FINALE

L'écosystème complet peut donc être représenté ainsi :

```text
                                    AFAQ HEALTH
                                         │
             ┌───────────────────────────┼────────────────────────────┐
             │                           │                            │
             ▼                           ▼                            ▼
       SITE PUBLIC                  PORTAIL B2B                  BACK-OFFICE
             │                           │                            │
     ┌───────┼────────┐          ┌───────┼─────────┐          ┌───────┼────────┐
     │       │        │          │       │         │          │       │        │
 Produits Marques Pharmacies  Pharmacies Grossistes Distributeurs Utilisateurs Catalogue
     │       │        │          │       │         │          │       │        │
 Conseils  SOTYA     Map        Tarifs  Tarifs   Tarifs       Clients Stock   Commandes
     │    Naturamins               │       │         │          │       │        │
     │   Colagenova               Commandes Commandes Commandes CRM   Tarifs Factures
     │                             │       │         │          │       │        │
     └───────────────┐             Factures Factures Factures   BI   Documents Promotions
                     │
                     ▼
                CONSOMMATEUR

                     PORTAIL B2B
                         │
                         ▼
                  BACK-OFFICE
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
             CRM        STOCK       BI
```

---

# 31. VISION CIBLE

La vision cible d'AFAQ Health repose donc sur une séparation claire :

### SITE PUBLIC

Destiné à :

* consommateurs ;
* visiteurs ;
* découverte des marques ;
* découverte des produits ;
* conseils ;
* recherche de pharmacies.

### PORTAIL B2B

Destiné à :

* pharmacies ;
* grossistes ;
* distributeurs.

Avec :

* authentification ;
* catalogue professionnel ;
* tarifs ;
* commandes ;
* factures ;
* documents ;
* promotions.

### BACK-OFFICE

Destiné aux équipes AFAQ Health avec :

* gestion des utilisateurs ;
* gestion des clients ;
* gestion du catalogue ;
* gestion des tarifs ;
* gestion du stock ;
* gestion des commandes ;
* gestion des factures ;
* gestion documentaire ;
* CRM ;
* reporting ;
* BI.

Cette organisation correspond à la vision cible présentée dans le document : site public + portail B2B + back-office intégrant CRM, stock et BI.

---

# 32. PÉRIMÈTRE DE LA V1

Il est important de distinguer la V1 actuellement prévue du futur portail B2B.

La V1 publique ne comprend pas :

* portail B2B complet ;
* panier professionnel ;
* commandes B2B ;
* prix personnalisés ;
* stock temps réel ;
* facturation client ;
* CRM ;
* gestion commerciale ;
* dashboard de gestion ;
* gestion des commerciaux ;
* campagnes avancées ;
* portail fabricant ;
* application mobile ;
* Power BI ;
* fonctionnalités avancées multi-pays.

La V1 doit donc principalement **préparer l'architecture** afin que ces fonctionnalités puissent être ajoutées ultérieurement sans reconstruire complètement le système.

---

# 33. ARCHITECTURE ÉVOLUTIVE

L'objectif architectural est de construire le système de manière évolutive.

```text
PHASE 1
SITE PUBLIC
     │
     ├── Produits
     ├── Marques
     ├── Conseils
     └── Pharmacies
     
             ↓

PHASE 2
PORTAIL B2B
     │
     ├── Authentification
     ├── Pharmacies
     ├── Grossistes
     ├── Distributeurs
     ├── Catalogue
     ├── Tarifs
     ├── Commandes
     ├── Factures
     └── Documents

             ↓

PHASE 3
BACK-OFFICE AVANCÉ
     │
     ├── CRM
     ├── Stock
     ├── Promotions
     ├── Gestion commerciale
     └── Reporting

             ↓

PHASE 4
DATA / BI
     │
     ├── Analytics
     ├── KPI
     ├── Business Intelligence
     └── Pilotage commercial
```

L'idée est donc de ne pas considérer le site public comme un projet isolé, mais comme la première brique d'un écosystème digital AFAQ Health beaucoup plus large.

---

# 34. RÈGLE FONDAMENTALE DE L'ARCHITECTURE

La séparation fondamentale est :

```text
PUBLIC
   ≠
B2B
   ≠
BACK-OFFICE
```

Le consommateur voit les informations publiques.

Le professionnel authentifié voit les informations commerciales correspondant à son compte.

L'équipe AFAQ Health possède les droits de gestion nécessaires à l'administration de la plateforme.

Ainsi :

```text
CONSOMMATEUR
      ↓
SITE PUBLIC
      ↓
Informations produits
      ↓
Pharmacie

PROFESSIONNEL
      ↓
PORTAIL B2B
      ↓
Catalogue + Tarifs + Commandes + Factures + Documents

AFAQ HEALTH
      ↓
BACK-OFFICE
      ↓
Utilisateurs + Clients + Catalogue + Stock + Commandes
      ↓
CRM + BI
```

Cette séparation constitue la base fonctionnelle de l'architecture cible AFAQ Health.
