const mongoose = require('mongoose');
const {Schema} = mongoose;
// Definir el esquema de usuarios
const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  email: { 
    type: String, 
    required: true, 
    unique: true 
},
  password: { 
    
    type: String, 
    required: true 
},
  
});


// Crear el modelo de usuarios
const UserModel = mongoose.model('User', userSchema);


module.exports = UserModel;