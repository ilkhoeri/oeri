export const NEW_LIST = [""];

export const UPDATED_LIST = ["text-parser", "checker", "table", "svg", "input", "prose"];

const DATE_UNTIL = { date: "2025-05-01", time: "23:30:00" };
// YYYY-MM-DDTHH:mm:ss
const NOTIF_UNTIL = new Date() <= new Date(`${DATE_UNTIL.date}T${DATE_UNTIL.time}`);

export const isNotif = (item: string) =>
  Object.assign(
    {},
    {
      new: () => {
        return NEW_LIST.includes(item) && NOTIF_UNTIL;
      },
      updated: () => {
        return UPDATED_LIST.includes(item) && NOTIF_UNTIL;
      }
    }
  );
