import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { pendingTasksReducer } from 'react-redux-spinner';
import polls from './polls';

export default combineReducers({
  routing: routerReducer,
  pendingTasks: pendingTasksReducer,
  polls,
})
