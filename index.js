const login = require("facebook-chat-api");
const cmds = require("commands.js");


function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }

var ids = [];

// Create simple echo bot
login({email: "myd.chat.bot@gmail.com", password: "147896325"}, (err, api) => {
    if(err) return console.error(err);
 
    // api.listen((err, message) => {
    //     // api.sendMessage(eval(message.body).toString(), message.threadID);
    //     for(var cmd of cmds){
    //         for(var phrase of cmd["cmd"]){
    //             if(message.body.includes(phrase)){
    //                 api.sendTypingIndicator(message.threadID,()=>{});
    //                 setTimeout(
    //                     ()=>{
    //                         api.sendMessage(cmd["res"].toString()+"", message.threadID);
    //                     },
    //                     getRndInteger(1,5)*1000 
    //                 );
    //             }
    //         }
    //     }
    //     console.log(message);
    // });

    var sent = false;
    api.listen((err, message)=>{
        sent = false
        for(cmd of cmds){
            if(sent)break;
            if(cmd.cmd.test(message.body)){
                sent = cmd.cb(api,message.threadID);
            }
        }
    });

});