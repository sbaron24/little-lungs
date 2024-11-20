import moment from "moment-timezone";

export function convertUTCTimeStr(string) {
  return moment(string).tz("Europe/Warsaw").format("h:mm a");
}
