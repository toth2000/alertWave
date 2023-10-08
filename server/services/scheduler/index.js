const corn = require("node-cron");

const amqp = require("amqplib");

const database = require("./utils/database");
const { getSubscriptionListWithFcmToken } = require("./queries/subscription");

const queue = "notification";

console.log("The scheduler service started");

// Every 12 hr : 0 */12 * * *
// Every Min : * * * * *
const task = corn.schedule("* 5 * * *", async () => {
  try {
    console.log("Scheduler Task Running");

    const connection = await amqp.connect("amqp://localhost:5673");
    const result = await database.query(getSubscriptionListWithFcmToken());

    const channel = await connection.createChannel();
    await channel.assertQueue(queue, { durable: false });

    if (result.length === 0) return;

    let prevStock = result[0].stock;

    const message = {};

    result.forEach((item, indx) => {
      if (message.hasOwnProperty(item.stock)) {
        message[item.stock] = [...message[item.stock], item.token];
      } else {
        message[item.stock] = [item.token];
      }

      if (item.stock !== prevStock || indx === result.length - 1) {
        channel.sendToQueue(
          queue,
          Buffer.from(JSON.stringify({ [prevStock]: message[prevStock] }))
        );

        console.log(" [x] Sent ", message[prevStock]);
        prevStock = item.stock;
      }
    });

    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error in scheduler: ", error);
  }
});

task.start();
