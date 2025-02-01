import {Router} from 'express';
import userRouter from './user.route.js';
import playerRoute from './player.route.js';
import teamRouter from './team.route.js';
import matchRouter from './match.route.js';
import foulRouter from './foul.route.js';
import goalRouter from './goal.route.js';
import SubstitutionRouter from './substitution.route.js';
import penaltyRouter from './penalty.route.js';
const router = Router();

router.use('/user',userRouter);
router.use('/team',teamRouter);
router.use('/player',playerRoute);
router.use('/foul',foulRouter);
router.use('/goal',goalRouter);
router.use('/substitution',SubstitutionRouter);
router.use('/match',matchRouter);
router.use('/penalty',penaltyRouter)


export  {router};


