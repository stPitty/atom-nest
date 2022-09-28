export const parseRussianDate = (date: string): string => {
  const dateParts = date.split('.');
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T00:00:00.000Z`;
};

export const parseRussianDateEndDay = (date: string): string => {
  const dateParts = date.split('.');
  return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}T23:59:59.000Z`;
};
