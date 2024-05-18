import { Types } from 'mongoose';

interface IChoice {
    label: string;
    for_question: Types.ObjectId;
    next_question: Types.ObjectId | null;
    related_video: Types.ObjectId;
}

export { IChoice };
