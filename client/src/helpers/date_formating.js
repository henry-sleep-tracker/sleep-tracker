const formatingDate = (start, end) => {
  let st1 = new Date(`1/1/1900 ${start}`);
  let et1 = new Date(`1/2/1900 ${end}`);
  let diff = et1 - st1;

  if (start < end) {
    st1 = new Date(`1/1/1900 ${start}`);
    et1 = new Date(`1/1/1900 ${end}`);
    diff = et1 - st1;
  }

  diff = diff / 1000;
  let sec = Math.floor(diff % 60);
  diff = diff / 60;
  let min = Math.floor(diff % 60);
  diff = diff / 60;
  let hours = Math.floor(diff % 24);
  let finalHours = `${hours} horas ${min} minutos`;
  return finalHours;
};

module.exports = { formatingDate };
