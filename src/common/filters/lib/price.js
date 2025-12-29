/**
 * @param { Number | String } input - The number we want to format 
 * @param { String } [locale = 'fa-IR'] Locale 
 * @returns { String } The formmated number
 */

export const price = (input, locale = 'fa-IR') => {
    if (input === null || input === undefined) return "";

    const num = Number(input);

    if (isNaN(num)) return "";

    return new Intl.NumberFormat(locale).format(num);    
}