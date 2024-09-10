export const isValidNumber = function (value: string) {
  if (isNaN(Number(value))) return false;
  else return true;
};
