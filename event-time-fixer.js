"use strict";

import 'dotenv/config';
import Discord from 'discord.js';

const client = new Discord.Client({intents: [
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.GuildScheduledEvents
]});

client.login(process.env.DISCORD_TOKEN).catch(console.error);

client.once("ready", async () => {
    const guilds = client.guilds.cache.map(guild => guild);
    for (let guildIdx in guilds) {
        let guildID = guilds[guildIdx].id;
        let guild = await client.guilds.cache.get(guildID);

        let scheduledEvents = guild.scheduledEvents.cache.map(scheduledEvent => scheduledEvent)
        for (let x in scheduledEvents) {
            let eventID = scheduledEvents[x].id
            let event = guild.scheduledEvents.cache.get(eventID);
            let startTime = event.scheduledStartTimestamp;
            let endTime = event.scheduledEndTimestamp;
            if (endTime - startTime < 0) { // the end time is before the start time
                // Discord seems to get the right offset when it messes up the end time,
                // but it's applied in the wrong direction.  So to fix it we calculate
                // the offset and create a new end time that is equal to the start time
                // plus the offset.
                let newEndTime = startTime + Math.abs(endTime - startTime);
                console.log(event);
                console.log(`Start Time: ${new Date(startTime)}`);
                console.log(`End Time: ${new Date(endTime)}`);
                console.log(`New End Time: ${new Date(newEndTime)}`);
                await event.setScheduledEndTime(
                    new Date(newEndTime)
                ).then(
                    guildScheduledEvent => console.log(`Set the end time to: ${guildScheduledEvent.scheduledEndTime}`)
                ).catch(
                    console.error
                );
            }
        }
    }

    console.log("Fixed Event Times!");
    process.exit(0);
});
