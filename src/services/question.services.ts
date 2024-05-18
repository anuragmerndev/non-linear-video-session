import { ClientSession, Types } from 'mongoose';

import { QuestionModel } from '@models/question.model';

import { IQuestion } from '@projTypes/questions.types';

const createNewQuestion = async (data: IQuestion, session: ClientSession) => {
    return await QuestionModel.create([data], { session });
};

const getQuestionbyId = async (id: Types.ObjectId) => {
    const question = await QuestionModel.aggregate([
        {
            $match: {
                _id: new Types.ObjectId(id),
            },
        },
        {
            $lookup: {
                from: 'choices',
                foreignField: 'for_question',
                localField: '_id',
                as: 'choices',
            },
        },
    ]);
    return question[0];
};

const getQuestionbyName = async (name: string) => {
    return await QuestionModel.findOne({
        name,
    });
};

const updateQuestion = async (id: Types.ObjectId, data: Partial<IQuestion>) => {
    return await QuestionModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteQuestionbyID = async (id: Types.ObjectId) => {
    return await QuestionModel.findByIdAndDelete(id);
};

export {
    createNewQuestion,
    getQuestionbyId,
    getQuestionbyName,
    updateQuestion,
    deleteQuestionbyID,
};
