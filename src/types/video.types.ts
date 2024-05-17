import { Document } from 'mongoose';

interface IVideo extends Document {
    name: string;
}

export { IVideo };
