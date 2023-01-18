
const dayMaker = () => {
  let newDay = new Date();
  let str = newDay.toISOString().slice(0, 10);
  let regex = /"-"/i;
  return str.replace(regex, "");
};

module.exports = { dayMaker };