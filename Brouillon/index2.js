/*
const { send } = require('process')
const goulag = require('./commands/goulag')

const Discord = require('discord.js'),
  client = new Discord.Client({
    intents: []
  }),
  config = require('./config.json'),
  fs = require('fs'),
  cooldowns = new Map(),
  ytdl = require("ytdl-core")
const yts = require("yt-search");
var ytpl = require('ytpl');

client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')
const prefix = "!"


client.on('ready', () => {
  console.log('\x1b[33mLa Mère Patrie se reveille pour niquer des mères \x1b[0m')
})


//Les commandes
fs.readdir('./commands', (err, files) => {
  if (err) throw err
  files.forEach(file => {
    if (!file.endsWith('.js')) return
    const command = require(`./commands/${file}`)
    client.commands.set(command.name, command)
  })
})

var ladate = new Date()

client.on('message', message => {
  if (message.type !== 'DEFAULT' || message.author.bot) return

  const args = message.content.trim().split(/ +/g)
  const commandName = args.shift().toLowerCase()
  if (!commandName.startsWith(config.prefix)) return
  const command = client.commands.get(commandName.slice(config.prefix.length))
  if (!command) return
  const text = message.content
  console.log(`\x1b[90m${ladate.getDate()}/${ladate.getMonth() + 1} - ${ladate.getHours()}:${ladate.getMinutes()}\x1b[0m ||\x1b[36m Auteur : ${message.author.username} (${message.member.id})\x1b[0m ||\x1b[35m Channel : ${message.channel.name}\x1b[0m || "\x1b[3m\x1b[33m${text}\x1b[0m"`)
  command.run(message, args, client)
})

//Message lorsque qqun rejoint le serveur
client.on('guildMemberAdd', member => {
  member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
    .setDescription(`Bienvenue camarade ${member} ! Tu deviens le ${member.guild.memberCount}ème camarade ! :hammer_pick:`)
    .setColor('#ff0000'))
  member.roles.add(config.greeting.role)
})

//Message lorsque qqun quitte le serveur
client.on('guildMemberRemove', member => {
  member.guild.channels.cache.get(config.greeting.channel).send(new Discord.MessageEmbed()
    .setDescription(`${member.user.tag} a rejoint le camp de la vermine capitaliste... :money_with_wings:`)
    .setColor('#000'))
})

//Ajouter un rôle en cochant un emoji
client.on('messageReactionAdd', (reaction, user) => {
  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = config.reactionRole[reaction.message.id]
  if (!reactionRoleElem) return
  const prop = reaction.emoji.id ? 'id' : 'name'
  const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
  if (emoji) reaction.message.guild.member(user).roles.add(emoji.roles)
  else reaction.users.remove(user)
})

//Supprimer un rôle en décochant un emoji
client.on('messageReactionRemove', (reaction, user) => {
  if (!reaction.message.guild || user.bot) return
  const reactionRoleElem = config.reactionRole[reaction.message.id]
  if (!reactionRoleElem || !reactionRoleElem.removable) return
  const prop = reaction.emoji.id ? 'id' : 'name'
  const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
  if (emoji) reaction.message.guild.member(user).roles.remove(emoji.roles)
})


//Statut du BOT + channel Camarades : ...
client.on('ready', () => {

  let BINGO = {
    "channelbingo": 0,
    "nombregagnant": 0
  }
  let donnees = JSON.stringify(BINGO)
  fs.writeFileSync('bingo.json', donnees)

  client.user.setActivity('la populace', { type: 'WATCHING' })
  const guild = client.guilds.cache.get("757882116968022037");
  setInterval(function () {
    var memberCount = guild.memberCount
    var channel = client.channels.cache.get("808641133655228457")
    channel.setName(`Camarades : ${memberCount}`)
  }, 6e4);
})



//Rôle Goulag : détection entrée sortie d'un vocal
client.on('voiceStateUpdate', (oldState, newState) => {
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

var temps = false
var délais

client.on('message', message => {

  if (message.type !== 'DEFAULT' || message.author.bot) return

})
*/