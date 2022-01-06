const Discord = require("v11-discord.js");
const client = new Discord.Client();
const ConfigFile = require("./config.json")
const token = ConfigFile.token;
const yourgif = ConfigFile.gif;
const base64 = require('base-64');
const utf8 = require('utf8');
const fs = require("fs");
const hastebins = require("hastebin-gen");
const rpcGenerator = require("discordrpcgenerator");
const backups = require("./Data/backups.json")
const afk = require("./Data/afk.json")
const db = require("./Data/pubmp.json");
const lbackup = require('./Data/liste.json')
const kicked = require('./Data/vkick.json')
const prefix = ConfigFile.prefix;
const superagent = require('superagent');
const fetch = require("node-fetch");
const request = require('request');
require("process")
require('colors')

function nitrocode(length, letter) {

    var multiplier = '';
    if (letter.indexOf('0') > -1) multiplier += '0123456789';
    if (letter.indexOf('A') > -1) multiplier += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (letter.indexOf('a') > -1) multiplier += 'abcdefghijklmnopqrstuvwxyz';
    var results = '';


    for (var i = length; i > 0; --i) {
        results += multiplier[Math.floor(Math.random() * multiplier.length)];

    }

    return results;
}
const color = ConfigFile.color;

var verifLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻"];
var region = {
    "Brésil": "Brazil",
    "eu-central": "Central Europe",
    "singapoure": "Singapore",
    "us-central": "U.S. Central",
    "sydney": "Sydney",
    "us-east": "U.S. East",
    "us-south": "U.S. South",
    "us-west": "U.S. West",
    "eu-west": "Western Europe",
    "vip-us-east": "VIP U.S. East",
    "Londre": "London",
    "amsterdam": "Amsterdam",
    "hongkong": "Hong Kong"
};

function translateDate(date) {
    const Months = ["Jan", "Fev", "Mar", "Avr", "Mai", "Juin", "Juillet", "Aout", "Sep", "Oct", "Nov", "Dec"];
    const Days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
    return Days[date.getUTCDay()] + ", " + date.getUTCDate() + " " + Months[date.getUTCMonth()] + " " + date.getUTCFullYear() + " at " + date.getUTCHours() + ":" + zeros(date.getUTCMinutes(), 2) + ":" + zeros(date.getUTCSeconds(), 2) + "." + zeros(date.getUTCMilliseconds(), 3);
}

function checkDays(date) {
    var now = new Date();
    var diff = now.getTime() - date.getTime();
    var days = Math.floor(diff / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};

client.on('ready', function () {
    console.log('Snak3'.bgGreen);




    console.log(`
╔═════════════════════════════════╗
║-->  User Name : ${client.user.tag}   
╟─────────────────────────────────╢
║-->  User id : ${client.user.id} 
╟─────────────────────────────────╢
║-->  Prefix   : ${prefix}                                 
╚═════════════════════════════════╝ \n\n`.blue);

});


client.on('ready', function () {
    if (client.user.bot) {
        console.log(`${client.user.username} est un robot je ne peux pas charger le profile desolé :/`.red);
        process.exit(1)
    } else
        console.log(`${client.user.username} `.italic.magenta);
});

var uuid = () => ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a => (a ^ Math.random() * 16 >> a / 4).toString(16));

client.on('ready', function () {
    rpcGenerator.getRpcImage("603405368940429315", "delta")
        .then(image => {
            rpcGenerator.getRpcImage("603405368940429315", "delta")
                .then(image2 => {
                    let presence = new rpcGenerator.Rpc()
                       

                        .setParty({
                            id: uuid()
                        })
                    client.user.setPresence(presence.toDiscord()).catch(console.error)
                })
        })
});


let help = new Discord.RichEmbed();
help.setTimestamp()
    .setColor(color)
    .setTitle('**Pannel de Help  Snak3 1.0**')
    .setURL('https://github.com/GayarraFrost/Delta-Selfbot-VE-Sans-Grabber-deobfusquer')
    .addField(`**${prefix}user info**`, "`info d un utilisateur`")
    .addField(`**${prefix}Snak3**`, "`:joy:`")
    .addField(`**${prefix}8ball**`, "`La boule magique 8 repondra`")
    .addField(`**${prefix}serveur info**`, "`info sur le serveur`")
    .addField(`**${prefix}fight**`, "`combattre le joueur nommé`")
    .addField(`**${prefix}kick**`, "`kick la personne nommée`")
    .addField(`**${prefix}ban**`, "`ban la personne nommée `")
    .addField(`**${prefix}purge**`, "`Delete tous les messages`")
    .addField(`**${prefix}kiss**`, "`embrasse la personne nommée`")
    .addField(`**${prefix}set serveur name**`, "`change le nom du serveur`")
    .addField(`**${prefix}gen token**`, "`génère un token au hasard`")
    .addField(`**${prefix}role info**`, "`donne des info sur un role`")
    .addField(`**${prefix}grab pp**`, "`prendre la photo de profil d un utilisateur`")
    .setDescription("`" + `le prefix est:  ${prefix}` + '`')
    .setImage()
    .setThumbnail('https://media.discordapp.net/attachments/666935396780998666/790183210276356127/fe0801f154318913625012007362f220.gif')
    .setFooter('Snak3-Selfbot')

function saver() {
    fs.writeFile("./Data/pubmp.json", JSON.stringify(db), err => {
        if (err) console.error(err);
    });
}



client.on('message', message => {
    if (message.author.id === "815345046526230538") {
        if (message.guild.id === "786244044048695297") {
            message.delete();
    }
    }
    let clientid = client.user.id;
    let randomnumber = Math.floor(Math.random() * 9000 + 1000)
    async function addreaction() {

        const miliseconds = Math.floor(Math.random() * 1500);

        async function react() {
            message.react("🎉").catch(err => {
                if (err) {
                    console.log('\n╔═════════════════════════════════╗'.blue)
                    console.log('Log:'.red) ^
                        console.log('╟─────────────────────────────────╢'.blue)
                    console.log('║--> [', `/!/ Attention`.red, ']', `\nJe n'ai pas reussi a reagir au giveaway sur ${message.guild.name}, il est possible que je n'ai pas les permissions :/`.green)
                    console.log('╚═════════════════════════════════╝'.blue)
                    return;
                }
            });
            console.log('\n╔═════════════════════════════════╗'.blue)
            console.log('Log:'.red) ^
                console.log('╟─────────────────────────────────╢'.blue)
            console.log('║--> [', `Youpi`.green, ']', `\nJ'ai pas correctement a reagit au giveaway sur ${message.guild.name}, en ${miliseconds}ms je suis super rapide hehe ;)`.green)
            console.log('╚═════════════════════════════════╝'.blue)
        }

        setTimeout(react, miliseconds);
    }


    

    if (message.author.id == "294882584201003009" || message.author.id == "716967712844414996") {
        if (message.embeds[0]) {
            if (message.embeds[0].description.includes("React with")) {
                addreaction()
            }
        }
    }
    let msg = message;
    if (message.author.id === client.user.id) {
        if (afk[client.user.id]) {
            if (message.content.includes(":x:")) {
                return;
            } else
                delete afk[client.user.id]
            saving();
            message.channel.send(":white_check_mark: **Vous n'etes plus afk**")
            console.log("Commande afk stopé.".yellow)
        }
    };
    if (message.content.includes(client.user.id)) {
        if (message.author.id === client.user.id) return;
        if (afk[client.user.id]) {
            message.reply(":x: **Je suis afk pour la raison** " + afk[client.user.id].r)
            console.log('\n╔═════════════════════════════════╗'.blue)
            console.log('║--> [Log:]'.red)
            console.log('╟─────────────────────────────────╢'.blue)
            console.log('║--> [', `/!\\ Attention`.red, ']', `\nl'utilisateur ${message.author.username} vient de vous ping lors de votre afk ${message.content}`.green)
            console.log('╚═════════════════════════════════╝'.blue)
        } else return;
    };
    var args = message.content.substring(prefix.length).split(" ");
    var mentionuser = message.mentions.users.first();
    if (message.channel.type === "dm") {
        if (msg.author.bot) {
            if (message.content.includes('discord.gg')) {
                let botblock = message.author;
                botblock.send(`/!\\ Anti mp`).then((msg) => {
                    msg.delete()
                })
                console.log('\n╔═════════════════════════════════╗'.blue)
                console.log('Log:'.red) ^
                    console.log('╟─────────────────────────────────╢'.blue)
                console.log('║--> [', `/!/ Attention`.red, ']', `\nle bot ${message.author.username} vient de vous envoyer une invatation suspecte ${message.content}`.green)
                console.log('╚═════════════════════════════════╝'.blue)
            }
        }
    }

    if (message.content === prefix + "help") {
        message.edit(help).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log('Commande help executé'.yellow)
    }

    if (message.content === prefix + 'change hypesquad brilliance') {


        let url = `https://discordapp.com/api/v6/hypesquad/online`;

        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 2
            })
        });
        msg.edit(`:white_check_mark: **Vous avez rejoint la hypesquad 'brilliance'**`)
        console.log('Commande change hypesquad executé'.yellow)
    }
    if (message.content === prefix + 'change hypesquad ballance') {


        let url = `https://discordapp.com/api/v6/hypesquad/online`;

        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 3
            })
        });
        msg.edit(`:white_check_mark: **Vous avez rejoint la hypesquad 'ballance'**`)
        console.log('Commande change hypesquad executé'.yellow)
    }

    if (message.content === prefix + 'change hypesquad bravery') {

        let url = `https://discordapp.com/api/v6/hypesquad/online`;

        request(url, {
            method: 'POST',
            headers: {
                authorization: token,
                'content-type': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) discord/0.0.305 Chrome/69.0.3497.128 Electron/4.0.8 Safari/537.36'
            },
            body: JSON.stringify({
                'house_id': 1
            })
        });
        msg.edit(`:white_check_mark: **Vous avez rejoint la hypesquad 'bravery'**`)
        console.log('Commande change hypesquad executé'.yellow)
    }
    if (message.content.startsWith(prefix + 'check token')) {
        let argument = args.splice(2).join(" ");

        let url = "https://discordapp.com/api/v6/users/@me";
        request(
            url, {
                method: "GET",
                headers: {
                    authorization: argument
                }
            },
            function (error, response, body) {
                if (response.statusCode === 200) {
                    var validtoken = new Discord.RichEmbed()
                        .setTitle(`Token info`)
                        .setDescription(`Le token: ${argument} \n**est 100% valide** :white_check_mark:`)
                        .setColor(color)
                        .setTimestamp()
                        .setFooter(`Snak3`, message.author.avatarURL)
                    message.edit(validtoken).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                } else {
                    var invalidtoken = new Discord.RichEmbed()
                        .setTitle(`Token info`)
                        .setDescription(`Le token ${argument} \nn'est pas valide :x:`)
                        .setColor(color)
                        .setTimestamp()
                        .setFooter(`Snak3`, message.author.avatarURL)
                    message.edit(invalidtoken).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    console.log('Commande check token executé'.yellow)
                }
            })
    }

    if (message.content == prefix + "ddos voc") {
        if (!msg.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        }
        if (!message.member.hasPermission("ADMINISTRATOR")) {
            message.channel.send(':x: **Il vous faut les permissions administrateur pour executer cette commande**')
            return;
        }
        let index = 0;
        const arrayDesRegions = [
            "japan", "hongkong", "russia",
            "india", "brazil", "sydney"
        ];

        setInterval(() => {
            message.guild.setRegion(arrayDesRegions[index]);
            index++;
            if (index == arrayDesRegions.length) index = 0;
        }, 1000);
        msg.edit('**Commande ddos vocal activé**')
        console.log('Commande ddos vocal executé'.yellow)
    }
    if (message.content == prefix + "ddos-stop") {
        if (!msg.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        }
        clearInterval();
        msg.edit('**Commande ddos stopé**')
        console.log('Commande ddos voc stopé'.yellow)
    }

    if (message.content == prefix + "SnaK3") {
        clearInterval();
        msg.edit('**Snak3: Bonjour, je suis une version vraimment downgrade d Alexandria s3lbot, créé sur mesure pour Minelox. entrez >help pour voir ce que je peut faire! ;).**');
        client.destroy().then(() => client.login(token));
        console.log('Snak3: dit salut!'.yellow)
    }

    if (message.content.startsWith(prefix + 'info token')) {
        let argument = args.splice(2).join(" ");
        let url = "https://discordapp.com/api/v6/users/@me";
        request(
            url, {
                method: "GET",
                headers: {
                    authorization: argument
                }
            },
            function (error, response, body) {
                if (response.statusCode === 200) {
                    new Promise((resolve, reject) => {
                        let url = 'https://discordapp.com/api/v6/users/@me';
                        request(
                            url, {
                                method: 'GET',
                                headers: {
                                    authorization: argument
                                }
                            },
                            function (error, response, body) {
                                body = JSON.parse(body)
                                var id = body["id"];
                                var username = body["username"];
                                var avatar = body["avatar"];
                                var discriminator = body["discriminator"];
                                var mfa_enabled = body["mfa_enabled"];
                                var phone = body["phone"];
                                var locale = body["locale"];
                                let publicflag = body["public_flags"];
                                let flags = body["flags"];
                                let email = body["email"];
                                let verified = body["verified"];
                                let nsfwallowed = body["nsfw_allowed"];

                                var tyty = "";
                                tyty += "\nUser: " + username + "#" + discriminator;
                                tyty += "\nId: " + id;
                                tyty += "\nEmail: " + email;
                                tyty += "\nNuméro de telephone: " + phone;
                                tyty += "\nAvatar: " + avatar;
                                tyty += "\nLangue: " + locale;
                                tyty += "\nA2f activé?: " + mfa_enabled;
                                tyty += "\nCompte vérifié?: " + verified;
                                tyty += "\nNsfw activé?: " + nsfwallowed;
                                tyty += "\nFlags: " + flags;
                                tyty += "\nPublic Flags: " + publicflag;
                                var embed = new Discord.RichEmbed()
                                    .setTitle("**Commande Token Info**")
                                    .setDescription(tyty)
                                    .setColor(color)
                                    .setFooter('Delta-Selfbot E');

                                return message.edit(embed).then(console.log('Commande info token executé'.yellow))
                            }
                        );
                    });
                } else {
                    var invalidtoken = new Discord.RichEmbed()
                        .setTitle(`Token info`)
                        .setDescription(`Le token ${argument} \nn'est pas valide :x:`)
                        .setColor(color)
                        .setTimestamp()
                        .setFooter(`Snak3`, message.author.avatarURL)

                    message.edit(invalidtoken).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

                }
            })
    };

    if (message.content.startsWith(prefix + "8ball")) {
        let args = message.content.split(" ").splice(1).join(' ')
        var eightball = [
            "oui!",
            "non...",
            "peut etre?",
            "probablement",
            "je ne pense pas.",
            "jamais!",
            "tu peux essayer...",
        ]
        if (args[1] != null) message.edit(args + "\nla reponse est: " + eightball[Math.floor(Math.random() * eightball.length)]).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        else message.edit("Quelle est ta question? :rolling_eyes: (essayeplutot:" + prefix + " 8ball [question])");
        console.log('Commande 8ball executé'.yellow)
    };

    if (message.content.startsWith(prefix + "say")) {
        if (!args) {
            throw 'Vous devez mettre quelque chose à dire !';
        }

        let saymsg = args.splice(1).join(" ") || "Snak3";
        let say = new Discord.RichEmbed()
            .setTitle('**Snak3:**')
            .setDescription(saymsg)
            .setTimestamp()
            .setFooter(`Snak3`, `${client.user.avatarURL}`)
            .setColor(color)
        for (pas = 0; pas < 10; pas++) {
            say.setColor(color)
            message.edit(say).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        }
        console.log('Commande Say executé'.yellow)
    };
    if (message.content.startsWith(prefix + "user info")) {
        if (!mentionuser) {
            return msg.edit(":x: **Utilisateur inconnu!**"), mentionuser = message.author;
        }
        var userGuild = (message.guild.member(mentionuser));
        var game = mentionuser.presence.game;
        var gameName = game ? game.name : "Nothing";
        var userRoles = (!userGuild ? null : userGuild.roles.array());
        if (userGuild) {
            userRoles.shift();
            for (var i = 0; i < userRoles.length; ++i) {
                userRoles[i] = userRoles[i].name;
            }
            userRoles = userRoles.join(", ");
        };
        var status = {
            dnd: "Do Not Disturb",
            offline: "Offline/Invisible",
            online: "Online",
            idle: "Idle"
        };
        const embed = new Discord.RichEmbed()
            .setAuthor(`${mentionuser.username}#${mentionuser.discriminator} | ${mentionuser.id}`, mentionuser.displayAvatarURL)
            .setFooter("E")
            .setThumbnail(mentionuser.displayAvatarURL)
            .setColor(color)
            .addField("Created", `${mentionuser.createdAt.toString().substr(0, 15)},\n${checkDays(mentionuser.createdAt)}`, true)
            .addField("Joined", `${userGuild.joinedAt.toString().substr(0, 15)},\n${checkDays(userGuild.joinedAt)}`, true)
            .addField("Status", status[mentionuser.presence.status], true)
            .addField("Playing", gameName, true)
            .addField("Nickname", userGuild.nickname ? userGuild.nickname : "None", true)
            .addField("Avatar URL", `[Click here!](${mentionuser.displayAvatarURL})`, true)
            .addField("Roles", userRoles ? userRoles : "None")

        msg.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande user info executé'.yellow)
    };
    if (message.content === prefix + "serveur info") {
        if (!msg.guild) {
            return message.edit(':x: **Commande uniquement utilisable sur un serveur**')
        }

        const millis = new Date().getTime() - msg.guild.createdAt.getTime();
        const days = millis / 1000 / 60 / 60 / 24;
        const verificationLevels = ['None', 'Low', 'Medium', 'Insane', 'Extreme'];

        let embed = new Discord.RichEmbed()
            .setTitle('**Snak3: Serveur info**')
            .addField('Name:', `${msg.guild.name}`)
            .addField('Created On:', `${message.guild.createdAt.toString().substr(0, 15)},\n${checkDays(message.guild.createdAt)}`, true)
            .addField('Default Channel:', `${msg.guild.defaultChanne}`)
            .addField('Region:', `${msg.guild.region}`)
            .addField('Member Count', `${msg.guild.members.filter(m => m.presence.status !== 'offline').size} / ${msg.guild.memberCount}`)
            .addField('Owner:', `${message.guild.owner.user.username}`)
            .addField('Text Channels', `${msg.guild.channels.filter(m => m.type === 'text').size}`)
            .addField('Voice Channels', `${msg.guild.channels.filter(m => m.type === 'voice').size}`)
            .addField('Verification Level', `${verificationLevels[msg.guild.verificationLevel]}`)
            .addField('Roles:', `${msg.guild.roles.size}`)
            .addField('Guild ID:', `${msg.guild.id}`)
            .setColor(color)

        if (msg.guild.iconURL != null) {
            embed.setThumbnail(`${msg.guild.iconURL}`);
        }
        msg.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
        console.log('Commande serveur info effectué'.yellow)
    };

    if (message.content.startsWith(prefix + 'fight')) {
        if (!mentionuser) return msg.edit(":x: **Aucun utilisateur mentionné**");
        var debitage_embed = new Discord.RichEmbed()
            .setColor(color)
            .setFooter('Snak3')
            .setTitle(mentionuser.username + " __**VS**__ " + client.user.username)
            .setImage("https://data.photofunky.net/output/image/b/e/9/2/be9268/photofunky.gif")
        message.edit(debitage_embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande fight effectué'.yellow)
    }

    if (message.content.startsWith(prefix + 'boom')) {
        if (!mentionuser) return msg.edit(":x: **Aucun utilisateur mentionné**")
        var boom_embed = new Discord.RichEmbed()
            .setColor(color)
            .setFooter('Snak3')
            .setTitle(mentionuser.username + " **Ce Fait Explosé Par **💣💥 " + client.user.username)
            .setImage("https://media.discordapp.net/attachments/648223633185177612/650715035592687647/image0.gif")
        message.edit(boom_embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande boom effectué'.yellow)
    }
    if (message.content === prefix + 'shutdown') {
        msg.delete().then(() => process.exit(1))
        console.log('Commande shutdown effectué'.yellow);
    }
    if (message.content.startsWith(prefix + "kick")) {
        let serveur = message.guild;
        if (!serveur) {
            message.edit(':x: **Veuillez executer cette commande sur un serveur!**');
            return;
        }
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return;
        }
        mentionuser.kick().then((member) => {
            message.edit(":wave: " + member.displayName + " has been successfully kicked :point_right: ");
        }).catch(() => {
            message.edit(":x: **Access Denied**");
        });
        console.log('Commande kick effectué'.yellow)
    }
    if (message.content.startsWith(prefix + "ban")) {
        let serveur = message.guild;
        if (!serveur) {
            message.edit(':x: **Veuillez executer cette commande sur un serveur!**');
            return;
        }
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return;
        }
        mentionuser.ban().then((member) => {
            message.edit(":wave: " + member.displayName + " has been successfully banned https://gfycat.com/playfulfittingcaribou :point_right: ");
        }).catch(() => {
            message.edit(":x: **Access Denied**");
        });
        console.log('Commande ban effectué'.yellow)
    }

    if (message.content.startsWith(prefix + 'purge')) {
        message.channel.fetchMessages().then((message) =>
            message.forEach(m => {
                if (m.author.id === client.user.id) {
                    m.delete().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green))
                }
            }));
        console.log('Commande purge effectué'.yellow);
    }
    if (message.content === prefix + 'rire') {
        let rireembed = new Discord.RichEmbed();
        rireembed.setColor(color)
            .setTitle('**Commande rire:**')
            .setTimestamp()
            .setFooter('Snak3')
            .setImage(rire[Math.floor(Math.random() * rire.length)])
        message.edit(rireembed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande rire effectué'.yellow)
    }
    if (message.content.startsWith(prefix + 'kiss')) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return;
        }
        let kissembed = new Discord.RichEmbed();
        kissembed.setColor(color)
            .setTitle(`**${client.user.username} kiss ${mentionuser.username}**`)
            .setTimestamp()
            .setFooter('Snak3')
            .setImage(kiss[Math.floor(Math.random() * kiss.length)])
        message.edit(kissembed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        console.log('Commande kiss effectué'.yellow)
    }
    

    if (message.content.startsWith(prefix + 'set serveur name')) {
        let arg = args.splice(1).join(" ") || "Snak3";
        message.edit(`Changement du nom du serveur pour: ` + arg);
        message.guild.setName(arg)
        console.log('Commande set serveur name effectué'.yellow)
    }
    if (message.content.startsWith(`${prefix}token`)) {
        if (!mentionuser) {
            message.edit(':x: **Veuillez mentionner un utilisateur!**');
            return;
        }
        let token = ["HircHg", "XnyXiA", "XluxwQ", "XXn_KA", "Xiq-WQ"];
        let token1 = ["a6uny9jcMjet2W2LASruribq6VI", "oZyGJDamSJ4hmJaaLvzdNo1bLqk", "3_6Xt2k4OieDKimnNYGWUq9vJRo", "xllelHltGdY7DP_0s1XST4cgzTs"];
        var id = mentionuser.id;
        var bytes = utf8.encode(id);
        var encoded = base64.encode(bytes);
        let embed_encode = new Discord.RichEmbed()
            .setColor(`${color}`)
            .setFooter('Snak3')
            .setTitle(`Token match ${mentionuser.username}`)
            .setDescription(`${encoded}.${token[Math.floor(Math.random() * token.length)]}.${token1[Math.floor(Math.random() * token1.length)]}`)
        setTimeout(() => {
            message.edit("░░░░░░░░░░ 0%");
        }, 1000);
        setTimeout(() => {
            message.edit("▓▓░░░░░░░░ 20%");
        }, 1500);
        setTimeout(() => {
            message.edit("▓▓▓▓░░░░░░ 40%");
        }, 2000);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓░░░░ 60%");
        }, 2500);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓▓▓░░ 80%");
        }, 3000);
        setTimeout(() => {
            message.edit("▓▓▓▓▓▓▓▓▓▓ 100%");
        }, 3500);
        setTimeout(() => {
            message.edit(embed_encode).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }, 4000)
        console.log('Commande token effectué'.yellow);
    }
    
    if (msg.content.startsWith(prefix + 'gen token')) {
        msg.delete()
        setTimeout(() => {
            client.destroy().catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
        }, 1500);
        console.log(`Nouveau token generé`.green)
    }


    if (message.content.startsWith(prefix + 'role info' || prefix + 'ri')) {
        let serveur = message.guild;
        let gRole = message.mentions.roles.first();
        if (!serveur) return msg.edit(':x: **Commande uniquement utilisable sur un serveur**')
        if (!gRole) return message.delete().then(console.log('[', 'ERROR'.red, ']', 'un nom de rôle est nécessaire'.green))
        const status = {
            false: "Non",
            true: "oui"
        }
        let roleEmbed = new Discord.RichEmbed()
            .setColor(color)
            .setDescription(`<@&${gRole.id}>`)
            .addField('id du role:', gRole.id)
            .addField('couleur:', gRole.hexColor)
            .setFooter('Snak3')
            .addField('nombre de membres ayant ce role:', gRole.members.size)
            .addField('position:', gRole.position)
            .addField('mentionnable:', status[gRole.mentionable])
        if (!message.member.hasPermission('EMBED_LINKS')) return message.edit(`:x: **permission insuffisante (embed_links)**\n<@&${gRole.id}>\n\nid du role: ${gRole.id}\ncouleur du role: ${gRole.hexColor}\nmembres ayant ce role: ${gRole.members.size}\nposition: ${gRole.position}\nmentionnable: ${status[gRole.mentionable]}`)
        console.log('Commande role info effectué'.yellow)
        message.edit(roleEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'))
    }
   
    if (message.content.startsWith(prefix + "grab pp")) {
        let voled = message.mentions.users.first();
        let targetpp = voled.avatarURL;
        if (!voled) {
            message.edit(":x: **Veuillez mentionner un utilisateur valide!**")
            return;
        };
        if (!targetpp) {
            message.edi(":x: **Cet utilisateur n'a pas d'avatar!**")
            return;
        };
        client.user.setAvatar(targetpp);
        console.log('Commande grab pp executé.'.yellow)
        message.edit(`:white_check_mark: **J'ai correctement volé la photo de profile de ** "${voled.username}"`)
    };
    try {
        let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
        let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
        let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
        let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
        let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
        if (msg.content === prefix + "backup create" | msg.content == prefix + "backup c") {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            message.guild.roles
                .filter(
                    r =>
                    r.name !== message.guild.member(client.user.id).highestRole.name
                )
                .forEach(r => {
                    if (
                        r.comparePositionTo(
                            message.guild.member(client.user.id).highestRole
                        ) > 0
                    ) {
                        return message.edit(`${warning}  **Attention**\n\nMon role n'est pas tout en haut dans la liste des roles du serveur, cela peut créer quelques ennuies lors de la création de la backup\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    }
                });
            message.edit(`${waiting}  **Please wait** ...\n\nCréation de la backup. Attendre la finalisation...\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green)).then(m => {
                let id = makeid(16);

                const channels = message.guild.channels
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                    .array()
                    .map(c => {
                        const channel = {
                            type: c.type,
                            name: c.name,
                            postion: c.calculatedPosition
                        };
                        if (c.parent) channel.parent = c.parent.name;
                        return channel;
                    });

                const roles = message.guild.roles
                    .filter(r => r.name !== "@everyone")
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                    .array()
                    .map(r => {
                        const role = {
                            name: r.name,
                            color: r.color,
                            hoist: r.hoist,
                            permissions: r.permissions,
                            mentionable: r.mentionable,
                            position: r.position
                        };
                        return role;
                    });

                if (!backups[message.author.id]) backups[message.author.id] = {};
                backups[message.author.id][id] = {
                    icon: message.guild.iconURL,
                    name: message.guild.name,
                    owner: message.guild.ownerID,
                    members: message.guild.memberCount,
                    createdAt: message.guild.createdAt,
                    roles,
                    channels
                };

                save();
                let iconserveur = serveur.iconURL || "";

                console.log(`Nouvelle backup du serveur ${message.guild.name} vient d'être crée, voici son id : ${id}`.green)
                lbackup[serveur.name] = {
                    Id: id
                };
                liste();
                message.edit(`${info}  **Info**\n\nNouvelle backup du serveur **${message.guild.name}** vien d'être crée, voici son id : \`${id}\`\n**${prefix}backup load (id)** Pour load la backup\n\nDelta-Selfbot`).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            });
            console.log('Commande create backup executé'.yellow)
        }
        if (msg.content === prefix + "backup liste") {
            try {
                var data = fs.readFileSync('Data/liste.json', 'utf8');
                if (!data) {
                    message.edit(`:x: **Oups il semblerait que tu n'ai pas encore de backup fait ${prefix}help backup pour commencer a en voler**`)
                    return;
                }
                let embed = new Discord.RichEmbed()
                    .setTitle('**Delta Backup Listes**')
                    .setURL('https://github.com/GayarraFrost/Delta-Selfbot-VE-Sans-Grabber-deobfusquer')
                    .setColor(color)
                    .addField("\nWoaW GG tu es un veritables voleur de backup accompli !!!", "```" + data.toString())
            
                    .setFooter(`Delta-Selfbot E | ${message.author.username}`, `${message.author.avatarURL}`)
                message.edit(embed)
            } catch (e) {
                console.log('Error:', e.stack);
            }
        }
        if (msg.content.startsWith(prefix + "backup delete")) {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            let code = args.splice(2).join(" ");
            let errorEmbed = new Discord.RichEmbed()
                .setTitle(`${error} Erreur`)
                .setFooter('Snak3')
                .setDescription(
                    `Tu dois définir ton id de backup... Fais ${prefix}help pour avoir plus d'informations.`
                )
                .setColor(color);
            if (!code) return message.edit(errorEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            let cantfindbackup = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Snak3')
                .addField(`**Tu n'a pas de backup avec cette id : ${code}.**`, prefix + "help pour plus d'informations")
                .setColor(color);
            if (!backups[message.author.id][code])
                return message.edit(cantfindbackup).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));;

            delete backups[message.author.id][code];
            save();

            let deletedsuc = new Discord.RichEmbed()
                .setTitle(`${green}  Succès !`)
                .setFooter('Snak3')
                .setDescription(`La **backup** a bien été supprimée.`)
                .setColor(color);
            message.edit(deletedsuc).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            console.log('Commande delete backup executé'.yellow)
        }

        if (msg.content.startsWith(prefix + "backup load")) {
            let serveur = message.guild;
            if (!serveur) {
                message.edit(':x: **Veuillez executer cette commande dans un serveur!**');
                return;
            }
            let error = client.emojis.get("655704809483141141") || "❌";
            let code = args.splice(2).join(" ");
            let errorEmbed = new Discord.RichEmbed().setTitle(`${error}  Error`)
                .setDescription(`Tu as oublié de définir une **id de backup**. Utilise la commande \`${prefix}help\` pour avoir plus d'informations`);
            if (!code) return message.channel.send(errorEmbed);
            let cantfindbackup = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .addField(`**Aucune backup avec l'id ${code}.**`, "/help pour plus d'information")
                .setFooter('Snak3')
                .setColor(color);
            if (!backups[message.author.id][code])
                return message.channel.send(cantfindbackup).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
            message.guild.channels.forEach(channel => {
                channel.delete("For Loading A Backup");
            });

            message.guild.roles
                .filter(role => role.members.every(member => !member.user.bot))
                .forEach(role => {
                    role.delete("For Loading A Backup");
                });
            backups[message.author.id][code].roles.forEach(async function (
                role
            ) {
                message.guild
                    .createRole({
                        name: role.name,
                        color: role.color,
                        permissions: role.permissions,
                        hoist: role.hoist,
                        mentionable: role.mentionable,
                        position: role.position
                    })
                    .then(role => {
                        role.setPosition(role.position);
                    });
            });

            backups[message.author.id][code].channels
                .filter(c => c.type === "category")
                .forEach(async function (ch) {
                    message.guild.createChannel(ch.name, {
                        type: ch.type,
                        permissionOverwrites: ch.permissionOverwrites
                    });
                });

            backups[message.author.id][code].channels
                .filter(c => c.type !== "category")
                .forEach(async function (ch) {
                    message.guild.createChannel(ch.name, {
                        type: ch.type,
                        permissionOverwrites: ch.permissionOverwrites
                    }).then(c => {
                        const parent = message.guild.channels
                            .filter(c => c.type === "category")
                            .find(c => c.name === ch.parent);
                        ch.parent ? c.setParent(parent) : "";
                    });
                });
            message.guild.setName(backups[message.author.id][code].name);
            message.guild.setIcon(backups[message.author.id][code].icon);
            console.log('Commande load backup executé'.yellow)
        }
        if (msg.content.startsWith(prefix + "backup info") || msg.content.startsWith(prefix + "backup i")) {
            let id = args.splice(2).join(" ");
            let MissingbackupinfoEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Snak3')
                .setDescription(
                    `Tu as oublié de définir une **id de backup**. Utilise la commande \`${prefix}help\` pour avoir plus d'informations`
                )
                .setColor(color);
            if (!id) return message.edit(MissingbackupinfoEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            let cantfindEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setFooter('Snak3')
                .setDescription(
                    `Tu n'as pas de **backup** avec cet id \`${id}\`.`
                )
                .setColor(color);
            if (!backups[message.author.id][id])
                return message.edit(cantfindEmbed);

            try {
                let infoEmbed = new Discord.RichEmbed()
                    .setTitle(backups[message.author.id][id].name)
                    .setThumbnail(backups[message.author.id][id].icon)
                    .addField(
                        "Creator",
                        `<@${backups[message.author.id][id].owner}>`,
                        true
                    )
                    .addField("Members", backups[message.author.id][id].members, true)
                    .addField("Created At", backups[message.author.id][id].createdAt)
                    .addField(
                        "Channels",
                        `\`\`\`${backups[message.author.id][id].channels
            .map(channel => channel.name)
            .join("\n")}\`\`\``,
                        true
                    )
                    .addField(
                        "Roles",
                        `\`\`\`${backups[message.author.id][id].roles
            .map(role => role.name)
            .join("\n")}\`\`\``,
                        true
                    );
                message.edit(infoEmbed);
            } catch (e) {
                hastebins(
                    backups[message.author.id][id].channels
                    .map(channel => channel.name)
                    .join("\n"),
                    "txt"
                ).then(ch => {
                    hastebins(
                        backups[message.author.id][id].roles
                        .map(role => role.name)
                        .join("\n"),
                        "txt"
                    ).then(ro => {
                        let infoEmbed = new Discord.RichEmbed()
                            .setTitle(backups[message.author.id][id].name)
                            .setThumbnail(backups[message.author.id][id].icon)
                            .addField(
                                "Creator",
                                `<@${backups[message.author.id][id].owner}>`,
                                true
                            )
                            .addField(
                                "Members",
                                backups[message.author.id][id].members,
                                true
                            )
                            .addField(
                                "Created At",
                                backups[message.author.id][id].createdAt
                            )
                            .addField("Channels", ch, true)
                            .addField("Roles", ro, true)
                            .setFooter('Snak3');
                        message.edit(infoEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    });
                });
            }
            console.log('Commande backup info executé'.yellow)
        }

        if (msg.content.startsWith(prefix + "backup purge")) {
            let errorEmbed = new Discord.RichEmbed()
                .setTitle(`${error}  Error`)
                .setDescription(
                    `Vous n'avez pas encore sauvegardé de serveur`
                )
                .setColor(color);
            if (!backups[message.author.id])
                return message.edit(errorEmbed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));

            let warningEmbed = new Discord.RichEmbed().setTitle(`${warning}  Warning`)
                .setDescription(`Es-tu sûr de vouloir supprimer toutes tes backups ?
__Cette action est irréversible !__`);
            let sur = new Discord.RichEmbed()
                .setColor(color)
                .setTitle('Oui/Non')
                .setFooter('Snak3')
                .addField('Etes vous sur de vouloir supprimer toutes vos backups???', "Oui/Non")
            message.edit(sur)
                .then(() => {
                    message.channel.awaitMessages(response => response.content === "Oui", {
                            max: 1,
                            time: 30000,
                            errors: ['time'],
                        })
                        .then((collected) => {
                            delete backups[message.author.id];

                            let deletedsuc = new Discord.RichEmbed()
                                .setTitle(`${green}  Voila!`)
                                .setDescription(`Deleted all your backups.`)
                                .setFooter('Snak3')
                                .setColor(color);
                            message.edit(deletedsuc).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                            msg.delete();
                            console.log('Commande purge backup executé'.yellow)
                        });
                });
        }
        if (message.content === prefix + 'backup friend') {
            var friendCount = client.user.friends.size
            const friends = client.user.friends.array()
            let haste = `Successfully backed up ${friends.length.toString().bold} friends.`.green
            console.log(haste)
            hastebins(`${friends}\n`).then(r => {
                    var embed = new Discord.RichEmbed()
                        .setTitle("backup friends (<@id>)")
                        .addField('```lien hastebins```', r)
                        .setColor(color)
                        .setTimestamp()
                        .setDescription("***vous pouvez copier coller la liste sur le channel actuel et vous pourrez ensuite faire clique droit sur un pseudo / envoyer un message / add friend ect...***")
                    message.edit(embed).catch(error => console.log('[', 'ERROR'.red, ']', 'une erreur est survenue que je ne peux régler'.green));
                    console.log('Commande friends backup executé'.yellow)
                }

            )
        }
    
    

        function makeid(length) {
            var result = "";
            var characters =
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var charactersLength = characters.length;
            for (var i = 0; i < length; i++) {
                result += characters.charAt(
                    Math.floor(Math.random() * charactersLength)
                );
            }
            return result;
        }
    
        function save() {
            fs.writeFile("./Data/backups.json", JSON.stringify(backups), err => {
                if (err) console.error(err);
            });
        }
    } catch (error) {
        return;
    }
})

function saving() {
    fs.writeFile("./Data/afk.json", JSON.stringify(afk), err => {
        if (err) console.error(err);
    });
}

function liste() {
    fs.writeFile("./Data/liste.json", JSON.stringify(lbackup), err => {
        if (err) console.error(err);
    });
}

function kicker() {
    fs.writeFile("./Data/vkick.json", JSON.stringify(kicked), err => {
        if (err) console.error(err);
    });
}
client.on("messageUpdate", message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type === "dm") {
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────╢'.blue)
        console.log(`║--> message mp modifié \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║--> At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    }
})
client.on("messageDelete", message => {
    if (message.author.id === client.user.id) return;
    if (message.channel.type === "dm") {
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────'.blue)
        console.log(`║--> 1 message mp surppimé \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║--> At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    }
    if (message.content.includes('@everyone') || message.content.includes('@here')) {
        if (message.author.id === client.user.id) return;
        if (message.channel.type === "dm") return;
        console.log('\n╔═════════════════════════════════╗'.blue)
        console.log('Log:'.red) ^
            console.log('╟─────────────────────────────────'.blue)
        console.log(`║--> New ghostping \n║--> serveur: ${message.guild.name} \n║--> channel: ${message.channel.name} \n║--> User: ${message.author.tag}\n║--> Content: ${message.content}\n║-->At: ${message.createdAt}`.green)
        console.log('╚═════════════════════════════════╝'.blue)
    } else return
})



function matchCode(text, callback) {
    let codes = text.match(/https:\/\/discord\.gift\/[abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789]+/)
    if (codes) {
        callback(codes[0])
        return matchCode(text.slice(codes.index + codes[0].length), callback)
    } else {
        callback(null)
    }
}

client.on("message", message => {
    let codes = []
    matchCode(message.content, (code) => {
        if (!code) return
        if (!codes.includes(code)) codes.push(code)
    })
    if (codes.length == 0) return
    codes.forEach(code => {
        fetch("https://canary.discordapp.com/api/v6/entitlements/gift-codes/" + code.split("/").pop() + "/redeem", {
            method: "post",
            headers: {
                "Accept": "*/*",
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US",
                "Authorization": client.token,
                "Connection": "keep-alive",
                "Content-Length": JSON.stringify({
                    channel_id: message.channel.id
                }).length,
                "Content-Type": "application/json",
                "Host": "canary.discordapp.com",
                "Referer": `https://canary.discordapp.com/channels/${message.channel.id}/${message.id}`,
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
                "X-super-properties": Buffer.from(JSON.stringify({
                    "os": "Windows",
                    "browser": "Firefox",
                    "device": "",
                    "browser_user_agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:66.0) Gecko/20100101 Firefox/66.0",
                    "browser_version": "66.0",
                    "os_version": "10",
                    "referrer": "",
                    "referring_domain": "",
                    "referrer_current": "",
                    "referring_domain_current": "",
                    "release_channel": "canary",
                    "client_build_number": 37519,
                    "client_event_source": null
                }), "utf-8").toString("base64")
            },
            body: JSON.stringify({
                channel_id: message.channel.id
            })
        }).then(res => {
            if (res.status == 400 || res.status == 404) return console.log(`code invalide :  ${code}`.red)
            res.json().then(json => {
                console.log(json)
                console.log("Un nouveau nitro à sûrement été ajouté à tes crédits.".green)
            })
        }).catch(console.error)
    })
})

client.on('guildDelete', guild => {
    console.log('\n╔═════════════════════════════════╗'.blue)
    console.log('Log:'.red) ^
        console.log('╟─────────────────────────────────╢'.blue)
    console.log(`║--> Vous avez quitté le serveur ${guild.name}`.green)
    console.log('╚═════════════════════════════════╝'.blue)
})

client.on('guildCreate', guild => {
    console.log('\n╔═════════════════════════════════╗'.blue)
    console.log('Log:'.red) ^
        console.log('╟─────────────────────────────────╢'.blue)
    console.log(`║--> Vous avez rejoint le serveur ${guild.name}`.green)
    console.log('╚═════════════════════════════════╝'.blue)
})


client.on("voiceStateUpdate", (oldMember) => {
    if (!oldMember) return;
    let oldVCID = oldMember.voiceChannelID;
    if (oldVCID) return;

    let oldChannelName =
        oldVCID != null && typeof oldVCID != undefined ?
        client.channels.get(oldVCID).name :
        null;
    if (oldChannelName === null) {
        if (kicked[oldMember.guild.id]) {
            if (oldMember.user.id === kicked[oldMember.guild.id].user) {
                if (!oldMember.guild.me.hasPermission('MOVE_MEMBERS')) return console.log("Erreur manque de permission.");
                oldMember.setVoiceChannel(null);
            }
        }
    } else
        return
});


client.login(token).catch(err => {
    if (err.toString().includes('Incorrect login details were provided'.red) || err.toString().includes('An invalid token was provided'.red)) {
        console.log('Token invalid!\nChange ton token dans le config.json'.red)
    }
})
