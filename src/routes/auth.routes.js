import { Router } from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/auth.controller.js'
import { registerValidator, loginValidator } from '../validators/auth.validator.js';

const authRouter = Router();

authRouter.post('/register', registerValidator, registerUser);

authRouter.post('/login', loginValidator, loginUser);

authRouter.get('/logout', logoutUser);

export default authRouter;
