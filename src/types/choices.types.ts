import { ObjectId } from 'mongoose';

interface IChoice {
    label: string;
    for_question: ObjectId;
    next_question: ObjectId | null;
    related_video: ObjectId;
}

export { IChoice };
