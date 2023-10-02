import express from 'express'
import { deleteUser, getUser, login,logout,register, updateUser } from '../Controllers/Auth.js'
import { verifyJwt } from '../Middleware/VerifyToken.js'


const router = express.Router()

router.post('/registerUser',register)
router.post('/userLogin',login)
router.post('/userLogout', logout)
router.get('/user', verifyJwt, getUser)
router.put('/update/', updateUser)
router.post('/delete/:id', deleteUser)



export default router