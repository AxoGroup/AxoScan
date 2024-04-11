import User from '../models/userModel';

const userController = {};

userController.loginUser = async (req, res, next) => {
    const {username, password} = req.body;

    if(!username || !password){
        return next({
            log: 'missing username or password in userController.loginUser',
            status: 400,
            message: 'verify username and password'
        })
    }
    try {
        const user = await User.findOne(req.body)
        res.locals.user = user; 
        next(); 
    } catch (error) {
        throw new Error('Username/password not found')
    }
}