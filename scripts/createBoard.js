import { startTimer } from './timer.js';
import { createIconsArray, createCard } from './cards.js';

export function createBoard(count, columns) {
  const gameBoard = document.querySelector(".board");

  gameBoard.textContent = "";

  // Создание клона шаблона
  const template = document.querySelector('#gameTableTemplate').cloneNode(true).content;
  // В шаблоне находится таблица
  const gameTable = template.querySelector('.table');
  // В шаблоне находится кнопка "Рестарт"
  const restartBtn = template.querySelector(".table__button");

  // Создание определенного количества иконок
  const icons = createIconsArray(count);

  // Заполнение ячеек карточками
  icons.forEach((icon) => {
    gameTable.append(createCard(icon));
  });

  gameTable.style = `
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${columns}, 1fr);
  `;

  gameBoard.append(gameTable);

  restartBtn.addEventListener("click", () => {
    location.reload();
  });

  gameBoard.append(restartBtn);

  startTimer();
};
