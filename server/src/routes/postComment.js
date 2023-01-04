const { Router } = require("express");
const router = Router();
const { getClinicHistory } = require("../controllers/getClinicHistory");
const { ClinicHistory } = require("../db");

router.post("/", async (req, res) => {
  const {
    dni,
    objetivos,
    objetivosGenerales,
    objetivosInmediatos,
    usoDeApoyos,
  } = req.body;

  try {
    if (dni) {
      const allClinicHistories = await getClinicHistory();
      const clinicHistoryExists = allClinicHistories.find(
        (element) => element.dni === dni
      );

      if (!clinicHistoryExists) {

        const clinicHistoryCreated = await ClinicHistory.create({
          dni,
          objetivos,
          objetivosGenerales,
          objetivosInmediatos,
          usoDeApoyos,
        });

        return res.status(201).send(clinicHistoryCreated);
      }
      return res
        .status(404)
        .send(console.log("ERROR: No es posible crear la historia clinica"));
    }
  } catch (error) {
    !dni
      ? res.status(404).send(console.log("DNI no fue ingresado"))
      : res.status(404).send(console.log("Error de conexion"));
    console.log(error);
  }
});

module.exports = router;
