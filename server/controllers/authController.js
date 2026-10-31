const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Registrar un nuevo usuario
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el correo ya está registrado
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: 'El correo ya está registrado' });

        // Encriptar la contraseña (Nunca guardar texto plano)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Crear y guardar el usuario
        user = new User({ username, email, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Iniciar Sesión
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // 1. Buscar si el usuario ya existe
        let user = await User.findOne({ email });

        // 2. Si NO existe, lo registramos automáticamente
        if (!user) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            // Usamos la parte del correo antes del @ como nombre de usuario
            const username = email.split('@')[0]; 
            
            user = new User({ username, email, password: hashedPassword });
            await user.save();
        } else {
            // 3. Si existe, validamos que la contraseña sea correcta
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ message: 'Contraseña incorrecta' });
        }

        // 4. Generar el token y devolver datos
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.json({
            token,
            user: { id: user._id, username: user.username, email: user.email }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};