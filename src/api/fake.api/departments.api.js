export const department = [
  { id: "1", id_sl: "16-а00120", name: "Руководство" },
  { id: "2", id_sl: "16-а00121", name: "Исполнители при руководстве" },
  { id: "3", id_sl: "16-а00135", name: "Автотранспортный участок" },
  { id: "4", id_sl: "16-а00129", name: "Хозяйственный участок" },
  { id: "5", id_sl: "16-а00134", name: "Служба АиМО" },
  { id: "6", id_sl: "16-а00132", name: "Служба по ЭГРС" },
  { id: "7", id_sl: "16-а00133", name: "Служба ЭВС" },
  { id: "8", id_sl: "16-а00131", name: "Служба ЗоК" },
  { id: "9", id_sl: "16-а00130", name: "Служба ЛЭС" },
  { id: "10", id_sl: "16-а00128", name: "Участок по ХР и МТС" },
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
