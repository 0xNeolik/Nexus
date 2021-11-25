const mongoose = require("mongoose");

module.exports = {
  cleanText: (text) => text.trim(),
  checkMongoID: (id) => mongoose.Types.ObjectId.isValid(id),
  isOwner: (person, user) => person.id == user._id,
  isBusiness: (person) => person.role === "BUSINESS",
  isOwnerCyber:(cybers, person) => person._id === cybers.owner.id
};
