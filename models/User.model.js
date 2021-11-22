const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["PLAYER", "BUSINESS", "PM"],
      default: "PLAYER",
    },
    image: {
      type: String,
      default: "/images/blank-profile-picture.png",
    },
    description: {
      type: String,
      default: "Im Here",
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
