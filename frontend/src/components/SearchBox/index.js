import React from "react";

import {
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";

const SearchBox = () => {
  return (
    <Stack width={{ xs: "90%", md: "60%" }}>
      <Paper elevation={2} sx={{ p: { xs: 2, md: 5 } }}>
        <Typography variant="h4" fontSize={{ xs: 24, md: 36 }}>
          Search Stocks
        </Typography>
        <Grid
          container
          direction={"row"}
          justifyContent={"center"}
          alignItems={"center"}
          width={"100%"}
          gap={2}
          mt={2}
        >
          <Grid item width={"80%"}>
            <TextField
              fullWidth
              id="search"
              label="Company Name"
              variant="outlined"
              type="text"
            />
          </Grid>
          <Grid item>
            <IconButton aria-label="search">
              <SearchIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default SearchBox;
