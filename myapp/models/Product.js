import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
    {
      title: {
        type: String,
      },
      desc: {
        type: String,
      },
      prices: {
        type: [Number],
      },
      selection: {
        type: [String]
      },
      prep: {
        type: String,
        enum: ['fried', 'steam', 'raw'],
    },
    instrutions: {
        type: String
    },
      sides: {
        type: [
          {
            text: { type: String},
            price: { type: Number },
          },
        ],
      },
      drinks: {
        type: [
          {
            text: { type: String},
            price: { type: Number },
          },
        ],
      },
      extraOptions: {
        type: [
          {
            text: { type: String},
            price: { type: Number },
          },
        ],  
      },
    },
    { timestamps: true }
  );
  
  export default mongoose?.models?.Product || mongoose.model("Product", ProductSchema)