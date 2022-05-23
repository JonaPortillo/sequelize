const express = require('express');
const router = express.Router();
const Post = require('../database/models/Post');
const User = require('../database/models/User');

// INDEX
router.get('/', (req, res) => {
    Post.findAll({
        include: {
            model: User,
            as: 'autor',
            attributes: ['name']
        },
        attributes: ['title', 'body']
    })
        .then(posts => res.json(posts))
        .catch(e => console.log(e))
})

//CREATE
router.post('/', (req, res) => {
    const { title, body } = req.body;
    Post.create({
        title: title,
        body: body
    }).then(post => {
        res.json(post);
    }).catch(e => console.log(e))
})

//READ
router.get('/:id', (req, res) => {
    Post.findByPk(req.params.id)
        .then(post => {
            res.json(post);
        }).catch(e => console.log(e))
})

//UPDATE
router.patch('/:id', (req, res) => {
    const { title, body } = req.body;
    Post.update({
        title: title,
        body: body
    }, {
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(e => console.log(e))
})


//DELETE
router.delete('/:id', (req, res) => {
    Post.destroy({
        where: {
            id: req.params.id
        }
    }).then(result => {
        res.json(result);
    }).catch(e => console.log(e))
})

module.exports = router