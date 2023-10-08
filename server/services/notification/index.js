const amqp = require("amqplib");
const dotenv = require("dotenv");

const { sendNotification } = require("./utils/notification");
const { parseData } = require("./utils/alphavantage");

dotenv.config();
const queue = "notification";

const API_KEY = process.env.ALPHAVANTAGE_API_KEY;

const service = async () => {
  try {
    console.log("Notification Service Started");

    const connection = await amqp.connect("amqp://localhost:5673");
    const channel = await connection.createChannel();

    await channel.assertQueue(queue, { durable: false });
    await channel.consume(
      queue,
      async (message) => {
        if (message) {
          const data = JSON.parse(message.content.toString());
          console.log("Message Recieved: ", data);

          const requestUrl = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${data.stock}&apikey=${API_KEY}`;
          const result = await fetch(requestUrl);
          const resData = await result.json();
          const parsedData = parseData(resData);

          if (parsedData === null) return;

          const { symbol, high, low, price, change } = parsedData;

          sendNotification(
            data.fcmToken,
            `${symbol} Price Alert`,
            `Price: ${price}\nHigh: ${high}\nLow: ${low}\nChange: ${change}`
          );

          console.log("API RESULT: ", resData);
        }
      },
      { noAck: true }
    );
  } catch (error) {
    console.error("Error in notification service: ", error);
  }
};

service();
