import { useFcm } from "./hooks/firebase/useFcm";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Stack, Typography } from "@mui/material";

import { firebaseMessaging } from "./firebase";
import Navbar from "./components/Navbar";
import AuthPage from "./pages/AuthPage";
import SearchPage from "./pages/SearchPage";
import MySubscriptionPage from "./pages/MySubscriptionPage";
import NotificationContainer from "./components/NotificationContainer";
import { AuthContext, useAuthContext } from "./context/AuthContext";
import ProgressLoader from "./components/ProgressLoader";
import { AppContext, useAppContext } from "./context/AppContext";

function App() {
  const { isTokenFound } = useFcm(firebaseMessaging);
  const authContext = useAuthContext();
  const appContext = useAppContext();

  return (
    <AppContext.Provider value={appContext}>
      <AuthContext.Provider value={authContext}>
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
          <NotificationContainer notificationList={[]} />
        </BrowserRouter>
        <ProgressLoader />
      </AuthContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
