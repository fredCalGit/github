export const dateParser = (date: string) => {
  const result = date.split("-");
  return `${result[1]}/${result[0]}`;
};
