import { z } from 'zod';

const createVideoValidator = z.object({});

const updateVideoValidator = z.object({});

type createVideoType = z.infer<typeof createVideoValidator>;
type updateVideoType = z.infer<typeof updateVideoValidator>;

export {
    createVideoType,
    createVideoValidator,
    updateVideoType,
    updateVideoValidator,
};
