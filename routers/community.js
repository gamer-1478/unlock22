const { ensureAuthenticated } = require('../utilities/auth');
const Post = require('../schemas/postSchema');
const router = require('express').Router();

router.get('/', ensureAuthenticated, async (req, res)=>{
    Post.find({}).sort({createdAt: -1}).exec((err, posts)=>{
        if(err){
            console.log(err);
            res.render('error', {user: req.user, error: err});
        }
        else{
            res.render('community', {user: req.user, posts: posts});
        }
    })
})

router.get('/new', ensureAuthenticated, (req, res)=>{
    res.render('newPost', {user: req.user});
})

router.get('/:id', ensureAuthenticated, async (req, res)=>{
    Post.findById(req.params.id).exec((err, post)=>{
        if(err){
            console.log(err);
            res.render('error', {user: req.user, error: err});
        }
        else{
            res.render('post', {user: req.user, post: post});
        }
    })
})

router.post('/', ensureAuthenticated, async (req, res)=>{
    const {title, content, type} = req.body;
    const newPost = new Post({
        title: title,
        content: content,
        type: type,
        author: req.user._id,
    })
    newPost.save().then(_=>{
        res.send({sucess: true, link: '/community/'+newPost._id, msg: "Post created successfully"});
    })
});

module.exports = router;