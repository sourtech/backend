import mongoose from "mongoose";

const collection = "carts";

const schema = new mongoose.Schema(
  {    
    products: []
  },
  { timestamps: { createdAt: "created_at" } }
);

const cartModel = mongoose.model(collection, schema);

export default cartModel;