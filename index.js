const gameBoard = document.querySelector(".board");
const form = gameBoard.querySelector('.board__form');
const startButton = form.querySelector('.board__button');
const input = form.querySelector('.board__input');

startButton.addEventListener("click", (event) => {
  event.preventDefault()
  let columns = input.value;
  let count;
  if (input.value >= 2 && input.value <= 6 && input.value % 2 == 0) {
    count = input.value * input.value;
  } else {
    alert("Нужно написать четное число в указанном диапазоне.");
    return;
  }

  createBoard(count, columns);
});


function createBoard(count, columns) {

  gameBoard.textContent = "";

  const template = document.querySelector('#gameTableTemplate').cloneNode(true).content;
  const gameTable = template.querySelector('.table');
  const restartBtn = template.querySelector(".table__button");

  for (let i = 0; i < count; i++) {
    gameTable.append(createCard());
  }

  gameTable.style = `
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${columns}, 1fr);
  `;

  gameBoard.append(gameTable);

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  gameBoard.append(restartBtn);

};


function createCard(flippedIcon) {
  // Клонирование шаблона
  const template = document.querySelector('#cardTemplate').cloneNode(true).content;
  // Поиск нужного элемента
  const card = template.querySelector('.card');
  // Добавление иконки, название которой передаем через параметр flippedIcon
  card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`);
  // card.addEventListener('click', (event) => gameLogic(event, card));

  // rutern card означает, что получившийся объект "выбрасывается" в то место, где будет вызвана функция createCard
  return card;
}