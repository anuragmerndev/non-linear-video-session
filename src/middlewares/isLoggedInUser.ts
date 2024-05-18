import { NextFunction, Request, Response } from 'express';

import { ApiError } from '@utils/apiError';
import { asyncHandler } from '@utils/asyncHandler';
import { errorResponse } from '@utils/errorMessage';
import { verifyToken } from '@utils/helper';
import { RESPONSE_STATUS } from '@utils/responseStatus';

import { IJWTData } from '@projTypes/helper.types';

export interface AuthenticationRequest extends Request {
    user?: IJWTData;
}

const isLoggedIn = asyncHandler(
    async (req: AuthenticationRequest, _res: Response, next: NextFunction) => {
        const token = req.headers['authorization']?.split(' ')[1];

        if (!token) {
            throw new ApiError(
                RESPONSE_STATUS.UN_AUTHORIZED,
                errorResponse.TOKEN.NOT_FOUND,
            );
        }

        // Verify access token
        const tokenPayload = verifyToken(token);
        if (!tokenPayload) {
            throw new ApiError(
                RESPONSE_STATUS.UN_AUTHORIZED,
                errorResponse.TOKEN.INVALID,
            );
        }

        req.user = tokenPayload as IJWTData;
        next();
    },
);

export { isLoggedIn };
