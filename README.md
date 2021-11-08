# Course de Pokemons

Un petit jeu qui se joue à deux.

## Prérequis

- Node.js inclutant Node Package Manager
- MongoDB

## Mise en place

Téléchargez le fichier ZIP et décompressez-le où vous le souhaitez.
Copiez le chemin de ficher du dossier `Projet` et entrez-le dans le Terminal bash `cd ../Projet`.
Une fois dans le bon dossier; tapez `npm install` pour installer toutes les dépendances.

## Base de donnée

A votre convenance, vous pouvez installer la BDD en passant par votre terminal classique en indiquant :
`mongoimport --db projetBackEnd --collection scoreTab --file "_indiquez ici le chemin du fichier scoreTab.json du dossier BDD_"`
Ou en passant par MongoDB Compass en créant une database `projetBackEnd` et une collection `scoreTab` dans laquelle vous importerez le fichier scoreTab.json du dossier BDD.


## Serveur

Lancez maintenant votre serveur dans votre terminal Bash en indiquant `node server.js`.
Vous pouvez accéder au jeu à l'adresse http://localhost:5500/.





Amusez-vous bien et excusez votre clavier de ma part ;).