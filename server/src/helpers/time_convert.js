function time_convert(num) {
  const hours = Math.floor(num / 60);
  const minutes = num % 60;
  return `${hours} horas ${minutes} minutos`;
}

module.exports = { time_convert };
