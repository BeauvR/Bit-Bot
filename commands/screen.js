const fs = require('fs');

module.exports = {
	name: 'screen',
	description: 'Create a screen share link. Only works if you are in a voice channel',
	cooldown: 0,
	guildOnly: true,
	execute(message) {
    let voicechannel = message.member.voiceChannelID
    if (voicechannel) {
      message.reply("You can use the link below to share the screen \n https://discordapp.com/channels/" + message.guild.id + "/" + voicechannel)
    } else {
      message.reply("To use this command you need to be in a voicechannel in the " + message.guild.name + " discord")
    }
  }
}
