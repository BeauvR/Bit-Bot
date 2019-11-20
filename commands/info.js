// at the top of your file
const Discord = require('discord.js');

module.exports = {
	name: 'info',
	description: 'Shows information about the bot',
	cooldown: 10,
	guildOnly: true,
	execute(message) {
        let channel = message.channel;
        const EmbedMessage = new Discord.RichEmbed()
        .setColor('#0099ff')
        .setURL('https://discord.js.org/')
        .setAuthor('Bit Academy', 'https://i.imgur.com/cuISXIm.png', 'https://www.bit-academy.nl/')
        .setThumbnail('https://i.imgur.com/cuISXIm.png')
        .addField('Developer', 'Beau', true)
        .addField('Devised', 'Yari', true)
        .addField('Prefix', '!bit ', true)
        .setTimestamp()
        .setFooter('Created by BeauvR#2616', 'https://i.imgur.com/6DqyQvc.png');
    
        channel.send(EmbedMessage);
    }
}
