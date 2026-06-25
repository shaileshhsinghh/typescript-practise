import { Router , Request , Response} from 'express';

const router : Router = Router();

router.get('/check',(req:Request, res:Response)=>{
    res.json({msg : "route working"});
});

export default router;