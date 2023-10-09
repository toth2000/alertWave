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
import { AUTH_ROUTE, HOME_ROUTE, PROFILE_ROUTE } from "./constant/routes";
import { useEffect, useState } from "react";
import { onMessage } from "firebase/messaging";

function App() {
  const [notificationList, setNotificationList] = useState([]);
  const [newNotification, setNewNotification] = useState(null);
  const { isTokenFound } = useFcm(firebaseMessaging);
  const authContext = useAuthContext();
  const appContext = useAppContext();

  useEffect(() => {
    onMessage(firebaseMessaging, (payload) => {
      const notificationTitle = payload.data.title;
      const notificationBody = payload.data.body;

      setNewNotification({
        id: payload.messageId,
        title: notificationTitle,
        body: notificationBody,
      });
    });
  }, []);

  useEffect(() => {
    if (newNotification) {
      setNotificationList([...notificationList, newNotification]);
    }
  }, [newNotification]);

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
              <Route path={AUTH_ROUTE} element={<AuthPage />} />
              <Route path={HOME_ROUTE} element={<SearchPage />} />
              <Route path={PROFILE_ROUTE} element={<MySubscriptionPage />} />
            </Routes>
          )}
          <NotificationContainer
            notificationList={notificationList}
            setNotificationList={setNotificationList}
          />
        </BrowserRouter>
        <ProgressLoader />
      </AuthContext.Provider>
    </AppContext.Provider>
  );
}

export default App;
