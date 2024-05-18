import { ClientSession, Types } from 'mongoose';

import { ChoiceModel } from '@models/choice.model';

import { IChoice } from '@projTypes/choices.types';

const createNewChoice = async (data: IChoice[], session: ClientSession) => {
    return await ChoiceModel.bulkWrite(
        data.map((choiceData) => ({
            updateOne: {
                filter: {
                    $and: [
                        { for_question: choiceData.for_question },
                        { label: choiceData.label },
                    ],
                },
                update: choiceData,
                upsert: true,
            },
        })),
        {
            session,
        },
    );
};

const getChoicebyId = async (id: Types.ObjectId) => {
    return await ChoiceModel.findById(id)
        .populate('for_question', '_id question')
        .populate('next_question', '_id question')
        .populate('related_video', '_id name');
};

const getChoicebyName = async (name: string, questionID: Types.ObjectId) => {
    return await ChoiceModel.findOne({ name, for_question: questionID });
};

const updateChoice = async (id: Types.ObjectId, data: Partial<IChoice>) => {
    return await ChoiceModel.findByIdAndUpdate(id, data, {
        new: true,
    });
};

const deleteChoicebyID = async (id: Types.ObjectId) => {
    return await ChoiceModel.findByIdAndDelete(id);
};

export {
    createNewChoice,
    getChoicebyId,
    getChoicebyName,
    updateChoice,
    deleteChoicebyID,
};
