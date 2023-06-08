# Receiptz
## _The app to track bets, wagers, and absurd predictions with your friends_
### [Work in Progress]

![Four screenshots of in-app pages](https://i.ibb.co/c1Ddbp3/Untitled-design.jpg)

![Technologies: React Native, Typescript, Rails (API), Expo](https://i.ibb.co/MkY6tJX/Untitled-design.png)

Receiptz is the app to record bets, wagers, and absurd predictions made by your friends so you can remind them when it comes time. Built on the Twitter API.

## Features

- Sign up with one click using your Twitter account
- Upload screenshots of your friends claims
- Set a reminder to show them the receipts
- Tweet direct from the app (**coming soon**)

## API

Receiptz utilizes a Ruby on Rails API to manage backend services. Check out the repo [here](https://github.com/iparkerhodge/receiptz-api)!

## Tech

Receiptz uses a number of open source projects to work properly:

- [React Native](https://reactnative.dev) - Native iOS and Android apps written in React
- [Expo](https://expo.dev/) - Platform for developing and testing iOS and Android apps
- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api) - Get account details and tweet from the app
- [Firebase JS](https://firebase.google.com/docs/reference/js) - Authentication and Storage with Google's Firebase SDK
- [Ruby on Rails](https://rubyonrails.org/) - Backend services via API
- [PostgreSQL](https://www.postgresql.org/) - Relational database services
- [Typescript](https://www.typescriptlang.org/) - Strongly typed JavaScript

## Installation
(Currently instructions are for Mac developers _and_ iOS users only)
##### Requirements
- Node (18.13.0)
- XCode and iOS Simulator
- [Wathcman](https://facebook.github.io/watchman/docs/install#buildinstall) (Mac users)

##### Recommended Tools
- Yarn
- VS Code and [VS Code Expo Extension](https://marketplace.visualstudio.com/items?itemName=expo.vscode-expo-tools)

##### Cloning the Repository
Navigate to your desired directory and run `git clone https://github.com/iparkerhodge/receiptz.git`

##### Installing Packages
Navigate to the project's root directory and run `yarn install`

##### Start the backend server
Head to [this repo](https://github.com/iparkerhodge/receiptz-api) and follow the instructions to clone and start the backend server

##### Start the iOS Simulator
run `npx expo run:ios` to open your iPhone simulator (_requires XCode_)

##### Play around in the app!

## Authentication
Currently this project is using client-side OAuth 2.0 PKCE Authorization Code flow for authentication. This is primarily because it's quick and easy to set up utilizing [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session) and works nicely with a native device browser. At the moment ccess tokens and refresh tokens are stored, unencrypted, in the device's async storage. Before a test release I intend to refactor to utilize [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore) to encrypt these tokens. Before a production release I intend to refactor the app's authentication services to utilize server-side authentication with Twitter and the app's API.

## For hiring managers and engineers
##### Files to check out
React & Typescript:
  - Reducer: [defined here](helpers/receipts.ts), [provider here](context/receiptContext.tsx), [called here](components/receipts/steps)

## Coming Soon
Features:
- In-app notifications on reminder date
- Save to camera roll
- Post to twitter
- Server-side authentication

I hope to have an iOS build deployed to TestFlight by the end of June. I intend to release v1.0.0 to the AppStore by the end of Q3.

### Thanks for checking out my project