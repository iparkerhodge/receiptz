# Receiptz API
## _The app to track bets, wagers, and absurd predictions with your friends_
### [Work in Progress]

![Four screenshots of in-app pages](https://i.ibb.co/c1Ddbp3/Untitled-design.jpg)

The API to handle backend services for the [Receiptz](https://github.com/iparkerhodge/receiptz) app.

## Installation (MacOS)
##### Recommended Tools
- Homebrew
- A Ruby version manager: [RVM](http://rvm.io) or [rbenv](https://github.com/rbenv/rbenv)

##### Requirements
- Ruby 2.7.7
- Rails 7.0.5
- PostgreSQL 14.8

##### Cloning the Repository
Navigate to your desired directory and run `git clone https://github.com/iparkerhodge/receiptz-api.git`

##### Installing Ruby
run `rvm install ruby-2.7.7` or `rbenv install 2.7.7`

Both tools should automatically detect the `.ruby-version` file in the project folder and switch to
using the correct version of Ruby for all calls made within the project.

##### Installing PostgreSQL
This project requires [PostgreSQL](https://www.postgresql.org) 14.

In your terminal, run `brew install postgresql@14`

Then, we'll want to add the following to your `.zshrc`:

```
export PATH=/opt/homebrew/opt/postgresql@14/bin:$PATH
```

Once the database is running, create the application user:
```
psql template1
CREATE USER app WITH PASSWORD 'password';
ALTER USER app SUPERUSER;
```

##### Ruby Dependencies
Ruby dependencies are managed with [Bundler](https://bundler.io/).

From within your root directory install Bundler with `gem install bundler`.

Then run `bundle install`.

##### Creating the database
Run `rails db:create` to create the database.

Then run `rails db:migrate`

##### Starting the server
Run `rails s` to start the server.

##### Running the Application
Head to [this repository](https://github.com/iparkerhodge/receiptz) and start your iPhone emulator to login with Twitter and use the App.

## Routes
The routes for the API are defined in the [routes.rb](config/routes.rb) file. Currently the available routes are:

**Auth**
- POST: /sign_up (sign up a new user using their Twitter account)
- POST: /login (log in an existing user with their Twitter account)

**Receipts**
- POST: /receipts (create a new receipt) [see the required parameters at receipts_controller.rb:29](app/controllers/receipts_controller.rb)
- GET: /receipts/:user_id/list (list the users receipts)

## Twitter API
The file [twitter_api.rb](app/services/twitter_api.rb) is a simple service to interface with the Twitter Developer API. Currently it only:
- gets the authenticated user's twitter profile details (id, username, display name, profile image)
- retrieves a new access token with a refresh token

## Coming Soon
- server-side authentication utilizing [Devise](https://github.com/heartcombo/devise), JWT and OAuth 2.0 with Twitter
- updating a user's saved receipts
- posting receipts to twitter on behalf of user
- production deployment to Heroku
- scheduled rake task to notify users of the reminder they've set on a receipt

## Tech

The Receiptz API uses a number of open source projects to work properly:

- [Twitter API v2](https://developer.twitter.com/en/docs/twitter-api) - Get account details and tweet from the app
- [Ruby on Rails](https://rubyonrails.org/) - Backend services via API
- [PostgreSQL](https://www.postgresql.org/) - Relational database services

## Authentication
Currently this project is using client-side OAuth 2.0 PKCE Authorization Code flow for authentication. This is primarily because it's quick and easy to set up utilizing [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session) and works nicely with a native device browser. At the moment ccess tokens and refresh tokens are stored, unencrypted, in the device's async storage. Before a test release I intend to refactor to utilize [expo-secure-store](https://docs.expo.dev/versions/latest/sdk/securestore) to encrypt these tokens. Before a production release I intend to refactor the app's authentication services to utilize server-side authentication with Twitter and the app's API.
