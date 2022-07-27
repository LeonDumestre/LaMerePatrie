
/** @format */

const Discord = require("discord.js");
const config = require("./Data/config.json");

const Event = require("./Structures/Event.js");

module.exports = new Event('messageReactionAdd', (client, reaction, user) => {
    console.log("test")
    const message = client.channels.cache.get("882675052770914305").messages.fetch("882967548260388894")
    if (!reaction.message.guild /*|| user.bot*/) return
    const reactionRoleElem = config.reactionRole[reaction.message.id]
    if (!reactionRoleElem) return
    const prop = reaction.emoji.id ? 'id' : 'name'
    const emoji = reactionRoleElem.emojis.find(emoji => emoji[prop] === reaction.emoji[prop])
    if (emoji) {
        //const role = member.guild.roles.cache.get("882957327752372236")
        //member.roles.add(role)
      //reaction.message.guild.member(user).roles.remove(emoji.roles)
      let role = reaction.guild.roles.cache.find(r => r.id === "882957327752372236");

        // The member you want to add the role to
        let member = reaction.members.first();

        // Add role to the member
        member.roles.add(role);
        //user.roles.add("882957327752372236").catch((e) => console.log(e));

      //reaction.message.guild.member(user).roles.add("882957327752372236")
      //reaction.users.remove(user)
    }
})