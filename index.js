const gameBoard = document.querySelector(".board");
const form = gameBoard.querySelector('.board__form');
const startButton = form.querySelector('.board__button');
const input = form.querySelector('.board__input');
const couple = {
  first: null, 
  firstClickable: true, 
  second: null, 
  secondClickable: true
}

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

function createIconsArray(initialCount){
  const cardsIcons = ["compass", "cloud", "play", "bolt", "stop", "cogs", "atom", "basketball-ball", "arrows", "angle-left", "bars", "file", "filter", "gear",     "folder", "folder-open", "shield", "scissors", "pen-clip"];
  let cards = cardsIcons.slice(0, Math.floor(initialCount / 2));
  const doubleCards = dublicateElements(cards);
  const shuffledArray = shuffleArray(doubleCards);
  return shuffledArray;
}

function dublicateElements(array){
  const newArrCards = [];
  array.forEach(element => {
    newArrCards.push(element, element);
  });

  return newArrCards;
}

function gameLogic(card) {
  if (!couple.firstClickable && !couple.secondClickable) return;

  card.classList.add('flip');
  
  if (couple.first === null) {
    // Если нет, то сохраняем на нее ссылку и считаем кликнутой
    couple.first = card;
    couple.firstClickable = false;
  } else if (couple.second === null && couple.first !== card) {
    // Если да, то проверяем, кликнута ли вторая карточка и не является ли вторая карточка той же самой карточкой, что и первая, и если нет, то сохраняем ссылку на эту карточку и считаем ее кликнутой
    couple.second = card;
    couple.secondClickable = false;
  }

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
};

function shuffleArray(array) {
  let currentIndex = array.length;
  
  while (currentIndex !== 0) {
  const randomIndex = Math.floor(Math.random() * currentIndex);
  currentIndex--;
  
  const temp = array[currentIndex];

  array[currentIndex] = array[randomIndex];
  array[randomIndex] = temp;
  };
  
  return array;
  }

function createBoard(count, columns) {

  gameBoard.textContent = "";

  const template = document.querySelector('#gameTableTemplate').cloneNode(true).content;
  const gameTable = template.querySelector('.table');
  const restartBtn = template.querySelector(".table__button");

  const icons = createIconsArray(count);
  console.log(icons);
  
  icons.forEach(element => {
    gameTable.append(createCard(element));

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

};


function createCard(flippedIcon) {
  console.log(flippedIcon);
  
  const template = document.querySelector('#cardTemplate').cloneNode(true).content;


  const card = template.querySelector('.card');

  card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`);
  card.addEventListener('click', () => gameLogic(card));

  return card;
}

function isWin() {
  const gameTable = document.querySelector('.table');
  if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
    let interval = setTimeout(() => {
      clearInterval(interval);
      alert("_Побэдэ_");
    }, 1500)
  }
} //должно открываться только 2 картошки