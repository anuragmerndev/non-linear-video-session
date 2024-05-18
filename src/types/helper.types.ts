import { Types } from 'mongoose';

interface IJWTData {
    userID: Types.ObjectId;
    email: string;
}

export { IJWTData };
