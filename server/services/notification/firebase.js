const { initializeApp, cert } = require("firebase-admin/app");

const serviceAccount = require("./alertwave-41801-firebase-adminsdk-8qeet-b3ab70224d.json");

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

module.exports = { firebaseApp };
