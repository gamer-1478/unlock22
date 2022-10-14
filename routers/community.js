const { ensureAuthenticated } = require('../utilities/auth');
const Post = require('../schemas/postSchema');
const userSchema = require('../schemas/userSchema');
const router = require('express').Router();

router.get('/', ensureAuthenticated, async (req, res) => {
    Post.find({}).sort({ date: -1 }).exec(async (err, posts) => {
        if (err) {
            console.log(err);
            res.render('error', { user: req.user, error: err });
        }
        else {
            for (let i = 0; i < posts.length; i++) {
                posts[i] = posts[i].toObject();
                posts[i].author = await userSchema.findById(posts[i].author);
                posts[i].author = posts[i].author.toObject();

                if (posts[i].content.length > 20) {
                    posts[i].content = posts[i].content.substring(0, 20) + "...";
                }
                if (i == posts.length -1 ){
                    res.render('community', { user: req.user, posts: posts });
                }
            }
        }
    })
})

router.get('/new', ensureAuthenticated, (req, res) => {
    res.render('newPost', { user: req.user });
})

router.get('/:id', ensureAuthenticated, async (req, res) => {
    Post.findById(req.params.id).exec(async (err, post) => {
        if (err) {
            console.log(err);
            res.render('error', { user: req.user, error: err });
        }
        else {
            post = post.toObject();
            post.author = await userSchema.findById(post.author);
            res.render('post', { user: req.user, post: post });
        }
    })
})

router.post('/', ensureAuthenticated, async (req, res) => {
    const { title, content, type } = req.body;
    const newPost = new Post({
        title: title,
        content: content,
        type: type,
        author: req.user._id,
    })
    newPost.save().then(_ => {
        res.send({ sucess: true, link: '/community/' + newPost._id, msg: "Post created successfully" });
    })
});

router.post('/like/:id', ensureAuthenticated, async (req, res) => {
    Post.findById(req.params.id).exec(async (err, post) => {
        if (err) {
            console.log(err);
            res.render('error', { user: req.user, error: err });
        }
        else {
            if (post.likes.includes(req.user._id)) {
                post.likes.splice(post.likes.indexOf(req.user._id), 1);
            }
            else {
                post.likes.push(req.user._id);
            }
            post.save().then(_ => {
                res.send({ success: true, msg: "Post liked successfully" });
            })
        }
    })
})

router.post('/dislike/:id', ensureAuthenticated, async (req, res) => {
    Post.findById(req.params.id).exec(async (err, post) => {
        if (err) {
            console.log(err);
            res.render('error', { user: req.user, error: err });
        }
        else {
            if (post.dislikes.includes(req.user._id)) {
                post.dislikes.splice(post.dislikes.indexOf(req.user._id), 1);
            }
            else {
                post.dislikes.push(req.user._id);
            }
            post.save().then(_ => {
                res.send({ success: true, msg: "Post disliked successfully" });
            })
        }
    })
})

router.post('/comment/:id', ensureAuthenticated, async (req, res) => {
    Post.findById(req.params.id).exec(async (err, post) => {
        if (err) {
            console.log(err);
            res.render('error', { user: req.user, error: err });
        }
        else {
            post.comments.push({ author: req.user.name, content: req.body.content });
            post.save().then(_ => {
                res.send({ success: true, msg: "Comment posted successfully" });
            })
        }
    })
})

module.exports = router;