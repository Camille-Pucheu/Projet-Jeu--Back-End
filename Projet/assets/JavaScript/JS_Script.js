'use strict'

    /************************************************************************
    ************************ Mes variables et Objets ************************
    ************************************************************************/

const element = {
    coureur1 : document.getElementById('coureur1'),
    coureur2 : document.getElementById('coureur2'),
    boutonScore : document.getElementById('score').firstElementChild,
    tableauDesScores : document.getElementById('scoreTab'),
    divIntroduction : document.getElementById('introduction'),
    form : document.querySelector('form'),
    inputPseudo : document.querySelector('input[name="pseudo"]'),
    invalideP : document.getElementById('introduction').lastChild.lastChild,
    nomJoueur1 : document.getElementById('nomJoueur1'),
    nomJoueur2 : document.getElementById('nomJoueur2'),
    divChoixAvatar : document.getElementById('choixAvatar'),
    vignetteBrocelome : document.getElementById('avatar').querySelector('img[alt="Brocélôme"]'),
    vignetteCouverdure : document.getElementById('avatar').querySelector('img[alt="Couverdure"]'),
    vignetteDarumarond : document.getElementById('avatar').querySelector('img[alt="Darumarond"]'),
    vignetteEscargaume : document.getElementById('avatar').querySelector('img[alt="Escargaume"]'),
    vignetteMucuscule : document.getElementById('avatar').querySelector('img[alt="Mucuscule"]'),
    vignetteSorbebe : document.getElementById('avatar').querySelector('img[alt="Sorbébé"]'),
    vignetteSucroquin : document.getElementById('avatar').querySelector('img[alt="Sucroquin"]'),
    vignetteVenipatte : document.getElementById('avatar').querySelector('img[alt="Venipatte"]'),
    avatarJoueur1 : document.getElementById('joueurs').querySelector('img[alt="Avatar du Joueur 1"]'),
    avatarJoueur2 : document.getElementById('joueurs').querySelector('img[alt="Avatar du Joueur 2"]'),
    divChargement : document.getElementById('chargement'),
    spritePikachu : document.getElementById('spritePikachu'),
    divJeu : document.getElementById('jeu'),
};

const coureurs = {
    brocelome : {
        id: document.getElementById('brocelome'),
        nbrSprite: 98,
        hauteurConteneur: 60
    },
    couverdure : {
        id: document.getElementById('couverdure'),
        nbrSprite: 74,
        hauteurConteneur: 57
    },
    darumarond : {
        id: document.getElementById('darumarond'),
        nbrSprite: 39,
        hauteurConteneur: 61
    },
    escargaume : {
        id: document.getElementById('escargaume'),
        nbrSprite: 59,
        hauteurConteneur: 49
    },
    mucuscule : {
        id: document.getElementById('mucuscule'),
        nbrSprite: 53,
        hauteurConteneur: 50
    },
    sorbebe : {
        id: document.getElementById('sorbebe'),
        nbrSprite: 51,
        hauteurConteneur: 63
    },
    sucroquin : {
        id: document.getElementById('sucroquin'),
        nbrSprite: 47,
        hauteurConteneur: 49
    },
    venipatte : {
        id: document.getElementById('venipatte'),
        nbrSprite: 32,
        hauteurConteneur: 44
    },
}

    /*-------------------------------------------- */
    /*               Initialisations               */
    /*---------------------------------------------*/ 

element.tableauDesScores.style.display = 'none';
element.divChoixAvatar.style.display = 'none';
element.spritePikachu.style.right = "0px";
element.coureur1.style.right = '150px';
element.coureur2.style.right = '150px';


/************************************************************************
************************      Mes fonctions      ************************
************************************************************************/


/* Pour l'évenement du choix de l'avatar, après le clique sur la vignette choisie */
const changementVignette = function(pokemonChoisi,joueur){
    switch (pokemonChoisi) {
        case 'Brocélôme': 
            joueur.src = "img/Vignette-Brocélôme.png";
            break;
        case 'Couverdure': 
            joueur.src = "img/Vignette-Couverdure.png";
            break;
        case 'Darumarond': 
            joueur.src = "img/Vignette-Darumarond.png";
            break;
        case 'Escargaume': 
            joueur.src = "img/Vignette-Escargaume.png";
            break;
        case 'Mucuscule': 
            joueur.src = "img/Vignette-Mucuscule.png";
            break;
        case 'Sorbébé': 
            joueur.src = "img/Vignette-Sorbébé.png";
            break;
        case 'Sucroquin': 
            joueur.src = "img/Vignette-Sucroquin.png";
            break;
        case 'Venipatte': 
            joueur.src = "img/Vignette-Venipatte.png";
            break;
    }
}

/* Lors de l'attente de l'adversaire */
const animationPikachu = function(){
    setInterval(function(){
        let x = parseFloat(element.spritePikachu.style.right);
        if (x > 1150) {
            x = 0;
            element.spritePikachu.style.right = x + 50 + "px";
        } else {
            element.spritePikachu.style.right = x + 50 + "px";
        }
    },130);
}

/*************************************************************************
************************      Mes Evenements      ************************
*************************************************************************/

    /*------------------------------------------- */
    /*             Affichage du score             */
    /*--------------------------------------------*/ 

element.boutonScore.addEventListener('click',function(){
if (element.tableauDesScores.style.display == 'none') {
    element.tableauDesScores.style.display = 'block';
} else {
    element.tableauDesScores.style.display = 'none';
}
})

    /*------------------------------------------- */
    /*           Animation des coureurs           */
    /*--------------------------------------------*/ 

const animationCoureurs = function(pokemon,nbrSprite,hauteurConteneur) {
    pokemon.style.top = "0px";
    setInterval(function(){
        let x = parseFloat(pokemon.style.top);
        if (x < -((nbrSprite-2)*hauteurConteneur)) {
            x = 0;
            pokemon.style.top = 0 + "px";
        } else {
            pokemon.style.top = x - hauteurConteneur + "px";
        }
    },50);
}

// animationCoureurs(coureurs.brocelome.id,coureurs.brocelome.nbrSprite,coureurs.brocelome.hauteurConteneur)
// animationCoureurs(coureurs.couverdure.id,coureurs.couverdure.nbrSprite,coureurs.couverdure.hauteurConteneur)
// animationCoureurs(coureurs.darumarond.id,coureurs.darumarond.nbrSprite,coureurs.darumarond.hauteurConteneur)
// animationCoureurs(coureurs.escargaume.id,coureurs.escargaume.nbrSprite,coureurs.escargaume.hauteurConteneur)
// animationCoureurs(coureurs.mucuscule.id,coureurs.mucuscule.nbrSprite,coureurs.mucuscule.hauteurConteneur)
// animationCoureurs(coureurs.sorbebe.id,coureurs.sorbebe.nbrSprite,coureurs.sorbebe.hauteurConteneur)
// animationCoureurs(coureurs.sucroquin.id,coureurs.sucroquin.nbrSprite,coureurs.sucroquin.hauteurConteneur)
// animationCoureurs(coureurs.venipatte.id,coureurs.venipatte.nbrSprite,coureurs.venipatte.hauteurConteneur)

    /*------------------------------------------- */
    /*          Deplacement des coureurs          */
    /*--------------------------------------------*/ 

window.onkeyup = function(){
    let x = parseFloat(element.coureur1.style.right);
    element.coureur1.style.right = x + 1 + 'px';
    let y = parseFloat(element.coureur2.style.right);
    element.coureur2.style.right = y + 1 + 'px';
}




    /************************************************************************
    ************************        Socket IO        ************************
    ************************************************************************/

window.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    //- const socket = io('http://192.168.35.105:8888');


    socket.on('numeroRoom', (nbr) => {
        console.log(`Connecté sur la room No.${nbr}`);
    })
    socket.on('quelJoueur', (leJoueur) => {
        console.log(`Joueur No.${leJoueur}`);
    });

    /*-------------------------------------------- */
    /*               Choix de Pseudo               */
    /*---------------------------------------------*/ 
    
    element.form.addEventListener('submit', (event) => {
        event.preventDefault();
        const entreePseudo = element.inputPseudo.value;
        // console.log(entreePseudo);
        socket.emit('entreePseudo', entreePseudo);
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
            socket.emit('clickAvatar', 'Brocélôme');
        });
        element.vignetteCouverdure.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Couverdure');
        });
        element.vignetteDarumarond.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Darumarond');
        });
        element.vignetteEscargaume.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Escargaume');
        });
        element.vignetteMucuscule.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Mucuscule');
        });
        element.vignetteSorbebe.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Sorbébé');
        });
        element.vignetteSucroquin.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Sucroquin');
        });
        element.vignetteVenipatte.addEventListener('click', () => {
            socket.emit('clickAvatar', 'Venipatte');
        });
    })

    socket.on('changementVignette', (pokemonChoisi, joueur) => {
        if (joueur == 1) {
            changementVignette(pokemonChoisi,element.avatarJoueur1);
        } else if (joueur == 2) {
            changementVignette(pokemonChoisi,element.avatarJoueur2);

        }
    })

    /*------------------------------------------- */
    /*             Transition vers jeu            */
    /*--------------------------------------------*/ 

    socket.on('infosJoueurOK', () => {
        element.divChoixAvatar.style.display = 'none';
        element.divIntroduction.style.display = 'block';
        element.divIntroduction.innerHTML = 
            `<p><b>J'espère que tu es prêt,e?</b><br>Le principe est simple,<br>appuis sur <b>n'importe quelle touche</b><br>pour faire avancer ton coureur</p><img src="img/Pikachu_Icon_Suivant.png" alt="Petit Bouton Icône Pikachu">`;
        element.divIntroduction.firstChild.style.fontSize = '21px';
        element.divIntroduction.firstChild.style.lineHeight = '42px';  
        element.divIntroduction.lastChild.addEventListener('click', () => {
            socket.emit('pret');
        })
    })

    socket.on('attenteAdversaire', () => {
        element.divIntroduction.style.display = 'none';
        element.divChargement.style.display = 'block';
        animationPikachu();
    })
    
})