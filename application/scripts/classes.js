let moveLabel = document.querySelector('#move');
let playersView = document.querySelector('#players');


class Player {
    constructor(username) {
        this.username = username;
        this.currentPoints = 0;
        this.pass = false;
        this.chosenSkin = '';
        this.turn = false;
        this.cards = []; // kazdy gracz musi zapisywac jakie ma karty 
    }
}


class Deck {
    constructor(numberOfDecks) {
        this.deck = []
        this.numberOfDecks = numberOfDecks;
        this.makeDeck();
    }

    makeDeck() {
        const values = ['Ace', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King'];

        this.deck = [...values]

        if (this.numberOfDecks > 1) { // robimy sobie kopie decka i potem dodajemy jeszcze tyle razy ile jest potrzebne 
            let copy = [...this.deck];  // js destrukturyzacja w ES6 , spread operator , kopiowanie tablic ;-)
            for (let i = 0; i < this.numberOfDecks - 1; i++) {  //jak mamy miec 3, to dodajemy jeszcez 2 razy i git 
                this.deck.push(...copy);
            }
        }

    }


}



function Play(listOfPlayers, Deck) {
    listOfPlayers[0].turn = true; //ustawiamy flage turn na true dla pierwszego gracza ( on zaczyna rozgrywke )
    renderPlayers(listOfPlayers);

    moveLabel.innerHTML = 'Player move: ' + listOfPlayers[0].username;

    let playersInGame = [...listOfPlayers] //kopia listy graczy

    let newCardButton = document.querySelector('#newCard');
    let passButton = document.querySelector('#Pass');


    newCardButton.addEventListener("click", function () {
        if (playersInGame.length !== 0) { // sprawdzam czy sa jeszcze jacys gracze w grze
            let actualPlayer = checkActualPlayer(playersInGame);

            takeCard(actualPlayer, Deck);

            if(playersInGame.length !== 1){
                changePlayer(playersInGame); // zmieniamy gracza, ale tylko wtedy jesli nie jest ostatnim graczem 
            }


            removePlayers(playersInGame);
            console.log(playersInGame)

            renderPlayers(listOfPlayers) //moge tak zrobic bo jak mamy obiekty w playersInGame to te obiekty są referencją do tych z listOfPlayers
        }
    })

    passButton.addEventListener("click", function () {
        if (playersInGame.length !== 0) {
            let actualPlayer = checkActualPlayer(playersInGame);

            pass(actualPlayer);
            // playersInGame = playersInGame.filter(function(el){
            //     return el.username !== actualPlayer.username; //aktualizujemy tablice tak zeby nie zawierała gracza który ma pass, no mozna to zamieniac na inny spsob jeszcze jakos
            //  }); //programowanie funkcyjne jak coś

            changePlayer(playersInGame);
            removePlayers(playersInGame); //funkcja ktora usuwa gracza, ktory jest juz pass
            console.log(playersInGame)
            renderPlayers(listOfPlayers);
        }

    })



}

function renderPlayers(listOfPlayers) {
    playersView.innerHTML = '';
    for (let i = 0; i < listOfPlayers.length; i++) {
        playersView.innerHTML +=
            `<div class="players__card">
            <div class="image"><img src="https://www.w3schools.com/css/paris.jpg"></div>
            <p class="players__name">${listOfPlayers[i].username}</p>
            <p class="players__points">${listOfPlayers[i].currentPoints}</p>
            <p class="players__points">Pass: ${listOfPlayers[i].pass}</p>
            <p class="players__points">Turn: ${listOfPlayers[i].turn}</p>
        </div>`
    }
}


function checkActualPlayer(listOfPlayers) {

    for (let i = 0; i < listOfPlayers.length; i++) {
        if (listOfPlayers[i].turn === true) {
            return listOfPlayers[i];
        }
    }

}

function removePlayers(listOfPlayers) {
    for (let i = 0; i < listOfPlayers.length; i++) {
        if (listOfPlayers[i].pass === true) {
            console.log('usuwam')
            listOfPlayers.splice(i, 1);
        }
    }
}

function changePlayer(listOfPlayers) {

    for (let i = 0; i < listOfPlayers.length; i++) {

        if (listOfPlayers[i].turn === true) {
            listOfPlayers[(i + 1) % listOfPlayers.length].turn = true;
            listOfPlayers[i].turn = false;
            moveLabel.innerHTML = 'Player move: ' + listOfPlayers[(i + 1) % listOfPlayers.length].username;
            break;
        }
    }

}

function checkPlayer(player) {
    if (player.currentPoints >= 21) {
        pass(player);
    }
}


function takeCard(player, deck) {
    let card = deck.deck[Math.floor(Math.random() * deck.deck.length)]; //losowa karta z talii
    //na podstawie karty dodajemy sobie ile punktów
    if (card === 'Ace') {
        player.currentPoints += 1;
    }
    else if (card === 'Jack') {
        player.currentPoints += 1;
    }
    else if (card === 'Queen') {
        player.currentPoints += 1;
    }
    else if (card === 'King') {
        player.currentPoints += 1;
    } else {
        player.currentPoints += card;
    }
    
    if(player.currentPoints >= 21){
        pass(player);
    }

    player.cards.push(card);
}

function pass(player) {
    player.pass = true; // kiedy gracz juz zpasował
}





let Player3 = new Player("Kacper");
let Player4 = new Player("Maks");
let Player5 = new Player("X");
let players = [Player3, Player4, Player5];

let deck = new Deck(2);
Play(players, deck);

// let tab = [...players]
// tab[0].username = 'hmm'
// tab.pop();
// console.log(players)

// console.log('-----')
// console.log(tab)


// takeCard(Player3, deck);
// takeCard(Player3,deck);
// console.log(Player3.cards);
// console.log(Player3.currentPoints);
// let tab = [1, 2, 3];

// let x = [Player3, Player3];
// let y = [...x];
// console.log(x);
// console.log('-----------------')
// console.log(y);
// console.log(y.pop())

// let tab2 = ['x', 'y', 'z']
// tab2.splice(2,2);
// console.log(tab2);

// tab2 = tab2.filter(el => el != 'x');
// console.log(tab2)



// x = x.filter(function(el){
//     return el.username !== Player2.username;
//  }); //programowanie funkcyjne jak coś 

