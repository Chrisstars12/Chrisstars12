const axios = require('axios');
const supportedIds = ["rachel", "drew", "clyde", "paul", "domi", "dave", "fin", "sarah", "antoni", "thomas", "charlie", "george", "emily", "elli", "callum", "patrick", "harry", "liam", "dorothy", "josh", "arnold", "charlotte", "alice", "matilda", "matthew", "james", "joseph", "jeremy", "michael", "ethan", "chris", "gigi", "freya", "brian", "grace", "daniel", "lily", "serena", "adam", "nicole", "bill", "jessie", "sam", "glinda", "giovanni", "mimi"];

module.exports.config = {
	name: "voice",
	version: "1.0.0",
	credits: "none",
	role: 0,
	description: "Generate voice using AI",
	hasPrefix: false,
	usages: "{pn} (voice id) | texts\nExample: {pn} rachel | hey there\n{pn} list | Get the list of supported voice IDs",
	cooldown: 5,
	aliases: ["v","tts"],
};

module.exports.run = async function ({ api, args, event }) {
	const command = args.join(" ").split("|");
	if (command.length !== 2) {
		if (args[0].toLowerCase() === 'list') {
			return api.sendMessage(`Supported voice IDs are:\n ${supportedIds.join("\n")}`, event.threadID, event.messageID);
		}
		return api.sendMessage(`❌Invalid command format. Use it like this:\nvoice rachel | Hey there`, event.threadID, event.messageID);
	}

	const voiceId = command[0].trim().toLowerCase();
	const text = command[1].trim();

	if (!supportedIds.includes(voiceId)) {
		return api.sendMessage(`❌Invalid voice ID. Supported IDs are:\n ${supportedIds.join("\n")}`, event.threadID, event.messageID);
	}

	const apiKey = 'fuck';
	const apiUrl = `https://for-devs.onrender.com/api/voice?text=${encodeURIComponent(text)}&voiceid=${voiceId}&apikey=${apiKey}`;

	try {
		const response = await axios.get(apiUrl, { responseType: 'stream' });

		if (response && response.data) {
			return api.sendMessage({ attachment: response.data }, event.threadID, event.messageID);
		} else {
			return api.sendMessage('Failed to generate voice.', event.threadID, event.messageID);
		}
	} catch (error) {
		console.error(error);
		return api.sendMessage('Failed to generate voice.', event.threadID, event.messageID);
	}
};
