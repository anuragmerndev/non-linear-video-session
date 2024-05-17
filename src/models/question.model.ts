import { Schema, model } from 'mongoose';

import { IQuestion } from '@projTypes/questions.types';

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

const QuestionModel = model('question', questionSchema);
export { QuestionModel };
