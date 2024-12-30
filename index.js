const gameBoard = document.querySelector('.board');
const startBut = document.querySelector('.board__button');
const input = document.querySelector('.board__input')


startBut.addEventListener('click', (e) => {
    e.preventDefault();
    let collums = input.value;
    let count;

    if (collums >= 2 && collums <= 6 && collums % 2 === 0) {
        count = collums * collums; 
    } else {
        input.value = 4;
    }
    createBoard();
});


function createBoard() {
    gameBoard.textContent = "";
}