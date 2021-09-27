'use strict'

/****************************************/
/************     Config     ************/
/****************************************/

const mongodb = require('mongodb');
const uuid = require('uuid');

const express = require('express');
const app = express();
const {createServer} = require('http');
const socketIO = require('socket.io');
const httpServer = createServer(app);
const ioServer = socketIO(httpServer);


app.use('/css',express.static(__dirname + '/assets/css'));
app.use('/img',express.static(__dirname + '/assets/Images'));
app.use('/js',express.static(__dirname + '/assets/JavaScript'));

app.set('view engine','pug');

/******************************************/
/*************     Server     *************/
/******************************************/

app.use('*', (request, response) => {
    // console.log('En attente de connexion a la base de donnee');
    const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });
    mongoClient.connect((error, mongoClient) => {
        if(error) {
            console.log('Erreur de connection a la base de donnee');
        } else {
            const db = mongoClient.db('projetBackEnd');
            const collection = db.collection('scoreTab');
            // console.log('Connection avec la bdd ok')
            collection.find().sort({'Temps' : 1}).toArray((err,datas) => {
                if (err) return;
                response.render('index',{datas:datas});
            });
        }
    })
})

httpServer.listen(8888, () => {
    console.log('Express HTTP server démarre sur le port 8888');
})

/*****************************************/
/***********     Socket.IO     ***********/
/*****************************************/

let joueur = {};
let room = {};
let clientNo = 0;
let roomNo;

ioServer.on('connection', (socket) => {

    clientNo++;
    roomNo = Math.round(clientNo/2);
    room[roomNo] = [1, 2, 'no', 'no', 'no', 'no'];
    socket.join(roomNo);

    socket.emit('numeroRoom', roomNo);

    /* Affichage du score */
    socket.on('rangementScoreTab', () => {
        const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017', {
            useUnifiedTopology: true,
        });
        mongoClient.connect((error, mongoClient) => {
            if(error) {
                console.log('Erreur de connection a la base de donnee');
            } else {
                const db = mongoClient.db('projetBackEnd');
                const collection = db.collection('scoreTab');
                collection.find().sort({'Temps' : 1}).toArray((err,datas) => {
                    if (err) return;
                    mongoClient.close();
                    ioServer.emit('rangementOK', datas);
                });
            }
        })
    })

    /* Gestion du chronomètre */
    socket.once('envoiChrono', () => {
        socket.emit('lancementChrono');
    })
    socket.on('envoiFinChrono', () => {
        socket.emit('finChrono');
    })



/*------------------------------------- Joueur 1 */
    if (clientNo % 2 === 1){

        socket.emit('quelJoueur', 1);

    /* Vérifie la présence d'un adversaire */
        socket.to(roomNo).emit('unJoueurPresent');
        socket.on('deuxiemeJoueurPresent', () => {
            ioServer.in(roomNo).emit('adversairePresent');
        })


    /* Choix pseudo */
        socket.on('entreePseudo', (nomRecu) => {
            joueur[socket.id] = {'Pseudo': nomRecu};
            room[roomNo][0] =  nomRecu;
            if (room[roomNo][1] == room[roomNo][0]) {
                socket.emit('pseudoInvalide');
            } else {
                ioServer.in(roomNo).emit('PseudoJoueur1', nomRecu);
                socket.emit('choixAvatar');
            }
        })

    /* Choix avatar */
        socket.on('clickAvatar', (pokemonChoisi) => {
            joueur[socket.id].Avatar = pokemonChoisi;
            ioServer.in(roomNo).emit('assignationAvatar', pokemonChoisi, 1);
            socket.emit('infosJoueurOK');
        })

    /* Transition vers jeu */
        socket.on('pret', () => {
            room[roomNo][3] =  'yes';
            if (room[roomNo][2] == 'yes') {
                ioServer.in(roomNo).emit('lancementPartie');
            } else {
                socket.emit('attenteAdversaire');
            }
        })
        socket.on('envoiCompteARebours', () => {
            ioServer.in(roomNo).emit('lancementCompteARebours');
        })

    /* Démarrage jeu */
        socket.on('go', () => {
            socket.emit('course', 1);
        });
        socket.on('envoiPosition', (nbr) => {
            ioServer.to(roomNo).emit('receptionPosition', nbr, 1);
        })

    /* Fin de course */
        socket.on('finDeCourseJoueur1', (chrono) => {
            joueur[socket.id].Temps = chrono;
            room[roomNo][4] = chrono;
            if (room[roomNo][5] !== 'no') {
                joueur[socket.id].Score = '2e';
            } else {
                joueur[socket.id].Score = '1er';
            }
            ioServer.in(roomNo).emit('finDuJeuJoueur1', joueur[socket.id].Pseudo, chrono, joueur[socket.id].Score);
            socket.emit('finDeJeu', chrono);

            /* Stockage en base de donnee */
            const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017', {
                useUnifiedTopology: true,
            });
            mongoClient.connect((error, mongoClient) => {
                if(error) {
                    console.log('Erreur de connection a la base de donnee');
                } else {
                    const db = mongoClient.db('projetBackEnd');
                    const collection = db.collection('scoreTab');
                    console.log('Insertion en base de donnee')
                    collection.insertOne(joueur[socket.id], (err,datas) => {
                        if (err) {
                            console.log(`Echec d'insertion en BDD`);
                        };
                        mongoClient.close();
                    });
                }
            })
        });
        

/*------------------------------------- Joueur 2 */
    } else if (clientNo % 2 === 0) {

        socket.emit('quelJoueur', 2);

    /* Vérifie la présence d'un adversaire */
        socket.to(roomNo).emit('unJoueurPresent');
        socket.on('deuxiemeJoueurPresent', () => {
            ioServer.in(roomNo).emit('adversairePresent');
        })


    /* Choix pseudo */
        socket.on('entreePseudo', (nomRecu) => {
            joueur[socket.id] = {'Pseudo': nomRecu};
            room[roomNo][1] =  nomRecu;
            if (room[roomNo][1] == room[roomNo][0]) {
                socket.emit('pseudoInvalide');
            } else {
                ioServer.in(roomNo).emit('PseudoJoueur2', nomRecu);
                socket.emit('choixAvatar');
            }
        })

    /* Choix avatar */
        socket.on('clickAvatar', (pokemonChoisi) => {
            joueur[socket.id].Avatar = pokemonChoisi;
            ioServer.in(roomNo).emit('assignationAvatar', pokemonChoisi, 2);
            socket.emit('infosJoueurOK');
        })

    /* Transition vers jeu */
        socket.on('pret', () => {
            room[roomNo][2] =  'yes';
            if (room[roomNo][3] == 'yes') {
                ioServer.in(roomNo).emit('lancementPartie');
            } else {
                socket.emit('attenteAdversaire');
            }
        })
        socket.on('envoiCompteARebours', () => {
            ioServer.in(roomNo).emit('lancementCompteARebours');
        })

    /* Démarrage jeu */
        socket.on('go', () => {
            socket.emit('course', 2);
        });
        socket.on('envoiPosition', (nbr) => {
            ioServer.to(roomNo).emit('receptionPosition', nbr, 2);
        })
    /* Fin de course */
        socket.on('finDeCourseJoueur2', (chrono) => {
            joueur[socket.id].Temps = chrono;
            room[roomNo][5] = chrono;
            if (room[roomNo][4] !== 'no') {
                joueur[socket.id].Score = '2e';
            } else {
                joueur[socket.id].Score = '1er';
            }
            ioServer.in(roomNo).emit('finDuJeuJoueur2', joueur[socket.id].Pseudo, chrono, joueur[socket.id].Score);
            socket.emit('finDeJeu', chrono);

            /* Stockage en base de donnee */
            const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017', {
                useUnifiedTopology: true,
            });
            mongoClient.connect((error, mongoClient) => {
                if(error) {
                    console.log('Erreur de connection a la base de donnee');
                } else {
                    const db = mongoClient.db('projetBackEnd');
                    const collection = db.collection('scoreTab');
                    console.log('Insertion en base de donnee')
                    collection.insertOne(joueur[socket.id], (err,datas) => {
                        if (err) {
                            console.log(`Echec d'insertion en BDD`);
                        };
                        mongoClient.close();
                    });
                }
            })
        });

    }

    socket.on('disconnect', () => {
        console.log('Déconnection d\'un utilisateur');
    })
})
