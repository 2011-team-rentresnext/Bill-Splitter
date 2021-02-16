# SLICED

Sliced is a bill splitter -- a mobile application that scans restaurant receipts and turns each item into a charge that can be paid for by another person.

Created by Matt Ellison, Julie Lam, Ivan Lozano, and Ayuna Tsyrenova.

## See inside

![Completed receipt with pending payments](/assets/readme/screenshot.jpg)

## How to demo

### On Android

Scan the QR code on the [project webpage](https://expo.io/@rentresnext/projects/Sliced)

### On iOS

Download the [Expo Go app](https://apps.apple.com/us/app/expo-go/id982107779) and log in with these credentials:

```
email: rentresnext@gmail.com
password: C@pstone7!
```

Either select the application "Sliced" or [scan this QR code](https://expo.io/@rentresnext/projects/Sliced) to view the project inside Expo.

## How to install

Download the [back-end repository](https://github.com/2011-team-rentresnext/Bill-Splitter-Backend) in addition to this repository.

`npm install` inside each repo.

In the front-end repo, set the `AWS_URL` in the `secrets.js` file equal to your IP address appended with "/api/"

```
export const AWS_URL = '${YOUR_IP_ADDRESS}/api/'
```

Configure your own `.env` file in the root folder of the back-end repository. In addition to connecting a database and server, include an API key for Google Cloud Vision and a password to the account that you'll be sending notification emails with.

```
GOOGLE_CLOUD_API_KEY=<YOUR_KEY_HERE>
EMAIL_PASS=<YOUR_KEY_HERE>
```

`npm run seed && npm start-server` in the back-end repo.

`npm run start` in the front-end repo.

For information on how to download and set up the application using Serverless on AWS, check out the [back-end repository.](https://github.com/2011-team-rentresnext/Bill-Splitter-Backend)

## Built with

- React-Native and Expo to provide native application experience
- Google Cloud Vision to scan and transcribe receipts
- Hosted using Amazon Web Services and Express
- Nodemailer to send email notifications
- Redux for state management
- PostgresSQL relational database
- Sequelize to query database
