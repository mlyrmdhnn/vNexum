/**
 * Formats a date string, Date object, or timestamp into a localized string.
 *
 * @param {string | Date | number} date - The date to be formatted.
 * @param {'date' | 'datetime' | 'long' | 'human'} [format='date'] - The desired output format style.
 * @param {'id-ID' | 'en-US' | 'en-GB' | 'zh-CN' | 'ja-JP' | 'ar-SA' | 'fr-FR' | 'es-ES'} [location='id-ID'] - The BCP 47 language tag for localization.
 * @returns {string | undefined} The formatted date string, or undefined if the input date is invalid.
 * @throws {Error} Throws an error if the provided date input cannot be parsed into a valid Date object.
 */
export declare const formatDate: (date: string | Date | number, format?: "date" | "datetime" | "long" | "human", location?: "id-ID" | "en-US" | "en-GB" | "zh-CN" | "ja-JP" | "ar-SA" | "fr-FR" | "es-ES") => string | undefined;
