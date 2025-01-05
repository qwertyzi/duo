const gameBoard = document.querySelector('.board');
const startBut = document.querySelector('.board__button');
const input = document.querySelector('.board__input')


startBut.addEventListener('click', (e) => {
    e.preventDefault();
    let colums = input.value;
    let count;

    if (colums >= 2 && colums <= 6 && colums % 2 === 0) {
        count = colums * colums; 
    } else {
        input.value = 4;
    }
    createBoard(count, colums);
});


function createBoard(count, colums) {
    gameBoard.textContent = "";
    
    const templ = document.querySelector('#gameTableTemplate');
    const templCont = templ.content.cloneNode(true);
    const table = templCont.querySelector('.table');
    const rest = templCont.querySelector('.table__button');
    
    for (let i = 0; i < count; i++) {
        table.append(createCard());
    }

    table.style = `grid-template-columns: repeat(${colums}, 1fr);
    grid-template-rows: repeat(${colums}, 1fr)`;

    gameBoard.append(table);
    
    rest.addEventListener('click',() => {
        location.reload();
    })
    
    gameBoard.append(rest);
};

function createCard() {
    const cloneCard = document.querySelector("#cardTemplate").cloneNode(true).content;
    const card = cloneCard.querySelector(".card");
    return card;
};

