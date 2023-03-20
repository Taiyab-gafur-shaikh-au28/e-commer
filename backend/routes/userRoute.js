import express  from "express";
import { registerUser,loginUser,forgotPassword,resetPassword,logout,getUserDetails,updatePassword,updateProfile,getAllUsers,getAllUser,updateUserRole,deleteUser} from "../controllers/userController.js";
import {isAuthenticatedUser,authorizeRoles} from "../middleware/auth.js"
const router = express.Router()

router.post("/register",registerUser)
router.post("/login",loginUser)
router.post("/password/forgot",forgotPassword)
router.put("/password/reset/:token",resetPassword)
router.get("/logout",logout)
router.get("/me",isAuthenticatedUser,getUserDetails)
router.put("/password/update",isAuthenticatedUser,updatePassword)
router.put("/me/update",isAuthenticatedUser,updateProfile)
router.get("/admin/users",isAuthenticatedUser,authorizeRoles("admin"),getAllUsers)
router.get("/admin/users/:id",isAuthenticatedUser,authorizeRoles("admin"),getAllUser)
router.put("/admin/users/:id",isAuthenticatedUser,authorizeRoles("admin"),updateUserRole)
router.delete("/admin/users/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteUser)
// router.put("/admin/update",isAuthenticatedUser,updateProfileByAdmin)




export default router;