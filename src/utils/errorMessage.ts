const errorResponse = {
    VIDEO: {
        NOT_FOUND: 'Video not found',
        CREATION_FAILED: 'Failed to create video',
        UPDATE_FAILED: 'Failed to update video',
        DELETION_FAILED: 'Failed to delete video',
    },
    QUESTION: {
        NOT_FOUND: 'Question not found',
        CREATION_FAILED: 'Failed to create question',
        UPDATE_FAILED: 'Failed to update question',
        DELETION_FAILED: 'Failed to delete question',
        CONFLICT: 'Already a question with the same title',
    },
    CHOICE: {
        NOT_FOUND: 'Choice not found',
        CREATION_FAILED: 'Failed to create choice',
        UPDATE_FAILED: 'Failed to update choice',
        DELETION_FAILED: 'Failed to delete choice',
        CONFLICT: 'Already a choice with the same title',
    },
    USER: {
        NOT_FOUND: 'User not found',
        CREATION_FAILED: 'Failed to create user',
        UPDATE_FAILED: 'Failed to update user',
        DELETION_FAILED: 'Failed to delete user',
        CONFLICT: 'Already a user with the same title',
        WRONG_PASSWORD: 'user password is wrong',
    },
    TOKEN: {
        NOT_FOUND: 'Token not found',
        INVALID: 'Token is invalid',
    },
};

export { errorResponse };
