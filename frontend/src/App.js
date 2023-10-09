import { useFcm } from "./hooks/firebase/useFcm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Collapse,
  Container,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import { firebaseMessaging } from "./firebase";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import MySubscriptionPage from "./pages/MySubscriptionPage";
import Notification from "./components/Notification";
import NotificationContainer from "./components/NotificationContainer";

function App() {
  const { isTokenFound } = useFcm(firebaseMessaging);

  return (
    <BrowserRouter>
      <Navbar />

      {!isTokenFound ? (
        <Stack gap={2} height={500} justifyContent={"center"}>
          <Typography variant="h4" textAlign={"Center"}>
            Notification Disable
          </Typography>
          <Typography variant="overline" textAlign={"Center"}>
            Please enable browser notification to use AlertWave
          </Typography>
        </Stack>
      ) : (
        <Routes>
          <Route path={"/"} element={<AuthPage />} />
          <Route path={"/home"} element={<SearchPage />} />
          <Route path={"/profile"} element={<MySubscriptionPage />} />
        </Routes>
      )}
      <NotificationContainer notificationList={[1, 2, 3]} />
    </BrowserRouter>
  );
}

export default App;
