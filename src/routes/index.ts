import { Router } from 'express';

import { isLoggedIn } from '@middlewares/isLoggedInUser';

import { videoRouter } from '@routes/video.routes';

import { choiceRouter } from './choice.routes';
import { interactionRouter } from './interaction.routes';
import { questionRouter } from './question.routes';
import { userRouter } from './user.routes';

const rootRouter = Router();

rootRouter.use('/video', videoRouter);
rootRouter.use('/choice', choiceRouter);
rootRouter.use('/question', questionRouter);
rootRouter.use('/interaction', isLoggedIn, interactionRouter);
rootRouter.use('/user', userRouter);

export { rootRouter };
