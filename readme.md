# AlertWave

AlertWave is a real-time stock market price alert system that allows users to subscribe to stock alerts and receive periodic notifications based on their preferences.

## Content
- [Architecture Overview](#architecture-overview)
- [Working Demo](#working-demo)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Architecture Overview

The AlertWave system is built on a microservices architecture, providing modularity and scalability. Here's an overview of the key components:

![](https://raw.githubusercontent.com/toth2000/alertWave/master/screenshot/system_design.png)

1. **API Gateway:**
   - The API Gateway handles incoming requests and redirects them to the appropriate microservices.
2. **Authentication Microservice:**

   - Responsible for user authentication and authorization. Ensures secure access to the system.

3. **Subscription Microservice:**

   - Manages user subscriptions to specific stocks. Users can create or delete subscriptions and set alert criteria.

4. **Scheduler:**

   - Periodically runs database queries to identify users subscribed to a particular stock.
   - Puts relevant information (e.g., STOCK ID, FCM tokens of subscribed users) into a message queue for processing.

5. **Notification Service:**
   - Consumes messages from the queue, fetches the current stock price, and sends notifications to subscribed users using Firebase Cloud Messaging (FCM).

## Working Demo
- Background Notification

![Image 1](https://raw.githubusercontent.com/toth2000/alertWave/master/screenshot/notification_background.png) 
- Foreground Notification

![Image 2](https://raw.githubusercontent.com/toth2000/alertWave/master/screenshot/notification_foreground.png)

## Getting Started

### Prerequisites

- Node.js
- npm
- Docker (optional)
- Firebase project credentials for FCM

### Installation

    $ git clone git clone https://github.com/toth2000/alertWave
    $ cd lingo

#### To Run the Website locally

    $ cd frontend
    $ npm install
    $ npm start

## Configuration Frontend

- Make sure you define the value of all the variable in the `.env` mentioned in the `.env.example` file.
- Add a firebase.config file in the `/src` directory of the project

--- 

#### To Run the Server locally

    $ cd server

#### Install Dependecies and run each of the microservices seperately

- API Gateway

        $ cd gateway
        $ npm install
        $ npm run dev

- Auth Microservice

        $ cd services
        $ cd authentication
        $ npm install
        $ npm run dev

- Subscription Microservice

        $ cd services
        $ cd subscription
        $ npm install
        $ npm run dev

- Scheduler Microservice

        $ cd services
        $ cd scheduler
        $ npm install
        $ npm run dev

- Scheduler Microservice

        $ cd services
        $ cd notification
        $ npm install
        $ npm run dev

## Configuration Backend

- Ensure that you set up the necessary environment variables for each microservice. Refer to the `.env.example` files in each microservice folder for guidance.
- Visit https://www.alphavantage.co/ to generate API key to get stock market details

## Usage

1. **Authentication:**

   - Obtain an access and refresh token by registering or logging in.

2. **Subscription:**

   - Use the Subscription microservice to manage stock subscriptions.
   - Create or delete subscriptions based on stock symbols and alert criteria.
   - Update user FCM token in the database

3. **Receive Alerts:**
   - Subscribed users will receive periodic alerts for the subscribed stock.

## Contributing

We welcome contributions! If you'd like to contribute to AlertWave, please follow our [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to [Firebase](https://firebase.google.com/) for providing a reliable Cloud Messaging service.
- Thanks to [Alpa Vantage](https://www.alphavantage.co/) for providing API to get real time data related to stock market.
- Inspired by the need for real-time stock market alerts.

