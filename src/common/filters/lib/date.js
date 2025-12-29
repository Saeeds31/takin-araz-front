import dayjs from "dayjs";
import jalaliday from 'jalaliday/dayjs';

dayjs.extend(jalaliday);

/**
 * @param { String | Number } input - The date value (Timestamp, string, Date)
 * @param { 'date' | 'time' | 'datetime' | 'year' } [format = 'datetime'] - Output format
 * @returns { String } Jalali formatted output
 */

export const date = (input, format = "datetime") => {
    if (!input) return "";

    const d = dayjs(input).calendar("jalali").locale("fa");

    switch (format) {
        case 'year': 
            return d.format('YYYY');
        case 'date':
            return d.format("YYYY/MM/DD");

        case 'time':
            return d.format("HH:mm");

        case 'datetime':
        default:
            return d.format("YYYY/MM/DD HH:mm");
    }
}