const gridContainer = document.getElementById("gridContainer");
const playerText = document.querySelector("h2");

let imgPath = "img/cross.png"; 

// 1 - X, 2 - O
let cells = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
]

let player = 2

function victory()
{
    console.log(cells[0], cells[1], cells[2]);
    alert("Игрок " + player + " выиграл!!!");
    location.reload();
}

function draw()
{
    alert("Ничья!");
    location.reload();
}

function passTurn()
{
    if (player == 1)
    {
        imgPath = "img/circle.png";
        player = 2;
        playerText.textContent = "Ход игрока 2";
        playerText.setAttribute("style", "color: blue; text-align: center;");
    }
    else 
    {
        imgPath = "img/cross.png";
        player = 1;
        playerText.textContent = "Ход игрока 1";
        playerText.setAttribute("style", "color: red; text-align: center;");
    }
}

function onPressed(x, y)
{
    if (cells[x][y] == 0)
    {  
        console.log(x, " ", y); 
        cells[x][y] = player;

        checkForEnd();
        passTurn();
    }
}

function checkForEnd()
{
    let filledDiag1 = true;
    let filledDiag2 = true;
    let noMovesLeft = true;

    for (let i = 0; i < 3; i++)
    {
        if (cells[i][i] != player)
            filledDiag1 = false;
        if (cells[i][2-i] != player)
            filledDiag2 = false;

        let filledRow = true;
        let filledCol = true;

        // Orthogonal

        for (let j = 0; j < 3; j++)
        {
            if (cells[i][j] == 0)
                noMovesLeft = false;
            if (cells[i][j] != player)
                filledRow = false;
            if (cells[j][i] != player)
                filledCol = false;
        }


        if (filledRow || filledCol)
        {
            victory();
            return;
        }
    }
    if (filledDiag1 || filledDiag2)
        victory();
    if (noMovesLeft)
        draw();
}

function drawGrid()
{
    for (let i=0; i<9; i++)
    {
        const gridItem = document.createElement("div");
        const button = document.createElement("button");

        button.addEventListener("click", function() {

            let item = document.createElement("img");
            item.setAttribute("src", imgPath);
            gridItem.appendChild(item);

            onPressed(Math.floor(i/3), i%3);
            this.remove();
        });
        button.className = "cell-button";

        gridItem.className = "grid-item";
        gridItem.appendChild(button);

        gridContainer.appendChild(gridItem);
    }
}

drawGrid();
passTurn();