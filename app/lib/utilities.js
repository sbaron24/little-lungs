import moment from "moment-timezone";

/**
 // Get current Warsaw time rounded to the nearest hour
 * @returns {string} - nearest hour ISO format time string in Warsaw
 */
export function topOfHourWarsawTime() {
  const warsawTime = moment().tz("Europe/Warsaw");
  return warsawTime.add(1, "hour").startOf("hour").format();
}

/**
 // Get Warsaw time some hours ahead from the top or bottom of current hour
 * @param {string} currentTimeStr - time in ISO format string
 * @returns {string} - time some number of hours after start time in ISO format string
 */
export function getHoursAheadTime(currentTimeStr, numberHoursAhead) {
  return moment(currentTimeStr)
    .tz("Europe/Warsaw")
    .add(numberHoursAhead, "hour")
    .format();
}
