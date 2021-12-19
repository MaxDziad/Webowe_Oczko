
function handleSubmit() {
    const player1Type = document.querySelector("#player1Type").value;
    const player1Name = document.querySelector("#player1Name").value;

    const player2Type = document.querySelector("#player2Type").value;
    const player2Name = document.querySelector("#player2Name").value;

    const player3Type = document.querySelector("#player3Type").value;
    const player3Name = document.querySelector("#player3Name").value;

    const player4Type = document.querySelector("#player4Type").value;
    const player4Name = document.querySelector("#player4Name").value;

    sessionStorage.setItem("player1Name", player1Name);
    sessionStorage.setItem("player2Name", player2Name);
    sessionStorage.setItem("player3Name", player3Name);
    sessionStorage.setItem("player4Name", player4Name);
    sessionStorage.setItem("player1Type", player1Type);
    sessionStorage.setItem("player2Type", player2Type);
    sessionStorage.setItem("player3Type", player3Type);
    sessionStorage.setItem("player4Type", player4Type);
    return;
}

const firstSelect = document.querySelector('#player1Type');
const secondSelect = document.querySelector('#player2Type');
const thirdSelect = document.querySelector('#player3Type');
const fourthSelect = document.querySelector('#player4Type');

const firstInput = document.querySelector('#player1Name');
const secondInput = document.querySelector('#player2Name');
const thirdInput = document.querySelector('#player3Name');
const fourthInput = document.querySelector('#player4Name');


if(thirdSelect.options[thirdSelect.selectedIndex].text === ''){
    thirdInput.readOnly = true;
}

if(fourthSelect.options[fourthSelect.selectedIndex].text === ''){
    fourthInput.readOnly = true;

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


setName(firstSelect, firstInput, 1)
setName(secondSelect, secondInput, 2)
setName(thirdSelect, thirdInput, 3)
setName(fourthSelect, fourthInput, 4)


