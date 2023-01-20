import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

function CopyrightContent(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.sleeptracker.com/">
        Sleep tracker
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Copyright() {
  return <CopyrightContent />;
}
