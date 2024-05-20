import { Schema, model, Types } from 'mongoose';

const userInteractionSchema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'user',
            require: true,
        },
        current_question: {
            type: Types.ObjectId,
            ref: 'question',
            required: true,
        },
        current_video: {
            type: Types.ObjectId,
            ref: 'video',
            required: true,
        },
        endVideo: {
            type: Boolean,
            default: false,
        },
    },
    { timestamps: true },
);

const UserInteractionModel = model('userInteraction', userInteractionSchema);

export { UserInteractionModel };
