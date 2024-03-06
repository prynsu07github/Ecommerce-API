import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: {
    type: Number,
    required: [true, "Please Enter the stock."],
    default: 1,
    maxLength: [4, "Stocks cannot be exceeded."],
  },
  image: { type: String, required: true },
  noOfReviws: {
    rate: Number,
    count: Number,
  },
  reviews: [
    {
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        default: 0,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;



// const getProductData = async() => {
//   const res = await fetch("https://fakestoreapi.com/products")
//   const data = await res.json()
//   data.map(async(data) =>{
//     await Product.create({
//       "name": data.title ,
//       "description": data.description,
//       "price": data.price,
//       "category": data.category,
//       "stock":100,
//       "image": data.image
//   })
//   })
// }
// getProductData()