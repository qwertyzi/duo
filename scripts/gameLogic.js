import { stopTimer, totalTime } from "./timer.js";

let totalFlips = 0;

const couple = {
  first: null,
  firstClickable: true,
  second: null,
  secondClickable: true,
};


function gameLogic(card) {
  // Если время вышло - ничего не делаем
  if (totalTime === 0) return;
  // Если обе карточки не кликабельны - ничего не делаем
  if (!couple.firstClickable && !couple.secondClickable) return;

  // Переворачиваем карточку
  card.classList.add('flip');
  totalFlips++;

  // Проверяем, кликнута ли первая карточка
  if (couple.first === null) {
    // Если нет, то сохраняем на нее ссылку и считаем кликнутой
    couple.first = card;
    couple.firstClickable = false;
  } else if (couple.second === null && couple.first !== card) {
    // Если да, то проверяем, кликнута ли вторая карточка и не является ли вторая карточка то же самой карточкой, что и первая, и если нет, то сохраняем ссылку на эту карточку и считаем ее кликнутой
    couple.second = card;
    couple.secondClickable = false;
  }

  // Если какой-либо карточки не кликнуто - ничего не делаем
  if (couple.first === null || couple.second === null) return;

  // Сравниваем классы двух карточек и сохраняем логический результат в переменную (это для повышения читабельности)
  const isEqual = couple.first.firstElementChild.classList[2] === couple.second.firstElementChild.classList[2];

  // Если классы одинаковы
  if (isEqual) {
    setTimeout(() => {
      // То перекрашиваем их в зеленый с задержкой в 1 секунду
      couple.first.classList.add('successfully');
      couple.second.classList.add('successfully');

      // Сбрасываем все ссылки и состояния
      refresh();
    }, 1000);
  } else {
    setTimeout(() => {
      // Иначе переворачиваем карточки обратно с задержкой в 1 секунду
      couple.first.classList.remove('flip');
      couple.second.classList.remove('flip');

      // Сбрасываем все ссылки и состояния
      refresh();
    }, 1000);
  }

  // Функция сброса ссылок и состояний
  function refresh() {
    couple.first = null;
    couple.second = null;
    couple.firstClickable = true;
    couple.secondClickable = true;
  }

  isWin();
}

function isWin() {
  const gameTable = document.querySelector('.table');
  if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
    setTimeout(() => {
      stopTimer();
      alert("Вы победили!");
    }, 1500)
  }
}


export { gameLogic, totalFlips };