const Collection = (consumed) => {
   
  let { cafeina, alcohol, ejercicio, comida } = consumed.arg;

  if (!cafeina) {
    cafeina = "no hay registro";
  }
  if (!alcohol) {
    alcohol = "no hay registro";
  }
  if (!comida) {
    comida = "no hay registro";
  }
  if (!ejercicio) {
    ejercicio = "no hay registro";
  }

  return (
    <div>
      <p>Consumo de cafe: {cafeina}</p>
      <p>Consumo de Alcohol: {alcohol}</p>
      <p>Horario de merienda: {comida}</p>
      <p>Ejercicio: {ejercicio} </p>
    </div>
  );
};

export default Collection;
