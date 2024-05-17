import { Schema, model, Types, Document } from 'mongoose';

import { IChoice } from '@projTypes/choices.types';

interface IChoiceModel extends Document, IChoice {}

const choiceSchema: Schema<IChoiceModel> = new Schema({
    label: {
        type: String,
        required: true,
        minlength: 3,
    },
    for_question: {
        type: Types.ObjectId,
        ref: 'question',
        required: true,
    },
    next_question: {
        type: Types.ObjectId,
        ref: 'question',
        required: true,
    },
    related_video: {
        type: Types.ObjectId,
        ref: 'video',
        required: true,
    },
});

const ChoiceModel = model('choice', choiceSchema);

export { ChoiceModel };
