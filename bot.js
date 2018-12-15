const Discord = require("discord.js")
const auth = require("./auth.json")

const client = new Discord.Client();



client.on("ready", () => {
    
})

client.on("message", (message) => {
    
    var guildLeaderRole = message.guild.roles.find(val => val.name === "Guild Leader").id

    if(message.content.startsWith("add") && message.member.roles.has(guildLeaderRole)){
        add(message)
    }
    if(message.content.startsWith("remove") && message.member.roles.has(guildLeaderRole)){
        remove(message)
    }
})

function add(message){
    var guildRoles = getGuildRoles(message.guild)

    var guildRole = getGuildRole(message, guildRoles)

    var userN = message.content.slice(4, message.content.length)

    var user = message.guild.members.find(val => val.displayName == userN)
        
    if(user != undefined){
        user.addRole(message.guild.roles.find(val => val === guildRole)).catch(reason => console.log(reason))
        message.channel.send(userN + " has been added to " + guildRole.name)
    }
    else{
        message.channel.send("User could not be found")
    }
}
function remove(message){
    var guildRoles = getGuildRoles(message.guild)

    var guildRole = getGuildRole(message, guildRoles)

    var userN = message.content.slice(7, message.content.length)

    var user = message.guild.members.find(val => val.displayName == userN)
        
    if(user != undefined){
        user.removeRole(message.guild.roles.find(val => val === guildRole)).catch(reason => console.log(reason))
        message.channel.send(userN + " has been removed from " + guildRole.name)
    }
    else{
        message.channel.send("User could not be found")
    }
}

//search leader's roles to get the guild role that they represent

function getGuildRole(message, guildRoles){
    var guildRole
    for(var i = 0; i <= guildRoles.length; i++){

        var role = message.member.roles.find(val => val == guildRoles[i])

        if(role != undefined){
            guildRole = role
        }
    }
    return guildRole
}

//sorts guild roles by color, so they all need to be the same. color = 2123412

function getGuildRoles(guild){
    var roleArray = guild.roles.array()
    var guildRoles = []

    for(var i = 0; i <= roleArray.length; i++){
            
        if(roleArray[i] != undefined && roleArray[i].color == 2123412){
            guildRoles.push(roleArray[i])
        }
    }
    return guildRoles
}


client.login(auth.token)