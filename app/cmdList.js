const { vdCheckUp } = require('./actions/vdCheckUp');
const { reminder } = require('./actions/reminder');
const { weatherCheck } = require('./actions/weatherCheck');
const { crypto } = require('./actions/crypto');
const { humanizeDelta } = require('./helpers');
const { search } = require('./actions/search');
const { count } = require('./actions/count');
const { jsExec } = require('./actions/jsExec');
const { playing } = require('./actions/playing');

const cmdList = {
  '!ping': (message, event) => event.reply('pong!'),
  '!vd': (message, event) => vdCheckUp(message, event),
  '!echo': (message, event) => {
    if (event.nick.match(/zn|msks|vdk|cbot_git|Xn/)) {
      return;
    }
    let reply = message.replace(/!echo /, '');
    event.reply(reply);
  },
  '!remind': reminder,
  '!weather': weatherCheck,
  '!uptime': (message, event, vdk) => {
    const now = new Date();
    const connectionTime = vdk.getUptime();
    let timeUp = humanizeDelta(now - connectionTime);
    event.reply(timeUp);
  },
  '!crypto': (message, event) => crypto(message, event, false),
  '!coinbase': (message, event) => crypto(message, event, true),
  '!search': search,
  '!count': count,
  '!playing': playing,
  '!auth': (_, event) => event.reply('https://accounts.spotify.com/authorize?response_type=code&client_id=be947c6cf75b4e5c9f043ca9d01d3548&scope=user-read-currently-playing&redirect_uri=http%3A%2F%2Fvd.jurg.is%2Fspotify&state=' + event.nick)
};

module.exports = { cmdList };
