import React from "react";
import Card from "./Card";
import { Stack, Container } from "@mui/material";
function CardsList() {
  return (
    <div>
        <Container maxWidth="sm">
      <Stack direction="row" spacing={2}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </Stack>
      </Container>
    </div>
  );
}

export default CardsList;
