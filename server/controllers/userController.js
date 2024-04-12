import User from '../models/userModel.js';

const userController = {};

userController.loginUser = async (req, res, next) => {
    console.log('here');
    const {username, password} = req.body;

    if(!username || !password){
        return next({
            log: 'missing username or password in userController.loginUser',
            status: 400,
            message: 'verify username and password'
        })
    }
    try {
        if(await User.findOne(req.body)) { 
            return next()}
        else {
            return next({log: 'wrong'})
        }
    } catch (error) {
        throw new Error('Username/password not found')
    }
}

export default userController;