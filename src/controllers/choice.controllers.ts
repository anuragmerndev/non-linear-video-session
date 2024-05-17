import { Request, Response } from 'express';

import {
    choiceidParamValidator,
    choiceIDType,
    updateChoiceValidator,
    updateChoiceType,
} from '@validators/question.validators';

import {
    deleteChoicebyID,
    getChoicebyId,
    getChoicebyName,
    updateChoice,
} from '@services/choices.services';

import { ApiError } from '@utils/apiError';
import { apiResponse } from '@utils/apiResponse';
import { asyncHandler } from '@utils/asyncHandler';
import { errorResponse } from '@utils/errorMessage';
import { responseMessage } from '@utils/responseMessage';
import { RESPONSE_STATUS } from '@utils/responseStatus';

import { IChoice } from '@projTypes/choices.types';

const getChoice = asyncHandler(async (req: Request, res: Response) => {
    const validChoiceID = choiceidParamValidator.safeParse(req);
    if (!validChoiceID.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: validChoiceID.error.issues,
        });
    }

    const {
        param: { choice_id },
    } = req as unknown as choiceIDType;

    const choiceFound = await getChoicebyId(choice_id);
    if (!choiceFound) {
        throw new ApiError(
            RESPONSE_STATUS.NOT_FOUND,
            errorResponse.QUESTION.NOT_FOUND,
        );
    }

    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: choiceFound,
        message: responseMessage.CHOICE.RETRIEVED,
    });
});

const updateChoiceData = asyncHandler(async (req: Request, res: Response) => {
    const isValidData = updateChoiceValidator.safeParse(req);
    if (!isValidData.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: isValidData.error.issues,
        });
    }

    const {
        body,
        param: { choice_id },
    } = req as unknown as updateChoiceType;

    const alreadyChoice = await getChoicebyId(choice_id);
    if (!alreadyChoice) {
        throw new ApiError(
            RESPONSE_STATUS.NOT_FOUND,
            errorResponse.CHOICE.NOT_FOUND,
        );
    }

    const alreadyName = await getChoicebyName(
        body?.label as string,
        alreadyChoice.for_question,
    );
    if (alreadyName) {
        throw new ApiError(
            RESPONSE_STATUS.CONFLICT,
            errorResponse.CHOICE.CONFLICT,
        );
    }

    const updatedQuestion = await updateChoice(choice_id, body as IChoice);
    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: updatedQuestion,
        message: responseMessage.QUESTION.UPDATED,
    });
});

const deleteChoice = asyncHandler(async (req: Request, res: Response) => {
    const validChoiceID = choiceidParamValidator.safeParse(req);
    if (!validChoiceID.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: validChoiceID.error.issues,
        });
    }

    const {
        param: { choice_id },
    } = req as unknown as choiceIDType;

    const choiceFound = await getChoicebyId(choice_id);
    if (!choiceFound) {
        throw new ApiError(
            RESPONSE_STATUS.NOT_FOUND,
            errorResponse.QUESTION.NOT_FOUND,
        );
    }

    await deleteChoicebyID(choice_id);

    return apiResponse(res, RESPONSE_STATUS.NOCONTENT, {
        message: responseMessage.QUESTION.DELETED,
    });
});

export { updateChoiceData, deleteChoice, getChoice };
