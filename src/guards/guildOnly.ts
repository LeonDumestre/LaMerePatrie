import { CommandInteraction } from "discord.js"
import { GuardFunction } from "discordx"

import { getLocaleFromInteraction, L } from "@i18n"
import { replyToInteraction } from "@utils/functions"

/**
 * Prevent the command from running on DM
 */
export const GuildOnly: GuardFunction<CommandInteraction> = async (arg, client, next) => {

    const isInGuild = arg.inGuild()

    if (isInGuild) return next()
    else {
        await replyToInteraction(arg, L[getLocaleFromInteraction(arg)].GUARDS.GUILD_ONLY())
    }
}
