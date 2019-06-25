import { createAction, createReducer } from 'redux-act';
import { normalize, schema } from 'normalizr';
const uuidv1 = require('uuid/v1');
const REDUCER = 'POLLS';
const NS = `@@${REDUCER}/`;
const createPollsList = createAction(`${NS}_poll_WAS_CREATED`);
export const editQuestion = createAction(`${NS}_QUESTION_WAS_EDITED`);
export const editAnswer = createAction(`${NS}_ANSWER_WAS_EDITED`);
export const addAnswer = createAction(`${NS}_ANSWER_WAS_ADDED`);

export const addNewUser = createAction(`${NS}_NAME_WAS_CHANGED`);
export const submitAnswer = createAction(`${NS}_ANSWER_WAS_SUBMITED`);

export const fetchDataFromServer = () => (dispatch, getState) => {
    const defaultAnswerID1 = uuidv1();
    const defaultAnswerID2 = uuidv1();
    const response = {
        polls: [
            {
                id: uuidv1(),
                question: 'Is it ok?',
                answers: [
                    {
                        id: defaultAnswerID1,
                        text: 'Yes'
                    },
                    {
                        id: defaultAnswerID2,
                        text: 'No'
                    }
                ],
                users: [
                    {
                        id: uuidv1(),
                        name: 'John',
                        answer: {
                            id: defaultAnswerID1,
                            text: 'Yes'
                        }
                    },
                    {
                        id: uuidv1(),
                        name: 'Clara',
                        answer: {
                            id: defaultAnswerID2,
                            text: 'No'
                        }
                    },
                    {
                        id: uuidv1(),
                        name: 'Bonny',
                        answer: {
                            id: defaultAnswerID1,
                            text: 'Yes'
                        }
                    }

                ]
                
            }
        ]
    };

    const answer = new schema.Entity('answers');
    const user = new schema.Entity('users', {
        answer: answer
    });
    const poll = new schema.Entity('polls', {
        answers: [answer],
        users: [user]
    });
    const normalizedData = normalize(response, {
        polls: [poll]
    });
    
    dispatch(createPollsList(normalizedData)); 
}


const initialState = {
}

export default createReducer(
    {
        [createPollsList]: (state, data) => ({
            currentPoll: data.result.polls[0],
            ...data.entities
        }),
        [editQuestion]:(state, data) => ({
            ...state,
                polls: {
                    ...state.polls,
                    [data.id]: {
                        ...state.polls[data.id],
                        question: data.newValue
                    }
                }
        }), 
        [editAnswer]: (state, data) => {
            return {
                ...state,
                answers: {
                    ...state.answers,
                    [data.id]: {
                        ...state.answers[data.id],
                        text: data.newValue
                    }
                }
            }
        },
        [addAnswer]: (state, data) => ({
            ...state,
            polls: {
                ...state.polls,
                [data.pollId]: {
                    ...state.polls[data.pollId],
                    answers: [
                        ...state.polls[data.pollId].answers, 
                        data.answerId
                    ]
                }
            },
            answers: {
                ...state.answers,
                [data.answerId]: {
                    id: data.answerId,
                    text: data.text
                }
            }
        }),
        [addNewUser]: (state, data) => {
            return {...state,
                users: {
                    ...state.users,
                    [data.id]: {
                        id: data.id, 
                        name: data.name, 
                        answer: data.answer
                    }
                }
            }
        }, 
        [submitAnswer]: (state, data) => {
            return {...state,
            polls: {
                ...state.polls,
                [data.pollId]: {
                    ...state.polls[data.pollId],
                    users: [
                        ...state.polls[data.pollId].users, 
                        data.userId
                    ]
                }
            },
        }},
        
    },
    initialState
    )