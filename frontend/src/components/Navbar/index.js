import React, { useContext } from "react";

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import { PROFILE_ROUTE, AUTH_ROUTE, HOME_ROUTE } from "../../constant/routes";

import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { authState, deleteAuthData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    deleteAuthData();
    navigate(AUTH_ROUTE);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Alert Wave
          </Typography>

          {authState?.userId ? (
            <>
              <Link
                to={HOME_ROUTE}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginRight: "15px",
                }}
              >
                <Button color="inherit" variant="text">
                  Browse
                </Button>
              </Link>
              <Link
                to={PROFILE_ROUTE}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  marginRight: "15px",
                }}
              >
                <Button color="inherit" variant="text">
                  My Profile
                </Button>
              </Link>

              <Button color="inherit" variant="outlined" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : null}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
