const CT_ACCOUNT_ID = "948-4KK-444Z"
const CT_ACCOUNT_PASSCODE = "QAE-AWB-AAAL"

const CleverTap = require('./lib/clevertap');
const clevertap = CleverTap.init(CT_ACCOUNT_ID, CT_ACCOUNT_PASSCODE);

var t = Math.floor((new Date).getTime()/1000);

var data = [
            {"type":"event",
                "identity":"6264372124",
                "evtName":"choseNewFavoriteFood", 
                "evtData":{
                    "value":"sushi"
                    },
                },

            {"type":"profile", 
                "identity":"6264372124",
                "ts":t, 
                "profileData":{
                    "favoriteColor":"green",
                    "Age":30,
                    "Phone":"+14155551234",
                    "Email":"peter@foo.com",
                    }, 
                },

            {"type":"event",
              "FBID":"34322423",
              "evtName":"Product viewed",
              "evtData":{
                "Product name":"Casio Chronograph Watch",
                "Category":"Mens Watch",
                "Price":59.99,
                "Currency":"USD"
                },
              },

            {'type': 'profile',
                'objectId': "-2ce3cca260664f70b82b1c6bb505f462", 
                'profileData': {'favoriteFood': 'hot dogs'}
                }, 

            {'type': 'event',
                'objectId': "-2ce3cca260664f70b82b1c6bb505f462",
                'evtName': 'choseNewFavoriteFood',
                'evtData': {}
                },

            {"type":"event",
              "identity":"jack@gmail.com",
              "ts":t,
              "evtName":"Charged",
              "evtData":{
                "Amount":300,
                "Currency":"USD",
                "Payment mode":"Credit Card",
                "Items":[
                  {
                    "Category":"books",
                    "Book name":"The millionaire next door",
                    "Quantity":1
                    },
                  {
                    "Category":"books",
                    "Book name":"Achieving inner zen",
                    "Quantity":4
                    }
                  ]
                },
              },
            ];


// callback style
clevertap.upload(data, {"debug":1, batchSize:1000}, (res) => {_log("upload", res)});

// or if you prefer Promises
//clevertap.upload(data, {"debug":1, batchSize:1000}).then( (res) => {_log("upload", res)} );

var query = {"event_name":
            "choseNewFavoriteFood",
            "props": 
            [{"name":"value","operator":"contains", "value":"piz"}],
            "from": 20150810,
            "to": 20151025
        }

// callback style
//clevertap.events(query, {debug:1, batchSize:6000}, (res) => {_log("events", res)});

// or if you prefer Promises
clevertap.events(query, {debug:1, batchSize:6000}).then( (res) => {_log("events", res)} );

query = {"event_name":
            "choseNewFavoriteFood",
            "props": 
            [{"name":"value","operator":"contains", "value":"piz"}],
            "from": 20150810,
            "to": 20151025
        }

//callback style
//clevertap.profile({"objectId":"-2ce3cca260664f70b82b1c6bb505f462", debug:1}, (res) => {_log("profile", res)});

// or if you prefer Promises
clevertap.profile({"objectId":"-2ce3cca260664f70b82b1c6bb505f462", debug:1}).then( (res) => {_log("profile", res)} );

//callback style
//clevertap.profiles(query, {debug:1, batchSize:200}, (res) => {_log("profiles", res)});

// or if you prefer Promises
clevertap.profiles(query, {debug:1, batchSize:200}).then( (res) => {_log("profiles", res)} );


var _log = (type, result) => {
    console.log("\n");
    console.log(`${type} result is: `);
    console.log(JSON.stringify(result, null, 4));
};    
