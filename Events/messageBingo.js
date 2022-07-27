
// Event de vérification des messages de la commande Bingo

/** @format */

const Event = require("../Structures/Event.js")
const fs = require('fs')
const Discord = require('discord.js')

let temps, delai

module.exports = new Event("messageCreate", (bot, message) => {

	if (message.author.bot) return

    const embed = new Discord.MessageEmbed()
    let fichier =  fs.readFileSync('./Data/bingo.json')
    let bingo = JSON.parse(fichier)

    if (bingo.nombreGagnant !== 0 && message.channel.id === bingo.channelBingo) {
        const member = message.member
  
        //cooldown bingo
        let myVar = setInterval(function() {
          let fichier =  fs.readFileSync('./Data/bingo.json')
          let bingo = JSON.parse(fichier)
          if (bingo.nombreGagnant !== 0) {
              if (!temps){
                  delai = Date.now()+300000
                  temps = true
              }
              if (Date.now() >= delai) { 
                embed.setColor('Black').setTitle('\u26A0\uFE0F Le temps est écoulé, le 🎉 Bingo 🎉 est fini !').setDescription(`*Le nombre gagnant était : ${bingo.nombreGagnant}*`)
                bot.channels.cache.get(bingo.channelBingo).send({ embeds: [embed] })
                let BINGO = {
                    "channelBingo": 0,
                    "nombreGagnant": 0
                }
                let donnees = JSON.stringify(BINGO)
                fs.writeFileSync('./Data/bingo.json',donnees)
                temps = false
                clearInterval(myVar)
              }
            }
        }, 1000)
  
        if (message.content === bingo.nombreGagnant) {
          embed.setColor('GREEN').setDescription(`🎉 **BRAVO** ${member} 🎉 Tu as **gagné** !!! 🎊 \n *Le nombre gagnant était : ${bingo.nombreGagnant}*`)
          bot.channels.cache.get(bingo.channelBingo).send({ embeds: [embed] })
            let BINGO = {
                "channelBingo": 0,
                "nombreGagnant": 0
            }
          let donnees = JSON.stringify(BINGO)
          fs.writeFileSync('./Data/bingo.json',donnees)
          temps = false



        //Crée un membre et compléte winBingo
            let lien = './Data/stats.json'
            let fichier =  fs.readFileSync(lien)
            let stats = JSON.parse(fichier)
            let nbrMembres = stats.membres.length
            let membreExist = false
            let ind

            for (let i = 0; i < nbrMembres; i++) {
                if (message.member.id == stats.membres[i].id) {
                    membreExist = true
                    ind = i
                }
            }
            
            if (!membreExist) {
                let newMembre = {
                    "id": message.member.id,
                    "winBingo": 1,
                    "goulag": {
                        "nbrFoisAllé": 0,
                        "nbrFoisEnvoyé": 0,
                        "tpsPassé": 0,
                        "nbrEvent": {
                            "auteurEnvoyé": 0,
                            "tpsDoublé": 0,
                            "tpsDivisé": 0
                        },
                        "ennemis": [],
                        "cibles": []
                    },
                    "dateQuit": 0
                }

                stats.membres.push(newMembre)
                fs.writeFileSync(lien, JSON.stringify(stats))
                let date = new Date()
                console.log(`\x1b[90m${date.getDate()}/${date.getMonth() + 1} - ${date.getHours()}:${date.getMinutes()}\x1b[0m ||\x1b[36m ${message.author.username} (${message.member.id}) a été ajouté à la base de données.\x1b[0m`)
            }
            else {
                stats.membres[ind].winBingo++
                fs.writeFileSync(lien, JSON.stringify(stats))
            }

        }
    }
})
