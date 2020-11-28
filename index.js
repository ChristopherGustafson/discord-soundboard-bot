const Discord = require('discord.js');

const bot = new Discord.Client();
const { token } = require('./config.json');
const soundCommands = ["!champpool", "!chrizzyb", "!dicken", "!flashlvl1", "!joellol", "!steppaupp", "!surrender", "!taggalångt", "!kaka", "!jane", "!astronomia", "!crab", "!sukdik"];
var mentionReplies = ["nah dude", "hell nah", "probably", "not really", "hell yeah brotha", "yes", "no", "maybe", "xD", "most certainly", "no doubt", "lol are u fucking stupid?", "haha, fak u"]

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {

  if (msg.author.equals(bot.user)) return;

  if (msg.guild !== "undefined" && msg.guild) {


    if (msg.mentions.has(bot.user)) {
      let index = Math.floor(Math.random() * mentionReplies.length);
      msg.reply(mentionReplies[index]);
      return;
    }
  }

  let voiceChannel;
  switch (msg.content) {

    case "!stop":
      voiceChannel = msg.member.voice.channel;
      voiceChannel.leave();
      console.log("Left");
      break;

    case "!commands":
      msg.channel.send("Possible commands: " + soundCommands.join(", "), { tts: true });
      break;

    case "ping":
      msg.channel.send("fak u", { tts: true });
      break;

    case "<:joellol:693565923579134022>":
      if (msg.guild !== "undefined" && msg.guild) {
        voiceChannel = msg.member.voice.channel;
        if (typeof voiceChannel !== "undefined" && voiceChannel) {
          voiceChannel.join()
            .then(connection => {
              const dispatcher = connection.play(`./sounds/joellol.mp3`);
              dispatcher.on("end", end => voiceChannel.leave());
            })
            .catch(console.error);
        }
        else {
          msg.reply("Failed to join server");
        }
      }
      break;

    default:
      let sound = msg.content;
      console.log(`Trying to run command: ${sound}`);

      soundCommands.forEach(command => {
        if (sound === command) {
          if (msg.guild !== "undefined" && msg.guild) {     
            voiceChannel = msg.member.voice.channel;
            if (typeof voiceChannel !== "undefined" && voiceChannel) {
              voiceChannel.join()
                .then(connection => {
                  if (sound === "!joellol") {
                    msg.channel.send("<:joellol:693565923579134022>");
                  }
                  const dispatcher = connection.play(`./sounds/${sound.substr(1)}.mp3`);
                  dispatcher.on("end", end => voiceChannel.leave());
                })
                .catch(console.error);
            }
            else {
              msg.reply("Failed to join server");
            }
          }
        }
      });
      break;
  }
});

bot.login(token);