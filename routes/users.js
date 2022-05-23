const express = require('express');
const router = express.Router();
const User = require('../database/models/User')
const Address = require('../database/models/Address');
const Post = require('../database/models/Post');

// INDEX
// Mostrar todos los usuarios
router.get('/', (req, res) => {
    User.findAll({
        include: [{
            model: Address,
            as: 'domicilio',
            attributes: ['street']
        },
        {
            model: Post,
            as: 'publicaciones',
            attributes: ['title', 'body'],
            where: {
                title: "Foo"
            }
        }],
        attributes: ['name', 'email', 'age']
    })
        .then(users => res.json(users))
        .catch(e => console.log(e))
})

// Ver la dirreción de usuario /api/users/:id/domicilio
router.get('/:id/domicilio', (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            user.getDomicilio()
                .then(domicilio => {
                    res.json(domicilio)
                })
        })
})

// Ver las publicaciones de usuario /api/users/:id/publicaciones
router.get('/:id/publicaciones', (req, res) => {
    User.findByPk(req.params.id)
        .then(user => {
            user.getPublicaciones()
                .then(publicaciones => {
                    res.json(publicaciones)
                })
        })
})

//CREATE api/users
router.post('/', (req, res) => {
    const { name, email, age, street } = req.body;
    User.create({
        name: name,
        email: email,
        age: age,
        domicilio: {
            street: street
        }
    }, {
        include: 'domicilio'
    }
    ).then(user => {
        res.json(user)
    }).catch(e => res.json(e))
})


module.exports = router