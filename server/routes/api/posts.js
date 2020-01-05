const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get Posts
router.get('/', async (req, res) => { // res.send('hello');
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
})

// Add Post
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
})

// Delete Post
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send('done');
})

async function loadPostsCollection() {
    try{
        const client = await mongodb.MongoClient.connect
        ('path/to/mongodb/uri', {
            useUnifiedTopology: true 
        });  
        return client.db('vue_express').collection('posts');

    }catch(e){
        console.log('error', e);
    }
}


module.exports = router;