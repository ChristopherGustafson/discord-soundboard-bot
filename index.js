const Discord = require('discord.js');
const bot = new Discord.Client();

const { token } = require('./config.json');

function isLetter(str) {
  return str.length === 1 && str.match(/[a-z]/i);
}

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {
  let voiceChannel;
  switch (msg.content) {

    case "!stop":
      voiceChannel = msg.guild.channels.resolve("198883992550768641");
      voiceChannel.leave();
      console.log("Left");
      break;

    default:
      voiceChannel = msg.guild.channels.resolve("198883992550768641");
      if (typeof voiceChannel !== "undefined" && voiceChannel) {
        voiceChannel.join()
          .then(connection => {
            let sound = msg.content;

            if (sound.charAt(0).toUpperCase() != sound.charAt(0).toLowerCase()) {
              console.log(sound);
              const dispatcher = connection.play(`./sounds/${sound.substr(1)}.mp3`);
              dispatcher.on("end", end => voiceChannel.leave());
            }
          })
          .catch(console.error);

      }
      else {
        msg.reply("Failed to join server");
      }
      break;

    case "!stop":
      voiceChannel = msg.guild.channels.resolve("198883992550768641");
      voiceChannel.leave();
      break;
  }
});

bot.login(token);