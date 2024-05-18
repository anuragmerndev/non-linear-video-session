import { Router } from 'express';

import { videoRouter } from '@routes/video.routes';

import { choiceRouter } from './choice.routes';
import { questionRouter } from './question.routes';

const rootRouter = Router();

rootRouter.use('/video', videoRouter);
rootRouter.use('/choice', choiceRouter);
rootRouter.use('/question', questionRouter);

export { rootRouter };
