const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const updates_logSchema = new Schema({
  update_description: String,
  status: String,
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = mongoose.model("UpdatesLog", updates_logSchema);
