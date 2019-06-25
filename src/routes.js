import React from 'react';
import { Route } from 'react-router-dom';
import { ConnectedSwitch } from 'reactRouterConnected';
import NotFoundPage from 'pages/notFound';
import poll from 'pages/poll';
import pollCreation from 'pages/pollCreation';

class Routes extends React.Component {
    render() {
      return (
        <ConnectedSwitch>
          <Route exact path="/" component={pollCreation} />
          <Route exact path="/pollCreation/" component={pollCreation} />
          <Route exact path="/poll/:pollId" component={poll} />
          <Route
            render={() => (
                <NotFoundPage />
            )}
          />
        </ConnectedSwitch>
      )
    }
  }
 
  export default Routes
  