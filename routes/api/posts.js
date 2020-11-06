const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Profile = require('../../models/Profile');
const Post = require('../../models/Post');
// @route POST api/posts
// @desc create a post
// @access Private
router.post('/', 
[
  auth,
  [
    check('text', 'Text is required').notEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  
  if(!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const user = await User.findById(req.user.id).select('-password');
    const newPost = new Post({
      user: user.id,
      avatar: user.avatar,
      name: user.name,
      text: req.body.text,
    })
    const post = await newPost.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }

});
// @route GET api/posts
// @desc get all posts
// @access Private
router.get('/', auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1});
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
// @route GET api/posts/:post_id
// @desc get post by id
// @access Private
router.get('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if(!post) return res.status(404).json({ msg: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error')
  }
})
// @route Delte api/posts/:post_id
// @desc delete post by id
// @access Private
router.delete('/:post_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    // check user own post
    if(!post) return res.status(404).json({ msg: 'Post not found' })
    if(post.user.toString() !== req.user.id){
      //post.user ObjectId
      return res.status(401).json({ msg: 'User not authorized' })
    }
    await post.remove();
    return res.json({ msg: 'Post deleted' })
  } catch (err) { 
    console.error(err.message);
    if(err.kind === 'ObjectId'){
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.status(500).send('Server error')
  }
})
// @route put api/posts/like/:post_id
// @desc like post
// @access Private
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if user already like
    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
      return res.status(400).json({ msg: 'Post has already been liked' })
    }
    post.likes.unshift({user : req.user.id});
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
// @route put api/posts/unlike/:post_id
// @desc unlike post
// @access Private
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
      return res.status(400).json({ msg: 'Post has not been liked' })
    }
    const index = post.likes.map(like => like.user).indexOf(req.user.id);
    post.likes.splice(index, 1);
    await post.save();
    return res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
// @route post api/posts/comments/:id
// @desc add comment to post
// @access Private
router.post('/comments/:id', 
[
  auth,
  [
    check('text', 'Text is required').notEmpty()
  ]
], async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({ errors: errors.array() })
  }
  
  try {
    const user = await User.findById(req.user.id).select('-password');
    const post = await Post.findById(req.params.id);
    const newPost = {
      user: user.id,
      avatar: user.avatar,
      name: user.name,
      text: req.body.text,
    }
    post.comments.unshift(newPost);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
// @route delete api/posts/comments/:id/:comment_id
// @desc delete comment to post
// @access Private
router.delete('/comments/:id/:comment_id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    const comment = post.comments.find(comment => comment.id === req.params.comment_id);
    if(!comment){
      return res.status(404).json({ msg: 'Comment does it exist' })
    }
    if(comment.user.toString() !== req.user.id){
      return res.status(401).json({ msg: 'User not authorized' })
    }
    const index = post.comments.indexOf(comment => comment.id === req.params.comment_id);
    post.comments.splice(index, 1);
    await post.save()
    return res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error')
  }
})
module.exports = router;