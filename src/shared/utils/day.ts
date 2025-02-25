import dayjs from "dayjs";
import "dayjs/locale/ja";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import localeData from "dayjs/plugin/localeData";
import relativeTime from "dayjs/plugin/relativeTime";
import weekday from "dayjs/plugin/weekday";

dayjs.locale("ja");
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat);
dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.extend(relativeTime);

/**
 * Gets the current date and time as a Dayjs object.
 * @returns {dayjs.Dayjs} The current date and time.
 */
export const now = () => {
  return dayjs();
};

/**
 * Gets a Dayjs object from a date (8-digit number or date string).
 * @param dateNum The date (8-digit number or date string).
 * @param parse The parse format (default is "YYYYMMDD").
 */
export const getDay = (
  dateNum?: number | string,
  parse: string = "YYYYMMDD",
) => {
  return dateNum === undefined || dateNum === null || dateNum === ""
    ? now()
    : dayjs(String(dateNum), parse);
};

/**
 * Gets today's date.
 * @param format The format (default is "YYYYMMDD").
 * @returns  Today's date in the specified format.
 */
export const getToday = (format: string = "YYYYMMDD") => {
  return now().format(format);
};

/**
 * Gets the current year.
 * @returns The current year.
 */
export const getNowYear = () => {
  return now().year();
};

/**
 * Gets the current month.
 * @returns The current month.
 */
export const getNowMonth = () => {
  return now().month() + 1;
};

/**
 * Gets a Date object from a date (8-digit number or date string).
 * @param dateNum The date (8-digit number or date string).
 * @param parse The parse format (default is "YYYYMMDD").
 */
export const toDate = (
  dateNum?: number | string,
  parse: string = "YYYYMMDD",
) => {
  return dateNum === undefined || dateNum === null || dateNum === ""
    ? now().toDate()
    : dayjs(String(dateNum), parse).toDate();
};

/**
 * Formats a Date object as a string.
 * @param date The Date object.
 * @param format The format (default is "YYYYMMDD").
 */
export const toDateString = (date?: Date, format: string = "YYYYMMDD") => {
  return date === undefined ? getToday(format) : dayjs(date).format(format);
};

/**
 * Calculates age from a birth date.
 * @param birthDate The birth date (string in "YYYYMMDD" format).
 */
export const calculateAge = (birthDate: string | undefined) => {
  if (!birthDate) return 0;

  const birth = dayjs(birthDate);
  const today = dayjs();
  return today.diff(birth, "year");
};

/**
 * Gets the Japanese weekday name for a given date.
 * @param dateStr The date string in "YYYYMMDD" format.
 */
export const getJapaneseWeekday = (dateStr: string) => {
  const date = dayjs(dateStr);
  const weekdays = dayjs.weekdays();
  return weekdays[date.day()];
};

/**
 * Calculates the start date of the week for a given end date.
 * @param endDate The end date in "YYYYMMDD" format.
 */
export const calculateStartDate = (endDate: string): string => {
  const endDayjs = dayjs(endDate, "YYYYMMDD");
  const dayOfWeek = endDayjs.day();
  const diff = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const startDate = endDayjs.subtract(diff, "day").format("YYYYMMDD");
  return startDate;
};
