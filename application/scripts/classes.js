
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
    let playersInGame = [...listOfPlayers] //kopia listy graczy
    let newCardButton = document.querySelector('#newCard');
    let passButton = document.querySelector('#Pass');

    newCardButton.addEventListener("click", function () {
        let actualPlayer = checkActualPlayer(playersInGame);
        takeCard(actualPlayer);
        changePlayer(playersInGame);
        removePlayers(playersInGame);

    })

    passButton.addEventListener("click", function () {
        let actualPlayer = checkActualPlayer(listOfPlayers);
        pass(actualPlayer);
        // playersInGame = playersInGame.filter(function(el){
        //     return el.username !== actualPlayer.username; //aktualizujemy tablice tak zeby nie zawierała gracza który ma pass, no mozna to zamieniac na inny spsob jeszcze jakos
        //  }); //programowanie funkcyjne jak coś 
        removePlayers(playersInGame); //funkcja ktora usuwa gracza, ktory jest juz pass 
        changePlayer(playersInGame);

    })



    //A w sumie jeszcez jedna sprawa, ze jak zmieniamy ruch to trzeba uwzglednic ze jak gracz spasuje, to nie zmieniamy stanu kolejnego tylko kolejnego ktory ma pass = false xD  , to trzeba by cos zmienic... albo 
    // zrobic liste aktywnych  graczy i na niej sprawdzac kogo jest ruch a jak ma pass to go usuwac z tej listy



}




function checkActualPlayer(listOfPlayers) {

    for (let i = 0; i < listOfPlayers.length; i++) {
        if (listOfPlayers[i].turn === true) {
            return listOfPlayers[i];
        }
    }

}

function removePlayers(listOfPlayers){
    for(let i = 0;i < listOfPlayers.length; i++){
        if(listOfPlayers[i].pass === true){
             listOfPlayers.splice(i,i);
        }
    }
}

function changePlayer(listOfPlayers) {

    for (let i = 0; i < listOfPlayers.length; i++) {
        if (listOfPlayers[i].turn === true) {
            listOfPlayers[(i + 1) % listOfPlayers.length] = true;
            listOfPlayers[i] = false;
            // p.innerHTML = listOfPlayers[(i + 1) % listOfPlayers.length].username;
        }
    }

}

function checkPlayer(player){
    if(player.currentPoints >= 21){
        pass(player);
    }
}


function takeCard(player, deck) {
    let card = deck.deck[Math.floor(Math.random() * deck.deck.length)]; //losowa karta z talii
    //na podstawie karty dodajemy sobie ile punktów
    if(card === 'Ace'){
        player.currentPoints += 1;
    }
    else if(card === 'Jack'){
        player.currentPoints += 1;
    }
    else if(card === 'Queen'){
        player.currentPoints += 1;
    }
    else if(card === 'King'){
        player.currentPoints += 1;
    } else{
        player.currentPoints += card;
    }

    player.cards.push(card);
}

function pass(player) {
    player.pass = true; // kiedy gracz juz zpasował
}





let Player3 = new Player("Kacper");

let deck = new Deck(2);


takeCard(Player3, deck);
takeCard(Player3,deck);
// console.log(Player3.cards);
// console.log(Player3.currentPoints);
let tab = [1, 2, 3];

let x = [Player3, Player3];
// let y = [...x];
// console.log(x);
// console.log('-----------------')
// console.log(y);
// console.log(y.pop())

let tab2 = ['x', 'y', 'z']
tab2.splice(2,2);
// console.log(tab2);

tab2 = tab2.filter(el => el != 'x');
// console.log(tab2)


// let Player2 = new Player("X");
// Player2.pass = true;
// x.push(Player2);
// console.log(x);
// updatePlayers(x)
// console.log(x);

// x = x.filter(function(el){
//     return el.username !== Player2.username;
//  }); //programowanie funkcyjne jak coś 
 
// console.log('-----')
// console.log(x);