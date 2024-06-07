const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const downloads_historySchema = new Schema({
  download_date: Date,
  status: Boolean,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  security_tool_id: {
    type: Schema.Types.ObjectId,
    ref: "SecurityTools",
    required: true,
  },
});

module.exports = mongoose.model("DownloadHistory", downloads_historySchema);
