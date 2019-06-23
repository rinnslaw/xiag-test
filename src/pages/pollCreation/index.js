import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  PollCreationForm  from 'components/pollCreationForm' 
import { fetchDataFromServer, editAnswer, editQuestion, addAnswer } from 'ducks/polls'

const uuidv1 = require('uuid/v1')

class PollsCreation extends Component {
    componentWillMount() {
        this.props.fetchDataFromServer();
    }

    editAnswer = (id, newValue) => { 
        this.props.editAnswer({
            id, 
            newValue
        }) 
    }

    addAnswer = () => { 
        this.props.addAnswer({
            pollId: this.props.currentPollId,
            answerId: uuidv1(), 
            text:''
        }) 
    }

    editQuestion = (newValue) => { 
        this.props.editQuestion({
            id:this.props.currentPollId, 
            newValue
        }) 
    }

    render() {
        return (
            <div>
                {!!this.props.currentPollId &&
                    <PollCreationForm
                        currentPollId={this.props.currentPollId} 
                        question={this.props.polls[this.props.currentPollId].question}
                        answers={ this.props.polls[this.props.currentPollId].answers.map(item => {
                            const answers = this.props.answers;
                            return answers[item]
                        })}
                        editAnswer={this.editAnswer}
                        editQuestion={this.editQuestion}
                        addAnswer={this.addAnswer}
                    />
                }
            </div>
        );
    }
}

const mapStateToProps = (state, props) => {
  return {
    currentPollId: state.polls.currentPoll,
    polls: state.polls.polls,
    answers: state.polls.answers
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataFromServer: () => { dispatch(fetchDataFromServer()) },
    editAnswer: (data) => { dispatch(editAnswer(data)) },
    editQuestion: (data) => { dispatch(editQuestion(data)) },
    addAnswer: (data) => { dispatch(addAnswer(data)) }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PollsCreation);