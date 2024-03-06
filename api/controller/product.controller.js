/* eslint-disable no-unused-vars */
import Product from "../models/products.model.js";
import errorHandler from "../utils/errorHandler.js";

//get all existing product
const getAllProducts = async (req, res, next) => {
  try {
    const productCount = await Product.countDocuments()
    const products = await Product.find({});
    res.json({
      success: true,
      productCount,
      products,
    });
  } catch (error) {
    next(error);
  }
};

//create product
const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

//get product detail
const productDetail = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

//update product details
const updateProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
};

//delete product
const deleteProduct = async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);
    if (!product) {
      return next(errorHandler(404, "Product not found"));
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Product delete successfully",
    });
  } catch (error) {
    next(error);
  }
};

//search product 
const searchProduct = async(req,res,next)=>{
  try {
    const searchTerm = req.query.searchTerm || ""
    const category = req.query.category || ""
    let page = parseInt(req.query.page) ||  0;
    let limit = 5;
    const skip = limit*(page-1);

    const product = await Product.find({name:{$regex:searchTerm , $options:'i'} ,category:{$regex:category , $options:"i"}}).limit(limit).skip(skip)
    if(!product){
      next(errorHandler(404 , "Product not found"))
    }
    res.status(200).json({
      success:true,
      product
    })
  } catch (error) {
    next(error)
  }
}

export {
  getAllProducts,
  createProduct,
  productDetail,
  updateProduct,
  deleteProduct,
  searchProduct
};
