export const department = [
  { id: "1", name: "Руководство", comment: "16-а00120" },
  { id: "2", name: "Исполнители при руководстве", comment: "16-а00121" },
  { id: "3", name: "Автотранспортный участок", comment: "16-а00135" },
  { id: "4", name: "Хозяйственный участок", comment: "16-а00129" },
  { id: "5", name: "Служба АиМО", comment: "16-а00134" },
  { id: "6", name: "Служба по ЭГРС", comment: "16-а00132" },
  { id: "7", name: "Служба ЭВС", comment: "16-а00133" },
  { id: "8", name: "Служба ЗоК", comment: "16-а00131" },
  { id: "9", name: "Служба ЛЭС", comment: "16-а00130" },
  { id: "10", name: "Участок по ХР и МТС", comment: "16-а00128" },
];
const fetchAll = () =>
  new Promise((resolve) => {
    window.setTimeout(function () {
      resolve(department);
    }, 2000);
  });

export default {
  fetchAll,
};
