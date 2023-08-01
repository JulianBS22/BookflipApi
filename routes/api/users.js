const express = require ('express');
const router = express.Router();

const User = require('../../models/users');

// POST /api/users/register
// Ruta para el registro de nuevos usuarios
router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const existingUser = await findOne({ username });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists' });
    }

    // Crear un nuevo usuario
    const newUser = new User({ username, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
});

// POST /api/users/login
// Ruta para el inicio de sesión de usuarios
router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // Verificar si el usuario existe en la base de datos
    const user = await findOne({ username });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Verificar la contraseña del usuario
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;