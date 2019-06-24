import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import  PollCreationForm  from 'components/pollCreationForm' 
import { fetchDataFromServer, editAnswer, editQuestion, addAnswer } from 'ducks/polls'



class PollsCreation extends Component {
    componentWillMount() {
        this.props.fetchDataFromServer();
    }

    render() {
        const { currentPollId, polls, answers, editAnswer, editQuestion, addAnswer } = this.props
        return (
            <div>
                {!!this.props.currentPollId &&
                    <PollCreationForm
                        currentPollId={currentPollId} 
                        question={polls[currentPollId].question}
                        answers={polls[currentPollId].answers.map(item => {
                            return answers[item]
                        })}
                        editAnswer={editAnswer}
                        editQuestion={editQuestion}
                        addAnswer={addAnswer}
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