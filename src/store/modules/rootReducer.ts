import { combineReducers } from 'redux';
import userLoggedSlice from './userLogged/userLoggedSlice';
import userSlice from './users/usersSlice';

const rootReducer = combineReducers({
  users: userSlice,
  userLogged: userLoggedSlice,
});

export { rootReducer };