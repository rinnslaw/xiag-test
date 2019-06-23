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

    submitAnswer = (data) => {
        this.props.submitAnswer({
            pollId: data.pollId, 
            userId: data.userId
        }) 
    }

    addNewUser = (newValue) => { 
        this.props.addNewUser(newValue);        
    }

    render() {
        return (
          <div>
          {(!!this.state.pollId && !!this.props.currentPoll) ? (
            <PollForm 
              currentPollId = {this.state.pollId}
              users = {this.props.polls[this.state.pollId].users.map(item => {
                return this.props.users[item]
              }) }
              question = {this.props.polls[this.state.pollId].question}
              answers = { this.props.polls[this.state.pollId].answers.map(item => {
                return this.props.answers[item]
              }) }
              addNewUser = {this.addNewUser}
              submitAnswer = {this.submitAnswer}
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