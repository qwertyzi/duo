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
    createBoard();
});


function createBoard(colums) {
    gameBoard.textContent = "";

    const templ = document.querySelector('#gameTableTemplate');
    console.log(templ);
    
    //не находит table 
    const table = templ.querySelector('.table');
    const rest = templ.querySelector('.table__button');
    console.log(table);

    table.style = `grid-template-columns: repeat(${colums}, 1fr);
    grid-template-rows: repeat(${colums}, 1fr)`;

    gameBoard.append(table);
    
    rest.addEventListener('click',() => {
        location.reload();
    })
    
    gameBoard.append(rest);
};


