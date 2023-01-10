/* const date_maker = () => {
  let date = new Date().toISOString().slice(0, 10);
  return date;
}; */

function date_maker() {
  let now = new Date();

  let day = ("0" + now.getDate()).slice(-2);
  let month = ("0" + (now.getMonth() + 1)).slice(-2);

  let today = now.getFullYear() + "-" + month + "-" + day;
  return today;
}

module.exports = { date_maker };
