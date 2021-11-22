const { Schema, model } = require("mongoose");
// TODO: Please make sure you edit the user model to whatever makes sense in this case
const cyberSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      default: "Please, enjoy the place",
    },
    limit: Number,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    location: {
      type: {
        type: String,
      },
      coordinates: [Number],
    },
  },
  {
    timestamps: true,
  }
);

cyberSchema.index({ location: "2dsphere" });

const Cyber = model("Cyber", cyberSchema);

module.exports = Cyber;
