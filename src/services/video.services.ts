import { VideoModel } from '@models/video.models';

import { IVideo } from '@projTypes/video.types';

const createNewVideo = async (data: IVideo) => {
    return await VideoModel.create(data);
};

const getVideobyId = async (id: string) => {
    return await VideoModel.findById(id);
};

const updateVideo = async (id: string, data: Partial<IVideo>) => {
    return await VideoModel.findByIdAndUpdate(id, data);
};

const deleteVideobyID = async (id: string) => {
    return await VideoModel.findByIdAndDelete(id);
};

export { createNewVideo, getVideobyId, updateVideo, deleteVideobyID };
