import  { isAuthenticatedUser, authorizeRole } from "../middleware/Auth.js";
import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  productDetail,
  searchProduct,
  updateProduct,
} from "../controller/product.controller.js";

const router = express.Router();
router.get("/products" , getAllProducts);
router.get("/product/:id",productDetail);
router.get('/products/search' , searchProduct) 
//admin tasks
router.post("/product/new", isAuthenticatedUser , authorizeRole , createProduct); 
router.put("/product/:id" , isAuthenticatedUser , authorizeRole, updateProduct); 
router.delete("/product/:id", isAuthenticatedUser , authorizeRole, deleteProduct);


export default router

