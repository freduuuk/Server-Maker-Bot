/******************************
 * Made By freduuuk#0418
 * Made for Temory Bot Development
 * Please Mention us and freduuuk#0418 ALWAYS by using this Code!
 ******************************/
const Discord = require ('discord.js')
const client = new Discord.Client()
const dbs = require('discord-buttons');
const prefix = 'c!'
const talkedRecently = new Set();
let Cooldown = new Map();
const token ='TOKEN'
const botowner = 'OWNER_ID'
dbs(client);
const {
    MessageMenuOption,
    MessageMenu,
    MessageButton
} = require("discord-buttons");

const menuoptions = [ 
  {
    "value": "Clan Server", "description": "I will setup a clan server for you!", "emoji": "➕" 
  }, 
  {
    "value": "Community Server", "description": "I will setup a community server for you!", "emoji": "💪" 
  },
  {
      "value": "Shop Server",  "description": "I will setup a Shop server for you!",  "emoji": "🛒" 
  } ,
  {
      "value": "NSFW Server",  "description": "I will setup a NSFW server for you!",  "emoji": "🔞" 
  }]



const embed = new Discord.MessageEmbed()


client.on('ready', () =>{
    console.log(`Der Bot ${client.user.tag} ist nun Online!`)
    console.log(`On ${client.guilds.cache.size}`)
      const freduuuk = client.users.cache.get(botowner)
      freduuuk.send(`Ich bin wieder online :D `)
      console.log('In '+client.guilds.cache.size+'servers with '+client.members.cache.size+' members!')
    client.user.setPresence({
        status:'online'
    })

    
    //Wechselnder Status
    let statuse = [`${prefix}help `,`${client.user.username} By Freduuuk`,`Server Creator`,`In ${client.guilds.cache.size} servers`]

    let number = 0;

    client.user.setActivity('Shutdown on 20.11.2021 because of the new Discord Version!')
    
})


client.on('message', async (message) => {
    if (!message.guild || message.author.bot) return;
    if (message.channel.partial) await message.channel.fetch();   
    if (message.partial) await message.fetch();
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [, matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const cmd = args.shift().toLowerCase();
    if (cmd.length === 0){
      if(matchedPrefix.includes(client.user.id))
        return message.channel.send(new Discord.MessageEmbed()
          .setColor("BLURPLE")
          .setTitle(`**I got pinged?**`)
          .setDescription(`To see all Commands type: \`${prefix}help\``)
          .setFooter(message.guild.name)
          .setURL('https://discord.gg/6M6YDn4frV')
    );
    return
    }})

client.on('message', async message => {
    let parts = message.content.split(" ");
    if(parts[0]==prefix+'setup'){
      if(message.author.id !== message.guild.ownerID) return ('Only the server owner is allowed to use this command! \n Invite me to your own server to use me!')
      if(message.author.id == message.guild.ownerID){
        if(message.author.id == message.guild.ownerID){
          
   
    if(Cooldown.has(message.guild.id + 'setup')){
        return message.reply(`You are in a cooldown to create bots! Wait some minutes and use it again ( The cooldown lenght is 1 hour!)`).then(m => m.delete({timeout: 10000}))
    } else {
        Cooldown.set(message.guild.id + 'setup', Date.now());
        setTimeout(()=>{
            Cooldown.delete(message.guild.id + 'setup')
        }, 3600000 )
    }
          
      //define the selection
      let Selection = new MessageMenu()
      .setID('MenuSelection')
      .setMaxValues(1) //OPTIONAL, this is how many values you can have at each selection
      .setMinValues(1) //OPTIONAL , this is how many values you need to have at each selection
      .setPlaceholder('Click me to setup your server'); //message in the content placeholder
  menuoptions.forEach(option => {
      let row = new MessageMenuOption()
      .setLabel(option.label ? String(option.label).substr(0, 25) : String(option.value).substr(0, 25))
      .setValue(String(option.value).substr(0, 25))
      .setDescription(String(option.description).substr(0, 50))
      if (option.emoji) row.setEmoji(option.emoji)
      Selection.addOption(row)
    
  })
  //define the embed
  let MenuEmbed = new Discord.MessageEmbed()
      .setColor("BLUE")
      .setDescription("Here you can setup your server! **ATTENTION: If you choose something in the Dropdown Menu I will create your server and delete every existing channel!**")
      .setFooter(message.guild.name)
      .setTimestamp()
  //send the menu msg
  await message.channel.send(MenuEmbed, Selection);
    }}}

  //Help
  if(parts[0]== prefix+('help')){
    const helpmsg = new Discord.MessageEmbed()
    .setTitle('My Help Menu')
    .setFooter(client.user.username)
    .setTimestamp()
    .setColor('GREEN')
    .setURL('https://discord.gg/6M6YDn4frV')
    .setDescription(`**That are all my commands:**

    **__User Commands__**

    **${prefix}ping** \n Shows you my ping!
    **${prefix}dev** \n Shows you a short info about my developer!
    **${prefix}invite** \n Sends you the invite link for me!
    **${prefix}support** \n Send you a link to the support server!
    **${prefix}info** \n Shows you some informations about the different server/ types
    
    **__Server Creator Commands__** (Only for the Server Owner \`${message.guild.owner.user.username}\`)

   **${prefix}setup** \n You can setup your favorit server


    **__Bot Owner Commands__** (Only for \`freduuuk#9999\`)

    **${prefix}owner** \n Shows a menu only for  \`freduuuk#9999\`
    
    [Here](https://dl.dropboxusercontent.com/s/xnopvlxru18cdwv/qTK5ofq8BP.mp4) you can take a look to a clan server which I made! 
    [Here](https://dl.dropboxusercontent.com/s/mvtc2ewdphtgl8c/gW87NM2Pm2.mp4) you can take a look to a community server which I made!
    [Here](https://dl.dropboxusercontent.com/s/2y4epl58qppc5gz/eyhNZTTItw.mp4) you can take a look to a shop server which I made!
    [Here](https://dl.dropboxusercontent.com/s/t4r626j7klb8g2g/P5ybJl80ua.mp4) you can take a look to a NSFW server which I made! `)
    message.channel.send(helpmsg).then(helpmsg=>{
      helpmsg.react("✅")})
  }


  //Ping
    if(parts[0]=== prefix+('ping')){
        const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user
        const embed = new Discord.MessageEmbed()
        .setTitle('Pong')
        .setDescription(`:ping_pong: My ping is __**${client.ws.ping}ms**__!`)
        .setFooter(message.guild.name)
        .setColor('GREEN')
        .setURL('https://discord.gg/6M6YDn4frV')
        message.channel.send(embed).then(ping=>{
          ping.react("🏓")})
    }

    //info
    if(parts[0]==prefix+'info'){
      const info = new Discord.MessageEmbed()
      .setTitle('Here is a small info for the servers!')
      .setDescription(`You are not sure if you want to get a server? Here are some videos which shows the finished servers! Take a look at them! 
      [Here](https://dl.dropboxusercontent.com/s/xnopvlxru18cdwv/qTK5ofq8BP.mp4) you can take a look to a clan server which I made! 
      [Here](https://dl.dropboxusercontent.com/s/mvtc2ewdphtgl8c/gW87NM2Pm2.mp4) you can take a look to a community server which I made!
      [Here](https://dl.dropboxusercontent.com/s/2y4epl58qppc5gz/eyhNZTTItw.mp4) you can take a look to a shop server which I made!
      [Here](https://dl.dropboxusercontent.com/s/t4r626j7klb8g2g/P5ybJl80ua.mp4) you can take a look to a NSFW server which I made!`)
      .setColor('GREEN')
      .setFooter('Server Creator')
      message.channel.send(info)
    }
    //dev
    if(parts[0]== prefix+'dev'){
      const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user
        const dev = new Discord.MessageEmbed()
        .setFooter('Server Creator')
        .setColor('GREEN')
        .setTimestamp()
        .setURL('https://discord.gg/6M6YDn4frV')
        .setTitle('About my developer')
        .setDescription('My Developer is \`freduuuk#9999\`! He is a german bot developer which has alreday made some other bots! He is at the moment working for Temory! Tap on the Title to come to the server! If you need Support tap also there!')
        message.channel.send(dev)
    }

    //Invite
    if(parts[0]== prefix+'invite'){
      const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user
        const invite = new Discord.MessageEmbed()
        .setFooter('Server Creator')
        .setColor('GREEN')
        .setTimestamp()
        .setURL('https://discord.com/api/oauth2/authorize?client_id=848286175604113458&permissions=8&scope=bot')
        .setTitle('**Tap here to invite me!**')
        message.channel.send(invite)
    }
     //Support
     if(parts[0]== prefix+'support'){
      const guild = message.guild
        const usr = message.mentions.users.first() || message.author
        const member = guild.members.cache.get(usr.id)

        const userr = member.user
        const support = new Discord.MessageEmbed()
        .setFooter('Server Creator')
        .setColor('GREEN')
        .setTimestamp()
        .setTitle('You need Support?')
        .setDescription('Tap [Here](https://discord.gg/6M6YDn4frV) to come to the support server!')
        message.channel.send(support)
     }
    //Owner help
    if(parts[0]== prefix+'owner'){
      if(message.author.id !== botowner) return message.channel.send(`${message.author} only \`freduuuk#9999 | 694854986680631296\` is allowed to use this command!`)
      if(message.author.id == botowner){
        const ownerembed = new Discord.MessageEmbed()
        .setTitle('This are the Onwer commands:')
        .setDescription(`That is your help page freduuuk!
        **${prefix}say** \n Says sth.
        **${prefix}esay** \n Says sth. in an embed
        **${prefix}restart** \n Restarts the bot!
        **${prefix}setname** \n Sets a new Bot name
        **${prefix}setaagin** \n Sets our advertise again!
        `)
        .setFooter('Freduuuk is the coolest person which i know!')
        .setColor('GREEN')
        message.channel.send(ownerembed)
      }
    }
    //say
   if(parts[0]== prefix+'say'){
    if(message.author.id !== botowner) return message.channel.send(`${message.author} only \`freduuuk#9999 | 694854986680631296\` is allowed to use this command!`)
    if(message.author.id == botowner){
      let args = message.content.split(" ").slice(1);
      var say = args.join(' ');
      if(say == ''){
      return  message.channel.send('Wrong usuage! Use \n \```'+prefix+'say <Text>\```') 
      }
      message.author.send('Here is your command to use it again: ```'+ prefix+'say ' +say+'```')
      message.delete()
      message.channel.send(say)
      
    }}
    //esay
    if(parts[0]== prefix+'esay'){
      if(message.author.id !== botowner) return message.channel.send(`${message.author} only \`freduuuk#9999 | 694854986680631296\` is allowed to use this command!`)
    if(message.author.id == botowner){
      let args = message.content.split(" ").slice(1);
      var esaymsg = args.join(' ');
      if(esaymsg == ''){
        return  message.channel.send('Wrong usuage! Use \n \```'+prefix+'esay <Text>\```') 
        }
        message.author.send('Here is your command to use it again: ```'+ prefix+'esay ' +esaymsg+'```')
      message.delete()
        const esay = new Discord.MessageEmbed()
        .setTitle('A Message from freduuuk')
        .setDescription(esaymsg)
        .setFooter('A message from freduuuk')
        .setColor('GREEN')
        message.channel.send(esay)
    }
   }
   //Restart
   if(parts[0]== prefix+'restart'){
    if(message.author.id !== botowner) return message.channel.send(`${message.author} only \`freduuuk#9999 | 694854986680631296\` is allowed to use this command!`)
  if(message.author.id == botowner){
    
    
      await  message.channel.send(`Okay, I'll restart...`)
          .then(()=>client.destroy())
          .then(()=>client.login(token))
          .then(()=> message.channel.send('Restarted'))
  
    
  }}
  //setname
   if(parts[0]== prefix+'setname'){
    if(message.author.id !== botowner) return message.channel.send(`${message.author} only \`freduuuk#9999 | 694854986680631296\` is allowed to use this command!`)
  if(message.author.id == botowner){
    let args = message.content.split(" ").slice(1);
      var newname = args.join(' ');
      client.user.setUsername(newname)
      message.reply(`Der neue Bot name ist nun ${newname}`)
      if(Error){
        const errorembed = new Discord.MessageEmbed()
        .setDescription(error)
        .setColor('RED')
        message.channel.send(errorembed)
      }
      
  }}
  //set our advertise again
  if(parts[0]== prefix+'setaagin'){
    if(message.author.id !== botowner) return message.channel.send(`${message.author} only \`freduuuk#9999 | 694854986680631296\` is allowed to use this command!`)
  if(message.author.id == botowner){

      await message.guild.channels.create(`created by server creator`, { type: "voice" })
      message.delete()
      message.channel.send(':white_check_mark:')
      if(Error){
        const errorembed = new Discord.MessageEmbed()
        .setDescription(error)
        .setColor('RED')
        message.channel.send(errorembed)
      }
    
      


  }}

  //server command
  if (parts[0]== prefix+'servers'){
    if(message.author.id !== botowner) return message.channel.send(`${message.author} only \`freduuuk#9999 | 694854986680631296\` is allowed to use this command!`)
    if(message.author.id == botowner){
     
    let serverlist = ''
    client.guilds.cache.forEach((guild) => {
        serverlist = serverlist.concat(" -> **Name:** \`" + guild.name + "\` **ID:** \`" + guild.id + "\ `\n")
    })

    const servers = new Discord.MessageEmbed()
    .setColor("BLUE")
    .setTitle(`I am in **${client.guilds.cache.size} servers**: `)
    .setDescription(serverlist)
    message.channel.send(servers);
  }}
  

})
client.on('clickMenu', async (menu) => {
      let menuIndex = menuoptions.findIndex(v => String(v.value).substr(0, 25) == String(menu.values[0]).substr(0, 25));

      let user = menu.clicker.user;
      let guild = menu.message.guild;
      let channel = menu.message.channel;
      let ch = menu.message.channel;
      let message = menu.message;
      //Clan Server
      if (menuIndex == 0) {
        if(user.id !== guild.ownerID)return message.channel.send(`You aren't the server owner!`).then(m => m.delete({timeout: 5000}))
        if(user.id == guild.ownerID){
      clanserver()}
}
if (menuIndex == 1) {
  if(user.id !== guild.ownerID)return message.channel.send(`You aren't the server owner!`).then(m => m.delete({timeout: 5000}))
        if(user.id == guild.ownerID){
         
      communityserver()

        
}}
if (menuIndex == 2) {
  if(user.id !== guild.ownerID)return message.channel.send(`You aren't the server owner!`).then(m => m.delete({timeout: 5000}))
  if(user.id == guild.ownerID){
shopserver()
  }

}
if (menuIndex == 3) {
  if(user.id !== guild.ownerID)return message.channel.send(`You aren't the server owner!`).then(m => m.delete({timeout: 5000}))
        if(user.id == guild.ownerID){
      nsfwserver()

        
}}
async function  clanserver (sendfclan){
          
  (await message.channel.send('I will create your clan server now! Please be patient! :clock1: '))

 await message.guild.channels.cache.forEach(channel => channel.delete())
  //category1
  await  message.guild.channels.create('Welcome', { type: 'category' })
  //category2
  await  message.guild.channels.create('Apply', { type: 'category' })
  //category3
  await  message.guild.channels.create('Chats', { type: 'category' })
  //category4
  await  message.guild.channels.create('Talks', { type: 'category' })
  //category5
  await  message.guild.channels.create('Partner', { type: 'category' })
  //category6
  await  message.guild.channels.create('Support', { type: 'category' })
  //category7
  await  message.guild.channels.create('Staff', { type: 'category' })


  let category1 = message.guild.channels.cache.find(ct => ct.name === "Welcome" && ct.type === "category");
  let category2 = message.guild.channels.cache.find(ct => ct.name === "Apply" && ct.type === "category");
  let category3 = message.guild.channels.cache.find(ct => ct.name === "Chats" && ct.type === "category");
  let category4 = message.guild.channels.cache.find(ct => ct.name === "Talks" && ct.type === "category");
  let category5 = message.guild.channels.cache.find(ct => ct.name === "Partner" && ct.type === "category");
  let category6 = message.guild.channels.cache.find(ct => ct.name === "Support" && ct.type === "category");
  let category7 = message.guild.channels.cache.find(ct => ct.name === "Staff" && ct.type === "category");


  const embed4 = new Discord.MessageEmbed()
  .setTitle('Your Clan Server is finished and ready to use!')
  .setColor('GREEN')
  .setFooter('You Clan Server is finished and ready to use!')
  .setURL('https://discord.gg/6M6YDn4frV')
  .setDescription(`**__Your Clan server is finished and ready to use!__**


  Some informations for you: 
  -> You have to change the channel permissions
  ->  You have to create the roles
  
  Some informations about the channels:
  
  __WELCOME__
  
  ->  #welcome Here you can setup a welcome system which says hello to every new user
  -> #rules Here you can write the server rules
  -> #news Here you can send news for the clan!
  -> #about-us here you can give some news about your clan and you
  -> #selfroles here you can setup some selfroles example: older or country
  -> #giveaways Here you can start giveaways 
  
  
  __APPLY__
  -> #requirements Here you can write in the requirements for players or the staff team
  -> #apply-as-player Here you can setup an apply system for player applications
  -> Here you can setup an apply system for staff applications
  -> #finished-player-apply that could be the finished applications channel for player applications
  -> #finished-staff-apply that could be the finished applications channel for staff applications
  
  
  __CHATS__
  
  -> #chat here can your players chat
  -> #playersearch Here you can search players
  -> #pics Here you can send pics example from your food
  -> #bot-commands here you can use bot commands!
  
  
  __TALKS__
  
  ->: In the talks your players can speak
  
  
  __PARTNER__
  
  -> #partner-requirments Here you can send in the requirements for a partnership with your clan
  -> #apply-as-partner here you can setup an application system for partnerships with you Clan
  -> #partners here you can send a message if you have new partners
  
  
  __SUPPORT__
  
  -> #ask-a-mod here can your players ask you or your mods anything
  -> #ticket-support here your can setup a ticket system for questions
  -> wait for support here can your members wait until your team support them
  -> support room here you can talk to your members and support them
  
  
  __STAFF__
  
  -> #staff-chat that's a chat for your staff team
  -> staff talk That's a talk only for your staff team
  -> owner talk That's a talk only for the owner from the clan
  
  This was a (short) info about your new clan server! Have lots of fun with it!`)

  //Unser Werbe Channel
  await message.guild.channels.create(`created by server creator`, { type: "voice" })
  //Catergory1
  await message.guild.channels.create(`》welcome`, { type: "text" }).then(ch => {
    ch.setParent(category1)
   })

    await message.guild.channels.create(`》rules`, { type: "text" }).then(ch => {
      ch.setParent(category1)})

      await message.guild.channels.create(`》news`, { type: "text" }).then(chn => {
        chn.setParent(category1)
        chn.send(`Some infromations for you ${message.guild.owner}`)
        chn.send(embed4)
       })


        await message.guild.channels.create(`》about us`, { type: "text" }).then(ch => {
          ch.setParent(category1)})

          await message.guild.channels.create(`》selfroles`, { type: "text" }).then(ch => {
            ch.setParent(category1)})
  
            await message.guild.channels.create(`》giveaways`, { type: "text" }).then(ch => {
              ch.setParent(category1)})
      

   // Category2
   await message.guild.channels.create(`》requirements`, { type: "text" }).then(ch => {
    ch.setParent(category2)})

    await message.guild.channels.create(`》apply as player`, { type: "text" }).then(ch => {
      ch.setParent(category2)})

      await message.guild.channels.create(`》apply as staff`, { type: "text" }).then(ch => {
        ch.setParent(category2)})

        await message.guild.channels.create(`》finished player apply`, { type: "text" }).then(ch => {
          ch.setParent(category2)})

          await message.guild.channels.create(`》finished staff apply`, { type: "text" }).then(ch => {
            ch.setParent(category2)})

    //Category3
    await message.guild.channels.create(`》chat`, { type: "text" }).then(ch => {
      ch.setParent(category3)})

      await message.guild.channels.create(`》playersearch`, { type: "text" }).then(ch => {
        ch.setParent(category3)})

        await message.guild.channels.create(`》pics`, { type: "text" }).then(ch => {
          ch.setParent(category3)})

          await message.guild.channels.create(`》bot commands`, { type: "text" }).then(ch => {
            ch.setParent(category3)})

    //Category4
    await message.guild.channels.create(`》Talk 1`, { type: "voice" }).then(ch => {
      ch.setParent(category4)})

      await message.guild.channels.create(`》Talk 2`, { type: "voice" }).then(ch => {
        ch.setParent(category4)})

        await message.guild.channels.create(`》Talk 3`, { type: "voice" }).then(ch => {
          ch.setParent(category4)})

          await message.guild.channels.create(`》Talk 4`, { type: "voice" }).then(ch => {
            ch.setParent(category4)})

            await message.guild.channels.create(`》Talk 5`, { type: "voice" }).then(ch => {
              ch.setParent(category4)})

              await message.guild.channels.create(`》Talk 6`, { type: "voice" }).then(ch => {
                ch.setParent(category4)})
    

    //Category5
    await message.guild.channels.create(`》partner requirments`, { type: "text" }).then(ch => {
      ch.setParent(category5)})

      await message.guild.channels.create(`》apply as partner`, { type: "text" }).then(ch => {
        ch.setParent(category5)})

        await message.guild.channels.create(`》partners`, { type: "text" }).then(ch => {
          ch.setParent(category5)})

  //Category6
  await message.guild.channels.create(`》ask a mod`, { type: "text" }).then(ch => {
    ch.setParent(category6)})

    await message.guild.channels.create(`》ticket support`, { type: "text" }).then(ch => {
      ch.setParent(category6)})

      await message.guild.channels.create(`》wait for support`, { type: "voice" }).then(ch => {
        ch.setParent(category6)})

        await message.guild.channels.create(`》support room`, { type: "voice" }).then(ch => {
          ch.setParent(category6)})

  //Category7
  await message.guild.channels.create(`》staff chat`, { type: "text" }).then(ch => {
    ch.setParent(category7)})

    await message.guild.channels.create(`》staff talk`, { type: "voice" }).then(ch => {
      ch.setParent(category7)})

      await message.guild.channels.create(`》owner talk`, { type: "voice" }).then(ch => {
        ch.setParent(category7)})

      


  message.guild.setName('Clan Server by Server Creator for '+message.author.tag)
  message.guild.setIcon('./server_maker_pb_clan.png')
  const freduuuk = client.users.cache.get(botowner)
      freduuuk.send(`Es wurde ein neuer Clan Server für ${message.guild.owner.user.username} erstellt! Sehr nice!!!`)


        
  }
  async function communityserver(){
    (await message.channel.send('I will create your community server now! Please be patient! :clock1: '))

    await message.guild.channels.cache.forEach(channel => channel.delete())
     //category1
     await  message.guild.channels.create('Welcome', { type: 'category' })
      //category2
      await  message.guild.channels.create('Chats', { type: 'category' })
       //category3
     await  message.guild.channels.create('Gaming', { type: 'category' })
      //category4
      await  message.guild.channels.create('Talks', { type: 'category' })
       //category5
     await  message.guild.channels.create('Support', { type: 'category' })

     let category1 = message.guild.channels.cache.find(ct => ct.name === "Welcome" && ct.type === "category");
     let category2 = message.guild.channels.cache.find(ct => ct.name === "Chats" && ct.type === "category");
     let category3 = message.guild.channels.cache.find(ct => ct.name === "Gaming" && ct.type === "category");
     let category4 = message.guild.channels.cache.find(ct => ct.name === "Talks" && ct.type === "category");
     let category5 = message.guild.channels.cache.find(ct => ct.name === "Support" && ct.type === "category");

     const embed5 = new Discord.MessageEmbed()
     .setTitle('Your Community Server is finished and ready to use!')
     .setColor('GREEN')
     .setFooter('You Community Server is finished and ready to use!')
     .setTimestamp()
     .setURL('https://discord.gg/6M6YDn4frV')
     .setDescription(`**__Your Community server is finished and ready to use!__**


     Some informations for you: 
      -> You have to change the channel permissions
      ->  You have to create the roles
               
      Some informations about the channels:
     
     __WELCOME__
     -> #➤│welcome  Here you can setup a welcome system which says hello to every new user
     -> #➤│rules Here you can write the server rules
     -> #➤│news Here you can send news for your community!
     -> #➤│social-allerts  Here you can setup social media allerts for your socials
     -> #➤│selfroles  Here you can setup some selfroles example: older or country
     
     __CHATS__
     
     -> #➤│chat Here is a place to talk about every thing for your community
     -> #➤│movie-chat Here is a place to talk about movies for your community
     -> #➤│sport-chat  Here is a place to talk about sport for your community
     -> #➤│music-chat  Here is a place to talk about music for your community
     -> #➤│bot-commands  Here you can use bot commands!
     
     __GAMING__
     
     -> #➤│gaming-chat Here is a place to talk about gaming for your community
     -> #➤│playersearch  Here is a place to find other players for your community
     -> #➤│fortnite-chat  Here is a place to find other Fortnite players for your community
     -> #➤│valorant-chat  Here is a place to find other Valorant players for your community
     -> #➤│rocket-league-chat  Here is a place to find other Rocket League players for your community
     
     __TALKS__
     
     -> Here is your community and you allowed to talk together
     
     __SUPPORT__
     
     -> #➤│ask-a-mod Here can your community ask mods their questions
      -> #➤│ticket-support  Here you can setup a ticket system for support
     -> ➤│Wait for Support Here can your community join if they want to talk with a mod about their problem!
     -> ➤│Support Talk Here can your mods support your community
     
     This was a (short) info about your new community server! Have lots of fun with it!`)

     //Unser Werbe Channel
    await message.guild.channels.create(`created by server creator`, { type: "voice" })

    //Category 1
    await message.guild.channels.create(`➤│welcome`, { type: "text" }).then(ch => {
      ch.setParent(category1)
      })

      await message.guild.channels.create(`➤│rules`, { type: "text" }).then(ch => {
        ch.setParent(category1)})

        await message.guild.channels.create(`➤│news`, { type: "text" }).then(ch => {
          ch.setParent(category1)
          ch.send(`Some informations for you ${message.guild.owner}`)
          ch.send(embed5)})

          await message.guild.channels.create(`➤│social allerts`, { type: "text" }).then(ch => {
            ch.setParent(category1)})

            await message.guild.channels.create(`➤│selfroles`, { type: "text" }).then(ch => {
              ch.setParent(category1)})

    //Category 2
    await message.guild.channels.create(`➤│chat`, { type: "text" }).then(ch => {
      ch.setParent(category2)})

          await message.guild.channels.create(`➤│movie chat`, { type: "text" }).then(ch => {
            ch.setParent(category2)})

            await message.guild.channels.create(`➤│sport chat`, { type: "text" }).then(ch => {
              ch.setParent(category2)})

              await message.guild.channels.create(`➤│music chat`, { type: "text" }).then(ch => {
                ch.setParent(category2)})


              await message.guild.channels.create(`➤│bot commands`, { type: "text" }).then(ch => {
                ch.setParent(category2)})

    //Category 3
    await message.guild.channels.create(`➤│gaming chat`, { type: "text" }).then(ch => {
      ch.setParent(category3)})

    await message.guild.channels.create(`➤│playersearch`, { type: "text" }).then(ch => {
      ch.setParent(category3)})

      await message.guild.channels.create(`➤│fortnite chat`, { type: "text" }).then(ch => {
        ch.setParent(category3)})

        await message.guild.channels.create(`➤│valorant chat`, { type: "text" }).then(ch => {
          ch.setParent(category3)})

          await message.guild.channels.create(`➤│rocket league chat`, { type: "text" }).then(ch => {
            ch.setParent(category3)})

    //Category 4
    await message.guild.channels.create(`➤│Join to create`, { type: "voice" }).then(ch => {
      ch.setParent(category4)})

    await message.guild.channels.create(`➤│Open Talk`, { type: "voice" }).then(ch => {
      ch.setParent(category4)})

    await message.guild.channels.create(`➤│Talk 1`, { type: "voice" }).then(ch => {
      ch.setParent(category4)})

      await message.guild.channels.create(`➤│Talk 2`, { type: "voice" }).then(ch => {
        ch.setParent(category4)})

        await message.guild.channels.create(`➤│Talk 3`, { type: "voice" }).then(ch => {
          ch.setParent(category4)})

          await message.guild.channels.create(`➤│Gaming Talk`, { type: "voice" }).then(ch => {
            ch.setParent(category4)})

            await message.guild.channels.create(`➤│Sport Talk`, { type: "voice" }).then(ch => {
              ch.setParent(category4)})

    //Category 5
    await message.guild.channels.create(`➤│Ask a mod`, { type: "text" }).then(ch => {
      ch.setParent(category5)})

      await message.guild.channels.create(`➤│Ticket Support`, { type: "text" }).then(ch => {
        ch.setParent(category5)})

        await message.guild.channels.create(`➤│Wait for Support`, { type: "voice" }).then(ch => {
          ch.setParent(category5)})

          await message.guild.channels.create(`➤│Support Talk`, { type: "voice" }).then(ch => {
            ch.setParent(category5)})


            message.guild.setName('Community Server by Server Creator for '+message.author.tag)
            message.guild.setIcon('./server_maker_pb.png')
            const freduuuk = client.users.cache.get(botowner)
            freduuuk.send(`Es wurde ein neuer Community Server für ${message.guild.owner.user.username} erstellt! Sehr nice!!!`)
          

            


  }
  async function shopserver(){
    (await message.channel.send('I will create your shop server now! Please be patient! :clock1: '))

    await message.guild.channels.cache.forEach(channel => channel.delete())
     //category1
     await  message.guild.channels.create('Welcome', { type: 'category' })
       //category2
     await  message.guild.channels.create('Chats', { type: 'category' })
      //category3
      await  message.guild.channels.create('Talks', { type: 'category' })
       //category4
     await  message.guild.channels.create('Order', { type: 'category' })
       //category5
       await  message.guild.channels.create('Support', { type: 'category' })

     let category1 = message.guild.channels.cache.find(ct => ct.name === "Welcome" && ct.type === "category");
     let category2 = message.guild.channels.cache.find(ct => ct.name === "Chats" && ct.type === "category");
     let category3 = message.guild.channels.cache.find(ct => ct.name === "Talks" && ct.type === "category");
     let category4 = message.guild.channels.cache.find(ct => ct.name === "Order" && ct.type === "category");
     let category5 = message.guild.channels.cache.find(ct => ct.name === "Support" && ct.type === "category");


     const embed6 = new Discord.MessageEmbed()
     .setTitle('Your Shop Server is finished and ready to use!')
     .setColor('GREEN')
     .setFooter('You Shop Server is finished and ready to use!')
     .setTimestamp()
     .setURL('https://discord.gg/6M6YDn4frV')
     .setDescription(`**__Your Community server is finished and ready to use!__**


     Some informations for you: 
      -> You have to change the channel permissions
      ->  You have to create the roles
                          
     Some informations about the channels:
                
     __WELCOME__
     
     -> #➥welcome Here you can setup a welcome system for new users on your server
     -> #➥rules  Here you can write your server rules
     -> #➥about-us  Here you can send a about you text
     -> #➥news  Here you can write news for your server/ shop
     -> #➥selfroles  Here you can setup a reactionrole system
     -> #➥giveaways  Here you can start giveawys for your community
     
     __CHATS__
     
     -> #➥chat Thats a playce to talk for your community
     -> #➥gaming-chat   Thats a playce to talk for your community about gaming
     -> #➥bot-commands Here you can use bot commands
     -> #➥self-promo  Here are your users allowed to send their promotion
     
     __TALKS__
     
     Here can your community speak togehter!
     
     __ORDER__
     
     -> #➥how-to-order here you can send your requirements for an order in your shop 
     -> #➥order  here can your community order something from your shop
     -> #➥feedback  here can your community give you feedback for the things that you sell!
     
     __SUPPORT__
     
     -> #➥ask-a-mod  Here can your community ask mods for help, etc.
     -> #➥support-ticket  Here you can setup a ticket system for your community
     -> ➥Wait for Support Here can your community wait if they need support
     -> ➥Supportroom Here can you or your mods support the users from ➥Wait for Support
     
     This was a (short) info about your new shop server! Have lots of fun with it!
     
     
     `)
       //Unser Werbe Channel
    await message.guild.channels.create(`created by server creator`, { type: "voice" })

    //Category 1
    await message.guild.channels.create(`➥welcome`, { type: "text" }).then(ch => {
      ch.setParent(category1)})

      await message.guild.channels.create(`➥rules`, { type: "text" }).then(ch => {
        ch.setParent(category1)})

        await message.guild.channels.create(`➥about us`, { type: "text" }).then(ch => {
          ch.setParent(category1)})

          await message.guild.channels.create(`➥news`, { type: "text" }).then(ch => {
            ch.setParent(category1)
          ch.send(`Here are some informations for you ${message.guild.owner}`)
        ch.send(embed6)})

            await message.guild.channels.create(`➥selfroles`, { type: "text" }).then(ch => {
              ch.setParent(category1)})

              await message.guild.channels.create(`➥giveaways`, { type: "text" }).then(ch => {
                ch.setParent(category1)})

      //Category 2
      await message.guild.channels.create(`➥chat`, { type: "text" }).then(ch => {
        ch.setParent(category2)})

        await message.guild.channels.create(`➥gaming chat`, { type: "text" }).then(ch => {
          ch.setParent(category2)})

          await message.guild.channels.create(`➥bot commands`, { type: "text" }).then(ch => {
            ch.setParent(category2)})

            await message.guild.channels.create(`➥self promo`, { type: "text" }).then(ch => {
              ch.setParent(category2)})

             //Category 3

             await message.guild.channels.create(`➥Join to Create`, { type: "voice" }).then(ch => {
              ch.setParent(category3)})

              await message.guild.channels.create(`➥Open Talk`, { type: "voice" }).then(ch => {
                ch.setParent(category3)})

                await message.guild.channels.create(`➥Talk 1`, { type: "voice" }).then(ch => {
                  ch.setParent(category3)})

                  await message.guild.channels.create(`➥Talk 2`, { type: "voice" }).then(ch => {
                    ch.setParent(category3)})

                    await message.guild.channels.create(`➥Talk 3`, { type: "voice" }).then(ch => {
                      ch.setParent(category3)})

        //Category 4

        await message.guild.channels.create(`➥how to order`, { type: "text" }).then(ch => {
          ch.setParent(category4)})

          await message.guild.channels.create(`➥order`, { type: "text" }).then(ch => {
            ch.setParent(category4)})

            await message.guild.channels.create(`➥feedback`, { type: "text" }).then(ch => {
              ch.setParent(category4)})

              //Category 5

        await message.guild.channels.create(`➥ask a mod`, { type: "text" }).then(ch => {
          ch.setParent(category5)})

          await message.guild.channels.create(`➥support ticket`, { type: "text" }).then(ch => {
            ch.setParent(category5)})

            await message.guild.channels.create(`➥Wait for Support`, { type: "voice" }).then(ch => {
              ch.setParent(category5)})

              await message.guild.channels.create(`➥Supportroom`, { type: "voice" }).then(ch => {
                ch.setParent(category5)})



                message.guild.setName('Shop Server by Server Creator for '+message.author.tag)
                message.guild.setIcon('./server_maker_pb_shop.png')
                const freduuuk = client.users.cache.get(botowner)
        freduuuk.send(`Es wurde ein neuer Shop Server für ${message.guild.owner.user.username} erstellt! Sehr nice!!!`)

       

            
  }
  async function nsfwserver(){
    (await message.channel.send('I will create your nsfw server now! Please be patient! :clock1: '))

       await message.guild.channels.cache.forEach(channel => channel.delete())
      //category1
        await  message.guild.channels.create('Verify', { type: 'category' })
       //category2
       await  message.guild.channels.create('Welcome', { type: 'category' })
       //category3
       await  message.guild.channels.create('Nudes', { type: 'category' })
     //category4
      await  message.guild.channels.create('Chats', { type: 'category' })
      //category5
      await  message.guild.channels.create('Support', { type: 'category' })

let category1 = message.guild.channels.cache.find(ct => ct.name === "Verify" && ct.type === "category");
let category2 = message.guild.channels.cache.find(ct => ct.name === "Welcome" && ct.type === "category");
let category3 = message.guild.channels.cache.find(ct => ct.name === "Nudes" && ct.type === "category");
let category4 = message.guild.channels.cache.find(ct => ct.name === "Chats" && ct.type === "category");
let category5 = message.guild.channels.cache.find(ct => ct.name === "Support" && ct.type === "category");

const embed6 = new Discord.MessageEmbed()
.setTitle('Your Community Server is finished and ready to use!')
.setColor('GREEN')
.setFooter('You Community Server is finished and ready to use!')
.setTimestamp()
.setURL('https://discord.gg/6M6YDn4frV')
.setDescription(`**__Your Community server is finished and ready to use!__**


Some informations for you: 
-> You have to change the channel permissions
->  You have to create the roles
                    
Some informations about the channels:

__VERIFY__

-> #╚verify-here Here your users have to verify them if they join
-> #╚verify-help  Here could the new users get help by verifying them

__WELCOME__
-> #╚welcome  Here you can setup a welcome system
-> #╚rules  Here you can write your rules for the server!
-> #╚news  Here you can send the newest informations about your server
-> #╚selfroles  Here you can setup a reactionrole system!

__NUDES__

-> #╚auto-nudes Here you can setup an auto nude system
-> #╚onlyfans-leakes  Here you can send onlyfans leakes
-> #╚your-pics  Here can your community send their pics :smile:

__CHATS__ 

-> #╚chat Here can your community chat
-> #╚your-experiences  Here can your community talk about their experiences
-> #╚your-tips  Here can your community give the other users tips

__SUPPORT__

-> #╚ticket-support Here you can setup a support system to support your community!

  This was a (short) info about your new community server! Have lots of fun with it!`)

//Unser Werbe Channel
await message.guild.channels.create(`created by server creator`, { type: "voice" })

//Category 1
await message.guild.channels.create(`╚verify here`, { type: "text" }).then(ch => {
  ch.setParent(category1)})

  await message.guild.channels.create(`╚verify help`, { type: "text" }).then(ch => {
    ch.setParent(category1)})

//Category 2
await message.guild.channels.create(`╚welcome`, { type: "text" }).then(ch => {
  ch.setParent(category2)})

  await message.guild.channels.create(`╚rules`, { type: "text" }).then(ch => {
    ch.setParent(category2)})

    await message.guild.channels.create(`╚news`, { type: "text" }).then(ch => {
      ch.setParent(category2)
      ch.send(`Some informations for you ${message.guild.owner}`)
      ch.send(embed6)})

      await message.guild.channels.create(`╚selfroles`, { type: "text" }).then(ch => {
        ch.setParent(category2)})

  //Category 3
  await message.guild.channels.create(`╚auto nudes`, { type: "text" }).then(ch => {
    ch.setParent(category3)
  ch.edit({ nsfw: !ch.nsfw})})

  await message.guild.channels.create(`╚onlyfans leakes`, { type: "text" }).then(ch => {
    ch.setParent(category3)
  ch.edit({ nsfw: !ch.nsfw})})

  await message.guild.channels.create(`╚your pics`, { type: "text" }).then(ch => {
    ch.setParent(category3)
  ch.edit({ nsfw: !ch.nsfw})})

  //Category 4 
  await message.guild.channels.create(`╚chat`, { type: "text" }).then(ch => {
    ch.setParent(category4)})

    await message.guild.channels.create(`╚Your experiences`, { type: "text" }).then(ch => {
      ch.setParent(category4)})

      await message.guild.channels.create(`╚Your tips`, { type: "text" }).then(ch => {
        ch.setParent(category4)})

  //Category 5
  await message.guild.channels.create(`╚ticket support`, { type: "text" }).then(ch => {
    ch.setParent(category5)})
  

    message.guild.setName('NSFW Server by Server Creator for '+message.author.tag)
    message.guild.setIcon('./server_maker_pb_nsfw.png')
    const freduuuk = client.users.cache.get(botowner)
    freduuuk.send(`Es wurde ein neuer NSFW Server für ${message.guild.owner.user.username} erstellt! Sehr nice!!!`)

  
  }

})
client.login(token)


 

function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}


/******************************
 * Made By freduuuk#0418
 * Made for Temory Bot Development
 * Please Mention us and freduuuk#0418 ALWAYS by using this Code!
 ******************************/