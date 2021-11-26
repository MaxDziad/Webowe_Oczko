
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
    let gameover = false;
    listOfPlayers[0].turn = true; //ustawiamy flage turn na true dla pierwszego gracza ( on zaczyna rozgrywke )

    let newCardButton = document.querySelector('#newCard');
    let passButton = document.querySelector('#Pass');
    // newCardButton.addEventListener()
    while (!gameover) {
        // ja to widze tak ze na dwa przyciski, które są daje button.addEventlistener("click", playTurn()) i
        // w momencie klikniecia przycisk leci pętla, ktora sprawdza , kogo jest ruch, potem wykonuje pass
        // albo takecard w zaleznosci od przycisku i zmienia gracza, a do tego jeszcze raz jakas petla ktora sprawdza na poczatku kogos jest ruch,
        // zeby napisac czyj jest , w sumei moze funkcji CheckPlayer czy cos, albo w momnecie klikniecia przycisku to od razu wyswietla nazwe nastepnego gracza czy cos takiego

        //myslalem ze najpierw petle zeby sprawdzic jaki jest gracz , a potem dopiero dodac listenery z funkcja dla danego gracza, ale mamy nieskonczona petle
        // i by ciagle zmienialo graczy wiec chyba tak srednio

        //Trzeba sie zastanowic w ogole czy ta petla while jest w ogole potrzebna, bo jak doddasz clicklistenera to on bedzie ciagle na tym przycisku
        // i za kazdym kliknieciem by zmienial ture gracza, i w sumie to potem mozna by od razu po kliknieciu i wykonaniu ruchu sprawdzac czy gra sie skonczyla
        //czy nie , i wtedy po prostu przyciski by to obslugiwaly

        //A w sumie jeszcez jedna sprawa, ze jak zmieniamy ruch to trzeba uwzglednic ze jak gracz spasuje, to nie zmieniamy stanu kolejnego tylko kolejnego ktory ma pass = false xD  , to trzeba by cos zmienic... albo 
        // zrobic liste aktywnych  graczy i na niej sprawdzac kogo jest ruch a jak ma pass to go usuwac z tej listy

        for (let i = 0; i < listOfPlayers.length; i++) { // tą petle mozna by w sumie walnac do funkcji playTurn ale to sie pomysli jeszcze

            if (listOfPlayers[i].turn === true) { //sprawdzamy, którego gracza jest tura i jeśli trafimy na gracza to następnemu graczowi ustawiamy flage na true, a temu co wykonuje ruch na false i gitówa, domyslnie wszystko na false
                if (i < listOfPlayers.length - 1) { // musialem tu rozdzielic zeby nie wyjsc poza tablice
                    listOfPlayers[i + 1].turn = true;
                    listOfPlayers[i].turn = false;
                } else {
                    listOfPlayers[-1].turn = true;
                    listOfPlayers[i].turn = false;
                }
                // listOfPlayers[(i+1)%listOfPlayers.length] = true;  tak by moglo byc zamiast wyzej chyba bo wtedy jak np wyjdziemy poza to bierze znowu od nowa .. np mamy indeksy 0,1,2 , a wezmiemy tab[3%3] to wyjdzie znowu element 0 itd...
                // listOfPlayers[i] = false;

            }

        }

    }

    // list.forEach(player => {
    //     playTurn(player);
    // })
}

function playTurn(player) {

}

function takeCard(player, deck) {
    let card = deck.deck[Math.floor(Math.random() * deck.deck.length)]; //losowa karta z talii
    player.cards.push(card);
}

function pass(player) {
    player.pass = true; // kiedy gracz juz zpasował
}





let Player3 = new Player("Kacper");

let deck = new Deck(2);


takeCard(Player3, deck);
console.log(Player3.cards)
let tab = [1, 2, 3];

