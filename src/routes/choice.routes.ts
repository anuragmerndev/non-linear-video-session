import { Router } from 'express';

import {
    getChoice,
    deleteChoice,
    updateChoiceData,
} from '@controllers/choice.controllers';

const choiceRouter = Router();

const choiceID = 'choice_id';

choiceRouter.get(`/:${choiceID}`, getChoice);
choiceRouter.put(`/:${choiceID}`, updateChoiceData);
choiceRouter.delete(`/:${choiceID}`, deleteChoice);

export { choiceRouter };
