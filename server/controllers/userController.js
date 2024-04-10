import { User } from '../models/models.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import process from 'process';
import 'dotenv/config';
const SALT_WORK_FACTOR = 10;

const userController = {};

userController.createUser = async (req, res, next) => {
  const { email, password } = req.body;
  // console.log('email', email, 'password', password);
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR); // generate a salt
    const pwEncrypt = await bcrypt.hash(password, salt); // encrypt the password
    // console.log('email', email, 'pwEncrypt', pwEncrypt);
    const user = await User.create({ email: email, password: pwEncrypt }); // create a new user
    // console.log('user', user);
    res.locals.user = user;
    const token = jwt.sign({ id: user._id }, process.env.VITE_SECRET_KEY, { expiresIn: '1hr' });
    res.cookie('token', token, { HttpOnly: true, secure: true });
    return next();
  } catch (error) {
    return next({
      log: 'Error in UserController.createUser middleware',
      message: { err: 'Error in UserController.createUser middleware' },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { user } = res.locals;
  console.log('email', email, 'password', password, 'user.password', user.password);
  try {
    const isMatch = await bcrypt.compare(password, user.password); // compare the password with the encrypted password in the database
    if (!isMatch) {
      // if password does not match
      console.log('invalid at !isMatch');
      return next({
        log: 'Error: password does not match the username',
        message: { err: 'Invalid userName and/or password' },
      });
    } else {
      console.log('user found');
      res.locals.user = user; // if user and password match then set the user in res.locals
      const token = jwt.sign({ id: user._id }, process.env.VITE_SECRET_KEY, {
        expiresIn: '1hr',
      });
      res.cookie('token', token, { HttpOnly: true, secure: true });
      return next();
    }
  } catch (error) {
    console.log(error);
    return next({
      log: 'Error in UserController.verifyUser middleware',
      message: { err: 'Error in UserController.verifyUser middleware' },
    });
  }
};

userController.findUser = async (req, res, next) => {
  // const { email } = req.params;
  const { email } = req.body;
  try {
    if (!email) {
      return next({
        log: 'Invalid username',
        message: { err: 'Invalid username or password' },
      });
    } else {
      const user = await User.findOne({ email }); // find the user by email (mongoose method)
      if (!user) {
        // if user does not exist
        return next({
          log: 'Invalid password',
          message: { err: 'Invalid username or password' },
        });
      } else {
        res.locals.user = user; // if user and password match then set the user in res.locals
        return next();
      }
    }
  } catch (error) {
    console.log(error);
    next({
      log: 'Error in UserController.findUser middleware',
      message: { err: 'Error in UserController.findUser middleware' },
    });
  }
};

userController.authenticateToken = async (req, res, next) => {
  const { token } = req.cookies;
  if (token === null) return res.status(403).json({ error: 'Unauthorized' });
  jwt.verify(token, process.env.VITE_SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(401).json({ error: 'Unauthorized' });
    } else {
      res.locals.decoded = decoded;
      return next();
    }
  });
};

export default userController;
