const { SlashCommandBuilder } = require('@discordjs/builders');
const { request } = require('undici');

async function getJSONResponse(body) {
	let fullBody = '';
	for await (const data of body) {
		fullBody += data.toString();
	}
	return JSON.parse(fullBody);
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('rcat')
		.setDescription('just got a vivid random cat!'),
	async execute(interaction) {
		const catResult = await request('https://aws.random.cat/meow');
		console.log(catResult.statusCode);
		const { file } = await getJSONResponse(catResult.body);
		interaction.reply({ files: [{ attachment: file, name: 'cat.png' }] });
	},
};