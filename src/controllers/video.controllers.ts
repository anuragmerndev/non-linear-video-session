import { Request, Response } from 'express';

import {
    createVideoValidator,
    updateVideoValidator,
} from '@validators/video.validators';

import {
    createNewVideo,
    deleteVideobyID,
    getVideobyId,
    updateVideo,
} from '@services/video.services';

import { ApiError } from '@utils/apiError';
import { apiResponse } from '@utils/apiResponse';
import { asyncHandler } from '@utils/asyncHandler';
import { responseMessage } from '@utils/responseMessage';
import { RESPONSE_STATUS } from '@utils/responseStatus';

const createVideo = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    const result = createVideoValidator.safeParse(body);
    if (!result.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: result.error.issues,
        });
    }

    const newVideo = await createNewVideo(body);

    return apiResponse(res, RESPONSE_STATUS.CREATED, {
        data: newVideo,
        message: responseMessage.VIDEO.CREATED,
    });
});

const getVideo = asyncHandler(async (req: Request, res: Response) => {
    const params = req.params;

    const { id } = params;

    const getVideoData = await getVideobyId(id);

    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: getVideoData,
        message: responseMessage.VIDEO.RETRIEVED,
    });
});

const updateVideoData = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const params = req.params;

    const bodyValid = updateVideoValidator.safeParse(body);
    if (!bodyValid.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: bodyValid.error.issues,
        });
    }

    const { id } = params;

    const updateData = await updateVideo(id, {
        body,
    });

    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: updateData,
        message: responseMessage.VIDEO.UPDATED,
    });
});

const deleteVideo = asyncHandler(async (req: Request, res: Response) => {
    const params = req.params;

    const { id } = params;

    await deleteVideobyID(id);

    return apiResponse(res, RESPONSE_STATUS.NOCONTENT, {
        message: responseMessage.VIDEO.DELETED,
    });
});

export { createVideo, getVideo, updateVideoData, deleteVideo };
