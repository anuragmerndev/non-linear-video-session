import { Request, Response } from 'express';
import mongoose, { ObjectId } from 'mongoose';

import { logger } from '@logger/logger';
import {
    createQuestionType,
    createQuestionValidator,
    updateQuestionType,
    updateQuestionValidator,
    questionIDType,
    questionidParamValidator,
} from '@validators/question.validators';

import { createNewChoice } from '@services/choices.services';
import {
    createNewQuestion,
    getQuestionbyId,
    updateQuestion,
    deleteQuestionbyID,
    getQuestionbyName,
} from '@services/question.services';

import { ApiError } from '@utils/apiError';
import { apiResponse } from '@utils/apiResponse';
import { asyncHandler } from '@utils/asyncHandler';
import { errorResponse } from '@utils/errorMessage';
import { responseMessage } from '@utils/responseMessage';
import { RESPONSE_STATUS } from '@utils/responseStatus';

import { IChoice } from '@projTypes/choices.types';

const createQuestion = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    const isValidBody = createQuestionValidator.safeParse(body);
    if (!isValidBody.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: isValidBody.error.issues,
        });
    }

    const { question, choices } = body as createQuestionType;

    const alreadyQuestion = await getQuestionbyName(question);
    if (alreadyQuestion) {
        throw new ApiError(
            RESPONSE_STATUS.CONFLICT,
            errorResponse.QUESTION.CONFLICT,
        );
    }

    const transaction = await mongoose.startSession();
    transaction.startTransaction();
    try {
        const newQuestion = await createNewQuestion({ question }, transaction);

        const newChoiceArray: IChoice[] = choices.map((choice) => ({
            ...choice,
            for_question: newQuestion[0]._id as unknown as ObjectId,
        }));

        await createNewChoice(newChoiceArray, transaction);
        transaction.commitTransaction();

        const newQuestionData = await getQuestionbyId(
            newQuestion[0]._id as any,
        );
        return apiResponse(res, RESPONSE_STATUS.CREATED, {
            data: { question: newQuestionData },
            message: responseMessage.QUESTION.CREATED,
        });
    } catch (error) {
        logger.error(error);
        transaction.abortTransaction();
        throw new ApiError(
            RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
            errorResponse.QUESTION.CREATION_FAILED,
        );
    }
});

const getQuestion = asyncHandler(async (req: Request, res: Response) => {
    const validQuestionID = questionidParamValidator.safeParse(req);
    if (!validQuestionID.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: validQuestionID.error.issues,
        });
    }

    const {
        params: { question_id },
    } = req as unknown as questionIDType;

    console.log({ question_id });

    const questionFound = await getQuestionbyId(question_id);
    if (!questionFound) {
        throw new ApiError(
            RESPONSE_STATUS.NOT_FOUND,
            errorResponse.QUESTION.NOT_FOUND,
        );
    }

    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: questionFound,
        message: responseMessage.QUESTION.RETRIEVED,
    });
});

const updateQuestionData = asyncHandler(async (req: Request, res: Response) => {
    const isValidData = updateQuestionValidator.safeParse(req);
    if (!isValidData.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: isValidData.error.issues,
        });
    }

    const {
        body: { question },
        param: { question_id },
    } = req as unknown as updateQuestionType;

    const alreadyQuestion = await getQuestionbyId(question_id);
    if (!alreadyQuestion) {
        throw new ApiError(
            RESPONSE_STATUS.NOT_FOUND,
            errorResponse.QUESTION.NOT_FOUND,
        );
    }

    const updatedQuestion = await updateQuestion(question_id, { question });
    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: updatedQuestion,
        message: responseMessage.QUESTION.UPDATED,
    });
});

const deleteQuestion = asyncHandler(async (req: Request, res: Response) => {
    const validQuestionID = questionidParamValidator.safeParse(req);
    if (!validQuestionID.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: validQuestionID.error.issues,
        });
    }

    const {
        params: { question_id },
    } = req as unknown as questionIDType;

    const alreadyQuestion = await getQuestionbyId(question_id);
    if (!alreadyQuestion) {
        throw new ApiError(
            RESPONSE_STATUS.NOT_FOUND,
            errorResponse.QUESTION.NOT_FOUND,
        );
    }

    await deleteQuestionbyID(question_id);

    return apiResponse(res, RESPONSE_STATUS.NOCONTENT, {
        message: responseMessage.QUESTION.DELETED,
    });
});

export { createQuestion, updateQuestionData, deleteQuestion, getQuestion };
