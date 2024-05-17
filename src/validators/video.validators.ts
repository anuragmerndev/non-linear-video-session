import { isValidObjectId, ObjectId } from 'mongoose';
import { z } from 'zod';

const validateVideoParam = z.object({
    video_id: z.custom<ObjectId>((val) => isValidObjectId(val)),
});

type videoParamType = z.infer<typeof validateVideoParam>;

export { videoParamType, validateVideoParam };
