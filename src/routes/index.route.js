import {Router} from 'express';
import userRouter from './user.route.js';
import playerRoute from './player.route.js';
import teamRouter from './team.route.js';
const router = Router();

router.use('/user',userRouter);
router.use('/team',teamRouter);
router.use('/player',playerRoute);

export  {router};


