const mongoose = require("mongoose");

const User = new mongoose.Schema({
  id: { type: String, unique: true, required: true },

  whitelistOpen: { type: Boolean, default: false }

});


const Guild = new mongoose.Schema({
  id: { type: String, unique: true, required: true },
  owner: { type: String },

  stats: {
    msgid: { type: String, default: null, unique: false },
    msgChannel: { type: String, default: null, unique: false },
    serverIp: { type: String, default: null, unique: false },
    ipc: { type: String, default: null, unique: false },
    url: {type:String, default:null, unique: false},
    message:{type:Object, default: null}
  },

  ticket: {
    report: { type: String, unique: false, default: null },
    billing: { type: String, unique: false, default: null },
    support: { type: String, unique: false, default: null },
  },

  autoRole:{type:String, default:null},
  approvedRole:{type:String, default:null},

  whitelistCategory: { type: String, default: null, unique: false },
  approvedChannel: { type: String, default: null, unique: false },
  reprovedChannel: { type: String, default: null, unique: false },

  joinChannel: { type: String, default: null, unique: false },
  quitChannel: { type: String, default: null, unique: false },

  admins: { type: Object, default: {} },

});

module.exports = {
  User: mongoose.model("User", User),
  Guild: mongoose.model("Guild", Guild),
};