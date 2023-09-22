import { CommandInteraction } from "discord.js"

/**
 * Abstraction level to reply to either a slash command message.
 * @param interaction 
 * @param message 
 */
export const replyToInteraction = async (interaction: CommandInteraction, message: string | {[key: string]: any}) => {
    
    if (interaction instanceof CommandInteraction) await interaction.followUp(message)
}