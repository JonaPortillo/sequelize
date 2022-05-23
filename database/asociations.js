const Post = require('./models/Post')
const User = require('./models/User')
const Address = require('./models/Address')

// Uno a uno
// Usuario tiene una dirección
// añadir una clave foránea a la tabla
User.hasOne(Address,{as: "domicilio", foreignKey:"residente_id"})

// Añade una clave user Id a la tabla addresses
Address.belongsTo(User,{as: "residente",foreignKey:"residente_id"})

// Uno a muchos, 1 a N
// Un usuario va  atener muchos posts o publicaciones
//Se añade una clave userId a la pabla post
User.hasMany(Post, {as: 'publicaciones', foreignKey:'autorId'});

//Se añade una clave userId a la pabla post
Post.belongsTo(User, {as:'autor'})
