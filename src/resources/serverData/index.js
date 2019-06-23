const uuidv1 = require('uuid/v1')

export const polls = [
        {
            id: uuidv1(),
            question: '',
            answers: [
                {
                    id: uuidv1(),
                    text: 'Yes'
                },
                {
                    id: uuidv1(),
                    text: 'No'
                }
            ],
            usersAnswers: [
                {
                    id: uuidv1(),
                    name: '',
                    answerID: ''
                }
            ]
        }
    ]

