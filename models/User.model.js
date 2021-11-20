const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    role: {
      type: String,
      enum: ["PLAYER", "BUSSINES", "PM"],
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
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
