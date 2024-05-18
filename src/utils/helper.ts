import mongoose from 'mongoose';

const convertStringToObjectID = (id: string) => {
    return new mongoose.Types.ObjectId(id);
};

export { convertStringToObjectID };
