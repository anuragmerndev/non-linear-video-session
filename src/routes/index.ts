import { Router } from 'express';

import { videoRouter } from '@routes/video.routes';

const rootRouter = Router();

rootRouter.use('/video', videoRouter);

export { rootRouter };
