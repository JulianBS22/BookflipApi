const mongoose = require('mongoose');

// Definir el esquema de usuarios
const userSchema = mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true 
},
  /*email: { 
    type: String, 
    required: true, 
    unique: true 
},*/
  password: { 
    
    type: String, 
    required: true 
},
  
});

// Crear el modelo de usuarios
const User = mongoose.model('User', userSchema);


module.exports = User;