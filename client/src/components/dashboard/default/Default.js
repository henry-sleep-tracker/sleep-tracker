import Container from '@mui/material/Container';

function DefaultContent() {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <p>Muy pronto aquí visualizaremos estadisticas generales.</p>
      <ul>
        <li>Cantidad de usuarios registrados en la última semana. Grafico de Barras.</li>
        <li>Pais de procedencia de los usuarios. Grafico Circular.</li>
        <li>Planes adquiridos por los usuarios. Grafico Circular.</li>
        <li>Eficiencia de sueño promedio de todos los usuarios</li>
      </ul>
    </Container>
  );
}

export default function Default() {
  return <DefaultContent />;
}
