# Discord Event Time Fixer bot
Fixes the issue with Discord recurring events randomly switching their end times to before their start times thus causing the event to immediately end the moment it starts.

## Setup
* Create a new Discord app: https://discord.com/developers/applications?new_application=true
* The bot will need the Create Events and Manage Events permissions (found in the Installation section when creating a new Discord app)
* The bot will need the Server Members Intent Privileged Gateway Intent enabled (found in the Bot section when creating a new Discord app)
* The bot will need a token added to your .env file (rename the sample).  You can find the token in the Bot section when creating a new Discord app, look for the Reset Token button and copy the token it generates.
* Note: Currently the APP_ID and PUBLIC_KEY environment variables are unused.
* Install dependencies with `npm ci`.
* Use `npm run start` to run the bot.  This bot is designed to be run from an outside scheduler (e.g. cron or Kalarm) and so logs in, fixes the events, and immediately terminates.
* This bot was created with Node version 20
