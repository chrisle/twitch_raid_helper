const tmi = require('tmi.js');

/**
 * Instructions:
 *
 * 1. Create an OAUTH password
 *    - Login to Twitch then in another tab go to https://twitchapps.com/tmi/
 *    - It will give you a special password for your bot.
 *
 * 2. Paste the special password below.
 *
 * 3. Type in the channels you want to have this bot running.
 *
 * 4. Edit how you want the bot repeat when it's raided
 *
 * 4. Run the bot using "node index.js"
 */
const USERNAME = 'my username here';
const PASSWORD = 'Paste your password in here';
const CHANNELS = [
  'channel1',
  'channel2',
  'channel3',
  'channel4',
  'channel5',
];

// Repeat the raid message every 3 minutes then stop after 15 minutes.
const RAID_REPEAT_EVERY = 3;
const RAID_REPEAT_STOP_AFTER = 15;

const client = new tmi.Client({
  options: { debug: true },
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: USERNAME,
    password: PASSWORD
  },
  channels: CHANNELS
});

client.connect().catch(console.error);

client.on('connected', (address, port) => {
  console.log('Conencted!');
});

client.on('message', (channel, tags, message, self) => {
  if (self) return;

  // Example bot command:

  // Command !botcommand
  // The bot will respond with "@<name> hows it going?"

  if (message.toLowerCase() === '!botcommand') {
    client.say(channel, `@${tags.username} hows it going?`);
  }

});

client.on('raided', (channel, username, viewers) => {

  const interval = setInterval(() => {
    client.say(`Welcome @${username} raiders!! Could you help out? ` +
    `Click this link to help your view count toward partner? ` +
    `https://twitch.tv/${channel}`);
  }, RAID_REPEAT_EVERY * 6000);

  setTimeout(() => {
    clearInterval(interval);
  }, RAID_REPEAT_STOP_AFTER * 6000);

});