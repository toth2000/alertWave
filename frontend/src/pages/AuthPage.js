import { useContext, useEffect, useState } from "react";

import {
  Box,
  Button,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useInput } from "../hooks/useInput";
import { login, register } from "../api/auth";
import { AppContext } from "../context/AppContext";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { HOME_ROUTE } from "../constant/routes";
import { showErrorAlert } from "../utils/api";

const AuthPage = () => {
  const [showLogin, setShowLogin] = useState(true);

  const { state, handleInput, validateInputFields } = useInput({
    name: "",
    email: "",
    password: "",
  });
  const { setLoading } = useContext(AppContext);
  const { setAuthData, isUserAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAuthentication = async () => {
    const apiCall = showLogin ? login : register;

    const isInputValid = showLogin
      ? validateInputFields(["email", "password"])
      : validateInputFields();

    if (isInputValid === false) {
      alert("All fields are required");
      return;
    }

    try {
      setLoading(true);
      const { data } = await apiCall(state);
      setAuthData(data.id, data.access_token, data.refresh_token);
      navigate(HOME_ROUTE);
    } catch (error) {
      console.error("Error in API Call: ", error);
      showErrorAlert(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isUserAuthenticated()) {
      navigate(HOME_ROUTE);
    }
  }, []);

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
              {showLogin ? "Login" : "Register"}
            </Typography>
            <Stack width={"100%"} mt={5} alignItems={"center"}>
              <Stack width={{ xs: "100%", md: "80%" }} gap={2}>
                {!showLogin ? (
                  <TextField
                    name="name"
                    label="Name"
                    variant="outlined"
                    type="text"
                    onChange={(e) => handleInput(e)}
                  />
                ) : null}
                <TextField
                  name="email"
                  label="Email"
                  variant="outlined"
                  type="email"
                  onChange={(e) => handleInput(e)}
                />
                <TextField
                  name="password"
                  label="Password"
                  variant="outlined"
                  type="password"
                  onChange={(e) => handleInput(e)}
                />
                <Button variant="contained" onClick={handleAuthentication}>
                  {showLogin ? "Login" : "Register"}
                </Button>
                <Button
                  variant="text"
                  onClick={() => setShowLogin((prev) => !prev)}
                >
                  {showLogin
                    ? "Don't have an account? Click here"
                    : "Already have an account? Click Here"}
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
