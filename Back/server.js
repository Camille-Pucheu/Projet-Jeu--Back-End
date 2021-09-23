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

app.use('*', (request, response) => {
    console.log('En attente de connexion a la base de donnee');
    const mongoClient = new mongodb.MongoClient('mongodb://localhost:27017', {
        useUnifiedTopology: true,
    });
    mongoClient.connect((error, mongoClient) => {
        if(error) {
            console.log('Erreur de connection a la base de donnee');
        } else {
            const db = mongoClient.db('projetBackEnd');
            const collection = db.collection('scoreTab');
            console.log('Connection avec la bdd ok')
            collection.find().sort({'Durée de jeu' : 1}).toArray((err,datas) => {
                if (err) return;
                mongoClient.close();
                response.render('index',{datas:datas});
            });
        }
    })
})

httpServer.listen(8888, () => {
    console.log('Express HTTP server démarre sur le port 8888');
})

let joueur = {};
let room = {};
let clientNo = 0;
let roomNo;

ioServer.on('connection', (socket) => {

    // Rooms part start
    clientNo++;
    roomNo = Math.round(clientNo/2);
    room[roomNo] = [1,2];
    console.log(room);
    socket.join(roomNo);
    console.log(`client no.: ${clientNo}, room no.: ${roomNo}`);

    if (clientNo % 2 === 1){
        // Joueur 1
        socket.emit('quelJoueur', 1);
        socket.on('entreePseudo', (nomRecu) => {
            console.log('Pseudo entré :', nomRecu);
            joueur[socket.id] = {'nom': nomRecu};
            room[roomNo][0] =  nomRecu;
            if (room[roomNo][1] == room[roomNo][0]) {
                socket.emit('pseudoInvalide');
            } else {
                ioServer.in(roomNo).emit('PseudoJoueur1', nomRecu);
                socket.emit('choixAvatar');
            }
        })
        socket.on('clickAvatar', (pokemonChoisi) => {
            // ioServer.in(roomNo).emit('changementVignette1', pokemonChoisi);
            ioServer.in(roomNo).emit('changementVignette', pokemonChoisi, 1);
            socket.emit('Pret');
        })
    } else if (clientNo % 2 === 0) {
        // Joueur2
        socket.emit('quelJoueur', 2);
        socket.on('entreePseudo', (nomRecu) => {
            console.log('Pseudo entré :', nomRecu);
            joueur[socket.id] = {'nom': nomRecu};
            room[roomNo][1] =  nomRecu;
            if (room[roomNo][1] == room[roomNo][0]) {
                socket.emit('pseudoInvalide');
            } else {
                ioServer.in(roomNo).emit('PseudoJoueur2', nomRecu);
                socket.emit('choixAvatar');
            }
        })
        socket.on('clickAvatar', (pokemonChoisi) => {
            // ioServer.in(roomNo).emit('changementVignette2', pokemonChoisi);
            ioServer.in(roomNo).emit('changementVignette', pokemonChoisi, 2);
            socket.emit('Pret');
        })
    }
    
    socket.emit('numeroRoom', Math.round(clientNo/2));
    // socket.on('submitPseudo', clientRoom => {
    //     ioServer.to(clientRoom).emit('switchFromServer');
    // })

    // Rooms part end

    // socket.on('entreePseudo', (data) => {
    //     console.log('Données reçues du navigateur :', data);
    //     pseudos['room-1'].joueur1.nom = data;
    //     console.log(pseudos);
    //     socket.emit('sortiePseudo', data);
    // })

    socket.on('disconnect', () => {
        console.log('Déconnection d\'un utilisateur');
    })
})
