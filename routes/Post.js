// Importing Required Files And Packages Here.
const express=require("express");
const router=express.Router();
const PostController=require("../controllers/Post");

// Post Routes
router.get("/",PostController.getAllPosts);
router.get("/get/:postId",PostController.getSinglePost);
router.post("/create",PostController.createPost);

module.exports=router;