const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const bookSchema = new Schema(
  {
    cyber_id: { type: Schema.Types.ObjectId, ref: "Cyber" },
    date: {
      type: Date,
      required: true,
    },
    participants: Number,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

const Book = model("Book", bookSchema);

module.exports = Book;
