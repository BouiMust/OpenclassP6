## PROJET 6 : Construire le backend d'une application web avec Node, Express, MongoDB  

_________________________________

### OBJECTIF DU PROJET  

Créer le backend qui accompagnera le frontend pour faire fonctionner l'application web.

Créer le backend signifie :
- mettre en place le serveur et implémenter l'API
- créer une base de données qui sauvegarde les données de l'API
- permettre la lecture, l'écriture, la modification et la suppression des données (CRUD)
- sécuriser l'API

_________________________________

### INSTALLATION DE L'APPLICATION

Pour lancer l'application web, il faut installer NodeJS et son gestionnaire de paquets npm (livré avec NodeJS par défaut).  
Lien de téléchargement : https://nodejs.org/en/ (version LTS)

### EXECUTION

- Cloner le dépot avec la commande 'git clone https://github.com/BouiMust/OpenclassP6.git Projet6'
- Dans le dossier front, lancer la commande 'npm install' pour installer les dépendances dont a besoin le frontend, puis 'npm run start' pour executer le frontend (aller sur http://localhost:4200)
- Dans le dossier back, taper la commande 'npm init', mettre 'server.js' en point d'entrée. Puis la commande 'node server' pour executer le backend/serveur.

### EXECUTION (AVEC NODEMON)

Le paquet Nodemon n'est pas indispensable mais permet de relancer le serveur automatiquement après chaque modification apporté au backend et voir le changement.
- Installation : 'npm install -g nodemon'
- Lancer le serveur : 'nodemon server' au lieu de 'node server'

_____________________________

### DEPENDANCES LIEES AU BACKEND


##### EXPRESS.js  
Ce paquet permet de faciliter la création et la gestion de serveur Node et d'API.
- Installation : 'npm install express --save'

##### MONGOOSE  
Il facilite la gestion et la communication avec la base de données MongoDB.
- Installation : 'npm install mongoose'

##### BCRYPT  
Ce paquet permet de hasher (ou chiffrer) les mots de passe.
- installation : 'npm install bcrypt'

##### Mongoose-unique-validator  
Il vérifie qu'une donnée est unique pour chaque ressource d'une collection dans la base de donnée.
- installation : 'npm install mongoose-unique-validator'

##### JSONWEBTOKEN  
Il permet de créer et vérifier des tokens (chaines de caractères encodées).
- installation : 'npm install jsonwebtoken'

##### MULTER  
Le paquet Multer gère les fichiers entrants.
- installation : 'npm install multer'

_________________________________

### BASE DE DONNEES

L'application utilise le service MongoDB Atlas, une plateforme/service en ligne, pour la sauvegarde des données.
MongoDB est un système de base de données pour les serveurs Node.

_________________________________

### REQUETES HTTP

Les verbes (ou actions) http implémentés dans l'application : GET, POST, PUT, DELETE

_________________________________

### CODES HTTP

Les codes d'état retournés par l'application suite aux requêtes http :
- 200 : OK, la ressource est disponible
- 201 : OK, création ou modification d'une ressource
- 401 : non authentifié pour accéder à la ressource
- 403 : accès refusé, non autorisé à exploiter la ressource
- 500 : erreur interne, erreur provenant de l'application

_________________________________

### ENDPOINTS DES ROUTES


##### Nom de domaine : http://localhost:4200

##### URI pour chaque route

Inscription de l'utilisateur :  
/api/auth/signup

Athentification de l'utilisateur :  
/api/auth/login

Afficher la collection des sauces :  
/api/sauces

Afficher une sauce :  
/api/sauces/:id

Créer une sauce :  
/api/sauces

Modifier une sauce :  
/api/sauces/:id

Supprimer une sauce :  
/api/sauces/:id

Modifier un like/dislike :  
/api/sauces/:id/like


:id = paramètre URL qui correspond à l'identifiant unique de la sauce.

_________________________________


### COMPOSITION DU DOSSIER BACK (=BACKEND) :

Server.js
- il s'agit du serveur Node configuré et normalisé.

App.js
- c'est l'application (ou API) que le serveur va servir. A chaque appel du serveur, celui-ci va executer l'application. Ce fichier est la base de l'application.

Dossier routes
- contient les routes pour l'application

Dossier models
- contient les modèles crées avec mongoose

Dossier controllers
- contient les traitements/opérations pour chaque route

Dossier middleware
- contient des traitements complémentaires