import mongoose from "mongoose";

const collection = "tickets";

const schema = new mongoose.Schema(
  {
    id: String,
    code: String,
    amount: Number,
    purchaser: String, //el correo del usuario
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const ticketModel = mongoose.model(collection, schema);

export default ticketModel;