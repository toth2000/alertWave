const { firebaseApp } = require("../firebase"); // Initialize The Firebase Admin SDK
const { getMessaging } = require("firebase-admin/messaging");

const sendNotification = (registrationTokens, messageTitle, messageBody) => {
  try {
    const message = {
      notification: {
        title: messageTitle,
        body: messageBody,
      },
      tokens: registrationTokens,
    };

    console.log({
      registrationTokens,
      messageTitle,
      messageBody,
    });

    getMessaging()
      .sendEachForMulticast(message)
      .then((response) => {
        // Response is a message ID string.
        console.log("Sent report:", response);
      })
      .catch((error) => {
        console.log("Error sending message:", error);
      });
  } catch (error) {
    console.log("Error in send notification util: ", error);
  }
};

module.exports = { sendNotification };
