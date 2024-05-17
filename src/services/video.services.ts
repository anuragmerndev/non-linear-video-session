import { ObjectId } from 'mongoose';

import { VideoModel } from '@models/video.models';

import { IVideo } from '@projTypes/video.types';

const createNewVideo = async (data: IVideo) => {
    return await VideoModel.create(data);
};

const getVideobyId = async (id: ObjectId) => {
    return await VideoModel.findById(id);
};

const updateVideo = async (id: ObjectId, data: Partial<IVideo>) => {
    return await VideoModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteVideobyID = async (id: ObjectId) => {
    return await VideoModel.findByIdAndDelete(id);
};

export { createNewVideo, getVideobyId, updateVideo, deleteVideobyID };
