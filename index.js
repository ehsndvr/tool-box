const Discord = require('discord.js');
const config = require('./botconfig.json')
const ms = require('ms');
const fs = require('fs');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.on('ready', () => {
  client.user.setStatus('online')
  const guild = client.guilds.cache.get("Server ID");
  let status_num = 0
  setInterval(function () {
    if (status_num == 0) {
      client.user.setActivity(`تعداد کاربران ${guild.memberCount}`, { type: "WATCHING" })
      status_num += 1;
    }
    else if (status_num === 1) {
      client.user.setActivity('8help , For Show Help', { type: "LISTENING" });
      status_num++;
    }
    else {
      client.user.setActivity('The "YourServer" Server', { type: "PLAYING" });
      status_num = 0;
    }
  }, 3000);
  console.log(`Logged With  ${client.user.tag}`)
})
client.on('message', msg => {
  if (!msg.guild) return;//client.user.bot
  const args = msg.content.slice(config.PREFIX.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  let cmd = client.commands.get(`${command}`);
  if (cmd) {
    cmd.execute(msg);
  }
});

//===ban system ==================================================================================== 


// client.on('ready', () => {
//   console.log('kick system rady');
// });

// client.on('message', message => {
//   // Ignore messages that aren't from a guild
//   if (!message.guild) return;

//   // If the message content starts with "!kick"
//   if (message.content.startsWith('!kick')) {
//     // Assuming we mention someone in the message, this will return the user
//     // Read more about mentions over at https://discord.js.org/#/docs/main/master/class/MessageMentions
//     const user = message.mentions.users.first();
//     // If we have a user mentioned
//     if (user) {
//       // Now we get the member from the user
//       const member = message.guild.member(user);
//       // If the member is in the guild
//       if (member) {
//         /**
//          * Kick the member
//          * Make sure you run this on a member, not a user!
//          * There are big differences between a user and a member
//          */
//         member
//           .kick('Optional reason that will display in the audit logs')
//           .then(() => {
//             // We let the message author know we were able to kick the person
//             message.reply(`Successfully kicked ${user.tag}`);
//           })
//           .catch(err => {
//             // An error happened
//             // This is generally due to the bot not being able to kick the member,
//             // either due to missing permissions or role hierarchy
//             message.reply('I was unable to kick the member');
//             // Log the error
//             console.error(err);
//           });
//       } else {
//         // The mentioned user isn't in this guild
//         message.reply("That user isn't in this guild!");
//       }
//       // Otherwise, if no user was mentioned
//     } else {
//       message.reply("You didn't mention the user to kick!");
//     }
//   }
// });



client.login(config.TOKEN);