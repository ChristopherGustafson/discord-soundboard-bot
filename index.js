const Discord = require('discord.js');

const bot = new Discord.Client();
const { token } = require('./config.json');
const soundCommands = ["!champpool", "!chrizzyb", "!dicken", "!flashlvl1", "!joellol", "!steppaupp", "!surrender", "!taggalångt", "!kaka", "!jane", "!astronomia", "!crab", "!sukdik", "!cock", "!trust", "!what", "!cum", "!slam", "!yes"];
var mentionReplies = ["nah dude", "hell nah", "probably", "not really", "hell yeah brotha", "yes", "no", "maybe", "xD", "most certainly", "no doubt", "lol are u fucking stupid?", "haha, fak u"]

bot.on('ready', () => {
  console.log(`Logged in as ${bot.user.tag}!`);
});

bot.on('message', msg => {

  if (msg.author.equals(bot.user)) return;

  if (msg.guild !== "undefined" && msg.guild) {

    // Check for votekick command
    if(msg.content.includes("!votekick") && msg.mentions.members.first().nickname) {
      
      const victim = msg.mentions.members.first();
      msg.reply("Votekick " + victim.displayName + "?").then(function (message) {

        // Check how many votes are needed, set to majority of how many people is in the voice channel
        const votesNeeded = (msg.member.voice.channel.members.size/2)+1;
 
        // React to show voting reaction options
        message.react("👍");
        message.react("👎");
        // Filter on thumbs up
        const filter = (reaction, user) => reaction.emoji.name === '👍';
        const collector = message.createReactionCollector(filter, { time: 15000 });
        collector.on('end', collected => {
          console.log(collected.get('👍').count);
          if(collected.get('👍').count > votesNeeded){
            // Send to aids
            msg.mentions.members.first().voice.setChannel("595337249063960577");
            msg.reply("He outie");
          }
          else{
            msg.reply("Not enough votes :(");
          }
        });
        }).catch(function() {
          console.log("Error replying to message");
      });
    }

    if (msg.mentions.has(bot.user)) {
      let index = Math.floor(Math.random() * mentionReplies.length);
      msg.reply(mentionReplies[index]);
      return;
    }
  }

  let voiceChannel;
  switch (msg.content) {

    case "ping":
      msg.channel.send("fak u", { tts: true });
      break;

    // Command for bot to leave channel
    case "!stop":
      voiceChannel = bot.voice.connections.first().channel;
      if(voiceChannel) {
        voiceChannel.leave();
        console.log("Left");
      }
      break;


      // Command to show all possible sound commands
    case "!commands":
      msg.channel.send("Possible commands: " + soundCommands.join(", "), { tts: true });
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