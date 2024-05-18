import { Schema, model } from 'mongoose';

import { IQuestion } from '@projTypes/questions.types';

import { ChoiceModel } from './choice.model';

interface IQuestionModel extends Document, IQuestion {}

const questionSchema: Schema<IQuestionModel> = new Schema(
    {
        question: {
            type: String,
            required: true,
            minlength: 5,
        },
    },
    { timestamps: true },
);

questionSchema.post('findOneAndDelete', async function (id, next) {
    await ChoiceModel.deleteMany({ for_question: id });
    next();
});

const QuestionModel = model('question', questionSchema);
export { QuestionModel };
