// Load discord.js module
const Discord = require('discord.js');

// Load file system module
const fs = require('fs');

// Creates a bot client
const client = new Discord.Client();

// Load config values
const config = require('./config.json');

// Create commands collection
client.commands = new Discord.Collection();

// Create cooldown Collection
const cooldowns = new Discord.Collection();

// Load commands
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// On bot has started
client.on('ready', () => {
    console.log('Bot "' + client.user.username + '" started');
});

// On every message send
client.on('message', message => {
	if (message.author.bot)return;
	if (!message.content.startsWith(config.prefix)) {
		return randomReaction(message);
	}

	const args = message.content.slice(config.prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	if (command.args && !args.length) {
		let reply = `You didn't provide any arguments, ${message.author}!`;

		if (command.usage) {
			reply += `\nThe proper usage would be: \`${config.prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
	}

	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}

	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;

	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			return message.reply(`please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}

	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	try {
		command.execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
	
});

function randomReaction(message){
	console.log(message.content.split(" "))
	var obj = {
		'lol': "Hahahaha so funny, not",
		'shit': "I'm not shit",
		'rip': "Rust in pease",
	}
	var array = message.content.split(" ")
	array.forEach(element => {
		if(obj[element.toLowerCase()]){
			message.reply(obj[element.toLowerCase()]);
			break;
		}
	});
}
// Logs in on the bot
client.login(config.token);
