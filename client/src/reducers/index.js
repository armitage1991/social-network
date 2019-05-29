import {combineReducers} from 'redux';
import authReducer from './authReducer';
import erroReducer from './erroReducer';
import profileReducer from './profileReducer';

export default combineReducers({
    auth:authReducer,
    profile:profileReducer,
    errors:erroReducer
})