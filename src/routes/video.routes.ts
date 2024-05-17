import { Router } from 'express';

import {
    createVideo,
    getVideo,
    updateVideoData,
    deleteVideo,
} from '@controllers/video.controllers';

const videoRouter = Router();

videoRouter.post('/', createVideo);
videoRouter.get('/:id', getVideo);
videoRouter.put('/:id', updateVideoData);
videoRouter.delete('/:id', deleteVideo);

export { videoRouter };
