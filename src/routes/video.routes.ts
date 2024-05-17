import { Router } from 'express';

import {
    createVideo,
    updateVideoData,
    deleteVideo,
    getVideo,
} from '@controllers/video.controllers';

const videoRouter = Router();

const videoID = 'video_id';

videoRouter.post('/', createVideo);
videoRouter.get(`/:${videoID}`, getVideo);
videoRouter.put(`/:${videoID}`, updateVideoData);
videoRouter.delete(`/:${videoID}`, deleteVideo);

export { videoRouter };
