import express  from "express";
import { getAllProducts,createProduct,updateProduct,deleteProduct,getProductDetails,createProductReview, getProductReviews, deleteProductReviews} from "../controllers/productController.js";
const router = express.Router()
import { isAuthenticatedUser,authorizeRoles } from "../middleware/auth.js";


router.route("/products").get(getAllProducts)
router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
                            .delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)
                            
router.route("/products/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteProductReviews)

export default router;
