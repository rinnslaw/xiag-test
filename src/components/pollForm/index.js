import React, { Component } from 'react';
import PropTypes from 'prop-types';
const uuidv1 = require('uuid/v1');

class PollForm extends React.Component {
    state = {
        name: '',
        answerId:'',
        isVoted: false
    }

    componentDidMount () {
        if (localStorage.getItem('isVoted') === 'true') {
            this.setState({isVoted: true})
        }
    }

    onNameChangeHandler = (e) => {
        const name = e.target.value;
        this.setState({name});
    }

    onAnswerChangeHandler = (e) => {
        const answerId = e.target.dataset.id;
        this.setState({answerId});
    }
    
    onSubmitAnswerHandler = (e) => {
            const name = this.state.name;
            const answer = this.state.answerId;
            const newUserId = uuidv1();
            this.props.addNewUser({
                id: newUserId,
                name,
                answer
            })
            this.props.submitAnswer({
                userId: newUserId,
                pollId: this.props.currentPollId
            })
            localStorage.setItem('isVoted', true);
            this.setState({isVoted: true})
    }

    clearVoteResults = () => {
        localStorage.setItem('isVoted', false);
        this.setState({isVoted: false})
    }


    render() {
        return (<div className="page__content page__content--padding">
        <div className="poll">
            <h1>
                {this.props.question}
            </h1>
    
            <div className="ex2-question">
                    <div className="ex2-question__label">
                        Your name:
                    </div>
                    <div className="ex2-question__input">
                        <input 
                            type="text" 
                            className="input-text" 
                            data-id={this.props.currentPollId}
                            onChange={this.onNameChangeHandler}
                            value={this.state.name}/>
                    </div>
                    <div className="ex2-question__answer">
                        {this.props.answers.map((item) => {
                            return <label key={item.id}>
                                        <input
                                            data-id={item.id} 
                                            type="radio" 
                                            name="do-we-go" 
                                            value="Yes" 
                                            onChange={this.onAnswerChangeHandler}
                                        />
                                        {item.text} 
                                    </label>
                            })
                        }
                    </div>
                    <div className="ex2-question__submit">
                        {!this.state.isVoted ? 
                            (<input 
                                type="submit" 
                                className="btn" 
                                value="Submit"
                                disabled={!this.state.name || !this.state.answerId}
                                onClick={this.onSubmitAnswerHandler}
                            />) : (
                                <div>thank you for your vote!<br/> 
                                    <button className="btn" 
                                            onClick={this.clearVoteResults}
                                            style={{background: '#ccc', marginTop:'15px'}}
                                            >
                                        Secret clear memory button
                                    </button> 
                                </div>
                                
                            )
                        }
                    </div>
            </div>
            <h1>
                Results
            </h1>
            <br />
            <table className="ex2-table">
                <thead>
                <tr>
                    <th>Name</th>
                    {this.props.answers.map((item, index) => {
                            return <th key={item.id}>{item.text}</th>
                        })
                    }
                </tr>
                </thead>
                <tbody>
                {this.props.users.map((user, index) => {
                    return <tr key={user.id}>
                        <td>{user.name}</td>
                        {this.props.answers.map((answer, index) => {
                            return <td key={index+answer.id}>{user.answer === answer.id ? 'x' : ''}</td>
                            })
                        }
                    </tr>
                    })
                }
                </tbody>
            </table>
    </div>
        </div>)
      }
}

PollForm.propTypes = {
    currentPollId: PropTypes.string,
    question: PropTypes.string,
    answers: PropTypes.array,
    users: PropTypes.array,
    addNewUser: PropTypes.func,
    submitAnswer: PropTypes.func
};

export default PollForm