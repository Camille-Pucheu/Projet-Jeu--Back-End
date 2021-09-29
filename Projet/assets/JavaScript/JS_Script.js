'use strict'

    /************************************************************************
    ************************ Mes variables et Objets ************************
    ************************************************************************/

const element = {
    // En-Tête
    personnesConnectees : document.getElementById('enTete').children[1].firstElementChild,
    // Zone score 
    boutonScore : document.getElementById('score').firstElementChild,
    tableauDesScores : document.getElementById('scoreTab'),
    listeScores : document.getElementById('listeScore'),
    // Attente d'adversaire
    divChargement : document.getElementById('chargement'),
    spritePikachu : document.getElementById('spritePikachu'),
    // Introduction
    divIntroduction : document.getElementById('introduction'),
    form : document.querySelector('form'),
    inputPseudo : document.querySelector('input[name="pseudo"]'),
    invalideP : document.getElementById('introduction').lastChild.lastChild,
    // Choix d'Avatar
    divChoixAvatar : document.getElementById('choixAvatar'),
    vignetteBrocelome : document.getElementById('avatar').querySelector('img[alt="Brocélôme"]'),
    vignetteCouverdure : document.getElementById('avatar').querySelector('img[alt="Couverdure"]'),
    vignetteDarumarond : document.getElementById('avatar').querySelector('img[alt="Darumarond"]'),
    vignetteEscargaume : document.getElementById('avatar').querySelector('img[alt="Escargaume"]'),
    vignetteMucuscule : document.getElementById('avatar').querySelector('img[alt="Mucuscule"]'),
    vignetteSorbebe : document.getElementById('avatar').querySelector('img[alt="Sorbébé"]'),
    vignetteSucroquin : document.getElementById('avatar').querySelector('img[alt="Sucroquin"]'),
    vignetteVenipatte : document.getElementById('avatar').querySelector('img[alt="Venipatte"]'),
    // Partie Jeu
    divJeu : document.getElementById('jeu'),
    divCompteARebours : document.getElementById('compteARebours'),
    rebours : document.getElementById('rebours'),
    coureur1 : document.getElementById('coureur1'),
    coureur2 : document.getElementById('coureur2'),
    divCoureur1 : document.getElementById('coureur1').firstChild,
    divCoureur2 : document.getElementById('coureur2').firstChild,
    imgCoureur1 : document.getElementById('coureur1').firstChild.firstChild,
    imgCoureur2 : document.getElementById('coureur2').firstChild.firstChild,
    // Partie conclusion
    divFinDeJeu : document.getElementById('conclusion'),
    temps : document.getElementById('temps'),
    // Partie joueurs
    nomJoueur1 : document.getElementById('nomJoueur1'),
    nomJoueur2 : document.getElementById('nomJoueur2'),
    avatarJoueur1 : document.getElementById('joueurs').querySelector('img[alt="Avatar du Joueur 1"]'),
    avatarJoueur2 : document.getElementById('joueurs').querySelector('img[alt="Avatar du Joueur 2"]'),
    // Div déconnection
    divDeconnection : document.getElementById('deconnection'),
};

const coureurs = {
    brocelome : {
        nbrSprite: 98,
        hauteurConteneur: 60
    },
    couverdure : {
        nbrSprite: 74,
        hauteurConteneur: 57
    },
    darumarond : {
        nbrSprite: 39,
        hauteurConteneur: 61
    },
    escargaume : {
        nbrSprite: 59,
        hauteurConteneur: 49
    },
    mucuscule : {
        nbrSprite: 53,
        hauteurConteneur: 50
    },
    sorbebe : {
        nbrSprite: 51,
        hauteurConteneur: 63
    },
    sucroquin : {
        nbrSprite: 47,
        hauteurConteneur: 49
    },
    venipatte : {
        nbrSprite: 32,
        hauteurConteneur: 44
    },
}

const temps = {
    centi : 0,
    mili : 0,
    sec : 0,
    sec_ : 0,
    affichage : '',
}

    /*-------------------------------------------- */
    /*               Initialisations               */
    /*---------------------------------------------*/ 

element.tableauDesScores.style.display = 'none';
element.spritePikachu.style.right = '0px';
element.rebours.style.right = '0px'
element.coureur1.style.right = '150px';
element.coureur2.style.right = '150px';


/************************************************************************
************************      Mes fonctions      ************************
************************************************************************/


/* Pour l'évenement du choix de l'avatar, après le clique sur la vignette choisie */
const insertionAvatars = function(
    pokemonChoisi,
    vignette,
    divCoureur,
    coureur
    ){
    switch (pokemonChoisi) {
        case 'Brocélôme': 
            vignette.src = "img/Vignette-Brocélôme.png";
            divCoureur.className = 'brocelome';
            coureur.src = "img/Sprite-Brocélôme.png";
            coureur.id = 'brocelome';
            break;
        case 'Couverdure': 
            vignette.src = "img/Vignette-Couverdure.png";
            divCoureur.className = 'couverdure';
            coureur.src = "img/Sprite-Couverdure.png";
            coureur.id = 'couverdure';
            break;
        case 'Darumarond': 
            vignette.src = "img/Vignette-Darumarond.png";
            divCoureur.className = 'darumarond';
            coureur.src = "img/Sprite-Darumarond.png";
            coureur.id = 'darumarond';
            break;
        case 'Escargaume': 
            vignette.src = "img/Vignette-Escargaume.png";
            divCoureur.className = 'escargaume';
            coureur.src = "img/Sprite-Escargaume.png";
            coureur.id = 'escargaume';
            break;
        case 'Mucuscule': 
            vignette.src = "img/Vignette-Mucuscule.png";
            divCoureur.className = 'mucuscule';
            coureur.src = "img/Sprite-Mucuscule.png";
            coureur.id = 'mucuscule';
            break;
        case 'Sorbébé': 
            vignette.src = "img/Vignette-Sorbébé.png";
            divCoureur.className = 'sorbebe';
            coureur.src = "img/Sprite-Sorbébé.png";
            coureur.id = 'sorbebe';
            break;
        case 'Sucroquin': 
            vignette.src = "img/Vignette-Sucroquin.png";
            divCoureur.className = 'sucroquin';
            coureur.src = "img/Sprite-Sucroquin.png";
            coureur.id = 'sucroquin';
            break;
        case 'Venipatte': 
            vignette.src = "img/Vignette-Venipatte.png";
            divCoureur.className = 'venipatte';
            coureur.src = "img/Sprite-Venipatte.png";
            coureur.id = 'venipatte';
            break;
    }
}

/* Lors de l'attente de l'adversaire */
let idSetInterval;
const animationPikachu = function(){
    idSetInterval = setInterval(function(){
        let x = parseFloat(element.spritePikachu.style.right);
        if (x > 1150) {
            x = 0;
            element.spritePikachu.style.right = x + 50 + "px";
        } else {
            element.spritePikachu.style.right = x + 50 + "px";
        }
    },130);
}
const finAnimatiomPikachu = function(){
    clearInterval(idSetInterval);
}

/* Pour le lancement du jeu */
const animatiomCompteARebours = function(){
    element.divCompteARebours.style.display = 'block';
    let idSetInterval;
    idSetInterval = setInterval(function(){
        let x = parseFloat(element.rebours.style.right);
        if (x > 750) {
            clearInterval(idSetInterval);
            element.divCompteARebours.style.display = 'none';
        } else {
            element.rebours.style.right = x + 150 + "px";
        }
    },1000);
}

/* Mouvement des coureurs pendant la course */
const animationCoureurs = function(pokemonChoisi,joueur){
    switch (pokemonChoisi) {
        case 'Brocélôme': 
            animationAvatar(joueur,coureurs.brocelome.nbrSprite,coureurs.brocelome.hauteurConteneur);
            break;
        case 'Couverdure': 
            animationAvatar(joueur,coureurs.couverdure.nbrSprite,coureurs.couverdure.hauteurConteneur);
            break;
        case 'Darumarond': 
            animationAvatar(joueur,coureurs.darumarond.nbrSprite,coureurs.darumarond.hauteurConteneur);
            break;
        case 'Escargaume': 
            animationAvatar(joueur,coureurs.escargaume.nbrSprite,coureurs.escargaume.hauteurConteneur);
            break;
        case 'Mucuscule': 
            animationAvatar(joueur,coureurs.mucuscule.nbrSprite,coureurs.mucuscule.hauteurConteneur);
            break;
        case 'Sorbébé': 
            animationAvatar(joueur,coureurs.sorbebe.nbrSprite,coureurs.sorbebe.hauteurConteneur);
            break;
        case 'Sucroquin': 
            animationAvatar(joueur,coureurs.sucroquin.nbrSprite,coureurs.sucroquin.hauteurConteneur);
            break;
        case 'Venipatte': 
            animationAvatar(joueur,coureurs.venipatte.nbrSprite,coureurs.venipatte.hauteurConteneur);
            break;
    }
}
const animationAvatar = function(joueur,nbrSprite,hauteurConteneur) {
    joueur.style.top = "0px";
    setInterval(function(){
        let x = parseFloat(joueur.style.top);
        if (x < -((nbrSprite-2)*hauteurConteneur)) {
            x = 0;
            joueur.style.top = 0 + "px";
        } else {
            joueur.style.top = x - hauteurConteneur + "px";
        }
    },50);
}

/* Gestion du chronomètrage */
let idInterval;

const lancementChrono = function(){
    idInterval = setInterval(function(){
        temps.mili++;
        if (temps.mili > 9) {
            temps.mili = 0;
            temps.centi++;
        }
        // pour passer en dixième de secondes
        temps.centi*10;
    
        // remise à zéro por le passage à 1 seconde
        if (temps.centi > 9) {
            temps.centi = 0;
            temps.sec++;
        }
    
        if (temps.sec < 10) {
            temps.sec_ = "0" + temps.sec;
        } else {
            temps.sec_ = temps.sec;
        }
        temps.affichage = temps.sec_ + "s " + temps.centi + temps.mili + "ms";
    }, 10);

};
const finChrono = function(){
    clearInterval(idInterval);
};


/*************************************************************************
 ************************      Mes Evenements      ************************
 *************************************************************************/

window.addEventListener('DOMContentLoaded', () => {
    const socket = io('http://192.168.35.105:8888');
    let numeroDeRoom;
    
    socket.on('deconnection', () => {
        element.divDeconnection.style.display = 'block';
    })

    /*------------------------------------------- */
    /*     Nombre de personnes connectées         */
    /*--------------------------------------------*/

    socket.on('personnesConnectees', (connections) => {
        element.personnesConnectees.innerHTML = connections;
    });


    socket.on('numeroRoom', (nbr) => {
        numeroDeRoom = nbr;
        console.log(`Connecté sur la room No.${numeroDeRoom}`);
    })
    socket.on('quelJoueur', (leJoueur) => {
        console.log(`Joueur No.${leJoueur}`);
    });

    /*------------------------------------------- */
    /*             Affichage du score             */
    /*--------------------------------------------*/ 

    element.boutonScore.addEventListener('click',function(){
        socket.emit('rangementScoreTab');
        if (element.tableauDesScores.style.display == 'none') {
            element.tableauDesScores.style.display = 'block';
        } else {
            element.tableauDesScores.style.display = 'none';
        }
    })
    socket.on('rangementOK', (datas) => {
        element.listeScores.innerHTML = '';
        datas.forEach(joueur => {
            element.listeScores.innerHTML += `<td>${joueur.Pseudo}</td><td>${joueur.Avatar}</td><td>${joueur.Temps}</td><td>${joueur.Score}</td>`;
        });
    });

    /*------------------------------------------- */
    /*            Attentes connections            */
    /*--------------------------------------------*/ 

    animationPikachu();

    socket.on('unJoueurPresent', () => {
        socket.emit('deuxiemeJoueurPresent', numeroDeRoom);
    });

    socket.on('adversairePresent', () => {
        element.divIntroduction.style.display = 'block';
        element.divChargement.style.display = 'none';
        finAnimatiomPikachu();
    });

    /*-------------------------------------------- */
    /*               Choix de Pseudo               */
    /*---------------------------------------------*/ 
    
    element.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const entreePseudo = element.inputPseudo.value;
        socket.emit('entreePseudo', entreePseudo,numeroDeRoom);
    })

    socket.on('pseudoInvalide', () => {
        element.invalideP.style.display = 'block';
    })
    socket.on('PseudoJoueur1', (nom) => {
        element.nomJoueur1.innerHTML = nom;
    })
    socket.on('PseudoJoueur2', (nom) => {
        element.nomJoueur2.innerHTML = nom;
    })

    /*------------------------------------------- */
    /*               Choix d'avatar               */
    /*--------------------------------------------*/ 

    socket.on('choixAvatar', () => {
        element.divIntroduction.style.display = 'none';
        element.divChoixAvatar.style.display = 'block';
        element.vignetteBrocelome.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Brocélôme', numeroDeRoom);
        });
        element.vignetteCouverdure.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Couverdure', numeroDeRoom);
        });
        element.vignetteDarumarond.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Darumarond', numeroDeRoom);
        });
        element.vignetteEscargaume.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Escargaume', numeroDeRoom);
        });
        element.vignetteMucuscule.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Mucuscule', numeroDeRoom);
        });
        element.vignetteSorbebe.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Sorbébé', numeroDeRoom);
        });
        element.vignetteSucroquin.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Sucroquin', numeroDeRoom);
        });
        element.vignetteVenipatte.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Venipatte', numeroDeRoom);
        });
    })

    socket.on('assignationAvatar', (pokemonChoisi, joueur) => {
        if (joueur == 1) {
            insertionAvatars(
                pokemonChoisi,
                element.avatarJoueur1,
                element.divCoureur1,
                element.imgCoureur1
            );
            animationCoureurs(pokemonChoisi,element.imgCoureur1)
        } else if (joueur == 2) {
            insertionAvatars(
                pokemonChoisi,
                element.avatarJoueur2,
                element.divCoureur2,
                element.imgCoureur2
            );
            animationCoureurs(pokemonChoisi,element.imgCoureur2)
        }
    })

    /*------------------------------------------- */
    /*             Transition vers jeu            */
    /*--------------------------------------------*/ 

    socket.on('infosJoueurOK', () => {
        element.divChoixAvatar.style.display = 'none';
        element.divIntroduction.style.display = 'block';
        element.divIntroduction.innerHTML = 
            `<p><b>J'espère que tu es prêt,e?</b><br>Le principe est simple,<br>à la fin du compte à rebours,<br>appuis sur <b>n'importe quelle touche</b><br>pour faire avancer ton coureur!</p><img src="img/Pikachu_Icon_Suivant.png" alt="Petit Bouton Icône Pikachu">`;
        element.divIntroduction.firstChild.style.fontSize = '20px';
        element.divIntroduction.firstChild.style.lineHeight = '37px';
        element.divIntroduction.firstChild.style.top = '174px';  
        element.divIntroduction.lastChild.addEventListener('click', () => {
            socket.emit('pret', numeroDeRoom);
        })
    })

    socket.on('attenteAdversaire', () => {
        element.divIntroduction.style.display = 'none';
        element.divChargement.style.display = 'block';
        animationPikachu();
    })

    socket.on('lancementPartie', () => {
        element.divIntroduction.style.display = 'none';
        element.divChargement.style.display = 'none';
        finAnimatiomPikachu();
        element.divJeu.style.display = 'flex';
        socket.emit('envoiCompteARebours', numeroDeRoom);
    })
    
    socket.on('lancementCompteARebours', () => {
        animatiomCompteARebours();
        setTimeout(function() {
            socket.emit('envoiChrono');
            socket.emit('go');
        },3000)
    })

    /*------------------------------------------- */
    /*          Deplacement des coureurs          */
    /*--------------------------------------------*/ 

    socket.once('lancementChrono', () => {
        lancementChrono();
    })

    socket.on('course', (joueur) => {     
        if (joueur == 1) {
            window.addEventListener('keyup',function(){
                let x = parseFloat(element.coureur1.style.right);
                if (x < 541) {
                    element.coureur1.style.right = x + 1 + 'px';
                    socket.emit('envoiPosition', x, numeroDeRoom);
                }
            })
        } else if (joueur == 2) {
            window.addEventListener('keyup',function(){
                let x = parseFloat(element.coureur2.style.right);
                if (x < 541) {
                    element.coureur2.style.right = x + 1 + 'px';
                    socket.emit('envoiPosition', x, numeroDeRoom);
                }
            })
        }
    })

    socket.on('receptionPosition',(nbr,joueur) => {
        if (joueur == 1) {
            element.coureur1.style.right = nbr + 'px';
            if (parseFloat(element.coureur1.style.right) == 540) {
                socket.emit('finDeCourseJoueur1', temps.affichage, numeroDeRoom)
            }
        } else if (joueur == 2) {
            element.coureur2.style.right = nbr + 'px';
            if (parseFloat(element.coureur2.style.right) == 540) {
                socket.emit('finDeCourseJoueur2', temps.affichage, numeroDeRoom)
            }
        }
    })

    /*------------------------------------------- */
    /*                Fin de course               */
    /*--------------------------------------------*/ 

    socket.on('finDuJeuJoueur1', (pseudo, chrono, score) => {
        element.nomJoueur1.innerHTML = `${pseudo} <small>/ ${score} / temps: ${chrono}</small>`;
    })
    socket.on('finDuJeuJoueur2', (pseudo, chrono, score) => {
        element.nomJoueur2.innerHTML = `${pseudo} <small>/ ${score} / temps: ${chrono}</small>`;
    })
    socket.on('finDeJeu', (chrono) => {
        element.temps.innerText = `${chrono}`;
        element.divFinDeJeu.style.display = 'block';
        socket.emit('envoiFinChrono');
    })
    socket.on('finChrono', () => {
        finChrono();
    })

})