let moveLabel = document.querySelector('#move');
let playersView = document.querySelector('#players');
const board = document.querySelector('#game');

const human = 0;
const easyAi = 1;
const mediumAi = 2;
const hardAi = 3;

class Player {
    constructor(username, playerType) {
        this.username = username;
        this.currentPoints = 0;
        this.pass = false;
        this.chosenSkin = '';
        this.turn = false;
        this.cards = []; // kazdy gracz musi zapisywac jakie ma karty 
        this.playerType = playerType;
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
    let currentPlayer = listOfPlayers[0];  //ustawiamy flage turn na true dla pierwszego gracza ( on zaczyna rozgrywke )
    currentPlayer.turn = true;
    renderPlayers(listOfPlayers);
    renderBoard(listOfPlayers);

    moveLabel.innerHTML = 'Player move: ' + listOfPlayers[0].username;

    let playersInGame = [...listOfPlayers] //kopia listy graczy

    let newCardButton = document.querySelector('#newCard');
    let passButton = document.querySelector('#Pass');

    newCardButton.addEventListener("click", function () {
        onNewCardButton(playersInGame);
    })

    passButton.addEventListener("click", function () {
        onPassButton(playersInGame);
    })

    if (currentPlayer.playerType !== human){
        tryPlayAiTurn(playersInGame, currentPlayer);
    }
}

function onNewCardButton(playersInGame){
    if (playersInGame.length !== 0) { 
        currentPlayer = checkActualPlayer(playersInGame);
        let nextCard = drawCard();
        putCard(currentPlayer, nextCard);

        endTurn(playersInGame);
    }
}

function onPassButton(playersInGame){
    if (playersInGame.length !== 0) {
        currentPlayer = checkActualPlayer(playersInGame);
        pass(currentPlayer);
        endTurn(playersInGame);
    }
}

function tryPlayAiTurn(playersInGame, player) {

    if (player.playerType === easyAi){
        currentPlayer = checkActualPlayer(playersInGame);
        let nextCard = drawCard();
        putCard(currentPlayer, nextCard);
        endTurn(playersInGame);
        currentPlayer = checkActualPlayer(playersInGame);
        tryPlayAiTurn(playersInGame, currentPlayer);
    }

    else if (player.playerType === mediumAi){
        if (player.currentPoints < 14){
            currentPlayer = checkActualPlayer(playersInGame);
            let nextCard = drawCard();
            putCard(currentPlayer, nextCard);
            endTurn(playersInGame);
            currentPlayer = checkActualPlayer(playersInGame);
            tryPlayAiTurn(playersInGame, currentPlayer);
        }
        else{
            if (fiftyDecision()){
                currentPlayer = checkActualPlayer(playersInGame);
                let nextCard = drawCard();
                putCard(currentPlayer, nextCard);
                endTurn(playersInGame);
                currentPlayer = checkActualPlayer(playersInGame);
                tryPlayAiTurn(playersInGame, currentPlayer);
            }
            else{
                pass(player);
                endTurn(playersInGame);
                currentPlayer = checkActualPlayer(playersInGame);
                tryPlayAiTurn(playersInGame, currentPlayer);
            }
        }
    }

    else if (player.playerType === hardAi){
        let nextCard = drawCard();

        if (calculateCardPoints(nextCard) + player.currentPlayer <= 21){
            putCard(player, card);
        }
        else{
            pass(player);
        }
    }
}

function endTurn(playersInGame){
    changePlayer(playersInGame);
    removePassedPlayers(playersInGame);
    renderPlayers(listOfPlayers);
    currentPlayer = checkActualPlayer(playersInGame);
    tryPlayAiTurn(playersInGame, currentPlayer);
}

function fiftyDecision(){
    if (Math.random() > 0.5){
        return true;
    }
    
    return false;
}

function renderPlayers(listOfPlayers) {
    playersView.innerHTML = '';
    for (let i = 0; i < listOfPlayers.length; i++) {
        playersView.innerHTML +=
            `<div class="players__card" >
            <div class="image"><img src="https://www.w3schools.com/css/paris.jpg"></div>
            <p class="players__name">${listOfPlayers[i].username}</p>
            <p class="players__points">${listOfPlayers[i].currentPoints}</p>
            <p class="players__points">Pass: ${listOfPlayers[i].pass}</p>
            <p class="players__points">Turn: ${listOfPlayers[i].turn}</p>
        </div>`
    }
}

function renderBoard(listOfPlayers){
    console.log('tak')
    for(let i =0; i<listOfPlayers.length; i++){
        board.innerHTML += `<div class="card" data-player="${listOfPlayers[i].username}"><p class='card_points'></p></div>`; // nadajemy divowi gdzie ma byc kladziona karta data-player = nazwa gracza, zeby potem zaznaczyc odpowiednie przy dodawaniu karty
    }
}


function checkActualPlayer(listOfPlayers) {

    for (let i = 0; i < listOfPlayers.length; i++) {
        if (listOfPlayers[i].turn === true) {
            return listOfPlayers[i];
        }
    }

}

function removePassedPlayers(listOfPlayers) {
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
            newPlayer = listOfPlayers[(i + 1) % listOfPlayers.length];
            newPlayer.turn = true;
            listOfPlayers[i].turn = false;
            return;
        }
    }
}

function checkPlayer(player) {
    if (player.currentPoints >= 21) {
        pass(player);
    }
}

function drawCard(){
    let card = deck.deck[Math.floor(Math.random() * deck.deck.length)];
    return card;
}

function calculateCardPoints(card){
    if (card === 'Ace') {
        return 1;
    }
    else if (card === 'Jack') {
        return 1;
    }
    else if (card === 'Queen') {
        return 1;
    }
    else if (card === 'King') {
        return 1;
    } else {
        return card;
    }
}

function putCard(player, card) {
    
    let cardPlace = document.querySelector(`[data-player="${player.username}"] p`); //zaznaczamy sobie diva dla danego gracza
    
    player.currentPoints += calculateCardPoints(card);

    if(player.currentPoints >= 21){
        pass(player);
    }

    cardPlace.innerHTML = card;

    player.cards.push(card);
}

function pass(player) {
    player.pass = true; // kiedy gracz juz zpasował
}

let Player3 = new Player("Kacper", 0);
let Player4 = new Player("Maks", 0);
let Player5 = new Player("X", 1);
let listOfPlayers = [Player3, Player4, Player5];
let deck = new Deck(2);
Play(listOfPlayers, deck);


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

