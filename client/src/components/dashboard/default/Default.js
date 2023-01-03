import Container from '@mui/material/Container';

function DefaultContent() {

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      Hola
    </Container>
  );
}

export default function Default() {
  return <DefaultContent />;
}
