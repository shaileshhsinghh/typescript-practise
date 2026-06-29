import {Router} from 'express';
import {registerUser, loginUser} from '../controllers/authentication.js';
import {protect} from '../middlewares/authorisation.js'
import {createTodo, getTodos, updateTodo, deleteTodo} from '../controllers/crud.js';

const router : Router = Router();

router.post('/register',registerUser);

router.post('login',protect,loginUser);

router.get('/getall',protect,getTodos);

router.post('/create',protect,createTodo);

router.patch('/update/:id',protect,updateTodo);

router.delete('/delete/:id',protect,deleteTodo);

export default router;