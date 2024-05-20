import { Response } from 'express';

import { AuthenticationRequest } from '@middlewares/isLoggedInUser';

import {
    choiceidParamValidator,
    choiceIDType,
} from '@validators/question.validators';

import { getChoicebyId } from '@services/choices.services';
import {
    createInteraction,
    getLastInteraction,
} from '@services/interaction.services';
import { getQuestionbyId } from '@services/question.services';

import { ApiError } from '@utils/apiError';
import { apiResponse } from '@utils/apiResponse';
import { asyncHandler } from '@utils/asyncHandler';
import { errorResponse } from '@utils/errorMessage';
import { convertStringToObjectID } from '@utils/helper';
import { responseMessage } from '@utils/responseMessage';
import { RESPONSE_STATUS } from '@utils/responseStatus';

const userInteraction = asyncHandler(
    async (req: AuthenticationRequest, res: Response) => {
        const { userID } = req.user!;
        const validChoiceID = choiceidParamValidator.safeParse(req);
        if (!validChoiceID.success) {
            throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
                message: validChoiceID.error.issues,
            });
        }

        const {
            params: { choice_id },
        } = req as unknown as choiceIDType;

        const choiceFound = await getChoicebyId(choice_id);
        if (!choiceFound) {
            throw new ApiError(
                RESPONSE_STATUS.NOT_FOUND,
                errorResponse.CHOICE.NOT_FOUND,
            );
        }

        const nextQuestion =
            choiceFound.next_question === null
                ? null // @ts-expect-error need to check this _id thing
                : choiceFound.next_question._id;
        // @ts-expect-error need to check this _id thing
        const forQuestion = choiceFound.for_question._id;
        // @ts-expect-error need to check this _id thing
        const relatedVideo = choiceFound.related_video._id;

        const endVideo = choiceFound.next_question === null ? true : false;

        await createInteraction(userID, forQuestion, relatedVideo, endVideo);

        const nextVideoInteraction = {
            video_id: relatedVideo,
            next_question: nextQuestion,
        };

        return apiResponse(res, RESPONSE_STATUS.CREATED, {
            message: responseMessage.INTERACTION.CREATED,
            data: nextVideoInteraction,
        });
    },
);

const videoSession = asyncHandler(
    async (req: AuthenticationRequest, res: Response) => {
        const { userID } = req.user!;

        const lastSession = await getLastInteraction(userID);
        if (lastSession && !lastSession.endVideo) {
            return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
                message: responseMessage.QUESTION.RETRIEVED,
                data: {
                    question_id: lastSession.current_question,
                    video_id: lastSession.current_video,
                },
            });
        }

        const initialSession = await getQuestionbyId(
            convertStringToObjectID('664869164a73efa089e05099'),
        );

        return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
            message: responseMessage.QUESTION.RETRIEVED,
            data: {
                question_id: initialSession._id,
                first_video: true,
            },
        });
    },
);

export { userInteraction, videoSession };
