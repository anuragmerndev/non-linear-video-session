import { Schema, model } from 'mongoose';

const videoSchema = new Schema({});

const VideoModel = model('video', videoSchema);

export { VideoModel };
