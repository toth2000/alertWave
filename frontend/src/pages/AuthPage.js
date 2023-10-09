import { useState } from "react";

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Grid
      container
      direction={{ xs: "column-reverse", md: "row" }}
      justifyContent="center"
      alignItems="stretch"
    >
      <Grid item width={{ xs: "100%", md: "60%" }}>
        <img
          width={"100%"}
          height={"100%"}
          src="https://img.freepik.com/premium-photo/dramatic-stock-market-scene-with-descending-graph-dark-background-symbolizing-investment-loss_674594-3346.jpg?w=2000"
          alt="cover_pic"
        />
      </Grid>
      <Grid item width={{ xs: "100%", md: "40%" }}>
        <Box>
          <Paper
            elevation={2}
            sx={{
              my: 3,
              mx: 5,
              px: 5,
              py: 10,
            }}
          >
            <Typography variant="h4" sx={{ marginTop: 5 }}>
              Login
            </Typography>
            <Stack width={"100%"} mt={5} alignItems={"center"}>
              <Stack width={{ xs: "100%", md: "80%" }} gap={2}>
                <TextField
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                />
                <TextField
                  id="outlined-basic"
                  label="Password"
                  variant="outlined"
                  type="password"
                />
                <Button variant="contained">Login</Button>
                <Button variant="text">
                  Don't have an account? Click here
                </Button>
              </Stack>
            </Stack>
          </Paper>
        </Box>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
