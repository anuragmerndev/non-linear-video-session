import { Types } from 'mongoose';

import { UserInteractionModel } from '@models/user-interaction.model';

const createInteraction = async (
    userID: Types.ObjectId,
    question: string,
    video: string,
    end?: boolean,
) => {
    return await UserInteractionModel.create({
        user: userID,
        current_question: question,
        current_video: video,
        endVideo: end,
    });
};

const getLastInteraction = async (userID: Types.ObjectId) => {
    return await UserInteractionModel.findOne({
        user: userID,
    });
};

export { createInteraction, getLastInteraction };
