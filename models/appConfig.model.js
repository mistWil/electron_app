const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const app_configSchema = new Schema({
  security_tool_id: Number,
  download_date: Date,
  status: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("AppConfig", app_configSchema);
