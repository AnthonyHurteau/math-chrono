import React, { useEffect, useState } from "react";
import { Container, Grid, useTheme, Typography, Button } from "@mui/material";
import { getOperations } from "./services/MathService";

export default function ParamsComponent(props) {
  const operations = getOperations(props.params);

  console.log(operations);

  return (
    <Container className="container">
      <br />
      <h1>Math</h1>
    </Container>
  );
}
