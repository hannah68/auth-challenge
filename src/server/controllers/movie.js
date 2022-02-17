const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

const jwtSecret = 'mysecret';


const createMovie = async (req, res) => {
    const { title, description, runtimeMins } = req.body;
    const { authorization } = req.headers;

    try{
        const token = authorization;
        jwt.verify(token, jwtSecret);
    }catch(e){
        return res.status(401).json({error: 'Invalid Token Provided.'})
    }

    const movie = await prisma.movie.create({
        data: {
            title,
            description,
            runtimeMins
        }
    });
    res.json(movie);
}

const getMovies = async (req, res) => {
    const movie = await prisma.movie.findMany();
    return res.json(movie);
}

module.exports = {
    createMovie,
    getMovies
}