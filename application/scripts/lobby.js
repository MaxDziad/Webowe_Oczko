
function handleSubmit(){
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
    console.log('elo')
    return;
}

