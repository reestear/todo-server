const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  val: String,
  done: Boolean,
  trash: Boolean,
});

todoSchema.statics.getActive = function () {
  return this.find({ done: false, trash: false });
  //   return [{ val: "some", done: false, trash: false }];
};

todoSchema.statics.getDone = async function () {
  return await this.find({ done: true, trash: false });
};

todoSchema.statics.getTrash = async function () {
  return await this.find({ trash: true });
};

module.exports = mongoose.model("ToDo", todoSchema);
