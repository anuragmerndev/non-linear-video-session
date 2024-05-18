import { sign, verify } from 'jsonwebtoken';
import mongoose from 'mongoose';

import { IJWTData } from '@projTypes/helper.types';

const convertStringToObjectID = (id: string) => {
    return new mongoose.Types.ObjectId(id);
};

const signToken = (data: IJWTData) => {
    return sign(data, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    });
};

const verifyToken = (payload: string) => {
    return verify(payload, process.env.ACCESS_TOKEN_SECRET!);
};

export { convertStringToObjectID, signToken, verifyToken };
