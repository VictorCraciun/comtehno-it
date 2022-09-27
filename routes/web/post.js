var express = require("express");

var ensureAuthenticated = require("../../auth/auth").ensureAuthenticated;

var Post = require("../../models/post");

var router = express.Router();

router.use(ensureAuthenticated);
router.use(express.static("./public"));
// router.use(express.static("./css"));

router.get("/", function(req, res){
    Post.find({useId:req.user._id}).exec(function(err, posts){
        if(err){console.log(err);}
        res.render("post/posts", {posts:posts});
    });
});

router.get("/add", function(req, res){
    console.log("Hello I'am an /add posts");
    res.render("post/addpost");
});

router.post("/add", function(req, res){
    var newPost = new Post({
        title:req.body.title,
        content:req.body.content,
        userId:req.user._id
    });

    newPost.save(function(err, post){
        if(err){console.log(err)}
        res.redirect("/post");
    });

});

//: means a route parameter it could be anyrhing and it's often an ID
router.get("/:postId", function(req,res){
    Post.findById(req.params.postId).exec(function(err, post){
        res.render("post/detailpost",{post:post});
    });
});

router.get("/edit/:postId", function(req,res){
    Post.findById(req.params.postId).exec(function(err, post){
        res.render("post/editpost",{post:post});
    });
});

router.post("/update",async function(req, res){
    const post = await Post.findById(req.body.postid);
    post.title = req.body.title;
    post.content = req.body.content;
    //post.save();
    try {
         let savePost = await post.save();
         console.log("savepost", savePost);
         res.redirect("/posts/" + req.body.postid);
    } catch (err) {
        console.log("error hapened");
        res.status(500).send(err);
    }
});

module.exports = router;