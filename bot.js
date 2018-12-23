const Discord = require("discord.js")
const auth = require("./auth.json")

const client = new Discord.Client();

var embed = new Discord.RichEmbed();

client.on("ready", () => {
    
})

client.on("message", (message) => {

    if(message.content.startsWith("add") && ((message.member.roles.find(val => val.name == "Guild Leader") != null) || (message.member.roles.find(val => val.name == "Mod") != null)) && message.member.roles.find(val => val.name == "Verified") != null){
        add(message)
    }
    if(message.content.startsWith("remove") && ((message.member.roles.find(val => val.name == "Guild Leader") != null) || (message.member.roles.find(val => val.name == "Mod") != null)) && message.member.roles.find(val => val.name == "Verified") != null){
        remove(message)
    }
    if(message.content == "gear"){
        createEmbed(message, embedInfo)
    }
})

function add(message){

    var addInfo = message.content.split(" ")

    var guildRoles = getAllGuildRoles(message.guild)
    var guildRole = getGuildRole(message, guildRoles, addInfo)

    var userN = addInfo[1] 
    var user = message.guild.members.find(val => val.displayName == userN)
    
    if(user != undefined && guildRole != 0 && user.roles.find(val => val.name == "Verified") != null){

        user.addRole(message.guild.roles.find(val => val === guildRole)).catch(reason => console.log(reason))

        message.channel.send(userN + " has been added to " + guildRole.name)
    }
    else if(user.roles.find(val => val.name == "Verified") == null){

        message.channel.send("User needs to be Verified")
    }
    else{

        message.channel.send("User could not be found. You either misspelled something, or you do not have a guild role.")
    }
}
function remove(message){
    var addInfo = message.content.split(" ")

    var guildRoles = getAllGuildRoles(message.guild)

    var guildRole = getGuildRole(message, guildRoles, addInfo)
    
    var userN = addInfo[1]

    var user = message.guild.members.find(val => val.displayName == userN)
    
    if(user != undefined && guildRole != 0){
        user.removeRole(message.guild.roles.find(val => val === guildRole)).catch(reason => console.log(reason))
        message.channel.send(userN + " has been removed from " + guildRole.name)
    }
    else{
        message.channel.send("User could not be found. You either misspelled something, or you do not have the respective guild role.")
    }
}

//get the guild role stated in the message

function getGuildRole(message, guildRoles, addInfo){

    var guildRole
    
    for(var i = 0; i <= guildRoles.length - 1; i++){

        var statedRole = message.member.roles.find(val => val.name == addInfo[2])
        
        if(statedRole != null){

            guildRole = statedRole
            
        }
        else if(statedRole == null){
            
            guildRole = 0
        }
        else{
            
            guildRole = 0
        }
    }
    return guildRole
}

//get all the roles of a color, and returns them in an array. I picked the dark blue-ish color that all the guild roles are. 
//colorValue = 2123412

function getAllGuildRoles(guild){
    var roleArray = guild.roles.array()
    var guildRoles = []

    for(var i = 0; i <= roleArray.length; i++){
            
        if(roleArray[i] != undefined && roleArray[i].color == 2123412){
            guildRoles.push(roleArray[i])
        }
    }
    return guildRoles
}





var embedInfo = {
"Current Gear for" : "Chris Goes Deep",
"Helmet" : "Maklain's Visor Toughness 54,Vitality 30,Healing 54,BoonDuration 30",
"Chest" : "Maklain's Breastplate Toughness 121,Vitality 67,Healing 121,BoonDuration 67",
"Shoulders" : "Maklain's Pauldrons Toughness 40,Vitality 22,Healing 40,BoonDuration 22",
"Leggings" : "Maklain's Tassets Toughness 81,Vitality 44,Healing 81,BoonDuration 44",
"Boots" : "Maklain's Greaves Toughness 40,Vitality 22,Healing 40,BoonDuration 22",
"Gloves" : "Maklain's Warfists Toughness 40,Vitality 22,Healing 40,BoonDuration 22",
"Ring1" : "Mist Band (Infused) Toughness 106  ,Vitality 56  ,Healing 106  ,BoonDuration 56",
"Ring2" : "Mist Band (Infused) Toughness 106  ,Vitality 56  ,Healing 106  ,BoonDuration 56",
"Accessory1" : "N/A",
"Accessory2" : "Mist Talisman Toughness 92  ,Vitality 49  ,Healing 92  ,BoonDuration 49",
"Amulet" : "Mist Pendant Toughness 133  ,Vitality 71  ,Healing 133  ,BoonDuration 71",
"WeaponA1" : "N/A",
"WeaponA2" : "Maklain's Bastion Toughness 108,Vitality 59,Healing 108,BoonDuration 59",
"WeaponB1" : "The Bifrost Toughness 215  ,Vitality 118  ,Healing 215  ,BoonDuration 118",
"WeaponB2" : "Maklain's Bastion Toughness 108,Vitality 59,Healing 108,BoonDuration 59",
"Backpack" : "Quiver of a Thousand Arrows Power 28  ,Precision 28  ,Toughness 28  ,Vitality 28  ,CritDamage 28  ,Healing 28  ,ConditionDamage 28"
}

var embed = new Discord.RichEmbed()

function createEmbed(message, fields){
    embed.title = fields[0]
    for(var i in fields){
        var broken = fields[i].replace(/,/g, "\n")
        embed.addField(i, broken)
    }
    message.channel.send(embed)
}





client.login(auth.token)