import { useEffect, useState } from "react";
import { getToken, onMessage } from "firebase/messaging";

export const useFcm = (messaging) => {
  const [isTokenFound, setTokenFound] = useState(true);

  useEffect(() => {
    getFirebaseToken();
    onMessage(messaging, (payload) => {
      console.log(payload);
    });
  }, []);

  const getFirebaseToken = () => {
    return getToken(messaging, {
      vapidKey:
        "BKLpvwuLv87NE8kW1RgzTOGsimAhhkjjoIU1e1u4sbSMMa_Ka-AfdnJV75L8V6D6ybE9izidOt42Psjl0FJaYWY",
    })
      .then((currentToken) => {
        if (currentToken) {
          console.log("current token for client: ", currentToken);
          setTokenFound(true);
          // Track the token -> client mapping, by sending to backend server
          // show on the UI that permission is secured
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
