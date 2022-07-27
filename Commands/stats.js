
const Discord = require("discord.js")
const Command = require("../Structures/Command")
const fs = require('fs')
const humanizeDuration = require('humanize-duration')

module.exports = new Command({

    name: "stats",
    description: "",
    permission: "Aucune",

    async run(bot, message, args) {


        const idCmdBot = '758324686433812510'
        const idSpam = '783286918527713300'
        const idTestBot = '758419452462104617'

        if (message.channel.id != idCmdBot && message.channel.id != idSpam && message.channel.id != idTestBot) 
        return message.reply(`Tu ne peux pas afficher tes stats dans ce channel ! Va plutôt dans <#${idCmdBot}> ou dans <#${idSpam}>.`)

        let lien = './Data/stats.json'
        let fichier =  fs.readFileSync(lien)
        let stats = JSON.parse(fichier)

        let nbrMembres = stats.membres.length
        let membreExist = false
        let ind

        const embed = new Discord.MessageEmbed()

        let id, nom
        let mention
        if(!args[1]){
            id = message.member.id
            nom = message.author.tag
            mention = message.member
        }else{
            mention = message.mentions.members.first()
            if(mention){
                id = mention.id
                nom = mention.user.tag
            }
            else{
                return message.reply('Mentionne le camarade à inspecter.')
            }
        }

        for (let i = 0; i < nbrMembres; i++) {
            if (id == stats.membres[i].id) {
                membreExist = true
                ind = i
            }
        }

        
        nom = nom.substring(0, nom.indexOf('#'))

        let Ennemi = "", Cible = ""
        let nbrEnnemi = 0, nbrCible = 0
        if (membreExist) {
            let idEnnemi
            for (let i = 0; i < stats.membres[ind].goulag.ennemis.length; i++) {
                if (stats.membres[ind].goulag.ennemis[i].nbr > nbrEnnemi) {
                    idEnnemi = stats.membres[ind].goulag.ennemis[i].id
                    nbrEnnemi = stats.membres[ind].goulag.ennemis[i].nbr
                }
            }
            if (nbrEnnemi != 0)
                Ennemi = `Ton pire ennemi : <@${idEnnemi}>\n *Il t'a envoyé* ***${nbrEnnemi} fois*** *au goulag.*`
            
            let idCible
            for (let i = 0; i < stats.membres[ind].goulag.cibles.length; i++) {
                if (stats.membres[ind].goulag.cibles[i].nbr > nbrCible) {
                    idCible = stats.membres[ind].goulag.cibles[i].id
                    nbrCible = stats.membres[ind].goulag.cibles[i].nbr
                }
            }
            if (nbrCible != 0)
                Cible = `Ta cible préféré : <@${idCible}>\n *Tu l'as envoyé* ***${nbrCible} fois*** *au goulag.*`

            const shortHumanizer = humanizeDuration.humanizer({
                language: "shortFr",
                languages: {
                    shortFr: { d: () => "j", h: () => "h", m: () => "min", s: () => "sec" }
                }
            })

            tpsGoulag = shortHumanizer(stats.membres[ind].goulag.tpsPassé, { maxDecimalPoints: 0 }).replaceAll(',', '')

            let pluriel = ''
            if (stats.membres[ind].winBingo != 1)
                pluriel = 's'

            embed.setTitle(`📈 Statistiques de ${nom} 📈`)
                .setColor("#F79E58")
                .addField(`\u200B`, `**Ｂｉｎｇｏ :**ㅤ🎉 ${stats.membres[ind].winBingo} victoire${pluriel} 🎉`)
                //.addField(`🎉 Victoires`,stats.membres[ind].winBingo.toString(),false)
                
                .addField(`\u200B`, "**Ｇｏｕｌａｇ :**")

                .addField(`⛓️ Aller simple`,stats.membres[ind].goulag.nbrFoisAllé.toString(),true)
                .addField(`👮 Personnes envoyées`,stats.membres[ind].goulag.nbrFoisEnvoyé.toString(),true)
                .addField(`⌛ Temps passé`,tpsGoulag,true)
                
                //.addField(`\u200B`, "**Ｅｖｅｎｔ :**")

                //.addField("Retour à l'envoyeur",stats.membres[ind].goulag.nbrEvent.auteurEnvoyé.toString(),true)
                //.addField("Temps doublé",stats.membres[ind].goulag.nbrEvent.tpsDoublé.toString(),true)
                //.addField("Temps divisé",stats.membres[ind].goulag.nbrEvent.tpsDivisé.toString(),true)

            if (nbrEnnemi != 0)
                embed.addField(`\u200B`, Ennemi)
            if (nbrCible != 0)
                embed.addField(`\u200B`, Cible)

                embed.setThumbnail(mention.user.displayAvatarURL())
        }
        else {
            embed.setTitle(`📈 Statistiques de ${nom} 📈`)
                .setColor("#F79E58")
                .addField(`\u200B`, `**Ｂｉｎｇｏ :**ㅤ🎉 0 victoires 🎉`)
                
                .addField(`\u200B`, "**Ｇｏｕｌａｇ :**")

                .addField(`⛓️ Aller simple`,"0",true)
                .addField(`👮 Personne envoyé`,"0",true)
                .addField(`⌛ Temps passé`,"0 sec",true)
                .setThumbnail(mention.user.displayAvatarURL())
        }
        message.reply({ embeds: [embed] })

    }
})