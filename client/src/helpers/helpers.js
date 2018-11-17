export const timestampToDate = (timestamp) => {
  let date = new Date(parseFloat(timestamp * 1000));
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} at ${date.getHours()}:${date.getMinutes()}`;
};

export const today = () => {
  let date = new Date();
  return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
}