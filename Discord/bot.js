const Discord = require("discord.js");
var bot = new Discord.Client();
var auth = require('./auth.json');
bot.login(auth.token);
const fs = require('fs');
var obj;
const cfduel = require('./cfduel.js');
const atcoder = require('./atcoder.js');
const lockFile = require('lockfile');
const wolfram = require('./wolfram.js');

function save(){
}

function command(args, msg){
  switch(args[0]){
    case '^send':
      if(msg.author.id != '455184547840262144'){
      return;
    }
    msg.channel.send('these are the files\nglobal:', {files: ["../rating.json", "../points.json"]});
    msg.channel.send('discord:', {files: ["./handles.json", "./atcoderHandles.json", "./ongoing.json", "./ongoingAtcoder.json", "./ongoingTeam.json", "./teamChallenge.json", "./problems.json"]});
    msg.channel.send('telegram:', {files: ["../Telegram/handles.json", "../Telegram/ongoing.json", "../Telegram/problems.json"]});
    break;
    case '^atcoder':
      if(atcoder.duel(bot, msg) != 0){

      }
    break;
    case '^duel':
      cfduel.duel(bot, msg);
    break; 
    case '^ask':
      wolfram.ask(bot, msg);
    break;
  }
}

bot.on("ready", msg =>{
  console.log('ready'); 
})

bot.on("message", msg => {
  console.log(msg);
  if(msg.content == '^restart'){
    if(msg.author.id != '455184547840262144'){
      return;
    }
    console.log('restarting');
    msg.channel.send('restarting');
    setTimeout(() => {
        process.exit(0);
    }, 5000);
    return;
  }
  var args = msg.content.split(" ");
  if(args[0][0] == '^'){
    var opts = {
      wait: 30000
    }
    lockFile.lock('../lock.lock', opts, function(error){
      if(error != undefined){
        console.log('busy');
        console.log(error);
        return;
      }
      command(args, msg);
      lockFile.unlockSync('../lock.lock');
    });

  }
});

bot.on('messageReactionAdd', async (reaction, user) => {
  if(user.bot == true)return;
  if(user.id == '724954396147974194')return;
  console.log('reacted');
  if (reaction.partial) {
    try {
      await reaction.fetch();
    } catch (error) {
      console.log('Something went wrong when fetching the message: ', error);
      return;
    }
  }
  // message.react(emoji);
  reaction.message.react(reaction._emoji);
  // console.log(reaction);
});
