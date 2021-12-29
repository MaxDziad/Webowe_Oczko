function handleSubmit() {
    sessionStorage.setItem("player1Name", player1Name.value);
    sessionStorage.setItem("player2Name", player2Name.value);
    sessionStorage.setItem("player3Name", player3Name.value);
    sessionStorage.setItem("player4Name", player4Name.value);
    sessionStorage.setItem("player1Type", player1Type.value);
    sessionStorage.setItem("player2Type", player2Type.value);
    sessionStorage.setItem("player3Type", player3Type.value);
    sessionStorage.setItem("player4Type", player4Type.value);
    sessionStorage.setItem("player1Bet", player1Bet.value);
    sessionStorage.setItem("player2Bet", player2Bet.value);
    sessionStorage.setItem("player3Bet", player3Bet.value);
    sessionStorage.setItem("player4Bet", player4Bet.value);
    sessionStorage.setItem("player1BetValue", player1BetValue.value);
    sessionStorage.setItem("player2BetValue", player2BetValue.value);
    sessionStorage.setItem("player3BetValue", player3BetValue.value);
    sessionStorage.setItem("player4BetValue", player4BetValue.value);

    sessionStorage.setItem("numberOfDecks", numberOfDecks.value);

    return;
}

const player1Type = document.querySelector("#player1Type");
const player1Name = document.querySelector("#player1Name");
const player1Bet = document.querySelector("#player1Bet");
const player1BetValue = document.querySelector("#player1BetValue");


const player2Type = document.querySelector("#player2Type");
const player2Name = document.querySelector("#player2Name");
const player2Bet = document.querySelector("#player2Bet");
const player2BetValue = document.querySelector("#player2BetValue");

const player3Type = document.querySelector("#player3Type");
const player3Name = document.querySelector("#player3Name");
const player3Bet = document.querySelector("#player3Bet");
const player3BetValue = document.querySelector("#player3BetValue");

const player4Type = document.querySelector("#player4Type");
const player4Name = document.querySelector("#player4Name");
const player4Bet = document.querySelector("#player4Bet");
const player4BetValue = document.querySelector("#player4BetValue");

const numberOfDecks = document.querySelector("#numberOfDecks")

if(player3Type.options[player3Type.selectedIndex].text === ''){
    player3Name.readOnly = true;
}

if(player4Type.options[player4Type.selectedIndex].text === ''){
    player4Name.readOnly = true;
}

function setName(select, input, i) {

    select.addEventListener("change", function (e) {
        if (e.target.value === '1') {
            input.value = `Easy-Ai-${i}`;
            input.readOnly = true;
        } else if (e.target.value === '2') {
            input.value = `Medium-Ai-${i}`;
            input.readOnly = true;
        } else if (e.target.value === '3') {
            input.value = `Hard-Ai-${i}`;
            input.readOnly = true;
        } else if (e.target.options[e.target.selectedIndex].text === 'Guest') {
            input.value = `Guest-${i}`;
            input.readOnly = true;
        } else if (e.target.options[e.target.selectedIndex].text === '') {
            input.readOnly = true;
            input.value = '';
        }
        else {
            input.value = '';
            input.readOnly = false;
        }
    })
}

setName(player1Type, player1Name, 1);
setName(player2Type, player2Name, 2);
setName(player3Type, player3Name, 3);
setName(player4Type, player4Name, 4);