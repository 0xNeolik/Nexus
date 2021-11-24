const mongoose = require("mongoose");

module.exports = {
  cleanText: (text) => text.trim(),
  checkMongoID: (id) => mongoose.Types.ObjectId.isValid(id),
  isOwner: (person, user) => person.id == user._id,
  isBussines: (person) => person.role == "BUSINESS",
};
