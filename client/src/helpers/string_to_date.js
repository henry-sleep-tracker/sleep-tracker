const dateStringToDate = dateString => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  try {
    let year = dateString.substring(0, 4);
    let month = dateString.substring(4, 6);
    let day = dateString.substring(7, 9);
    let date = new Date(year, month - 1, day);
    const offset = date.getTimezoneOffset();
    date = new Date(date.getTime() - offset * 60 * 1000);
    return date.toLocaleDateString(undefined, options);
  } catch (error) {
    return null;
  }
};

module.exports = { dateStringToDate };
