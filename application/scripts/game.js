
const params = (new URL(document.location)).searchParams;

const player1Type = parseInt(params.get('player1Type'));
const player1Name = params.get('player1Name');

const player2Type = parseInt(params.get('player2Type'));
const player2Name = params.get('player2Name');

const player3Type = parseInt(params.get('player3Type'));
const player3Name = params.get('player3Name');

const player4Type = parseInt(params.get('player4Type'));
const player4Name = params.get('player4Name');

console.log(player1Name)
console.log(player2Name)
console.log(player3Name)





let moveLabel = document.querySelector('#move');
let playersView = document.querySelector('#players');
const board = document.querySelector('#game');

const HUMAN = 0;
const AI_EASY = 1;
const AI_MEDIUM = 2;
const AI_HARD = 3;

const ACE = 1;
const JACK = 10;
const QUEEN = 10;
const KING = 10;

const HEART = "heart";
const DIAMOND = "diamond";
const SPADE = "spade";
const CLUB = "club";



class Player {
    constructor(username, playerType) {
        this.username = username;
        this.currentPoints = 0;
        this.pass = false;
        this.chosenSkin = '';
        this.turn = false;
        this.drawnCards = 0;
        this.playerType = playerType;
        this.snakeEyes = false;
    }
}


class Deck {
    constructor(numberOfDecks) {
        this.deck = []
        this.numberOfDecks = numberOfDecks;
        this.CreateDeck();
    }

    CreateDeck() {
        const values = [ACE, 2, 3, 4, 5, 6, 7, 8, 9, 10, JACK, QUEEN, KING];
        const symbols = [HEART, DIAMOND, CLUB, SPADE];
        this.deck = []

        for (let deckNumber = 0; deckNumber < this.numberOfDecks; deckNumber++) {
            for (let symbolIndex = 0; symbolIndex < symbols.length; symbolIndex++) {
                for (let valueIndex = 0; valueIndex < values.length; valueIndex++) {
                    this.deck.push(new Card(values[valueIndex], symbols[symbolIndex]));
                }
            }
        }
    }
}

class Card {
    constructor(value, symbol) {
        this.value = value;
        this.symbol = symbol;
    }

    GetImageSymbolPath() {
        return "/application/images/game/" + this.symbol + ".png";
    }
}

function StartGame() {
    let currentPlayer = playersInGame[0];
    currentPlayer.turn = true;
    RenderPlayers();
    RenderBoard();

    moveLabel.innerHTML = 'Player move: ' + listOfPlayers[0].username;
    let newCardButton = document.querySelector('#newCard');
    let passButton = document.querySelector('#Pass');

    newCardButton.addEventListener("click", function () {
        OnNewCardButton();
    })

    passButton.addEventListener("click", function () {
        OnPassButton();
    })

    TryPlayAiTurn(currentPlayer);
}

function OnNewCardButton() {
    if (playersInGame.length !== 0) {
        currentPlayer = GetCurrentPlayer();
        PutCard(currentPlayer, DrawCard());
        StartNewTurn();
    }
}

function OnPassButton() {
    if (playersInGame.length !== 0) {
        currentPlayer = GetCurrentPlayer();
        Pass(currentPlayer);
        StartNewTurn();
    }
}

function TryPlayAiTurn(player) {
    if (player.playerType === HUMAN) {
        return;
    }

    switch (player.playerType) {
        case AI_EASY:
            EasyAiTurn(player);
            break;

        case AI_MEDIUM:
            MediumAiTurn(player);
            break;

        case AI_HARD:
            HardAiTurn(player);
    }

    StartNewTurn();
}

function EasyAiTurn(player) {
    PutCard(player, DrawCard());
}

function MediumAiTurn(player) {
    if (player.currentPoints < 14) {
        PutCard(player, DrawCard());
    }
    else {
        if (FiftyChance()) {
            PutCard(player, DrawCard());
        }
        else {
            Pass(player);
        }
    }
}

function HardAiTurn(player) {
    let card = DrawCard();

    if (CalculateCardPoints(card) + player.currentPlayer <= 21) {
        PutCard(player, card);
    }
    else {
        Pass(player);
    }
}

function StartNewTurn() {
    let nextPlayer = ChangePlayer();
    RemoveIfPlayerPassed();
    RenderPlayers();
    TryPlayAiTurn(nextPlayer);
}

function FiftyChance() {
    if (Math.random() > 0.5) {
        return true;
    }

    return false;
}

function RenderPlayers() {
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

function RenderBoard() {
    for (let i = 0; i < listOfPlayers.length; i++) {
        board.innerHTML +=
            `
        <div class="card" data-player="${listOfPlayers[i].username}">
            <p class='card_points'>
            </p>
            <img src="/application/images/game/default.png" alt="" height="80px" width="80px" >
            <p class='card_points'>
            </p>
        </div>
        `;
    }
}

function GetCurrentPlayer() {
    for (let i = 0; i < playersInGame.length; i++) {
        if (playersInGame[i].turn === true) {
            return playersInGame[i];
        }
    }
}

function RemoveIfPlayerPassed() {
    for (let i = 0; i < playersInGame.length; i++) {
        if (playersInGame[i].pass === true) {
            playersInGame.splice(i, 1);
        }
    }
}

function ChangePlayer() {
    for (let i = 0; i < playersInGame.length; i++) {
        if (playersInGame[i].turn === true) {
            newPlayer = playersInGame[(i + 1) % playersInGame.length];
            newPlayer.turn = true;
            playersInGame[i].turn = false;

            return newPlayer;
        }
    }
    GameOver();
}

function CheckPlayer(player) {
    if (player.currentPoints >= 21) {
        Pass(player);
    }
}

function DrawCard() {
    let card = deck.deck[Math.floor(Math.random() * deck.deck.length)];
    return card;
}

function CalculateCardPoints(player, card) {
    if (card.value === ACE && player.currentPoints <= 10) {
        return 11;
    }
    else if (player.drawnCards == 2 && player.currentPoints == 11) {
        player.snakeEyes = true;
        return 11;
    }
    else {
        return card.value;
    }
}

function PutCard(player, card) {
    console.log(card);
    let cardPlace = document.querySelectorAll(`[data-player="${player.username}"] p`);

    let cardImage = document.querySelector(`[data-player="${player.username}"] img`);
    console.log(cardImage)
    cardImage.src = card.GetImageSymbolPath();
    console.log(cardImage.src);
    player.drawnCards += 1;
    player.currentPoints += CalculateCardPoints(player, card);
    cardPlace[0].innerHTML = card.value;
    cardPlace[1].innerHTML = card.value;

    if (player.currentPoints >= 21) {
        Pass(player);
    }
}

function Pass(player) {
    player.pass = true;
}

function GameOver() {
    // Wypierdolić się ze wszystkich funkcji i pętli w jakiej teraz się znajdujemy
    // Tutaj dopisać End Screen
}

function TryCreatePlayer(playerName, playerType) {
    if (playerName !== "") {
        let player = new Player(playerName, playerType);
        listOfPlayers.push(player);
    }
}

function CreatePlayers() {
    TryCreatePlayer(player1Name, player1Type);
    TryCreatePlayer(player2Name, player2Type);
    TryCreatePlayer(player3Name, player3Type);
    TryCreatePlayer(player4Name, player4Type);
}



let Player3 = new Player("Kacper", HUMAN);
let Player4 = new Player("Maks", HUMAN);
let Player5 = new Player("X", AI_EASY);


let listOfPlayers = [];
CreatePlayers();
console.log(listOfPlayers);
let playersInGame = [...listOfPlayers]
let deck = new Deck(1);

StartGame();