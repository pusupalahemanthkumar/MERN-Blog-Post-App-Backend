// Importing Required Files And Packages Here.
const Post = require("../models/Post");

// Defining Main Logic Here.
const createPost = (req, res, next) => {
  const title = req.body.title;
  const body = req.body.body;
  const author = req.body.author;

  const post = new Post({
    title: title,
    body: body,
    author: author,
  });
  post
    .save()
    .then(
      res.send({
        message: "Success! A new Post has been created.",
        post: post,
      })
    )
    .catch((err) => {
      const error = new Error("Post could not be created.");
      error.error = err;
      next(error);
    });
};

const getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => {
      res.send({
        message: "Success! All posts Fetched.",
        posts: posts,
      });
    })
    .catch((err) => {
      const error = new Error("Post could not be created.");
      error.error = err;
      next(error);
    });
};
const getSinglePost = (req, res, next) => {
  const postId = req.params.postId;
  console.log(postId);
  Post.findOne({ _id: postId })
    .then((post) => {
      res.send({
        message: "Success!  post Fetched.",
        post: post,
      });
    })
    .catch((err) => {
      const error = new Error("Post could not be created.");
      error.error = err;
      next(error);
    });
};
module.exports = { getAllPosts, getSinglePost, createPost };
