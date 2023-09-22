/* eslint-disable */
import type { Translation } from '../i18n-types'

const fr = {
	GUARDS: {
		DISABLED_COMMAND: 'Cette commande est désactivée.',
		MAINTENANCE: 'Ce bot est en mode maintenance.',
		GUILD_ONLY: "Cette commande ne peut être utilisée qu'en serveur.",
		NSFW: 'Cette commande ne peut être utilisée que dans un salon NSFW.',
	},
	ERRORS: {
		UNKNOWN: 'Une erreur est survenue.',
	},
	SHARED: {
		NO_COMMAND_DESCRIPTION: 'Aucune description fournie.',
	},
	COMMANDS: {
		BINGO: {
			START: {
				EMBED: {
					TITLE: '🎉 LE BINGO COMMENCE !!! 🎉',
					DESCRIPTION: 'Trouve le nombre entre 1 et 100',
				},
			},
		},
		INVITE: {
			DESCRIPTION: 'Invitez le bot sur votre serveur!',
			EMBED: {
				TITLE: 'Invite moi sur ton serveur!',
				DESCRIPTION: "[Clique ici]({link}) pour m'inviter!",
			},
		},
		PREFIX: {
			NAME: 'prefixe',
			DESCRIPTION: 'Change le préfix du bot.',
			OPTIONS: {
				PREFIX: {
					NAME: 'nouveau_prefix',
					DESCRIPTION: 'Le nouveau préfix du bot.',
				},
			},
			EMBED: {
				DESCRIPTION: 'Prefix changé en `{prefix}`.',
			},
		},
		MAINTENANCE: {
			DESCRIPTION: 'Met le mode maintenance du bot.',
			EMBED: {
				DESCRIPTION: 'Le mode maintenance a été définie à `{state}`.',
			},
		},
		STATS: {
			DESCRIPTION: 'Obtiens des statistiques sur le bot.',
			HEADERS: {
				COMMANDS: 'Commandes',
				GUILDS: 'Serveurs',
				ACTIVE_USERS: 'Utilisateurs actifs',
				USERS: 'Utilisateurs',
			},
		},
		HELP: {
			DESCRIPTION: "Obtenez de l'aide globale sur le bot et ses commandes",
			EMBED: {
				TITLE: "Pannel d'aide",
				CATEGORY_TITLE: 'Commandes de {category}',
			},
			SELECT_MENU: {
				TITLE: 'Sélectionnez une catégorie',
				CATEGORY_DESCRIPTION: 'Commandes de {category}',
			},
		},
		PING: {
			DESCRIPTION: 'Pong!',
			MESSAGE: '{member} Pong! Le temps de réponse de la réponse était {time}ms.{heartbeat}',
		},
	},
} satisfies Translation

export default fr
