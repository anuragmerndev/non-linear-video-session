import { Schema, model } from 'mongoose';

import { IVideo } from '@projTypes/video.types';

const videoSchema: Schema<IVideo> = new Schema(
    {
        name: {
            type: String,
            required: true,
            minlength: 3,
        },
    },
    { timestamps: true },
);

const VideoModel = model('video', videoSchema);

export { VideoModel };
