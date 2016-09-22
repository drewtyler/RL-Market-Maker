try {
	var Discord = require("discord.js");
} catch (e){
	console.log(e.stack);
	console.log(process.version);
	console.log("Please run npm install and ensure it passes with no errors!");
	process.exit();
}
const client = new Discord.Client();

try {
	var AuthDetails = require("./auth.json");
} catch (e){
	console.log("Please create an auth.json like auth.json.example with a bot token or an email and password.\n"+e.stack);
	process.exit();
}

try {
    var Config = require("./config.json");
} catch (e) {
    console.log("Couldn't find config file!");
    process.exit();
}

var commands = {
    "sell" : {
        usage:"<item>, <item type>, <asking price>, [OPTIONAL] <comma-separated item modifiers>",
        description: "Puts an item for sale. Sale offer expires in " + Config.expiryString + ".\n" + 
                     "Use the base item name for the <item> field.\n" +
                     "Item type is one of [Decal, Wheels, Body, Topper, Antenna, Boost]\n" +
                     "The asking price must be either Keys, CC1, CC2.\n" +
                     "Item modifiers are colors & certifications (not strictly enforced).\n" + 
                     "Example commands:\n" +
                     "!sell Looper, Wheels, 10 Keys, Lime, Certified Juggler\n" +
                     "!sell Dominus GT, Body, 3 CC1",
        process: function(bot, msg, args) {
            // Parse options
            // If valid, add to selling registry
        }
    },
    "buy" : {
        usage:"<item>, <item type>, <buying price>, [OPTIONAL] <comma-separated item modifiers>", 
        description: "Puts in an order to buy an item for sale.\n" +
                     "The bot will PM you a list of items currently for sale of the item you wish to buy\n" +
                     "Use the base item name for the <item> field (e.g. 'Looper')\n" +
                     "Item type is one of [Decal, Wheels, Body, Topper, Antenna, Boost]\n" +
                     "Price must be either Keys, CC1 or CC2.\n" +
                     "Item modifiers are colors & certifications (not strictly enforced).\n",
        process: function(bot, msg, args) {
            // Parse options
            // If valid, query for items that match the item, item type and optional modifier combo and sort by price.
            // If some have a lower or equal price, send the list of for sale items to buyer
            // Also, send items over their price & items with different modifiers 
        }
    },
    "price" : {
        usage: "<item>, <item type>",
        description: "Lists all items for sale & purchase orders that match the <item> and <item type>",
        process: function(bot, msg, args) {
            // Parse options
            // If valid, query sales and buys for items that match item and type
            // PM lists to asker
        }
    },
    "uptime": {
        usage: "",
        description: "returns the amount of time since the bot started",
        process: function (bot, msg, suffix) {
            var now = Date.now();
            var msec = now - startTime;
            console.log("Uptime is " + msec + " milliseconds");
            var days = Math.floor(msec / 1000 / 60 / 60 / 24);
            msec -= days * 1000 * 60 * 60 * 24;
            var hours = Math.floor(msec / 1000 / 60 / 60);
            msec -= hours * 1000 * 60 * 60;
            var mins = Math.floor(msec / 1000 / 60);
            msec -= mins * 1000 * 60;
            var secs = Math.floor(msec / 1000);
            var timestr = "";
            timestr += days > 0 ? days + " days " : "";
            timestr += hours > 0 ? hours + " hours " : "";
            timestr += mins > 0 ? mins + " minutes " : "";
            timestr += secs > 0 ? secs + " seconds " : "";
            msg.channel.sendMessage("Uptime: " + timestr);
        }
    },
    "confirm" : {
        usage: "<sale ID>, <buyer>",
        description: "Confirms a sale of an item to a purchaser and removes it from the market",
        process: function(bot, msg, args) {
            // Check that sale ID is valid and the messenger owns the sale
            // If so, remove the sale and credit the buyer & seller with a confirmed transaction
        }
    },
    "unsell" : {
        usage: "<sale ID>",
        description: "Remove an item you put up for sale from the market.\n" +
                     "You can get the sale IDs from items you have up for sale with !mySales",
        process: function(bot, msg, args) {
            // Check that the sale ID is valid and the messenger owns the sale
            // If so, remove the sale
        } 
    },
    "unbuy" : {
        usage: "<sale ID>",
        description: "Remove an item you put up for sale from the market.\n" +
                     "You can get the sale IDs from items you have up for sale with !mySales",
        process: function(bot, msg, args) {
            // Check that the sale ID is valid and the messenger owns the sale
            // If so, remove the sale
        }
    },
    "myBuys" : {
        usage: "",
        description: "Lists all outstanding purchase orders created by you.",
        process: function(bot, msg) {
            // Send list of all purchase orders with buyer ID matching messenger
        }
    },
    "mySells": {
        usage: "",
        description: "Lists all outstanding items for sale by you.",
        process: function(bot, msg) {
            // Send list of all sales orders with seller ID matching messenger
        }
    }
}

client.on('ready', function() {
    console.log('I am ready');
    console.log(client.uptime);
    console.log(client.user);
});

client.login(AuthDetauls.token);