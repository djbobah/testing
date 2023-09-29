export function getRandomInt(min = 1, max = 10000) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

// Перемешивает (переупорядочивает случайным образом) элементы массива.
// Все последовательности элементов имеют одинаковую вероятность
export function shuffle(array) {
  let shuffleArr = array.slice(0);
  for (let i = shuffleArr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [shuffleArr[i], shuffleArr[j]] = [shuffleArr[j], shuffleArr[i]];
  }
  return shuffleArr;
}
