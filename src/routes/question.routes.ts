import { Router } from 'express';

import {
    createQuestion,
    deleteQuestion,
    getQuestion,
    updateQuestionData,
} from '@controllers/question.controllers';

const questionRouter = Router();

const questionID = 'question_id';

questionRouter.post('/', createQuestion);
questionRouter.get(`/:${questionID}`, getQuestion);
questionRouter.put(`/:${questionID}`, updateQuestionData);
questionRouter.delete(`/:${questionID}`, deleteQuestion);

export { questionRouter };
