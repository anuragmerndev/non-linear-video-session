import { Request, Response } from 'express';

import { getUser, newUser } from '@services/user.services';

import { ApiError } from '@utils/apiError';
import { apiResponse } from '@utils/apiResponse';
import { asyncHandler } from '@utils/asyncHandler';
import { errorResponse } from '@utils/errorMessage';
import { compareValue, hashValue, signToken } from '@utils/helper';
import { responseMessage } from '@utils/responseMessage';
import { RESPONSE_STATUS } from '@utils/responseStatus';

const registerUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const alreadyUser = await getUser(email);
    if (alreadyUser) {
        throw new ApiError(
            RESPONSE_STATUS.CONFLICT,
            errorResponse.USER.CONFLICT,
        );
    }

    const hashPassword = await hashValue(password);

    const newUserData = await newUser({ email, password: hashPassword });

    const accessToken = signToken({
        email,
        userID: newUserData._id,
    });

    delete newUserData.password;

    return apiResponse(res, RESPONSE_STATUS.CREATED, {
        data: newUserData,
        access_token: accessToken,
        message: responseMessage.USER.CREATED,
    });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const alreadyUser = await getUser(email);
    if (!alreadyUser) {
        throw new ApiError(
            RESPONSE_STATUS.CONFLICT,
            errorResponse.USER.CONFLICT,
        );
    }

    const validPassword = await compareValue(password, alreadyUser.password!);

    if (!validPassword) {
        throw new ApiError(
            RESPONSE_STATUS.UN_AUTHORIZED,
            errorResponse.USER.WRONG_PASSWORD,
        );
    }

    const accessToken = signToken({
        email,
        userID: alreadyUser._id,
    });

    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: alreadyUser,
        access_token: accessToken,
        message: responseMessage.USER.LOGGED_IN,
    });
});

export { registerUser, loginUser };
