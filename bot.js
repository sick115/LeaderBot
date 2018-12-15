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
    var addInfo = message.content.split(" ")

    var guildRoles = getGuildRoles(message.guild)

    var guildRole = getGuildRole(message, guildRoles, addInfo)

    var userN = addInfo[1]
    
    var user = message.guild.members.find(val => val.displayName == userN)
    
    if(user != undefined && guildRole != 0){
        user.addRole(message.guild.roles.find(val => val === guildRole)).catch(reason => console.log(reason))
        message.channel.send(userN + " has been added to " + guildRole.name)
    }
    else{
        message.channel.send("User could not be found. Perhaps you misspelled something.")
    }
}
function remove(message){
    var addInfo = message.content.split(" ")

    var guildRoles = getGuildRoles(message.guild)

    var guildRole = getGuildRole(message, guildRoles, addInfo)
    
    var userN = addInfo[1]

    var user = message.guild.members.find(val => val.displayName == userN)
    
    if(user != undefined && guildRole != 0){
        user.removeRole(message.guild.roles.find(val => val === guildRole)).catch(reason => console.log(reason))
        message.channel.send(userN + " has been removed from " + guildRole.name)
    }
    else{
        message.channel.send("User could not be found")
    }
}

//get the guild role that the Guild Leader belongs to

function getGuildRole(message, guildRoles, addInfo){

    var guildRole
    
    for(var i = 0; i <= guildRoles.length - 1; i++){

        var role = message.member.roles.find(val => val == guildRoles[i])
        var statedRole = message.member.roles.find(val => val.name == addInfo[2])
        console.log(role)
        if(role != null && statedRole == null){
            
            guildRole = role
        }
        else if(statedRole != null){
            
            guildRole = statedRole
        }
        else{
            
            guildRole = 0
        }
    }
    if(guildRole == 0){
        message.channel.send("Could not find guild role. You need to have a guild role to use this command")
    }
    return guildRole
}

//get all the roles of a color, and returns them in an array. I picked the dark blue-ish color that all the guild roles are. 
//colorValue = 2123412

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