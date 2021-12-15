const params = (new URL(document.location)).searchParams;


const player1Type =   parseInt(sessionStorage.getItem("player1Type"));
const player1Name = sessionStorage.getItem("player1Name")

const player2Type =   parseInt(sessionStorage.getItem("player2Type"));
const player2Name =  sessionStorage.getItem("player2Name");

const player3Type =  parseInt(sessionStorage.getItem("player3Type"));
const player3Name =    sessionStorage.getItem("player3Name");


const player4Type =   parseInt(sessionStorage.getItem("player4Type"));
const player4Name = sessionStorage.getItem("player4Name");

let moveLabel = document.querySelector('#move');
let playersView = document.querySelector('#players');
let actualPlayerCard;
const board = document.querySelector('#game');
let gameOver = false;

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
        this.isWinner = false;
        this.isLogged = true;
    }

    AddToWinnerList() {
        this.isWinner = true;
        winners.push(this.username);
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

    newCardButton.addEventListener("click", function () {
        OnNewCardButton();
    })

    passButton.addEventListener("click", function () {
        OnPassButton();
    })

    TryPlayAiTurn(currentPlayer);
}

function DisableButtons() {
    newCardButton.disabled = true;
    passButton.disabled = true;
}

function EnableButtons() {
    newCardButton.disabled = false;
    passButton.disabled = false;
}

function WaitForNewTurn() {
    DisableButtons();
    setTimeout(StartNewTurn, 1000);
}

function OnNewCardButton() {
    if (playersInGame.length !== 0) {
        currentPlayer = GetCurrentPlayer();
        PutCard(currentPlayer, DrawCard());
        WaitForNewTurn();
    }
}

function OnPassButton() {
    if (playersInGame.length !== 0) {
        currentPlayer = GetCurrentPlayer();
        Pass(currentPlayer);
        WaitForNewTurn();
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

    WaitForNewTurn();
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
    if (CalculateCardPoints(player, card) + player.currentPoints <= 21) {
        PutCard(player, card);
    }
    else {
        Pass(player);
    }
}

function StartNewTurn() {
    EnableButtons();
    let nextPlayer = ChangePlayer();
    RemoveIfPlayerPassed();
    CheckIsGameOver();
    RenderPlayers();
    if (gameOver !== true) {
        TryPlayAiTurn(nextPlayer);
    }
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
            `<div class="players__card" data-playerName=${listOfPlayers[i].username}>
            <div class="image"><img src="https://www.w3schools.com/css/paris.jpg"></div>
            <p class="players__name">${listOfPlayers[i].username}</p>
            <p class="players__points">${listOfPlayers[i].currentPoints}</p>
            <p class="players__points">Pass: ${listOfPlayers[i].pass}</p>
            <p class="players__points">Turn: ${listOfPlayers[i].turn}</p>
        </div>`
        if(listOfPlayers[i].turn === true){
            actualPlayerCard = document.querySelector(`[data-playerName="${listOfPlayers[i].username}"]`);
            actualPlayerCard.style.boxShadow = "0px 0px 40px 5px var(--orange)";
        }
        if(listOfPlayers[i].pass === true){
            actualPlayerCard = document.querySelector(`[data-playerName="${listOfPlayers[i].username}"]`);
            actualPlayerCard.style.opacity = "30%";
        }
    }
}

function RenderBoard() {
    for (let i = 0; i < listOfPlayers.length; i++) {
        board.innerHTML +=
            `
        <div class="card" data-player="${listOfPlayers[i].username}">
            <p class='card_pointsL'>
            </p>
            <img src="/application/images/game/default.png" alt="" height="80px" width="80px" >
            <p class='card_pointsR'>
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
        if (playersInGame.length == 1) {
            console.log(playersInGame[i]);
            return playersInGame[i];
        }
        if (playersInGame[i].turn === true){
            newPlayer = playersInGame[(i + 1) % playersInGame.length];
            newPlayer.turn = true;
            playersInGame[i].turn = false;
            moveLabel.innerHTML = 'Player move: ' + newPlayer.username;
            
            return newPlayer;
        }
    }
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
    let cardPlace = document.querySelectorAll(`[data-player="${player.username}"] p`);
    
    let cardImage = document.querySelector(`[data-player="${player.username}"] img`);
    cardImage.src = card.GetImageSymbolPath();
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

function CreateEndingScreen(){
    let endScreen = document.querySelector('#endview');
    endScreen.style.display = 'flex';
    let winnersParagraph = document.querySelector('#winners');
    let losersParagraph = document.querySelector('#losers');
    winnersParagraph.innerHTML += winners;
    losersParagraph.innerHTML += losers;
}

function GameOver() {
    gameOver = true;
    DisableButtons();
    CheckWinners();
    CreateCookie();
    CreateEndingScreen();
}

function CreateCookie(){
    var cookie = "gameData=";

    var date = new Date();
    date.setTime(date.getTime() + (30 * 60 * 1000)); // 30 minutes till expire
    expires = "; expires=" + date.toGMTString();

    listOfPlayers.filter(function (player) {
        if (player.isLogged) {
            cookie += "&" + player.username + "," + player.isWinner + "," + player.snakeEyes + "," + player.currentPoints + "," + player.drawnCards;
        }
    });

    cookie += expires + "; path=/";
    document.cookie = cookie;
}

function CheckIsGameOver() {
    if (playersInGame.length === 0) {
        GameOver();
    }
}

function TryFindSnakeEyesWinners(){
    listOfPlayers.forEach(player => {
        if (player.snakeEyes === true) {
            player.AddToWinnerList();
        }
    })
}

function TryFindPerfectWinners(){
    if (winners.length === 0) {
        listOfPlayers.forEach(player => {
            if (player.currentPoints === 21) {
                player.AddToWinnerList();
            }
        })
    }
}

function FindNearestWinners(){
    if (winners.length === 0) {
        let currentMaxPoints = Number.NEGATIVE_INFINITY;

        listOfPlayers.forEach(player => {
            if (player.currentPoints > currentMaxPoints){
                winners = [];
                currentMaxPoints = player.currentPoints;
                player.AddToWinnerList();
            }
            else if (player.currentPoints === currentMaxPoints){
                player.AddToWinnerList();
            }
        })
    }
}

function CreateListOfLosers(){
    losers = listOfPlayers.filter(function (player) {
        if (!winners.includes(player.username)) {
            return player;
        }
    });

    losers = losers.map(player => player.username);
}

function CheckWinners() {
    TryFindSnakeEyesWinners();
    TryFindPerfectWinners();
    FindNearestWinners();
    CreateListOfLosers();
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

let newCardButton = document.querySelector('#newCard');
let passButton = document.querySelector('#Pass');

let listOfPlayers = [];
CreatePlayers();
let playersInGame = [...listOfPlayers];
let winners = [];
let losers = [];

let deck = new Deck(1);

StartGame();