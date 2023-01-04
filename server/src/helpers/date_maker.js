const date_maker = () => {
  let date = new Date().toISOString().slice(0, 10);
  return date;
};

module.exports = { date_maker };
