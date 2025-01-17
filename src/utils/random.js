
//получить случайный элемент массива
function getRandomArrayElement(items) {
  return items[Math.floor(Math.random() * items.length)];
}

//получить случайное целочисленное число
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//перемешать массив
function shuffle(items) {
  for (let i = items.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [items[i], items[randomIndex]] = [items[randomIndex], items[i]];
  }
  return items;
}

//изменить рандомно размер массива
function changeLengthRandom(items) {
  const max = getRandomInteger(0, items.length - 1);
  return items.slice(0, max);
}

export {
  getRandomArrayElement,
  getRandomInteger,
  shuffle,
  changeLengthRandom,
};
