export const generalConfig: GeneralConfigType = {

	name: 'tscord', // the name of your bot
	description: '', // the description of your bot
	defaultLocale: 'en', // default language of the bot, must be a valid locale
	ownerId: process.env['BOT_OWNER_ID'] || '',
	timezone: 'Europe/Paris', // default TimeZone to well format and localize dates (logs, stats, etc)

	simpleCommandsPrefix: '!', // default prefix for simple command messages (old way to do commands on discord)
	automaticDeferring: true, // enable or not the automatic deferring of the replies of the bot on the command interactions

	// useful links
	links: {
		invite: 'https://discord.com/api/oauth2/authorize?client_id=895311879960924201&permissions=8&scope=bot%20applications.commands',
		supportServer: 'https://discord.gg/mVcYrPydRd',
		gitRemoteRepo: 'https://github.com/LeonDumestre/LaMerePatrie',
	},
	
	automaticUploadImagesToImgur: false, // enable or not the automatic assets upload

	devs: [], // discord IDs of the devs that are working on the bot (you don't have to put the owner's id here)

	eval: {
		name: 'bot', // name to trigger the eval command
		onlyOwner: false // restrict the eval command to the owner only (if not, all the devs can trigger it)
	},

	// define the bot activities (phrases under its name). Types can be: PLAYING, LISTENING, WATCHING, STREAMING
    activities: [
		{
			text: 'discord.js v14',
			type: 'PLAYING'
		},
		{
			text: 'some knowledge',
			type: 'STREAMING'
		}
	]

}

// global colors
export const colorsConfig = {

	primary: '#2F3136'
}
