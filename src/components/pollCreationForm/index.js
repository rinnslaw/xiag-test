import React, { Component } from 'react';
import PropTypes from 'prop-types';
const createHistory = require("history").createHashHistory;
const history = createHistory()


class PollCreationForm extends React.Component {
    onAnswerChangeHandler = (e) => {
        const answerId = e.target.dataset.id;
        const newAnswer = e.target.value;
        this.props.editAnswer(answerId, newAnswer);
    }

    onQuestionChangeHandler = (e) => {
        const newQuestion = e.target.value;
        this.props.editQuestion(newQuestion);
    }

    render() {
        return (<div className="page__content page__content--padding">
        <div className="poll">
            <table className="poll-table">
                <thead>
                <tr>
                    <th>Question:</th>
                    <th>
                        <input 
                            type="text" 
                            onChange={this.onQuestionChangeHandler}
                            value={this.props.question} 
                            className="input-text" />
                    </th>
                </tr>
                </thead>
                <tbody>
                {this.props.answers.map((item, index) => {
                    return <tr key={item.id}>
                        <th>Answer { index+1 }</th>
                        <td>
                            <input 
                                type="text"
                                data-id={item.id}
                                onChange={this.onAnswerChangeHandler} 
                                value={item.text} 
                                className="input-text" />
                        </td>
                    </tr>
                })
                }
                <tr>
                    <td className="poll-table__plus">
                        <button 
                            className="btn btn--plus"
                            onClick={ this.props.addAnswer }>
                            +
                        </button>
                    </td>
                    <td> </td>
                </tr>
                </tbody>
            </table>

            <button 
                className="btn btn--start"
                onClick={ () => { history.push('/poll/'+this.props.currentPollId)} }
            >
                Start
            </button>
        </div>
    </div>)
      }
}

PollCreationForm.propTypes = {
    currentPollId: PropTypes.string,
    question: PropTypes.string,
    answers: PropTypes.array,
    editAnswer: PropTypes.func,
    editQuestion: PropTypes.func,
    addAnswer: PropTypes.func,
};

export default PollCreationForm