/**
 * Get the current date in the 'YYYY-MM-DD' format.
 *
 * @returns The current date in the 'YYYY-MM-DD' format.
 */
export const getToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get the current date in the Brazilian format 'DD/MM/YYYY'.
 *
 * @returns The current date in the 'DD/MM/YYYY' format.
 */
export const getTodayBR = () => dateToBR(getToday());

/**
 * Convert a date in 'YYYY-MM-DD' format to the Brazilian format 'DD/MM/YYYY'.
 *
 * @param date - The date in 'YYYY-MM-DD' format.
 * @returns The date in the Brazilian 'DD/MM/YYYY' format.
 */
export const dateToBR = (date: string) => {
  if (!date) {
    return '';
  }

  const dateParts = date.split('-');

  if (dateParts.length !== 3) {
    return '';
  }

  const [year, month, day] = dateParts;

  return `${day}/${month}/${year}`;
};
