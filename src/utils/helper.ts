import { compare, hash } from 'bcrypt';
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

const hashValue = async (value: string) =>
    hash(value, process.env.SALT_ROUNDS!);

const compareValue = async (originalValue: string, compareValue: string) =>
    compare(originalValue, compareValue);

export {
    convertStringToObjectID,
    signToken,
    verifyToken,
    hashValue,
    compareValue,
};
