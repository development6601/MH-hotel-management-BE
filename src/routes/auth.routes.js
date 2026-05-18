import { Router } from 'express';
import { registerUser, loginUser, logoutUser, forgotPassword } from '../controllers/auth.controller.js'
import { registerValidator, loginValidator, forgotPasswordValidator } from '../validators/auth.validator.js';
import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads/')
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const uniqueName = `${path.basename(file.originalname, ext)}-${Date.now()}${ext}`;
        cb(null, uniqueName);
    }
})

const upload = multer({ storage: storage })

const authRouter = Router();

authRouter.post('/register', upload.single('proflie_pic'), registerValidator, registerUser);

authRouter.post('/login', loginValidator, loginUser);

authRouter.post("/forgotPassword", forgotPasswordValidator, forgotPassword);

authRouter.get('/logout', logoutUser);

export default authRouter;
