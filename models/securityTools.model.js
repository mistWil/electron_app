const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const security_toolsSchema = new Schema({
  name: String,
  description: String,
  url: String,
  version: String,
  updated_at: Date,
  downloads_history: [
    {
      type: Schema.Types.ObjectId,
      ref: "DownloadHistory",
    },
  ],
});

module.exports = mongoose.model("SecurityTools", security_toolsSchema);
