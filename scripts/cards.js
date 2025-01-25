import { gameLogic } from "./gameLogic.js";

function createCard(flippedIcon) {
  // Клонирование шаблона
  const template = document.querySelector('#cardTemplate').cloneNode(true).content;
  // Поиск нужного элемента
  const card = template.querySelector('.card');
  // Добавление иконки, название которой передаем через параметр flippedIcon
  card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`);

  card.addEventListener('click', () => gameLogic(card));

  // ruturn card означает, что получившийся объект "выбрасывается" в то место, где будет вызвана функция createCard
  return card;
}

function createIconsArray(initialCount) {
  // Массив названий иконок
  const cardsIcons = [
    "compass",
    "cloud",
    "play",
    "bolt",
    "stop",
    "cogs",
    "atom",
    "basketball-ball",
    "arrows",
    "angle-left",
    "bars",
    "file",
    "filter",
    "gear",
    "folder",
    "folder-open",
    "shield",
    "scissors",
    "pen-clip",
  ];

  // Выбор нужного количества иконок с помощью среза
  let cards = cardsIcons.slice(0, Math.floor(initialCount / 2));
  // Создание пар элементов
  const duobleCards = dublicateElements(cards);

  // Случайное перемешивание элементов и возврат итогового массива
  return shuffleArray(duobleCards);
};

// Перемешивание элементов массива
function shuffleArray(array) {
  // Определяем количество элементов массива
  let currentIndex = array.length;

  // Повторяем до тех пор, пока текущий индекс не достиг нуля
  while (currentIndex !== 0) {
    // Отнимаем индекс
    currentIndex--;
    // Генерируем рандомный индекс
    const randomIndex = Math.floor(Math.random() * currentIndex);

    // Сохраняем элемент текущего индекса
    const temp = array[currentIndex];
    // По текущему индексу размещаем элемент по случайному индексу
    array[currentIndex] = array[randomIndex];
    // А на место элемента по случайному индексу ставим сохраненный элемент бывшего текущего индекса
    array[randomIndex] = temp;
  };

  // Возвращаем массив
  return array;
}

// Дублирование всех элементов входящего массива
function dublicateElements(array) {
  const newArr = [];

  // Перебирается массив array и каждый элемент массива (item) дважды вставляется в новый массив
  array.forEach((item) => {
    newArr.push(item, item);
  });

  return newArr;
}

export { createCard, createIconsArray };