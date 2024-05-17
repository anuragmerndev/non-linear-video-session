import { NextFunction, Request, Response } from 'express';

import { logger } from '@logger/logger';

import { APIErrorType, ApiError } from '@utils/apiError';
import { responseMessage } from '@utils/responseMessage';
import { RESPONSE_STATUS } from '@utils/responseStatus';

const errorHandler = (
    error: APIErrorType,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
) => {
    if (!(error instanceof ApiError)) {
        logger.error(error.message);
        const statusCode = RESPONSE_STATUS.INTERNAL_SERVER_ERROR;
        const message = responseMessage.OTHER.SERVER_ERROR;

        error = new ApiError(statusCode, message);
    }

    return res.status(error.statusCode).json({ message: error.message });
};

export { errorHandler };
