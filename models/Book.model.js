const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    date: {
      type: Date,
      require: true,
    },
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
