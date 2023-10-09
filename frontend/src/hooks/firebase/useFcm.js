import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { registerDevice } from "../../api/subscription";
import { getLocalStorageItem } from "../../utils/localStorage";

export const useFcm = (messaging) => {
  const [isTokenFound, setTokenFound] = useState(true);
  const [userId, setUserId] = useState(null);
  const authData = getLocalStorageItem("auth");

  useEffect(() => {
    if (authData?.userId) setUserId(authData.userId);
  }, [authData]);

  useEffect(() => {
    if (userId) {
      getFirebaseToken();
    }
  }, [userId]);

  const getFirebaseToken = () => {
    return getToken(messaging, {
      vapidKey:
        "BKLpvwuLv87NE8kW1RgzTOGsimAhhkjjoIU1e1u4sbSMMa_Ka-AfdnJV75L8V6D6ybE9izidOt42Psjl0FJaYWY",
    })
      .then(async (currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          setTokenFound(true);
          try {
            const { data } = await registerDevice(userId, currentToken);
            console.log("Token Saved to Server: ", data);
          } catch (error) {}
        } else {
          console.log(
            "No registration token available. Request permission to generate one."
          );
          setTokenFound(false);
          // shows on the UI that permission is required
        }
      })
      .catch((err) => {
        console.log("An error occurred while retrieving token. ", err);
        setTokenFound(false);
        // catch error while creating client token
      });
  };

  return { isTokenFound };
};
