import express from 'express'
import { forgetPassword, logOutUser, loginUser, registerUser, resetPassword } from '../controller/user.controller.js'

const router = express.Router()

router.post('/user/register' , registerUser)
router.post('/user/login' , loginUser )
router.get('/user/logout' , logOutUser )
router.post('/user/reset/password' , forgetPassword)
router.put('/password/reset/:token' , resetPassword)

export default router