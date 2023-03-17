export const qualities = [
  { id: "1", name: "Нудила" },
  { id: "2", name: "Красавчик" },
  { id: "3", name: "Смешной" },
  { id: "4", name: "Тупой" },
  { id: "5", name: "Злой" },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(qualities);
    }, 2000);
  });

export default {
  fetchAll,
};
