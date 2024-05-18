import { isValidObjectId, Types } from 'mongoose';
import { z } from 'zod';

import { convertStringToObjectID } from '@utils/helper';

const createQuestionValidator = z.object({
    question: z.string().min(5),
    choices: z.array(
        z.object({
            label: z.string().min(3),
            next_question: z.nullable(
                z.custom<Types.ObjectId>((val) => isValidObjectId(val)),
            ),
            related_video: z.custom<Types.ObjectId>((val) =>
                isValidObjectId(val),
            ),
        }),
    ),
});

const updateQuestionValidator = z.object({
    params: z.object({
        question_id: z.custom<Types.ObjectId>((val) => isValidObjectId(val)),
    }),
    body: z.object({
        question: z.string().min(5).optional(),
    }),
});

const updateChoiceValidator = z.object({
    params: z.object({
        choice_id: z.custom<Types.ObjectId>((val) => isValidObjectId(val)),
    }),
    body: z
        .object({
            label: z.string().min(3).optional(),
            next_question: z
                .nullable(
                    z.custom<Types.ObjectId>((val) => isValidObjectId(val)),
                )
                .optional(),
            related_video: z
                .custom<Types.ObjectId>((val) => isValidObjectId(val))
                .optional(),
        })
        .optional(),
});

const choiceidParamValidator = z.object({
    params: z.object({
        choice_id: z.custom<Types.ObjectId>((val) => isValidObjectId(val)),
    }),
});

const questionidParamValidator = z.object({
    params: z.object({
        question_id: z.custom<Types.ObjectId>((val) =>
            isValidObjectId(val) ? convertStringToObjectID(val) : false,
        ),
    }),
});

type createQuestionType = z.infer<typeof createQuestionValidator>;
type updateQuestionType = z.infer<typeof updateQuestionValidator>;
type updateChoiceType = z.infer<typeof updateChoiceValidator>;
type questionIDType = z.infer<typeof questionidParamValidator>;
type choiceIDType = z.infer<typeof choiceidParamValidator>;

export {
    createQuestionType,
    createQuestionValidator,
    updateQuestionType,
    updateQuestionValidator,
    updateChoiceType,
    updateChoiceValidator,
    questionIDType,
    questionidParamValidator,
    choiceIDType,
    choiceidParamValidator,
};
