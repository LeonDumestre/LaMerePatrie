import { Category } from "@discordx/utilities"
import { CommandInteraction, EmbedBuilder } from "discord.js"
import { Client } from "discordx"
import { Discord, Slash } from "@decorators"
import { Guard } from "@guards"
import { getColor } from "@utils/functions"

@Discord()
@Guard()
@Category('General')
export default class BingoCommand {

    @Slash({
        name: 'bingo'
    })
    async bingo(
        interaction: CommandInteraction, 
		client: Client,
		{ localize }: InteractionData
    ) {
        const embed = new EmbedBuilder()
			.setTitle(localize.COMMANDS.BINGO.START.EMBED.TITLE())
			.setDescription(`*${localize.COMMANDS.BINGO.START.EMBED.DESCRIPTION()}*`)
			.setColor(getColor('primary'))

        interaction.followUp({ embeds: [embed] })
    }
}