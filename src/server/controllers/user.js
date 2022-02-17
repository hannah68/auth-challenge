const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const jwtSecret = 'mysecret';
const saltRounds = 10;

// post a register form =================
const register = async (req, res) => {
    const { username, password } = req.body;
    
    const hash = await bcrypt.hash(password, saltRounds);
    const user = await prisma.user.create({
        data: {
            username,
            password: hash
        }
    });
    return res.json(user)
}

// post a login form=====================
const login = async (req, res) => {
    const { username, password } = req.body;

    const foundUser = await prisma.user.findUnique({
        where: {
            username
        }
    });

    if(!foundUser){
        return res.status(401).json({error: "Invalid Username or Password."})
    }

    const match = await bcrypt.compare(password, foundUser.password);

    if (!match) {
        return res.status(401).json({ error: 'Invalid username or password.' });
    }

    const token = jwt.sign({username}, jwtSecret);
    return res.json(token);
}


module.exports = {
    register,
    login
}