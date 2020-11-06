const formatDate = (date) => {
  const newDate = new Date(date).toLocaleDateString("en-US");
  return newDate;
}
export default formatDate;