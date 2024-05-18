import { Router } from 'express';

import {
    userInteraction,
    videoSession,
} from '@controllers/interaction.controllers';

const interactionRouter = Router();

interactionRouter.put('/:choice_id', userInteraction);
interactionRouter.get('/video-session', videoSession);

export { interactionRouter };
