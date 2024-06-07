const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstname: String,
  lastname: String,
  hashed_password: String,
  email: String,
  phone: String,
  os_version: String,
  downloads_history: [
    {
      type: Schema.Types.ObjectId,
      ref: "DownloadHistory",
    },
  ],
  updates_log: [
    {
      type: Schema.Types.ObjectId,
      ref: "UpdatesLog",
    },
  ],
  app_config: [
    {
      type: Schema.Types.ObjectId,
      ref: "AppConfig",
    },
  ],
});

module.exports = mongoose.model("User", userSchema);
