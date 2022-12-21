const new_record_validator = (req, res, next) => {
  let { dateMeal, timeMeal, sleepTime } = req.body;

  if (!dateMeal) return res.status(400).json({ error: 'Ingresa la fecha' });
  if (!timeMeal) return res.status(400).json({ error: 'Ingresa la hora' });
  if (!sleepTime)
    return res.status(400).json({ error: 'Ingresa tus horas de sueño' });
  return next;
};

module.exports = { new_record_validator };
