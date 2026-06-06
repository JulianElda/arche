export const isValidNumber = function (value: string) {
  return Number.isNaN(Number(value)) ? false : true;
};
