import { Avatar, Chip, Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import Header from "./Header";
import MediaCard from "./productcard";

function Homepage() {
  return (
    <div>
      <Header />
      <MediaCard />
    </div>
  );
}

export default Homepage;
