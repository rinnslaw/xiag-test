import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import  PollForm  from 'components/pollForm' 
import { fetchDataFromServer, submitAnswer, addNewUser } from 'ducks/polls'

class Polls extends Component {
    state = {
      pollId: ''
    }

    componentWillMount() {
      const pollId = this.props.match.params.pallId;
      this.setState({pollId});
    }

    render() {
        const { currentPoll, polls, answers, users, submitAnswer, addNewUser} = this.props
        return (
          <div>
          {(this.state.pollId in polls && !!currentPoll) ? (
            <PollForm 
              currentPollId = {this.state.pollId }
              users = {polls[this.state.pollId].users.map(item => {
                        return users[item]
                      })}
              question = {polls[this.state.pollId].question}
              answers = {polls[this.state.pollId].answers.map(item => {
                          return answers[item]
                        })}
              addNewUser = {addNewUser}
              submitAnswer = {submitAnswer}
            />) : (
              <div className="poll">
                <h1 style={{textAlign:'center'}}>
                  Guess this page was reloaded. You need to create poll again becouse we have no backend yet
                </h1>
              </div>
            )
          }
          </div>
        );
    }
}

const mapStateToProps = (state, props) => {
  return {
    currentPoll: state.polls.currentPoll,
    polls: state.polls.polls,
    answers: state.polls.answers,
    users: state.polls.users
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDataFromServer: () => {dispatch(fetchDataFromServer())},
    submitAnswer: (data) => { dispatch(submitAnswer(data)) },
    addNewUser: (data) => { dispatch(addNewUser(data)) },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Polls);