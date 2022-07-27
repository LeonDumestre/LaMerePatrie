const Client = require("./Structures/Client")
const config = require("./Data/config.json")
const fs = require('fs')
const bot = new Client()
const Discord = require('discord.js')

bot.start(config.token)


//Rôle Goulag : détection entrée sortie d'un vocal
bot.on('voiceStateUpdate', (oldState, newState) => {
  let newUserChannel = newState.voiceChannel
  let oldUserChannel = oldState.voiceChannel

  if (!newState.member.roles.cache.find(role => role.name === 'Goulag')) {
    if (oldState.channel === null && newState.channel !== null) {
      newState.member.voice.setMute(false)
    }
  }

  else {
    if (oldState.channel === null && newState.channel !== null) {
      newState.member.voice.setMute(true)
    }
  }
})
