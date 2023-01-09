const timeToMinutes = (start, end) => {
  let st1 = new Date(`1/1/1900 ${start}`);
  let et1 = new Date(`1/2/1900 ${end}`);
  let diff = (et1.getTime() - st1.getTime()) / 1000;

  if (start < end) {
    st1 = new Date(`1/1/1900 ${start}`);
    et1 = new Date(`1/1/1900 ${end}`);
    diff = (et1.getTime() - st1.getTime()) / 1000;
  }

  diff /= 60;
  return Math.abs(Math.round(diff));
};

module.exports = { timeToMinutes };
