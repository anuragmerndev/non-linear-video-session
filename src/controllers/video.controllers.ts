import { Request, Response } from 'express';

import {
    validateVideoParam,
    videoParamType,
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
import { errorResponse } from '@utils/errorMessage';
import { responseMessage } from '@utils/responseMessage';
import { RESPONSE_STATUS } from '@utils/responseStatus';

const createVideo = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;

    const newVideo = await createNewVideo(body);

    return apiResponse(res, RESPONSE_STATUS.CREATED, {
        data: newVideo,
        message: responseMessage.VIDEO.CREATED,
    });
});

const getVideo = asyncHandler(async (req: Request, res: Response) => {
    const params = req.params;

    const validVideoID = validateVideoParam.safeParse(params);
    if (!validVideoID.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: validVideoID.error.issues,
        });
    }

    const { video_id } = params as unknown as videoParamType;
    console.log({ video_id });

    const foundVideo = await getVideobyId(video_id);
    console.log({ foundVideo });

    if (!foundVideo) {
        throw new ApiError(
            RESPONSE_STATUS.NOT_FOUND,
            errorResponse.VIDEO.NOT_FOUND,
        );
    }

    return apiResponse(res, RESPONSE_STATUS.CREATED, {
        data: foundVideo,
        message: responseMessage.VIDEO.RETRIEVED,
    });
});

const updateVideoData = asyncHandler(async (req: Request, res: Response) => {
    const body = req.body;
    const params = req.params;

    const validVideoID = validateVideoParam.safeParse(params);
    if (!validVideoID.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: validVideoID.error.issues,
        });
    }

    const { video_id } = params as unknown as videoParamType;
    const { name } = body;

    const updateData = await updateVideo(video_id, {
        name,
    });

    return apiResponse(res, RESPONSE_STATUS.SUCCESS, {
        data: updateData,
        message: responseMessage.VIDEO.UPDATED,
    });
});

const deleteVideo = asyncHandler(async (req: Request, res: Response) => {
    const params = req.params;

    const validVideoID = validateVideoParam.safeParse(params);
    if (!validVideoID.success) {
        throw new ApiError(RESPONSE_STATUS.FORBIDDEN, {
            message: validVideoID.error.issues,
        });
    }

    const { video_id } = params as unknown as videoParamType;

    await deleteVideobyID(video_id);

    return apiResponse(res, RESPONSE_STATUS.NOCONTENT, {
        message: responseMessage.VIDEO.DELETED,
    });
});

export { createVideo, updateVideoData, deleteVideo, getVideo };
