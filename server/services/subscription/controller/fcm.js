const database = require("../utils/database");
const { validateKeys } = require("../utils/validate");
const { fcmRegisterKeys } = require("../keys/fcm");
const { updateFcmTableEntry } = require("../queries/fcm_token");

const registerDevice = async (req, res) => {
  try {
    if (!validateKeys(fcmRegisterKeys, req.body)) {
      return res.status(400).json({
        message: "Please fill all the required fields",
        error: "Required Fields not passed",
      });
    }

    const { userId, fcmToken } = req.body;
    const result = await database.query(updateFcmTableEntry(userId, fcmToken));
    console.log(result);

    if (result.affectedRows === 0) {
      return res.status(201).json({
        message: "User does not exist",
        result: false,
      });
    } else {
      return res.status(201).json({
        message: "FCM Token Updated",
        result: true,
      });
    }
  } catch (error) {
    console.error("Error Occured in update fcm token controller: ", error);
    res.status(500).json({
      message: "An error Occured, Please Try again Later.",
      error: error,
    });
  }
};

module.exports = { registerDevice };
